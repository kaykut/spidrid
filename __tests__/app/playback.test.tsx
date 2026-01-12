/**
 * Tests for Playback Modal
 *
 * Tests the RSVP playback modal including:
 * - Content loading from multiple sources (training, imported, generated, curriculum)
 * - Playback state transitions (loading → playing → complete → results)
 * - WPM tracking and display
 * - Quiz navigation on completion
 * - Results screen for non-quiz content
 */

import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import PlaybackModal from '../../src/app/playback';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// =============================================================================
// Mocks
// =============================================================================

// Mock expo-router
const mockRouterBack = jest.fn();
const mockRouterPush = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    back: () => mockRouterBack(),
    push: (params: object) => mockRouterPush(params),
  },
  useLocalSearchParams: jest.fn(() => ({
    sourceId: 'test-content-1',
    source: 'imported',
  })),
}));

// Mock safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
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

// Mock contentResolver
const mockResolveContent = jest.fn();
jest.mock('../../src/utils/contentResolver', () => ({
  resolveContentBySource: (...args: unknown[]) => mockResolveContent(...args),
}));

// Mock learningStore
const mockSetCurrentWPM = jest.fn();
const mockStartArticle = jest.fn();
jest.mock('../../src/store/learningStore', () => ({
  useLearningStore: () => ({
    currentWPM: 250,
    setCurrentWPM: mockSetCurrentWPM,
    startArticle: mockStartArticle,
  }),
}));

// Mock contentStore
const mockUpdateProgress = jest.fn();
jest.mock('../../src/store/contentStore', () => ({
  useContentStore: () => ({
    updateProgress: mockUpdateProgress,
  }),
}));

// Mock generatedStore
const mockUpdateGeneratedProgress = jest.fn();
jest.mock('../../src/store/generatedStore', () => ({
  useGeneratedStore: () => ({
    updateArticleProgress: mockUpdateGeneratedProgress,
  }),
}));

// Mock RSVP Engine
const mockToggle = jest.fn();
const mockSetWPM = jest.fn();
const mockReset = jest.fn();
const mockRewindSentence = jest.fn();
const mockSkipSentence = jest.fn();
const mockResumeFromChapter = jest.fn();
let mockEngineProgress = 0;
let mockEngineIsPlaying = false;
let mockEngineWPM = 250;
let mockChapterPaused: { title: string; index: number } | null = null;

jest.mock('../../src/hooks/useRSVPEngine', () => ({
  useRSVPEngine: () => ({
    currentWord: { display: 'Test', orpIndex: 1 },
    isPlaying: mockEngineIsPlaying,
    wpm: mockEngineWPM,
    progress: mockEngineProgress,
    currentIndex: 0,
    totalWords: 100,
    toggle: mockToggle,
    setWPM: mockSetWPM,
    reset: mockReset,
    rewindSentence: mockRewindSentence,
    skipSentence: mockSkipSentence,
    chapterPaused: mockChapterPaused,
    resumeFromChapter: mockResumeFromChapter,
  }),
}));

// Mock textProcessor
jest.mock('../../src/services/textProcessor', () => ({
  processText: jest.fn(() => [
    { display: 'Test', orpIndex: 1 },
    { display: 'content', orpIndex: 2 },
  ]),
}));

// Mock PlaybackControls
jest.mock('../../src/components/controls/PlaybackControls', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
  return {
    PlaybackControls: ({
      isPlaying,
      wpm,
      onToggle,
      onWPMChange,
    }: {
      isPlaying: boolean;
      wpm: number;
      onToggle: () => void;
      onWPMChange: (wpm: number) => void;
    }) => (
      <View testID="playback-controls">
        <Text testID="wpm-display">{wpm} WPM</Text>
        <TouchableOpacity testID="toggle-button" onPress={onToggle}>
          <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity testID="wpm-up" onPress={() => onWPMChange(wpm + 50)}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    ),
  };
});

// Mock RSVPWord
jest.mock('../../src/components/rsvp/RSVPWord', () => {
  const { View, Text } = require('react-native');
  return {
    RSVPWord: ({ word }: { word: { display: string } }) => (
      <View testID="rsvp-word">
        <Text>{word?.display}</Text>
      </View>
    ),
  };
});

// Mock ChapterPauseOverlay
jest.mock('../../src/components/rsvp/ChapterPauseOverlay', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
  return {
    ChapterPauseOverlay: ({
      chapter,
      onContinue,
    }: {
      chapter: { title: string; index: number };
      onContinue: () => void;
    }) => (
      <View testID="chapter-overlay">
        <Text>Chapter {chapter.index}</Text>
        <Text>{chapter.title}</Text>
        <TouchableOpacity testID="continue-chapter" onPress={onContinue}>
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    ),
  };
});

// =============================================================================
// Test Helpers
// =============================================================================

const createMockContent = (overrides: Partial<{
  id: string;
  title: string;
  content: string;
  wordCount: number;
  hasQuiz: boolean;
  questions: Array<{ id: string; question: string }>;
}> = {}) => ({
  id: 'test-content-1',
  title: 'Test Article',
  content: 'This is test content for playback.',
  wordCount: 500,
  hasQuiz: false,
  questions: [],
  ...overrides,
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// =============================================================================
// Tests
// =============================================================================

describe('PlaybackModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockEngineProgress = 0;
    mockEngineIsPlaying = false;
    mockEngineWPM = 250;
    mockChapterPaused = null;
    mockResolveContent.mockReturnValue(createMockContent());
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // ===========================================================================
  // Content Loading
  // ===========================================================================

  describe('content loading', () => {
    it('displays content title when loaded', () => {
      mockResolveContent.mockReturnValue(createMockContent({ title: 'My Article' }));
      const { getByText } = renderWithProviders(<PlaybackModal />);

      expect(getByText('My Article')).toBeTruthy();
    });

    it('shows empty state when content not found', () => {
      mockResolveContent.mockReturnValue(null);
      const { getByText } = renderWithProviders(<PlaybackModal />);

      expect(getByText('Content Not Found')).toBeTruthy();
    });

    it('calls startArticle for training content', () => {
      const { useLocalSearchParams } = require('expo-router');
      useLocalSearchParams.mockReturnValue({ sourceId: 'article-1', source: 'training' });

      renderWithProviders(<PlaybackModal />);

      expect(mockStartArticle).toHaveBeenCalledWith('article-1');
    });

    it('calls startArticle for generated content', () => {
      const { useLocalSearchParams } = require('expo-router');
      useLocalSearchParams.mockReturnValue({ sourceId: 'gen-1', source: 'generated' });

      renderWithProviders(<PlaybackModal />);

      expect(mockStartArticle).toHaveBeenCalledWith('gen-1');
    });

    it('does not call startArticle for imported content', () => {
      const { useLocalSearchParams } = require('expo-router');
      useLocalSearchParams.mockReturnValue({ sourceId: 'imported-1', source: 'imported' });

      renderWithProviders(<PlaybackModal />);

      expect(mockStartArticle).not.toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // RSVP Playback
  // ===========================================================================

  describe('RSVP playback', () => {
    it('shows RSVP word display when content loaded', () => {
      const { getByTestId } = renderWithProviders(<PlaybackModal />);

      expect(getByTestId('rsvp-word')).toBeTruthy();
    });

    it('shows playback controls when content loaded', () => {
      const { getByTestId } = renderWithProviders(<PlaybackModal />);

      expect(getByTestId('playback-controls')).toBeTruthy();
    });

    it('calls toggle when play button pressed', () => {
      const { getByTestId } = renderWithProviders(<PlaybackModal />);

      fireEvent.press(getByTestId('toggle-button'));

      expect(mockToggle).toHaveBeenCalled();
    });

    it('updates WPM when WPM change requested', () => {
      const { getByTestId } = renderWithProviders(<PlaybackModal />);

      fireEvent.press(getByTestId('wpm-up'));

      expect(mockSetWPM).toHaveBeenCalledWith(300);
      expect(mockSetCurrentWPM).toHaveBeenCalledWith(300);
    });
  });

  // ===========================================================================
  // Chapter Pause
  // ===========================================================================

  describe('chapter pause', () => {
    it('shows chapter overlay when chapter paused', () => {
      mockChapterPaused = { title: 'Introduction to Speed Reading', index: 1 };
      const { getByTestId, getByText } = renderWithProviders(<PlaybackModal />);

      expect(getByTestId('chapter-overlay')).toBeTruthy();
      expect(getByText('Introduction to Speed Reading')).toBeTruthy();
    });

    it('calls resumeFromChapter when continue pressed', () => {
      mockChapterPaused = { title: 'Chapter 1', index: 1 };
      const { getByTestId } = renderWithProviders(<PlaybackModal />);

      fireEvent.press(getByTestId('continue-chapter'));

      expect(mockResumeFromChapter).toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // Playback Completion
  // ===========================================================================

  describe('playback completion', () => {
    it('shows results when playback completes (no quiz)', async () => {
      mockResolveContent.mockReturnValue(createMockContent({ hasQuiz: false }));
      const { getByText, rerender } = renderWithProviders(<PlaybackModal />);

      // Simulate playback completion
      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      rerender(<ThemeProvider><PlaybackModal /></ThemeProvider>);

      // Wait for completion delay
      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(getByText('Complete!')).toBeTruthy();
      });
    });

    it('displays reading WPM in results', async () => {
      mockResolveContent.mockReturnValue(createMockContent({ hasQuiz: false }));
      mockEngineWPM = 350;
      const { getByText, rerender } = renderWithProviders(<PlaybackModal />);

      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      rerender(<ThemeProvider><PlaybackModal /></ThemeProvider>);

      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(getByText('350 WPM')).toBeTruthy();
      });
    });

    it('displays word count in results', async () => {
      mockResolveContent.mockReturnValue(createMockContent({ hasQuiz: false, wordCount: 1200 }));
      const { getByText, rerender } = renderWithProviders(<PlaybackModal />);

      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      rerender(<ThemeProvider><PlaybackModal /></ThemeProvider>);

      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(getByText('1200')).toBeTruthy();
      });
    });

    it('updates progress for imported content on completion', async () => {
      const { useLocalSearchParams } = require('expo-router');
      useLocalSearchParams.mockReturnValue({ sourceId: 'imported-1', source: 'imported' });
      mockResolveContent.mockReturnValue(createMockContent({ hasQuiz: false }));

      const { rerender } = renderWithProviders(<PlaybackModal />);

      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      rerender(<ThemeProvider><PlaybackModal /></ThemeProvider>);

      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(mockUpdateProgress).toHaveBeenCalledWith('imported-1', 1);
      });
    });

    it('updates generated article progress on completion (no quiz)', async () => {
      const { useLocalSearchParams } = require('expo-router');
      useLocalSearchParams.mockReturnValue({ sourceId: 'gen-1', source: 'generated' });
      mockResolveContent.mockReturnValue(createMockContent({ hasQuiz: false }));
      mockEngineWPM = 300;

      const { rerender } = renderWithProviders(<PlaybackModal />);

      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      rerender(<ThemeProvider><PlaybackModal /></ThemeProvider>);

      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(mockUpdateGeneratedProgress).toHaveBeenCalledWith('gen-1', expect.objectContaining({
          completed: true,
          highestWPM: 300,
        }));
      });
    });
  });

  // ===========================================================================
  // Quiz Navigation
  // ===========================================================================

  describe('quiz navigation', () => {
    it('navigates to quiz when content has questions', async () => {
      const { useLocalSearchParams } = require('expo-router');
      useLocalSearchParams.mockReturnValue({ sourceId: 'training-1', source: 'training' });
      mockResolveContent.mockReturnValue(createMockContent({
        hasQuiz: true,
        questions: [{ id: 'q1', question: 'Test?' }],
      }));
      mockEngineWPM = 280;

      const { rerender } = renderWithProviders(<PlaybackModal />);

      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      rerender(<ThemeProvider><PlaybackModal /></ThemeProvider>);

      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(mockRouterPush).toHaveBeenCalledWith({
          pathname: '/playback-quiz',
          params: {
            sourceId: 'training-1',
            source: 'training',
            wpm: '280',
          },
        });
      });
    });

    it('does not navigate to quiz when questions array is empty', async () => {
      mockResolveContent.mockReturnValue(createMockContent({
        hasQuiz: true,
        questions: [],
      }));

      const { rerender } = renderWithProviders(<PlaybackModal />);

      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      rerender(<ThemeProvider><PlaybackModal /></ThemeProvider>);

      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(mockRouterPush).not.toHaveBeenCalled();
      });
    });
  });

  // ===========================================================================
  // Results Actions
  // ===========================================================================

  describe('results actions', () => {
    const setupCompletedState = async () => {
      mockResolveContent.mockReturnValue(createMockContent({ hasQuiz: false }));
      const result = renderWithProviders(<PlaybackModal />);

      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      result.rerender(<ThemeProvider><PlaybackModal /></ThemeProvider>);

      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(result.getByText('Complete!')).toBeTruthy();
      });

      return result;
    };

    it('closes modal when Done pressed', async () => {
      const { getByText } = await setupCompletedState();

      fireEvent.press(getByText('Done'));

      expect(mockRouterBack).toHaveBeenCalled();
    });

    it('resets playback when Read Again pressed', async () => {
      const { getByText, queryByText } = await setupCompletedState();

      fireEvent.press(getByText('Read Again'));

      expect(mockReset).toHaveBeenCalled();
      // Results should be hidden after reset
      await waitFor(() => {
        expect(queryByText('Complete!')).toBeNull();
      });
    });
  });

  // ===========================================================================
  // Navigation
  // ===========================================================================

  describe('navigation', () => {
    it('closes modal when close button pressed', () => {
      const { getByTestId } = renderWithProviders(<PlaybackModal />);

      fireEvent.press(getByTestId('icon-close'));

      expect(mockRouterBack).toHaveBeenCalled();
    });
  });
});
