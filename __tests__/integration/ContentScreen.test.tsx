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
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock content store
const mockGetContentById = jest.fn(() => ({
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
      mockGetContentById.mockReturnValue(null);

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
