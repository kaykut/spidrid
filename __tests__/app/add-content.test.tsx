/**
 * Tests for Add Content Modal
 *
 * Tests the add content modal with three expandable cards:
 * - Read: Import content from URL, text, or ebook
 * - Learn: Generate AI articles/curricula
 * - Practice: Select from pre-generated practice topics
 *
 * Key behaviors tested:
 * - Accordion behavior (only one card expanded at a time)
 * - Close button navigates back
 * - Practice card topic press navigates to playback
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddContentModal from '../../src/app/add-content';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';
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
    push: (path: string | object) => mockRouterPush(path),
  },
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { View, Text } = require('react-native');
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <View testID={testID || `icon-${name}`}>
        <Text>{name}</Text>
      </View>
    ),
    MaterialCommunityIcons: ({ name, testID }: { name: string; testID?: string }) => (
      <View testID={testID || `icon-${name}`}>
        <Text>{name}</Text>
      </View>
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

// Mock animations
jest.mock('../../src/constants/animations', () => ({
  animateLayout: jest.fn(),
}));

// Mock ExpandableReadCard component
jest.mock('../../src/components/addContent/ExpandableReadCard', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
  return {
    ExpandableReadCard: ({
      isExpanded,
      onExpandChange,
      onClose,
    }: {
      isExpanded: boolean;
      onExpandChange: (expanded: boolean) => void;
      onClose: () => void;
    }) => (
      <View testID="expandable-read-card">
        <TouchableOpacity
          testID="read-card-header"
          onPress={() => onExpandChange(!isExpanded)}
        >
          <Text>Read</Text>
          <Text>Speed read your own articles or books</Text>
        </TouchableOpacity>
        {isExpanded && (
          <View testID="read-card-expanded">
            <Text>Read card expanded content</Text>
            <TouchableOpacity testID="read-card-close" onPress={onClose}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    ),
  };
});

// Mock ExpandableLearnCard component
jest.mock('../../src/components/addContent/ExpandableLearnCard', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
  return {
    ExpandableLearnCard: ({
      isExpanded,
      onExpandChange,
      onClose,
    }: {
      isExpanded: boolean;
      onExpandChange: (expanded: boolean) => void;
      onClose: () => void;
    }) => (
      <View testID="expandable-learn-card">
        <TouchableOpacity
          testID="learn-card-header"
          onPress={() => onExpandChange(!isExpanded)}
        >
          <Text>Learn</Text>
          <Text>Generate articles on topics you want to master</Text>
        </TouchableOpacity>
        {isExpanded && (
          <View testID="learn-card-expanded">
            <Text>Learn card expanded content</Text>
            <TouchableOpacity testID="learn-card-close" onPress={onClose}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    ),
  };
});

// Mock MiniTopicCard component
jest.mock('../../src/components/addContent/MiniTopicCard', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
  return {
    MiniTopicCard: ({
      topic,
      progress,
      onPress,
      testID,
    }: {
      topic: { id: string; name: string; icon: string };
      progress: { articlesCompleted: number; totalArticles: number };
      onPress: () => void;
      testID?: string;
    }) => (
      <TouchableOpacity testID={testID} onPress={onPress}>
        <View>
          <Text>{topic.icon}</Text>
          <Text testID={`${testID}-name`}>{topic.name}</Text>
          <Text testID={`${testID}-progress`}>
            {progress.articlesCompleted}/{progress.totalArticles}
          </Text>
        </View>
      </TouchableOpacity>
    ),
  };
});

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        page_title: 'New Content',
        'practice.title': 'Practice',
        'practice.desc': 'Choose from pre-generated content to practice speed reading',
        'read.title': 'Read',
        'read.desc': 'Speed read your own articles or books',
        'learn.title': 'Learn',
        'learn.desc': 'Generate articles on topics you want to master',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock curriculum data (used inside jest.mock factory below)

jest.mock('../../src/data/curriculum', () => {
  // Need to reference the hoisted variables via closure workaround
  const topics = [
    {
      id: 'science-discovery',
      name: 'Science & Discovery',
      icon: '🔬',
      color: '#4ECDC4',
      articleCount: 13,
      practiceArticleCount: 10,
      certificationArticleCount: 3,
    },
    {
      id: 'health-medicine',
      name: 'Health & Medicine',
      icon: '💊',
      color: '#FF6B6B',
      articleCount: 13,
      practiceArticleCount: 10,
      certificationArticleCount: 3,
    },
    {
      id: 'history-civilization',
      name: 'History & Civilization',
      icon: '🏛️',
      color: '#C9B037',
      articleCount: 13,
      practiceArticleCount: 10,
      certificationArticleCount: 3,
    },
  ];

  const allArticles = [
    {
      id: 'science-practice-1',
      topicId: 'science-discovery',
      title: 'The Scientific Method',
      content: 'Practice article content...',
      wordCount: 500,
      articleType: 'practice',
      orderIndex: 1,
    },
    {
      id: 'science-practice-2',
      topicId: 'science-discovery',
      title: 'Evolution of Life',
      content: 'Practice article content...',
      wordCount: 750,
      articleType: 'practice',
      orderIndex: 2,
    },
    {
      id: 'health-practice-1',
      topicId: 'health-medicine',
      title: 'Nutrition Basics',
      content: 'Practice article content...',
      wordCount: 500,
      articleType: 'practice',
      orderIndex: 1,
    },
    {
      id: 'history-practice-1',
      topicId: 'history-civilization',
      title: 'Ancient Egypt',
      content: 'Practice article content...',
      wordCount: 500,
      articleType: 'practice',
      orderIndex: 1,
    },
  ];

  return {
    __esModule: true,
    TOPICS: topics,
    ARTICLES: allArticles,
    getArticlesByTopic: jest.fn((topicId: string) => {
      return allArticles.filter((a) => a.topicId === topicId);
    }),
    getArticleById: jest.fn((id: string) => {
      return allArticles.find((a) => a.id === id);
    }),
    getTopicById: jest.fn((id: string) => {
      return topics.find((t) => t.id === id);
    }),
    getPracticeArticles: jest.fn((topicId: string) => {
      return allArticles.filter(
        (a) => a.topicId === topicId && (a.articleType === 'practice' || !a.articleType)
      );
    }),
    getCertificationArticles: jest.fn(() => []),
  };
});

// =============================================================================
// Test Helpers
// =============================================================================

function resetStores() {
  useLearningStore.setState({
    articleProgress: {},
    currentArticleId: null,
    currentWPM: 250,
    recentCompletions: [],
  });
}

function TestWrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

// =============================================================================
// Tests
// =============================================================================

describe('AddContentModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetStores();
  });

  // ===========================================================================
  // Basic Rendering
  // ===========================================================================

  describe('basic rendering', () => {
    it('renders the page title', () => {
      const { getByText } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      expect(getByText('New Content')).toBeTruthy();
    });

    it('renders close button', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      expect(getByTestId('icon-close')).toBeTruthy();
    });

    it('renders all three expandable cards', () => {
      const { getByTestId, getByText } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Read card (mocked component)
      expect(getByTestId('expandable-read-card')).toBeTruthy();

      // Learn card (mocked component)
      expect(getByTestId('expandable-learn-card')).toBeTruthy();

      // Practice card (rendered in the component itself)
      expect(getByTestId('add-content.practice-card')).toBeTruthy();
      expect(getByText('Practice')).toBeTruthy();
    });

    it('renders Practice card with correct title and description', () => {
      const { getByText } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      expect(getByText('Practice')).toBeTruthy();
      expect(getByText('Choose from pre-generated content to practice speed reading')).toBeTruthy();
    });
  });

  // ===========================================================================
  // Close Button
  // ===========================================================================

  describe('close button', () => {
    it('calls router.back when close button pressed', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      fireEvent.press(getByTestId('icon-close'));

      expect(mockRouterBack).toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // Accordion Behavior
  // ===========================================================================

  describe('accordion behavior', () => {
    it('expands Practice card when pressed', () => {
      const { getByTestId, queryByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Initially no topic cards visible
      expect(queryByTestId('add-content.practice.topic-0')).toBeNull();

      // Press Practice card header
      fireEvent.press(getByTestId('add-content.practice-card'));

      // Topic cards should now be visible
      expect(getByTestId('add-content.practice.topic-0')).toBeTruthy();
    });

    it('collapses Practice card when pressed again', () => {
      const { getByTestId, queryByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Expand Practice card
      fireEvent.press(getByTestId('add-content.practice-card'));
      expect(getByTestId('add-content.practice.topic-0')).toBeTruthy();

      // Collapse Practice card
      fireEvent.press(getByTestId('add-content.practice-card'));
      expect(queryByTestId('add-content.practice.topic-0')).toBeNull();
    });

    it('collapses Practice card when Read card is expanded', () => {
      const { getByTestId, queryByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Expand Practice card
      fireEvent.press(getByTestId('add-content.practice-card'));
      expect(getByTestId('add-content.practice.topic-0')).toBeTruthy();

      // Expand Read card (via mocked header)
      fireEvent.press(getByTestId('read-card-header'));

      // Practice card should collapse, Read card should expand
      expect(queryByTestId('add-content.practice.topic-0')).toBeNull();
      expect(getByTestId('read-card-expanded')).toBeTruthy();
    });

    it('collapses Practice card when Learn card is expanded', () => {
      const { getByTestId, queryByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Expand Practice card
      fireEvent.press(getByTestId('add-content.practice-card'));
      expect(getByTestId('add-content.practice.topic-0')).toBeTruthy();

      // Expand Learn card (via mocked header)
      fireEvent.press(getByTestId('learn-card-header'));

      // Practice card should collapse, Learn card should expand
      expect(queryByTestId('add-content.practice.topic-0')).toBeNull();
      expect(getByTestId('learn-card-expanded')).toBeTruthy();
    });

    it('collapses Read card when Practice card is expanded', () => {
      const { getByTestId, queryByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Expand Read card
      fireEvent.press(getByTestId('read-card-header'));
      expect(getByTestId('read-card-expanded')).toBeTruthy();

      // Expand Practice card
      fireEvent.press(getByTestId('add-content.practice-card'));

      // Read card should collapse, Practice card should expand
      expect(queryByTestId('read-card-expanded')).toBeNull();
      expect(getByTestId('add-content.practice.topic-0')).toBeTruthy();
    });

    it('collapses Learn card when Practice card is expanded', () => {
      const { getByTestId, queryByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Expand Learn card
      fireEvent.press(getByTestId('learn-card-header'));
      expect(getByTestId('learn-card-expanded')).toBeTruthy();

      // Expand Practice card
      fireEvent.press(getByTestId('add-content.practice-card'));

      // Learn card should collapse, Practice card should expand
      expect(queryByTestId('learn-card-expanded')).toBeNull();
      expect(getByTestId('add-content.practice.topic-0')).toBeTruthy();
    });

    it('collapses Read card when Learn card is expanded', () => {
      const { getByTestId, queryByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Expand Read card
      fireEvent.press(getByTestId('read-card-header'));
      expect(getByTestId('read-card-expanded')).toBeTruthy();

      // Expand Learn card
      fireEvent.press(getByTestId('learn-card-header'));

      // Read card should collapse, Learn card should expand
      expect(queryByTestId('read-card-expanded')).toBeNull();
      expect(getByTestId('learn-card-expanded')).toBeTruthy();
    });

    it('collapses Learn card when Read card is expanded', () => {
      const { getByTestId, queryByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Expand Learn card
      fireEvent.press(getByTestId('learn-card-header'));
      expect(getByTestId('learn-card-expanded')).toBeTruthy();

      // Expand Read card
      fireEvent.press(getByTestId('read-card-header'));

      // Learn card should collapse, Read card should expand
      expect(queryByTestId('learn-card-expanded')).toBeNull();
      expect(getByTestId('read-card-expanded')).toBeTruthy();
    });
  });

  // ===========================================================================
  // Practice Card - Topic Grid
  // ===========================================================================

  describe('practice card topic grid', () => {
    it('displays all topics when Practice card is expanded', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Expand Practice card
      fireEvent.press(getByTestId('add-content.practice-card'));

      // Check that topic cards are rendered (we have 3 mock topics)
      expect(getByTestId('add-content.practice.topic-0')).toBeTruthy();
      expect(getByTestId('add-content.practice.topic-1')).toBeTruthy();
      expect(getByTestId('add-content.practice.topic-2')).toBeTruthy();
    });

    it('displays topic names in MiniTopicCards', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Expand Practice card
      fireEvent.press(getByTestId('add-content.practice-card'));

      // Check topic names are displayed
      expect(getByTestId('add-content.practice.topic-0-name')).toBeTruthy();
      expect(getByTestId('add-content.practice.topic-1-name')).toBeTruthy();
    });

    it('shows topic progress in MiniTopicCards', () => {
      // Set up some article progress
      useLearningStore.setState({
        articleProgress: {
          'science-practice-1': {
            articleId: 'science-practice-1',
            completed: true,
            comprehensionScore: 80,
            highestWPM: 300,
            lastReadAt: Date.now(),
            attemptCount: 1,
          },
        },
      });

      const { getByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Expand Practice card
      fireEvent.press(getByTestId('add-content.practice-card'));

      // Progress should be displayed
      expect(getByTestId('add-content.practice.topic-0-progress')).toBeTruthy();
    });
  });

  // ===========================================================================
  // Practice Card - Topic Navigation
  // ===========================================================================

  describe('practice card topic navigation', () => {
    it('navigates to playback when topic pressed with incomplete articles', async () => {
      const { getByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Expand Practice card
      fireEvent.press(getByTestId('add-content.practice-card'));

      // Press first topic (Science & Discovery)
      fireEvent.press(getByTestId('add-content.practice.topic-0'));

      await waitFor(() => {
        // Should navigate to playback with the first practice article
        expect(mockRouterPush).toHaveBeenCalledWith({
          pathname: '/playback',
          params: { sourceId: 'science-practice-1', source: 'training' },
        });
      });

      // Should also call router.back to close the modal
      expect(mockRouterBack).toHaveBeenCalled();
    });

    it('navigates to next incomplete article when first is completed', async () => {
      // Mark first article as completed
      useLearningStore.setState({
        articleProgress: {
          'science-practice-1': {
            articleId: 'science-practice-1',
            completed: true,
            comprehensionScore: 80,
            highestWPM: 300,
            lastReadAt: Date.now(),
            attemptCount: 1,
          },
        },
      });

      const { getByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Expand Practice card
      fireEvent.press(getByTestId('add-content.practice-card'));

      // Press first topic (Science & Discovery)
      fireEvent.press(getByTestId('add-content.practice.topic-0'));

      await waitFor(() => {
        // Should navigate to second article since first is complete
        expect(mockRouterPush).toHaveBeenCalledWith({
          pathname: '/playback',
          params: { sourceId: 'science-practice-2', source: 'training' },
        });
      });
    });

    it('does not navigate when all topic articles are completed', async () => {
      // Mark all articles as completed
      useLearningStore.setState({
        articleProgress: {
          'science-practice-1': {
            articleId: 'science-practice-1',
            completed: true,
            comprehensionScore: 80,
            highestWPM: 300,
            lastReadAt: Date.now(),
            attemptCount: 1,
          },
          'science-practice-2': {
            articleId: 'science-practice-2',
            completed: true,
            comprehensionScore: 90,
            highestWPM: 350,
            lastReadAt: Date.now(),
            attemptCount: 1,
          },
        },
      });

      const { getByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Expand Practice card
      fireEvent.press(getByTestId('add-content.practice-card'));

      // Press first topic (Science & Discovery)
      fireEvent.press(getByTestId('add-content.practice.topic-0'));

      // Should not navigate since all articles are completed
      await waitFor(() => {
        expect(mockRouterPush).not.toHaveBeenCalled();
      });
    });

    it('starts article progress for new articles', async () => {
      const startArticleSpy = jest.spyOn(useLearningStore.getState(), 'startArticle');

      const { getByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Expand Practice card
      fireEvent.press(getByTestId('add-content.practice-card'));

      // Press first topic (Science & Discovery)
      fireEvent.press(getByTestId('add-content.practice.topic-0'));

      await waitFor(() => {
        // Should call startArticle to create progress entry
        expect(startArticleSpy).toHaveBeenCalledWith('science-practice-1');
      });
    });

    it('does not start article if progress already exists', async () => {
      // Set up existing progress (not completed)
      useLearningStore.setState({
        articleProgress: {
          'science-practice-1': {
            articleId: 'science-practice-1',
            completed: false,
            comprehensionScore: 0,
            highestWPM: 0,
            lastReadAt: Date.now(),
            attemptCount: 0,
          },
        },
      });

      const startArticleSpy = jest.spyOn(useLearningStore.getState(), 'startArticle');

      const { getByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Expand Practice card
      fireEvent.press(getByTestId('add-content.practice-card'));

      // Press first topic (Science & Discovery)
      fireEvent.press(getByTestId('add-content.practice.topic-0'));

      await waitFor(() => {
        // Should not call startArticle since progress exists
        expect(startArticleSpy).not.toHaveBeenCalled();
      });
    });
  });

  // ===========================================================================
  // Child Component Props
  // ===========================================================================

  describe('child component props', () => {
    it('passes correct isExpanded prop to ExpandableReadCard', () => {
      const { getByTestId, queryByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Initially not expanded
      expect(queryByTestId('read-card-expanded')).toBeNull();

      // Expand Read card
      fireEvent.press(getByTestId('read-card-header'));

      // Now expanded
      expect(getByTestId('read-card-expanded')).toBeTruthy();
    });

    it('passes correct isExpanded prop to ExpandableLearnCard', () => {
      const { getByTestId, queryByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Initially not expanded
      expect(queryByTestId('learn-card-expanded')).toBeNull();

      // Expand Learn card
      fireEvent.press(getByTestId('learn-card-header'));

      // Now expanded
      expect(getByTestId('learn-card-expanded')).toBeTruthy();
    });

    it('passes onClose handler that closes the modal', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Expand Read card
      fireEvent.press(getByTestId('read-card-header'));

      // Press close in expanded content
      fireEvent.press(getByTestId('read-card-close'));

      // Should call router.back
      expect(mockRouterBack).toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // Edge Cases
  // ===========================================================================

  describe('edge cases', () => {
    it('handles rapid accordion toggling', () => {
      const { getByTestId, queryByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Rapidly toggle cards
      fireEvent.press(getByTestId('add-content.practice-card'));
      fireEvent.press(getByTestId('read-card-header'));
      fireEvent.press(getByTestId('learn-card-header'));
      fireEvent.press(getByTestId('add-content.practice-card'));

      // Final state: Practice expanded, others collapsed
      expect(getByTestId('add-content.practice.topic-0')).toBeTruthy();
      expect(queryByTestId('read-card-expanded')).toBeNull();
      expect(queryByTestId('learn-card-expanded')).toBeNull();
    });

    it('handles topic with no practice articles gracefully', async () => {
      // Mock a topic that returns no articles
      const { getPracticeArticles } = require('../../src/data/curriculum');
      getPracticeArticles.mockImplementationOnce(() => []);

      const { getByTestId } = render(
        <TestWrapper>
          <AddContentModal />
        </TestWrapper>
      );

      // Expand Practice card
      fireEvent.press(getByTestId('add-content.practice-card'));

      // Press a topic (would return empty articles array)
      fireEvent.press(getByTestId('add-content.practice.topic-1'));

      // Should not crash, and should not navigate
      await waitFor(() => {
        expect(mockRouterPush).not.toHaveBeenCalled();
      });
    });
  });
});
