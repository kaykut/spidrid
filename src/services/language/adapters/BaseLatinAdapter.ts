/**
 * Base Latin Adapter
 *
 * Abstract base class providing shared defaults for Latin-script languages.
 * Child classes override specific properties for their language.
 */

import { LanguageAdapter, SupportedLanguage, HyphenationResult } from '../types';

/**
 * Shared defaults for all Latin-script languages.
 * These patterns and values are largely universal across European languages.
 */
export abstract class BaseLatinAdapter implements LanguageAdapter {
  abstract readonly code: SupportedLanguage;
  abstract readonly name: string;

  // Tokenization patterns - shared across Latin languages

  /** Split on whitespace */
  readonly wordSplitPattern: RegExp = /\s+/;

  /** Double newline indicates paragraph boundary */
  readonly paragraphPattern: RegExp = /\n\s*\n/;

  /** Override in subclasses for language-specific letters */
  abstract readonly letterPattern: RegExp;

  // Hyphenation - must be implemented by each language

  abstract hyphenateSync(word: string): HyphenationResult;

  /**
   * Common compound word prefixes (Greek/Latin roots).
   * These are largely universal across European languages.
   * Sorted by length (longest first) to match most specific prefix.
   * Total: 46 prefixes (expanded from 32 to handle more long words)
   */
  readonly compoundPrefixes: string[] = [
    // 7+ chars
    'electro', 'counter',
    // 6 chars
    'pseudo', 'thermo', 'chrono', 'hetero',
    // 5 chars
    'photo', 'hydro', 'micro', 'macro', 'multi', 'ultra', 'super', 'trans', 'under', 'inter', 'intra', 'proto', 'retro',
    // 4 chars
    'anti', 'auto', 'semi', 'mono', 'poly', 'meta', 'para', 'over', 'mega', 'self', 'tele', 'homo', 'omni',
    // 3 chars
    'pre', 'pro', 'bio', 'geo', 'neo', 'sub', 'mis', 'non', 'out', 'tri', 'iso', 'pan',
  ];

  // Punctuation detection - shared across Latin languages

  /** Standard sentence-ending punctuation */
  readonly sentenceEndPattern: RegExp = /[.!?]$/;

  /** Standard clause-breaking punctuation */
  readonly clauseBreakPattern: RegExp = /[,;:]$/;

  /** Override in subclasses if needed (e.g., Spanish ¿¡) */
  readonly sentenceStartPattern?: RegExp = undefined;

  // Content filtering - override captionKeywords in subclasses

  abstract readonly captionKeywords: string[];

  /** Attribution keywords are largely English-based (used internationally) */
  readonly attributionKeywords: string[] = [
    'Credit', 'Source', 'Caption', '©',
  ];

  /** International stock photo agencies */
  readonly stockAgencies: string[] = [
    'Getty', 'Reuters', 'AP Photo', 'AFP', 'Bloomberg',
    'Shutterstock', 'Unsplash', 'iStock', 'Alamy', 'PA Images', 'EPA',
  ];

  /** PDF artifact patterns - override in subclasses for language-specific labels */
  abstract readonly pdfArtifactPatterns: RegExp[];

  // HTML entity handling - shared across all languages

  readonly htmlEntityMap: Record<string, string> = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&mdash;': '—',
    '&ndash;': '–',
    '&hellip;': '...',
  };

  readonly quotationEntities: Record<string, string> = {
    '&rsquo;': "'",
    '&lsquo;': "'",
    '&rdquo;': '"',
    '&ldquo;': '"',
  };

  // Character validation

  /** Pattern matching valid words - override for language-specific letters */
  get validWordPattern(): RegExp {
    return new RegExp(`^[^${this.letterPattern.source}]*(${this.letterPattern.source}+)[^${this.letterPattern.source}]*$`);
  }

  /** Pattern for word-boundary hyphens (PDF line-break repair) */
  readonly wordBoundaryHyphenPattern: RegExp = /(\w)-\n(\w)/g;
}
