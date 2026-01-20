/**
 * Generic Language Adapter
 *
 * Fallback adapter for unsupported languages.
 * Returns whole words without hyphenation to avoid incorrect splits.
 */

import { BaseLatinAdapter } from './BaseLatinAdapter';
import { HyphenationResult } from '../types';

/**
 * Generic adapter that disables hyphenation.
 * Used as fallback when language is unsupported or undetectable.
 */
export class GenericAdapter extends BaseLatinAdapter {
  readonly code = 'en' as const; // Type constraint satisfaction
  readonly name = 'Generic (No Hyphenation)';
  readonly letterPattern = /[a-zA-Z]/;
  readonly captionKeywords: string[] = [];
  readonly pdfArtifactPatterns: RegExp[] = [];

  /**
   * Return whole word as single syllable (no splitting).
   * This prevents incorrect hyphenation for unsupported languages.
   */
  hyphenateSync(word: string): HyphenationResult {
    return {
      syllables: [word],
      hyphenatedWord: word,
    };
  }

  /**
   * Compound prefixes: Inherits BASE_LATIN_PREFIXES from BaseLatinAdapter.
   * No language-specific prefixes added (generic fallback).
   * Total: 32 Greek/Latin prefixes (4+ chars only).
   *
   * NOTE: Does NOT override compoundPrefixes getter - uses base implementation.
   */
}

export const genericAdapter = new GenericAdapter();
