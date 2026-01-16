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
import { SPACING, COMPONENT_SPACING, COMPONENT_RADIUS, SIZES, SHADOWS } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { ContentListItem } from '../../types/contentList';
import { useTheme } from '../common/ThemeProvider';
import { ContentListItemCard } from './ContentListItemCard';
import { useCurriculumStore } from '../../store/curriculumStore';
import { cardBaseStyles, CARD_LAYOUT } from './cardLayout';
import { useDynamicCardTitle } from '../../hooks/useDynamicCardTitle';

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
  const toggleExpandedInStore = useCurriculumStore((state) => state.toggleExpanded);
  const isExpandedInStore = useCurriculumStore((state) => state.isExpanded(item.sourceId));
  const swipeableRef = useRef<Swipeable>(null);
  const { titleStyle, onTextLayout } = useDynamicCardTitle(item.title);

  // Use store state, falling back to defaultExpanded for initialization
  const isExpanded = isExpandedInStore !== undefined ? isExpandedInStore : defaultExpanded;
  const rotateAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotateAnim]);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleExpandedInStore(item.sourceId);
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

  const totalArticles = item.curriculumProgress?.total || 0;
  const completedArticles = item.curriculumProgress?.completed || 0;

  // Render dot indicators for article completion
  const renderDotIndicators = () => {
    if (!item.curriculumProgress) return null;

    const dots = [];
    for (let i = 0; i < totalArticles; i++) {
      const isCompleted = i < completedArticles;
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            {
              borderColor: theme.accentColor,
              backgroundColor: isCompleted ? theme.accentColor : 'transparent',
            },
          ]}
        >
          {isCompleted && (
            <Ionicons name="checkmark" size={6} color={theme.background} />
          )}
        </View>
      );
    }
    return <View style={styles.dotContainer}>{dots}</View>;
  };

  const cardContent = (
    <View style={styles.container}>
      {/* Curriculum Header */}
      <TouchableOpacity
        onPress={toggleExpanded}
        activeOpacity={0.7}
        style={[
          cardBaseStyles.card,
          { backgroundColor: theme.secondaryBackground },
        ]}
      >
        {/* Left: Icon (no background) - matching article card spacing */}
        <View style={cardBaseStyles.iconContainer}>
          <Ionicons name="school-outline" size={SIZES.iconMd} color={theme.accentColor} />
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
            <Text style={[styles.metaText, { color: theme.metaColor }]}>
              {totalArticles} {totalArticles === 1 ? 'article' : 'articles'}
            </Text>
            {renderDotIndicators()}
          </View>
        </View>

        {/* Right: Expand/collapse chevron */}
        <TouchableOpacity onPress={toggleExpanded} style={cardBaseStyles.chevronButton}>
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <Ionicons
              name="chevron-forward"
              size={SIZES.iconMd}
              color={theme.metaColor}
            />
          </Animated.View>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Nested Articles */}
      {isExpanded && item.curriculumArticles && item.curriculumArticles.length > 0 && (
        <View style={styles.nestedContainer}>
          {item.curriculumArticles.map((article) => (
            <View key={article.id} style={styles.nestedArticleWrapper}>
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
  title: {
    fontSize: TYPOGRAPHY.cardTitle.fontSize,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  metaText: {
    ...TYPOGRAPHY.caption,
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nestedContainer: {
    marginLeft: SPACING.lg,
    marginTop: COMPONENT_SPACING.listItemGap,
    marginBottom: SPACING.md, // Extra space before next item
    gap: COMPONENT_SPACING.listItemGap,
  },
  nestedArticleWrapper: {
    marginVertical: -SPACING.xs, // Neutralize card's built-in margins
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
