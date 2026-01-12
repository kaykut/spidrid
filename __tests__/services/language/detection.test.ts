/**
 * Tests for Language Detection
 */

import { detectLanguage, getLanguageScores } from '../../../src/services/language/detection';

describe('detectLanguage', () => {
  describe('English detection', () => {
    it('should detect English text', () => {
      const text = 'The quick brown fox jumps over the lazy dog. This is a test of the language detection system that uses common words to identify the language.';
      expect(detectLanguage(text)).toBe('en');
    });

    it('should detect English from news article', () => {
      const text = 'The president announced a new policy today that will affect millions of people. Congress is expected to vote on the measure next week. This is a significant development in the ongoing debate.';
      expect(detectLanguage(text)).toBe('en');
    });
  });

  describe('Spanish detection', () => {
    it('should detect Spanish text', () => {
      const text = 'El rápido zorro marrón salta sobre el perro perezoso. Esta es una prueba del sistema de detección de idiomas que utiliza palabras comunes para identificar el idioma.';
      expect(detectLanguage(text)).toBe('es');
    });

    it('should detect Spanish from strong ñ signal', () => {
      const text = 'El niño pequeño juega en el jardín con su amigo español. Los niños están contentos y felices de poder jugar juntos esta mañana.';
      expect(detectLanguage(text)).toBe('es');
    });

    it('should detect Spanish with inverted punctuation', () => {
      const text = '¿Cómo estás hoy? ¡Qué bonito día hace! Me alegro de verte en esta hermosa mañana de primavera en España.';
      expect(detectLanguage(text)).toBe('es');
    });
  });

  describe('French detection', () => {
    it('should detect French text', () => {
      const text = 'Le renard brun rapide saute par-dessus le chien paresseux. Ceci est un test du système de détection de langue qui utilise des mots communs.';
      expect(detectLanguage(text)).toBe('fr');
    });

    it('should detect French with common words', () => {
      const text = 'Je suis allé au marché pour acheter du pain et des légumes. Le vendeur est très sympathique et les prix sont raisonnables dans ce quartier.';
      expect(detectLanguage(text)).toBe('fr');
    });

    it('should detect French with œ ligature', () => {
      const text = 'Le cœur de la ville est magnifique avec ses œuvres dart et ses monuments historiques. Les touristes viennent du monde entier pour admirer cette beauté.';
      expect(detectLanguage(text)).toBe('fr');
    });
  });

  describe('German detection', () => {
    it('should detect German text', () => {
      const text = 'Der schnelle braune Fuchs springt über den faulen Hund. Dies ist ein Test des Spracherkennungssystems das häufige Wörter verwendet um die Sprache zu identifizieren.';
      expect(detectLanguage(text)).toBe('de');
    });

    it('should detect German from strong ß signal', () => {
      const text = 'Die Straße ist sehr lang und führt durch das schöne Tal. Wir müssen noch ein großes Stück fahren bis wir unser Ziel erreichen.';
      expect(detectLanguage(text)).toBe('de');
    });

    it('should detect German with umlauts', () => {
      const text = 'Für die Prüfung müssen wir viel lernen. Die Bücher sind sehr schwer und die Themen sind kompliziert aber interessant für alle Studenten.';
      expect(detectLanguage(text)).toBe('de');
    });
  });

  describe('Portuguese detection', () => {
    it('should detect Portuguese text', () => {
      const text = 'O rápido raposa marrom pula sobre o cachorro preguiçoso. Este é um teste do sistema de detecção de idiomas que usa palavras comuns para identificar o idioma.';
      expect(detectLanguage(text)).toBe('pt');
    });

    it('should detect Portuguese from strong ã/õ signals', () => {
      const text = 'A educação é fundamental para o desenvolvimento de uma nação. As crianças precisam de boas escolas e professores qualificados para aprender.';
      expect(detectLanguage(text)).toBe('pt');
    });

    it('should detect Portuguese with nasal vowels', () => {
      const text = 'O coração do povo brasileiro é muito grande e generoso. As tradições culturais são preservadas com muito carinho e dedicação nas comunidades.';
      expect(detectLanguage(text)).toBe('pt');
    });
  });

  describe('Italian detection', () => {
    it('should detect Italian text', () => {
      const text = 'La volpe marrone rapida salta sopra il cane pigro. Questo è un test del sistema di rilevamento della lingua che utilizza parole comuni per identificare la lingua.';
      expect(detectLanguage(text)).toBe('it');
    });

    it('should detect Italian with common words', () => {
      const text = 'Sono andato al mercato per comprare del pane e della frutta. Il venditore è molto simpatico e i prezzi sono ragionevoli in questo quartiere della città.';
      expect(detectLanguage(text)).toBe('it');
    });
  });

  describe('edge cases', () => {
    it('should return null for empty text', () => {
      expect(detectLanguage('')).toBeNull();
    });

    it('should return null for very short text', () => {
      expect(detectLanguage('Hello')).toBeNull();
    });

    it('should return null for text with too few words', () => {
      expect(detectLanguage('The quick brown fox')).toBeNull();
    });

    it('should return null for whitespace-only text', () => {
      expect(detectLanguage('   \n\t   ')).toBeNull();
    });

    it('should return null for numbers only', () => {
      expect(detectLanguage('12345 67890 11111 22222 33333 44444 55555 66666 77777 88888')).toBeNull();
    });

    it('should handle mixed case text', () => {
      const text = 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG. This is a test that uses common words for language detection and should work correctly.';
      expect(detectLanguage(text)).toBe('en');
    });
  });

  describe('confidence threshold', () => {
    it('should return null when below confidence threshold', () => {
      // Very generic text that could be any language
      const text = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
      expect(detectLanguage(text, 0.9)).toBeNull();
    });

    it('should detect language with lower confidence threshold', () => {
      const text = 'The quick brown fox jumps over the lazy dog. This is a sentence with common English words.';
      expect(detectLanguage(text, 0.1)).toBe('en');
    });
  });
});

describe('getLanguageScores', () => {
  it('should return scores for all supported languages', () => {
    const text = 'The quick brown fox jumps over the lazy dog. This is a test sentence with common English words.';
    const scores = getLanguageScores(text);

    expect(scores).toHaveProperty('en');
    expect(scores).toHaveProperty('es');
    expect(scores).toHaveProperty('fr');
    expect(scores).toHaveProperty('de');
    expect(scores).toHaveProperty('pt');
    expect(scores).toHaveProperty('it');
  });

  it('should give English the highest score for English text', () => {
    const text = 'The quick brown fox jumps over the lazy dog. This is a test sentence with common English words and phrases.';
    const scores = getLanguageScores(text);

    expect(scores.en).toBeGreaterThan(scores.es);
    expect(scores.en).toBeGreaterThan(scores.fr);
    expect(scores.en).toBeGreaterThan(scores.de);
    expect(scores.en).toBeGreaterThan(scores.pt);
    expect(scores.en).toBeGreaterThan(scores.it);
  });

  it('should give Spanish the highest score for Spanish text', () => {
    const text = 'El rápido zorro marrón salta sobre el perro perezoso. Esta es una prueba del sistema de detección.';
    const scores = getLanguageScores(text);

    expect(scores.es).toBeGreaterThan(scores.en);
  });

  it('should return zero scores for empty text', () => {
    const scores = getLanguageScores('');

    expect(scores.en).toBe(0);
    expect(scores.es).toBe(0);
    expect(scores.fr).toBe(0);
    expect(scores.de).toBe(0);
    expect(scores.pt).toBe(0);
    expect(scores.it).toBe(0);
  });

  it('should add bonus for strong character signals', () => {
    // Text with ñ should boost Spanish score
    const textWithN = 'El niño español juega en el jardín con sus amigos. Los niños están muy contentos hoy.';
    const scores = getLanguageScores(textWithN);

    // Spanish should have the strong signal bonus
    expect(scores.es).toBeGreaterThan(0.3); // At least the strong signal bonus
  });
});
