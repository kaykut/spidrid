import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { withOpacity, OPACITY } from '../../utils/colorUtils';
import { JOURNEY_COLORS, COLORS } from '../../data/themes';
import { PlaylistItem, PlaylistSource } from '../../types/playlist';
import { useTheme } from '../common/ThemeProvider';

interface PlaylistItemRowProps {
  item: PlaylistItem;
  isNowPlaying: boolean;
  onDoubleTap: () => void;
  onRemove: () => void;
  onDragStart?: () => void;
}

const DOUBLE_TAP_DELAY = 300;

const SOURCE_COLORS: Record<PlaylistSource, string> = {
  training: JOURNEY_COLORS.accent,
  reading: JOURNEY_COLORS.warmAccent,
  learning: JOURNEY_COLORS.certificationAccent,
};

export function PlaylistItemRow({
  item,
  isNowPlaying,
  onDoubleTap,
  onRemove,
  onDragStart,
}: PlaylistItemRowProps) {
  const { theme } = useTheme();
  const lastTapRef = useRef<number>(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      onDoubleTap();
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  };

  const sourceColor = SOURCE_COLORS[item.source];
  const progressPercent = Math.round(item.progress * 100);

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: isNowPlaying ? withOpacity(sourceColor, OPACITY.subtle) : COLORS.transparent },
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity
        style={styles.dragHandle}
        onLongPress={onDragStart}
        delayLongPress={200}
      >
        <Ionicons name="menu" size={SIZES.iconMd} color={JOURNEY_COLORS.textTertiary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.content} onPress={handleTap} activeOpacity={0.7}>
        <View style={styles.info}>
          <Text style={[styles.title, { color: theme.textColor }]} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.meta}>
            <Text style={[styles.wordCount, { color: JOURNEY_COLORS.textSecondary }]}>
              {item.wordCount.toLocaleString()} words
            </Text>
            {item.progress > 0 && (
              <Text style={[styles.progress, { color: sourceColor }]}>
                {progressPercent}%
              </Text>
            )}
          </View>
        </View>

        {isNowPlaying && (
          <View style={[styles.nowPlayingBadge, { backgroundColor: sourceColor }]}>
            <Ionicons name="play" size={SIZES.iconXs} color={JOURNEY_COLORS.textPrimary} />
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Ionicons name="close-circle" size={SIZES.iconLg} color={JOURNEY_COLORS.textTertiary} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: COMPONENT_RADIUS.chip,
    marginHorizontal: SPACING.sm,
    marginVertical: SPACING.xxs,
  },
  dragHandle: {
    padding: SPACING.sm,
    marginRight: SPACING.xs,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.body,
    fontWeight: FONT_WEIGHTS.medium,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  wordCount: {
    ...TYPOGRAPHY.caption,
  },
  progress: {
    ...TYPOGRAPHY.caption,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  nowPlayingBadge: {
    width: SIZES.iconLg,
    height: SIZES.iconLg,
    borderRadius: COMPONENT_RADIUS.badge,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.sm,
  },
  removeButton: {
    padding: SPACING.sm,
    marginLeft: SPACING.xs,
  },
});
