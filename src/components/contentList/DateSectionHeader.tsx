/**
 * DateSectionHeader - Section header for date-grouped content list
 *
 * Displays the date bucket label (e.g., "Today", "Yesterday") as a
 * section header in the content list SectionList.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { useTheme } from '../common/ThemeProvider';

interface DateSectionHeaderProps {
  /** Section title to display */
  title: string;
}

export function DateSectionHeader({ title }: DateSectionHeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.metaColor }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xs,
  },
  title: {
    ...TYPOGRAPHY.sectionTitle,
  },
});
