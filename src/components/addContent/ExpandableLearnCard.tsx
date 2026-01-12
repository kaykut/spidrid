/**
 * ExpandableLearnCard
 *
 * Expandable card for AI article/curriculum generation.
 * Unified form for single articles (count=1) or curricula (count>1).
 */

import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
  Animated,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../common/ThemeProvider';
import { animateLayout } from '../../constants/animations';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { useGeneratedStore } from '../../store/generatedStore';
import { useCurriculumStore } from '../../store/curriculumStore';
import { useJourneyStore } from '../../store/journeyStore';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { ArticleTone, TONE_DEFINITIONS, DURATION_OPTIONS } from '../../types/generated';
import { Paywall } from '../paywall/Paywall';

const ARTICLE_COUNT_OPTIONS = [1, 3, 5, 7, 10];

interface ExpandableLearnCardProps {
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
  onClose: () => void;
}

export function ExpandableLearnCard({ isExpanded, onExpandChange, onClose }: ExpandableLearnCardProps) {
  const { theme } = useTheme();
  const { generateArticle, isGenerating: isGeneratingArticle } = useGeneratedStore();
  const { createCurriculum, isGenerating: isGeneratingCurriculum } = useCurriculumStore();
  const { avgWpmLast3 } = useJourneyStore();
  const { isPremium } = useSubscriptionStore();

  // Form state
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState(3);
  const [style, setStyle] = useState<ArticleTone>('explanatory');
  const [articleCount, setArticleCount] = useState(1);
  const [showPaywall, setShowPaywall] = useState(false);

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const isGenerating = isGeneratingArticle || isGeneratingCurriculum;
  const avgWpm = avgWpmLast3 || 250;

  // Calculated values
  const estimatedWords = Math.round(duration * avgWpm);
  const totalWords = estimatedWords * articleCount;
  const totalMinutes = duration * articleCount;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotateAnim]);

  const chevronRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const handleToggle = () => {
    animateLayout();
    const newExpanded = !isExpanded;
    onExpandChange(newExpanded);
    if (!newExpanded) {
      resetForm();
      Keyboard.dismiss();
    }
  };

  const resetForm = () => {
    setTopic('');
    setDuration(3);
    setStyle('explanatory');
    setArticleCount(1);
  };

  const handleGenerate = async () => {
    if (!isPremium) {
      setShowPaywall(true);
      return;
    }

    if (!topic.trim() || isGenerating) return;

    if (articleCount === 1) {
      // Single article generation
      const article = await generateArticle({
        topic: topic.trim(),
        durationMinutes: duration,
        tone: style,
        avgWpm,
        userId: 'current-user',
      });

      if (article) {
        resetForm();
        onExpandChange(false);
        onClose();
        router.push(`/generated/${article.id}`);
      }
    } else {
      // Curriculum generation
      const curriculumId = await createCurriculum(
        {
          goal: topic.trim(),
          articleCount,
          tone: style,
          durationMinutes: duration,
        },
        avgWpm
      );

      if (curriculumId) {
        resetForm();
        onExpandChange(false);
        onClose();
        router.push(`/curriculum/${curriculumId}/article/0`);
      }
    }
  };

  const canGenerate = topic.trim().length >= (articleCount === 1 ? 1 : 10) && !isGenerating;

  return (
    <>
      <Paywall visible={showPaywall} onClose={() => setShowPaywall(false)} />
      <View
        style={[
          styles.cardWrapper,
          { backgroundColor: theme.secondaryBackground },
          isExpanded && styles.cardExpanded,
        ]}
      >
        {/* Header */}
        <TouchableOpacity style={styles.cardHeader} onPress={handleToggle} activeOpacity={0.7}>
          <View style={[styles.iconContainer, { backgroundColor: `${JOURNEY_COLORS.success}20` }]}>
            <MaterialCommunityIcons name="brain" size={SIZES.iconLg} color={JOURNEY_COLORS.success} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: theme.textColor }]}>Learn</Text>
            <Text style={[styles.description, { color: theme.textColor }]}>
              Generate articles or curricula on topics you want to master
            </Text>
          </View>
          <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
            <Ionicons name="chevron-forward" size={SIZES.iconMd} color={theme.textColor} style={styles.chevron} />
          </Animated.View>
        </TouchableOpacity>

        {/* Expanded Form */}
        {isExpanded && (
          <View style={styles.expandedContent}>
            {/* Topic Input */}
            <Text style={[styles.label, { color: theme.textColor }]}>Topic</Text>
            <TextInput
              style={[styles.topicInput, { backgroundColor: theme.backgroundColor, color: theme.textColor }]}
              placeholder="What do you want to learn about?"
              placeholderTextColor={`${theme.textColor}60`}
              value={topic}
              onChangeText={setTopic}
              multiline
              maxLength={500}
              editable={!isGenerating}
            />

            {/* Duration Pills */}
            <Text style={[styles.label, { color: theme.textColor }]}>Duration</Text>
            <View style={styles.pillRow}>
              {DURATION_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt.minutes}
                  style={[
                    styles.pill,
                    { backgroundColor: theme.backgroundColor },
                    duration === opt.minutes && styles.pillSelected,
                    duration === opt.minutes && { backgroundColor: JOURNEY_COLORS.success },
                  ]}
                  onPress={() => !isGenerating && setDuration(opt.minutes)}
                  disabled={isGenerating}
                >
                  <Text
                    style={[
                      styles.pillText,
                      { color: theme.textColor },
                      duration === opt.minutes && styles.pillTextSelected,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Style Pills */}
            <Text style={[styles.label, { color: theme.textColor }]}>Style</Text>
            <View style={styles.pillRow}>
              {TONE_DEFINITIONS.map((t) => (
                <TouchableOpacity
                  key={t.id}
                  style={[
                    styles.pill,
                    styles.stylePill,
                    { backgroundColor: theme.backgroundColor },
                    style === t.id && styles.pillSelected,
                    style === t.id && { backgroundColor: JOURNEY_COLORS.success },
                  ]}
                  onPress={() => !isGenerating && setStyle(t.id)}
                  disabled={isGenerating}
                >
                  <Text
                    style={[
                      styles.pillText,
                      { color: theme.textColor },
                      style === t.id && styles.pillTextSelected,
                    ]}
                  >
                    {t.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Article Count Pills */}
            <Text style={[styles.label, { color: theme.textColor }]}># of Articles</Text>
            <View style={styles.pillRow}>
              {ARTICLE_COUNT_OPTIONS.map((count) => (
                <TouchableOpacity
                  key={count}
                  style={[
                    styles.pill,
                    { backgroundColor: theme.backgroundColor },
                    articleCount === count && styles.pillSelected,
                    articleCount === count && { backgroundColor: JOURNEY_COLORS.success },
                  ]}
                  onPress={() => !isGenerating && setArticleCount(count)}
                  disabled={isGenerating}
                >
                  <Text
                    style={[
                      styles.pillText,
                      { color: theme.textColor },
                      articleCount === count && styles.pillTextSelected,
                    ]}
                  >
                    {count}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Summary Section */}
            <View style={[styles.summarySection, { backgroundColor: theme.backgroundColor }]}>
              <Text style={[styles.summaryText, { color: theme.textColor }]}>
                {articleCount === 1
                  ? `1 article, ~${estimatedWords.toLocaleString()} words, ${duration} min read`
                  : `${articleCount} articles, ~${totalWords.toLocaleString()} total words, ${totalMinutes} min total`}
              </Text>
            </View>

            {/* Generate Button */}
            <TouchableOpacity
              style={[
                styles.generateButton,
                { backgroundColor: JOURNEY_COLORS.success },
                !canGenerate && styles.generateButtonDisabled,
              ]}
              onPress={handleGenerate}
              disabled={!canGenerate}
            >
              {isGenerating ? (
                <ActivityIndicator color={JOURNEY_COLORS.textPrimary} />
              ) : (
                <Text style={styles.generateButtonText}>
                  {articleCount === 1 ? 'Generate Article' : 'Create Curriculum'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: COMPONENT_RADIUS.card,
    overflow: 'hidden',
  },
  cardExpanded: {
    paddingBottom: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  iconContainer: {
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    borderRadius: COMPONENT_RADIUS.badge,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.cardSubtitle,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  description: {
    ...TYPOGRAPHY.body,
    opacity: 0.7,
  },
  chevron: {
    opacity: 0.5,
    marginLeft: SPACING.sm,
  },
  expandedContent: {
    paddingHorizontal: SPACING.md,
  },
  label: {
    ...TYPOGRAPHY.label,
    marginBottom: SPACING.xs,
    marginTop: SPACING.sm,
  },
  topicInput: {
    padding: SPACING.md,
    borderRadius: COMPONENT_RADIUS.input,
    ...TYPOGRAPHY.body,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  pill: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: COMPONENT_RADIUS.chip,
  },
  stylePill: {
    flex: 1,
    alignItems: 'center',
  },
  pillSelected: {
    // backgroundColor set dynamically
  },
  pillText: {
    ...TYPOGRAPHY.caption,
  },
  pillTextSelected: {
    color: JOURNEY_COLORS.textPrimary,
    fontWeight: '600',
  },
  summarySection: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    borderRadius: COMPONENT_RADIUS.chip,
  },
  summaryText: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
    opacity: 0.8,
  },
  generateButton: {
    marginTop: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
  },
  generateButtonDisabled: {
    opacity: 0.6,
  },
  generateButtonText: {
    color: JOURNEY_COLORS.textPrimary,
    ...TYPOGRAPHY.button,
  },
});
