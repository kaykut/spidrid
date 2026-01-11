/**
 * Integration Tests for Read Screen (Content Import).
 *
 * Tests URL/text import and content management.
 * Uses real Zustand stores instead of mocks for proper integration testing.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ReadScreen from '../../src/app/(tabs)/content/read';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';
import { useContentStore } from '../../src/store/contentStore';
import { useSubscriptionStore } from '../../src/store/subscriptionStore';

// Mock expo-router (external dependency)
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    push: (path: string) => mockPush(path),
  },
}));

// Mock react-native-safe-area-context (external dependency)
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mock expo-linear-gradient (external dependency with native module)
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock react-native-webview (external dependency with native module)
jest.mock('react-native-webview', () => ({
  WebView: 'WebView',
}));

// Mock expo-document-picker (external dependency with native module)
jest.mock('expo-document-picker', () => ({
  getDocumentAsync: jest.fn(() => Promise.resolve({ canceled: true })),
}));

// Mock expo-file-system (external dependency with native module)
jest.mock('expo-file-system', () => ({
  readAsStringAsync: jest.fn(),
  EncodingType: {
    UTF8: 'utf8',
    Base64: 'base64',
  },
}));

// Mock PdfExtractorProvider (uses WebView internally)
jest.mock('../../src/components/PdfExtractorProvider', () => ({
  usePdfExtractor: () => ({
    extractPdf: jest.fn(),
  }),
  PdfExtractorProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock Alert (native API)
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

// Mock content extractor (makes network calls)
const mockExtractFromUrl = jest.fn();
jest.mock('../../src/services/contentExtractor', () => ({
  extractFromUrl: (url: string) => mockExtractFromUrl(url),
  createFromText: jest.fn((text: string, title?: string) => ({
    success: true,
    content: {
      id: 'text-123',
      title: title || 'Pasted Text',
      content: text,
      wordCount: text.split(/\s+/).length,
      source: 'text',
      sourceUrl: '',
    },
  })),
  extractFromEbook: jest.fn(() => Promise.resolve({ success: false, error: 'Not implemented in test' })),
}));

// Mock Paywall (complex component with network calls in production)
jest.mock('../../src/components/paywall/Paywall', () => ({
  Paywall: ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
    if (!visible) {return null;}
    const { View, Text, TouchableOpacity } = require('react-native');
    return (
      <View testID="paywall-modal">
        <Text>Upgrade to Premium</Text>
        <TouchableOpacity onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    );
  },
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('ReadScreen Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset content store with some imported content
    useContentStore.setState({
      importedContent: [
        {
          id: 'content-1',
          title: 'Test Article',
          content: 'This is test content for testing purposes.',
          wordCount: 50,
          readProgress: 0.5,
          source: 'url',
          sourceUrl: 'https://example.com',
          createdAt: Date.now(),
        },
      ],
      currentContentId: null,
    });

    // Reset subscription store to free tier with available content
    useSubscriptionStore.setState({
      isPremium: false,
      isLoading: false,
      isInitialized: true,
      contentAccessCount: 0,
    });

    mockExtractFromUrl.mockResolvedValue({
      success: true,
      content: {
        id: 'extracted-123',
        title: 'Extracted Article',
        content: 'Article content here.',
        wordCount: 100,
        source: 'url',
        sourceUrl: 'https://example.com/article',
      },
    });
  });

  describe('initial rendering', () => {
    it('shows import options', () => {
      renderWithProviders(<ReadScreen />);

      expect(screen.getByText('From URL')).toBeTruthy();
      expect(screen.getByText('Paste Text')).toBeTruthy();
    });

    it('displays existing imported content from real store', () => {
      renderWithProviders(<ReadScreen />);

      expect(screen.getByText('Test Article')).toBeTruthy();
    });

    it('shows word count for imported content', () => {
      renderWithProviders(<ReadScreen />);

      // Word count is shown with icon prefix
      expect(screen.getByText(/50 words/)).toBeTruthy();
    });

    it('shows progress indicator for partially read content', () => {
      renderWithProviders(<ReadScreen />);

      // 50% progress
      expect(screen.getByText('50%')).toBeTruthy();
    });
  });

  describe('opening existing content', () => {
    it('navigates to content reader when content is pressed', () => {
      renderWithProviders(<ReadScreen />);

      const contentItem = screen.getByText('Test Article');
      fireEvent.press(contentItem);

      expect(mockPush).toHaveBeenCalledWith('/content/content-1');
    });
  });

  describe('content access with real subscription store', () => {
    it('shows paywall when content limit reached for unfinished content', () => {
      // Set content count at limit (5 for free tier)
      useSubscriptionStore.setState({
        isPremium: false,
        isLoading: false,
        isInitialized: true,
        contentAccessCount: 5,
      });

      renderWithProviders(<ReadScreen />);

      const contentItem = screen.getByText('Test Article');
      fireEvent.press(contentItem);

      expect(screen.getByTestId('paywall-modal')).toBeTruthy();
    });

    it('allows access to fully read content even at limit', () => {
      // Set content count at limit but content is fully read
      useContentStore.setState({
        importedContent: [
          {
            id: 'content-1',
            title: 'Test Article',
            content: 'This is test content.',
            wordCount: 50,
            readProgress: 1, // Fully read
            source: 'url',
            sourceUrl: 'https://example.com',
            createdAt: Date.now(),
          },
        ],
        currentContentId: null,
      });

      useSubscriptionStore.setState({
        isPremium: false,
        isLoading: false,
        isInitialized: true,
        contentAccessCount: 5,
      });

      renderWithProviders(<ReadScreen />);

      const contentItem = screen.getByText('Test Article');
      fireEvent.press(contentItem);

      // Should navigate, not show paywall
      expect(mockPush).toHaveBeenCalledWith('/content/content-1');
    });

    it('allows unlimited access for premium users', () => {
      useSubscriptionStore.setState({
        isPremium: true,
        isLoading: false,
        isInitialized: true,
        contentAccessCount: 100,
      });

      renderWithProviders(<ReadScreen />);

      const contentItem = screen.getByText('Test Article');
      fireEvent.press(contentItem);

      expect(mockPush).toHaveBeenCalledWith('/content/content-1');
    });
  });

  describe('URL import modal', () => {
    it('opens URL import modal when button pressed', () => {
      renderWithProviders(<ReadScreen />);

      const importButton = screen.getByText('From URL');
      fireEvent.press(importButton);

      // Modal shows the title
      expect(screen.getByText('Import from URL')).toBeTruthy();
    });

    it('has URL input field in the modal', () => {
      renderWithProviders(<ReadScreen />);

      fireEvent.press(screen.getByText('From URL'));

      expect(screen.getByPlaceholderText(/Enter URL/)).toBeTruthy();
    });

    it('has an import button in the modal', () => {
      renderWithProviders(<ReadScreen />);

      fireEvent.press(screen.getByText('From URL'));

      expect(screen.getByText('Import')).toBeTruthy();
    });
  });

  describe('text paste modal', () => {
    it('opens text paste modal when button pressed', () => {
      renderWithProviders(<ReadScreen />);

      const pasteButton = screen.getByText('Paste Text');
      fireEvent.press(pasteButton);

      expect(screen.getByPlaceholderText('Paste your text here...')).toBeTruthy();
    });

    it('has a title input field', () => {
      renderWithProviders(<ReadScreen />);

      fireEvent.press(screen.getByText('Paste Text'));

      expect(screen.getByPlaceholderText('Title (optional)')).toBeTruthy();
    });

    it('has a save button in the modal', () => {
      renderWithProviders(<ReadScreen />);

      fireEvent.press(screen.getByText('Paste Text'));

      expect(screen.getByText('Save & Read')).toBeTruthy();
    });
  });

  describe('empty state', () => {
    it('shows empty state when no content imported', () => {
      useContentStore.setState({
        importedContent: [],
        currentContentId: null,
      });

      renderWithProviders(<ReadScreen />);

      expect(screen.getByText('Import content to start speed reading')).toBeTruthy();
    });
  });

  describe('e-book import', () => {
    it('shows e-book import button', () => {
      renderWithProviders(<ReadScreen />);

      expect(screen.getByText('Import E-book')).toBeTruthy();
      expect(screen.getByText('EPUB & PDF files')).toBeTruthy();
    });
  });
});
