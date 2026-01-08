// PDF Parser Service
// Uses PdfExtractorProvider context for actual extraction
// This module exports a type and utility functions

import { EbookParseResult } from '../types/content';

export interface PdfExtractFunction {
  (fileUri: string): Promise<{
    text: string;
    title?: string;
    pageCount?: number;
    wordCount?: number;
  }>;
}

// Parse PDF using the provided extractor function (from context)
export async function parsePdf(
  fileUri: string,
  extractPdf: PdfExtractFunction
): Promise<EbookParseResult> {
  const result = await extractPdf(fileUri);

  return {
    title: result.title || 'Untitled PDF',
    content: result.text,
  };
}
