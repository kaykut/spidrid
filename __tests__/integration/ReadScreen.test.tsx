/**
 * Integration Tests for Read Screen (Content Import).
 *
 * Tests URL/text import and content management.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ReadScreen from '../../src/app/(tabs)/read';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// Mock expo-router
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    push: (path: string) => mockPush(path),
  },
}));

// Mock react-native-webview to prevent TurboModule errors
jest.mock('react-native-webview', () => ({
  WebView: 'WebView',
}));

// Mock expo-document-picker
jest.mock('expo-document-picker', () => ({
  getDocumentAsync: jest.fn(() => Promise.resolve({ canceled: true })),
}));

// Mock expo-file-system
jest.mock('expo-file-system', () => ({
  readAsStringAsync: jest.fn(),
  EncodingType: {
    UTF8: 'utf8',
    Base64: 'base64',
  },
}));

// Mock PdfExtractorProvider
jest.mock('../../src/components/PdfExtractorProvider', () => ({
  usePdfExtractor: () => ({
    extractPdf: jest.fn(),
  }),
  PdfExtractorProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

// Mock stores
const mockAddContent = jest.fn(() => ({ id: 'new-content-123' }));
const mockDeleteContent = jest.fn();
const mockImportedContent = [
  {
    id: 'content-1',
    title: 'Test Article',
    content: 'This is test content.',
    wordCount: 50,
    readProgress: 0.5,
    source: 'url',
    createdAt: Date.now(),
  },
];

jest.mock('../../src/store/contentStore', () => ({
  useContentStore: () => ({
    importedContent: mockImportedContent,
    addContent: mockAddContent,
    deleteContent: mockDeleteContent,
  }),
}));

const mockCanAccessContent = jest.fn(() => true);
const mockIncrementContentCount = jest.fn();

jest.mock('../../src/store/subscriptionStore', () => ({
  useSubscriptionStore: () => ({
    canAccessContent: mockCanAccessContent,
    incrementContentCount: mockIncrementContentCount,
    isPremium: false,
  }),
}));

// Mock content extractor
const mockExtractFromUrl = jest.fn();
jest.mock('../../src/services/contentExtractor', () => ({
  extractFromUrl: (url: string) => mockExtractFromUrl(url),
  createFromText: jest.fn(() => ({
    success: true,
    content: {
      id: 'text-123',
      title: 'Pasted Text',
      content: 'Test content.',
      wordCount: 2,
    },
  })),
}));

// Mock EdgeFadeScrollView
jest.mock('../../src/components/common/EdgeFadeScrollView', () => ({
  EdgeFadeScrollView: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock Paywall
jest.mock('../../src/components/paywall/Paywall', () => ({
  Paywall: ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
    if (!visible) return null;
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
    mockCanAccessContent.mockReturnValue(true);
    mockExtractFromUrl.mockResolvedValue({
      success: true,
      content: {
        id: 'extracted-123',
        title: 'Extracted Article',
        content: 'Article content here.',
        wordCount: 100,
      },
    });
  });

  describe('initial rendering', () => {
    it('renders the screen title', () => {
      renderWithProviders(<ReadScreen />);

      expect(screen.getByText('Read')).toBeTruthy();
    });

    it('shows import options', () => {
      renderWithProviders(<ReadScreen />);

      expect(screen.getByText('From URL')).toBeTruthy();
      expect(screen.getByText('Paste Text')).toBeTruthy();
    });

    it('displays existing imported content', () => {
      renderWithProviders(<ReadScreen />);

      expect(screen.getByText('Test Article')).toBeTruthy();
    });

    it('shows word count for imported content', () => {
      renderWithProviders(<ReadScreen />);

      // Word count is shown with icon prefix
      expect(screen.getByText(/50 words/)).toBeTruthy();
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

  describe('content limit', () => {
    it('shows paywall when content limit reached', () => {
      mockCanAccessContent.mockReturnValue(false);
      renderWithProviders(<ReadScreen />);

      const contentItem = screen.getByText('Test Article');
      fireEvent.press(contentItem);

      expect(screen.getByTestId('paywall-modal')).toBeTruthy();
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
});
