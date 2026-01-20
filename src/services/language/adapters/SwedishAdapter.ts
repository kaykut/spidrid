/**
 * Swedish Language Adapter
 *
 * Provides Swedish-specific text processing for RSVP reading.
 * North Germanic language with 10 million speakers.
 */

// @ts-expect-error - hyphen package doesn't have type definitions
import hyphenSv from 'hyphen/sv';
import { HyphenationResult } from '../types';
import { BaseLatinAdapter, BASE_LATIN_PREFIXES } from './BaseLatinAdapter';

/** Soft hyphen character used by the hyphen library */
const SOFT_HYPHEN = '\u00AD';

/**
 * Swedish Language Adapter
 *
 * Uses the hyphen/sv library for syllable detection and provides
 * Swedish-specific patterns for caption filtering and text processing.
 * Includes support for Swedish special characters: å, ä, ö.
 */
export class SwedishAdapter extends BaseLatinAdapter {
  readonly code = 'sv' as const;
  readonly name = 'Swedish';

  /** Swedish letters including special characters */
  readonly letterPattern: RegExp = /[a-zA-ZåäöÅÄÖ]/;

  /**
   * Hyphenate a word using the Swedish hyphenation library.
   */
  hyphenateSync(word: string): HyphenationResult {
    const hyphenated = hyphenSv.hyphenateSync(word);
    const syllables = hyphenated.split(SOFT_HYPHEN);

    return {
      syllables,
      hyphenatedWord: hyphenated,
    };
  }

  /**
   * Swedish compound prefixes (inherited Greek/Latin + Swedish-specific).
   * Total: 32 base + 13 Swedish = 45 prefixes (4+ chars only).
   *
   * Swedish prefixes sorted by length (longest first) to ensure proper matching.
   */
  get compoundPrefixes(): string[] {
    return [
      ...BASE_LATIN_PREFIXES,
      // 6 chars
      'mellan',
      // 5 chars
      'genom', 'omkring', 'ytter',
      // 4 chars
      'fram', 'över', 'ovan', 'utan', 'ämne', 'grund', 'emel', 'efter', 'åter',
    ];
  }

  /** Swedish caption keywords */
  readonly captionKeywords: string[] = [
    'Foto', 'Bild', 'Figur', 'Graf', 'Illustration',
    'Tabell', 'Diagram', 'Schema',
  ];

  /** Swedish PDF artifact patterns */
  readonly pdfArtifactPatterns: RegExp[] = [
    /^((Sida|Sid\.)\s*)?\d+(\s*(av|\/)\s*\d+)?$/i, // "1", "Sida 1", "1 av 10", "Sid. 5"
    /^-\s*\d+\s*-$/, // "- 1 -"
    /^\[\d+\]$/, // "[1]" standalone footnote refs
    /^(Figur|Fig\.|Tabell|Tab\.)(\s*\d+(\.\d+)?\.?)?$/i, // "Figur 1", "Tabell 2.1"
  ];
}

/** Singleton instance of the Swedish adapter */
export const swedishAdapter = new SwedishAdapter();
