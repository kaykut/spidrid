/**
 * Tests for calculateQuizScore utility - Milestone 6
 *
 * Tests score calculation for all 4 question types.
 */

import {
  isAnswerCorrect,
  calculateQuestionPoints,
  calculateQuizScore,
  getCorrectAnswerDisplay,
} from '../../src/utils/calculateQuizScore';
import type {
  SingleChoiceQuestion,
  MultipleSelectQuestion,
  TrueFalseQuestion,
  NumericQuestion,
} from '../../src/types/learning';
import type { QuestionAnswer } from '../../src/components/quiz/QuestionRenderer';

describe('isAnswerCorrect', () => {
  describe('single_choice questions', () => {
    const question: SingleChoiceQuestion = {
      id: 'q1',
      type: 'single_choice',
      question: 'What is 2+2?',
      options: ['3', '4', '5', '6'],
      correctIndex: 1,
    };

    it('returns true for correct answer', () => {
      const answer: QuestionAnswer = { type: 'single_choice', value: 1 };
      expect(isAnswerCorrect(question, answer)).toBe(true);
    });

    it('returns false for incorrect answer', () => {
      const answer: QuestionAnswer = { type: 'single_choice', value: 0 };
      expect(isAnswerCorrect(question, answer)).toBe(false);
    });

    it('returns false for wrong answer type', () => {
      const answer: QuestionAnswer = { type: 'true_false', value: true };
      expect(isAnswerCorrect(question, answer)).toBe(false);
    });
  });

  describe('multiple_select questions', () => {
    const question: MultipleSelectQuestion = {
      id: 'q2',
      type: 'multiple_select',
      question: 'Select all prime numbers',
      options: ['2', '4', '5', '6'],
      correctIndices: [0, 2],
    };

    it('returns true when all correct options selected', () => {
      const answer: QuestionAnswer = { type: 'multiple_select', value: [0, 2] };
      expect(isAnswerCorrect(question, answer)).toBe(true);
    });

    it('returns true regardless of selection order', () => {
      const answer: QuestionAnswer = { type: 'multiple_select', value: [2, 0] };
      expect(isAnswerCorrect(question, answer)).toBe(true);
    });

    it('returns false if missing a correct option', () => {
      const answer: QuestionAnswer = { type: 'multiple_select', value: [0] };
      expect(isAnswerCorrect(question, answer)).toBe(false);
    });

    it('returns false if extra incorrect option selected', () => {
      const answer: QuestionAnswer = { type: 'multiple_select', value: [0, 1, 2] };
      expect(isAnswerCorrect(question, answer)).toBe(false);
    });

    it('returns false for empty selection', () => {
      const answer: QuestionAnswer = { type: 'multiple_select', value: [] };
      expect(isAnswerCorrect(question, answer)).toBe(false);
    });
  });

  describe('true_false questions', () => {
    const questionTrue: TrueFalseQuestion = {
      id: 'q3',
      type: 'true_false',
      question: 'The sky is blue',
      correctAnswer: true,
    };

    const questionFalse: TrueFalseQuestion = {
      id: 'q4',
      type: 'true_false',
      question: 'The sun is cold',
      correctAnswer: false,
    };

    it('returns true for correct true answer', () => {
      const answer: QuestionAnswer = { type: 'true_false', value: true };
      expect(isAnswerCorrect(questionTrue, answer)).toBe(true);
    });

    it('returns true for correct false answer', () => {
      const answer: QuestionAnswer = { type: 'true_false', value: false };
      expect(isAnswerCorrect(questionFalse, answer)).toBe(true);
    });

    it('returns false for incorrect true answer', () => {
      const answer: QuestionAnswer = { type: 'true_false', value: true };
      expect(isAnswerCorrect(questionFalse, answer)).toBe(false);
    });

    it('returns false for incorrect false answer', () => {
      const answer: QuestionAnswer = { type: 'true_false', value: false };
      expect(isAnswerCorrect(questionTrue, answer)).toBe(false);
    });
  });

  describe('numeric questions', () => {
    const question: NumericQuestion = {
      id: 'q5',
      type: 'numeric',
      question: 'How many continents are there?',
      correctValue: 7,
      tolerance: 0,
      min: 1,
      max: 10,
    };

    const questionWithTolerance: NumericQuestion = {
      id: 'q6',
      type: 'numeric',
      question: 'Approximately what percentage is pi?',
      correctValue: 314,
      tolerance: 2,
      min: 300,
      max: 330,
      unit: '%',
    };

    it('returns true for exact correct answer', () => {
      const answer: QuestionAnswer = { type: 'numeric', value: 7 };
      expect(isAnswerCorrect(question, answer)).toBe(true);
    });

    it('returns false for incorrect answer with zero tolerance', () => {
      const answer: QuestionAnswer = { type: 'numeric', value: 6 };
      expect(isAnswerCorrect(question, answer)).toBe(false);
    });

    it('returns true for answer within tolerance', () => {
      const answer: QuestionAnswer = { type: 'numeric', value: 312 };
      expect(isAnswerCorrect(questionWithTolerance, answer)).toBe(true);
    });

    it('returns true for answer at tolerance boundary', () => {
      const answer: QuestionAnswer = { type: 'numeric', value: 316 };
      expect(isAnswerCorrect(questionWithTolerance, answer)).toBe(true);
    });

    it('returns false for answer outside tolerance', () => {
      const answer: QuestionAnswer = { type: 'numeric', value: 320 };
      expect(isAnswerCorrect(questionWithTolerance, answer)).toBe(false);
    });
  });
});

describe('calculateQuestionPoints', () => {
  it('returns 1 for correct answer', () => {
    const question: SingleChoiceQuestion = {
      id: 'q1',
      type: 'single_choice',
      question: 'Test',
      options: ['A', 'B'],
      correctIndex: 0,
    };
    const answer: QuestionAnswer = { type: 'single_choice', value: 0 };
    expect(calculateQuestionPoints(question, answer)).toBe(1);
  });

  it('returns 0 for incorrect answer', () => {
    const question: SingleChoiceQuestion = {
      id: 'q1',
      type: 'single_choice',
      question: 'Test',
      options: ['A', 'B'],
      correctIndex: 0,
    };
    const answer: QuestionAnswer = { type: 'single_choice', value: 1 };
    expect(calculateQuestionPoints(question, answer)).toBe(0);
  });
});

describe('calculateQuizScore', () => {
  const questions = [
    {
      id: 'q1',
      type: 'single_choice' as const,
      question: 'Q1',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 0,
    },
    {
      id: 'q2',
      type: 'true_false' as const,
      question: 'Q2',
      correctAnswer: true,
    },
    {
      id: 'q3',
      type: 'multiple_select' as const,
      question: 'Q3',
      options: ['A', 'B', 'C'],
      correctIndices: [0, 2],
    },
    {
      id: 'q4',
      type: 'numeric' as const,
      question: 'Q4',
      correctValue: 10,
      tolerance: 1,
      min: 0,
      max: 20,
    },
  ];

  it('calculates 100% for all correct answers', () => {
    const answers: QuestionAnswer[] = [
      { type: 'single_choice', value: 0 },
      { type: 'true_false', value: true },
      { type: 'multiple_select', value: [0, 2] },
      { type: 'numeric', value: 10 },
    ];

    const result = calculateQuizScore(questions, answers);
    expect(result.score).toBe(100);
    expect(result.correctCount).toBe(4);
    expect(result.totalQuestions).toBe(4);
  });

  it('calculates 0% for all incorrect answers', () => {
    const answers: QuestionAnswer[] = [
      { type: 'single_choice', value: 1 },
      { type: 'true_false', value: false },
      { type: 'multiple_select', value: [1] },
      { type: 'numeric', value: 20 },
    ];

    const result = calculateQuizScore(questions, answers);
    expect(result.score).toBe(0);
    expect(result.correctCount).toBe(0);
  });

  it('calculates 50% for half correct answers', () => {
    const answers: QuestionAnswer[] = [
      { type: 'single_choice', value: 0 },
      { type: 'true_false', value: true },
      { type: 'multiple_select', value: [1] },
      { type: 'numeric', value: 20 },
    ];

    const result = calculateQuizScore(questions, answers);
    expect(result.score).toBe(50);
    expect(result.correctCount).toBe(2);
  });

  it('handles null answers as incorrect', () => {
    const answers: (QuestionAnswer | null)[] = [
      { type: 'single_choice', value: 0 },
      null,
      null,
      null,
    ];

    const result = calculateQuizScore(questions, answers);
    expect(result.score).toBe(25);
    expect(result.correctCount).toBe(1);
  });

  it('returns 0 for empty questions array', () => {
    const result = calculateQuizScore([], []);
    expect(result.score).toBe(0);
    expect(result.totalQuestions).toBe(0);
  });

  it('tracks individual question results', () => {
    const answers: QuestionAnswer[] = [
      { type: 'single_choice', value: 0 },
      { type: 'true_false', value: false },
      { type: 'multiple_select', value: [0, 2] },
      { type: 'numeric', value: 20 },
    ];

    const result = calculateQuizScore(questions, answers);
    expect(result.questionResults[0].isCorrect).toBe(true);
    expect(result.questionResults[1].isCorrect).toBe(false);
    expect(result.questionResults[2].isCorrect).toBe(true);
    expect(result.questionResults[3].isCorrect).toBe(false);
  });
});

describe('getCorrectAnswerDisplay', () => {
  it('returns correct option text for single_choice', () => {
    const question: SingleChoiceQuestion = {
      id: 'q1',
      type: 'single_choice',
      question: 'Test',
      options: ['Apple', 'Banana', 'Cherry'],
      correctIndex: 1,
    };
    expect(getCorrectAnswerDisplay(question)).toBe('Banana');
  });

  it('returns joined options for multiple_select', () => {
    const question: MultipleSelectQuestion = {
      id: 'q2',
      type: 'multiple_select',
      question: 'Test',
      options: ['Apple', 'Banana', 'Cherry'],
      correctIndices: [0, 2],
    };
    expect(getCorrectAnswerDisplay(question)).toBe('Apple, Cherry');
  });

  it('returns True for true_false with true answer', () => {
    const question: TrueFalseQuestion = {
      id: 'q3',
      type: 'true_false',
      question: 'Test',
      correctAnswer: true,
    };
    expect(getCorrectAnswerDisplay(question)).toBe('True');
  });

  it('returns False for true_false with false answer', () => {
    const question: TrueFalseQuestion = {
      id: 'q4',
      type: 'true_false',
      question: 'Test',
      correctAnswer: false,
    };
    expect(getCorrectAnswerDisplay(question)).toBe('False');
  });

  it('returns value for numeric without tolerance', () => {
    const question: NumericQuestion = {
      id: 'q5',
      type: 'numeric',
      question: 'Test',
      correctValue: 42,
      tolerance: 0,
      min: 0,
      max: 100,
    };
    expect(getCorrectAnswerDisplay(question)).toBe('42');
  });

  it('returns value with tolerance for numeric', () => {
    const question: NumericQuestion = {
      id: 'q6',
      type: 'numeric',
      question: 'Test',
      correctValue: 50,
      tolerance: 5,
      min: 0,
      max: 100,
      unit: '%',
    };
    expect(getCorrectAnswerDisplay(question)).toBe('50 ± 5 %');
  });
});
