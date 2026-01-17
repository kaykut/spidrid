// Content extraction from URLs, text, and e-books
// Uses @mozilla/readability with linkedom for intelligent article extraction

import { Readability } from '@mozilla/readability';
import { parseHTML } from 'linkedom';
import { ContentImportResult } from '../types/content';
import { parseEpub } from './epubParser';
import { parsePdf, PdfExtractFunction } from './pdfParser';
import { filterCaptions } from './textUtils';

// Re-export filterCaptions for backward compatibility
export { filterCaptions } from './textUtils';

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

    if (!article || !article.content) {
      if (__DEV__) {
        console.warn('[Readability] No article or content found');
      }
      return null;
    }

    if (__DEV__) {
      console.warn('[Readability] Raw extraction:', {
        title: article.title,
        excerpt: article.excerpt?.substring(0, 150),
        byline: article.byline,
        length: article.length,
      });
      console.warn('[Readability] Content field (HTML):', {
        length: article.content.length,
        firstParagraph: article.content.substring(0, 1000),
      });
      console.warn('[Readability] TextContent field (plain text):', {
        length: article.textContent?.length,
        first500chars: article.textContent?.substring(0, 500),
      });

      // Sanity check: Ensure we have substantial content
      // Note: We don't validate excerpt against textContent because excerpt
      // is often a meta description/SEO summary, not the actual first paragraph
      const wordCount = article.textContent?.split(/\s+/).filter(w => w.length > 0).length || 0;
      console.warn('[Readability] Content validation:', {
        textContentLength: article.textContent?.length || 0,
        wordCount,
        hasSubstantialContent: wordCount >= 250,
      });

      // Only reject if we have insufficient content (likely extracted wrong section)
      // Minimum 250 words to filter out navigation/junk
      if (!article.textContent || wordCount < 250) {
        console.warn('[Readability] FAILED: Insufficient content (< 250 words). Readability extracted wrong content (likely navigation). Will use fallback.');
        return null; // Trigger fallback extraction
      }
    }

    // CRITICAL: Use textContent directly instead of stripping HTML from content
    // textContent is Readability's pre-processed plain text version
    let cleanContent = article.textContent || '';

    if (__DEV__) {
      console.warn('[Readability] Using textContent directly:', {
        length: cleanContent.length,
        preview: cleanContent.substring(0, 300),
      });
    }

    // Normalize whitespace while preserving paragraph structure
    // First, normalize line breaks and remove excessive whitespace
    cleanContent = cleanContent
      .replace(/\r\n/g, '\n')  // Normalize line endings
      .replace(/\t/g, ' ')      // Convert tabs to spaces
      .replace(/ +/g, ' ')      // Collapse multiple spaces
      .replace(/\n +/g, '\n')   // Remove leading spaces on lines
      .replace(/ +\n/g, '\n')   // Remove trailing spaces on lines
      .replace(/\n{3,}/g, '\n\n') // Collapse 3+ newlines to 2
      .trim();

    if (__DEV__) {
      console.warn('[Readability] After whitespace normalization:', {
        length: cleanContent.length,
        preview: cleanContent.substring(0, 300),
      });
    }

    // Filter out captions and photo credits
    const filteredContent = filterCaptions(cleanContent);
    const finalWordCount = filteredContent.split(/\s+/).filter(w => w.length > 0).length;

    if (__DEV__) {
      console.warn('[Readability] After filterCaptions:', {
        contentLength: filteredContent.length,
        preview: filteredContent.substring(0, 200),
        wordCount: finalWordCount,
      });
    }

    // Require minimum word count (250 words = ~1-2 paragraphs)
    if (finalWordCount < 250) {
      if (__DEV__) {
        console.warn('[Readability] Content too short after filtering (< 250 words)');
      }
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
      console.warn('[Readability] Extraction failed:', error);
    }
    return null;
  }
}

// Basic HTML tag stripping
function stripHtml(html: string): string {
  // Remove script and style tags with their content
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  // Convert block-level tags to newlines BEFORE stripping
  // This preserves paragraph structure
  text = text.replace(/<\/(p|div|article|section|h[1-6]|li|tr|td|th)>/gi, '\n');
  text = text.replace(/<br\s*\/?>/gi, '\n');

  // Remove remaining HTML tags
  text = text.replace(/<[^>]+>/g, ' ');

  // Decode HTML entities (common ones)
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&#8217;/g, "'"); // Right single quote
  text = text.replace(/&#8220;/g, '"'); // Left double quote
  text = text.replace(/&#8221;/g, '"'); // Right double quote
  text = text.replace(/&#8211;/g, '–'); // En dash
  text = text.replace(/&#8212;/g, '—'); // Em dash

  // Clean up whitespace while preserving paragraph breaks
  text = text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n\n')
    .trim();

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

    if (__DEV__) {
      console.warn('[URL Extraction] Fetching:', url);
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SpidridReader/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    // CRITICAL: response.text() can return undefined in React Native
    // This is a known bug especially on iOS and with certain content-types
    // Try multiple extraction methods as fallback
    let html: string | undefined;

    try {
      html = await response.text();
    } catch (error) {
      if (__DEV__) {
        console.warn('[URL Extraction] response.text() failed, trying clone:', error);
      }
    }

    // Fallback 1: Try cloning the response (sometimes works when text() fails)
    if (!html || typeof html !== 'string') {
      try {
        const cloned = response.clone();
        html = await cloned.text();
        if (__DEV__) {
          console.warn('[URL Extraction] Clone method succeeded');
        }
      } catch (error) {
        if (__DEV__) {
          console.warn('[URL Extraction] Clone method also failed:', error);
        }
      }
    }

    // Fallback 2: Try XMLHttpRequest (more reliable in React Native)
    if (!html || typeof html !== 'string') {
      if (__DEV__) {
        console.warn('[URL Extraction] Falling back to XMLHttpRequest');
      }

      html = await new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.responseText);
          } else {
            reject(new Error(`XMLHttpRequest failed: ${xhr.status}`));
          }
        };
        xhr.onerror = () => reject(new Error('XMLHttpRequest network error'));
        xhr.ontimeout = () => reject(new Error('XMLHttpRequest timeout'));
        xhr.open('GET', url);
        xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (compatible; SpidridReader/1.0)');
        xhr.timeout = 30000; // 30 second timeout
        xhr.send();
      });

      if (__DEV__) {
        console.warn('[URL Extraction] XMLHttpRequest succeeded');
      }
    }

    // Final validation: ensure we actually got HTML content
    if (!html || typeof html !== 'string' || html.length === 0) {
      if (__DEV__) {
        console.error('[URL Extraction] All extraction methods failed:', {
          html,
          type: typeof html,
          responseType: response.type,
          contentType: response.headers.get('content-type'),
        });
      }
      throw new Error('Server returned empty or invalid response body');
    }

    if (__DEV__) {
      console.warn('[URL Extraction] Fetched HTML:', {
        length: html.length,
        preview: html.substring(0, 200),
        contentType: response.headers.get('content-type'),
      });
    }

    // Try Readability extraction first (intelligent article detection)
    const readabilityResult = extractWithReadability(html, url);

    if (readabilityResult) {
      // Readability succeeded (already validated for 250+ words internally)
      const wordCount = countWords(readabilityResult.content);

      if (__DEV__) {
        console.warn('[URL Extraction] Using Readability result:', {
          wordCount,
          contentLength: readabilityResult.content.length,
        });
      }

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

    if (__DEV__) {
      console.warn('[URL Extraction] Readability failed or insufficient content, using fallback');
    }

    // Fallback to basic regex extraction
    const title = extractTitle(html, url);

    // Try to extract main content area first (common CMS patterns)
    let contentHtml = html;
    const contentPatterns = [
      // WordPress/common CMS patterns
      /<div[^>]*class=["'][^"']*entry-content[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
      /<article[^>]*class=["'][^"']*(?:article-content|post-content|entry-content)[^"']*["'][^>]*>([\s\S]*?)<\/article>/i,
      /<main[^>]*>([\s\S]*?)<\/main>/i,
      /<article[^>]*>([\s\S]*?)<\/article>/i,
      // Generic content containers
      /<div[^>]*id=["'](?:content|main-content|article|post)["'][^>]*>([\s\S]*?)<\/div>/i,
    ];

    for (const pattern of contentPatterns) {
      const match = html.match(pattern);
      if (match && match[1] && match[1].length > 500) {
        contentHtml = match[1];
        if (__DEV__) {
          console.warn('[URL Extraction] Extracted main content section:', {
            pattern: pattern.source.substring(0, 50),
            contentLength: contentHtml.length,
          });
        }
        break;
      }
    }

    const rawContent = stripHtml(contentHtml);
    const content = filterCaptions(rawContent);
    const wordCount = countWords(content);

    if (__DEV__) {
      console.warn('[URL Extraction] Fallback extraction:', {
        rawContentLength: rawContent.length,
        filteredContentLength: content.length,
        wordCount,
        preview: content.substring(0, 200),
      });
    }

    // Minimum 250 words to ensure we have substantial content
    if (wordCount < 250) {
      throw new Error(`Not enough readable content found (${wordCount} words, need 250+)`);
    }

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
    if (__DEV__) {
      console.error('[URL Extraction] Failed:', error);
    }
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

  // Generate title from first line if not provided
  let generatedTitle = title;
  if (!generatedTitle) {
    const firstLine = trimmedText.split('\n')[0].trim();
    if (firstLine.length > 50) {
      // Truncate to 47 chars to leave room for '...' (total max 50)
      const truncated = firstLine.substring(0, 47);
      const lastSpace = truncated.lastIndexOf(' ');
      generatedTitle = lastSpace > 30 ? `${truncated.substring(0, lastSpace)  }...` : `${truncated  }...`;
    } else if (firstLine.length > 0) {
      generatedTitle = firstLine;
    } else {
      generatedTitle = 'Pasted Text';
    }
  }

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
