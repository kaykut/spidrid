/**
 * Tests for useCertificationDetection hook
 *
 * Comprehensive tests for certification readiness detection including:
 * - Initial state
 * - Detecting ready tiers after practice
 * - Modal display and dismissal
 * - Prompted tier tracking
 */

import { renderHook, act } from '@testing-library/react-native';
import { useCertificationDetection } from '../../src/hooks/useCertificationDetection';
import { useJourneyStore } from '../../src/store/journeyStore';
import {
  DEFAULT_CERT_PROGRESS,
  DEFAULT_STREAK,
  DEFAULT_COMFORT_BAND,
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

function resetJourneyStore() {
  useJourneyStore.setState({
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
    certProgress: {
      speed_reader: { ...DEFAULT_CERT_PROGRESS },
      velocity_master: { ...DEFAULT_CERT_PROGRESS },
      transcendent: { ...DEFAULT_CERT_PROGRESS },
    },
    levelHistory: {},
  });
}

// =============================================================================
// Test Suite
// =============================================================================

describe('useCertificationDetection', () => {
  beforeEach(() => {
    resetJourneyStore();
  });

  // ===========================================================================
  // Initial State
  // ===========================================================================

  describe('initial state', () => {
    it('starts with readyTier as null', () => {
      const { result } = renderHook(() => useCertificationDetection());

      expect(result.current.state.readyTier).toBeNull();
    });

    it('starts with showReadinessModal as false', () => {
      const { result } = renderHook(() => useCertificationDetection());

      expect(result.current.state.showReadinessModal).toBe(false);
    });

    it('starts with currentWPM as 0', () => {
      const { result } = renderHook(() => useCertificationDetection());

      expect(result.current.state.currentWPM).toBe(0);
    });

    it('starts with currentVS as 0', () => {
      const { result } = renderHook(() => useCertificationDetection());

      expect(result.current.state.currentVS).toBe(0);
    });
  });

  // ===========================================================================
  // checkAfterPractice
  // ===========================================================================

  describe('checkAfterPractice()', () => {
    it('returns null when no tier is ready', () => {
      const { result } = renderHook(() => useCertificationDetection());

      let tier: string | null = null;
      act(() => {
        tier = result.current.checkAfterPractice();
      });

      expect(tier).toBeNull();
      expect(result.current.state.showReadinessModal).toBe(false);
    });

    it('returns speed_reader tier when exam is unlocked but not passed', () => {
      act(() => {
        useJourneyStore.setState({
          velocityScore: 50,
          avgWpmLast5: 600,
          certProgress: {
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: false,
            },
            velocity_master: { ...DEFAULT_CERT_PROGRESS },
            transcendent: { ...DEFAULT_CERT_PROGRESS },
          },
        });
      });

      const { result } = renderHook(() => useCertificationDetection());

      let tier: string | null = null;
      act(() => {
        tier = result.current.checkAfterPractice();
      });

      expect(tier).toBe('speed_reader');
      expect(result.current.state.readyTier).toBe('speed_reader');
      expect(result.current.state.showReadinessModal).toBe(true);
    });

    it('updates currentWPM from avgWpmLast5', () => {
      act(() => {
        useJourneyStore.setState({
          velocityScore: 50,
          avgWpmLast5: 625,
          certProgress: {
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: false,
            },
            velocity_master: { ...DEFAULT_CERT_PROGRESS },
            transcendent: { ...DEFAULT_CERT_PROGRESS },
          },
        });
      });

      const { result } = renderHook(() => useCertificationDetection());

      act(() => {
        result.current.checkAfterPractice();
      });

      expect(result.current.state.currentWPM).toBe(625);
    });

    it('updates currentVS from velocityScore', () => {
      act(() => {
        useJourneyStore.setState({
          velocityScore: 55,
          avgWpmLast5: 600,
          certProgress: {
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: false,
            },
            velocity_master: { ...DEFAULT_CERT_PROGRESS },
            transcendent: { ...DEFAULT_CERT_PROGRESS },
          },
        });
      });

      const { result } = renderHook(() => useCertificationDetection());

      act(() => {
        result.current.checkAfterPractice();
      });

      expect(result.current.state.currentVS).toBe(55);
    });

    it('prioritizes speed_reader over velocity_master', () => {
      act(() => {
        useJourneyStore.setState({
          velocityScore: 70,
          avgWpmLast5: 1000,
          certProgress: {
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: false,
            },
            velocity_master: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: false,
            },
            transcendent: { ...DEFAULT_CERT_PROGRESS },
          },
        });
      });

      const { result } = renderHook(() => useCertificationDetection());

      let tier: string | null = null;
      act(() => {
        tier = result.current.checkAfterPractice();
      });

      expect(tier).toBe('speed_reader');
    });

    it('returns velocity_master if speed_reader already passed', () => {
      act(() => {
        useJourneyStore.setState({
          velocityScore: 70,
          avgWpmLast5: 1000,
          certProgress: {
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: true, // Already passed
            },
            velocity_master: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: false,
            },
            transcendent: { ...DEFAULT_CERT_PROGRESS },
          },
        });
      });

      const { result } = renderHook(() => useCertificationDetection());

      let tier: string | null = null;
      act(() => {
        tier = result.current.checkAfterPractice();
      });

      expect(tier).toBe('velocity_master');
    });

    it('returns transcendent if lower tiers already passed', () => {
      act(() => {
        useJourneyStore.setState({
          velocityScore: 98,
          avgWpmLast5: 1300,
          certProgress: {
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: true,
            },
            velocity_master: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: true,
            },
            transcendent: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: false,
            },
          },
        });
      });

      const { result } = renderHook(() => useCertificationDetection());

      let tier: string | null = null;
      act(() => {
        tier = result.current.checkAfterPractice();
      });

      expect(tier).toBe('transcendent');
    });

    it('returns null if all passed tiers are already passed', () => {
      act(() => {
        useJourneyStore.setState({
          velocityScore: 98,
          avgWpmLast5: 1300,
          certProgress: {
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: true,
            },
            velocity_master: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: true,
            },
            transcendent: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: true,
            },
          },
        });
      });

      const { result } = renderHook(() => useCertificationDetection());

      let tier: string | null = null;
      act(() => {
        tier = result.current.checkAfterPractice();
      });

      expect(tier).toBeNull();
    });

    it('does not prompt for already prompted tier in same session', () => {
      act(() => {
        useJourneyStore.setState({
          velocityScore: 50,
          avgWpmLast5: 600,
          certProgress: {
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: false,
            },
            velocity_master: { ...DEFAULT_CERT_PROGRESS },
            transcendent: { ...DEFAULT_CERT_PROGRESS },
          },
        });
      });

      const { result } = renderHook(() => useCertificationDetection());

      // First check - should prompt for speed_reader
      let tier1: string | null = null;
      act(() => {
        tier1 = result.current.checkAfterPractice();
      });
      expect(tier1).toBe('speed_reader');

      // Dismiss the modal (adds to prompted set)
      act(() => {
        result.current.dismissReadiness();
      });

      // Second check - should not prompt for speed_reader again
      let tier2: string | null = null;
      act(() => {
        tier2 = result.current.checkAfterPractice();
      });
      expect(tier2).toBeNull();
    });
  });

  // ===========================================================================
  // dismissReadiness
  // ===========================================================================

  describe('dismissReadiness()', () => {
    it('sets showReadinessModal to false', () => {
      act(() => {
        useJourneyStore.setState({
          velocityScore: 50,
          avgWpmLast5: 600,
          certProgress: {
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: false,
            },
            velocity_master: { ...DEFAULT_CERT_PROGRESS },
            transcendent: { ...DEFAULT_CERT_PROGRESS },
          },
        });
      });

      const { result } = renderHook(() => useCertificationDetection());

      // First trigger the modal
      act(() => {
        result.current.checkAfterPractice();
      });
      expect(result.current.state.showReadinessModal).toBe(true);

      // Then dismiss
      act(() => {
        result.current.dismissReadiness();
      });
      expect(result.current.state.showReadinessModal).toBe(false);
    });

    it('adds tier to prompted set when dismissed', () => {
      act(() => {
        useJourneyStore.setState({
          velocityScore: 50,
          avgWpmLast5: 600,
          certProgress: {
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: false,
            },
            velocity_master: { ...DEFAULT_CERT_PROGRESS },
            transcendent: { ...DEFAULT_CERT_PROGRESS },
          },
        });
      });

      const { result } = renderHook(() => useCertificationDetection());

      act(() => {
        result.current.checkAfterPractice();
      });

      act(() => {
        result.current.dismissReadiness();
      });

      // Check that the same tier is not prompted again
      let tier: string | null = null;
      act(() => {
        tier = result.current.checkAfterPractice();
      });
      expect(tier).toBeNull();
    });

    it('handles dismissal when no tier is ready', () => {
      const { result } = renderHook(() => useCertificationDetection());

      // Dismiss with no ready tier should not throw
      expect(() => {
        act(() => {
          result.current.dismissReadiness();
        });
      }).not.toThrow();

      expect(result.current.state.showReadinessModal).toBe(false);
    });
  });

  // ===========================================================================
  // startCertificationTest
  // ===========================================================================

  describe('startCertificationTest()', () => {
    it('sets showReadinessModal to false', () => {
      act(() => {
        useJourneyStore.setState({
          velocityScore: 50,
          avgWpmLast5: 600,
          certProgress: {
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: false,
            },
            velocity_master: { ...DEFAULT_CERT_PROGRESS },
            transcendent: { ...DEFAULT_CERT_PROGRESS },
          },
        });
      });

      const { result } = renderHook(() => useCertificationDetection());

      // First trigger the modal
      act(() => {
        result.current.checkAfterPractice();
      });
      expect(result.current.state.showReadinessModal).toBe(true);

      // Then start test
      act(() => {
        result.current.startCertificationTest();
      });
      expect(result.current.state.showReadinessModal).toBe(false);
    });

    it('adds tier to prompted set when starting test', () => {
      act(() => {
        useJourneyStore.setState({
          velocityScore: 50,
          avgWpmLast5: 600,
          certProgress: {
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: false,
            },
            velocity_master: { ...DEFAULT_CERT_PROGRESS },
            transcendent: { ...DEFAULT_CERT_PROGRESS },
          },
        });
      });

      const { result } = renderHook(() => useCertificationDetection());

      act(() => {
        result.current.checkAfterPractice();
      });

      act(() => {
        result.current.startCertificationTest();
      });

      // Check that the same tier is not prompted again
      let tier: string | null = null;
      act(() => {
        tier = result.current.checkAfterPractice();
      });
      expect(tier).toBeNull();
    });

    it('handles starting test when no tier is ready', () => {
      const { result } = renderHook(() => useCertificationDetection());

      // Start test with no ready tier should not throw
      expect(() => {
        act(() => {
          result.current.startCertificationTest();
        });
      }).not.toThrow();

      expect(result.current.state.showReadinessModal).toBe(false);
    });
  });

  // ===========================================================================
  // Integration: Full Workflow
  // ===========================================================================

  describe('full workflow', () => {
    it('handles complete certification detection flow', () => {
      act(() => {
        useJourneyStore.setState({
          velocityScore: 50,
          avgWpmLast5: 600,
          certProgress: {
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: false,
            },
            velocity_master: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: false,
            },
            transcendent: { ...DEFAULT_CERT_PROGRESS },
          },
        });
      });

      const { result } = renderHook(() => useCertificationDetection());

      // Step 1: Check after practice - should prompt speed_reader first
      let tier: string | null = null;
      act(() => {
        tier = result.current.checkAfterPractice();
      });
      expect(tier).toBe('speed_reader');
      expect(result.current.state.showReadinessModal).toBe(true);
      expect(result.current.state.readyTier).toBe('speed_reader');

      // Step 2: User dismisses modal
      act(() => {
        result.current.dismissReadiness();
      });
      expect(result.current.state.showReadinessModal).toBe(false);

      // Step 3: Check again - should prompt velocity_master now
      act(() => {
        tier = result.current.checkAfterPractice();
      });
      expect(tier).toBe('velocity_master');
      expect(result.current.state.showReadinessModal).toBe(true);
      expect(result.current.state.readyTier).toBe('velocity_master');

      // Step 4: User starts the test
      act(() => {
        result.current.startCertificationTest();
      });
      expect(result.current.state.showReadinessModal).toBe(false);

      // Step 5: Check again - no more prompts
      act(() => {
        tier = result.current.checkAfterPractice();
      });
      expect(tier).toBeNull();
    });
  });

  // ===========================================================================
  // Edge Cases
  // ===========================================================================

  describe('edge cases', () => {
    it('handles undefined certProgress gracefully', () => {
      act(() => {
        useJourneyStore.setState({
          velocityScore: 50,
          avgWpmLast5: 600,
          certProgress: {
            speed_reader: undefined as any, // Edge case
            velocity_master: { ...DEFAULT_CERT_PROGRESS },
            transcendent: { ...DEFAULT_CERT_PROGRESS },
          },
        });
      });

      const { result } = renderHook(() => useCertificationDetection());

      // Should not throw
      let tier: string | null = null;
      act(() => {
        tier = result.current.checkAfterPractice();
      });

      // Should skip undefined tier and check next
      expect(tier).toBeNull();
    });

    it('rounds avgWpmLast5 when setting currentWPM', () => {
      act(() => {
        useJourneyStore.setState({
          velocityScore: 50,
          avgWpmLast5: 612.7,
          certProgress: {
            speed_reader: {
              ...DEFAULT_CERT_PROGRESS,
              examUnlocked: true,
              examPassed: false,
            },
            velocity_master: { ...DEFAULT_CERT_PROGRESS },
            transcendent: { ...DEFAULT_CERT_PROGRESS },
          },
        });
      });

      const { result } = renderHook(() => useCertificationDetection());

      act(() => {
        result.current.checkAfterPractice();
      });

      expect(result.current.state.currentWPM).toBe(613);
    });
  });
});
