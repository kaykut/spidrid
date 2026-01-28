/**
 * Paywall Constants
 *
 * Types and configuration for the paywall screen.
 * All copy is now internationalized via i18n translation files.
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

// =============================================================================
// Legal URLs
// =============================================================================

export const LEGAL_URLS = {
  terms: 'https://devoro.app/terms',
  privacy: 'https://devoro.app/privacy',
} as const;
