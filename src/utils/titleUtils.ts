/**
 * Title Utilities
 *
 * Helper functions for parsing and displaying content titles.
 */

/**
 * Splits a title at ":" or " – " / " - " for two-line display.
 * If multiple separators exist, truncates at the second one.
 * Only considers spaced dashes (NOT word-splitting hyphens like "multi-word").
 *
 * @example
 * splitTitle("Why the Culture Wins: An Appreciation - Site Name")
 * // Returns: { primary: "Why the Culture Wins", subtitle: "An Appreciation" }
 */
export function splitTitle(title: string): { primary: string; subtitle: string | null } {
  // Separators: colon and spaced dashes only
  const separators = [':', ' – ', ' — ', ' - '];

  // Find earliest separator in a string (must be at position > 0)
  function findFirstSeparator(str: string): { index: number; length: number } | null {
    let earliest: { index: number; length: number } | null = null;

    for (const sep of separators) {
      const idx = str.indexOf(sep);
      if (idx > 0 && (earliest === null || idx < earliest.index)) {
        earliest = { index: idx, length: sep.length };
      }
    }

    return earliest;
  }

  const firstSep = findFirstSeparator(title);
  if (!firstSep) {
    return { primary: title, subtitle: null };
  }

  const primary = title.substring(0, firstSep.index).trim();
  let subtitle = title.substring(firstSep.index + firstSep.length).trim();

  // Truncate subtitle at any second separator (e.g., " - Site Name")
  const secondSep = findFirstSeparator(subtitle);
  if (secondSep) {
    subtitle = subtitle.substring(0, secondSep.index).trim();
  }

  return { primary, subtitle: subtitle || null };
}
