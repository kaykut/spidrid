/**
 * Tests for PDF Parser Service.
 *
 * Tests PDF parsing functionality using injected extractor functions.
 * The module uses dependency injection for the actual PDF extraction,
 * making it easy to test without mocking external libraries.
 */

import { parsePdf, PdfExtractFunction } from '../../src/services/pdfParser';
import { EbookParseResult } from '../../src/types/content';

describe('pdfParser', () => {
  describe('parsePdf', () => {
    describe('successful parsing', () => {
      it('returns parsed result with title from extractor', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: 'This is the PDF content.',
          title: 'My PDF Document',
          pageCount: 5,
          wordCount: 100,
        });

        const result = await parsePdf('file:///path/to/document.pdf', mockExtractor);

        expect(result).toEqual<EbookParseResult>({
          title: 'My PDF Document',
          content: 'This is the PDF content.',
        });
      });

      it('calls extractor function with correct file URI', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: 'Content',
          title: 'Title',
        });

        await parsePdf('file:///documents/test.pdf', mockExtractor);

        expect(mockExtractor).toHaveBeenCalledTimes(1);
        expect(mockExtractor).toHaveBeenCalledWith('file:///documents/test.pdf');
      });

      it('handles extractor that returns only text (no optional fields)', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: 'PDF text content only.',
        });

        const result = await parsePdf('file:///path/to/doc.pdf', mockExtractor);

        expect(result.content).toBe('PDF text content only.');
        expect(result.title).toBe('Untitled PDF');
      });

      it('handles empty text from extractor', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: '',
          title: 'Empty Document',
        });

        const result = await parsePdf('file:///empty.pdf', mockExtractor);

        expect(result.content).toBe('');
        expect(result.title).toBe('Empty Document');
      });

      it('handles extractor with pageCount and wordCount metadata', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: 'Document with metadata.',
          title: 'Metadata Test',
          pageCount: 10,
          wordCount: 500,
        });

        const result = await parsePdf('file:///metadata.pdf', mockExtractor);

        // The parsePdf function only extracts title and content
        expect(result).toEqual({
          title: 'Metadata Test',
          content: 'Document with metadata.',
        });
      });
    });

    describe('title fallback behavior', () => {
      it('uses "Untitled PDF" when title is undefined', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: 'Some content',
          title: undefined,
        });

        const result = await parsePdf('file:///no-title.pdf', mockExtractor);

        expect(result.title).toBe('Untitled PDF');
      });

      it('uses "Untitled PDF" when title is not in response', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: 'Content without title field',
        });

        const result = await parsePdf('file:///missing-title.pdf', mockExtractor);

        expect(result.title).toBe('Untitled PDF');
      });

      it('uses provided title when it is an empty string', async () => {
        // This tests the truthiness check - empty string is falsy
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: 'Content',
          title: '',
        });

        const result = await parsePdf('file:///empty-title.pdf', mockExtractor);

        // Empty string is falsy, so it should fall back to 'Untitled PDF'
        expect(result.title).toBe('Untitled PDF');
      });

      it('preserves whitespace-only title', async () => {
        // Whitespace is truthy, so it should be preserved
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: 'Content',
          title: '   ',
        });

        const result = await parsePdf('file:///whitespace-title.pdf', mockExtractor);

        expect(result.title).toBe('   ');
      });
    });

    describe('error handling', () => {
      it('propagates error when extractor throws', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockRejectedValue(
          new Error('Failed to read PDF file')
        );

        await expect(parsePdf('file:///corrupt.pdf', mockExtractor))
          .rejects.toThrow('Failed to read PDF file');
      });

      it('propagates error when extractor throws non-Error', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockRejectedValue(
          'String error message'
        );

        await expect(parsePdf('file:///error.pdf', mockExtractor))
          .rejects.toBe('String error message');
      });

      it('propagates error for file not found', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockRejectedValue(
          new Error('ENOENT: no such file or directory')
        );

        await expect(parsePdf('file:///nonexistent.pdf', mockExtractor))
          .rejects.toThrow('ENOENT: no such file or directory');
      });

      it('propagates error for permission denied', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockRejectedValue(
          new Error('EACCES: permission denied')
        );

        await expect(parsePdf('file:///restricted.pdf', mockExtractor))
          .rejects.toThrow('EACCES: permission denied');
      });

      it('propagates error for corrupted PDF', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockRejectedValue(
          new Error('Invalid PDF structure')
        );

        await expect(parsePdf('file:///corrupted.pdf', mockExtractor))
          .rejects.toThrow('Invalid PDF structure');
      });
    });

    describe('various file URI formats', () => {
      it('handles absolute file URI', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: 'Content',
          title: 'Title',
        });

        await parsePdf('file:///Users/test/Documents/document.pdf', mockExtractor);

        expect(mockExtractor).toHaveBeenCalledWith('file:///Users/test/Documents/document.pdf');
      });

      it('handles file URI with spaces (encoded)', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: 'Content',
          title: 'Title',
        });

        await parsePdf('file:///path/to/my%20document.pdf', mockExtractor);

        expect(mockExtractor).toHaveBeenCalledWith('file:///path/to/my%20document.pdf');
      });

      it('handles file URI with special characters', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: 'Content',
          title: 'Title',
        });

        await parsePdf('file:///path/to/doc%C3%A9ment.pdf', mockExtractor);

        expect(mockExtractor).toHaveBeenCalledWith('file:///path/to/doc%C3%A9ment.pdf');
      });

      it('handles content URI (Android)', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: 'Content',
          title: 'Title',
        });

        await parsePdf('content://com.android.providers.downloads.documents/document/123', mockExtractor);

        expect(mockExtractor).toHaveBeenCalledWith(
          'content://com.android.providers.downloads.documents/document/123'
        );
      });
    });

    describe('content handling', () => {
      it('preserves text content exactly as returned by extractor', async () => {
        const originalText = '  Text with   multiple   spaces  \n\nand newlines\n';
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: originalText,
          title: 'Test',
        });

        const result = await parsePdf('file:///test.pdf', mockExtractor);

        expect(result.content).toBe(originalText);
      });

      it('handles very long text content', async () => {
        const longText = 'word '.repeat(100000);
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: longText,
          title: 'Long Document',
        });

        const result = await parsePdf('file:///long.pdf', mockExtractor);

        expect(result.content).toBe(longText);
        expect(result.content.length).toBe(longText.length);
      });

      it('handles unicode content', async () => {
        const unicodeText = 'Hello World! 你好世界! مرحبا بالعالم! Привет мир! 🌍📚';
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: unicodeText,
          title: 'Unicode Test',
        });

        const result = await parsePdf('file:///unicode.pdf', mockExtractor);

        expect(result.content).toBe(unicodeText);
      });

      it('handles content with special characters', async () => {
        const specialContent = 'Formula: x² + y² = z² | Price: $100 | Email: test@example.com';
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: specialContent,
          title: 'Special Chars',
        });

        const result = await parsePdf('file:///special.pdf', mockExtractor);

        expect(result.content).toBe(specialContent);
      });
    });

    describe('return type conformance', () => {
      it('returns object conforming to EbookParseResult interface', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: 'Test content',
          title: 'Test Title',
        });

        const result = await parsePdf('file:///test.pdf', mockExtractor);

        // Verify the result has required properties
        expect(result).toHaveProperty('title');
        expect(result).toHaveProperty('content');
        expect(typeof result.title).toBe('string');
        expect(typeof result.content).toBe('string');
      });

      it('does not include extra properties from extractor result', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: 'Content',
          title: 'Title',
          pageCount: 100,
          wordCount: 5000,
        });

        const result = await parsePdf('file:///test.pdf', mockExtractor);

        // Result should only have title and content
        expect(Object.keys(result).sort()).toEqual(['content', 'title']);
      });

      it('returns a Promise that resolves to EbookParseResult', async () => {
        const mockExtractor: PdfExtractFunction = jest.fn().mockResolvedValue({
          text: 'Content',
          title: 'Title',
        });

        const resultPromise = parsePdf('file:///test.pdf', mockExtractor);

        expect(resultPromise).toBeInstanceOf(Promise);

        const result = await resultPromise;
        expect(result).toBeDefined();
      });
    });
  });
});
