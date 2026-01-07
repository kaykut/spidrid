// Learning Mode Types

// ============================================================
// Question Types - Discriminated Union for Quiz Questions
// ============================================================

export type QuestionType = 'single_choice' | 'multiple_select' | 'true_false' | 'numeric';

export interface BaseQuestion {
  id: string;
  question: string;
}

/**
 * Single-choice question (select one correct answer from options)
 */
export interface SingleChoiceQuestion extends BaseQuestion {
  type: 'single_choice';
  options: string[];
  correctIndex: number;
}

/**
 * Multiple-select question (select all that apply)
 */
export interface MultipleSelectQuestion extends BaseQuestion {
  type: 'multiple_select';
  options: string[];
  correctIndices: number[];
}

/**
 * True/False question
 */
export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true_false';
  correctAnswer: boolean;
}

/**
 * Numeric question with slider input
 */
export interface NumericQuestion extends BaseQuestion {
  type: 'numeric';
  correctValue: number;
  tolerance: number; // Acceptable deviation (+/-)
  min: number;
  max: number;
  step?: number;
  unit?: string; // e.g., "years", "miles", "%"
}

/**
 * Union type for all question types
 */
export type Question =
  | SingleChoiceQuestion
  | MultipleSelectQuestion
  | TrueFalseQuestion
  | NumericQuestion;

/**
 * Legacy question format for backwards compatibility
 * @deprecated Use Question union type instead
 */
export interface ComprehensionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

/**
 * Convert legacy ComprehensionQuestion to SingleChoiceQuestion
 */
export function migrateLegacyQuestion(q: ComprehensionQuestion): SingleChoiceQuestion {
  return {
    id: q.id,
    type: 'single_choice',
    question: q.question,
    options: q.options,
    correctIndex: q.correctIndex,
  };
}

/**
 * Type guard to check if a question is legacy format (no type field)
 */
export function isLegacyQuestion(q: Question | ComprehensionQuestion): q is ComprehensionQuestion {
  return !('type' in q);
}

/**
 * Normalize any question to the new Question type
 */
export function normalizeQuestion(q: Question | ComprehensionQuestion): Question {
  if (isLegacyQuestion(q)) {
    return migrateLegacyQuestion(q);
  }
  return q;
}

// ============================================================
// Topic Types
// ============================================================

export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  /** @deprecated Use practiceArticleCount + certificationArticleCount */
  articleCount: number;
  /** Number of practice articles (target: 10) */
  practiceArticleCount?: number;
  /** Number of certification texts (target: 3) */
  certificationArticleCount?: number;
}

// ============================================================
// Article Types
// ============================================================

export type ArticleType = 'practice' | 'certification';
export type CertificationLength = 'short' | 'medium' | 'long';

export interface Article {
  id: string;
  topicId: string;
  title: string;
  content: string;
  wordCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  /** Questions can be new format or legacy format */
  questions: (Question | ComprehensionQuestion)[];
  /** Article type: practice (repeatable) or certification (first-try counts) */
  articleType?: ArticleType;
  /** Order within topic: 1-10 for practice, 1-3 for certification */
  orderIndex?: number;
  /** For certification articles: short (~1000w), medium (~2000w), long (~3000w) */
  certificationLength?: CertificationLength;
}

/**
 * Target word counts for practice articles (exponential progression)
 */
export const PRACTICE_WORD_COUNTS = [
  500,   // P01
  750,   // P02
  1000,  // P03
  1300,  // P04
  1700,  // P05
  2100,  // P06
  2500,  // P07
  2800,  // P08
  3000,  // P09
  3000,  // P10
] as const;

/**
 * Target word counts for certification texts
 */
export const CERTIFICATION_WORD_COUNTS: Record<CertificationLength, number> = {
  short: 1000,
  medium: 2000,
  long: 3000,
};

/**
 * Calculate recommended quiz size based on word count
 */
export function getRecommendedQuizSize(wordCount: number): number {
  return Math.min(20, Math.max(5, Math.floor(wordCount / 150)));
}

// ============================================================
// Progress Types
// ============================================================

/**
 * Record of a single article attempt
 */
export interface ArticleAttempt {
  timestamp: number;
  score: number; // 0-100
  wpm: number;
  isCertificationAttempt: boolean;
}

export interface ArticleProgress {
  articleId: string;
  /** Whether article has been passed (70%+ score) */
  completed: boolean;
  /** Best comprehension score achieved (0-100) */
  comprehensionScore: number;
  /** @deprecated Use comprehensionScore (kept for backwards compat) */
  bestScore?: number;
  /** Highest WPM achieved on this article */
  highestWPM: number;
  /** Timestamp of last read */
  lastReadAt: number;
  /** Total number of attempts */
  attemptCount?: number;
  /** For certification articles: whether first attempt has been used */
  certificationAttemptUsed?: boolean;
  /** Score from first certification attempt */
  certificationAttemptScore?: number;
  /** WPM from first certification attempt */
  certificationAttemptWPM?: number;
  /** Full attempt history (optional) */
  attempts?: ArticleAttempt[];
}

export interface TopicProgress {
  topicId: string;
  articlesCompleted: number;
  totalArticles: number;
  averageScore: number;
}

/**
 * Pass threshold for article completion (70%)
 */
export const PASS_THRESHOLD = 70;

/**
 * Check if a score is passing
 */
export function isPassing(score: number): boolean {
  return score >= PASS_THRESHOLD;
}
