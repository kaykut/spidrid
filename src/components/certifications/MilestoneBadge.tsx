import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING } from '../../constants/spacing';
import { FONT_WEIGHTS } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import {
  CertificationTier,
  CertificationTierProgress,
  CERTIFICATION_TIER_DEFINITIONS,
} from '../../types/certificates';
import { withOpacity, OPACITY } from '../../utils/colorUtils';
import { useTheme } from '../common/ThemeProvider';

interface MilestoneBadgeProps {
  tier: CertificationTier;
  progress: CertificationTierProgress;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Get the certification definition by tier
 */
function getCertDefinition(tier: CertificationTier) {
  return CERTIFICATION_TIER_DEFINITIONS.find(d => d.tier === tier);
}

/**
 * Calculate overall progress (0-1) from VS unlock and speed proof
 */
function getOverallProgress(progress: CertificationTierProgress): number {
  let completed = 0;
  if (progress.vsUnlocked) { completed++; }
  if (progress.speedProofAchieved) { completed++; }
  if (progress.examPassed) { completed++; }
  return completed / 3;
}

export function MilestoneBadge({
  tier,
  progress,
  size = 'medium',
}: MilestoneBadgeProps) {
  const { theme } = useTheme();

  const definition = getCertDefinition(tier);
  if (!definition) { return null; }

  // Size configurations using spacing constants where applicable
  const sizes = {
    small: { container: SPACING.huge, icon: 18, ring: 3 },
    medium: { container: 56, icon: SPACING.xxl, ring: SPACING.xs },
    large: { container: 72, icon: SPACING.xxxl, ring: 5 },
  };

  const sizeConfig = sizes[size];
  const isEarned = progress.examPassed;
  const isUnlocked = progress.vsUnlocked || progress.speedProofAchieved;
  const isLocked = !isUnlocked && !isEarned;
  const overallProgress = getOverallProgress(progress);

  const getAccessibilityLabel = () => {
    if (isEarned) {
      return `${definition.name} certification earned`;
    }
    if (isLocked) {
      return `${definition.name} certification locked`;
    }
    return `${definition.name} certification, ${Math.round(overallProgress * 100)}% progress`;
  };

  const getBadgeBackgroundColor = () => {
    if (isEarned) {return definition.color;}
    if (isLocked) {return theme.secondaryBackground;}
    return withOpacity(definition.color, OPACITY.light);
  };

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="image"
      accessibilityLabel={getAccessibilityLabel()}
    >
      {/* Progress ring (only for unlocked, not earned) */}
      {isUnlocked && !isEarned && (
        <View
          style={[
            styles.progressRing,
            {
              width: sizeConfig.container,
              height: sizeConfig.container,
              borderRadius: sizeConfig.container / 2,
              borderWidth: sizeConfig.ring,
              borderColor: withOpacity(definition.color, OPACITY.medium),
            },
          ]}
        >
          {/* This is a simplified progress indicator */}
          <View
            style={[
              styles.progressIndicator,
              {
                position: 'absolute',
                top: -sizeConfig.ring,
                left: (sizeConfig.container - sizeConfig.ring * 2) / 2 - sizeConfig.ring,
                width: sizeConfig.ring * 2,
                height: sizeConfig.ring * 2,
                borderRadius: sizeConfig.ring,
                backgroundColor: definition.color,
                transform: [{ rotate: `${overallProgress * 360}deg` }],
              },
            ]}
          />
        </View>
      )}

      {/* Badge container */}
      <View
        style={[
          styles.badge,
          {
            width: sizeConfig.container - (isUnlocked && !isEarned ? sizeConfig.ring * 2 : 0),
            height: sizeConfig.container - (isUnlocked && !isEarned ? sizeConfig.ring * 2 : 0),
            borderRadius: (sizeConfig.container - (isUnlocked && !isEarned ? sizeConfig.ring * 2 : 0)) / 2,
            backgroundColor: getBadgeBackgroundColor(),
          },
          isLocked && styles.locked,
        ]}
      >
        <Text style={[styles.icon, { fontSize: sizeConfig.icon }]}>
          {isLocked ? '🔒' : definition.icon}
        </Text>
      </View>

      {/* Check mark for earned */}
      {isEarned && (
        <View
          style={[
            styles.checkBadge,
            {
              right: -SPACING.xs,
              bottom: -SPACING.xs,
              width: sizeConfig.container * 0.35,
              height: sizeConfig.container * 0.35,
              borderRadius: sizeConfig.container * 0.175,
            },
          ]}
        >
          <Text style={[styles.checkMark, { fontSize: sizeConfig.container * 0.2 }]}>✓</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRing: {
    position: 'absolute',
  },
  progressIndicator: {
    position: 'absolute',
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  locked: {
    opacity: 0.4,
  },
  icon: {
    textAlign: 'center',
  },
  checkBadge: {
    position: 'absolute',
    backgroundColor: JOURNEY_COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: JOURNEY_COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.bold,
  },
});
