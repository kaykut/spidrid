/**
 * Journey Tab Screen
 *
 * Shows the unified journey progress with vertical milestone path.
 * Displays all 6 WPM milestones with progress tracking.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatsSummary } from '../../components/certifications';
import { useTheme } from '../../components/common/ThemeProvider';
import { VerticalProgressPath } from '../../components/journey/VerticalProgressPath';
import { SPACING, COMPONENT_RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { useJourneyStore } from '../../store/journeyStore';
import { useLearningStore } from '../../store/learningStore';
import { CERTIFICATION_TIER_DEFINITIONS } from '../../types/certificates';

export default function JourneyScreen() {
  const { theme } = useTheme();
  const { certProgress, avgWpmLast3, avgCompLast5 } = useJourneyStore();
  const { articleProgress, getHighestWPM } = useLearningStore();

  // Calculate stats
  const articlesRead = Object.values(articleProgress).filter((p) => p.completed).length;
  const totalWords = Object.values(articleProgress).reduce((sum, p) => {
    // Estimate words read (we don't track this directly, so use a rough estimate)
    return sum + (p.completed ? 1000 : 0);
  }, 0);
  const accuracyScores = Object.values(articleProgress)
    .filter((p) => p.completed && p.comprehensionScore > 0)
    .map((p) => p.comprehensionScore);
  const averageAccuracy = accuracyScores.length > 0
    ? Math.round(accuracyScores.reduce((a, b) => a + b, 0) / accuracyScores.length)
    : 0;
  const bestWPM = getHighestWPM();

  // Count earned tiers
  const tiersEarned = CERTIFICATION_TIER_DEFINITIONS.filter(
    def => certProgress[def.tier]?.examPassed
  ).length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: theme.textColor }]}>Journey</Text>

        {/* Stats Summary */}
        <StatsSummary
          articlesRead={articlesRead}
          totalWords={totalWords}
          averageAccuracy={averageAccuracy}
          bestWPM={bestWPM}
          tiersEarned={tiersEarned}
        />

        {/* Vertical Progress Path */}
        <View style={[styles.progressContainer, { backgroundColor: theme.secondaryBackground }]}>
          <VerticalProgressPath
            avgWpm={avgWpmLast3}
            avgComp={avgCompLast5}
            certProgress={certProgress}
          />
        </View>

        {/* Info */}
        <View style={[styles.infoCard, { backgroundColor: theme.secondaryBackground }]}>
          <Text style={[styles.infoTitle, { color: theme.textColor }]}>
            How Certification Works
          </Text>
          <Text style={[styles.infoText, { color: theme.textColor }]}>
            1. Build your Velocity Score (VS) through consistent practice.
            {'\n\n'}
            2. Achieve a Speed Proof by reading at the required WPM with 70%+ comprehension.
            {'\n\n'}
            3. When both VS threshold and Speed Proof are met, take the certification exam.
            {'\n\n'}
            Pass the exam with the required WPM and 80%+ comprehension to earn your certification!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  title: {
    ...TYPOGRAPHY.pageTitle,
    marginBottom: SPACING.xl,
  },
  progressContainer: {
    borderRadius: COMPONENT_RADIUS.card,
    marginTop: SPACING.xl,
    overflow: 'hidden',
  },
  infoCard: {
    borderRadius: COMPONENT_RADIUS.card,
    padding: SPACING.xl,
    marginTop: SPACING.xxl,
  },
  infoTitle: {
    ...TYPOGRAPHY.cardSubtitle,
    marginBottom: SPACING.md,
  },
  infoText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: '400',
    lineHeight: 22,
    opacity: 0.8,
  },
});
