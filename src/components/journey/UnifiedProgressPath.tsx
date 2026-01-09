/**
 * UnifiedProgressPath
 *
 * Horizontal path visualization showing 6 WPM milestones with nodes, labels,
 * and certification indicators. Uses flexbox for reliable centering.
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SPACING, SIZES, COMPONENT_RADIUS, SHADOWS, COMPONENT_SIZES } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { JOURNEY_COLORS, COLORS } from '../../data/themes';
import {
  SimpleMilestone,
  JourneyCertTier,
  JourneyCertProgress,
  SIMPLE_MILESTONES,
} from '../../types/journey';
import {
  getMilestoneStates,
  calculatePathProgress,
} from '../../utils/journeyCalculations';
import { useTheme } from '../common/ThemeProvider';
import { GlowAnimation } from './animations/GlowAnimation';

// =============================================================================
// Types
// =============================================================================

export interface UnifiedProgressPathProps {
  avgWpm: number;
  certProgress: Record<JourneyCertTier, JourneyCertProgress>;
  onNodeTap?: (milestone: SimpleMilestone) => void;
  /** When true, removes container padding (for embedding in a card) */
  embedded?: boolean;
}

interface TooltipData {
  visible: boolean;
  x: number;
  y: number;
  content: string;
}

type NodeStatus = 'completed' | 'current' | 'future';

// =============================================================================
// Component
// =============================================================================

export function UnifiedProgressPath({
  avgWpm,
  certProgress,
  onNodeTap,
  embedded = false,
}: UnifiedProgressPathProps) {
  const { theme } = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const [tooltip, setTooltip] = useState<TooltipData>({
    visible: false,
    x: 0,
    y: 0,
    content: '',
  });

  // Calculate milestone states and progress using shared utilities
  const milestoneStates = useMemo(() => getMilestoneStates(avgWpm), [avgWpm]);
  const progressPercent = useMemo(() => calculatePathProgress(avgWpm), [avgWpm]);

  const getNodeStatus = useCallback(
    (index: number): NodeStatus => {
      const state = milestoneStates[index];
      return state?.status || 'future';
    },
    [milestoneStates]
  );

  const handleNodePress = useCallback(
    (milestone: SimpleMilestone, index: number, status: NodeStatus, event: { nativeEvent: { pageX: number; pageY: number } }) => {
      let content: string;
      if (status === 'completed') {
        content = `${milestone.name} achieved!`;
      } else if (status === 'current') {
        if (index === SIMPLE_MILESTONES.length - 1) {
          content = `${milestone.name} - Max level!`;
        } else {
          const next = SIMPLE_MILESTONES[index + 1];
          content = `${Math.round(avgWpm)} WPM - ${next.wpm - Math.round(avgWpm)} to ${next.name}`;
        }
      } else {
        content = `${milestone.wpm} WPM to unlock`;
      }

      setTooltip({
        visible: true,
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY - 60,
        content,
      });
      onNodeTap?.(milestone);
    },
    [avgWpm, onNodeTap]
  );

  const handleCertPress = useCallback((_certTier: JourneyCertTier) => {
    router.push('/(tabs)/journey');
  }, []);

  const dismissTooltip = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  const renderNode = (milestone: SimpleMilestone, index: number) => {
    const status = getNodeStatus(index);
    const certTier = milestone.certTier;
    const hasCert = certTier !== undefined;
    const nodeSize = status === 'current' ? SIZES.currentNodeSize : SIZES.nodeSize;

    return (
      <View key={`milestone-${index}`} style={styles.nodeColumn}>
        <GlowAnimation
          active={status === 'current'}
          color={JOURNEY_COLORS.accent}
          glowSize={8}
        >
          <Pressable
            onPress={(event) => handleNodePress(milestone, index, status, event)}
            style={[
              styles.node,
              {
                width: nodeSize,
                height: nodeSize,
                borderRadius: nodeSize / 2,
              },
              status === 'completed' && styles.nodeCompleted,
              status === 'current' && [styles.nodeCurrent, SHADOWS.glow(JOURNEY_COLORS.accent)],
              status === 'future' && [styles.nodeFuture, { borderColor: theme.secondaryBackground }],
            ]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {status === 'completed' && (
              <Text style={styles.checkmarkIcon}>✓</Text>
            )}
          </Pressable>
        </GlowAnimation>

        <Text
          style={[
            styles.wpmLabel,
            { color: status === 'current' ? JOURNEY_COLORS.textPrimary : JOURNEY_COLORS.textSecondary },
          ]}
          numberOfLines={1}
        >
          {milestone.wpm}
        </Text>

        <Text
          style={[
            styles.nameLabel,
            { color: status === 'current' ? JOURNEY_COLORS.textSecondary : JOURNEY_COLORS.textTertiary },
          ]}
          numberOfLines={1}
        >
          {milestone.name}
        </Text>

        {hasCert && certTier && (
          <Pressable
            onPress={() => handleCertPress(certTier)}
            style={styles.certStarContainer}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text
              style={[
                styles.certStar,
                certProgress[certTier].examUnlocked
                  ? { color: JOURNEY_COLORS.warmAccent }
                  : { color: JOURNEY_COLORS.textTertiary },
                certProgress[certTier].examPassed && styles.certStarEarned,
              ]}
            >
              {certProgress[certTier].examPassed ? '\u2713' : '\u2605'}
            </Text>
          </Pressable>
        )}
      </View>
    );
  };

  // Calculate line position offsets based on embedded mode
  const horizontalPadding = embedded ? 0 : SPACING.lg;
  const lineOffset = horizontalPadding + 25; // 25 = half of nodeColumn width

  return (
    <View style={[styles.container, embedded && styles.containerEmbedded]}>
      {/* Progress line - absolutely positioned behind nodes */}
      <View style={[styles.lineContainer, { left: lineOffset, right: lineOffset }]}>
        <View style={styles.lineBackground} />
        <LinearGradient
          colors={[JOURNEY_COLORS.accent, JOURNEY_COLORS.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.lineFilled, { width: `${progressPercent}%` }]}
        />
      </View>

      {/* Nodes row - flexbox centered */}
      <View style={styles.nodesRow}>
        {SIMPLE_MILESTONES.map((milestone, index) => renderNode(milestone, index))}
      </View>

      {/* Tooltip Modal */}
      <Modal visible={tooltip.visible} transparent animationType="fade" onRequestClose={dismissTooltip}>
        <Pressable style={styles.tooltipOverlay} onPress={dismissTooltip}>
          <View
            style={[
              styles.tooltipContainer,
              {
                left: Math.max(SPACING.sm, Math.min(tooltip.x - 80, screenWidth - 180)),
                top: tooltip.y,
              },
            ]}
          >
            <Text style={styles.tooltipText}>{tooltip.content}</Text>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  containerEmbedded: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },

  // Progress line
  lineContainer: {
    position: 'absolute',
    top: SIZES.currentNodeSize / 2 - SIZES.pathLineWidth / 2,
    height: SIZES.pathLineWidth,
    // left and right are set dynamically based on embedded prop
  },
  lineBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: JOURNEY_COLORS.surfaceLight,
    borderRadius: SIZES.pathLineWidth / 2,
  },
  lineFilled: {
    height: '100%',
    borderRadius: SIZES.pathLineWidth / 2,
  },

  // Nodes row - simple flexbox
  nodesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  // Each node column
  nodeColumn: {
    alignItems: 'center',
    width: COMPONENT_SIZES.nodeColumnWidth,
  },

  // Node circle
  node: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeCompleted: {
    backgroundColor: JOURNEY_COLORS.accent,
  },
  nodeCurrent: {
    backgroundColor: JOURNEY_COLORS.accent,
  },
  nodeFuture: {
    backgroundColor: COLORS.transparent,
    borderWidth: 2,
  },
  checkmarkIcon: {
    fontSize: SIZES.iconMicro,
    color: JOURNEY_COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.bold,
  },

  // Labels
  wpmLabel: {
    ...TYPOGRAPHY.label,
    fontSize: TYPOGRAPHY.label.fontSize,
    fontWeight: FONT_WEIGHTS.medium,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  nameLabel: {
    ...TYPOGRAPHY.labelSmall,
    fontSize: TYPOGRAPHY.microText.fontSize,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },

  // Certification star
  certStarContainer: {
    marginTop: SPACING.xs,
    minHeight: SIZES.iconSm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  certStar: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    opacity: 0.8,
  },
  certStarEarned: {
    color: JOURNEY_COLORS.success,
    opacity: 1,
  },

  // Tooltip
  tooltipOverlay: {
    flex: 1,
    backgroundColor: COLORS.transparent,
  },
  tooltipContainer: {
    position: 'absolute',
    backgroundColor: JOURNEY_COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: COMPONENT_RADIUS.chip,
    maxWidth: 180,
    minWidth: 120,
    ...SHADOWS.md,
  },
  tooltipText: {
    ...TYPOGRAPHY.label,
    color: JOURNEY_COLORS.textPrimary,
    textAlign: 'center',
  },
});
