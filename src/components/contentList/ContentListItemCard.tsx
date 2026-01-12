/**
 * ContentListItemCard - Individual Content Item Display
 *
 * Shows a single content item with:
 * - Left: Icon based on source/category
 * - Center: Title, word count, state
 * - Right: Progress bar OR quiz score OR "Take Quiz" button
 * - Swipeable with delete action
 */

import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { SPACING, COMPONENT_RADIUS, SIZES, SHADOWS } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { JOURNEY_COLORS, COLOR_OPACITY } from '../../data/themes';
import { ContentListItem, ContentSource, ContentCategory } from '../../types/contentList';
import { useTheme } from '../common/ThemeProvider';

interface ContentListItemCardProps {
  item: ContentListItem;
  onPress: () => void;
  onDelete?: () => void;
  onQuizPress?: () => void;
}

/**
 * Get icon name based on content source and category
 */
function getIconName(source: ContentSource, category: ContentCategory): keyof typeof Ionicons.glyphMap {
  switch (source) {
    case 'training':
      return 'stopwatch-outline';
    case 'generated':
      return 'sparkles-outline';
    case 'curriculum':
      return 'school-outline';
    case 'imported':
      if (category === 'books') {
        return 'book-outline';
      }
      return 'link-outline';
    default:
      return 'document-outline';
  }
}

/**
 * Format word count for display
 */
function formatWordCount(wordCount: number): string {
  if (wordCount >= 1000) {
    return `${(wordCount / 1000).toFixed(1)}k words`;
  }
  return `${wordCount} words`;
}

export function ContentListItemCard({
  item,
  onPress,
  onDelete,
  onQuizPress,
}: ContentListItemCardProps) {
  const { theme } = useTheme();
  const swipeableRef = useRef<Swipeable>(null);

  const iconName = getIconName(item.source, item.category);
  const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';

  const handleDelete = () => {
    swipeableRef.current?.close();
    onDelete?.();
  };

  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    // Training articles cannot be deleted
    if (item.source === 'training') {
      return null;
    }

    return (
      <TouchableOpacity onPress={handleDelete} style={styles.deleteAction}>
        <Animated.View style={[styles.deleteContent, { transform: [{ scale }] }]}>
          <Ionicons name="trash-outline" size={SIZES.iconLg} color="#ffffff" />
          <Text style={styles.deleteText}>Delete</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderProgressSection = () => {
    // Show quiz score if completed
    if (item.state === 'completed' && item.quizScore !== undefined) {
      return (
        <View style={styles.scoreContainer}>
          <Text style={[styles.scoreText, { color: JOURNEY_COLORS.success }]}>
            {item.quizScore}%
          </Text>
        </View>
      );
    }

    // Show "Take Quiz" button if quiz pending
    if (item.quizPending && onQuizPress) {
      return (
        <TouchableOpacity
          onPress={onQuizPress}
          style={[styles.quizButton, { backgroundColor: theme.accentColor }]}
        >
          <Text style={[styles.quizButtonText, { color: isDarkTheme ? '#000' : '#fff' }]}>
            Quiz
          </Text>
        </TouchableOpacity>
      );
    }

    // Show progress bar for in-progress items
    if (item.progress > 0 || item.state === 'in_progress') {
      return (
        <View style={styles.progressContainer}>
          <View style={[styles.progressTrack, { backgroundColor: theme.trackColor }]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${item.progress}%`,
                  backgroundColor: theme.accentColor,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: theme.metaColor }]}>
            {item.progress}%
          </Text>
        </View>
      );
    }

    // No progress indicator for not started items
    return null;
  };

  const cardContent = (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.card,
        {
          backgroundColor: theme.secondaryBackground,
        },
      ]}
    >
      {/* Left: Icon */}
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: isDarkTheme ? COLOR_OPACITY.accentTint : `${theme.accentColor}20` },
        ]}
      >
        <Ionicons name={iconName} size={SIZES.iconLg} color={theme.accentColor} />
      </View>

      {/* Center: Title and metadata */}
      <View style={styles.content}>
        <Text
          style={[styles.title, { color: theme.textColor }]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
        <View style={styles.metadata}>
          <Text style={[styles.metaText, { color: theme.metaColor }]}>
            {formatWordCount(item.wordCount)}
          </Text>
          {item.pageCount && (
            <>
              <Text style={[styles.metaDot, { color: theme.metaColor }]}> · </Text>
              <Text style={[styles.metaText, { color: theme.metaColor }]}>
                {item.pageCount} pages
              </Text>
            </>
          )}
        </View>
      </View>

      {/* Right: Progress/Score/Quiz */}
      <View style={styles.progressSection}>{renderProgressSection()}</View>
    </TouchableOpacity>
  );

  // Wrap in Swipeable for delete action (except training articles)
  if (item.source === 'training' || !onDelete) {
    return cardContent;
  }

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      overshootRight={false}
    >
      {cardContent}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.xs,
    borderRadius: COMPONENT_RADIUS.card,
    ...SHADOWS.sm,
  },
  iconContainer: {
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  content: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.cardTitle,
    marginBottom: SPACING.xxs,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    ...TYPOGRAPHY.caption,
  },
  metaDot: {
    ...TYPOGRAPHY.caption,
  },
  progressSection: {
    minWidth: SPACING.xxxl,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  progressContainer: {
    alignItems: 'flex-end',
  },
  progressTrack: {
    width: SPACING.xxxl,
    height: SPACING.xs,
    borderRadius: COMPONENT_RADIUS.progressBar,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: COMPONENT_RADIUS.progressBar,
  },
  progressText: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.xxs,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    ...TYPOGRAPHY.metric,
  },
  quizButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: COMPONENT_RADIUS.chip,
  },
  quizButtonText: {
    ...TYPOGRAPHY.buttonSmall,
  },
  deleteAction: {
    backgroundColor: JOURNEY_COLORS.low,
    justifyContent: 'center',
    alignItems: 'center',
    width: SPACING.huge + SPACING.xl, // ~88pt
    marginVertical: SPACING.xs,
    marginRight: SPACING.md,
    borderRadius: COMPONENT_RADIUS.card,
  },
  deleteContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    ...TYPOGRAPHY.caption,
    color: '#ffffff',
    marginTop: SPACING.xxs,
  },
});
