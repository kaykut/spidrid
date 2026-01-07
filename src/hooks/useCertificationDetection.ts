import { useCallback, useState } from 'react';
import { useCertificateStore } from '../store/certificateStore';
import { useLearningStore } from '../store/learningStore';
import { CertificationTier } from '../types/certificates';

export interface CertificationDetectionState {
  /** The tier that should be suggested to the user (if any) */
  readyTier: CertificationTier | null;
  /** User's recent average WPM */
  currentWPM: number;
  /** User's recent average accuracy */
  currentAccuracy: number;
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
 * If a tier is ready and the prompt hasn't been shown recently,
 * the state will update to show the readiness modal.
 */
export function useCertificationDetection(): UseCertificationDetectionReturn {
  const getRecentPerformance = useLearningStore((s) => s.getRecentPerformance);
  const {
    checkCertificationReadiness,
    shouldShowReadinessPrompt,
    markReadinessPromptShown,
  } = useCertificateStore();

  const [state, setState] = useState<CertificationDetectionState>({
    readyTier: null,
    currentWPM: 0,
    currentAccuracy: 0,
    showReadinessModal: false,
  });

  const checkAfterPractice = useCallback(() => {
    // Get recent performance stats
    const { averageWPM, averageAccuracy, articleCount } = getRecentPerformance(5);

    // Need at least 3 completions for reliable readiness detection
    if (articleCount < 3) {
      return null;
    }

    // Check which tiers are ready
    const { ready } = checkCertificationReadiness(averageWPM, averageAccuracy);

    // Find the highest-priority tier that we should show a prompt for
    // Priority: quick_reader > speed_reader > lightning_reader (progression order)
    const tierPriority: CertificationTier[] = ['quick_reader', 'speed_reader', 'lightning_reader'];

    let tierToPrompt: CertificationTier | null = null;
    for (const tier of tierPriority) {
      if (ready.includes(tier) && shouldShowReadinessPrompt(tier)) {
        tierToPrompt = tier;
        break;
      }
    }

    if (tierToPrompt) {
      setState({
        readyTier: tierToPrompt,
        currentWPM: averageWPM,
        currentAccuracy: averageAccuracy,
        showReadinessModal: true,
      });
    }

    return tierToPrompt;
  }, [getRecentPerformance, checkCertificationReadiness, shouldShowReadinessPrompt]);

  const dismissReadiness = useCallback(() => {
    if (state.readyTier) {
      // Mark as shown so we don't prompt again for 24 hours
      markReadinessPromptShown(state.readyTier);
    }
    setState((prev) => ({
      ...prev,
      showReadinessModal: false,
    }));
  }, [state.readyTier, markReadinessPromptShown]);

  const startCertificationTest = useCallback(() => {
    // Mark prompt as shown
    if (state.readyTier) {
      markReadinessPromptShown(state.readyTier);
    }
    setState((prev) => ({
      ...prev,
      showReadinessModal: false,
    }));
    // Navigation to certification test screen will be handled by the calling component
  }, [state.readyTier, markReadinessPromptShown]);

  return {
    state,
    checkAfterPractice,
    dismissReadiness,
    startCertificationTest,
  };
}
