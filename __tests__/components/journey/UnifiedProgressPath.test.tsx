/**
 * Tests for UnifiedProgressPath Component.
 *
 * Horizontal path visualization showing 6 WPM milestones with nodes, labels,
 * and certification indicators.
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { UnifiedProgressPath } from '../../../src/components/journey/UnifiedProgressPath';
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

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

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

const defaultProps = {
  avgWpm: 350,
  certProgress: defaultCertProgress,
};

describe('UnifiedProgressPath', () => {
  it('renders all milestone WPM values', () => {
    renderWithProviders(<UnifiedProgressPath {...defaultProps} />);

    expect(screen.getByText('300')).toBeTruthy();
    expect(screen.getByText('450')).toBeTruthy();
    expect(screen.getByText('600')).toBeTruthy();
    expect(screen.getByText('900')).toBeTruthy();
    expect(screen.getByText('1200')).toBeTruthy();
    expect(screen.getByText('1500')).toBeTruthy();
  });

  it('renders all milestone names', () => {
    renderWithProviders(<UnifiedProgressPath {...defaultProps} />);

    expect(screen.getByText('Pace')).toBeTruthy();
    expect(screen.getByText('Quick')).toBeTruthy();
    expect(screen.getByText('Swift')).toBeTruthy();
    expect(screen.getByText('Rapid')).toBeTruthy();
    expect(screen.getByText('Blaze')).toBeTruthy();
    expect(screen.getByText('Apex')).toBeTruthy();
  });

  it('shows checkmarks for completed milestones', () => {
    renderWithProviders(<UnifiedProgressPath {...defaultProps} avgWpm={500} />);

    const checkmarks = screen.getAllByText('✓');
    expect(checkmarks.length).toBeGreaterThanOrEqual(1);
  });

  it('shows no checkmarks when all milestones are future', () => {
    renderWithProviders(<UnifiedProgressPath {...defaultProps} avgWpm={200} />);

    expect(screen.queryByText('✓')).toBeNull();
  });

  it('shows all but one checkmark at max WPM', () => {
    renderWithProviders(<UnifiedProgressPath {...defaultProps} avgWpm={1500} />);

    const checkmarks = screen.getAllByText('✓');
    expect(checkmarks.length).toBe(SIMPLE_MILESTONES.length - 1);
  });

  it('renders in embedded mode', () => {
    renderWithProviders(
      <UnifiedProgressPath {...defaultProps} embedded={true} />
    );

    expect(screen.getByText('300')).toBeTruthy();
    expect(screen.getByText('Pace')).toBeTruthy();
  });
});
