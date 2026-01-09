/**
 * Generated Article Types
 *
 * Types for AI-generated articles via the Learn tab.
 * Uses Google Gemini 3.0 for content generation.
 */

import { Question } from './learning';

// =============================================================================
// Article Tone Definitions
// =============================================================================

export type ArticleTone =
  | 'robotic'
  | 'explanatory'
  | 'sarcastic'
  | 'storytelling'
  | 'analogical';

export interface ToneDefinition {
  id: ArticleTone;
  label: string;
  description: string;
  emoji: string;
  promptModifier: string;
}

export const TONE_DEFINITIONS: ToneDefinition[] = [
  {
    id: 'robotic',
    label: 'Robotic',
    description: 'Clinical and technical',
    emoji: '🤖',
    promptModifier:
      'Write in a clinical, technical, matter-of-fact style. Be precise and avoid emotional language. Present information systematically.',
  },
  {
    id: 'explanatory',
    label: 'Explanatory',
    description: 'Clear and educational',
    emoji: '📚',
    promptModifier:
      'Write in a clear, educational style. Break down concepts step-by-step. Anticipate reader questions and address them. Use examples liberally.',
  },
  {
    id: 'sarcastic',
    label: 'Sarcastic',
    description: 'Witty and irreverent',
    emoji: '😏',
    promptModifier:
      'Write with dry wit and occasional sarcasm. Be irreverent but still informative. Use humor to make points memorable. Do not be mean-spirited.',
  },
  {
    id: 'storytelling',
    label: 'Storytelling',
    description: 'Narrative and engaging',
    emoji: '📖',
    promptModifier:
      'Write as if telling a story. Use narrative techniques: set scenes, introduce characters or personas, create tension, deliver payoffs. Make dry facts come alive through narrative.',
  },
  {
    id: 'analogical',
    label: 'Analogical',
    description: 'Rich in comparisons',
    emoji: '🔗',
    promptModifier:
      'Explain every concept using analogies and metaphors. Relate abstract ideas to everyday experiences. Help the reader see familiar patterns in new material.',
  },
];

// =============================================================================
// Duration Options
// =============================================================================

export interface DurationOption {
  minutes: number;
  label: string;
}

export const DURATION_OPTIONS: DurationOption[] = [
  { minutes: 1, label: '1 min' },
  { minutes: 2, label: '2 min' },
  { minutes: 3, label: '3 min' },
  { minutes: 5, label: '5 min' },
  { minutes: 10, label: '10 min' },
];

// =============================================================================
// Generation Status
// =============================================================================

export type GenerationStatus = 'pending' | 'generating' | 'complete' | 'error';

// =============================================================================
// Generated Article
// =============================================================================

export interface GeneratedArticle {
  id: string;
  topic: string;
  targetDuration: number;
  tone: ArticleTone;
  title: string;
  content: string;
  wordCount: number;
  questions: Question[];
  status: GenerationStatus;
  errorMessage?: string;
  generatedAt: number;
  completed: boolean;
  comprehensionScore?: number;
  highestWPM?: number;
  lastReadAt?: number;
  attemptCount: number;
}

// =============================================================================
// API Request/Response Types
// =============================================================================

export interface GenerateArticleRequest {
  topic: string;
  targetWordCount: number;
  tone: ArticleTone;
  tonePrompt: string;
  userId: string;
}

export interface GenerateArticleResponse {
  success: boolean;
  article?: {
    title: string;
    content: string;
    wordCount: number;
    questions: Question[];
  };
  error?: string;
  errorCode?: 'NOT_PREMIUM' | 'RATE_LIMITED' | 'GENERATION_FAILED' | 'INVALID_REQUEST';
}
