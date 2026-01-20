/**
 * Language Detection
 *
 * Detects the language of a text sample using franc-min trigram analysis.
 * Uses first 1000 characters for performance and accuracy.
 */

import { franc } from 'franc-min';
import { SupportedLanguage } from './types';

/**
 * ISO 639-3 to ISO 639-1 language code mapping.
 * franc-min returns ISO 639-3 codes, we use ISO 639-1 in the app.
 */
const ISO_639_3_TO_1: Record<string, SupportedLanguage> = {
  eng: 'en',
  spa: 'es',
  fra: 'fr',
  deu: 'de',
  por: 'pt',
  ita: 'it',
};

/**
 * Detect language using franc-min trigram analysis.
 * Uses first 1000 characters for performance.
 *
 * @param text - Text to analyze
 * @returns ISO 639-1 language code ('en', 'es', etc.) or null if undetermined
 */
export function detectLanguage(text: string): SupportedLanguage | null {
  if (!text || text.trim().length < 20) {
    return null;
  }

  // Use first 1000 chars for detection (sufficient context, better performance)
  const sample = text.slice(0, 1000);

  // franc returns ISO 639-3 code or 'und' (undetermined)
  const detected = franc(sample);

  // Map to our ISO 639-1 format
  return ISO_639_3_TO_1[detected] || null;
}

/**
 * Get language scores for debugging/testing.
 * Legacy function for compatibility.
 *
 * @param text - Text to analyze
 * @returns Empty scores object (legacy compatibility)
 */
export function getLanguageScores(text: string): Record<SupportedLanguage, number> {
  // Optional: Could use francAll from franc-min to get confidence scores
  // For now, return empty scores for legacy compatibility
  return { en: 0, es: 0, fr: 0, de: 0, pt: 0, it: 0 };
}
