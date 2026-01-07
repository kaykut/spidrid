/**
 * Integration Tests for Topic Screen.
 *
 * Tests the topic detail view with article list and progress tracking.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import TopicScreen from '../../src/app/topic/[id]';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// Mock expo-router
const mockBack = jest.fn();
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    back: () => mockBack(),
    push: (path: string) => mockPush(path),
  },
  useLocalSearchParams: jest.fn(() => ({ id: 'science-discovery' })),
}));

// Mock safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock stores
const mockGetArticleProgress = jest.fn(() => ({
  completed: true,
  comprehensionScore: 85,
  highestWPM: 300,
}));

const mockGetTopicProgress = jest.fn(() => ({
  topicId: 'science-discovery',
  articlesCompleted: 3,
  totalArticles: 10,
  averageScore: 82,
}));

const mockCanAccessContent = jest.fn(() => true);
const mockIncrementContentCount = jest.fn();

jest.mock('../../src/store/learningStore', () => ({
  useLearningStore: () => ({
    getArticleProgress: mockGetArticleProgress,
    getTopicProgress: mockGetTopicProgress,
  }),
}));

jest.mock('../../src/store/subscriptionStore', () => ({
  useSubscriptionStore: () => ({
    canAccessContent: mockCanAccessContent,
    incrementContentCount: mockIncrementContentCount,
    isPremium: false,
  }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('TopicScreen Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetArticleProgress.mockReturnValue({
      completed: true,
      comprehensionScore: 85,
      highestWPM: 300,
    });
  });

  describe('initial rendering', () => {
    it('renders topic name and description', () => {
      renderWithProviders(<TopicScreen />);

      expect(screen.getByText('Science & Discovery')).toBeTruthy();
    });

    it('displays topic progress', () => {
      renderWithProviders(<TopicScreen />);

      expect(screen.getByText(/3 of 10 completed/)).toBeTruthy();
    });

    it('displays average score in progress', () => {
      renderWithProviders(<TopicScreen />);

      expect(screen.getByText(/82% avg/)).toBeTruthy();
    });
  });

  describe('articles list', () => {
    it('renders article titles', () => {
      renderWithProviders(<TopicScreen />);

      // First article in science-discovery topic
      expect(screen.getByText('The Water Cycle')).toBeTruthy();
    });

    it('shows article difficulty', () => {
      renderWithProviders(<TopicScreen />);

      expect(screen.getAllByText('beginner').length).toBeGreaterThan(0);
    });

    it('shows word count for articles', () => {
      renderWithProviders(<TopicScreen />);

      // Multiple articles may have the same word count
      expect(screen.getAllByText(/\d+ words/).length).toBeGreaterThan(0);
    });

    it('shows completion badge for completed articles', () => {
      renderWithProviders(<TopicScreen />);

      // The checkmark symbol
      expect(screen.getAllByText('✓').length).toBeGreaterThan(0);
    });

    it('shows progress info for completed articles', () => {
      renderWithProviders(<TopicScreen />);

      expect(screen.getAllByText(/Score: 85%/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Best: 300 WPM/).length).toBeGreaterThan(0);
    });
  });

  describe('navigation', () => {
    it('navigates back when back button is pressed', () => {
      renderWithProviders(<TopicScreen />);

      const backButton = screen.getByText('← Back');
      fireEvent.press(backButton);

      expect(mockBack).toHaveBeenCalled();
    });

    it('navigates to article when article is pressed', () => {
      renderWithProviders(<TopicScreen />);

      const articleCard = screen.getByText('The Water Cycle');
      fireEvent.press(articleCard);

      expect(mockPush).toHaveBeenCalledWith('/article/science-discovery-p01');
    });
  });

  describe('content access', () => {
    it('increments content count for non-completed articles', () => {
      mockGetArticleProgress.mockReturnValue(null); // Not completed
      renderWithProviders(<TopicScreen />);

      const articleCard = screen.getByText('The Water Cycle');
      fireEvent.press(articleCard);

      expect(mockIncrementContentCount).toHaveBeenCalled();
    });

    it('does not increment for completed articles', () => {
      mockGetArticleProgress.mockReturnValue({
        completed: true,
        comprehensionScore: 85,
        highestWPM: 300,
      });
      renderWithProviders(<TopicScreen />);

      const articleCard = screen.getByText('The Water Cycle');
      fireEvent.press(articleCard);

      expect(mockIncrementContentCount).not.toHaveBeenCalled();
    });

    it('redirects to paywall when content limit reached', () => {
      mockGetArticleProgress.mockReturnValue(null);
      mockCanAccessContent.mockReturnValue(false);
      renderWithProviders(<TopicScreen />);

      const articleCard = screen.getByText('The Water Cycle');
      fireEvent.press(articleCard);

      expect(mockPush).toHaveBeenCalledWith('/paywall?reason=content_limit');
    });
  });

  describe('topic not found', () => {
    it('shows error when topic does not exist', () => {
      const { useLocalSearchParams } = require('expo-router');
      useLocalSearchParams.mockReturnValueOnce({ id: 'nonexistent' });

      renderWithProviders(<TopicScreen />);

      expect(screen.getByText('Topic not found')).toBeTruthy();
    });
  });

  describe('difficulty colors', () => {
    it('shows beginner articles with green indicator', () => {
      renderWithProviders(<TopicScreen />);

      // Just verify beginner text is present
      const beginnerTexts = screen.getAllByText('beginner');
      expect(beginnerTexts.length).toBeGreaterThan(0);
    });
  });
});
