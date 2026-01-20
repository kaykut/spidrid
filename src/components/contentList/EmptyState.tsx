/**
 * EmptyState - Empty Content List Display
 *
 * Shown when the content list has no items.
 * Includes an illustration and CTA button to add content.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { useTheme } from '../common/ThemeProvider';

interface EmptyStateProps {
  onAddContent: () => void;
}

export function EmptyState({ onAddContent }: EmptyStateProps) {
  const { theme } = useTheme();
  const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';

  return (
    <View style={styles.container}>
      {/* Icon illustration */}
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: isDarkTheme ? theme.secondaryBackground : `${theme.accentColor}10` },
        ]}
      >
        <Ionicons
          name="library-outline"
          size={SIZES.iconHuge}
          color={theme.accentColor}
        />
      </View>

      {/* Message */}
      <Text style={[styles.title, { color: theme.textColor }]}>
        No content yet
      </Text>
      <Text style={[styles.subtitle, { color: theme.metaColor }]}>
        Add articles, books, or generate learning content to get started with speed reading.
      </Text>

      {/* CTA Button */}
      <TouchableOpacity
        onPress={onAddContent}
        style={[styles.button, { backgroundColor: theme.accentColor }]}
        activeOpacity={0.8}
      >
        <Ionicons
          name="add"
          size={SIZES.iconMd}
          color={JOURNEY_COLORS.textPrimary}
        />
        <Text style={[styles.buttonText, { color: JOURNEY_COLORS.textPrimary }]}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xxl,
  },
  iconCircle: {
    width: SIZES.iconHuge * 2,
    height: SIZES.iconHuge * 2,
    borderRadius: SIZES.iconHuge,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.sectionHeader,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.button,
    gap: SPACING.xs,
  },
  buttonText: {
    ...TYPOGRAPHY.button,
  },
});
