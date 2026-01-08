/**
 * Certificate Types
 *
 * PRD-aligned certification system with three tiers:
 * - Speed Reader (VS ≥40 + 600 WPM proof)
 * - Velocity Master (VS ≥60 + 900 WPM proof)
 * - Transcendent (VS ≥95 + 1500 WPM proof)
 */

// Re-export from journey types for backwards compatibility
import {
  JourneyCertTier,
  JourneyCertDefinition,
  JOURNEY_CERT_DEFINITIONS,
} from './journey';

export {
  JourneyCertTier as CertificationTier,
  JourneyCertDefinition as CertificationDefinition,
  JourneyCertProgress as CertificationTierProgress,
  JOURNEY_CERT_DEFINITIONS as CERTIFICATION_TIER_DEFINITIONS,
} from './journey';

/**
 * Earned certification for display in modals
 */
export interface EarnedCertification {
  tier: JourneyCertTier;
  earnedAt: number;
  earnedStats: {
    wpm: number;
    comprehension: number;
    velocityScore: number;
  };
}

/**
 * Certificate type for PDF generation and display
 * Used by CertificateCard, CertificateViewerModal, and PDF services
 */
export interface Certificate {
  id: string;
  type: JourneyCertTier;
  wpm: number;
  earnedAt: number;
}

/**
 * Get a certification tier definition by tier ID
 */
export function getCertificationTierDefinition(tier: JourneyCertTier): JourneyCertDefinition | undefined {
  return JOURNEY_CERT_DEFINITIONS.find(d => d.tier === tier);
}

/**
 * Alias for getCertificationTierDefinition for backward compatibility
 */
export function getCertificateDefinition(type: JourneyCertTier): JourneyCertDefinition | undefined {
  return getCertificationTierDefinition(type);
}

/**
 * Convert EarnedCertification to Certificate for display
 */
export function earnedCertificationToCertificate(earned: EarnedCertification): Certificate {
  return {
    id: `cert_${earned.tier}_${earned.earnedAt}`,
    type: earned.tier,
    wpm: earned.earnedStats.wpm,
    earnedAt: earned.earnedAt,
  };
}

/**
 * Initial/empty certification progress
 */
export const INITIAL_CERTIFICATION_PROGRESS = {
  speed_reader: {
    vsUnlocked: false,
    speedProofAchieved: false,
    examUnlocked: false,
    examPassed: false,
  },
  velocity_master: {
    vsUnlocked: false,
    speedProofAchieved: false,
    examUnlocked: false,
    examPassed: false,
  },
  transcendent: {
    vsUnlocked: false,
    speedProofAchieved: false,
    examUnlocked: false,
    examPassed: false,
  },
};
