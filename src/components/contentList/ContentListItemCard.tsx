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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Swipeable } from 'react-native-gesture-handler';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { JOURNEY_COLORS, OVERLAY_COLORS } from '../../data/themes';
import { useDynamicCardTitle } from '../../hooks/useDynamicCardTitle';
import { ContentListItem, ContentSource, ContentCategory } from '../../types/contentList';
import { useTheme } from '../common/ThemeProvider';
import { cardBaseStyles } from './cardLayout';

interface ContentListItemCardProps {
  item: ContentListItem;
  onPress: () => void;
  onDelete?: () => void;
}

/**
 * Get icon name based on content source and category
 */
function getIconName(source: ContentSource, category: ContentCategory): keyof typeof Ionicons.glyphMap {
  switch (source) {
    case 'training':
      return 'stopwatch-outline';
    case 'generated':
      return 'sparkles-outline'; // Handled specially with MaterialCommunityIcons brain
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
}: ContentListItemCardProps) {
  const { theme } = useTheme();
  const { t: tConsumption } = useTranslation('consumption');
  const { t: tAddContent } = useTranslation('addContent');
  const { t: tCommon } = useTranslation('common');
  const swipeableRef = useRef<Swipeable>(null);
  const { titleStyle, onTextLayout } = useDynamicCardTitle(item.title);

  const iconName = getIconName(item.source, item.category);
  const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';
  const isProcessing = item.isProcessing;
  const hasProcessingProgress = typeof item.processingProgress === 'number';

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
          <Ionicons name="trash-outline" size={SIZES.iconLg} color={JOURNEY_COLORS.textPrimary} />
          <Text style={styles.deleteText}>{tCommon('actions.delete')}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderRightSection = () => {
    // Show quiz score if completed
    if (item.state === 'completed' && item.quizScore !== undefined) {
      return (
        <View style={cardBaseStyles.scoreContainer}>
          <Text style={[cardBaseStyles.scoreText, { color: JOURNEY_COLORS.success }]}>
            {item.quizScore}%
          </Text>
        </View>
      );
    }

    return null;
  };

  // Show progress bar for non-completed items (empty for not_started, filled for in_progress)
  const showProgressBar = item.state !== 'completed' && !isProcessing && !item.processingError;

  const cardContent = (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        cardBaseStyles.card,
        {
          backgroundColor: theme.secondaryBackground,
        },
        isProcessing && styles.processingCard,
      ]}
    >
      {/* Quiz Badge - top right corner */}
      {item.hasQuiz && (
        <View style={[styles.quizBadge, { backgroundColor: theme.secondaryBackground }]}>
          <Ionicons name="clipboard-outline" size={16} color={JOURNEY_COLORS.success} />
        </View>
      )}

      {/* Left: Small icon */}
      <View style={cardBaseStyles.iconContainer}>
        {(item.source === 'generated' || item.source === 'curriculum') ? (
          <MaterialCommunityIcons name="brain" size={SIZES.iconMd} color={theme.accentColor} />
        ) : (
          <Ionicons name={iconName} size={SIZES.iconMd} color={theme.accentColor} />
        )}
      </View>

      {/* Center: Title and metadata */}
      <View style={cardBaseStyles.titleContainer}>
        <Text
          style={[cardBaseStyles.title, styles.title, titleStyle, { color: theme.textColor }]}
          numberOfLines={2}
          ellipsizeMode="tail"
          onTextLayout={onTextLayout}
        >
          {item.title}
        </Text>
        <View style={styles.metadata}>
          <Text style={[styles.wordCount, { color: theme.metaColor }]}>
            {(() => {
              if (item.processingError) { return tAddContent('errors.import_failed'); }
              if (isProcessing) { return tConsumption('import.importing'); }
              return formatWordCount(item.wordCount);
            })()}
          </Text>
          {showProgressBar && (
            <View
              style={[
                styles.progressTrack,
                { backgroundColor: isDarkTheme ? OVERLAY_COLORS.progressInactiveDark : OVERLAY_COLORS.progressInactiveLight },
              ]}
            >
              {item.progress > 0 && (
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${item.progress}%`,
                      backgroundColor: theme.accentColor,
                    },
                  ]}
                />
              )}
            </View>
          )}
          {isProcessing && hasProcessingProgress && (
            <Text style={[styles.processingPercent, { color: theme.metaColor }]}>
              {Math.round(item.processingProgress ?? 0)}%
            </Text>
          )}
        </View>
      </View>

      {/* Right: Score/Quiz */}
      {renderRightSection()}
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
  title: {
    fontSize: TYPOGRAPHY.cardTitle.fontSize,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wordCount: {
    ...TYPOGRAPHY.caption,
    width: 96, // Fixed width to align all progress bars
    marginRight: SPACING.sm,
  },
  progressTrack: {
    flex: 1,
    height: SPACING.xs,
    borderRadius: COMPONENT_RADIUS.progressBar,
    overflow: 'hidden',
    marginRight: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: COMPONENT_RADIUS.progressBar,
  },
  processingCard: {
    opacity: 0.75,
  },
  processingPercent: {
    ...TYPOGRAPHY.caption,
    marginLeft: SPACING.xs,
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
    color: JOURNEY_COLORS.textPrimary,
    marginTop: SPACING.xxs,
  },
  quizBadge: {
    position: 'absolute',
    top: SPACING.xs, // 4pt
    right: SPACING.xs, // 4pt
    width: 20,
    height: 20,
    borderRadius: 10, // Full circle
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
