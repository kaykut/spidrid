/**
 * FilterPills - Content Category Filter
 *
 * Horizontal row of glass-style pills for filtering content by category.
 * Only one filter can be active at a time (mutually exclusive).
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { ContentCategory } from '../../types/contentList';
import { GlassView } from '../common/GlassView';
import { useTheme } from '../common/ThemeProvider';

interface FilterOption {
  id: ContentCategory | null;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { id: null, label: 'All' },
  { id: 'books', label: 'Books' },
  { id: 'articles', label: 'Articles' },
  { id: 'learning', label: 'Learning' },
  { id: 'training', label: 'Training' },
];

interface FilterPillsProps {
  activeFilter: ContentCategory | null;
  onFilterChange: (filter: ContentCategory | null) => void;
}

export function FilterPills({ activeFilter, onFilterChange }: FilterPillsProps) {
  const { theme } = useTheme();
  const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      {FILTER_OPTIONS.map((option) => {
        const isActive = activeFilter === option.id;
        return (
          <FilterPill
            key={option.label}
            label={option.label}
            isActive={isActive}
            isDarkTheme={isDarkTheme}
            accentColor={theme.accentColor}
            textColor={theme.textColor}
            onPress={() => onFilterChange(option.id)}
          />
        );
      })}
    </ScrollView>
  );
}

interface FilterPillProps {
  label: string;
  isActive: boolean;
  isDarkTheme: boolean;
  accentColor: string;
  textColor: string;
  onPress: () => void;
}

function FilterPill({
  label,
  isActive,
  isDarkTheme,
  accentColor,
  textColor,
  onPress,
}: FilterPillProps) {
  // Compute text color - active pills use contrasting color
  const activeTextColor = isDarkTheme ? '#000000' : '#ffffff';
  const pillTextColor = isActive ? activeTextColor : textColor;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <GlassView
        appearance={isDarkTheme ? 'dark' : 'light'}
        style={[
          styles.pill,
          isActive && { backgroundColor: accentColor },
        ]}
      >
        <View style={styles.pillContent}>
          <Text style={[styles.pillText, { color: pillTextColor }]}>
            {label}
          </Text>
        </View>
      </GlassView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },
  pill: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: COMPONENT_RADIUS.chip,
    minWidth: SIZES.touchTarget,
    overflow: 'hidden',
  },
  pillContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    ...TYPOGRAPHY.buttonSmall,
  },
});
