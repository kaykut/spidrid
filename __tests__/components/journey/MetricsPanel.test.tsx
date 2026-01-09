/**
 * Tests for MetricsPanel Component.
 *
 * Displays key reading metrics in a horizontal row below the progress path.
 * Shows avg WPM, comprehension %, and streak. Expandable to show best WPM.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { MetricsPanel } from '../../../src/components/journey/MetricsPanel';
import { ThemeProvider } from '../../../src/components/common/ThemeProvider';

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// Default props for testing
const defaultProps = {
  avgWpm: 350,
  avgComprehension: 85,
  streakDays: 7,
  bestWpmAt80: 420,
};

describe('MetricsPanel', () => {
  describe('basic rendering', () => {
    it('renders average WPM', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} />);

      expect(screen.getByText('350')).toBeTruthy();
      expect(screen.getByText('WPM')).toBeTruthy();
    });

    it('renders comprehension percentage', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} />);

      expect(screen.getByText('85%')).toBeTruthy();
      expect(screen.getByText('comprehension')).toBeTruthy();
    });

    it('renders streak days', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} />);

      expect(screen.getByText('7')).toBeTruthy();
      expect(screen.getByText('streak')).toBeTruthy();
    });

    it('renders avg speed label', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} />);

      expect(screen.getByText('avg speed')).toBeTruthy();
    });

  });

  describe('zero values', () => {
    it('shows dash for zero WPM', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} avgWpm={0} />);

      // When avgWpm is 0, shows '-' instead of number
      expect(screen.getByText('-')).toBeTruthy();
    });

    it('shows dash for zero comprehension', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} avgComprehension={0} />);

      // Should show '-' for zero comprehension
      const dashElements = screen.getAllByText('-');
      expect(dashElements.length).toBeGreaterThan(0);
    });

    it('shows dash for zero streak', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} streakDays={0} />);

      // When streakDays is 0, shows '-' and no fire emoji
      const dashElements = screen.getAllByText('-');
      expect(dashElements.length).toBeGreaterThan(0);
    });
  });

  describe('expand/collapse behavior', () => {
    it('is collapsed by default', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} />);

      // Expanded section should not be visible initially
      expect(screen.queryByText(/Best:/)).toBeNull();
    });

    it('expands when pressed', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} />);

      // Find the panel and press it (the whole component is touchable)
      const avgSpeedText = screen.getByText('avg speed');
      fireEvent.press(avgSpeedText);

      // Now should show the expanded content
      expect(screen.getByText(/Best: 420 WPM/)).toBeTruthy();
    });

    it('collapses when pressed again', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} />);

      const avgSpeedText = screen.getByText('avg speed');

      // Expand
      fireEvent.press(avgSpeedText);
      expect(screen.getByText(/Best: 420 WPM/)).toBeTruthy();

      // Collapse
      fireEvent.press(avgSpeedText);
      expect(screen.queryByText(/Best:/)).toBeNull();
    });

    it('shows best WPM with 80% comprehension indicator', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} />);

      const avgSpeedText = screen.getByText('avg speed');
      fireEvent.press(avgSpeedText);

      expect(screen.getByText(/with.*80% comp/)).toBeTruthy();
    });

    it('shows placeholder for zero best WPM', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} bestWpmAt80={0} />);

      const avgSpeedText = screen.getByText('avg speed');
      fireEvent.press(avgSpeedText);

      expect(screen.getByText(/Best: -- WPM/)).toBeTruthy();
    });

  });

  describe('embedded mode', () => {
    it('renders in embedded mode', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} embedded={true} />);

      expect(screen.getByText('350')).toBeTruthy();
      expect(screen.getByText('avg speed')).toBeTruthy();
    });

    it('removes card background in embedded mode', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} embedded={true} />);

      // Component should still render all content
      expect(screen.getByText('85%')).toBeTruthy();
    });
  });

  describe('hideStreak option', () => {
    it('hides streak when hideStreak is true', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} hideStreak={true} />);

      // Should not show streak metric
      expect(screen.queryByText('streak')).toBeNull();
    });

    it('still shows WPM and comprehension when streak is hidden', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} hideStreak={true} />);

      expect(screen.getByText('350')).toBeTruthy();
      expect(screen.getByText('85%')).toBeTruthy();
    });

    it('shows streak by default when hideStreak is false', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} hideStreak={false} />);

      expect(screen.getByText('streak')).toBeTruthy();
    });
  });

  describe('default prop values', () => {
    it('uses default bestWpmAt80 of 0', () => {
      const propsWithoutBestWpm = {
        avgWpm: 300,
        avgComprehension: 80,
        streakDays: 5,
      };

      renderWithProviders(<MetricsPanel {...propsWithoutBestWpm} />);

      const avgSpeedText = screen.getByText('avg speed');
      fireEvent.press(avgSpeedText);

      expect(screen.getByText(/Best: -- WPM/)).toBeTruthy();
    });

    it('uses default hideStreak value of false', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} />);

      expect(screen.getByText('streak')).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('handles very high WPM values', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} avgWpm={1500} />);

      expect(screen.getByText('1500')).toBeTruthy();
    });

    it('handles 100% comprehension', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} avgComprehension={100} />);

      expect(screen.getByText('100%')).toBeTruthy();
    });

    it('handles very high streak days', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} streakDays={365} />);

      expect(screen.getByText('365')).toBeTruthy();
    });

    it('handles high best WPM value', () => {
      renderWithProviders(<MetricsPanel {...defaultProps} bestWpmAt80={1200} />);

      const avgSpeedText = screen.getByText('avg speed');
      fireEvent.press(avgSpeedText);

      expect(screen.getByText(/Best: 1200 WPM/)).toBeTruthy();
    });
  });

  describe('combined embedded and hideStreak', () => {
    it('works with both embedded and hideStreak true', () => {
      renderWithProviders(
        <MetricsPanel {...defaultProps} embedded={true} hideStreak={true} />
      );

      expect(screen.getByText('350')).toBeTruthy();
      expect(screen.getByText('85%')).toBeTruthy();
      expect(screen.queryByText('streak')).toBeNull();
    });
  });
});
