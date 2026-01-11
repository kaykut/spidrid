/**
 * ContentSubTabBar
 *
 * Horizontal sub-tab bar for the Content tab.
 * Shows Train, Read, Learn sub-tabs with icon + description.
 * iOS 26 Liquid Glass style: pill-shaped container with pill-shaped selection.
 * Positioned at top of Content screen, below safe area.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { FONT_WEIGHTS } from '../../constants/typography';
import { OVERLAY_COLORS } from '../../data/themes';
import { useSettingsStore } from '../../store/settingsStore';
import { withOpacity, OPACITY } from '../../utils/colorUtils';
import { GlassView } from '../common/GlassView';
import { useTheme } from '../common/ThemeProvider';

interface SubTab {
  description: string;
  route: string;
  icon: keyof typeof Ionicons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
  iconOutline: keyof typeof Ionicons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
  iconLibrary?: 'ionicons' | 'material';
}

const SUB_TABS: SubTab[] = [
  { description: 'Practice', route: 'train', icon: 'stopwatch', iconOutline: 'stopwatch-outline' },
  { description: 'Read', route: 'read', icon: 'book', iconOutline: 'book-outline' },
  { description: 'Learn', route: 'learn', icon: 'brain', iconOutline: 'brain', iconLibrary: 'material' },
];

export function ContentSubTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const { setActiveContentTab } = useSettingsStore();

  const isActive = (route: string) => {
    return pathname.includes(`/content/${route}`);
  };

  const handleTabPress = (route: string) => {
    setActiveContentTab(route as 'train' | 'read' | 'learn');
    router.replace(`/(tabs)/content/${route}`);
  };

  const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';
  const inactiveColor = isDarkTheme ? OVERLAY_COLORS.inactiveDark : OVERLAY_COLORS.inactiveLight;

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <GlassView
        appearance={isDarkTheme ? 'dark' : 'light'}
        style={styles.tabBar}
      >
        {SUB_TABS.map((tab) => {
          const active = isActive(tab.route);
          const tabColor = active ? theme.accentColor : inactiveColor;
          return (
            <TouchableOpacity
              key={tab.route}
              style={[
                styles.tab,
                active && [styles.activeTab, { backgroundColor: withOpacity(theme.accentColor, OPACITY.light) }],
              ]}
              onPress={() => handleTabPress(tab.route)}
              activeOpacity={0.7}
            >
              {tab.iconLibrary === 'material' ? (
                <MaterialCommunityIcons
                  name={active ? tab.icon as keyof typeof MaterialCommunityIcons.glyphMap : tab.iconOutline as keyof typeof MaterialCommunityIcons.glyphMap}
                  size={SIZES.iconSm}
                  color={tabColor}
                />
              ) : (
                <Ionicons
                  name={active ? tab.icon as keyof typeof Ionicons.glyphMap : tab.iconOutline as keyof typeof Ionicons.glyphMap}
                  size={SIZES.iconSm}
                  color={tabColor}
                />
              )}
              <Text
                style={[
                  styles.tabText,
                  { color: tabColor },
                  active && styles.activeTabText,
                ]}
                numberOfLines={1}
              >
                {tab.description}
              </Text>
            </TouchableOpacity>
          );
        })}
      </GlassView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.md,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: COMPONENT_RADIUS.badge,
    padding: SPACING.xs,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: COMPONENT_RADIUS.badge,
    gap: SPACING.xs,
  },
  activeTab: {
    // backgroundColor set dynamically
  },
  tabText: {
    fontSize: 12,
    letterSpacing: 0.2,
  },
  activeTabText: {
    fontWeight: FONT_WEIGHTS.semibold,
  },
});
