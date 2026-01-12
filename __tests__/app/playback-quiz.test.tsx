/**
 * Tests for Playback Quiz Modal
 *
 * Tests the quiz flow after completing reading including:
 * - Question rendering and progress tracking
 * - Answer selection and correctness tracking
 * - Score calculation and display
 * - Multi-source completion (training, generated, curriculum)
 * - Results display with color coding
 * - Done and Retake actions
 */

import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import PlaybackQuizModal from '../../src/app/playback-quiz';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// =============================================================================
// Mocks
// =============================================================================

// Mock expo-router
const mockRouterBack = jest.fn();
const mockRouterDismissAll = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    back: () => mockRouterBack(),
    dismissAll: () => mockRouterDismissAll(),
  },
  useLocalSearchParams: jest.fn(() => ({
    sourceId: 'test-article-1',
    source: 'training',
    wpm: '300',
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

// Mock isAnswerCorrect
const mockIsAnswerCorrect = jest.fn();
jest.mock('../../src/utils/calculateQuizScore', () => ({
  isAnswerCorrect: (...args: unknown[]) => mockIsAnswerCorrect(...args),
}));

// Mock learningStore
const mockCompleteArticle = jest.fn();
jest.mock('../../src/store/learningStore', () => ({
  useLearningStore: () => ({
    completeArticle: mockCompleteArticle,
  }),
}));

// Mock journeyStore
const mockRecordSession = jest.fn();
jest.mock('../../src/store/journeyStore', () => ({
  useJourneyStore: () => ({
    recordSession: mockRecordSession,
  }),
}));

// Mock generatedStore
const mockUpdateArticleProgress = jest.fn();
jest.mock('../../src/store/generatedStore', () => ({
  useGeneratedStore: () => ({
    updateArticleProgress: mockUpdateArticleProgress,
  }),
}));

// Mock curriculumStore
const mockMarkArticleCompleted = jest.fn();
jest.mock('../../src/store/curriculumStore', () => ({
  useCurriculumStore: () => ({
    markArticleCompleted: mockMarkArticleCompleted,
  }),
}));

// Mock QuestionRenderer
jest.mock('../../src/components/quiz', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
  return {
    QuestionRenderer: ({
      question,
      answer,
      onAnswer,
      disabled,
    }: {
      question: { question: string; id: string };
      answer: unknown;
      onAnswer: (answer: string) => void;
      disabled: boolean;
    }) => (
      <View testID="question-renderer">
        <Text testID="question-text">{question.question}</Text>
        <TouchableOpacity
          testID="answer-option-a"
          onPress={() => !disabled && onAnswer('a')}
          disabled={disabled}
        >
          <Text>Option A</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="answer-option-b"
          onPress={() => !disabled && onAnswer('b')}
          disabled={disabled}
        >
          <Text>Option B</Text>
        </TouchableOpacity>
        {answer && <Text testID="selected-answer">Selected: {String(answer)}</Text>}
      </View>
    ),
    QuestionAnswer: {},
  };
});

// =============================================================================
// Test Helpers
// =============================================================================

const createMockQuestions = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `q${i + 1}`,
    question: `Question ${i + 1}?`,
    type: 'single_choice',
    options: ['Option A', 'Option B', 'Option C'],
    correctAnswer: 'a',
  }));
};

const createMockContent = (overrides: {
  id?: string;
  title?: string;
  questions?: Array<{ id: string; question: string }>;
} = {}) => ({
  id: 'test-article-1',
  title: 'Test Article',
  content: 'Test content',
  wordCount: 500,
  questions: createMockQuestions(3),
  ...overrides,
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// =============================================================================
// Tests
// =============================================================================

describe('PlaybackQuizModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockResolveContent.mockReturnValue(createMockContent());
    mockIsAnswerCorrect.mockReturnValue(true);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // ===========================================================================
  // Empty State
  // ===========================================================================

  describe('empty state', () => {
    it('shows empty state when no questions available', () => {
      mockResolveContent.mockReturnValue(createMockContent({ questions: [] }));
      const { getByText } = renderWithProviders(<PlaybackQuizModal />);

      expect(getByText('No Quiz Available')).toBeTruthy();
      expect(getByText('This content does not have quiz questions.')).toBeTruthy();
    });

    it('shows empty state when content not found', () => {
      mockResolveContent.mockReturnValue(null);
      const { getByText } = renderWithProviders(<PlaybackQuizModal />);

      expect(getByText('No Quiz Available')).toBeTruthy();
    });

    it('navigates back when close pressed on empty state', () => {
      mockResolveContent.mockReturnValue(createMockContent({ questions: [] }));
      const { getByTestId } = renderWithProviders(<PlaybackQuizModal />);

      fireEvent.press(getByTestId('icon-close'));

      expect(mockRouterBack).toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // Question Rendering
  // ===========================================================================

  describe('question rendering', () => {
    it('shows quiz title', () => {
      const { getByText } = renderWithProviders(<PlaybackQuizModal />);

      expect(getByText('Comprehension Quiz')).toBeTruthy();
    });

    it('shows question progress', () => {
      mockResolveContent.mockReturnValue(createMockContent({ questions: createMockQuestions(5) }));
      const { getByText } = renderWithProviders(<PlaybackQuizModal />);

      expect(getByText('Question 1 of 5')).toBeTruthy();
    });

    it('renders QuestionRenderer with current question', () => {
      const { getByTestId, getByText } = renderWithProviders(<PlaybackQuizModal />);

      expect(getByTestId('question-renderer')).toBeTruthy();
      expect(getByText('Question 1?')).toBeTruthy();
    });
  });

  // ===========================================================================
  // Answer Flow
  // ===========================================================================

  describe('answer flow', () => {
    it('tracks correct answer and advances to next question', async () => {
      mockIsAnswerCorrect.mockReturnValue(true);
      const { getByTestId, getByText } = renderWithProviders(<PlaybackQuizModal />);

      // Answer first question
      fireEvent.press(getByTestId('answer-option-a'));

      // Wait for delay and advance
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      await waitFor(() => {
        expect(getByText('Question 2 of 3')).toBeTruthy();
      });
    });

    it('tracks incorrect answer and advances to next question', async () => {
      mockIsAnswerCorrect.mockReturnValue(false);
      const { getByTestId, getByText } = renderWithProviders(<PlaybackQuizModal />);

      fireEvent.press(getByTestId('answer-option-b'));

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      await waitFor(() => {
        expect(getByText('Question 2 of 3')).toBeTruthy();
      });
    });

    it('shows results after answering all questions', async () => {
      mockIsAnswerCorrect.mockReturnValue(true);
      const { getByTestId, getByText, rerender } = renderWithProviders(<PlaybackQuizModal />);

      // Answer all 3 questions
      for (let i = 0; i < 3; i++) {
        fireEvent.press(getByTestId('answer-option-a'));
        act(() => {
          jest.advanceTimersByTime(1000);
        });
        if (i < 2) {
          rerender(<ThemeProvider><PlaybackQuizModal /></ThemeProvider>);
        }
      }

      await waitFor(() => {
        expect(getByText('Complete!')).toBeTruthy();
      });
    });
  });

  // ===========================================================================
  // Results Display
  // ===========================================================================

  describe('results display', () => {
    const completeQuiz = async (correctCount: number) => {
      const questions = createMockQuestions(3);
      mockResolveContent.mockReturnValue(createMockContent({ questions }));

      // Set up answer correctness
      let answeredCount = 0;
      mockIsAnswerCorrect.mockImplementation(() => {
        const isCorrect = answeredCount < correctCount;
        answeredCount++;
        return isCorrect;
      });

      const result = renderWithProviders(<PlaybackQuizModal />);

      // Answer all questions
      for (let i = 0; i < 3; i++) {
        fireEvent.press(result.getByTestId('answer-option-a'));
        act(() => {
          jest.advanceTimersByTime(1000);
        });
        if (i < 2) {
          result.rerender(<ThemeProvider><PlaybackQuizModal /></ThemeProvider>);
        }
      }

      return result;
    };

    it('shows Results title when complete', async () => {
      const { getByText } = await completeQuiz(3);

      await waitFor(() => {
        expect(getByText('Results')).toBeTruthy();
      });
    });

    it('displays correct comprehension score', async () => {
      const { getByText } = await completeQuiz(2);

      await waitFor(() => {
        expect(getByText('67%')).toBeTruthy(); // 2/3 = 67%
      });
    });

    it('displays correct answer count', async () => {
      const { getByText } = await completeQuiz(2);

      await waitFor(() => {
        expect(getByText('2 / 3')).toBeTruthy();
      });
    });

    it('displays reading WPM from params', async () => {
      const { getByText } = await completeQuiz(3);

      await waitFor(() => {
        expect(getByText('300 WPM')).toBeTruthy();
      });
    });

    it('shows perfect score for all correct', async () => {
      const { getByText } = await completeQuiz(3);

      await waitFor(() => {
        expect(getByText('100%')).toBeTruthy();
        expect(getByText('3 / 3')).toBeTruthy();
      });
    });
  });

  // ===========================================================================
  // Score-Based Completion (Training Source)
  // ===========================================================================

  describe('training source completion', () => {
    beforeEach(() => {
      const { useLocalSearchParams } = require('expo-router');
      useLocalSearchParams.mockReturnValue({
        sourceId: 'training-article-1',
        source: 'training',
        wpm: '350',
      });
    });

    it('calls completeArticle with score and WPM', async () => {
      mockIsAnswerCorrect.mockReturnValue(true);
      const { getByTestId } = renderWithProviders(<PlaybackQuizModal />);

      // Answer all questions (3 correct)
      for (let i = 0; i < 3; i++) {
        fireEvent.press(getByTestId('answer-option-a'));
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      await waitFor(() => {
        expect(mockCompleteArticle).toHaveBeenCalledWith('training-article-1', 100, 350);
      });
    });

    it('calls recordSession for training', async () => {
      mockIsAnswerCorrect.mockReturnValue(true);
      const { getByTestId } = renderWithProviders(<PlaybackQuizModal />);

      for (let i = 0; i < 3; i++) {
        fireEvent.press(getByTestId('answer-option-a'));
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      await waitFor(() => {
        expect(mockRecordSession).toHaveBeenCalledWith({
          wpm: 350,
          comprehension: 100,
          articleId: 'training-article-1',
          articleType: 'curriculum',
        });
      });
    });
  });

  // ===========================================================================
  // Score-Based Completion (Generated Source)
  // ===========================================================================

  describe('generated source completion', () => {
    beforeEach(() => {
      const { useLocalSearchParams } = require('expo-router');
      useLocalSearchParams.mockReturnValue({
        sourceId: 'gen-article-1',
        source: 'generated',
        wpm: '400',
      });
    });

    it('calls updateArticleProgress for generated content', async () => {
      mockIsAnswerCorrect.mockReturnValue(true);
      const { getByTestId } = renderWithProviders(<PlaybackQuizModal />);

      for (let i = 0; i < 3; i++) {
        fireEvent.press(getByTestId('answer-option-a'));
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      await waitFor(() => {
        expect(mockUpdateArticleProgress).toHaveBeenCalledWith(
          'gen-article-1',
          expect.objectContaining({
            completed: true,
            comprehensionScore: 100,
            highestWPM: 400,
          })
        );
      });
    });

    it('calls recordSession with generated articleType', async () => {
      mockIsAnswerCorrect.mockReturnValue(true);
      const { getByTestId } = renderWithProviders(<PlaybackQuizModal />);

      for (let i = 0; i < 3; i++) {
        fireEvent.press(getByTestId('answer-option-a'));
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      await waitFor(() => {
        expect(mockRecordSession).toHaveBeenCalledWith(
          expect.objectContaining({
            articleType: 'generated',
          })
        );
      });
    });
  });

  // ===========================================================================
  // Score-Based Completion (Curriculum Source)
  // ===========================================================================

  describe('curriculum source completion', () => {
    beforeEach(() => {
      const { useLocalSearchParams } = require('expo-router');
      useLocalSearchParams.mockReturnValue({
        sourceId: 'curr_123:2',
        source: 'curriculum',
        wpm: '280',
      });
    });

    it('calls markArticleCompleted with parsed IDs', async () => {
      mockIsAnswerCorrect.mockReturnValue(true);
      const { getByTestId } = renderWithProviders(<PlaybackQuizModal />);

      for (let i = 0; i < 3; i++) {
        fireEvent.press(getByTestId('answer-option-a'));
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      await waitFor(() => {
        expect(mockMarkArticleCompleted).toHaveBeenCalledWith('curr_123', 2, 100, 280);
      });
    });

    it('calls recordSession for curriculum', async () => {
      mockIsAnswerCorrect.mockReturnValue(true);
      const { getByTestId } = renderWithProviders(<PlaybackQuizModal />);

      for (let i = 0; i < 3; i++) {
        fireEvent.press(getByTestId('answer-option-a'));
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      await waitFor(() => {
        expect(mockRecordSession).toHaveBeenCalledWith({
          wpm: 280,
          comprehension: 100,
          articleId: 'curr_123:2',
          articleType: 'curriculum',
        });
      });
    });
  });

  // ===========================================================================
  // Results Actions
  // ===========================================================================

  describe('results actions', () => {
    const setupCompletedState = async () => {
      mockIsAnswerCorrect.mockReturnValue(true);
      const result = renderWithProviders(<PlaybackQuizModal />);

      for (let i = 0; i < 3; i++) {
        fireEvent.press(result.getByTestId('answer-option-a'));
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      await waitFor(() => {
        expect(result.getByText('Complete!')).toBeTruthy();
      });

      return result;
    };

    it('calls dismissAll when Done pressed', async () => {
      const { getByText } = await setupCompletedState();

      fireEvent.press(getByText('Done'));

      expect(mockRouterDismissAll).toHaveBeenCalled();
    });

    it('resets quiz when Retake Quiz pressed', async () => {
      const { getByText, queryByText } = await setupCompletedState();

      fireEvent.press(getByText('Retake Quiz'));

      await waitFor(() => {
        expect(queryByText('Complete!')).toBeNull();
        expect(getByText('Question 1 of 3')).toBeTruthy();
      });
    });
  });

  // ===========================================================================
  // Navigation
  // ===========================================================================

  describe('navigation', () => {
    it('closes modal when close button pressed during quiz', () => {
      const { getByTestId } = renderWithProviders(<PlaybackQuizModal />);

      fireEvent.press(getByTestId('icon-close'));

      expect(mockRouterBack).toHaveBeenCalled();
    });
  });
});
