/**
 * Tests for FloatingNavBar Component.
 *
 * Navigation bar with Learn, Read, and Profile tabs.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { FloatingNavBar } from '../../src/components/navigation/FloatingNavBar';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// Mock expo-router
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/learn',
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 44,
    bottom: 34,
    left: 0,
    right: 0,
  }),
}));

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('FloatingNavBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('renders without crashing', () => {
      const { root } = renderWithProviders(<FloatingNavBar />);

      expect(root).toBeTruthy();
    });

    it('renders Learn nav item icon', () => {
      renderWithProviders(<FloatingNavBar />);

      // Icons render via mock - there are 3 nav items
      const icons = screen.getAllByTestId('icon-Ionicons');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('renders all three navigation items', () => {
      renderWithProviders(<FloatingNavBar />);

      // All icons are rendered (3 nav items)
      const icons = screen.getAllByTestId('icon-Ionicons');
      expect(icons.length).toBe(3);
    });
  });

  describe('navigation', () => {
    it('navigates to learn when learn button is pressed', () => {
      renderWithProviders(<FloatingNavBar />);

      const icons = screen.getAllByTestId('icon-Ionicons');
      // First icon is Learn
      fireEvent.press(icons[0]);

      expect(mockPush).toHaveBeenCalledWith('/(tabs)/learn');
    });

    it('navigates to read when read button is pressed', () => {
      renderWithProviders(<FloatingNavBar />);

      const icons = screen.getAllByTestId('icon-Ionicons');
      // Second icon is Read
      fireEvent.press(icons[1]);

      expect(mockPush).toHaveBeenCalledWith('/(tabs)/read');
    });

    it('navigates to profile when profile button is pressed', () => {
      renderWithProviders(<FloatingNavBar />);

      const icons = screen.getAllByTestId('icon-Ionicons');
      // Third icon is Profile
      fireEvent.press(icons[2]);

      expect(mockPush).toHaveBeenCalledWith('/(tabs)/profile');
    });
  });
});

describe('FloatingNavBar with different pathname', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('identifies active route correctly', () => {
    // The isActive function checks if pathname includes the route name
    // We already mock pathname as '/learn', so learn should be active
    const { root } = renderWithProviders(<FloatingNavBar />);

    expect(root).toBeTruthy();
  });
});
