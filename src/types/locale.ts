/**
 * Locale Types and Constants
 *
 * Defines supported locales for UI localization across 12 languages.
 */

export type SupportedLocale =
  | 'en'  // English
  | 'cs'  // Czech
  | 'de'  // German
  | 'nl'  // Dutch
  | 'fr'  // French
  | 'it'  // Italian
  | 'pl'  // Polish
  | 'pt'  // Portuguese
  | 'ro'  // Romanian
  | 'es'  // Spanish
  | 'sv'  // Swedish
  | 'tr'; // Turkish

export interface LocaleInfo {
  code: SupportedLocale;
  nativeName: string;
  englishName: string;
  flag: string;
}

export const SUPPORTED_LOCALES: LocaleInfo[] = [
  { code: 'en', nativeName: 'English', englishName: 'English', flag: '🇬🇧' },
  // Alphabetically by English name
  { code: 'cs', nativeName: 'Čeština', englishName: 'Czech', flag: '🇨🇿' },
  { code: 'nl', nativeName: 'Nederlands', englishName: 'Dutch', flag: '🇳🇱' },
  { code: 'fr', nativeName: 'Français', englishName: 'French', flag: '🇫🇷' },
  { code: 'de', nativeName: 'Deutsch', englishName: 'German', flag: '🇩🇪' },
  { code: 'it', nativeName: 'Italiano', englishName: 'Italian', flag: '🇮🇹' },
  { code: 'pl', nativeName: 'Polski', englishName: 'Polish', flag: '🇵🇱' },
  { code: 'pt', nativeName: 'Português', englishName: 'Portuguese', flag: '🇵🇹' },
  { code: 'ro', nativeName: 'Română', englishName: 'Romanian', flag: '🇷🇴' },
  { code: 'es', nativeName: 'Español', englishName: 'Spanish', flag: '🇪🇸' },
  { code: 'sv', nativeName: 'Svenska', englishName: 'Swedish', flag: '🇸🇪' },
  { code: 'tr', nativeName: 'Türkçe', englishName: 'Turkish', flag: '🇹🇷' },
];
