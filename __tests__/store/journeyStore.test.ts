/**
 * Tests for Journey Store
 *
 * Comprehensive tests for the journey tracking Zustand store including:
 * - Session recording and history
 * - Velocity Score calculations
 * - Level progression
 * - Streak management
 * - Certification system
 * - Progress insights
 */

import { renderHook, act } from '@testing-library/react-native';
import { useJourneyStore, initializeJourneyStore } from '../../src/store/journeyStore';
import { useLearningStore } from '../../src/store/learningStore';
import {
  DEFAULT_STREAK,
  DEFAULT_COMFORT_BAND,
  DEFAULT_CERT_PROGRESS,
  JourneySession,
  JourneyCertProgress,
} from '../../src/types/journey';

// =============================================================================
// Test Helpers
// =============================================================================

const initialCertProgress: Record<string, JourneyCertProgress> = {
  speed_reader: { ...DEFAULT_CERT_PROGRESS },
  velocity_master: { ...DEFAULT_CERT_PROGRESS },
  transcendent: { ...DEFAULT_CERT_PROGRESS },
};

const initialState = {
  _version: 1,
  velocityScore: 0,
  level: 'novice' as const,
  sessions: [],
  avgWpmLast3: 0,
  avgWpmLast5: 0,
  avgCompLast5: 0,
  avgCompLast10: 0,
  bestWpmAt80: 0,
  userState: 'neutral' as const,
  comfortBand: DEFAULT_COMFORT_BAND,
  streak: DEFAULT_STREAK,
  baseline: null,
  speedProofs: [],
  certProgress: initialCertProgress,
  levelHistory: {},
};

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

function resetJourneyStore() {
  useJourneyStore.setState({
    ...initialState,
    certProgress: {
      speed_reader: { ...DEFAULT_CERT_PROGRESS },
      velocity_master: { ...DEFAULT_CERT_PROGRESS },
      transcendent: { ...DEFAULT_CERT_PROGRESS },
    },
  });
}

function resetLearningStore() {
  useLearningStore.setState({
    articleProgress: {},
    currentArticleId: null,
    currentWPM: 250,
    recentCompletions: [],
  });
}

// =============================================================================
// Test Suite
// =============================================================================

describe('journeyStore', () => {
  beforeEach(() => {
    resetJourneyStore();
    resetLearningStore();
  });

  // ===========================================================================
  // Initial State
  // ===========================================================================

  describe('initial state', () => {
    it('starts with velocityScore at 0', () => {
      const { result } = renderHook(() => useJourneyStore());
      expect(result.current.velocityScore).toBe(0);
    });

    it('starts with level as novice', () => {
      const { result } = renderHook(() => useJourneyStore());
      expect(result.current.level).toBe('novice');
    });

    it('starts with empty sessions', () => {
      const { result } = renderHook(() => useJourneyStore());
      expect(result.current.sessions).toEqual([]);
    });

    it('starts with default comfort band', () => {
      const { result } = renderHook(() => useJourneyStore());
      expect(result.current.comfortBand).toEqual(DEFAULT_COMFORT_BAND);
    });

    it('starts with default streak', () => {
      const { result } = renderHook(() => useJourneyStore());
      expect(result.current.streak.currentDays).toBe(0);
      expect(result.current.streak.longestDays).toBe(0);
      expect(result.current.streak.freezeAvailable).toBe(true);
    });

    it('starts with null baseline', () => {
      const { result } = renderHook(() => useJourneyStore());
      expect(result.current.baseline).toBeNull();
    });

    it('starts with empty speedProofs', () => {
      const { result } = renderHook(() => useJourneyStore());
      expect(result.current.speedProofs).toEqual([]);
    });

    it('starts with default certProgress', () => {
      const { result } = renderHook(() => useJourneyStore());
      expect(result.current.certProgress.speed_reader.examUnlocked).toBe(false);
      expect(result.current.certProgress.velocity_master.examUnlocked).toBe(false);
      expect(result.current.certProgress.transcendent.examUnlocked).toBe(false);
    });
  });

  // ===========================================================================
  // recordSession
  // ===========================================================================

  describe('recordSession()', () => {
    it('adds a new session to sessions array', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        result.current.recordSession({
          wpm: 300,
          comprehension: 80,
          articleId: 'test-article-1',
          articleType: 'curriculum',
        });
      });

      expect(result.current.sessions).toHaveLength(1);
      expect(result.current.sessions[0].wpm).toBe(300);
      expect(result.current.sessions[0].comprehension).toBe(80);
      expect(result.current.sessions[0].articleId).toBe('test-article-1');
    });

    it('calculates effectiveWpm correctly', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        result.current.recordSession({
          wpm: 400,
          comprehension: 75,
          articleId: 'test-article',
          articleType: 'curriculum',
        });
      });

      // effectiveWpm = 400 * 0.75 = 300
      expect(result.current.sessions[0].effectiveWpm).toBe(300);
    });

    it('updates velocity score after recording session', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        result.current.recordSession({
          wpm: 600,
          comprehension: 100,
          articleId: 'test-article',
          articleType: 'curriculum',
        });
      });

      // VS = effectiveWpm / 12 = 600 / 12 = 50
      expect(result.current.velocityScore).toBe(50);
    });

    it('updates level based on velocity score', () => {
      const { result } = renderHook(() => useJourneyStore());

      // Record session that gives VS >= 45 (rapid level)
      act(() => {
        result.current.recordSession({
          wpm: 600,
          comprehension: 100, // effectiveWpm = 600, VS = 50
          articleId: 'test-article',
          articleType: 'curriculum',
        });
      });

      expect(result.current.level).toBe('rapid');
    });

    it('keeps only last 100 sessions', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        for (let i = 0; i < 105; i++) {
          result.current.recordSession({
            wpm: 300,
            comprehension: 80,
            articleId: `article-${i}`,
            articleType: 'curriculum',
          });
        }
      });

      expect(result.current.sessions).toHaveLength(100);
      // First 5 should be dropped
      expect(result.current.sessions[0].articleId).toBe('article-5');
    });

    it('extracts speed proofs when qualifying', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        result.current.recordSession({
          wpm: 900,
          comprehension: 70,
          articleId: 'test-article',
          articleType: 'curriculum',
        });
      });

      expect(result.current.speedProofs).toHaveLength(1);
      expect(result.current.speedProofs[0].wpm).toBe(900);
    });

    it('captures baseline after 3 sessions', () => {
      const { result } = renderHook(() => useJourneyStore());

      expect(result.current.baseline).toBeNull();

      act(() => {
        result.current.recordSession({ wpm: 200, comprehension: 70, articleId: 'a1', articleType: 'curriculum' });
      });
      expect(result.current.baseline).toBeNull();

      act(() => {
        result.current.recordSession({ wpm: 300, comprehension: 80, articleId: 'a2', articleType: 'curriculum' });
      });
      expect(result.current.baseline).toBeNull();

      act(() => {
        result.current.recordSession({ wpm: 400, comprehension: 90, articleId: 'a3', articleType: 'curriculum' });
      });
      expect(result.current.baseline).not.toBeNull();
      expect(result.current.baseline!.avgWpm).toBe(300); // (200 + 300 + 400) / 3
      expect(result.current.baseline!.avgComprehension).toBe(80); // (70 + 80 + 90) / 3
    });

    it('does not overwrite existing baseline', () => {
      const { result } = renderHook(() => useJourneyStore());

      // Create 3 sessions to capture baseline
      act(() => {
        result.current.recordSession({ wpm: 200, comprehension: 70, articleId: 'a1', articleType: 'curriculum' });
        result.current.recordSession({ wpm: 300, comprehension: 80, articleId: 'a2', articleType: 'curriculum' });
        result.current.recordSession({ wpm: 400, comprehension: 90, articleId: 'a3', articleType: 'curriculum' });
      });

      const originalBaseline = result.current.baseline;

      // Add more sessions with different WPM
      act(() => {
        result.current.recordSession({ wpm: 800, comprehension: 100, articleId: 'a4', articleType: 'curriculum' });
      });

      expect(result.current.baseline).toEqual(originalBaseline);
    });

    it('updates streak on session completion', () => {
      const { result } = renderHook(() => useJourneyStore());

      expect(result.current.streak.currentDays).toBe(0);

      act(() => {
        result.current.recordSession({
          wpm: 300,
          comprehension: 80,
          articleId: 'test-article',
          articleType: 'curriculum',
        });
      });

      expect(result.current.streak.currentDays).toBe(1);
      expect(result.current.streak.lastCompletedDate).not.toBeNull();
    });

    it('includes cardTypeChosen in session record', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        result.current.recordSession({
          wpm: 300,
          comprehension: 80,
          articleId: 'test-article',
          articleType: 'curriculum',
          cardTypeChosen: 'stretch',
        });
      });

      expect(result.current.sessions[0].cardTypeChosen).toBe('stretch');
    });

    it('recalculates aggregated stats', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        result.current.recordSession({ wpm: 200, comprehension: 70, articleId: 'a1', articleType: 'curriculum' });
        result.current.recordSession({ wpm: 300, comprehension: 80, articleId: 'a2', articleType: 'curriculum' });
        result.current.recordSession({ wpm: 400, comprehension: 90, articleId: 'a3', articleType: 'curriculum' });
      });

      expect(result.current.avgWpmLast3).toBe(300);
      expect(result.current.avgCompLast5).toBe(80);
    });

    it('updates level history when new level reached', () => {
      const { result } = renderHook(() => useJourneyStore());

      expect(result.current.levelHistory).toEqual({});

      // Record session that gets to swift level (VS >= 25)
      act(() => {
        result.current.recordSession({
          wpm: 400,
          comprehension: 100, // VS = 33
          articleId: 'test',
          articleType: 'curriculum',
        });
      });

      expect(result.current.levelHistory.swift).toBeDefined();
    });
  });

  // ===========================================================================
  // recalculateAll
  // ===========================================================================

  describe('recalculateAll()', () => {
    it('recalculates all derived values from sessions', () => {
      const { result } = renderHook(() => useJourneyStore());

      // Set up sessions directly to test recalculation
      act(() => {
        useJourneyStore.setState({
          sessions: [
            createMockSession({ wpm: 900, comprehension: 100, effectiveWpm: 900 }),
            createMockSession({ wpm: 900, comprehension: 100, effectiveWpm: 900 }),
            createMockSession({ wpm: 900, comprehension: 100, effectiveWpm: 900 }),
            createMockSession({ wpm: 900, comprehension: 100, effectiveWpm: 900 }),
            createMockSession({ wpm: 900, comprehension: 100, effectiveWpm: 900 }),
          ],
        });
      });

      act(() => {
        result.current.recalculateAll();
      });

      expect(result.current.velocityScore).toBe(75); // 900 / 12
      expect(result.current.level).toBe('elite');
      expect(result.current.avgWpmLast3).toBe(900);
      expect(result.current.avgWpmLast5).toBe(900);
    });

    it('updates user state based on recent sessions', () => {
      const { result } = renderHook(() => useJourneyStore());

      // Set up sessions with high comprehension (push state)
      act(() => {
        useJourneyStore.setState({
          sessions: [
            createMockSession({ comprehension: 80 }),
            createMockSession({ comprehension: 85 }),
          ],
        });
      });

      act(() => {
        result.current.recalculateAll();
      });

      expect(result.current.userState).toBe('push');
    });

    it('updates comfort band from valid sessions', () => {
      const { result } = renderHook(() => useJourneyStore());

      // Set up sessions with varying WPM
      act(() => {
        useJourneyStore.setState({
          sessions: [
            createMockSession({ wpm: 200, comprehension: 80, effectiveWpm: 160 }),
            createMockSession({ wpm: 300, comprehension: 85, effectiveWpm: 255 }),
            createMockSession({ wpm: 400, comprehension: 90, effectiveWpm: 360 }),
            createMockSession({ wpm: 500, comprehension: 75, effectiveWpm: 375 }),
          ],
        });
      });

      act(() => {
        result.current.recalculateAll();
      });

      expect(result.current.comfortBand.floor).toBeLessThan(result.current.comfortBand.median);
      expect(result.current.comfortBand.median).toBeLessThan(result.current.comfortBand.ceiling);
    });

    it('updates certification progress', () => {
      const { result } = renderHook(() => useJourneyStore());

      // Set up state with high VS and speed proof
      act(() => {
        useJourneyStore.setState({
          sessions: Array(5).fill(null).map(() =>
            createMockSession({ wpm: 800, comprehension: 100, effectiveWpm: 800 })
          ),
          speedProofs: [{ wpm: 900, comprehension: 75, achievedAt: Date.now() }],
        });
      });

      act(() => {
        result.current.recalculateAll();
      });

      // VS should be 800/12 = 67, which unlocks speed_reader (requires 40)
      expect(result.current.certProgress.speed_reader.vsUnlocked).toBe(true);
      expect(result.current.certProgress.speed_reader.speedProofAchieved).toBe(true);
      expect(result.current.certProgress.speed_reader.examUnlocked).toBe(true);
    });
  });

  // ===========================================================================
  // Velocity Score Methods
  // ===========================================================================

  describe('getVSToNextLevel()', () => {
    it('returns VS needed to reach next level', () => {
      const { result } = renderHook(() => useJourneyStore());

      // At VS 0 (novice), need 25 to reach swift
      expect(result.current.getVSToNextLevel()).toBe(25);
    });

    it('returns null at legendary level', () => {
      const { result } = renderHook(() => useJourneyStore());

      // Set up sessions with high effective WPM to reach legendary (VS >= 95)
      // Need effectiveWpm average of 95 * 12 = 1140
      act(() => {
        useJourneyStore.setState({
          sessions: Array(5).fill(null).map(() =>
            createMockSession({ wpm: 1500, comprehension: 100, effectiveWpm: 1500 })
          ),
        });
        result.current.recalculateAll();
      });

      expect(result.current.level).toBe('legendary');
      expect(result.current.getVSToNextLevel()).toBeNull();
    });
  });

  describe('getLevelProgress()', () => {
    it('returns progress within current level', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        useJourneyStore.setState({ velocityScore: 12 });
      });

      // At VS 12, novice range is 0-25, so progress = 12/25 = 0.48
      expect(result.current.getLevelProgress()).toBeCloseTo(0.48, 1);
    });
  });

  // ===========================================================================
  // User State
  // ===========================================================================

  describe('getUserState()', () => {
    it('returns current user state', () => {
      const { result } = renderHook(() => useJourneyStore());

      expect(result.current.getUserState()).toBe('neutral');

      act(() => {
        useJourneyStore.setState({ userState: 'push' });
      });

      expect(result.current.getUserState()).toBe('push');
    });
  });

  // ===========================================================================
  // Comfort Band
  // ===========================================================================

  describe('getSuggestedWpm()', () => {
    it('returns appropriate WPM for primary card in neutral state', () => {
      const { result } = renderHook(() => useJourneyStore());

      // Default comfort band median is 300
      expect(result.current.getSuggestedWpm('primary')).toBe(DEFAULT_COMFORT_BAND.median);
    });

    it('returns higher WPM for stretch card', () => {
      const { result } = renderHook(() => useJourneyStore());

      const suggested = result.current.getSuggestedWpm('stretch');
      // Stretch should be ceiling * 1.1 for neutral state = 350 * 1.1 = 385
      expect(suggested).toBe(Math.round(DEFAULT_COMFORT_BAND.ceiling * 1.1));
    });

    it('returns floor for primary in consolidate state', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        useJourneyStore.setState({ userState: 'consolidate' });
      });

      expect(result.current.getSuggestedWpm('primary')).toBe(DEFAULT_COMFORT_BAND.floor);
    });

    it('returns 0 for stretch in consolidate state', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        useJourneyStore.setState({ userState: 'consolidate' });
      });

      expect(result.current.getSuggestedWpm('stretch')).toBe(0);
    });
  });

  // ===========================================================================
  // Streak
  // ===========================================================================

  describe('checkStreakOnLaunch()', () => {
    it('returns no changes when streak is current', () => {
      const { result } = renderHook(() => useJourneyStore());
      const today = new Date().toISOString().split('T')[0];

      act(() => {
        useJourneyStore.setState({
          streak: {
            ...DEFAULT_STREAK,
            currentDays: 5,
            lastCompletedDate: today,
          },
        });
      });

      let launchResult: { freezeApplied: boolean; streakBroken: boolean };
      act(() => {
        launchResult = result.current.checkStreakOnLaunch();
      });

      expect(launchResult!.freezeApplied).toBe(false);
      expect(launchResult!.streakBroken).toBe(false);
    });

    it('applies freeze when available and streak at risk', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        useJourneyStore.setState({
          streak: {
            currentDays: 5,
            longestDays: 5,
            lastCompletedDate: '2024-01-01', // Old date
            freezeAvailable: true,
            freezeUsedThisWeek: false,
            freezeLastReset: null,
          },
        });
      });

      let launchResult: { freezeApplied: boolean; streakBroken: boolean };
      act(() => {
        launchResult = result.current.checkStreakOnLaunch();
      });

      expect(launchResult!.freezeApplied).toBe(true);
      expect(result.current.streak.freezeUsedThisWeek).toBe(true);
    });

    it('indicates streak broken when no freeze available', () => {
      const { result } = renderHook(() => useJourneyStore());

      // Get the current week's Monday to prevent freeze reset
      const today = new Date();
      const dayOfWeek = today.getDay();
      const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const monday = new Date(today);
      monday.setDate(today.getDate() - diff);
      const currentWeekMonday = monday.toISOString().split('T')[0];

      act(() => {
        useJourneyStore.setState({
          streak: {
            currentDays: 5,
            longestDays: 5,
            lastCompletedDate: '2024-01-01', // Old date
            freezeAvailable: false,
            freezeUsedThisWeek: true,
            freezeLastReset: currentWeekMonday, // Current week so no reset
          },
        });
      });

      let launchResult: { freezeApplied: boolean; streakBroken: boolean };
      act(() => {
        launchResult = result.current.checkStreakOnLaunch();
      });

      expect(launchResult!.freezeApplied).toBe(false);
      expect(launchResult!.streakBroken).toBe(true);
    });

    it('resets freeze availability on new week', () => {
      const { result } = renderHook(() => useJourneyStore());
      const today = new Date().toISOString().split('T')[0];

      act(() => {
        useJourneyStore.setState({
          streak: {
            currentDays: 5,
            longestDays: 5,
            lastCompletedDate: today, // Current
            freezeAvailable: false,
            freezeUsedThisWeek: true,
            freezeLastReset: '2024-01-01', // Old week
          },
        });
      });

      act(() => {
        result.current.checkStreakOnLaunch();
      });

      expect(result.current.streak.freezeAvailable).toBe(true);
      expect(result.current.streak.freezeUsedThisWeek).toBe(false);
    });
  });

  describe('getStreakInfo()', () => {
    it('returns current streak info', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        useJourneyStore.setState({
          streak: {
            currentDays: 7,
            longestDays: 14,
            lastCompletedDate: new Date().toISOString().split('T')[0],
            freezeAvailable: true,
            freezeUsedThisWeek: false,
            freezeLastReset: null,
          },
        });
      });

      const info = result.current.getStreakInfo();

      expect(info.current).toBe(7);
      expect(info.longest).toBe(14);
      expect(info.freezeAvailable).toBe(true);
      expect(info.isAtRisk).toBe(false);
    });

    it('shows freeze unavailable when used this week', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        useJourneyStore.setState({
          streak: {
            ...DEFAULT_STREAK,
            freezeAvailable: true,
            freezeUsedThisWeek: true,
          },
        });
      });

      const info = result.current.getStreakInfo();
      expect(info.freezeAvailable).toBe(false);
    });
  });

  // ===========================================================================
  // Certification
  // ===========================================================================

  describe('checkCertUnlock()', () => {
    it('returns unlock status for a tier', () => {
      const { result } = renderHook(() => useJourneyStore());

      const status = result.current.checkCertUnlock('speed_reader');

      expect(status.canUnlock).toBe(false);
      expect(status.vsUnlocked).toBe(false);
      expect(status.speedProofAchieved).toBe(false);
    });

    it('returns unlocked when requirements met', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        useJourneyStore.setState({
          velocityScore: 50,
          speedProofs: [{ wpm: 900, comprehension: 75, achievedAt: Date.now() }],
        });
      });

      const status = result.current.checkCertUnlock('speed_reader');

      expect(status.canUnlock).toBe(true);
      expect(status.vsUnlocked).toBe(true);
      expect(status.speedProofAchieved).toBe(true);
    });
  });

  describe('markCertExamPassed()', () => {
    it('marks certification as passed', () => {
      const { result } = renderHook(() => useJourneyStore());

      expect(result.current.certProgress.speed_reader.examPassed).toBe(false);

      act(() => {
        result.current.markCertExamPassed('speed_reader');
      });

      expect(result.current.certProgress.speed_reader.examPassed).toBe(true);
      expect(result.current.certProgress.speed_reader.earnedAt).toBeDefined();
    });

    it('does not affect other tiers', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        result.current.markCertExamPassed('speed_reader');
      });

      expect(result.current.certProgress.velocity_master.examPassed).toBe(false);
      expect(result.current.certProgress.transcendent.examPassed).toBe(false);
    });
  });

  describe('canAttemptCertExam()', () => {
    it('returns false when exam not unlocked', () => {
      const { result } = renderHook(() => useJourneyStore());

      expect(result.current.canAttemptCertExam('speed_reader')).toBe(false);
    });

    it('returns true when unlocked and not passed', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        useJourneyStore.setState({
          certProgress: {
            ...result.current.certProgress,
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: false,
            },
          },
        });
      });

      expect(result.current.canAttemptCertExam('speed_reader')).toBe(true);
    });

    it('returns false when already passed', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        useJourneyStore.setState({
          certProgress: {
            ...result.current.certProgress,
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: true,
            },
          },
        });
      });

      expect(result.current.canAttemptCertExam('speed_reader')).toBe(false);
    });

    it('returns false within 24-hour cooldown', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        useJourneyStore.setState({
          certProgress: {
            ...result.current.certProgress,
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: false,
              lastAttemptAt: Date.now() - 1000 * 60 * 60, // 1 hour ago
            },
          },
        });
      });

      expect(result.current.canAttemptCertExam('speed_reader')).toBe(false);
    });

    it('returns true after 24-hour cooldown', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        useJourneyStore.setState({
          certProgress: {
            ...result.current.certProgress,
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: false,
              lastAttemptAt: Date.now() - 1000 * 60 * 60 * 25, // 25 hours ago
            },
          },
        });
      });

      expect(result.current.canAttemptCertExam('speed_reader')).toBe(true);
    });
  });

  describe('getCertificationsStatus()', () => {
    it('returns status for all certification tiers', () => {
      const { result } = renderHook(() => useJourneyStore());

      const status = result.current.getCertificationsStatus();

      expect(status).toHaveLength(3);
      expect(status.map(s => s.tier)).toEqual(['speed_reader', 'velocity_master', 'transcendent']);
    });

    it('includes progress and unlock status', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        useJourneyStore.setState({
          velocityScore: 50,
          speedProofs: [{ wpm: 900, comprehension: 75, achievedAt: Date.now() }],
          certProgress: {
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              vsUnlocked: true,
              speedProofAchieved: true,
              examUnlocked: true,
            },
            velocity_master: { ...DEFAULT_CERT_PROGRESS },
            transcendent: { ...DEFAULT_CERT_PROGRESS },
          },
        });
      });

      const status = result.current.getCertificationsStatus();
      const speedReader = status.find(s => s.tier === 'speed_reader');

      expect(speedReader!.progress.examUnlocked).toBe(true);
      expect(speedReader!.unlockStatus.canUnlock).toBe(true);
    });
  });

  // ===========================================================================
  // Insights
  // ===========================================================================

  describe('getProgressInsight()', () => {
    it('returns unavailable when no baseline', () => {
      const { result } = renderHook(() => useJourneyStore());

      const insight = result.current.getProgressInsight();

      expect(insight.available).toBe(false);
      expect(insight.baseline).toBeNull();
    });

    it('returns unavailable with fewer than 5 sessions', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        useJourneyStore.setState({
          baseline: { avgWpm: 200, avgComprehension: 70, capturedAt: Date.now(), sessionCount: 3 },
          sessions: [
            createMockSession(),
            createMockSession(),
            createMockSession(),
          ],
        });
      });

      const insight = result.current.getProgressInsight();
      expect(insight.available).toBe(false);
    });

    it('returns insight with baseline and 5+ sessions', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        useJourneyStore.setState({
          baseline: { avgWpm: 200, avgComprehension: 70, capturedAt: Date.now(), sessionCount: 3 },
          sessions: [
            createMockSession({ wpm: 200, comprehension: 70 }),
            createMockSession({ wpm: 300, comprehension: 80 }),
            createMockSession({ wpm: 400, comprehension: 90 }),
            createMockSession({ wpm: 350, comprehension: 85 }),
            createMockSession({ wpm: 450, comprehension: 95 }),
          ],
        });
      });

      const insight = result.current.getProgressInsight();

      expect(insight.available).toBe(true);
      expect(insight.baseline).not.toBeNull();
      // Current avg is from last 3: (400 + 350 + 450) / 3 = 400
      expect(insight.current.avgWpm).toBe(400);
      // Delta = 400 - 200 = 200
      expect(insight.deltaWpm).toBe(200);
    });
  });

  describe('getWeeklyTrend()', () => {
    it('returns empty array with no sessions', () => {
      const { result } = renderHook(() => useJourneyStore());

      const trend = result.current.getWeeklyTrend();
      expect(trend).toEqual([]);
    });

    it('returns weekly trend data', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        useJourneyStore.setState({
          sessions: [
            createMockSession({ wpm: 300, comprehension: 80, completedAt: new Date('2024-01-08').getTime() }),
            createMockSession({ wpm: 400, comprehension: 90, completedAt: new Date('2024-01-09').getTime() }),
          ],
        });
      });

      const trend = result.current.getWeeklyTrend(4);

      expect(trend).toHaveLength(1);
      expect(trend[0].avgWpm).toBe(350);
      expect(trend[0].sessionCount).toBe(2);
    });
  });

  // ===========================================================================
  // Migration
  // ===========================================================================

  describe('migrateFromLearningStore()', () => {
    it('does nothing when learningStore has no completions', () => {
      const { result } = renderHook(() => useJourneyStore());

      resetLearningStore();

      act(() => {
        result.current.migrateFromLearningStore();
      });

      expect(result.current.sessions).toHaveLength(0);
    });

    it('migrates recentCompletions to sessions', () => {
      const { result } = renderHook(() => useJourneyStore());

      // Set up learning store with completions
      act(() => {
        useLearningStore.setState({
          recentCompletions: [
            { articleId: 'a1', wpm: 300, score: 80, timestamp: 1000, isCertificationText: false },
            { articleId: 'a2', wpm: 400, score: 90, timestamp: 2000, isCertificationText: false },
            { articleId: 'a3', wpm: 500, score: 100, timestamp: 3000, isCertificationText: true },
          ],
        });
      });

      act(() => {
        result.current.migrateFromLearningStore();
      });

      expect(result.current.sessions).toHaveLength(3);
      expect(result.current.sessions[0].wpm).toBe(300);
      expect(result.current.sessions[0].articleType).toBe('curriculum');
      expect(result.current.sessions[2].articleType).toBe('certification');
    });

    it('extracts speed proofs during migration', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        useLearningStore.setState({
          recentCompletions: [
            { articleId: 'a1', wpm: 900, score: 75, timestamp: 1000, isCertificationText: false },
            { articleId: 'a2', wpm: 1000, score: 80, timestamp: 2000, isCertificationText: false },
          ],
        });
      });

      act(() => {
        result.current.migrateFromLearningStore();
      });

      // Both sessions qualify as speed proofs (900+ WPM, 70%+ comprehension)
      expect(result.current.speedProofs).toHaveLength(2);
    });

    it('captures baseline during migration with 3+ sessions', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        useLearningStore.setState({
          recentCompletions: [
            { articleId: 'a1', wpm: 200, score: 70, timestamp: 1000, isCertificationText: false },
            { articleId: 'a2', wpm: 300, score: 80, timestamp: 2000, isCertificationText: false },
            { articleId: 'a3', wpm: 400, score: 90, timestamp: 3000, isCertificationText: false },
          ],
        });
      });

      act(() => {
        result.current.migrateFromLearningStore();
      });

      expect(result.current.baseline).not.toBeNull();
      expect(result.current.baseline!.avgWpm).toBe(300);
    });

    it('updates version after migration', () => {
      const { result } = renderHook(() => useJourneyStore());

      act(() => {
        useLearningStore.setState({
          recentCompletions: [
            { articleId: 'a1', wpm: 300, score: 80, timestamp: 1000, isCertificationText: false },
          ],
        });
      });

      act(() => {
        result.current.migrateFromLearningStore();
      });

      expect(result.current._version).toBe(2);
    });
  });

  // ===========================================================================
  // initializeJourneyStore
  // ===========================================================================

  describe('initializeJourneyStore()', () => {
    it('returns migration result when migration occurs', () => {
      resetJourneyStore();

      act(() => {
        useLearningStore.setState({
          recentCompletions: [
            { articleId: 'a1', wpm: 300, score: 80, timestamp: 1000, isCertificationText: false },
          ],
        });
        useJourneyStore.setState({ _version: 1, sessions: [] });
      });

      let initResult: { migrated: boolean; freezeApplied: boolean; streakBroken: boolean };
      act(() => {
        initResult = initializeJourneyStore();
      });

      expect(initResult!.migrated).toBe(true);
    });

    it('does not migrate when sessions already exist', () => {
      act(() => {
        useLearningStore.setState({
          recentCompletions: [
            { articleId: 'a1', wpm: 300, score: 80, timestamp: 1000, isCertificationText: false },
          ],
        });
        useJourneyStore.setState({
          _version: 1,
          sessions: [createMockSession()],
        });
      });

      let initResult: { migrated: boolean; freezeApplied: boolean; streakBroken: boolean };
      act(() => {
        initResult = initializeJourneyStore();
      });

      expect(initResult!.migrated).toBe(false);
    });

    it('does not migrate when version is already 2', () => {
      act(() => {
        useLearningStore.setState({
          recentCompletions: [
            { articleId: 'a1', wpm: 300, score: 80, timestamp: 1000, isCertificationText: false },
          ],
        });
        useJourneyStore.setState({
          _version: 2,
          sessions: [],
        });
      });

      let initResult: { migrated: boolean; freezeApplied: boolean; streakBroken: boolean };
      act(() => {
        initResult = initializeJourneyStore();
      });

      expect(initResult!.migrated).toBe(false);
    });

    it('checks streak on launch', () => {
      const today = new Date().toISOString().split('T')[0];

      act(() => {
        useLearningStore.setState({ recentCompletions: [] });
        useJourneyStore.setState({
          _version: 2,
          sessions: [],
          streak: {
            currentDays: 5,
            longestDays: 5,
            lastCompletedDate: today,
            freezeAvailable: true,
            freezeUsedThisWeek: false,
            freezeLastReset: null,
          },
        });
      });

      let initResult: { migrated: boolean; freezeApplied: boolean; streakBroken: boolean };
      act(() => {
        initResult = initializeJourneyStore();
      });

      expect(initResult!.freezeApplied).toBe(false);
      expect(initResult!.streakBroken).toBe(false);
    });
  });
});
