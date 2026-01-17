/**
 * Tests for VerticalProgressPath Component.
 *
 * Vertical journey visualization with 6 WPM milestones.
 * Shows progress from 300 to 1500 WPM with certification markers.
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { VerticalProgressPath } from '../../../src/components/journey/VerticalProgressPath';
import { ThemeProvider } from '../../../src/components/common/ThemeProvider';
import { JourneyCertTier, JourneyCertProgress, SIMPLE_MILESTONES } from '../../../src/types/journey';

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children, ...props }: { children?: React.ReactNode }) => (
    <div data-testid="linear-gradient" {...props}>
      {children}
    </div>
  ),
}));

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// Mock certification progress
const createCertProgress = (
  vsUnlocked: boolean = false,
  speedProofAchieved: boolean = false,
  examUnlocked: boolean = false,
  examPassed: boolean = false
): JourneyCertProgress => ({
  vsUnlocked,
  speedProofAchieved,
  examUnlocked,
  examPassed,
});

const defaultCertProgress: Record<JourneyCertTier, JourneyCertProgress> = {
  speed_reader: createCertProgress(),
  velocity_master: createCertProgress(),
  transcendent: createCertProgress(),
};

// Default props for testing
const defaultProps = {
  avgWpm: 350,
  avgComp: 80,
  certProgress: defaultCertProgress,
};

describe('VerticalProgressPath', () => {
  describe('basic rendering', () => {
    it('renders all milestone names', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} />);

      expect(screen.getByText('Pace')).toBeTruthy();
      expect(screen.getByText('Quick')).toBeTruthy();
      expect(screen.getByText('Swift')).toBeTruthy();
      expect(screen.getByText('Rapid')).toBeTruthy();
      expect(screen.getByText('Blaze')).toBeTruthy();
      expect(screen.getByText('Apex')).toBeTruthy();
    });

    it('renders milestone WPM thresholds', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} />);

      expect(screen.getByText(/300 WPM/)).toBeTruthy();
      expect(screen.getByText(/450 WPM/)).toBeTruthy();
      expect(screen.getByText(/900 WPM/)).toBeTruthy();
      expect(screen.getByText(/1200 WPM/)).toBeTruthy();
      expect(screen.getByText(/1500 WPM/)).toBeTruthy();
    });
  });

  describe('milestone states', () => {
    it('shows completed nodes with checkmark below avgWpm', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={500} />);

      // At 500 WPM, Pace (300) should show checkmark
      const checkmarks = screen.getAllByText('✓');
      expect(checkmarks.length).toBeGreaterThanOrEqual(1);
    });

    it('shows future nodes for milestones above avgWpm', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={200} />);

      // All milestones are future - no checkmarks
      expect(screen.queryByText('✓')).toBeNull();
    });

    it('all nodes completed at max WPM', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={1500} />);

      // At max WPM, all milestones are completed or current - checkmarks shown
      const checkmarks = screen.getAllByText('✓');
      expect(checkmarks.length).toBeGreaterThanOrEqual(SIMPLE_MILESTONES.length - 1);
    });
  });

  describe('progress bars for next milestone', () => {
    it('shows WPM progress bar for next milestone', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={320} />);

      // At 320 WPM, next milestone is Quick (450)
      expect(screen.getByText('WPM')).toBeTruthy();
    });

    it('shows comprehension progress bar for cert milestones', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={850} />);

      // At 850 WPM, next is Rapid (900) which has speed_reader cert
      expect(screen.getByText('Comprehension')).toBeTruthy();
    });
  });

  describe('ProgressBar component', () => {
    it('renders with correct label', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={320} />);

      expect(screen.getByText('WPM')).toBeTruthy();
    });

    it('shows current/target format', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={320} />);

      // Should show "320 / 450" format for WPM bar
      expect(screen.getByText(/320.*\/.*450/)).toBeTruthy();
    });

    it('shows percentage format for comprehension', () => {
      renderWithProviders(
        <VerticalProgressPath {...defaultProps} avgWpm={850} avgComp={75} />
      );

      // Comprehension shows percentage format
      expect(screen.getByText(/75%.*\/.*70%/)).toBeTruthy();
    });
  });
});
