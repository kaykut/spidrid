import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  JourneyPath,
  TierCard,
  StatsSummary,
} from '../components/certifications';
import { useTheme } from '../components/common/ThemeProvider';
import { useCertificateStore } from '../store/certificateStore';
import { useLearningStore } from '../store/learningStore';
import { CertificationTier } from '../types/certificates';

export default function CertificationsScreen() {
  const { theme } = useTheme();
  const certificationProgress = useCertificateStore((s) => s.getCertificationProgress());
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
  const tiersEarned = certificationProgress.earnedTiers.length;

  const handleStartCertification = (_tier: CertificationTier) => {
    // Navigate to topic selection for certification
    // For now, just go back - in a full implementation, this would navigate to a certification test selection screen
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.accentColor }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.textColor }]}>Certification Journey</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Summary */}
        <StatsSummary
          articlesRead={articlesRead}
          totalWords={totalWords}
          averageAccuracy={averageAccuracy}
          bestWPM={bestWPM}
          tiersEarned={tiersEarned}
        />

        {/* Current Status */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
            Your Progress
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.textColor }]}>
            {tiersEarned === 0
              ? "Start your journey to become a certified speed reader!"
              : tiersEarned === 3
              ? "Congratulations! You've mastered all certification tiers!"
              : `${tiersEarned} of 3 tiers earned - keep going!`}
          </Text>
        </View>

        {/* Journey Path */}
        <View style={[styles.journeyContainer, { backgroundColor: theme.secondaryBackground }]}>
          <JourneyPath progress={certificationProgress} />
        </View>

        {/* Tier Cards */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
            Certification Tiers
          </Text>
        </View>

        <TierCard
          tier="quick_reader"
          progress={certificationProgress.tierProgress.quick_reader}
          currentWPM={bestWPM}
          currentAccuracy={averageAccuracy}
          onStartCertification={() => handleStartCertification('quick_reader')}
        />

        <TierCard
          tier="speed_reader"
          progress={certificationProgress.tierProgress.speed_reader}
          currentWPM={bestWPM}
          currentAccuracy={averageAccuracy}
          onStartCertification={() => handleStartCertification('speed_reader')}
        />

        <TierCard
          tier="lightning_reader"
          progress={certificationProgress.tierProgress.lightning_reader}
          currentWPM={bestWPM}
          currentAccuracy={averageAccuracy}
          onStartCertification={() => handleStartCertification('lightning_reader')}
        />

        {/* Info */}
        <View style={[styles.infoCard, { backgroundColor: theme.secondaryBackground }]}>
          <Text style={[styles.infoTitle, { color: theme.textColor }]}>
            How Certification Works
          </Text>
          <Text style={[styles.infoText, { color: theme.textColor }]}>
            1. Practice with articles to build your speed and comprehension.
            {'\n\n'}
            2. When you're close to a tier's requirements, you'll be prompted to take the certification test.
            {'\n\n'}
            3. Pass certification texts with the required WPM and accuracy to earn your tier.
            {'\n\n'}
            Note: Only your first attempt on each certification text counts toward your certification!
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 80,
  },
  backText: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  journeyContainer: {
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.8,
  },
});
