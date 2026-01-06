// Consumption Mode Types

export interface ImportedContent {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  source: 'url' | 'text';
  sourceUrl?: string;
  createdAt: number;
  lastReadAt?: number;
  readProgress: number; // 0-1
}

export interface ContentImportResult {
  success: boolean;
  content?: ImportedContent;
  error?: string;
}
