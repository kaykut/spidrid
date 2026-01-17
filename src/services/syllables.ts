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

import { getCurrentAdapter } from './language';
import { LanguageAdapter } from './language/types';

// Maximum characters per word chunk before hyphenation (updated from 13 to 22)
const MAX_WORD_LENGTH = 22;

// Minimum remainder length after prefix split (avoid tiny trailing chunks)
const MIN_REMAINDER_LENGTH = 4;

/**
 * Build a regex pattern that matches: leading non-letters, letters, trailing non-letters.
 * Uses the adapter's letterPattern to determine what counts as a letter.
 */
function buildPunctuationPattern(adapter: LanguageAdapter): RegExp {
  // Extract the character class content from letterPattern (e.g., "a-zA-Z" from /[a-zA-Z]/)
  const letterSource = adapter.letterPattern.source;
  // Build pattern: ^([^letters]*)(letters+)([^letters]*)$
  return new RegExp(`^([^${letterSource}]*)([${letterSource}]+)([^${letterSource}]*)$`);
}

/**
 * Extract syllables from a word using hyphenation patterns.
 *
 * @param word - The word to split into syllables
 * @param adapter - Language adapter to use (defaults to current language setting)
 * @returns Array of syllables
 *
 * @example
 * getSyllables('photosynthesis') // ['pho', 'to', 'syn', 'the', 'sis']
 */
export function getSyllables(word: string, adapter: LanguageAdapter = getCurrentAdapter()): string[] {
  // Strip punctuation for hyphenation, we'll handle it separately
  const punctuationPattern = buildPunctuationPattern(adapter);
  const punctuationMatch = word.match(punctuationPattern);

  if (!punctuationMatch) {
    // Word has no letters, return as-is
    return [word];
  }

  const [, leadingPunct, letters, trailingPunct] = punctuationMatch;

  // Hyphenate the letter portion using the adapter
  const result = adapter.hyphenateSync(letters);
  const syllables = result.syllables;

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
 * @param adapter - Language adapter for prefixes
 * @returns Array of chunks if prefix found, null otherwise
 *
 * @example
 * tryPrefixSplit('photosynthesis', 13) // ['Photo-', 'synthesis']
 * tryPrefixSplit('electrocardiogram', 13) // ['Electro-', 'cardiogram']
 * tryPrefixSplit('running', 13) // null (no prefix match)
 */
function tryPrefixSplit(
  word: string,
  maxLength: number,
  adapter: LanguageAdapter
): string[] | null {
  const lowerWord = word.toLowerCase();

  for (const prefix of adapter.compoundPrefixes) {
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
          return [prefixChunk, ...splitLongWord(remainder, maxLength, adapter)];
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
 * Split word into chunks at syllable boundary closest to middle.
 *
 * After prefix removal, this finds the syllable break closest to the
 * midpoint of the remaining portion for optimal balance.
 *
 * Enforces minimum chunk size of 3 chars (non-greedy requirement).
 *
 * @param word - Original word (for length calculations)
 * @param syllables - Pre-computed syllables
 * @param maxLength - Maximum characters per chunk
 * @returns Array of balanced chunks
 */
function middleSyllableSplit(
  word: string,
  syllables: string[],
  maxLength: number
): string[] {
  const midpoint = word.length / 2;
  let closestToMidIndex = 0;
  let closestToMidDist = Infinity;

  // Find syllable boundary closest to midpoint
  for (let i = 0; i < syllables.length - 1; i++) {
    const lengthUpToHere = syllables.slice(0, i + 1).join('').length;
    const distanceToMid = Math.abs(lengthUpToHere - midpoint);

    // Only consider if it creates valid chunks (>= 3 chars each)
    const firstPartLength = lengthUpToHere;
    const secondPartLength = word.length - lengthUpToHere;

    if (firstPartLength >= 3 && secondPartLength >= 3 && distanceToMid < closestToMidDist) {
      closestToMidIndex = i;
      closestToMidDist = distanceToMid;
    }
  }

  // Split at the optimal point
  if (closestToMidIndex > 0) {
    const firstPart = syllables.slice(0, closestToMidIndex + 1).join('');
    const secondPart = syllables.slice(closestToMidIndex + 1).join('');

    // Check if second part needs further splitting
    if (secondPart.length > maxLength) {
      return [
        `${firstPart}-`,
        ...splitLongWord(secondPart, maxLength, getCurrentAdapter())
      ];
    }

    return [`${firstPart}-`, secondPart];
  }

  // Fallback to balanced split if middle split fails
  return balancedSyllableSplit(word, syllables, maxLength);
}

/**
 * Split a long word into display-friendly chunks.
 *
 * Uses a hybrid approach:
 * 1. First tries compound prefix detection (photo-, bio-, electro-, etc.)
 * 2. Falls back to middle syllable splitting (splits post-prefix near midpoint)
 *
 * @param word - The word to potentially split
 * @param maxLength - Maximum characters per chunk (default: 22)
 * @param adapter - Language adapter to use (defaults to current language setting)
 * @returns Array of word chunks (may be single element if word is short)
 *
 * @example
 * splitLongWord('the') // ['the']
 * splitLongWord('photosynthesis') // ['Photo-', 'synthesis']
 * splitLongWord('electrocardiogram') // ['Electro-', 'cardiogram']
 * splitLongWord('counterrevolutionaries') // ['Counter-', 'revolutionaries'] or similar
 */
export function splitLongWord(
  word: string,
  maxLength: number = MAX_WORD_LENGTH,
  adapter: LanguageAdapter = getCurrentAdapter()
): string[] {
  // Short words don't need splitting
  if (word.length <= maxLength) {
    return [word];
  }

  // 1. First try compound prefix detection
  const prefixSplit = tryPrefixSplit(word, maxLength, adapter);
  if (prefixSplit) {
    return prefixSplit;
  }

  // 2. Get syllables for middle splitting
  const syllables = getSyllables(word, adapter);

  // If we couldn't get syllables (rare), fall back to character-based split
  if (syllables.length <= 1) {
    return fallbackSplit(word, maxLength);
  }

  // 3. Use middle syllable splitting (NEW)
  return middleSyllableSplit(word, syllables, maxLength);
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
