import { ProcessedWord } from '../types/playback';
import { calculateORP, calculatePauseMultiplier, isSentenceEnd } from './orp';

/**
 * Tokenize text into words.
 *
 * Preserves punctuation attached to words (e.g., "Hello," stays as one token).
 * Filters out empty strings and whitespace-only tokens.
 */
export function tokenize(text: string): string[] {
  return text
    .split(/\s+/)
    .map(word => word.trim())
    .filter(word => word.length > 0);
}

/**
 * Process a single word into a ProcessedWord with ORP data.
 */
export function processWord(word: string): ProcessedWord {
  return {
    original: word,
    display: word,
    orpIndex: calculateORP(word),
    pauseMultiplier: calculatePauseMultiplier(word),
    sentenceEnd: isSentenceEnd(word),
  };
}

/**
 * Process full text into array of ProcessedWords.
 */
export function processText(text: string): ProcessedWord[] {
  const tokens = tokenize(text);
  return tokens.map(processWord);
}

/**
 * Find indices where sentences start.
 * Used for rewind/skip functionality.
 */
export function findSentenceStarts(words: ProcessedWord[]): number[] {
  const starts: number[] = [0]; // First word is always a sentence start

  for (let i = 0; i < words.length - 1; i++) {
    if (words[i].sentenceEnd) {
      starts.push(i + 1);
    }
  }

  return starts;
}

/**
 * Find the sentence start index before or at the given index.
 */
export function findPreviousSentenceStart(
  sentenceStarts: number[],
  currentIndex: number
): number {
  // Find the largest sentence start that is less than currentIndex
  for (let i = sentenceStarts.length - 1; i >= 0; i--) {
    if (sentenceStarts[i] < currentIndex) {
      return sentenceStarts[i];
    }
  }
  return 0;
}

/**
 * Find the sentence start index after the given index.
 */
export function findNextSentenceStart(
  sentenceStarts: number[],
  currentIndex: number,
  totalWords: number
): number {
  for (const start of sentenceStarts) {
    if (start > currentIndex) {
      return start;
    }
  }
  return totalWords - 1; // Stay at end if no next sentence
}
