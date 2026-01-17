/**
 * Tests for Journey Calculation Utilities
 *
 * Comprehensive tests for all pure functions used in the journey system:
 * - Velocity Score calculations
 * - Level detection and progress
 * - User state detection
 * - Comfort band calculations
 * - Streak management
 * - Certification system
 * - Milestone progress
 * - Weekly trends
 */

import {
  calculateEffectiveWpm,
  calculateVelocityScore,
  getLevelFromVS,
  getLevelProgress,
  getLevelDefinition,
  getVSToNextLevel,
  calculateAvgWpm,
  calculateAvgComprehension,
  calculateBestWpmAt80,
  detectUserState,
  calculateComfortBand,
  getSuggestedWpm,
  getTodayDateString,
  getYesterdayDateString,
  getLastMondayDateString,
  shouldResetFreeze,
  calculateStreakUpdate,
  checkAndApplyStreakFreeze,
  isStreakAtRisk,
  captureBaseline,
  getCertDefinition,
  hasSpeedProofForTier,
  checkCertUnlockStatus,
  isSpeedProof,
  extractSpeedProofs,
  getMilestoneProgress,
  getMilestoneStates,
  calculatePathProgress,
  getWeekStartDate,
  calculateWeeklyTrend,
  generateSessionId,
} from '../../src/utils/journeyCalculations';

import {
  JourneySession,
  StreakData,
  ComfortBand,
  DEFAULT_STREAK,
  DEFAULT_COMFORT_BAND,
  SpeedProof,
} from '../../src/types/journey';

// =============================================================================
// Test Helpers
// =============================================================================

function createMockSession(overrides: Partial<JourneySession> = {}): JourneySession {
  return {
    id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    wpm: 300,
    comprehension: 80,
    effectiveWpm: 240,
    articleId: 'test-article',
    articleType: 'curriculum',
    completedAt: Date.now(),
    vsAfter: 20,
    ...overrides,
  };
}

function createMockStreak(overrides: Partial<StreakData> = {}): StreakData {
  return {
    ...DEFAULT_STREAK,
    ...overrides,
  };
}

// =============================================================================
// Velocity Score Calculations
// =============================================================================

describe('calculateEffectiveWpm', () => {
  it('calculates effective WPM as wpm * (comprehension / 100)', () => {
    expect(calculateEffectiveWpm(300, 100)).toBe(300);
    expect(calculateEffectiveWpm(300, 80)).toBe(240);
    expect(calculateEffectiveWpm(500, 70)).toBe(350);
  });

  it('rounds to nearest integer', () => {
    expect(calculateEffectiveWpm(333, 75)).toBe(250); // 333 * 0.75 = 249.75 -> 250
    expect(calculateEffectiveWpm(100, 33)).toBe(33);
  });

  it('handles 0 comprehension', () => {
    expect(calculateEffectiveWpm(300, 0)).toBe(0);
  });

  it('handles 0 wpm', () => {
    expect(calculateEffectiveWpm(0, 100)).toBe(0);
  });

  it('handles high values', () => {
    expect(calculateEffectiveWpm(1500, 100)).toBe(1500);
    expect(calculateEffectiveWpm(1500, 90)).toBe(1350);
  });
});

describe('calculateVelocityScore', () => {
  it('returns 0 for empty sessions', () => {
    expect(calculateVelocityScore([])).toBe(0);
  });

  it('calculates VS from last 5 sessions', () => {
    // VS = avg(effectiveWpm) / 12, capped at 100
    const sessions = [
      createMockSession({ effectiveWpm: 240 }), // 300 WPM * 80%
      createMockSession({ effectiveWpm: 240 }),
      createMockSession({ effectiveWpm: 240 }),
      createMockSession({ effectiveWpm: 240 }),
      createMockSession({ effectiveWpm: 240 }),
    ];
    // avg = 240, VS = 240 / 12 = 20
    expect(calculateVelocityScore(sessions)).toBe(20);
  });

  it('uses only last 5 sessions when more exist', () => {
    const oldSessions = [
      createMockSession({ effectiveWpm: 120 }), // Lower values
      createMockSession({ effectiveWpm: 120 }),
    ];
    const recentSessions = [
      createMockSession({ effectiveWpm: 600 }), // Higher values
      createMockSession({ effectiveWpm: 600 }),
      createMockSession({ effectiveWpm: 600 }),
      createMockSession({ effectiveWpm: 600 }),
      createMockSession({ effectiveWpm: 600 }),
    ];
    // avg of last 5 = 600, VS = 600 / 12 = 50
    expect(calculateVelocityScore([...oldSessions, ...recentSessions])).toBe(50);
  });

  it('handles fewer than 5 sessions', () => {
    const sessions = [
      createMockSession({ effectiveWpm: 360 }),
      createMockSession({ effectiveWpm: 360 }),
    ];
    // avg = 360, VS = 360 / 12 = 30
    expect(calculateVelocityScore(sessions)).toBe(30);
  });

  it('caps VS at 100', () => {
    const sessions = [
      createMockSession({ effectiveWpm: 1500 }),
      createMockSession({ effectiveWpm: 1500 }),
      createMockSession({ effectiveWpm: 1500 }),
      createMockSession({ effectiveWpm: 1500 }),
      createMockSession({ effectiveWpm: 1500 }),
    ];
    // avg = 1500, VS = 1500 / 12 = 125 -> capped at 100
    expect(calculateVelocityScore(sessions)).toBe(100);
  });

  it('rounds to nearest integer', () => {
    const sessions = [
      createMockSession({ effectiveWpm: 250 }),
    ];
    // avg = 250, VS = 250 / 12 = 20.83 -> 21
    expect(calculateVelocityScore(sessions)).toBe(21);
  });
});

describe('getLevelFromVS', () => {
  it('returns novice for VS < 25', () => {
    expect(getLevelFromVS(0)).toBe('novice');
    expect(getLevelFromVS(10)).toBe('novice');
    expect(getLevelFromVS(24)).toBe('novice');
  });

  it('returns swift for VS 25-44', () => {
    expect(getLevelFromVS(25)).toBe('swift');
    expect(getLevelFromVS(35)).toBe('swift');
    expect(getLevelFromVS(44)).toBe('swift');
  });

  it('returns rapid for VS 45-69', () => {
    expect(getLevelFromVS(45)).toBe('rapid');
    expect(getLevelFromVS(55)).toBe('rapid');
    expect(getLevelFromVS(69)).toBe('rapid');
  });

  it('returns elite for VS 70-94', () => {
    expect(getLevelFromVS(70)).toBe('elite');
    expect(getLevelFromVS(80)).toBe('elite');
    expect(getLevelFromVS(94)).toBe('elite');
  });

  it('returns legendary for VS >= 95', () => {
    expect(getLevelFromVS(95)).toBe('legendary');
    expect(getLevelFromVS(100)).toBe('legendary');
  });
});

describe('getLevelProgress', () => {
  it('returns 0 for VS at level floor', () => {
    expect(getLevelProgress(0)).toBe(0);
    expect(getLevelProgress(25)).toBe(0);
    expect(getLevelProgress(45)).toBe(0);
    expect(getLevelProgress(70)).toBe(0);
    expect(getLevelProgress(95)).toBe(0);
  });

  it('returns progress within level range', () => {
    // Novice: 0-25 (range 25)
    expect(getLevelProgress(12.5)).toBeCloseTo(0.5, 2);

    // Swift: 25-45 (range 20)
    expect(getLevelProgress(35)).toBe(0.5);

    // Rapid: 45-70 (range 25)
    expect(getLevelProgress(57.5)).toBeCloseTo(0.5, 2);

    // Elite: 70-95 (range 25)
    expect(getLevelProgress(82.5)).toBeCloseTo(0.5, 2);
  });

  it('returns 1 for legendary at max VS', () => {
    // Legendary: 95-100 (range 5)
    expect(getLevelProgress(100)).toBe(1);
  });

  it('clamps progress between 0 and 1', () => {
    const progress = getLevelProgress(97.5);
    expect(progress).toBeGreaterThanOrEqual(0);
    expect(progress).toBeLessThanOrEqual(1);
  });
});

describe('getLevelDefinition', () => {
  it('returns correct definition for each level', () => {
    expect(getLevelDefinition('novice')?.name).toBe('Novice');
    expect(getLevelDefinition('swift')?.name).toBe('Swift');
    expect(getLevelDefinition('rapid')?.name).toBe('Rapid');
    expect(getLevelDefinition('elite')?.name).toBe('Elite');
    expect(getLevelDefinition('legendary')?.name).toBe('Legendary');
  });

  it('includes correct VS thresholds', () => {
    const novice = getLevelDefinition('novice');
    expect(novice?.vsFloor).toBe(0);
    expect(novice?.vsCeiling).toBe(25);

    const legendary = getLevelDefinition('legendary');
    expect(legendary?.vsFloor).toBe(95);
    expect(legendary?.vsCeiling).toBe(100);
  });
});

describe('getVSToNextLevel', () => {
  it('returns VS needed to reach next level', () => {
    expect(getVSToNextLevel(10)).toBe(15); // Need 25 - 10 = 15 to reach swift
    expect(getVSToNextLevel(30)).toBe(15); // Need 45 - 30 = 15 to reach rapid
    expect(getVSToNextLevel(60)).toBe(10); // Need 70 - 60 = 10 to reach elite
    expect(getVSToNextLevel(80)).toBe(15); // Need 95 - 80 = 15 to reach legendary
  });

  it('returns null for legendary level', () => {
    expect(getVSToNextLevel(95)).toBeNull();
    expect(getVSToNextLevel(100)).toBeNull();
  });

  it('returns correct value at level boundaries', () => {
    expect(getVSToNextLevel(0)).toBe(25);
    expect(getVSToNextLevel(25)).toBe(20); // Swift ceiling - 25 = 45 - 25 = 20
    expect(getVSToNextLevel(45)).toBe(25); // Rapid ceiling - 45 = 70 - 45 = 25
    expect(getVSToNextLevel(70)).toBe(25); // Elite ceiling - 70 = 95 - 70 = 25
  });
});

// =============================================================================
// Aggregated Stats
// =============================================================================

describe('calculateAvgWpm', () => {
  it('returns 0 for empty sessions', () => {
    expect(calculateAvgWpm([], 5)).toBe(0);
  });

  it('calculates average WPM from last N sessions', () => {
    const sessions = [
      createMockSession({ wpm: 200 }),
      createMockSession({ wpm: 300 }),
      createMockSession({ wpm: 400 }),
    ];
    expect(calculateAvgWpm(sessions, 3)).toBe(300);
  });

  it('uses only last N sessions when more exist', () => {
    const sessions = [
      createMockSession({ wpm: 100 }), // Excluded
      createMockSession({ wpm: 200 }),
      createMockSession({ wpm: 300 }),
      createMockSession({ wpm: 400 }),
    ];
    expect(calculateAvgWpm(sessions, 3)).toBe(300);
  });

  it('handles fewer sessions than requested', () => {
    const sessions = [
      createMockSession({ wpm: 200 }),
      createMockSession({ wpm: 400 }),
    ];
    expect(calculateAvgWpm(sessions, 5)).toBe(300);
  });

  it('rounds to nearest integer', () => {
    const sessions = [
      createMockSession({ wpm: 200 }),
      createMockSession({ wpm: 201 }),
    ];
    expect(calculateAvgWpm(sessions, 2)).toBe(201); // 200.5 -> 201
  });
});

describe('calculateAvgComprehension', () => {
  it('returns 0 for empty sessions', () => {
    expect(calculateAvgComprehension([], 5)).toBe(0);
  });

  it('calculates average comprehension from last N sessions', () => {
    const sessions = [
      createMockSession({ comprehension: 70 }),
      createMockSession({ comprehension: 80 }),
      createMockSession({ comprehension: 90 }),
    ];
    expect(calculateAvgComprehension(sessions, 3)).toBe(80);
  });

  it('uses only last N sessions', () => {
    const sessions = [
      createMockSession({ comprehension: 50 }), // Excluded
      createMockSession({ comprehension: 80 }),
      createMockSession({ comprehension: 100 }),
    ];
    expect(calculateAvgComprehension(sessions, 2)).toBe(90);
  });
});

describe('calculateBestWpmAt80', () => {
  it('returns 0 for empty sessions', () => {
    expect(calculateBestWpmAt80([])).toBe(0);
  });

  it('returns 0 when no sessions have >= 80% comprehension', () => {
    const sessions = [
      createMockSession({ wpm: 500, comprehension: 70 }),
      createMockSession({ wpm: 600, comprehension: 79 }),
    ];
    expect(calculateBestWpmAt80(sessions)).toBe(0);
  });

  it('returns best WPM among sessions with >= 80% comprehension', () => {
    const sessions = [
      createMockSession({ wpm: 300, comprehension: 80 }),
      createMockSession({ wpm: 400, comprehension: 85 }),
      createMockSession({ wpm: 600, comprehension: 70 }), // Excluded
      createMockSession({ wpm: 350, comprehension: 90 }),
    ];
    expect(calculateBestWpmAt80(sessions)).toBe(400);
  });

  it('includes exactly 80% comprehension', () => {
    const sessions = [
      createMockSession({ wpm: 500, comprehension: 80 }),
    ];
    expect(calculateBestWpmAt80(sessions)).toBe(500);
  });
});

// =============================================================================
// User State Detection
// =============================================================================

describe('detectUserState', () => {
  it('returns neutral for fewer than 2 sessions', () => {
    expect(detectUserState([])).toBe('neutral');
    expect(detectUserState([createMockSession()])).toBe('neutral');
  });

  it('returns push when last 2 sessions >= 75% comprehension', () => {
    const sessions = [
      createMockSession({ comprehension: 50 }), // Old session - ignored
      createMockSession({ comprehension: 75 }),
      createMockSession({ comprehension: 80 }),
    ];
    expect(detectUserState(sessions)).toBe('push');
  });

  it('returns consolidate when last 2 sessions < 60% comprehension', () => {
    const sessions = [
      createMockSession({ comprehension: 90 }), // Old session - ignored
      createMockSession({ comprehension: 55 }),
      createMockSession({ comprehension: 59 }),
    ];
    expect(detectUserState(sessions)).toBe('consolidate');
  });

  it('returns neutral for mixed results', () => {
    const sessions = [
      createMockSession({ comprehension: 75 }),
      createMockSession({ comprehension: 65 }),
    ];
    expect(detectUserState(sessions)).toBe('neutral');
  });

  it('returns neutral when comprehension is between 60-74', () => {
    const sessions = [
      createMockSession({ comprehension: 65 }),
      createMockSession({ comprehension: 70 }),
    ];
    expect(detectUserState(sessions)).toBe('neutral');
  });

  it('boundary: exactly 75 is push threshold', () => {
    const sessions = [
      createMockSession({ comprehension: 75 }),
      createMockSession({ comprehension: 75 }),
    ];
    expect(detectUserState(sessions)).toBe('push');
  });

  it('boundary: exactly 60 is not consolidate', () => {
    const sessions = [
      createMockSession({ comprehension: 60 }),
      createMockSession({ comprehension: 60 }),
    ];
    expect(detectUserState(sessions)).toBe('neutral');
  });
});

// =============================================================================
// Comfort Band Calculation
// =============================================================================

describe('calculateComfortBand', () => {
  it('returns default band for fewer than 3 valid sessions', () => {
    const sessions = [
      createMockSession({ wpm: 300, comprehension: 80 }),
      createMockSession({ wpm: 400, comprehension: 80 }),
    ];
    expect(calculateComfortBand(sessions)).toEqual(DEFAULT_COMFORT_BAND);
  });

  it('returns default band when no sessions have >= 70% comprehension', () => {
    const sessions = [
      createMockSession({ wpm: 300, comprehension: 60 }),
      createMockSession({ wpm: 400, comprehension: 50 }),
      createMockSession({ wpm: 500, comprehension: 65 }),
    ];
    expect(calculateComfortBand(sessions)).toEqual(DEFAULT_COMFORT_BAND);
  });

  it('calculates percentiles from valid sessions', () => {
    // With 4 values: [200, 300, 400, 500]
    // 25th percentile: interpolate between 200 and 300
    // 50th percentile: interpolate between 300 and 400
    // 75th percentile: interpolate between 400 and 500
    const sessions = [
      createMockSession({ wpm: 200, comprehension: 80 }),
      createMockSession({ wpm: 300, comprehension: 85 }),
      createMockSession({ wpm: 400, comprehension: 90 }),
      createMockSession({ wpm: 500, comprehension: 75 }),
    ];
    const band = calculateComfortBand(sessions);
    expect(band.floor).toBeGreaterThanOrEqual(200);
    expect(band.floor).toBeLessThanOrEqual(300);
    expect(band.median).toBeGreaterThanOrEqual(300);
    expect(band.median).toBeLessThanOrEqual(400);
    expect(band.ceiling).toBeGreaterThanOrEqual(400);
    expect(band.ceiling).toBeLessThanOrEqual(500);
  });

  it('uses only last 10 sessions', () => {
    // Create 15 sessions total - last 10 have high WPM, first 5 have low WPM
    const allSessions = [
      // First 5 sessions (will be excluded from slice(-10))
      ...Array(5).fill(null).map(() =>
        createMockSession({ wpm: 100, comprehension: 80 })
      ),
      // Last 10 sessions (will be included in slice(-10))
      ...Array(10).fill(null).map((_, i) =>
        createMockSession({ wpm: 400 + i * 20, comprehension: 80 })
      ),
    ];
    const band = calculateComfortBand(allSessions);
    // Should only consider last 10 sessions (WPM 400-580)
    // Floor should be around 400-420 range (25th percentile)
    expect(band.floor).toBeGreaterThanOrEqual(400);
  });

  it('filters out sessions with < 70% comprehension', () => {
    const sessions = [
      createMockSession({ wpm: 1000, comprehension: 50 }), // Excluded
      createMockSession({ wpm: 300, comprehension: 70 }),
      createMockSession({ wpm: 400, comprehension: 80 }),
      createMockSession({ wpm: 500, comprehension: 90 }),
    ];
    const band = calculateComfortBand(sessions);
    // 1000 WPM should not affect the band
    expect(band.ceiling).toBeLessThanOrEqual(500);
  });
});

describe('getSuggestedWpm', () => {
  const testBand: ComfortBand = { floor: 200, median: 300, ceiling: 400 };

  describe('primary card', () => {
    it('returns ceiling for push state', () => {
      expect(getSuggestedWpm(testBand, 'push', 'primary')).toBe(400);
    });

    it('returns floor for consolidate state', () => {
      expect(getSuggestedWpm(testBand, 'consolidate', 'primary')).toBe(200);
    });

    it('returns median for neutral state', () => {
      expect(getSuggestedWpm(testBand, 'neutral', 'primary')).toBe(300);
    });
  });

  describe('stretch card', () => {
    it('returns 0 for consolidate state (stretch not shown)', () => {
      expect(getSuggestedWpm(testBand, 'consolidate', 'stretch')).toBe(0);
    });

    it('returns ceiling * 1.15 for push state', () => {
      // 400 * 1.15 = 460
      expect(getSuggestedWpm(testBand, 'push', 'stretch')).toBe(460);
    });

    it('returns ceiling * 1.10 for neutral state', () => {
      // 400 * 1.10 = 440
      expect(getSuggestedWpm(testBand, 'neutral', 'stretch')).toBe(440);
    });
  });
});

// =============================================================================
// Streak Calculations
// =============================================================================

describe('getTodayDateString', () => {
  it('returns date in YYYY-MM-DD format', () => {
    const today = getTodayDateString();
    expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('getYesterdayDateString', () => {
  it('returns date in YYYY-MM-DD format', () => {
    const yesterday = getYesterdayDateString();
    expect(yesterday).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('returns a date before today', () => {
    const today = new Date(getTodayDateString());
    const yesterday = new Date(getYesterdayDateString());
    expect(yesterday.getTime()).toBeLessThan(today.getTime());
  });
});

describe('getLastMondayDateString', () => {
  it('returns date in YYYY-MM-DD format', () => {
    const monday = getLastMondayDateString();
    expect(monday).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('returns a Monday', () => {
    const monday = new Date(getLastMondayDateString());
    expect(monday.getDay()).toBe(1); // 1 = Monday
  });
});

describe('shouldResetFreeze', () => {
  it('returns true if freeze was reset in a different week', () => {
    const streak = createMockStreak({ freezeLastReset: '2024-01-01' });
    expect(shouldResetFreeze(streak)).toBe(true);
  });

  it('returns false if freeze was reset this week', () => {
    const lastMonday = getLastMondayDateString();
    const streak = createMockStreak({ freezeLastReset: lastMonday });
    expect(shouldResetFreeze(streak)).toBe(false);
  });

  it('returns true if freezeLastReset is null', () => {
    const streak = createMockStreak({ freezeLastReset: null });
    expect(shouldResetFreeze(streak)).toBe(true);
  });
});

describe('calculateStreakUpdate', () => {
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  it('returns same streak if already completed today', () => {
    const streak = createMockStreak({
      currentDays: 5,
      lastCompletedDate: today,
    });
    const result = calculateStreakUpdate(streak);
    expect(result.currentDays).toBe(5);
    expect(result.lastCompletedDate).toBe(today);
  });

  it('starts new streak if first completion ever', () => {
    const streak = createMockStreak({
      currentDays: 0,
      lastCompletedDate: null,
    });
    const result = calculateStreakUpdate(streak);
    expect(result.currentDays).toBe(1);
    expect(result.longestDays).toBe(1);
    expect(result.lastCompletedDate).toBe(today);
  });

  it('extends streak if completed yesterday', () => {
    const streak = createMockStreak({
      currentDays: 5,
      longestDays: 5,
      lastCompletedDate: yesterday,
    });
    const result = calculateStreakUpdate(streak);
    expect(result.currentDays).toBe(6);
    expect(result.longestDays).toBe(6);
    expect(result.lastCompletedDate).toBe(today);
  });

  it('breaks streak and starts fresh if missed days', () => {
    const streak = createMockStreak({
      currentDays: 10,
      longestDays: 15,
      lastCompletedDate: '2024-01-01', // Old date
    });
    const result = calculateStreakUpdate(streak);
    expect(result.currentDays).toBe(1);
    expect(result.longestDays).toBe(15); // Longest preserved
    expect(result.lastCompletedDate).toBe(today);
  });

  it('updates longestDays when extending streak to new record', () => {
    const streak = createMockStreak({
      currentDays: 5,
      longestDays: 5,
      lastCompletedDate: yesterday,
    });
    const result = calculateStreakUpdate(streak);
    expect(result.longestDays).toBe(6);
  });

  it('resets freeze if new week', () => {
    const streak = createMockStreak({
      currentDays: 3,
      lastCompletedDate: yesterday,
      freezeAvailable: false,
      freezeUsedThisWeek: true,
      freezeLastReset: '2024-01-01', // Old week
    });
    const result = calculateStreakUpdate(streak);
    expect(result.freezeAvailable).toBe(true);
    expect(result.freezeUsedThisWeek).toBe(false);
  });

  it('accepts custom completion date', () => {
    const streak = createMockStreak({
      currentDays: 0,
      lastCompletedDate: null,
    });
    const customDate = '2024-06-15';
    const result = calculateStreakUpdate(streak, customDate);
    expect(result.lastCompletedDate).toBe(customDate);
  });
});

describe('checkAndApplyStreakFreeze', () => {
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  it('returns null if completed today', () => {
    const streak = createMockStreak({
      currentDays: 5,
      lastCompletedDate: today,
    });
    expect(checkAndApplyStreakFreeze(streak)).toBeNull();
  });

  it('returns null if completed yesterday (streak still valid)', () => {
    const streak = createMockStreak({
      currentDays: 5,
      lastCompletedDate: yesterday,
    });
    expect(checkAndApplyStreakFreeze(streak)).toBeNull();
  });

  it('returns null if no streak to protect', () => {
    const streak = createMockStreak({
      currentDays: 0,
      lastCompletedDate: '2024-01-01',
    });
    expect(checkAndApplyStreakFreeze(streak)).toBeNull();
  });

  it('returns null if freeze already used this week', () => {
    const streak = createMockStreak({
      currentDays: 5,
      lastCompletedDate: '2024-01-01',
      freezeUsedThisWeek: true,
    });
    expect(checkAndApplyStreakFreeze(streak)).toBeNull();
  });

  it('returns null if freeze not available', () => {
    const streak = createMockStreak({
      currentDays: 5,
      lastCompletedDate: '2024-01-01',
      freezeAvailable: false,
    });
    expect(checkAndApplyStreakFreeze(streak)).toBeNull();
  });

  it('applies freeze and preserves streak', () => {
    const streak = createMockStreak({
      currentDays: 5,
      lastCompletedDate: '2024-01-01', // Missed days
      freezeAvailable: true,
      freezeUsedThisWeek: false,
    });
    const result = checkAndApplyStreakFreeze(streak);
    expect(result).not.toBeNull();
    expect(result!.lastCompletedDate).toBe(yesterday);
    expect(result!.freezeUsedThisWeek).toBe(true);
    expect(result!.freezeAvailable).toBe(false);
    expect(result!.currentDays).toBe(5); // Preserved
  });
});

describe('isStreakAtRisk', () => {
  const today = getTodayDateString();

  it('returns false if completed today', () => {
    const streak = createMockStreak({
      currentDays: 5,
      lastCompletedDate: today,
    });
    expect(isStreakAtRisk(streak)).toBe(false);
  });

  it('returns false if no streak', () => {
    const streak = createMockStreak({
      currentDays: 0,
    });
    expect(isStreakAtRisk(streak)).toBe(false);
  });

  it('returns true if has streak, not completed today, and freeze unavailable', () => {
    const streak = createMockStreak({
      currentDays: 5,
      lastCompletedDate: '2024-01-01',
      freezeAvailable: false,
    });
    expect(isStreakAtRisk(streak)).toBe(true);
  });

  it('returns true if freeze already used this week', () => {
    const streak = createMockStreak({
      currentDays: 5,
      lastCompletedDate: '2024-01-01',
      freezeAvailable: true,
      freezeUsedThisWeek: true,
    });
    expect(isStreakAtRisk(streak)).toBe(true);
  });

  it('returns false if freeze available and not used', () => {
    const streak = createMockStreak({
      currentDays: 5,
      lastCompletedDate: '2024-01-01',
      freezeAvailable: true,
      freezeUsedThisWeek: false,
    });
    expect(isStreakAtRisk(streak)).toBe(false);
  });
});

// =============================================================================
// Baseline Stats
// =============================================================================

describe('captureBaseline', () => {
  it('returns null for fewer than 3 sessions', () => {
    expect(captureBaseline([])).toBeNull();
    expect(captureBaseline([createMockSession()])).toBeNull();
    expect(captureBaseline([createMockSession(), createMockSession()])).toBeNull();
  });

  it('captures baseline from first 3 sessions', () => {
    const sessions = [
      createMockSession({ wpm: 200, comprehension: 70, completedAt: 1000 }),
      createMockSession({ wpm: 300, comprehension: 80, completedAt: 2000 }),
      createMockSession({ wpm: 400, comprehension: 90, completedAt: 3000 }),
      createMockSession({ wpm: 500, comprehension: 95, completedAt: 4000 }), // Ignored
    ];
    const baseline = captureBaseline(sessions);
    expect(baseline).not.toBeNull();
    expect(baseline!.avgWpm).toBe(300); // (200 + 300 + 400) / 3
    expect(baseline!.avgComprehension).toBe(80); // (70 + 80 + 90) / 3
    expect(baseline!.capturedAt).toBe(3000);
    expect(baseline!.sessionCount).toBe(3);
  });
});

// =============================================================================
// Certification System
// =============================================================================

describe('getCertDefinition', () => {
  it('returns correct definition for each tier', () => {
    expect(getCertDefinition('speed_reader')?.name).toBe('Speed Reader');
    expect(getCertDefinition('velocity_master')?.name).toBe('Velocity Master');
    expect(getCertDefinition('transcendent')?.name).toBe('Transcendent');
  });

  it('returns undefined for invalid tier', () => {
    expect(getCertDefinition('invalid' as any)).toBeUndefined();
  });

  it('includes correct thresholds', () => {
    const speedReader = getCertDefinition('speed_reader');
    expect(speedReader?.vsThreshold).toBe(40);
    expect(speedReader?.speedProofWpm).toBe(900);
    expect(speedReader?.speedProofMinComp).toBe(70);
  });
});

describe('hasSpeedProofForTier', () => {
  it('returns false for empty proofs', () => {
    expect(hasSpeedProofForTier([], 'speed_reader')).toBe(false);
  });

  it('returns true when matching proof exists', () => {
    const proofs: SpeedProof[] = [
      { wpm: 1500, comprehension: 70, achievedAt: Date.now() },
    ];
    expect(hasSpeedProofForTier(proofs, 'speed_reader')).toBe(true);
  });

  it('returns false when proof WPM is too low', () => {
    const proofs: SpeedProof[] = [
      { wpm: 599, comprehension: 80, achievedAt: Date.now() },
    ];
    expect(hasSpeedProofForTier(proofs, 'speed_reader')).toBe(false);
  });

  it('returns false when proof comprehension is too low', () => {
    const proofs: SpeedProof[] = [
      { wpm: 700, comprehension: 69, achievedAt: Date.now() },
    ];
    expect(hasSpeedProofForTier(proofs, 'speed_reader')).toBe(false);
  });

  it('checks correct tier requirements', () => {
    const proofs: SpeedProof[] = [
      { wpm: 1500, comprehension: 70, achievedAt: Date.now() },
    ];
    // Speed reader (900 WPM, 70% comp) - should pass
    expect(hasSpeedProofForTier(proofs, 'speed_reader')).toBe(true);
    // Velocity master (1200 WPM) - should pass
    expect(hasSpeedProofForTier(proofs, 'velocity_master')).toBe(true);
  });

  it('returns false for invalid tier', () => {
    const proofs: SpeedProof[] = [
      { wpm: 1500, comprehension: 100, achievedAt: Date.now() },
    ];
    expect(hasSpeedProofForTier(proofs, 'invalid' as any)).toBe(false);
  });
});

describe('checkCertUnlockStatus', () => {
  it('returns canUnlock: true when both VS and speed proof achieved', () => {
    const proofs: SpeedProof[] = [
      { wpm: 900, comprehension: 75, achievedAt: Date.now() },
    ];
    const status = checkCertUnlockStatus(45, proofs, 'speed_reader');
    expect(status.canUnlock).toBe(true);
    expect(status.vsUnlocked).toBe(true);
    expect(status.speedProofAchieved).toBe(true);
  });

  it('returns canUnlock: false when only VS achieved', () => {
    const status = checkCertUnlockStatus(50, [], 'speed_reader');
    expect(status.canUnlock).toBe(false);
    expect(status.vsUnlocked).toBe(true);
    expect(status.speedProofAchieved).toBe(false);
    expect(status.reason).toBe('speed');
    expect(status.speedNeeded).toBe(900);
  });

  it('returns canUnlock: false when only speed proof achieved', () => {
    const proofs: SpeedProof[] = [
      { wpm: 900, comprehension: 75, achievedAt: Date.now() },
    ];
    const status = checkCertUnlockStatus(30, proofs, 'speed_reader');
    expect(status.canUnlock).toBe(false);
    expect(status.vsUnlocked).toBe(false);
    expect(status.speedProofAchieved).toBe(true);
    expect(status.reason).toBe('vs');
    expect(status.vsNeeded).toBe(40);
  });

  it('returns canUnlock: false with reason: both when neither achieved', () => {
    const status = checkCertUnlockStatus(20, [], 'speed_reader');
    expect(status.canUnlock).toBe(false);
    expect(status.reason).toBe('both');
    expect(status.vsNeeded).toBe(40);
    expect(status.speedNeeded).toBe(900);
  });

  it('handles invalid tier', () => {
    const status = checkCertUnlockStatus(100, [], 'invalid' as any);
    expect(status.canUnlock).toBe(false);
    expect(status.reason).toBe('both');
  });

  it('checks velocity_master tier correctly', () => {
    const proofs: SpeedProof[] = [
      { wpm: 1500, comprehension: 70, achievedAt: Date.now() },
    ];
    const status = checkCertUnlockStatus(60, proofs, 'velocity_master');
    expect(status.canUnlock).toBe(true);
  });

  it('checks transcendent tier correctly', () => {
    const proofs: SpeedProof[] = [
      { wpm: 1500, comprehension: 70, achievedAt: Date.now() },
    ];
    const status = checkCertUnlockStatus(95, proofs, 'transcendent');
    expect(status.canUnlock).toBe(true);
  });
});

describe('isSpeedProof', () => {
  it('returns true when WPM and comprehension meet tier requirements', () => {
    expect(isSpeedProof(900, 70, 'speed_reader')).toBe(true);
    expect(isSpeedProof(1200, 70, 'velocity_master')).toBe(true);
    expect(isSpeedProof(1500, 70, 'transcendent')).toBe(true);
  });

  it('returns false when WPM is too low', () => {
    expect(isSpeedProof(899, 80, 'speed_reader')).toBe(false);
    expect(isSpeedProof(1199, 80, 'velocity_master')).toBe(false);
  });

  it('returns false when comprehension is too low', () => {
    expect(isSpeedProof(700, 69, 'speed_reader')).toBe(false);
  });

  it('returns false for invalid tier', () => {
    expect(isSpeedProof(1500, 100, 'invalid' as any)).toBe(false);
  });
});

describe('extractSpeedProofs', () => {
  it('returns empty array when no tier requirements met', () => {
    const proofs = extractSpeedProofs(300, 80, Date.now());
    expect(proofs).toEqual([]);
  });

  it('returns proof when speed_reader requirements met', () => {
    const timestamp = Date.now();
    const proofs = extractSpeedProofs(900, 70, timestamp);
    expect(proofs).toHaveLength(1);
    expect(proofs[0].wpm).toBe(900);
    expect(proofs[0].comprehension).toBe(70);
    expect(proofs[0].achievedAt).toBe(timestamp);
  });

  it('returns only one proof per session', () => {
    // Even if qualifying for multiple tiers, only one proof is returned
    const proofs = extractSpeedProofs(1500, 80, Date.now());
    expect(proofs).toHaveLength(1);
  });
});

// =============================================================================
// Milestone Progress
// =============================================================================

describe('getMilestoneProgress', () => {
  it('returns first milestone as next when avgWpm is 0', () => {
    const result = getMilestoneProgress(0);
    expect(result.current).toBeNull();
    expect(result.next?.wpm).toBe(300); // First milestone
    expect(result.progress).toBe(0);
  });

  it('returns progress toward first milestone', () => {
    const result = getMilestoneProgress(150);
    expect(result.current).toBeNull();
    expect(result.next?.wpm).toBe(300);
    expect(result.progress).toBe(0.5); // 150/300
  });

  it('returns current and next milestone when between milestones', () => {
    const result = getMilestoneProgress(375);
    expect(result.current?.wpm).toBe(300); // Pace
    expect(result.next?.wpm).toBe(450); // Quick
    expect(result.progress).toBe(0.5); // (375 - 300) / (450 - 300)
  });

  it('returns max milestone and progress 1 when at top', () => {
    const result = getMilestoneProgress(1600);
    expect(result.current?.wpm).toBe(1500); // Apex
    expect(result.next).toBeNull();
    expect(result.progress).toBe(1);
  });

  it('clamps progress between 0 and 1', () => {
    const result = getMilestoneProgress(500);
    expect(result.progress).toBeGreaterThanOrEqual(0);
    expect(result.progress).toBeLessThanOrEqual(1);
  });
});

describe('getMilestoneStates', () => {
  it('returns all milestones with future status when avgWpm is 0', () => {
    const states = getMilestoneStates(0);
    expect(states).toHaveLength(6); // All 6 milestones
    expect(states[0].status).toBe('future');
    expect(states[0].isNext).toBe(true);
    expect(states[1].status).toBe('future');
    expect(states[1].isNext).toBe(false);
  });

  it('marks completed milestones correctly', () => {
    const states = getMilestoneStates(500);
    // 300 (Pace) and 450 (Quick) should be completed
    expect(states[0].status).toBe('completed'); // 300 - past milestone
    expect(states[1].status).toBe('current');   // 450 - current position
    expect(states[2].status).toBe('future');    // 600 - next
    expect(states[2].isNext).toBe(true);
    expect(states[3].status).toBe('future');    // 900
  });

  it('marks current milestone correctly', () => {
    const states = getMilestoneStates(600);
    expect(states[2].status).toBe('current'); // 600 (Swift)
    expect(states[2].milestone.name).toBe('Swift');
  });

  it('marks all as completed when at max', () => {
    const states = getMilestoneStates(1500);
    const completedCount = states.filter(s => s.status === 'completed' || s.status === 'current').length;
    expect(completedCount).toBe(6);
  });
});

describe('calculatePathProgress', () => {
  it('returns 0 for avgWpm of 0', () => {
    expect(calculatePathProgress(0)).toBe(0);
  });

  it('returns partial progress before first milestone', () => {
    const progress = calculatePathProgress(150);
    expect(progress).toBeGreaterThan(0);
    expect(progress).toBeLessThan(20); // Less than 1/5 of total
  });

  it('returns 100 at or beyond last milestone', () => {
    expect(calculatePathProgress(1500)).toBe(100);
    expect(calculatePathProgress(2000)).toBe(100);
  });

  it('returns proportional progress between milestones', () => {
    // Between 300 (index 0) and 450 (index 1)
    const progress = calculatePathProgress(375);
    expect(progress).toBeGreaterThan(0);
    expect(progress).toBeLessThan(50);
  });

  it('clamps between 0 and 100', () => {
    expect(calculatePathProgress(-100)).toBeGreaterThanOrEqual(0);
    expect(calculatePathProgress(5000)).toBeLessThanOrEqual(100);
  });
});

// =============================================================================
// Weekly Trend Analysis
// =============================================================================

describe('getWeekStartDate', () => {
  it('returns Monday for any day of the week', () => {
    // Create timestamps for different days
    const monday = new Date('2024-01-08T12:00:00Z').getTime(); // Monday
    const wednesday = new Date('2024-01-10T12:00:00Z').getTime(); // Wednesday
    const sunday = new Date('2024-01-14T12:00:00Z').getTime(); // Sunday

    expect(getWeekStartDate(monday)).toBe('2024-01-08');
    expect(getWeekStartDate(wednesday)).toBe('2024-01-08');
    expect(getWeekStartDate(sunday)).toBe('2024-01-08');
  });

  it('returns date in YYYY-MM-DD format', () => {
    const result = getWeekStartDate(Date.now());
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('calculateWeeklyTrend', () => {
  it('returns empty array for empty sessions', () => {
    expect(calculateWeeklyTrend([], 4)).toEqual([]);
  });

  it('groups sessions by week', () => {
    const sessions = [
      createMockSession({ wpm: 300, comprehension: 80, completedAt: new Date('2024-01-08').getTime() }),
      createMockSession({ wpm: 350, comprehension: 85, completedAt: new Date('2024-01-10').getTime() }),
      createMockSession({ wpm: 400, comprehension: 90, completedAt: new Date('2024-01-15').getTime() }),
    ];
    const trend = calculateWeeklyTrend(sessions, 4);
    expect(trend).toHaveLength(2); // Two different weeks
  });

  it('calculates correct averages per week', () => {
    const sessions = [
      createMockSession({ wpm: 200, comprehension: 70, completedAt: new Date('2024-01-08').getTime() }),
      createMockSession({ wpm: 400, comprehension: 90, completedAt: new Date('2024-01-09').getTime() }),
    ];
    const trend = calculateWeeklyTrend(sessions, 4);
    expect(trend[0].avgWpm).toBe(300); // (200 + 400) / 2
    expect(trend[0].avgComprehension).toBe(80); // (70 + 90) / 2
    expect(trend[0].sessionCount).toBe(2);
  });

  it('returns only last N weeks', () => {
    const sessions = [
      createMockSession({ completedAt: new Date('2024-01-01').getTime() }),
      createMockSession({ completedAt: new Date('2024-01-08').getTime() }),
      createMockSession({ completedAt: new Date('2024-01-15').getTime() }),
      createMockSession({ completedAt: new Date('2024-01-22').getTime() }),
      createMockSession({ completedAt: new Date('2024-01-29').getTime() }),
    ];
    const trend = calculateWeeklyTrend(sessions, 2);
    expect(trend).toHaveLength(2);
  });

  it('sorts weeks chronologically', () => {
    const sessions = [
      createMockSession({ completedAt: new Date('2024-01-22').getTime() }),
      createMockSession({ completedAt: new Date('2024-01-08').getTime() }),
      createMockSession({ completedAt: new Date('2024-01-15').getTime() }),
    ];
    const trend = calculateWeeklyTrend(sessions, 4);
    expect(trend[0].weekStart).toBe('2024-01-08');
    expect(trend[2].weekStart).toBe('2024-01-22');
  });
});

// =============================================================================
// UUID Generation
// =============================================================================

describe('generateSessionId', () => {
  it('generates unique IDs', () => {
    const ids = new Set<string>();
    for (let i = 0; i < 100; i++) {
      ids.add(generateSessionId());
    }
    expect(ids.size).toBe(100);
  });

  it('generates IDs with session_ prefix', () => {
    const id = generateSessionId();
    expect(id).toMatch(/^session_\d+_[a-z0-9]+$/);
  });

  it('includes timestamp in ID', () => {
    const before = Date.now();
    const id = generateSessionId();
    const after = Date.now();

    const timestampPart = parseInt(id.split('_')[1]);
    expect(timestampPart).toBeGreaterThanOrEqual(before);
    expect(timestampPart).toBeLessThanOrEqual(after);
  });
});
