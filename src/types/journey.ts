/**
 * Journey Tab Type Definitions
 *
 * Types for Velocity Score, levels, sessions, streaks, certifications,
 * and the Smart Queue recommendation system.
 */

// =============================================================================
// Velocity Levels
// =============================================================================

export type VelocityLevel = 'novice' | 'swift' | 'rapid' | 'elite' | 'legendary';

export interface LevelDefinition {
  id: VelocityLevel;
  name: string;
  vsFloor: number;
  vsCeiling: number;
  order: number;
}

export const LEVEL_DEFINITIONS: LevelDefinition[] = [
  { id: 'novice', name: 'Novice', vsFloor: 0, vsCeiling: 25, order: 1 },
  { id: 'swift', name: 'Swift', vsFloor: 25, vsCeiling: 45, order: 2 },
  { id: 'rapid', name: 'Rapid', vsFloor: 45, vsCeiling: 70, order: 3 },
  { id: 'elite', name: 'Elite', vsFloor: 70, vsCeiling: 95, order: 4 },
  { id: 'legendary', name: 'Legendary', vsFloor: 95, vsCeiling: 100, order: 5 },
];

// =============================================================================
// User State (for Smart Queue recommendations)
// =============================================================================

export type UserState = 'neutral' | 'push' | 'consolidate';

// =============================================================================
// Comfort Band (WPM percentiles for recommendations)
// =============================================================================

export interface ComfortBand {
  floor: number;    // 25th percentile WPM
  median: number;   // 50th percentile WPM
  ceiling: number;  // 75th percentile WPM
}

export const DEFAULT_COMFORT_BAND: ComfortBand = {
  floor: 250,
  median: 300,
  ceiling: 350,
};

// =============================================================================
// Session Record
// =============================================================================

export type ArticleType = 'curriculum' | 'certification' | 'imported' | 'generated';
export type CardTypeChosen = 'primary' | 'stretch' | 'continue' | 'browse';

export interface JourneySession {
  id: string;
  wpm: number;
  comprehension: number;        // 0-100
  effectiveWpm: number;         // wpm * (comprehension / 100)
  articleId: string;
  articleType: ArticleType;
  completedAt: number;          // Unix timestamp
  vsAfter: number;              // VS after this session was recorded
  cardTypeChosen?: CardTypeChosen;
}

// =============================================================================
// Streak System
// =============================================================================

export interface StreakData {
  currentDays: number;
  longestDays: number;
  lastCompletedDate: string | null;  // ISO date string (YYYY-MM-DD)
  freezeAvailable: boolean;
  freezeUsedThisWeek: boolean;
  freezeLastReset: string | null;    // ISO date string of last Monday
}

export const DEFAULT_STREAK: StreakData = {
  currentDays: 0,
  longestDays: 0,
  lastCompletedDate: null,
  freezeAvailable: true,
  freezeUsedThisWeek: false,
  freezeLastReset: null,
};

// =============================================================================
// Baseline Stats (immutable after first 3 sessions)
// =============================================================================

export interface BaselineStats {
  avgWpm: number;
  avgComprehension: number;
  capturedAt: number;           // Unix timestamp
  sessionCount: number;         // Should be 3
}

// =============================================================================
// Speed Proof (for certification unlock)
// =============================================================================

export interface SpeedProof {
  wpm: number;
  comprehension: number;
  achievedAt: number;           // Unix timestamp
}

// =============================================================================
// Certification System
// =============================================================================

export type JourneyCertTier = 'speed_reader' | 'velocity_master' | 'transcendent';

export interface JourneyCertDefinition {
  tier: JourneyCertTier;
  name: string;
  description: string;
  icon: string;
  color: string;
  vsThreshold: number;
  speedProofWpm: number;
  speedProofMinComp: number;
  examWpm: number;
  examWords: number;
  examMinComp: number;
}

export const JOURNEY_CERT_DEFINITIONS: JourneyCertDefinition[] = [
  {
    tier: 'speed_reader',
    name: 'Speed Reader',
    description: 'Achieved VS 40 with 900 WPM capability',
    icon: '⚡',
    color: '#fab005',
    vsThreshold: 40,
    speedProofWpm: 900,
    speedProofMinComp: 70,
    examWpm: 900,
    examWords: 1000,
    examMinComp: 80,
  },
  {
    tier: 'velocity_master',
    name: 'Velocity Master',
    description: 'Achieved VS 60 with 1200 WPM capability',
    icon: '🔥',
    color: '#ff6b6b',
    vsThreshold: 60,
    speedProofWpm: 1200,
    speedProofMinComp: 70,
    examWpm: 1200,
    examWords: 2000,
    examMinComp: 80,
  },
  {
    tier: 'transcendent',
    name: 'Transcendent',
    description: 'Achieved VS 95 with 1500 WPM capability',
    icon: '👑',
    color: '#9775fa',
    vsThreshold: 95,
    speedProofWpm: 1500,
    speedProofMinComp: 70,
    examWpm: 1500,
    examWords: 3000,
    examMinComp: 80,
  },
];

export interface JourneyCertProgress {
  vsUnlocked: boolean;
  speedProofAchieved: boolean;
  examUnlocked: boolean;        // Both vsUnlocked AND speedProofAchieved
  examPassed: boolean;
  earnedAt?: number;            // Unix timestamp when exam was passed
  lastAttemptAt?: number;       // For 24-hour retry cooldown
}

export const DEFAULT_CERT_PROGRESS: JourneyCertProgress = {
  vsUnlocked: false,
  speedProofAchieved: false,
  examUnlocked: false,
  examPassed: false,
};

// =============================================================================
// Simple Version Milestones (WPM-based)
// =============================================================================

export interface SimpleMilestone {
  wpm: number;
  name: string;
  certTier?: JourneyCertTier;   // If this milestone unlocks a certification
}

export const SIMPLE_MILESTONES: SimpleMilestone[] = [
  { wpm: 300, name: 'Pace' },
  { wpm: 450, name: 'Quick' },
  { wpm: 600, name: 'Swift' },
  { wpm: 900, name: 'Rapid', certTier: 'speed_reader' },
  { wpm: 1200, name: 'Blaze', certTier: 'velocity_master' },
  { wpm: 1500, name: 'Apex', certTier: 'transcendent' },
];

// =============================================================================
// Certification Unlock Check Result
// =============================================================================

export interface CertUnlockStatus {
  canUnlock: boolean;
  vsUnlocked: boolean;
  speedProofAchieved: boolean;
  vsNeeded?: number;
  speedNeeded?: number;
  reason?: 'vs' | 'speed' | 'both';
}

// =============================================================================
// Insights Data
// =============================================================================

export interface ProgressInsight {
  available: boolean;
  baseline: BaselineStats | null;
  current: {
    avgWpm: number;
    avgComprehension: number;
  };
  deltaWpm: number;
  deltaComprehension: number;
}

export interface WeeklyTrendPoint {
  weekStart: string;            // ISO date string (YYYY-MM-DD)
  avgWpm: number;
  avgComprehension: number;
  sessionCount: number;
}

// =============================================================================
// Journey Path Node (for detailed view)
// =============================================================================

export interface JourneyPathNode {
  level: LevelDefinition;
  status: 'completed' | 'current' | 'future';
  reachedAt?: number;           // Unix timestamp when level was first reached
  certTier?: JourneyCertTier;   // Associated certification if any
  certEarned: boolean;
}

// =============================================================================
// Article Recommendation
// =============================================================================

export type RecommendationReason =
  | 'continue_topic'
  | 'new_topic'
  | 'stretch_goal'
  | 'consolidate'
  | 'certification_ready';

export interface ArticleRecommendation {
  articleId: string;
  topicId: string;
  title: string;
  topicName: string;
  wordCount: number;
  estimatedMinutes: number;
  suggestedWpm: number;
  reason: RecommendationReason;
}
