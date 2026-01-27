/**
 * useLocale Hook
 *
 * Provides translation function and locale management to components.
 * Bridges react-i18next with localeStore.
 */

import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../services/i18n';
import { useLocaleStore } from '../store/localeStore';
import type { Namespace } from '../services/i18n';
import type { SupportedLocale } from '../types/locale';

export const useLocale = (namespace: Namespace | Namespace[] = 'common') => {
  const { t, i18n } = useTranslation(namespace);
  const { setLocale, getSupportedLocales } = useLocaleStore();

  const switchLanguage = async (locale: SupportedLocale) => {
    await changeLanguage(locale);
    setLocale(locale);
  };

  return {
    t,
    currentLocale: i18n.language as SupportedLocale,
    supportedLocales: getSupportedLocales(),
    switchLanguage,
  };
};
