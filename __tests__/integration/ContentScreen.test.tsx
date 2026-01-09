/**
 * Integration Tests for Content Deep Link Screen.
 *
 * Tests that the content deep link properly redirects to the Player.
 */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react-native';
import ContentDeepLinkScreen from '../../src/app/content/[id]';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// Mock expo-router
const mockBack = jest.fn();
const mockReplace = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    back: () => mockBack(),
    replace: (path: string) => mockReplace(path),
  },
  useLocalSearchParams: jest.fn(() => ({ id: 'content-123' })),
}));

// Mock safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock content store
const mockGetContentById = jest.fn<ReturnType<any>, [string]>(() => ({
  id: 'content-123',
  title: 'Test Article',
  content: 'This is a test article with some content to read.',
  wordCount: 10,
  source: 'url',
  sourceUrl: 'https://example.com',
  readProgress: 0,
  createdAt: Date.now(),
}));

jest.mock('../../src/store/contentStore', () => {
  const mockStore = () => ({
    getContentById: mockGetContentById,
  });
  mockStore.getState = () => ({
    getContentById: mockGetContentById,
  });
  return { useContentStore: mockStore };
});

// Mock playlist store
const mockLoadContent = jest.fn();
jest.mock('../../src/store/playlistStore', () => ({
  usePlaylistStore: () => ({
    loadContent: mockLoadContent,
  }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('ContentDeepLinkScreen Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockGetContentById.mockReturnValue({
      id: 'content-123',
      title: 'Test Article',
      content: 'This is a test article with some content to read.',
      wordCount: 10,
      source: 'url',
      sourceUrl: 'https://example.com',
      readProgress: 0,
      createdAt: Date.now(),
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('valid content', () => {
    it('loads content into playlist store', async () => {
      renderWithProviders(<ContentDeepLinkScreen />);

      await waitFor(() => {
        expect(mockLoadContent).toHaveBeenCalledWith('content-123', 'reading');
      });
    });

    it('redirects to player tab', async () => {
      renderWithProviders(<ContentDeepLinkScreen />);

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/(tabs)/play');
      });
    });

    it('shows loading state with content title', () => {
      renderWithProviders(<ContentDeepLinkScreen />);

      expect(screen.getByText(/Loading.*Test Article/)).toBeTruthy();
    });
  });

  describe('content not found', () => {
    it('shows error when content does not exist', () => {
      mockGetContentById.mockReturnValue(undefined);

      renderWithProviders(<ContentDeepLinkScreen />);

      expect(screen.getByText('Content not found')).toBeTruthy();
    });

    it('navigates back after delay when not found', async () => {
      mockGetContentById.mockReturnValue(undefined);

      renderWithProviders(<ContentDeepLinkScreen />);

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      expect(mockBack).toHaveBeenCalled();
    });
  });
});
