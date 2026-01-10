/**
 * Test utility functions and factories.
 */

import { ProcessedWord } from '../../src/types/playback';

/**
 * Creates a mock ProcessedWord for testing.
 */
export function createMockWord(
  word: string,
  options: Partial<ProcessedWord> = {}
): ProcessedWord {
  return {
    original: word,
    display: word,
    orpIndex: Math.floor(word.length / 3),
    pauseMultiplier: 1.0,
    sentenceEnd: false,
    paragraphEnd: false,
    ...options,
  };
}

/**
 * Creates an array of mock ProcessedWords from a sentence.
 */
export function createMockWords(sentence: string): ProcessedWord[] {
  return sentence.split(' ').map((word) => {
    const endsWithPunctuation = /[.!?]$/.test(word);
    return createMockWord(word, {
      sentenceEnd: endsWithPunctuation,
      pauseMultiplier: endsWithPunctuation ? 1.8 : 1.0,
    });
  });
}

/**
 * Wait for a specified number of milliseconds.
 * Useful for testing async operations.
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Flush all pending promises.
 */
export function flushPromises(): Promise<void> {
  return new Promise((resolve) => setImmediate(resolve));
}
