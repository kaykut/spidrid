/**
 * Turkish Language Adapter
 *
 * Provides Turkish-specific text processing for RSVP reading.
 * Handles Turkish's unique vowel harmony, agglutinative morphology,
 * and special characters (ç, ğ, ı, ö, ş, ü).
 */

// @ts-expect-error - hyphen package doesn't have type definitions
import hyphenTr from 'hyphen/tr';
import { HyphenationResult } from '../types';
import { BaseLatinAdapter } from './BaseLatinAdapter';

/** Soft hyphen character used by the hyphen library */
const SOFT_HYPHEN = '\u00AD';

/**
 * Turkish Language Adapter
 *
 * Uses the hyphen/tr library for syllable detection and provides
 * Turkish-specific patterns for caption filtering and text processing.
 *
 * Turkish alphabet specifics:
 * - Has dotless i (ı) and dotted İ (uppercase)
 * - Has soft g (ğ) which lengthens preceding vowel
 * - Has ç, ş (cedilla variants)
 * - Has ö, ü (umlauted vowels)
 */
export class TurkishAdapter extends BaseLatinAdapter {
  readonly code = 'tr' as const;
  readonly name = 'Turkish';

  /**
   * Turkish letters including special characters.
   * Note: ı (dotless i) and İ (dotted I) are distinct from i and I.
   */
  readonly letterPattern: RegExp = /[a-zA-ZçÇğĞıİöÖşŞüÜ]/;

  /**
   * Hyphenate a word using the Turkish hyphenation library.
   * Turkish follows regular syllable patterns based on vowel harmony.
   */
  hyphenateSync(word: string): HyphenationResult {
    const hyphenated = hyphenTr.hyphenateSync(word);
    const syllables = hyphenated.split(SOFT_HYPHEN);

    return {
      syllables,
      hyphenatedWord: hyphenated,
    };
  }

  /**
   * Compound prefixes: Inherits BASE_LATIN_PREFIXES from BaseLatinAdapter.
   * Turkish uses many loanwords with Greek/Latin prefixes.
   * Total: 32 Greek/Latin prefixes (4+ chars only).
   *
   * NOTE: Does NOT override compoundPrefixes getter - uses base implementation.
   */

  /** Turkish caption keywords */
  readonly captionKeywords: string[] = [
    'Fotoğraf', 'Resim', 'Görsel', 'Görüntü', 'İmaj',
    'Şekil', 'Figür', 'Tablo', 'Grafik', 'Diyagram', 'Çizim',
  ];

  /** Turkish PDF artifact patterns */
  readonly pdfArtifactPatterns: RegExp[] = [
    /^(Sayfa\s*)?\d+(\s*(\/|of)\s*\d+)?$/i, // "1", "Sayfa 1", "1/10"
    /^-\s*\d+\s*-$/, // "- 1 -"
    /^\[\d+\]$/, // "[1]" standalone footnote refs
    /^(Şekil|Tablo|Grafik)\s*\d+(\.\d+)?\.?$/i, // "Şekil 1", "Tablo 2.1"
  ];
}

/** Singleton instance of the Turkish adapter */
export const turkishAdapter = new TurkishAdapter();
