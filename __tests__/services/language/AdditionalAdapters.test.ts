/**
 * Tests for Additional Language Adapters (Spanish, French, German, Portuguese, Italian)
 */

import { spanishAdapter, SpanishAdapter } from '../../../src/services/language/adapters/SpanishAdapter';
import { frenchAdapter, FrenchAdapter } from '../../../src/services/language/adapters/FrenchAdapter';
import { germanAdapter, GermanAdapter } from '../../../src/services/language/adapters/GermanAdapter';
import { portugueseAdapter, PortugueseAdapter } from '../../../src/services/language/adapters/PortugueseAdapter';
import { italianAdapter, ItalianAdapter } from '../../../src/services/language/adapters/ItalianAdapter';

describe('SpanishAdapter', () => {
  describe('basic properties', () => {
    it('should have correct language code', () => {
      expect(spanishAdapter.code).toBe('es');
    });

    it('should have correct language name', () => {
      expect(spanishAdapter.name).toBe('Spanish');
    });

    it('should be an instance of SpanishAdapter', () => {
      expect(spanishAdapter).toBeInstanceOf(SpanishAdapter);
    });
  });

  describe('hyphenateSync', () => {
    it('should split Spanish words into syllables', () => {
      const result = spanishAdapter.hyphenateSync('conocimiento');
      expect(result.syllables.length).toBeGreaterThan(1);
      expect(result.syllables.join('')).toBe('conocimiento');
    });

    it('should handle words with ñ', () => {
      const result = spanishAdapter.hyphenateSync('español');
      expect(result.syllables.join('')).toBe('español');
    });

    it('should handle words with accented vowels', () => {
      const result = spanishAdapter.hyphenateSync('información');
      expect(result.syllables.join('')).toBe('información');
    });
  });

  describe('letterPattern', () => {
    it('should match ñ', () => {
      expect(spanishAdapter.letterPattern.test('ñ')).toBe(true);
      expect(spanishAdapter.letterPattern.test('Ñ')).toBe(true);
    });

    it('should match accented vowels', () => {
      expect(spanishAdapter.letterPattern.test('á')).toBe(true);
      expect(spanishAdapter.letterPattern.test('é')).toBe(true);
      expect(spanishAdapter.letterPattern.test('í')).toBe(true);
      expect(spanishAdapter.letterPattern.test('ó')).toBe(true);
      expect(spanishAdapter.letterPattern.test('ú')).toBe(true);
      expect(spanishAdapter.letterPattern.test('ü')).toBe(true);
    });

    it('should not match inverted punctuation', () => {
      expect(spanishAdapter.letterPattern.test('¿')).toBe(false);
      expect(spanishAdapter.letterPattern.test('¡')).toBe(false);
    });
  });

  describe('sentenceStartPattern', () => {
    it('should match inverted question mark', () => {
      expect(spanishAdapter.sentenceStartPattern?.test('¿Cómo')).toBe(true);
    });

    it('should match inverted exclamation mark', () => {
      expect(spanishAdapter.sentenceStartPattern?.test('¡Hola')).toBe(true);
    });
  });

  describe('captionKeywords', () => {
    it('should include Spanish caption keywords', () => {
      expect(spanishAdapter.captionKeywords).toContain('Foto');
      expect(spanishAdapter.captionKeywords).toContain('Imagen');
      expect(spanishAdapter.captionKeywords).toContain('Fotografía');
    });
  });

  describe('pdfArtifactPatterns', () => {
    it('should match Spanish page indicators', () => {
      const patterns = spanishAdapter.pdfArtifactPatterns;
      const pagePattern = patterns[0];
      expect(pagePattern.test('Página 1')).toBe(true);
      expect(pagePattern.test('1 de 10')).toBe(true);
    });

    it('should match Spanish figure references', () => {
      const patterns = spanishAdapter.pdfArtifactPatterns;
      const figurePattern = patterns.find(p => p.source.includes('Figura'));
      expect(figurePattern?.test('Figura 1')).toBe(true);
      expect(figurePattern?.test('Tabla 2.1')).toBe(true);
    });
  });

  describe('compoundPrefixes', () => {
    it('should include language-specific Spanish prefixes', () => {
      expect(spanishAdapter.compoundPrefixes).toContain('sobre');
      expect(spanishAdapter.compoundPrefixes).toContain('contra');
      expect(spanishAdapter.compoundPrefixes).toContain('entre');
      expect(spanishAdapter.compoundPrefixes).toContain('des');
    });

    it('should inherit Greek/Latin prefixes from BaseLatinAdapter', () => {
      expect(spanishAdapter.compoundPrefixes).toContain('photo');
      expect(spanishAdapter.compoundPrefixes).toContain('anti');
    });

    it('should have comprehensive prefix list (>46)', () => {
      expect(spanishAdapter.compoundPrefixes.length).toBeGreaterThan(46);
    });
  });
});

describe('FrenchAdapter', () => {
  describe('basic properties', () => {
    it('should have correct language code', () => {
      expect(frenchAdapter.code).toBe('fr');
    });

    it('should have correct language name', () => {
      expect(frenchAdapter.name).toBe('French');
    });

    it('should be an instance of FrenchAdapter', () => {
      expect(frenchAdapter).toBeInstanceOf(FrenchAdapter);
    });
  });

  describe('hyphenateSync', () => {
    it('should split French words into syllables', () => {
      const result = frenchAdapter.hyphenateSync('compréhension');
      expect(result.syllables.length).toBeGreaterThan(1);
      expect(result.syllables.join('')).toBe('compréhension');
    });

    it('should handle words with ç', () => {
      const result = frenchAdapter.hyphenateSync('français');
      expect(result.syllables.join('')).toBe('français');
    });
  });

  describe('letterPattern', () => {
    it('should match œ ligature', () => {
      expect(frenchAdapter.letterPattern.test('œ')).toBe(true);
      expect(frenchAdapter.letterPattern.test('Œ')).toBe(true);
    });

    it('should match æ ligature', () => {
      expect(frenchAdapter.letterPattern.test('æ')).toBe(true);
      expect(frenchAdapter.letterPattern.test('Æ')).toBe(true);
    });

    it('should match ç cedilla', () => {
      expect(frenchAdapter.letterPattern.test('ç')).toBe(true);
      expect(frenchAdapter.letterPattern.test('Ç')).toBe(true);
    });

    it('should match accented characters', () => {
      expect(frenchAdapter.letterPattern.test('é')).toBe(true);
      expect(frenchAdapter.letterPattern.test('è')).toBe(true);
      expect(frenchAdapter.letterPattern.test('ê')).toBe(true);
      expect(frenchAdapter.letterPattern.test('ë')).toBe(true);
      expect(frenchAdapter.letterPattern.test('à')).toBe(true);
      expect(frenchAdapter.letterPattern.test('ù')).toBe(true);
      expect(frenchAdapter.letterPattern.test('î')).toBe(true);
      expect(frenchAdapter.letterPattern.test('ÿ')).toBe(true);
    });
  });

  describe('captionKeywords', () => {
    it('should include French caption keywords', () => {
      expect(frenchAdapter.captionKeywords).toContain('Photo');
      expect(frenchAdapter.captionKeywords).toContain('Image');
      expect(frenchAdapter.captionKeywords).toContain('Graphique');
      expect(frenchAdapter.captionKeywords).toContain('Schéma');
    });
  });

  describe('pdfArtifactPatterns', () => {
    it('should match French page indicators', () => {
      const patterns = frenchAdapter.pdfArtifactPatterns;
      const pagePattern = patterns[0];
      expect(pagePattern.test('Page 1')).toBe(true);
      expect(pagePattern.test('1 de 10')).toBe(true);
    });

    it('should match French figure references', () => {
      const patterns = frenchAdapter.pdfArtifactPatterns;
      const figurePattern = patterns.find(p => p.source.includes('Tableau'));
      expect(figurePattern?.test('Figure 1')).toBe(true);
      expect(figurePattern?.test('Tableau 2')).toBe(true);
    });
  });

  describe('compoundPrefixes', () => {
    it('should include language-specific French prefixes', () => {
      expect(frenchAdapter.compoundPrefixes).toContain('contre');
      expect(frenchAdapter.compoundPrefixes).toContain('arrière');
      expect(frenchAdapter.compoundPrefixes).toContain('avant');
      expect(frenchAdapter.compoundPrefixes).toContain('après');
    });

    it('should inherit Greek/Latin prefixes from BaseLatinAdapter', () => {
      expect(frenchAdapter.compoundPrefixes).toContain('photo');
      expect(frenchAdapter.compoundPrefixes).toContain('anti');
    });

    it('should have comprehensive prefix list (>46)', () => {
      expect(frenchAdapter.compoundPrefixes.length).toBeGreaterThan(46);
    });
  });
});

describe('GermanAdapter', () => {
  describe('basic properties', () => {
    it('should have correct language code', () => {
      expect(germanAdapter.code).toBe('de');
    });

    it('should have correct language name', () => {
      expect(germanAdapter.name).toBe('German');
    });

    it('should be an instance of GermanAdapter', () => {
      expect(germanAdapter).toBeInstanceOf(GermanAdapter);
    });
  });

  describe('hyphenateSync', () => {
    it('should split German words into syllables', () => {
      const result = germanAdapter.hyphenateSync('Verständnis');
      expect(result.syllables.length).toBeGreaterThan(1);
      expect(result.syllables.join('')).toBe('Verständnis');
    });

    it('should handle words with ß', () => {
      const result = germanAdapter.hyphenateSync('Straße');
      expect(result.syllables.join('')).toBe('Straße');
    });

    it('should handle compound words', () => {
      const result = germanAdapter.hyphenateSync('Geschwindigkeit');
      expect(result.syllables.length).toBeGreaterThan(1);
      expect(result.syllables.join('')).toBe('Geschwindigkeit');
    });
  });

  describe('letterPattern', () => {
    it('should match ß', () => {
      expect(germanAdapter.letterPattern.test('ß')).toBe(true);
    });

    it('should match umlauts', () => {
      expect(germanAdapter.letterPattern.test('ä')).toBe(true);
      expect(germanAdapter.letterPattern.test('ö')).toBe(true);
      expect(germanAdapter.letterPattern.test('ü')).toBe(true);
      expect(germanAdapter.letterPattern.test('Ä')).toBe(true);
      expect(germanAdapter.letterPattern.test('Ö')).toBe(true);
      expect(germanAdapter.letterPattern.test('Ü')).toBe(true);
    });
  });

  describe('captionKeywords', () => {
    it('should include German caption keywords', () => {
      expect(germanAdapter.captionKeywords).toContain('Foto');
      expect(germanAdapter.captionKeywords).toContain('Bild');
      expect(germanAdapter.captionKeywords).toContain('Abbildung');
      expect(germanAdapter.captionKeywords).toContain('Tabelle');
    });
  });

  describe('pdfArtifactPatterns', () => {
    it('should match German page indicators', () => {
      const patterns = germanAdapter.pdfArtifactPatterns;
      const pagePattern = patterns[0];
      expect(pagePattern.test('Seite 1')).toBe(true);
      expect(pagePattern.test('1 von 10')).toBe(true);
    });

    it('should match German figure references', () => {
      const patterns = germanAdapter.pdfArtifactPatterns;
      const figurePattern = patterns.find(p => p.source.includes('Abbildung'));
      expect(figurePattern?.test('Abbildung 1')).toBe(true);
      expect(figurePattern?.test('Abb. 2')).toBe(true);
      expect(figurePattern?.test('Tabelle 3')).toBe(true);
    });
  });
});

describe('PortugueseAdapter', () => {
  describe('basic properties', () => {
    it('should have correct language code', () => {
      expect(portugueseAdapter.code).toBe('pt');
    });

    it('should have correct language name', () => {
      expect(portugueseAdapter.name).toBe('Portuguese');
    });

    it('should be an instance of PortugueseAdapter', () => {
      expect(portugueseAdapter).toBeInstanceOf(PortugueseAdapter);
    });
  });

  describe('hyphenateSync', () => {
    it('should split Portuguese words into syllables', () => {
      const result = portugueseAdapter.hyphenateSync('compreensão');
      expect(result.syllables.length).toBeGreaterThan(1);
      expect(result.syllables.join('')).toBe('compreensão');
    });

    it('should handle words with ç', () => {
      const result = portugueseAdapter.hyphenateSync('coração');
      expect(result.syllables.join('')).toBe('coração');
    });
  });

  describe('letterPattern', () => {
    it('should match ã and õ', () => {
      expect(portugueseAdapter.letterPattern.test('ã')).toBe(true);
      expect(portugueseAdapter.letterPattern.test('õ')).toBe(true);
      expect(portugueseAdapter.letterPattern.test('Ã')).toBe(true);
      expect(portugueseAdapter.letterPattern.test('Õ')).toBe(true);
    });

    it('should match ç cedilla', () => {
      expect(portugueseAdapter.letterPattern.test('ç')).toBe(true);
      expect(portugueseAdapter.letterPattern.test('Ç')).toBe(true);
    });

    it('should match accented characters', () => {
      expect(portugueseAdapter.letterPattern.test('á')).toBe(true);
      expect(portugueseAdapter.letterPattern.test('à')).toBe(true);
      expect(portugueseAdapter.letterPattern.test('â')).toBe(true);
      expect(portugueseAdapter.letterPattern.test('é')).toBe(true);
      expect(portugueseAdapter.letterPattern.test('ê')).toBe(true);
      expect(portugueseAdapter.letterPattern.test('ó')).toBe(true);
      expect(portugueseAdapter.letterPattern.test('ô')).toBe(true);
      expect(portugueseAdapter.letterPattern.test('ú')).toBe(true);
    });
  });

  describe('captionKeywords', () => {
    it('should include Portuguese caption keywords', () => {
      expect(portugueseAdapter.captionKeywords).toContain('Foto');
      expect(portugueseAdapter.captionKeywords).toContain('Imagem');
      expect(portugueseAdapter.captionKeywords).toContain('Fotografia');
      expect(portugueseAdapter.captionKeywords).toContain('Gráfico');
    });
  });

  describe('pdfArtifactPatterns', () => {
    it('should match Portuguese page indicators', () => {
      const patterns = portugueseAdapter.pdfArtifactPatterns;
      const pagePattern = patterns[0];
      expect(pagePattern.test('Página 1')).toBe(true);
      expect(pagePattern.test('1 de 10')).toBe(true);
    });

    it('should match Portuguese figure references', () => {
      const patterns = portugueseAdapter.pdfArtifactPatterns;
      const figurePattern = patterns.find(p => p.source.includes('Tabela'));
      expect(figurePattern?.test('Figura 1')).toBe(true);
      expect(figurePattern?.test('Tabela 2')).toBe(true);
    });
  });

  describe('compoundPrefixes', () => {
    it('should include language-specific Portuguese prefixes', () => {
      expect(portugueseAdapter.compoundPrefixes).toContain('sobre');
      expect(portugueseAdapter.compoundPrefixes).toContain('contra');
      expect(portugueseAdapter.compoundPrefixes).toContain('entre');
      expect(portugueseAdapter.compoundPrefixes).toContain('após');
    });

    it('should inherit Greek/Latin prefixes from BaseLatinAdapter', () => {
      expect(portugueseAdapter.compoundPrefixes).toContain('photo');
      expect(portugueseAdapter.compoundPrefixes).toContain('anti');
    });

    it('should have comprehensive prefix list (>46)', () => {
      expect(portugueseAdapter.compoundPrefixes.length).toBeGreaterThan(46);
    });
  });
});

describe('ItalianAdapter', () => {
  describe('basic properties', () => {
    it('should have correct language code', () => {
      expect(italianAdapter.code).toBe('it');
    });

    it('should have correct language name', () => {
      expect(italianAdapter.name).toBe('Italian');
    });

    it('should be an instance of ItalianAdapter', () => {
      expect(italianAdapter).toBeInstanceOf(ItalianAdapter);
    });
  });

  describe('hyphenateSync', () => {
    it('should split Italian words into syllables', () => {
      const result = italianAdapter.hyphenateSync('comprensione');
      expect(result.syllables.length).toBeGreaterThan(1);
      expect(result.syllables.join('')).toBe('comprensione');
    });

    it('should handle words with accented vowels', () => {
      const result = italianAdapter.hyphenateSync('città');
      expect(result.syllables.join('')).toBe('città');
    });
  });

  describe('letterPattern', () => {
    it('should match accented vowels', () => {
      expect(italianAdapter.letterPattern.test('à')).toBe(true);
      expect(italianAdapter.letterPattern.test('è')).toBe(true);
      expect(italianAdapter.letterPattern.test('é')).toBe(true);
      expect(italianAdapter.letterPattern.test('ì')).toBe(true);
      expect(italianAdapter.letterPattern.test('í')).toBe(true);
      expect(italianAdapter.letterPattern.test('ò')).toBe(true);
      expect(italianAdapter.letterPattern.test('ó')).toBe(true);
      expect(italianAdapter.letterPattern.test('ù')).toBe(true);
      expect(italianAdapter.letterPattern.test('ú')).toBe(true);
    });

    it('should match uppercase accented vowels', () => {
      expect(italianAdapter.letterPattern.test('À')).toBe(true);
      expect(italianAdapter.letterPattern.test('È')).toBe(true);
      expect(italianAdapter.letterPattern.test('É')).toBe(true);
      expect(italianAdapter.letterPattern.test('Ì')).toBe(true);
      expect(italianAdapter.letterPattern.test('Ò')).toBe(true);
      expect(italianAdapter.letterPattern.test('Ù')).toBe(true);
    });
  });

  describe('captionKeywords', () => {
    it('should include Italian caption keywords', () => {
      expect(italianAdapter.captionKeywords).toContain('Foto');
      expect(italianAdapter.captionKeywords).toContain('Immagine');
      expect(italianAdapter.captionKeywords).toContain('Fotografia');
      expect(italianAdapter.captionKeywords).toContain('Tabella');
    });
  });

  describe('pdfArtifactPatterns', () => {
    it('should match Italian page indicators', () => {
      const patterns = italianAdapter.pdfArtifactPatterns;
      const pagePattern = patterns[0];
      expect(pagePattern.test('Pagina 1')).toBe(true);
      expect(pagePattern.test('1 di 10')).toBe(true);
    });

    it('should match Italian figure references', () => {
      const patterns = italianAdapter.pdfArtifactPatterns;
      const figurePattern = patterns.find(p => p.source.includes('Tabella'));
      expect(figurePattern?.test('Figura 1')).toBe(true);
      expect(figurePattern?.test('Tabella 2')).toBe(true);
    });
  });

  describe('compoundPrefixes', () => {
    it('should include language-specific Italian prefixes', () => {
      expect(italianAdapter.compoundPrefixes).toContain('contro');
      expect(italianAdapter.compoundPrefixes).toContain('sopra');
      expect(italianAdapter.compoundPrefixes).toContain('sotto');
      expect(italianAdapter.compoundPrefixes).toContain('stra');
    });

    it('should inherit Greek/Latin prefixes from BaseLatinAdapter', () => {
      expect(italianAdapter.compoundPrefixes).toContain('photo');
      expect(italianAdapter.compoundPrefixes).toContain('anti');
    });

    it('should have comprehensive prefix list (>46)', () => {
      expect(italianAdapter.compoundPrefixes.length).toBeGreaterThan(46);
    });
  });
});

describe('Adapter Consistency', () => {
  const adapters = [spanishAdapter, frenchAdapter, germanAdapter, portugueseAdapter, italianAdapter];

  it('all adapters should have required properties', () => {
    for (const adapter of adapters) {
      expect(adapter.code).toBeDefined();
      expect(adapter.name).toBeDefined();
      expect(adapter.letterPattern).toBeInstanceOf(RegExp);
      expect(adapter.wordSplitPattern).toBeInstanceOf(RegExp);
      expect(adapter.paragraphPattern).toBeInstanceOf(RegExp);
      expect(adapter.sentenceEndPattern).toBeInstanceOf(RegExp);
      expect(adapter.clauseBreakPattern).toBeInstanceOf(RegExp);
      expect(Array.isArray(adapter.captionKeywords)).toBe(true);
      expect(Array.isArray(adapter.pdfArtifactPatterns)).toBe(true);
      expect(typeof adapter.htmlEntityMap).toBe('object');
      expect(typeof adapter.quotationEntities).toBe('object');
    }
  });

  it('all adapters should implement hyphenateSync', () => {
    for (const adapter of adapters) {
      expect(typeof adapter.hyphenateSync).toBe('function');
      // Each adapter should be able to hyphenate without throwing
      const result = adapter.hyphenateSync('test');
      expect(result.syllables).toBeDefined();
      expect(result.hyphenatedWord).toBeDefined();
    }
  });

  it('all adapters should have non-empty caption keywords', () => {
    for (const adapter of adapters) {
      expect(adapter.captionKeywords.length).toBeGreaterThan(0);
    }
  });

  it('all adapters should have non-empty PDF artifact patterns', () => {
    for (const adapter of adapters) {
      expect(adapter.pdfArtifactPatterns.length).toBeGreaterThan(0);
    }
  });
});
