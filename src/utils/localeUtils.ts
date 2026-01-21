/**
 * Locale Utilities
 *
 * Helper functions for locale mapping and validation.
 */

import { SupportedLocale, SUPPORTED_LOCALES } from '../types/locale';

/**
 * Maps a device language code to a supported locale.
 * Handles locale variants (e.g., en-US → en).
 * Falls back to English if the language is not supported.
 */
export function mapToSupportedLocale(deviceLang: string | undefined): SupportedLocale {
  if (!deviceLang) {
    return 'en';
  }

  const supportedCodes = SUPPORTED_LOCALES.map(l => l.code);
  const baseLanguage = deviceLang.split('-')[0]; // en-US → en

  return supportedCodes.includes(baseLanguage as SupportedLocale)
    ? (baseLanguage as SupportedLocale)
    : 'en';
}

/**
 * Type guard to check if a string is a supported locale code.
 */
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  const supportedCodes = SUPPORTED_LOCALES.map(l => l.code);
  return supportedCodes.includes(locale as SupportedLocale);
}

/**
 * Gets the list of all supported locale codes.
 */
export function getSupportedLocaleCodes(): SupportedLocale[] {
  return SUPPORTED_LOCALES.map(l => l.code);
}
