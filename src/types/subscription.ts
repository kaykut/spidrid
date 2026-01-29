export interface SubscriptionState {
  isPremium: boolean;
  isLoading: boolean;
}

export interface PurchaseOffering {
  identifier: string;
  title: string;
  description: string;
  priceString: string;
}

// Free tier limits as constants
export const FREE_TIER_LIMITS = {
  MAX_WPM: 900,
  MAX_DAILY_AI_GENERATIONS: 3,
} as const;

export const PREMIUM_LIMITS = {
  MAX_WPM: 1500,
} as const;