/**
 * Mock for react-i18next in Jest tests.
 *
 * This mock loads actual English translations and provides them through
 * the useTranslation hook, allowing tests to verify rendered text.
 */
import React from 'react';

// Import all English translation files
import enAccessibility from '../src/locales/en/accessibility.json';
import enAddContent from '../src/locales/en/addContent.json';
import enAuth from '../src/locales/en/auth.json';
import enCertificates from '../src/locales/en/certificates.json';
import enCommon from '../src/locales/en/common.json';
import enConsumption from '../src/locales/en/consumption.json';
import enContent from '../src/locales/en/content.json';
import enErrors from '../src/locales/en/errors.json';
import enGeneration from '../src/locales/en/generation.json';
import enInterests from '../src/locales/en/interests.json';
import enPlayback from '../src/locales/en/playback.json';
import enQuiz from '../src/locales/en/quiz.json';
import enSettings from '../src/locales/en/settings.json';
import enSubscription from '../src/locales/en/subscription.json';
import enTopics from '../src/locales/en/topics.json';

// Define the resources type
type TranslationResource = Record<string, unknown>;

// Combine all resources under 'en' namespace
const resources: Record<string, Record<string, TranslationResource>> = {
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
};

/**
 * Get a nested value from an object using a dot-separated path.
 * Supports paths like "actions.cancel" or "journey.wpm_label"
 */
const getNestedValue = (obj: TranslationResource, path: string): unknown => {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return current;
};

/**
 * Interpolate variables in a translation string.
 * Replaces {{variable}} with actual values.
 */
const interpolate = (str: string, params?: Record<string, unknown>): string => {
  if (!params) return str;

  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = params[key];
    return value !== undefined ? String(value) : `{{${key}}}`;
  });
};

/**
 * Create a translation function that looks up keys in the English translations.
 */
const createT = (defaultNs: string | string[] = 'common') => {
  const primaryNs = Array.isArray(defaultNs) ? defaultNs[0] : defaultNs;

  return (key: string, params?: Record<string, unknown>): string => {
    // Handle namespaced keys (e.g., "common:actions.cancel")
    let namespace = primaryNs;
    let translationKey = key;

    if (key.includes(':')) {
      const [ns, k] = key.split(':');
      namespace = ns;
      translationKey = k;
    }

    // Get the translation resource for the namespace
    const nsResource = resources.en[namespace];
    if (!nsResource) {
      // Return the key if namespace not found
      return params ? interpolate(key, params) : key;
    }

    // Look up the translation value
    const value = getNestedValue(nsResource, translationKey);

    if (typeof value === 'string') {
      return interpolate(value, params);
    }

    // If not found in primary namespace, try common namespace
    if (namespace !== 'common') {
      const commonValue = getNestedValue(resources.en.common, translationKey);
      if (typeof commonValue === 'string') {
        return interpolate(commonValue, params);
      }
    }

    // Return the key if translation not found
    return params ? interpolate(key, params) : key;
  };
};

/**
 * Mock useTranslation hook.
 * Returns a t function that looks up actual English translations.
 */
export const useTranslation = (ns?: string | string[]) => {
  return {
    t: createT(ns),
    i18n: {
      language: 'en',
      changeLanguage: jest.fn().mockResolvedValue(undefined),
      exists: jest.fn().mockReturnValue(true),
    },
    ready: true,
  };
};

/**
 * Mock Trans component.
 * Renders children directly or translation if key provided.
 */
export const Trans = ({
  children,
  i18nKey,
  values,
  components,
}: {
  children?: React.ReactNode;
  i18nKey?: string;
  values?: Record<string, unknown>;
  components?: Record<string, React.ReactElement>;
}) => {
  if (i18nKey) {
    const t = createT('common');
    const translated = t(i18nKey, values);

    // Simple component interpolation
    if (components && typeof translated === 'string') {
      // For basic cases, just return the translated text
      return translated;
    }

    return translated;
  }
  return children;
};

/**
 * Mock initReactI18next plugin.
 */
export const initReactI18next = {
  type: '3rdParty',
  init: jest.fn(),
};

/**
 * Mock withTranslation HOC.
 */
export const withTranslation =
  (ns?: string) =>
  <P extends object>(Component: React.ComponentType<P>) => {
    const WrappedComponent = (props: P) => {
      const translationProps = {
        t: createT(ns),
        i18n: {
          language: 'en',
          changeLanguage: jest.fn(),
        },
      };
      return React.createElement(Component, { ...props, ...translationProps });
    };
    WrappedComponent.displayName = `withTranslation(${Component.displayName || Component.name || 'Component'})`;
    return WrappedComponent;
  };

/**
 * Mock I18nextProvider.
 */
export const I18nextProvider = ({
  children,
}: {
  children: React.ReactNode;
  i18n?: unknown;
}) => {
  return children;
};

/**
 * Export a mock i18n instance for direct imports.
 */
const i18n = {
  language: 'en',
  changeLanguage: jest.fn().mockResolvedValue(undefined),
  t: createT('common'),
  exists: jest.fn().mockReturnValue(true),
  use: jest.fn().mockReturnThis(),
  init: jest.fn().mockResolvedValue(undefined),
};

export default i18n;
