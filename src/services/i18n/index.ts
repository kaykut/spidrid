/**
 * i18n Service
 *
 * Configures i18next with all translation namespaces and provides
 * language switching functionality.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import English translation files (others will be added in M5)
import enAccessibility from '../../locales/en/accessibility.json';
import enAddContent from '../../locales/en/addContent.json';
import enAuth from '../../locales/en/auth.json';
import enCertificates from '../../locales/en/certificates.json';
import enCommon from '../../locales/en/common.json';
import enConsumption from '../../locales/en/consumption.json';
import enContent from '../../locales/en/content.json';
import enErrors from '../../locales/en/errors.json';
import enGeneration from '../../locales/en/generation.json';
import enInterests from '../../locales/en/interests.json';
import enPlayback from '../../locales/en/playback.json';
import enQuiz from '../../locales/en/quiz.json';
import enSettings from '../../locales/en/settings.json';
import enSubscription from '../../locales/en/subscription.json';
import enTopics from '../../locales/en/topics.json';

export const NAMESPACES = [
  'common',
  'topics',
  'interests',
  'generation',
  'playback',
  'quiz',
  'settings',
  'content',
  'addContent',
  'consumption',
  'auth',
  'subscription',
  'certificates',
  'errors',
  'accessibility',
] as const;

export type Namespace = typeof NAMESPACES[number];

/**
 * Initialize i18next with the specified locale.
 * Call this once on app startup.
 */
export const initI18n = async (locale: string = 'en') => {
  await i18n
    .use(initReactI18next)
    .init({
      lng: locale,
      fallbackLng: 'en',
      defaultNS: 'common',
      ns: NAMESPACES,
      resources: {
        en: {
          common: enCommon,
          topics: enTopics,
          interests: enInterests,
          generation: enGeneration,
          playback: enPlayback,
          quiz: enQuiz,
          settings: enSettings,
          content: enContent,
          addContent: enAddContent,
          consumption: enConsumption,
          auth: enAuth,
          subscription: enSubscription,
          certificates: enCertificates,
          errors: enErrors,
          accessibility: enAccessibility,
        },
        // Other languages will be added in M5
      },
      interpolation: {
        escapeValue: false, // React already escapes by default
      },
      react: {
        useSuspense: false, // Critical for React Native - avoids Suspense issues
      },
    });

  return i18n;
};

/**
 * Change the current language.
 * Triggers re-render of all components using translations.
 */
export const changeLanguage = async (locale: string) => {
  return i18n.changeLanguage(locale);
};

/**
 * Get the currently active language code.
 */
export const getCurrentLanguage = () => i18n.language;

export { i18n };
