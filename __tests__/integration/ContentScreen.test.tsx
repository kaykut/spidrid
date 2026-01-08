/**
 * Integration Tests for Content Reader Screen.
 *
 * Tests the imported content reading flow.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ContentReaderScreen from '../../src/app/content/[id]';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// Mock expo-router
const mockBack = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    back: () => mockBack(),
  },
  useLocalSearchParams: jest.fn(() => ({ id: 'content-123' })),
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

// Mock content store
const mockGetContentById = jest.fn<{ id: string; title: string; content: string; wordCount: number; source: string; sourceUrl: string; readProgress: number; createdAt: number } | undefined, []>(() => ({
  id: 'content-123',
  title: 'Test Article',
  content: 'This is a test article with some content to read.',
  wordCount: 10,
  source: 'url',
  sourceUrl: 'https://example.com',
  readProgress: 0,
  createdAt: Date.now(),
}));
const mockUpdateProgress = jest.fn();
const mockUpdateLastRead = jest.fn();

jest.mock('../../src/store/contentStore', () => ({
  useContentStore: () => ({
    getContentById: mockGetContentById,
    updateProgress: mockUpdateProgress,
    updateLastRead: mockUpdateLastRead,
  }),
}));

// Mock learning store
const mockSetCurrentWPM = jest.fn();
jest.mock('../../src/store/learningStore', () => ({
  useLearningStore: () => ({
    currentWPM: 250,
    setCurrentWPM: mockSetCurrentWPM,
  }),
}));

// Mock subscription store
jest.mock('../../src/store/subscriptionStore', () => ({
  useSubscriptionStore: () => ({
    getMaxWPM: () => 450,
  }),
}));

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
      onWPMLimitHit
    }: {
      onToggle: () => void;
      onWPMLimitHit: () => void;
    }) => (
      <View testID="playback-controls">
        <TouchableOpacity testID="toggle-btn" onPress={onToggle}>
          <Text>Toggle</Text>
        </TouchableOpacity>
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
const mockJumpToIndex = jest.fn();

jest.mock('../../src/hooks/useRSVPEngine', () => ({
  useRSVPEngine: () => ({
    currentWord: { display: 'This', orpIndex: 1, pauseMultiplier: 1, isSentenceEnd: false },
    currentIndex: 0,
    totalWords: 10,
    isPlaying: false,
    wpm: 250,
    progress: 0,
    toggle: mockToggle,
    setWPM: mockSetWPM,
    reset: mockReset,
    jumpToIndex: mockJumpToIndex,
    rewindSentence: jest.fn(),
    skipSentence: jest.fn(),
  }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('ContentReaderScreen Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetContentById.mockReturnValue({
      id: 'content-123',
      title: 'Test Article',
      content: 'This is a test article with some content to read.',
      wordCount: 10,
      source: 'url',
      sourceUrl: 'https://example.com',
      readProgress: 0,
      createdAt: Date.now(),
    });
  });

  describe('initial rendering', () => {
    it('renders content title', () => {
      renderWithProviders(<ContentReaderScreen />);

      expect(screen.getByText('Test Article')).toBeTruthy();
    });

    it('renders source label for URL content', () => {
      renderWithProviders(<ContentReaderScreen />);

      expect(screen.getByText('🔗 Web')).toBeTruthy();
    });

    it('renders source label for text content', () => {
      mockGetContentById.mockReturnValue({
        id: 'content-123',
        title: 'Test Article',
        content: 'Some text content.',
        wordCount: 3,
        source: 'text',
        sourceUrl: '',
        readProgress: 0,
        createdAt: Date.now(),
      });

      renderWithProviders(<ContentReaderScreen />);

      expect(screen.getByText('📝 Text')).toBeTruthy();
    });

    it('renders RSVP word component', () => {
      renderWithProviders(<ContentReaderScreen />);

      expect(screen.getByTestId('rsvp-word')).toBeTruthy();
    });

    it('renders playback controls', () => {
      renderWithProviders(<ContentReaderScreen />);

      expect(screen.getByTestId('playback-controls')).toBeTruthy();
    });

    it('renders instructions', () => {
      renderWithProviders(<ContentReaderScreen />);

      expect(screen.getByText(/Focus on the/)).toBeTruthy();
      expect(screen.getByText(/Progress is saved automatically/)).toBeTruthy();
    });
  });

  describe('navigation', () => {
    it('updates progress and navigates back when back button is pressed', () => {
      renderWithProviders(<ContentReaderScreen />);

      const backButton = screen.getByText('← Back');
      fireEvent.press(backButton);

      expect(mockUpdateProgress).toHaveBeenCalled();
      expect(mockBack).toHaveBeenCalled();
    });
  });

  describe('content not found', () => {
    it('shows error when content does not exist', () => {
      mockGetContentById.mockReturnValue(undefined);

      renderWithProviders(<ContentReaderScreen />);

      expect(screen.getByText('Content not found')).toBeTruthy();
    });
  });

  describe('paywall', () => {
    it('shows paywall when WPM limit is hit', () => {
      renderWithProviders(<ContentReaderScreen />);

      const limitButton = screen.getByTestId('wpm-limit-btn');
      fireEvent.press(limitButton);

      expect(screen.getByTestId('paywall')).toBeTruthy();
    });
  });

  describe('last read tracking', () => {
    it('updates last read timestamp on mount', () => {
      renderWithProviders(<ContentReaderScreen />);

      expect(mockUpdateLastRead).toHaveBeenCalledWith('content-123');
    });
  });
});
