import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  CertificationTier,
  CertificationProgress,
  CERTIFICATION_TIER_DEFINITIONS,
} from '../../types/certificates';
import { useTheme } from '../common/ThemeProvider';

interface JourneyPathProps {
  progress: CertificationProgress;
}

export function JourneyPath({ progress }: JourneyPathProps) {
  const { theme } = useTheme();

  // Determine current position on the journey
  const getCurrentTierIndex = () => {
    const tiers: CertificationTier[] = ['quick_reader', 'speed_reader', 'lightning_reader'];
    for (let i = tiers.length - 1; i >= 0; i--) {
      if (progress.earnedTiers.includes(tiers[i])) {
        return i + 1; // Past this tier
      }
    }
    return 0; // Haven't earned any tier yet
  };

  const currentIndex = getCurrentTierIndex();

  return (
    <View style={styles.container}>
      {CERTIFICATION_TIER_DEFINITIONS.map((def, index) => {
        const tierProgress = progress.tierProgress[def.tier];
        const isEarned = tierProgress.isEarned;
        const isPast = currentIndex > index;
        const isCurrent = currentIndex === index;
        const isFuture = currentIndex < index;

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
                  isFuture && !tierProgress.isUnlocked && styles.locked,
                ]}
              >
                <Text style={[styles.nodeIcon, isFuture && !tierProgress.isUnlocked && styles.lockedIcon]}>
                  {tierProgress.isUnlocked || isEarned ? def.icon : '🔒'}
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
                    isFuture && !tierProgress.isUnlocked && styles.lockedText,
                  ]}
                >
                  {def.title}
                </Text>
                <Text
                  style={[
                    styles.tierRequirement,
                    { color: def.color },
                    isFuture && !tierProgress.isUnlocked && styles.lockedText,
                  ]}
                >
                  {def.requirement.minWPM} WPM • {def.requirement.minAccuracy}%
                </Text>
                {!isEarned && tierProgress.isUnlocked && (
                  <View style={styles.progressContainer}>
                    <View style={[styles.progressTrack, { backgroundColor: theme.secondaryBackground }]}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${tierProgress.overallProgress * 100}%`,
                            backgroundColor: def.color,
                          },
                        ]}
                      />
                    </View>
                    <Text style={[styles.progressPercent, { color: theme.textColor }]}>
                      {Math.round(tierProgress.overallProgress * 100)}%
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
    paddingVertical: 8,
  },
  tierRow: {
    position: 'relative',
  },
  connector: {
    position: 'absolute',
    left: 30,
    top: -20,
    width: 4,
    height: 20,
    borderRadius: 2,
  },
  connectorBottom: {
    position: 'absolute',
    left: 30,
    bottom: -20,
    width: 4,
    height: 20,
    borderRadius: 2,
  },
  nodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
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
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#69db7c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tierInfo: {
    flex: 1,
    marginLeft: 16,
  },
  tierTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  tierRequirement: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '500',
    width: 35,
  },
  earnedDate: {
    fontSize: 12,
    fontWeight: '500',
  },
});
