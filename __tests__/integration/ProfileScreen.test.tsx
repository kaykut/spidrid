/**
 * Integration Tests for Profile Screen.
 *
 * Tests stats display, certificates, and user settings.
 * Uses real Zustand stores instead of mocks for proper integration testing.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ProfileScreen from '../../src/app/(tabs)/profile';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';
import { useLearningStore } from '../../src/store/learningStore';
import { useContentStore } from '../../src/store/contentStore';
import { useJourneyStore } from '../../src/store/journeyStore';
import { useSettingsStore } from '../../src/store/settingsStore';
import { useSubscriptionStore } from '../../src/store/subscriptionStore';

// Mock expo-router (external dependency)
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    navigate: jest.fn(),
  },
}));

// Mock react-native-safe-area-context (external dependency)
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mock expo-linear-gradient (external dependency with native module)
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock Paywall (complex component with network calls in production)
jest.mock('../../src/components/paywall/Paywall', () => ({
  Paywall: ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
    if (!visible) {return null;}
    const { View, Text, TouchableOpacity } = require('react-native');
    return (
      <View testID="paywall-modal">
        <Text>Upgrade to Premium</Text>
        <TouchableOpacity onPress={onClose} testID="paywall-close">
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    );
  },
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('ProfileScreen Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset learning store with article progress
    useLearningStore.setState({
      articleProgress: {
        'article-1': {
          articleId: 'article-1',
          completed: true,
          comprehensionScore: 85,
          highestWPM: 450,
          lastReadAt: Date.now(),
          attemptCount: 1,
        },
        'article-2': {
          articleId: 'article-2',
          completed: true,
          comprehensionScore: 90,
          highestWPM: 400,
          lastReadAt: Date.now(),
          attemptCount: 1,
        },
        // 6 more completed articles to get to 8 total
        'article-3': { articleId: 'article-3', completed: true, comprehensionScore: 80, highestWPM: 350, lastReadAt: Date.now(), attemptCount: 1 },
        'article-4': { articleId: 'article-4', completed: true, comprehensionScore: 85, highestWPM: 360, lastReadAt: Date.now(), attemptCount: 1 },
        'article-5': { articleId: 'article-5', completed: true, comprehensionScore: 75, highestWPM: 320, lastReadAt: Date.now(), attemptCount: 1 },
        'article-6': { articleId: 'article-6', completed: true, comprehensionScore: 88, highestWPM: 380, lastReadAt: Date.now(), attemptCount: 1 },
        'article-7': { articleId: 'article-7', completed: true, comprehensionScore: 82, highestWPM: 340, lastReadAt: Date.now(), attemptCount: 1 },
        'article-8': { articleId: 'article-8', completed: true, comprehensionScore: 87, highestWPM: 370, lastReadAt: Date.now(), attemptCount: 1 },
      },
      currentArticleId: null,
      currentWPM: 250,
      recentCompletions: [],
    });

    // Reset content store with one fully read content
    useContentStore.setState({
      importedContent: [
        { id: '1', title: 'Test', content: 'test', wordCount: 100, readProgress: 1, source: 'text', sourceUrl: '', createdAt: Date.now() },
        { id: '2', title: 'Test2', content: 'test2', wordCount: 200, readProgress: 0.5, source: 'url', sourceUrl: 'http://test.com', createdAt: Date.now() },
      ],
      currentContentId: null,
    });

    // Reset journey store with no certifications earned
    useJourneyStore.setState({
      velocityScore: 0,
      level: 'novice',
      sessions: [],
      certProgress: {
        speed_reader: { vsUnlocked: false, speedProofAchieved: false, examUnlocked: false, examPassed: false },
        velocity_master: { vsUnlocked: false, speedProofAchieved: false, examUnlocked: false, examPassed: false },
        transcendent: { vsUnlocked: false, speedProofAchieved: false, examUnlocked: false, examPassed: false },
      },
      speedProofs: [],
    });

    // Reset settings store
    useSettingsStore.setState({
      userName: 'Test User',
      readingLanguage: 'en',
    });

    // Reset subscription store to free tier
    useSubscriptionStore.setState({
      isPremium: false,
      isLoading: false,
      isInitialized: true,
      contentAccessCount: 1,
    });
  });

  describe('initial rendering', () => {
    it('renders the screen title', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Profile')).toBeTruthy();
    });

    it('displays total completed count from real stores', () => {
      renderWithProviders(<ProfileScreen />);

      // 8 articles + 1 fully read content = 9
      expect(screen.getByText('9')).toBeTruthy();
      expect(screen.getByText('Completed')).toBeTruthy();
    });

    it('displays highest WPM from real learning store', () => {
      renderWithProviders(<ProfileScreen />);

      // Highest WPM from article progress is 450
      expect(screen.getAllByText('450').length).toBeGreaterThan(0);
      expect(screen.getByText('Best WPM')).toBeTruthy();
    });

    it('displays certificates count from real journey store', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('0')).toBeTruthy(); // No certs earned
      expect(screen.getByText('Certificates')).toBeTruthy();
    });
  });

  describe('certification journey section', () => {
    it('shows Certification Journey section', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Certification Journey')).toBeTruthy();
    });

    it('shows View All link for certification journey', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('View All')).toBeTruthy();
    });

    it('shows journey status text for no certifications', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Start earning certification tiers!')).toBeTruthy();
    });

    it('shows earned status when certification is earned', () => {
      useJourneyStore.setState({
        certProgress: {
          speed_reader: { vsUnlocked: true, speedProofAchieved: true, examUnlocked: true, examPassed: true },
          velocity_master: { vsUnlocked: false, speedProofAchieved: false, examUnlocked: false, examPassed: false },
          transcendent: { vsUnlocked: false, speedProofAchieved: false, examUnlocked: false, examPassed: false },
        },
      });

      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('1/3 tiers earned')).toBeTruthy();
    });
  });

  describe('user info section', () => {
    it('shows Your Info section title', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Your Info')).toBeTruthy();
    });

    it('displays user name from real settings store', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByDisplayValue('Test User')).toBeTruthy();
    });

    it('allows changing user name and updates real store', () => {
      renderWithProviders(<ProfileScreen />);

      const nameInput = screen.getByDisplayValue('Test User');
      fireEvent.changeText(nameInput, 'New Name');

      // Verify the real store was updated
      expect(useSettingsStore.getState().userName).toBe('New Name');
    });

    it('shows language selector', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Reading Language')).toBeTruthy();
      expect(screen.getByText('English')).toBeTruthy();
    });
  });

  describe('theme section', () => {
    it('shows Theme section title', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Theme')).toBeTruthy();
    });

    it('displays available themes', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Dark')).toBeTruthy();
    });
  });

  describe('subscription section', () => {
    it('shows subscription status from real store', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Subscription')).toBeTruthy();
      expect(screen.getByText('Free')).toBeTruthy();
    });

    it('shows max WPM from real subscription store', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Max WPM')).toBeTruthy();
      // Free tier max WPM is 450
      expect(screen.getAllByText('450').length).toBeGreaterThan(0);
    });

    it('shows articles used count from real store', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Articles used')).toBeTruthy();
      expect(screen.getByText('1 / 5')).toBeTruthy();
    });

    it('shows Premium status when premium user', () => {
      useSubscriptionStore.setState({
        isPremium: true,
        isLoading: false,
        isInitialized: true,
        contentAccessCount: 0,
      });

      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Premium')).toBeTruthy();
    });

    it('shows upgrade button for free users', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Upgrade to Premium')).toBeTruthy();
    });

    it('opens paywall when upgrade button is pressed', () => {
      renderWithProviders(<ProfileScreen />);

      const upgradeButton = screen.getByText('Upgrade to Premium');
      fireEvent.press(upgradeButton);

      expect(screen.getByTestId('paywall-modal')).toBeTruthy();
    });
  });

  describe('premium user experience', () => {
    beforeEach(() => {
      useSubscriptionStore.setState({
        isPremium: true,
        isLoading: false,
        isInitialized: true,
        contentAccessCount: 0,
      });
    });

    it('shows higher max WPM for premium users', () => {
      renderWithProviders(<ProfileScreen />);

      // Premium max WPM is 1500
      expect(screen.getByText('1500')).toBeTruthy();
    });

    it('shows reset to free button for premium users', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Reset to Free (Dev)')).toBeTruthy();
    });

    it('resets subscription when reset button is pressed', () => {
      renderWithProviders(<ProfileScreen />);

      const resetButton = screen.getByText('Reset to Free (Dev)');
      fireEvent.press(resetButton);

      // Verify the real store was updated
      expect(useSubscriptionStore.getState().isPremium).toBe(false);
    });
  });

  describe('tips section', () => {
    it('displays speed reading tips', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Speed Reading Tips')).toBeTruthy();
      expect(screen.getByText(/Focus on the red ORP letter/)).toBeTruthy();
    });
  });
});
