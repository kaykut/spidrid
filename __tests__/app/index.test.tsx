/**
 * Tests for Root Index Screen.
 *
 * Renders ContentListScreen as the main app view.
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import Index from '../../src/app/index';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({
  Swipeable: ({ children }: { children: React.ReactNode }) => children,
  GestureHandlerRootView: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock GlassView component
jest.mock('../../src/components/common/GlassView', () => ({
  GlassView: ({ children }: { children: React.ReactNode }) => children,
}));

// Wrapper with ThemeProvider
function TestWrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('Index', () => {
  it('renders ContentListScreen', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Index />
      </TestWrapper>
    );

    // The FAB buttons should be present
    expect(getByTestId('fab-journey')).toBeTruthy();
    expect(getByTestId('fab-add-content')).toBeTruthy();
  });

  it('shows filter pills', () => {
    const { getByText } = render(
      <TestWrapper>
        <Index />
      </TestWrapper>
    );

    // Filter pills should be visible
    expect(getByText('All')).toBeTruthy();
    expect(getByText('Books')).toBeTruthy();
    expect(getByText('Articles')).toBeTruthy();
    expect(getByText('Learning')).toBeTruthy();
    expect(getByText('Training')).toBeTruthy();
  });
});
