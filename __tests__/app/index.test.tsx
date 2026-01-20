/**
 * Tests for Root Index Screen.
 *
 * Renders ContentListScreen as the main app view.
 * Tests: FABs, filter pills, stats panel, navigation, empty state.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Index from '../../src/app/index';
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
const mockRouterPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
}));

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({
  Swipeable: ({ children }: { children: React.ReactNode }) => children,
  GestureHandlerRootView: ({ children }: { children: React.ReactNode }) => children,
}));

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
jest.mock('../../src/components/common/GlassView', () => ({
  GlassView: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <View testID={testID || `icon-${name}`} />
    ),
    Entypo: ({ name, testID }: { name: string; testID?: string }) => (
      <View testID={testID || `icon-${name}`} />
    ),
    MaterialCommunityIcons: ({ name, testID }: { name: string; testID?: string }) => (
      <View testID={testID || `icon-${name}`} />
    ),
  };
});

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

describe('Index', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetStores();
  });

  // ===========================================================================
  // Basic Rendering
  // ===========================================================================

  describe('basic rendering', () => {
    it('renders ContentListScreen', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      );

      expect(getByTestId('content-list.fab-profile')).toBeTruthy();
      expect(getByTestId('content-list.fab-add')).toBeTruthy();
    });

    it('shows filter pills', () => {
      const { getByText, getAllByText } = render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      );

      expect(getByText('All')).toBeTruthy();
      expect(getByText('Books')).toBeTruthy();
      expect(getAllByText('Articles').length).toBeGreaterThanOrEqual(1);
      expect(getByText('Learning')).toBeTruthy();
      expect(getByText('Training')).toBeTruthy();
    });
  });

  // ===========================================================================
  // Stats Panel
  // ===========================================================================

  describe('stats panel', () => {
    it('displays stats summary', () => {
      const { getByText } = render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      );

      // Stats labels should be visible
      expect(getByText('Devoured')).toBeTruthy();
      expect(getByText('Words')).toBeTruthy();
      expect(getByText('Retention')).toBeTruthy();
      expect(getByText('Best WPM')).toBeTruthy();
    });

    it('shows zero stats when no articles read', () => {
      const { getAllByText } = render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      );

      // Multiple zeros displayed for empty stats
      const zeros = getAllByText('0');
      expect(zeros.length).toBeGreaterThan(0);
    });

    it('shows stats from learning progress', () => {
      useLearningStore.setState({
        articleProgress: {
          'article-1': {
            articleId: 'article-1',
            completed: true,
            comprehensionScore: 85,
            highestWPM: 350,
            lastReadAt: Date.now(),
            attemptCount: 1,
          },
          'article-2': {
            articleId: 'article-2',
            completed: true,
            comprehensionScore: 95,
            highestWPM: 400,
            lastReadAt: Date.now(),
            attemptCount: 1,
          },
        },
      });

      const { getByText } = render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      );

      // Should show 2 articles read
      expect(getByText('2')).toBeTruthy();
      // Best WPM should be 400
      expect(getByText('400')).toBeTruthy();
    });
  });

  // ===========================================================================
  // Filter Pills
  // ===========================================================================

  describe('filter pills interaction', () => {
    it('changes active filter when pill pressed', () => {
      const { getByText } = render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      );

      // Press Books filter
      fireEvent.press(getByText('Books'));

      // Store should have updated filter
      expect(useContentListStore.getState().activeFilter).toBe('books');
    });

    it('clears filter when All pressed', () => {
      // Set initial filter
      useContentListStore.setState({ activeFilter: 'books' });

      const { getByText } = render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      );

      // Press All filter
      fireEvent.press(getByText('All'));

      expect(useContentListStore.getState().activeFilter).toBeNull();
    });

    it('can switch between filters', () => {
      const { getByText, getAllByText } = render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      );

      // "Articles" appears in both stats and filter - use getAllByText and pick the filter one
      const articlesTexts = getAllByText('Articles');
      fireEvent.press(articlesTexts[articlesTexts.length - 1]);
      expect(useContentListStore.getState().activeFilter).toBe('articles');

      fireEvent.press(getByText('Training'));
      expect(useContentListStore.getState().activeFilter).toBe('training');

      fireEvent.press(getByText('Learning'));
      expect(useContentListStore.getState().activeFilter).toBe('learning');
    });
  });

  // ===========================================================================
  // FAB Navigation
  // ===========================================================================

  describe('FAB navigation', () => {
    it('navigates to journey-profile when profile FAB pressed', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      );

      fireEvent.press(getByTestId('content-list.fab-profile'));

      expect(mockRouterPush).toHaveBeenCalledWith('/journey-profile');
    });

    it('navigates to add-content when add FAB pressed', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      );

      fireEvent.press(getByTestId('content-list.fab-add'));

      expect(mockRouterPush).toHaveBeenCalledWith('/add-content');
    });
  });

  // ===========================================================================
  // Default Content State
  // ===========================================================================

  describe('default content', () => {
    it('shows training content by default (always available)', () => {
      // Training content is built-in, so list should never be empty
      const { queryByText } = render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      );

      // Empty state should NOT show because training content exists
      expect(queryByText('No content yet')).toBeNull();
    });

    it('shows date sections when content exists', () => {
      useContentStore.setState({
        importedContent: [
          {
            id: 'imported-1',
            title: 'Test Article',
            content: 'Test content',
            wordCount: 500,
            createdAt: Date.now(),
            source: 'text',
            readProgress: 0,
          },
        ],
      });

      const { getByText } = render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      );

      // Should show "Today" section header
      expect(getByText('Today')).toBeTruthy();
    });
  });

  // ===========================================================================
  // Content List Items
  // ===========================================================================

  describe('content list items', () => {
    it('shows imported content in list', () => {
      useContentStore.setState({
        importedContent: [
          {
            id: 'imported-1',
            title: 'My Imported Article',
            content: 'Test content here',
            wordCount: 500,
            createdAt: Date.now(),
            source: 'text',
            readProgress: 0,
          },
        ],
      });

      const { getByText } = render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      );

      expect(getByText('My Imported Article')).toBeTruthy();
    });

    it('shows generated content in list', () => {
      useGeneratedStore.setState({
        articles: [
          {
            id: 'gen-1',
            topic: 'Testing',
            targetDuration: 3,
            tone: 'explanatory',
            title: 'Generated Test Article',
            content: 'Generated content',
            wordCount: 600,
            questions: [],
            status: 'complete',
            generatedAt: Date.now(),
            completed: false,
            attemptCount: 0,
          },
        ],
      });

      const { getByText } = render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      );

      expect(getByText('Generated Test Article')).toBeTruthy();
    });

    it('navigates to playback when content item pressed', () => {
      useContentStore.setState({
        importedContent: [
          {
            id: 'imported-1',
            title: 'Clickable Article',
            content: 'Test content',
            wordCount: 500,
            createdAt: Date.now(),
            source: 'text',
            readProgress: 0,
          },
        ],
      });

      const { getByText } = render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      );

      fireEvent.press(getByText('Clickable Article'));

      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname: '/playback',
        params: expect.objectContaining({
          sourceId: 'imported-1',
          source: 'imported',
        }),
      });
    });
  });
});
