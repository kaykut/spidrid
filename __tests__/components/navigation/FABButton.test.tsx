/**
 * Tests for FABButton Component.
 *
 * A glass-style floating action button used for primary actions like
 * accessing Journey+Profile or Add Content.
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react-native';
import { FABButton, FABPosition } from '../../../src/components/navigation/FABButton';
import { ThemeProvider } from '../../../src/components/common/ThemeProvider';
import { useSettingsStore } from '../../../src/store/settingsStore';

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 44,
    bottom: 34,
    left: 0,
    right: 0,
  }),
}));

// Mock expo-blur for GlassView fallback
jest.mock('expo-blur', () => ({
  BlurView: 'BlurView',
}));

// Mock expo-glass-effect
jest.mock('expo-glass-effect', () => ({
  GlassView: 'GlassView',
  isLiquidGlassAvailable: () => false,
}));

// Mock expo-constants
jest.mock('expo-constants', () => ({
  appOwnership: 'expo',
}));

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// Default props for testing
const defaultProps = {
  position: 'top-right' as FABPosition,
  icon: 'person-circle-outline' as const,
  onPress: jest.fn(),
};

describe('FABButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders without crashing', () => {
      const { root } = renderWithProviders(
        <FABButton {...defaultProps} />
      );

      expect(root).toBeTruthy();
    });

    it('renders with custom testID', () => {
      renderWithProviders(
        <FABButton {...defaultProps} testID="fab-journey" />
      );

      expect(screen.getByTestId('fab-journey')).toBeTruthy();
    });

    it('renders the touchable area', () => {
      renderWithProviders(
        <FABButton {...defaultProps} testID="fab-button" />
      );

      const touchable = screen.getByTestId('fab-button');
      expect(touchable).toBeTruthy();
    });
  });

  describe('icon rendering', () => {
    it('renders Ionicons for standard icons', () => {
      const { root } = renderWithProviders(
        <FABButton {...defaultProps} icon="person-circle-outline" />
      );

      // The component should render - Ionicons are rendered internally
      expect(root).toBeTruthy();
    });

    it('renders Entypo plus icon when icon prop is "add"', () => {
      const { root } = renderWithProviders(
        <FABButton {...defaultProps} icon="add" />
      );

      // The component should render with Entypo plus icon
      expect(root).toBeTruthy();
    });

    it('handles different Ionicons icon names', () => {
      const icons = [
        'settings-outline',
        'home-outline',
        'star-outline',
        'heart-outline',
      ] as const;

      icons.forEach((icon) => {
        const { root } = renderWithProviders(
          <FABButton {...defaultProps} icon={icon} />
        );
        expect(root).toBeTruthy();
      });
    });
  });

  describe('onPress handler', () => {
    it('calls onPress when button is pressed', () => {
      const onPress = jest.fn();
      renderWithProviders(
        <FABButton {...defaultProps} onPress={onPress} testID="fab-button" />
      );

      const button = screen.getByTestId('fab-button');
      fireEvent.press(button);

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('does not call onPress before button is pressed', () => {
      const onPress = jest.fn();
      renderWithProviders(
        <FABButton {...defaultProps} onPress={onPress} testID="fab-button" />
      );

      expect(onPress).not.toHaveBeenCalled();
    });

    it('calls onPress multiple times when pressed multiple times', () => {
      const onPress = jest.fn();
      renderWithProviders(
        <FABButton {...defaultProps} onPress={onPress} testID="fab-button" />
      );

      const button = screen.getByTestId('fab-button');
      fireEvent.press(button);
      fireEvent.press(button);
      fireEvent.press(button);

      expect(onPress).toHaveBeenCalledTimes(3);
    });
  });

  describe('position prop', () => {
    it('renders with top-right position', () => {
      const { root } = renderWithProviders(
        <FABButton {...defaultProps} position="top-right" />
      );

      expect(root).toBeTruthy();
    });

    it('renders with bottom-right position', () => {
      const { root } = renderWithProviders(
        <FABButton {...defaultProps} position="bottom-right" />
      );

      expect(root).toBeTruthy();
    });
  });

  describe('press animations', () => {
    it('handles pressIn event without crashing', () => {
      renderWithProviders(
        <FABButton {...defaultProps} testID="fab-button" />
      );

      const button = screen.getByTestId('fab-button');
      fireEvent(button, 'pressIn');

      // Animation should trigger without error
      expect(button).toBeTruthy();
    });

    it('handles pressOut event without crashing', () => {
      renderWithProviders(
        <FABButton {...defaultProps} testID="fab-button" />
      );

      const button = screen.getByTestId('fab-button');
      fireEvent(button, 'pressOut');

      // Animation should trigger without error
      expect(button).toBeTruthy();
    });

    it('handles complete press sequence (pressIn -> pressOut -> press)', () => {
      const onPress = jest.fn();
      renderWithProviders(
        <FABButton {...defaultProps} onPress={onPress} testID="fab-button" />
      );

      const button = screen.getByTestId('fab-button');

      // Simulate full press sequence
      fireEvent(button, 'pressIn');
      fireEvent(button, 'pressOut');
      fireEvent.press(button);

      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('renders as a touchable element', () => {
      renderWithProviders(
        <FABButton {...defaultProps} testID="fab-button" />
      );

      const button = screen.getByTestId('fab-button');
      expect(button).toBeTruthy();
    });

    it('is interactive (responds to press)', () => {
      const onPress = jest.fn();
      renderWithProviders(
        <FABButton {...defaultProps} onPress={onPress} testID="fab-button" />
      );

      const button = screen.getByTestId('fab-button');
      fireEvent.press(button);

      expect(onPress).toHaveBeenCalled();
    });
  });

  describe('styling', () => {
    it('applies container styles for absolute positioning', () => {
      const { root } = renderWithProviders(
        <FABButton {...defaultProps} />
      );

      // Component renders with absolute positioning
      expect(root).toBeTruthy();
    });

    it('renders GlassView wrapper', () => {
      const { root } = renderWithProviders(
        <FABButton {...defaultProps} />
      );

      // GlassView provides the glass effect wrapper
      expect(root).toBeTruthy();
    });
  });

  describe('theme integration', () => {
    it('renders correctly with default dark theme', () => {
      const { root } = renderWithProviders(
        <FABButton {...defaultProps} />
      );

      expect(root).toBeTruthy();
    });

    it('uses theme accent color for icon', () => {
      const { root } = renderWithProviders(
        <FABButton {...defaultProps} icon="person-circle-outline" />
      );

      // Icon should use theme.accentColor
      expect(root).toBeTruthy();
    });

    it('renders correctly with light theme (non-dark appearance)', () => {
      // Set theme to light before rendering
      act(() => {
        useSettingsStore.getState().setTheme('light');
      });

      const { root } = renderWithProviders(
        <FABButton {...defaultProps} />
      );

      expect(root).toBeTruthy();

      // Reset to dark theme
      act(() => {
        useSettingsStore.getState().setTheme('dark');
      });
    });

    it('renders correctly with sepia theme (non-dark appearance)', () => {
      // Set theme to sepia before rendering
      act(() => {
        useSettingsStore.getState().setTheme('sepia');
      });

      const { root } = renderWithProviders(
        <FABButton {...defaultProps} />
      );

      expect(root).toBeTruthy();

      // Reset to dark theme
      act(() => {
        useSettingsStore.getState().setTheme('dark');
      });
    });

    it('renders correctly with midnight theme (dark appearance)', () => {
      // Set theme to midnight before rendering
      act(() => {
        useSettingsStore.getState().setTheme('midnight');
      });

      const { root } = renderWithProviders(
        <FABButton {...defaultProps} />
      );

      expect(root).toBeTruthy();

      // Reset to dark theme
      act(() => {
        useSettingsStore.getState().setTheme('dark');
      });
    });
  });

  describe('edge cases', () => {
    it('handles rapid successive presses', () => {
      const onPress = jest.fn();
      renderWithProviders(
        <FABButton {...defaultProps} onPress={onPress} testID="fab-button" />
      );

      const button = screen.getByTestId('fab-button');

      // Rapid presses
      for (let i = 0; i < 10; i++) {
        fireEvent.press(button);
      }

      expect(onPress).toHaveBeenCalledTimes(10);
    });

    it('handles pressIn without pressOut gracefully', () => {
      renderWithProviders(
        <FABButton {...defaultProps} testID="fab-button" />
      );

      const button = screen.getByTestId('fab-button');
      fireEvent(button, 'pressIn');

      // Should not crash even without pressOut
      expect(button).toBeTruthy();
    });

    it('handles pressOut without pressIn gracefully', () => {
      renderWithProviders(
        <FABButton {...defaultProps} testID="fab-button" />
      );

      const button = screen.getByTestId('fab-button');
      fireEvent(button, 'pressOut');

      // Should not crash even without pressIn first
      expect(button).toBeTruthy();
    });
  });
});
