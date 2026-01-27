/**
 * Locale Store
 *
 * Manages language selection, device locale detection, and persistence.
 * Follows existing store patterns with initialize() method and AsyncStorage persistence.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SupportedLocale, SUPPORTED_LOCALES } from '../types/locale';
import { mapToSupportedLocale, isSupportedLocale } from '../utils/localeUtils';

interface LocaleState {
  currentLocale: SupportedLocale | null;
  isInitialized: boolean;
  initialize: () => Promise<void>;
  setLocale: (locale: SupportedLocale) => void;
  getSupportedLocales: () => typeof SUPPORTED_LOCALES;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      currentLocale: null,
      isInitialized: false,

      initialize: async () => {
        // Idempotent guard - don't re-initialize
        if (get().isInitialized) {
          return;
        }

        try {
          // Detect device locale
          const deviceLocales = getLocales();
          const deviceLang = deviceLocales[0]?.languageCode ?? undefined;

          // Map device locale to supported locale or fallback to 'en'
          const locale = mapToSupportedLocale(deviceLang);

          set({ currentLocale: locale, isInitialized: true });
        } catch (error) {
          console.error('[localeStore] Initialization failed:', error);
          // Fallback to English on error
          set({ currentLocale: 'en', isInitialized: true });
        }
      },

      setLocale: (locale) => {
        if (!isSupportedLocale(locale)) {
          throw new Error(`Unsupported locale: ${locale}`);
        }
        set({ currentLocale: locale });
      },

      getSupportedLocales: () => SUPPORTED_LOCALES,
    }),
    {
      name: 'devoro-locale',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        currentLocale: state.currentLocale,
      }),
    }
  )
);
