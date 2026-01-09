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
} from '../../src/types/generated';

describe('ArticleTone', () => {
  const validTones: ArticleTone[] = [
    'robotic',
    'explanatory',
    'sarcastic',
    'storytelling',
    'analogical',
  ];

  it('has exactly 5 valid tone values', () => {
    expect(validTones.length).toBe(5);
  });

  it('includes robotic tone', () => {
    const tone: ArticleTone = 'robotic';
    expect(tone).toBe('robotic');
  });

  it('includes explanatory tone', () => {
    const tone: ArticleTone = 'explanatory';
    expect(tone).toBe('explanatory');
  });

  it('includes sarcastic tone', () => {
    const tone: ArticleTone = 'sarcastic';
    expect(tone).toBe('sarcastic');
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
  it('has 5 tone definitions', () => {
    expect(TONE_DEFINITIONS.length).toBe(5);
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
    expect(ids).toContain('robotic');
    expect(ids).toContain('explanatory');
    expect(ids).toContain('sarcastic');
    expect(ids).toContain('storytelling');
    expect(ids).toContain('analogical');
  });

  it('has unique IDs', () => {
    const ids = TONE_DEFINITIONS.map((t) => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  describe('robotic tone', () => {
    const robotic = TONE_DEFINITIONS.find((t) => t.id === 'robotic')!;

    it('has label "Robotic"', () => {
      expect(robotic.label).toBe('Robotic');
    });

    it('has robot emoji', () => {
      expect(robotic.emoji).toBe('🤖');
    });

    it('promptModifier mentions technical style', () => {
      expect(robotic.promptModifier.toLowerCase()).toContain('technical');
    });
  });

  describe('explanatory tone', () => {
    const explanatory = TONE_DEFINITIONS.find((t) => t.id === 'explanatory')!;

    it('has label "Explanatory"', () => {
      expect(explanatory.label).toBe('Explanatory');
    });

    it('has book emoji', () => {
      expect(explanatory.emoji).toBe('📚');
    });

    it('promptModifier mentions educational', () => {
      expect(explanatory.promptModifier.toLowerCase()).toContain('educational');
    });
  });

  describe('sarcastic tone', () => {
    const sarcastic = TONE_DEFINITIONS.find((t) => t.id === 'sarcastic')!;

    it('has label "Sarcastic"', () => {
      expect(sarcastic.label).toBe('Sarcastic');
    });

    it('has smirk emoji', () => {
      expect(sarcastic.emoji).toBe('😏');
    });

    it('promptModifier mentions wit or humor', () => {
      const modifier = sarcastic.promptModifier.toLowerCase();
      expect(modifier.includes('wit') || modifier.includes('humor')).toBe(true);
    });
  });

  describe('storytelling tone', () => {
    const storytelling = TONE_DEFINITIONS.find((t) => t.id === 'storytelling')!;

    it('has label "Storytelling"', () => {
      expect(storytelling.label).toBe('Storytelling');
    });

    it('has book emoji', () => {
      expect(storytelling.emoji).toBe('📖');
    });

    it('promptModifier mentions narrative', () => {
      expect(storytelling.promptModifier.toLowerCase()).toContain('narrative');
    });
  });

  describe('analogical tone', () => {
    const analogical = TONE_DEFINITIONS.find((t) => t.id === 'analogical')!;

    it('has label "Analogical"', () => {
      expect(analogical.label).toBe('Analogical');
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
      tone: 'sarcastic',
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
      tone: 'robotic',
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
