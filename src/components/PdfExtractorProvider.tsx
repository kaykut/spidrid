// PDF Extractor Provider - Uses WebView + PDF.js to extract text from PDFs
// This is a context provider that renders a hidden WebView for PDF processing

import React, { createContext, useContext, useRef, useCallback, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { File } from 'expo-file-system';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

// HTML content for PDF extraction (inlined to avoid asset bundling issues)
const PDF_EXTRACTOR_HTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PDF Extractor</title>
</head>
<body>
  <script type="module">
    import * as pdfjsLib from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs';
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs';

    const MIN_TEXT_THRESHOLD = 10;
    const MAX_PAGES = 500;

    function sendMessage(type, data) {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type, ...data }));
      }
    }

    async function extractTextFromPdf(base64Data) {
      try {
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const loadingTask = pdfjsLib.getDocument({ data: bytes });
        const pdf = await loadingTask.promise;

        const numPages = Math.min(pdf.numPages, MAX_PAGES);
        const textParts = [];
        let pagesWithText = 0;
        let totalTextLength = 0;

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();

          const pageText = textContent.items
            .filter(item => item.str && item.str.trim())
            .map(item => item.str)
            .join(' ');

          if (pageText.length >= MIN_TEXT_THRESHOLD) {
            pagesWithText++;
            totalTextLength += pageText.length;
          }

          if (pageText.trim()) {
            textParts.push(pageText);
          }

          if (pageNum % 10 === 0) {
            sendMessage('progress', {
              current: pageNum,
              total: numPages,
              percent: Math.round((pageNum / numPages) * 100)
            });
          }
        }

        const textRatio = pagesWithText / numPages;
        if (numPages > 0 && textRatio < 0.2 && totalTextLength < 500) {
          sendMessage('error', {
            code: 'SCANNED_PDF',
            message: 'This PDF contains scanned images only. Text cannot be extracted. Please use a text-based PDF or convert to EPUB.'
          });
          return;
        }

        const fullText = textParts.join('\\n\\n');

        if (fullText.trim().length < 50) {
          sendMessage('error', {
            code: 'NO_TEXT',
            message: 'No readable text found in this PDF.'
          });
          return;
        }

        let title = null;
        try {
          const metadata = await pdf.getMetadata();
          if (metadata.info && metadata.info.Title) {
            title = metadata.info.Title;
          }
        } catch (e) {}

        sendMessage('success', {
          text: fullText,
          title: title,
          pageCount: numPages,
          wordCount: fullText.split(/\\s+/).filter(w => w.length > 0).length
        });

      } catch (error) {
        let errorCode = 'PARSE_ERROR';
        let errorMessage = 'Could not read this PDF file. It may be corrupted.';

        if (error.name === 'PasswordException' || (error.message && error.message.includes('password'))) {
          errorCode = 'PASSWORD_PROTECTED';
          errorMessage = 'This PDF is password-protected and cannot be imported.';
        } else if (error.name === 'InvalidPDFException') {
          errorCode = 'INVALID_PDF';
          errorMessage = 'This file is not a valid PDF.';
        }

        sendMessage('error', {
          code: errorCode,
          message: errorMessage
        });
      }
    }

    window.addEventListener('message', async (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'extract' && data.base64) {
          sendMessage('started', {});
          await extractTextFromPdf(data.base64);
        }
      } catch (e) {
        sendMessage('error', { code: 'MESSAGE_ERROR', message: 'Failed to process message' });
      }
    });

    document.addEventListener('message', async (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'extract' && data.base64) {
          sendMessage('started', {});
          await extractTextFromPdf(data.base64);
        }
      } catch (e) {
        sendMessage('error', { code: 'MESSAGE_ERROR', message: 'Failed to process message' });
      }
    });

    sendMessage('ready', {});
  </script>
</body>
</html>
`;

export interface PdfExtractionResult {
  text: string;
  title?: string;
  pageCount?: number;
  wordCount?: number;
}

interface PdfExtractorContextType {
  extractPdf: (fileUri: string) => Promise<PdfExtractionResult>;
  isExtracting: boolean;
}

const PdfExtractorContext = createContext<PdfExtractorContextType | null>(null);

export function usePdfExtractor(): PdfExtractorContextType {
  const context = useContext(PdfExtractorContext);
  if (!context) {
    throw new Error('usePdfExtractor must be used within a PdfExtractorProvider');
  }
  return context;
}

interface PendingExtraction {
  resolve: (result: PdfExtractionResult) => void;
  reject: (error: Error) => void;
  timeoutId: ReturnType<typeof setTimeout>;
}

interface Props {
  children: ReactNode;
}

export function PdfExtractorProvider({ children }: Props) {
  const webViewRef = useRef<WebView>(null);
  const pendingRef = useRef<PendingExtraction | null>(null);
  const isReadyRef = useRef(false);
  const [isExtracting, setIsExtracting] = React.useState(false);

  const handleMessage = useCallback((event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      switch (data.type) {
        case 'ready':
          isReadyRef.current = true;
          break;

        case 'success':
          if (pendingRef.current) {
            clearTimeout(pendingRef.current.timeoutId);
            pendingRef.current.resolve({
              text: data.text,
              title: data.title || undefined,
              pageCount: data.pageCount,
              wordCount: data.wordCount,
            });
            pendingRef.current = null;
            setIsExtracting(false);
          }
          break;

        case 'error':
          if (pendingRef.current) {
            clearTimeout(pendingRef.current.timeoutId);
            pendingRef.current.reject(new Error(data.message || 'PDF extraction failed'));
            pendingRef.current = null;
            setIsExtracting(false);
          }
          break;

        case 'progress':
          // Could emit progress events here if needed
          break;

        default:
          // Unknown message type, ignore
          break;
      }
    } catch (_e) {
      // Ignore parse errors
    }
  }, []);

  const extractPdf = useCallback(async (fileUri: string): Promise<PdfExtractionResult> => {
    if (pendingRef.current) {
      throw new Error('PDF extraction already in progress');
    }

    // Read file as base64
    const pdfFile = new File(fileUri);
    const base64 = await pdfFile.base64();

    setIsExtracting(true);

    return new Promise((resolve, reject) => {
      // Set timeout (60 seconds for large PDFs)
      const timeoutId = setTimeout(() => {
        if (pendingRef.current) {
          pendingRef.current = null;
          setIsExtracting(false);
          reject(new Error('PDF extraction timed out. The file may be too large.'));
        }
      }, 60000);

      pendingRef.current = { resolve, reject, timeoutId };

      // Send extraction request to WebView
      if (webViewRef.current) {
        webViewRef.current.postMessage(JSON.stringify({
          type: 'extract',
          base64,
        }));
      } else {
        clearTimeout(timeoutId);
        pendingRef.current = null;
        setIsExtracting(false);
        reject(new Error('PDF extractor not initialized'));
      }
    });
  }, []);

  return (
    <PdfExtractorContext.Provider value={{ extractPdf, isExtracting }}>
      {children}
      <View style={styles.hiddenWebView}>
        <WebView
          ref={webViewRef}
          source={{ html: PDF_EXTRACTOR_HTML }}
          onMessage={handleMessage}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowFileAccess={true}
          mixedContentMode="always"
          onError={(e) => {
            console.error('WebView error:', e.nativeEvent);
          }}
        />
      </View>
    </PdfExtractorContext.Provider>
  );
}

const styles = StyleSheet.create({
  hiddenWebView: {
    height: 0,
    width: 0,
    opacity: 0,
    position: 'absolute',
  },
});
