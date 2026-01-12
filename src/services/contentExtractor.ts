// Content extraction from URLs, text, and e-books
// Uses @mozilla/readability with linkedom for intelligent article extraction

import { Readability } from '@mozilla/readability';
import { parseHTML } from 'linkedom';
import { ContentImportResult } from '../types/content';
import { parseEpub } from './epubParser';
import { getCurrentAdapter } from './language';
import { LanguageAdapter } from './language/types';
import { parsePdf, PdfExtractFunction } from './pdfParser';

// Result from Readability extraction
interface ReadabilityResult {
  title: string;
  content: string;
  author?: string;
  excerpt?: string;
  siteName?: string;
}

/**
 * Extract article content using linkedom + Readability.
 * Returns null if extraction fails or content is insufficient.
 */
function extractWithReadability(html: string, _url: string): ReadabilityResult | null {
  try {
    // Parse HTML with linkedom (creates DOM-like structure)
    const { document } = parseHTML(html);

    // Create Readability instance and parse
    const reader = new Readability(document, {
      // Readability options - keep defaults for best results
    });

    const article = reader.parse();

    if (!article || !article.textContent) {
      return null;
    }

    // Clean up the text content
    const cleanContent = article.textContent
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();

    // Filter out captions and photo credits
    const filteredContent = filterCaptions(cleanContent);

    // Require minimum content length
    if (filteredContent.length < 100) {
      return null;
    }

    return {
      title: article.title || '',
      content: filteredContent,
      author: article.byline || undefined,
      excerpt: article.excerpt || undefined,
      siteName: article.siteName || undefined,
    };
  } catch (error) {
    // Log in development, fail silently in production
    if (__DEV__) {
      console.warn('Readability extraction failed:', error);
    }
    return null;
  }
}

/**
 * Build caption patterns from adapter keywords.
 */
function buildCaptionPatterns(adapter: LanguageAdapter): RegExp[] {
  // Escape special regex characters in keywords
  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Build caption keywords pattern: "Photo: ...", "Image by ..."
  const captionKeywordsPattern = adapter.captionKeywords.map(escapeRegex).join('|');

  // Build attribution keywords pattern: "Credit:", "Source:"
  const attributionKeywordsPattern = adapter.attributionKeywords.map(escapeRegex).join('|');

  // Build stock agencies pattern
  const stockAgenciesPattern = adapter.stockAgencies.map(escapeRegex).join('|');

  return [
    // Photo/image credits: "Photo: John Smith", "Image by Reuters"
    new RegExp(`^(${captionKeywordsPattern})(\\s*:|\\s+by|\\s+credit|\\s+courtesy|\\s+source|\\s+via|\\s+©)`, 'i'),
    // Source attributions: "Credit:", "Source:", "©"
    new RegExp(`^(${attributionKeywordsPattern})(\\s*:)`, 'i'),
    // Stock photo agencies at line start
    new RegExp(`^\\(?(${stockAgenciesPattern})`, 'i'),
    // Numbered image refs: "Image 2 of 5" (universal pattern)
    /^Image \d+ of \d+/i,
    // Bracketed placeholders: "[Photo removed]", "[Image]" (not nested brackets like [[HEADER]])
    /^\[[^\[\]]*\]$/,
    // Copyright lines: "© 2024 Company Name"
    /^©\s*\d{4}/,
  ];
}

/**
 * Filter out image captions, photo credits, and similar non-article text.
 * These are jarring during RSVP speed reading.
 *
 * @param text - Text to filter
 * @param adapter - Language adapter for caption keywords (defaults to current language)
 */
export function filterCaptions(
  text: string,
  adapter: LanguageAdapter = getCurrentAdapter()
): string {
  const captionPatterns = buildCaptionPatterns(adapter);

  return text
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      if (!trimmed) {
        return true; // Keep empty lines for paragraph structure
      }
      return !captionPatterns.some(pattern => pattern.test(trimmed));
    })
    .join('\n');
}

// Basic HTML tag stripping
function stripHtml(html: string): string {
  // Remove script and style tags with their content
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, ' ');

  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");

  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

// Extract title from HTML
function extractTitle(html: string, url: string): string {
  // Try to get <title> tag
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch && titleMatch[1]) {
    return titleMatch[1].trim();
  }

  // Try og:title
  const ogMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i);
  if (ogMatch && ogMatch[1]) {
    return ogMatch[1].trim();
  }

  // Fall back to domain name
  try {
    const domain = new URL(url).hostname;
    return domain;
  } catch {
    return 'Imported Article';
  }
}

// Count words in text
function countWords(text: string): number {
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

export async function extractFromUrl(url: string): Promise<ContentImportResult> {
  try {
    // Validate URL
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    new URL(url); // Validate URL format

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SpidridReader/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();

    // Try Readability extraction first (intelligent article detection)
    const readabilityResult = extractWithReadability(html, url);

    if (readabilityResult && readabilityResult.content.length >= 100) {
      // Readability succeeded - use its results with metadata
      const wordCount = countWords(readabilityResult.content);

      return {
        success: true,
        content: {
          id: '', // Will be set by store
          title: readabilityResult.title || extractTitle(html, url),
          content: readabilityResult.content,
          wordCount,
          source: 'url',
          sourceUrl: url,
          createdAt: 0, // Will be set by store
          readProgress: 0,
          // New optional metadata fields
          author: readabilityResult.author,
          excerpt: readabilityResult.excerpt,
          siteName: readabilityResult.siteName,
        },
      };
    }

    // Fallback to basic regex extraction
    const title = extractTitle(html, url);
    const rawContent = stripHtml(html);
    const content = filterCaptions(rawContent);

    if (content.length < 100) {
      throw new Error('Not enough readable content found');
    }

    const wordCount = countWords(content);

    return {
      success: true,
      content: {
        id: '', // Will be set by store
        title,
        content,
        wordCount,
        source: 'url',
        sourceUrl: url,
        createdAt: 0, // Will be set by store
        readProgress: 0,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to extract content',
    };
  }
}

export function createFromText(text: string, title?: string): ContentImportResult {
  const trimmedText = text.trim();

  if (trimmedText.length < 20) {
    return {
      success: false,
      error: 'Text is too short (minimum 20 characters)',
    };
  }

  const wordCount = countWords(trimmedText);

  // Generate title from first line or words if not provided
  const generatedTitle = title || trimmedText.split('\n')[0].substring(0, 50) || 'Pasted Text';

  return {
    success: true,
    content: {
      id: '',
      title: generatedTitle,
      content: trimmedText,
      wordCount,
      source: 'text',
      createdAt: 0,
      readProgress: 0,
    },
  };
}

export interface ExtractFromEbookOptions {
  pdfExtractor?: PdfExtractFunction;
}

export async function extractFromEbook(
  fileUri: string,
  fileName: string,
  options?: ExtractFromEbookOptions
): Promise<ContentImportResult> {
  try {
    const extension = fileName.toLowerCase().split('.').pop();

    // Route based on file extension
    switch (extension) {
      case 'epub': {
        const result = await parseEpub(fileUri);
        const wordCount = countWords(result.content);

        return {
          success: true,
          content: {
            id: '',
            title: result.title,
            content: result.content,
            wordCount,
            source: 'epub',
            fileName,
            createdAt: 0,
            readProgress: 0,
          },
        };
      }

      case 'pdf': {
        if (!options?.pdfExtractor) {
          return {
            success: false,
            error: 'PDF extraction not available. Please try again.',
          };
        }

        const result = await parsePdf(fileUri, options.pdfExtractor);
        const wordCount = countWords(result.content);

        return {
          success: true,
          content: {
            id: '',
            title: result.title,
            content: result.content,
            wordCount,
            source: 'pdf',
            fileName,
            createdAt: 0,
            readProgress: 0,
          },
        };
      }

      case 'mobi':
      case 'azw':
      case 'azw3':
        return {
          success: false,
          error: 'MOBI/Kindle format requires conversion. Please convert to EPUB using Calibre (free).',
        };

      default:
        return {
          success: false,
          error: `Unsupported file format: .${extension}. Please use EPUB or PDF format.`,
        };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to parse e-book',
    };
  }
}
