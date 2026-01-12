/**
 * Language Services Public API
 *
 * Provides language-specific adapters for RSVP text processing.
 * Re-exports types and provides convenience functions for adapter access.
 */

// Re-export types
// Import for internal use
import { useSettingsStore } from '../../store/settingsStore';
import { detectLanguage } from './detection';
import { getAdapter } from './registry';
import { LanguageAdapter } from './types';

export type { LanguageAdapter, SupportedLanguage, HyphenationResult } from './types';

// Re-export registry functions
export { getAdapter, isSupported, getSupportedLanguages, registerAdapter } from './registry';

// Re-export detection
export { detectLanguage, getLanguageScores } from './detection';

/**
 * Get the current language adapter based on user settings.
 *
 * Reads the readingLanguage from the settings store and returns
 * the corresponding adapter. Falls back to English if not found.
 *
 * @returns The language adapter for the user's selected language
 */
export function getCurrentAdapter(): LanguageAdapter {
  const readingLanguage = useSettingsStore.getState().readingLanguage;

  // Handle 'auto' setting - return English as default
  // Actual auto-detection happens at content import time
  if (readingLanguage === 'auto') {
    return getAdapter('en');
  }

  return getAdapter(readingLanguage);
}

/**
 * React hook to get the current language adapter.
 * Re-renders when the language setting changes.
 *
 * @returns The language adapter for the user's selected language
 */
export function useLanguageAdapter(): LanguageAdapter {
  const readingLanguage = useSettingsStore((state) => state.readingLanguage);

  if (readingLanguage === 'auto') {
    return getAdapter('en');
  }

  return getAdapter(readingLanguage);
}

/**
 * Get the appropriate adapter for specific content.
 *
 * If userOverride is 'auto', detects the language from the text.
 * Otherwise, returns the adapter for the specified language.
 *
 * @param text - The content text for language detection
 * @param userOverride - Optional language code override (or 'auto' for detection)
 * @returns The appropriate language adapter
 */
export function getAdapterForContent(text: string, userOverride?: string): LanguageAdapter {
  // If user specified a language (not 'auto'), use that
  if (userOverride && userOverride !== 'auto') {
    return getAdapter(userOverride);
  }

  // Try to detect language from text
  const detected = detectLanguage(text);
  if (detected) {
    return getAdapter(detected);
  }

  // Fall back to English
  return getAdapter('en');
}
