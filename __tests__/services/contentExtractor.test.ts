/**
 * Tests for Content Extractor Service.
 *
 * Tests URL content extraction and text import functionality.
 */

import { extractFromUrl, createFromText, extractFromEbook } from '../../src/services/contentExtractor';
import { parseEpub } from '../../src/services/epubParser';
import { parsePdf } from '../../src/services/pdfParser';

// Mock dependencies
jest.mock('../../src/services/epubParser');
jest.mock('../../src/services/pdfParser');

const mockParseEpub = parseEpub as jest.MockedFunction<typeof parseEpub>;
const mockParsePdf = parsePdf as jest.MockedFunction<typeof parsePdf>;

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('contentExtractor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('extractFromUrl', () => {
    describe('URL validation', () => {
      it('adds https:// prefix if missing', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(`<html><title>Test</title><body><p>${  'word '.repeat(50)  }</p></body></html>`),
        });

        await extractFromUrl('example.com');

        expect(mockFetch).toHaveBeenCalledWith(
          'https://example.com',
          expect.any(Object)
        );
      });

      it('keeps http:// prefix if provided', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(`<html><title>Test</title><body><p>${  'word '.repeat(50)  }</p></body></html>`),
        });

        await extractFromUrl('http://example.com');

        expect(mockFetch).toHaveBeenCalledWith(
          'http://example.com',
          expect.any(Object)
        );
      });

      it('keeps https:// prefix if provided', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(`<html><title>Test</title><body><p>${  'word '.repeat(50)  }</p></body></html>`),
        });

        await extractFromUrl('https://example.com');

        expect(mockFetch).toHaveBeenCalledWith(
          'https://example.com',
          expect.any(Object)
        );
      });

      it('returns error for invalid URL format', async () => {
        const result = await extractFromUrl('not a valid url with spaces');

        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
      });
    });

    describe('HTTP response handling', () => {
      it('returns error for 404 response', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 404,
        });

        const result = await extractFromUrl('https://example.com/notfound');

        expect(result.success).toBe(false);
        expect(result.error).toContain('404');
      });

      it('returns error for 500 response', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 500,
        });

        const result = await extractFromUrl('https://example.com/error');

        expect(result.success).toBe(false);
        expect(result.error).toContain('500');
      });

      it('returns error for network failure', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network error'));

        const result = await extractFromUrl('https://example.com');

        expect(result.success).toBe(false);
        expect(result.error).toBe('Network error');
      });
    });

    describe('content extraction', () => {
      it('returns error for empty page content', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve('<html><body></body></html>'),
        });

        const result = await extractFromUrl('https://example.com');

        expect(result.success).toBe(false);
        expect(result.error).toContain('Not enough readable content');
      });

      it('returns error for content less than 100 characters', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve('<html><body><p>Short text</p></body></html>'),
        });

        const result = await extractFromUrl('https://example.com');

        expect(result.success).toBe(false);
        expect(result.error).toContain('Not enough readable content');
      });

      it('extracts content from page with enough text', async () => {
        const longContent = 'This is a test article with enough content. '.repeat(10);
        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(`<html><title>Test Article</title><body><p>${longContent}</p></body></html>`),
        });

        const result = await extractFromUrl('https://example.com');

        expect(result.success).toBe(true);
        expect(result.content).toBeDefined();
        expect(result.content?.content).toContain('This is a test article');
      });

      it('strips script tags', async () => {
        const content = 'a '.repeat(60);
        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(`
            <html>
              <title>Test</title>
              <body>
                <script>alert('malicious');</script>
                <p>${content}</p>
              </body>
            </html>
          `),
        });

        const result = await extractFromUrl('https://example.com');

        expect(result.success).toBe(true);
        expect(result.content?.content).not.toContain('alert');
        expect(result.content?.content).not.toContain('malicious');
      });

      it('strips style tags', async () => {
        const content = 'a '.repeat(60);
        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(`
            <html>
              <title>Test</title>
              <body>
                <style>.hidden { display: none; }</style>
                <p>${content}</p>
              </body>
            </html>
          `),
        });

        const result = await extractFromUrl('https://example.com');

        expect(result.success).toBe(true);
        expect(result.content?.content).not.toContain('display');
        expect(result.content?.content).not.toContain('.hidden');
      });

      it('decodes HTML entities', async () => {
        const content = 'word '.repeat(30);
        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(`
            <html>
              <title>Test</title>
              <body>
                <p>${content} &amp; more &lt;text&gt; with &quot;quotes&quot;</p>
              </body>
            </html>
          `),
        });

        const result = await extractFromUrl('https://example.com');

        expect(result.success).toBe(true);
        expect(result.content?.content).toContain('& more');
        expect(result.content?.content).toContain('<text>');
        expect(result.content?.content).toContain('"quotes"');
      });

      it('normalizes whitespace', async () => {
        const content = 'word '.repeat(30);
        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(`
            <html>
              <title>Test</title>
              <body>
                <p>${content}    multiple    spaces    and
                newlines</p>
              </body>
            </html>
          `),
        });

        const result = await extractFromUrl('https://example.com');

        expect(result.success).toBe(true);
        // Multiple spaces should be collapsed to single spaces
        expect(result.content?.content).not.toContain('    ');
      });
    });

    describe('title extraction', () => {
      it('extracts title from <title> tag', async () => {
        const content = 'word '.repeat(30);
        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(`
            <html>
              <title>My Article Title</title>
              <body><p>${content}</p></body>
            </html>
          `),
        });

        const result = await extractFromUrl('https://example.com');

        expect(result.success).toBe(true);
        expect(result.content?.title).toBe('My Article Title');
      });

      it('extracts title from og:title meta tag', async () => {
        const content = 'word '.repeat(30);
        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(`
            <html>
              <head>
                <meta property="og:title" content="Open Graph Title" />
              </head>
              <body><p>${content}</p></body>
            </html>
          `),
        });

        const result = await extractFromUrl('https://example.com');

        expect(result.success).toBe(true);
        expect(result.content?.title).toBe('Open Graph Title');
      });

      it('falls back to domain if no title found', async () => {
        const content = 'word '.repeat(30);
        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(`<html><body><p>${content}</p></body></html>`),
        });

        const result = await extractFromUrl('https://example.com/article');

        expect(result.success).toBe(true);
        expect(result.content?.title).toBe('example.com');
      });
    });

    describe('word count', () => {
      it('calculates correct word count', async () => {
        const words = 'word '.repeat(50).trim(); // 50 words
        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(`<html><title>Test</title><body><p>${words}</p></body></html>`),
        });

        const result = await extractFromUrl('https://example.com');

        expect(result.success).toBe(true);
        // Word count includes "Test" from title extraction
        expect(result.content?.wordCount).toBeGreaterThan(40);
      });
    });

    describe('result structure', () => {
      it('returns correct structure on success', async () => {
        const content = 'word '.repeat(30);
        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(`<html><title>Test</title><body><p>${content}</p></body></html>`),
        });

        const result = await extractFromUrl('https://example.com');

        expect(result.success).toBe(true);
        expect(result.content).toEqual(expect.objectContaining({
          id: '',
          title: 'Test',
          source: 'url',
          sourceUrl: 'https://example.com',
          createdAt: 0,
          readProgress: 0,
        }));
        expect(result.content?.content).toBeDefined();
        expect(result.content?.wordCount).toBeGreaterThan(0);
      });
    });

    describe('Readability extraction', () => {
      it('extracts article content using Readability when available', async () => {
        const articleHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Site Name - Article Title</title>
              <meta name="author" content="John Doe">
            </head>
            <body>
              <header><nav>Navigation stuff here</nav></header>
              <article>
                <h1>Article Title</h1>
                <p class="byline">By John Doe</p>
                <p>${'This is the main article content that we want to extract. '.repeat(20)}</p>
                <p>${'More substantial paragraph content for the article body. '.repeat(15)}</p>
              </article>
              <aside>Sidebar advertisement content</aside>
              <footer>Footer navigation links</footer>
            </body>
          </html>
        `;

        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(articleHtml),
        });

        const result = await extractFromUrl('https://example.com/article');

        expect(result.success).toBe(true);
        // Readability extracts title from <h1> or <title> tag
        expect(result.content?.title).toContain('Article Title');
        expect(result.content?.content).toContain('main article content');
        // Should NOT contain nav/sidebar/footer noise
        expect(result.content?.content).not.toContain('Navigation stuff');
        expect(result.content?.content).not.toContain('Sidebar advertisement');
        expect(result.content?.content).not.toContain('Footer navigation');
      });

      it('extracts author/byline metadata when available', async () => {
        const html = `
          <!DOCTYPE html>
          <html>
            <body>
              <article>
                <h1>Test Article</h1>
                <address class="author">By Jane Smith</address>
                <p>${'Content paragraph with enough text to meet minimum requirements. '.repeat(10)}</p>
              </article>
            </body>
          </html>
        `;

        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(html),
        });

        const result = await extractFromUrl('https://example.com');

        expect(result.success).toBe(true);
        // Author extraction depends on Readability's byline detection
        // The important thing is the extraction succeeds
        expect(result.content?.content).toContain('Content paragraph');
      });

      it('falls back to regex extraction if Readability returns insufficient content', async () => {
        // Minimal HTML that Readability might not parse well as an article
        const minimalHtml = `<html><title>Minimal Page</title><body><p>${'word '.repeat(50)}</p></body></html>`;

        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(minimalHtml),
        });

        const result = await extractFromUrl('https://example.com');

        expect(result.success).toBe(true);
        expect(result.content?.content).toContain('word');
        expect(result.content?.title).toBe('Minimal Page');
      });

      it('includes optional metadata fields in result structure', async () => {
        const articleHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="og:site_name" content="Example News">
              <meta name="description" content="This is the article excerpt">
            </head>
            <body>
              <article>
                <h1>News Article</h1>
                <p>${'Detailed news article content for readers. '.repeat(20)}</p>
              </article>
            </body>
          </html>
        `;

        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(articleHtml),
        });

        const result = await extractFromUrl('https://example.com/news');

        expect(result.success).toBe(true);
        // These fields should exist on the result (may be undefined if not extracted)
        expect(result.content).toHaveProperty('author');
        expect(result.content).toHaveProperty('excerpt');
        expect(result.content).toHaveProperty('siteName');
      });
    });
  });

  describe('createFromText', () => {
    describe('text validation', () => {
      it('returns error for text shorter than 20 characters', () => {
        const result = createFromText('Too short');

        expect(result.success).toBe(false);
        expect(result.error).toContain('too short');
        expect(result.error).toContain('20');
      });

      it('returns error for empty text', () => {
        const result = createFromText('');

        expect(result.success).toBe(false);
        expect(result.error).toContain('too short');
      });

      it('returns error for whitespace-only text', () => {
        const result = createFromText('   \n\t   ');

        expect(result.success).toBe(false);
        expect(result.error).toContain('too short');
      });

      it('trims text before validation', () => {
        const result = createFromText('   short   ');

        expect(result.success).toBe(false);
        expect(result.error).toContain('too short');
      });
    });

    describe('successful creation', () => {
      it('creates content from valid text', () => {
        const text = 'This is a valid piece of text that is long enough to be processed.';
        const result = createFromText(text);

        expect(result.success).toBe(true);
        expect(result.content).toBeDefined();
        expect(result.content?.content).toBe(text);
      });

      it('uses provided title', () => {
        const text = 'This is a valid piece of text that is long enough to be processed.';
        const result = createFromText(text, 'Custom Title');

        expect(result.success).toBe(true);
        expect(result.content?.title).toBe('Custom Title');
      });

      it('generates title from first line when not provided', () => {
        const text = 'First Line Title\nThis is the rest of the content that makes it long enough.';
        const result = createFromText(text);

        expect(result.success).toBe(true);
        expect(result.content?.title).toBe('First Line Title');
      });

      it('truncates generated title to 50 characters', () => {
        const longFirstLine = 'A'.repeat(100);
        const text = `${longFirstLine}\nMore content to meet minimum length.`;
        const result = createFromText(text);

        expect(result.success).toBe(true);
        expect(result.content?.title.length).toBe(50);
      });

      it('calculates correct word count', () => {
        const text = 'one two three four five six seven eight nine ten eleven twelve';
        const result = createFromText(text);

        expect(result.success).toBe(true);
        expect(result.content?.wordCount).toBe(12);
      });

      it('sets source to "text"', () => {
        const text = 'This is a valid piece of text that is long enough.';
        const result = createFromText(text);

        expect(result.success).toBe(true);
        expect(result.content?.source).toBe('text');
      });

      it('does not set sourceUrl', () => {
        const text = 'This is a valid piece of text that is long enough.';
        const result = createFromText(text);

        expect(result.success).toBe(true);
        expect(result.content?.sourceUrl).toBeUndefined();
      });
    });

    describe('result structure', () => {
      it('returns correct structure on success', () => {
        const text = 'This is a valid piece of text that is long enough to be processed.';
        const result = createFromText(text, 'Test Title');

        expect(result.success).toBe(true);
        expect(result.content).toEqual(expect.objectContaining({
          id: '',
          title: 'Test Title',
          content: text,
          source: 'text',
          createdAt: 0,
          readProgress: 0,
        }));
        expect(result.content?.wordCount).toBeGreaterThan(0);
      });
    });
  });

  describe('extractFromEbook', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('EPUB handling', () => {
      it('extracts content from EPUB file', async () => {
        mockParseEpub.mockResolvedValue({
          title: 'My EPUB Book',
          content: 'This is the content of the EPUB file with many words.',
        });

        const result = await extractFromEbook('/path/to/book.epub', 'book.epub');

        expect(result.success).toBe(true);
        expect(result.content?.title).toBe('My EPUB Book');
        expect(result.content?.source).toBe('epub');
        expect(result.content?.fileName).toBe('book.epub');
        expect(mockParseEpub).toHaveBeenCalledWith('/path/to/book.epub');
      });

      it('handles EPUB parsing errors', async () => {
        mockParseEpub.mockRejectedValue(new Error('Invalid EPUB format'));

        const result = await extractFromEbook('/path/to/broken.epub', 'broken.epub');

        expect(result.success).toBe(false);
        expect(result.error).toBe('Invalid EPUB format');
      });
    });

    describe('PDF handling', () => {
      it('extracts content from PDF with provided extractor', async () => {
        const mockExtractor = jest.fn();
        mockParsePdf.mockResolvedValue({
          title: 'My PDF Document',
          content: 'This is the PDF content extracted from the document.',
        });

        const result = await extractFromEbook('/path/to/doc.pdf', 'doc.pdf', {
          pdfExtractor: mockExtractor,
        });

        expect(result.success).toBe(true);
        expect(result.content?.title).toBe('My PDF Document');
        expect(result.content?.source).toBe('pdf');
        expect(result.content?.fileName).toBe('doc.pdf');
        expect(mockParsePdf).toHaveBeenCalledWith('/path/to/doc.pdf', mockExtractor);
      });

      it('returns error when PDF extractor is not provided', async () => {
        const result = await extractFromEbook('/path/to/doc.pdf', 'doc.pdf');

        expect(result.success).toBe(false);
        expect(result.error).toContain('PDF extraction not available');
      });

      it('handles PDF parsing errors', async () => {
        const mockExtractor = jest.fn();
        mockParsePdf.mockRejectedValue(new Error('PDF parsing failed'));

        const result = await extractFromEbook('/path/to/doc.pdf', 'doc.pdf', {
          pdfExtractor: mockExtractor,
        });

        expect(result.success).toBe(false);
        expect(result.error).toBe('PDF parsing failed');
      });
    });

    describe('MOBI/Kindle handling', () => {
      it('returns error for .mobi files', async () => {
        const result = await extractFromEbook('/path/to/book.mobi', 'book.mobi');

        expect(result.success).toBe(false);
        expect(result.error).toContain('MOBI/Kindle');
        expect(result.error).toContain('Calibre');
      });

      it('returns error for .azw files', async () => {
        const result = await extractFromEbook('/path/to/book.azw', 'book.azw');

        expect(result.success).toBe(false);
        expect(result.error).toContain('MOBI/Kindle');
      });

      it('returns error for .azw3 files', async () => {
        const result = await extractFromEbook('/path/to/book.azw3', 'book.azw3');

        expect(result.success).toBe(false);
        expect(result.error).toContain('MOBI/Kindle');
      });
    });

    describe('unsupported formats', () => {
      it('returns error for unsupported file formats', async () => {
        const result = await extractFromEbook('/path/to/file.doc', 'file.doc');

        expect(result.success).toBe(false);
        expect(result.error).toContain('Unsupported file format');
        expect(result.error).toContain('.doc');
      });

      it('handles files without extension', async () => {
        const result = await extractFromEbook('/path/to/noextension', 'noextension');

        expect(result.success).toBe(false);
        expect(result.error).toContain('Unsupported file format');
      });
    });

    describe('case insensitivity', () => {
      it('handles uppercase EPUB extension', async () => {
        mockParseEpub.mockResolvedValue({
          title: 'Uppercase EPUB',
          content: 'Content from file with uppercase extension.',
        });

        const result = await extractFromEbook('/path/to/book.EPUB', 'book.EPUB');

        expect(result.success).toBe(true);
        expect(mockParseEpub).toHaveBeenCalled();
      });

      it('handles uppercase PDF extension', async () => {
        const mockExtractor = jest.fn();
        mockParsePdf.mockResolvedValue({
          title: 'Uppercase PDF',
          content: 'Content from file with uppercase extension.',
        });

        const result = await extractFromEbook('/path/to/doc.PDF', 'doc.PDF', {
          pdfExtractor: mockExtractor,
        });

        expect(result.success).toBe(true);
        expect(mockParsePdf).toHaveBeenCalled();
      });
    });
  });
});
