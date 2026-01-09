import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager, DimensionValue } from 'react-native';
import { SPACING, COMPONENT_RADIUS, COMPONENT_SPACING } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { withOpacity, OPACITY } from '../../utils/colorUtils';
import { JOURNEY_COLORS, OVERLAY_COLORS } from '../../data/themes';
import {
  CertificationTier,
  CertificationTierProgress,
  getCertificationTierDefinition,
} from '../../types/certificates';
import { useTheme } from '../common/ThemeProvider';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface TierCardProps {
  tier: CertificationTier;
  progress: CertificationTierProgress;
  currentWPM?: number;
  currentVS?: number;
  onStartCertification?: () => void;
}

export function TierCard({
  tier,
  progress,
  currentWPM = 0,
  currentVS = 0,
  onStartCertification,
}: TierCardProps) {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const definition = getCertificationTierDefinition(tier);
  if (!definition) { return null; }

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  // Calculate progress values for display
  const vsProgress = Math.min(1, currentVS / definition.vsThreshold);
  const speedProgress = Math.min(1, currentWPM / definition.speedProofWpm);

  // Calculate overall progress (0-1) based on milestones achieved
  const getOverallProgress = (): number => {
    let completed = 0;
    if (progress.vsUnlocked) {completed++;}
    if (progress.speedProofAchieved) {completed++;}
    if (progress.examPassed) {completed++;}
    return completed / 3;
  };

  const overallProgress = getOverallProgress();

  const isUnlocked = progress.vsUnlocked || progress.speedProofAchieved || progress.examPassed;
  const isInProgress = isUnlocked && !progress.examPassed;

  // Derive status text and color from progress state
  const getStatus = (): { text: string; color: string } => {
    if (progress.examPassed) {
      return { text: 'Earned', color: JOURNEY_COLORS.success };
    }
    if (progress.examUnlocked) {
      return { text: 'Ready for Exam', color: definition.color };
    }
    if (isInProgress) {
      return { text: 'In Progress', color: theme.accentColor };
    }
    return { text: 'Locked', color: theme.textColor };
  };

  const status = getStatus();

  // Derive exam status for expanded view
  const getExamStatus = (): { text: string; width: DimensionValue } => {
    if (progress.examPassed) {
      return { text: 'Passed', width: '100%' };
    }
    if (progress.examUnlocked) {
      return { text: 'Unlocked', width: '50%' };
    }
    return { text: 'Locked', width: '0%' };
  };
  const examStatus = getExamStatus();

  const getNextStep = () => {
    if (progress.examPassed) { return null; }

    if (progress.examUnlocked) {
      return 'Take the certification exam!';
    }

    const steps: string[] = [];

    if (!progress.vsUnlocked && currentVS < definition.vsThreshold) {
      const needed = definition.vsThreshold - currentVS;
      steps.push(`Increase Velocity Score by ${Math.ceil(needed)} points`);
    }

    if (!progress.speedProofAchieved && currentWPM < definition.speedProofWpm) {
      steps.push(`Achieve ${definition.speedProofWpm} WPM with 70%+ comprehension`);
    }

    return steps[0] || 'Meet both VS and Speed Proof requirements';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleExpanded}
      disabled={!isUnlocked}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: theme.secondaryBackground },
          !isUnlocked && styles.locked,
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: withOpacity(definition.color, OPACITY.light) }]}>
            <Text style={styles.icon}>{definition.icon}</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.title, { color: theme.textColor }]}>
              {definition.name}
            </Text>
            <Text style={[styles.status, { color: status.color }]}>
              {status.text}
            </Text>
          </View>
          <View style={styles.progressIndicator}>
            <Text style={[styles.progressText, { color: definition.color }]}>
              {Math.round(overallProgress * 100)}%
            </Text>
          </View>
        </View>

        {/* Expanded content */}
        {expanded && (
          <View style={styles.expandedContent}>
            {/* Progress bars */}
            <View style={styles.progressBars}>
              <ProgressBar
                label="Velocity Score"
                value={vsProgress}
                valueText={`${Math.round(currentVS)}/${definition.vsThreshold} VS`}
                color={definition.color}
                achieved={progress.vsUnlocked}
              />
              <ProgressBar
                label="Speed Proof"
                value={speedProgress}
                valueText={`${currentWPM}/${definition.speedProofWpm} WPM`}
                color={definition.color}
                achieved={progress.speedProofAchieved}
              />
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarHeader}>
                  <Text style={[styles.progressBarLabel, { color: theme.textColor }]}>
                    Certification Exam
                  </Text>
                  <Text style={[styles.progressBarValue, { color: theme.textColor }]}>
                    {examStatus.text}
                  </Text>
                </View>
                <View style={[styles.progressBarTrack, { backgroundColor: theme.backgroundColor }]}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: examStatus.width,
                        backgroundColor: progress.examPassed ? JOURNEY_COLORS.success : definition.color,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>

            {/* Requirements summary */}
            <View style={[styles.requirementsSummary, { backgroundColor: theme.backgroundColor }]}>
              <Text style={[styles.requirementsTitle, { color: theme.textColor }]}>
                Requirements
              </Text>
              <Text style={[styles.requirementText, { color: theme.textColor }]}>
                {progress.vsUnlocked ? '✓' : '○'} VS ≥ {definition.vsThreshold}
              </Text>
              <Text style={[styles.requirementText, { color: theme.textColor }]}>
                {progress.speedProofAchieved ? '✓' : '○'} {definition.speedProofWpm} WPM @ {definition.speedProofMinComp}%+ comprehension
              </Text>
              <Text style={[styles.requirementText, { color: theme.textColor }]}>
                {progress.examPassed ? '✓' : '○'} Pass exam: {definition.examWpm} WPM @ {definition.examMinComp}%+
              </Text>
            </View>

            {/* Next step */}
            {!progress.examPassed && (
              <View style={[styles.nextStepContainer, { backgroundColor: theme.backgroundColor }]}>
                <Text style={[styles.nextStepLabel, { color: theme.textColor }]}>
                  Next step:
                </Text>
                <Text style={[styles.nextStepText, { color: definition.color }]}>
                  {getNextStep()}
                </Text>
              </View>
            )}

            {/* Action button for ready state */}
            {progress.examUnlocked && !progress.examPassed && onStartCertification && (
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: definition.color }]}
                onPress={onStartCertification}
              >
                <Text style={styles.actionButtonText}>Take Certification Exam</Text>
              </TouchableOpacity>
            )}

            {/* Earned badge */}
            {progress.examPassed && progress.earnedAt && (
              <View style={styles.earnedBadge}>
                <Text style={[styles.earnedText, { color: JOURNEY_COLORS.success }]}>
                  Earned on {new Date(progress.earnedAt).toLocaleDateString()}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

interface ProgressBarProps {
  label: string;
  value: number;
  valueText: string;
  color: string;
  achieved?: boolean;
}

function ProgressBar({ label, value, valueText, color, achieved }: ProgressBarProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarHeader}>
        <Text style={[styles.progressBarLabel, { color: theme.textColor }]}>
          {achieved ? '✓ ' : ''}{label}
        </Text>
        <Text style={[styles.progressBarValue, { color: theme.textColor }]}>{valueText}</Text>
      </View>
      <View style={[styles.progressBarTrack, { backgroundColor: theme.backgroundColor }]}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${Math.min(100, value * 100)}%`, backgroundColor: achieved ? JOURNEY_COLORS.success : color },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: COMPONENT_RADIUS.card,
    padding: COMPONENT_SPACING.cardPadding,
    marginBottom: SPACING.md,
  },
  locked: {
    opacity: 0.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: SPACING.massive,
    height: SPACING.massive,
    borderRadius: COMPONENT_RADIUS.badge,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: SPACING.xxl,
  },
  headerText: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.levelName.fontSize,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  status: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
    marginTop: SPACING.xs,
  },
  progressIndicator: {
    marginLeft: SPACING.md,
  },
  progressText: {
    fontSize: TYPOGRAPHY.levelName.fontSize,
    fontWeight: FONT_WEIGHTS.bold,
  },
  expandedContent: {
    marginTop: SPACING.lg,
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: OVERLAY_COLORS.dividerLight,
  },
  progressBars: {
    gap: SPACING.md,
  },
  progressBarContainer: {
    marginBottom: SPACING.xs,
  },
  progressBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  progressBarLabel: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
  },
  progressBarValue: {
    ...TYPOGRAPHY.caption,
    opacity: 0.7,
  },
  progressBarTrack: {
    height: COMPONENT_RADIUS.progressBar,
    borderRadius: COMPONENT_RADIUS.progressBar,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: COMPONENT_RADIUS.progressBar,
  },
  requirementsSummary: {
    marginTop: SPACING.lg,
    padding: SPACING.md,
    borderRadius: COMPONENT_RADIUS.chip,
  },
  requirementsTitle: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.medium,
    marginBottom: SPACING.sm,
  },
  requirementText: {
    ...TYPOGRAPHY.caption,
    opacity: 0.8,
    marginBottom: SPACING.xs,
  },
  nextStepContainer: {
    marginTop: SPACING.lg,
    padding: SPACING.md,
    borderRadius: COMPONENT_RADIUS.chip,
  },
  nextStepLabel: {
    ...TYPOGRAPHY.caption,
    opacity: 0.7,
    marginBottom: SPACING.xs,
  },
  nextStepText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.medium,
  },
  actionButton: {
    marginTop: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
  },
  actionButtonText: {
    color: JOURNEY_COLORS.textPrimary,
    ...TYPOGRAPHY.button,
  },
  earnedBadge: {
    marginTop: SPACING.lg,
    alignItems: 'center',
  },
  earnedText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.medium,
  },
});
