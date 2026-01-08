/**
 * InsightsPanel
 *
 * Horizontal scrolling panel with progress insights and weekly trend chart.
 * Part of the Detailed Journey view (PRD section 5.5).
 *
 * Card specs:
 * - Width: ~80% screen width (next card peeks)
 * - Height: 180pt fixed
 * - Spacing: 12pt
 * - Background: #1A1A1A
 * - Border: 1pt #2A2A2A
 * - Radius: 16pt
 * - Horizontal scroll with snap
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SPACING, COMPONENT_RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { ProgressInsight, WeeklyTrendPoint } from '../../types/journey';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Card dimensions per spec
const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const CARD_HEIGHT = 180;
const CARD_SPACING = 12;
const CARD_BORDER_WIDTH = 1;

export interface InsightsPanelProps {
  /** Progress insight data (baseline vs current) */
  progressInsight: ProgressInsight;
  /** Weekly trend data points */
  weeklyTrend: WeeklyTrendPoint[];
  /** Sessions needed before insights are available (show placeholder if <5) */
  sessionsNeeded?: number;
}

export function InsightsPanel({
  progressInsight,
  weeklyTrend,
  sessionsNeeded,
}: InsightsPanelProps) {
  const showPlaceholder = sessionsNeeded !== undefined && sessionsNeeded > 0;

  const renderProgressCard = () => {
    if (showPlaceholder) {
      return <PlaceholderContent sessionsNeeded={sessionsNeeded!} />;
    }
    if (progressInsight.available) {
      return <ProgressContent insight={progressInsight} />;
    }
    return <PlaceholderContent sessionsNeeded={5} />;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        snapToAlignment="start"
      >
        {/* Card 1: Your Progress */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>&#x1F680;</Text>
            <Text style={styles.cardTitle}>YOUR PROGRESS</Text>
          </View>

          {renderProgressCard()}
        </View>

        {/* Card 2: Recent Trend */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>&#x1F4C8;</Text>
            <Text style={styles.cardTitle}>LAST 4 WEEKS</Text>
          </View>

          {showPlaceholder || weeklyTrend.length < 2 ? (
            <TrendPlaceholder sessionsNeeded={showPlaceholder ? sessionsNeeded! : 5} />
          ) : (
            <TrendContent weeklyTrend={weeklyTrend} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

/**
 * Progress card content showing baseline vs current stats
 */
interface ProgressContentProps {
  insight: ProgressInsight;
}

function ProgressContent({ insight }: ProgressContentProps) {
  const { baseline, current, deltaWpm, deltaComprehension } = insight;

  const formatDelta = (value: number, suffix: string = '') => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${Math.round(value)}${suffix}`;
  };

  return (
    <View style={styles.progressContent}>
      <Text style={styles.progressLabel}>Since you started:</Text>

      <View style={styles.deltaRow}>
        <View style={styles.deltaItem}>
          <Text
            style={[
              styles.deltaValue,
              { color: deltaWpm >= 0 ? JOURNEY_COLORS.success : JOURNEY_COLORS.low },
            ]}
          >
            {formatDelta(deltaWpm)}
          </Text>
          <Text style={styles.deltaUnit}>WPM</Text>
        </View>
        <View style={styles.deltaItem}>
          <Text
            style={[
              styles.deltaValue,
              { color: deltaComprehension >= 0 ? JOURNEY_COLORS.success : JOURNEY_COLORS.low },
            ]}
          >
            {formatDelta(deltaComprehension, '%')}
          </Text>
          <Text style={styles.deltaUnit}>comprehension</Text>
        </View>
      </View>

      <View style={styles.comparisonRow}>
        <View style={styles.comparisonItem}>
          <Text style={styles.comparisonLabel}>Then:</Text>
          <Text style={styles.comparisonValue}>
            {baseline?.avgWpm || 0} WPM @ {baseline?.avgComprehension || 0}%
          </Text>
        </View>
        <View style={styles.comparisonItem}>
          <Text style={styles.comparisonLabel}>Now:</Text>
          <Text style={[styles.comparisonValue, { color: JOURNEY_COLORS.accent }]}>
            {current.avgWpm} WPM @ {current.avgComprehension}%
          </Text>
        </View>
      </View>
    </View>
  );
}

/**
 * Mini line chart for weekly trend
 */
interface TrendContentProps {
  weeklyTrend: WeeklyTrendPoint[];
}

function TrendContent({ weeklyTrend }: TrendContentProps) {
  // Take last 4 weeks
  const data = weeklyTrend.slice(-4);
  const latestWeek = data[data.length - 1];

  // Calculate chart dimensions
  const chartWidth = CARD_WIDTH - SPACING.xl * 2;
  const chartHeight = 60;
  const padding = 4;

  // Get min/max for scaling
  const wpmValues = data.map((d) => d.avgWpm);
  const minWpm = Math.min(...wpmValues) * 0.95;
  const maxWpm = Math.max(...wpmValues) * 1.05;
  const range = maxWpm - minWpm || 1;

  // Calculate points for the line
  const points = data.map((point, index) => {
    const x = padding + ((chartWidth - padding * 2) / (data.length - 1)) * index;
    const y = chartHeight - padding - ((point.avgWpm - minWpm) / range) * (chartHeight - padding * 2);
    return { x, y, ...point };
  });

  // Generate SVG-like path as simple lines (using View elements)
  const renderChart = () => {
    return (
      <View style={[styles.chartContainer, { width: chartWidth, height: chartHeight }]}>
        {/* Line segments */}
        {points.map((point, index) => {
          if (index === 0) {return null;}
          const prev = points[index - 1];
          const dx = point.x - prev.x;
          const dy = point.y - prev.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);

          return (
            <View
              key={`line-${index}`}
              style={[
                styles.chartLine,
                {
                  width: length,
                  left: prev.x,
                  top: prev.y - 1,
                  transform: [{ rotate: `${angle}deg` }],
                  transformOrigin: 'left center',
                },
              ]}
            />
          );
        })}

        {/* Data points */}
        {points.map((point, index) => (
          <View
            key={`point-${index}`}
            style={[
              styles.chartPoint,
              {
                left: point.x - 4,
                top: point.y - 4,
                backgroundColor: index === points.length - 1
                  ? JOURNEY_COLORS.accent
                  : JOURNEY_COLORS.textSecondary,
              },
            ]}
          />
        ))}

        {/* Baseline */}
        <View style={styles.chartBaseline} />
      </View>
    );
  };

  return (
    <View style={styles.trendContent}>
      {renderChart()}

      <View style={styles.trendFooter}>
        <Text style={styles.trendLabel}>This week:</Text>
        <Text style={styles.trendValue}>
          {latestWeek?.avgWpm || 0} WPM {' '}&bull;{' '} {latestWeek?.avgComprehension || 0}%
        </Text>
      </View>
    </View>
  );
}

/**
 * Placeholder content when not enough sessions
 */
interface PlaceholderContentProps {
  sessionsNeeded: number;
}

function PlaceholderContent({ sessionsNeeded }: PlaceholderContentProps) {
  return (
    <View style={styles.placeholderContent}>
      <Text style={styles.placeholderText}>
        Complete {sessionsNeeded} more session{sessionsNeeded !== 1 ? 's' : ''} to unlock insights
      </Text>
      <View style={styles.placeholderDots}>
        {Array.from({ length: 5 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.placeholderDot,
              i < 5 - sessionsNeeded && styles.placeholderDotFilled,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

/**
 * Trend placeholder with chart skeleton
 */
function TrendPlaceholder({ sessionsNeeded }: PlaceholderContentProps) {
  const chartWidth = CARD_WIDTH - SPACING.xl * 2;

  return (
    <View style={styles.placeholderContent}>
      {/* Skeleton chart */}
      <View style={[styles.skeletonChart, { width: chartWidth }]}>
        <View style={styles.skeletonLine} />
      </View>
      <Text style={styles.placeholderText}>
        {sessionsNeeded > 0
          ? `${sessionsNeeded} more session${sessionsNeeded !== 1 ? 's' : ''} to see trends`
          : 'Not enough data yet'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.md,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    gap: CARD_SPACING,
  },

  // Card Base
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: JOURNEY_COLORS.surface,
    borderRadius: COMPONENT_RADIUS.card,
    borderWidth: CARD_BORDER_WIDTH,
    borderColor: JOURNEY_COLORS.surfaceLight,
    padding: SPACING.xl,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  cardIcon: {
    fontSize: 16,
  },
  cardTitle: {
    ...TYPOGRAPHY.labelSmall,
    fontWeight: FONT_WEIGHTS.semibold,
    letterSpacing: 1,
    color: JOURNEY_COLORS.textSecondary,
  },

  // Progress Content
  progressContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  progressLabel: {
    ...TYPOGRAPHY.label,
    color: JOURNEY_COLORS.textSecondary,
  },
  deltaRow: {
    flexDirection: 'row',
    gap: SPACING.xxl,
  },
  deltaItem: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: SPACING.xs,
  },
  deltaValue: {
    fontSize: 28,
    fontWeight: FONT_WEIGHTS.bold,
    fontVariant: ['tabular-nums'],
  },
  deltaUnit: {
    ...TYPOGRAPHY.label,
    color: JOURNEY_COLORS.textSecondary,
  },
  comparisonRow: {
    gap: SPACING.xs,
  },
  comparisonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  comparisonLabel: {
    ...TYPOGRAPHY.labelSmall,
    color: JOURNEY_COLORS.textTertiary,
    width: 36,
  },
  comparisonValue: {
    ...TYPOGRAPHY.label,
    color: JOURNEY_COLORS.textSecondary,
    fontVariant: ['tabular-nums'],
  },

  // Trend Content
  trendContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  chartContainer: {
    position: 'relative',
  },
  chartLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: JOURNEY_COLORS.accent,
    borderRadius: 1,
  },
  chartPoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  chartBaseline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: JOURNEY_COLORS.surfaceLight,
  },
  trendFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  trendLabel: {
    ...TYPOGRAPHY.labelSmall,
    color: JOURNEY_COLORS.textSecondary,
  },
  trendValue: {
    ...TYPOGRAPHY.label,
    fontWeight: FONT_WEIGHTS.medium,
    color: JOURNEY_COLORS.accent,
    fontVariant: ['tabular-nums'],
  },

  // Placeholder Content
  placeholderContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.md,
  },
  placeholderText: {
    ...TYPOGRAPHY.label,
    color: JOURNEY_COLORS.textTertiary,
    textAlign: 'center',
  },
  placeholderDots: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  placeholderDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: JOURNEY_COLORS.surfaceLight,
  },
  placeholderDotFilled: {
    backgroundColor: JOURNEY_COLORS.accent,
  },

  // Skeleton Chart
  skeletonChart: {
    height: 40,
    justifyContent: 'center',
  },
  skeletonLine: {
    height: 2,
    backgroundColor: JOURNEY_COLORS.surfaceLight,
    borderRadius: 1,
  },
});
