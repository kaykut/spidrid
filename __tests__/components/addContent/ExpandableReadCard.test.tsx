/**
 * Tests for ExpandableReadCard Component (async import flow).
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { ExpandableReadCard } from '../../../src/components/addContent/ExpandableReadCard';
import { ThemeProvider } from '../../../src/components/common/ThemeProvider';

// =============================================================================
// Mocks
// =============================================================================

const mockRouterPush = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    push: (path: string) => mockRouterPush(path),
  },
}));

jest.mock('@expo/vector-icons', () => {
  const { View, Text } = require('react-native');
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <View testID={testID || `icon-${name}`}>
        <Text>{name}</Text>
      </View>
    ),
  };
});

jest.mock('../../../src/constants/animations', () => ({
  animateLayout: jest.fn(),
}));

const mockEnqueueImport = jest.fn();
jest.mock('../../../src/services/contentProcessingQueue', () => ({
  enqueueImport: (...args: unknown[]) => mockEnqueueImport(...args),
}));

const mockGetDocumentAsync = jest.fn();
jest.mock('expo-document-picker', () => ({
  getDocumentAsync: (options: unknown) => mockGetDocumentAsync(options),
}));

const mockFileConstructor = FileSystem.File as unknown as jest.Mock;

jest.mock('react-i18next', () => ({
  useTranslation: (_namespace?: string) => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'read.title': 'Read',
        'read.desc': 'Import articles, books, or paste text',
        'read.options.webpage': 'Webpage',
        'read.options.text': 'Text',
        'read.options.ebook': 'E-book',
        'read.placeholders.url': 'Enter URL...',
        'read.placeholders.text': 'Paste your text here...',
        'errors.import_failed': 'Import Failed',
        'errors.extract_content': 'Could not extract content',
        'errors.pick_document': 'Could not pick document',
        error: 'Error',
        'actions.import': 'Import',
        'actions.save_and_read': 'Save & Read',
      };
      return translations[key] || key;
    },
  }),
}));

jest.spyOn(Alert, 'alert');

// =============================================================================
// Helpers
// =============================================================================

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

const defaultProps = {
  isExpanded: false,
  onExpandChange: jest.fn(),
  onClose: jest.fn(),
};

// =============================================================================
// Tests
// =============================================================================

describe('ExpandableReadCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockEnqueueImport.mockReturnValue({ id: 'content-1' });
  });

  it('renders collapsed header content', () => {
    renderWithProviders(<ExpandableReadCard {...defaultProps} />);

    expect(screen.getByText('Read')).toBeTruthy();
    expect(screen.getByText('Import articles, books, or paste text')).toBeTruthy();
  });

  it('expands when header is pressed', () => {
    renderWithProviders(<ExpandableReadCard {...defaultProps} />);

    fireEvent.press(screen.getByText('Read'));
    expect(defaultProps.onExpandChange).toHaveBeenCalledWith(true);
  });

  it('shows options when expanded', () => {
    renderWithProviders(<ExpandableReadCard {...defaultProps} isExpanded={true} />);

    expect(screen.getByText('Webpage')).toBeTruthy();
    expect(screen.getByText('Text')).toBeTruthy();
    expect(screen.getByText('E-book')).toBeTruthy();
  });

  it('enqueues URL import and navigates', async () => {
    renderWithProviders(<ExpandableReadCard {...defaultProps} isExpanded={true} />);

    fireEvent.press(screen.getByText('Webpage'));

    const input = screen.getByPlaceholderText('Enter URL...');
    await act(async () => {
      fireEvent.changeText(input, '  https://example.com  ');
    });

    await act(async () => {
      fireEvent.press(screen.getByText('Import'));
    });

    expect(mockEnqueueImport).toHaveBeenCalledWith(
      { type: 'url', url: 'https://example.com' },
      { title: 'https://example.com', source: 'url', sourceUrl: 'https://example.com' }
    );
    expect(mockRouterPush).toHaveBeenCalledWith('/content/content-1');
    expect(defaultProps.onClose).toHaveBeenCalled();
    expect(defaultProps.onExpandChange).toHaveBeenCalledWith(false);
  });

  it('enqueues text import and navigates', async () => {
    renderWithProviders(<ExpandableReadCard {...defaultProps} isExpanded={true} />);

    fireEvent.press(screen.getByText('Text'));

    const input = screen.getByPlaceholderText('Paste your text here...');
    await act(async () => {
      fireEvent.changeText(input, 'Hello world');
    });

    await act(async () => {
      fireEvent.press(screen.getByText('Save & Read'));
    });

    expect(mockEnqueueImport).toHaveBeenCalledWith(
      { type: 'text', text: 'Hello world' },
      { title: 'Hello world', source: 'text' }
    );
    expect(mockRouterPush).toHaveBeenCalledWith('/content/content-1');
  });

  it('does nothing when document picker is canceled', async () => {
    mockGetDocumentAsync.mockResolvedValueOnce({ canceled: true });

    renderWithProviders(<ExpandableReadCard {...defaultProps} isExpanded={true} />);

    await act(async () => {
      fireEvent.press(screen.getByText('E-book'));
    });

    expect(mockEnqueueImport).not.toHaveBeenCalled();
  });

  it('enqueues PDF import after picking file', async () => {
    const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(1700000000000);
    mockGetDocumentAsync.mockResolvedValueOnce({
      canceled: false,
      assets: [
        {
          uri: 'file:///tmp/sample.pdf',
          name: 'sample.pdf',
          mimeType: 'application/pdf',
        },
      ],
    });

    renderWithProviders(<ExpandableReadCard {...defaultProps} isExpanded={true} />);

    await act(async () => {
      fireEvent.press(screen.getByText('E-book'));
    });

    await waitFor(() => {
      expect(mockFileConstructor).toHaveBeenCalled();
    });

    const destinationFile = mockFileConstructor.mock.results[0]?.value;
    const sourceFile = mockFileConstructor.mock.results[1]?.value;

    expect(mockEnqueueImport).toHaveBeenCalledWith(
      {
        type: 'file',
        uri: destinationFile.uri,
        fileName: 'sample.pdf',
        mimeType: 'application/pdf',
        source: 'pdf',
      },
      {
        title: 'sample.pdf',
        source: 'pdf',
        fileName: 'sample.pdf',
      }
    );
    expect(mockRouterPush).toHaveBeenCalledWith('/content/content-1');
    expect(sourceFile.copy).toHaveBeenCalledWith(destinationFile);
    nowSpy.mockRestore();
  });

  it('shows alert for unsupported ebook formats', async () => {
    mockGetDocumentAsync.mockResolvedValueOnce({
      canceled: false,
      assets: [
        {
          uri: 'file:///tmp/sample.txt',
          name: 'sample.txt',
          mimeType: 'text/plain',
        },
      ],
    });

    renderWithProviders(<ExpandableReadCard {...defaultProps} isExpanded={true} />);

    await act(async () => {
      fireEvent.press(screen.getByText('E-book'));
    });

    expect(Alert.alert).toHaveBeenCalledWith('Import Failed', 'Could not extract content');
    expect(mockEnqueueImport).not.toHaveBeenCalled();
  });

  it('shows alert when document picker throws', async () => {
    mockGetDocumentAsync.mockRejectedValueOnce(new Error('boom'));

    renderWithProviders(<ExpandableReadCard {...defaultProps} isExpanded={true} />);

    await act(async () => {
      fireEvent.press(screen.getByText('E-book'));
    });

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Could not pick document');
  });
});
