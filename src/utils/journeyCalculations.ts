/**
 * Journey Calculation Utilities
 *
 * Pure functions for Velocity Score, level detection, user state,
 * comfort band, and streak calculations. These are separated from
 * the store for testability.
 */

import {
  VelocityLevel,
  UserState,
  ComfortBand,
  JourneySession,
  StreakData,
  BaselineStats,
  SpeedProof,
  JourneyCertTier,
  JourneyCertDefinition,
  CertUnlockStatus,
  WeeklyTrendPoint,
  SimpleMilestone,
  LEVEL_DEFINITIONS,
  JOURNEY_CERT_DEFINITIONS,
  SIMPLE_MILESTONES,
  DEFAULT_COMFORT_BAND,
} from '../types/journey';

// =============================================================================
// Velocity Score Calculations
// =============================================================================

/**
 * Calculate effective WPM from raw WPM and comprehension
 * Effective WPM = Raw WPM × (Comprehension / 100)
 */
export function calculateEffectiveWpm(wpm: number, comprehension: number): number {
  return Math.round(wpm * (comprehension / 100));
}

/**
 * Calculate Velocity Score from session history
 * VS = avg(last 5 Effective WPMs) / 12, capped at 100
 */
export function calculateVelocityScore(sessions: JourneySession[]): number {
  if (sessions.length === 0) {return 0;}

  const last5 = sessions.slice(-5);
  const effectiveWpms = last5.map((s) => s.effectiveWpm);
  const avgEffective = effectiveWpms.reduce((a, b) => a + b, 0) / effectiveWpms.length;

  return Math.min(Math.round(avgEffective / 12), 100);
}

/**
 * Get the velocity level from a VS value
 */
export function getLevelFromVS(vs: number): VelocityLevel {
  if (vs >= 95) {return 'legendary';}
  if (vs >= 70) {return 'elite';}
  if (vs >= 45) {return 'rapid';}
  if (vs >= 25) {return 'swift';}
  return 'novice';
}

/**
 * Get progress within current level (0-1)
 */
export function getLevelProgress(vs: number): number {
  const level = LEVEL_DEFINITIONS.find((l) => l.id === getLevelFromVS(vs));
  if (!level) {return 0;}

  const range = level.vsCeiling - level.vsFloor;
  if (range === 0) {return 1;}

  const progress = (vs - level.vsFloor) / range;
  return Math.max(0, Math.min(1, progress));
}

/**
 * Get the level definition by ID
 */
export function getLevelDefinition(level: VelocityLevel) {
  return LEVEL_DEFINITIONS.find((l) => l.id === level);
}

/**
 * Calculate VS needed to reach next level
 */
export function getVSToNextLevel(vs: number): number | null {
  const currentLevel = getLevelFromVS(vs);
  const levelDef = getLevelDefinition(currentLevel);
  if (!levelDef || currentLevel === 'legendary') {return null;}

  return levelDef.vsCeiling - vs;
}

// =============================================================================
// Aggregated Stats
// =============================================================================

/**
 * Calculate average WPM from last N sessions
 */
export function calculateAvgWpm(sessions: JourneySession[], count: number): number {
  if (sessions.length === 0) {return 0;}
  const slice = sessions.slice(-count);
  return Math.round(slice.reduce((sum, s) => sum + s.wpm, 0) / slice.length);
}

/**
 * Calculate average comprehension from last N sessions
 */
export function calculateAvgComprehension(sessions: JourneySession[], count: number): number {
  if (sessions.length === 0) {return 0;}
  const slice = sessions.slice(-count);
  return Math.round(slice.reduce((sum, s) => sum + s.comprehension, 0) / slice.length);
}

/**
 * Get best WPM with at least 80% comprehension
 */
export function calculateBestWpmAt80(sessions: JourneySession[]): number {
  const validSessions = sessions.filter((s) => s.comprehension >= 80);
  if (validSessions.length === 0) {return 0;}
  return Math.max(...validSessions.map((s) => s.wpm));
}

// =============================================================================
// User State Detection
// =============================================================================

/**
 * Detect user state from last 2 sessions
 * - PUSH: Last 2 sessions >= 75% comprehension
 * - CONSOLIDATE: Last 2 sessions < 60% comprehension
 * - NEUTRAL: Default/mixed results
 */
export function detectUserState(sessions: JourneySession[]): UserState {
  if (sessions.length < 2) {return 'neutral';}

  const last2 = sessions.slice(-2);
  const comps = last2.map((s) => s.comprehension);

  if (comps.every((c) => c >= 75)) {return 'push';}
  if (comps.every((c) => c < 60)) {return 'consolidate';}
  return 'neutral';
}

// =============================================================================
// Comfort Band Calculation
// =============================================================================

/**
 * Calculate percentile from sorted array
 */
function percentile(sortedArr: number[], p: number): number {
  if (sortedArr.length === 0) {return 0;}
  if (sortedArr.length === 1) {return sortedArr[0];}

  const idx = (p / 100) * (sortedArr.length - 1);
  const lower = Math.floor(idx);
  const upper = Math.ceil(idx);

  if (lower === upper) {return sortedArr[lower];}
  return Math.round(sortedArr[lower] * (upper - idx) + sortedArr[upper] * (idx - lower));
}

/**
 * Calculate comfort band from last 10 sessions with >= 70% comprehension
 */
export function calculateComfortBand(sessions: JourneySession[]): ComfortBand {
  const validSessions = sessions.slice(-10).filter((s) => s.comprehension >= 70);

  if (validSessions.length < 3) {
    return DEFAULT_COMFORT_BAND;
  }

  const wpms = validSessions.map((s) => s.wpm).sort((a, b) => a - b);

  return {
    floor: percentile(wpms, 25),
    median: percentile(wpms, 50),
    ceiling: percentile(wpms, 75),
  };
}

/**
 * Get suggested WPM based on user state and card type
 */
export function getSuggestedWpm(
  comfortBand: ComfortBand,
  userState: UserState,
  cardType: 'primary' | 'stretch'
): number {
  if (cardType === 'stretch') {
    if (userState === 'consolidate') {return 0;} // Stretch not shown
    if (userState === 'push') {return Math.round(comfortBand.ceiling * 1.15);}
    return Math.round(comfortBand.ceiling * 1.1);
  }

  // Primary card
  switch (userState) {
    case 'push':
      return comfortBand.ceiling;
    case 'consolidate':
      return comfortBand.floor;
    default:
      return comfortBand.median;
  }
}

// =============================================================================
// Streak Calculations
// =============================================================================

/**
 * Get today's date as YYYY-MM-DD string
 */
export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get yesterday's date as YYYY-MM-DD string
 */
export function getYesterdayDateString(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

/**
 * Get last Monday's date as YYYY-MM-DD string
 */
export function getLastMondayDateString(): string {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust for Sunday
  const monday = new Date(today);
  monday.setDate(today.getDate() - diff);
  return monday.toISOString().split('T')[0];
}

/**
 * Check if streak should reset freeze availability (new week)
 */
export function shouldResetFreeze(streak: StreakData): boolean {
  const lastMonday = getLastMondayDateString();
  return streak.freezeLastReset !== lastMonday;
}

/**
 * Calculate updated streak data after completing a session
 */
export function calculateStreakUpdate(
  currentStreak: StreakData,
  completionDate?: string
): StreakData {
  const today = completionDate || getTodayDateString();
  const yesterday = getYesterdayDateString();

  // Check if freeze should reset (new week)
  let updatedStreak = { ...currentStreak };
  if (shouldResetFreeze(currentStreak)) {
    updatedStreak = {
      ...updatedStreak,
      freezeAvailable: true,
      freezeUsedThisWeek: false,
      freezeLastReset: getLastMondayDateString(),
    };
  }

  // Already completed today - no change needed
  if (updatedStreak.lastCompletedDate === today) {
    return updatedStreak;
  }

  // First completion ever
  if (!updatedStreak.lastCompletedDate) {
    return {
      ...updatedStreak,
      currentDays: 1,
      longestDays: Math.max(updatedStreak.longestDays, 1),
      lastCompletedDate: today,
    };
  }

  // Completed yesterday - extend streak
  if (updatedStreak.lastCompletedDate === yesterday) {
    const newCurrent = updatedStreak.currentDays + 1;
    return {
      ...updatedStreak,
      currentDays: newCurrent,
      longestDays: Math.max(updatedStreak.longestDays, newCurrent),
      lastCompletedDate: today,
    };
  }

  // Missed days - streak breaks, start fresh
  return {
    ...updatedStreak,
    currentDays: 1,
    longestDays: updatedStreak.longestDays, // Keep longest
    lastCompletedDate: today,
  };
}

/**
 * Check if streak freeze should be applied (called at app launch)
 * Returns updated streak if freeze was applied, or null if no change
 */
export function checkAndApplyStreakFreeze(currentStreak: StreakData): StreakData | null {
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  // Already completed today - no freeze needed
  if (currentStreak.lastCompletedDate === today) {
    return null;
  }

  // Completed yesterday - streak still valid, no freeze needed
  if (currentStreak.lastCompletedDate === yesterday) {
    return null;
  }

  // No streak to protect
  if (currentStreak.currentDays === 0) {
    return null;
  }

  // Already used freeze this week
  if (currentStreak.freezeUsedThisWeek || !currentStreak.freezeAvailable) {
    return null;
  }

  // Apply freeze - preserve streak by "completing" yesterday
  return {
    ...currentStreak,
    lastCompletedDate: yesterday,
    freezeUsedThisWeek: true,
    freezeAvailable: false,
  };
}

/**
 * Check if streak is at risk (no completion today and freeze unavailable)
 */
export function isStreakAtRisk(streak: StreakData): boolean {
  const today = getTodayDateString();
  if (streak.lastCompletedDate === today) {return false;}
  if (streak.currentDays === 0) {return false;}
  return !streak.freezeAvailable || streak.freezeUsedThisWeek;
}

// =============================================================================
// Baseline Stats
// =============================================================================

/**
 * Capture baseline from first 3 sessions
 */
export function captureBaseline(sessions: JourneySession[]): BaselineStats | null {
  if (sessions.length < 3) {return null;}

  const first3 = sessions.slice(0, 3);
  return {
    avgWpm: Math.round(first3.reduce((sum, s) => sum + s.wpm, 0) / 3),
    avgComprehension: Math.round(first3.reduce((sum, s) => sum + s.comprehension, 0) / 3),
    capturedAt: first3[2].completedAt,
    sessionCount: 3,
  };
}

// =============================================================================
// Certification System
// =============================================================================

/**
 * Get certification definition by tier
 */
export function getCertDefinition(tier: JourneyCertTier): JourneyCertDefinition | undefined {
  return JOURNEY_CERT_DEFINITIONS.find((c) => c.tier === tier);
}

/**
 * Check if a speed proof exists for a certification tier
 */
export function hasSpeedProofForTier(
  speedProofs: SpeedProof[],
  tier: JourneyCertTier
): boolean {
  const certDef = getCertDefinition(tier);
  if (!certDef) {return false;}

  return speedProofs.some(
    (proof) =>
      proof.wpm >= certDef.speedProofWpm && proof.comprehension >= certDef.speedProofMinComp
  );
}

/**
 * Check certification unlock status (dual unlock: VS + speed proof)
 */
export function checkCertUnlockStatus(
  vs: number,
  speedProofs: SpeedProof[],
  tier: JourneyCertTier
): CertUnlockStatus {
  const certDef = getCertDefinition(tier);
  if (!certDef) {
    return {
      canUnlock: false,
      vsUnlocked: false,
      speedProofAchieved: false,
      reason: 'both',
    };
  }

  const vsUnlocked = vs >= certDef.vsThreshold;
  const speedProofAchieved = hasSpeedProofForTier(speedProofs, tier);

  if (vsUnlocked && speedProofAchieved) {
    return { canUnlock: true, vsUnlocked: true, speedProofAchieved: true };
  }

  const getBlockedReason = (): 'both' | 'speed' | 'vs' => {
    if (!vsUnlocked && !speedProofAchieved) {return 'both';}
    if (vsUnlocked) {return 'speed';}
    return 'vs';
  };

  return {
    canUnlock: false,
    vsUnlocked,
    speedProofAchieved,
    vsNeeded: vsUnlocked ? undefined : certDef.vsThreshold,
    speedNeeded: speedProofAchieved ? undefined : certDef.speedProofWpm,
    reason: getBlockedReason(),
  };
}

/**
 * Check if a session qualifies as a speed proof
 */
export function isSpeedProof(
  wpm: number,
  comprehension: number,
  tier: JourneyCertTier
): boolean {
  const certDef = getCertDefinition(tier);
  if (!certDef) {return false;}

  return wpm >= certDef.speedProofWpm && comprehension >= certDef.speedProofMinComp;
}

/**
 * Get all speed proofs from a session (may qualify for multiple tiers)
 */
export function extractSpeedProofs(
  wpm: number,
  comprehension: number,
  timestamp: number
): SpeedProof[] {
  const proofs: SpeedProof[] = [];

  for (const certDef of JOURNEY_CERT_DEFINITIONS) {
    if (wpm >= certDef.speedProofWpm && comprehension >= certDef.speedProofMinComp) {
      proofs.push({ wpm, comprehension, achievedAt: timestamp });
      break; // Only need one proof per session
    }
  }

  return proofs;
}

// =============================================================================
// Simple Version Milestones
// =============================================================================

/**
 * Get current milestone and next milestone based on average WPM
 */
export function getMilestoneProgress(
  avgWpm: number
): { current: SimpleMilestone | null; next: SimpleMilestone | null; progress: number } {
  let current: SimpleMilestone | null = null;
  let next: SimpleMilestone | null = null;

  for (let i = 0; i < SIMPLE_MILESTONES.length; i++) {
    const milestone = SIMPLE_MILESTONES[i];
    if (avgWpm >= milestone.wpm) {
      current = milestone;
    } else {
      next = milestone;
      break;
    }
  }

  // If no next milestone, user has reached max
  if (!next && current) {
    return { current, next: null, progress: 1 };
  }

  // If no current, user hasn't reached first milestone
  if (!current && next) {
    const progress = avgWpm / next.wpm;
    return { current: null, next, progress: Math.max(0, Math.min(1, progress)) };
  }

  // Calculate progress between current and next
  if (current && next) {
    const range = next.wpm - current.wpm;
    const progressInRange = avgWpm - current.wpm;
    const progress = progressInRange / range;
    return { current, next, progress: Math.max(0, Math.min(1, progress)) };
  }

  return { current: null, next: SIMPLE_MILESTONES[0], progress: 0 };
}

// =============================================================================
// Progress Path Utilities (shared by horizontal and vertical paths)
// =============================================================================

export type MilestoneStatus = 'completed' | 'current' | 'future';

export interface MilestoneState {
  milestone: SimpleMilestone;
  index: number;
  status: MilestoneStatus;
  isNext: boolean;
}

/**
 * Calculate milestone states for progress visualization
 * Returns status for each milestone: completed, current, or future
 */
export function getMilestoneStates(avgWpm: number): MilestoneState[] {
  // Find the index of the last completed milestone
  let lastCompletedIndex = -1;
  for (let i = 0; i < SIMPLE_MILESTONES.length; i++) {
    if (avgWpm >= SIMPLE_MILESTONES[i].wpm) {
      lastCompletedIndex = i;
    } else {
      break;
    }
  }

  return SIMPLE_MILESTONES.map((milestone, index) => {
    let status: MilestoneStatus;
    let isNext = false;

    if (index < lastCompletedIndex) {
      // Past milestone - fully completed
      status = 'completed';
    } else if (index === lastCompletedIndex) {
      // Current position - this milestone is achieved
      status = 'current';
    } else if (index === lastCompletedIndex + 1) {
      // Next milestone - user is working toward this
      status = 'future';
      isNext = true;
    } else {
      // Future milestone
      status = 'future';
    }

    // Special case: if no milestones completed, first one is "next"
    if (lastCompletedIndex === -1 && index === 0) {
      isNext = true;
    }

    return { milestone, index, status, isNext };
  });
}

/**
 * Calculate overall progress percentage for gradient line fill
 * Returns 0-100 representing position along the full path
 */
export function calculatePathProgress(avgWpm: number): number {
  const totalSegments = SIMPLE_MILESTONES.length - 1;

  // Find the last completed milestone index
  let lastCompletedIndex = -1;
  for (let i = 0; i < SIMPLE_MILESTONES.length; i++) {
    if (avgWpm >= SIMPLE_MILESTONES[i].wpm) {
      lastCompletedIndex = i;
    } else {
      break;
    }
  }

  // Before first milestone
  if (lastCompletedIndex === -1) {
    const progress = avgWpm / SIMPLE_MILESTONES[0].wpm;
    return Math.max(0, progress * (100 / totalSegments) * 0.5);
  }

  // At or beyond last milestone
  if (lastCompletedIndex >= SIMPLE_MILESTONES.length - 1) {
    return 100;
  }

  // Between milestones - calculate partial progress
  const currentWpm = SIMPLE_MILESTONES[lastCompletedIndex].wpm;
  const nextWpm = SIMPLE_MILESTONES[lastCompletedIndex + 1].wpm;
  const segmentProgress = (avgWpm - currentWpm) / (nextWpm - currentWpm);

  // Base progress from completed segments + partial progress in current segment
  const basePercent = (lastCompletedIndex / totalSegments) * 100;
  const segmentPercent = segmentProgress * (100 / totalSegments);

  return Math.max(0, Math.min(100, basePercent + segmentPercent));
}

// =============================================================================
// Weekly Trend Analysis
// =============================================================================

/**
 * Get week start date (Monday) for a given timestamp
 */
export function getWeekStartDate(timestamp: number): string {
  const date = new Date(timestamp);
  const dayOfWeek = date.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  date.setDate(date.getDate() - diff);
  return date.toISOString().split('T')[0];
}

/**
 * Calculate weekly trend data for insights
 */
export function calculateWeeklyTrend(
  sessions: JourneySession[],
  weeks: number = 4
): WeeklyTrendPoint[] {
  const weekMap = new Map<string, JourneySession[]>();

  // Group sessions by week
  for (const session of sessions) {
    const weekStart = getWeekStartDate(session.completedAt);
    const existing = weekMap.get(weekStart) || [];
    existing.push(session);
    weekMap.set(weekStart, existing);
  }

  // Get last N weeks
  const sortedWeeks = Array.from(weekMap.keys()).sort().slice(-weeks);

  return sortedWeeks.map((weekStart) => {
    const weekSessions = weekMap.get(weekStart) || [];
    return {
      weekStart,
      avgWpm: Math.round(
        weekSessions.reduce((sum, s) => sum + s.wpm, 0) / weekSessions.length
      ),
      avgComprehension: Math.round(
        weekSessions.reduce((sum, s) => sum + s.comprehension, 0) / weekSessions.length
      ),
      sessionCount: weekSessions.length,
    };
  });
}

// =============================================================================
// UUID Generation
// =============================================================================

/**
 * Generate a simple UUID for session IDs
 */
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
