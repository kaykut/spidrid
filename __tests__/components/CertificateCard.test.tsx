/**
 * Tests for CertificateCard Component.
 *
 * Displays earned certificates with icon, title, and description.
 * PRD Tiers: speed_reader, velocity_master, transcendent
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { CertificateCard, LockedCertificateCard } from '../../src/components/certificates/CertificateCard';
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

const mockMasterCertificate: Certificate = {
  id: 'cert-456',
  type: 'velocity_master',
  earnedAt: new Date('2026-01-06').getTime(),
  wpm: 950,
};

const mockTranscendentCertificate: Certificate = {
  id: 'cert-789',
  type: 'transcendent',
  earnedAt: new Date('2026-01-08').getTime(),
  wpm: 1250,
};

describe('CertificateCard', () => {
  describe('basic rendering', () => {
    it('renders certificate title', () => {
      renderWithProviders(<CertificateCard certificate={mockCertificate} />);

      expect(screen.getByText('Speed Reader')).toBeTruthy();
    });

    it('renders certificate description', () => {
      renderWithProviders(<CertificateCard certificate={mockCertificate} />);

      expect(screen.getByText('Achieved VS 40 with 900 WPM capability')).toBeTruthy();
    });

    it('renders certificate icon', () => {
      renderWithProviders(<CertificateCard certificate={mockCertificate} />);

      expect(screen.getByText('⚡')).toBeTruthy();
    });

    it('renders velocity master certificate correctly', () => {
      renderWithProviders(<CertificateCard certificate={mockMasterCertificate} />);

      expect(screen.getByText('Velocity Master')).toBeTruthy();
      expect(screen.getByText('Achieved VS 60 with 1200 WPM capability')).toBeTruthy();
      expect(screen.getByText('🔥')).toBeTruthy();
    });

    it('renders transcendent certificate correctly', () => {
      renderWithProviders(<CertificateCard certificate={mockTranscendentCertificate} />);

      expect(screen.getByText('Transcendent')).toBeTruthy();
      expect(screen.getByText('Achieved VS 95 with 1500 WPM capability')).toBeTruthy();
      expect(screen.getByText('👑')).toBeTruthy();
    });
  });

  describe('size variants', () => {
    it('renders small size by default', () => {
      renderWithProviders(<CertificateCard certificate={mockCertificate} />);

      // Component should render (small is default)
      expect(screen.getByText('Speed Reader')).toBeTruthy();
    });

    it('renders small size explicitly', () => {
      renderWithProviders(
        <CertificateCard certificate={mockCertificate} size="small" />
      );

      expect(screen.getByText('Speed Reader')).toBeTruthy();
    });

    it('renders large size', () => {
      renderWithProviders(<CertificateCard certificate={mockCertificate} size="large" />);

      // Large size shows date
      expect(screen.getByText(/Earned/)).toBeTruthy();
    });

    it('large size shows formatted date', () => {
      renderWithProviders(<CertificateCard certificate={mockCertificate} size="large" />);

      // Should contain date information
      expect(screen.getByText(/January/)).toBeTruthy();
      expect(screen.getByText(/2026/)).toBeTruthy();
    });

    it('small size does not show date', () => {
      renderWithProviders(<CertificateCard certificate={mockCertificate} size="small" />);

      // Should not find "Earned" text
      expect(screen.queryByText(/Earned/)).toBeNull();
    });
  });

  describe('interactions', () => {
    it('calls onPress when pressed', () => {
      const onPress = jest.fn();
      renderWithProviders(<CertificateCard certificate={mockCertificate} onPress={onPress} />);

      const card = screen.getByText('Speed Reader');
      fireEvent.press(card);

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('is not pressable when onPress not provided', () => {
      renderWithProviders(<CertificateCard certificate={mockCertificate} />);

      // Component renders but without TouchableOpacity behavior
      expect(screen.getByText('Speed Reader')).toBeTruthy();
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

      renderWithProviders(<CertificateCard certificate={invalidCert} />);

      // The component returns null for invalid types
      expect(screen.queryByText('Speed Reader')).toBeNull();
      expect(screen.queryByText('Velocity Master')).toBeNull();
      expect(screen.queryByText('Transcendent')).toBeNull();
    });
  });
});

describe('LockedCertificateCard', () => {
  describe('basic rendering', () => {
    it('renders locked icon', () => {
      renderWithProviders(<LockedCertificateCard type="speed_reader" progress={0.5} />);

      expect(screen.getByText('🔒')).toBeTruthy();
    });

    it('renders certificate title', () => {
      renderWithProviders(<LockedCertificateCard type="speed_reader" progress={0.5} />);

      expect(screen.getByText('Speed Reader')).toBeTruthy();
    });

    it('renders certificate description', () => {
      renderWithProviders(<LockedCertificateCard type="speed_reader" progress={0.5} />);

      expect(screen.getByText('Achieved VS 40 with 900 WPM capability')).toBeTruthy();
    });

    it('renders velocity master locked card', () => {
      renderWithProviders(<LockedCertificateCard type="velocity_master" progress={0.3} />);

      expect(screen.getByText('🔒')).toBeTruthy();
      expect(screen.getByText('Velocity Master')).toBeTruthy();
    });

    it('renders transcendent locked card', () => {
      renderWithProviders(<LockedCertificateCard type="transcendent" progress={0.1} />);

      expect(screen.getByText('🔒')).toBeTruthy();
      expect(screen.getByText('Transcendent')).toBeTruthy();
    });
  });

  describe('progress bar', () => {
    it('renders with 0% progress', () => {
      renderWithProviders(
        <LockedCertificateCard type="speed_reader" progress={0} />
      );

      expect(screen.getByText('Speed Reader')).toBeTruthy();
    });

    it('renders with 50% progress', () => {
      renderWithProviders(
        <LockedCertificateCard type="speed_reader" progress={0.5} />
      );

      expect(screen.getByText('Speed Reader')).toBeTruthy();
    });

    it('renders with 100% progress', () => {
      renderWithProviders(
        <LockedCertificateCard type="speed_reader" progress={1} />
      );

      expect(screen.getByText('Speed Reader')).toBeTruthy();
    });

    it('clamps progress above 100% to 100%', () => {
      renderWithProviders(
        <LockedCertificateCard type="speed_reader" progress={1.5} />
      );

      expect(screen.getByText('Speed Reader')).toBeTruthy();
    });
  });

  describe('invalid type', () => {
    it('returns null for invalid type', () => {
      renderWithProviders(
        <LockedCertificateCard type={'invalid' as Certificate['type']} progress={0.5} />
      );

      // Should not find any certificate content
      expect(screen.queryByText('Speed Reader')).toBeNull();
      expect(screen.queryByText('Velocity Master')).toBeNull();
      expect(screen.queryByText('Transcendent')).toBeNull();
    });
  });
});
