// Consumption Mode Types

export interface ImportedContent {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  source: 'url' | 'text' | 'epub' | 'pdf' | 'mobi';
  sourceUrl?: string;
  fileName?: string; // Original filename for e-books
  createdAt: number;
  lastReadAt?: number;
  readProgress: number; // 0-1
  currentWordIndex?: number; // Saved playback position for resume functionality
  processingStatus?: 'processing' | 'ready' | 'error';
  processingProgress?: number; // 0-100 for EPUB/PDF extraction
  processingError?: string;
  processingPayload?: PendingImportPayload;
  // Optional metadata from article extraction
  author?: string; // Article byline
  excerpt?: string; // Article description/subtitle
  siteName?: string; // Source website name
}

export type PendingImportPayload =
  | { type: 'url'; url: string }
  | { type: 'text'; text: string; title?: string }
  | {
      type: 'file';
      uri: string;
      fileName: string;
      mimeType?: string;
      source: 'pdf' | 'epub';
    };

// Chapter metadata for EPUB navigation
export interface ChapterMetadata {
  title: string;
  startCharOffset: number;
  startWordIndex?: number; // Filled in during text processing
}

// Result from e-book parser
export interface EbookParseResult {
  title: string;
  content: string;
  author?: string;
  chapters?: ChapterMetadata[];
}

export interface ContentImportResult {
  success: boolean;
  content?: ImportedContent;
  error?: string;
}
