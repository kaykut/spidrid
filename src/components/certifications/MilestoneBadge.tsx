import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  CertificationTier,
  CertificationTierProgress,
  getCertificationTierDefinition,
} from '../../types/certificates';
import { useTheme } from '../common/ThemeProvider';

interface MilestoneBadgeProps {
  tier: CertificationTier;
  progress: CertificationTierProgress;
  size?: 'small' | 'medium' | 'large';
}

export function MilestoneBadge({
  tier,
  progress,
  size = 'medium',
}: MilestoneBadgeProps) {
  const { theme } = useTheme();

  const definition = getCertificationTierDefinition(tier);
  if (!definition) { return null; }

  const sizes = {
    small: { container: 40, icon: 18, ring: 3 },
    medium: { container: 56, icon: 24, ring: 4 },
    large: { container: 72, icon: 32, ring: 5 },
  };

  const sizeConfig = sizes[size];
  const isEarned = progress.isEarned;
  const isLocked = !progress.isUnlocked && !isEarned;

  const getAccessibilityLabel = () => {
    if (isEarned) {
      return `${definition.title} certification earned`;
    }
    if (isLocked) {
      return `${definition.title} certification locked`;
    }
    return `${definition.title} certification, ${Math.round(progress.overallProgress * 100)}% progress`;
  };

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="image"
      accessibilityLabel={getAccessibilityLabel()}
    >
      {/* Progress ring (only for unlocked, not earned) */}
      {progress.isUnlocked && !isEarned && (
        <View
          style={[
            styles.progressRing,
            {
              width: sizeConfig.container,
              height: sizeConfig.container,
              borderRadius: sizeConfig.container / 2,
              borderWidth: sizeConfig.ring,
              borderColor: `${definition.color}30`,
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
                transform: [{ rotate: `${progress.overallProgress * 360}deg` }],
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
            width: sizeConfig.container - (progress.isUnlocked && !isEarned ? sizeConfig.ring * 2 : 0),
            height: sizeConfig.container - (progress.isUnlocked && !isEarned ? sizeConfig.ring * 2 : 0),
            borderRadius: (sizeConfig.container - (progress.isUnlocked && !isEarned ? sizeConfig.ring * 2 : 0)) / 2,
            backgroundColor: isEarned ? definition.color : isLocked ? theme.secondaryBackground : `${definition.color}20`,
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
              right: -4,
              bottom: -4,
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
    backgroundColor: '#69db7c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
