export interface SubscriptionState {
  isPremium: boolean;
  isLoading: boolean;
  contentAccessCount: number;
}

export interface PurchaseOffering {
  identifier: string;
  title: string;
  description: string;
  priceString: string;
}

// Free tier limits as constants
export const FREE_TIER_LIMITS = {
  MAX_CONTENT: 2,
  MAX_WPM: 450,
  DAILY_ARTICLES: 2, // Alias for clarity
} as const;

export const PREMIUM_LIMITS = {
  MAX_WPM: 1500,
} as const;
