/**
 * Tests for Language Detection
 *
 * Tests the franc-min wrapper API. The actual language detection
 * is handled by the well-tested franc-min library.
 */

// Mock franc-min to avoid ES module issues in Jest
jest.mock('franc-min', () => ({
  franc: jest.fn((text: string) => {
    // Mock returns ISO 639-3 codes like the real franc
    if (text.includes('quick brown fox')) return 'eng';
    if (text.includes('rápido marrón')) return 'spa';
    if (text.includes('rapide brun')) return 'fra';
    if (text.includes('Lorem ipsum')) return 'und'; // undetermined
    return 'und';
  }),
}));

import { franc } from 'franc-min';
import { detectLanguage, getLanguageScores } from '../../../src/services/language/detection';

describe('detectLanguage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return null for short text', () => {
    const result = detectLanguage('Hi');
    expect(result).toBeNull();
  });

  it('should return null for empty text', () => {
    const result = detectLanguage('');
    expect(result).toBeNull();
  });

  it('should call franc with first 1000 characters', () => {
    const longText = 'The quick brown fox jumps over the lazy dog. '.repeat(100);
    detectLanguage(longText);

    expect(franc).toHaveBeenCalledWith(longText.slice(0, 1000));
  });

  it('should map ISO 639-3 to ISO 639-1 codes', () => {
    // Mock returns 'eng', should map to 'en'
    const result = detectLanguage('The quick brown fox jumps over the lazy dog');
    expect(result).toBe('en');
  });

  it('should return null for undetermined language', () => {
    const result = detectLanguage('Lorem ipsum dolor sit amet');
    expect(result).toBeNull();
  });

  it('should return null for unsupported language codes', () => {
    (franc as jest.Mock).mockReturnValueOnce('cmn'); // Chinese (not in our mapping)
    const result = detectLanguage('Some Chinese text here for testing purposes');
    expect(result).toBeNull();
  });
});

describe('getLanguageScores', () => {
  it('should return empty scores object for compatibility', () => {
    const scores = getLanguageScores('Any text');

    expect(scores).toEqual({
      en: 0,
      es: 0,
      fr: 0,
      de: 0,
      pt: 0,
      it: 0,
    });
  });

  it('should not throw for empty text', () => {
    expect(() => getLanguageScores('')).not.toThrow();
  });
});
