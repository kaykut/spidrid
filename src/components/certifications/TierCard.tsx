import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
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
  currentAccuracy?: number;
  onStartCertification?: () => void;
}

export function TierCard({
  tier,
  progress,
  currentWPM = 0,
  currentAccuracy = 0,
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

  const getStatusText = () => {
    if (progress.isEarned) { return 'Earned'; }
    if (progress.isReady) { return 'Ready'; }
    if (progress.isUnlocked) { return 'In Progress'; }
    return 'Locked';
  };

  const getStatusColor = () => {
    if (progress.isEarned) { return '#69db7c'; }
    if (progress.isReady) { return definition.color; }
    if (progress.isUnlocked) { return theme.accentColor; }
    return theme.textColor;
  };

  const getNextStep = () => {
    if (progress.isEarned) { return null; }

    const req = definition.requirement;
    const steps: string[] = [];

    if (currentWPM < req.minWPM) {
      const needed = req.minWPM - currentWPM;
      steps.push(`Increase speed by ${needed} WPM`);
    }

    if (currentAccuracy < req.minAccuracy) {
      const needed = req.minAccuracy - currentAccuracy;
      steps.push(`Improve accuracy by ${needed}%`);
    }

    if (progress.textsProgress < 1) {
      const textsNeeded = Math.ceil((1 - progress.textsProgress) * 3);
      steps.push(`Complete ${textsNeeded} more certification text${textsNeeded > 1 ? 's' : ''}`);
    }

    return steps[0] || 'Take the certification test!';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleExpanded}
      disabled={!progress.isUnlocked && !progress.isEarned}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: theme.secondaryBackground },
          (!progress.isUnlocked && !progress.isEarned) && styles.locked,
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: `${definition.color}20` }]}>
            <Text style={styles.icon}>{definition.icon}</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.title, { color: theme.textColor }]}>
              {definition.title}
            </Text>
            <Text style={[styles.status, { color: getStatusColor() }]}>
              {getStatusText()}
            </Text>
          </View>
          <View style={styles.progressIndicator}>
            <Text style={[styles.progressText, { color: definition.color }]}>
              {Math.round(progress.overallProgress * 100)}%
            </Text>
          </View>
        </View>

        {/* Expanded content */}
        {expanded && (
          <View style={styles.expandedContent}>
            {/* Progress bars */}
            <View style={styles.progressBars}>
              <ProgressBar
                label="Speed"
                value={progress.speedProgress}
                valueText={`${currentWPM}/${definition.requirement.minWPM} WPM`}
                color={definition.color}
              />
              <ProgressBar
                label="Accuracy"
                value={progress.accuracyProgress}
                valueText={`${currentAccuracy}%/${definition.requirement.minAccuracy}%`}
                color={definition.color}
              />
              <ProgressBar
                label="Texts"
                value={progress.textsProgress}
                valueText={`${Math.round(progress.textsProgress * 3)}/3 passed`}
                color={definition.color}
              />
            </View>

            {/* Next step */}
            {!progress.isEarned && (
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
            {progress.isReady && !progress.isEarned && onStartCertification && (
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: definition.color }]}
                onPress={onStartCertification}
              >
                <Text style={styles.actionButtonText}>Take Certification Test</Text>
              </TouchableOpacity>
            )}

            {/* Earned badge */}
            {progress.isEarned && progress.earnedAt && (
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
}

function ProgressBar({ label, value, valueText, color }: ProgressBarProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarHeader}>
        <Text style={[styles.progressBarLabel, { color: theme.textColor }]}>{label}</Text>
        <Text style={[styles.progressBarValue, { color: theme.textColor }]}>{valueText}</Text>
      </View>
      <View style={[styles.progressBarTrack, { backgroundColor: theme.backgroundColor }]}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${Math.min(100, value * 100)}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  locked: {
    opacity: 0.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  status: {
    fontSize: 14,
    marginTop: 2,
  },
  progressIndicator: {
    marginLeft: 12,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  progressBars: {
    gap: 12,
  },
  progressBarContainer: {
    marginBottom: 4,
  },
  progressBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressBarLabel: {
    fontSize: 14,
  },
  progressBarValue: {
    fontSize: 12,
    opacity: 0.7,
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  nextStepContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
  },
  nextStepLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  nextStepText: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionButton: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  earnedBadge: {
    marginTop: 16,
    alignItems: 'center',
  },
  earnedText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
