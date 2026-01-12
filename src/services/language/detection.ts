/**
 * Language Detection
 *
 * Detects the language of a text sample using stop-word frequency analysis.
 * Uses common stop words that appear frequently in each language.
 */

import { SupportedLanguage } from './types';

/**
 * Stop words for each supported language.
 * These are the most common words that appear frequently in any text.
 */
const STOP_WORDS: Record<SupportedLanguage, string[]> = {
  en: ['the', 'and', 'is', 'in', 'to', 'of', 'a', 'that', 'it', 'for', 'was', 'on', 'are', 'be', 'have', 'with', 'as', 'at', 'this', 'by'],
  es: ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'es', 'por', 'con', 'no', 'una', 'los', 'se', 'del', 'las', 'su', 'para', 'al', 'lo'],
  fr: ['le', 'la', 'de', 'et', 'est', 'un', 'une', 'que', 'en', 'dans', 'du', 'les', 'des', 'ce', 'qui', 'au', 'ne', 'pas', 'sur', 'pour'],
  de: ['der', 'die', 'und', 'in', 'den', 'von', 'zu', 'das', 'mit', 'ist', 'des', 'auf', 'für', 'sich', 'nicht', 'ein', 'eine', 'als', 'auch', 'es'],
  pt: ['o', 'de', 'que', 'e', 'do', 'da', 'em', 'um', 'para', 'com', 'no', 'uma', 'os', 'se', 'na', 'por', 'mais', 'as', 'dos', 'como'],
  it: ['il', 'di', 'che', 'e', 'la', 'un', 'per', 'in', 'con', 'una', 'del', 'le', 'da', 'non', 'si', 'dei', 'al', 'sono', 'nel', 'ha'],
};

/**
 * Character patterns that provide strong signals for specific languages.
 * These are characters that appear almost exclusively in certain languages.
 */
const STRONG_SIGNAL_PATTERNS: Partial<Record<SupportedLanguage, RegExp>> = {
  es: /[ñ¿¡]/i,                    // ñ, inverted punctuation
  de: /ß/,                          // Eszett (sharp S)
  fr: /[œæ]/i,                      // French ligatures
  pt: /[ãõ]/i,                      // Portuguese nasal vowels (ã, õ)
};

/**
 * Extended character patterns for additional language detection clues.
 * These are common but not exclusive to the language.
 */
const SECONDARY_PATTERNS: Partial<Record<SupportedLanguage, RegExp>> = {
  de: /[äöü]/i,                     // German umlauts (also in other languages but common in German)
  fr: /[àâçèéêëîïôùûü]/i,          // French accents
  es: /[áéíóúü]/i,                  // Spanish accents
  pt: /[áàâéêíóôú]/i,              // Portuguese accents
  it: /[àèéìíòóùú]/i,              // Italian accents
};

/**
 * Minimum number of words required for reliable detection.
 */
const MIN_WORDS_FOR_DETECTION = 10;

/**
 * Score multiplier for strong character signals.
 */
const STRONG_SIGNAL_BONUS = 0.3;

/**
 * Detect the language of a text sample.
 *
 * Uses a combination of:
 * 1. Strong character signals (ñ, ß, etc.) that uniquely identify languages
 * 2. Stop-word frequency analysis for common words
 *
 * @param text - The text sample to analyze
 * @param confidenceThreshold - Minimum confidence score (0-1) to return a result (default: 0.3)
 * @returns The detected language code, or null if detection is uncertain
 */
export function detectLanguage(
  text: string,
  confidenceThreshold: number = 0.3
): SupportedLanguage | null {
  if (!text || text.trim().length < 20) {
    return null;
  }

  // Extract lowercase words
  const words = extractWords(text);

  if (words.length < MIN_WORDS_FOR_DETECTION) {
    return null;
  }

  // Calculate scores for each language
  const scores: Record<SupportedLanguage, number> = {
    en: 0,
    es: 0,
    fr: 0,
    de: 0,
    pt: 0,
    it: 0,
  };

  // Check for strong character signals first
  for (const [lang, pattern] of Object.entries(STRONG_SIGNAL_PATTERNS)) {
    if (pattern && pattern.test(text)) {
      scores[lang as SupportedLanguage] += STRONG_SIGNAL_BONUS;
    }
  }

  // Count stop word occurrences for each language
  const wordSet = new Set(words);
  const wordCounts: Record<string, number> = {};

  for (const word of words) {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  }

  for (const [lang, stopWords] of Object.entries(STOP_WORDS)) {
    let matchCount = 0;
    for (const stopWord of stopWords) {
      if (wordSet.has(stopWord)) {
        // Weight by frequency of the stop word in the text
        matchCount += wordCounts[stopWord] || 0;
      }
    }
    // Normalize by total words to get a score between 0 and 1
    scores[lang as SupportedLanguage] += matchCount / words.length;
  }

  // Add secondary pattern bonuses (smaller than strong signals)
  for (const [lang, pattern] of Object.entries(SECONDARY_PATTERNS)) {
    if (pattern && pattern.test(text)) {
      scores[lang as SupportedLanguage] += 0.05;
    }
  }

  // Find the language with the highest score
  let maxScore = 0;
  let detectedLang: SupportedLanguage | null = null;

  for (const [lang, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      detectedLang = lang as SupportedLanguage;
    }
  }

  // Check if the confidence is above the threshold
  if (maxScore < confidenceThreshold) {
    return null;
  }

  // Check for ambiguity: if the top two scores are too close, return null
  const sortedScores = Object.values(scores).sort((a, b) => b - a);
  if (sortedScores.length >= 2 && sortedScores[0] - sortedScores[1] < 0.05) {
    // Scores are too close, detection is ambiguous
    // Unless there's a strong character signal
    if (maxScore - STRONG_SIGNAL_BONUS < sortedScores[1]) {
      return null;
    }
  }

  return detectedLang;
}

/**
 * Extract lowercase words from text.
 * Handles Unicode letters and removes punctuation.
 */
function extractWords(text: string): string[] {
  // Match sequences of Unicode letters
  const wordMatches = text.toLowerCase().match(/[\p{L}]+/gu);
  return wordMatches || [];
}

/**
 * Get the confidence score for a detected language.
 * Useful for debugging and testing.
 */
export function getLanguageScores(
  text: string
): Record<SupportedLanguage, number> {
  const scores: Record<SupportedLanguage, number> = {
    en: 0,
    es: 0,
    fr: 0,
    de: 0,
    pt: 0,
    it: 0,
  };

  if (!text || text.trim().length < 20) {
    return scores;
  }

  const words = extractWords(text);

  if (words.length < MIN_WORDS_FOR_DETECTION) {
    return scores;
  }

  // Strong character signals
  for (const [lang, pattern] of Object.entries(STRONG_SIGNAL_PATTERNS)) {
    if (pattern && pattern.test(text)) {
      scores[lang as SupportedLanguage] += STRONG_SIGNAL_BONUS;
    }
  }

  // Stop word counts
  const wordSet = new Set(words);
  const wordCounts: Record<string, number> = {};

  for (const word of words) {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  }

  for (const [lang, stopWords] of Object.entries(STOP_WORDS)) {
    let matchCount = 0;
    for (const stopWord of stopWords) {
      if (wordSet.has(stopWord)) {
        matchCount += wordCounts[stopWord] || 0;
      }
    }
    scores[lang as SupportedLanguage] += matchCount / words.length;
  }

  // Secondary patterns
  for (const [lang, pattern] of Object.entries(SECONDARY_PATTERNS)) {
    if (pattern && pattern.test(text)) {
      scores[lang as SupportedLanguage] += 0.05;
    }
  }

  return scores;
}
