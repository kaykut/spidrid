/**
 * Integration Tests for Profile Screen.
 *
 * Tests stats display, certificates, and user settings.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ProfileScreen from '../../src/app/(tabs)/profile';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    navigate: jest.fn(),
  },
}));

// Mock stores
jest.mock('../../src/store/learningStore', () => ({
  useLearningStore: () => ({
    getTotalArticlesCompleted: () => 8,
    getHighestWPM: () => 450,
  }),
}));

jest.mock('../../src/store/contentStore', () => ({
  useContentStore: () => ({
    importedContent: [
      { id: '1', readProgress: 1 },
      { id: '2', readProgress: 0.5 },
    ],
  }),
}));

// Mock journeyStore (used by profile screen for certification progress)
jest.mock('../../src/store/journeyStore', () => ({
  useJourneyStore: () => ({
    certProgress: {
      speed_reader: { examPassed: false },
      velocity_master: { examPassed: false },
      transcendent: { examPassed: false },
    },
  }),
}));

const mockSetUserName = jest.fn();
const mockSetReadingLanguage = jest.fn();

jest.mock('../../src/store/settingsStore', () => ({
  useSettingsStore: () => ({
    userName: 'Test User',
    readingLanguage: 'en',
    setUserName: mockSetUserName,
    setReadingLanguage: mockSetReadingLanguage,
  }),
}));

jest.mock('../../src/store/subscriptionStore', () => ({
  useSubscriptionStore: () => ({
    isPremium: false,
    setPremium: jest.fn(),
    contentAccessCount: 1,
    resetContentCount: jest.fn(),
    getMaxWPM: () => 450,
  }),
}));

jest.mock('../../src/store/onboardingStore', () => ({
  useOnboardingStore: () => ({
    selectedInterests: ['science', 'technology'],
  }),
}));

// Mock EdgeFadeScrollView
jest.mock('../../src/components/common/EdgeFadeScrollView', () => ({
  EdgeFadeScrollView: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock Paywall
jest.mock('../../src/components/paywall/Paywall', () => ({
  Paywall: () => null,
}));

// Mock CertificateViewerModal
jest.mock('../../src/components/certificates/CertificateViewerModal', () => ({
  CertificateViewerModal: () => null,
}));

// Mock certifications components
jest.mock('../../src/components/certifications', () => ({
  MilestoneBadge: ({ tier }: { tier: string }) => {
    const { View, Text } = require('react-native');
    return (
      <View>
        <Text>Badge: {tier}</Text>
      </View>
    );
  },
}));

// Mock CertificateCard
jest.mock('../../src/components/certificates/CertificateCard', () => ({
  CertificateCard: ({ certificate, onPress }: { certificate: { type: string }; onPress?: () => void }) => {
    const { TouchableOpacity, Text } = require('react-native');
    return (
      <TouchableOpacity onPress={onPress}>
        <Text>Certificate: {certificate.type}</Text>
      </TouchableOpacity>
    );
  },
  LockedCertificateCard: ({ type }: { type: string }) => {
    const { View, Text } = require('react-native');
    return (
      <View>
        <Text>Locked: {type}</Text>
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
  });

  describe('initial rendering', () => {
    it('renders the screen title', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Profile')).toBeTruthy();
    });

    it('displays total completed count', () => {
      renderWithProviders(<ProfileScreen />);

      // 8 articles + 1 fully read content = 9
      expect(screen.getByText('9')).toBeTruthy();
      expect(screen.getByText('Completed')).toBeTruthy();
    });

    it('displays highest WPM', () => {
      renderWithProviders(<ProfileScreen />);

      // Multiple 450 values exist (stats + subscription)
      expect(screen.getAllByText('450').length).toBeGreaterThan(0);
      expect(screen.getByText('Best WPM')).toBeTruthy();
    });
  });

  describe('certification journey section', () => {
    it('shows Certificates stat in stats card', () => {
      renderWithProviders(<ProfileScreen />);

      // "Certificates" appears in the stats card
      expect(screen.getByText('Certificates')).toBeTruthy();
    });

    it('shows Certification Journey section', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Certification Journey')).toBeTruthy();
    });

    it('displays certification milestone badges', () => {
      renderWithProviders(<ProfileScreen />);

      // The MilestoneBadge mock renders "Badge: {tier}"
      expect(screen.getByText(/Badge:.*speed_reader/)).toBeTruthy();
      expect(screen.getByText(/Badge:.*velocity_master/)).toBeTruthy();
      expect(screen.getByText(/Badge:.*transcendent/)).toBeTruthy();
    });

    it('shows View All link for certification journey', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('View All')).toBeTruthy();
    });
  });

  describe('user info section', () => {
    it('shows Your Info section title', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Your Info')).toBeTruthy();
    });

    it('displays user name', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByDisplayValue('Test User')).toBeTruthy();
    });

    it('allows changing user name', () => {
      renderWithProviders(<ProfileScreen />);

      const nameInput = screen.getByDisplayValue('Test User');
      fireEvent.changeText(nameInput, 'New Name');

      expect(mockSetUserName).toHaveBeenCalledWith('New Name');
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
    it('shows subscription status', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Subscription')).toBeTruthy();
    });

    it('shows max WPM info', () => {
      renderWithProviders(<ProfileScreen />);

      expect(screen.getByText('Max WPM')).toBeTruthy();
      // 450 appears multiple times (stats + subscription)
      expect(screen.getAllByText('450').length).toBeGreaterThan(0);
    });
  });
});
