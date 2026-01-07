/**
 * Tests for Content Extractor Service.
 *
 * Tests URL content extraction and text import functionality.
 */

import { extractFromUrl, createFromText } from '../../src/services/contentExtractor';

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
          text: () => Promise.resolve('<html><title>Test</title><body><p>' + 'word '.repeat(50) + '</p></body></html>'),
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
          text: () => Promise.resolve('<html><title>Test</title><body><p>' + 'word '.repeat(50) + '</p></body></html>'),
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
          text: () => Promise.resolve('<html><title>Test</title><body><p>' + 'word '.repeat(50) + '</p></body></html>'),
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
});
