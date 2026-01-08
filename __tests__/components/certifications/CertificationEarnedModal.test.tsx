/**
 * Tests for CertificationEarnedModal component - Milestone 7
 *
 * Tests the certification earned celebration UI.
 * PRD Tiers: speed_reader, velocity_master, transcendent
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CertificationEarnedModal } from '../../../src/components/certifications';
import { EarnedCertification } from '../../../src/types/certificates';
import { JourneyCertTier } from '../../../src/types/journey';

// Mock ThemeProvider
jest.mock('../../../src/components/common/ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      backgroundColor: '#1a1a1a',
      textColor: '#ffffff',
      secondaryBackground: '#2a2a2a',
      accentColor: '#4dabf7',
    },
  }),
}));

describe('CertificationEarnedModal', () => {
  const mockOnClose = jest.fn();
  const mockOnViewJourney = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnViewJourney.mockClear();
  });

  const createCertification = (
    tier: JourneyCertTier,
    wpm: number,
    comprehension: number,
    velocityScore: number
  ): EarnedCertification => ({
    tier,
    earnedAt: Date.now(),
    earnedStats: { wpm, comprehension, velocityScore },
  });

  describe('speed_reader certification', () => {
    const certification = createCertification('speed_reader', 650, 82, 45);

    it('renders celebration text', () => {
      const { getByText } = render(
        <CertificationEarnedModal
          certification={certification}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(getByText('Certification Earned!')).toBeTruthy();
    });

    it('renders tier title', () => {
      const { getByText } = render(
        <CertificationEarnedModal
          certification={certification}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(getByText('Speed Reader')).toBeTruthy();
    });

    it('displays stats', () => {
      const { getByText } = render(
        <CertificationEarnedModal
          certification={certification}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(getByText('45')).toBeTruthy();
      expect(getByText('VS')).toBeTruthy();
      expect(getByText('650')).toBeTruthy();
      expect(getByText('WPM')).toBeTruthy();
      expect(getByText('82%')).toBeTruthy();
      expect(getByText('Comp')).toBeTruthy();
    });

    it('calls onClose when Awesome! is pressed', () => {
      const { getByText } = render(
        <CertificationEarnedModal
          certification={certification}
          visible={true}
          onClose={mockOnClose}
        />
      );

      fireEvent.press(getByText('Awesome!'));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('velocity_master certification', () => {
    const certification = createCertification('velocity_master', 950, 85, 65);

    it('renders tier title', () => {
      const { getByText } = render(
        <CertificationEarnedModal
          certification={certification}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(getByText('Velocity Master')).toBeTruthy();
    });

    it('displays correct stats', () => {
      const { getByText } = render(
        <CertificationEarnedModal
          certification={certification}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(getByText('65')).toBeTruthy();
      expect(getByText('950')).toBeTruthy();
      expect(getByText('85%')).toBeTruthy();
    });
  });

  describe('transcendent certification', () => {
    const certification = createCertification('transcendent', 1550, 88, 96);

    it('renders tier title', () => {
      const { getByText } = render(
        <CertificationEarnedModal
          certification={certification}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(getByText('Transcendent')).toBeTruthy();
    });

    it('displays correct stats', () => {
      const { getByText } = render(
        <CertificationEarnedModal
          certification={certification}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(getByText('96')).toBeTruthy();
      expect(getByText('1550')).toBeTruthy();
      expect(getByText('88%')).toBeTruthy();
    });
  });

  describe('View Journey button', () => {
    const certification = createCertification('speed_reader', 650, 82, 45);

    it('renders View Journey button when callback provided', () => {
      const { getByText } = render(
        <CertificationEarnedModal
          certification={certification}
          visible={true}
          onClose={mockOnClose}
          onViewJourney={mockOnViewJourney}
        />
      );

      expect(getByText('View Certification Journey')).toBeTruthy();
    });

    it('calls onViewJourney when pressed', () => {
      const { getByText } = render(
        <CertificationEarnedModal
          certification={certification}
          visible={true}
          onClose={mockOnClose}
          onViewJourney={mockOnViewJourney}
        />
      );

      fireEvent.press(getByText('View Certification Journey'));
      expect(mockOnViewJourney).toHaveBeenCalledTimes(1);
    });

    it('does not render View Journey button when callback not provided', () => {
      const { queryByText } = render(
        <CertificationEarnedModal
          certification={certification}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(queryByText('View Certification Journey')).toBeNull();
    });
  });

  describe('visibility', () => {
    it('renders nothing when certification is null', () => {
      const { queryByText } = render(
        <CertificationEarnedModal
          certification={null}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(queryByText('Certification Earned!')).toBeNull();
    });
  });
});
