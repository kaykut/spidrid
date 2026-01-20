/**
 * Romanian Language Adapter
 *
 * Provides Romanian-specific text processing for RSVP reading.
 * Romance language with 24 million speakers.
 */

// @ts-expect-error - hyphen package doesn't have type definitions
import hyphenRo from 'hyphen/ro';
import { HyphenationResult } from '../types';
import { BaseLatinAdapter, BASE_LATIN_PREFIXES } from './BaseLatinAdapter';

/** Soft hyphen character used by the hyphen library */
const SOFT_HYPHEN = '\u00AD';

/**
 * Romanian Language Adapter
 *
 * Uses the hyphen/ro library for syllable detection and provides
 * Romanian-specific patterns for caption filtering and text processing.
 * Includes support for Romanian special characters: ă, â, î, ș, ț.
 */
export class RomanianAdapter extends BaseLatinAdapter {
  readonly code = 'ro' as const;
  readonly name = 'Romanian';

  /** Romanian letters including special characters */
  readonly letterPattern: RegExp = /[a-zA-ZăâîșțĂÂÎȘȚ]/;

  /**
   * Hyphenate a word using the Romanian hyphenation library.
   */
  hyphenateSync(word: string): HyphenationResult {
    const hyphenated = hyphenRo.hyphenateSync(word);
    const syllables = hyphenated.split(SOFT_HYPHEN);

    return {
      syllables,
      hyphenatedWord: hyphenated,
    };
  }

  /**
   * Romanian compound prefixes (inherited Greek/Latin + Romanian-specific).
   * Total: 44 base + 15 Romanian = 59 prefixes.
   *
   * Romanian prefixes sorted by length (longest first) to ensure proper matching.
   */
  get compoundPrefixes(): string[] {
    return [
      ...BASE_LATIN_PREFIXES,
      // 6 chars
      'împre',
      // 5 chars
      'supra', 'dintre',
      // 4 chars
      'prea',
      // 3 chars
      'sub', 'des', 'pre', 'con',
      // 2 chars
      'ne', 're', 'co', 'în', 'de', 'pe',
    ];
  }

  /** Romanian caption keywords */
  readonly captionKeywords: string[] = [
    'Fotografie', 'Imagine', 'Figură', 'Grafic', 'Ilustrație',
    'Tabel', 'Diagramă', 'Schemă',
  ];

  /** Romanian PDF artifact patterns */
  readonly pdfArtifactPatterns: RegExp[] = [
    /^((Pagina|Pag\.)\s*)?\d+(\s*(din|\/)\s*\d+)?$/i, // "1", "Pagina 1", "1 din 10", "Pag. 5"
    /^-\s*\d+\s*-$/, // "- 1 -"
    /^\[\d+\]$/, // "[1]" standalone footnote refs
    /^(Figura|Fig\.|Tabel|Tab\.)(\s*\d+(\.\d+)?\.?)?$/i, // "Figura 1", "Tabel 2.1"
  ];
}

/** Singleton instance of the Romanian adapter */
export const romanianAdapter = new RomanianAdapter();
