/**
 * ArticleRow Component
 *
 * A single row in the CurriculumAccordion showing article status,
 * title, and progress. Handles locked, generating, failed, and
 * completed states with appropriate icons and interactions.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING } from '../../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../../constants/typography';
import { JOURNEY_COLORS } from '../../../data/themes';
import { useCurriculumStore } from '../../../store/curriculumStore';
import { CurriculumArticle } from '../../../types/curriculum';
import { useTheme } from '../../common/ThemeProvider';

interface Props {
  article: CurriculumArticle;
  onPress: () => void;
}

export function ArticleRow({ article, onPress }: Props) {
  const { theme } = useTheme();

  const isLocked = article.completionStatus === 'locked';
  const isCompleted = article.completionStatus === 'completed';
  const isGenerating = article.generationStatus === 'generating';
  const isFailed = article.generationStatus === 'failed';
  const canRead = !isLocked && article.generationStatus === 'generated';

  const handlePress = () => {
    if (isLocked || isGenerating) {
      // Do nothing when locked or generating
      return;
    }

    if (isFailed) {
      // Trigger retry
      useCurriculumStore.getState().generateArticle(article.curriculumId, article.orderIndex);
      return;
    }

    if (canRead) {
      onPress();
    }
  };

  const getStatusIcon = () => {
    if (isCompleted) {
      return (
        <Ionicons
          name="checkmark-circle"
          size={20}
          color={theme.accentColor}
        />
      );
    }
    if (isLocked) {
      return (
        <Ionicons
          name="lock-closed"
          size={18}
          color={JOURNEY_COLORS.textSecondary}
        />
      );
    }
    if (isGenerating) {
      return (
        <ActivityIndicator
          testID="generating-spinner"
          size="small"
          color={theme.accentColor}
        />
      );
    }
    if (isFailed) {
      return (
        <Ionicons
          name="alert-circle"
          size={20}
          color="#ff6b6b"
        />
      );
    }
    return (
      <Ionicons
        name="arrow-forward"
        size={20}
        color={theme.accentColor}
      />
    );
  };

  const getStatusText = () => {
    if (isLocked) {
      return 'Complete previous article to unlock';
    }
    if (isGenerating) {
      return 'Generating...';
    }
    if (isFailed) {
      return 'Generation failed - tap to retry';
    }
    if (isCompleted && article.comprehensionScore !== undefined) {
      return null; // Will show stats instead
    }
    return null;
  };

  const statusText = getStatusText();

  return (
    <TouchableOpacity
      testID="article-row"
      style={[
        styles.row,
        { borderBottomColor: theme.backgroundColor },
        isLocked && styles.rowLocked,
      ]}
      onPress={handlePress}
      disabled={isLocked || isGenerating}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.index,
          {
            backgroundColor: isCompleted
              ? theme.accentColor
              : theme.backgroundColor,
          },
        ]}
      >
        <Text
          style={[
            styles.indexText,
            {
              color: isCompleted
                ? JOURNEY_COLORS.textPrimary
                : JOURNEY_COLORS.textSecondary,
            },
          ]}
        >
          {article.orderIndex + 1}
        </Text>
      </View>

      <View style={styles.content}>
        <Text
          style={[styles.title, { color: theme.textColor }]}
          numberOfLines={1}
        >
          {article.title}
        </Text>

        {statusText && (
          <Text style={styles.status}>{statusText}</Text>
        )}

        {isCompleted && article.comprehensionScore !== undefined && (
          <Text style={[styles.stats, { color: theme.accentColor }]}>
            {article.readingWPM} WPM · {article.comprehensionScore}%
          </Text>
        )}
      </View>

      <View style={styles.icon}>{getStatusIcon()}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },
  rowLocked: {
    opacity: 0.5,
  },
  index: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  indexText: {
    ...TYPOGRAPHY.labelSmall,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  content: {
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.body,
    fontWeight: FONT_WEIGHTS.medium,
  },
  status: {
    ...TYPOGRAPHY.caption,
    color: JOURNEY_COLORS.textSecondary,
    marginTop: SPACING.xxs,
  },
  stats: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.xxs,
  },
  icon: {
    marginLeft: SPACING.sm,
  },
});
