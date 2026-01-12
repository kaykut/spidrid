// EPUB Parser - Extracts plain text from EPUB files for RSVP reading
// EPUB is a ZIP archive containing XHTML content files

import * as FileSystem from 'expo-file-system';
import JSZip from 'jszip';
import { EbookParseResult, ChapterMetadata } from '../types/content';
import { filterCaptions } from './contentExtractor';
import { getCurrentAdapter } from './language';
import { LanguageAdapter } from './language/types';

// Internal chapter info from NCX/nav parsing
interface ChapterInfo {
  title: string;
  href: string;
}

/**
 * Strip HTML tags and convert to plain text.
 * Preserves header elements with [[HEADER]]...[[/HEADER]] markers for RSVP treatment.
 *
 * @param html - HTML content to strip
 * @param adapter - Language adapter for entity decoding (defaults to current language)
 */
function stripHtml(html: string, adapter: LanguageAdapter = getCurrentAdapter()): string {
  if (!html) {return '';}

  let text = html;

  // Remove script and style tags with their content
  text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  // Preserve headers with markers (capture content, wrap with markers)
  // Handle h1-h6 tags with potential attributes
  text = text.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, '\n[[HEADER]]$2[[/HEADER]]\n');

  // Convert block elements to newlines for better paragraph separation
  text = text.replace(/<\/(p|div|li|section|article)>/gi, '\n');
  text = text.replace(/<br[^>]*\/?>/gi, '\n');

  // Remove remaining HTML tags (but our [[HEADER]] markers are safe)
  text = text.replace(/<[^>]+>/g, ' ');

  // Decode HTML entities using adapter's entity map
  for (const [entity, replacement] of Object.entries(adapter.htmlEntityMap)) {
    text = text.replace(new RegExp(entity.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
  }

  // Decode quotation entities using adapter's quotation map
  for (const [entity, replacement] of Object.entries(adapter.quotationEntities)) {
    text = text.replace(new RegExp(entity.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
  }

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

// Parse EPUB2 NCX file for chapter navigation
function parseNcx(ncxContent: string): ChapterInfo[] {
  const chapters: ChapterInfo[] = [];

  // Match navPoint elements with navLabel/text and content src
  // Pattern: <navPoint...><navLabel><text>Title</text></navLabel><content src="file.xhtml"/>
  const navPointRegex = /<navPoint[^>]*>[\s\S]*?<navLabel>\s*<text>([^<]+)<\/text>\s*<\/navLabel>[\s\S]*?<content[^>]*src="([^"]+)"[^>]*\/?>[\s\S]*?<\/navPoint>/gi;

  let match;
  while ((match = navPointRegex.exec(ncxContent)) !== null) {
    const title = match[1].trim();
    const href = match[2].split('#')[0]; // Remove fragment
    if (title && href) {
      chapters.push({ title, href });
    }
  }

  return chapters;
}

// Parse EPUB3 nav.xhtml for chapter navigation
function parseNavXhtml(navContent: string): ChapterInfo[] {
  const chapters: ChapterInfo[] = [];

  // Find the toc nav element
  const tocMatch = navContent.match(/<nav[^>]*epub:type="toc"[^>]*>([\s\S]*?)<\/nav>/i);
  if (!tocMatch) {return chapters;}

  const tocContent = tocMatch[1];

  // Match <a> elements within the toc
  const linkRegex = /<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;

  let match;
  while ((match = linkRegex.exec(tocContent)) !== null) {
    const href = match[1].split('#')[0]; // Remove fragment
    const title = match[2].trim();
    if (title && href) {
      chapters.push({ title, href });
    }
  }

  return chapters;
}

// Find NCX file path from OPF manifest
function findNcxPath(opfContent: string, opfDir: string): string | null {
  // Look for item with media-type="application/x-dtbncx+xml"
  const ncxMatch = opfContent.match(/<item[^>]*media-type="application\/x-dtbncx\+xml"[^>]*href="([^"]+)"[^>]*>/i) ||
                   opfContent.match(/<item[^>]*href="([^"]+)"[^>]*media-type="application\/x-dtbncx\+xml"[^>]*>/i);

  if (ncxMatch) {
    const href = ncxMatch[1];
    return opfDir ? `${opfDir}/${href}` : href;
  }
  return null;
}

// Find nav.xhtml path from OPF manifest (EPUB3)
function findNavPath(opfContent: string, opfDir: string): string | null {
  // Look for item with properties="nav"
  const navMatch = opfContent.match(/<item[^>]*properties="[^"]*nav[^"]*"[^>]*href="([^"]+)"[^>]*>/i) ||
                   opfContent.match(/<item[^>]*href="([^"]+)"[^>]*properties="[^"]*nav[^"]*"[^>]*>/i);

  if (navMatch) {
    const href = navMatch[1];
    return opfDir ? `${opfDir}/${href}` : href;
  }
  return null;
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

    // Try to parse chapter navigation (NCX for EPUB2, nav.xhtml for EPUB3)
    let chapterInfos: ChapterInfo[] = [];

    // Try NCX first (EPUB2)
    const ncxPath = findNcxPath(opfContent, opfDir);
    if (ncxPath) {
      const ncxFile = zip.file(ncxPath);
      if (ncxFile) {
        const ncxContent = await ncxFile.async('text');
        chapterInfos = parseNcx(ncxContent);
      }
    }

    // Fall back to nav.xhtml (EPUB3) if no NCX chapters found
    if (chapterInfos.length === 0) {
      const navPath = findNavPath(opfContent, opfDir);
      if (navPath) {
        const navFile = zip.file(navPath);
        if (navFile) {
          const navContent = await navFile.async('text');
          chapterInfos = parseNavXhtml(navContent);
        }
      }
    }

    // Extract text from each spine item and track character offsets
    const contentParts: string[] = [];
    const spineOffsets: Map<string, number> = new Map();
    let currentOffset = 0;

    for (const itemPath of spineItems) {
      const file = zip.file(itemPath);
      if (file) {
        const html = await file.async('text');
        const text = stripHtml(html);
        if (text.length > 0) {
          // Store the character offset where this spine item starts
          // Normalize path for matching (remove leading directory if present)
          const normalizedPath = itemPath.split('/').pop() || itemPath;
          spineOffsets.set(normalizedPath, currentOffset);
          spineOffsets.set(itemPath, currentOffset);

          contentParts.push(text);
          currentOffset += text.length + 2; // +2 for '\n\n' separator
        }
      }
    }

    const rawContent = contentParts.join('\n\n');
    const fullContent = filterCaptions(rawContent);

    if (fullContent.length < 100) {
      throw new Error('Not enough readable content found in this EPUB');
    }

    // Map chapter hrefs to character offsets
    const chapters: ChapterMetadata[] = [];
    for (const chapter of chapterInfos) {
      // Try to find the offset for this chapter's href
      const normalizedHref = chapter.href.split('/').pop() || chapter.href;
      const offset = spineOffsets.get(normalizedHref) ?? spineOffsets.get(chapter.href);

      if (offset !== undefined) {
        chapters.push({
          title: chapter.title,
          startCharOffset: offset,
        });
      }
    }

    // Sort chapters by offset and remove duplicates
    chapters.sort((a, b) => a.startCharOffset - b.startCharOffset);

    return {
      title: metadata.title || 'Untitled',
      content: fullContent,
      author: metadata.author,
      chapters: chapters.length > 0 ? chapters : undefined,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to parse EPUB file');
  }
}
