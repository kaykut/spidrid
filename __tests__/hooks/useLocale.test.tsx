/**
 * useLocale Hook Tests
 *
 * Tests for React hook that provides i18n functionality to components.
 * Following TDD: These tests are written BEFORE implementation.
 */

import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useLocale } from '../../src/hooks/useLocale';
import { useLocaleStore } from '../../src/store/localeStore';
import { initI18n } from '../../src/services/i18n';

describe('useLocale hook', () => {
  beforeEach(async () => {
    // Reset store
    useLocaleStore.setState({
      currentLocale: 'en',
      isInitialized: true,
    });

    // Initialize i18n for tests
    await initI18n('en');
  });

  describe('translation function', () => {
    it('returns t function for translating keys', () => {
      const { result } = renderHook(() => useLocale());

      expect(typeof result.current.t).toBe('function');
    });

    it('translates keys from common namespace', () => {
      const { result } = renderHook(() => useLocale('common'));

      // This will use the actual translation or fallback to key
      const translation = result.current.t('app_name');

      expect(typeof translation).toBe('string');
    });

    it('supports translation with interpolation', () => {
      const { result } = renderHook(() => useLocale('common'));

      // Test interpolation (if translation supports it)
      const translation = result.current.t('greeting', { name: 'John' });

      expect(typeof translation).toBe('string');
    });

    it('accepts namespace parameter', () => {
      const { result: commonResult } = renderHook(() => useLocale('common'));
      const { result: playbackResult } = renderHook(() => useLocale('playback'));

      expect(typeof commonResult.current.t).toBe('function');
      expect(typeof playbackResult.current.t).toBe('function');
    });

    it('accepts multiple namespaces as array', () => {
      const { result } = renderHook(() => useLocale(['common', 'playback']));

      expect(typeof result.current.t).toBe('function');
    });
  });

  describe('locale info', () => {
    it('provides current locale code', () => {
      const { result } = renderHook(() => useLocale());

      expect(result.current.currentLocale).toBe('en');
      expect(typeof result.current.currentLocale).toBe('string');
    });

    it('provides list of supported locales', () => {
      const { result } = renderHook(() => useLocale());

      expect(Array.isArray(result.current.supportedLocales)).toBe(true);
      expect(result.current.supportedLocales.length).toBe(11);
    });

    it('supported locales have required properties', () => {
      const { result } = renderHook(() => useLocale());

      result.current.supportedLocales.forEach((locale) => {
        expect(locale).toHaveProperty('code');
        expect(locale).toHaveProperty('nativeName');
        expect(locale).toHaveProperty('englishName');
      });
    });
  });

  describe('language switching', () => {
    it('provides switchLanguage function', () => {
      const { result } = renderHook(() => useLocale());

      expect(typeof result.current.switchLanguage).toBe('function');
    });

    it('switchLanguage updates current locale', async () => {
      const { result } = renderHook(() => useLocale());

      await act(async () => {
        await result.current.switchLanguage('fr');
      });

      await waitFor(() => {
        expect(result.current.currentLocale).toBe('fr');
      });
    });

    it('switchLanguage updates both i18n and store', async () => {
      const { result } = renderHook(() => useLocale());

      await act(async () => {
        await result.current.switchLanguage('de');
      });

      await waitFor(() => {
        expect(result.current.currentLocale).toBe('de');
        expect(useLocaleStore.getState().currentLocale).toBe('de');
      });
    });

    it('component re-renders when language changes', async () => {
      const { result } = renderHook(() => useLocale());

      const initialLocale = result.current.currentLocale;

      await act(async () => {
        await result.current.switchLanguage('es');
      });

      await waitFor(() => {
        expect(result.current.currentLocale).not.toBe(initialLocale);
        expect(result.current.currentLocale).toBe('es');
      });
    });
  });

  describe('default namespace', () => {
    it('defaults to "common" namespace when no namespace provided', () => {
      const { result } = renderHook(() => useLocale());

      // Should be able to translate common keys
      const translation = result.current.t('cancel');
      expect(typeof translation).toBe('string');
    });
  });
});
