import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { SPACING, RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import {
  CertificationTier,
  getCertificationTierDefinition,
} from '../../types/certificates';
import { useTheme } from '../common/ThemeProvider';

interface CertificationReadyModalProps {
  tier: CertificationTier | null;
  currentWPM: number;
  currentVS: number;
  visible: boolean;
  onTakeTest: () => void;
  onKeepPracticing: () => void;
}

export function CertificationReadyModal({
  tier,
  currentWPM,
  currentVS,
  visible,
  onTakeTest,
  onKeepPracticing,
}: CertificationReadyModalProps) {
  const { theme } = useTheme();

  if (!tier) { return null; }

  const definition = getCertificationTierDefinition(tier);
  if (!definition) { return null; }

  const vsProgress = Math.min(100, Math.round((currentVS / definition.vsThreshold) * 100));
  const wpmProgress = Math.min(100, Math.round((currentWPM / definition.speedProofWpm) * 100));

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onKeepPracticing}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: theme.secondaryBackground }]}>
          <View style={[styles.iconContainer, { backgroundColor: `${definition.color}20` }]}>
            <Text style={styles.icon}>{definition.icon}</Text>
          </View>

          <Text style={[styles.readyText, { color: definition.color }]}>
            You&apos;re Ready!
          </Text>

          <Text style={[styles.title, { color: theme.textColor }]}>
            {definition.name}
          </Text>

          <Text style={[styles.description, { color: theme.textColor }]}>
            You&apos;ve met all requirements to take the certification exam!
          </Text>

          {/* Requirements Progress */}
          <View style={styles.requirementsContainer}>
            <View style={styles.requirementRow}>
              <Text style={[styles.requirementLabel, { color: theme.textColor }]}>
                Velocity Score
              </Text>
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { backgroundColor: theme.backgroundColor },
                  ]}
                >
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${vsProgress}%`,
                        backgroundColor: vsProgress >= 100 ? '#69db7c' : definition.color,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.requirementValue, { color: theme.textColor }]}>
                  {Math.round(currentVS)}/{definition.vsThreshold} VS
                </Text>
              </View>
            </View>

            <View style={styles.requirementRow}>
              <Text style={[styles.requirementLabel, { color: theme.textColor }]}>
                Speed Proof
              </Text>
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { backgroundColor: theme.backgroundColor },
                  ]}
                >
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${wpmProgress}%`,
                        backgroundColor: wpmProgress >= 100 ? '#69db7c' : definition.color,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.requirementValue, { color: theme.textColor }]}>
                  {currentWPM}/{definition.speedProofWpm} WPM
                </Text>
              </View>
            </View>
          </View>

          {/* Exam info */}
          <View style={[styles.examInfo, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.examInfoTitle, { color: theme.textColor }]}>
              Exam Requirements
            </Text>
            <Text style={[styles.examInfoText, { color: theme.textColor }]}>
              Read {definition.examWords.toLocaleString()} words at {definition.examWpm} WPM
              {'\n'}with {definition.examMinComp}%+ comprehension
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: definition.color }]}
            onPress={onTakeTest}
          >
            <Text style={styles.primaryButtonText}>Take Certification Exam</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: theme.textColor }]}
            onPress={onKeepPracticing}
          >
            <Text style={[styles.secondaryButtonText, { color: theme.textColor }]}>
              Keep Practicing
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  container: {
    width: '100%',
    maxWidth: 340,
    borderRadius: SPACING.xxl,
    padding: SPACING.xxl + SPACING.xs,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: SPACING.huge,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  icon: {
    fontSize: SPACING.huge,
  },
  readyText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  description: {
    ...TYPOGRAPHY.body,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: SPACING.xxl,
  },
  requirementsContainer: {
    width: '100%',
    gap: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requirementLabel: {
    width: 90,
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.medium,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  progressBar: {
    flex: 1,
    height: SIZES.progressBarHeight,
    borderRadius: RADIUS.xs,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: RADIUS.xs,
  },
  requirementValue: {
    ...TYPOGRAPHY.caption,
    width: 70,
    textAlign: 'right',
  },
  examInfo: {
    width: '100%',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.xxl,
  },
  examInfoTitle: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.medium,
    marginBottom: SPACING.xs,
  },
  examInfoText: {
    ...TYPOGRAPHY.caption,
    opacity: 0.7,
    lineHeight: 18,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  primaryButtonText: {
    color: '#ffffff',
    ...TYPOGRAPHY.cardTitle,
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: SPACING.md + 2,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: {
    ...TYPOGRAPHY.button,
    fontWeight: FONT_WEIGHTS.medium,
    opacity: 0.7,
  },
});
