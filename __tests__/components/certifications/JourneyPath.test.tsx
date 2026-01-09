/**
 * Tests for JourneyPath component - Milestone 8
 *
 * Tests the visual journey path showing 3 PRD tiers as waypoints.
 * PRD Tiers: speed_reader, velocity_master, transcendent
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { JourneyPath } from '../../../src/components/certifications';
import { CertificationTier, CertificationTierProgress } from '../../../src/types/certificates';

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
    vsUnlocked: false,
    speedProofAchieved: false,
    examUnlocked: false,
    examPassed: false,
  };

  const inProgressTierProgress: CertificationTierProgress = {
    vsUnlocked: true,
    speedProofAchieved: false,
    examUnlocked: false,
    examPassed: false,
  };

  const earnedTierProgress: CertificationTierProgress = {
    vsUnlocked: true,
    speedProofAchieved: true,
    examUnlocked: true,
    examPassed: true,
    earnedAt: Date.now(),
  };

  const emptyProgress: Record<CertificationTier, CertificationTierProgress> = {
    speed_reader: { ...inProgressTierProgress }, // First tier shows as in progress
    velocity_master: { ...lockedTierProgress },
    transcendent: { ...lockedTierProgress },
  };

  const partialProgress: Record<CertificationTier, CertificationTierProgress> = {
    speed_reader: { ...earnedTierProgress },
    velocity_master: { ...inProgressTierProgress },
    transcendent: { ...lockedTierProgress },
  };

  const fullProgress: Record<CertificationTier, CertificationTierProgress> = {
    speed_reader: { ...earnedTierProgress },
    velocity_master: { ...earnedTierProgress },
    transcendent: { ...earnedTierProgress },
  };

  describe('rendering all tiers', () => {
    it('renders Speed Reader tier', () => {
      const { getByText } = render(
        <JourneyPath progress={emptyProgress} velocityScore={20} />
      );

      expect(getByText('Speed Reader')).toBeTruthy();
    });

    it('renders Velocity Master tier', () => {
      const { getByText } = render(
        <JourneyPath progress={emptyProgress} velocityScore={20} />
      );

      expect(getByText('Velocity Master')).toBeTruthy();
    });

    it('renders Transcendent tier', () => {
      const { getByText } = render(
        <JourneyPath progress={emptyProgress} velocityScore={20} />
      );

      expect(getByText('Transcendent')).toBeTruthy();
    });

    it('renders lock icon for locked tiers', () => {
      const { getAllByText } = render(
        <JourneyPath progress={emptyProgress} velocityScore={20} />
      );

      // Should have lock icons for locked tiers (velocity_master and transcendent)
      expect(getAllByText('🔒').length).toBe(2);
    });

    it('renders tier icon for unlocked first tier', () => {
      const { getByText } = render(
        <JourneyPath progress={emptyProgress} velocityScore={20} />
      );

      // First tier should show its icon since it's in progress
      expect(getByText('⚡')).toBeTruthy();
    });
  });

  describe('progress states', () => {
    it('shows no checkmarks for no earned tiers', () => {
      const { queryAllByText } = render(
        <JourneyPath progress={emptyProgress} velocityScore={20} />
      );

      // No checkmark badge should appear
      expect(queryAllByText('✓').length).toBe(0);
    });

    it('shows checkmark for earned tier', () => {
      const { getAllByText } = render(
        <JourneyPath progress={partialProgress} velocityScore={50} />
      );

      // Should have one checkmark for earned tier
      expect(getAllByText('✓').length).toBe(1);
    });

    it('shows all 3 checkmarks when fully complete', () => {
      const { getAllByText } = render(
        <JourneyPath progress={fullProgress} velocityScore={100} />
      );

      // All 3 tiers should show checkmarks
      expect(getAllByText('✓').length).toBe(3);
    });

    it('shows all tier icons when fully complete', () => {
      const { getByText } = render(
        <JourneyPath progress={fullProgress} velocityScore={100} />
      );

      // All tier icons should be visible
      expect(getByText('⚡')).toBeTruthy();
      expect(getByText('🚀')).toBeTruthy();
      expect(getByText('🏆')).toBeTruthy();
    });
  });

  describe('tier requirements display', () => {
    it('shows VS and WPM requirements', () => {
      const { getByText } = render(
        <JourneyPath progress={emptyProgress} velocityScore={20} />
      );

      // Speed Reader requirements
      expect(getByText('VS 40 • 600 WPM')).toBeTruthy();
    });
  });
});
