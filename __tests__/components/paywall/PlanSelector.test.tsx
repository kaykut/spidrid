/**
 * Tests for PlanSelector Component
 *
 * Displays yearly and monthly plan options with RevenueCat pricing.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PlanSelector } from '../../../src/components/paywall/PlanSelector';
import { ThemeProvider } from '../../../src/components/common/ThemeProvider';
import type { PurchasesPackage } from '../../../src/services/purchases';

// =============================================================================
// Test Data
// =============================================================================

const mockYearlyPackage: PurchasesPackage = {
  identifier: '$rc_annual',
  packageType: 'ANNUAL',
  product: {
    identifier: 'devoro_premium_yearly',
    title: 'Devoro Premium (Yearly)',
    description: 'Annual subscription to Devoro Premium',
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

const mockYearlyPackageNoTrial: PurchasesPackage = {
  identifier: '$rc_annual',
  packageType: 'ANNUAL',
  product: {
    identifier: 'devoro_premium_yearly',
    title: 'Devoro Premium (Yearly)',
    description: 'Annual subscription to Devoro Premium',
    priceString: '$29.99',
    price: 29.99,
  },
};

const mockMonthlyPackage: PurchasesPackage = {
  identifier: '$rc_monthly',
  packageType: 'MONTHLY',
  product: {
    identifier: 'devoro_premium_monthly',
    title: 'Devoro Premium (Monthly)',
    description: 'Monthly subscription to Devoro Premium',
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

// =============================================================================
// Tests
// =============================================================================

describe('PlanSelector', () => {
  const defaultProps = {
    yearlyPackage: mockYearlyPackage,
    monthlyPackage: mockMonthlyPackage,
    selectedPlan: 'yearly' as const,
    onPlanChange: jest.fn(),
    isLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loading state', () => {
    it('shows loading indicator when isLoading is true', () => {
      const { getByTestId } = renderWithProviders(
        <PlanSelector {...defaultProps} isLoading={true} />
      );

      expect(getByTestId('plan-selector-loading')).toBeTruthy();
    });

    it('does not show plan cards when loading', () => {
      const { queryByTestId } = renderWithProviders(
        <PlanSelector {...defaultProps} isLoading={true} />
      );

      expect(queryByTestId('yearly-plan-card')).toBeNull();
      expect(queryByTestId('monthly-plan-card')).toBeNull();
    });
  });

  describe('plan cards', () => {
    it('renders yearly plan card', () => {
      const { getByTestId } = renderWithProviders(
        <PlanSelector {...defaultProps} />
      );

      expect(getByTestId('yearly-plan-card')).toBeTruthy();
    });

    it('renders monthly plan card', () => {
      const { getByTestId } = renderWithProviders(
        <PlanSelector {...defaultProps} />
      );

      expect(getByTestId('monthly-plan-card')).toBeTruthy();
    });

    it('shows yearly price', () => {
      const { getByText } = renderWithProviders(
        <PlanSelector {...defaultProps} />
      );

      expect(getByText('$29.99')).toBeTruthy();
    });

    it('shows monthly price', () => {
      const { getByText } = renderWithProviders(
        <PlanSelector {...defaultProps} />
      );

      expect(getByText('$4.99')).toBeTruthy();
    });

    it('shows plan labels', () => {
      const { getByText } = renderWithProviders(
        <PlanSelector {...defaultProps} />
      );

      expect(getByText('Yearly')).toBeTruthy();
      expect(getByText('Monthly')).toBeTruthy();
    });
  });

  describe('trial information', () => {
    it('shows trial text when yearly plan has introPrice', () => {
      const { getByText } = renderWithProviders(
        <PlanSelector {...defaultProps} />
      );

      expect(getByText(/3.day.free.trial/i)).toBeTruthy();
    });

    it('does not show trial text when yearly plan has no introPrice', () => {
      const { queryByText } = renderWithProviders(
        <PlanSelector
          {...defaultProps}
          yearlyPackage={mockYearlyPackageNoTrial}
        />
      );

      expect(queryByText(/free.trial/i)).toBeNull();
    });
  });

  describe('monthly equivalent', () => {
    it('shows monthly equivalent for yearly plan', () => {
      const { getByText } = renderWithProviders(
        <PlanSelector {...defaultProps} />
      );

      // $29.99 / 12 = $2.50 (approx)
      expect(getByText(/\$2\.50\/mo/i)).toBeTruthy();
    });
  });

  describe('selection', () => {
    it('calls onPlanChange with yearly when yearly card pressed', () => {
      const onPlanChange = jest.fn();
      const { getByTestId } = renderWithProviders(
        <PlanSelector
          {...defaultProps}
          selectedPlan="monthly"
          onPlanChange={onPlanChange}
        />
      );

      fireEvent.press(getByTestId('yearly-plan-card'));

      expect(onPlanChange).toHaveBeenCalledWith('yearly');
    });

    it('calls onPlanChange with monthly when monthly card pressed', () => {
      const onPlanChange = jest.fn();
      const { getByTestId } = renderWithProviders(
        <PlanSelector
          {...defaultProps}
          selectedPlan="yearly"
          onPlanChange={onPlanChange}
        />
      );

      fireEvent.press(getByTestId('monthly-plan-card'));

      expect(onPlanChange).toHaveBeenCalledWith('monthly');
    });
  });

  describe('null packages', () => {
    it('handles null yearly package gracefully', () => {
      const { queryByTestId } = renderWithProviders(
        <PlanSelector {...defaultProps} yearlyPackage={null} />
      );

      expect(queryByTestId('yearly-plan-card')).toBeNull();
      expect(queryByTestId('monthly-plan-card')).toBeTruthy();
    });

    it('handles null monthly package gracefully', () => {
      const { queryByTestId } = renderWithProviders(
        <PlanSelector {...defaultProps} monthlyPackage={null} />
      );

      expect(queryByTestId('yearly-plan-card')).toBeTruthy();
      expect(queryByTestId('monthly-plan-card')).toBeNull();
    });

    it('handles both null packages gracefully', () => {
      const { queryByTestId, getByText } = renderWithProviders(
        <PlanSelector
          {...defaultProps}
          yearlyPackage={null}
          monthlyPackage={null}
        />
      );

      expect(queryByTestId('yearly-plan-card')).toBeNull();
      expect(queryByTestId('monthly-plan-card')).toBeNull();
      expect(getByText(/no plans available/i)).toBeTruthy();
    });
  });
});
