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
  SIMPLE_MILESTONES,
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
  floor?: number;
  color: string;
  trackColor: string;
  isPercentage?: boolean;
}

function ProgressBar({ label, current, target, floor = 0, color, trackColor, isPercentage = false }: ProgressBarProps) {
  const range = target - floor;
  const progress = range > 0 ? Math.min(1, Math.max(0, (current - floor) / range)) : 0;
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
      <View style={[styles.progressBarTrack, { backgroundColor: trackColor }]}>
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
  isLast: boolean;
}

function MilestoneRow({ state, avgWpm, avgComp, certProgress, isLast }: MilestoneRowProps) {
  const { theme } = useTheme();
  const { milestone, status, isNext, index } = state;

  const hasCert = milestone.certTier !== undefined;
  const certDef = hasCert ? getCertDefinition(milestone.certTier!) : null;
  const certEarned = hasCert && certProgress[milestone.certTier!]?.examPassed;

  // Get previous milestone WPM for progress bar floor
  const prevMilestoneWpm = index > 0 ? SIMPLE_MILESTONES[index - 1].wpm : 0;

  // Node sizing - all nodes are the same size for visual consistency
  const nodeSize = SIZES.nodeSize;

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
    <View style={[styles.milestoneRow, isLast && styles.milestoneRowLast]}>
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
              !isCompleted && !isNext && [styles.nodeFuture, { backgroundColor: theme.secondaryBackground }],
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
            { color: isCompleted || isNext ? theme.textColor : JOURNEY_COLORS.textTertiary },
          ]}
        >
          {milestone.name}
        </Text>

        <Text
          style={[
            styles.milestoneThreshold,
            { color: isCompleted || isNext ? `${theme.textColor}B3` : JOURNEY_COLORS.textTertiary },
          ]}
        >
          {milestone.wpm} WPM
        </Text>

        {/* Progress bars for NEXT milestone only */}
        {isNext && (
          <View style={styles.progressBarsContainer}>
            {/* WPM Progress Bar */}
            <ProgressBar
              label="WPM"
              current={avgWpm}
              target={milestone.wpm}
              floor={prevMilestoneWpm}
              color={JOURNEY_COLORS.accent}
              trackColor={theme.trackColor}
            />

            {/* Comprehension bar for cert milestones */}
            {hasCert && certDef && (
              <ProgressBar
                label="Comprehension"
                current={avgComp}
                target={certDef.speedProofMinComp}
                color={JOURNEY_COLORS.success}
                trackColor={theme.trackColor}
                isPercentage
              />
            )}
          </View>
        )}
      </View>

      {/* Cert badge for certification milestones */}
      {hasCert && (
        <View style={styles.certBadge}>
          <Text style={styles.certBadgeIcon}>🏆</Text>
        </View>
      )}
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
  const { theme } = useTheme();

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
        <View style={[styles.lineBackground, { backgroundColor: theme.trackColor }]} />
        <LinearGradient
          colors={[JOURNEY_COLORS.accent, JOURNEY_COLORS.accent]}
          style={[styles.lineFilled, { height: lineHeight } as ViewStyle]}
        />
      </View>

      {/* Milestone rows */}
      {milestoneStates.map((state, idx) => (
        <MilestoneRow
          key={`milestone-${state.index}`}
          state={state}
          avgWpm={avgWpm}
          avgComp={avgComp}
          certProgress={certProgress}
          isLast={idx === milestoneStates.length - 1}
        />
      ))}
    </View>
  );
}

// =============================================================================
// Styles
// =============================================================================

const LINE_LEFT_OFFSET = COMPONENT_SIZES.nodeColumnWidth / 2 - SIZES.pathLineWidth / 2;
const ROW_PADDING_VERTICAL = SPACING.sm;

// Standard line height multiplier when no explicit lineHeight is set
const DEFAULT_LINE_HEIGHT_MULTIPLIER = 1.2;

// Calculate milestone info content height for non-isNext rows (name + threshold with margins)
// Uses actual TYPOGRAPHY values from the styles defined below
const MILESTONE_INFO_HEIGHT =
  Math.ceil((TYPOGRAPHY.levelName.fontSize ?? 18) * DEFAULT_LINE_HEIGHT_MULTIPLIER) + SPACING.xs +
  Math.ceil((TYPOGRAPHY.label.fontSize ?? 13) * DEFAULT_LINE_HEIGHT_MULTIPLIER) + SPACING.xs;

// Row content height is the taller of node or text content
const ROW_CONTENT_HEIGHT = Math.max(SIZES.nodeSize, MILESTONE_INFO_HEIGHT);

// Top padding: container padding + row paddingTop + node center offset from content top
const LINE_TOP_PADDING = SPACING.sm + ROW_PADDING_VERTICAL + SIZES.nodeSize / 2;

// Bottom padding: container padding + row paddingBottom + distance from content bottom to node center
// Since node is at TOP of content (alignItems: flex-start), distance = contentHeight - nodeCenter
const LINE_BOTTOM_PADDING = SPACING.sm + ROW_PADDING_VERTICAL +
  (ROW_CONTENT_HEIGHT - SIZES.nodeSize / 2);

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    position: 'relative',
  },

  // Vertical line - positioned to align with node centers
  lineContainer: {
    position: 'absolute',
    left: SPACING.lg + LINE_LEFT_OFFSET,
    top: LINE_TOP_PADDING,
    bottom: LINE_BOTTOM_PADDING,
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
    paddingVertical: ROW_PADDING_VERTICAL, // Consistent padding keeps nodes aligned
    marginBottom: SPACING.sm,
  },
  milestoneRowLast: {
    marginBottom: 0,
  },

  // Node wrapper
  nodeWrapper: {
    width: COMPONENT_SIZES.nodeColumnWidth,
    height: SIZES.nodeSize,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: JOURNEY_COLORS.accent,
  },
  nodeFuture: {
    backgroundColor: COLORS.transparent,
    borderWidth: 2,
    borderColor: JOURNEY_COLORS.textTertiary,
  },
  nodeIcon: {
    fontSize: 12, // Cert emoji - 1px smaller, balanced padding in both 22px and 26px nodes
    lineHeight: 13,
  },
  nodeCheckmark: {
    fontSize: 11, // Checkmark - proportionally adjusted for new node sizes
    lineHeight: 12,
    color: JOURNEY_COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.bold,
  },

  // Milestone info
  milestoneInfo: {
    flex: 1,
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
    borderRadius: COMPONENT_RADIUS.progressBar,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: COMPONENT_RADIUS.progressBar,
  },

  // Cert badge
  certBadge: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: SPACING.sm,
    paddingRight: SPACING.xs,
  },
  certBadgeIcon: {
    fontSize: 18,
    opacity: 0.7,
  },
});
