/**
 * Locale Types and Constants
 *
 * Defines supported locales for UI localization across 11 European languages.
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
  | 'sv'; // Swedish

export interface LocaleInfo {
  code: SupportedLocale;
  nativeName: string;
  englishName: string;
}

export const SUPPORTED_LOCALES: LocaleInfo[] = [
  { code: 'en', nativeName: 'English', englishName: 'English' },
  { code: 'cs', nativeName: 'Čeština', englishName: 'Czech' },
  { code: 'de', nativeName: 'Deutsch', englishName: 'German' },
  { code: 'nl', nativeName: 'Nederlands', englishName: 'Dutch' },
  { code: 'fr', nativeName: 'Français', englishName: 'French' },
  { code: 'it', nativeName: 'Italiano', englishName: 'Italian' },
  { code: 'pl', nativeName: 'Polski', englishName: 'Polish' },
  { code: 'pt', nativeName: 'Português', englishName: 'Portuguese' },
  { code: 'ro', nativeName: 'Română', englishName: 'Romanian' },
  { code: 'es', nativeName: 'Español', englishName: 'Spanish' },
  { code: 'sv', nativeName: 'Svenska', englishName: 'Swedish' },
];
