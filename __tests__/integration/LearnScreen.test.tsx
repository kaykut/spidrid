/**
 * Integration Tests for Learn Screen.
 *
 * Tests the learning mode screen with topics grid and progress tracking.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import LearnScreen from '../../src/app/(tabs)/learn';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// Mock expo-router
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    push: (path: string) => mockPush(path),
  },
}));

// Mock stores
const mockGetTopicProgress = jest.fn(() => ({
  topicId: 'science-discovery',
  articlesCompleted: 2,
  totalArticles: 10,
  averageScore: 85,
}));

const mockGetTotalArticlesCompleted = jest.fn(() => 5);
const mockGetHighestWPM = jest.fn(() => 350);

jest.mock('../../src/store/learningStore', () => ({
  useLearningStore: () => ({
    getTopicProgress: mockGetTopicProgress,
    getTotalArticlesCompleted: mockGetTotalArticlesCompleted,
    getHighestWPM: mockGetHighestWPM,
  }),
}));

jest.mock('../../src/store/onboardingStore', () => ({
  useOnboardingStore: () => ({
    selectedInterests: [],
  }),
}));

// Mock EdgeFadeScrollView to render children directly
jest.mock('../../src/components/common/EdgeFadeScrollView', () => ({
  EdgeFadeScrollView: ({ children }: { children: React.ReactNode }) => children,
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('LearnScreen Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial rendering', () => {
    it('renders the screen title', () => {
      renderWithProviders(<LearnScreen />);

      expect(screen.getByText('Learn')).toBeTruthy();
    });

    it('displays total articles completed', () => {
      renderWithProviders(<LearnScreen />);

      expect(screen.getByText('5')).toBeTruthy();
      expect(screen.getByText('Articles')).toBeTruthy();
    });

    it('displays highest WPM', () => {
      renderWithProviders(<LearnScreen />);

      expect(screen.getByText('350')).toBeTruthy();
      expect(screen.getByText('Best WPM')).toBeTruthy();
    });

    it('shows Topics section', () => {
      renderWithProviders(<LearnScreen />);

      expect(screen.getByText('Topics')).toBeTruthy();
    });

    it('shows Try RSVP Demo button', () => {
      renderWithProviders(<LearnScreen />);

      expect(screen.getByText('Try RSVP Demo')).toBeTruthy();
    });
  });

  describe('topics grid', () => {
    it('renders all topics', () => {
      renderWithProviders(<LearnScreen />);

      // Check for a few topic names
      expect(screen.getByText('Science & Discovery')).toBeTruthy();
    });

    it('shows topic progress', () => {
      renderWithProviders(<LearnScreen />);

      // Progress is shown as "completed/total"
      expect(screen.getAllByText('2/10').length).toBeGreaterThan(0);
    });
  });

  describe('navigation', () => {
    it('navigates to demo when Try RSVP Demo is pressed', () => {
      renderWithProviders(<LearnScreen />);

      const demoButton = screen.getByText('Try RSVP Demo');
      fireEvent.press(demoButton);

      expect(mockPush).toHaveBeenCalledWith('/reader/demo');
    });

    it('navigates to topic when topic card is pressed', () => {
      renderWithProviders(<LearnScreen />);

      const topicCard = screen.getByText('Science & Discovery');
      fireEvent.press(topicCard);

      expect(mockPush).toHaveBeenCalledWith('/topic/science-discovery');
    });
  });

  describe('with no progress', () => {
    beforeEach(() => {
      mockGetTotalArticlesCompleted.mockReturnValue(0);
      mockGetHighestWPM.mockReturnValue(0);
    });

    it('shows 0 for articles completed', () => {
      renderWithProviders(<LearnScreen />);

      expect(screen.getByText('0')).toBeTruthy();
    });

    it('shows em-dash for no WPM', () => {
      renderWithProviders(<LearnScreen />);

      expect(screen.getByText('—')).toBeTruthy();
    });
  });
});
