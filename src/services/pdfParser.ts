// PDF Parser Service
// Uses PdfExtractorProvider context for actual extraction
// This module exports a type and utility functions

import { EbookParseResult } from '../types/content';
import { filterCaptions } from './contentExtractor';

export interface PdfExtractFunction {
  (fileUri: string): Promise<{
    text: string;
    title?: string;
    pageCount?: number;
    wordCount?: number;
  }>;
}

// Clean PDF-specific artifacts and normalize content for RSVP reading
function cleanPdfContent(text: string): string {
  // PDF-specific artifact patterns
  const pdfArtifactPatterns = [
    /^(Page\s*)?\d+(\s*(of|\/)\s*\d+)?$/i, // "1", "Page 1", "1 of 10"
    /^-\s*\d+\s*-$/, // "- 1 -"
    /^\[\d+\]$/, // "[1]" standalone footnote refs
    /^(Figure|Fig\.|Table|Tab\.)\s*\d+(\.\d+)?\.?$/i, // "Figure 1" standalone
  ];

  let cleaned = text
    // Fix hyphenation at line breaks: "infor-\nmation" → "information"
    .replace(/(\w)-\n(\w)/g, '$1$2')
    // Normalize whitespace
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();

  // Remove PDF-specific artifacts (line-based)
  cleaned = cleaned
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      if (!trimmed) return true;
      return !pdfArtifactPatterns.some(p => p.test(trimmed));
    })
    .join('\n');

  // Apply shared caption filtering
  return filterCaptions(cleaned);
}

// Parse PDF using the provided extractor function (from context)
export async function parsePdf(
  fileUri: string,
  extractPdf: PdfExtractFunction
): Promise<EbookParseResult> {
  const result = await extractPdf(fileUri);

  return {
    title: result.title || 'Untitled PDF',
    content: cleanPdfContent(result.text),
  };
}
