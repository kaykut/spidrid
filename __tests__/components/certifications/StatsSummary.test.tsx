/**
 * Tests for StatsSummary component - Milestone 8
 *
 * Tests stats display (articles, words, comprehension, WPM).
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { StatsSummary } from '../../../src/components/certifications';

// Mock ThemeProvider
jest.mock('../../../src/components/common/ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      backgroundColor: '#1a1a1a',
      textColor: '#ffffff',
      secondaryBackground: '#2a2a2a',
      secondaryBackgroundGradient: '#3a3a3a',
      accentColor: '#4dabf7',
    },
  }),
}));

describe('StatsSummary', () => {
  const defaultStats = {
    articlesRead: 25,
    totalWords: 50000,
    averageComprehension: 85,
    bestWPM: 750,
  };

  describe('rendering stats', () => {
    it('displays articles read count', () => {
      const { getByText } = render(<StatsSummary {...defaultStats} />);

      expect(getByText('25')).toBeTruthy();
      expect(getByText('Articles')).toBeTruthy();
    });

    it('displays words read count formatted', () => {
      const { getByText } = render(<StatsSummary {...defaultStats} />);

      // 50000 should be formatted as 50.0K
      expect(getByText('50.0K')).toBeTruthy();
      expect(getByText('Words')).toBeTruthy();
    });

    it('displays average comprehension', () => {
      const { getByText } = render(<StatsSummary {...defaultStats} />);

      expect(getByText('85%')).toBeTruthy();
      expect(getByText('Comprehension')).toBeTruthy();
    });

    it('displays best WPM', () => {
      const { getByText } = render(<StatsSummary {...defaultStats} />);

      expect(getByText('750')).toBeTruthy();
      expect(getByText('Best WPM')).toBeTruthy();
    });
  });

  describe('formatting', () => {
    it('formats large word counts with M suffix', () => {
      const { getByText } = render(
        <StatsSummary {...defaultStats} totalWords={1500000} />
      );

      expect(getByText('1.5M')).toBeTruthy();
    });

    it('formats medium word counts with K suffix', () => {
      const { getByText } = render(
        <StatsSummary {...defaultStats} totalWords={5000} />
      );

      expect(getByText('5.0K')).toBeTruthy();
    });

    it('formats small word counts as plain numbers', () => {
      const { getByText } = render(
        <StatsSummary {...defaultStats} totalWords={500} />
      );

      expect(getByText('500')).toBeTruthy();
    });

    it('handles zero values', () => {
      const { getByText } = render(
        <StatsSummary
          articlesRead={0}
          totalWords={0}
          averageComprehension={0}
          bestWPM={0}
        />
      );

      expect(getByText('0%')).toBeTruthy();
    });
  });
});
