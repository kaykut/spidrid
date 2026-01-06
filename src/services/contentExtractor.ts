// Simple HTML content extraction
// In a production app, you'd use a library like @mozilla/readability

import { ImportedContent, ContentImportResult } from '../types/content';

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
      url = 'https://' + url;
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
    const title = extractTitle(html, url);
    const content = stripHtml(html);

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
