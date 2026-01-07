/**
 * Integration Tests for Demo Reader Screen.
 *
 * Tests the RSVP demo functionality.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import DemoReaderScreen from '../../src/app/reader/demo';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// Mock expo-router
const mockBack = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    back: () => mockBack(),
  },
}));

// Mock safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock Paywall
jest.mock('../../src/components/paywall/Paywall', () => ({
  Paywall: ({ visible }: { visible: boolean }) =>
    visible ? <mock-paywall testID="paywall" /> : null,
}));

// Mock RSVPWord
jest.mock('../../src/components/rsvp/RSVPWord', () => ({
  RSVPWord: ({ word }: { word: { display: string } | null }) => (
    <mock-rsvp-word testID="rsvp-word">
      {word?.display || 'Ready'}
    </mock-rsvp-word>
  ),
}));

// Mock PlaybackControls
jest.mock('../../src/components/controls/PlaybackControls', () => ({
  PlaybackControls: ({
    onToggle,
    onWPMLimitHit
  }: {
    onToggle: () => void;
    onWPMLimitHit: () => void;
  }) => (
    <mock-controls testID="playback-controls">
      <mock-button testID="toggle-btn" onPress={onToggle}>Toggle</mock-button>
      <mock-button testID="wpm-limit-btn" onPress={onWPMLimitHit}>Hit Limit</mock-button>
    </mock-controls>
  ),
}));

// Mock useRSVPEngine
const mockToggle = jest.fn();
const mockSetWPM = jest.fn();

jest.mock('../../src/hooks/useRSVPEngine', () => ({
  useRSVPEngine: () => ({
    currentWord: { display: 'The', orpIndex: 0, pauseMultiplier: 1, isSentenceEnd: false },
    currentIndex: 0,
    totalWords: 100,
    isPlaying: false,
    wpm: 250,
    progress: 0,
    toggle: mockToggle,
    setWPM: mockSetWPM,
    rewindSentence: jest.fn(),
    skipSentence: jest.fn(),
  }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('DemoReaderScreen Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial rendering', () => {
    it('renders the title', () => {
      renderWithProviders(<DemoReaderScreen />);

      expect(screen.getByText('RSVP Demo')).toBeTruthy();
    });

    it('renders RSVP word component', () => {
      renderWithProviders(<DemoReaderScreen />);

      expect(screen.getByTestId('rsvp-word')).toBeTruthy();
    });

    it('renders playback controls', () => {
      renderWithProviders(<DemoReaderScreen />);

      expect(screen.getByTestId('playback-controls')).toBeTruthy();
    });

    it('renders instructions', () => {
      renderWithProviders(<DemoReaderScreen />);

      expect(screen.getByText(/Focus on the/)).toBeTruthy();
      expect(screen.getByText(/Let the words come to you/)).toBeTruthy();
    });
  });

  describe('navigation', () => {
    it('navigates back when back button is pressed', () => {
      renderWithProviders(<DemoReaderScreen />);

      const backButton = screen.getByText('← Back');
      fireEvent.press(backButton);

      expect(mockBack).toHaveBeenCalled();
    });
  });

  describe('paywall', () => {
    it('shows paywall when WPM limit is hit', () => {
      renderWithProviders(<DemoReaderScreen />);

      const limitButton = screen.getByTestId('wpm-limit-btn');
      fireEvent.press(limitButton);

      expect(screen.getByTestId('paywall')).toBeTruthy();
    });
  });
});
