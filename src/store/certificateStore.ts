import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  Certificate,
  CERTIFICATE_DEFINITIONS,
  CertificationTier,
  CertificationProgress,
  CertificationTextCompletion,
  CertificationTierProgress,
  CERTIFICATION_TIER_DEFINITIONS,
  INITIAL_CERTIFICATION_PROGRESS,
  getCertificationTierDefinition,
  checkTierReadiness,
  EarnedCertification,
  LegacyCertificateType,
} from '../types/certificates';
import { CertificationLength, PASS_THRESHOLD } from '../types/learning';

const generateId = () => Math.random().toString(36).substring(2, 15);

/**
 * Result of checking certification readiness
 */
export interface ReadinessCheckResult {
  /** Tiers that are unlocked (prerequisites met) */
  unlocked: CertificationTier[];
  /** Tiers that user is ready to attempt (close to requirements) */
  ready: CertificationTier[];
}

interface CertificateStore {
  // ============================================================
  // Legacy State (for backwards compatibility)
  // ============================================================
  certificates: Certificate[];
  lastCheckedWPM: number;

  // ============================================================
  // New Certification State
  // ============================================================
  /** Detailed certification progress */
  certificationProgress: CertificationProgress;
  /** Completed certification text records */
  completedCertificationTexts: CertificationTextCompletion[];
  /** Earned certifications (new format) */
  earnedCertifications: EarnedCertification[];
  /** When readiness prompt was last shown for each tier */
  lastReadinessPrompt: Partial<Record<CertificationTier, number>>;

  // ============================================================
  // Legacy Actions (for backwards compatibility)
  // ============================================================
  checkAndAwardCertificates: (highestWPM: number) => Certificate[];
  hasCertificate: (type: LegacyCertificateType) => boolean;
  getCertificate: (type: LegacyCertificateType) => Certificate | undefined;
  getAllCertificates: () => Certificate[];

  // ============================================================
  // New Certification Actions
  // ============================================================
  /**
   * Record a certification text completion
   */
  recordCertificationCompletion: (
    articleId: string,
    topicId: string,
    length: CertificationLength,
    score: number,
    wpm: number,
    wasFirstAttempt: boolean
  ) => void;

  /**
   * Check if user is ready to attempt any certification tier
   * @param recentWPM Average WPM from recent practice
   * @param recentAccuracy Average accuracy from recent practice
   */
  checkCertificationReadiness: (
    recentWPM: number,
    recentAccuracy: number
  ) => ReadinessCheckResult;

  /**
   * Award a certification tier
   */
  awardCertification: (
    tier: CertificationTier,
    stats: { wpm: number; accuracy: number; textsCompleted: number }
  ) => EarnedCertification | null;

  /**
   * Check if certification meets requirements for a tier
   */
  checkTierRequirements: (
    tier: CertificationTier,
    wpm: number,
    accuracy: number
  ) => boolean;

  /**
   * Check if readiness prompt should be shown for a tier
   */
  shouldShowReadinessPrompt: (tier: CertificationTier) => boolean;

  /**
   * Mark readiness prompt as shown
   */
  markReadinessPromptShown: (tier: CertificationTier) => void;

  /**
   * Get progress for a specific tier
   */
  getTierProgress: (tier: CertificationTier) => CertificationTierProgress;

  /**
   * Get full certification progress
   */
  getCertificationProgress: () => CertificationProgress;

  /**
   * Check if a tier has been earned
   */
  hasTier: (tier: CertificationTier) => boolean;

  /**
   * Get earned certification for a tier
   */
  getEarnedCertification: (tier: CertificationTier) => EarnedCertification | undefined;

  /**
   * Recalculate all tier progress based on current state
   */
  recalculateProgress: () => void;
}

export const useCertificateStore = create<CertificateStore>()(
  persist(
    (set, get) => ({
      // Legacy state
      certificates: [],
      lastCheckedWPM: 0,

      // New state
      certificationProgress: INITIAL_CERTIFICATION_PROGRESS,
      completedCertificationTexts: [],
      earnedCertifications: [],
      lastReadinessPrompt: {},

      // ============================================================
      // Legacy Actions
      // ============================================================
      checkAndAwardCertificates: (highestWPM) => {
        const state = get();
        const newCertificates: Certificate[] = [];

        CERTIFICATE_DEFINITIONS.forEach((def) => {
          if (state.certificates.some((c) => c.type === def.type)) {
            return;
          }

          if (highestWPM >= def.requirement.wpm) {
            const cert: Certificate = {
              id: generateId(),
              type: def.type,
              earnedAt: Date.now(),
              wpm: highestWPM,
            };
            newCertificates.push(cert);
          }
        });

        if (newCertificates.length > 0) {
          set((state) => ({
            certificates: [...state.certificates, ...newCertificates],
            lastCheckedWPM: highestWPM,
          }));
        }

        return newCertificates;
      },

      hasCertificate: (type) => {
        return get().certificates.some((c) => c.type === type);
      },

      getCertificate: (type) => {
        return get().certificates.find((c) => c.type === type);
      },

      getAllCertificates: () => {
        return get().certificates;
      },

      // ============================================================
      // New Certification Actions
      // ============================================================
      recordCertificationCompletion: (
        articleId,
        topicId,
        length,
        score,
        wpm,
        wasFirstAttempt
      ) => {
        set((state) => {
          // Check if already recorded
          const existing = state.completedCertificationTexts.find(
            (c) => c.articleId === articleId && c.wasFirstAttempt
          );
          if (existing && wasFirstAttempt) {
            // Already have first attempt recorded, don't overwrite
            return state;
          }

          const completion: CertificationTextCompletion = {
            articleId,
            topicId,
            length,
            score,
            wpm,
            completedAt: Date.now(),
            wasFirstAttempt,
          };

          const newCompletions = [...state.completedCertificationTexts, completion];

          // Recalculate progress based on first attempts only
          const firstAttempts = newCompletions.filter((c) => c.wasFirstAttempt);
          const passedFirstAttempts = firstAttempts.filter((c) => c.score >= PASS_THRESHOLD);

          const shortPassed = passedFirstAttempts.filter((c) => c.length === 'short').length;
          const mediumPassed = passedFirstAttempts.filter((c) => c.length === 'medium').length;
          const longPassed = passedFirstAttempts.filter((c) => c.length === 'long').length;

          const wpmValues = passedFirstAttempts.map((c) => c.wpm);
          const accuracyValues = passedFirstAttempts.map((c) => c.score);

          const highestWPM = wpmValues.length > 0 ? Math.max(...wpmValues) : 0;
          const avgAccuracy =
            accuracyValues.length > 0
              ? Math.round(accuracyValues.reduce((a, b) => a + b, 0) / accuracyValues.length)
              : 0;

          // Calculate tier progress
          const newTierProgress = { ...state.certificationProgress.tierProgress };
          const earnedTiers = [...state.certificationProgress.earnedTiers];

          CERTIFICATION_TIER_DEFINITIONS.forEach((def) => {
            const tier = def.tier;
            const req = def.requirement;

            // Check prerequisites
            const prereqMet = !req.prerequisite || earnedTiers.includes(req.prerequisite);

            // Calculate progress ratios
            const speedProgress = Math.min(1, highestWPM / req.minWPM);
            const accuracyProgress = Math.min(1, avgAccuracy / req.minAccuracy);

            // Calculate texts progress
            let textsNeeded = 0;
            let textsMet = 0;
            if (req.requiredTexts.short) {
              textsNeeded += req.requiredTexts.short;
              textsMet += Math.min(shortPassed, req.requiredTexts.short);
            }
            if (req.requiredTexts.medium) {
              textsNeeded += req.requiredTexts.medium;
              textsMet += Math.min(mediumPassed, req.requiredTexts.medium);
            }
            if (req.requiredTexts.long) {
              textsNeeded += req.requiredTexts.long;
              textsMet += Math.min(longPassed, req.requiredTexts.long);
            }
            const textsProgress = textsNeeded > 0 ? textsMet / textsNeeded : 1;

            const overallProgress = Math.min(speedProgress, accuracyProgress, textsProgress);
            const isEarned = earnedTiers.includes(tier);

            newTierProgress[tier] = {
              ...newTierProgress[tier],
              speedProgress,
              accuracyProgress,
              textsProgress,
              overallProgress,
              isUnlocked: prereqMet,
              isReady: false, // Set by checkCertificationReadiness
              isEarned,
            };
          });

          return {
            completedCertificationTexts: newCompletions,
            certificationProgress: {
              ...state.certificationProgress,
              highestCertificationWPM: highestWPM,
              averageCertificationAccuracy: avgAccuracy,
              shortTextsPassed: shortPassed,
              mediumTextsPassed: mediumPassed,
              longTextsPassed: longPassed,
              tierProgress: newTierProgress,
            },
          };
        });
      },

      checkCertificationReadiness: (recentWPM, recentAccuracy) => {
        const state = get();
        const result: ReadinessCheckResult = { unlocked: [], ready: [] };

        CERTIFICATION_TIER_DEFINITIONS.forEach((def) => {
          const { isUnlocked, isReady } = checkTierReadiness(
            def.tier,
            recentWPM,
            recentAccuracy,
            state.certificationProgress.earnedTiers
          );

          if (isUnlocked && !state.certificationProgress.earnedTiers.includes(def.tier)) {
            result.unlocked.push(def.tier);
            if (isReady) {
              result.ready.push(def.tier);
            }
          }
        });

        return result;
      },

      checkTierRequirements: (tier, wpm, accuracy) => {
        const def = getCertificationTierDefinition(tier);
        if (!def) {return false;}

        const state = get();
        const progress = state.certificationProgress;

        // Check WPM and accuracy meet minimums
        if (wpm < def.requirement.minWPM) {return false;}
        if (accuracy < def.requirement.minAccuracy) {return false;}

        // Check text requirements
        const req = def.requirement.requiredTexts;
        if (req.short && progress.shortTextsPassed < req.short) {return false;}
        if (req.medium && progress.mediumTextsPassed < req.medium) {return false;}
        if (req.long && progress.longTextsPassed < req.long) {return false;}

        // Check prerequisites
        if (def.requirement.prerequisite) {
          if (!progress.earnedTiers.includes(def.requirement.prerequisite)) {
            return false;
          }
        }

        return true;
      },

      awardCertification: (tier, stats) => {
        const state = get();

        // Check if already earned
        if (state.certificationProgress.earnedTiers.includes(tier)) {
          return null;
        }

        const earned: EarnedCertification = {
          id: generateId(),
          tier,
          earnedAt: Date.now(),
          earnedStats: stats,
        };

        set((state) => ({
          earnedCertifications: [...state.earnedCertifications, earned],
          certificationProgress: {
            ...state.certificationProgress,
            earnedTiers: [...state.certificationProgress.earnedTiers, tier],
            tierProgress: {
              ...state.certificationProgress.tierProgress,
              [tier]: {
                ...state.certificationProgress.tierProgress[tier],
                isEarned: true,
                earnedAt: earned.earnedAt,
              },
            },
          },
        }));

        // Also update unlocked status for dependent tiers
        get().recalculateProgress();

        return earned;
      },

      shouldShowReadinessPrompt: (tier) => {
        const state = get();

        // Don't show if already earned
        if (state.certificationProgress.earnedTiers.includes(tier)) {
          return false;
        }

        // Check when last shown
        const lastShown = state.lastReadinessPrompt[tier];
        if (!lastShown) {return true;}

        // Only show again after 24 hours
        const dayInMs = 24 * 60 * 60 * 1000;
        return Date.now() - lastShown > dayInMs;
      },

      markReadinessPromptShown: (tier) => {
        set((state) => ({
          lastReadinessPrompt: {
            ...state.lastReadinessPrompt,
            [tier]: Date.now(),
          },
        }));
      },

      getTierProgress: (tier) => {
        return get().certificationProgress.tierProgress[tier];
      },

      getCertificationProgress: () => {
        return get().certificationProgress;
      },

      hasTier: (tier) => {
        return get().certificationProgress.earnedTiers.includes(tier);
      },

      getEarnedCertification: (tier) => {
        return get().earnedCertifications.find((c) => c.tier === tier);
      },

      recalculateProgress: () => {
        set((state) => {
          const newTierProgress = { ...state.certificationProgress.tierProgress };
          const earnedTiers = state.certificationProgress.earnedTiers;

          CERTIFICATION_TIER_DEFINITIONS.forEach((def) => {
            const tier = def.tier;
            const req = def.requirement;

            // Update unlock status based on prerequisites
            const prereqMet = !req.prerequisite || earnedTiers.includes(req.prerequisite);

            newTierProgress[tier] = {
              ...newTierProgress[tier],
              isUnlocked: prereqMet || earnedTiers.includes(tier),
            };
          });

          return {
            certificationProgress: {
              ...state.certificationProgress,
              tierProgress: newTierProgress,
            },
          };
        });
      },
    }),
    {
      name: 'spidrid-certificates',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        certificates: state.certificates,
        lastCheckedWPM: state.lastCheckedWPM,
        certificationProgress: state.certificationProgress,
        completedCertificationTexts: state.completedCertificationTexts,
        earnedCertifications: state.earnedCertifications,
        lastReadinessPrompt: state.lastReadinessPrompt,
      }),
    }
  )
);
