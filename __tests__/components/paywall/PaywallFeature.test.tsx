/**
 * Tests for PaywallFeature Component
 *
 * Displays a single premium feature row with icon, title, and subtitle.
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { PaywallFeature } from '../../../src/components/paywall/PaywallFeature';
import { ThemeProvider } from '../../../src/components/common/ThemeProvider';

// =============================================================================
// Mocks
// =============================================================================

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <View testID={testID || `icon-${name}`} />
    ),
  };
});

// =============================================================================
// Test Helpers
// =============================================================================

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// =============================================================================
// Tests
// =============================================================================

describe('PaywallFeature', () => {
  describe('basic rendering', () => {
    it('renders the feature row', () => {
      const { getByTestId } = renderWithProviders(
        <PaywallFeature
          icon="infinite-outline"
          title="Unlimited AI articles"
          subtitle="No daily caps on learning"
        />
      );

      expect(getByTestId('paywall-feature-row')).toBeTruthy();
    });

    it('renders the icon', () => {
      const { getByTestId } = renderWithProviders(
        <PaywallFeature
          icon="infinite-outline"
          title="Unlimited AI articles"
          subtitle="No daily caps on learning"
        />
      );

      expect(getByTestId('icon-infinite-outline')).toBeTruthy();
    });

    it('renders the title', () => {
      const { getByText } = renderWithProviders(
        <PaywallFeature
          icon="infinite-outline"
          title="Unlimited AI articles"
          subtitle="No daily caps on learning"
        />
      );

      expect(getByText('Unlimited AI articles')).toBeTruthy();
    });

    it('renders the subtitle', () => {
      const { getByText } = renderWithProviders(
        <PaywallFeature
          icon="infinite-outline"
          title="Unlimited AI articles"
          subtitle="No daily caps on learning"
        />
      );

      expect(getByText('No daily caps on learning')).toBeTruthy();
    });
  });

  describe('different features', () => {
    it('renders sync feature correctly', () => {
      const { getByTestId, getByText } = renderWithProviders(
        <PaywallFeature
          icon="sync-outline"
          title="Multi-device sync"
          subtitle="Pick up where you left off"
        />
      );

      expect(getByTestId('icon-sync-outline')).toBeTruthy();
      expect(getByText('Multi-device sync')).toBeTruthy();
      expect(getByText('Pick up where you left off')).toBeTruthy();
    });

    it('renders speedometer feature correctly', () => {
      const { getByTestId, getByText } = renderWithProviders(
        <PaywallFeature
          icon="speedometer-outline"
          title="Premium reading speed"
          subtitle="Up to 1,500 WPM"
        />
      );

      expect(getByTestId('icon-speedometer-outline')).toBeTruthy();
      expect(getByText('Premium reading speed')).toBeTruthy();
      expect(getByText('Up to 1,500 WPM')).toBeTruthy();
    });
  });
});
