/**
 * Tests for NewCertificateModal Component.
 *
 * Displays a congratulations modal when a certificate is earned.
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

// Mock certificate data
const mockCertificate: Certificate = {
  id: 'cert-123',
  type: 'speed_900',
  earnedAt: new Date('2026-01-07').getTime(),
  wpm: 950,
};

const mockMasterCertificate: Certificate = {
  id: 'cert-456',
  type: 'speed_1500',
  earnedAt: new Date('2026-01-06').getTime(),
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
      const { root } = renderWithProviders(
        <NewCertificateModal
          certificate={null}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.queryByText('Congratulations!')).toBeNull();
    });
  });

  describe('content display', () => {
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

      expect(screen.getByText('Achieved 900 WPM reading speed')).toBeTruthy();
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

      expect(screen.getByText('950 WPM')).toBeTruthy();
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

  describe('master certificate display', () => {
    it('shows master certificate title', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={mockMasterCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Master Reader')).toBeTruthy();
    });

    it('shows master certificate icon', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={mockMasterCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('🏆')).toBeTruthy();
    });

    it('shows master certificate WPM', () => {
      renderWithProviders(
        <NewCertificateModal
          certificate={mockMasterCertificate}
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
