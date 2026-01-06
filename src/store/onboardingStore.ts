import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UsageMode = 'train' | 'import-only';

interface OnboardingState {
  hasCompletedOnboarding: boolean;
  usageMode: UsageMode | null;
  selectedInterests: string[];

  setUsageMode: (mode: UsageMode) => void;
  setSelectedInterests: (interests: string[]) => void;
  toggleInterest: (interestId: string) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      hasCompletedOnboarding: false,
      usageMode: null,
      selectedInterests: [],

      setUsageMode: (usageMode) => set({ usageMode }),

      setSelectedInterests: (selectedInterests) => set({ selectedInterests }),

      toggleInterest: (interestId) => {
        const current = get().selectedInterests;
        const isSelected = current.includes(interestId);
        set({
          selectedInterests: isSelected
            ? current.filter((id) => id !== interestId)
            : [...current, interestId],
        });
      },

      completeOnboarding: () => set({ hasCompletedOnboarding: true }),

      resetOnboarding: () =>
        set({
          hasCompletedOnboarding: false,
          usageMode: null,
          selectedInterests: [],
        }),
    }),
    {
      name: 'spidrid-onboarding',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
