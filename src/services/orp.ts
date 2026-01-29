/**
 * ORP (Optimal Recognition Point) calculation - Standard Formula.
 *
 * The ORP is the letter where the eye naturally focuses for fastest word recognition.
 * Using standard calculation: approximately 1/3 into the word from the start.
 *
 * Examples:
 * - "a" (1 char) -> ORP at index 0 -> "a"
 * - "the" (3 chars) -> ORP at index 1 -> "the" (h is red)
 * - "reading" (7 chars) -> ORP at index 2 -> "reading" (a is red)
 * - "understanding" (13 chars) -> ORP at index 4 -> "understanding" (r is red)
 */

import { getCurrentAdapter } from './language';
import { LanguageAdapter } from './language/types';
import { PauseLevel } from '../types/settings';

export function calculateORP(word: string): number {
  const len = word.length;
  if (len <= 1) {
    return 0;
  }
  return Math.floor((len - 1) / 3);
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
export interface PauseMultipliers {
  sentenceEnd: number;
  clauseBreak: number;
  longWord: number;
}

const LONG_WORD_MULTIPLIER = 1.2;

export const DEFAULT_PAUSE_MULTIPLIERS: PauseMultipliers = {
  sentenceEnd: 3.0,
  clauseBreak: 1.5,
  longWord: LONG_WORD_MULTIPLIER,
};

const PAUSE_LEVEL_MULTIPLIERS = {
  comma: {
    off: 1.0,
    short: 1.5,
    medium: 1.8,
    long: 2.1,
  },
  period: {
    off: 1.0,
    short: 3.0,
    medium: 3.6,
    long: 4.5,
  },
  paragraph: {
    off: 1.0,
    short: 5.0,
    medium: 6.0,
    long: 7.5,
  },
} as const;

export type PauseMultiplierType = keyof typeof PAUSE_LEVEL_MULTIPLIERS;

export function getPauseMultiplierForLevel(
  type: PauseMultiplierType,
  level: PauseLevel
): number {
  return PAUSE_LEVEL_MULTIPLIERS[type][level] ?? PAUSE_LEVEL_MULTIPLIERS[type].short;
}

export function calculatePauseMultiplier(
  word: string,
  adapter: LanguageAdapter = getCurrentAdapter(),
  multipliers: PauseMultipliers = DEFAULT_PAUSE_MULTIPLIERS
): number {
  const longWordMultiplier = word.length > 12 ? multipliers.longWord : 1.0;

  // Sentence end - longest pause (wrap-up effect)
  if (adapter.sentenceEndPattern.test(word)) {
    return Math.max(longWordMultiplier, multipliers.sentenceEnd);
  }

  // Clause break - medium pause (comma, semicolon, colon)
  if (adapter.clauseBreakPattern.test(word)) {
    return Math.max(longWordMultiplier, multipliers.clauseBreak);
  }

  // Standard word
  return longWordMultiplier;
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
