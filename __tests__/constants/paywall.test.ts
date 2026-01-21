/**
 * Tests for Paywall Constants
 *
 * Verifies paywall copy, types, and contextual subheadlines.
 */

import {
  PAYWALL_COPY,
  PAYWALL_SUBHEADLINES,
  LEGAL_URLS,
  type PaywallTrigger,
} from '../../src/constants/paywall';

describe('Paywall Constants', () => {
  describe('PAYWALL_COPY', () => {
    it('has the correct headline', () => {
      expect(PAYWALL_COPY.headline).toBe('Devour Any Topic');
    });

    it('has a default subheadline', () => {
      expect(PAYWALL_COPY.defaultSubheadline).toContain('unlimited custom articles');
    });

    it('has three features', () => {
      expect(PAYWALL_COPY.features).toHaveLength(3);
    });

    it('has unlimited articles feature', () => {
      const feature = PAYWALL_COPY.features.find(f => f.icon === 'infinite-outline');
      expect(feature).toBeDefined();
      expect(feature?.title).toBe('Unlimited AI articles');
      expect(feature?.subtitle).toBe('No daily caps on learning');
    });

    it('has multi-device sync feature', () => {
      const feature = PAYWALL_COPY.features.find(f => f.icon === 'sync-outline');
      expect(feature).toBeDefined();
      expect(feature?.title).toBe('Multi-device sync');
      expect(feature?.subtitle).toBe('Pick up where you left off');
    });

    it('has premium speed feature', () => {
      const feature = PAYWALL_COPY.features.find(f => f.icon === 'speedometer-outline');
      expect(feature).toBeDefined();
      expect(feature?.title).toBe('Premium reading speed');
      expect(feature?.subtitle).toContain('1,500 WPM');
    });

    it('has CTA with trial text', () => {
      expect(PAYWALL_COPY.ctaWithTrial).toContain('{trial_days}');
    });

    it('has CTA without trial text', () => {
      expect(PAYWALL_COPY.ctaWithoutTrial).toBe('Subscribe Now');
    });

    it('has secondary CTA text', () => {
      expect(PAYWALL_COPY.secondaryCta).toBe('Not now');
    });
  });

  describe('PAYWALL_SUBHEADLINES', () => {
    it('has subheadline for daily_limit trigger', () => {
      expect(PAYWALL_SUBHEADLINES.daily_limit).toContain('2 free articles');
    });

    it('has subheadline for premium_portion trigger', () => {
      expect(PAYWALL_SUBHEADLINES.premium_portion).toContain('Snack, Meal, and Feast');
    });

    it('has subheadline for premium_flavor trigger', () => {
      expect(PAYWALL_SUBHEADLINES.premium_flavor).toContain('Fact, Story, and Analogy');
    });

    it('has subheadline for sign_in trigger', () => {
      expect(PAYWALL_SUBHEADLINES.sign_in).toContain('cross-device sync');
    });

    it('has subheadline for wpm_limit trigger', () => {
      expect(PAYWALL_SUBHEADLINES.wpm_limit).toContain('450 WPM');
    });

    it('has subheadline for upgrade trigger', () => {
      expect(PAYWALL_SUBHEADLINES.upgrade).toBe(PAYWALL_COPY.defaultSubheadline);
    });

    it('has subheadline for default trigger', () => {
      expect(PAYWALL_SUBHEADLINES.default).toBe(PAYWALL_COPY.defaultSubheadline);
    });

    it('covers all PaywallTrigger types', () => {
      const triggers: PaywallTrigger[] = [
        'daily_limit',
        'premium_portion',
        'premium_flavor',
        'sign_in',
        'wpm_limit',
        'upgrade',
        'default',
      ];

      triggers.forEach(trigger => {
        expect(PAYWALL_SUBHEADLINES[trigger]).toBeDefined();
        expect(typeof PAYWALL_SUBHEADLINES[trigger]).toBe('string');
      });
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
