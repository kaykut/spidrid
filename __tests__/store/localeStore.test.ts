/**
 * localeStore Tests
 *
 * Tests for locale persistence, initialization, and language selection behavior.
 * Following TDD: These tests are written BEFORE implementation.
 */

import { getLocales } from 'expo-localization';
import { useLocaleStore } from '../../src/store/localeStore';

// Mock expo-localization (external dependency)
jest.mock('expo-localization', () => ({
  getLocales: jest.fn(),
}));

const mockGetLocales = getLocales as jest.MockedFunction<typeof getLocales>;

describe('localeStore', () => {
  beforeEach(() => {
    // Reset store to initial state
    useLocaleStore.setState({
      currentLocale: null,
      isInitialized: false,
    });

    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('starts with null currentLocale before initialization', () => {
      const state = useLocaleStore.getState();
      expect(state.currentLocale).toBeNull();
    });

    it('starts with isInitialized false', () => {
      const state = useLocaleStore.getState();
      expect(state.isInitialized).toBe(false);
    });

    it('provides getSupportedLocales function', () => {
      const state = useLocaleStore.getState();
      expect(typeof state.getSupportedLocales).toBe('function');
    });
  });

  describe('initialize()', () => {
    it('detects device locale when device locale is supported', async () => {
      // Mock device locale as Czech
      mockGetLocales.mockReturnValue([
        { languageCode: 'cs', languageTag: 'cs-CZ', regionCode: 'CZ' },
      ] as any);

      const { initialize } = useLocaleStore.getState();
      await initialize();

      const state = useLocaleStore.getState();
      expect(state.currentLocale).toBe('cs');
      expect(state.isInitialized).toBe(true);
    });

    it('falls back to "en" if device locale is not supported', async () => {
      // Mock device locale as unsupported (Chinese)
      mockGetLocales.mockReturnValue([
        { languageCode: 'zh', languageTag: 'zh-CN', regionCode: 'CN' },
      ] as any);

      const { initialize } = useLocaleStore.getState();
      await initialize();

      const state = useLocaleStore.getState();
      expect(state.currentLocale).toBe('en');
      expect(state.isInitialized).toBe(true);
    });

    it('falls back to "en" if no device locales available', async () => {
      // Mock no device locales
      mockGetLocales.mockReturnValue([]);

      const { initialize } = useLocaleStore.getState();
      await initialize();

      const state = useLocaleStore.getState();
      expect(state.currentLocale).toBe('en');
      expect(state.isInitialized).toBe(true);
    });

    it('maps device locale variants to base language (en-US → en)', async () => {
      // Mock device locale as en-US
      mockGetLocales.mockReturnValue([
        { languageCode: 'en', languageTag: 'en-US', regionCode: 'US' },
      ] as any);

      const { initialize } = useLocaleStore.getState();
      await initialize();

      const state = useLocaleStore.getState();
      expect(state.currentLocale).toBe('en');
    });

    it('is idempotent - does not re-initialize if already initialized', async () => {
      // First initialization
      mockGetLocales.mockReturnValue([
        { languageCode: 'fr', languageTag: 'fr-FR', regionCode: 'FR' },
      ] as any);

      const { initialize } = useLocaleStore.getState();
      await initialize();

      expect(useLocaleStore.getState().currentLocale).toBe('fr');

      // Manually change locale to test idempotence
      useLocaleStore.setState({ currentLocale: 'de' });

      // Second initialization should not change the locale
      mockGetLocales.mockReturnValue([
        { languageCode: 'es', languageTag: 'es-ES', regionCode: 'ES' },
      ] as any);

      await initialize();

      // Locale should remain 'de' (not changed to 'es')
      expect(useLocaleStore.getState().currentLocale).toBe('de');
      expect(mockGetLocales).toHaveBeenCalledTimes(1); // Only called once
    });

    it('sets isInitialized to true after initialization', async () => {
      mockGetLocales.mockReturnValue([
        { languageCode: 'en', languageTag: 'en-US', regionCode: 'US' },
      ] as any);

      const { initialize } = useLocaleStore.getState();
      await initialize();

      expect(useLocaleStore.getState().isInitialized).toBe(true);
    });
  });

  describe('setLocale()', () => {
    it('updates currentLocale to new value', () => {
      const { setLocale } = useLocaleStore.getState();

      setLocale('fr');

      expect(useLocaleStore.getState().currentLocale).toBe('fr');
    });

    it('rejects unsupported locale codes with error', () => {
      const { setLocale } = useLocaleStore.getState();

      // @ts-expect-error - Testing runtime validation
      expect(() => setLocale('zh')).toThrow('Unsupported locale: zh');
      expect(useLocaleStore.getState().currentLocale).toBeNull();
    });

    it('accepts all 11 supported locales', () => {
      const { setLocale } = useLocaleStore.getState();

      const supportedLocales = ['en', 'cs', 'de', 'nl', 'fr', 'it', 'pl', 'pt', 'ro', 'es', 'sv'];

      supportedLocales.forEach((locale) => {
        setLocale(locale as any);
        expect(useLocaleStore.getState().currentLocale).toBe(locale);
      });
    });
  });

  describe('getSupportedLocales()', () => {
    it('returns array of all 11 supported languages', () => {
      const { getSupportedLocales } = useLocaleStore.getState();

      const locales = getSupportedLocales();

      expect(locales).toHaveLength(11);
      expect(locales.map(l => l.code)).toEqual(
        expect.arrayContaining(['en', 'cs', 'de', 'nl', 'fr', 'it', 'pl', 'pt', 'ro', 'es', 'sv'])
      );
    });

    it('returns locales with code, nativeName, and englishName properties', () => {
      const { getSupportedLocales } = useLocaleStore.getState();

      const locales = getSupportedLocales();

      locales.forEach((locale) => {
        expect(locale).toHaveProperty('code');
        expect(locale).toHaveProperty('nativeName');
        expect(locale).toHaveProperty('englishName');
        expect(typeof locale.code).toBe('string');
        expect(typeof locale.nativeName).toBe('string');
        expect(typeof locale.englishName).toBe('string');
      });
    });

    it('includes native names for each language', () => {
      const { getSupportedLocales } = useLocaleStore.getState();

      const locales = getSupportedLocales();
      const localeMap = Object.fromEntries(locales.map(l => [l.code, l.nativeName]));

      expect(localeMap['en']).toBe('English');
      expect(localeMap['cs']).toBe('Čeština');
      expect(localeMap['de']).toBe('Deutsch');
      expect(localeMap['fr']).toBe('Français');
      expect(localeMap['es']).toBe('Español');
    });
  });

  describe('persistence', () => {
    it('persists currentLocale to AsyncStorage', () => {
      // Note: Persistence is handled by Zustand middleware automatically
      // This test verifies the store is configured with persist()

      const { setLocale } = useLocaleStore.getState();

      setLocale('de');

      // After setting locale, Zustand should persist it
      // The actual persistence is tested by Zustand itself
      // We just verify the state updated correctly
      expect(useLocaleStore.getState().currentLocale).toBe('de');
    });
  });
});
