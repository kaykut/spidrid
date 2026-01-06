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
  MAX_CONTENT: 5,
  MAX_WPM: 450,
} as const;

export const PREMIUM_LIMITS = {
  MAX_WPM: 1500,
} as const;

// Default offering for development/mock
export const MOCK_OFFERING: PurchaseOffering = {
  identifier: 'spidrid_premium_monthly',
  title: 'Spidrid Premium',
  description: 'Unlimited speed reading up to 1500 WPM',
  priceString: '$4.99/month',
};
