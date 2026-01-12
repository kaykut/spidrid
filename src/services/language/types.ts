/**
 * Language Adapter Type Definitions
 *
 * Defines the interface for language-specific text processing adapters.
 * Each adapter encapsulates all language-dependent operations for RSVP reading:
 * hyphenation, punctuation detection, caption filtering, and entity decoding.
 */

/**
 * Supported language codes.
 * Currently limited to Latin-script languages that share similar processing patterns.
 */
export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it';

/**
 * Result of hyphenating a word into syllables.
 */
export interface HyphenationResult {
  /** Array of syllable strings */
  syllables: string[];
  /** The word with soft hyphens inserted at syllable boundaries */
  hyphenatedWord: string;
}

/**
 * Language Adapter Interface
 *
 * Captures all language-dependent operations needed for RSVP reading.
 * Implementations provide language-specific patterns and hyphenation.
 */
export interface LanguageAdapter {
  /** ISO 639-1 language code */
  readonly code: SupportedLanguage;

  /** Human-readable language name */
  readonly name: string;

  // Tokenization patterns

  /** Pattern for splitting text into words (typically whitespace) */
  readonly wordSplitPattern: RegExp;

  /** Pattern for detecting paragraph boundaries */
  readonly paragraphPattern: RegExp;

  /** Pattern matching valid letters in this language */
  readonly letterPattern: RegExp;

  // Hyphenation

  /**
   * Synchronously hyphenate a word into syllables.
   * @param word - The word to hyphenate
   * @returns HyphenationResult with syllables array and hyphenated word
   */
  hyphenateSync(word: string): HyphenationResult;

  /** Common compound word prefixes (Greek/Latin roots) */
  readonly compoundPrefixes: string[];

  // Punctuation detection

  /** Pattern matching sentence-ending punctuation */
  readonly sentenceEndPattern: RegExp;

  /** Pattern matching clause-breaking punctuation */
  readonly clauseBreakPattern: RegExp;

  /** Optional pattern for sentence-starting punctuation (e.g., ¿¡ in Spanish) */
  readonly sentenceStartPattern?: RegExp;

  // Content filtering keywords

  /** Keywords indicating photo/image captions (e.g., "Photo", "Image") */
  readonly captionKeywords: string[];

  /** Keywords indicating attribution lines (e.g., "Credit", "Source") */
  readonly attributionKeywords: string[];

  /** Stock photo agency names for filtering */
  readonly stockAgencies: string[];

  /** Regex patterns for PDF-specific artifacts (e.g., page numbers) */
  readonly pdfArtifactPatterns: RegExp[];

  // HTML entity handling

  /** Map of HTML entity names to their Unicode replacements */
  readonly htmlEntityMap: Record<string, string>;

  /** Map of quotation-related entities to normalized quotes */
  readonly quotationEntities: Record<string, string>;

  // Character validation

  /** Pattern matching a valid word (letters, possibly with punctuation) */
  readonly validWordPattern: RegExp;

  /** Pattern matching word-boundary hyphens (for PDF line-break repair) */
  readonly wordBoundaryHyphenPattern: RegExp;
}
