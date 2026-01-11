/**
 * Integration Tests for Profile Screen.
 *
 * Tests user settings, subscription, and theme sections.
 * Uses real Zustand stores instead of mocks for proper integration testing.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ProfileScreen from '../../src/app/(tabs)/profile';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';
import { useSettingsStore } from '../../src/store/settingsStore';
import { useSubscriptionStore } from '../../src/store/subscriptionStore';

// Mock expo-router (external dependency)
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    navigate: jest.fn(),
  },
}));

// Mock react-native-safe-area-context (external dependency)
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mock expo-linear-gradient (external dependency with native module)
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock Paywall (complex component with network calls in production)
jest.mock('../../src/components/paywall/Paywall', () => ({
  Paywall: ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
    if (!visible) {return null;}
    const { View, Text, TouchableOpacity } = require('react-native');
    return (
      <View testID="paywall-modal">
        <Text>Upgrade to Premium</Text>
        <TouchableOpacity onPress={onClose} testID="paywall-close">
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    );
  },
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('ProfileScreen Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset settings store
    useSettingsStore.setState({
      userName: 'Test User',
      readingLanguage: 'en',
    });

    // Reset subscription store to free tier
    useSubscriptionStore.setState({
      isPremium: false,
      isLoading: false,
      isInitialized: true,
      contentAccessCount: 1,
    });
  });

  describe('initial rendering', () => {
    it('renders the screen title', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Profile')).toBeTruthy();
    });
  });

  describe('user info section', () => {
    it('shows Your Info section title', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Your Info')).toBeTruthy();
    });

    it('displays user name from real settings store', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByDisplayValue('Test User')).toBeTruthy();
    });

    it('allows changing user name and updates real store', () => {
      renderWithProviders(<ProfileScreen />);

      const nameInput = screen.getByDisplayValue('Test User');
      fireEvent.changeText(nameInput, 'New Name');

      // Verify the real store was updated
      expect(useSettingsStore.getState().userName).toBe('New Name');
    });

    it('shows language selector', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Reading Language')).toBeTruthy();
      expect(screen.getByText('English')).toBeTruthy();
    });
  });

  describe('theme section', () => {
    it('shows Theme section title', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Theme')).toBeTruthy();
    });

    it('displays available themes', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Dark')).toBeTruthy();
    });
  });

  describe('subscription section', () => {
    it('shows subscription status from real store', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Subscription')).toBeTruthy();
      expect(screen.getByText('Free')).toBeTruthy();
    });

    it('shows max WPM from real subscription store', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Max WPM')).toBeTruthy();
      // Free tier max WPM is 450
      expect(screen.getAllByText('450').length).toBeGreaterThan(0);
    });

    it('shows articles used count from real store', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Articles used')).toBeTruthy();
      expect(screen.getByText('1 / 5')).toBeTruthy();
    });

    it('shows Premium status when premium user', () => {
      useSubscriptionStore.setState({
        isPremium: true,
        isLoading: false,
        isInitialized: true,
        contentAccessCount: 0,
      });

      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Premium')).toBeTruthy();
    });

    it('shows upgrade button for free users', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Upgrade to Premium')).toBeTruthy();
    });

    it('opens paywall when upgrade button is pressed', () => {
      renderWithProviders(<ProfileScreen />);

      const upgradeButton = screen.getByText('Upgrade to Premium');
      fireEvent.press(upgradeButton);

      expect(screen.getByTestId('paywall-modal')).toBeTruthy();
    });
  });

  describe('premium user experience', () => {
    beforeEach(() => {
      useSubscriptionStore.setState({
        isPremium: true,
        isLoading: false,
        isInitialized: true,
        contentAccessCount: 0,
      });
    });

    it('shows higher max WPM for premium users', () => {
      renderWithProviders(<ProfileScreen />);

      // Premium max WPM is 1500
      expect(screen.getByText('1500')).toBeTruthy();
    });

    it('shows reset to free button for premium users', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Reset to Free (Dev)')).toBeTruthy();
    });

    it('resets subscription when reset button is pressed', () => {
      renderWithProviders(<ProfileScreen />);

      const resetButton = screen.getByText('Reset to Free (Dev)');
      fireEvent.press(resetButton);

      // Verify the real store was updated
      expect(useSubscriptionStore.getState().isPremium).toBe(false);
    });
  });

  describe('tips section', () => {
    it('displays speed reading tips', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Speed Reading Tips')).toBeTruthy();
      expect(screen.getByText(/Focus on the red ORP letter/)).toBeTruthy();
    });
  });
});
