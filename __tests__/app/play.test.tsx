/**
 * Tests for Play Tab Screen
 *
 * This is a placeholder screen that shows when no content is playing.
 * Tests verify basic rendering and navigation.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PlayScreen from '../../src/app/(tabs)/play';

// Mock expo-router
const mockRouterPush = jest.fn();
const mockRouterBack = jest.fn();

jest.mock('expo-router', () => ({
  router: {
    push: (...args: unknown[]) => mockRouterPush(...args),
    back: (...args: unknown[]) => mockRouterBack(...args),
  },
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

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  return {
    SafeAreaView: ({ children, style }: { children: React.ReactNode; style?: object }) => (
      <View style={style} testID="safe-area-view">{children}</View>
    ),
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

// Mock ThemeProvider
const mockTheme = {
  id: 'dark',
  name: 'Dark',
  backgroundColor: '#0a0a0a',
  textColor: '#ffffff',
  orpColor: '#ff6b6b',
  crosshairColor: '#333333',
  accentColor: '#00D4AA',
  secondaryBackground: '#1a1a1a',
};

jest.mock('../../src/components/common/ThemeProvider', () => ({
  useTheme: () => ({
    theme: mockTheme,
    setTheme: jest.fn(),
  }),
}));

describe('PlayScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<PlayScreen />);
    expect(getByText('Player')).toBeTruthy();
  });

  it('displays the page title', () => {
    const { getByText } = render(<PlayScreen />);
    expect(getByText('Player')).toBeTruthy();
  });

  it('displays the empty state title', () => {
    const { getByText } = render(<PlayScreen />);
    expect(getByText('No Content Playing')).toBeTruthy();
  });

  it('displays the empty state description', () => {
    const { getByText } = render(<PlayScreen />);
    expect(getByText(/Add content from Train, Read, or Learn tabs/)).toBeTruthy();
  });

  it('displays the CTA button', () => {
    const { getByText } = render(<PlayScreen />);
    expect(getByText('Browse Content')).toBeTruthy();
  });

  it('navigates to train screen when CTA button is pressed', () => {
    const { getByText } = render(<PlayScreen />);
    const button = getByText('Browse Content');

    fireEvent.press(button);

    expect(mockRouterPush).toHaveBeenCalledWith('/(tabs)/content/train');
  });

  it('renders the play icon', () => {
    const { getByTestId } = render(<PlayScreen />);
    expect(getByTestId('icon-play-circle-outline')).toBeTruthy();
  });

  it('applies theme background color to container', () => {
    const { getByTestId } = render(<PlayScreen />);
    const safeArea = getByTestId('safe-area-view');
    expect(safeArea.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: mockTheme.backgroundColor }),
      ])
    );
  });
});
