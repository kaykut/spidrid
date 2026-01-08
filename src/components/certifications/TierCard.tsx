import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SPACING, RADIUS, COMPONENT_RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
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

  const getStatusText = () => {
    if (progress.examPassed) { return 'Earned'; }
    if (progress.examUnlocked) { return 'Ready for Exam'; }
    if (progress.vsUnlocked || progress.speedProofAchieved) { return 'In Progress'; }
    return 'Locked';
  };

  const getStatusColor = () => {
    if (progress.examPassed) { return '#69db7c'; }
    if (progress.examUnlocked) { return definition.color; }
    if (progress.vsUnlocked || progress.speedProofAchieved) { return theme.accentColor; }
    return theme.textColor;
  };

  const isUnlocked = progress.vsUnlocked || progress.speedProofAchieved || progress.examPassed;

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
          <View style={[styles.iconContainer, { backgroundColor: `${definition.color}20` }]}>
            <Text style={styles.icon}>{definition.icon}</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.title, { color: theme.textColor }]}>
              {definition.name}
            </Text>
            <Text style={[styles.status, { color: getStatusColor() }]}>
              {getStatusText()}
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
                    {progress.examPassed ? 'Passed' : progress.examUnlocked ? 'Unlocked' : 'Locked'}
                  </Text>
                </View>
                <View style={[styles.progressBarTrack, { backgroundColor: theme.backgroundColor }]}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: progress.examPassed ? '100%' : progress.examUnlocked ? '50%' : '0%',
                        backgroundColor: progress.examPassed ? '#69db7c' : definition.color,
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
                <Text style={[styles.earnedText, { color: '#69db7c' }]}>
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
            { width: `${Math.min(100, value * 100)}%`, backgroundColor: achieved ? '#69db7c' : color },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: COMPONENT_RADIUS.card,
    padding: SPACING.lg,
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
    borderRadius: SPACING.xxl,
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
    fontSize: 18,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  status: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
    marginTop: 2,
  },
  progressIndicator: {
    marginLeft: SPACING.md,
  },
  progressText: {
    fontSize: 18,
    fontWeight: FONT_WEIGHTS.bold,
  },
  expandedContent: {
    marginTop: SPACING.lg,
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
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
    height: RADIUS.sm,
    borderRadius: RADIUS.xs,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: RADIUS.xs,
  },
  requirementsSummary: {
    marginTop: SPACING.lg,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
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
    borderRadius: RADIUS.md,
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
    paddingVertical: 14,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
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
