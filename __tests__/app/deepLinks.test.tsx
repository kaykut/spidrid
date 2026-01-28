/**
 * Tests for deep link screens (article/content).
 */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react-native';
import ArticleDeepLinkScreen from '../../src/app/article/[id]';
import ContentDeepLinkScreen from '../../src/app/content/[id]';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';
import { useContentStore } from '../../src/store/contentStore';

const mockReplace = jest.fn();
const mockBack = jest.fn();
let mockParams: { id?: string } = {};

jest.mock('expo-router', () => ({
  router: {
    replace: (...args: unknown[]) => mockReplace(...args),
    back: () => mockBack(),
  },
  useLocalSearchParams: () => mockParams,
}));

let mockArticle: { id: string } | null = null;
jest.mock('../../src/data/curriculum', () => ({
  getArticleById: (_id: string) => mockArticle,
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'errors:article.not_found': 'Article not found',
        'common:loading': 'Loading...',
        'content_not_found': 'Content not found',
        'import.processing': 'Processing...',
        'errors.import_failed': 'Import failed',
        'loading': 'Loading...',
      };
      return translations[key] || key;
    },
  }),
}));

const renderWithProviders = (ui: React.ReactElement) =>
  render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Deep link screens', () => {
  beforeEach(() => {
    mockReplace.mockClear();
    mockBack.mockClear();
    mockParams = {};
    mockArticle = null;
    useContentStore.setState({ importedContent: [] });
  });

  describe('ArticleDeepLinkScreen', () => {
    it('redirects to playback when article exists', async () => {
      mockParams = { id: 'article-1' };
      mockArticle = { id: 'article-1' };

      renderWithProviders(<ArticleDeepLinkScreen />);

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith({
          pathname: '/playback',
          params: { sourceId: 'article-1', source: 'training' },
        });
      });
    });

    it('shows error and goes back when article is missing', () => {
      jest.useFakeTimers();
      mockParams = { id: 'missing' };
      mockArticle = null;

      renderWithProviders(<ArticleDeepLinkScreen />);

      expect(screen.getByText('Article not found')).toBeTruthy();

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      expect(mockBack).toHaveBeenCalled();
      jest.useRealTimers();
    });
  });

  describe('ContentDeepLinkScreen', () => {
    it('redirects to playback when content is ready', async () => {
      mockParams = { id: 'content-1' };
      useContentStore.setState({
        importedContent: [
          {
            id: 'content-1',
            title: 'Test',
            content: 'Hello world',
            wordCount: 2,
            source: 'text',
            createdAt: Date.now(),
            readProgress: 0,
            processingStatus: 'ready',
          },
        ],
      });

      renderWithProviders(<ContentDeepLinkScreen />);

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith({
          pathname: '/playback',
          params: { sourceId: 'content-1', source: 'imported' },
        });
      });
    });

    it('shows processing state when content is still importing', () => {
      mockParams = { id: 'content-2' };
      useContentStore.setState({
        importedContent: [
          {
            id: 'content-2',
            title: 'Test',
            content: '',
            wordCount: 0,
            source: 'pdf',
            createdAt: Date.now(),
            readProgress: 0,
            processingStatus: 'processing',
          },
        ],
      });

      renderWithProviders(<ContentDeepLinkScreen />);

      expect(screen.getByText('Processing...')).toBeTruthy();
      expect(mockReplace).not.toHaveBeenCalled();
    });

    it('shows error details when processing failed', () => {
      mockParams = { id: 'content-3' };
      useContentStore.setState({
        importedContent: [
          {
            id: 'content-3',
            title: 'Broken',
            content: '',
            wordCount: 0,
            source: 'pdf',
            createdAt: Date.now(),
            readProgress: 0,
            processingStatus: 'error',
            processingError: 'Failed to import',
          },
        ],
      });

      renderWithProviders(<ContentDeepLinkScreen />);

      expect(screen.getByText('Import failed')).toBeTruthy();
      expect(screen.getByText('Failed to import')).toBeTruthy();
      expect(mockReplace).not.toHaveBeenCalled();
    });

    it('shows error and goes back when content is missing', () => {
      jest.useFakeTimers();
      mockParams = { id: 'missing' };
      useContentStore.setState({ importedContent: [] });

      renderWithProviders(<ContentDeepLinkScreen />);

      expect(screen.getByText('Content not found')).toBeTruthy();

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      expect(mockBack).toHaveBeenCalled();
      jest.useRealTimers();
    });
  });
});
