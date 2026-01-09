import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { JOURNEY_COLORS, OVERLAY_COLORS } from '../../data/themes';
import { usePlaylistStore } from '../../store/playlistStore';
import { PlaylistSource } from '../../types/playlist';
import { useTheme } from '../common/ThemeProvider';
import { PlaylistItemRow } from './PlaylistItemRow';
import { QueueTabs } from './QueueTabs';

interface PlaylistBottomSheetProps {
  peekHeight?: number;
  onItemSelect: (itemId: string, source: PlaylistSource) => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_HEIGHT = SCREEN_HEIGHT * 0.7;
const DEFAULT_PEEK_HEIGHT = 140;

export function PlaylistBottomSheet({
  peekHeight = DEFAULT_PEEK_HEIGHT,
  onItemSelect,
}: PlaylistBottomSheetProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const {
    activeQueue,
    setActiveQueue,
    getQueue,
    removeFromQueue,
    moveToTopAndLoad,
    nowPlaying,
  } = usePlaylistStore();

  const isDark = theme.id === 'dark' || theme.id === 'midnight';
  const sheetHeight = useRef(new Animated.Value(peekHeight)).current;
  const isExpanded = useRef(false);

  const queue = getQueue(activeQueue);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        const newHeight = isExpanded.current
          ? MAX_HEIGHT - gestureState.dy
          : peekHeight - gestureState.dy;

        if (newHeight >= peekHeight && newHeight <= MAX_HEIGHT) {
          sheetHeight.setValue(newHeight);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const shouldExpand = gestureState.dy < -50 || gestureState.vy < -0.5;
        const shouldCollapse = gestureState.dy > 50 || gestureState.vy > 0.5;

        if (shouldExpand && !isExpanded.current) {
          Animated.spring(sheetHeight, {
            toValue: MAX_HEIGHT,
            useNativeDriver: false,
            tension: 60,
            friction: 12,
          }).start();
          isExpanded.current = true;
        } else if (shouldCollapse && isExpanded.current) {
          Animated.spring(sheetHeight, {
            toValue: peekHeight,
            useNativeDriver: false,
            tension: 60,
            friction: 12,
          }).start();
          isExpanded.current = false;
        } else {
          // Snap back to current state
          Animated.spring(sheetHeight, {
            toValue: isExpanded.current ? MAX_HEIGHT : peekHeight,
            useNativeDriver: false,
            tension: 60,
            friction: 12,
          }).start();
        }
      },
    })
  ).current;

  const handleDoubleTap = (itemId: string) => {
    moveToTopAndLoad(itemId, activeQueue);
    onItemSelect(itemId, activeQueue);
  };

  const handleRemove = (itemId: string) => {
    removeFromQueue(itemId, activeQueue);
  };

  const glassBackground = isDark
    ? OVERLAY_COLORS.glassDark
    : OVERLAY_COLORS.glassLight;
  const borderColor = isDark
    ? OVERLAY_COLORS.glassBorderDark
    : OVERLAY_COLORS.glassBorderLight;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: sheetHeight,
          backgroundColor: glassBackground,
          borderTopColor: borderColor,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {/* Drag handle */}
      <View {...panResponder.panHandlers} style={styles.handleContainer}>
        <View style={[styles.handle, { backgroundColor: JOURNEY_COLORS.textTertiary }]} />
      </View>

      {/* Queue tabs */}
      <QueueTabs activeTab={activeQueue} onTabChange={setActiveQueue} />

      {/* Queue items */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {queue.length === 0 ? (
          <View style={styles.emptyState}>
            {activeQueue === 'learning' ? (
              <>
                <Ionicons
                  name="school-outline"
                  size={SIZES.iconXxxl}
                  color={JOURNEY_COLORS.textTertiary}
                />
                <Text style={[styles.emptyTitle, { color: JOURNEY_COLORS.textSecondary }]}>
                  Coming Soon
                </Text>
                <Text style={[styles.emptySubtitle, { color: JOURNEY_COLORS.textTertiary }]}>
                  Learning content will be available in a future update
                </Text>
              </>
            ) : (
              <>
                <Ionicons
                  name="library-outline"
                  size={SIZES.iconXxxl}
                  color={JOURNEY_COLORS.textTertiary}
                />
                <Text style={[styles.emptyTitle, { color: JOURNEY_COLORS.textSecondary }]}>
                  Queue Empty
                </Text>
                <Text style={[styles.emptySubtitle, { color: JOURNEY_COLORS.textTertiary }]}>
                  Add content from {activeQueue === 'training' ? 'Train' : 'Read'} tab
                </Text>
              </>
            )}
          </View>
        ) : (
          queue.map((item) => (
            <PlaylistItemRow
              key={item.id}
              item={item}
              isNowPlaying={nowPlaying?.item.id === item.id}
              onDoubleTap={() => handleDoubleTap(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          ))
        )}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: COMPONENT_RADIUS.modal,
    borderTopRightRadius: COMPONENT_RADIUS.modal,
    borderTopWidth: 1,
    overflow: 'hidden',
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  handle: {
    width: SIZES.iconXxl,
    height: SPACING.xs,
    borderRadius: COMPONENT_RADIUS.progressBar,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.lg,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    ...TYPOGRAPHY.cardTitle,
    marginTop: SPACING.md,
  },
  emptySubtitle: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
});
