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
  // Optional metadata from article extraction
  author?: string; // Article byline
  excerpt?: string; // Article description/subtitle
  siteName?: string; // Source website name
}

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
