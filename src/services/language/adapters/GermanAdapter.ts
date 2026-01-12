/**
 * German Language Adapter
 *
 * Provides German-specific text processing for RSVP reading.
 */

// @ts-expect-error - hyphen package doesn't have type definitions
import hyphenDe from 'hyphen/de';
import { HyphenationResult } from '../types';
import { BaseLatinAdapter } from './BaseLatinAdapter';

/** Soft hyphen character used by the hyphen library */
const SOFT_HYPHEN = '\u00AD';

/**
 * German Language Adapter
 *
 * Uses the hyphen/de library for syllable detection and provides
 * German-specific patterns for caption filtering and text processing.
 * Includes support for ß, ä, ö, ü.
 */
export class GermanAdapter extends BaseLatinAdapter {
  readonly code = 'de' as const;
  readonly name = 'German';

  /** German letters including ß, ä, ö, ü */
  readonly letterPattern: RegExp = /[a-zA-ZäöüßÄÖÜ]/;

  /**
   * Hyphenate a word using the German hyphenation library.
   */
  hyphenateSync(word: string): HyphenationResult {
    const hyphenated = hyphenDe.hyphenateSync(word);
    const syllables = hyphenated.split(SOFT_HYPHEN);

    return {
      syllables,
      hyphenatedWord: hyphenated,
    };
  }

  /** German caption keywords */
  readonly captionKeywords: string[] = [
    'Foto', 'Bild', 'Abbildung', 'Grafik', 'Illustration',
    'Tabelle', 'Diagramm', 'Schaubild',
  ];

  /** German PDF artifact patterns */
  readonly pdfArtifactPatterns: RegExp[] = [
    /^(Seite\s*)?\d+(\s*(von|\/)\s*\d+)?$/i, // "1", "Seite 1", "1 von 10"
    /^-\s*\d+\s*-$/, // "- 1 -"
    /^\[\d+\]$/, // "[1]" standalone footnote refs
    /^(Abbildung|Abb\.|Tabelle|Tab\.)\s*\d+(\.\d+)?\.?$/i, // "Abbildung 1" standalone
  ];
}

/** Singleton instance of the German adapter */
export const germanAdapter = new GermanAdapter();
