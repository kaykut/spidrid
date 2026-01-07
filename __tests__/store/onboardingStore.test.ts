/**
 * Tests for Onboarding Store.
 *
 * Manages onboarding state including usage mode and interest selections.
 */

import { renderHook, act } from '@testing-library/react-native';
import { useOnboardingStore } from '../../src/store/onboardingStore';

describe('onboardingStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useOnboardingStore());
    act(() => {
      result.current.resetOnboarding();
    });
  });

  describe('initial state', () => {
    it('starts with hasCompletedOnboarding as false', () => {
      const { result } = renderHook(() => useOnboardingStore());
      expect(result.current.hasCompletedOnboarding).toBe(false);
    });

    it('starts with usageMode as null', () => {
      const { result } = renderHook(() => useOnboardingStore());
      expect(result.current.usageMode).toBeNull();
    });

    it('starts with empty selectedInterests array', () => {
      const { result } = renderHook(() => useOnboardingStore());
      expect(result.current.selectedInterests).toEqual([]);
    });
  });

  describe('setUsageMode()', () => {
    it('sets usageMode to train', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.setUsageMode('train');
      });

      expect(result.current.usageMode).toBe('train');
    });

    it('sets usageMode to import-only', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.setUsageMode('import-only');
      });

      expect(result.current.usageMode).toBe('import-only');
    });

    it('can change usageMode', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.setUsageMode('train');
      });

      expect(result.current.usageMode).toBe('train');

      act(() => {
        result.current.setUsageMode('import-only');
      });

      expect(result.current.usageMode).toBe('import-only');
    });
  });

  describe('setSelectedInterests()', () => {
    it('sets selectedInterests array', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.setSelectedInterests(['science', 'technology']);
      });

      expect(result.current.selectedInterests).toEqual(['science', 'technology']);
    });

    it('replaces previous selections', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.setSelectedInterests(['science']);
      });

      act(() => {
        result.current.setSelectedInterests(['art', 'music']);
      });

      expect(result.current.selectedInterests).toEqual(['art', 'music']);
    });

    it('can set empty array', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.setSelectedInterests(['science', 'technology']);
      });

      act(() => {
        result.current.setSelectedInterests([]);
      });

      expect(result.current.selectedInterests).toEqual([]);
    });

    it('handles single interest', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.setSelectedInterests(['science']);
      });

      expect(result.current.selectedInterests).toEqual(['science']);
    });

    it('handles many interests', () => {
      const { result } = renderHook(() => useOnboardingStore());
      const manyInterests = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

      act(() => {
        result.current.setSelectedInterests(manyInterests);
      });

      expect(result.current.selectedInterests).toEqual(manyInterests);
    });
  });

  describe('toggleInterest()', () => {
    it('adds interest if not present', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.toggleInterest('science');
      });

      expect(result.current.selectedInterests).toContain('science');
    });

    it('removes interest if already present', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.setSelectedInterests(['science', 'technology']);
      });

      act(() => {
        result.current.toggleInterest('science');
      });

      expect(result.current.selectedInterests).not.toContain('science');
      expect(result.current.selectedInterests).toContain('technology');
    });

    it('can toggle same interest on and off', () => {
      const { result } = renderHook(() => useOnboardingStore());

      // Toggle on
      act(() => {
        result.current.toggleInterest('science');
      });

      expect(result.current.selectedInterests).toContain('science');

      // Toggle off
      act(() => {
        result.current.toggleInterest('science');
      });

      expect(result.current.selectedInterests).not.toContain('science');

      // Toggle on again
      act(() => {
        result.current.toggleInterest('science');
      });

      expect(result.current.selectedInterests).toContain('science');
    });

    it('preserves other interests when toggling', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.setSelectedInterests(['science', 'technology', 'art']);
      });

      act(() => {
        result.current.toggleInterest('technology');
      });

      expect(result.current.selectedInterests).toEqual(['science', 'art']);
    });

    it('can add multiple interests via toggle', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.toggleInterest('science');
      });

      act(() => {
        result.current.toggleInterest('technology');
      });

      act(() => {
        result.current.toggleInterest('art');
      });

      expect(result.current.selectedInterests).toEqual(['science', 'technology', 'art']);
    });
  });

  describe('completeOnboarding()', () => {
    it('sets hasCompletedOnboarding to true', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.completeOnboarding();
      });

      expect(result.current.hasCompletedOnboarding).toBe(true);
    });

    it('preserves usageMode', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.setUsageMode('train');
      });

      act(() => {
        result.current.completeOnboarding();
      });

      expect(result.current.usageMode).toBe('train');
    });

    it('preserves selectedInterests', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.setSelectedInterests(['science', 'technology']);
      });

      act(() => {
        result.current.completeOnboarding();
      });

      expect(result.current.selectedInterests).toEqual(['science', 'technology']);
    });

    it('is idempotent', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.completeOnboarding();
      });

      act(() => {
        result.current.completeOnboarding();
      });

      expect(result.current.hasCompletedOnboarding).toBe(true);
    });
  });

  describe('resetOnboarding()', () => {
    it('resets hasCompletedOnboarding to false', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.completeOnboarding();
      });

      expect(result.current.hasCompletedOnboarding).toBe(true);

      act(() => {
        result.current.resetOnboarding();
      });

      expect(result.current.hasCompletedOnboarding).toBe(false);
    });

    it('resets usageMode to null', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.setUsageMode('train');
      });

      act(() => {
        result.current.resetOnboarding();
      });

      expect(result.current.usageMode).toBeNull();
    });

    it('resets selectedInterests to empty array', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.setSelectedInterests(['science', 'technology']);
      });

      act(() => {
        result.current.resetOnboarding();
      });

      expect(result.current.selectedInterests).toEqual([]);
    });

    it('resets all state together', () => {
      const { result } = renderHook(() => useOnboardingStore());

      // Set up state
      act(() => {
        result.current.setUsageMode('train');
        result.current.setSelectedInterests(['science', 'technology']);
        result.current.completeOnboarding();
      });

      // Verify state is set
      expect(result.current.hasCompletedOnboarding).toBe(true);
      expect(result.current.usageMode).toBe('train');
      expect(result.current.selectedInterests).toHaveLength(2);

      // Reset
      act(() => {
        result.current.resetOnboarding();
      });

      // Verify all reset
      expect(result.current.hasCompletedOnboarding).toBe(false);
      expect(result.current.usageMode).toBeNull();
      expect(result.current.selectedInterests).toEqual([]);
    });
  });

  describe('typical onboarding flow', () => {
    it('supports complete onboarding flow for train mode', () => {
      const { result } = renderHook(() => useOnboardingStore());

      // Step 1: Select usage mode
      act(() => {
        result.current.setUsageMode('train');
      });

      // Step 2: Select interests
      act(() => {
        result.current.toggleInterest('science');
        result.current.toggleInterest('technology');
      });

      // Step 3: Complete onboarding
      act(() => {
        result.current.completeOnboarding();
      });

      expect(result.current.usageMode).toBe('train');
      expect(result.current.selectedInterests).toEqual(['science', 'technology']);
      expect(result.current.hasCompletedOnboarding).toBe(true);
    });

    it('supports complete onboarding flow for import-only mode', () => {
      const { result } = renderHook(() => useOnboardingStore());

      // Step 1: Select usage mode
      act(() => {
        result.current.setUsageMode('import-only');
      });

      // Step 2: Complete onboarding (no interests needed for import-only)
      act(() => {
        result.current.completeOnboarding();
      });

      expect(result.current.usageMode).toBe('import-only');
      expect(result.current.selectedInterests).toEqual([]);
      expect(result.current.hasCompletedOnboarding).toBe(true);
    });

    it('can be re-done after reset', () => {
      const { result } = renderHook(() => useOnboardingStore());

      // First onboarding
      act(() => {
        result.current.setUsageMode('train');
        result.current.toggleInterest('science');
        result.current.completeOnboarding();
      });

      // Reset
      act(() => {
        result.current.resetOnboarding();
      });

      // Second onboarding with different choices
      act(() => {
        result.current.setUsageMode('import-only');
        result.current.completeOnboarding();
      });

      expect(result.current.usageMode).toBe('import-only');
      expect(result.current.selectedInterests).toEqual([]);
      expect(result.current.hasCompletedOnboarding).toBe(true);
    });
  });
});
