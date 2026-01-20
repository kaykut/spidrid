/**
 * Tests for Certificate Template Service.
 *
 * Generates HTML certificate templates for PDF generation.
 */

import { generateCertificateHTML } from '../../src/services/certificateTemplate';
import { Certificate } from '../../src/types/certificates';

describe('certificateTemplate', () => {
  const mockCertificate: Certificate = {
    id: 'abc123xyz789',
    type: 'speed_reader',
    earnedAt: new Date('2026-01-07').getTime(),
    wpm: 600,
  };

  describe('generateCertificateHTML', () => {
    it('returns a string', () => {
      const html = generateCertificateHTML({
        certificate: mockCertificate,
        userName: 'John Doe',
              });

      expect(typeof html).toBe('string');
    });

    it('contains user name', () => {
      const html = generateCertificateHTML({
        certificate: mockCertificate,
        userName: 'Jane Smith',
              });

      expect(html).toContain('Jane Smith');
    });

    it('uses "Speed Reader" when userName is empty', () => {
      const html = generateCertificateHTML({
        certificate: mockCertificate,
        userName: '',
              });

      expect(html).toContain('Speed Reader');
    });

    it('contains certificate title', () => {
      const html = generateCertificateHTML({
        certificate: mockCertificate,
        userName: 'Test User',
              });

      // Should contain the title from certificate definition
      expect(html).toContain('Speed Reader');
    });

    it('contains WPM value', () => {
      const html = generateCertificateHTML({
        certificate: mockCertificate,
        userName: 'Test User',
              });

      expect(html).toContain('600 WPM');
    });

    it('contains formatted date', () => {
      const html = generateCertificateHTML({
        certificate: mockCertificate,
        userName: 'Test User',
              });

      // Date should be formatted (January 7, 2026)
      expect(html).toContain('January');
      expect(html).toContain('2026');
    });


    it('contains certificate ID', () => {
      const html = generateCertificateHTML({
        certificate: mockCertificate,
        userName: 'Test User',
              });

      // ID should be uppercase and first 8 chars
      expect(html).toContain('ABC123XY');
    });

    it('is valid HTML document', () => {
      const html = generateCertificateHTML({
        certificate: mockCertificate,
        userName: 'Test User',
              });

      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<html>');
      expect(html).toContain('</html>');
      expect(html).toContain('<head>');
      expect(html).toContain('</head>');
      expect(html).toContain('<body>');
      expect(html).toContain('</body>');
    });

    it('contains Devoro app name', () => {
      const html = generateCertificateHTML({
        certificate: mockCertificate,
        userName: 'Test User',
              });

      expect(html).toContain('Devoro');
    });

    it('contains Certificate of Achievement text', () => {
      const html = generateCertificateHTML({
        certificate: mockCertificate,
        userName: 'Test User',
              });

      expect(html).toContain('Certificate of Achievement');
    });

    it('contains the certificate icon', () => {
      const html = generateCertificateHTML({
        certificate: mockCertificate,
        userName: 'Test User',
              });

      // Should contain an emoji icon
      expect(html).toContain('⚡'); // speed_reader has lightning bolt icon
    });

    it('contains appropriate styling', () => {
      const html = generateCertificateHTML({
        certificate: mockCertificate,
        userName: 'Test User',
              });

      expect(html).toContain('<style>');
      expect(html).toContain('font-family');
      expect(html).toContain('background');
    });

    it('contains signature area', () => {
      const html = generateCertificateHTML({
        certificate: mockCertificate,
        userName: 'Test User',
              });

      expect(html).toContain('Verified Achievement');
    });

    describe('with different certificate types', () => {
      it('handles velocity_master certificate type', () => {
        const masterCert: Certificate = {
          id: 'master123',
          type: 'velocity_master',
          earnedAt: Date.now(),
          wpm: 950,
        };

        const html = generateCertificateHTML({
          certificate: masterCert,
          userName: 'Master Reader',
                  });

        expect(html).toContain('950 WPM');
        expect(html).toContain('Master Reader');
        expect(html).toContain('Velocity Master');
        expect(html).toContain('🔥');
      });

      it('handles transcendent certificate type', () => {
        const transcendentCert: Certificate = {
          id: 'transcendent123',
          type: 'transcendent',
          earnedAt: Date.now(),
          wpm: 1250,
        };

        const html = generateCertificateHTML({
          certificate: transcendentCert,
          userName: 'Elite Reader',
                  });

        expect(html).toContain('1250 WPM');
        expect(html).toContain('Elite Reader');
        expect(html).toContain('Transcendent');
        expect(html).toContain('👑');
      });
    });

    describe('special characters in user name', () => {
      it('handles apostrophes', () => {
        const html = generateCertificateHTML({
          certificate: mockCertificate,
          userName: "John O'Brien",
                  });

        expect(html).toContain("O'Brien");
      });

      it('handles international characters', () => {
        const html = generateCertificateHTML({
          certificate: mockCertificate,
          userName: 'José García',
                  });

        expect(html).toContain('José García');
      });

      it('handles long names', () => {
        const longName = 'Alexander Maximilian von Wunderberg III';
        const html = generateCertificateHTML({
          certificate: mockCertificate,
          userName: longName,
                  });

        expect(html).toContain(longName);
      });
    });
  });
});
