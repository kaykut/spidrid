// EPUB Parser - Extracts plain text from EPUB files for RSVP reading
// EPUB is a ZIP archive containing XHTML content files

import * as FileSystem from 'expo-file-system';
import JSZip from 'jszip';
import { EbookParseResult } from '../types/content';

// Strip HTML tags and convert to plain text
function stripHtml(html: string): string {
  if (!html) {return '';}

  let text = html;

  // Remove script and style tags with their content
  text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  // Convert block elements to newlines for better paragraph separation
  text = text.replace(/<\/(p|div|h[1-6]|li|section|article)>/gi, '\n');
  text = text.replace(/<br[^>]*\/?>/gi, '\n');

  // Remove remaining HTML tags
  text = text.replace(/<[^>]+>/g, ' ');

  // Decode common HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&mdash;/g, '—');
  text = text.replace(/&ndash;/g, '–');
  text = text.replace(/&hellip;/g, '...');
  text = text.replace(/&rsquo;/g, "'");
  text = text.replace(/&lsquo;/g, "'");
  text = text.replace(/&rdquo;/g, '"');
  text = text.replace(/&ldquo;/g, '"');

  // Handle numeric entities
  text = text.replace(/&#(\d+);/g, (_, num) =>
    String.fromCharCode(parseInt(num, 10))
  );

  // Clean up whitespace
  text = text.replace(/[ \t]+/g, ' '); // Collapse horizontal whitespace
  text = text.replace(/\n\s*\n/g, '\n\n'); // Normalize paragraph breaks
  text = text.trim();

  return text;
}

// Extract OPF file path from container.xml
function extractOpfPath(containerXml: string): string | null {
  // Look for rootfile element with full-path attribute
  const match = containerXml.match(/rootfile[^>]*full-path="([^"]+)"/i);
  return match ? match[1] : null;
}

// Parse OPF file for metadata and spine (reading order)
function parseOpf(opfContent: string, opfDir: string): {
  metadata: { title?: string; author?: string };
  spineItems: string[];
} {
  const metadata: { title?: string; author?: string } = {};

  // Extract title
  const titleMatch = opfContent.match(/<dc:title[^>]*>([^<]+)<\/dc:title>/i);
  if (titleMatch) {
    metadata.title = titleMatch[1].trim();
  }

  // Extract author (creator)
  const authorMatch = opfContent.match(/<dc:creator[^>]*>([^<]+)<\/dc:creator>/i);
  if (authorMatch) {
    metadata.author = authorMatch[1].trim();
  }

  // Build manifest map (id -> href)
  const manifestMap: Record<string, string> = {};
  const manifestRegex = /<item[^>]*id="([^"]+)"[^>]*href="([^"]+)"[^>]*>/gi;
  let manifestMatch;
  while ((manifestMatch = manifestRegex.exec(opfContent)) !== null) {
    manifestMap[manifestMatch[1]] = manifestMatch[2];
  }

  // Also try alternate attribute order (href before id)
  const manifestRegex2 = /<item[^>]*href="([^"]+)"[^>]*id="([^"]+)"[^>]*>/gi;
  while ((manifestMatch = manifestRegex2.exec(opfContent)) !== null) {
    manifestMap[manifestMatch[2]] = manifestMatch[1];
  }

  // Extract spine order (itemref idrefs)
  const spineItems: string[] = [];
  const spineRegex = /<itemref[^>]*idref="([^"]+)"[^>]*>/gi;
  let spineMatch;
  while ((spineMatch = spineRegex.exec(opfContent)) !== null) {
    const idref = spineMatch[1];
    const href = manifestMap[idref];
    if (href) {
      // Resolve path relative to OPF directory
      const fullPath = opfDir ? `${opfDir}/${href}` : href;
      spineItems.push(fullPath.replace(/^\//, '')); // Remove leading slash
    }
  }

  return { metadata, spineItems };
}

// Check for DRM encryption
function detectDRM(zip: JSZip): boolean {
  // Adobe DRM and other encryption schemes use encryption.xml
  return zip.file('META-INF/encryption.xml') !== null ||
         zip.file('META-INF/rights.xml') !== null;
}

// Main EPUB parsing function
export async function parseEpub(fileUri: string): Promise<EbookParseResult> {
  try {
    // Read file as base64
    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: 'base64',
    });

    // Load ZIP archive
    const zip = await JSZip.loadAsync(base64, { base64: true });

    // Check for DRM
    if (detectDRM(zip)) {
      throw new Error('This e-book is DRM protected and cannot be imported. Please use a DRM-free version.');
    }

    // Parse container.xml to find OPF path
    const containerFile = zip.file('META-INF/container.xml');
    if (!containerFile) {
      throw new Error('Invalid EPUB: missing container.xml');
    }
    const containerXml = await containerFile.async('text');
    const opfPath = extractOpfPath(containerXml);
    if (!opfPath) {
      throw new Error('Invalid EPUB: cannot find content file');
    }

    // Get OPF directory for resolving relative paths
    const opfDir = opfPath.includes('/') ? opfPath.substring(0, opfPath.lastIndexOf('/')) : '';

    // Parse OPF for metadata and spine
    const opfFile = zip.file(opfPath);
    if (!opfFile) {
      throw new Error('Invalid EPUB: missing content file');
    }
    const opfContent = await opfFile.async('text');
    const { metadata, spineItems } = parseOpf(opfContent, opfDir);

    // Extract text from each spine item in reading order
    const contentParts: string[] = [];

    for (const itemPath of spineItems) {
      const file = zip.file(itemPath);
      if (file) {
        const html = await file.async('text');
        const text = stripHtml(html);
        if (text.length > 0) {
          contentParts.push(text);
        }
      }
    }

    const fullContent = contentParts.join('\n\n');

    if (fullContent.length < 100) {
      throw new Error('Not enough readable content found in this EPUB');
    }

    return {
      title: metadata.title || 'Untitled',
      content: fullContent,
      author: metadata.author,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to parse EPUB file');
  }
}
