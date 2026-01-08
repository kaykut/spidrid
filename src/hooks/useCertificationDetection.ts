import { useCallback, useState } from 'react';
import { useJourneyStore } from '../store/journeyStore';
import { CertificationTier } from '../types/certificates';

export interface CertificationDetectionState {
  /** The tier that should be suggested to the user (if any) */
  readyTier: CertificationTier | null;
  /** User's recent average WPM */
  currentWPM: number;
  /** User's current Velocity Score */
  currentVS: number;
  /** Whether the readiness modal should be shown */
  showReadinessModal: boolean;
}

export interface UseCertificationDetectionReturn {
  state: CertificationDetectionState;
  /** Check if user is ready for any certification after practice completion */
  checkAfterPractice: () => CertificationTier | null;
  /** Dismiss the readiness modal */
  dismissReadiness: () => void;
  /** Mark that the user chose to take the test */
  startCertificationTest: () => void;
}

/**
 * Hook for detecting when a user is ready for certification
 *
 * Call checkAfterPractice() after completing a practice article.
 * If a tier is ready (examUnlocked but not examPassed),
 * the state will update to show the readiness modal.
 */
export function useCertificationDetection(): UseCertificationDetectionReturn {
  const {
    velocityScore,
    avgWpmLast5,
    certProgress,
  } = useJourneyStore();

  const [state, setState] = useState<CertificationDetectionState>({
    readyTier: null,
    currentWPM: 0,
    currentVS: 0,
    showReadinessModal: false,
  });

  const [promptedTiers, setPromptedTiers] = useState<Set<CertificationTier>>(new Set());

  const checkAfterPractice = useCallback(() => {
    // Find tiers that are exam-unlocked but not yet passed
    const tierPriority: CertificationTier[] = ['speed_reader', 'velocity_master', 'transcendent'];

    let tierToPrompt: CertificationTier | null = null;
    for (const tier of tierPriority) {
      const progress = certProgress[tier];
      // Tier is ready if exam is unlocked but not passed, and we haven't prompted recently
      if (progress?.examUnlocked && !progress?.examPassed && !promptedTiers.has(tier)) {
        tierToPrompt = tier;
        break;
      }
    }

    if (tierToPrompt) {
      setState({
        readyTier: tierToPrompt,
        currentWPM: Math.round(avgWpmLast5),
        currentVS: velocityScore,
        showReadinessModal: true,
      });
    }

    return tierToPrompt;
  }, [certProgress, avgWpmLast5, velocityScore, promptedTiers]);

  const dismissReadiness = useCallback(() => {
    if (state.readyTier) {
      // Add to prompted set so we don't prompt again this session
      setPromptedTiers(prev => new Set(prev).add(state.readyTier!));
    }
    setState((prev) => ({
      ...prev,
      showReadinessModal: false,
    }));
  }, [state.readyTier]);

  const startCertificationTest = useCallback(() => {
    if (state.readyTier) {
      setPromptedTiers(prev => new Set(prev).add(state.readyTier!));
    }
    setState((prev) => ({
      ...prev,
      showReadinessModal: false,
    }));
    // Navigation to certification test screen will be handled by the calling component
  }, [state.readyTier]);

  return {
    state,
    checkAfterPractice,
    dismissReadiness,
    startCertificationTest,
  };
}
