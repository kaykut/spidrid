/**
 * Tests for Paywall Constants
 *
 * Verifies paywall types and legal URLs.
 * Copy content is now tested via i18n translation files.
 */

import {
  LEGAL_URLS,
  type PaywallTrigger,
} from '../../src/constants/paywall';

describe('Paywall Constants', () => {
  describe('PaywallTrigger type', () => {
    it('covers all expected trigger types', () => {
      const triggers: PaywallTrigger[] = [
        'daily_limit',
        'premium_portion',
        'premium_flavor',
        'sign_in',
        'wpm_limit',
        'upgrade',
        'default',
      ];

      // Type check ensures these are valid PaywallTrigger values
      expect(triggers).toHaveLength(7);
    });
  });

  describe('LEGAL_URLS', () => {
    it('has terms URL', () => {
      expect(LEGAL_URLS.terms).toBe('https://devoro.app/terms');
    });

    it('has privacy URL', () => {
      expect(LEGAL_URLS.privacy).toBe('https://devoro.app/privacy');
    });
  });
});
