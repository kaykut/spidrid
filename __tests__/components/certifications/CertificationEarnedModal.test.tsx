/**
 * Tests for CertificationEarnedModal component - Milestone 7
 *
 * Tests the certification earned celebration UI.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CertificationEarnedModal } from '../../../src/components/certifications';
import { EarnedCertification } from '../../../src/types/certificates';

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
    tier: 'quick_reader' | 'speed_reader' | 'lightning_reader',
    wpm: number,
    accuracy: number,
    textsCompleted: number
  ): EarnedCertification => ({
    id: `cert-${tier}`,
    tier,
    earnedAt: Date.now(),
    earnedStats: { wpm, accuracy, textsCompleted },
  });

  describe('quick_reader certification', () => {
    const certification = createCertification('quick_reader', 620, 82, 3);

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

      expect(getByText('Quick Reader')).toBeTruthy();
    });

    it('displays stats', () => {
      const { getByText } = render(
        <CertificationEarnedModal
          certification={certification}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(getByText('620')).toBeTruthy();
      expect(getByText('WPM')).toBeTruthy();
      expect(getByText('82%')).toBeTruthy();
      expect(getByText('Accuracy')).toBeTruthy();
      expect(getByText('3')).toBeTruthy();
      expect(getByText('Texts')).toBeTruthy();
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

  describe('speed_reader certification', () => {
    const certification = createCertification('speed_reader', 950, 87, 3);

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
  });

  describe('lightning_reader certification', () => {
    const certification = createCertification('lightning_reader', 1250, 92, 3);

    it('renders tier title', () => {
      const { getByText } = render(
        <CertificationEarnedModal
          certification={certification}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(getByText('Lightning Reader')).toBeTruthy();
    });
  });

  describe('View Journey button', () => {
    const certification = createCertification('quick_reader', 620, 82, 3);

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
