/**
 * Text utility functions shared across services.
 * Extracted to avoid circular dependencies between contentExtractor and parsers.
 */

import { getCurrentAdapter } from './language';
import { LanguageAdapter } from './language/types';

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
