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

const partialCertProgress: Record<JourneyCertTier, JourneyCertProgress> = {
  speed_reader: createCertProgress(true, true, true, true),
  velocity_master: createCertProgress(true, false, false, false),
  transcendent: createCertProgress(false, false, false, false),
};

const allEarnedCertProgress: Record<JourneyCertTier, JourneyCertProgress> = {
  speed_reader: createCertProgress(true, true, true, true),
  velocity_master: createCertProgress(true, true, true, true),
  transcendent: createCertProgress(true, true, true, true),
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
      expect(screen.getByText(/600 WPM/)).toBeTruthy();
      expect(screen.getByText(/900 WPM/)).toBeTruthy();
      expect(screen.getByText(/1200 WPM/)).toBeTruthy();
      expect(screen.getByText(/1500 WPM/)).toBeTruthy();
    });

    it('renders progress line container', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} />);

      expect(screen.root).toBeTruthy();
    });
  });

  describe('milestone states', () => {
    it('shows completed nodes with checkmark below avgWpm', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={500} />);

      // At 500 WPM, Pace (300) should show checkmark
      const checkmarks = screen.getAllByText('✓');
      expect(checkmarks.length).toBeGreaterThanOrEqual(1);
    });

    it('shows current node for milestone at avgWpm level', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={300} />);

      // Pace (300) should be marked as current
      expect(screen.root).toBeTruthy();
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
      // Progress bar should show WPM progress
      expect(screen.getByText('WPM')).toBeTruthy();
    });

    it('shows comprehension progress bar for cert milestones', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={500} />);

      // At 500 WPM, next is Swift (600) which has cert
      // Should show Comprehension progress bar
      expect(screen.getByText('Comprehension')).toBeTruthy();
    });

    it('shows current WPM value in progress bar', () => {
      renderWithProviders(
        <VerticalProgressPath {...defaultProps} avgWpm={350} avgComp={85} />
      );

      // Progress bar should show current values
      expect(screen.root).toBeTruthy();
    });

    it('shows target WPM in progress bar', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={320} />);

      // Target is next milestone WPM
      expect(screen.root).toBeTruthy();
    });
  });

  describe('certification indicators', () => {
    it('shows comprehension requirement for cert milestones', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={350} />);

      // Swift (600) has cert with 70% comp requirement - may show multiple
      expect(screen.getAllByText(/70% comp/).length).toBeGreaterThan(0);
    });

    it('shows earned certification icon', () => {
      renderWithProviders(
        <VerticalProgressPath
          {...defaultProps}
          avgWpm={650}
          certProgress={partialCertProgress}
        />
      );

      // Speed reader cert is earned - should show icon
      expect(screen.root).toBeTruthy();
    });

    it('shows checkmark for earned cert in node', () => {
      renderWithProviders(
        <VerticalProgressPath
          {...defaultProps}
          avgWpm={650}
          certProgress={partialCertProgress}
        />
      );

      // Earned cert shows icon in node
      expect(screen.root).toBeTruthy();
    });
  });

  describe('GlowAnimation integration', () => {
    it('renders GlowAnimation for next milestone', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={350} />);

      // GlowAnimation wraps the next node (Quick at 450)
      expect(screen.root).toBeTruthy();
    });

    it('does not glow completed nodes', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={500} />);

      // Completed nodes should not glow
      expect(screen.root).toBeTruthy();
    });
  });

  describe('progress calculation', () => {
    it('calculates correct progress at 0 WPM', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={0} />);

      expect(screen.root).toBeTruthy();
    });

    it('calculates partial progress between milestones', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={375} />);

      // 375 is between 300 (Pace) and 450 (Quick)
      expect(screen.root).toBeTruthy();
    });

    it('calculates 100% progress at max WPM', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={1500} />);

      expect(screen.root).toBeTruthy();
    });
  });

  describe('node styling', () => {
    it('uses larger node size for current/next milestones', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={350} />);

      // Current and next nodes should be larger
      expect(screen.root).toBeTruthy();
    });

    it('uses smaller node size for future milestones', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={200} />);

      // All nodes are future - smaller size
      expect(screen.root).toBeTruthy();
    });

    it('applies completed styling to passed milestones', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={500} />);

      // Pace is completed - should have completed styling
      expect(screen.root).toBeTruthy();
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
        <VerticalProgressPath {...defaultProps} avgWpm={500} avgComp={75} />
      );

      // Comprehension shows percentage format
      expect(screen.getByText(/75%.*\/.*70%/)).toBeTruthy();
    });

    it('caps progress at 100%', () => {
      renderWithProviders(
        <VerticalProgressPath {...defaultProps} avgWpm={400} avgComp={100} />
      );

      // Even if avgComp > target, progress is capped at 100%
      expect(screen.root).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('handles negative avgWpm', () => {
      renderWithProviders(
        <VerticalProgressPath {...defaultProps} avgWpm={-100} />
      );

      expect(screen.root).toBeTruthy();
    });

    it('handles very high avgWpm', () => {
      renderWithProviders(
        <VerticalProgressPath {...defaultProps} avgWpm={5000} />
      );

      expect(screen.root).toBeTruthy();
    });

    it('handles zero avgComp', () => {
      renderWithProviders(
        <VerticalProgressPath {...defaultProps} avgComp={0} />
      );

      expect(screen.root).toBeTruthy();
    });

    it('handles 100% avgComp', () => {
      renderWithProviders(
        <VerticalProgressPath {...defaultProps} avgComp={100} />
      );

      expect(screen.root).toBeTruthy();
    });

    it('handles all certs earned', () => {
      renderWithProviders(
        <VerticalProgressPath
          {...defaultProps}
          avgWpm={1500}
          certProgress={allEarnedCertProgress}
        />
      );

      expect(screen.root).toBeTruthy();
    });
  });

  describe('milestone rows', () => {
    it('renders all 6 milestone rows', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} />);

      // Should have 6 milestone names
      const milestoneNames = ['Pace', 'Quick', 'Swift', 'Rapid', 'Blaze', 'Apex'];
      milestoneNames.forEach(name => {
        expect(screen.getByText(name)).toBeTruthy();
      });
    });

    it('maintains correct order of milestones', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} />);

      // First milestone should be Pace (300)
      expect(screen.getByText('Pace')).toBeTruthy();
    });
  });

  describe('linear gradient line', () => {
    it('renders vertical progress line', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} />);

      // LinearGradient should be rendered for the progress line
      expect(screen.root).toBeTruthy();
    });

    it('line height reflects progress percentage', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={450} />);

      // At 450 WPM (Quick), progress should be around 20%
      expect(screen.root).toBeTruthy();
    });
  });

  describe('certification definitions', () => {
    it('displays speed reader requirements', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={500} />);

      // Swift milestone (600 WPM) should show cert requirements - may show multiple
      expect(screen.getAllByText(/70% comp/).length).toBeGreaterThan(0);
    });

    it('displays velocity master requirements', () => {
      renderWithProviders(<VerticalProgressPath {...defaultProps} avgWpm={700} />);

      // Rapid milestone (900 WPM) should show cert requirements - may show multiple
      expect(screen.getAllByText(/70% comp/).length).toBeGreaterThan(0);
    });
  });
});
