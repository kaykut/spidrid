/**
 * Tests for CertificationReadyModal component - Milestone 7
 *
 * Tests the certification readiness prompt UI.
 * PRD Tiers: speed_reader (VS 40, 600 WPM), velocity_master (VS 60, 900 WPM), transcendent (VS 95, 1500 WPM)
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

  describe('speed_reader tier', () => {
    it('renders tier title and icon', () => {
      const { getByText } = render(
        <CertificationReadyModal
          tier="speed_reader"
          currentWPM={650}
          currentVS={45}
          visible={true}
          onTakeTest={mockOnTakeTest}
          onKeepPracticing={mockOnKeepPracticing}
        />
      );

      expect(getByText('Speed Reader')).toBeTruthy();
      expect(getByText("You're Ready!")).toBeTruthy();
    });

    it('displays current VS and WPM progress', () => {
      const { getByText } = render(
        <CertificationReadyModal
          tier="speed_reader"
          currentWPM={650}
          currentVS={45}
          visible={true}
          onTakeTest={mockOnTakeTest}
          onKeepPracticing={mockOnKeepPracticing}
        />
      );

      expect(getByText('45/40 VS')).toBeTruthy();
      expect(getByText('650/900 WPM')).toBeTruthy();
    });

    it('calls onTakeTest when Take Certification Exam is pressed', () => {
      const { getByText } = render(
        <CertificationReadyModal
          tier="speed_reader"
          currentWPM={650}
          currentVS={45}
          visible={true}
          onTakeTest={mockOnTakeTest}
          onKeepPracticing={mockOnKeepPracticing}
        />
      );

      fireEvent.press(getByText('Take Certification Exam'));
      expect(mockOnTakeTest).toHaveBeenCalledTimes(1);
    });

    it('calls onKeepPracticing when Keep Practicing is pressed', () => {
      const { getByText } = render(
        <CertificationReadyModal
          tier="speed_reader"
          currentWPM={650}
          currentVS={45}
          visible={true}
          onTakeTest={mockOnTakeTest}
          onKeepPracticing={mockOnKeepPracticing}
        />
      );

      fireEvent.press(getByText('Keep Practicing'));
      expect(mockOnKeepPracticing).toHaveBeenCalledTimes(1);
    });
  });

  describe('velocity_master tier', () => {
    it('renders tier title', () => {
      const { getByText } = render(
        <CertificationReadyModal
          tier="velocity_master"
          currentWPM={950}
          currentVS={65}
          visible={true}
          onTakeTest={mockOnTakeTest}
          onKeepPracticing={mockOnKeepPracticing}
        />
      );

      expect(getByText('Velocity Master')).toBeTruthy();
    });

    it('displays requirement progress for velocity_master', () => {
      const { getByText } = render(
        <CertificationReadyModal
          tier="velocity_master"
          currentWPM={950}
          currentVS={65}
          visible={true}
          onTakeTest={mockOnTakeTest}
          onKeepPracticing={mockOnKeepPracticing}
        />
      );

      expect(getByText('65/60 VS')).toBeTruthy();
      expect(getByText('950/1200 WPM')).toBeTruthy();
    });
  });

  describe('transcendent tier', () => {
    it('renders tier title', () => {
      const { getByText } = render(
        <CertificationReadyModal
          tier="transcendent"
          currentWPM={1550}
          currentVS={96}
          visible={true}
          onTakeTest={mockOnTakeTest}
          onKeepPracticing={mockOnKeepPracticing}
        />
      );

      expect(getByText('Transcendent')).toBeTruthy();
    });

    it('displays requirement progress for transcendent', () => {
      const { getByText } = render(
        <CertificationReadyModal
          tier="transcendent"
          currentWPM={1250}
          currentVS={96}
          visible={true}
          onTakeTest={mockOnTakeTest}
          onKeepPracticing={mockOnKeepPracticing}
        />
      );

      expect(getByText('96/95 VS')).toBeTruthy();
      // Transcendent tier requires 1500 WPM
      expect(getByText('1250/1500 WPM')).toBeTruthy();
    });
  });

  describe('visibility', () => {
    it('renders nothing when tier is null', () => {
      const { queryByText } = render(
        <CertificationReadyModal
          tier={null}
          currentWPM={0}
          currentVS={0}
          visible={true}
          onTakeTest={mockOnTakeTest}
          onKeepPracticing={mockOnKeepPracticing}
        />
      );

      expect(queryByText("You're Ready!")).toBeNull();
    });
  });

  describe('exam info', () => {
    it('shows exam requirements for speed_reader', () => {
      const { getByText } = render(
        <CertificationReadyModal
          tier="speed_reader"
          currentWPM={650}
          currentVS={45}
          visible={true}
          onTakeTest={mockOnTakeTest}
          onKeepPracticing={mockOnKeepPracticing}
        />
      );

      expect(getByText('Exam Requirements')).toBeTruthy();
      expect(getByText(/1,000 words at 900 WPM/)).toBeTruthy();
      expect(getByText(/80%\+ comprehension/)).toBeTruthy();
    });
  });
});
