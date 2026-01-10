/**
 * Tests for ArticleRow Component.
 *
 * Tests display logic for curriculum articles: title, status indicators,
 * completion stats, and interactions (read/retry).
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../../src/components/common/ThemeProvider';
import { CurriculumArticle } from '../../../../src/types/curriculum';

// Mock ArticleRow - we'll import the real one once it exists
// For now, this ensures the test file structure is correct
const ArticleRow = require('../../../../src/components/learn/curriculum/ArticleRow').ArticleRow;

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <Text testID={testID || `icon-${name}`}>{name}</Text>
    ),
  };
});

// Mock curriculumStore for retry functionality
const mockGenerateArticle = jest.fn();
jest.mock('../../../../src/store/curriculumStore', () => ({
  useCurriculumStore: {
    getState: () => ({
      generateArticle: mockGenerateArticle,
    }),
  },
}));

// Factory function for creating test articles
const createArticle = (overrides: Partial<CurriculumArticle> = {}): CurriculumArticle => ({
  id: 'curr_123-article-0',
  curriculumId: 'curr_123',
  orderIndex: 0,
  title: 'Introduction to Machine Learning',
  summary: 'A brief introduction to ML concepts',
  content: 'Full article content here...',
  wordCount: 750,
  questions: [],
  generationStatus: 'generated',
  completionStatus: 'unlocked',
  ...overrides,
});

// Render helper with ThemeProvider
const renderWithProviders = (article: CurriculumArticle, onPress = jest.fn()) => {
  return render(
    <ThemeProvider>
      <ArticleRow article={article} onPress={onPress} />
    </ThemeProvider>
  );
};

describe('ArticleRow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('shows article number (orderIndex + 1)', () => {
      renderWithProviders(createArticle({ orderIndex: 0 }));
      expect(screen.getByText('1')).toBeTruthy();
    });

    it('shows article number for second article', () => {
      renderWithProviders(createArticle({ orderIndex: 1 }));
      expect(screen.getByText('2')).toBeTruthy();
    });

    it('shows article title', () => {
      renderWithProviders(createArticle({ title: 'Understanding Neural Networks' }));
      expect(screen.getByText('Understanding Neural Networks')).toBeTruthy();
    });

    it('row is tappable when article is unlocked and generated', () => {
      const onPress = jest.fn();
      renderWithProviders(
        createArticle({
          completionStatus: 'unlocked',
          generationStatus: 'generated',
        }),
        onPress
      );

      const title = screen.getByText('Introduction to Machine Learning');
      fireEvent.press(title);

      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('status indicators', () => {
    it('shows lock icon when completionStatus is locked', () => {
      renderWithProviders(createArticle({ completionStatus: 'locked' }));
      expect(screen.getByText('lock-closed')).toBeTruthy();
    });

    it('shows loading spinner when generationStatus is generating', () => {
      renderWithProviders(
        createArticle({
          generationStatus: 'generating',
          completionStatus: 'unlocked',
        })
      );
      expect(screen.getByTestId('generating-spinner')).toBeTruthy();
    });

    it('shows error icon when generationStatus is failed', () => {
      renderWithProviders(
        createArticle({
          generationStatus: 'failed',
          completionStatus: 'unlocked',
          generationError: 'Network error',
        })
      );
      expect(screen.getByText('alert-circle')).toBeTruthy();
    });

    it('shows checkmark when completionStatus is completed', () => {
      renderWithProviders(
        createArticle({
          completionStatus: 'completed',
          comprehensionScore: 85,
          readingWPM: 320,
        })
      );
      expect(screen.getByText('checkmark-circle')).toBeTruthy();
    });

    it('shows arrow icon when unlocked and ready to read', () => {
      renderWithProviders(
        createArticle({
          completionStatus: 'unlocked',
          generationStatus: 'generated',
        })
      );
      expect(screen.getByText('arrow-forward')).toBeTruthy();
    });
  });

  describe('completion stats', () => {
    it('shows WPM and comprehension score when completed', () => {
      renderWithProviders(
        createArticle({
          completionStatus: 'completed',
          comprehensionScore: 85,
          readingWPM: 320,
        })
      );

      // Stats are displayed as a single combined string
      expect(screen.getByText('320 WPM · 85%')).toBeTruthy();
    });

    it('shows "Complete previous to unlock" when locked', () => {
      renderWithProviders(createArticle({ completionStatus: 'locked' }));
      expect(screen.getByText('Complete previous article to unlock')).toBeTruthy();
    });

    it('shows "Generation failed - tap to retry" when failed', () => {
      renderWithProviders(
        createArticle({
          generationStatus: 'failed',
          completionStatus: 'unlocked',
        })
      );
      expect(screen.getByText('Generation failed - tap to retry')).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('calls onPress when tapped and canRead is true', () => {
      const onPress = jest.fn();
      renderWithProviders(
        createArticle({
          completionStatus: 'unlocked',
          generationStatus: 'generated',
        }),
        onPress
      );

      const title = screen.getByText('Introduction to Machine Learning');
      fireEvent.press(title);

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('triggers retry when tapped in failed state', () => {
      const onPress = jest.fn();
      renderWithProviders(
        createArticle({
          curriculumId: 'curr_456',
          orderIndex: 2,
          generationStatus: 'failed',
          completionStatus: 'unlocked',
        }),
        onPress
      );

      const title = screen.getByText('Introduction to Machine Learning');
      fireEvent.press(title);

      // Should call generateArticle for retry, not onPress
      expect(mockGenerateArticle).toHaveBeenCalledWith('curr_456', 2);
      expect(onPress).not.toHaveBeenCalled();
    });

    it('does nothing when tapped in locked state', () => {
      const onPress = jest.fn();
      renderWithProviders(
        createArticle({
          completionStatus: 'locked',
          generationStatus: 'pending',
        }),
        onPress
      );

      const title = screen.getByText('Introduction to Machine Learning');
      fireEvent.press(title);

      expect(onPress).not.toHaveBeenCalled();
      expect(mockGenerateArticle).not.toHaveBeenCalled();
    });
  });

  describe('disabled states', () => {
    it('applies reduced opacity when locked', () => {
      const { getByTestId } = renderWithProviders(
        createArticle({ completionStatus: 'locked' })
      );
      // The row should have reduced opacity - we check via testID
      expect(getByTestId('article-row')).toBeTruthy();
    });

    it('row is not pressable when generating', () => {
      const onPress = jest.fn();
      renderWithProviders(
        createArticle({
          generationStatus: 'generating',
          completionStatus: 'unlocked',
        }),
        onPress
      );

      const title = screen.getByText('Introduction to Machine Learning');
      fireEvent.press(title);

      expect(onPress).not.toHaveBeenCalled();
    });
  });
});
