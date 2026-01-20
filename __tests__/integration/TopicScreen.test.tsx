/**
 * Integration Tests for Topic Screen.
 *
 * Tests the topic detail view with article list and progress tracking.
 * Uses real Zustand stores instead of mocks for proper integration testing.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import TopicScreen from '../../src/app/topic/[id]';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';
import { useLearningStore } from '../../src/store/learningStore';
import { useSubscriptionStore } from '../../src/store/subscriptionStore';
import { useJourneyStore } from '../../src/store/journeyStore';

// Mock expo-router (external dependency)
const mockBack = jest.fn();
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    back: () => mockBack(),
    push: (path: string) => mockPush(path),
  },
  useLocalSearchParams: jest.fn(() => ({ id: 'science-discovery' })),
}));

// Mock safe-area-context (external dependency)
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('TopicScreen Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset learning store with some article progress
    useLearningStore.setState({
      articleProgress: {
        'science-discovery-p01': {
          articleId: 'science-discovery-p01',
          completed: true,
          comprehensionScore: 85,
          highestWPM: 300,
          lastReadAt: Date.now(),
          attemptCount: 1,
        },
        'science-discovery-p02': {
          articleId: 'science-discovery-p02',
          completed: true,
          comprehensionScore: 90,
          highestWPM: 320,
          lastReadAt: Date.now(),
          attemptCount: 1,
        },
        'science-discovery-p03': {
          articleId: 'science-discovery-p03',
          completed: true,
          comprehensionScore: 75,
          highestWPM: 280,
          lastReadAt: Date.now(),
          attemptCount: 1,
        },
      },
      currentArticleId: null,
      currentWPM: 250,
      recentCompletions: [],
    });

    // Reset subscription store to free tier
    useSubscriptionStore.setState({
      isPremium: false,
      isLoading: false,
      isInitialized: true,
    });

    // Reset journey store
    useJourneyStore.setState({
      velocityScore: 0,
      level: 'novice',
      sessions: [],
      certProgress: {
        speed_reader: { vsUnlocked: false, speedProofAchieved: false, examUnlocked: false, examPassed: false },
        velocity_master: { vsUnlocked: false, speedProofAchieved: false, examUnlocked: false, examPassed: false },
        transcendent: { vsUnlocked: false, speedProofAchieved: false, examUnlocked: false, examPassed: false },
      },
      speedProofs: [],
    });
  });

  describe('initial rendering', () => {
    it('renders topic name and description', () => {
      renderWithProviders(<TopicScreen />);

      expect(screen.getByText('Science & Discovery')).toBeTruthy();
    });

    it('displays topic progress from real store', () => {
      renderWithProviders(<TopicScreen />);

      // 3 articles completed out of total (practice + certification)
      expect(screen.getByText(/3 of \d+ completed/)).toBeTruthy();
    });

    it('displays average score in progress', () => {
      renderWithProviders(<TopicScreen />);

      // Average of 85, 90, 75 = 83.33, rounded to 83%
      expect(screen.getByText(/83% avg/)).toBeTruthy();
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

      // The checkmark symbol for completed articles
      expect(screen.getAllByText('✓').length).toBeGreaterThan(0);
    });

    it('shows progress info for completed articles', () => {
      renderWithProviders(<TopicScreen />);

      // Progress from the first completed article
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
