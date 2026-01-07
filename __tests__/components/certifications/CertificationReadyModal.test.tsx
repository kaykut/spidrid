/**
 * Tests for CertificationReadyModal component - Milestone 7
 *
 * Tests the certification readiness prompt UI.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CertificationReadyModal } from '../../../src/components/certifications';

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

describe('CertificationReadyModal', () => {
  const mockOnTakeTest = jest.fn();
  const mockOnKeepPracticing = jest.fn();

  beforeEach(() => {
    mockOnTakeTest.mockClear();
    mockOnKeepPracticing.mockClear();
  });

  describe('quick_reader tier', () => {
    it('renders tier title and icon', () => {
      const { getByText } = render(
        <CertificationReadyModal
          tier="quick_reader"
          currentWPM={550}
          currentAccuracy={78}
          visible={true}
          onTakeTest={mockOnTakeTest}
          onKeepPracticing={mockOnKeepPracticing}
        />
      );

      expect(getByText('Quick Reader')).toBeTruthy();
      expect(getByText("You're Ready!")).toBeTruthy();
    });

    it('displays current stats', () => {
      const { getByText } = render(
        <CertificationReadyModal
          tier="quick_reader"
          currentWPM={550}
          currentAccuracy={78}
          visible={true}
          onTakeTest={mockOnTakeTest}
          onKeepPracticing={mockOnKeepPracticing}
        />
      );

      expect(getByText('550/600 WPM')).toBeTruthy();
      expect(getByText('78%/80%')).toBeTruthy();
    });

    it('calls onTakeTest when Take Certification Test is pressed', () => {
      const { getByText } = render(
        <CertificationReadyModal
          tier="quick_reader"
          currentWPM={550}
          currentAccuracy={78}
          visible={true}
          onTakeTest={mockOnTakeTest}
          onKeepPracticing={mockOnKeepPracticing}
        />
      );

      fireEvent.press(getByText('Take Certification Test'));
      expect(mockOnTakeTest).toHaveBeenCalledTimes(1);
    });

    it('calls onKeepPracticing when Keep Practicing is pressed', () => {
      const { getByText } = render(
        <CertificationReadyModal
          tier="quick_reader"
          currentWPM={550}
          currentAccuracy={78}
          visible={true}
          onTakeTest={mockOnTakeTest}
          onKeepPracticing={mockOnKeepPracticing}
        />
      );

      fireEvent.press(getByText('Keep Practicing'));
      expect(mockOnKeepPracticing).toHaveBeenCalledTimes(1);
    });
  });

  describe('speed_reader tier', () => {
    it('renders tier title', () => {
      const { getByText } = render(
        <CertificationReadyModal
          tier="speed_reader"
          currentWPM={850}
          currentAccuracy={83}
          visible={true}
          onTakeTest={mockOnTakeTest}
          onKeepPracticing={mockOnKeepPracticing}
        />
      );

      expect(getByText('Speed Reader')).toBeTruthy();
    });

    it('displays requirement stats for speed_reader', () => {
      const { getByText } = render(
        <CertificationReadyModal
          tier="speed_reader"
          currentWPM={850}
          currentAccuracy={83}
          visible={true}
          onTakeTest={mockOnTakeTest}
          onKeepPracticing={mockOnKeepPracticing}
        />
      );

      expect(getByText('850/900 WPM')).toBeTruthy();
      expect(getByText('83%/85%')).toBeTruthy();
    });
  });

  describe('lightning_reader tier', () => {
    it('renders tier title', () => {
      const { getByText } = render(
        <CertificationReadyModal
          tier="lightning_reader"
          currentWPM={1100}
          currentAccuracy={88}
          visible={true}
          onTakeTest={mockOnTakeTest}
          onKeepPracticing={mockOnKeepPracticing}
        />
      );

      expect(getByText('Lightning Reader')).toBeTruthy();
    });
  });

  describe('visibility', () => {
    it('renders nothing when tier is null', () => {
      const { queryByText } = render(
        <CertificationReadyModal
          tier={null}
          currentWPM={0}
          currentAccuracy={0}
          visible={true}
          onTakeTest={mockOnTakeTest}
          onKeepPracticing={mockOnKeepPracticing}
        />
      );

      expect(queryByText("You're Ready!")).toBeNull();
    });
  });
});
