/**
 * Italian Language Adapter
 *
 * Provides Italian-specific text processing for RSVP reading.
 */

// @ts-expect-error - hyphen package doesn't have type definitions
import hyphenIt from 'hyphen/it';
import { HyphenationResult } from '../types';
import { BaseLatinAdapter, BASE_LATIN_PREFIXES } from './BaseLatinAdapter';

/** Soft hyphen character used by the hyphen library */
const SOFT_HYPHEN = '\u00AD';

/**
 * Italian Language Adapter
 *
 * Uses the hyphen/it library for syllable detection and provides
 * Italian-specific patterns for caption filtering and text processing.
 * Includes support for accented vowels.
 */
export class ItalianAdapter extends BaseLatinAdapter {
  readonly code = 'it' as const;
  readonly name = 'Italian';

  /** Italian letters including accented vowels */
  readonly letterPattern: RegExp = /[a-zA-ZàèéìíòóùúÀÈÉÌÍÒÓÙÚ]/;

  /** Italian compound prefixes (inherited + Italian-specific) */
  get compoundPrefixes(): string[] {
    return [
      ...BASE_LATIN_PREFIXES, // Inherit Greek/Latin prefixes
      // Italian-specific prefixes (7 total), sorted by length (longest first)
      'contro', 'sovra', 'sopra', 'sotto', 'stra', 'dopo', 'dis',
    ];
  }

  /**
   * Hyphenate a word using the Italian hyphenation library.
   */
  hyphenateSync(word: string): HyphenationResult {
    const hyphenated = hyphenIt.hyphenateSync(word);
    const syllables = hyphenated.split(SOFT_HYPHEN);

    return {
      syllables,
      hyphenatedWord: hyphenated,
    };
  }

  /** Italian caption keywords */
  readonly captionKeywords: string[] = [
    'Foto', 'Immagine', 'Fotografia', 'Figura', 'Grafico', 'Illustrazione',
    'Tabella', 'Diagramma', 'Schema',
  ];

  /** Italian PDF artifact patterns */
  readonly pdfArtifactPatterns: RegExp[] = [
    /^(Pagina\s*)?\d+(\s*(di|\/)\s*\d+)?$/i, // "1", "Pagina 1", "1 di 10"
    /^-\s*\d+\s*-$/, // "- 1 -"
    /^\[\d+\]$/, // "[1]" standalone footnote refs
    /^(Figura|Fig\.|Tabella|Tab\.)\s*\d+(\.\d+)?\.?$/i, // "Figura 1" standalone
  ];
}

/** Singleton instance of the Italian adapter */
export const italianAdapter = new ItalianAdapter();
