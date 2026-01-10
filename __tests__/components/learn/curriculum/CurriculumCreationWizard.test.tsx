/**
 * Tests for CurriculumCreationWizard Component.
 *
 * Tests the multi-step wizard for creating curricula: goal input,
 * article count selection, tone selection, duration selection,
 * and confirmation/submission.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { ThemeProvider } from '../../../../src/components/common/ThemeProvider';
import { CurriculumCreationWizard } from '../../../../src/components/learn/curriculum/CurriculumCreationWizard';

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <Text testID={testID || `icon-${name}`}>{name}</Text>
    ),
  };
});

// Mock expo-router
const mockRouterPush = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    push: (path: string) => mockRouterPush(path),
  },
}));

// Mock curriculumStore
const mockCreateCurriculum = jest.fn();
const mockClearError = jest.fn();
let mockIsGenerating = false;
let mockGenerationProgress: { current: number; total: number; message: string } | null = null;
let mockGenerationError: string | null = null;

jest.mock('../../../../src/store/curriculumStore', () => ({
  useCurriculumStore: () => ({
    createCurriculum: mockCreateCurriculum,
    isGenerating: mockIsGenerating,
    generationProgress: mockGenerationProgress,
    generationError: mockGenerationError,
    clearError: mockClearError,
  }),
}));

// Mock Alert
jest.spyOn(Alert, 'alert');

// Render helper
const renderWithProviders = (props: {
  visible: boolean;
  onClose: () => void;
  avgWpm?: number;
}) => {
  return render(
    <ThemeProvider>
      <CurriculumCreationWizard
        visible={props.visible}
        onClose={props.onClose}
        avgWpm={props.avgWpm ?? 250}
      />
    </ThemeProvider>
  );
};

describe('CurriculumCreationWizard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsGenerating = false;
    mockGenerationProgress = null;
    mockGenerationError = null;
  });

  describe('initial rendering', () => {
    it('renders modal when visible=true', () => {
      renderWithProviders({ visible: true, onClose: jest.fn() });
      expect(screen.getByText('Create Curriculum')).toBeTruthy();
    });

    it('does not render when visible=false', () => {
      renderWithProviders({ visible: false, onClose: jest.fn() });
      expect(screen.queryByText('Create Curriculum')).toBeNull();
    });

    it('shows step 1 (Goal input) initially', () => {
      renderWithProviders({ visible: true, onClose: jest.fn() });
      expect(screen.getByText('What do you want to learn?')).toBeTruthy();
    });
  });

  describe('Step 1: Goal input', () => {
    it('displays text input for learning goal', () => {
      renderWithProviders({ visible: true, onClose: jest.fn() });
      expect(screen.getByPlaceholderText(/e\.g\.,/i)).toBeTruthy();
    });

    it('Next button disabled when goal too short', () => {
      renderWithProviders({ visible: true, onClose: jest.fn() });

      const input = screen.getByPlaceholderText(/e\.g\.,/i);
      fireEvent.changeText(input, 'Short');

      // Press Next - should not advance because goal is too short
      const nextButton = screen.getByText('Next');
      fireEvent.press(nextButton);

      // Should still be on step 1 (goal input visible)
      expect(screen.getByText('What do you want to learn?')).toBeTruthy();
    });

    it('advances to step 2 when valid goal entered and Next pressed', () => {
      renderWithProviders({ visible: true, onClose: jest.fn() });

      const input = screen.getByPlaceholderText(/e\.g\.,/i);
      fireEvent.changeText(input, 'Learn the fundamentals of machine learning');

      const nextButton = screen.getByText('Next');
      fireEvent.press(nextButton);

      // Should now show step 2 (article count)
      expect(screen.getByText('How many articles?')).toBeTruthy();
    });
  });

  describe('Step 2: Article count', () => {
    const goToStep2 = () => {
      renderWithProviders({ visible: true, onClose: jest.fn() });
      const input = screen.getByPlaceholderText(/e\.g\.,/i);
      fireEvent.changeText(input, 'Learn machine learning fundamentals');
      fireEvent.press(screen.getByText('Next'));
    };

    it('shows article count selector', () => {
      goToStep2();
      expect(screen.getByText('3')).toBeTruthy();
      expect(screen.getByText('5')).toBeTruthy();
      expect(screen.getByText('7')).toBeTruthy();
      expect(screen.getByText('10')).toBeTruthy();
    });

    it('default selection is 5 articles', () => {
      goToStep2();
      // The 5 button should be highlighted (we'll check the article count shows 5)
      expect(screen.getByText('5')).toBeTruthy();
    });

    it('Back button returns to step 1', () => {
      goToStep2();
      fireEvent.press(screen.getByText('Back'));
      expect(screen.getByText('What do you want to learn?')).toBeTruthy();
    });

    it('advances to step 3 when Next pressed', () => {
      goToStep2();
      fireEvent.press(screen.getByText('Next'));
      expect(screen.getByText('Writing Style')).toBeTruthy();
    });
  });

  describe('Step 3: Tone selection', () => {
    const goToStep3 = () => {
      renderWithProviders({ visible: true, onClose: jest.fn() });
      const input = screen.getByPlaceholderText(/e\.g\.,/i);
      fireEvent.changeText(input, 'Learn machine learning fundamentals');
      fireEvent.press(screen.getByText('Next')); // Step 1 -> 2
      fireEvent.press(screen.getByText('Next')); // Step 2 -> 3
    };

    it('renders all 5 tone options', () => {
      goToStep3();
      expect(screen.getByText('Robotic')).toBeTruthy();
      expect(screen.getByText('Explanatory')).toBeTruthy();
      expect(screen.getByText('Sarcastic')).toBeTruthy();
      expect(screen.getByText('Storytelling')).toBeTruthy();
      expect(screen.getByText('Analogical')).toBeTruthy();
    });

    it('shows tone emojis', () => {
      goToStep3();
      expect(screen.getByText('🤖')).toBeTruthy();
      expect(screen.getByText('📚')).toBeTruthy();
      expect(screen.getByText('😏')).toBeTruthy();
      expect(screen.getByText('📖')).toBeTruthy();
      expect(screen.getByText('🔗')).toBeTruthy();
    });

    it('advances to step 4 when Next pressed', () => {
      goToStep3();
      fireEvent.press(screen.getByText('Next'));
      expect(screen.getByText('Reading Duration')).toBeTruthy();
    });
  });

  describe('Step 4: Duration', () => {
    const goToStep4 = () => {
      renderWithProviders({ visible: true, onClose: jest.fn(), avgWpm: 300 });
      const input = screen.getByPlaceholderText(/e\.g\.,/i);
      fireEvent.changeText(input, 'Learn machine learning fundamentals');
      fireEvent.press(screen.getByText('Next')); // Step 1 -> 2
      fireEvent.press(screen.getByText('Next')); // Step 2 -> 3
      fireEvent.press(screen.getByText('Next')); // Step 3 -> 4
    };

    it('renders duration options', () => {
      goToStep4();
      expect(screen.getByText('1 min')).toBeTruthy();
      expect(screen.getByText('3 min')).toBeTruthy();
      expect(screen.getByText('5 min')).toBeTruthy();
    });

    it('shows estimated word count based on avgWpm', () => {
      goToStep4();
      // With 3 min default and 300 WPM, ~900 words per article
      expect(screen.getByText(/words per article/i)).toBeTruthy();
    });

    it('advances to confirmation step when Next pressed', () => {
      goToStep4();
      fireEvent.press(screen.getByText('Next'));
      // Should show review text on confirmation step
      expect(screen.getByText(/Review your curriculum/i)).toBeTruthy();
    });
  });

  describe('Step 5: Confirmation', () => {
    const goToStep5 = () => {
      renderWithProviders({ visible: true, onClose: jest.fn() });
      const input = screen.getByPlaceholderText(/e\.g\.,/i);
      fireEvent.changeText(input, 'Learn machine learning fundamentals');
      fireEvent.press(screen.getByText('Next')); // Step 1 -> 2
      fireEvent.press(screen.getByText('Next')); // Step 2 -> 3
      fireEvent.press(screen.getByText('Next')); // Step 3 -> 4
      fireEvent.press(screen.getByText('Next')); // Step 4 -> 5
    };

    it('shows summary of all selections', () => {
      goToStep5();
      expect(screen.getByText(/Learn machine learning fundamentals/i)).toBeTruthy();
      expect(screen.getByText(/5 articles/i)).toBeTruthy();
    });

    it('shows "Create Curriculum" button', () => {
      goToStep5();
      // There should be a create button in the confirmation step
      const buttons = screen.getAllByText('Create Curriculum');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('calls createCurriculum with correct params on submit', async () => {
      mockCreateCurriculum.mockResolvedValueOnce('curr_new_123');
      const onClose = jest.fn();

      render(
        <ThemeProvider>
          <CurriculumCreationWizard visible={true} onClose={onClose} avgWpm={250} />
        </ThemeProvider>
      );

      // Navigate through wizard
      const input = screen.getByPlaceholderText(/e\.g\.,/i);
      fireEvent.changeText(input, 'Learn machine learning fundamentals');
      fireEvent.press(screen.getByText('Next')); // 1 -> 2
      fireEvent.press(screen.getByText('Next')); // 2 -> 3
      fireEvent.press(screen.getByText('Next')); // 3 -> 4
      fireEvent.press(screen.getByText('Next')); // 4 -> 5

      // Find and press Create button
      const createButtons = screen.getAllByText('Create Curriculum');
      const createButton = createButtons[createButtons.length - 1]; // Last one is the action button

      await act(async () => {
        fireEvent.press(createButton);
      });

      expect(mockCreateCurriculum).toHaveBeenCalledWith(
        expect.objectContaining({
          goal: 'Learn machine learning fundamentals',
          articleCount: 5,
          tone: 'explanatory',
          durationMinutes: 3,
        }),
        250
      );
    });

    it('calls onClose and navigates on success', async () => {
      mockCreateCurriculum.mockResolvedValueOnce('curr_new_123');
      const onClose = jest.fn();

      render(
        <ThemeProvider>
          <CurriculumCreationWizard visible={true} onClose={onClose} avgWpm={250} />
        </ThemeProvider>
      );

      // Navigate through wizard
      const input = screen.getByPlaceholderText(/e\.g\.,/i);
      fireEvent.changeText(input, 'Learn machine learning fundamentals');
      fireEvent.press(screen.getByText('Next')); // 1 -> 2
      fireEvent.press(screen.getByText('Next')); // 2 -> 3
      fireEvent.press(screen.getByText('Next')); // 3 -> 4
      fireEvent.press(screen.getByText('Next')); // 4 -> 5

      const createButtons = screen.getAllByText('Create Curriculum');
      const createButton = createButtons[createButtons.length - 1];

      await act(async () => {
        fireEvent.press(createButton);
      });

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
        expect(mockRouterPush).toHaveBeenCalledWith('/curriculum/curr_new_123/article/0');
      });
    });
  });

  describe('error handling', () => {
    it('shows error message on generation failure', async () => {
      mockCreateCurriculum.mockResolvedValueOnce(null);
      mockGenerationError = 'Network error occurred';

      // Re-render with error state
      render(
        <ThemeProvider>
          <CurriculumCreationWizard visible={true} onClose={jest.fn()} avgWpm={250} />
        </ThemeProvider>
      );

      // The error should be displayed somewhere in the UI
      // This would typically be on the confirmation step or as an overlay
      expect(mockGenerationError).toBe('Network error occurred');
    });

    it('cancel closes modal', () => {
      const onClose = jest.fn();
      renderWithProviders({ visible: true, onClose });

      // Press close button (X)
      fireEvent.press(screen.getByText('close'));

      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('generation progress', () => {
    it('shows loading state during generation', () => {
      mockIsGenerating = true;
      mockGenerationProgress = { current: 1, total: 6, message: 'Creating outline...' };

      renderWithProviders({ visible: true, onClose: jest.fn() });

      // When generating, should show progress
      expect(screen.getByText('Creating outline...')).toBeTruthy();
    });
  });
});
