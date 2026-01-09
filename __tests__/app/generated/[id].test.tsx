/**
 * Tests for Generated Article Reader Screen.
 *
 * Tests article loading, error handling, and initial rendering.
 * Note: Phase transitions (reading → quiz → results) are tested indirectly
 * through the RSVP engine and quiz component tests.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import GeneratedArticleScreen from '../../../src/app/generated/[id]';
import { ThemeProvider } from '../../../src/components/common/ThemeProvider';

// Mock expo-router
const mockRouterBack = jest.fn();
const mockRouterPush = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    back: () => mockRouterBack(),
    push: (path: string) => mockRouterPush(path),
  },
  useLocalSearchParams: jest.fn(() => ({ id: 'gen-article-123' })),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({
    children,
    style,
  }: {
    children: React.ReactNode;
    style?: object;
  }) => {
    const { View } = require('react-native');
    return (
      <View style={style} testID="safe-area">
        {children}
      </View>
    );
  },
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name }: { name: string }) => <Text testID={`icon-${name}`}>{name}</Text>,
  };
});

// Mock generatedStore
const mockGetArticleById = jest.fn();
const mockUpdateArticleProgress = jest.fn();
jest.mock('../../../src/store/generatedStore', () => ({
  useGeneratedStore: () => ({
    getArticleById: mockGetArticleById,
    updateArticleProgress: mockUpdateArticleProgress,
  }),
}));

// Mock journeyStore
const mockRecordSession = jest.fn();
jest.mock('../../../src/store/journeyStore', () => ({
  useJourneyStore: () => ({
    recordSession: mockRecordSession,
  }),
}));

// Mock learningStore
jest.mock('../../../src/store/learningStore', () => ({
  useLearningStore: () => ({
    currentWPM: 250,
    setCurrentWPM: jest.fn(),
  }),
}));

// Mock useRSVPEngine
const mockEngineToggle = jest.fn();
const mockEngineSetWPM = jest.fn();
const mockEngineReset = jest.fn();
const mockEngineRewindSentence = jest.fn();
const mockEngineSkipSentence = jest.fn();
jest.mock('../../../src/hooks/useRSVPEngine', () => ({
  useRSVPEngine: () => ({
    currentWord: { text: 'Test', orpIndex: 2 },
    isPlaying: false,
    wpm: 250,
    progress: 0,
    currentIndex: 0,
    totalWords: 100,
    toggle: mockEngineToggle,
    setWPM: mockEngineSetWPM,
    reset: mockEngineReset,
    rewindSentence: mockEngineRewindSentence,
    skipSentence: mockEngineSkipSentence,
  }),
}));

// Mock RSVPWord component
jest.mock('../../../src/components/rsvp/RSVPWord', () => {
  const { Text } = require('react-native');
  return {
    RSVPWord: ({ word }: { word: { text: string } }) => (
      <Text testID="rsvp-word">{word?.text || ''}</Text>
    ),
  };
});

// Mock PlaybackControls
jest.mock('../../../src/components/controls/PlaybackControls', () => {
  const { View, Text } = require('react-native');
  return {
    PlaybackControls: ({
      wpm,
      progress,
    }: {
      wpm: number;
      progress: number;
    }) => (
      <View testID="playback-controls">
        <Text testID="wpm-display">{wpm} WPM</Text>
        <Text testID="progress-display">{Math.round(progress * 100)}%</Text>
      </View>
    ),
  };
});

// Mock QuestionRenderer
jest.mock('../../../src/components/quiz', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
  return {
    QuestionRenderer: ({
      question,
      onAnswer,
    }: {
      question: { question: string };
      onAnswer: (answer: number) => void;
    }) => (
      <View testID="question-renderer">
        <Text>{question?.question}</Text>
        <TouchableOpacity testID="answer-button" onPress={() => onAnswer(0)}>
          <Text>Answer</Text>
        </TouchableOpacity>
      </View>
    ),
    QuestionAnswer: {},
  };
});

const createMockArticle = (overrides = {}) => ({
  id: 'gen-article-123',
  topic: 'Quantum Computing',
  targetDuration: 3,
  tone: 'explanatory',
  title: 'Understanding Quantum Bits',
  content: 'Quantum computing is a revolutionary technology. It uses qubits instead of classical bits.',
  wordCount: 500,
  questions: [],
  status: 'complete',
  generatedAt: Date.now(),
  completed: false,
  attemptCount: 0,
  ...overrides,
});

const renderWithProviders = () => {
  return render(
    <ThemeProvider>
      <GeneratedArticleScreen />
    </ThemeProvider>
  );
};

describe('GeneratedArticleScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetArticleById.mockReturnValue(createMockArticle());
  });

  describe('article not found', () => {
    it('shows error message when article does not exist', () => {
      mockGetArticleById.mockReturnValue(undefined);

      renderWithProviders();

      expect(screen.getByText('Article not found')).toBeTruthy();
    });

    it('shows go back link when article not found', () => {
      mockGetArticleById.mockReturnValue(undefined);

      renderWithProviders();

      expect(screen.getByText('Go back')).toBeTruthy();
    });

    it('navigates back when go back is pressed', () => {
      mockGetArticleById.mockReturnValue(undefined);

      renderWithProviders();

      fireEvent.press(screen.getByText('Go back'));

      expect(mockRouterBack).toHaveBeenCalled();
    });
  });

  describe('initial reading phase', () => {
    it('displays article title in header', () => {
      renderWithProviders();

      expect(screen.getByText('Understanding Quantum Bits')).toBeTruthy();
    });

    it('displays AI badge', () => {
      renderWithProviders();

      expect(screen.getByText('AI')).toBeTruthy();
    });

    it('shows back button', () => {
      renderWithProviders();

      expect(screen.getByTestId('icon-arrow-back')).toBeTruthy();
    });

    it('renders RSVP word display', () => {
      renderWithProviders();

      expect(screen.getByTestId('rsvp-word')).toBeTruthy();
    });

    it('renders playback controls', () => {
      renderWithProviders();

      expect(screen.getByTestId('playback-controls')).toBeTruthy();
    });

    it('navigates back when back button is pressed', () => {
      renderWithProviders();

      const backButton = screen.getByTestId('icon-arrow-back');
      fireEvent.press(backButton);

      expect(mockRouterBack).toHaveBeenCalled();
    });
  });

  describe('article with questions', () => {
    it('loads article with questions', () => {
      mockGetArticleById.mockReturnValue(
        createMockArticle({
          questions: [
            {
              id: 'q1',
              type: 'single_choice',
              question: 'What is a qubit?',
              options: ['A', 'B', 'C', 'D'],
              correctIndex: 1,
            },
          ],
        })
      );

      renderWithProviders();

      // Article loads without error
      expect(screen.getByText('Understanding Quantum Bits')).toBeTruthy();
    });
  });

  describe('store integration', () => {
    it('retrieves article by ID from store', () => {
      renderWithProviders();

      expect(mockGetArticleById).toHaveBeenCalledWith('gen-article-123');
    });

    it('retrieves article with empty ID gracefully', () => {
      const { useLocalSearchParams } = require('expo-router');
      useLocalSearchParams.mockReturnValueOnce({ id: '' });
      mockGetArticleById.mockReturnValue(undefined);

      renderWithProviders();

      expect(mockGetArticleById).toHaveBeenCalledWith('');
      expect(screen.getByText('Article not found')).toBeTruthy();
    });
  });

  describe('different article content', () => {
    it('renders article with different title', () => {
      mockGetArticleById.mockReturnValue(
        createMockArticle({ title: 'Machine Learning Basics' })
      );

      renderWithProviders();

      expect(screen.getByText('Machine Learning Basics')).toBeTruthy();
    });

    it('renders article with long title (truncated)', () => {
      mockGetArticleById.mockReturnValue(
        createMockArticle({
          title: 'A Very Long Article Title That Should Be Truncated In The Header Display',
        })
      );

      renderWithProviders();

      // The component has numberOfLines={1}, so it will truncate
      // We just verify it renders without crashing
      expect(screen.getByText(/A Very Long Article Title/)).toBeTruthy();
    });
  });
});
