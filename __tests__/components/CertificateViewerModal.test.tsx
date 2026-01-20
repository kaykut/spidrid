/**
 * Tests for CertificateViewerModal Component.
 *
 * Modal for viewing and sharing earned certificates.
 * PRD Tiers: speed_reader, velocity_master, transcendent
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { CertificateViewerModal } from '../../src/components/certificates/CertificateViewerModal';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';
import { Certificate } from '../../src/types/certificates';

// Mock Alert
import { Alert } from 'react-native';

// Import the mocked functions
import * as certificatePDF from '../../src/services/certificatePDF';

// Mock safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
}));

// Mock WebView
jest.mock('react-native-webview', () => {
  const { View, Text } = require('react-native');
  return {
    WebView: ({ source }: { source: { html: string } }) => (
      <View testID="certificate-webview">
        <Text>{source.html ? 'HTML Content' : ''}</Text>
      </View>
    ),
  };
});

// Mock settings store
jest.mock('../../src/store/settingsStore', () => ({
  useSettingsStore: () => ({
    userName: 'Test User',
  }),
}));

// Mock certificate PDF services
jest.mock('../../src/services/certificatePDF');

// Mock certificate template
jest.mock('../../src/services/certificateTemplate', () => ({
  generateCertificateHTML: () => '<html><body>Certificate</body></html>',
}));
jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());

const mockGenerateCertificatePDF = certificatePDF.generateCertificatePDF as jest.MockedFunction<typeof certificatePDF.generateCertificatePDF>;
const mockShareCertificate = certificatePDF.shareCertificate as jest.MockedFunction<typeof certificatePDF.shareCertificate>;
const mockDeleteCertificatePDF = certificatePDF.deleteCertificatePDF as jest.MockedFunction<typeof certificatePDF.deleteCertificatePDF>;

const mockOnClose = jest.fn();

const mockCertificate: Certificate = {
  id: 'cert-123',
  type: 'speed_reader',
  earnedAt: Date.now(),
  wpm: 650,
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('CertificateViewerModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Restore mock implementations after clearing
    mockGenerateCertificatePDF.mockImplementation(() => Promise.resolve('file://mock.pdf'));
    mockShareCertificate.mockImplementation(() => Promise.resolve());
  });

  describe('visibility', () => {
    it('renders when visible is true and certificate is provided', () => {
      renderWithProviders(
        <CertificateViewerModal
          certificate={mockCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Certificate')).toBeTruthy();
    });

    it('returns null when certificate is null', () => {
      const { toJSON } = renderWithProviders(
        <CertificateViewerModal
          certificate={null}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(toJSON()).toBeNull();
    });
  });

  describe('header elements', () => {
    it('renders Close button', () => {
      renderWithProviders(
        <CertificateViewerModal
          certificate={mockCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Close')).toBeTruthy();
    });

    it('renders Share button', () => {
      renderWithProviders(
        <CertificateViewerModal
          certificate={mockCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Share')).toBeTruthy();
    });

    it('renders Certificate title', () => {
      renderWithProviders(
        <CertificateViewerModal
          certificate={mockCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Certificate')).toBeTruthy();
    });
  });

  describe('WebView', () => {
    it('renders WebView with certificate HTML', () => {
      renderWithProviders(
        <CertificateViewerModal
          certificate={mockCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByTestId('certificate-webview')).toBeTruthy();
    });
  });

  describe('footer', () => {
    it('renders footer hint text', () => {
      renderWithProviders(
        <CertificateViewerModal
          certificate={mockCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Tap Share to export as PDF')).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('calls onClose when Close button is pressed', () => {
      renderWithProviders(
        <CertificateViewerModal
          certificate={mockCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      const closeButton = screen.getByText('Close');
      fireEvent.press(closeButton);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('generates and shares PDF when Share is pressed', async () => {
      renderWithProviders(
        <CertificateViewerModal
          certificate={mockCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      const shareButton = screen.getByText('Share');
      fireEvent.press(shareButton);

      await waitFor(() => {
        expect(mockGenerateCertificatePDF).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(mockShareCertificate).toHaveBeenCalledWith('file://mock.pdf');
      });
    });

    it('cleans up PDF after sharing', async () => {
      renderWithProviders(
        <CertificateViewerModal
          certificate={mockCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      const shareButton = screen.getByText('Share');
      fireEvent.press(shareButton);

      await waitFor(() => {
        expect(mockDeleteCertificatePDF).toHaveBeenCalledWith('file://mock.pdf');
      });
    });

    it('shows error alert when share fails', async () => {
      mockGenerateCertificatePDF.mockRejectedValueOnce(new Error('Failed'));

      renderWithProviders(
        <CertificateViewerModal
          certificate={mockCertificate}
          visible={true}
          onClose={mockOnClose}
        />
      );

      const shareButton = screen.getByText('Share');
      fireEvent.press(shareButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Share Failed',
          'Could not generate or share the certificate. Please try again.'
        );
      });
    });
  });
});
