/**
 * Tests for TierCard component - Milestone 8
 *
 * Tests expandable tier details with progress bars.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TierCard } from '../../../src/components/certifications';
import { CERTIFICATION_TIER_DEFINITIONS, CertificationTierProgress } from '../../../src/types/certificates';

// Mock ThemeProvider
jest.mock('../../../src/components/common/ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      backgroundColor: '#1a1a1a',
      textColor: '#ffffff',
      secondaryBackground: '#2a2a2a',
      accentColor: '#4dabf7',
      orpColor: '#ff6b6b',
    },
  }),
}));

describe('TierCard', () => {
  const unlockedProgress: CertificationTierProgress = {
    speedProgress: 0.5,
    accuracyProgress: 0.7,
    textsProgress: 0.3,
    overallProgress: 0.3,
    isUnlocked: true,
    isReady: false,
    isEarned: false,
  };

  const lockedProgress: CertificationTierProgress = {
    speedProgress: 0,
    accuracyProgress: 0,
    textsProgress: 0,
    overallProgress: 0,
    isUnlocked: false,
    isReady: false,
    isEarned: false,
  };

  const earnedProgress: CertificationTierProgress = {
    speedProgress: 1,
    accuracyProgress: 1,
    textsProgress: 1,
    overallProgress: 1,
    isUnlocked: true,
    isReady: true,
    isEarned: true,
    earnedAt: Date.now(),
  };

  describe('quick_reader tier', () => {
    it('renders tier title', () => {
      const { getByText } = render(
        <TierCard tier="quick_reader" progress={unlockedProgress} />
      );

      expect(getByText('Quick Reader')).toBeTruthy();
    });

    it('renders tier icon', () => {
      const { getByText } = render(
        <TierCard tier="quick_reader" progress={unlockedProgress} />
      );

      const definition = CERTIFICATION_TIER_DEFINITIONS.find(d => d.tier === 'quick_reader');
      expect(getByText(definition!.icon)).toBeTruthy();
    });

    it('shows overall progress percentage', () => {
      const { getByText } = render(
        <TierCard tier="quick_reader" progress={unlockedProgress} />
      );

      expect(getByText('30%')).toBeTruthy();
    });
  });

  describe('speed_reader tier', () => {
    it('renders tier title', () => {
      const { getByText } = render(
        <TierCard tier="speed_reader" progress={unlockedProgress} />
      );

      expect(getByText('Speed Reader')).toBeTruthy();
    });
  });

  describe('lightning_reader tier', () => {
    it('renders tier title', () => {
      const { getByText } = render(
        <TierCard tier="lightning_reader" progress={unlockedProgress} />
      );

      expect(getByText('Lightning Reader')).toBeTruthy();
    });
  });

  describe('expansion behavior', () => {
    it('shows progress bars when tapped (unlocked tier)', () => {
      const { getByText } = render(
        <TierCard tier="quick_reader" progress={unlockedProgress} />
      );

      // Tap to expand
      fireEvent.press(getByText('Quick Reader'));

      // Now progress bar labels should be visible
      expect(getByText('Speed')).toBeTruthy();
      expect(getByText('Accuracy')).toBeTruthy();
      expect(getByText('Texts')).toBeTruthy();
    });
  });

  describe('status states', () => {
    it('shows Earned status for earned tier', () => {
      const { getByText } = render(
        <TierCard tier="quick_reader" progress={earnedProgress} />
      );

      expect(getByText('Earned')).toBeTruthy();
    });

    it('shows Locked status for locked tier', () => {
      const { getByText } = render(
        <TierCard tier="quick_reader" progress={lockedProgress} />
      );

      expect(getByText('Locked')).toBeTruthy();
    });

    it('shows In Progress status for unlocked tier', () => {
      const { getByText } = render(
        <TierCard tier="quick_reader" progress={unlockedProgress} />
      );

      expect(getByText('In Progress')).toBeTruthy();
    });
  });

  describe('progress display', () => {
    it('shows 100% for completed progress', () => {
      const { getByText } = render(
        <TierCard tier="quick_reader" progress={earnedProgress} />
      );

      expect(getByText('100%')).toBeTruthy();
    });
  });
});
