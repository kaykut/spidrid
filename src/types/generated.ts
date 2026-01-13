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

export type ArticleTone = 'explanatory' | 'storytelling' | 'analogical';

export interface ToneDefinition {
  id: ArticleTone;
  label: string;
  description: string;
  emoji: string;
  promptModifier: string;
}

export const TONE_DEFINITIONS: ToneDefinition[] = [
  {
    id: 'explanatory',
    label: 'Facts',
    description: 'Clear and educational',
    emoji: '📚',
    promptModifier:
      'Write in a clear, educational style. Break down concepts step-by-step. Anticipate reader questions and address them. Use examples liberally.',
  },
  {
    id: 'storytelling',
    label: 'Story',
    description: 'Narrative and engaging',
    emoji: '📖',
    promptModifier:
      'Write as if telling a story. Use narrative techniques: set scenes, introduce characters or personas, create tension, deliver payoffs. Make dry facts come alive through narrative.',
  },
  {
    id: 'analogical',
    label: 'Analogy',
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
// WPM-Based Article Length Caps
// =============================================================================

/**
 * Returns the maximum words per article based on user's reading speed.
 * Faster readers can handle longer articles (up to ~3 min read time).
 */
export function getMaxWordsForWpm(wpm: number): number {
  if (wpm < 200) {return 500;}
  if (wpm < 350) {return 900;}
  if (wpm < 500) {return 1300;}
  if (wpm < 700) {return 1800;}
  return 2100;
}

// =============================================================================
// Preset Options for Learn Card
// =============================================================================

export type PresetId = 'nugget' | 'primer' | 'topic' | 'deep-dive';

export interface PresetOption {
  id: PresetId;
  label: string;
  articles: number;
  durationMinutes: number;
}

export const PRESET_OPTIONS: readonly PresetOption[] = [
  { id: 'nugget', label: 'Nugget', articles: 1, durationMinutes: 2 },
  { id: 'primer', label: 'Primer', articles: 3, durationMinutes: 3 },
  { id: 'topic', label: 'Topic', articles: 5, durationMinutes: 3 },
  { id: 'deep-dive', label: 'Deep Dive', articles: 10, durationMinutes: 3 },
] as const;

// Total duration options for Design mode (Layer 2)
export const TOTAL_DURATION_OPTIONS = [5, 10, 15, 20, 30] as const;

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
  tone: ArticleTone | 'auto';
  tonePrompt?: string; // Optional when tone is 'auto'
  userId: string;
  articleCount?: number; // For curriculum generation
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
