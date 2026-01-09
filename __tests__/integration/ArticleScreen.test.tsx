/**
 * Integration Tests for Article Deep Link Screen.
 *
 * Tests that article deep links properly redirect to the Player with paywall checks.
 */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react-native';
import ArticleDeepLinkScreen from '../../src/app/article/[id]';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';
import { getArticleById } from '../../src/data/curriculum';

// Mock expo-router
const mockBack = jest.fn();
const mockReplace = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    back: () => mockBack(),
    replace: (path: string) => mockReplace(path),
  },
  useLocalSearchParams: jest.fn(() => ({ id: 'science-discovery-p01' })),
}));

// Mock safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock getArticleById
jest.mock('../../src/data/curriculum', () => ({
  getArticleById: jest.fn(),
}));

// Mock playlistStore
const mockLoadContent = jest.fn();
jest.mock('../../src/store/playlistStore', () => ({
  usePlaylistStore: () => ({
    loadContent: mockLoadContent,
  }),
}));

// Mock subscriptionStore
const mockCanAccessContent = jest.fn(() => true);
const mockIncrementContentCount = jest.fn();
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

// Get reference to the mocked function
const mockGetArticleById = getArticleById as jest.Mock;

describe('ArticleDeepLinkScreen Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockGetArticleById.mockReturnValue({
      id: 'science-discovery-p01',
      title: 'Test Article',
      content: 'Test content',
      topicId: 'science-discovery',
      wordCount: 500,
      difficulty: 'beginner' as const,
      questions: [],
      articleType: 'practice' as const,
      orderIndex: 1,
    });
    mockCanAccessContent.mockReturnValue(true);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('valid article', () => {
    it('loads article into playlist as training source', async () => {
      renderWithProviders(<ArticleDeepLinkScreen />);

      await waitFor(() => {
        expect(mockLoadContent).toHaveBeenCalledWith('science-discovery-p01', 'training');
      });
    });

    it('redirects to player tab', async () => {
      renderWithProviders(<ArticleDeepLinkScreen />);

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/(tabs)/play');
      });
    });

    it('shows loading state with article title', () => {
      renderWithProviders(<ArticleDeepLinkScreen />);

      expect(screen.getByText(/Loading.*Test Article/)).toBeTruthy();
    });

    it('increments content count for non-premium users', async () => {
      renderWithProviders(<ArticleDeepLinkScreen />);

      await waitFor(() => {
        expect(mockIncrementContentCount).toHaveBeenCalled();
      });
    });
  });

  describe('article not found', () => {
    it('shows error when article does not exist', () => {
      mockGetArticleById.mockReturnValue(undefined);

      renderWithProviders(<ArticleDeepLinkScreen />);

      expect(screen.getByText('Article not found')).toBeTruthy();
    });

    it('navigates back after delay when not found', async () => {
      mockGetArticleById.mockReturnValue(undefined);

      renderWithProviders(<ArticleDeepLinkScreen />);

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      expect(mockBack).toHaveBeenCalled();
    });
  });

  describe('paywall', () => {
    it('redirects to paywall when content limit is reached', async () => {
      mockCanAccessContent.mockReturnValue(false);

      renderWithProviders(<ArticleDeepLinkScreen />);

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/paywall?reason=content_limit');
      });
    });

    it('does not increment content count when paywall is hit', async () => {
      mockCanAccessContent.mockReturnValue(false);

      renderWithProviders(<ArticleDeepLinkScreen />);

      await waitFor(() => {
        expect(mockIncrementContentCount).not.toHaveBeenCalled();
      });
    });
  });
});
