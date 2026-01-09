import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { SPACING, COMPONENT_RADIUS, SIZES, COMPONENT_SIZES } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS, LETTER_SPACING } from '../../constants/typography';
import { withOpacity, OPACITY } from '../../utils/colorUtils';
import { JOURNEY_COLORS, OVERLAY_COLORS } from '../../data/themes';
import {
  EarnedCertification,
  getCertificationTierDefinition,
} from '../../types/certificates';
import { useTheme } from '../common/ThemeProvider';

interface CertificationEarnedModalProps {
  certification: EarnedCertification | null;
  visible: boolean;
  onClose: () => void;
  onViewJourney?: () => void;
}

export function CertificationEarnedModal({
  certification,
  visible,
  onClose,
  onViewJourney,
}: CertificationEarnedModalProps) {
  const { theme } = useTheme();

  if (!certification) { return null; }

  const definition = getCertificationTierDefinition(certification.tier);
  if (!definition) { return null; }

  const { wpm, comprehension, velocityScore } = certification.earnedStats;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: theme.secondaryBackground }]}>
          {/* Celebration header */}
          <Text style={[styles.celebrationText, { color: definition.color }]}>
            Certification Earned!
          </Text>

          {/* Icon with glow effect */}
          <View style={styles.iconWrapper}>
            <View
              style={[
                styles.iconGlow,
                { backgroundColor: withOpacity(definition.color, OPACITY.medium) },
              ]}
            />
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: withOpacity(definition.color, OPACITY.light) },
              ]}
            >
              <Text style={styles.icon}>{definition.icon}</Text>
            </View>
          </View>

          <Text style={[styles.title, { color: theme.textColor }]}>
            {definition.name}
          </Text>

          <Text style={[styles.description, { color: theme.textColor }]}>
            {definition.description}
          </Text>

          {/* Stats */}
          <View style={[styles.statsContainer, { backgroundColor: theme.backgroundColor }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: definition.color }]}>
                {Math.round(velocityScore)}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textColor }]}>VS</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.secondaryBackground }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: definition.color }]}>
                {wpm}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textColor }]}>WPM</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.secondaryBackground }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: definition.color }]}>
                {comprehension}%
              </Text>
              <Text style={[styles.statLabel, { color: theme.textColor }]}>Comp</Text>
            </View>
          </View>

          {/* Action buttons */}
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: definition.color }]}
            onPress={onClose}
          >
            <Text style={styles.primaryButtonText}>Awesome!</Text>
          </TouchableOpacity>

          {onViewJourney && (
            <TouchableOpacity
              style={styles.linkButton}
              onPress={onViewJourney}
            >
              <Text style={[styles.linkButtonText, { color: definition.color }]}>
                View Certification Journey
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: OVERLAY_COLORS.modalBackdrop,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  container: {
    width: '100%',
    maxWidth: 340,
    borderRadius: COMPONENT_RADIUS.modal,
    padding: SPACING.xxxl,
    alignItems: 'center',
  },
  celebrationText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: SPACING.xl,
    textTransform: 'uppercase',
    letterSpacing: LETTER_SPACING.extraWide,
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: SPACING.xl,
  },
  iconGlow: {
    position: 'absolute',
    width: COMPONENT_SIZES.celebrationGlow,
    height: COMPONENT_SIZES.celebrationGlow,
    borderRadius: COMPONENT_RADIUS.badge,
    top: -SPACING.xl,
    left: -SPACING.xl,
  },
  iconContainer: {
    width: COMPONENT_SIZES.celebrationIcon,
    height: COMPONENT_SIZES.celebrationIcon,
    borderRadius: COMPONENT_RADIUS.badge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: SIZES.iconMassive,
  },
  title: {
    fontSize: TYPOGRAPHY.pageTitle.fontSize,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  description: {
    ...TYPOGRAPHY.cardSubtitle,
    fontWeight: FONT_WEIGHTS.regular,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: SPACING.xxl,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: COMPONENT_RADIUS.card,
    padding: SPACING.lg,
    marginBottom: SPACING.xxl,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...TYPOGRAPHY.metricLarge,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    opacity: 0.6,
    textTransform: 'uppercase',
    letterSpacing: LETTER_SPACING.normal,
  },
  statDivider: {
    width: 1,
    height: '100%',
    marginHorizontal: SPACING.sm,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  primaryButtonText: {
    color: JOURNEY_COLORS.textPrimary,
    fontSize: TYPOGRAPHY.levelName.fontSize,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  linkButton: {
    paddingVertical: SPACING.sm,
  },
  linkButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: FONT_WEIGHTS.medium,
  },
});
