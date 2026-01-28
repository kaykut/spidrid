/**
 * Tests for Paywall Route
 *
 * Full-screen modal route for premium subscription paywall.
 * Tests the complete implementation with all components and flows.
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PaywallScreen from '../../src/app/paywall';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';
import { useSubscriptionStore } from '../../src/store/subscriptionStore';
import type { PurchasesPackage } from '../../src/services/purchases';

// =============================================================================
// Mocks
// =============================================================================

// Mock expo-router
const mockRouterBack = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    back: () => mockRouterBack(),
  },
  useLocalSearchParams: () => ({
    trigger: 'upgrade',
  }),
}));

// Mock safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <View testID={testID || `icon-${name}`} />
    ),
  };
});

// Mock expo-linking
jest.mock('expo-linking', () => ({
  openURL: jest.fn(),
}));

// Mock react-i18next for translations
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => {
      const translations: Record<string, string> = {
        'paywall.headline': 'Feed Your Brain',
        'paywall.subheadline_default': 'Leave doomscrolling behind and learn any topic in minutes.',
        'paywall.subheadline_upgrade': 'Leave doomscrolling behind and learn any topic in minutes.',
        'paywall.subheadline_daily_limit': "You've used your 2 free articles today. Go unlimited?",
        'paywall.features.unlimited_title': 'Unlimited AI articles',
        'paywall.features.unlimited_subtitle': 'No daily caps on learning',
        'paywall.features.sync_title': 'Multi-device sync',
        'paywall.features.sync_subtitle': 'Pick up where you left off',
        'paywall.features.speed_title': 'Premium reading speed',
        'paywall.features.speed_subtitle': 'Up to 1,500 WPM',
        'paywall.plans.yearly': 'Yearly',
        'paywall.plans.monthly': 'Monthly',
        'paywall.plans.most_popular': 'Most Popular',
        'paywall.plans.save_percent': `Save ${params?.percent || 17}%`,
        'paywall.plans.per_month': `${params?.price || ''}/mo`,
        'paywall.plans.free_trial': `${params?.days || ''} day free trial`,
        'paywall.plans.no_plans': 'No plans available',
        'paywall.cta.subscribe': 'Subscribe Now',
        'paywall.cta.try_free': `Try Free for ${params?.days || ''} Days`,
        'paywall.cta.then_price': `then ${params?.price || ''}/year`,
        'paywall.cta.price_per_year': `${params?.price || ''}/year`,
        'paywall.trust.cancel_anytime': 'Cancel anytime',
        'paywall.footer.restore': 'Restore purchases',
        'paywall.footer.terms': 'Terms',
        'paywall.footer.privacy': 'Privacy',
        'paywall.errors.offline': 'Connect to internet to subscribe',
        'paywall.errors.pricing_unavailable': 'Pricing unavailable',
        'paywall.errors.retry': 'Retry',
        'alerts.already_subscribed_title': 'Already Subscribed',
        'alerts.already_subscribed_message': "You're already a premium member!",
        'alerts.purchase_failed': 'Purchase failed. Please try again.',
        'alerts.restored_title': 'Purchases Restored!',
        'alerts.restored_message': 'Your subscription has been restored.',
        'alerts.error_title': 'Error',
        'alerts.no_purchases_title': 'No Purchases Found',
        'alerts.no_purchases': 'No previous purchases found.',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock purchases service
const mockGetOfferings = jest.fn();
jest.mock('../../src/services/purchases', () => ({
  getOfferings: () => mockGetOfferings(),
  purchasePackage: jest.fn(),
  restorePurchases: jest.fn(),
  getPremiumEntitlement: () => 'premium',
}));

// =============================================================================
// Test Data
// =============================================================================

const mockYearlyPackage: PurchasesPackage = {
  identifier: '$rc_annual',
  packageType: 'ANNUAL',
  product: {
    identifier: 'devoro_premium_yearly',
    title: 'Devoro Premium (Yearly)',
    description: 'Annual subscription',
    priceString: '$29.99',
    price: 29.99,
    introPrice: {
      price: 0,
      priceString: 'Free',
      period: 'P3D',
      periodUnit: 'DAY',
      periodNumberOfUnits: 3,
    },
  },
};

const mockMonthlyPackage: PurchasesPackage = {
  identifier: '$rc_monthly',
  packageType: 'MONTHLY',
  product: {
    identifier: 'devoro_premium_monthly',
    title: 'Devoro Premium (Monthly)',
    description: 'Monthly subscription',
    priceString: '$4.99',
    price: 4.99,
  },
};

// =============================================================================
// Test Helpers
// =============================================================================

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

function resetStores() {
  useSubscriptionStore.setState({
    isPremium: false,
    isLoading: false,
    isRestoring: false,
  });
}

// =============================================================================
// Tests
// =============================================================================

describe('PaywallScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetStores();
    mockGetOfferings.mockResolvedValue([mockYearlyPackage, mockMonthlyPackage]);
  });

  describe('basic rendering', () => {
    it('renders the paywall screen', () => {
      const { getByTestId } = renderWithProviders(<PaywallScreen />);

      expect(getByTestId('paywall-screen')).toBeTruthy();
    });

    it('shows close button', () => {
      const { getByTestId } = renderWithProviders(<PaywallScreen />);

      expect(getByTestId('paywall-close-button')).toBeTruthy();
    });

    it('shows headline', () => {
      const { getByText } = renderWithProviders(<PaywallScreen />);

      expect(getByText('Feed Your Brain')).toBeTruthy();
    });

    it('shows subheadline', () => {
      const { getByText } = renderWithProviders(<PaywallScreen />);

      expect(getByText(/doomscrolling/i)).toBeTruthy();
    });
  });

  describe('features', () => {
    it('shows unlimited articles feature', () => {
      const { getByText } = renderWithProviders(<PaywallScreen />);

      expect(getByText('Unlimited AI articles')).toBeTruthy();
    });

    it('shows multi-device sync feature', () => {
      const { getByText } = renderWithProviders(<PaywallScreen />);

      expect(getByText('Multi-device sync')).toBeTruthy();
    });

    it('shows premium speed feature', () => {
      const { getByText } = renderWithProviders(<PaywallScreen />);

      expect(getByText('Premium reading speed')).toBeTruthy();
    });
  });

  describe('plan selector', () => {
    it('shows plan selector after loading', async () => {
      const { getByTestId } = renderWithProviders(<PaywallScreen />);

      await waitFor(() => {
        expect(getByTestId('yearly-plan-card')).toBeTruthy();
        expect(getByTestId('monthly-plan-card')).toBeTruthy();
      });
    });

    it('shows loading state while fetching offerings', () => {
      mockGetOfferings.mockImplementation(() => new Promise(() => {})); // Never resolves
      const { getByTestId } = renderWithProviders(<PaywallScreen />);

      expect(getByTestId('plan-selector-loading')).toBeTruthy();
    });
  });

  describe('CTAs', () => {
    it('shows primary CTA button', async () => {
      const { getByTestId } = renderWithProviders(<PaywallScreen />);

      await waitFor(() => {
        expect(getByTestId('paywall-primary-cta')).toBeTruthy();
      });
    });

  });

  describe('footer links', () => {
    it('shows Restore purchases link', () => {
      const { getByText } = renderWithProviders(<PaywallScreen />);

      expect(getByText('Restore purchases')).toBeTruthy();
    });

    it('shows Terms link', () => {
      const { getByText } = renderWithProviders(<PaywallScreen />);

      expect(getByText('Terms')).toBeTruthy();
    });

    it('shows Privacy link', () => {
      const { getByText } = renderWithProviders(<PaywallScreen />);

      expect(getByText('Privacy')).toBeTruthy();
    });
  });

  describe('close button', () => {
    it('calls router.back() when close button pressed', () => {
      const { getByTestId } = renderWithProviders(<PaywallScreen />);

      fireEvent.press(getByTestId('paywall-close-button'));

      expect(mockRouterBack).toHaveBeenCalled();
    });

  });

  describe('error handling', () => {
    it('shows offline message when network error occurs', async () => {
      mockGetOfferings.mockRejectedValue(new Error('Network error'));
      const { getAllByText } = renderWithProviders(<PaywallScreen />);

      await waitFor(() => {
        // Multiple elements may contain this text (error message and CTA button)
        const elements = getAllByText(/connect to internet/i);
        expect(elements.length).toBeGreaterThan(0);
      });
    });

    it('shows pricing unavailable for non-network errors', async () => {
      mockGetOfferings.mockRejectedValue(new Error('Unknown error'));
      const { getByText } = renderWithProviders(<PaywallScreen />);

      await waitFor(() => {
        expect(getByText(/pricing unavailable/i)).toBeTruthy();
      });
    });

    it('shows retry button when error occurs', async () => {
      mockGetOfferings.mockRejectedValue(new Error('Unknown error'));
      const { getByText } = renderWithProviders(<PaywallScreen />);

      await waitFor(() => {
        expect(getByText('Retry')).toBeTruthy();
      });
    });
  });

  describe('edge cases', () => {
    it('handles only yearly package available', async () => {
      mockGetOfferings.mockResolvedValue([mockYearlyPackage]);
      const { getByTestId, queryByTestId } = renderWithProviders(<PaywallScreen />);

      await waitFor(() => {
        expect(getByTestId('yearly-plan-card')).toBeTruthy();
        expect(queryByTestId('monthly-plan-card')).toBeNull();
      });
    });

    it('handles only monthly package available', async () => {
      mockGetOfferings.mockResolvedValue([mockMonthlyPackage]);
      const { getByTestId, queryByTestId } = renderWithProviders(<PaywallScreen />);

      await waitFor(() => {
        expect(queryByTestId('yearly-plan-card')).toBeNull();
        expect(getByTestId('monthly-plan-card')).toBeTruthy();
      });
    });

    it('disables primary CTA when no packages available', async () => {
      mockGetOfferings.mockResolvedValue([]);
      const { getByTestId } = renderWithProviders(<PaywallScreen />);

      await waitFor(() => {
        const cta = getByTestId('paywall-primary-cta');
        expect(cta.props.accessibilityState?.disabled).toBe(true);
      });
    });

    it('shows trial text in CTA when yearly plan has trial', async () => {
      mockGetOfferings.mockResolvedValue([mockYearlyPackage]);
      const { getByText } = renderWithProviders(<PaywallScreen />);

      await waitFor(() => {
        expect(getByText(/Try Free for 3 Days/i)).toBeTruthy();
      });
    });

    it('shows subscribe text when no trial available', async () => {
      const noTrialPackage = {
        ...mockYearlyPackage,
        product: {
          ...mockYearlyPackage.product,
          introPrice: undefined,
        },
      };
      mockGetOfferings.mockResolvedValue([noTrialPackage]);
      const { getByText } = renderWithProviders(<PaywallScreen />);

      await waitFor(() => {
        expect(getByText('Subscribe Now')).toBeTruthy();
      });
    });
  });

  describe('accessibility', () => {
    it('close button has correct accessibility props', () => {
      const { getByTestId } = renderWithProviders(<PaywallScreen />);

      const closeButton = getByTestId('paywall-close-button');
      expect(closeButton.props.accessibilityLabel).toBe('Close paywall');
      expect(closeButton.props.accessibilityRole).toBe('button');
    });

    it('primary CTA has correct accessibility props', async () => {
      const { getByTestId } = renderWithProviders(<PaywallScreen />);

      await waitFor(() => {
        const cta = getByTestId('paywall-primary-cta');
        expect(cta.props.accessibilityRole).toBe('button');
        expect(cta.props.accessibilityLabel).toBeTruthy();
      });
    });
  });
});
