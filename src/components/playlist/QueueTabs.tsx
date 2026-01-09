import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { usePlaylistStore } from '../../store/playlistStore';
import { PlaylistSource } from '../../types/playlist';
import { useTheme } from '../common/ThemeProvider';

interface QueueTabsProps {
  activeTab: PlaylistSource;
  onTabChange: (tab: PlaylistSource) => void;
}

const TABS: { id: PlaylistSource; label: string }[] = [
  { id: 'training', label: 'Training' },
  { id: 'reading', label: 'Reading' },
  { id: 'learning', label: 'Learning' },
];

export function QueueTabs({ activeTab, onTabChange }: QueueTabsProps) {
  const { theme } = useTheme();
  const { getQueueLength } = usePlaylistStore();

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const count = getQueueLength(tab.id);

        return (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              isActive && [
                styles.activeTab,
                { backgroundColor: `${theme.accentColor  }20` },
              ],
            ]}
            onPress={() => onTabChange(tab.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabLabel,
                { color: isActive ? theme.accentColor : JOURNEY_COLORS.textSecondary },
              ]}
            >
              {tab.label}
            </Text>
            {count > 0 && (
              <View
                style={[
                  styles.badge,
                  { backgroundColor: isActive ? theme.accentColor : JOURNEY_COLORS.textTertiary },
                ]}
              >
                <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
    gap: SPACING.xs,
  },
  activeTab: {
    borderRadius: COMPONENT_RADIUS.button,
  },
  tabLabel: {
    ...TYPOGRAPHY.buttonSmall,
  },
  badge: {
    minWidth: SIZES.iconSm + 2,
    height: SIZES.iconSm + 2,
    borderRadius: COMPONENT_RADIUS.badge,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xs,
  },
  badgeText: {
    ...TYPOGRAPHY.microText,
    color: JOURNEY_COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.semibold,
  },
});
