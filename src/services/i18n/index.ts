/**
 * i18n Service
 *
 * Configures i18next with all translation namespaces and provides
 * language switching functionality.
 *
 * Supports 12 languages: en, cs, de, nl, fr, it, pl, pt, ro, es, sv, tr
 * Each language has 15 namespaces for a total of 180 translation files.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import csAccessibility from '../../locales/cs/accessibility.json';
import csAddContent from '../../locales/cs/addContent.json';
import csAuth from '../../locales/cs/auth.json';
import csCertificates from '../../locales/cs/certificates.json';
import csCommon from '../../locales/cs/common.json';
import csConsumption from '../../locales/cs/consumption.json';
import csContent from '../../locales/cs/content.json';
import csErrors from '../../locales/cs/errors.json';
import csGeneration from '../../locales/cs/generation.json';
import csInterests from '../../locales/cs/interests.json';
import csPlayback from '../../locales/cs/playback.json';
import csQuiz from '../../locales/cs/quiz.json';
import csSettings from '../../locales/cs/settings.json';
import csSubscription from '../../locales/cs/subscription.json';
import csTopics from '../../locales/cs/topics.json';
import deAccessibility from '../../locales/de/accessibility.json';
import deAddContent from '../../locales/de/addContent.json';
import deAuth from '../../locales/de/auth.json';
import deCertificates from '../../locales/de/certificates.json';
import deCommon from '../../locales/de/common.json';
import deConsumption from '../../locales/de/consumption.json';
import deContent from '../../locales/de/content.json';
import deErrors from '../../locales/de/errors.json';
import deGeneration from '../../locales/de/generation.json';
import deInterests from '../../locales/de/interests.json';
import dePlayback from '../../locales/de/playback.json';
import deQuiz from '../../locales/de/quiz.json';
import deSettings from '../../locales/de/settings.json';
import deSubscription from '../../locales/de/subscription.json';
import deTopics from '../../locales/de/topics.json';
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
import esAccessibility from '../../locales/es/accessibility.json';
import esAddContent from '../../locales/es/addContent.json';
import esAuth from '../../locales/es/auth.json';
import esCertificates from '../../locales/es/certificates.json';
import esCommon from '../../locales/es/common.json';
import esConsumption from '../../locales/es/consumption.json';
import esContent from '../../locales/es/content.json';
import esErrors from '../../locales/es/errors.json';
import esGeneration from '../../locales/es/generation.json';
import esInterests from '../../locales/es/interests.json';
import esPlayback from '../../locales/es/playback.json';
import esQuiz from '../../locales/es/quiz.json';
import esSettings from '../../locales/es/settings.json';
import esSubscription from '../../locales/es/subscription.json';
import esTopics from '../../locales/es/topics.json';
import frAccessibility from '../../locales/fr/accessibility.json';
import frAddContent from '../../locales/fr/addContent.json';
import frAuth from '../../locales/fr/auth.json';
import frCertificates from '../../locales/fr/certificates.json';
import frCommon from '../../locales/fr/common.json';
import frConsumption from '../../locales/fr/consumption.json';
import frContent from '../../locales/fr/content.json';
import frErrors from '../../locales/fr/errors.json';
import frGeneration from '../../locales/fr/generation.json';
import frInterests from '../../locales/fr/interests.json';
import frPlayback from '../../locales/fr/playback.json';
import frQuiz from '../../locales/fr/quiz.json';
import frSettings from '../../locales/fr/settings.json';
import frSubscription from '../../locales/fr/subscription.json';
import frTopics from '../../locales/fr/topics.json';
import itAccessibility from '../../locales/it/accessibility.json';
import itAddContent from '../../locales/it/addContent.json';
import itAuth from '../../locales/it/auth.json';
import itCertificates from '../../locales/it/certificates.json';
import itCommon from '../../locales/it/common.json';
import itConsumption from '../../locales/it/consumption.json';
import itContent from '../../locales/it/content.json';
import itErrors from '../../locales/it/errors.json';
import itGeneration from '../../locales/it/generation.json';
import itInterests from '../../locales/it/interests.json';
import itPlayback from '../../locales/it/playback.json';
import itQuiz from '../../locales/it/quiz.json';
import itSettings from '../../locales/it/settings.json';
import itSubscription from '../../locales/it/subscription.json';
import itTopics from '../../locales/it/topics.json';
import nlAccessibility from '../../locales/nl/accessibility.json';
import nlAddContent from '../../locales/nl/addContent.json';
import nlAuth from '../../locales/nl/auth.json';
import nlCertificates from '../../locales/nl/certificates.json';
import nlCommon from '../../locales/nl/common.json';
import nlConsumption from '../../locales/nl/consumption.json';
import nlContent from '../../locales/nl/content.json';
import nlErrors from '../../locales/nl/errors.json';
import nlGeneration from '../../locales/nl/generation.json';
import nlInterests from '../../locales/nl/interests.json';
import nlPlayback from '../../locales/nl/playback.json';
import nlQuiz from '../../locales/nl/quiz.json';
import nlSettings from '../../locales/nl/settings.json';
import nlSubscription from '../../locales/nl/subscription.json';
import nlTopics from '../../locales/nl/topics.json';
import plAccessibility from '../../locales/pl/accessibility.json';
import plAddContent from '../../locales/pl/addContent.json';
import plAuth from '../../locales/pl/auth.json';
import plCertificates from '../../locales/pl/certificates.json';
import plCommon from '../../locales/pl/common.json';
import plConsumption from '../../locales/pl/consumption.json';
import plContent from '../../locales/pl/content.json';
import plErrors from '../../locales/pl/errors.json';
import plGeneration from '../../locales/pl/generation.json';
import plInterests from '../../locales/pl/interests.json';
import plPlayback from '../../locales/pl/playback.json';
import plQuiz from '../../locales/pl/quiz.json';
import plSettings from '../../locales/pl/settings.json';
import plSubscription from '../../locales/pl/subscription.json';
import plTopics from '../../locales/pl/topics.json';
import ptAccessibility from '../../locales/pt/accessibility.json';
import ptAddContent from '../../locales/pt/addContent.json';
import ptAuth from '../../locales/pt/auth.json';
import ptCertificates from '../../locales/pt/certificates.json';
import ptCommon from '../../locales/pt/common.json';
import ptConsumption from '../../locales/pt/consumption.json';
import ptContent from '../../locales/pt/content.json';
import ptErrors from '../../locales/pt/errors.json';
import ptGeneration from '../../locales/pt/generation.json';
import ptInterests from '../../locales/pt/interests.json';
import ptPlayback from '../../locales/pt/playback.json';
import ptQuiz from '../../locales/pt/quiz.json';
import ptSettings from '../../locales/pt/settings.json';
import ptSubscription from '../../locales/pt/subscription.json';
import ptTopics from '../../locales/pt/topics.json';
import roAccessibility from '../../locales/ro/accessibility.json';
import roAddContent from '../../locales/ro/addContent.json';
import roAuth from '../../locales/ro/auth.json';
import roCertificates from '../../locales/ro/certificates.json';
import roCommon from '../../locales/ro/common.json';
import roConsumption from '../../locales/ro/consumption.json';
import roContent from '../../locales/ro/content.json';
import roErrors from '../../locales/ro/errors.json';
import roGeneration from '../../locales/ro/generation.json';
import roInterests from '../../locales/ro/interests.json';
import roPlayback from '../../locales/ro/playback.json';
import roQuiz from '../../locales/ro/quiz.json';
import roSettings from '../../locales/ro/settings.json';
import roSubscription from '../../locales/ro/subscription.json';
import roTopics from '../../locales/ro/topics.json';
import svAccessibility from '../../locales/sv/accessibility.json';
import svAddContent from '../../locales/sv/addContent.json';
import svAuth from '../../locales/sv/auth.json';
import svCertificates from '../../locales/sv/certificates.json';
import svCommon from '../../locales/sv/common.json';
import svConsumption from '../../locales/sv/consumption.json';
import svContent from '../../locales/sv/content.json';
import svErrors from '../../locales/sv/errors.json';
import svGeneration from '../../locales/sv/generation.json';
import svInterests from '../../locales/sv/interests.json';
import svPlayback from '../../locales/sv/playback.json';
import svQuiz from '../../locales/sv/quiz.json';
import svSettings from '../../locales/sv/settings.json';
import svSubscription from '../../locales/sv/subscription.json';
import svTopics from '../../locales/sv/topics.json';
import trAccessibility from '../../locales/tr/accessibility.json';
import trAddContent from '../../locales/tr/addContent.json';
import trAuth from '../../locales/tr/auth.json';
import trCertificates from '../../locales/tr/certificates.json';
import trCommon from '../../locales/tr/common.json';
import trConsumption from '../../locales/tr/consumption.json';
import trContent from '../../locales/tr/content.json';
import trErrors from '../../locales/tr/errors.json';
import trGeneration from '../../locales/tr/generation.json';
import trInterests from '../../locales/tr/interests.json';
import trPlayback from '../../locales/tr/playback.json';
import trQuiz from '../../locales/tr/quiz.json';
import trSettings from '../../locales/tr/settings.json';
import trSubscription from '../../locales/tr/subscription.json';
import trTopics from '../../locales/tr/topics.json';

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

export type Namespace = (typeof NAMESPACES)[number];

const resources = {
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
  cs: {
    common: csCommon,
    topics: csTopics,
    interests: csInterests,
    generation: csGeneration,
    playback: csPlayback,
    quiz: csQuiz,
    settings: csSettings,
    content: csContent,
    addContent: csAddContent,
    consumption: csConsumption,
    auth: csAuth,
    subscription: csSubscription,
    certificates: csCertificates,
    errors: csErrors,
    accessibility: csAccessibility,
  },
  de: {
    common: deCommon,
    topics: deTopics,
    interests: deInterests,
    generation: deGeneration,
    playback: dePlayback,
    quiz: deQuiz,
    settings: deSettings,
    content: deContent,
    addContent: deAddContent,
    consumption: deConsumption,
    auth: deAuth,
    subscription: deSubscription,
    certificates: deCertificates,
    errors: deErrors,
    accessibility: deAccessibility,
  },
  nl: {
    common: nlCommon,
    topics: nlTopics,
    interests: nlInterests,
    generation: nlGeneration,
    playback: nlPlayback,
    quiz: nlQuiz,
    settings: nlSettings,
    content: nlContent,
    addContent: nlAddContent,
    consumption: nlConsumption,
    auth: nlAuth,
    subscription: nlSubscription,
    certificates: nlCertificates,
    errors: nlErrors,
    accessibility: nlAccessibility,
  },
  fr: {
    common: frCommon,
    topics: frTopics,
    interests: frInterests,
    generation: frGeneration,
    playback: frPlayback,
    quiz: frQuiz,
    settings: frSettings,
    content: frContent,
    addContent: frAddContent,
    consumption: frConsumption,
    auth: frAuth,
    subscription: frSubscription,
    certificates: frCertificates,
    errors: frErrors,
    accessibility: frAccessibility,
  },
  it: {
    common: itCommon,
    topics: itTopics,
    interests: itInterests,
    generation: itGeneration,
    playback: itPlayback,
    quiz: itQuiz,
    settings: itSettings,
    content: itContent,
    addContent: itAddContent,
    consumption: itConsumption,
    auth: itAuth,
    subscription: itSubscription,
    certificates: itCertificates,
    errors: itErrors,
    accessibility: itAccessibility,
  },
  pl: {
    common: plCommon,
    topics: plTopics,
    interests: plInterests,
    generation: plGeneration,
    playback: plPlayback,
    quiz: plQuiz,
    settings: plSettings,
    content: plContent,
    addContent: plAddContent,
    consumption: plConsumption,
    auth: plAuth,
    subscription: plSubscription,
    certificates: plCertificates,
    errors: plErrors,
    accessibility: plAccessibility,
  },
  pt: {
    common: ptCommon,
    topics: ptTopics,
    interests: ptInterests,
    generation: ptGeneration,
    playback: ptPlayback,
    quiz: ptQuiz,
    settings: ptSettings,
    content: ptContent,
    addContent: ptAddContent,
    consumption: ptConsumption,
    auth: ptAuth,
    subscription: ptSubscription,
    certificates: ptCertificates,
    errors: ptErrors,
    accessibility: ptAccessibility,
  },
  ro: {
    common: roCommon,
    topics: roTopics,
    interests: roInterests,
    generation: roGeneration,
    playback: roPlayback,
    quiz: roQuiz,
    settings: roSettings,
    content: roContent,
    addContent: roAddContent,
    consumption: roConsumption,
    auth: roAuth,
    subscription: roSubscription,
    certificates: roCertificates,
    errors: roErrors,
    accessibility: roAccessibility,
  },
  es: {
    common: esCommon,
    topics: esTopics,
    interests: esInterests,
    generation: esGeneration,
    playback: esPlayback,
    quiz: esQuiz,
    settings: esSettings,
    content: esContent,
    addContent: esAddContent,
    consumption: esConsumption,
    auth: esAuth,
    subscription: esSubscription,
    certificates: esCertificates,
    errors: esErrors,
    accessibility: esAccessibility,
  },
  sv: {
    common: svCommon,
    topics: svTopics,
    interests: svInterests,
    generation: svGeneration,
    playback: svPlayback,
    quiz: svQuiz,
    settings: svSettings,
    content: svContent,
    addContent: svAddContent,
    consumption: svConsumption,
    auth: svAuth,
    subscription: svSubscription,
    certificates: svCertificates,
    errors: svErrors,
    accessibility: svAccessibility,
  },
  tr: {
    common: trCommon,
    topics: trTopics,
    interests: trInterests,
    generation: trGeneration,
    playback: trPlayback,
    quiz: trQuiz,
    settings: trSettings,
    content: trContent,
    addContent: trAddContent,
    consumption: trConsumption,
    auth: trAuth,
    subscription: trSubscription,
    certificates: trCertificates,
    errors: trErrors,
    accessibility: trAccessibility,
  },
};

/**
 * Initialize i18next with the specified locale.
 * Call this once on app startup.
 */
export const initI18n = async (locale: string = 'en') => {
  await i18n.use(initReactI18next).init({
    lng: locale,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: NAMESPACES,
    resources,
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
