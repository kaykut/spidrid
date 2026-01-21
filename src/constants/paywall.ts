/**
 * Paywall Constants
 *
 * Centralized copy and configuration for the paywall screen.
 * Includes contextual subheadlines for different trigger types.
 */

// =============================================================================
// Types
// =============================================================================

export type PaywallTrigger =
  | 'daily_limit'
  | 'premium_portion'
  | 'premium_flavor'
  | 'sign_in'
  | 'wpm_limit'
  | 'upgrade'
  | 'default';

export interface PaywallFeatureConfig {
  icon: string;
  title: string;
  subtitle: string;
}

export interface PaywallCopy {
  headline: string;
  defaultSubheadline: string;
  features: PaywallFeatureConfig[];
  ctaWithTrial: string;
  ctaWithoutTrial: string;
  ctaSubtextWithTrial: string;
  ctaSubtextWithoutTrial: string;
  secondaryCta: string;
}

// =============================================================================
// Copy Constants
// =============================================================================

export const PAYWALL_COPY: PaywallCopy = {
  headline: 'Devour Any Topic',
  defaultSubheadline:
    'Generate unlimited custom articles on anything you want to learn—synced across all your devices.',
  features: [
    {
      icon: 'infinite-outline',
      title: 'Unlimited AI articles',
      subtitle: 'No daily caps on learning',
    },
    {
      icon: 'sync-outline',
      title: 'Multi-device sync',
      subtitle: 'Pick up where you left off',
    },
    {
      icon: 'speedometer-outline',
      title: 'Premium reading speed',
      subtitle: 'Up to 1,500 WPM',
    },
  ],
  ctaWithTrial: 'Try Free for {trial_days} Days',
  ctaWithoutTrial: 'Subscribe Now',
  ctaSubtextWithTrial: 'then {price}/year',
  ctaSubtextWithoutTrial: '{price}/year',
  secondaryCta: 'Not now',
};

// =============================================================================
// Contextual Subheadlines
// =============================================================================

export const PAYWALL_SUBHEADLINES: Record<PaywallTrigger, string> = {
  daily_limit: "You've used your 2 free articles today. Go unlimited?",
  premium_portion: 'Snack, Meal, and Feast portions require Premium.',
  premium_flavor: 'Fact, Story, and Analogy tones require Premium.',
  sign_in: 'Sign in requires Devoro Premium for cross-device sync.',
  wpm_limit: 'Reading speeds above 450 WPM require Premium.',
  upgrade: PAYWALL_COPY.defaultSubheadline,
  default: PAYWALL_COPY.defaultSubheadline,
};

// =============================================================================
// Legal URLs
// =============================================================================

export const LEGAL_URLS = {
  terms: 'https://devoro.app/terms',
  privacy: 'https://devoro.app/privacy',
} as const;
