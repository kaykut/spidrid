// PDF Parser Service
// Uses PdfExtractorProvider context for actual extraction
// This module exports a type and utility functions

import { EbookParseResult } from '../types/content';
import { filterCaptions } from './textUtils';
import { getCurrentAdapter } from './language';
import { LanguageAdapter } from './language/types';

export interface PdfExtractFunction {
  (fileUri: string): Promise<{
    text: string;
    title?: string;
    pageCount?: number;
    wordCount?: number;
  }>;
}

/**
 * Clean PDF-specific artifacts and normalize content for RSVP reading.
 *
 * @param text - Raw PDF text
 * @param adapter - Language adapter for artifact patterns (defaults to current language)
 */
function cleanPdfContent(
  text: string,
  adapter: LanguageAdapter = getCurrentAdapter()
): string {
  let cleaned = text
    // Fix hyphenation at line breaks: "infor-\nmation" → "information"
    .replace(adapter.wordBoundaryHyphenPattern, '$1$2')
    // Normalize whitespace
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();

  // Remove PDF-specific artifacts (line-based) using adapter's patterns
  cleaned = cleaned
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      if (!trimmed) {return true;}
      return !adapter.pdfArtifactPatterns.some(p => p.test(trimmed));
    })
    .join('\n');

  // Apply shared caption filtering
  return filterCaptions(cleaned, adapter);
}

/**
 * Parse PDF using the provided extractor function (from context).
 *
 * @param fileUri - URI of the PDF file
 * @param extractPdf - PDF extraction function
 * @param adapter - Language adapter (defaults to current language)
 */
export async function parsePdf(
  fileUri: string,
  extractPdf: PdfExtractFunction,
  adapter: LanguageAdapter = getCurrentAdapter()
): Promise<EbookParseResult> {
  const result = await extractPdf(fileUri);

  return {
    title: result.title || 'Untitled PDF',
    content: cleanPdfContent(result.text, adapter),
  };
}
