/**
 * Test Personas Module
 *
 * Provides pre-defined user personas for testing the app at different progress levels.
 * Each persona includes realistic session history, certification progress, and stats.
 *
 * Usage: Import applyPersona() and call with persona ID to set all stores.
 */

import { useJourneyStore } from '../store/journeyStore';
import { useLearningStore } from '../store/learningStore';
import { useSettingsStore } from '../store/settingsStore';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { calculateEffectiveWpm } from '../utils/journeyCalculations';
import { ARTICLES } from './curriculum';
import type {
  JourneySession,
  SpeedProof,
  JourneyCertTier,
  JourneyCertProgress,
  StreakData,
  BaselineStats,
  ArticleType,
} from '../types/journey';
import type { ArticleProgress, ArticleAttempt } from '../types/learning';

// =============================================================================
// Types
// =============================================================================

export interface TestPersona {
  id: string;
  name: string;
  description: string;
  targetWpm: number;
  targetComprehension: number;
  sessionCount: number;
  certProgress: Record<JourneyCertTier, JourneyCertProgress>;
  speedProofSpecs: Array<{ wpm: number; comprehension: number }>;
  streakDays: number;
  isPremium: boolean;
}

// =============================================================================
// Persona Definitions
// =============================================================================

const DEFAULT_CERT_PROGRESS: JourneyCertProgress = {
  vsUnlocked: false,
  speedProofAchieved: false,
  examUnlocked: false,
  examPassed: false,
};

export const TEST_PERSONAS: TestPersona[] = [
  // At-Milestone Personas
  {
    id: 'pace-newcomer',
    name: 'Pace Newcomer',
    description: 'Just hit the Pace milestone (300 WPM)',
    targetWpm: 300,
    targetComprehension: 82,
    sessionCount: 25,
    certProgress: {
      speed_reader: { ...DEFAULT_CERT_PROGRESS },
      velocity_master: { ...DEFAULT_CERT_PROGRESS },
      transcendent: { ...DEFAULT_CERT_PROGRESS },
    },
    speedProofSpecs: [],
    streakDays: 5,
    isPremium: true,
  },
  {
    id: 'speed-reader-fresh',
    name: 'Fresh Speed Reader',
    description: 'Just earned Speed Reader certification (600 WPM)',
    targetWpm: 600,
    targetComprehension: 84,
    sessionCount: 35,
    certProgress: {
      speed_reader: {
        vsUnlocked: true,
        speedProofAchieved: true,
        examUnlocked: true,
        examPassed: true,
        earnedAt: Date.now() - 86400000 * 2, // 2 days ago
      },
      velocity_master: { ...DEFAULT_CERT_PROGRESS },
      transcendent: { ...DEFAULT_CERT_PROGRESS },
    },
    speedProofSpecs: [{ wpm: 620, comprehension: 82 }],
    streakDays: 12,
    isPremium: true,
  },
  {
    id: 'velocity-master-pro',
    name: 'Velocity Master Pro',
    description: 'Has Speed Reader + Velocity Master (1200 WPM)',
    targetWpm: 1200,
    targetComprehension: 82,
    sessionCount: 45,
    certProgress: {
      speed_reader: {
        vsUnlocked: true,
        speedProofAchieved: true,
        examUnlocked: true,
        examPassed: true,
        earnedAt: Date.now() - 86400000 * 30, // 30 days ago
      },
      velocity_master: {
        vsUnlocked: true,
        speedProofAchieved: true,
        examUnlocked: true,
        examPassed: true,
        earnedAt: Date.now() - 86400000 * 7, // 7 days ago
      },
      transcendent: {
        vsUnlocked: false,
        speedProofAchieved: false,
        examUnlocked: false,
        examPassed: false,
      },
    },
    speedProofSpecs: [
      { wpm: 650, comprehension: 80 },
      { wpm: 950, comprehension: 78 },
    ],
    streakDays: 21,
    isPremium: true,
  },

  // Mid-Journey Personas
  {
    id: 'mid-quick-seeker',
    name: 'Quick Seeker',
    description: 'Between Pace and Quick milestones (375 WPM)',
    targetWpm: 375,
    targetComprehension: 78,
    sessionCount: 22,
    certProgress: {
      speed_reader: { ...DEFAULT_CERT_PROGRESS },
      velocity_master: { ...DEFAULT_CERT_PROGRESS },
      transcendent: { ...DEFAULT_CERT_PROGRESS },
    },
    speedProofSpecs: [],
    streakDays: 3,
    isPremium: true,
  },
  {
    id: 'mid-velocity-bound',
    name: 'Velocity Bound',
    description: 'Has Speed Reader, working toward Velocity Master (750 WPM)',
    targetWpm: 750,
    targetComprehension: 82,
    sessionCount: 38,
    certProgress: {
      speed_reader: {
        vsUnlocked: true,
        speedProofAchieved: true,
        examUnlocked: true,
        examPassed: true,
        earnedAt: Date.now() - 86400000 * 14, // 14 days ago
      },
      velocity_master: {
        vsUnlocked: true,
        speedProofAchieved: false,
        examUnlocked: false,
        examPassed: false,
      },
      transcendent: { ...DEFAULT_CERT_PROGRESS },
    },
    speedProofSpecs: [{ wpm: 630, comprehension: 80 }],
    streakDays: 8,
    isPremium: true,
  },
  {
    id: 'mid-transcendent-path',
    name: 'Transcendent Path',
    description: 'Has SR + VM, working toward Transcendent (1050 WPM)',
    targetWpm: 1050,
    targetComprehension: 80,
    sessionCount: 42,
    certProgress: {
      speed_reader: {
        vsUnlocked: true,
        speedProofAchieved: true,
        examUnlocked: true,
        examPassed: true,
        earnedAt: Date.now() - 86400000 * 45, // 45 days ago
      },
      velocity_master: {
        vsUnlocked: true,
        speedProofAchieved: true,
        examUnlocked: true,
        examPassed: true,
        earnedAt: Date.now() - 86400000 * 10, // 10 days ago
      },
      transcendent: {
        vsUnlocked: false,
        speedProofAchieved: false,
        examUnlocked: false,
        examPassed: false,
      },
    },
    speedProofSpecs: [
      { wpm: 620, comprehension: 82 },
      { wpm: 920, comprehension: 76 },
    ],
    streakDays: 15,
    isPremium: true,
  },
];

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get practice article IDs for session generation
 */
function getPracticeArticleIds(): string[] {
  return ARTICLES
    .filter((a) => a.articleType === 'practice' || !a.articleType)
    .map((a) => a.id);
}

/**
 * Generate a random number within a range
 */
function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Clamp a number between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Generate a unique session ID
 */
function generateSessionId(): string {
  return `test_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get today's date string in YYYY-MM-DD format
 */
function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get the last Monday's date string
 */
function getLastMondayDateString(): string {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysToSubtract);
  return lastMonday.toISOString().split('T')[0];
}

// =============================================================================
// Session & Data Generators
// =============================================================================

/**
 * Generate realistic session history for a persona
 */
export function generatePersonaSessions(persona: TestPersona): JourneySession[] {
  const sessions: JourneySession[] = [];
  const articleIds = getPracticeArticleIds();
  const now = Date.now();

  // Work backwards from 1 hour ago
  let timestamp = now - 3600000;

  for (let i = 0; i < persona.sessionCount; i++) {
    // Go back 4-48 hours between sessions
    const hoursBack = randomInRange(4, 48);
    timestamp -= hoursBack * 3600000;

    // Generate WPM with variance
    const wpm = clamp(
      persona.targetWpm + randomInRange(-50, 50),
      100,
      1500
    );

    // Generate comprehension with variance
    const comprehension = clamp(
      persona.targetComprehension + randomInRange(-10, 10),
      70,
      95
    );

    const effectiveWpm = calculateEffectiveWpm(wpm, comprehension);

    // Cycle through article IDs
    const articleId = articleIds[i % articleIds.length];

    sessions.push({
      id: generateSessionId(),
      wpm,
      comprehension,
      effectiveWpm,
      articleId,
      articleType: 'curriculum' as ArticleType,
      completedAt: timestamp,
      vsAfter: 0, // Will be recalculated
    });
  }

  // Return in chronological order (oldest first)
  return sessions.reverse();
}

/**
 * Generate speed proofs from specifications
 */
export function generateSpeedProofs(
  specs: Array<{ wpm: number; comprehension: number }>
): SpeedProof[] {
  const now = Date.now();

  return specs.map((spec, index) => ({
    wpm: spec.wpm,
    comprehension: spec.comprehension,
    achievedAt: now - 86400000 * (specs.length - index) * 7, // Spaced 1 week apart
  }));
}

/**
 * Generate baseline stats from first 3 sessions
 */
export function generateBaseline(sessions: JourneySession[]): BaselineStats | null {
  if (sessions.length < 3) {
    return null;
  }

  const first3 = sessions.slice(0, 3);
  const avgWpm = Math.round(
    first3.reduce((sum, s) => sum + s.wpm, 0) / 3
  );
  const avgComprehension = Math.round(
    first3.reduce((sum, s) => sum + s.comprehension, 0) / 3
  );

  return {
    avgWpm,
    avgComprehension,
    capturedAt: first3[2].completedAt,
    sessionCount: 3,
  };
}

/**
 * Generate streak data for a persona
 */
export function generateStreak(streakDays: number): StreakData {
  return {
    currentDays: streakDays,
    longestDays: Math.max(streakDays, streakDays + randomInRange(0, 5)),
    lastCompletedDate: getTodayDateString(),
    freezeAvailable: true,
    freezeUsedThisWeek: false,
    freezeLastReset: getLastMondayDateString(),
  };
}

/**
 * Generate article progress from sessions for learningStore
 */
export function generateArticleProgress(
  sessions: JourneySession[]
): Record<string, ArticleProgress> {
  const progress: Record<string, ArticleProgress> = {};

  sessions.forEach((session) => {
    const existing = progress[session.articleId];

    const attempt: ArticleAttempt = {
      timestamp: session.completedAt,
      score: session.comprehension,
      wpm: session.wpm,
      isCertificationAttempt: false,
    };

    if (existing) {
      existing.comprehensionScore = Math.max(existing.comprehensionScore, session.comprehension);
      existing.highestWPM = Math.max(existing.highestWPM, session.wpm);
      existing.lastReadAt = session.completedAt;
      existing.attemptCount = (existing.attemptCount || 0) + 1;
      existing.attempts = [...(existing.attempts || []), attempt];
    } else {
      progress[session.articleId] = {
        articleId: session.articleId,
        completed: session.comprehension >= 70,
        comprehensionScore: session.comprehension,
        highestWPM: session.wpm,
        lastReadAt: session.completedAt,
        attemptCount: 1,
        attempts: [attempt],
      };
    }
  });

  return progress;
}

/**
 * Generate recent completions array for learningStore
 */
export function generateRecentCompletions(
  sessions: JourneySession[]
): Array<{
  articleId: string;
  wpm: number;
  score: number;
  timestamp: number;
  isCertificationText: boolean;
}> {
  // Get last 20 sessions
  return sessions.slice(-20).map((session) => ({
    articleId: session.articleId,
    wpm: session.wpm,
    score: session.comprehension,
    timestamp: session.completedAt,
    isCertificationText: false,
  }));
}

// =============================================================================
// Main Functions
// =============================================================================

/**
 * Apply a test persona to all stores
 */
export async function applyPersona(personaId: string): Promise<boolean> {
  const persona = TEST_PERSONAS.find((p) => p.id === personaId);
  if (!persona) {
    console.error(`Persona not found: ${personaId}`);
    return false;
  }

  // Generate data
  const sessions = generatePersonaSessions(persona);
  const speedProofs = generateSpeedProofs(persona.speedProofSpecs);
  const baseline = generateBaseline(sessions);
  const streak = generateStreak(persona.streakDays);
  const articleProgress = generateArticleProgress(sessions);
  const recentCompletions = generateRecentCompletions(sessions);

  // Apply to journeyStore
  const journeyStore = useJourneyStore.getState();
  journeyStore.hydrateForTesting({
    sessions,
    speedProofs,
    certProgress: persona.certProgress,
    streak,
    baseline,
  });

  // Apply to learningStore
  const learningStore = useLearningStore.getState();
  learningStore.hydrateForTesting({
    articleProgress,
    currentWPM: persona.targetWpm,
    recentCompletions,
  });

  // Apply to subscriptionStore
  const subscriptionStore = useSubscriptionStore.getState();
  subscriptionStore.hydrateForTesting({
    isPremium: persona.isPremium,
    contentAccessCount: 0,
  });

  // Apply to settingsStore
  const settingsStore = useSettingsStore.getState();
  settingsStore.hydrateForTesting({
    defaultWPM: persona.targetWpm,
    userName: persona.name,
  });

  return true;
}

/**
 * Reset all stores to clean slate (new user state)
 */
export async function resetToCleanSlate(): Promise<void> {
  // Reset journeyStore
  useJourneyStore.getState().resetJourneyData();

  // Reset learningStore
  useLearningStore.getState().resetProgress();

  // Reset subscriptionStore to free tier
  useSubscriptionStore.getState().hydrateForTesting({
    isPremium: false,
    contentAccessCount: 0,
  });

  // Reset settingsStore to defaults
  useSettingsStore.getState().resetSettings();
}

/**
 * Get persona by ID
 */
export function getPersonaById(personaId: string): TestPersona | undefined {
  return TEST_PERSONAS.find((p) => p.id === personaId);
}

/**
 * Get the count of earned certifications for a persona
 */
export function getPersonaCertCount(persona: TestPersona): number {
  return Object.values(persona.certProgress).filter((p) => p.examPassed).length;
}
