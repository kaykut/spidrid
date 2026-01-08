/**
 * Tests for NewCertificateModal Component.
 *
 * Displays a congratulations modal when a certificate is earned.
 * PRD Tiers: speed_reader, velocity_master, transcendent
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { NewCertificateModal } from '../../src/components/certificates/NewCertificateModal';
import { Certificate } from '../../src/types/certificates';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// Mock certificate data using PRD tiers
const mockCertificate: Certificate = {
  id: 'cert-123',
  type: 'speed_reader',
  earnedAt: new Date('2026-01-07').getTime(),
  wpm: 650,
};

const mockVelocityMasterCertificate: Certificate = {
  id: 'cert-456',
  type: 'velocity_master',
  earnedAt: new Date('2026-01-06').getTime(),
  wpm: 950,
};

const mockTranscendentCertificate: Certificate = {
  id: 'cert-789',
  type: 'transcendent',
  earnedAt: new Date('2026-01-08').getTime(),
  wpm: 1550,
};

describe('NewCertificateModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('visibility', () => {
    it('renders when visible is true', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={mockCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Congratulations!')).toBeTruthy();
    });

    it('does not render content when visible is false', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={mockCertificate}
          visible={false}
          onClose={mockOnClose}
        />
      );

      // Modal is not visible, but component still mounts
      // The Modal component in RN handles visibility internally
      expect(screen.queryByText('Congratulations!')).toBeNull();
    });

    it('returns null when certificate is null', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={null}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.queryByText('Congratulations!')).toBeNull();
    });
  });

  describe('speed_reader certificate display', () => {
    it('shows congratulations message', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={mockCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Congratulations!')).toBeTruthy();
    });

    it('shows certificate title', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={mockCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Speed Reader')).toBeTruthy();
    });

    it('shows certificate description', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={mockCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Achieved VS 40 with 600 WPM capability')).toBeTruthy();
    });

    it('shows certificate icon', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={mockCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('⚡')).toBeTruthy();
    });

    it('shows WPM achieved', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={mockCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('650 WPM')).toBeTruthy();
    });

    it('shows Awesome button', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={mockCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Awesome!')).toBeTruthy();
    });
  });

  describe('velocity_master certificate display', () => {
    it('shows velocity master certificate title', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={mockVelocityMasterCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Velocity Master')).toBeTruthy();
    });

    it('shows velocity master certificate icon', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={mockVelocityMasterCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('🚀')).toBeTruthy();
    });

    it('shows velocity master certificate WPM', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={mockVelocityMasterCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('950 WPM')).toBeTruthy();
    });
  });

  describe('transcendent certificate display', () => {
    it('shows transcendent certificate title', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={mockTranscendentCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Transcendent')).toBeTruthy();
    });

    it('shows transcendent certificate icon', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={mockTranscendentCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('🏆')).toBeTruthy();
    });

    it('shows transcendent certificate WPM', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={mockTranscendentCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('1550 WPM')).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('calls onClose when Awesome button is pressed', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={mockCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      const awesomeButton = screen.getByText('Awesome!');
      fireEvent.press(awesomeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('invalid certificate type', () => {
    it('returns null for invalid certificate type', () => {
      const invalidCert: Certificate = {
        id: 'invalid-cert',
        type: 'invalid_type' as Certificate['type'],
        earnedAt: Date.now(),
        wpm: 100,
      };

      renderWithProviders(
        <NewCertificateModal
          certificate={invalidCert}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.queryByText('Congratulations!')).toBeNull();
    });
  });
});
