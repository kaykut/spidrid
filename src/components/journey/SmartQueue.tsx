/**
 * SmartQueue
 *
 * Displays the primary article recommendation with expandable additional options
 * including stretch goal and continue topic cards.
 *
 * Part of the Detailed Journey view (PRD section 5.4).
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { LAYOUT_ANIMATION_EXPAND } from '../../constants/animations';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS, LETTER_SPACING } from '../../constants/typography';
import { withOpacity, OPACITY } from '../../utils/colorUtils';
import { JOURNEY_COLORS, COLORS } from '../../data/themes';
import { ArticleRecommendation, UserState } from '../../types/journey';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface SmartQueueProps {
  /** The primary recommendation to display prominently */
  primaryRecommendation: ArticleRecommendation;
  /** Stretch goal recommendation (hidden during CONSOLIDATE state) */
  stretchRecommendation?: ArticleRecommendation | null;
  /** Continue topic recommendation */
  continueTopicRecommendation?: ArticleRecommendation | null;
  /** Current user state for adaptive UI */
  userState: UserState;
  /** Callback when user selects an article */
  onSelectArticle: (articleId: string, wpm: number, cardType: string) => void;
  /** Whether the additional options are expanded */
  expanded: boolean;
  /** Callback to toggle expansion */
  onToggleExpand: () => void;
}

export function SmartQueue({
  primaryRecommendation,
  stretchRecommendation,
  continueTopicRecommendation,
  userState,
  onSelectArticle,
  expanded,
  onToggleExpand,
}: SmartQueueProps) {
  const handleToggleExpand = () => {
    LayoutAnimation.configureNext(LAYOUT_ANIMATION_EXPAND);
    onToggleExpand();
  };

  const selectRecommendation = (rec: ArticleRecommendation | null | undefined, cardType: string) => {
    if (rec) {
      onSelectArticle(rec.articleId, rec.suggestedWpm, cardType);
    }
  };

  // Calculate stretch delta for display
  const stretchDelta = stretchRecommendation
    ? stretchRecommendation.suggestedWpm - primaryRecommendation.suggestedWpm
    : 0;

  // Hide stretch during consolidate state
  const showStretch = userState !== 'consolidate' && stretchRecommendation;

  return (
    <View style={styles.container}>
      {/* Primary Card (UpNextCard style) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => selectRecommendation(primaryRecommendation, 'primary')}
        style={styles.primaryCardTouchable}
      >
        <View style={[styles.primaryCard, { backgroundColor: JOURNEY_COLORS.surface }]}>
          <View style={styles.primaryHeader}>
            <View style={styles.primaryBadge}>
              <Text style={styles.primaryBadgeText}>UP NEXT</Text>
            </View>
            <Text style={[styles.primaryWpm, { color: JOURNEY_COLORS.accent }]}>
              {primaryRecommendation.suggestedWpm} WPM
            </Text>
          </View>

          <Text
            style={[styles.primaryTitle, { color: JOURNEY_COLORS.textPrimary }]}
            numberOfLines={2}
          >
            {primaryRecommendation.title}
          </Text>

          <View style={styles.primaryMeta}>
            <Text style={[styles.primaryMetaText, { color: JOURNEY_COLORS.textSecondary }]}>
              {primaryRecommendation.topicName}
            </Text>
            <Text style={[styles.primaryMetaDot, { color: JOURNEY_COLORS.textTertiary }]}>
              {' '}&bull;{' '}
            </Text>
            <Text style={[styles.primaryMetaText, { color: JOURNEY_COLORS.textSecondary }]}>
              {primaryRecommendation.estimatedMinutes} min
            </Text>
          </View>

          <View style={[styles.primaryAction, { backgroundColor: JOURNEY_COLORS.accent }]}>
            <Text style={styles.primaryActionText}>Start Reading</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* More Options Toggle */}
      {(showStretch || continueTopicRecommendation) && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleToggleExpand}
          style={styles.expandToggle}
        >
          <Text style={[styles.expandToggleText, { color: JOURNEY_COLORS.textSecondary }]}>
            {expanded ? 'Hide options' : 'More options'}
          </Text>
          <Text style={[styles.expandToggleArrow, { color: JOURNEY_COLORS.textSecondary }]}>
            {expanded ? ' \u2191' : ' \u2192'}
          </Text>
        </TouchableOpacity>
      )}

      {/* Expanded Options */}
      {expanded && (
        <View style={styles.expandedContainer}>
          {/* Stretch Goal Card */}
          {showStretch && (
            <TouchableOpacity activeOpacity={0.8} onPress={() => selectRecommendation(stretchRecommendation, 'stretch')}>
              <View
                style={[
                  styles.optionCard,
                  styles.stretchCard,
                  { backgroundColor: JOURNEY_COLORS.surface },
                ]}
              >
                <View style={styles.optionHeader}>
                  <Text style={styles.optionIcon}>&#x1F525;</Text>
                  <Text style={[styles.optionLabel, { color: JOURNEY_COLORS.warning }]}>
                    STRETCH GOAL
                  </Text>
                </View>

                <Text style={[styles.optionTitle, { color: JOURNEY_COLORS.textPrimary }]}>
                  Same article at {stretchRecommendation!.suggestedWpm} WPM (+{stretchDelta})
                </Text>

                <Text style={[styles.optionSubtitle, { color: JOURNEY_COLORS.textSecondary }]}>
                  "Push your edge—comprehension may dip"
                </Text>

                <View style={styles.optionActionRow}>
                  <View style={[styles.optionAction, { backgroundColor: JOURNEY_COLORS.warning }]}>
                    <Text style={styles.optionActionText}>Accept Challenge</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}

          {/* Continue Topic Card */}
          {continueTopicRecommendation && (
            <TouchableOpacity activeOpacity={0.8} onPress={() => selectRecommendation(continueTopicRecommendation, 'continue')}>
              <View style={[styles.optionCard, { backgroundColor: JOURNEY_COLORS.surface }]}>
                <View style={styles.optionHeader}>
                  <Text style={styles.optionIcon}>&#x1F4DA;</Text>
                  <Text style={[styles.optionLabel, { color: JOURNEY_COLORS.accent }]}>
                    CONTINUE TOPIC
                  </Text>
                </View>

                <Text
                  style={[styles.optionTitle, { color: JOURNEY_COLORS.textPrimary }]}
                  numberOfLines={2}
                >
                  {continueTopicRecommendation.topicName}: {continueTopicRecommendation.title}
                </Text>

                <Text style={[styles.optionSubtitle, { color: JOURNEY_COLORS.textSecondary }]}>
                  {continueTopicRecommendation.topicName} {' '}&bull;{' '} In progress
                </Text>

                <View style={styles.optionActionRow}>
                  <View
                    style={[
                      styles.optionAction,
                      styles.continueAction,
                      { borderColor: JOURNEY_COLORS.accent },
                    ]}
                  >
                    <Text style={[styles.optionActionText, { color: JOURNEY_COLORS.accent }]}>
                      Continue {'\u2192'}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },

  // Primary Card (UpNextCard style)
  primaryCardTouchable: {
    borderRadius: COMPONENT_RADIUS.card,
  },
  primaryCard: {
    borderRadius: COMPONENT_RADIUS.card,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: JOURNEY_COLORS.surfaceLight,
  },
  primaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  primaryBadge: {
    backgroundColor: withOpacity(JOURNEY_COLORS.accent, OPACITY.light),
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: COMPONENT_RADIUS.chip / 2,
  },
  primaryBadgeText: {
    ...TYPOGRAPHY.labelSmall,
    fontWeight: FONT_WEIGHTS.semibold,
    color: JOURNEY_COLORS.accent,
    letterSpacing: LETTER_SPACING.normal,
  },
  primaryWpm: {
    ...TYPOGRAPHY.metric,
  },
  primaryTitle: {
    ...TYPOGRAPHY.cardTitle,
    marginBottom: SPACING.sm,
  },
  primaryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  primaryMetaText: {
    ...TYPOGRAPHY.label,
  },
  primaryMetaDot: {
    ...TYPOGRAPHY.label,
  },
  primaryAction: {
    paddingVertical: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
  },
  primaryActionText: {
    ...TYPOGRAPHY.button,
    color: JOURNEY_COLORS.background,
  },

  // Expand Toggle
  expandToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    marginTop: SPACING.sm,
  },
  expandToggleText: {
    ...TYPOGRAPHY.label,
    fontWeight: FONT_WEIGHTS.medium,
  },
  expandToggleArrow: {
    ...TYPOGRAPHY.label,
  },

  // Expanded Container
  expandedContainer: {
    marginTop: SPACING.sm,
    gap: SPACING.md,
  },

  // Option Cards (Stretch & Continue)
  optionCard: {
    borderRadius: COMPONENT_RADIUS.card,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: JOURNEY_COLORS.surfaceLight,
  },
  stretchCard: {
    borderColor: withOpacity(JOURNEY_COLORS.warning, OPACITY.strong),
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  optionIcon: {
    fontSize: SIZES.iconSm,
  },
  optionLabel: {
    ...TYPOGRAPHY.labelSmall,
    fontWeight: FONT_WEIGHTS.semibold,
    letterSpacing: LETTER_SPACING.normal,
  },
  optionTitle: {
    ...TYPOGRAPHY.cardSubtitle,
    marginBottom: SPACING.xs,
  },
  optionSubtitle: {
    ...TYPOGRAPHY.label,
    fontStyle: 'italic',
    marginBottom: SPACING.md,
  },
  optionActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  optionAction: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
  },
  continueAction: {
    backgroundColor: COLORS.transparent,
    borderWidth: 1,
  },
  optionActionText: {
    ...TYPOGRAPHY.buttonSmall,
    color: JOURNEY_COLORS.background,
  },
});
