import { RSVP_DISPLAY } from '../constants/typography';

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
}

export interface UserSettings {
  themeId: string;
  defaultWPM: number;
  showCrosshairs: boolean;
  crosshairOpacity: number;
  fontSize: number;
  hapticFeedback: boolean;
  userName: string;
  readingLanguage: string;
  paragraphPauseEnabled: boolean;
  moveFinishedToHistory: boolean;
}

export const READING_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'it', label: 'Italian' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'zh', label: 'Chinese' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'ar', label: 'Arabic' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ru', label: 'Russian' },
] as const;

export const DEFAULT_SETTINGS: UserSettings = {
  themeId: 'dark',
  defaultWPM: 250,
  showCrosshairs: true,
  crosshairOpacity: 0.5,
  fontSize: RSVP_DISPLAY.fontSize ?? 48,
  hapticFeedback: true,
  userName: '',
  readingLanguage: 'en',
  paragraphPauseEnabled: true,
  moveFinishedToHistory: false,
};
