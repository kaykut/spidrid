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
import { estimateTextWidth, getMaxAfterWidth } from './fontMetrics';
import { RSVP_DISPLAY } from '../constants/typography';

// Maximum characters per word chunk (Spritz uses 13)
const MAX_WORD_LENGTH = 13;

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
 * Width-aware syllable splitting that considers actual rendered width and ORP position.
 *
 * Instead of greedy character packing, this:
 * 1. Tries to fit the whole word in one chunk if possible
 * 2. If not, finds the optimal split point that minimizes chunks
 * 3. Ensures each chunk's "after ORP" portion fits in available width
 * 4. Prefers balanced splits over head-heavy splits
 *
 * @param word - Original word (for ORP calculation)
 * @param syllables - Pre-computed syllables
 * @param fontSize - Font size in points
 * @param fontFamily - Font family name
 * @param screenWidth - Screen width in pixels
 * @returns Array of width-aware chunks
 */
function widthAwareSyllableSplit(
  word: string,
  syllables: string[],
  fontSize: number,
  fontFamily: string,
  screenWidth: number
): string[] {
  const { calculateORP } = require('./orp');

  // Helper: Check if a chunk's "after ORP" portion fits in available width
  const chunkFitsWidth = (chunkText: string): boolean => {
    const orpIndex = calculateORP(chunkText);
    const afterText = chunkText.slice(orpIndex + 1);

    if (afterText.length === 0) return true;

    const afterWidth = estimateTextWidth(afterText, fontSize, fontFamily);
    if (afterWidth === undefined) {
      // Fallback: use conservative character count
      return afterText.length <= 7;
    }

    const maxWidth = getMaxAfterWidth(screenWidth);
    return afterWidth <= maxWidth;
  };

  // Try to fit the whole word (no split)
  if (chunkFitsWidth(word)) {
    console.log('[widthAwareSyllableSplit]', word, '→ fits without split');
    return [word];
  }

  console.log('[widthAwareSyllableSplit]', word, '→ needs splitting, syllables:', syllables);

  // Find optimal split point
  // Strategy: Try splits at each syllable boundary, prefer earliest split that works
  for (let splitIndex = 1; splitIndex < syllables.length; splitIndex++) {
    const firstChunk = syllables.slice(0, splitIndex).join('');
    const remainder = syllables.slice(splitIndex).join('');

    // Check if first chunk fits
    if (!chunkFitsWidth(firstChunk)) {
      continue; // Split too late, first chunk already too big
    }

    // Check if remainder fits (recursively if needed)
    if (chunkFitsWidth(remainder)) {
      // Success! This is our optimal split
      console.log('[widthAwareSyllableSplit]', word, '→ optimal split:', [firstChunk, remainder], 'at syllable', splitIndex);
      return [`${firstChunk}-`, remainder];
    }

    // Remainder still too big, need to split it further
    if (splitIndex < syllables.length - 1) {
      // Try recursive split on remainder
      const remainderSyllables = syllables.slice(splitIndex);
      const remainderChunks = widthAwareSyllableSplit(
        remainder,
        remainderSyllables,
        fontSize,
        fontFamily,
        screenWidth
      );

      // Check if ALL remainder chunks fit
      const allChunksFit = remainderChunks.every(chunk => {
        // Remove trailing hyphen for width check
        const cleanChunk = chunk.replace(/-$/, '');
        return chunkFitsWidth(cleanChunk);
      });

      if (allChunksFit) {
        console.log('[widthAwareSyllableSplit]', word, '→ multi-split:', [firstChunk, ...remainderChunks], 'at syllable', splitIndex);
        return [`${firstChunk}-`, ...remainderChunks];
      }
    }
  }

  // Fallback: couldn't find a good split, use conservative approach
  // Split at halfway point syllable-wise
  const midPoint = Math.floor(syllables.length / 2);
  const firstHalf = syllables.slice(0, midPoint).join('');
  const secondHalf = syllables.slice(midPoint).join('');

  console.warn('[widthAwareSyllableSplit] Could not find optimal split for:', word, '→ using midpoint fallback');
  return [`${firstHalf}-`, secondHalf];
}

/**
 * Split a word into balanced chunks at syllable boundaries.
 *
 * Instead of maximizing the first chunk, this creates roughly equal-sized
 * chunks for better readability.
 *
 * DEPRECATED: Use widthAwareSyllableSplit for better results.
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
 * 2. Falls back to width-aware syllable splitting
 *
 * @param word - The word to potentially split
 * @param maxLength - Maximum characters per chunk (default: 13, used for prefix detection only)
 * @param adapter - Language adapter to use (defaults to current language setting)
 * @param fontSize - Font size in points (for width-aware splitting)
 * @param fontFamily - Font family name (for width-aware splitting)
 * @param screenWidth - Screen width in pixels (for width-aware splitting)
 * @returns Array of word chunks (may be single element if word is short)
 *
 * @example
 * splitLongWord('the') // ['the']
 * splitLongWord('photosynthesis') // ['Photo-', 'synthesis']
 * splitLongWord('electrocardiogram') // ['Electro-', 'cardiogram']
 * splitLongWord('telecommunications', undefined, undefined, 48, 'System', 390) // ['Telecom-', 'munications']
 */
export function splitLongWord(
  word: string,
  maxLength: number = MAX_WORD_LENGTH,
  adapter: LanguageAdapter = getCurrentAdapter(),
  fontSize?: number,
  fontFamily?: string,
  screenWidth?: number
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

  // 2. Get syllables for splitting
  const syllables = getSyllables(word, adapter);

  // If we couldn't get syllables (rare), fall back to character-based split
  if (syllables.length <= 1) {
    return fallbackSplit(word, maxLength);
  }

  // 3. Use width-aware splitting if we have the necessary parameters
  if (fontSize && fontFamily && screenWidth) {
    return widthAwareSyllableSplit(word, syllables, fontSize, fontFamily, screenWidth);
  }

  // 4. Fallback to character-count based splitting if width parameters not available
  console.warn('[splitLongWord] Width parameters not provided, falling back to character-based splitting');
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
 * Check if a word needs splitting for RSVP display (static threshold).
 * Kept for backwards compatibility.
 */
export function needsSplitting(word: string, maxLength: number = MAX_WORD_LENGTH): boolean {
  return word.length > maxLength;
}

/**
 * Check if word needs splitting based on actual width calculation.
 * ORP-aware: considers where the split point falls.
 *
 * ✅ Fixes Bug 1: Fallback when calibration incomplete (undefined handling)
 *
 * @param word - Full word to check
 * @param orpIndex - Index of ORP character in the word
 * @param fontSize - Font size in points
 * @param fontFamily - Font family name
 * @param screenWidth - Screen width in pixels (defaults to current window width)
 * @returns true if word should be split, false otherwise
 *
 * @example
 * needsSplittingDynamic('introducing', 2, 48, 'System', 390)
 * // ORP at index 2 → after="troducing" (9 chars)
 * // At 48pt, "troducing" ≈ 194pt, maxWidth ≈ 172pt → true (split needed)
 */
export function needsSplittingDynamic(
  word: string,
  orpIndex: number,
  fontSize: number = RSVP_DISPLAY.fontSize ?? 48,
  fontFamily: string = 'System',
  screenWidth?: number
): boolean {
  // Get "after" portion (text following ORP character)
  const afterText = word.slice(orpIndex + 1);

  // If no "after" text, no wrapping possible
  if (afterText.length === 0) {
    return false;
  }

  // Calculate estimated width of "after" portion using MEASURED metrics
  const afterWidth = estimateTextWidth(afterText, fontSize, fontFamily);

  // ✅ Bug 1 Fix: Fallback if metrics not ready
  if (afterWidth === undefined) {
    console.warn('[needsSplittingDynamic] Font metrics not available for', fontFamily, fontSize, '→ using fallback');
    // Conservative fallback: split if "after" portion > 7 chars
    // This is safer than the static 13-char threshold
    return afterText.length > 7;
  }

  // Get maximum safe width for "after" container
  const maxWidth = getMaxAfterWidth(screenWidth);
  const widthRatio = (afterWidth / maxWidth * 100).toFixed(0);

  console.log('[needsSplittingDynamic]', word, '→ after:', `"${afterText}"`, `(${afterText.length} chars)`, 'width:', afterWidth.toFixed(1), 'vs max:', maxWidth.toFixed(1), `(${widthRatio}%)`, '→', afterWidth > maxWidth ? 'SPLIT' : 'keep');

  // Split if estimated width exceeds safe maximum
  return afterWidth > maxWidth;
}

/**
 * The maximum word length before splitting is applied.
 * Exported for use in tests and configuration.
 */
export const DEFAULT_MAX_WORD_LENGTH = MAX_WORD_LENGTH;
