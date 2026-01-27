/**
 * Language Adapter Registry
 *
 * Singleton registry mapping language codes to adapter instances.
 * Provides lookup functions for adapter retrieval and language support checking.
 */

import { czechAdapter } from './adapters/CzechAdapter';
import { dutchAdapter } from './adapters/DutchAdapter';
import { englishAdapter } from './adapters/EnglishAdapter';
import { frenchAdapter } from './adapters/FrenchAdapter';
import { genericAdapter } from './adapters/GenericAdapter';
import { germanAdapter } from './adapters/GermanAdapter';
import { italianAdapter } from './adapters/ItalianAdapter';
import { polishAdapter } from './adapters/PolishAdapter';
import { portugueseAdapter } from './adapters/PortugueseAdapter';
import { romanianAdapter } from './adapters/RomanianAdapter';
import { spanishAdapter } from './adapters/SpanishAdapter';
import { swedishAdapter } from './adapters/SwedishAdapter';
import { LanguageAdapter, SupportedLanguage } from './types';

/**
 * Registry of all available language adapters.
 * Each language has its own dedicated adapter with language-specific
 * hyphenation patterns, caption keywords, and artifact patterns.
 */
const adapters: Record<SupportedLanguage, LanguageAdapter> = {
  en: englishAdapter,
  es: spanishAdapter,
  fr: frenchAdapter,
  de: germanAdapter,
  pt: portugueseAdapter,
  it: italianAdapter,
  nl: dutchAdapter,
  pl: polishAdapter,
  ro: romanianAdapter,
  sv: swedishAdapter,
  cs: czechAdapter,
};

/**
 * Get the language adapter for a given language code.
 * Falls back to English if the language is not supported.
 *
 * @param languageCode - ISO 639-1 language code (e.g., 'en', 'es')
 * @returns The language adapter for the given code, or English adapter as fallback
 */
export function getAdapter(languageCode: string): LanguageAdapter {
  const code = languageCode as SupportedLanguage;
  return adapters[code] || genericAdapter;
}

/**
 * Check if a language code is supported.
 *
 * @param languageCode - ISO 639-1 language code
 * @returns true if the language has a dedicated adapter
 */
export function isSupported(languageCode: string): boolean {
  return languageCode in adapters;
}

/**
 * Get all supported language codes.
 *
 * @returns Array of supported language codes
 */
export function getSupportedLanguages(): SupportedLanguage[] {
  return Object.keys(adapters) as SupportedLanguage[];
}

/**
 * Register a new language adapter.
 * Used when additional language adapters are implemented.
 *
 * @param code - Language code to register
 * @param adapter - The adapter instance
 */
export function registerAdapter(code: SupportedLanguage, adapter: LanguageAdapter): void {
  adapters[code] = adapter;
}
