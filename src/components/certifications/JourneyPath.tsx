import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING, RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import {
  CertificationTier,
  CertificationTierProgress,
  CERTIFICATION_TIER_DEFINITIONS,
} from '../../types/certificates';
import { useTheme } from '../common/ThemeProvider';

interface JourneyPathProps {
  progress: Record<CertificationTier, CertificationTierProgress>;
  velocityScore: number;
}

export function JourneyPath({ progress, velocityScore: _velocityScore }: JourneyPathProps) {
  const { theme } = useTheme();

  // Helper to get overall progress for a tier
  const getOverallProgress = (tierProgress: CertificationTierProgress): number => {
    let completed = 0;
    if (tierProgress.vsUnlocked) { completed++; }
    if (tierProgress.speedProofAchieved) { completed++; }
    if (tierProgress.examPassed) { completed++; }
    return completed / 3;
  };

  // Determine current position on the journey
  const getCurrentTierIndex = () => {
    const tiers: CertificationTier[] = ['speed_reader', 'velocity_master', 'transcendent'];
    for (let i = tiers.length - 1; i >= 0; i--) {
      if (progress[tiers[i]]?.examPassed) {
        return i + 1; // Past this tier
      }
    }
    return 0; // Haven't earned any tier yet
  };

  const currentIndex = getCurrentTierIndex();

  return (
    <View style={styles.container}>
      {CERTIFICATION_TIER_DEFINITIONS.map((def, index) => {
        const tierProgress = progress[def.tier];
        if (!tierProgress) { return null; }

        const isEarned = tierProgress.examPassed;
        const isUnlocked = tierProgress.vsUnlocked || tierProgress.speedProofAchieved;
        const isPast = currentIndex > index;
        const isCurrent = currentIndex === index;
        const isFuture = currentIndex < index;
        const overallProgress = getOverallProgress(tierProgress);

        return (
          <View key={def.tier} style={styles.tierRow}>
            {/* Connector line (above first tier) */}
            {index > 0 && (
              <View
                style={[
                  styles.connector,
                  { backgroundColor: isPast || isCurrent ? def.color : theme.secondaryBackground },
                ]}
              />
            )}

            {/* Tier node */}
            <View style={styles.nodeContainer}>
              <View
                style={[
                  styles.node,
                  {
                    backgroundColor: isEarned ? def.color : theme.secondaryBackground,
                    borderColor: isCurrent ? def.color : 'transparent',
                    borderWidth: isCurrent ? 3 : 0,
                  },
                  isFuture && !isUnlocked && styles.locked,
                ]}
              >
                <Text style={[styles.nodeIcon, isFuture && !isUnlocked && styles.lockedIcon]}>
                  {isUnlocked || isEarned ? def.icon : '🔒'}
                </Text>
                {isEarned && (
                  <View style={styles.checkBadge}>
                    <Text style={styles.checkMark}>✓</Text>
                  </View>
                )}
              </View>

              {/* Tier info */}
              <View style={styles.tierInfo}>
                <Text
                  style={[
                    styles.tierTitle,
                    { color: theme.textColor },
                    isFuture && !isUnlocked && styles.lockedText,
                  ]}
                >
                  {def.name}
                </Text>
                <Text
                  style={[
                    styles.tierRequirement,
                    { color: def.color },
                    isFuture && !isUnlocked && styles.lockedText,
                  ]}
                >
                  VS {def.vsThreshold} • {def.speedProofWpm} WPM
                </Text>
                {!isEarned && isUnlocked && (
                  <View style={styles.progressContainer}>
                    <View style={[styles.progressTrack, { backgroundColor: theme.secondaryBackground }]}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${overallProgress * 100}%`,
                            backgroundColor: def.color,
                          },
                        ]}
                      />
                    </View>
                    <Text style={[styles.progressPercent, { color: theme.textColor }]}>
                      {Math.round(overallProgress * 100)}%
                    </Text>
                  </View>
                )}
                {isEarned && tierProgress.earnedAt && (
                  <Text style={[styles.earnedDate, { color: '#69db7c' }]}>
                    Earned {new Date(tierProgress.earnedAt).toLocaleDateString()}
                  </Text>
                )}
              </View>
            </View>

            {/* Connector line (below last tier) */}
            {index < CERTIFICATION_TIER_DEFINITIONS.length - 1 && (
              <View
                style={[
                  styles.connectorBottom,
                  { backgroundColor: isPast ? CERTIFICATION_TIER_DEFINITIONS[index + 1].color : theme.secondaryBackground },
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.sm,
  },
  tierRow: {
    position: 'relative',
  },
  connector: {
    position: 'absolute',
    left: 30,
    top: -SPACING.xl,
    width: SPACING.xs,
    height: SPACING.xl,
    borderRadius: RADIUS.xs,
  },
  connectorBottom: {
    position: 'absolute',
    left: 30,
    bottom: -SPACING.xl,
    width: SPACING.xs,
    height: SPACING.xl,
    borderRadius: RADIUS.xs,
  },
  nodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  node: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  nodeIcon: {
    fontSize: 28,
  },
  locked: {
    opacity: 0.4,
  },
  lockedIcon: {
    opacity: 0.6,
  },
  lockedText: {
    opacity: 0.5,
  },
  checkBadge: {
    position: 'absolute',
    bottom: -SPACING.xs,
    right: -SPACING.xs,
    width: SPACING.xxl,
    height: SPACING.xxl,
    borderRadius: SPACING.md,
    backgroundColor: '#69db7c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: '#ffffff',
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.bold,
  },
  tierInfo: {
    flex: 1,
    marginLeft: SPACING.lg,
  },
  tierTitle: {
    fontSize: 18,
    fontWeight: FONT_WEIGHTS.semibold,
    marginBottom: 2,
  },
  tierRequirement: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
    marginBottom: SPACING.sm,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTrack: {
    flex: 1,
    height: RADIUS.sm,
    borderRadius: RADIUS.xs,
    marginRight: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: RADIUS.xs,
  },
  progressPercent: {
    ...TYPOGRAPHY.caption,
    fontWeight: FONT_WEIGHTS.medium,
    width: 35,
  },
  earnedDate: {
    ...TYPOGRAPHY.caption,
    fontWeight: FONT_WEIGHTS.medium,
  },
});
