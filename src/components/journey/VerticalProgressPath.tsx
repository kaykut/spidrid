/**
 * VerticalProgressPath
 *
 * Vertical journey visualization with 6 WPM milestones.
 * Shows progress from 300 to 1500 WPM with certification markers.
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SPACING, SIZES, COMPONENT_RADIUS, COMPONENT_SIZES } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { JOURNEY_COLORS, COLORS } from '../../data/themes';
import {
  JourneyCertTier,
  JourneyCertProgress,
} from '../../types/journey';
import {
  getMilestoneStates,
  calculatePathProgress,
  getCertDefinition,
  MilestoneState,
} from '../../utils/journeyCalculations';
import { useTheme } from '../common/ThemeProvider';
import { GlowAnimation } from './animations/GlowAnimation';

// =============================================================================
// Types
// =============================================================================

export interface VerticalProgressPathProps {
  avgWpm: number;
  avgComp: number;
  certProgress: Record<JourneyCertTier, JourneyCertProgress>;
}

// =============================================================================
// Sub-components
// =============================================================================

interface ProgressBarProps {
  label: string;
  current: number;
  target: number;
  color: string;
  isPercentage?: boolean;
}

function ProgressBar({ label, current, target, color, isPercentage = false }: ProgressBarProps) {
  const progress = Math.min(1, current / target);
  const displayCurrent = isPercentage ? `${Math.round(current)}%` : Math.round(current);
  const displayTarget = isPercentage ? `${target}%` : target;

  return (
    <View style={styles.progressBarWrapper}>
      <View style={styles.progressBarHeader}>
        <Text style={styles.progressBarLabel}>{label}</Text>
        <Text style={styles.progressBarValue}>
          {displayCurrent} / {displayTarget}
        </Text>
      </View>
      <View style={styles.progressBarTrack}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${progress * 100}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
}

interface MilestoneRowProps {
  state: MilestoneState;
  avgWpm: number;
  avgComp: number;
  certProgress: Record<JourneyCertTier, JourneyCertProgress>;
}

function MilestoneRow({ state, avgWpm, avgComp, certProgress }: MilestoneRowProps) {
  const { theme } = useTheme();
  const { milestone, status, isNext } = state;

  const hasCert = milestone.certTier !== undefined;
  const certDef = hasCert ? getCertDefinition(milestone.certTier!) : null;
  const certEarned = hasCert && certProgress[milestone.certTier!]?.examPassed;

  // Node sizing
  const nodeSize = status === 'current' || isNext ? SIZES.currentNodeSize : SIZES.nodeSize;

  // Get the icon to display in completed nodes
  const getNodeContent = () => {
    if (status === 'completed' || status === 'current') {
      if (certEarned && certDef) {
        return <Text style={[styles.nodeIcon, { color: certDef.color }]}>{certDef.icon}</Text>;
      }
      return <Text style={styles.nodeCheckmark}>✓</Text>;
    }
    return null;
  };

  // Determine if this milestone is completed (includes current position)
  const isCompleted = status === 'completed' || status === 'current';

  return (
    <View style={styles.milestoneRow}>
      {/* Node circle */}
      <View style={styles.nodeWrapper}>
        <GlowAnimation active={isNext} color={JOURNEY_COLORS.accent} glowSize={6}>
          <View
            style={[
              styles.node,
              {
                width: nodeSize,
                height: nodeSize,
                borderRadius: nodeSize / 2,
              },
              isCompleted && styles.nodeCompleted,
              isNext && styles.nodeNext,
              !isCompleted && !isNext && [styles.nodeFuture, { borderColor: theme.secondaryBackground }],
            ]}
          >
            {getNodeContent()}
          </View>
        </GlowAnimation>
      </View>

      {/* Milestone info */}
      <View style={styles.milestoneInfo}>
        <Text
          style={[
            styles.milestoneName,
            { color: isCompleted || isNext ? JOURNEY_COLORS.textPrimary : JOURNEY_COLORS.textTertiary },
          ]}
        >
          {milestone.name}
        </Text>

        <Text
          style={[
            styles.milestoneThreshold,
            { color: isCompleted || isNext ? JOURNEY_COLORS.textSecondary : JOURNEY_COLORS.textTertiary },
          ]}
        >
          {milestone.wpm} WPM
          {hasCert && certDef && ` • ${certDef.speedProofMinComp}% comp`}
        </Text>

        {/* Progress bars for NEXT milestone only */}
        {isNext && (
          <View style={styles.progressBarsContainer}>
            {/* WPM Progress Bar */}
            <ProgressBar
              label="WPM"
              current={avgWpm}
              target={milestone.wpm}
              color={JOURNEY_COLORS.accent}
            />

            {/* Comprehension bar for cert milestones */}
            {hasCert && certDef && (
              <ProgressBar
                label="Comprehension"
                current={avgComp}
                target={certDef.speedProofMinComp}
                color={JOURNEY_COLORS.success}
                isPercentage
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
}

// =============================================================================
// Main Component
// =============================================================================

export function VerticalProgressPath({
  avgWpm,
  avgComp,
  certProgress,
}: VerticalProgressPathProps) {
  // Calculate milestone states using shared utility
  const milestoneStates = useMemo(() => getMilestoneStates(avgWpm), [avgWpm]);

  // Calculate progress for gradient line
  const progressPercent = useMemo(() => calculatePathProgress(avgWpm), [avgWpm]);

  // Calculate the height of the filled line based on milestone positions
  // The line should fill to the current progress point between milestones
  const lineHeight = useMemo(() => {
    // Total height is determined by number of milestones
    // Each milestone row is roughly the same height, so we use percentage
    return `${progressPercent}%`;
  }, [progressPercent]);

  return (
    <View style={styles.container}>
      {/* Vertical connecting line */}
      <View style={styles.lineContainer}>
        <View style={styles.lineBackground} />
        <LinearGradient
          colors={[JOURNEY_COLORS.accent, JOURNEY_COLORS.accent]}
          style={[styles.lineFilled, { height: lineHeight } as ViewStyle]}
        />
      </View>

      {/* Milestone rows */}
      {milestoneStates.map((state) => (
        <MilestoneRow
          key={`milestone-${state.index}`}
          state={state}
          avgWpm={avgWpm}
          avgComp={avgComp}
          certProgress={certProgress}
        />
      ))}
    </View>
  );
}

// =============================================================================
// Styles
// =============================================================================

const LINE_LEFT_OFFSET = COMPONENT_SIZES.nodeColumnWidth / 2 - SIZES.pathLineWidth / 2;

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    position: 'relative',
  },

  // Vertical line
  lineContainer: {
    position: 'absolute',
    left: SPACING.lg + LINE_LEFT_OFFSET,
    top: SPACING.lg + SIZES.currentNodeSize / 2,
    bottom: SPACING.lg + SIZES.nodeSize / 2,
    width: SIZES.pathLineWidth,
  },
  lineBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: JOURNEY_COLORS.surfaceLight,
    borderRadius: SIZES.pathLineWidth / 2,
  },
  lineFilled: {
    width: '100%',
    borderRadius: SIZES.pathLineWidth / 2,
  },

  // Milestone row
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.xl,
  },

  // Node wrapper
  nodeWrapper: {
    width: COMPONENT_SIZES.nodeColumnWidth,
    alignItems: 'center',
    marginRight: SPACING.md,
  },

  // Node circle
  node: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: JOURNEY_COLORS.surfaceLight,
  },
  nodeCompleted: {
    backgroundColor: JOURNEY_COLORS.accent,
  },
  nodeNext: {
    backgroundColor: JOURNEY_COLORS.surfaceLight,
    borderWidth: 2,
    borderColor: JOURNEY_COLORS.accent,
  },
  nodeFuture: {
    backgroundColor: COLORS.transparent,
    borderWidth: 2,
  },
  nodeIcon: {
    fontSize: TYPOGRAPHY.sectionTitle.fontSize,
  },
  nodeCheckmark: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    color: JOURNEY_COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.bold,
  },

  // Milestone info
  milestoneInfo: {
    flex: 1,
    paddingTop: SPACING.xs,
  },
  milestoneName: {
    fontSize: TYPOGRAPHY.levelName.fontSize,
    fontWeight: FONT_WEIGHTS.semibold,
    marginBottom: SPACING.xs,
  },
  milestoneThreshold: {
    ...TYPOGRAPHY.label,
    marginBottom: SPACING.xs,
  },

  // Progress bars
  progressBarsContainer: {
    marginTop: SPACING.sm,
    gap: SPACING.sm,
  },
  progressBarWrapper: {
    marginBottom: SPACING.xs,
  },
  progressBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  progressBarLabel: {
    ...TYPOGRAPHY.labelSmall,
    color: JOURNEY_COLORS.textSecondary,
  },
  progressBarValue: {
    ...TYPOGRAPHY.labelSmall,
    color: JOURNEY_COLORS.textSecondary,
  },
  progressBarTrack: {
    height: SIZES.progressBarHeight,
    backgroundColor: JOURNEY_COLORS.surfaceLight,
    borderRadius: COMPONENT_RADIUS.progressBar,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: COMPONENT_RADIUS.progressBar,
  },
});
