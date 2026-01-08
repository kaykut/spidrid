/**
 * Certificate Store
 *
 * Wrapper around journeyStore's certification system for backwards compatibility.
 * All certification data is now stored in journeyStore.
 */

import { create } from 'zustand';
import {
  CertificationTier,
  CertificationTierProgress,
  CERTIFICATION_TIER_DEFINITIONS,
} from '../types/certificates';
import { useJourneyStore } from './journeyStore';

interface CertificateStore {
  /**
   * Get progress for a specific tier
   */
  getTierProgress: (tier: CertificationTier) => CertificationTierProgress;

  /**
   * Get full certification progress for all tiers
   */
  getCertificationProgress: () => {
    earnedTiers: CertificationTier[];
    tierProgress: Record<CertificationTier, CertificationTierProgress>;
  };

  /**
   * Check if a tier has been earned
   */
  hasTier: (tier: CertificationTier) => boolean;
}

export const useCertificateStore = create<CertificateStore>()(() => ({
  getTierProgress: (tier) => {
    const journeyState = useJourneyStore.getState();
    return journeyState.certProgress[tier];
  },

  getCertificationProgress: () => {
    const journeyState = useJourneyStore.getState();
    const earnedTiers = CERTIFICATION_TIER_DEFINITIONS
      .filter(def => journeyState.certProgress[def.tier].examPassed)
      .map(def => def.tier);

    return {
      earnedTiers,
      tierProgress: journeyState.certProgress,
    };
  },

  hasTier: (tier) => {
    const journeyState = useJourneyStore.getState();
    return journeyState.certProgress[tier].examPassed;
  },
}));
