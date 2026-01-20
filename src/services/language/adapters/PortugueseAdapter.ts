/**
 * Portuguese Language Adapter
 *
 * Provides Portuguese-specific text processing for RSVP reading.
 */

// @ts-expect-error - hyphen package doesn't have type definitions
import hyphenPt from 'hyphen/pt';
import { HyphenationResult } from '../types';
import { BaseLatinAdapter, BASE_LATIN_PREFIXES } from './BaseLatinAdapter';

/** Soft hyphen character used by the hyphen library */
const SOFT_HYPHEN = '\u00AD';

/**
 * Portuguese Language Adapter
 *
 * Uses the hyphen/pt library for syllable detection and provides
 * Portuguese-specific patterns for caption filtering and text processing.
 * Includes support for ã, õ, ç, and various accented characters.
 */
export class PortugueseAdapter extends BaseLatinAdapter {
  readonly code = 'pt' as const;
  readonly name = 'Portuguese';

  /** Portuguese letters including ã, õ, ç, and accented characters */
  readonly letterPattern: RegExp = /[a-zA-ZáàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]/;

  /** Portuguese compound prefixes (inherited + Portuguese-specific) */
  get compoundPrefixes(): string[] {
    return [
      ...BASE_LATIN_PREFIXES, // Inherit Greek/Latin prefixes
      // Portuguese-specific prefixes (10 total), sorted by length (longest first)
      'contra', 'sobre', 'entre', 'infra', 'extra', 'ante', 'após', 'des', 'pós', 'pré',
    ];
  }

  /**
   * Hyphenate a word using the Portuguese hyphenation library.
   */
  hyphenateSync(word: string): HyphenationResult {
    const hyphenated = hyphenPt.hyphenateSync(word);
    const syllables = hyphenated.split(SOFT_HYPHEN);

    return {
      syllables,
      hyphenatedWord: hyphenated,
    };
  }

  /** Portuguese caption keywords */
  readonly captionKeywords: string[] = [
    'Foto', 'Imagem', 'Fotografia', 'Figura', 'Gráfico', 'Ilustração',
    'Quadro', 'Diagrama',
  ];

  /** Portuguese PDF artifact patterns */
  readonly pdfArtifactPatterns: RegExp[] = [
    /^(Página\s*)?\d+(\s*(de|\/)\s*\d+)?$/i, // "1", "Página 1", "1 de 10"
    /^-\s*\d+\s*-$/, // "- 1 -"
    /^\[\d+\]$/, // "[1]" standalone footnote refs
    /^(Figura|Fig\.|Tabela|Tab\.)\s*\d+(\.\d+)?\.?$/i, // "Figura 1" standalone
  ];
}

/** Singleton instance of the Portuguese adapter */
export const portugueseAdapter = new PortugueseAdapter();
