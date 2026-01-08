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

  describe('next step suggestions', () => {
    it('shows "Take the certification exam!" when exam is unlocked', () => {
      const { getByText } = render(
        <TierCard tier="speed_reader" progress={examReadyProgress} currentVS={50} currentWPM={700} />
      );

      // Tap to expand
      fireEvent.press(getByText('Speed Reader'));

      expect(getByText('Take the certification exam!')).toBeTruthy();
    });

    it('shows VS needed when VS is below threshold and vsUnlocked is false', () => {
      // Need vsUnlocked false to trigger VS needed step, but we need
      // some unlock so we can tap to expand. Use speedProofAchieved=true
      const lowVSProgress: CertificationTierProgress = {
        vsUnlocked: false,
        speedProofAchieved: true, // This allows tapping to expand
        examUnlocked: false,
        examPassed: false,
      };

      const { getByText } = render(
        <TierCard tier="speed_reader" progress={lowVSProgress} currentVS={20} currentWPM={300} />
      );

      fireEvent.press(getByText('Speed Reader'));

      // Should show VS needed (vsUnlocked is false and currentVS < threshold)
      expect(getByText(/Increase Velocity Score by/)).toBeTruthy();
    });

    it('shows speed proof needed when below WPM threshold', () => {
      const partialProgress: CertificationTierProgress = {
        vsUnlocked: true,
        speedProofAchieved: false,
        examUnlocked: false,
        examPassed: false,
      };

      const { getByText } = render(
        <TierCard tier="speed_reader" progress={partialProgress} currentVS={50} currentWPM={200} />
      );

      fireEvent.press(getByText('Speed Reader'));

      // Should show speed proof requirement
      expect(getByText(/Achieve .* WPM with 70%\+ comprehension/)).toBeTruthy();
    });

    it('shows fallback message when both VS and speed are met but not unlocked', () => {
      const almostReadyProgress: CertificationTierProgress = {
        vsUnlocked: true,
        speedProofAchieved: true,
        examUnlocked: false, // Not unlocked yet despite meeting requirements
        examPassed: false,
      };

      const { getByText } = render(
        <TierCard tier="speed_reader" progress={almostReadyProgress} currentVS={100} currentWPM={600} />
      );

      fireEvent.press(getByText('Speed Reader'));

      // Should show fallback message about meeting both requirements
      expect(getByText('Meet both VS and Speed Proof requirements')).toBeTruthy();
    });

    it('does not show next step for earned tier', () => {
      const { getByText, queryByText } = render(
        <TierCard tier="speed_reader" progress={earnedProgress} currentVS={50} currentWPM={700} />
      );

      fireEvent.press(getByText('Speed Reader'));

      // Should not have "Next step:" label
      expect(queryByText('Next step:')).toBeNull();
    });
  });

  describe('exam status display', () => {
    it('shows Passed for earned tier in expanded view', () => {
      const { getByText, getAllByText } = render(
        <TierCard tier="speed_reader" progress={earnedProgress} currentVS={50} currentWPM={700} />
      );

      fireEvent.press(getByText('Speed Reader'));

      // Should show "Passed" exam status
      expect(getByText('Passed')).toBeTruthy();
    });

    it('shows Unlocked for exam-ready tier in expanded view', () => {
      const { getByText } = render(
        <TierCard tier="speed_reader" progress={examReadyProgress} currentVS={50} currentWPM={700} />
      );

      fireEvent.press(getByText('Speed Reader'));

      // Should show "Unlocked" exam status
      expect(getByText('Unlocked')).toBeTruthy();
    });
  });

  describe('action button', () => {
    it('shows certification button when exam is ready', () => {
      const mockOnStart = jest.fn();
      const { getByText } = render(
        <TierCard
          tier="speed_reader"
          progress={examReadyProgress}
          currentVS={50}
          currentWPM={700}
          onStartCertification={mockOnStart}
        />
      );

      fireEvent.press(getByText('Speed Reader'));

      expect(getByText('Take Certification Exam')).toBeTruthy();
    });

    it('calls onStartCertification when certification button is pressed', () => {
      const mockOnStart = jest.fn();
      const { getByText } = render(
        <TierCard
          tier="speed_reader"
          progress={examReadyProgress}
          currentVS={50}
          currentWPM={700}
          onStartCertification={mockOnStart}
        />
      );

      fireEvent.press(getByText('Speed Reader'));
      fireEvent.press(getByText('Take Certification Exam'));

      expect(mockOnStart).toHaveBeenCalled();
    });
  });

  describe('earned badge', () => {
    it('shows earned date for completed certification', () => {
      const earnedAt = new Date(2024, 5, 15).getTime(); // June 15, 2024
      const progressWithDate: CertificationTierProgress = {
        ...earnedProgress,
        earnedAt,
      };

      const { getByText } = render(
        <TierCard tier="speed_reader" progress={progressWithDate} currentVS={50} currentWPM={700} />
      );

      fireEvent.press(getByText('Speed Reader'));

      // Should show earned date
      expect(getByText(/Earned on/)).toBeTruthy();
    });
  });

  describe('invalid tier handling', () => {
    it('returns null for invalid tier', () => {
      // @ts-ignore - Testing invalid input
      const { toJSON } = render(
        <TierCard tier="invalid_tier" progress={lockedProgress} currentVS={0} currentWPM={0} />
      );

      expect(toJSON()).toBeNull();
    });
  });

  describe('speed proof achieved status', () => {
    it('shows In Progress when only speedProofAchieved is true', () => {
      const speedProofOnlyProgress: CertificationTierProgress = {
        vsUnlocked: false,
        speedProofAchieved: true,
        examUnlocked: false,
        examPassed: false,
      };

      const { getByText } = render(
        <TierCard tier="speed_reader" progress={speedProofOnlyProgress} currentVS={20} currentWPM={550} />
      );

      expect(getByText('In Progress')).toBeTruthy();
    });
  });
});
