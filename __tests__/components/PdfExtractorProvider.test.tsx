/**
 * Tests for PdfExtractorProvider Component.
 *
 * A React context provider that uses a hidden WebView with PDF.js
 * to extract text from PDF files. Tests cover:
 * - Provider rendering and context value provision
 * - usePdfExtractor hook functionality
 * - PDF extraction flow with WebView message handling
 * - Loading states and error handling
 * - Timeout behavior
 */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import {
  PdfExtractorProvider,
  usePdfExtractor,
  PdfExtractionResult,
} from '../../src/components/PdfExtractorProvider';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// Mock expo-file-system with new File API
const mockBase64 = jest.fn();
jest.mock('expo-file-system', () => ({
  File: jest.fn().mockImplementation(() => ({
    base64: mockBase64,
  })),
}));

// Store WebView component props so we can simulate messages (prefixed with mock for jest hoisting)
const mockCapturedWebViewProps: {
  onMessage?: (event: { nativeEvent: { data: string } }) => void;
  ref?: React.RefObject<{ postMessage: (message: string) => void }>;
  onError?: (e: { nativeEvent: unknown }) => void;
} = {};

// Store postMessage calls for verification (prefixed with mock to satisfy jest hoisting)
const mockPostMessageCalls: string[] = [];

// Mock react-native-webview
jest.mock('react-native-webview', () => {
  const React = require('react');
  const { View } = require('react-native');

  // Create a forwardRef component to capture the ref
  const MockWebView = React.forwardRef(
    (
      props: {
        onMessage?: (event: { nativeEvent: { data: string } }) => void;
        onError?: (e: { nativeEvent: unknown }) => void;
        source?: { html: string };
      },
      ref: React.Ref<{ postMessage: (message: string) => void }>
    ) => {
      // Store props for message simulation
      mockCapturedWebViewProps.onMessage = props.onMessage;
      mockCapturedWebViewProps.onError = props.onError;

      // Set up the ref with postMessage
      React.useImperativeHandle(ref, () => ({
        postMessage: (msg: string) => {
          // Store the call for verification
          mockPostMessageCalls.push(msg);
        },
      }));

      return <View testID="mock-webview" />;
    }
  );

  MockWebView.displayName = 'WebView';

  return {
    WebView: MockWebView,
    WebViewMessageEvent: {},
  };
});

// Helper to simulate WebView sending a message to React Native
const simulateWebViewMessage = (messageData: Record<string, unknown>) => {
  if (mockCapturedWebViewProps?.onMessage) {
    mockCapturedWebViewProps.onMessage({
      nativeEvent: { data: JSON.stringify(messageData) },
    });
  }
};

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// Test component that uses the hook
function TestConsumer({
  onContextReady,
}: {
  onContextReady?: (context: ReturnType<typeof usePdfExtractor>) => void;
}) {
  const context = usePdfExtractor();
  React.useEffect(() => {
    onContextReady?.(context);
  }, [context, onContextReady]);

  return (
    <View testID="test-consumer">
      <Text testID="is-extracting">{context.isExtracting ? 'true' : 'false'}</Text>
      <Text testID="has-extract-pdf">{typeof context.extractPdf === 'function' ? 'true' : 'false'}</Text>
    </View>
  );
}

// Test component that tries to use hook without provider
function HookWithoutProvider() {
  try {
    usePdfExtractor();
    return <Text>No error thrown</Text>;
  } catch (error) {
    return <Text testID="error-message">{(error as Error).message}</Text>;
  }
}

describe('PdfExtractorProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear the captured props
    mockCapturedWebViewProps.onMessage = undefined;
    mockCapturedWebViewProps.onError = undefined;
    mockPostMessageCalls.length = 0;
    mockBase64.mockResolvedValue('base64encodedpdfdata');
  });

  describe('rendering', () => {
    it('renders children', () => {
      renderWithProviders(
        <PdfExtractorProvider>
          <Text testID="child-element">Child Content</Text>
        </PdfExtractorProvider>
      );

      expect(screen.getByTestId('child-element')).toBeTruthy();
      expect(screen.getByText('Child Content')).toBeTruthy();
    });

    it('renders multiple children', () => {
      renderWithProviders(
        <PdfExtractorProvider>
          <Text testID="first-child">First</Text>
          <Text testID="second-child">Second</Text>
        </PdfExtractorProvider>
      );

      expect(screen.getByTestId('first-child')).toBeTruthy();
      expect(screen.getByTestId('second-child')).toBeTruthy();
    });

    it('renders hidden WebView for PDF processing', () => {
      renderWithProviders(
        <PdfExtractorProvider>
          <Text>Content</Text>
        </PdfExtractorProvider>
      );

      expect(screen.getByTestId('mock-webview')).toBeTruthy();
    });
  });

  describe('usePdfExtractor hook', () => {
    it('returns extractPdf function', () => {
      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer />
        </PdfExtractorProvider>
      );

      expect(screen.getByTestId('has-extract-pdf')).toHaveTextContent('true');
    });

    it('returns isExtracting state initially false', () => {
      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer />
        </PdfExtractorProvider>
      );

      expect(screen.getByTestId('is-extracting')).toHaveTextContent('false');
    });

    it('throws error when used outside provider', () => {
      // Suppress console.error for this test since React will log the error
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* noop */ });

      renderWithProviders(<HookWithoutProvider />);

      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'usePdfExtractor must be used within a PdfExtractorProvider'
      );

      consoleSpy.mockRestore();
    });

    it('provides context values to nested components', () => {
      renderWithProviders(
        <PdfExtractorProvider>
          <View>
            <View>
              <TestConsumer />
            </View>
          </View>
        </PdfExtractorProvider>
      );

      expect(screen.getByTestId('has-extract-pdf')).toHaveTextContent('true');
    });
  });

  describe('extractPdf function', () => {
    it('reads file as base64', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      // Wait for context to be ready
      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      // Start extraction without awaiting, then simulate response
      let extractionPromise: Promise<PdfExtractionResult>;
      await act(async () => {
        extractionPromise = extractPdfFn!('file://test.pdf');
        // Allow the promise chain to execute
        await Promise.resolve();
      });

      // Simulate successful response from WebView
      act(() => {
        simulateWebViewMessage({
          type: 'success',
          text: 'Extracted text content',
          title: 'Test PDF',
          pageCount: 5,
          wordCount: 100,
        });
      });

      await extractionPromise!;

      const { File } = require('expo-file-system');
      expect(File).toHaveBeenCalledWith('file://test.pdf');
      expect(mockBase64).toHaveBeenCalled();
    });

    it('sends extraction request to WebView', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      let extractionPromise: Promise<PdfExtractionResult>;
      await act(async () => {
        extractionPromise = extractPdfFn!('file://test.pdf');
        await Promise.resolve();
      });

      act(() => {
        simulateWebViewMessage({
          type: 'success',
          text: 'Content',
          pageCount: 1,
          wordCount: 1,
        });
      });

      await extractionPromise!;

      expect(mockPostMessageCalls).toContain(
        JSON.stringify({
          type: 'extract',
          base64: 'base64encodedpdfdata',
        })
      );
    });

    it('sets isExtracting to true during extraction', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      // Initially false
      expect(screen.getByTestId('is-extracting')).toHaveTextContent('false');

      let extractionPromise: Promise<PdfExtractionResult>;
      await act(async () => {
        extractionPromise = extractPdfFn!('file://test.pdf');
        await Promise.resolve();
      });

      // Should be extracting now
      expect(screen.getByTestId('is-extracting')).toHaveTextContent('true');

      act(() => {
        simulateWebViewMessage({
          type: 'success',
          text: 'Content',
          pageCount: 1,
          wordCount: 1,
        });
      });

      await extractionPromise!;

      // Should be false after completion
      expect(screen.getByTestId('is-extracting')).toHaveTextContent('false');
    });

    it('resolves with extracted text on success', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      let extractionPromise: Promise<PdfExtractionResult>;
      await act(async () => {
        extractionPromise = extractPdfFn!('file://test.pdf');
        await Promise.resolve();
      });

      act(() => {
        simulateWebViewMessage({
          type: 'success',
          text: 'This is the extracted PDF content.',
          title: 'My PDF Document',
          pageCount: 10,
          wordCount: 500,
        });
      });

      const result = await extractionPromise!;

      expect(result).toEqual({
        text: 'This is the extracted PDF content.',
        title: 'My PDF Document',
        pageCount: 10,
        wordCount: 500,
      });
    });

    it('resolves with undefined title when not provided', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      let extractionPromise: Promise<PdfExtractionResult>;
      await act(async () => {
        extractionPromise = extractPdfFn!('file://test.pdf');
        await Promise.resolve();
      });

      act(() => {
        simulateWebViewMessage({
          type: 'success',
          text: 'Content without title',
          title: null,
          pageCount: 1,
          wordCount: 3,
        });
      });

      const result = await extractionPromise!;
      expect(result?.title).toBeUndefined();
    });

    it('throws error when extraction already in progress', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      let firstPromise: Promise<PdfExtractionResult>;
      await act(async () => {
        firstPromise = extractPdfFn!('file://test1.pdf');
        await Promise.resolve();
      });

      // Try to start second extraction while first is in progress
      await expect(extractPdfFn!('file://test2.pdf')).rejects.toThrow(
        'PDF extraction already in progress'
      );

      // Complete first extraction
      act(() => {
        simulateWebViewMessage({
          type: 'success',
          text: 'Content',
          pageCount: 1,
          wordCount: 1,
        });
      });

      await firstPromise!;
    });
  });

  describe('WebView message handling', () => {
    it('handles success message and resolves promise', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      let extractionPromise: Promise<PdfExtractionResult>;
      await act(async () => {
        extractionPromise = extractPdfFn!('file://test.pdf');
        await Promise.resolve();
      });

      act(() => {
        simulateWebViewMessage({
          type: 'success',
          text: 'PDF text content',
          title: 'Test',
          pageCount: 3,
          wordCount: 50,
        });
      });

      const result = await extractionPromise!;
      expect(result?.text).toBe('PDF text content');
    });

    it('handles error message and rejects promise', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      let extractionPromise: Promise<PdfExtractionResult>;
      await act(async () => {
        extractionPromise = extractPdfFn!('file://test.pdf');
        await Promise.resolve();
      });

      act(() => {
        simulateWebViewMessage({
          type: 'error',
          code: 'PASSWORD_PROTECTED',
          message: 'This PDF is password-protected and cannot be imported.',
        });
      });

      await expect(extractionPromise!).rejects.toThrow(
        'This PDF is password-protected and cannot be imported.'
      );
    });

    it('handles error message with default error text', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      let extractionPromise: Promise<PdfExtractionResult>;
      await act(async () => {
        extractionPromise = extractPdfFn!('file://test.pdf');
        await Promise.resolve();
      });

      act(() => {
        simulateWebViewMessage({
          type: 'error',
          code: 'UNKNOWN',
          // No message provided
        });
      });

      await expect(extractionPromise!).rejects.toThrow('PDF extraction failed');
    });

    it('handles scanned PDF error', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      let extractionPromise: Promise<PdfExtractionResult>;
      await act(async () => {
        extractionPromise = extractPdfFn!('file://scanned.pdf');
        await Promise.resolve();
      });

      act(() => {
        simulateWebViewMessage({
          type: 'error',
          code: 'SCANNED_PDF',
          message:
            'This PDF contains scanned images only. Text cannot be extracted.',
        });
      });

      await expect(extractionPromise!).rejects.toThrow(
        'This PDF contains scanned images only. Text cannot be extracted.'
      );
    });

    it('handles invalid PDF error', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      let extractionPromise: Promise<PdfExtractionResult>;
      await act(async () => {
        extractionPromise = extractPdfFn!('file://invalid.pdf');
        await Promise.resolve();
      });

      act(() => {
        simulateWebViewMessage({
          type: 'error',
          code: 'INVALID_PDF',
          message: 'This file is not a valid PDF.',
        });
      });

      await expect(extractionPromise!).rejects.toThrow('This file is not a valid PDF.');
    });

    it('ignores progress messages gracefully', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      let extractionPromise: Promise<PdfExtractionResult>;
      await act(async () => {
        extractionPromise = extractPdfFn!('file://test.pdf');
        await Promise.resolve();
      });

      // Send progress messages - should be ignored
      act(() => {
        simulateWebViewMessage({
          type: 'progress',
          current: 5,
          total: 10,
          percent: 50,
        });
      });

      act(() => {
        simulateWebViewMessage({
          type: 'progress',
          current: 8,
          total: 10,
          percent: 80,
        });
      });

      // Still extracting after progress messages
      expect(screen.getByTestId('is-extracting')).toHaveTextContent('true');

      // Now send success
      act(() => {
        simulateWebViewMessage({
          type: 'success',
          text: 'Content',
          pageCount: 10,
          wordCount: 100,
        });
      });

      await extractionPromise!;

      expect(screen.getByTestId('is-extracting')).toHaveTextContent('false');
    });

    it('ignores unknown message types', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      let extractionPromise: Promise<PdfExtractionResult>;
      await act(async () => {
        extractionPromise = extractPdfFn!('file://test.pdf');
        await Promise.resolve();
      });

      // Send unknown message type
      act(() => {
        simulateWebViewMessage({
          type: 'unknown_type',
          data: 'some data',
        });
      });

      // Still extracting
      expect(screen.getByTestId('is-extracting')).toHaveTextContent('true');

      act(() => {
        simulateWebViewMessage({
          type: 'success',
          text: 'Content',
          pageCount: 1,
          wordCount: 1,
        });
      });

      await extractionPromise!;
    });

    it('ignores malformed JSON messages', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      let extractionPromise: Promise<PdfExtractionResult>;
      await act(async () => {
        extractionPromise = extractPdfFn!('file://test.pdf');
        await Promise.resolve();
      });

      // Send malformed message directly (not valid JSON)
      act(() => {
        if (mockCapturedWebViewProps?.onMessage) {
          mockCapturedWebViewProps.onMessage({
            nativeEvent: { data: 'not valid json {{{' },
          });
        }
      });

      // Should still be extracting (message ignored)
      expect(screen.getByTestId('is-extracting')).toHaveTextContent('true');

      act(() => {
        simulateWebViewMessage({
          type: 'success',
          text: 'Content',
          pageCount: 1,
          wordCount: 1,
        });
      });

      await extractionPromise!;
    });

    it('handles ready message without pending extraction', () => {
      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer />
        </PdfExtractorProvider>
      );

      // Send ready message when no extraction is pending
      // Should not throw
      expect(() => {
        act(() => {
          simulateWebViewMessage({ type: 'ready' });
        });
      }).not.toThrow();
    });
  });

  describe('timeout handling', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('rejects with timeout error after 60 seconds', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      let rejectedError: Error | null = null;
      let extractionPromise: Promise<PdfExtractionResult>;

      await act(async () => {
        extractionPromise = extractPdfFn!('file://large.pdf');
        extractionPromise.catch((e: Error) => {
          rejectedError = e;
        });
        await Promise.resolve();
      });

      // Advance time by 60 seconds
      await act(async () => {
        jest.advanceTimersByTime(60000);
      });

      expect(rejectedError).not.toBeNull();
      expect(rejectedError!.message).toBe(
        'PDF extraction timed out. The file may be too large.'
      );
    });

    it('sets isExtracting to false on timeout', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      let extractionPromise: Promise<PdfExtractionResult>;

      await act(async () => {
        extractionPromise = extractPdfFn!('file://large.pdf');
        extractionPromise.catch(() => { /* ignore rejection */ }); // Ignore rejection
        await Promise.resolve();
      });

      expect(screen.getByTestId('is-extracting')).toHaveTextContent('true');

      await act(async () => {
        jest.advanceTimersByTime(60000);
      });

      expect(screen.getByTestId('is-extracting')).toHaveTextContent('false');
    });

    it('clears timeout on successful extraction', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      let extractionPromise: Promise<PdfExtractionResult>;

      await act(async () => {
        extractionPromise = extractPdfFn!('file://test.pdf');
        await Promise.resolve();
      });

      // Quickly send success before timeout
      act(() => {
        simulateWebViewMessage({
          type: 'success',
          text: 'Content',
          pageCount: 1,
          wordCount: 1,
        });
      });

      await extractionPromise!;

      // Advance past timeout - should not cause any issues
      await act(async () => {
        jest.advanceTimersByTime(70000);
      });

      // Should still be false (not affected by timeout)
      expect(screen.getByTestId('is-extracting')).toHaveTextContent('false');
    });

    it('clears timeout on error', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      let extractionPromise: Promise<PdfExtractionResult>;

      await act(async () => {
        extractionPromise = extractPdfFn!('file://test.pdf');
        await Promise.resolve();
      });

      act(() => {
        simulateWebViewMessage({
          type: 'error',
          message: 'Some error',
        });
      });

      await extractionPromise!.catch(() => { /* ignore rejection */ });

      // Advance past timeout
      await act(async () => {
        jest.advanceTimersByTime(70000);
      });

      expect(screen.getByTestId('is-extracting')).toHaveTextContent('false');
    });
  });

  describe('file reading errors', () => {
    it('throws error when file reading fails', async () => {
      mockBase64.mockRejectedValue(new Error('File not found'));

      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      await expect(extractPdfFn!('file://nonexistent.pdf')).rejects.toThrow(
        'File not found'
      );
    });
  });

  describe('WebView initialization', () => {
    it('handles WebView ready message', () => {
      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer />
        </PdfExtractorProvider>
      );

      // Simulate ready message from WebView
      expect(() => {
        act(() => {
          simulateWebViewMessage({ type: 'ready' });
        });
      }).not.toThrow();
    });
  });

  describe('concurrent usage', () => {
    it('allows new extraction after previous completes', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      // First extraction
      let promise1: Promise<PdfExtractionResult>;
      await act(async () => {
        promise1 = extractPdfFn!('file://first.pdf');
        await Promise.resolve();
      });

      act(() => {
        simulateWebViewMessage({
          type: 'success',
          text: 'First content',
          pageCount: 1,
          wordCount: 2,
        });
      });

      await promise1!;

      // Second extraction should work
      let promise2: Promise<PdfExtractionResult>;
      await act(async () => {
        promise2 = extractPdfFn!('file://second.pdf');
        await Promise.resolve();
      });

      act(() => {
        simulateWebViewMessage({
          type: 'success',
          text: 'Second content',
          pageCount: 2,
          wordCount: 4,
        });
      });

      const result = await promise2!;
      expect(result.text).toBe('Second content');
    });

    it('allows new extraction after previous errors', async () => {
      let extractPdfFn: ((uri: string) => Promise<PdfExtractionResult>) | null = null;

      renderWithProviders(
        <PdfExtractorProvider>
          <TestConsumer
            onContextReady={(ctx) => {
              extractPdfFn = ctx.extractPdf;
            }}
          />
        </PdfExtractorProvider>
      );

      await waitFor(() => {
        expect(extractPdfFn).not.toBeNull();
      });

      // First extraction fails
      let promise1: Promise<PdfExtractionResult>;
      await act(async () => {
        promise1 = extractPdfFn!('file://bad.pdf');
        await Promise.resolve();
      });

      act(() => {
        simulateWebViewMessage({
          type: 'error',
          message: 'Bad PDF',
        });
      });

      await promise1!.catch(() => { /* ignore rejection */ });

      // Second extraction should work
      let promise2: Promise<PdfExtractionResult>;
      await act(async () => {
        promise2 = extractPdfFn!('file://good.pdf');
        await Promise.resolve();
      });

      act(() => {
        simulateWebViewMessage({
          type: 'success',
          text: 'Good content',
          pageCount: 1,
          wordCount: 2,
        });
      });

      const result = await promise2!;
      expect(result.text).toBe('Good content');
    });
  });
});
