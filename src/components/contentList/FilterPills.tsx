/**
 * FilterPills - Content Category Filter
 *
 * Horizontal row of glass-style pills for filtering content by category.
 * Only one filter can be active at a time (mutually exclusive).
 */

import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { SPRING_CONFIG } from '../../constants/animations';
import { SPACING, COMPONENT_RADIUS } from '../../constants/spacing';
import { ContentCategory } from '../../types/contentList';
import { JOURNEY_COLORS } from '../../data/themes';
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

/**
 * Animation hook for filter pill spring bounce
 * Animates scale from 1 → 1.08 → 1 with gentle spring overshoot
 * Only animates when pill becomes active (not on initial mount)
 */
function useFilterPillAnimation(isActive: boolean) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const prevIsActive = useRef(isActive);

  useEffect(() => {
    // Skip animation on first render
    if (prevIsActive.current === isActive) {
      prevIsActive.current = isActive;
      return;
    }

    prevIsActive.current = isActive;

    // Animate only when becoming active
    if (isActive) {
      Animated.spring(scaleAnim, {
        toValue: 1.08,
        ...SPRING_CONFIG.gentle,
      }).start();
    }
  }, [isActive, scaleAnim]);

  return scaleAnim;
}

function FilterPill({
  label,
  isActive,
  isDarkTheme,
  accentColor,
  textColor,
  onPress,
}: FilterPillProps) {
  const scaleAnim = useFilterPillAnimation(isActive);

  // Compute text color - active pills use contrasting color
  const pillTextColor = isActive ? JOURNEY_COLORS.textPrimary : textColor;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
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
    </Animated.View>
  );
}

// Filter pills with justified layout for all iOS devices
// 13pt font (largest that fits iPhone SE/13 mini at 375pt width)
// Pills distributed edge-to-edge with auto-calculated equal spacing (~9.75pt gaps)
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 12, // Edge margins
    paddingVertical: SPACING.sm,
    flexGrow: 1, // Allow container to expand
    justifyContent: 'space-between', // Justified layout (auto-distributes gaps)
  },
  pill: {
    paddingHorizontal: 12, // Comfortable touch targets
    paddingVertical: 6,
    borderRadius: COMPONENT_RADIUS.badge, // Fully rounded pill shape
    minWidth: 40,
    overflow: 'hidden',
  },
  pillContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    fontSize: 13, // Largest size that fits on iPhone SE/13 mini (375pt)
    fontWeight: '600',
    lineHeight: 17, // Adjusted for 13pt font
  },
});
