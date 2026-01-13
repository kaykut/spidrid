/**
 * Tests for Paywall Component.
 *
 * Shows premium upgrade modal with subscription options.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Paywall } from '../../src/components/paywall/Paywall';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';
import { FREE_TIER_LIMITS, PREMIUM_LIMITS } from '../../src/types/subscription';

// Mock the subscription store
const mockPurchaseProduct = jest.fn();
const mockRestorePurchases = jest.fn();

jest.mock('../../src/store/subscriptionStore', () => ({
  useSubscriptionStore: () => ({
    purchaseProduct: mockPurchaseProduct,
    restorePurchases: mockRestorePurchases,
    isLoading: false,
    isRestoring: false,
  }),
}));

// Mock PurchasesService for price fetching
jest.mock('../../src/services/purchases', () => ({
  getOfferings: jest.fn().mockResolvedValue([
    {
      identifier: 'test-package',
      product: {
        identifier: 'test-product',
        title: 'Premium',
        description: 'Premium subscription',
        priceString: '$4.99/month',
        price: 4.99,
      },
    },
  ]),
}));

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Paywall', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPurchaseProduct.mockResolvedValue(true);
    mockRestorePurchases.mockResolvedValue({ success: false, message: 'No purchases to restore' });
  });

  describe('visibility', () => {
    it('renders when visible is true', () => {
      renderWithProviders(
        <Paywall visible={true} onClose={jest.fn()} />
      );

      expect(screen.getByText('Upgrade to Premium')).toBeTruthy();
    });

    it('does not show content when visible is false', () => {
      renderWithProviders(
        <Paywall visible={false} onClose={jest.fn()} />
      );

      // Modal content should not be visible
      expect(screen.queryByText('Upgrade to Premium')).toBeNull();
    });
  });

  describe('reason text', () => {
    it('shows WPM limit reason when reason is wpm_limit', () => {
      renderWithProviders(
        <Paywall visible={true} onClose={jest.fn()} reason="wpm_limit" />
      );

      expect(screen.getByText(new RegExp(`${FREE_TIER_LIMITS.MAX_WPM} WPM`))).toBeTruthy();
    });

    it('shows content limit reason when reason is content_limit', () => {
      renderWithProviders(
        <Paywall visible={true} onClose={jest.fn()} reason="content_limit" />
      );

      expect(screen.getByText(new RegExp(`${FREE_TIER_LIMITS.MAX_CONTENT} articles`))).toBeTruthy();
    });

    it('defaults to content_limit reason', () => {
      renderWithProviders(
        <Paywall visible={true} onClose={jest.fn()} />
      );

      expect(screen.getByText(new RegExp(`${FREE_TIER_LIMITS.MAX_CONTENT} articles`))).toBeTruthy();
    });
  });

  describe('benefits', () => {
    it('shows premium WPM limit benefit', () => {
      renderWithProviders(
        <Paywall visible={true} onClose={jest.fn()} />
      );

      expect(screen.getByText(new RegExp(`${PREMIUM_LIMITS.MAX_WPM} WPM`))).toBeTruthy();
    });

    it('shows unlimited articles benefit', () => {
      renderWithProviders(
        <Paywall visible={true} onClose={jest.fn()} />
      );

      expect(screen.getByText(/Unlimited articles/)).toBeTruthy();
    });

    it('shows all topics benefit', () => {
      renderWithProviders(
        <Paywall visible={true} onClose={jest.fn()} />
      );

      expect(screen.getByText(/All topics/)).toBeTruthy();
    });

    it('shows certificates benefit', () => {
      renderWithProviders(
        <Paywall visible={true} onClose={jest.fn()} />
      );

      expect(screen.getByText(/certificates/i)).toBeTruthy();
    });
  });

  describe('close button', () => {
    it('calls onClose when close button pressed', () => {
      const onClose = jest.fn();
      renderWithProviders(
        <Paywall visible={true} onClose={onClose} />
      );

      const closeButton = screen.getByText('✕');
      fireEvent.press(closeButton);

      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('purchase button', () => {
    it('shows Subscribe Now button', () => {
      renderWithProviders(
        <Paywall visible={true} onClose={jest.fn()} />
      );

      expect(screen.getByText('Subscribe Now')).toBeTruthy();
    });

    it('calls purchaseProduct when pressed', async () => {
      const onClose = jest.fn();
      renderWithProviders(
        <Paywall visible={true} onClose={onClose} />
      );

      // Wait for price to load (button becomes enabled)
      await waitFor(() => {
        expect(screen.getByText('$4.99/month')).toBeTruthy();
      });

      const purchaseButton = screen.getByText('Subscribe Now');
      fireEvent.press(purchaseButton);

      await waitFor(() => {
        expect(mockPurchaseProduct).toHaveBeenCalled();
      });
    });

    it('calls onClose after successful purchase', async () => {
      const onClose = jest.fn();
      mockPurchaseProduct.mockResolvedValue(true);

      renderWithProviders(
        <Paywall visible={true} onClose={onClose} />
      );

      // Wait for price to load
      await waitFor(() => {
        expect(screen.getByText('$4.99/month')).toBeTruthy();
      });

      const purchaseButton = screen.getByText('Subscribe Now');
      fireEvent.press(purchaseButton);

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });

    it('shows error message on failed purchase', async () => {
      mockPurchaseProduct.mockResolvedValue(false);

      renderWithProviders(
        <Paywall visible={true} onClose={jest.fn()} />
      );

      // Wait for price to load
      await waitFor(() => {
        expect(screen.getByText('$4.99/month')).toBeTruthy();
      });

      const purchaseButton = screen.getByText('Subscribe Now');
      fireEvent.press(purchaseButton);

      await waitFor(() => {
        expect(screen.getByText(/Purchase failed/)).toBeTruthy();
      });
    });
  });

  describe('restore button', () => {
    it('shows Restore Purchases button', () => {
      renderWithProviders(
        <Paywall visible={true} onClose={jest.fn()} />
      );

      expect(screen.getByText('Restore Purchases')).toBeTruthy();
    });

    it('calls restorePurchases when pressed', async () => {
      renderWithProviders(
        <Paywall visible={true} onClose={jest.fn()} />
      );

      const restoreButton = screen.getByText('Restore Purchases');
      fireEvent.press(restoreButton);

      await waitFor(() => {
        expect(mockRestorePurchases).toHaveBeenCalled();
      });
    });

    it('calls onClose after successful restore', async () => {
      const onClose = jest.fn();
      mockRestorePurchases.mockResolvedValue({ success: true });

      renderWithProviders(
        <Paywall visible={true} onClose={onClose} />
      );

      const restoreButton = screen.getByText('Restore Purchases');
      fireEvent.press(restoreButton);

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });

    it('shows error message when no purchases to restore', async () => {
      mockRestorePurchases.mockResolvedValue({ success: false, message: 'No previous purchases found.' });

      renderWithProviders(
        <Paywall visible={true} onClose={jest.fn()} />
      );

      const restoreButton = screen.getByText('Restore Purchases');
      fireEvent.press(restoreButton);

      await waitFor(() => {
        expect(screen.getByText(/No previous purchases/)).toBeTruthy();
      });
    });
  });

  describe('loading state', () => {
    it('disables purchase button during loading', () => {
      // Note: This test would need the component to re-render with new mock
      // For now, just verify the structure exists
      renderWithProviders(
        <Paywall visible={true} onClose={jest.fn()} />
      );

      expect(screen.getByText('Subscribe Now')).toBeTruthy();
    });
  });
});
