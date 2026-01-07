// Certificate Types

import { CertificationLength } from './learning';

// ============================================================
// New Certification Tier System
// ============================================================

/**
 * The three certification tiers
 */
export type CertificationTier = 'quick_reader' | 'speed_reader' | 'lightning_reader';

/**
 * Requirements for earning a certification tier
 */
export interface CertificationRequirement {
  /** Minimum WPM on certification texts */
  minWPM: number;
  /** Minimum accuracy percentage (0-100) */
  minAccuracy: number;
  /** Required certification text completions by length */
  requiredTexts: {
    short?: number;
    medium?: number;
    long?: number;
  };
  /** Prerequisite tier (must be earned first) */
  prerequisite?: CertificationTier;
}

/**
 * Full certification tier definition
 */
export interface CertificationDefinition {
  tier: CertificationTier;
  title: string;
  description: string;
  requirementDescription: string;
  icon: string;
  color: string;
  requirement: CertificationRequirement;
}

/**
 * The three certification tier definitions
 */
export const CERTIFICATION_TIER_DEFINITIONS: CertificationDefinition[] = [
  {
    tier: 'quick_reader',
    title: 'Quick Reader',
    description: 'Demonstrated fast reading with good comprehension',
    requirementDescription: '600 WPM + 80% accuracy + 3 short/medium texts',
    icon: '🏃',
    color: '#69db7c',
    requirement: {
      minWPM: 600,
      minAccuracy: 80,
      requiredTexts: { short: 2, medium: 1 },
      // No prerequisite - first tier
    },
  },
  {
    tier: 'speed_reader',
    title: 'Speed Reader',
    description: 'Advanced speed reading mastery',
    requirementDescription: '900 WPM + 85% accuracy + 3 medium/long texts',
    icon: '⚡',
    color: '#fab005',
    requirement: {
      minWPM: 900,
      minAccuracy: 85,
      requiredTexts: { medium: 1, long: 2 },
      prerequisite: 'quick_reader',
    },
  },
  {
    tier: 'lightning_reader',
    title: 'Lightning Reader',
    description: 'Elite speed reading performance',
    requirementDescription: '1200 WPM + 90% accuracy + 3 long texts',
    icon: '🏆',
    color: '#9775fa',
    requirement: {
      minWPM: 1200,
      minAccuracy: 90,
      requiredTexts: { long: 3 },
      prerequisite: 'speed_reader',
    },
  },
];

/**
 * Get a certification tier definition by tier ID
 */
export function getCertificationTierDefinition(tier: CertificationTier): CertificationDefinition | undefined {
  return CERTIFICATION_TIER_DEFINITIONS.find(d => d.tier === tier);
}

/**
 * Progress toward a specific certification tier
 */
export interface CertificationTierProgress {
  /** Speed requirement progress (0-1) */
  speedProgress: number;
  /** Accuracy requirement progress (0-1) */
  accuracyProgress: number;
  /** Texts requirement progress (0-1) */
  textsProgress: number;
  /** Overall progress (minimum of all dimensions, 0-1) */
  overallProgress: number;
  /** Whether prerequisites are met */
  isUnlocked: boolean;
  /** Whether user is ready to attempt (close to requirements) */
  isReady: boolean;
  /** Whether this tier has been earned */
  isEarned: boolean;
  /** Timestamp when earned (if earned) */
  earnedAt?: number;
}

/**
 * Record of a completed certification text
 */
export interface CertificationTextCompletion {
  articleId: string;
  topicId: string;
  length: CertificationLength;
  score: number;
  wpm: number;
  completedAt: number;
  /** Whether this was the first attempt (counts toward certification) */
  wasFirstAttempt: boolean;
}

/**
 * Overall certification progress tracking
 */
export interface CertificationProgress {
  /** Highest WPM achieved on certification texts (first attempts only) */
  highestCertificationWPM: number;
  /** Average accuracy on certification texts (first attempts only) */
  averageCertificationAccuracy: number;
  /** Count of passed texts by length (first attempts with passing score) */
  shortTextsPassed: number;
  mediumTextsPassed: number;
  longTextsPassed: number;
  /** Tiers that have been earned */
  earnedTiers: CertificationTier[];
  /** Progress toward each tier */
  tierProgress: Record<CertificationTier, CertificationTierProgress>;
}

/**
 * Initial/empty certification progress
 */
export const INITIAL_CERTIFICATION_PROGRESS: CertificationProgress = {
  highestCertificationWPM: 0,
  averageCertificationAccuracy: 0,
  shortTextsPassed: 0,
  mediumTextsPassed: 0,
  longTextsPassed: 0,
  earnedTiers: [],
  tierProgress: {
    quick_reader: {
      speedProgress: 0,
      accuracyProgress: 0,
      textsProgress: 0,
      overallProgress: 0,
      isUnlocked: true, // First tier is always unlocked
      isReady: false,
      isEarned: false,
    },
    speed_reader: {
      speedProgress: 0,
      accuracyProgress: 0,
      textsProgress: 0,
      overallProgress: 0,
      isUnlocked: false, // Requires quick_reader
      isReady: false,
      isEarned: false,
    },
    lightning_reader: {
      speedProgress: 0,
      accuracyProgress: 0,
      textsProgress: 0,
      overallProgress: 0,
      isUnlocked: false, // Requires speed_reader
      isReady: false,
      isEarned: false,
    },
  },
};

/**
 * Readiness thresholds (user is "ready" when practice performance is this fraction of requirement)
 */
export const READINESS_WPM_THRESHOLD = 0.9; // 90% of required WPM
export const READINESS_ACCURACY_THRESHOLD = 0.95; // 95% of required accuracy

/**
 * Check if a user is ready to attempt a certification tier based on practice performance
 */
export function checkTierReadiness(
  tier: CertificationTier,
  recentWPM: number,
  recentAccuracy: number,
  earnedTiers: CertificationTier[]
): { isUnlocked: boolean; isReady: boolean } {
  const def = getCertificationTierDefinition(tier);
  if (!def) {return { isUnlocked: false, isReady: false };}

  // Check prerequisite
  const prereqMet = !def.requirement.prerequisite || earnedTiers.includes(def.requirement.prerequisite);
  if (!prereqMet) {return { isUnlocked: false, isReady: false };}

  // Check readiness thresholds
  const wpmReady = recentWPM >= def.requirement.minWPM * READINESS_WPM_THRESHOLD;
  const accReady = recentAccuracy >= def.requirement.minAccuracy * READINESS_ACCURACY_THRESHOLD;

  return {
    isUnlocked: true,
    isReady: wpmReady && accReady,
  };
}

/**
 * Calculate how many texts of each length are required for a tier
 */
export function getRequiredTextCounts(tier: CertificationTier): { short: number; medium: number; long: number } {
  const def = getCertificationTierDefinition(tier);
  if (!def) {return { short: 0, medium: 0, long: 0 };}

  return {
    short: def.requirement.requiredTexts.short || 0,
    medium: def.requirement.requiredTexts.medium || 0,
    long: def.requirement.requiredTexts.long || 0,
  };
}

// ============================================================
// Legacy Certificate Types (for backwards compatibility)
// ============================================================

/**
 * @deprecated Legacy certificate type - use CertificationTier instead
 */
export type LegacyCertificateType = 'speed_900' | 'speed_1500';

/**
 * @deprecated Legacy certificate interface
 */
export interface Certificate {
  id: string;
  type: LegacyCertificateType;
  earnedAt: number;
  wpm: number;
}

/**
 * @deprecated Legacy certificate definition
 */
export interface LegacyCertificateDefinition {
  type: LegacyCertificateType;
  title: string;
  description: string;
  icon: string;
  color: string;
  requirement: {
    wpm: number;
  };
}

/**
 * @deprecated Legacy certificate definitions
 */
export const CERTIFICATE_DEFINITIONS: LegacyCertificateDefinition[] = [
  {
    type: 'speed_900',
    title: 'Speed Reader',
    description: 'Achieved 900 WPM reading speed',
    icon: '⚡',
    color: '#fab005',
    requirement: { wpm: 900 },
  },
  {
    type: 'speed_1500',
    title: 'Master Reader',
    description: 'Achieved 1500 WPM reading speed',
    icon: '🏆',
    color: '#9775fa',
    requirement: { wpm: 1500 },
  },
];

/**
 * @deprecated Use getCertificationTierDefinition instead
 */
export function getCertificateDefinition(type: LegacyCertificateType): LegacyCertificateDefinition | undefined {
  return CERTIFICATE_DEFINITIONS.find(c => c.type === type);
}

/**
 * Map legacy certificate types to new certification tiers
 */
export function mapLegacyToTier(type: LegacyCertificateType): CertificationTier | undefined {
  switch (type) {
    case 'speed_900':
      return 'speed_reader';
    case 'speed_1500':
      return 'lightning_reader';
    default:
      return undefined;
  }
}

// ============================================================
// Earned Certificate (New Format)
// ============================================================

/**
 * An earned certification
 */
export interface EarnedCertification {
  id: string;
  tier: CertificationTier;
  earnedAt: number;
  /** Stats at time of earning */
  earnedStats: {
    wpm: number;
    accuracy: number;
    textsCompleted: number;
  };
}
