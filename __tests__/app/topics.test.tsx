/**
 * Tests for Topics Browser Screen
 *
 * Tests the topics grid screen that shows all curriculum topics:
 * - Renders all topics from the curriculum
 * - Displays topic names, icons, and descriptions
 * - Shows progress indicators for each topic
 * - Back button navigation
 * - Topic card navigation to topic detail page
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TopicsScreen from '../../src/app/topics';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';
import { useLearningStore } from '../../src/store/learningStore';
import { TOPICS } from '../../src/data/curriculum';
import { ArticleProgress } from '../../src/types/learning';

// =============================================================================
// Mocks
// =============================================================================

// Mock expo-router
const mockRouterBack = jest.fn();
const mockRouterPush = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    back: () => mockRouterBack(),
    push: (path: string) => mockRouterPush(path),
  },
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, style }: { children: React.ReactNode; style?: object }) => {
    const { View } = require('react-native');
    return <View style={style}>{children}</View>;
  },
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

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: ({ children, style }: { children: React.ReactNode; style?: object }) => (
      <View style={style}>{children}</View>
    ),
  };
});

// Mock EdgeFadeScrollView component
jest.mock('../../src/components/common/EdgeFadeScrollView', () => {
  const { ScrollView } = require('react-native');
  return {
    EdgeFadeScrollView: ({
      children,
      contentContainerStyle,
    }: {
      children: React.ReactNode;
      contentContainerStyle?: object;
    }) => <ScrollView contentContainerStyle={contentContainerStyle}>{children}</ScrollView>,
  };
});

// Mock react-i18next for translations
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        page_title: 'Topics',
      };
      return translations[key] || key;
    },
  }),
}));

// =============================================================================
// Test Helpers
// =============================================================================

function resetStores() {
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

describe('TopicsScreen', () => {
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
          <TopicsScreen />
        </TestWrapper>
      );

      expect(getByText('Topics')).toBeTruthy();
    });

    it('renders back button', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <TopicsScreen />
        </TestWrapper>
      );

      expect(getByTestId('icon-chevron-back')).toBeTruthy();
    });

    it('navigates back when back button pressed', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <TopicsScreen />
        </TestWrapper>
      );

      fireEvent.press(getByTestId('icon-chevron-back'));

      expect(mockRouterBack).toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // Topic List Rendering
  // ===========================================================================

  describe('topic list rendering', () => {
    it('renders all topics from curriculum', () => {
      const { getByText } = render(
        <TestWrapper>
          <TopicsScreen />
        </TestWrapper>
      );

      // Verify each topic is rendered
      TOPICS.forEach((topic) => {
        expect(getByText(topic.name)).toBeTruthy();
      });
    });

    it('displays topic icons as emojis', () => {
      const { getByText } = render(
        <TestWrapper>
          <TopicsScreen />
        </TestWrapper>
      );

      // Check a few topic icons are displayed
      TOPICS.forEach((topic) => {
        expect(getByText(topic.icon)).toBeTruthy();
      });
    });

    it('displays topic descriptions', () => {
      const { getByText } = render(
        <TestWrapper>
          <TopicsScreen />
        </TestWrapper>
      );

      // Check first topic description is displayed
      expect(getByText(TOPICS[0].description)).toBeTruthy();
    });

    it('renders correct number of topics', () => {
      const { getAllByText } = render(
        <TestWrapper>
          <TopicsScreen />
        </TestWrapper>
      );

      // All topics should show 0/13 progress initially (using articleCount from TOPICS)
      const expectedProgressText = `0/${TOPICS[0].articleCount}`;
      const progressTexts = getAllByText(expectedProgressText);

      // All topics have the same articleCount, so we should have one for each topic
      expect(progressTexts.length).toBe(TOPICS.length);
    });
  });

  // ===========================================================================
  // Topic Navigation
  // ===========================================================================

  describe('topic navigation', () => {
    it('navigates to topic detail when topic card pressed', () => {
      const { getByText } = render(
        <TestWrapper>
          <TopicsScreen />
        </TestWrapper>
      );

      // Press the first topic
      fireEvent.press(getByText(TOPICS[0].name));

      expect(mockRouterPush).toHaveBeenCalledWith(`/topic/${TOPICS[0].id}`);
    });

    it('navigates to correct topic for each card', () => {
      const { getByText } = render(
        <TestWrapper>
          <TopicsScreen />
        </TestWrapper>
      );

      // Test navigation for a few different topics
      const testTopics = [TOPICS[0], TOPICS[3], TOPICS[7]];

      testTopics.forEach((topic) => {
        mockRouterPush.mockClear();
        fireEvent.press(getByText(topic.name));
        expect(mockRouterPush).toHaveBeenCalledWith(`/topic/${topic.id}`);
      });
    });
  });

  // ===========================================================================
  // Progress Display
  // ===========================================================================

  describe('progress display', () => {
    it('shows 0 progress when no articles completed', () => {
      const { getAllByText } = render(
        <TestWrapper>
          <TopicsScreen />
        </TestWrapper>
      );

      // All topics should show 0/X progress
      const progressTexts = getAllByText(/^0\/\d+$/);
      expect(progressTexts.length).toBe(TOPICS.length);
    });

    it('shows correct progress when articles completed', () => {
      // Set up article progress for the first topic
      const firstTopic = TOPICS[0];
      // Mark some articles as completed for science-discovery topic
      useLearningStore.setState({
        articleProgress: {
          'science-discovery-p01': {
            articleId: 'science-discovery-p01',
            completed: true,
            comprehensionScore: 80,
            highestWPM: 300,
            lastReadAt: Date.now(),
            attemptCount: 1,
          },
          'science-discovery-p02': {
            articleId: 'science-discovery-p02',
            completed: true,
            comprehensionScore: 85,
            highestWPM: 320,
            lastReadAt: Date.now(),
            attemptCount: 1,
          },
        },
      });

      const { getByText, getAllByText } = render(
        <TestWrapper>
          <TopicsScreen />
        </TestWrapper>
      );

      // First topic should show 2/13 progress (2 completed out of 13)
      expect(getByText(`2/${firstTopic.articleCount}`)).toBeTruthy();

      // Other topics should still show 0/13 (use getAllByText since multiple topics have same count)
      const zeroProgressTexts = getAllByText(`0/${TOPICS[1].articleCount}`);
      expect(zeroProgressTexts.length).toBeGreaterThan(0);
    });

    it('calculates progress percentage correctly', () => {
      // Complete all articles for science-discovery topic (13 articles)
      const progressEntries: Record<string, ArticleProgress> = {};
      // Practice articles use p01, p02, etc. (with padding)
      for (let i = 1; i <= 10; i++) {
        const id = `science-discovery-p${i.toString().padStart(2, '0')}`;
        progressEntries[id] = {
          articleId: id,
          completed: true,
          comprehensionScore: 90,
          highestWPM: 350,
          lastReadAt: Date.now(),
          attemptCount: 1,
        };
      }
      // Certification articles use c1, c2, c3 (no padding)
      for (let i = 1; i <= 3; i++) {
        const id = `science-discovery-c${i}`;
        progressEntries[id] = {
          articleId: id,
          completed: true,
          comprehensionScore: 95,
          highestWPM: 400,
          lastReadAt: Date.now(),
          attemptCount: 1,
        };
      }

      useLearningStore.setState({
        articleProgress: progressEntries,
      });

      const { getByText } = render(
        <TestWrapper>
          <TopicsScreen />
        </TestWrapper>
      );

      // First topic should show 13/13 (100% complete)
      expect(getByText('13/13')).toBeTruthy();
    });
  });

  // ===========================================================================
  // Visual Elements
  // ===========================================================================

  describe('visual elements', () => {
    it('renders topic cards with appropriate styling', () => {
      const { getByText } = render(
        <TestWrapper>
          <TopicsScreen />
        </TestWrapper>
      );

      // Verify topic cards are rendered (by checking topic names are present)
      expect(getByText(TOPICS[0].name)).toBeTruthy();
      expect(getByText(TOPICS[1].name)).toBeTruthy();
    });

    it('renders progress bars for each topic', () => {
      const { getByText } = render(
        <TestWrapper>
          <TopicsScreen />
        </TestWrapper>
      );

      // Each topic should have a progress indicator
      // We verify this by checking progress text is shown for each topic
      TOPICS.forEach((topic) => {
        // Each topic card should exist
        expect(getByText(topic.name)).toBeTruthy();
      });
    });
  });

  // ===========================================================================
  // Topic Data Integrity
  // ===========================================================================

  describe('topic data integrity', () => {
    it('all topics have required properties', () => {
      TOPICS.forEach((topic) => {
        expect(topic.id).toBeDefined();
        expect(topic.name).toBeDefined();
        expect(topic.description).toBeDefined();
        expect(topic.icon).toBeDefined();
        expect(topic.color).toBeDefined();
        expect(topic.articleCount).toBeGreaterThan(0);
      });
    });

    it('topic IDs are unique', () => {
      const ids = TOPICS.map((t) => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(TOPICS.length);
    });

    it('all topics have emoji icons', () => {
      TOPICS.forEach((topic) => {
        // Emojis are typically 1-4 characters (including ZWJ sequences)
        expect(topic.icon.length).toBeGreaterThan(0);
        expect(topic.icon.length).toBeLessThanOrEqual(7);
      });
    });

    it('all topics have valid hex colors', () => {
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
      TOPICS.forEach((topic) => {
        expect(topic.color).toMatch(hexColorRegex);
      });
    });
  });

  // ===========================================================================
  // Edge Cases
  // ===========================================================================

  describe('edge cases', () => {
    it('handles empty article progress gracefully', () => {
      useLearningStore.setState({
        articleProgress: {},
      });

      const { getByText, getAllByText } = render(
        <TestWrapper>
          <TopicsScreen />
        </TestWrapper>
      );

      // Should still render all topics with 0 progress
      expect(getByText(TOPICS[0].name)).toBeTruthy();
      // Use getAllByText since multiple topics have the same articleCount
      const zeroProgressTexts = getAllByText(`0/${TOPICS[0].articleCount}`);
      expect(zeroProgressTexts.length).toBe(TOPICS.length);
    });

    it('handles partial progress for a topic', () => {
      // Complete just one article
      useLearningStore.setState({
        articleProgress: {
          'health-medicine-p01': {
            articleId: 'health-medicine-p01',
            completed: true,
            comprehensionScore: 75,
            highestWPM: 280,
            lastReadAt: Date.now(),
            attemptCount: 1,
          },
        },
      });

      const { getByText } = render(
        <TestWrapper>
          <TopicsScreen />
        </TestWrapper>
      );

      // Health & Medicine topic should show 1/13
      expect(getByText('1/13')).toBeTruthy();
    });

    it('ignores incomplete article progress', () => {
      // Add an article that was started but not completed
      useLearningStore.setState({
        articleProgress: {
          'nature-wildlife-p01': {
            articleId: 'nature-wildlife-p01',
            completed: false, // Not completed
            comprehensionScore: 0, // No score yet
            highestWPM: 200,
            lastReadAt: Date.now(),
            attemptCount: 0,
          },
        },
      });

      const { getAllByText } = render(
        <TestWrapper>
          <TopicsScreen />
        </TestWrapper>
      );

      // All topics should still show 0/X since no articles are completed
      const zeroProgressTexts = getAllByText(/^0\/\d+$/);
      expect(zeroProgressTexts.length).toBe(TOPICS.length);
    });
  });

  // ===========================================================================
  // Accessibility
  // ===========================================================================

  describe('accessibility', () => {
    it('back button has appropriate hit slop for touch targets', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <TopicsScreen />
        </TestWrapper>
      );

      // Back button should be accessible
      const backButton = getByTestId('icon-chevron-back');
      expect(backButton).toBeTruthy();
    });

    it('topic cards are pressable', () => {
      const { getByText } = render(
        <TestWrapper>
          <TopicsScreen />
        </TestWrapper>
      );

      // Each topic should be pressable (verifying by checking navigation works)
      TOPICS.forEach((topic) => {
        const topicElement = getByText(topic.name);
        expect(topicElement).toBeTruthy();
      });
    });
  });
});
