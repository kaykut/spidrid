/**
 * Integration Tests for Article Reader Screen.
 *
 * Tests the article reading flow with RSVP, quiz, and results.
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react-native';
import ArticleReaderScreen from '../../src/app/article/[id]';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// Mock expo-router
const mockBack = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    back: () => mockBack(),
  },
  useLocalSearchParams: jest.fn(() => ({ id: 'science-discovery-p01' })),
}));

// Mock safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  return {
    SafeAreaView: ({ children }: { children: React.ReactNode }) => (
      <View>{children}</View>
    ),
  };
});

// Mock stores
const mockCompleteArticle = jest.fn();
const mockSetCurrentWPM = jest.fn();
const mockGetHighestWPM = jest.fn(() => 250);
const mockCheckAndAwardCertificates = jest.fn(() => []);
const mockGetMaxWPM = jest.fn(() => 450);

jest.mock('../../src/store/learningStore', () => ({
  useLearningStore: () => ({
    completeArticle: mockCompleteArticle,
    currentWPM: 250,
    setCurrentWPM: mockSetCurrentWPM,
    getHighestWPM: mockGetHighestWPM,
  }),
}));

jest.mock('../../src/store/certificateStore', () => ({
  useCertificateStore: () => ({
    checkAndAwardCertificates: mockCheckAndAwardCertificates,
  }),
}));

jest.mock('../../src/store/subscriptionStore', () => ({
  useSubscriptionStore: () => ({
    getMaxWPM: mockGetMaxWPM,
  }),
}));

// Mock NewCertificateModal
jest.mock('../../src/components/certificates/NewCertificateModal', () => {
  const { View } = require('react-native');
  return {
    NewCertificateModal: ({ visible }: { visible: boolean }) =>
      visible ? <View testID="new-cert-modal" /> : null,
  };
});

// Mock Paywall
jest.mock('../../src/components/paywall/Paywall', () => {
  const { View } = require('react-native');
  return {
    Paywall: ({ visible }: { visible: boolean }) =>
      visible ? <View testID="paywall" /> : null,
  };
});

// Mock RSVPWord
jest.mock('../../src/components/rsvp/RSVPWord', () => {
  const { View, Text } = require('react-native');
  return {
    RSVPWord: ({ word }: { word: { display: string } | null }) => (
      <View testID="rsvp-word">
        <Text>{word?.display || 'Ready'}</Text>
      </View>
    ),
  };
});

// Mock PlaybackControls
jest.mock('../../src/components/controls/PlaybackControls', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
  return {
    PlaybackControls: ({
      onToggle,
      wpm,
      onWPMLimitHit
    }: {
      onToggle: () => void;
      wpm: number;
      onWPMLimitHit: () => void;
    }) => (
      <View testID="playback-controls">
        <TouchableOpacity testID="toggle-btn" onPress={onToggle}>
          <Text>Toggle</Text>
        </TouchableOpacity>
        <Text testID="wpm-display">{wpm}</Text>
        <TouchableOpacity testID="wpm-limit-btn" onPress={onWPMLimitHit}>
          <Text>Hit Limit</Text>
        </TouchableOpacity>
      </View>
    ),
  };
});

// Mock useRSVPEngine
const mockToggle = jest.fn();
const mockSetWPM = jest.fn();
const mockReset = jest.fn();
const mockRewindSentence = jest.fn();
const mockSkipSentence = jest.fn();

jest.mock('../../src/hooks/useRSVPEngine', () => ({
  useRSVPEngine: () => ({
    currentWord: { display: 'Hello', orpIndex: 1, pauseMultiplier: 1, isSentenceEnd: false },
    currentIndex: 0,
    totalWords: 100,
    isPlaying: false,
    wpm: 250,
    progress: 0,
    toggle: mockToggle,
    setWPM: mockSetWPM,
    reset: mockReset,
    rewindSentence: mockRewindSentence,
    skipSentence: mockSkipSentence,
  }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('ArticleReaderScreen Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial rendering', () => {
    it('renders article title and topic', () => {
      renderWithProviders(<ArticleReaderScreen />);

      expect(screen.getByText('Science & Discovery')).toBeTruthy();
      expect(screen.getByText('The Water Cycle')).toBeTruthy();
    });

    it('renders RSVP word component', () => {
      renderWithProviders(<ArticleReaderScreen />);

      expect(screen.getByTestId('rsvp-word')).toBeTruthy();
    });

    it('renders playback controls', () => {
      renderWithProviders(<ArticleReaderScreen />);

      expect(screen.getByTestId('playback-controls')).toBeTruthy();
    });

    it('renders instructions text', () => {
      renderWithProviders(<ArticleReaderScreen />);

      expect(screen.getByText(/Focus on the/)).toBeTruthy();
      expect(screen.getByText(/Comprehension quiz follows/)).toBeTruthy();
    });
  });

  describe('navigation', () => {
    it('navigates back when back button is pressed', () => {
      renderWithProviders(<ArticleReaderScreen />);

      const backButton = screen.getByText('← Back');
      fireEvent.press(backButton);

      expect(mockBack).toHaveBeenCalled();
    });
  });

  describe('article not found', () => {
    it('shows error when article does not exist', () => {
      // Change the mock to return a nonexistent article ID
      const { useLocalSearchParams } = require('expo-router');
      useLocalSearchParams.mockReturnValueOnce({ id: 'nonexistent' });

      renderWithProviders(<ArticleReaderScreen />);

      expect(screen.getByText('Article not found')).toBeTruthy();
    });
  });

  describe('paywall', () => {
    it('shows paywall when WPM limit is hit', () => {
      renderWithProviders(<ArticleReaderScreen />);

      const limitButton = screen.getByTestId('wpm-limit-btn');
      fireEvent.press(limitButton);

      expect(screen.getByTestId('paywall')).toBeTruthy();
    });
  });
});
