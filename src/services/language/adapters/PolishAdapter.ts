/**
 * Polish Language Adapter
 *
 * Provides Polish-specific text processing for RSVP reading.
 * Largest Slavic language in the EU with 50 million speakers.
 */

// @ts-expect-error - hyphen package doesn't have type definitions
import hyphenPl from 'hyphen/pl';
import { HyphenationResult } from '../types';
import { BaseLatinAdapter, BASE_LATIN_PREFIXES } from './BaseLatinAdapter';

/** Soft hyphen character used by the hyphen library */
const SOFT_HYPHEN = '\u00AD';

/**
 * Polish Language Adapter
 *
 * Uses the hyphen/pl library for syllable detection and provides
 * Polish-specific patterns for caption filtering and text processing.
 * Includes support for Polish special characters: ą, ć, ę, ł, ń, ó, ś, ź, ż.
 */
export class PolishAdapter extends BaseLatinAdapter {
  readonly code = 'pl' as const;
  readonly name = 'Polish';

  /** Polish letters including special characters */
  readonly letterPattern: RegExp = /[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/;

  /**
   * Hyphenate a word using the Polish hyphenation library.
   */
  hyphenateSync(word: string): HyphenationResult {
    const hyphenated = hyphenPl.hyphenateSync(word);
    const syllables = hyphenated.split(SOFT_HYPHEN);

    return {
      syllables,
      hyphenatedWord: hyphenated,
    };
  }

  /**
   * Polish compound prefixes (inherited Greek/Latin + Polish-specific).
   * Total: 32 base + 9 Polish = 41 prefixes (4+ chars only).
   *
   * Polish prefixes sorted by length (longest first) to ensure proper matching.
   */
  get compoundPrefixes(): string[] {
    return [
      ...BASE_LATIN_PREFIXES,
      // 6 chars
      'między',
      // 5 chars
      'współ', 'przed', 'ponad', 'spoza',
      // 4 chars
      'prze', 'przy', 'poza', 'pozo',
    ];
  }

  /** Polish caption keywords */
  readonly captionKeywords: string[] = [
    'Zdjęcie', 'Obraz', 'Fotografia', 'Figura', 'Wykres', 'Ilustracja',
    'Tabela', 'Diagram', 'Schemat',
  ];

  /** Polish PDF artifact patterns */
  readonly pdfArtifactPatterns: RegExp[] = [
    /^((Strona|Str\.)\s*)?\d+(\s*(z|\/)\s*\d+)?$/i, // "1", "Strona 1", "1 z 10", "Str. 5"
    /^-\s*\d+\s*-$/, // "- 1 -"
    /^\[\d+\]$/, // "[1]" standalone footnote refs
    /^(Figura|Fig\.|Tabela|Tab\.)(\s*\d+(\.\d+)?\.?)?$/i, // "Figura 1", "Tabela 2.1"
  ];
}

/** Singleton instance of the Polish adapter */
export const polishAdapter = new PolishAdapter();
