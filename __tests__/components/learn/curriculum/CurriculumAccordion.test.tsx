/**
 * Tests for CurriculumAccordion Component.
 *
 * Tests display logic for curriculum cards: title, progress, expansion,
 * and article list rendering.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../../src/components/common/ThemeProvider';
import { Curriculum, CurriculumArticle } from '../../../../src/types/curriculum';
import { CurriculumAccordion } from '../../../../src/components/learn/curriculum/CurriculumAccordion';

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <Text testID={testID || `icon-${name}`}>{name}</Text>
    ),
  };
});

// Mock ArticleRow to avoid nested component complexity
jest.mock('../../../../src/components/learn/curriculum/ArticleRow', () => {
  const { Text, TouchableOpacity } = require('react-native');
  return {
    ArticleRow: ({
      article,
      onPress,
    }: {
      article: CurriculumArticle;
      onPress: () => void;
    }) => (
      <TouchableOpacity testID={`article-row-${article.orderIndex}`} onPress={onPress}>
        <Text>{article.title}</Text>
      </TouchableOpacity>
    ),
  };
});

// Factory function for creating test articles
const createArticle = (
  index: number,
  overrides: Partial<CurriculumArticle> = {}
): CurriculumArticle => ({
  id: `curr_123-article-${index}`,
  curriculumId: 'curr_123',
  orderIndex: index,
  title: `Article ${index + 1}`,
  summary: `Summary for article ${index + 1}`,
  content: 'Content here...',
  wordCount: 750,
  hasQuiz: true,
  questions: [],
  generationStatus: 'generated',
  completionStatus: index === 0 ? 'unlocked' : 'locked',
  ...overrides,
});

// Factory function for creating test curriculum
const createCurriculum = (overrides: Partial<Curriculum> = {}): Curriculum => ({
  id: 'curr_123',
  title: 'Machine Learning Fundamentals',
  goal: 'Learn machine learning basics',
  articleCount: 5,
  tone: 'explanatory',
  targetWordCount: 750,
  hasQuizzes: true,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  currentArticleIndex: 0,
  completedArticleCount: 0,
  isCompleted: false,
  articles: [
    createArticle(0, { completionStatus: 'unlocked' }),
    createArticle(1, { completionStatus: 'locked' }),
    createArticle(2, { completionStatus: 'locked' }),
    createArticle(3, { completionStatus: 'locked' }),
    createArticle(4, { completionStatus: 'locked' }),
  ],
  ...overrides,
});

// Render helper with ThemeProvider
const renderWithProviders = (
  curriculum: Curriculum,
  onArticlePress = jest.fn()
) => {
  return render(
    <ThemeProvider>
      <CurriculumAccordion
        curriculum={curriculum}
        onArticlePress={onArticlePress}
      />
    </ThemeProvider>
  );
};

describe('CurriculumAccordion', () => {
  describe('collapsed state', () => {
    it('shows curriculum title', () => {
      renderWithProviders(createCurriculum({ title: 'Deep Learning Basics' }));
      expect(screen.getByText('Deep Learning Basics')).toBeTruthy();
    });

    it('shows goal when title is empty', () => {
      renderWithProviders(
        createCurriculum({ title: '', goal: 'Learn about neural networks' })
      );
      expect(screen.getByText('Learn about neural networks')).toBeTruthy();
    });

    it('shows progress (X/Y articles completed)', () => {
      renderWithProviders(
        createCurriculum({
          completedArticleCount: 2,
          articleCount: 5,
        })
      );
      expect(screen.getByText('2/5 articles')).toBeTruthy();
    });

    it('shows tone emoji', () => {
      renderWithProviders(createCurriculum({ tone: 'explanatory' }));
      expect(screen.getByText('📚')).toBeTruthy();
    });

    it('shows completion checkmark when fully completed', () => {
      renderWithProviders(
        createCurriculum({
          isCompleted: true,
          completedArticleCount: 5,
          articleCount: 5,
        })
      );
      expect(screen.getByText('checkmark-circle')).toBeTruthy();
    });

    it('does not show completion checkmark when not completed', () => {
      renderWithProviders(
        createCurriculum({
          isCompleted: false,
          completedArticleCount: 2,
        })
      );
      expect(screen.queryByText('checkmark-circle')).toBeNull();
    });
  });

  describe('expansion toggle', () => {
    it('expands on header tap', () => {
      renderWithProviders(createCurriculum());

      // Initially should show chevron-down
      expect(screen.getByText('chevron-down')).toBeTruthy();

      // Tap to expand
      fireEvent.press(screen.getByText('Machine Learning Fundamentals'));

      // Should now show chevron-up
      expect(screen.getByText('chevron-up')).toBeTruthy();
    });

    it('shows chevron-down when collapsed, chevron-up when expanded', () => {
      renderWithProviders(createCurriculum());

      // Collapsed: chevron-down
      expect(screen.getByText('chevron-down')).toBeTruthy();
      expect(screen.queryByText('chevron-up')).toBeNull();

      // Expand
      fireEvent.press(screen.getByText('Machine Learning Fundamentals'));

      // Expanded: chevron-up
      expect(screen.getByText('chevron-up')).toBeTruthy();
      expect(screen.queryByText('chevron-down')).toBeNull();
    });

    it('collapses on second tap', () => {
      renderWithProviders(createCurriculum());

      // First tap: expand
      fireEvent.press(screen.getByText('Machine Learning Fundamentals'));
      expect(screen.getByText('chevron-up')).toBeTruthy();

      // Second tap: collapse
      fireEvent.press(screen.getByText('Machine Learning Fundamentals'));
      expect(screen.getByText('chevron-down')).toBeTruthy();
    });
  });

  describe('expanded state with articles', () => {
    it('renders ArticleRow for each article when expanded', () => {
      renderWithProviders(createCurriculum());

      // Expand the accordion
      fireEvent.press(screen.getByText('Machine Learning Fundamentals'));

      // Should show all 5 article rows
      expect(screen.getByTestId('article-row-0')).toBeTruthy();
      expect(screen.getByTestId('article-row-1')).toBeTruthy();
      expect(screen.getByTestId('article-row-2')).toBeTruthy();
      expect(screen.getByTestId('article-row-3')).toBeTruthy();
      expect(screen.getByTestId('article-row-4')).toBeTruthy();
    });

    it('does not render articles when collapsed', () => {
      renderWithProviders(createCurriculum());

      // Should not show article rows when collapsed
      expect(screen.queryByTestId('article-row-0')).toBeNull();
    });

    it('calls onArticlePress with correct index when article row is tapped', () => {
      const onArticlePress = jest.fn();
      renderWithProviders(createCurriculum(), onArticlePress);

      // Expand the accordion
      fireEvent.press(screen.getByText('Machine Learning Fundamentals'));

      // Tap the second article
      fireEvent.press(screen.getByTestId('article-row-1'));

      expect(onArticlePress).toHaveBeenCalledWith(1);
    });

    it('shows all articles in correct order', () => {
      const curriculum = createCurriculum({
        articles: [
          createArticle(0, { title: 'First Article' }),
          createArticle(1, { title: 'Second Article' }),
          createArticle(2, { title: 'Third Article' }),
        ],
        articleCount: 3,
      });

      renderWithProviders(curriculum);

      // Expand
      fireEvent.press(screen.getByText('Machine Learning Fundamentals'));

      // Check all articles are rendered in order
      expect(screen.getByText('First Article')).toBeTruthy();
      expect(screen.getByText('Second Article')).toBeTruthy();
      expect(screen.getByText('Third Article')).toBeTruthy();
    });
  });
});
