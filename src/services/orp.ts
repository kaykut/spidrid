/**
 * ORP (Optimal Recognition Point) calculation.
 *
 * The ORP is the letter where the eye naturally focuses for fastest word recognition.
 * Research shows this is approximately 30% into the word, slightly left of center.
 * This algorithm is based on the Spritz speed reading research.
 *
 * Examples:
 * - "a" (1 char) -> ORP at index 0 -> "a"
 * - "the" (3 chars) -> ORP at index 1 -> "the" (h is red)
 * - "reading" (7 chars) -> ORP at index 2 -> "reading" (a is red)
 * - "understanding" (13 chars) -> ORP at index 4 -> "understanding" (r is red)
 */

import { getCurrentAdapter } from './language';
import { LanguageAdapter } from './language/types';

export function calculateORP(word: string): number {
  const len = word.length;

  if (len <= 1) {return 0;}
  if (len <= 5) {return Math.floor(len / 3);}
  if (len <= 9) {return Math.floor(len * 0.3);}
  if (len <= 13) {return Math.floor(len * 0.25) + 1;}
  return Math.floor(len * 0.25) + 2;
}

/**
 * Calculate pause multiplier based on word content.
 *
 * Longer pauses after sentence-ending punctuation help comprehension.
 * Slightly longer pauses for clause breaks and long words.
 *
 * @param word - The word to analyze
 * @param adapter - Language adapter for punctuation patterns (defaults to current language)
 */
export function calculatePauseMultiplier(
  word: string,
  adapter: LanguageAdapter = getCurrentAdapter()
): number {
  // Sentence end - longest pause
  if (adapter.sentenceEndPattern.test(word)) {return 1.8;}

  // Clause break - medium pause
  if (adapter.clauseBreakPattern.test(word)) {return 1.3;}

  // Long word - slightly longer
  if (word.length > 12) {return 1.2;}

  // Normal
  return 1.0;
}

/**
 * Detect if word ends a sentence.
 *
 * @param word - The word to check
 * @param adapter - Language adapter for sentence pattern (defaults to current language)
 */
export function isSentenceEnd(
  word: string,
  adapter: LanguageAdapter = getCurrentAdapter()
): boolean {
  return adapter.sentenceEndPattern.test(word);
}
