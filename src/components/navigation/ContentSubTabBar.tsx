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
import { SPACING, RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { useSettingsStore } from '../../store/settingsStore';
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
  const inactiveColor = isDarkTheme ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)';

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
                active && [styles.activeTab, { backgroundColor: `${theme.accentColor}20` }],
              ]}
              onPress={() => handleTabPress(tab.route)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={active ? tab.icon : tab.iconOutline}
                size={18}
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
    borderRadius: RADIUS.lg,
    padding: SPACING.xs,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    gap: SPACING.xs,
  },
  activeTab: {
    // backgroundColor set dynamically
  },
  tabText: {
    ...TYPOGRAPHY.labelSmall,
    fontSize: 13,
  },
  activeTabText: {
    fontWeight: '600',
  },
});
