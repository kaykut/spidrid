/**
 * Integration Tests for Learn Screen.
 *
 * Tests the Learn tab placeholder screen with Coming Soon message.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import LearnScreen from '../../src/app/(tabs)/content/learn';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// Mock expo-router
const mockReplace = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    replace: (path: string) => mockReplace(path),
  },
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('LearnScreen Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial rendering', () => {
    it('renders the screen title', () => {
      renderWithProviders(<LearnScreen />);

      expect(screen.getByText('Learn')).toBeTruthy();
    });

    it('displays Coming Soon message', () => {
      renderWithProviders(<LearnScreen />);

      expect(screen.getByText('Coming Soon')).toBeTruthy();
    });

    it('displays description text', () => {
      renderWithProviders(<LearnScreen />);

      expect(
        screen.getByText(
          'Interactive learning experiences are being developed. In the meantime, build your speed reading skills with our training articles.'
        )
      ).toBeTruthy();
    });

    it('shows Go to Train button', () => {
      renderWithProviders(<LearnScreen />);

      expect(screen.getByText('Go to Train')).toBeTruthy();
    });
  });

  describe('navigation', () => {
    it('navigates to train tab when Go to Train button is pressed', () => {
      renderWithProviders(<LearnScreen />);

      const trainButton = screen.getByText('Go to Train');
      fireEvent.press(trainButton);

      expect(mockReplace).toHaveBeenCalledWith('/(tabs)/content/train');
    });
  });
});
