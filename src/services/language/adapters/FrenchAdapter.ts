/**
 * French Language Adapter
 *
 * Provides French-specific text processing for RSVP reading.
 */

// @ts-expect-error - hyphen package doesn't have type definitions
import hyphenFr from 'hyphen/fr';
import { HyphenationResult } from '../types';
import { BaseLatinAdapter, BASE_LATIN_PREFIXES } from './BaseLatinAdapter';

/** Soft hyphen character used by the hyphen library */
const SOFT_HYPHEN = '\u00AD';

/**
 * French Language Adapter
 *
 * Uses the hyphen/fr library for syllable detection and provides
 * French-specific patterns for caption filtering and text processing.
 * Includes support for œ, æ, ç, and various accented characters.
 */
export class FrenchAdapter extends BaseLatinAdapter {
  readonly code = 'fr' as const;
  readonly name = 'French';

  /** French letters including œ, æ, ç, and accented characters */
  readonly letterPattern: RegExp = /[a-zA-ZàâäæçéèêëîïôœùûüÿÀÂÄÆÇÉÈÊËÎÏÔŒÙÛÜŸ]/;

  /** French compound prefixes (inherited + French-specific) */
  get compoundPrefixes(): string[] {
    return [
      ...BASE_LATIN_PREFIXES, // Inherit Greek/Latin prefixes
      // French-specific prefixes (13 total), sorted by length (longest first)
      'arrière', 'contre', 'avant', 'après', 'entre', 'sous', 'sans', 'pré', 'dés', 'sur', 're', 'dé', 'de',
    ];
  }

  /**
   * Hyphenate a word using the French hyphenation library.
   */
  hyphenateSync(word: string): HyphenationResult {
    const hyphenated = hyphenFr.hyphenateSync(word);
    const syllables = hyphenated.split(SOFT_HYPHEN);

    return {
      syllables,
      hyphenatedWord: hyphenated,
    };
  }

  /** French caption keywords */
  readonly captionKeywords: string[] = [
    'Photo', 'Image', 'Photographie', 'Figure', 'Graphique', 'Illustration',
    'Tableau', 'Diagramme', 'Schéma',
  ];

  /** French PDF artifact patterns */
  readonly pdfArtifactPatterns: RegExp[] = [
    /^(Page\s*)?\d+(\s*(de|\/)\s*\d+)?$/i, // "1", "Page 1", "1 de 10"
    /^-\s*\d+\s*-$/, // "- 1 -"
    /^\[\d+\]$/, // "[1]" standalone footnote refs
    /^(Figure|Fig\.|Tableau|Tab\.)\s*\d+(\.\d+)?\.?$/i, // "Figure 1" standalone
  ];
}

/** Singleton instance of the French adapter */
export const frenchAdapter = new FrenchAdapter();
