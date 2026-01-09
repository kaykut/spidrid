/**
 * Tests for InsightsPanel Component.
 *
 * Horizontal scrolling panel with progress insights and weekly trend chart.
 * Part of the Detailed Journey view (PRD section 5.5).
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { InsightsPanel } from '../../../src/components/journey/InsightsPanel';
import { ThemeProvider } from '../../../src/components/common/ThemeProvider';
import { ProgressInsight, WeeklyTrendPoint } from '../../../src/types/journey';

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// Mock progress insight data
const mockProgressInsight: ProgressInsight = {
  available: true,
  baseline: {
    avgWpm: 200,
    avgComprehension: 70,
    capturedAt: Date.now() - 86400000 * 30, // 30 days ago
    sessionCount: 3,
  },
  current: {
    avgWpm: 350,
    avgComprehension: 85,
  },
  deltaWpm: 150,
  deltaComprehension: 15,
};

const mockProgressInsightUnavailable: ProgressInsight = {
  available: false,
  baseline: null,
  current: {
    avgWpm: 0,
    avgComprehension: 0,
  },
  deltaWpm: 0,
  deltaComprehension: 0,
};

// Mock weekly trend data
const mockWeeklyTrend: WeeklyTrendPoint[] = [
  { weekStart: '2026-01-06', avgWpm: 280, avgComprehension: 75, sessionCount: 3 },
  { weekStart: '2025-12-30', avgWpm: 310, avgComprehension: 78, sessionCount: 4 },
  { weekStart: '2025-12-23', avgWpm: 330, avgComprehension: 82, sessionCount: 5 },
  { weekStart: '2025-12-16', avgWpm: 350, avgComprehension: 85, sessionCount: 3 },
];

const minimalWeeklyTrend: WeeklyTrendPoint[] = [
  { weekStart: '2026-01-06', avgWpm: 300, avgComprehension: 80, sessionCount: 2 },
];

describe('InsightsPanel', () => {
  describe('basic rendering', () => {
    it('renders YOUR PROGRESS card', () => {
      renderWithProviders(
        <InsightsPanel
          progressInsight={mockProgressInsight}
          weeklyTrend={mockWeeklyTrend}
        />
      );

      expect(screen.getByText('YOUR PROGRESS')).toBeTruthy();
    });

    it('renders LAST 4 WEEKS card', () => {
      renderWithProviders(
        <InsightsPanel
          progressInsight={mockProgressInsight}
          weeklyTrend={mockWeeklyTrend}
        />
      );

      expect(screen.getByText('LAST 4 WEEKS')).toBeTruthy();
    });

  });

  describe('progress content', () => {
    it('shows progress label when insight is available', () => {
      renderWithProviders(
        <InsightsPanel
          progressInsight={mockProgressInsight}
          weeklyTrend={mockWeeklyTrend}
        />
      );

      expect(screen.getByText('Since you started:')).toBeTruthy();
    });

    it('shows positive WPM delta with plus sign', () => {
      renderWithProviders(
        <InsightsPanel
          progressInsight={mockProgressInsight}
          weeklyTrend={mockWeeklyTrend}
        />
      );

      expect(screen.getByText('+150')).toBeTruthy();
      expect(screen.getByText('WPM')).toBeTruthy();
    });

    it('shows positive comprehension delta with plus sign and percent', () => {
      renderWithProviders(
        <InsightsPanel
          progressInsight={mockProgressInsight}
          weeklyTrend={mockWeeklyTrend}
        />
      );

      expect(screen.getByText('+15%')).toBeTruthy();
      expect(screen.getByText('comprehension')).toBeTruthy();
    });

    it('shows baseline comparison (Then)', () => {
      renderWithProviders(
        <InsightsPanel
          progressInsight={mockProgressInsight}
          weeklyTrend={mockWeeklyTrend}
        />
      );

      expect(screen.getByText('Then:')).toBeTruthy();
      expect(screen.getByText('200 WPM @ 70%')).toBeTruthy();
    });

    it('shows current stats (Now)', () => {
      renderWithProviders(
        <InsightsPanel
          progressInsight={mockProgressInsight}
          weeklyTrend={mockWeeklyTrend}
        />
      );

      expect(screen.getByText('Now:')).toBeTruthy();
      expect(screen.getByText('350 WPM @ 85%')).toBeTruthy();
    });

    it('shows negative deltas without plus sign', () => {
      const negativeInsight: ProgressInsight = {
        ...mockProgressInsight,
        deltaWpm: -50,
        deltaComprehension: -10,
      };

      renderWithProviders(
        <InsightsPanel
          progressInsight={negativeInsight}
          weeklyTrend={mockWeeklyTrend}
        />
      );

      expect(screen.getByText('-50')).toBeTruthy();
      expect(screen.getByText('-10%')).toBeTruthy();
    });

    it('handles zero baseline values', () => {
      const zeroBaseline: ProgressInsight = {
        available: true,
        baseline: {
          avgWpm: 0,
          avgComprehension: 0,
          capturedAt: Date.now(),
          sessionCount: 3,
        },
        current: {
          avgWpm: 300,
          avgComprehension: 80,
        },
        deltaWpm: 300,
        deltaComprehension: 80,
      };

      renderWithProviders(
        <InsightsPanel
          progressInsight={zeroBaseline}
          weeklyTrend={mockWeeklyTrend}
        />
      );

      expect(screen.getByText('0 WPM @ 0%')).toBeTruthy();
    });
  });

  describe('placeholder content', () => {
    it('shows placeholder when sessionsNeeded is provided', () => {
      renderWithProviders(
        <InsightsPanel
          progressInsight={mockProgressInsight}
          weeklyTrend={mockWeeklyTrend}
          sessionsNeeded={3}
        />
      );

      expect(screen.getByText(/Complete 3 more sessions to unlock insights/)).toBeTruthy();
    });

    it('shows placeholder when insight is not available', () => {
      renderWithProviders(
        <InsightsPanel
          progressInsight={mockProgressInsightUnavailable}
          weeklyTrend={mockWeeklyTrend}
        />
      );

      expect(screen.getByText(/Complete 5 more sessions to unlock insights/)).toBeTruthy();
    });

    it('uses singular form for 1 session needed', () => {
      renderWithProviders(
        <InsightsPanel
          progressInsight={mockProgressInsight}
          weeklyTrend={mockWeeklyTrend}
          sessionsNeeded={1}
        />
      );

      expect(screen.getByText(/Complete 1 more session to unlock insights/)).toBeTruthy();
    });

  });

  describe('trend content', () => {
    it('shows trend content when enough data points', () => {
      renderWithProviders(
        <InsightsPanel
          progressInsight={mockProgressInsight}
          weeklyTrend={mockWeeklyTrend}
        />
      );

      expect(screen.getByText('This week:')).toBeTruthy();
    });

    it('shows latest week stats in trend footer', () => {
      renderWithProviders(
        <InsightsPanel
          progressInsight={mockProgressInsight}
          weeklyTrend={mockWeeklyTrend}
        />
      );

      // The last item in the trend array is the latest week
      // Component uses weeklyTrend.slice(-4) and then data[data.length - 1]
      expect(screen.getAllByText(/350/).length).toBeGreaterThan(0);
    });

    it('shows trend placeholder when not enough data points', () => {
      renderWithProviders(
        <InsightsPanel
          progressInsight={mockProgressInsight}
          weeklyTrend={minimalWeeklyTrend}
          sessionsNeeded={5}
        />
      );

      // Shows placeholder with sessions needed
      expect(screen.getByText(/5 more sessions to see trends/)).toBeTruthy();
    });

    it('shows trend placeholder when sessionsNeeded is positive', () => {
      renderWithProviders(
        <InsightsPanel
          progressInsight={mockProgressInsight}
          weeklyTrend={mockWeeklyTrend}
          sessionsNeeded={2}
        />
      );

      expect(screen.getByText(/2 more sessions to see trends/)).toBeTruthy();
    });
  });

  describe('trend chart rendering', () => {
    it('handles trend with exactly 2 data points', () => {
      const twoPointTrend: WeeklyTrendPoint[] = [
        { weekStart: '2026-01-06', avgWpm: 280, avgComprehension: 75, sessionCount: 3 },
        { weekStart: '2025-12-30', avgWpm: 310, avgComprehension: 78, sessionCount: 4 },
      ];

      renderWithProviders(
        <InsightsPanel
          progressInsight={mockProgressInsight}
          weeklyTrend={twoPointTrend}
        />
      );

      expect(screen.getByText('This week:')).toBeTruthy();
    });

    it('handles trend with same WPM values', () => {
      const flatTrend: WeeklyTrendPoint[] = [
        { weekStart: '2026-01-06', avgWpm: 300, avgComprehension: 80, sessionCount: 3 },
        { weekStart: '2025-12-30', avgWpm: 300, avgComprehension: 80, sessionCount: 3 },
        { weekStart: '2025-12-23', avgWpm: 300, avgComprehension: 80, sessionCount: 3 },
        { weekStart: '2025-12-16', avgWpm: 300, avgComprehension: 80, sessionCount: 3 },
      ];

      renderWithProviders(
        <InsightsPanel
          progressInsight={mockProgressInsight}
          weeklyTrend={flatTrend}
        />
      );

      // Should render without error even with flat data (range = 0 case)
      expect(screen.getByText('This week:')).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('handles empty weekly trend array with progress content visible', () => {
      renderWithProviders(
        <InsightsPanel
          progressInsight={mockProgressInsight}
          weeklyTrend={[]}
          sessionsNeeded={0}
        />
      );

      // When sessionsNeeded=0, progress content shows but trend may show placeholder
      // The component shows "Since you started:" in the progress card
      expect(screen.getByText('Since you started:')).toBeTruthy();
    });

    it('handles sessionsNeeded of 0', () => {
      renderWithProviders(
        <InsightsPanel
          progressInsight={mockProgressInsight}
          weeklyTrend={mockWeeklyTrend}
          sessionsNeeded={0}
        />
      );

      // sessionsNeeded > 0 is false when 0, so should show progress content
      expect(screen.getByText('Since you started:')).toBeTruthy();
    });

    it('handles null baseline in progress insight', () => {
      const nullBaseline: ProgressInsight = {
        available: true,
        baseline: null,
        current: {
          avgWpm: 300,
          avgComprehension: 80,
        },
        deltaWpm: 300,
        deltaComprehension: 80,
      };

      renderWithProviders(
        <InsightsPanel
          progressInsight={nullBaseline}
          weeklyTrend={mockWeeklyTrend}
        />
      );

      // Should use 0 as fallback for null baseline
      expect(screen.getByText('0 WPM @ 0%')).toBeTruthy();
    });
  });
});
