/**
 * ContentSubTabBar
 *
 * Horizontal sub-tab bar for the Content tab.
 * Shows Train, Read, Learn sub-tabs with icon + text.
 * Positioned at top of Content screen, below safe area.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { OVERLAY_COLORS } from '../../data/themes';
import { useSettingsStore } from '../../store/settingsStore';
import { withOpacity, OPACITY } from '../../utils/colorUtils';
import { useTheme } from '../common/ThemeProvider';

interface SubTab {
  name: string;
  route: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconOutline: keyof typeof Ionicons.glyphMap;
}

const SUB_TABS: SubTab[] = [
  { name: 'Train', route: 'train', icon: 'barbell', iconOutline: 'barbell-outline' },
  { name: 'Read', route: 'read', icon: 'document-text', iconOutline: 'document-text-outline' },
  { name: 'Learn', route: 'learn', icon: 'book', iconOutline: 'book-outline' },
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
      <View style={[styles.tabBar, { backgroundColor: theme.secondaryBackground }]}>
        {SUB_TABS.map((tab) => {
          const active = isActive(tab.route);
          const tabColor = active ? theme.accentColor : inactiveColor;
          return (
            <TouchableOpacity
              key={tab.name}
              style={[
                styles.tab,
                active && [styles.activeTab, { backgroundColor: withOpacity(theme.accentColor, OPACITY.light) }],
              ]}
              onPress={() => handleTabPress(tab.route)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={active ? tab.icon : tab.iconOutline}
                size={SIZES.iconNav}
                color={tabColor}
              />
              <Text
                style={[
                  styles.tabText,
                  { color: tabColor },
                  active && styles.activeTabText,
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.md,
    // Leave space on right for profile button
    paddingRight: SPACING.xxxl + SPACING.xl,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: COMPONENT_RADIUS.button,
    padding: SPACING.xs,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: COMPONENT_RADIUS.chip,
    gap: SPACING.xs,
  },
  activeTab: {
    // backgroundColor set dynamically
  },
  tabText: {
    ...TYPOGRAPHY.labelSmall,
    fontSize: TYPOGRAPHY.label.fontSize,
  },
  activeTabText: {
    fontWeight: FONT_WEIGHTS.semibold,
  },
});
