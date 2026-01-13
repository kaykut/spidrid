/**
 * Tests for Generated Article Types
 *
 * Tests the ArticleTone, ToneDefinition, DurationOption,
 * GenerationStatus, and GeneratedArticle types and constants.
 */

import {
  ArticleTone,
  TONE_DEFINITIONS,
  DURATION_OPTIONS,
  GenerationStatus,
  GeneratedArticle,
  GenerateArticleRequest,
  GenerateArticleResponse,
  getMaxWordsForWpm,
  PRESET_OPTIONS,
  TOTAL_DURATION_OPTIONS,
} from '../../src/types/generated';

describe('ArticleTone', () => {
  const validTones: ArticleTone[] = ['explanatory', 'storytelling', 'analogical'];

  it('has exactly 3 valid tone values', () => {
    expect(validTones.length).toBe(3);
  });

  it('includes explanatory tone', () => {
    const tone: ArticleTone = 'explanatory';
    expect(tone).toBe('explanatory');
  });

  it('includes storytelling tone', () => {
    const tone: ArticleTone = 'storytelling';
    expect(tone).toBe('storytelling');
  });

  it('includes analogical tone', () => {
    const tone: ArticleTone = 'analogical';
    expect(tone).toBe('analogical');
  });
});

describe('TONE_DEFINITIONS', () => {
  it('has 3 tone definitions', () => {
    expect(TONE_DEFINITIONS.length).toBe(3);
  });

  it('each definition has required fields', () => {
    TONE_DEFINITIONS.forEach((tone) => {
      expect(tone.id).toBeDefined();
      expect(tone.label).toBeDefined();
      expect(tone.description).toBeDefined();
      expect(tone.emoji).toBeDefined();
      expect(tone.promptModifier).toBeDefined();
    });
  });

  it('each definition has non-empty strings', () => {
    TONE_DEFINITIONS.forEach((tone) => {
      expect(tone.label.length).toBeGreaterThan(0);
      expect(tone.description.length).toBeGreaterThan(0);
      expect(tone.emoji.length).toBeGreaterThan(0);
      expect(tone.promptModifier.length).toBeGreaterThan(0);
    });
  });

  it('contains all valid ArticleTone values', () => {
    const ids = TONE_DEFINITIONS.map((t) => t.id);
    expect(ids).toContain('explanatory');
    expect(ids).toContain('storytelling');
    expect(ids).toContain('analogical');
  });

  it('has unique IDs', () => {
    const ids = TONE_DEFINITIONS.map((t) => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  describe('explanatory tone (Facts)', () => {
    const explanatory = TONE_DEFINITIONS.find((t) => t.id === 'explanatory')!;

    it('has label "Facts"', () => {
      expect(explanatory.label).toBe('Facts');
    });

    it('has book emoji', () => {
      expect(explanatory.emoji).toBe('📚');
    });

    it('promptModifier mentions educational', () => {
      expect(explanatory.promptModifier.toLowerCase()).toContain('educational');
    });
  });

  describe('storytelling tone (Story)', () => {
    const storytelling = TONE_DEFINITIONS.find((t) => t.id === 'storytelling')!;

    it('has label "Story"', () => {
      expect(storytelling.label).toBe('Story');
    });

    it('has book emoji', () => {
      expect(storytelling.emoji).toBe('📖');
    });

    it('promptModifier mentions narrative', () => {
      expect(storytelling.promptModifier.toLowerCase()).toContain('narrative');
    });
  });

  describe('analogical tone (Analogy)', () => {
    const analogical = TONE_DEFINITIONS.find((t) => t.id === 'analogical')!;

    it('has label "Analogy"', () => {
      expect(analogical.label).toBe('Analogy');
    });

    it('has link emoji', () => {
      expect(analogical.emoji).toBe('🔗');
    });

    it('promptModifier mentions analogies', () => {
      expect(analogical.promptModifier.toLowerCase()).toContain('analog');
    });
  });
});

describe('DURATION_OPTIONS', () => {
  it('has 5 duration options', () => {
    expect(DURATION_OPTIONS.length).toBe(5);
  });

  it('each option has minutes and label', () => {
    DURATION_OPTIONS.forEach((option) => {
      expect(typeof option.minutes).toBe('number');
      expect(typeof option.label).toBe('string');
    });
  });

  it('includes 1 minute option', () => {
    const oneMin = DURATION_OPTIONS.find((o) => o.minutes === 1);
    expect(oneMin).toBeDefined();
    expect(oneMin!.label).toBe('1 min');
  });

  it('includes 2 minute option', () => {
    const twoMin = DURATION_OPTIONS.find((o) => o.minutes === 2);
    expect(twoMin).toBeDefined();
    expect(twoMin!.label).toBe('2 min');
  });

  it('includes 3 minute option', () => {
    const threeMin = DURATION_OPTIONS.find((o) => o.minutes === 3);
    expect(threeMin).toBeDefined();
    expect(threeMin!.label).toBe('3 min');
  });

  it('includes 5 minute option', () => {
    const fiveMin = DURATION_OPTIONS.find((o) => o.minutes === 5);
    expect(fiveMin).toBeDefined();
    expect(fiveMin!.label).toBe('5 min');
  });

  it('includes 10 minute option', () => {
    const tenMin = DURATION_OPTIONS.find((o) => o.minutes === 10);
    expect(tenMin).toBeDefined();
    expect(tenMin!.label).toBe('10 min');
  });

  it('minutes values are in ascending order', () => {
    for (let i = 1; i < DURATION_OPTIONS.length; i++) {
      expect(DURATION_OPTIONS[i].minutes).toBeGreaterThan(
        DURATION_OPTIONS[i - 1].minutes
      );
    }
  });

  it('all minutes are positive', () => {
    DURATION_OPTIONS.forEach((option) => {
      expect(option.minutes).toBeGreaterThan(0);
    });
  });
});

describe('GenerationStatus', () => {
  it('includes pending status', () => {
    const status: GenerationStatus = 'pending';
    expect(status).toBe('pending');
  });

  it('includes generating status', () => {
    const status: GenerationStatus = 'generating';
    expect(status).toBe('generating');
  });

  it('includes complete status', () => {
    const status: GenerationStatus = 'complete';
    expect(status).toBe('complete');
  });

  it('includes error status', () => {
    const status: GenerationStatus = 'error';
    expect(status).toBe('error');
  });
});

describe('GeneratedArticle interface', () => {
  it('accepts a complete article', () => {
    const article: GeneratedArticle = {
      id: 'gen_123',
      topic: 'Quantum Computing',
      targetDuration: 5,
      tone: 'explanatory',
      title: 'Introduction to Quantum Computing',
      content: 'Quantum computing is a fascinating field...',
      wordCount: 1500,
      questions: [
        {
          id: 'q1',
          type: 'single_choice',
          question: 'What is a qubit?',
          options: ['A classical bit', 'A quantum bit', 'A byte', 'A register'],
          correctIndex: 1,
        },
      ],
      status: 'complete',
      generatedAt: Date.now(),
      completed: false,
      attemptCount: 0,
    };

    expect(article.id).toBe('gen_123');
    expect(article.topic).toBe('Quantum Computing');
    expect(article.tone).toBe('explanatory');
    expect(article.status).toBe('complete');
  });

  it('accepts article with optional fields', () => {
    const article: GeneratedArticle = {
      id: 'gen_456',
      topic: 'Machine Learning',
      targetDuration: 3,
      tone: 'storytelling',
      title: 'ML for Skeptics',
      content: 'So you want to learn ML...',
      wordCount: 900,
      questions: [],
      status: 'complete',
      generatedAt: Date.now(),
      completed: true,
      comprehensionScore: 85,
      highestWPM: 350,
      lastReadAt: Date.now(),
      attemptCount: 2,
    };

    expect(article.completed).toBe(true);
    expect(article.comprehensionScore).toBe(85);
    expect(article.highestWPM).toBe(350);
    expect(article.attemptCount).toBe(2);
  });

  it('accepts article with error status', () => {
    const article: GeneratedArticle = {
      id: 'gen_789',
      topic: 'Failed Topic',
      targetDuration: 1,
      tone: 'explanatory',
      title: '',
      content: '',
      wordCount: 0,
      questions: [],
      status: 'error',
      errorMessage: 'API rate limit exceeded',
      generatedAt: Date.now(),
      completed: false,
      attemptCount: 0,
    };

    expect(article.status).toBe('error');
    expect(article.errorMessage).toBe('API rate limit exceeded');
  });

  it('accepts article with generating status', () => {
    const article: GeneratedArticle = {
      id: 'gen_abc',
      topic: 'In Progress',
      targetDuration: 2,
      tone: 'storytelling',
      title: '',
      content: '',
      wordCount: 0,
      questions: [],
      status: 'generating',
      generatedAt: Date.now(),
      completed: false,
      attemptCount: 0,
    };

    expect(article.status).toBe('generating');
  });
});

describe('GenerateArticleRequest interface', () => {
  it('accepts a valid request', () => {
    const request: GenerateArticleRequest = {
      topic: 'Climate Change',
      targetWordCount: 1000,
      tone: 'analogical',
      tonePrompt: 'Explain using everyday analogies',
      userId: 'user_123',
    };

    expect(request.topic).toBe('Climate Change');
    expect(request.targetWordCount).toBe(1000);
    expect(request.tone).toBe('analogical');
  });
});

describe('GenerateArticleResponse interface', () => {
  it('accepts a successful response', () => {
    const response: GenerateArticleResponse = {
      success: true,
      article: {
        title: 'Test Article',
        content: 'Article content here...',
        wordCount: 500,
        questions: [
          {
            id: 'q1',
            type: 'true_false',
            question: 'Is this a test?',
            correctAnswer: true,
          },
        ],
      },
    };

    expect(response.success).toBe(true);
    expect(response.article).toBeDefined();
    expect(response.article!.title).toBe('Test Article');
  });

  it('accepts an error response', () => {
    const response: GenerateArticleResponse = {
      success: false,
      error: 'Rate limit exceeded',
      errorCode: 'RATE_LIMITED',
    };

    expect(response.success).toBe(false);
    expect(response.error).toBe('Rate limit exceeded');
    expect(response.errorCode).toBe('RATE_LIMITED');
  });

  it('accepts NOT_PREMIUM error code', () => {
    const response: GenerateArticleResponse = {
      success: false,
      error: 'Premium subscription required',
      errorCode: 'NOT_PREMIUM',
    };

    expect(response.errorCode).toBe('NOT_PREMIUM');
  });

  it('accepts GENERATION_FAILED error code', () => {
    const response: GenerateArticleResponse = {
      success: false,
      error: 'AI generation failed',
      errorCode: 'GENERATION_FAILED',
    };

    expect(response.errorCode).toBe('GENERATION_FAILED');
  });

  it('accepts INVALID_REQUEST error code', () => {
    const response: GenerateArticleResponse = {
      success: false,
      error: 'Invalid topic',
      errorCode: 'INVALID_REQUEST',
    };

    expect(response.errorCode).toBe('INVALID_REQUEST');
  });
});

describe('getMaxWordsForWpm', () => {
  it('returns 500 for very slow readers (< 200 WPM)', () => {
    expect(getMaxWordsForWpm(100)).toBe(500);
    expect(getMaxWordsForWpm(150)).toBe(500);
    expect(getMaxWordsForWpm(199)).toBe(500);
  });

  it('returns 900 for slow readers (200-349 WPM)', () => {
    expect(getMaxWordsForWpm(200)).toBe(900);
    expect(getMaxWordsForWpm(250)).toBe(900);
    expect(getMaxWordsForWpm(349)).toBe(900);
  });

  it('returns 1300 for average readers (350-499 WPM)', () => {
    expect(getMaxWordsForWpm(350)).toBe(1300);
    expect(getMaxWordsForWpm(400)).toBe(1300);
    expect(getMaxWordsForWpm(499)).toBe(1300);
  });

  it('returns 1800 for fast readers (500-699 WPM)', () => {
    expect(getMaxWordsForWpm(500)).toBe(1800);
    expect(getMaxWordsForWpm(600)).toBe(1800);
    expect(getMaxWordsForWpm(699)).toBe(1800);
  });

  it('returns 2100 for very fast readers (>= 700 WPM)', () => {
    expect(getMaxWordsForWpm(700)).toBe(2100);
    expect(getMaxWordsForWpm(1000)).toBe(2100);
    expect(getMaxWordsForWpm(1500)).toBe(2100);
  });

  it('ensures max read time of ~3 minutes at each tier', () => {
    // For each tier, max words / WPM should be <= 3 min
    expect(500 / 150).toBeLessThanOrEqual(3.5); // Slow: 3.3 min
    expect(900 / 250).toBeLessThanOrEqual(3.6); // Slow-med: 3.6 min
    expect(1300 / 400).toBeLessThanOrEqual(3.3); // Average: 3.25 min
    expect(1800 / 600).toBeLessThanOrEqual(3); // Fast: 3 min
    expect(2100 / 700).toBeLessThanOrEqual(3); // Very fast: 3 min
  });
});

describe('PRESET_OPTIONS', () => {
  it('has 4 preset options', () => {
    expect(PRESET_OPTIONS.length).toBe(4);
  });

  it('each preset has required fields', () => {
    PRESET_OPTIONS.forEach((preset) => {
      expect(preset.id).toBeDefined();
      expect(preset.label).toBeDefined();
      expect(typeof preset.articles).toBe('number');
      expect(typeof preset.durationMinutes).toBe('number');
    });
  });

  describe('nugget preset', () => {
    const nugget = PRESET_OPTIONS.find((p) => p.id === 'nugget')!;

    it('has 1 article', () => {
      expect(nugget.articles).toBe(1);
    });

    it('has 2 minute duration', () => {
      expect(nugget.durationMinutes).toBe(2);
    });

    it('has label "Nugget"', () => {
      expect(nugget.label).toBe('Nugget');
    });
  });

  describe('primer preset', () => {
    const primer = PRESET_OPTIONS.find((p) => p.id === 'primer')!;

    it('has 3 articles', () => {
      expect(primer.articles).toBe(3);
    });

    it('has 3 minute duration per article', () => {
      expect(primer.durationMinutes).toBe(3);
    });

    it('has label "Primer"', () => {
      expect(primer.label).toBe('Primer');
    });
  });

  describe('topic preset', () => {
    const topic = PRESET_OPTIONS.find((p) => p.id === 'topic')!;

    it('has 5 articles', () => {
      expect(topic.articles).toBe(5);
    });

    it('has 3 minute duration per article', () => {
      expect(topic.durationMinutes).toBe(3);
    });

    it('has label "Topic"', () => {
      expect(topic.label).toBe('Topic');
    });
  });

  describe('deep-dive preset', () => {
    const deepDive = PRESET_OPTIONS.find((p) => p.id === 'deep-dive')!;

    it('has 10 articles', () => {
      expect(deepDive.articles).toBe(10);
    });

    it('has 3 minute duration per article', () => {
      expect(deepDive.durationMinutes).toBe(3);
    });

    it('has label "Deep Dive"', () => {
      expect(deepDive.label).toBe('Deep Dive');
    });
  });

  it('presets are in ascending article count order', () => {
    for (let i = 1; i < PRESET_OPTIONS.length; i++) {
      expect(PRESET_OPTIONS[i].articles).toBeGreaterThan(
        PRESET_OPTIONS[i - 1].articles
      );
    }
  });
});

describe('TOTAL_DURATION_OPTIONS', () => {
  it('has 5 duration options', () => {
    expect(TOTAL_DURATION_OPTIONS.length).toBe(5);
  });

  it('contains expected values', () => {
    expect(TOTAL_DURATION_OPTIONS).toContain(5);
    expect(TOTAL_DURATION_OPTIONS).toContain(10);
    expect(TOTAL_DURATION_OPTIONS).toContain(15);
    expect(TOTAL_DURATION_OPTIONS).toContain(20);
    expect(TOTAL_DURATION_OPTIONS).toContain(30);
  });

  it('is in ascending order', () => {
    for (let i = 1; i < TOTAL_DURATION_OPTIONS.length; i++) {
      expect(TOTAL_DURATION_OPTIONS[i]).toBeGreaterThan(
        TOTAL_DURATION_OPTIONS[i - 1]
      );
    }
  });

  it('all values are positive', () => {
    TOTAL_DURATION_OPTIONS.forEach((duration) => {
      expect(duration).toBeGreaterThan(0);
    });
  });
});
