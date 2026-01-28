import { useContentStore } from '../store/contentStore';
import { ImportedContent, PendingImportPayload } from '../types/content';
import { extractFromUrl, createFromText } from './contentExtractor';
import { parseEpub } from './epubParser';
import { parsePdf, PdfExtractFunction } from './pdfParser';

type PdfExtractorWithProgress = (
  fileUri: string,
  onProgress: (percent: number) => void
) => Promise<{ text: string; title?: string; pageCount?: number; wordCount?: number }>;

let isProcessing = false;
let pdfExtractorWithProgress: PdfExtractorWithProgress | null = null;

function countWords(text: string): number {
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

function toPendingTitle(payload: PendingImportPayload): string {
  switch (payload.type) {
    case 'url':
      return payload.url;
    case 'text': {
      const firstLine = payload.text.trim().split('\n')[0]?.trim();
      return firstLine ? firstLine.slice(0, 60) : 'Pasted Text';
    }
    case 'file': {
      return payload.fileName;
    }
    default:
      return 'Imported Content';
  }
}

export function registerPdfExtractor(extractor: PdfExtractorWithProgress): void {
  pdfExtractorWithProgress = extractor;
  void processPendingContent();
}

export function enqueueImport(
  payload: PendingImportPayload,
  metadata?: {
    title?: string;
    source?: ImportedContent['source'];
    sourceUrl?: string;
    fileName?: string;
  }
): ImportedContent {
  const inferredTitle = metadata?.title ?? toPendingTitle(payload);
  const getSource = () => {
    if (metadata?.source) { return metadata.source; }
    if (payload.type === 'url') { return 'url'; }
    if (payload.type === 'text') { return 'text'; }
    return payload.source;
  };
  const source = getSource();

  const content = useContentStore.getState().enqueueContent(payload, {
    title: inferredTitle,
    source,
    sourceUrl: metadata?.sourceUrl,
    fileName: metadata?.fileName ?? (payload.type === 'file' ? payload.fileName : undefined),
  });

  void processPendingContent();
  return content;
}

async function processPendingItem(item: ImportedContent): Promise<void> {
  const { finalizeContent, updateProcessingProgress, markProcessingError } = useContentStore.getState();
  const payload = item.processingPayload;

  if (!payload) {
    markProcessingError(item.id, 'Missing import payload.');
    return;
  }

  try {
    if (payload.type === 'url') {
      const result = await extractFromUrl(payload.url);
      if (result.success && result.content) {
        const {
          id: _id,
          createdAt: _createdAt,
          readProgress: _readProgress,
          currentWordIndex: _currentWordIndex,
          lastReadAt: _lastReadAt,
          processingStatus: _processingStatus,
          processingProgress: _processingProgress,
          processingError: _processingError,
          processingPayload: _processingPayload,
          ...cleanContent
        } = result.content;
        finalizeContent(item.id, cleanContent);
        return;
      }
      markProcessingError(item.id, result.error || 'Failed to import URL.');
      return;
    }

    if (payload.type === 'text') {
      const result = createFromText(payload.text, payload.title);
      if (result.success && result.content) {
        const {
          id: _id,
          createdAt: _createdAt,
          readProgress: _readProgress,
          currentWordIndex: _currentWordIndex,
          lastReadAt: _lastReadAt,
          processingStatus: _processingStatus,
          processingProgress: _processingProgress,
          processingError: _processingError,
          processingPayload: _processingPayload,
          ...cleanContent
        } = result.content;
        finalizeContent(item.id, cleanContent);
        return;
      }
      markProcessingError(item.id, result.error || 'Failed to import text.');
      return;
    }

    if (payload.type === 'file') {
      if (payload.source === 'pdf') {
        const extractor = pdfExtractorWithProgress;
        if (!extractor) {
          return;
        }

        const extractPdf: PdfExtractFunction = (fileUri: string) => {
          return extractor(fileUri, (percent) => {
            updateProcessingProgress(item.id, percent);
          });
        };

        const result = await parsePdf(payload.uri, extractPdf);
        finalizeContent(item.id, {
          title: result.title,
          content: result.content,
          wordCount: countWords(result.content),
          source: 'pdf',
          fileName: payload.fileName,
        });
        return;
      }

      if (payload.source === 'epub') {
        const result = await parseEpub(payload.uri, {
          onProgress: (percent) => updateProcessingProgress(item.id, percent),
        });

        finalizeContent(item.id, {
          title: result.title,
          content: result.content,
          wordCount: countWords(result.content),
          source: 'epub',
          fileName: payload.fileName,
          author: result.author,
        });
        return;
      }

      markProcessingError(item.id, 'Unsupported file type.');
      return;
    }
  } catch (error) {
    markProcessingError(
      item.id,
      error instanceof Error ? error.message : 'Failed to process content.'
    );
  }
}

export async function processPendingContent(): Promise<void> {
  if (isProcessing) {
    return;
  }

  isProcessing = true;
  try {
    while (true) {
      const { importedContent } = useContentStore.getState();
      const pendingItem = importedContent.find((item) => {
        if ((item.processingStatus ?? 'ready') !== 'processing') {
          return false;
        }
        const payload = item.processingPayload;
        if (payload?.type === 'file' && payload.source === 'pdf' && !pdfExtractorWithProgress) {
          return false;
        }
        return true;
      });

      if (!pendingItem) {
        break;
      }

      await processPendingItem(pendingItem);
    }
  } finally {
    isProcessing = false;
  }
}
