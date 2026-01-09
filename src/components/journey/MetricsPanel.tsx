/**
 * MetricsPanel
 *
 * Displays key reading metrics in a horizontal row below the progress path.
 * Shows avg WPM, comprehension %, and streak. Expandable to show best WPM.
 *
 * Part of the unified Journey view.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { SPACING, COMPONENT_RADIUS, COMPONENT_SPACING, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { JOURNEY_COLORS, COLORS } from '../../data/themes';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// =============================================================================
// Types
// =============================================================================

export interface MetricsPanelProps {
  /** Average WPM from last 3 sessions */
  avgWpm: number;
  /** Average comprehension % from last 5 sessions */
  avgComprehension: number;
  /** Current streak in days */
  streakDays: number;
  /** Best WPM with at least 80% comprehension */
  bestWpmAt80?: number;
  /** When true, removes card background (for embedding in a card) */
  embedded?: boolean;
  /** When true, hides the streak metric and its divider */
  hideStreak?: boolean;
}

// =============================================================================
// Component
// =============================================================================

export function MetricsPanel({
  avgWpm,
  avgComprehension,
  streakDays,
  bestWpmAt80 = 0,
  embedded = false,
  hideStreak = false,
}: MetricsPanelProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleExpanded}
      style={[styles.container, embedded && styles.containerEmbedded]}
    >
      {/* Main Metrics Row */}
      <View style={styles.metricsRow}>
        <MetricItem
          value={avgWpm > 0 ? `${avgWpm}` : '-'}
          unit="WPM"
          label="avg speed"
        />
        <View style={styles.divider} />
        <MetricItem
          value={avgComprehension > 0 ? `${avgComprehension}%` : '-'}
          label="comprehension"
        />
        {!hideStreak && (
          <>
            <View style={styles.divider} />
            <MetricItem
              value={streakDays > 0 ? `${streakDays}` : '-'}
              icon={streakDays > 0 ? '\uD83D\uDD25' : undefined}
              label="streak"
            />
          </>
        )}
      </View>

      {/* Expanded Section */}
      {expanded && (
        <View style={styles.expandedSection}>
          <View style={styles.expandedDivider} />
          <Text style={styles.expandedText}>
            {bestWpmAt80 > 0
              ? `Best: ${bestWpmAt80} WPM (with \u226580% comp)`
              : 'Best: -- WPM (with \u226580% comp)'}
          </Text>
        </View>
      )}

      {/* Expand indicator */}
      <View style={styles.expandIndicator}>
        <Text style={styles.expandIndicatorText}>
          {expanded ? '\u25B2' : '\u25BC'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// =============================================================================
// Sub-components
// =============================================================================

interface MetricItemProps {
  value: string;
  unit?: string;
  label: string;
  icon?: string;
}

function MetricItem({ value, unit, label, icon }: MetricItemProps) {
  return (
    <View style={styles.metricItem}>
      <View style={styles.metricValueRow}>
        {icon && <Text style={styles.metricIcon}>{icon}</Text>}
        <Text style={styles.metricValue}>{value}</Text>
        {unit && <Text style={styles.metricUnit}>{unit}</Text>}
      </View>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles = StyleSheet.create({
  container: {
    backgroundColor: JOURNEY_COLORS.surface,
    borderRadius: COMPONENT_RADIUS.card,
    padding: COMPONENT_SPACING.cardPadding,
    position: 'relative',
  },
  containerEmbedded: {
    backgroundColor: COLORS.transparent,
    borderRadius: 0,
    padding: 0,
    paddingTop: SPACING.md,
  },

  // Metrics Row
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  metricItem: {
    flex: 1,
    alignItems: 'center',
  },

  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  metricIcon: {
    fontSize: TYPOGRAPHY.button.fontSize,
    marginRight: SPACING.xs,
  },

  metricValue: {
    ...TYPOGRAPHY.metric,
    fontSize: TYPOGRAPHY.metric.fontSize,
    fontWeight: FONT_WEIGHTS.semibold,
    fontVariant: ['tabular-nums'],
    color: JOURNEY_COLORS.textPrimary,
  },

  metricUnit: {
    ...TYPOGRAPHY.labelSmall,
    color: JOURNEY_COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },

  metricLabel: {
    ...TYPOGRAPHY.labelSmall,
    color: JOURNEY_COLORS.textSecondary,
    marginTop: SPACING.xs,
  },

  divider: {
    width: 1,
    height: SIZES.iconMd,
    backgroundColor: JOURNEY_COLORS.surfaceLight,
  },

  // Expanded Section
  expandedSection: {
    marginTop: SPACING.md,
  },

  expandedDivider: {
    height: 1,
    backgroundColor: JOURNEY_COLORS.surfaceLight,
    marginBottom: SPACING.md,
  },

  expandedText: {
    ...TYPOGRAPHY.body,
    color: JOURNEY_COLORS.textSecondary,
    textAlign: 'center',
  },

  // Expand Indicator
  expandIndicator: {
    position: 'absolute',
    bottom: SPACING.xs,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  expandIndicatorText: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    color: JOURNEY_COLORS.textTertiary,
  },
});
