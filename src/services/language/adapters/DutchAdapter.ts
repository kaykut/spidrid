/**
 * Dutch Language Adapter
 *
 * Provides Dutch-specific text processing for RSVP reading.
 * Dutch (Nederlands) is spoken by 23M people in Netherlands, Belgium, Suriname.
 *
 * Key features:
 * - Inseparable prefixes: be-, ge-, ver-, ont-, her-, er-, mis-
 * - Separable prefixes: voor-, over-, onder-, uit-, aan-, mee-, etc.
 * - Rare accents in loanwords: á, é, ë, ï, ó, ö, ü
 * - TeX-based hyphenation via hyphen/nl
 */

// @ts-expect-error - hyphen package doesn't have type definitions
import hyphenNl from 'hyphen/nl';
import { HyphenationResult } from '../types';
import { BaseLatinAdapter, BASE_LATIN_PREFIXES } from './BaseLatinAdapter';

/** Soft hyphen character used by the hyphen library */
const SOFT_HYPHEN = '\u00AD';

export class DutchAdapter extends BaseLatinAdapter {
  readonly code = 'nl' as const;
  readonly name = 'Dutch';

  /**
   * Dutch letters including rare accents.
   * The ij digraph is not special-cased (processed as i + j).
   */
  readonly letterPattern: RegExp = /[a-zA-ZáàäéèëíìïóòöúùüÁÀÄÉÈËÍÌÏÓÒÖÚÙÜ]/;

  /**
   * Hyphenate a Dutch word using the TeX hyphenation patterns.
   */
  hyphenateSync(word: string): HyphenationResult {
    const hyphenated = hyphenNl.hyphenateSync(word);
    const syllables = hyphenated.split(SOFT_HYPHEN);

    return {
      syllables,
      hyphenatedWord: hyphenated,
    };
  }

  /**
   * Dutch compound prefixes (inherited + Dutch-specific).
   * Includes both inseparable (be-, ge-, ver-) and separable (voor-, over-) prefixes.
   * Total: 44 inherited + 23 Dutch-specific = 67 prefixes.
   */
  get compoundPrefixes(): string[] {
    return [
      ...BASE_LATIN_PREFIXES,
      // Dutch-specific prefixes (23 total), sorted by length (longest first)
      // 6 chars
      'tussen', 'buiten', 'binnen', 'achter',
      // 5 chars
      'tegen', 'onder', 'boven',
      // 4 chars
      'voor', 'over', 'door', 'rond',
      // 3 chars
      'ver', 'ont', 'her', 'bij', 'mee', 'uit', 'aan',
      // 2 chars (highly productive, protected by MIN_REMAINDER_LENGTH = 4)
      'be', 'ge', 'op', 'in', 'af',
    ];
  }

  /** Dutch caption keywords */
  readonly captionKeywords: string[] = [
    'Foto', 'Afbeelding', 'Figuur', 'Grafiek', 'Illustratie',
    'Tabel', 'Diagram', 'Schematisch',
  ];

  /** Dutch PDF artifact patterns */
  readonly pdfArtifactPatterns: RegExp[] = [
    /^(Pagina\s*)?\d+(\s*(van|\/)\s*\d+)?$/i, // "1", "Pagina 1", "1 van 10"
    /^-\s*\d+\s*-$/, // "- 1 -"
    /^\[\d+\]$/, // "[1]" standalone footnote refs
    /^(Figuur|Fig\.|Tabel|Tab\.)\s*\d+(\.\d+)?\.?$/i, // "Figuur 1", "Tabel 2.1"
  ];
}

/** Singleton instance of the Dutch adapter */
export const dutchAdapter = new DutchAdapter();
