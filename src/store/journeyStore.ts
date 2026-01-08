import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  VelocityLevel,
  UserState,
  ComfortBand,
  JourneySession,
  StreakData,
  BaselineStats,
  SpeedProof,
  JourneyCertTier,
  JourneyCertProgress,
  CertUnlockStatus,
  ProgressInsight,
  WeeklyTrendPoint,
  ArticleType,
  CardTypeChosen,
  DEFAULT_STREAK,
  DEFAULT_COMFORT_BAND,
  DEFAULT_CERT_PROGRESS,
  JOURNEY_CERT_DEFINITIONS,
} from '../types/journey';
import {
  calculateEffectiveWpm,
  calculateVelocityScore,
  getLevelFromVS,
  getLevelProgress,
  calculateAvgWpm,
  calculateAvgComprehension,
  calculateBestWpmAt80,
  detectUserState,
  calculateComfortBand,
  getSuggestedWpm,
  calculateStreakUpdate,
  checkAndApplyStreakFreeze,
  isStreakAtRisk,
  captureBaseline,
  checkCertUnlockStatus,
  extractSpeedProofs,
  calculateWeeklyTrend,
  generateSessionId,
  getVSToNextLevel,
  shouldResetFreeze,
  getLastMondayDateString,
} from '../utils/journeyCalculations';
import { useLearningStore } from './learningStore';

// =============================================================================
// Store Types
// =============================================================================

interface JourneyState {
  // Version for migrations
  _version: number;

  // Velocity Score
  velocityScore: number;
  level: VelocityLevel;

  // Session History
  sessions: JourneySession[];

  // Aggregated Stats (cached for performance)
  avgWpmLast3: number;
  avgWpmLast5: number;
  avgCompLast5: number;
  avgCompLast10: number;
  bestWpmAt80: number;

  // User State (for Smart Queue)
  userState: UserState;

  // Comfort Band
  comfortBand: ComfortBand;

  // Streak
  streak: StreakData;

  // Baseline (immutable after first 3 sessions)
  baseline: BaselineStats | null;

  // Speed Proofs (for certification unlock)
  speedProofs: SpeedProof[];

  // Certification Progress
  certProgress: Record<JourneyCertTier, JourneyCertProgress>;

  // Level history (when each level was first reached)
  levelHistory: Partial<Record<VelocityLevel, number>>;
}

interface JourneyActions {
  // Core Session Recording
  recordSession: (params: {
    wpm: number;
    comprehension: number;
    articleId: string;
    articleType: ArticleType;
    cardTypeChosen?: CardTypeChosen;
  }) => void;

  // Recalculations (called internally)
  recalculateAll: () => void;

  // Velocity Score
  getVSToNextLevel: () => number | null;
  getLevelProgress: () => number;

  // User State
  getUserState: () => UserState;

  // Comfort Band
  getSuggestedWpm: (cardType: 'primary' | 'stretch') => number;

  // Streak
  checkStreakOnLaunch: () => { freezeApplied: boolean; streakBroken: boolean };
  getStreakInfo: () => {
    current: number;
    longest: number;
    freezeAvailable: boolean;
    isAtRisk: boolean;
  };

  // Certification
  checkCertUnlock: (tier: JourneyCertTier) => CertUnlockStatus;
  markCertExamPassed: (tier: JourneyCertTier) => void;
  canAttemptCertExam: (tier: JourneyCertTier) => boolean;
  getCertificationsStatus: () => Array<{
    tier: JourneyCertTier;
    name: string;
    progress: JourneyCertProgress;
    unlockStatus: CertUnlockStatus;
  }>;

  // Insights
  getProgressInsight: () => ProgressInsight;
  getWeeklyTrend: (weeks?: number) => WeeklyTrendPoint[];

  // Migration
  migrateFromLearningStore: () => void;

  // Reset (for testing/development)
  resetJourneyData: () => void;
}

// =============================================================================
// Initial State
// =============================================================================

const initialCertProgress: Record<JourneyCertTier, JourneyCertProgress> = {
  speed_reader: { ...DEFAULT_CERT_PROGRESS },
  velocity_master: { ...DEFAULT_CERT_PROGRESS },
  transcendent: { ...DEFAULT_CERT_PROGRESS },
};

const initialState: JourneyState = {
  _version: 1,
  velocityScore: 0,
  level: 'novice',
  sessions: [],
  avgWpmLast3: 0,
  avgWpmLast5: 0,
  avgCompLast5: 0,
  avgCompLast10: 0,
  bestWpmAt80: 0,
  userState: 'neutral',
  comfortBand: DEFAULT_COMFORT_BAND,
  streak: DEFAULT_STREAK,
  baseline: null,
  speedProofs: [],
  certProgress: initialCertProgress,
  levelHistory: {},
};

// =============================================================================
// Store Implementation
// =============================================================================

export const useJourneyStore = create<JourneyState & JourneyActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // =========================================================================
      // Core Session Recording
      // =========================================================================

      recordSession: ({ wpm, comprehension, articleId, articleType, cardTypeChosen }) => {
        const now = Date.now();
        const effectiveWpm = calculateEffectiveWpm(wpm, comprehension);

        // Create session record
        const session: JourneySession = {
          id: generateSessionId(),
          wpm,
          comprehension,
          effectiveWpm,
          articleId,
          articleType,
          completedAt: now,
          vsAfter: 0, // Will be updated after recalculation
          cardTypeChosen,
        };

        set((state) => {
          // Add session (keep last 100)
          const newSessions = [...state.sessions, session].slice(-100);

          // Extract speed proofs
          const newProofs = extractSpeedProofs(wpm, comprehension, now);
          const updatedProofs = [...state.speedProofs, ...newProofs];

          // Capture baseline if not yet captured and we have 3 sessions
          let baseline = state.baseline;
          if (!baseline && newSessions.length >= 3) {
            baseline = captureBaseline(newSessions);
          }

          // Update streak
          const newStreak = calculateStreakUpdate(state.streak);

          return {
            sessions: newSessions,
            speedProofs: updatedProofs,
            baseline,
            streak: newStreak,
          };
        });

        // Recalculate all derived values
        get().recalculateAll();

        // Also record in learningStore for backwards compatibility
        if (articleType === 'curriculum') {
          useLearningStore.getState().completeArticle(articleId, comprehension, wpm, false);
        }
      },

      // =========================================================================
      // Recalculations
      // =========================================================================

      recalculateAll: () => {
        set((state) => {
          const { sessions } = state;

          // Calculate VS
          const velocityScore = calculateVelocityScore(sessions);
          const level = getLevelFromVS(velocityScore);

          // Update VS in latest session
          if (sessions.length > 0) {
            const updatedSessions = [...sessions];
            updatedSessions[updatedSessions.length - 1] = {
              ...updatedSessions[updatedSessions.length - 1],
              vsAfter: velocityScore,
            };
          }

          // Calculate aggregated stats
          const avgWpmLast3 = calculateAvgWpm(sessions, 3);
          const avgWpmLast5 = calculateAvgWpm(sessions, 5);
          const avgCompLast5 = calculateAvgComprehension(sessions, 5);
          const avgCompLast10 = calculateAvgComprehension(sessions, 10);
          const bestWpmAt80 = calculateBestWpmAt80(sessions);

          // Detect user state
          const userState = detectUserState(sessions);

          // Calculate comfort band
          const comfortBand = calculateComfortBand(sessions);

          // Update level history if new level reached
          let levelHistory = state.levelHistory;
          if (!levelHistory[level]) {
            levelHistory = { ...levelHistory, [level]: Date.now() };
          }

          // Update certification progress
          const certProgress = { ...state.certProgress };
          for (const certDef of JOURNEY_CERT_DEFINITIONS) {
            const status = checkCertUnlockStatus(velocityScore, state.speedProofs, certDef.tier);
            const current = certProgress[certDef.tier];

            certProgress[certDef.tier] = {
              ...current,
              vsUnlocked: status.vsUnlocked,
              speedProofAchieved: status.speedProofAchieved,
              examUnlocked: status.canUnlock,
            };
          }

          return {
            velocityScore,
            level,
            avgWpmLast3,
            avgWpmLast5,
            avgCompLast5,
            avgCompLast10,
            bestWpmAt80,
            userState,
            comfortBand,
            levelHistory,
            certProgress,
          };
        });
      },

      // =========================================================================
      // Velocity Score
      // =========================================================================

      getVSToNextLevel: () => {
        return getVSToNextLevel(get().velocityScore);
      },

      getLevelProgress: () => {
        return getLevelProgress(get().velocityScore);
      },

      // =========================================================================
      // User State
      // =========================================================================

      getUserState: () => {
        return get().userState;
      },

      // =========================================================================
      // Comfort Band
      // =========================================================================

      getSuggestedWpm: (cardType) => {
        const { comfortBand, userState } = get();
        return getSuggestedWpm(comfortBand, userState, cardType);
      },

      // =========================================================================
      // Streak
      // =========================================================================

      checkStreakOnLaunch: () => {
        let freezeApplied = false;
        let streakBroken = false;

        set((state) => {
          let updatedStreak = { ...state.streak };

          // Check for weekly freeze reset
          if (shouldResetFreeze(updatedStreak)) {
            updatedStreak = {
              ...updatedStreak,
              freezeAvailable: true,
              freezeUsedThisWeek: false,
              freezeLastReset: getLastMondayDateString(),
            };
          }

          // Check if streak freeze should be applied
          const freezeResult = checkAndApplyStreakFreeze(updatedStreak);
          if (freezeResult) {
            freezeApplied = true;
            updatedStreak = freezeResult;
          } else if (isStreakAtRisk(updatedStreak) && updatedStreak.currentDays > 0) {
            // Streak is broken
            streakBroken = true;
            // Don't reset here - let the user see the broken streak modal first
          }

          return { streak: updatedStreak };
        });

        return { freezeApplied, streakBroken };
      },

      getStreakInfo: () => {
        const { streak } = get();
        return {
          current: streak.currentDays,
          longest: streak.longestDays,
          freezeAvailable: streak.freezeAvailable && !streak.freezeUsedThisWeek,
          isAtRisk: isStreakAtRisk(streak),
        };
      },

      // =========================================================================
      // Certification
      // =========================================================================

      checkCertUnlock: (tier) => {
        const { velocityScore, speedProofs } = get();
        return checkCertUnlockStatus(velocityScore, speedProofs, tier);
      },

      markCertExamPassed: (tier) => {
        set((state) => ({
          certProgress: {
            ...state.certProgress,
            [tier]: {
              ...state.certProgress[tier],
              examPassed: true,
              earnedAt: Date.now(),
            },
          },
        }));
      },

      canAttemptCertExam: (tier) => {
        const { certProgress } = get();
        const progress = certProgress[tier];

        // Must be unlocked
        if (!progress.examUnlocked) {return false;}

        // Already passed
        if (progress.examPassed) {return false;}

        // Check 24-hour cooldown
        if (progress.lastAttemptAt) {
          const hoursSinceAttempt = (Date.now() - progress.lastAttemptAt) / (1000 * 60 * 60);
          if (hoursSinceAttempt < 24) {return false;}
        }

        return true;
      },

      getCertificationsStatus: () => {
        const { velocityScore, speedProofs, certProgress } = get();

        return JOURNEY_CERT_DEFINITIONS.map((certDef) => ({
          tier: certDef.tier,
          name: certDef.name,
          progress: certProgress[certDef.tier],
          unlockStatus: checkCertUnlockStatus(velocityScore, speedProofs, certDef.tier),
        }));
      },

      // =========================================================================
      // Insights
      // =========================================================================

      getProgressInsight: (): ProgressInsight => {
        const { baseline, sessions } = get();

        if (!baseline || sessions.length < 5) {
          return {
            available: false,
            baseline: null,
            current: { avgWpm: 0, avgComprehension: 0 },
            deltaWpm: 0,
            deltaComprehension: 0,
          };
        }

        const last3 = sessions.slice(-3);
        const currentAvgWpm = Math.round(
          last3.reduce((sum, s) => sum + s.wpm, 0) / last3.length
        );
        const currentAvgComp = Math.round(
          last3.reduce((sum, s) => sum + s.comprehension, 0) / last3.length
        );

        return {
          available: true,
          baseline,
          current: {
            avgWpm: currentAvgWpm,
            avgComprehension: currentAvgComp,
          },
          deltaWpm: currentAvgWpm - baseline.avgWpm,
          deltaComprehension: currentAvgComp - baseline.avgComprehension,
        };
      },

      getWeeklyTrend: (weeks = 4) => {
        return calculateWeeklyTrend(get().sessions, weeks);
      },

      // =========================================================================
      // Migration
      // =========================================================================

      migrateFromLearningStore: () => {
        const learningState = useLearningStore.getState();
        const { recentCompletions } = learningState;

        if (recentCompletions.length === 0) {return;}

        // Transform recentCompletions to JourneySessions
        const sessions: JourneySession[] = recentCompletions.map((rc, idx) => ({
          id: `migrated_${idx}_${rc.timestamp}`,
          wpm: rc.wpm,
          comprehension: rc.score,
          effectiveWpm: calculateEffectiveWpm(rc.wpm, rc.score),
          articleId: rc.articleId,
          articleType: rc.isCertificationText ? 'certification' : 'curriculum',
          completedAt: rc.timestamp,
          vsAfter: 0, // Will be recalculated
        }));

        // Extract speed proofs
        const speedProofs: SpeedProof[] = [];
        for (const session of sessions) {
          if (session.comprehension >= 70 && session.wpm >= 600) {
            speedProofs.push({
              wpm: session.wpm,
              comprehension: session.comprehension,
              achievedAt: session.completedAt,
            });
          }
        }

        // Capture baseline
        const baseline = sessions.length >= 3 ? captureBaseline(sessions) : null;

        set({
          sessions,
          speedProofs,
          baseline,
          _version: 2, // Mark as migrated
        });

        // Recalculate all derived values
        get().recalculateAll();
      },

      // =========================================================================
      // Reset
      // =========================================================================

      resetJourneyData: () => {
        set({
          ...initialState,
          certProgress: {
            speed_reader: { ...DEFAULT_CERT_PROGRESS },
            velocity_master: { ...DEFAULT_CERT_PROGRESS },
            transcendent: { ...DEFAULT_CERT_PROGRESS },
          },
        });
      },
    }),
    {
      name: 'spidrid-journey',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        _version: state._version,
        sessions: state.sessions.slice(-100), // Keep last 100
        streak: state.streak,
        baseline: state.baseline,
        speedProofs: state.speedProofs,
        certProgress: state.certProgress,
        levelHistory: state.levelHistory,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Recalculate derived values on load
          state.recalculateAll();
        }
      },
    }
  )
);

// =============================================================================
// Initialization Hook
// =============================================================================

/**
 * Call this on app launch to check for migration and streak updates
 */
export function initializeJourneyStore(): {
  migrated: boolean;
  freezeApplied: boolean;
  streakBroken: boolean;
} {
  const journeyState = useJourneyStore.getState();
  let migrated = false;

  // Check if migration is needed
  if (journeyState.sessions.length === 0 && journeyState._version < 2) {
    const learningState = useLearningStore.getState();
    if (learningState.recentCompletions.length > 0) {
      journeyState.migrateFromLearningStore();
      migrated = true;
    }
  }

  // Check streak on launch
  const { freezeApplied, streakBroken } = journeyState.checkStreakOnLaunch();

  return { migrated, freezeApplied, streakBroken };
}
