/**
 * Tests for JourneyPath component - Milestone 8
 *
 * Tests the visual journey path showing 3 tiers as waypoints.
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { JourneyPath } from '../../../src/components/certifications';
import { CertificationProgress, CertificationTierProgress } from '../../../src/types/certificates';

// Mock ThemeProvider
jest.mock('../../../src/components/common/ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      backgroundColor: '#1a1a1a',
      textColor: '#ffffff',
      secondaryBackground: '#2a2a2a',
      accentColor: '#4dabf7',
      crosshairColor: '#333333',
    },
  }),
}));

describe('JourneyPath', () => {
  const lockedTierProgress: CertificationTierProgress = {
    speedProgress: 0,
    accuracyProgress: 0,
    textsProgress: 0,
    overallProgress: 0,
    isUnlocked: false,
    isReady: false,
    isEarned: false,
  };

  const unlockedTierProgress: CertificationTierProgress = {
    speedProgress: 0.5,
    accuracyProgress: 0.6,
    textsProgress: 0.3,
    overallProgress: 0.3,
    isUnlocked: true,
    isReady: false,
    isEarned: false,
  };

  const earnedTierProgress: CertificationTierProgress = {
    speedProgress: 1,
    accuracyProgress: 1,
    textsProgress: 1,
    overallProgress: 1,
    isUnlocked: true,
    isReady: true,
    isEarned: true,
    earnedAt: Date.now(),
  };

  const emptyProgress: CertificationProgress = {
    highestCertificationWPM: 0,
    averageCertificationAccuracy: 0,
    shortTextsPassed: 0,
    mediumTextsPassed: 0,
    longTextsPassed: 0,
    earnedTiers: [],
    tierProgress: {
      quick_reader: { ...unlockedTierProgress }, // First tier always unlocked
      speed_reader: { ...lockedTierProgress },
      lightning_reader: { ...lockedTierProgress },
    },
  };

  const partialProgress: CertificationProgress = {
    highestCertificationWPM: 650,
    averageCertificationAccuracy: 82,
    shortTextsPassed: 2,
    mediumTextsPassed: 1,
    longTextsPassed: 0,
    earnedTiers: ['quick_reader'],
    tierProgress: {
      quick_reader: { ...earnedTierProgress },
      speed_reader: { ...unlockedTierProgress },
      lightning_reader: { ...lockedTierProgress },
    },
  };

  const fullProgress: CertificationProgress = {
    highestCertificationWPM: 1300,
    averageCertificationAccuracy: 92,
    shortTextsPassed: 3,
    mediumTextsPassed: 3,
    longTextsPassed: 3,
    earnedTiers: ['quick_reader', 'speed_reader', 'lightning_reader'],
    tierProgress: {
      quick_reader: { ...earnedTierProgress },
      speed_reader: { ...earnedTierProgress },
      lightning_reader: { ...earnedTierProgress },
    },
  };

  describe('rendering all tiers', () => {
    it('renders Quick Reader tier', () => {
      const { getByText } = render(<JourneyPath progress={emptyProgress} />);

      expect(getByText('Quick Reader')).toBeTruthy();
    });

    it('renders Speed Reader tier', () => {
      const { getByText } = render(<JourneyPath progress={emptyProgress} />);

      expect(getByText('Speed Reader')).toBeTruthy();
    });

    it('renders Lightning Reader tier', () => {
      const { getByText } = render(<JourneyPath progress={emptyProgress} />);

      expect(getByText('Lightning Reader')).toBeTruthy();
    });

    it('renders lock icon for locked tiers', () => {
      const { getAllByText } = render(<JourneyPath progress={emptyProgress} />);

      // Should have lock icons for locked tiers
      expect(getAllByText('🔒').length).toBe(2);
    });

    it('renders tier icon for unlocked first tier', () => {
      const { getByText } = render(<JourneyPath progress={emptyProgress} />);

      // First tier should show its icon since it's always unlocked
      expect(getByText('🏃')).toBeTruthy();
    });
  });

  describe('progress states', () => {
    it('shows no checkmarks for no earned tiers', () => {
      const { queryAllByText } = render(<JourneyPath progress={emptyProgress} />);

      // No checkmark badge should appear
      expect(queryAllByText('✓').length).toBe(0);
    });

    it('shows checkmark for earned tier', () => {
      const { getAllByText } = render(<JourneyPath progress={partialProgress} />);

      // Should have one checkmark for earned tier
      expect(getAllByText('✓').length).toBe(1);
    });

    it('shows all 3 checkmarks when fully complete', () => {
      const { getAllByText } = render(<JourneyPath progress={fullProgress} />);

      // All 3 tiers should show checkmarks
      expect(getAllByText('✓').length).toBe(3);
    });

    it('shows all tier icons when fully complete', () => {
      const { getByText } = render(<JourneyPath progress={fullProgress} />);

      // All tier icons should be visible
      expect(getByText('🏃')).toBeTruthy();
      expect(getByText('⚡')).toBeTruthy();
      expect(getByText('🏆')).toBeTruthy();
    });
  });

  describe('tier requirements display', () => {
    it('shows WPM and accuracy requirements', () => {
      const { getByText } = render(<JourneyPath progress={emptyProgress} />);

      // Quick Reader requirements
      expect(getByText('600 WPM • 80%')).toBeTruthy();
    });
  });
});
