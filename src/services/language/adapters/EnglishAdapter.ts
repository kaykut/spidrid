/**
 * English Language Adapter
 *
 * Provides English-specific text processing for RSVP reading.
 * Extracts patterns from the original hardcoded implementations.
 */

// @ts-expect-error - hyphen package doesn't have type definitions
import hyphenEn from 'hyphen/en';
import { HyphenationResult } from '../types';
import { BaseLatinAdapter } from './BaseLatinAdapter';

/** Soft hyphen character used by the hyphen library */
const SOFT_HYPHEN = '\u00AD';

/**
 * English Language Adapter
 *
 * Uses the hyphen/en library for syllable detection and provides
 * English-specific patterns for caption filtering and text processing.
 */
export class EnglishAdapter extends BaseLatinAdapter {
  readonly code = 'en' as const;
  readonly name = 'English';

  /** ASCII letters only for English */
  readonly letterPattern: RegExp = /[a-zA-Z]/;

  /**
   * Hyphenate a word using the English hyphenation library.
   */
  hyphenateSync(word: string): HyphenationResult {
    const hyphenated = hyphenEn.hyphenateSync(word);
    const syllables = hyphenated.split(SOFT_HYPHEN);

    return {
      syllables,
      hyphenatedWord: hyphenated,
    };
  }

  /**
   * Compound prefixes: Inherits BASE_LATIN_PREFIXES from BaseLatinAdapter.
   * No English-specific prefixes added.
   * Total: 32 Greek/Latin prefixes (4+ chars only).
   *
   * NOTE: Does NOT override compoundPrefixes getter - uses base implementation.
   */

  /** English caption keywords */
  readonly captionKeywords: string[] = [
    'Photo', 'Image', 'Picture', 'Figure', 'Chart', 'Graph', 'Illustration',
  ];

  /** English PDF artifact patterns */
  readonly pdfArtifactPatterns: RegExp[] = [
    /^(Page\s*)?\d+(\s*(of|\/)\s*\d+)?$/i, // "1", "Page 1", "1 of 10"
    /^-\s*\d+\s*-$/, // "- 1 -"
    /^\[\d+\]$/, // "[1]" standalone footnote refs
    /^(Figure|Fig\.|Table|Tab\.)\s*\d+(\.\d+)?\.?$/i, // "Figure 1" standalone
  ];
}

/** Singleton instance of the English adapter */
export const englishAdapter = new EnglishAdapter();
