/**
 * Czech Language Adapter
 *
 * Provides Czech-specific text processing for RSVP reading.
 * West Slavic language with 10.7 million speakers.
 */

// @ts-expect-error - hyphen package doesn't have type definitions
import hyphenCs from 'hyphen/cs';
import { HyphenationResult } from '../types';
import { BaseLatinAdapter, BASE_LATIN_PREFIXES } from './BaseLatinAdapter';

/** Soft hyphen character used by the hyphen library */
const SOFT_HYPHEN = '\u00AD';

/**
 * Czech Language Adapter
 *
 * Uses the hyphen/cs library for syllable detection and provides
 * Czech-specific patterns for caption filtering and text processing.
 * Includes support for Czech special characters: á, č, ď, é, ě, í, ň, ó, ř, š, ť, ú, ů, ý, ž.
 */
export class CzechAdapter extends BaseLatinAdapter {
  readonly code = 'cs' as const;
  readonly name = 'Czech';

  /** Czech letters including special characters */
  readonly letterPattern: RegExp = /[a-zA-ZáčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/;

  /**
   * Hyphenate a word using the Czech hyphenation library.
   */
  hyphenateSync(word: string): HyphenationResult {
    const hyphenated = hyphenCs.hyphenateSync(word);
    const syllables = hyphenated.split(SOFT_HYPHEN);

    return {
      syllables,
      hyphenatedWord: hyphenated,
    };
  }

  /**
   * Czech compound prefixes (inherited Greek/Latin + Czech-specific).
   * Total: 44 base + 22 Czech = 66 prefixes.
   *
   * Czech prefixes sorted by length (longest first) to ensure proper matching.
   */
  get compoundPrefixes(): string[] {
    return [
      ...BASE_LATIN_PREFIXES,
      // 6 chars
      'spolu', 'mimo',
      // 5 chars
      'zpět',
      // 4 chars
      'před', 'mezi', 'skrz', 'vůči', 'přes',
      // 3 chars
      'pod', 'nad', 'pro', 'bez', 'roz', 'nej', 'při', 'pře', 'pre',
      // 2 chars
      'na', 'ne', 'po', 'do', 'od', 'ob', 'za',
    ];
  }

  /** Czech caption keywords */
  readonly captionKeywords: string[] = [
    'Foto', 'Obrázek', 'Fotografie', 'Figura', 'Graf', 'Ilustrace',
    'Tabulka', 'Diagram', 'Schéma',
  ];

  /** Czech PDF artifact patterns */
  readonly pdfArtifactPatterns: RegExp[] = [
    /^((Strana|Str\.)\s*)?\d+(\s*(z|\/)\s*\d+)?$/i, // "1", "Strana 1", "1 z 10", "Str. 5"
    /^-\s*\d+\s*-$/, // "- 1 -"
    /^\[\d+\]$/, // "[1]" standalone footnote refs
    /^(Figura|Fig\.|Tabulka|Tab\.)(\s*\d+(\.\d+)?\.?)?$/i, // "Figura 1", "Tabulka 2.1"
  ];
}

/** Singleton instance of the Czech adapter */
export const czechAdapter = new CzechAdapter();
