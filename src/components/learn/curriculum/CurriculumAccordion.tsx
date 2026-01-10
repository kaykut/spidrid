/**
 * CurriculumAccordion Component
 *
 * An expandable card that shows a curriculum's title, progress, and
 * article list. Tapping the header expands/collapses the article list.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, COMPONENT_RADIUS } from '../../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../../constants/typography';
import { JOURNEY_COLORS } from '../../../data/themes';
import { Curriculum } from '../../../types/curriculum';
import { TONE_DEFINITIONS } from '../../../types/generated';
import { useTheme } from '../../common/ThemeProvider';
import { ArticleRow } from './ArticleRow';

interface Props {
  curriculum: Curriculum;
  onArticlePress: (articleIndex: number) => void;
}

export function CurriculumAccordion({ curriculum, onArticlePress }: Props) {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const toneDefinition = TONE_DEFINITIONS.find((t) => t.id === curriculum.tone);
  const progress = curriculum.completedArticleCount / curriculum.articleCount;
  const displayTitle = curriculum.title || curriculum.goal;

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.secondaryBackground }]}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpanded}
        activeOpacity={0.7}
      >
        <View style={styles.headerContent}>
          <Text
            style={[styles.title, { color: theme.textColor }]}
            numberOfLines={2}
          >
            {displayTitle}
          </Text>
          <View style={styles.meta}>
            <Text style={styles.metaText}>
              {curriculum.completedArticleCount}/{curriculum.articleCount} articles
            </Text>
            <Text style={styles.metaText}>{toneDefinition?.emoji}</Text>
            {curriculum.isCompleted && (
              <Ionicons
                name="checkmark-circle"
                size={14}
                color={theme.accentColor}
              />
            )}
          </View>
          <View style={[styles.progressBar, { backgroundColor: theme.backgroundColor }]}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: theme.accentColor,
                  width: `${progress * 100}%`,
                },
              ]}
            />
          </View>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={JOURNEY_COLORS.textSecondary}
          style={styles.chevron}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.articlesContainer}>
          {curriculum.articles.map((article, index) => (
            <ArticleRow
              key={article.id}
              article={article}
              onPress={() => onArticlePress(index)}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: COMPONENT_RADIUS.card,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.body,
    fontWeight: FONT_WEIGHTS.semibold,
    marginBottom: SPACING.xs,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  metaText: {
    ...TYPOGRAPHY.caption,
    color: JOURNEY_COLORS.textSecondary,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginTop: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  chevron: {
    marginLeft: SPACING.sm,
  },
  articlesContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
});
