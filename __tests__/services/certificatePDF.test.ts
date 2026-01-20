/**
 * Tests for Certificate PDF Service.
 *
 * Generates and shares PDF certificates using expo-print and expo-sharing.
 */

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import {
  generateCertificatePDF,
  shareCertificate,
  deleteCertificatePDF,
} from '../../src/services/certificatePDF';
import { Certificate } from '../../src/types/certificates';

// Get mocked functions
const mockPrintToFileAsync = Print.printToFileAsync as jest.Mock;
const mockIsAvailableAsync = Sharing.isAvailableAsync as jest.Mock;
const mockShareAsync = Sharing.shareAsync as jest.Mock;

describe('certificatePDF', () => {
  const mockCertificate: Certificate = {
    id: 'test123',
    type: 'speed_reader',
    earnedAt: Date.now(),
    wpm: 950,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateCertificatePDF', () => {
    it('calls Print.printToFileAsync with HTML', async () => {
      mockPrintToFileAsync.mockResolvedValueOnce({ uri: 'file://test.pdf' });

      await generateCertificatePDF({
        certificate: mockCertificate,
        userName: 'Test User',
              });

      expect(mockPrintToFileAsync).toHaveBeenCalledTimes(1);
      expect(mockPrintToFileAsync).toHaveBeenCalledWith({
        html: expect.any(String),
        base64: false,
      });
    });

    it('returns the PDF URI', async () => {
      mockPrintToFileAsync.mockResolvedValueOnce({ uri: 'file://generated.pdf' });

      const result = await generateCertificatePDF({
        certificate: mockCertificate,
        userName: 'Test User',
              });

      expect(result).toBe('file://generated.pdf');
    });

    it('passes HTML containing certificate data', async () => {
      mockPrintToFileAsync.mockResolvedValueOnce({ uri: 'file://test.pdf' });

      await generateCertificatePDF({
        certificate: mockCertificate,
        userName: 'John Doe',
              });

      const call = mockPrintToFileAsync.mock.calls[0][0];
      expect(call.html).toContain('John Doe');
      expect(call.html).toContain('950 WPM');
    });

    it('handles print error', async () => {
      mockPrintToFileAsync.mockRejectedValueOnce(new Error('Print failed'));

      await expect(
        generateCertificatePDF({
          certificate: mockCertificate,
          userName: 'Test User',
                  })
      ).rejects.toThrow('Print failed');
    });
  });

  describe('shareCertificate', () => {
    it('checks if sharing is available', async () => {
      mockIsAvailableAsync.mockResolvedValueOnce(true);
      mockShareAsync.mockResolvedValueOnce(undefined);

      await shareCertificate('file://test.pdf');

      expect(mockIsAvailableAsync).toHaveBeenCalledTimes(1);
    });

    it('calls Sharing.shareAsync when available', async () => {
      mockIsAvailableAsync.mockResolvedValueOnce(true);
      mockShareAsync.mockResolvedValueOnce(undefined);

      await shareCertificate('file://certificate.pdf');

      expect(mockShareAsync).toHaveBeenCalledWith('file://certificate.pdf', {
        mimeType: 'application/pdf',
        dialogTitle: 'Share Certificate',
        UTI: 'com.adobe.pdf',
      });
    });

    it('throws error when sharing is not available', async () => {
      mockIsAvailableAsync.mockResolvedValueOnce(false);

      await expect(shareCertificate('file://test.pdf')).rejects.toThrow(
        'Sharing is not available on this device'
      );

      expect(mockShareAsync).not.toHaveBeenCalled();
    });

    it('handles sharing error', async () => {
      mockIsAvailableAsync.mockResolvedValueOnce(true);
      mockShareAsync.mockRejectedValueOnce(new Error('Sharing cancelled'));

      await expect(shareCertificate('file://test.pdf')).rejects.toThrow(
        'Sharing cancelled'
      );
    });
  });

  describe('deleteCertificatePDF', () => {
    it('returns void (no-op)', async () => {
      const result = await deleteCertificatePDF('file://test.pdf');

      expect(result).toBeUndefined();
    });

    it('does not throw', async () => {
      await expect(deleteCertificatePDF('file://any.pdf')).resolves.not.toThrow();
    });
  });
});
