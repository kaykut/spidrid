import { RSVP_DISPLAY } from '../constants/typography';

export type FontFamily = 'system' | 'lora' | 'inter' | 'reddit-sans-condensed';

export interface Theme {
  id: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  orpColor: string;
  crosshairColor: string;
  accentColor: string;
  secondaryBackground: string;
  secondaryBackgroundGradient: string;
  trackColor: string;
  metaColor: string; // Color for headers and metadata
  textSecondaryColor: string;
  background: string;
}

export interface UserSettings {
  themeId: string;
  defaultWPM: number;
  showCrosshairs: boolean;
  crosshairOpacity: number;
  fontSize: number;
  fontFamily: FontFamily;
  hapticFeedback: boolean;
  userName: string;
  readingLanguage: string;
  paragraphPauseEnabled: boolean;
  moveFinishedToHistory: boolean;
}

/**
 * Supported reading languages.
 * Auto-detect uses franc-min trigram analysis to identify the language.
 * Total: 11 European Latin-script languages
 * CJK languages require word segmentation; RTL languages require bidirectional text handling.
 */
export const READING_LANGUAGES = [
  { code: 'auto', label: 'Auto-detect' },
  { code: 'cs', label: 'Czech' },
  { code: 'nl', label: 'Dutch' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'it', label: 'Italian' },
  { code: 'pl', label: 'Polish' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'ro', label: 'Romanian' },
  { code: 'es', label: 'Spanish' },
  { code: 'sv', label: 'Swedish' },
] as const;

export const DEFAULT_SETTINGS: UserSettings = {
  themeId: 'dark',
  defaultWPM: 250,
  showCrosshairs: true,
  crosshairOpacity: 0.5,
  fontSize: RSVP_DISPLAY.fontSize ?? 48,
  fontFamily: 'system',
  hapticFeedback: true,
  userName: '',
  readingLanguage: 'auto',
  paragraphPauseEnabled: true,
  moveFinishedToHistory: false,
};
