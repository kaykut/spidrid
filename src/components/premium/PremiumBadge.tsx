import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SPACING, COMPONENT_RADIUS } from '@/constants/spacing';
import { JOURNEY_COLORS } from '@/data/themes';

interface PremiumBadgeProps {
  /** Icon size in pixels (default: 12) */
  size?: number;
  /** Top position override (default: SPACING.xs) */
  top?: number;
  /** Right position override (default: SPACING.xs) */
  right?: number;
}

/**
 * Premium badge with crown icon
 *
 * Displays a crown icon in a badge to indicate premium-gated features.
 * Uses design system tokens for consistent spacing, sizing, and colors.
 * Positioned absolutely in top-right corner of parent container.
 *
 * @example
 * // Default usage (12px crown, top-right corner)
 * <PremiumBadge />
 *
 * @example
 * // Smaller badge for pills
 * <PremiumBadge size={8} top={2} right={2} />
 */
export function PremiumBadge({
  size = 12,
  top = SPACING.xs,
  right = SPACING.xs
}: PremiumBadgeProps) {
  return (
    <View
      style={[styles.badge, { top, right }]}
      importantForAccessibility="no-hide-descendants"
    >
      <MaterialCommunityIcons
        name="crown"
        size={size}
        color={JOURNEY_COLORS.warmAccent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: COMPONENT_RADIUS.chip,
    padding: SPACING.xxs,
  },
});
