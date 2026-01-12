/**
 * Syllable-aware word splitting for RSVP display.
 *
 * Uses a hybrid approach:
 * 1. Compound prefix detection (photo-, bio-, electro-, etc.)
 * 2. Balanced syllable splitting as fallback
 *
 * This ensures meaningful splits for compound/scientific words while
 * handling any word gracefully via hyphenation patterns.
 *
 * Processing happens during text processing (before playback) to avoid
 * any rendering delays during RSVP playback.
 */

// @ts-expect-error - hyphen package doesn't have type definitions
import hyphenEn from 'hyphen/en';

// Maximum characters per word chunk (Spritz uses 13)
const MAX_WORD_LENGTH = 13;

// Minimum remainder length after prefix split (avoid tiny trailing chunks)
const MIN_REMAINDER_LENGTH = 4;

// Soft hyphen character used by the hyphen library
const SOFT_HYPHEN = '\u00AD';

// Use synchronous hyphenation for text processing
const hyphenate = hyphenEn.hyphenateSync;

/**
 * Common compound word prefixes (Greek/Latin roots).
 * Sorted by length (longest first) to match most specific prefix.
 * These prefixes are largely universal across European languages.
 */
const COMPOUND_PREFIXES = [
  // 7+ chars
  'electro', 'counter',
  // 6 chars
  'pseudo', 'thermo', 'chrono',
  // 5 chars
  'photo', 'hydro', 'micro', 'macro', 'multi', 'ultra', 'super', 'trans', 'under', 'inter', 'intra',
  // 4 chars
  'anti', 'auto', 'semi', 'mono', 'poly', 'meta', 'para', 'over', 'mega', 'self', 'tele',
  // 3 chars
  'pre', 'pro', 'bio', 'geo', 'neo', 'sub', 'mis', 'non', 'out', 'tri',
];

/**
 * Extract syllables from a word using hyphenation patterns.
 *
 * @param word - The word to split into syllables
 * @returns Array of syllables
 *
 * @example
 * getSyllables('photosynthesis') // ['pho', 'to', 'syn', 'the', 'sis']
 */
export function getSyllables(word: string): string[] {
  // Strip punctuation for hyphenation, we'll handle it separately
  const punctuationMatch = word.match(/^([^a-zA-Z]*)([a-zA-Z]+)([^a-zA-Z]*)$/);

  if (!punctuationMatch) {
    // Word has no letters, return as-is
    return [word];
  }

  const [, leadingPunct, letters, trailingPunct] = punctuationMatch;

  // Hyphenate the letter portion
  const hyphenated = hyphenate(letters);
  const syllables = hyphenated.split(SOFT_HYPHEN);

  // Reattach punctuation to first and last syllables
  if (syllables.length > 0) {
    syllables[0] = leadingPunct + syllables[0];
    syllables[syllables.length - 1] = syllables[syllables.length - 1] + trailingPunct;
  }

  return syllables;
}

/**
 * Try to split a word at a compound prefix boundary.
 *
 * @param word - The word to potentially split
 * @param maxLength - Maximum characters per chunk
 * @returns Array of chunks if prefix found, null otherwise
 *
 * @example
 * tryPrefixSplit('photosynthesis', 13) // ['Photo-', 'synthesis']
 * tryPrefixSplit('electrocardiogram', 13) // ['Electro-', 'cardiogram']
 * tryPrefixSplit('running', 13) // null (no prefix match)
 */
function tryPrefixSplit(word: string, maxLength: number): string[] | null {
  const lowerWord = word.toLowerCase();

  for (const prefix of COMPOUND_PREFIXES) {
    if (lowerWord.startsWith(prefix)) {
      const remainder = word.slice(prefix.length);

      // Only split if:
      // 1. Remainder is meaningful (>= MIN_REMAINDER_LENGTH chars)
      // 2. Prefix + hyphen fits in maxLength
      if (remainder.length >= MIN_REMAINDER_LENGTH && prefix.length + 1 <= maxLength) {
        // Preserve original casing for the prefix portion
        const prefixChunk = `${word.slice(0, prefix.length)}-`;

        // Recursively split remainder if still too long
        if (remainder.length > maxLength) {
          return [prefixChunk, ...splitLongWord(remainder, maxLength)];
        }
        return [prefixChunk, remainder];
      }
    }
  }
  return null; // No prefix match
}

/**
 * Split a word into balanced chunks at syllable boundaries.
 *
 * Instead of maximizing the first chunk, this creates roughly equal-sized
 * chunks for better readability.
 *
 * @param word - Original word (for length calculations)
 * @param syllables - Pre-computed syllables
 * @param maxLength - Maximum characters per chunk
 * @returns Array of balanced chunks
 */
function balancedSyllableSplit(word: string, syllables: string[], maxLength: number): string[] {
  // Calculate target chunk size for balanced split
  const numChunks = Math.ceil(word.length / maxLength);
  const targetSize = Math.ceil(word.length / numChunks);

  const chunks: string[] = [];
  let currentChunk = '';
  let currentLength = 0;

  for (let i = 0; i < syllables.length; i++) {
    const syllable = syllables[i];
    const isLastSyllable = i === syllables.length - 1;
    const newLength = currentLength + syllable.length;

    // Decision: should we start a new chunk?
    // - If adding this syllable exceeds maxLength, yes
    // - If we're past target and this is a good break point, yes
    const exceedsMax = newLength + (isLastSyllable ? 0 : 1) > maxLength;
    const pastTarget = currentLength >= targetSize && currentLength > 0;

    if (exceedsMax || (pastTarget && !isLastSyllable)) {
      if (currentChunk) {
        chunks.push(`${currentChunk}-`);
      }
      currentChunk = syllable;
      currentLength = syllable.length;
    } else {
      currentChunk += syllable;
      currentLength = newLength;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

/**
 * Split a long word into display-friendly chunks.
 *
 * Uses a hybrid approach:
 * 1. First tries compound prefix detection (photo-, bio-, electro-, etc.)
 * 2. Falls back to balanced syllable splitting
 *
 * @param word - The word to potentially split
 * @param maxLength - Maximum characters per chunk (default: 13)
 * @returns Array of word chunks (may be single element if word is short)
 *
 * @example
 * splitLongWord('the') // ['the']
 * splitLongWord('photosynthesis') // ['Photo-', 'synthesis']
 * splitLongWord('electrocardiogram') // ['Electro-', 'cardiogram']
 * splitLongWord('incomprehensibilities') // ['Incom-', 'prehen-', 'sibilities']
 */
export function splitLongWord(word: string, maxLength: number = MAX_WORD_LENGTH): string[] {
  // Short words don't need splitting
  if (word.length <= maxLength) {
    return [word];
  }

  // 1. First try compound prefix detection
  const prefixSplit = tryPrefixSplit(word, maxLength);
  if (prefixSplit) {
    return prefixSplit;
  }

  // 2. Get syllables for balanced splitting
  const syllables = getSyllables(word);

  // If we couldn't get syllables (rare), fall back to character-based split
  if (syllables.length <= 1) {
    return fallbackSplit(word, maxLength);
  }

  // 3. Use balanced syllable splitting
  return balancedSyllableSplit(word, syllables, maxLength);
}

/**
 * Fallback character-based split for words without syllable data.
 */
function fallbackSplit(word: string, maxLength: number): string[] {
  const chunks: string[] = [];
  let remaining = word;

  while (remaining.length > maxLength) {
    // Split at maxLength - 1 to leave room for hyphen
    chunks.push(`${remaining.slice(0, maxLength - 1)}-`);
    remaining = remaining.slice(maxLength - 1);
  }

  if (remaining) {
    chunks.push(remaining);
  }

  return chunks;
}

/**
 * Check if a word needs splitting for RSVP display.
 */
export function needsSplitting(word: string, maxLength: number = MAX_WORD_LENGTH): boolean {
  return word.length > maxLength;
}

/**
 * The maximum word length before splitting is applied.
 * Exported for use in tests and configuration.
 */
export const DEFAULT_MAX_WORD_LENGTH = MAX_WORD_LENGTH;
