/**
 * Learn Sub-Tab Screen
 *
 * AI-powered article generation for premium users.
 * Users can generate custom articles on any topic with configurable
 * reading duration and writing tone.
 */

import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../../components/common/ThemeProvider';
import { GenerateArticleModal, GeneratedArticleCard } from '../../../components/learn';
import { CurriculumAccordion, CurriculumCreationWizard } from '../../../components/learn/curriculum';
import { Paywall } from '../../../components/paywall/Paywall';
import { SPACING, COMPONENT_RADIUS, SIZES, COMPONENT_SIZES } from '../../../constants/spacing';
import { TYPOGRAPHY } from '../../../constants/typography';
import { JOURNEY_COLORS } from '../../../data/themes';
import { useCurriculumStore } from '../../../store/curriculumStore';
import { useGeneratedStore } from '../../../store/generatedStore';
import { useJourneyStore } from '../../../store/journeyStore';
import { useSubscriptionStore } from '../../../store/subscriptionStore';

type Segment = 'articles' | 'curricula';

export default function LearnScreen() {
  const { theme } = useTheme();
  const [segment, setSegment] = useState<Segment>('articles');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showCurriculumWizard, setShowCurriculumWizard] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  const { articles, isGenerating } = useGeneratedStore();
  const { isPremium } = useSubscriptionStore();
  const { avgWpmLast3 } = useJourneyStore();
  const { getAllCurricula, isGenerating: isCurriculumGenerating } = useCurriculumStore();
  const curricula = getAllCurricula();

  // Only show completed articles
  const completedArticles = articles.filter((a) => a.status === 'complete');

  // Use avgWpmLast3 or default to 250 for new users
  const avgWpm = avgWpmLast3 || 250;

  const handleGeneratePress = () => {
    if (!isPremium) {
      setShowPaywall(true);
      return;
    }
    setShowGenerateModal(true);
  };

  const handleArticlePress = (articleId: string) => {
    router.push(`/generated/${articleId}`);
  };

  const handleCreateCurriculumPress = () => {
    if (!isPremium) {
      setShowPaywall(true);
      return;
    }
    setShowCurriculumWizard(true);
  };

  const handleCurriculumArticlePress = (curriculumId: string, articleIndex: number) => {
    router.push(`/curriculum/${curriculumId}/article/${articleIndex}`);
  };

  return (
    <>
      <Paywall visible={showPaywall} onClose={() => setShowPaywall(false)} />

      <GenerateArticleModal
        visible={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        avgWpm={avgWpm}
      />

      <CurriculumCreationWizard
        visible={showCurriculumWizard}
        onClose={() => setShowCurriculumWizard(false)}
        avgWpm={avgWpm}
      />

      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.textColor }]}>Learn</Text>

          {/* Segmented Control */}
          <View style={[styles.segmentContainer, { backgroundColor: theme.secondaryBackground }]}>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                segment === 'articles' && { backgroundColor: theme.accentColor },
              ]}
              onPress={() => setSegment('articles')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.segmentText,
                  { color: theme.textColor },
                  segment === 'articles' && styles.segmentTextActive,
                ]}
              >
                Articles
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                segment === 'curricula' && { backgroundColor: theme.accentColor },
              ]}
              onPress={() => setSegment('curricula')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.segmentText,
                  { color: theme.textColor },
                  segment === 'curricula' && styles.segmentTextActive,
                ]}
              >
                Curricula
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          {segment === 'articles' ? (
            <>
              {/* Generate Button */}
              <TouchableOpacity
                style={[
                  styles.generateButton,
                  { backgroundColor: theme.accentColor },
                  isGenerating && styles.generateButtonDisabled,
                ]}
                onPress={handleGeneratePress}
                disabled={isGenerating}
                activeOpacity={0.8}
              >
                {isGenerating ? (
                  <ActivityIndicator color={JOURNEY_COLORS.textPrimary} />
                ) : (
                  <Text style={styles.generateButtonText}>+ Generate Article</Text>
                )}
              </TouchableOpacity>

              {/* Article List or Empty State */}
              {completedArticles.length > 0 ? (
                <>
                  <Text style={[styles.sectionTitle, { color: theme.textColor }]}>My Articles</Text>
                  <FlatList
                    data={completedArticles}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <GeneratedArticleCard
                        article={item}
                        onPress={() => handleArticlePress(item.id)}
                      />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                  />
                </>
              ) : (
                <View style={styles.emptyState}>
                  <View style={[styles.emptyIconCircle, { backgroundColor: theme.secondaryBackground }]}>
                    <Ionicons name="sparkles-outline" size={SIZES.iconHuge} color={theme.accentColor} />
                  </View>
                  <Text style={[styles.emptyTitle, { color: theme.textColor }]}>
                    No articles yet
                  </Text>
                  <Text style={[styles.emptyText, { color: JOURNEY_COLORS.textSecondary }]}>
                    Generate your first AI-powered article on any topic you want to learn about.
                  </Text>
                </View>
              )}
            </>
          ) : (
            /* Curricula Segment */
            <>
              {/* Create Curriculum Button */}
              <TouchableOpacity
                style={[
                  styles.generateButton,
                  { backgroundColor: theme.accentColor },
                  isCurriculumGenerating && styles.generateButtonDisabled,
                ]}
                onPress={handleCreateCurriculumPress}
                disabled={isCurriculumGenerating}
                activeOpacity={0.8}
              >
                {isCurriculumGenerating ? (
                  <ActivityIndicator color={JOURNEY_COLORS.textPrimary} />
                ) : (
                  <Text style={styles.generateButtonText}>+ Create Curriculum</Text>
                )}
              </TouchableOpacity>

              {/* Curricula List or Empty State */}
              {curricula.length > 0 ? (
                <>
                  <Text style={[styles.sectionTitle, { color: theme.textColor }]}>My Curricula</Text>
                  <FlatList
                    data={curricula}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <CurriculumAccordion
                        curriculum={item}
                        onArticlePress={(articleIndex) =>
                          handleCurriculumArticlePress(item.id, articleIndex)
                        }
                      />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                  />
                </>
              ) : (
                <View style={styles.emptyState}>
                  <View style={[styles.emptyIconCircle, { backgroundColor: theme.secondaryBackground }]}>
                    <Ionicons name="library-outline" size={SIZES.iconHuge} color={theme.accentColor} />
                  </View>
                  <Text style={[styles.emptyTitle, { color: theme.textColor }]}>
                    No curricula yet
                  </Text>
                  <Text style={[styles.emptyText, { color: JOURNEY_COLORS.textSecondary }]}>
                    Create a multi-article learning path with 3-10 articles that progressively build
                    your knowledge on a topic.
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.pageTitle,
    marginBottom: SPACING.lg,
  },
  segmentContainer: {
    flexDirection: 'row',
    borderRadius: COMPONENT_RADIUS.button,
    padding: SPACING.xs,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: COMPONENT_RADIUS.button - 2,
  },
  segmentText: {
    ...TYPOGRAPHY.buttonSmall,
    opacity: 0.6,
  },
  segmentTextActive: {
    color: JOURNEY_COLORS.textPrimary,
    opacity: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
  },
  generateButton: {
    borderRadius: COMPONENT_RADIUS.button,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  generateButtonDisabled: {
    opacity: 0.6,
  },
  generateButtonText: {
    ...TYPOGRAPHY.button,
    color: JOURNEY_COLORS.textPrimary,
  },
  sectionTitle: {
    ...TYPOGRAPHY.sectionHeader,
    marginBottom: SPACING.md,
  },
  listContent: {
    paddingBottom: SPACING.xxxl,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: SPACING.xxxl,
  },
  emptyIconCircle: {
    width: COMPONENT_SIZES.iconContainerXl,
    height: COMPONENT_SIZES.iconContainerXl,
    borderRadius: COMPONENT_RADIUS.badge,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  emptyTitle: {
    ...TYPOGRAPHY.sectionHeader,
    marginBottom: SPACING.md,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    paddingHorizontal: SPACING.xxl,
  },
});
