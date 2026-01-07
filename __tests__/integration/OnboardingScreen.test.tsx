/**
 * Integration Tests for Onboarding Screens.
 *
 * Tests the purpose selection and topics selection onboarding flow.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import PurposeScreen from '../../src/app/onboarding/purpose';
import TopicsScreen from '../../src/app/onboarding/topics';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// Mock expo-router
const mockPush = jest.fn();
const mockReplace = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    push: (path: string) => mockPush(path),
    replace: (path: string) => mockReplace(path),
  },
}));

// Mock safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock onboarding store
const mockSetUsageMode = jest.fn();
const mockToggleInterest = jest.fn();
const mockCompleteOnboarding = jest.fn();

jest.mock('../../src/store/onboardingStore', () => ({
  useOnboardingStore: () => ({
    setUsageMode: mockSetUsageMode,
    toggleInterest: mockToggleInterest,
    completeOnboarding: mockCompleteOnboarding,
    selectedInterests: ['science', 'technology'],
    usageMode: 'train',
  }),
}));

// Mock EdgeFadeScrollView
jest.mock('../../src/components/common/EdgeFadeScrollView', () => ({
  EdgeFadeScrollView: ({ children }: { children: React.ReactNode }) => children,
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('PurposeScreen Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

      expect(mockSetUsageMode).toHaveBeenCalledWith('train');
      expect(mockPush).toHaveBeenCalledWith('/onboarding/topics');
    });

    it('sets import-only mode and navigates to topics when import option is pressed', () => {
      renderWithProviders(<PurposeScreen />);

      const importOption = screen.getByText('Import my own content');
      fireEvent.press(importOption);

      expect(mockSetUsageMode).toHaveBeenCalledWith('import-only');
      expect(mockPush).toHaveBeenCalledWith('/onboarding/topics');
    });
  });
});

describe('TopicsScreen Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

      // Check for some topic names from TOPICS
      expect(screen.getByText('Science & Discovery')).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('toggles interest when topic pill is pressed', () => {
      renderWithProviders(<TopicsScreen />);

      const scienceTopic = screen.getByText('Science & Discovery');
      fireEvent.press(scienceTopic);

      expect(mockToggleInterest).toHaveBeenCalledWith('science');
    });

    it('completes onboarding and navigates to tabs when continue is pressed', () => {
      renderWithProviders(<TopicsScreen />);

      const continueButton = screen.getByText('Continue');
      fireEvent.press(continueButton);

      expect(mockCompleteOnboarding).toHaveBeenCalled();
      expect(mockReplace).toHaveBeenCalledWith('/(tabs)/learn');
    });
  });
});
