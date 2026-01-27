/**
 * i18n Service Tests
 *
 * Tests for i18next configuration, language switching, and translation loading.
 * Following TDD: These tests are written BEFORE implementation.
 */

import { initI18n, changeLanguage, getCurrentLanguage, NAMESPACES, i18n } from '../../../src/services/i18n';

describe('i18n service', () => {
  beforeEach(() => {
    // Reset i18n state between tests
    jest.resetModules();
  });

  describe('initialization', () => {
    it('configures i18next with correct fallback language (en)', async () => {
      await initI18n();

      const currentLang = getCurrentLanguage();
      expect(currentLang).toBe('en');
    });

    it('loads initial language from provided locale code', async () => {
      await initI18n('fr');

      const currentLang = getCurrentLanguage();
      expect(currentLang).toBe('fr');
    });

    it('supports all 11 target languages', async () => {
      const supportedLanguages = ['en', 'cs', 'de', 'nl', 'fr', 'it', 'pl', 'pt', 'ro', 'es', 'sv'];

      for (const lang of supportedLanguages) {
        await initI18n(lang);
        const currentLang = getCurrentLanguage();
        expect(currentLang).toBe(lang);
      }
    });

    it('defaults to "en" when no locale provided', async () => {
      await initI18n();

      const currentLang = getCurrentLanguage();
      expect(currentLang).toBe('en');
    });
  });

  describe('changeLanguage()', () => {
    beforeEach(async () => {
      // Initialize with English first
      await initI18n('en');
    });

    it('switches language and returns success', async () => {
      await changeLanguage('de');

      const currentLang = getCurrentLanguage();
      expect(currentLang).toBe('de');
    });

    it('switches to multiple languages sequentially', async () => {
      await changeLanguage('fr');
      expect(getCurrentLanguage()).toBe('fr');

      await changeLanguage('es');
      expect(getCurrentLanguage()).toBe('es');

      await changeLanguage('cs');
      expect(getCurrentLanguage()).toBe('cs');
    });

    it('handles language change errors gracefully', async () => {
      // Invalid locale code should fall back gracefully
      // i18next will use fallback language
      await changeLanguage('invalid-locale');

      // i18next should handle this and potentially fall back to 'en'
      const currentLang = getCurrentLanguage();
      expect(typeof currentLang).toBe('string');
    });
  });

  describe('translation namespaces', () => {
    it('has 15 defined namespaces', () => {
      expect(NAMESPACES).toHaveLength(15);
    });

    it('includes all required namespaces', () => {
      const expectedNamespaces = [
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
      ];

      expect(NAMESPACES).toEqual(expect.arrayContaining(expectedNamespaces));
    });

    it('loads common namespace on init', async () => {
      const i18n = await initI18n();

      // Check that i18n has loaded resources
      expect(i18n.hasResourceBundle('en', 'common')).toBe(true);
    });
  });

  describe('getCurrentLanguage()', () => {
    it('returns currently active language code', async () => {
      await initI18n('it');

      const lang = getCurrentLanguage();

      expect(lang).toBe('it');
      expect(typeof lang).toBe('string');
    });

    it('updates when language changes', async () => {
      await initI18n('en');
      expect(getCurrentLanguage()).toBe('en');

      await changeLanguage('pl');
      expect(getCurrentLanguage()).toBe('pl');
    });
  });

  describe('edge cases', () => {
    beforeEach(async () => {
      await initI18n('en');
    });

    it('handles missing translation keys gracefully', () => {
      // Try to translate a key that doesn't exist
      const translation = i18n.t('nonexistent.key');

      // i18next should return the key itself when translation missing
      expect(typeof translation).toBe('string');
    });

    it('handles invalid locale codes gracefully', async () => {
      // Should not throw when switching to invalid locale
      await expect(changeLanguage('xx-INVALID')).resolves.not.toThrow();
    });
  });
});
