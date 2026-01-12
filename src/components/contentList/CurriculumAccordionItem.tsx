/**
 * CurriculumAccordionItem - Expandable Curriculum Card
 *
 * Displays a curriculum with expand/collapse functionality.
 * When expanded, shows nested article cards.
 * Starts expanded by default when newly added.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { SPACING, COMPONENT_RADIUS, SIZES, SHADOWS } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { JOURNEY_COLORS, COLOR_OPACITY } from '../../data/themes';
import { ContentListItem } from '../../types/contentList';
import { useTheme } from '../common/ThemeProvider';
import { ContentListItemCard } from './ContentListItemCard';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CurriculumAccordionItemProps {
  item: ContentListItem;
  onPress: () => void;
  onDelete?: () => void;
  onArticlePress: (article: ContentListItem) => void;
  defaultExpanded?: boolean;
}

export function CurriculumAccordionItem({
  item,
  onPress,
  onDelete,
  onArticlePress,
  defaultExpanded = true,
}: CurriculumAccordionItemProps) {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const rotateAnim = useRef(new Animated.Value(defaultExpanded ? 1 : 0)).current;
  const swipeableRef = useRef<Swipeable>(null);

  const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotateAnim]);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    swipeableRef.current?.close();
    onDelete?.();
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity onPress={handleDelete} style={styles.deleteAction}>
        <Animated.View style={[styles.deleteContent, { transform: [{ scale }] }]}>
          <Ionicons name="trash-outline" size={SIZES.iconLg} color="#ffffff" />
          <Text style={styles.deleteText}>Delete</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const progressText = item.curriculumProgress
    ? `${item.curriculumProgress.completed}/${item.curriculumProgress.total} articles`
    : '';

  const cardContent = (
    <View style={styles.container}>
      {/* Curriculum Header */}
      <TouchableOpacity
        onPress={onPress}
        onLongPress={toggleExpanded}
        activeOpacity={0.7}
        style={[
          styles.card,
          { backgroundColor: theme.secondaryBackground },
        ]}
      >
        {/* Left: Icon */}
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: isDarkTheme ? COLOR_OPACITY.accentTint : `${theme.accentColor}20` },
          ]}
        >
          <Ionicons name="school-outline" size={SIZES.iconLg} color={theme.accentColor} />
        </View>

        {/* Center: Title and progress */}
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
              {progressText}
            </Text>
            {item.state === 'completed' && (
              <>
                <Text style={[styles.metaDot, { color: theme.metaColor }]}> · </Text>
                <Text style={[styles.metaText, { color: JOURNEY_COLORS.success }]}>
                  Complete
                </Text>
              </>
            )}
          </View>
        </View>

        {/* Right: Progress bar and expand chevron */}
        <View style={styles.rightSection}>
          {/* Progress bar */}
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
          </View>

          {/* Expand/collapse button */}
          <TouchableOpacity onPress={toggleExpanded} style={styles.chevronButton}>
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              <Ionicons
                name="chevron-forward"
                size={SIZES.iconMd}
                color={theme.metaColor}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Nested Articles */}
      {isExpanded && item.curriculumArticles && item.curriculumArticles.length > 0 && (
        <View style={styles.nestedContainer}>
          {item.curriculumArticles.map((article) => (
            <View key={article.id} style={styles.nestedArticle}>
              <ContentListItemCard
                item={article}
                onPress={() => onArticlePress(article)}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );

  // Wrap in Swipeable for delete action
  if (!onDelete) {
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
  container: {
    marginVertical: SPACING.xs,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
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
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  progressContainer: {
    marginBottom: SPACING.xs,
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
  chevronButton: {
    padding: SPACING.xs,
  },
  nestedContainer: {
    marginLeft: SPACING.lg,
    marginTop: SPACING.xs,
  },
  nestedArticle: {
    marginVertical: -SPACING.xs, // Tighter spacing for nested items
  },
  deleteAction: {
    backgroundColor: JOURNEY_COLORS.low,
    justifyContent: 'center',
    alignItems: 'center',
    width: SPACING.huge + SPACING.xl,
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
