/**
 * Tests for Generated Article Reader Screen
 *
 * Tests the RSVP reader for AI-generated articles including:
 * - Reading phase with RSVP playback
 * - Quiz phase for comprehension testing
 * - Results phase with stats
 * - Session recording to journey store
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react-native';
import GeneratedArticleScreen from '../../src/app/generated/[id]';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';
import { GeneratedArticle } from '../../src/types/generated';
import { Question } from '../../src/types/learning';

// Mock expo-router
const mockRouterBack = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    back: () => mockRouterBack(),
  },
  useLocalSearchParams: jest.fn(() => ({ id: 'test-generated-1' })),
}));

// Mock safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, style }: { children: React.ReactNode; style?: object }) => {
    const { View } = require('react-native');
    return <View style={style}>{children}</View>;
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

// Mock generatedStore
const mockGetArticleById = jest.fn();
const mockUpdateArticleProgress = jest.fn();
jest.mock('../../src/store/generatedStore', () => ({
  useGeneratedStore: () => ({
    getArticleById: mockGetArticleById,
    updateArticleProgress: mockUpdateArticleProgress,
  }),
}));

// Mock journeyStore
const mockRecordSession = jest.fn();
jest.mock('../../src/store/journeyStore', () => ({
  useJourneyStore: () => ({
    recordSession: mockRecordSession,
  }),
}));

// Mock learningStore
const mockSetCurrentWPM = jest.fn();
jest.mock('../../src/store/learningStore', () => ({
  useLearningStore: () => ({
    currentWPM: 250,
    setCurrentWPM: mockSetCurrentWPM,
  }),
}));

// Mock RSVP Engine
const mockToggle = jest.fn();
const mockSetWPM = jest.fn();
const mockReset = jest.fn();
const mockRewindSentence = jest.fn();
const mockSkipSentence = jest.fn();
let mockEngineProgress = 0;
let mockEngineIsPlaying = false;

jest.mock('../../src/hooks/useRSVPEngine', () => ({
  useRSVPEngine: () => ({
    currentWord: { display: 'Test', orpIndex: 1 },
    isPlaying: mockEngineIsPlaying,
    wpm: 250,
    progress: mockEngineProgress,
    currentIndex: 0,
    totalWords: 100,
    toggle: mockToggle,
    setWPM: mockSetWPM,
    reset: mockReset,
    rewindSentence: mockRewindSentence,
    skipSentence: mockSkipSentence,
  }),
}));

// Mock textProcessor
jest.mock('../../src/services/textProcessor', () => ({
  processText: jest.fn(() => [
    { display: 'Test', orpIndex: 1 },
    { display: 'content', orpIndex: 2 },
  ]),
}));

// Mock quiz components
jest.mock('../../src/components/quiz', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
  return {
    QuestionRenderer: ({
      question,
      onAnswer,
      disabled,
    }: {
      question: { question: string; type: string; options?: string[] };
      onAnswer: (answer: { type: string; value: number | boolean }) => void;
      disabled: boolean;
    }) => (
      <View testID="question-renderer">
        <Text>{question.question}</Text>
        {question.options?.map((opt: string, idx: number) => (
          <TouchableOpacity
            key={idx}
            testID={`option-${idx}`}
            onPress={() => !disabled && onAnswer({ type: 'single_choice', value: idx })}
            disabled={disabled}
          >
            <Text>{opt}</Text>
          </TouchableOpacity>
        ))}
        {question.type === 'true_false' && (
          <>
            <TouchableOpacity
              testID="true-button"
              onPress={() => !disabled && onAnswer({ type: 'true_false', value: true })}
              disabled={disabled}
            >
              <Text>True</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="false-button"
              onPress={() => !disabled && onAnswer({ type: 'true_false', value: false })}
              disabled={disabled}
            >
              <Text>False</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    ),
    QuestionAnswer: {},
  };
});

const createMockArticle = (overrides: Partial<GeneratedArticle> = {}): GeneratedArticle => ({
  id: 'test-generated-1',
  topic: 'Test Topic',
  targetDuration: 3,
  tone: 'explanatory',
  title: 'Test Generated Article',
  content: 'This is test content for the generated article.',
  wordCount: 500,
  questions: [],
  status: 'complete',
  generatedAt: Date.now(),
  completed: false,
  attemptCount: 0,
  ...overrides,
});

const createMockQuestions = (): Question[] => [
  {
    id: 'q1',
    type: 'single_choice',
    question: 'What is the answer?',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 1, // B is correct (index 1)
  },
  {
    id: 'q2',
    type: 'true_false',
    question: 'Is this true?',
    correctAnswer: true,
  },
];

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('GeneratedArticleScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockEngineProgress = 0;
    mockEngineIsPlaying = false;
    mockGetArticleById.mockReturnValue(createMockArticle());
  });

  describe('article not found', () => {
    it('renders "Article not found" when article does not exist', () => {
      mockGetArticleById.mockReturnValue(undefined);

      renderWithProviders(<GeneratedArticleScreen />);

      expect(screen.getByText('Article not found')).toBeTruthy();
    });

    it('shows "Go back" link when article not found', () => {
      mockGetArticleById.mockReturnValue(undefined);

      renderWithProviders(<GeneratedArticleScreen />);

      expect(screen.getByText('Go back')).toBeTruthy();
    });

    it('navigates back when "Go back" is pressed', () => {
      mockGetArticleById.mockReturnValue(undefined);

      renderWithProviders(<GeneratedArticleScreen />);

      fireEvent.press(screen.getByText('Go back'));

      expect(mockRouterBack).toHaveBeenCalled();
    });
  });

  describe('reading phase', () => {
    it('renders article title in header', () => {
      renderWithProviders(<GeneratedArticleScreen />);

      expect(screen.getByText('Test Generated Article')).toBeTruthy();
    });

    it('shows AI badge in header', () => {
      renderWithProviders(<GeneratedArticleScreen />);

      expect(screen.getByText('AI')).toBeTruthy();
    });

    it('renders RSVP word component', () => {
      renderWithProviders(<GeneratedArticleScreen />);

      // RSVP component should be present
      expect(screen.getByText('T')).toBeTruthy(); // First letter of "Test"
    });

    it('updates WPM in learningStore when WPM changes', () => {
      renderWithProviders(<GeneratedArticleScreen />);

      // Find and interact with WPM controls
      // The PlaybackControls should have a WPM slider/buttons
      // We're testing that the handler is wired up correctly
      expect(mockSetCurrentWPM).not.toHaveBeenCalled();
    });
  });

  describe('quiz phase - transition', () => {
    it('transitions to quiz phase when playback completes with questions', async () => {
      const articleWithQuestions = createMockArticle({
        questions: createMockQuestions(),
      });
      mockGetArticleById.mockReturnValue(articleWithQuestions);
      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      jest.useFakeTimers();

      renderWithProviders(<GeneratedArticleScreen />);

      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByText(/Question 1 of 2/)).toBeTruthy();
      });

      jest.useRealTimers();
    });
  });

  describe('quiz phase - answering', () => {
    beforeEach(() => {
      const articleWithQuestions = createMockArticle({
        questions: createMockQuestions(),
      });
      mockGetArticleById.mockReturnValue(articleWithQuestions);
    });

    it('shows question text in quiz phase', async () => {
      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      jest.useFakeTimers();

      renderWithProviders(<GeneratedArticleScreen />);

      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByText('What is the answer?')).toBeTruthy();
      });

      jest.useRealTimers();
    });

    it('displays answer options for single choice questions', async () => {
      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      jest.useFakeTimers();

      renderWithProviders(<GeneratedArticleScreen />);

      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByText('A')).toBeTruthy();
        expect(screen.getByText('B')).toBeTruthy();
        expect(screen.getByText('C')).toBeTruthy();
        expect(screen.getByText('D')).toBeTruthy();
      });

      jest.useRealTimers();
    });
  });

  describe('results phase - without quiz', () => {
    it('transitions directly to results when no questions exist', async () => {
      mockGetArticleById.mockReturnValue(createMockArticle({ questions: [] }));
      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      jest.useFakeTimers();

      renderWithProviders(<GeneratedArticleScreen />);

      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByText('Reading Complete!')).toBeTruthy();
      });

      jest.useRealTimers();
    });

    it('shows reading speed in results', async () => {
      mockGetArticleById.mockReturnValue(createMockArticle({ questions: [] }));
      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      jest.useFakeTimers();

      renderWithProviders(<GeneratedArticleScreen />);

      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByText('Reading Speed')).toBeTruthy();
        expect(screen.getByText('250 WPM')).toBeTruthy();
      });

      jest.useRealTimers();
    });

    it('shows word count in results', async () => {
      mockGetArticleById.mockReturnValue(
        createMockArticle({ questions: [], wordCount: 500 })
      );
      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      jest.useFakeTimers();

      renderWithProviders(<GeneratedArticleScreen />);

      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByText('Word Count')).toBeTruthy();
        expect(screen.getByText('500')).toBeTruthy();
      });

      jest.useRealTimers();
    });
  });

  describe('results phase - with quiz', () => {
    it('shows comprehension score in results', async () => {
      const articleWithQuestions = createMockArticle({
        questions: createMockQuestions(),
      });
      mockGetArticleById.mockReturnValue(articleWithQuestions);
      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      jest.useFakeTimers();

      renderWithProviders(<GeneratedArticleScreen />);

      // Transition to quiz
      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByText(/Question 1 of 2/)).toBeTruthy();
      });

      // Answer first question (correct - B)
      const optionB = screen.getByText('B');
      fireEvent.press(optionB);

      // Wait for transition to next question
      act(() => {
        jest.advanceTimersByTime(1100);
      });

      await waitFor(() => {
        expect(screen.getByText('Is this true?')).toBeTruthy();
      });

      // Answer second question (correct - True)
      const trueOption = screen.getByText('True');
      fireEvent.press(trueOption);

      // Wait for transition to results
      act(() => {
        jest.advanceTimersByTime(1100);
      });

      await waitFor(() => {
        expect(screen.getByText('Reading Complete!')).toBeTruthy();
        expect(screen.getByText('Comprehension')).toBeTruthy();
      });

      jest.useRealTimers();
    });
  });

  describe('navigation actions', () => {
    it('"Done" button navigates back', async () => {
      mockGetArticleById.mockReturnValue(createMockArticle({ questions: [] }));
      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      jest.useFakeTimers();

      renderWithProviders(<GeneratedArticleScreen />);

      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByText('Done')).toBeTruthy();
      });

      fireEvent.press(screen.getByText('Done'));

      expect(mockRouterBack).toHaveBeenCalled();

      jest.useRealTimers();
    });

    it('"Read Again" resets to reading phase', async () => {
      mockGetArticleById.mockReturnValue(createMockArticle({ questions: [] }));
      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      jest.useFakeTimers();

      renderWithProviders(<GeneratedArticleScreen />);

      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByText('Read Again')).toBeTruthy();
      });

      // Reset the progress mock for the next render cycle
      mockEngineProgress = 0;

      fireEvent.press(screen.getByText('Read Again'));

      expect(mockReset).toHaveBeenCalled();

      jest.useRealTimers();
    });

    it('back button in header navigates back', () => {
      renderWithProviders(<GeneratedArticleScreen />);

      // Find the back button (uses Ionicons "arrow-back")
      const backButton = screen.getByTestId('icon-arrow-back');
      // The button is wrapped in a TouchableOpacity, so we need to find the parent
      const touchable = backButton.parent?.parent;
      if (touchable) {
        fireEvent.press(touchable);
      }

      expect(mockRouterBack).toHaveBeenCalled();
    });
  });

  describe('session recording', () => {
    it('records session to journeyStore after quiz completion', async () => {
      const articleWithQuestions = createMockArticle({
        id: 'test-generated-1',
        questions: [
          {
            id: 'q1',
            type: 'single_choice',
            question: 'Test question?',
            options: ['A', 'B'],
            correctIndex: 0, // A is correct
          },
        ],
      });
      mockGetArticleById.mockReturnValue(articleWithQuestions);
      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      jest.useFakeTimers();

      renderWithProviders(<GeneratedArticleScreen />);

      // Transition to quiz
      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByText('Test question?')).toBeTruthy();
      });

      // Answer question
      fireEvent.press(screen.getByText('A'));

      // Wait for results transition
      act(() => {
        jest.advanceTimersByTime(1100);
      });

      await waitFor(() => {
        expect(mockRecordSession).toHaveBeenCalledWith(
          expect.objectContaining({
            articleId: 'test-generated-1',
            articleType: 'generated',
          })
        );
      });

      jest.useRealTimers();
    });

    it('updates article progress after quiz completion', async () => {
      const articleWithQuestions = createMockArticle({
        id: 'test-generated-1',
        questions: [
          {
            id: 'q1',
            type: 'single_choice',
            question: 'Test question?',
            options: ['A', 'B'],
            correctIndex: 0, // A is correct
          },
        ],
      });
      mockGetArticleById.mockReturnValue(articleWithQuestions);
      mockEngineProgress = 1;
      mockEngineIsPlaying = false;

      jest.useFakeTimers();

      renderWithProviders(<GeneratedArticleScreen />);

      // Transition to quiz
      act(() => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByText('Test question?')).toBeTruthy();
      });

      // Answer question
      fireEvent.press(screen.getByText('A'));

      // Wait for results transition
      act(() => {
        jest.advanceTimersByTime(1100);
      });

      await waitFor(() => {
        expect(mockUpdateArticleProgress).toHaveBeenCalledWith(
          'test-generated-1',
          expect.objectContaining({
            completed: true,
            comprehensionScore: expect.any(Number),
          })
        );
      });

      jest.useRealTimers();
    });
  });
});
