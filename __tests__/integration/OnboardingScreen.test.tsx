/**
 * Integration Tests for Onboarding Screens.
 *
 * Tests the purpose selection and topics selection onboarding flow.
 * Uses real Zustand stores instead of mocks for proper integration testing.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import PurposeScreen from '../../src/app/onboarding/purpose';
import TopicsScreen from '../../src/app/onboarding/topics';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';
import { useOnboardingStore } from '../../src/store/onboardingStore';

// Mock expo-router (external dependency)
const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockBack = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    push: (path: string) => mockPush(path),
    replace: (path: string) => mockReplace(path),
    back: () => mockBack(),
  },
}));

// Mock safe-area-context (external dependency)
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('PurposeScreen Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset store to initial state before each test
    useOnboardingStore.setState({
      hasCompletedOnboarding: false,
      usageMode: null,
      selectedInterests: [],
    });
  });

  describe('initial rendering', () => {
    it('renders the question title', () => {
      renderWithProviders(<PurposeScreen />);

      expect(screen.getByText('How do you want to use Spidrid?')).toBeTruthy();
    });

    it('renders train with content option', () => {
      renderWithProviders(<PurposeScreen />);

      expect(screen.getByText('Train with our content')).toBeTruthy();
      expect(screen.getByText(/Practice speed reading with curated articles/)).toBeTruthy();
    });

    it('renders import only option', () => {
      renderWithProviders(<PurposeScreen />);

      expect(screen.getByText('Import my own content')).toBeTruthy();
      expect(screen.getByText(/Paste or import text you want to read faster/)).toBeTruthy();
    });

    it('renders emoji icons', () => {
      renderWithProviders(<PurposeScreen />);

      expect(screen.getByText('📚')).toBeTruthy();
      expect(screen.getByText('📥')).toBeTruthy();
    });
  });

  describe('navigation', () => {
    it('sets train mode and navigates to topics when train option is pressed', () => {
      renderWithProviders(<PurposeScreen />);

      const trainOption = screen.getByText('Train with our content');
      fireEvent.press(trainOption);

      // Verify the real store was updated
      expect(useOnboardingStore.getState().usageMode).toBe('train');
      expect(mockPush).toHaveBeenCalledWith('/onboarding/topics');
    });

    it('sets import-only mode and navigates to topics when import option is pressed', () => {
      renderWithProviders(<PurposeScreen />);

      const importOption = screen.getByText('Import my own content');
      fireEvent.press(importOption);

      // Verify the real store was updated
      expect(useOnboardingStore.getState().usageMode).toBe('import-only');
      expect(mockPush).toHaveBeenCalledWith('/onboarding/topics');
    });
  });
});

describe('TopicsScreen Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset store to initial state with some interests selected
    useOnboardingStore.setState({
      hasCompletedOnboarding: false,
      usageMode: 'train',
      selectedInterests: ['science', 'tech'],
    });
  });

  describe('initial rendering', () => {
    it('renders the title', () => {
      renderWithProviders(<TopicsScreen />);

      expect(screen.getByText('What interests you?')).toBeTruthy();
    });

    it('renders the subtitle', () => {
      renderWithProviders(<TopicsScreen />);

      expect(screen.getByText(/Select topics to personalize/)).toBeTruthy();
    });

    it('renders continue button', () => {
      renderWithProviders(<TopicsScreen />);

      expect(screen.getByText('Continue')).toBeTruthy();
    });

    it('renders topic pills', () => {
      renderWithProviders(<TopicsScreen />);

      // Check for some topic names from INTERESTS
      expect(screen.getByText('Science & Discovery')).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('toggles interest when topic pill is pressed', () => {
      // Start with science already selected
      useOnboardingStore.setState({
        hasCompletedOnboarding: false,
        usageMode: 'train',
        selectedInterests: ['science'],
      });

      renderWithProviders(<TopicsScreen />);

      // Press Science to toggle it off
      const scienceTopic = screen.getByText('Science & Discovery');
      fireEvent.press(scienceTopic);

      // Verify the real store was updated (science should be removed)
      expect(useOnboardingStore.getState().selectedInterests).not.toContain('science');
    });

    it('adds interest when unselected topic pill is pressed', () => {
      // Start with no interests selected
      useOnboardingStore.setState({
        hasCompletedOnboarding: false,
        usageMode: 'train',
        selectedInterests: [],
      });

      renderWithProviders(<TopicsScreen />);

      // Press Science to select it
      const scienceTopic = screen.getByText('Science & Discovery');
      fireEvent.press(scienceTopic);

      // Verify the real store was updated (science should be added)
      expect(useOnboardingStore.getState().selectedInterests).toContain('science');
    });

    it('completes onboarding and navigates to learn tab when continue is pressed with train mode', () => {
      useOnboardingStore.setState({
        hasCompletedOnboarding: false,
        usageMode: 'train',
        selectedInterests: ['science'],
      });

      renderWithProviders(<TopicsScreen />);

      const continueButton = screen.getByText('Continue');
      fireEvent.press(continueButton);

      // Verify the real store was updated
      expect(useOnboardingStore.getState().hasCompletedOnboarding).toBe(true);
      expect(mockReplace).toHaveBeenCalledWith('/(tabs)/learn');
    });

    it('completes onboarding and navigates to read tab when continue is pressed with import-only mode', () => {
      useOnboardingStore.setState({
        hasCompletedOnboarding: false,
        usageMode: 'import-only',
        selectedInterests: ['science'],
      });

      renderWithProviders(<TopicsScreen />);

      const continueButton = screen.getByText('Continue');
      fireEvent.press(continueButton);

      // Verify the real store was updated
      expect(useOnboardingStore.getState().hasCompletedOnboarding).toBe(true);
      expect(mockReplace).toHaveBeenCalledWith('/(tabs)/read');
    });
  });

  describe('updating interests after onboarding', () => {
    it('shows Save button when updating interests after onboarding', () => {
      useOnboardingStore.setState({
        hasCompletedOnboarding: true,
        usageMode: 'train',
        selectedInterests: ['science'],
      });

      renderWithProviders(<TopicsScreen />);

      expect(screen.getByText('Save')).toBeTruthy();
    });

    it('navigates back when Save is pressed during update', () => {
      useOnboardingStore.setState({
        hasCompletedOnboarding: true,
        usageMode: 'train',
        selectedInterests: ['science'],
      });

      renderWithProviders(<TopicsScreen />);

      const saveButton = screen.getByText('Save');
      fireEvent.press(saveButton);

      expect(mockBack).toHaveBeenCalled();
    });
  });
});
