import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { withOpacity, OPACITY } from '../../utils/colorUtils';
import { JOURNEY_COLORS } from '../../data/themes';
import { PlaylistItem, PlaylistSource } from '../../types/playlist';
import { useTheme } from '../common/ThemeProvider';

interface NowPlayingBarProps {
  item: PlaylistItem | null;
  progress?: number;  // 0-1, current playback progress
}

const SOURCE_LABELS: Record<PlaylistSource, string> = {
  training: 'Training',
  reading: 'Reading',
  learning: 'Learning',
};

const SOURCE_COLORS: Record<PlaylistSource, string> = {
  training: JOURNEY_COLORS.accent,
  reading: JOURNEY_COLORS.warmAccent,
  learning: JOURNEY_COLORS.certificationAccent,
};

export function NowPlayingBar({ item, progress = 0 }: NowPlayingBarProps) {
  const { theme } = useTheme();

  if (!item) {
    return (
      <View style={[styles.container, { backgroundColor: theme.secondaryBackground }]}>
        <Text style={[styles.emptyText, { color: JOURNEY_COLORS.textSecondary }]}>
          No content loaded
        </Text>
      </View>
    );
  }

  const sourceColor = SOURCE_COLORS[item.source];
  const progressPercent = Math.round(progress * 100);

  return (
    <View style={[styles.container, { backgroundColor: theme.secondaryBackground }]}>
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <View style={[styles.sourceBadge, { backgroundColor: withOpacity(sourceColor, OPACITY.medium) }]}>
            <Text style={[styles.sourceText, { color: sourceColor }]}>
              {SOURCE_LABELS[item.source]}
            </Text>
          </View>
          <Text
            style={[styles.wordCount, { color: JOURNEY_COLORS.textSecondary }]}
            numberOfLines={1}
          >
            {item.wordCount.toLocaleString()} words
          </Text>
        </View>
        <Text style={[styles.title, { color: theme.textColor }]} numberOfLines={1}>
          {item.title}
        </Text>
      </View>

      {/* Progress bar */}
      <View style={[styles.progressBar, { backgroundColor: theme.secondaryBackground }]}>
        <View
          style={[
            styles.progressFill,
            {
              backgroundColor: sourceColor,
              width: `${progressPercent}%`,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    paddingVertical: SPACING.sm,
  },
  info: {
    marginBottom: SPACING.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  sourceBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: COMPONENT_RADIUS.chip / 2,
  },
  sourceText: {
    ...TYPOGRAPHY.caption,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  wordCount: {
    ...TYPOGRAPHY.caption,
  },
  title: {
    ...TYPOGRAPHY.cardTitle,
  },
  progressBar: {
    height: SIZES.progressBarHeight,
    borderRadius: COMPONENT_RADIUS.progressBar,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: COMPONENT_RADIUS.progressBar,
  },
});
