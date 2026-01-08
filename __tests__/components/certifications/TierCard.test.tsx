/**
 * Tests for TierCard component - Milestone 8
 *
 * Tests expandable tier details with progress bars.
 * PRD Tiers: speed_reader, velocity_master, transcendent
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TierCard } from '../../../src/components/certifications';
import { CertificationTierProgress } from '../../../src/types/certificates';

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
  const lockedProgress: CertificationTierProgress = {
    vsUnlocked: false,
    speedProofAchieved: false,
    examUnlocked: false,
    examPassed: false,
  };

  const inProgressProgress: CertificationTierProgress = {
    vsUnlocked: true,
    speedProofAchieved: false,
    examUnlocked: false,
    examPassed: false,
  };

  const examReadyProgress: CertificationTierProgress = {
    vsUnlocked: true,
    speedProofAchieved: true,
    examUnlocked: true,
    examPassed: false,
  };

  const earnedProgress: CertificationTierProgress = {
    vsUnlocked: true,
    speedProofAchieved: true,
    examUnlocked: true,
    examPassed: true,
    earnedAt: Date.now(),
  };

  describe('speed_reader tier', () => {
    it('renders tier title', () => {
      const { getByText } = render(
        <TierCard tier="speed_reader" progress={inProgressProgress} currentVS={30} currentWPM={500} />
      );

      expect(getByText('Speed Reader')).toBeTruthy();
    });

    it('renders tier icon', () => {
      const { getByText } = render(
        <TierCard tier="speed_reader" progress={inProgressProgress} currentVS={30} currentWPM={500} />
      );

      expect(getByText('⚡')).toBeTruthy();
    });

    it('shows overall progress percentage', () => {
      const { getByText } = render(
        <TierCard tier="speed_reader" progress={inProgressProgress} currentVS={30} currentWPM={500} />
      );

      // inProgressProgress has vsUnlocked=true, so 1/3 = 33%
      expect(getByText('33%')).toBeTruthy();
    });
  });

  describe('velocity_master tier', () => {
    it('renders tier title', () => {
      const { getByText } = render(
        <TierCard tier="velocity_master" progress={inProgressProgress} currentVS={50} currentWPM={800} />
      );

      expect(getByText('Velocity Master')).toBeTruthy();
    });
  });

  describe('transcendent tier', () => {
    it('renders tier title', () => {
      const { getByText } = render(
        <TierCard tier="transcendent" progress={inProgressProgress} currentVS={90} currentWPM={1400} />
      );

      expect(getByText('Transcendent')).toBeTruthy();
    });
  });

  describe('expansion behavior', () => {
    it('shows progress bars when tapped (unlocked tier)', () => {
      const { getByText } = render(
        <TierCard tier="speed_reader" progress={inProgressProgress} currentVS={30} currentWPM={500} />
      );

      // Tap to expand
      fireEvent.press(getByText('Speed Reader'));

      // Now progress bar labels should be visible (may have checkmark prefix)
      expect(getByText(/Velocity Score/)).toBeTruthy();
      expect(getByText('Speed Proof')).toBeTruthy();
    });
  });

  describe('status states', () => {
    it('shows Earned status for earned tier', () => {
      const { getByText } = render(
        <TierCard tier="speed_reader" progress={earnedProgress} currentVS={50} currentWPM={700} />
      );

      expect(getByText('Earned')).toBeTruthy();
    });

    it('shows Locked status for locked tier', () => {
      const { getByText } = render(
        <TierCard tier="speed_reader" progress={lockedProgress} currentVS={20} currentWPM={400} />
      );

      expect(getByText('Locked')).toBeTruthy();
    });

    it('shows In Progress status for unlocked tier', () => {
      const { getByText } = render(
        <TierCard tier="speed_reader" progress={inProgressProgress} currentVS={30} currentWPM={500} />
      );

      expect(getByText('In Progress')).toBeTruthy();
    });

    it('shows Ready for Exam status when exam is unlocked', () => {
      const { getByText } = render(
        <TierCard tier="speed_reader" progress={examReadyProgress} currentVS={50} currentWPM={700} />
      );

      expect(getByText('Ready for Exam')).toBeTruthy();
    });
  });

  describe('progress display', () => {
    it('shows 100% for earned tier', () => {
      const { getByText } = render(
        <TierCard tier="speed_reader" progress={earnedProgress} currentVS={50} currentWPM={700} />
      );

      expect(getByText('100%')).toBeTruthy();
    });

    it('shows 67% when exam is ready but not passed', () => {
      const { getByText } = render(
        <TierCard tier="speed_reader" progress={examReadyProgress} currentVS={50} currentWPM={700} />
      );

      // examReadyProgress has vsUnlocked=true, speedProofAchieved=true, examPassed=false = 2/3 = 67%
      expect(getByText('67%')).toBeTruthy();
    });
  });
});
