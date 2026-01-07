/**
 * Tests for ProgressRing component - Milestone 8
 *
 * Tests circular progress indicator rendering.
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { ProgressRing } from '../../../src/components/certifications';

// Mock ThemeProvider
jest.mock('../../../src/components/common/ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      backgroundColor: '#1a1a1a',
      textColor: '#ffffff',
      secondaryBackground: '#2a2a2a',
      accentColor: '#4dabf7',
      crosshairColor: '#333333',
    },
  }),
}));

describe('ProgressRing', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      const { getByText } = render(
        <ProgressRing progress={0.5} size={100} strokeWidth={8} />
      );

      expect(getByText('50%')).toBeTruthy();
    });

    it('displays correct percentage for 0%', () => {
      const { getByText } = render(
        <ProgressRing progress={0} size={100} strokeWidth={8} />
      );

      expect(getByText('0%')).toBeTruthy();
    });

    it('displays correct percentage for 100%', () => {
      const { getByText } = render(
        <ProgressRing progress={1} size={100} strokeWidth={8} />
      );

      expect(getByText('100%')).toBeTruthy();
    });

    it('displays correct percentage for 75%', () => {
      const { getByText } = render(
        <ProgressRing progress={0.75} size={100} strokeWidth={8} />
      );

      expect(getByText('75%')).toBeTruthy();
    });

    it('rounds percentage correctly', () => {
      const { getByText } = render(
        <ProgressRing progress={0.333} size={100} strokeWidth={8} />
      );

      expect(getByText('33%')).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('handles progress greater than 1', () => {
      const { getByText } = render(
        <ProgressRing progress={1.5} size={100} strokeWidth={8} />
      );

      // Should clamp or show > 100%
      expect(getByText('150%')).toBeTruthy();
    });

    it('handles negative progress', () => {
      const { getByText } = render(
        <ProgressRing progress={-0.5} size={100} strokeWidth={8} />
      );

      // Should handle negative values
      expect(getByText('-50%')).toBeTruthy();
    });
  });

  describe('customization', () => {
    it('renders with different sizes', () => {
      const { getByText } = render(
        <ProgressRing progress={0.5} size={200} strokeWidth={10} />
      );

      expect(getByText('50%')).toBeTruthy();
    });

    it('renders with custom color', () => {
      const { getByText } = render(
        <ProgressRing progress={0.5} size={100} strokeWidth={8} color="#ff0000" />
      );

      expect(getByText('50%')).toBeTruthy();
    });
  });
});
