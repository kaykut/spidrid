/**
 * Spanish Language Adapter
 *
 * Provides Spanish-specific text processing for RSVP reading.
 */

// @ts-expect-error - hyphen package doesn't have type definitions
import hyphenEs from 'hyphen/es';
import { HyphenationResult } from '../types';
import { BaseLatinAdapter } from './BaseLatinAdapter';

/** Soft hyphen character used by the hyphen library */
const SOFT_HYPHEN = '\u00AD';

/**
 * Spanish Language Adapter
 *
 * Uses the hyphen/es library for syllable detection and provides
 * Spanish-specific patterns for caption filtering and text processing.
 * Includes support for ñ, accented vowels, and inverted punctuation (¿¡).
 */
export class SpanishAdapter extends BaseLatinAdapter {
  readonly code = 'es' as const;
  readonly name = 'Spanish';

  /** Spanish letters including ñ and accented vowels */
  readonly letterPattern: RegExp = /[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/;

  /**
   * Hyphenate a word using the Spanish hyphenation library.
   */
  hyphenateSync(word: string): HyphenationResult {
    const hyphenated = hyphenEs.hyphenateSync(word);
    const syllables = hyphenated.split(SOFT_HYPHEN);

    return {
      syllables,
      hyphenatedWord: hyphenated,
    };
  }

  /** Optional pattern for inverted question/exclamation marks */
  readonly sentenceStartPattern: RegExp = /^[¿¡]/;

  /** Spanish caption keywords */
  readonly captionKeywords: string[] = [
    'Foto', 'Imagen', 'Fotografía', 'Figura', 'Gráfico', 'Ilustración',
    'Cuadro', 'Diagrama',
  ];

  /** Spanish PDF artifact patterns */
  readonly pdfArtifactPatterns: RegExp[] = [
    /^(Página\s*)?\d+(\s*(de|\/)\s*\d+)?$/i, // "1", "Página 1", "1 de 10"
    /^-\s*\d+\s*-$/, // "- 1 -"
    /^\[\d+\]$/, // "[1]" standalone footnote refs
    /^(Figura|Fig\.|Tabla|Tab\.)\s*\d+(\.\d+)?\.?$/i, // "Figura 1" standalone
  ];
}

/** Singleton instance of the Spanish adapter */
export const spanishAdapter = new SpanishAdapter();
