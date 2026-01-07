import { normalizeQuestion } from '../types/learning';
import type { QuestionAnswer } from '../components/quiz/QuestionRenderer';
import type { Question, ComprehensionQuestion } from '../types/learning';

export interface QuizResult {
  /** Total score as percentage (0-100) */
  score: number;
  /** Number of correct answers */
  correctCount: number;
  /** Total number of questions */
  totalQuestions: number;
  /** Results for each question */
  questionResults: QuestionResult[];
}

export interface QuestionResult {
  questionId: string;
  isCorrect: boolean;
  /** Points earned (0-1 for most types, can be partial for multiple_select) */
  points: number;
}

/**
 * Check if a single question answer is correct
 */
export function isAnswerCorrect(
  question: Question | ComprehensionQuestion,
  answer: QuestionAnswer
): boolean {
  const normalized = normalizeQuestion(question);

  switch (normalized.type) {
    case 'single_choice':
      return answer.type === 'single_choice' && answer.value === normalized.correctIndex;

    case 'multiple_select':
      if (answer.type !== 'multiple_select') { return false; }
      const selectedSet = new Set(answer.value);
      const correctSet = new Set(normalized.correctIndices);
      if (selectedSet.size !== correctSet.size) { return false; }
      for (const index of selectedSet) {
        if (!correctSet.has(index)) { return false; }
      }
      return true;

    case 'true_false':
      return answer.type === 'true_false' && answer.value === normalized.correctAnswer;

    case 'numeric':
      if (answer.type !== 'numeric') { return false; }
      return Math.abs(answer.value - normalized.correctValue) <= normalized.tolerance;

    default:
      return false;
  }
}

/**
 * Calculate points for a single question answer
 * Most questions are all-or-nothing (0 or 1 point)
 * Multiple select could support partial credit in the future
 */
export function calculateQuestionPoints(
  question: Question | ComprehensionQuestion,
  answer: QuestionAnswer
): number {
  // Currently all-or-nothing scoring
  return isAnswerCorrect(question, answer) ? 1 : 0;
}

/**
 * Calculate the total quiz score from questions and answers
 */
export function calculateQuizScore(
  questions: (Question | ComprehensionQuestion)[],
  answers: (QuestionAnswer | null)[]
): QuizResult {
  if (questions.length === 0) {
    return {
      score: 0,
      correctCount: 0,
      totalQuestions: 0,
      questionResults: [],
    };
  }

  const questionResults: QuestionResult[] = questions.map((question, index) => {
    const answer = answers[index];

    // No answer means 0 points
    if (!answer) {
      return {
        questionId: question.id,
        isCorrect: false,
        points: 0,
      };
    }

    const points = calculateQuestionPoints(question, answer);

    return {
      questionId: question.id,
      isCorrect: points === 1,
      points,
    };
  });

  const totalPoints = questionResults.reduce((sum, result) => sum + result.points, 0);
  const correctCount = questionResults.filter((r) => r.isCorrect).length;
  const score = Math.round((totalPoints / questions.length) * 100);

  return {
    score,
    correctCount,
    totalQuestions: questions.length,
    questionResults,
  };
}

/**
 * Get the correct answer description for display
 */
export function getCorrectAnswerDisplay(
  question: Question | ComprehensionQuestion
): string {
  const normalized = normalizeQuestion(question);

  switch (normalized.type) {
    case 'single_choice':
      return normalized.options[normalized.correctIndex];

    case 'multiple_select':
      return normalized.correctIndices.map((i) => normalized.options[i]).join(', ');

    case 'true_false':
      return normalized.correctAnswer ? 'True' : 'False';

    case 'numeric':
      const { correctValue, tolerance, unit } = normalized;
      if (tolerance === 0) {
        return `${correctValue}${unit ? ` ${unit}` : ''}`;
      }
      return `${correctValue} ± ${tolerance}${unit ? ` ${unit}` : ''}`;

    default:
      return '';
  }
}
