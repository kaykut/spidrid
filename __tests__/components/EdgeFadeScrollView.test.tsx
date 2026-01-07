/**
 * Tests for EdgeFadeScrollView Component.
 *
 * ScrollView with gradient fades at top and bottom edges.
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { EdgeFadeScrollView } from '../../src/components/common/EdgeFadeScrollView';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// Mock safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
}));

// Mock LinearGradient
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children, testID, colors, style }: {
    children?: React.ReactNode;
    testID?: string;
    colors: string[];
    style?: object;
  }) => (
    <mock-gradient testID={testID || 'gradient'} colors={colors} style={style}>
      {children}
    </mock-gradient>
  ),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('EdgeFadeScrollView', () => {
  it('renders children', () => {
    renderWithProviders(
      <EdgeFadeScrollView>
        <Text>Test Content</Text>
      </EdgeFadeScrollView>
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('renders with default props', () => {
    const { root } = renderWithProviders(
      <EdgeFadeScrollView>
        <Text>Content</Text>
      </EdgeFadeScrollView>
    );

    expect(root).toBeTruthy();
  });

  it('accepts custom topFadeHeight', () => {
    const { root } = renderWithProviders(
      <EdgeFadeScrollView topFadeHeight={80}>
        <Text>Content</Text>
      </EdgeFadeScrollView>
    );

    expect(root).toBeTruthy();
  });

  it('accepts custom bottomFadeHeight', () => {
    const { root } = renderWithProviders(
      <EdgeFadeScrollView bottomFadeHeight={100}>
        <Text>Content</Text>
      </EdgeFadeScrollView>
    );

    expect(root).toBeTruthy();
  });

  it('accepts custom extraBottomPadding', () => {
    const { root } = renderWithProviders(
      <EdgeFadeScrollView extraBottomPadding={80}>
        <Text>Content</Text>
      </EdgeFadeScrollView>
    );

    expect(root).toBeTruthy();
  });

  it('accepts custom style', () => {
    const { root } = renderWithProviders(
      <EdgeFadeScrollView style={{ marginTop: 10 }}>
        <Text>Content</Text>
      </EdgeFadeScrollView>
    );

    expect(root).toBeTruthy();
  });

  it('accepts contentContainerStyle', () => {
    const { root } = renderWithProviders(
      <EdgeFadeScrollView contentContainerStyle={{ padding: 20 }}>
        <Text>Content</Text>
      </EdgeFadeScrollView>
    );

    expect(root).toBeTruthy();
  });
});
