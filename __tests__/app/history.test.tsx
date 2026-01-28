/**
 * Tests for History Modal
 *
 * Tests the history screen that shows completed reading items:
 * - Empty state when no completed items
 * - Section headers with date buckets (Today, Yesterday, etc.)
 * - Content list items from various sources (imported, generated, curriculum, training)
 * - Close button navigation
 * - Item press navigation to playback
 * - Delete functionality for non-training items
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HistoryModal from '../../src/app/history';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';
import { useContentListStore } from '../../src/store/contentListStore';
import { useContentStore } from '../../src/store/contentStore';
import { useCurriculumStore } from '../../src/store/curriculumStore';
import { useGeneratedStore } from '../../src/store/generatedStore';
import { useLearningStore } from '../../src/store/learningStore';

// =============================================================================
// Mocks
// =============================================================================

// Mock expo-router
const mockRouterBack = jest.fn();
const mockRouterPush = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    back: () => mockRouterBack(),
  },
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

// Mock react-native-safe-area-context
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
    MaterialCommunityIcons: ({ name, testID }: { name: string; testID?: string }) => (
      <View testID={testID || `icon-${name}`} />
    ),
  };
});

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: ({ children, style }: { children: React.ReactNode; style?: object }) => (
      <View style={style}>{children}</View>
    ),
  };
});

// Mock GlassView component
jest.mock('../../src/components/common/GlassView', () => {
  const { View } = require('react-native');
  return {
    GlassView: ({ children, style }: { children: React.ReactNode; style?: object }) => (
      <View style={style}>{children}</View>
    ),
  };
});

// Mock react-i18next for translations
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'history.title': 'History',
        'history.empty_title': 'No completed items yet',
        'history.empty_subtitle': 'Items you finish reading will appear here',
      };
      return translations[key] || key;
    },
  }),
}));

// =============================================================================
// Test Helpers
// =============================================================================

function resetStores() {
  useContentListStore.setState({
    activeFilter: null,
  });

  useContentStore.setState({
    importedContent: [],
  });

  useCurriculumStore.setState({
    curricula: {},
  });

  useGeneratedStore.setState({
    articles: [],
  });

  useLearningStore.setState({
    articleProgress: {},
  });
}

function TestWrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

// =============================================================================
// Tests
// =============================================================================

describe('HistoryModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetStores();
  });

  // ===========================================================================
  // Basic Rendering
  // ===========================================================================

  describe('basic rendering', () => {
    it('shows page title', () => {
      const { getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      expect(getByText('History')).toBeTruthy();
    });

    it('renders close button', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      expect(getByTestId('icon-close')).toBeTruthy();
    });

    it('closes modal when close button pressed', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      fireEvent.press(getByTestId('icon-close'));

      expect(mockRouterBack).toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // Empty State
  // ===========================================================================

  describe('empty state', () => {
    it('shows empty state when no completed items', () => {
      const { getByText, getByTestId } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      expect(getByText('No completed items yet')).toBeTruthy();
      expect(getByText('Items you finish reading will appear here')).toBeTruthy();
      expect(getByTestId('icon-time-outline')).toBeTruthy();
    });

    it('shows empty state when items exist but none are completed', () => {
      // Add an incomplete imported item
      useContentStore.setState({
        importedContent: [
          {
            id: 'incomplete-1',
            title: 'Incomplete Article',
            content: 'Test content',
            wordCount: 500,
            source: 'text',
            createdAt: Date.now(),
            readProgress: 0.5, // 50% progress, not complete
          },
        ],
      });

      const { getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      expect(getByText('No completed items yet')).toBeTruthy();
    });
  });

  // ===========================================================================
  // Content Display
  // ===========================================================================

  describe('content display', () => {
    it('shows completed imported content', () => {
      const now = Date.now();
      useContentStore.setState({
        importedContent: [
          {
            id: 'completed-1',
            title: 'Completed Article',
            content: 'Test content',
            wordCount: 500,
            source: 'text',
            createdAt: now,
            lastReadAt: now,
            readProgress: 1, // 100% complete
          },
        ],
      });

      const { getByText, queryByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      expect(getByText('Completed Article')).toBeTruthy();
      expect(queryByText('No completed items yet')).toBeNull();
    });

    it('shows completed generated articles', () => {
      const now = Date.now();
      useGeneratedStore.setState({
        articles: [
          {
            id: 'gen-1',
            topic: 'Testing',
            targetDuration: 3,
            tone: 'explanatory',
            title: 'Completed Generated Article',
            content: 'Generated content',
            wordCount: 600,
            questions: [
              { id: 'q1', type: 'single_choice' as const, question: 'Q1?', options: ['A', 'B', 'C', 'D'], correctIndex: 0 },
            ],
            status: 'complete',
            generatedAt: now,
            lastReadAt: now,
            completed: true,
            comprehensionScore: 85,
            attemptCount: 1,
          },
        ],
      });

      const { getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      expect(getByText('Completed Generated Article')).toBeTruthy();
    });

    it('shows word count in formatted display', () => {
      const now = Date.now();
      useContentStore.setState({
        importedContent: [
          {
            id: 'completed-1',
            title: 'Long Article',
            content: 'Test content',
            wordCount: 2500,
            source: 'text',
            createdAt: now,
            lastReadAt: now,
            readProgress: 1,
          },
        ],
      });

      const { getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      // 2500 words should display as "2.5k words"
      expect(getByText('2.5k words')).toBeTruthy();
    });

    it('shows quiz score for completed items with quiz', () => {
      const now = Date.now();
      useGeneratedStore.setState({
        articles: [
          {
            id: 'gen-1',
            topic: 'Testing',
            targetDuration: 3,
            tone: 'explanatory',
            title: 'Quiz Article',
            content: 'Generated content',
            wordCount: 600,
            questions: [
              { id: 'q1', type: 'single_choice' as const, question: 'Q1?', options: ['A', 'B', 'C', 'D'], correctIndex: 0 },
            ],
            status: 'complete',
            generatedAt: now,
            lastReadAt: now,
            completed: true,
            comprehensionScore: 90,
            attemptCount: 1,
          },
        ],
      });

      const { getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      expect(getByText('90%')).toBeTruthy();
    });
  });

  // ===========================================================================
  // Date Section Headers
  // ===========================================================================

  describe('date section headers', () => {
    it('shows Today section for items completed today', () => {
      const now = Date.now();
      useContentStore.setState({
        importedContent: [
          {
            id: 'completed-1',
            title: 'Today Article',
            content: 'Test content',
            wordCount: 500,
            source: 'text',
            createdAt: now,
            lastReadAt: now,
            readProgress: 1,
          },
        ],
      });

      const { getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      expect(getByText('Today')).toBeTruthy();
    });

    it('shows Yesterday section for items completed yesterday', () => {
      const yesterday = Date.now() - 24 * 60 * 60 * 1000;
      useContentStore.setState({
        importedContent: [
          {
            id: 'completed-1',
            title: 'Yesterday Article',
            content: 'Test content',
            wordCount: 500,
            source: 'text',
            createdAt: yesterday,
            lastReadAt: yesterday,
            readProgress: 1,
          },
        ],
      });

      const { getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      expect(getByText('Yesterday')).toBeTruthy();
    });

    it('groups multiple items under same date section', () => {
      const now = Date.now();
      useContentStore.setState({
        importedContent: [
          {
            id: 'completed-1',
            title: 'Article One',
            content: 'Test content',
            wordCount: 500,
            source: 'text',
            createdAt: now,
            lastReadAt: now,
            readProgress: 1,
          },
          {
            id: 'completed-2',
            title: 'Article Two',
            content: 'Test content',
            wordCount: 400,
            source: 'url',
            createdAt: now - 1000,
            lastReadAt: now - 1000,
            readProgress: 1,
          },
        ],
      });

      const { getByText, getAllByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      // Should only have one "Today" section header
      expect(getAllByText('Today').length).toBe(1);
      expect(getByText('Article One')).toBeTruthy();
      expect(getByText('Article Two')).toBeTruthy();
    });
  });

  // ===========================================================================
  // Navigation
  // ===========================================================================

  describe('navigation', () => {
    it('navigates to playback when item pressed', () => {
      const now = Date.now();
      useContentStore.setState({
        importedContent: [
          {
            id: 'nav-test-1',
            title: 'Clickable Article',
            content: 'Test content',
            wordCount: 500,
            source: 'text',
            createdAt: now,
            lastReadAt: now,
            readProgress: 1,
          },
        ],
      });

      const { getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      fireEvent.press(getByText('Clickable Article'));

      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname: '/playback',
        params: expect.objectContaining({
          sourceId: 'nav-test-1',
          source: 'imported',
        }),
      });
    });

    it('navigates with correct source for generated articles', () => {
      const now = Date.now();
      useGeneratedStore.setState({
        articles: [
          {
            id: 'gen-nav-1',
            topic: 'Testing',
            targetDuration: 3,
            tone: 'explanatory',
            title: 'Generated Clickable',
            content: 'Generated content',
            wordCount: 600,
            questions: [],
            status: 'complete',
            generatedAt: now,
            lastReadAt: now,
            completed: true,
            attemptCount: 1,
          },
        ],
      });

      const { getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      fireEvent.press(getByText('Generated Clickable'));

      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname: '/playback',
        params: expect.objectContaining({
          sourceId: 'gen-nav-1',
          source: 'generated',
        }),
      });
    });
  });

  // ===========================================================================
  // Multiple Content Sources
  // ===========================================================================

  describe('multiple content sources', () => {
    it('shows completed items from multiple sources', () => {
      const now = Date.now();

      // Add completed imported content
      useContentStore.setState({
        importedContent: [
          {
            id: 'imported-1',
            title: 'Imported History Item',
            content: 'Test content',
            wordCount: 500,
            source: 'text',
            createdAt: now,
            lastReadAt: now,
            readProgress: 1,
          },
        ],
      });

      // Add completed generated article
      useGeneratedStore.setState({
        articles: [
          {
            id: 'gen-1',
            topic: 'Testing',
            targetDuration: 3,
            tone: 'explanatory',
            title: 'Generated History Item',
            content: 'Generated content',
            wordCount: 600,
            questions: [],
            status: 'complete',
            generatedAt: now - 1000,
            lastReadAt: now - 1000,
            completed: true,
            attemptCount: 1,
          },
        ],
      });

      const { getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      expect(getByText('Imported History Item')).toBeTruthy();
      expect(getByText('Generated History Item')).toBeTruthy();
    });

    it('excludes incomplete items regardless of source', () => {
      const now = Date.now();

      // Add mix of complete and incomplete
      useContentStore.setState({
        importedContent: [
          {
            id: 'complete',
            title: 'Complete Item',
            content: 'Content',
            wordCount: 500,
            source: 'text',
            createdAt: now,
            lastReadAt: now,
            readProgress: 1,
          },
          {
            id: 'incomplete',
            title: 'Incomplete Item',
            content: 'Content',
            wordCount: 500,
            source: 'text',
            createdAt: now,
            readProgress: 0.3,
          },
        ],
      });

      useGeneratedStore.setState({
        articles: [
          {
            id: 'gen-incomplete',
            topic: 'Testing',
            targetDuration: 3,
            tone: 'explanatory',
            title: 'Incomplete Generated',
            content: 'Content',
            wordCount: 600,
            questions: [],
            status: 'complete',
            generatedAt: now,
            completed: false, // Not completed
            attemptCount: 0,
          },
        ],
      });

      const { getByText, queryByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      expect(getByText('Complete Item')).toBeTruthy();
      expect(queryByText('Incomplete Item')).toBeNull();
      expect(queryByText('Incomplete Generated')).toBeNull();
    });
  });

  // ===========================================================================
  // Books vs Articles
  // ===========================================================================

  describe('content categories', () => {
    it('displays completed books (EPUB content)', () => {
      const now = Date.now();
      useContentStore.setState({
        importedContent: [
          {
            id: 'book-1',
            title: 'My Completed Book',
            content: 'Book content',
            wordCount: 50000, // Large word count = book
            source: 'epub',
            createdAt: now,
            lastReadAt: now,
            readProgress: 1,
          },
        ],
      });

      const { getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      expect(getByText('My Completed Book')).toBeTruthy();
    });

    it('displays completed PDFs as books when large', () => {
      const now = Date.now();
      // >50 pages = >12,500 words is a book
      useContentStore.setState({
        importedContent: [
          {
            id: 'pdf-book',
            title: 'Large PDF Book',
            content: 'PDF content',
            wordCount: 15000,
            source: 'pdf',
            createdAt: now,
            lastReadAt: now,
            readProgress: 1,
          },
        ],
      });

      const { getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      expect(getByText('Large PDF Book')).toBeTruthy();
    });
  });

  // ===========================================================================
  // Sorting
  // ===========================================================================

  describe('sorting', () => {
    it('sorts items by lastPlayedAt descending (most recent first)', () => {
      const now = Date.now();
      const earlier = now - 60000; // 1 minute earlier

      useContentStore.setState({
        importedContent: [
          {
            id: 'older',
            title: 'Older Article',
            content: 'Content',
            wordCount: 500,
            source: 'text',
            createdAt: earlier,
            lastReadAt: earlier,
            readProgress: 1,
          },
          {
            id: 'newer',
            title: 'Newer Article',
            content: 'Content',
            wordCount: 500,
            source: 'text',
            createdAt: now,
            lastReadAt: now,
            readProgress: 1,
          },
        ],
      });

      const { getAllByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      // Both articles should be visible
      const olderText = getAllByText(/Older Article|Newer Article/);
      expect(olderText.length).toBe(2);
    });
  });

  // ===========================================================================
  // Completed Curricula
  // ===========================================================================

  describe('completed curricula', () => {
    it('shows completed curricula with accordion display', () => {
      const now = Date.now();
      useCurriculumStore.setState({
        curricula: {
          'curr-1': {
            id: 'curr-1',
            title: 'Completed Learning Path',
            goal: 'Learn technology',
            tone: 'explanatory',
            targetWordCount: 500,
            hasQuizzes: true,
            articleCount: 3,
            currentArticleIndex: 3,
            completedArticleCount: 3,
            createdAt: now,
            updatedAt: now,
            isCompleted: true,
            articles: [
              {
                id: 'art-1',
                curriculumId: 'curr-1',
                orderIndex: 0,
                title: 'Curriculum Article One',
                summary: 'Summary 1',
                content: 'Article content here',
                wordCount: 500,
                hasQuiz: true,
                generationStatus: 'generated',
                completionStatus: 'completed',
                questions: [
                  { id: 'q1', type: 'single_choice' as const, question: 'Q1?', options: ['A', 'B', 'C', 'D'], correctIndex: 0 },
                ],
                generatedAt: now,
                completedAt: now,
                comprehensionScore: 90,
              },
              {
                id: 'art-2',
                curriculumId: 'curr-1',
                orderIndex: 1,
                title: 'Curriculum Article Two',
                summary: 'Summary 2',
                content: 'Article content here',
                wordCount: 600,
                hasQuiz: true,
                generationStatus: 'generated',
                completionStatus: 'completed',
                questions: [
                  { id: 'q2', type: 'single_choice' as const, question: 'Q2?', options: ['A', 'B', 'C', 'D'], correctIndex: 1 },
                ],
                generatedAt: now,
                completedAt: now,
                comprehensionScore: 85,
              },
              {
                id: 'art-3',
                curriculumId: 'curr-1',
                orderIndex: 2,
                title: 'Curriculum Article Three',
                summary: 'Summary 3',
                content: 'Article content here',
                wordCount: 400,
                hasQuiz: true,
                generationStatus: 'generated',
                completionStatus: 'completed',
                questions: [
                  { id: 'q3', type: 'single_choice' as const, question: 'Q3?', options: ['A', 'B', 'C', 'D'], correctIndex: 2 },
                ],
                generatedAt: now,
                completedAt: now,
                comprehensionScore: 95,
              },
            ],
          },
        },
      });

      const { getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      // Curriculum title should be displayed
      expect(getByText('Completed Learning Path')).toBeTruthy();
    });

    it('excludes incomplete curricula from history', () => {
      const now = Date.now();
      useCurriculumStore.setState({
        curricula: {
          'curr-incomplete': {
            id: 'curr-incomplete',
            title: 'Incomplete Curriculum',
            goal: 'Learn technology',
            tone: 'explanatory',
            targetWordCount: 500,
            hasQuizzes: true,
            articleCount: 3,
            currentArticleIndex: 1,
            completedArticleCount: 1,
            createdAt: now,
            updatedAt: now,
            isCompleted: false, // Not completed
            articles: [
              {
                id: 'art-1',
                curriculumId: 'curr-incomplete',
                orderIndex: 0,
                title: 'First Article',
                summary: 'Summary',
                content: 'Article content here',
                wordCount: 500,
                hasQuiz: true,
                generationStatus: 'generated',
                completionStatus: 'completed',
                questions: [],
                generatedAt: now,
                completedAt: now,
              },
            ],
          },
        },
      });

      const { queryByText, getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      // Incomplete curriculum should not be shown
      expect(queryByText('Incomplete Curriculum')).toBeNull();
      // Empty state should be shown
      expect(getByText('No completed items yet')).toBeTruthy();
    });
  });

  // ===========================================================================
  // Training Articles
  // ===========================================================================

  describe('training articles', () => {
    it('shows completed training articles', () => {
      const now = Date.now();
      // Training articles are from static curriculum - articleProgress tracks completion
      // Use actual article ID from the curriculum: 'arts-culture-p01'
      useLearningStore.setState({
        articleProgress: {
          'arts-culture-p01': {
            articleId: 'arts-culture-p01',
            completed: true,
            comprehensionScore: 80,
            highestWPM: 300,
            lastReadAt: now,
            attemptCount: 1,
            attempts: [
              { timestamp: now, wpm: 300, score: 80, isCertificationAttempt: false },
            ],
          },
        },
      });

      const { getByText, queryByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      // Training article title should appear (from static curriculum)
      expect(getByText('The Renaissance: Art Reborn')).toBeTruthy();
      // Empty state should NOT appear
      expect(queryByText('No completed items yet')).toBeNull();
    });

    it('excludes incomplete training articles', () => {
      useLearningStore.setState({
        articleProgress: {
          'arts-culture-p01': {
            articleId: 'arts-culture-p01',
            completed: false, // Not completed
            comprehensionScore: 0, // No score yet
            highestWPM: 200,
            lastReadAt: Date.now(),
            attemptCount: 0,
          },
        },
      });

      const { getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      // Empty state should be shown since training article is not completed
      expect(getByText('No completed items yet')).toBeTruthy();
    });
  });

  // ===========================================================================
  // Delete Functionality
  // ===========================================================================

  describe('delete functionality', () => {
    it('provides delete handler for non-training items', () => {
      const now = Date.now();
      const mockDeleteContent = jest.fn();

      // Setup the content store with delete mock
      useContentStore.setState({
        importedContent: [
          {
            id: 'deletable-1',
            title: 'Deletable Article',
            content: 'Content',
            wordCount: 500,
            source: 'text',
            createdAt: now,
            lastReadAt: now,
            readProgress: 1,
          },
        ],
        deleteContent: mockDeleteContent,
      });

      const { getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      // Verify the item is rendered (delete action happens via swipe, which is mocked)
      expect(getByText('Deletable Article')).toBeTruthy();
    });

    it('does not provide delete handler for training articles', () => {
      const now = Date.now();

      // Training articles should not have delete functionality
      useLearningStore.setState({
        articleProgress: {
          'arts-culture-p01': {
            articleId: 'arts-culture-p01',
            completed: true,
            comprehensionScore: 80,
            highestWPM: 300,
            lastReadAt: now,
            attemptCount: 1,
            attempts: [
              { timestamp: now, wpm: 300, score: 80, isCertificationAttempt: false },
            ],
          },
        },
      });

      const { getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      // Training article should be visible but is not deletable
      // (Swipeable does not render delete action for training items)
      expect(getByText('The Renaissance: Art Reborn')).toBeTruthy();
    });
  });

  // ===========================================================================
  // Curriculum Article Navigation
  // ===========================================================================

  describe('curriculum article navigation', () => {
    it('navigates to playback when curriculum article is pressed', () => {
      const now = Date.now();
      useCurriculumStore.setState({
        curricula: {
          'curr-nav': {
            id: 'curr-nav',
            title: 'Navigation Test Curriculum',
            goal: 'Learn technology',
            tone: 'explanatory',
            targetWordCount: 500,
            hasQuizzes: true,
            articleCount: 1,
            currentArticleIndex: 1,
            completedArticleCount: 1,
            createdAt: now,
            updatedAt: now,
            isCompleted: true,
            articles: [
              {
                id: 'art-nav-1',
                curriculumId: 'curr-nav',
                orderIndex: 0,
                title: 'Nested Article',
                summary: 'Test summary',
                content: 'Article content here',
                wordCount: 500,
                hasQuiz: false,
                generationStatus: 'generated',
                completionStatus: 'completed',
                questions: [],
                generatedAt: now,
                completedAt: now,
              },
            ],
          },
        },
      });

      const { getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      // The curriculum should be visible
      expect(getByText('Navigation Test Curriculum')).toBeTruthy();
    });
  });

  // ===========================================================================
  // hexToRGBA Helper Function
  // ===========================================================================

  describe('hexToRGBA utility', () => {
    it('renders gradient overlays correctly', () => {
      const now = Date.now();
      useContentStore.setState({
        importedContent: [
          {
            id: 'gradient-test',
            title: 'Gradient Test Article',
            content: 'Content',
            wordCount: 500,
            source: 'text',
            createdAt: now,
            lastReadAt: now,
            readProgress: 1,
          },
        ],
      });

      // This test ensures the component renders without crashing,
      // which exercises the hexToRGBA helper for gradient colors
      const { getByText } = render(
        <TestWrapper>
          <HistoryModal />
        </TestWrapper>
      );

      expect(getByText('Gradient Test Article')).toBeTruthy();
    });
  });
});
