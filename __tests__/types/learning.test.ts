/**
 * Tests for Learning Types - Milestone 1
 *
 * Tests the Question discriminated union, Article interface,
 * type guards, and utility functions.
 */

import {
  Question,
  SingleChoiceQuestion,
  MultipleSelectQuestion,
  TrueFalseQuestion,
  NumericQuestion,
  ComprehensionQuestion,
  migrateLegacyQuestion,
  isLegacyQuestion,
  normalizeQuestion,
  getRecommendedQuizSize,
  isPassing,
  PASS_THRESHOLD,
  PRACTICE_WORD_COUNTS,
  CERTIFICATION_WORD_COUNTS,
  Article,
} from '../../src/types/learning';

describe('Question Types - Discriminated Union', () => {
  describe('SingleChoiceQuestion', () => {
    const question: SingleChoiceQuestion = {
      id: 'q1',
      type: 'single_choice',
      question: 'What is 2+2?',
      options: ['3', '4', '5', '6'],
      correctIndex: 1,
    };

    it('has type "single_choice"', () => {
      expect(question.type).toBe('single_choice');
    });

    it('has options array', () => {
      expect(Array.isArray(question.options)).toBe(true);
      expect(question.options.length).toBe(4);
    });

    it('has correctIndex within bounds', () => {
      expect(question.correctIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctIndex).toBeLessThan(question.options.length);
    });
  });

  describe('MultipleSelectQuestion', () => {
    const question: MultipleSelectQuestion = {
      id: 'q2',
      type: 'multiple_select',
      question: 'Which are prime numbers?',
      options: ['2', '4', '5', '6', '7'],
      correctIndices: [0, 2, 4],
    };

    it('has type "multiple_select"', () => {
      expect(question.type).toBe('multiple_select');
    });

    it('has correctIndices array with multiple values', () => {
      expect(Array.isArray(question.correctIndices)).toBe(true);
      expect(question.correctIndices.length).toBeGreaterThan(1);
    });

    it('all correctIndices are within bounds', () => {
      question.correctIndices.forEach(idx => {
        expect(idx).toBeGreaterThanOrEqual(0);
        expect(idx).toBeLessThan(question.options.length);
      });
    });
  });

  describe('TrueFalseQuestion', () => {
    const questionTrue: TrueFalseQuestion = {
      id: 'q3',
      type: 'true_false',
      question: 'The Earth is round.',
      correctAnswer: true,
    };

    const questionFalse: TrueFalseQuestion = {
      id: 'q4',
      type: 'true_false',
      question: 'The Sun orbits Earth.',
      correctAnswer: false,
    };

    it('has type "true_false"', () => {
      expect(questionTrue.type).toBe('true_false');
      expect(questionFalse.type).toBe('true_false');
    });

    it('correctAnswer is boolean', () => {
      expect(typeof questionTrue.correctAnswer).toBe('boolean');
      expect(questionTrue.correctAnswer).toBe(true);
      expect(questionFalse.correctAnswer).toBe(false);
    });
  });

  describe('NumericQuestion', () => {
    const question: NumericQuestion = {
      id: 'q5',
      type: 'numeric',
      question: 'In what year did World War II end?',
      correctValue: 1945,
      tolerance: 0,
      min: 1900,
      max: 2000,
      step: 1,
      unit: 'year',
    };

    it('has type "numeric"', () => {
      expect(question.type).toBe('numeric');
    });

    it('has correctValue within min/max bounds', () => {
      expect(question.correctValue).toBeGreaterThanOrEqual(question.min);
      expect(question.correctValue).toBeLessThanOrEqual(question.max);
    });

    it('tolerance is non-negative', () => {
      expect(question.tolerance).toBeGreaterThanOrEqual(0);
    });

    it('optional fields are present', () => {
      expect(question.step).toBe(1);
      expect(question.unit).toBe('year');
    });
  });

  describe('Question union type', () => {
    it('accepts all question types', () => {
      const questions: Question[] = [
        { id: 'q1', type: 'single_choice', question: 'Q1?', options: ['a', 'b'], correctIndex: 0 },
        { id: 'q2', type: 'multiple_select', question: 'Q2?', options: ['a', 'b'], correctIndices: [0, 1] },
        { id: 'q3', type: 'true_false', question: 'Q3?', correctAnswer: true },
        { id: 'q4', type: 'numeric', question: 'Q4?', correctValue: 42, tolerance: 2, min: 0, max: 100 },
      ];

      expect(questions.length).toBe(4);
      expect(questions[0].type).toBe('single_choice');
      expect(questions[1].type).toBe('multiple_select');
      expect(questions[2].type).toBe('true_false');
      expect(questions[3].type).toBe('numeric');
    });
  });
});

describe('Legacy Question Migration', () => {
  const legacyQuestion: ComprehensionQuestion = {
    id: 'legacy1',
    question: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin', 'Madrid'],
    correctIndex: 1,
  };

  describe('isLegacyQuestion', () => {
    it('returns true for legacy questions (no type field)', () => {
      expect(isLegacyQuestion(legacyQuestion)).toBe(true);
    });

    it('returns false for new questions (has type field)', () => {
      const newQuestion: SingleChoiceQuestion = {
        id: 'new1',
        type: 'single_choice',
        question: 'Q?',
        options: ['a', 'b'],
        correctIndex: 0,
      };
      expect(isLegacyQuestion(newQuestion)).toBe(false);
    });
  });

  describe('migrateLegacyQuestion', () => {
    it('converts legacy question to SingleChoiceQuestion', () => {
      const migrated = migrateLegacyQuestion(legacyQuestion);

      expect(migrated.type).toBe('single_choice');
      expect(migrated.id).toBe(legacyQuestion.id);
      expect(migrated.question).toBe(legacyQuestion.question);
      expect(migrated.options).toEqual(legacyQuestion.options);
      expect(migrated.correctIndex).toBe(legacyQuestion.correctIndex);
    });
  });

  describe('normalizeQuestion', () => {
    it('migrates legacy questions', () => {
      const normalized = normalizeQuestion(legacyQuestion);
      expect(normalized.type).toBe('single_choice');
    });

    it('passes through new questions unchanged', () => {
      const newQuestion: TrueFalseQuestion = {
        id: 'tf1',
        type: 'true_false',
        question: 'True?',
        correctAnswer: true,
      };
      const normalized = normalizeQuestion(newQuestion);
      expect(normalized).toEqual(newQuestion);
    });
  });
});

describe('Quiz Size Calculation', () => {
  describe('getRecommendedQuizSize', () => {
    it('returns minimum of 5 for short articles', () => {
      expect(getRecommendedQuizSize(100)).toBe(5);
      expect(getRecommendedQuizSize(500)).toBe(5);
      expect(getRecommendedQuizSize(749)).toBe(5);
    });

    it('returns floor(wordCount/150) for medium articles', () => {
      expect(getRecommendedQuizSize(750)).toBe(5);
      expect(getRecommendedQuizSize(900)).toBe(6);
      expect(getRecommendedQuizSize(1500)).toBe(10);
      expect(getRecommendedQuizSize(2250)).toBe(15);
    });

    it('returns maximum of 20 for long articles', () => {
      expect(getRecommendedQuizSize(3000)).toBe(20);
      expect(getRecommendedQuizSize(5000)).toBe(20);
      expect(getRecommendedQuizSize(10000)).toBe(20);
    });
  });
});

describe('Score Validation', () => {
  describe('PASS_THRESHOLD', () => {
    it('is 70', () => {
      expect(PASS_THRESHOLD).toBe(70);
    });
  });

  describe('isPassing', () => {
    it('returns true for scores >= 70', () => {
      expect(isPassing(70)).toBe(true);
      expect(isPassing(85)).toBe(true);
      expect(isPassing(100)).toBe(true);
    });

    it('returns false for scores < 70', () => {
      expect(isPassing(69)).toBe(false);
      expect(isPassing(50)).toBe(false);
      expect(isPassing(0)).toBe(false);
    });
  });
});

describe('Word Count Constants', () => {
  describe('PRACTICE_WORD_COUNTS', () => {
    it('has 10 entries (P01-P10)', () => {
      expect(PRACTICE_WORD_COUNTS.length).toBe(10);
    });

    it('starts at 500 words', () => {
      expect(PRACTICE_WORD_COUNTS[0]).toBe(500);
    });

    it('ends at 3000 words', () => {
      expect(PRACTICE_WORD_COUNTS[9]).toBe(3000);
    });

    it('is monotonically increasing or equal', () => {
      for (let i = 1; i < PRACTICE_WORD_COUNTS.length; i++) {
        expect(PRACTICE_WORD_COUNTS[i]).toBeGreaterThanOrEqual(PRACTICE_WORD_COUNTS[i - 1]);
      }
    });
  });

  describe('CERTIFICATION_WORD_COUNTS', () => {
    it('short is 1000 words', () => {
      expect(CERTIFICATION_WORD_COUNTS.short).toBe(1000);
    });

    it('medium is 2000 words', () => {
      expect(CERTIFICATION_WORD_COUNTS.medium).toBe(2000);
    });

    it('long is 3000 words', () => {
      expect(CERTIFICATION_WORD_COUNTS.long).toBe(3000);
    });
  });
});

describe('Article Interface', () => {
  it('accepts practice article with new fields', () => {
    const article: Article = {
      id: 'science-p01',
      topicId: 'science-discovery',
      title: 'Test Article',
      content: 'This is test content.',
      wordCount: 500,
      difficulty: 'beginner',
      questions: [],
      articleType: 'practice',
      orderIndex: 1,
    };

    expect(article.articleType).toBe('practice');
    expect(article.orderIndex).toBe(1);
    expect(article.certificationLength).toBeUndefined();
  });

  it('accepts certification article with certificationLength', () => {
    const article: Article = {
      id: 'science-c1',
      topicId: 'science-discovery',
      title: 'Certification Test',
      content: 'Certification content.',
      wordCount: 1000,
      difficulty: 'intermediate',
      questions: [],
      articleType: 'certification',
      orderIndex: 1,
      certificationLength: 'short',
    };

    expect(article.articleType).toBe('certification');
    expect(article.certificationLength).toBe('short');
  });

  it('accepts article with mixed question types', () => {
    const article: Article = {
      id: 'mixed-q',
      topicId: 'test',
      title: 'Mixed Questions',
      content: 'Content here.',
      wordCount: 1000,
      difficulty: 'intermediate',
      questions: [
        { id: 'q1', type: 'single_choice', question: 'Q1?', options: ['a', 'b'], correctIndex: 0 },
        { id: 'q2', type: 'true_false', question: 'Q2?', correctAnswer: true },
        { id: 'q3', question: 'Legacy?', options: ['x', 'y'], correctIndex: 1 }, // Legacy format
      ],
    };

    expect(article.questions.length).toBe(3);
  });
});
