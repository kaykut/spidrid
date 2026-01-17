/* eslint-disable no-console */
/**
 * Testing Tab
 *
 * Development-only tab that renders ALL components with mock data.
 * Each component has its filename displayed above it.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CertificateCard, LockedCertificateCard } from '../components/certificates/CertificateCard';
import { CertificateViewerModal } from '../components/certificates/CertificateViewerModal';
import { NewCertificateModal } from '../components/certificates/NewCertificateModal';
import { CertificationEarnedModal } from '../components/certifications/CertificationEarnedModal';
import { CertificationReadyModal } from '../components/certifications/CertificationReadyModal';
import { JourneyPath } from '../components/certifications/JourneyPath';
import { MilestoneBadge } from '../components/certifications/MilestoneBadge';
import { ProgressRing } from '../components/certifications/ProgressRing';
import { StatsSummary } from '../components/certifications/StatsSummary';
import { TierCard } from '../components/certifications/TierCard';
import { EdgeFadeScrollView } from '../components/common/EdgeFadeScrollView';
import { useTheme } from '../components/common/ThemeProvider';
import { PlaybackControls } from '../components/controls/PlaybackControls';
import { GlowAnimation } from '../components/journey/animations/GlowAnimation';
import { PulseAnimation } from '../components/journey/animations/PulseAnimation';
import { InsightsPanel } from '../components/journey/InsightsPanel';
import { MetricsPanel } from '../components/journey/MetricsPanel';
import { SmartQueue } from '../components/journey/SmartQueue';
import { UnifiedProgressPath } from '../components/journey/UnifiedProgressPath';
import { UpNextCard } from '../components/journey/UpNextCard';
import { Paywall } from '../components/paywall/Paywall';
import { MultipleSelectQuestion } from '../components/quiz/MultipleSelectQuestion';
import { NumericQuestion } from '../components/quiz/NumericQuestion';
import { SingleChoiceQuestion } from '../components/quiz/SingleChoiceQuestion';
import { TrueFalseQuestion } from '../components/quiz/TrueFalseQuestion';
import { RSVPWord } from '../components/rsvp/RSVPWord';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../constants/spacing';
import { FONT_WEIGHTS, TYPOGRAPHY, RSVP_DISPLAY } from '../constants/typography';
import { TEST_PERSONAS, applyPersona, resetToCleanSlate, getPersonaCertCount } from '../data/testPersonas';
import { DIFFICULTY_COLORS, JOURNEY_COLORS } from '../data/themes';
import { useJourneyStore } from '../store/journeyStore';
import type { Certificate, CertificationTierProgress, EarnedCertification } from '../types/certificates';
import type {
  ArticleRecommendation,
  ProgressInsight,
  WeeklyTrendPoint,
  JourneyCertTier,
  JourneyCertProgress,
} from '../types/journey';
import type {
  SingleChoiceQuestion as SingleChoiceQuestionType,
  MultipleSelectQuestion as MultipleSelectQuestionType,
  TrueFalseQuestion as TrueFalseQuestionType,
  NumericQuestion as NumericQuestionType,
} from '../types/learning';
import type { ProcessedWord } from '../types/playback';

// ============================================================
// Mock Data
// ============================================================


const MOCK_CERTIFICATE: Certificate = {
  id: 'cert_speed_reader_123',
  type: 'speed_reader',
  wpm: 650,
  earnedAt: Date.now() - 86400000, // 1 day ago
};

const MOCK_EARNED_CERTIFICATION: EarnedCertification = {
  tier: 'velocity_master',
  earnedAt: Date.now(),
  earnedStats: {
    wpm: 920,
    comprehension: 85,
    velocityScore: 65,
  },
};

const MOCK_CERT_PROGRESS: Record<JourneyCertTier, JourneyCertProgress> = {
  speed_reader: {
    vsUnlocked: true,
    speedProofAchieved: true,
    examUnlocked: true,
    examPassed: true,
    earnedAt: Date.now() - 86400000 * 7,
  },
  velocity_master: {
    vsUnlocked: true,
    speedProofAchieved: false,
    examUnlocked: false,
    examPassed: false,
  },
  transcendent: {
    vsUnlocked: false,
    speedProofAchieved: false,
    examUnlocked: false,
    examPassed: false,
  },
};

const MOCK_TIER_PROGRESS: CertificationTierProgress = {
  vsUnlocked: true,
  speedProofAchieved: false,
  examUnlocked: false,
  examPassed: false,
};

const MOCK_PROCESSED_WORD: ProcessedWord = {
  original: 'Reading',
  display: 'Reading',
  orpIndex: 2, // 'a' is the ORP
  pauseMultiplier: 1,
  sentenceEnd: false,
  paragraphEnd: false,
};

const MOCK_SINGLE_CHOICE: SingleChoiceQuestionType = {
  id: 'q1',
  type: 'single_choice',
  question: 'What is the primary benefit of speed reading?',
  options: ['Faster comprehension', 'Better retention', 'More enjoyment', 'Less fatigue'],
  correctIndex: 0,
};

const MOCK_MULTIPLE_SELECT: MultipleSelectQuestionType = {
  id: 'q2',
  type: 'multiple_select',
  question: 'Which techniques improve reading speed? (Select all that apply)',
  options: ['Chunking words', 'Subvocalization', 'Using a pointer', 'Reading aloud'],
  correctIndices: [0, 2],
};

const MOCK_TRUE_FALSE: TrueFalseQuestionType = {
  id: 'q3',
  type: 'true_false',
  question: 'Speed reading always reduces comprehension.',
  correctAnswer: false,
};

const MOCK_NUMERIC: NumericQuestionType = {
  id: 'q4',
  type: 'numeric',
  question: 'What is the average adult reading speed in WPM?',
  correctValue: 250,
  tolerance: 50,
  min: 100,
  max: 500,
  step: 25,
  unit: 'WPM',
};

const MOCK_PROGRESS_INSIGHT: ProgressInsight = {
  available: true,
  baseline: {
    avgWpm: 250,
    avgComprehension: 70,
    capturedAt: Date.now() - 86400000 * 30,
    sessionCount: 3,
  },
  current: {
    avgWpm: 420,
    avgComprehension: 82,
  },
  deltaWpm: 170,
  deltaComprehension: 12,
};

const MOCK_WEEKLY_TREND: WeeklyTrendPoint[] = [
  { weekStart: '2026-01-01', avgWpm: 350, avgComprehension: 75, sessionCount: 3 },
  { weekStart: '2026-01-08', avgWpm: 380, avgComprehension: 78, sessionCount: 4 },
  { weekStart: '2026-01-15', avgWpm: 400, avgComprehension: 80, sessionCount: 5 },
  { weekStart: '2026-01-22', avgWpm: 420, avgComprehension: 82, sessionCount: 4 },
];

const MOCK_RECOMMENDATION: ArticleRecommendation = {
  articleId: 'art_001',
  topicId: 'topic_science',
  title: 'The Science of Speed Reading',
  topicName: 'Science',
  wordCount: 1200,
  estimatedMinutes: 4,
  suggestedWpm: 300,
  reason: 'continue_topic',
};

const MOCK_STRETCH_RECOMMENDATION: ArticleRecommendation = {
  articleId: 'art_002',
  topicId: 'topic_science',
  title: 'Advanced Comprehension Techniques',
  topicName: 'Science',
  wordCount: 1800,
  estimatedMinutes: 5,
  suggestedWpm: 360,
  reason: 'stretch_goal',
};

// ============================================================
// Component Section Wrapper
// ============================================================

interface ComponentSectionProps {
  filename: string;
  componentName: string;
  children: React.ReactNode;
}

function ComponentSection({ filename, componentName, children }: ComponentSectionProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.section}>
      <Text style={[styles.filename, { color: theme.textColor }]}>{filename}</Text>
      <Text style={[styles.componentName, { color: theme.accentColor }]}>{componentName}</Text>
      <View style={[styles.divider, { backgroundColor: theme.crosshairColor }]} />
      <View style={styles.componentContainer}>{children}</View>
    </View>
  );
}

// ============================================================
// Modal Toggle Button
// ============================================================

interface ModalToggleProps {
  label: string;
  onPress: () => void;
}


function ModalToggle({ label, onPress }: ModalToggleProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.modalToggle, { backgroundColor: theme.accentColor }]}
      onPress={onPress}
    >
      <Text style={styles.modalToggleText}>{label}</Text>
    </TouchableOpacity>
  );
}

// ============================================================
// Main Component
// ============================================================

export default function TestingScreen() {
  const { theme } = useTheme();

  // Journey store for current state display
  const { velocityScore, sessions, certProgress } = useJourneyStore();
  const certsEarned = Object.values(certProgress).filter((p) => p.examPassed).length;

  // Persona switcher state
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  // Handle persona selection
  const handleApplyPersona = async (personaId: string) => {
    setIsApplying(true);
    await applyPersona(personaId);
    setSelectedPersonaId(personaId);
    setIsApplying(false);
  };

  // Handle reset to clean slate
  const handleReset = async () => {
    setIsApplying(true);
    await resetToCleanSlate();
    setSelectedPersonaId(null);
    setIsApplying(false);
  };

  // Modal visibility states
  const [showCertificateViewer, setShowCertificateViewer] = useState(false);
  const [showNewCertificate, setShowNewCertificate] = useState(false);
  const [showCertificationEarned, setShowCertificationEarned] = useState(false);
  const [showCertificationReady, setShowCertificationReady] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  // Interactive states
  const [isPlaying, setIsPlaying] = useState(false);
  const [wpm, setWpm] = useState(300);
  const [smartQueueExpanded, setSmartQueueExpanded] = useState(false);
  const [singleChoiceAnswer, setSingleChoiceAnswer] = useState<number | null>(null);
  const [multiSelectAnswer, setMultiSelectAnswer] = useState<number[] | null>(null);
  const [trueFalseAnswer, setTrueFalseAnswer] = useState<boolean | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<number | null>(null);
  const [glowActive, setGlowActive] = useState(true);
  const [pulseTrigger, setPulseTrigger] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]} edges={['top']}>
      {/* Header with close button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={SIZES.iconXl} color={theme.textColor} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: theme.textColor }]}>Component Gallery</Text>
        <Text style={[styles.subtitle, { color: theme.textColor, opacity: 0.6 }]}>
          All components with mock data
        </Text>

        {/* ============================================================ */}
        {/* TEST PERSONAS */}
        {/* ============================================================ */}

        <View style={[styles.personaCard, { backgroundColor: theme.secondaryBackground }]}>
          <Text style={[styles.personaTitle, { color: theme.textColor }]}>
            Test Persona Switcher
          </Text>
          <Text style={[styles.personaSubtitle, { color: theme.textColor }]}>
            Current: VS {velocityScore} | {sessions.length} sessions | {certsEarned} certs
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.personaScroll}
            contentContainerStyle={styles.personaScrollContent}
          >
            {/* Reset button */}
            <TouchableOpacity
              style={[styles.personaButton, styles.personaButtonReset]}
              onPress={handleReset}
              disabled={isApplying}
            >
              <Ionicons name="refresh" size={16} color={JOURNEY_COLORS.textPrimary} />
              <Text style={styles.personaButtonLabel}>Reset</Text>
              <Text style={styles.personaButtonDetail}>Clean slate</Text>
            </TouchableOpacity>

            {/* Persona buttons */}
            {TEST_PERSONAS.map((persona) => (
              <TouchableOpacity
                key={persona.id}
                style={[
                  styles.personaButton,
                  selectedPersonaId === persona.id && styles.personaButtonActive,
                ]}
                onPress={() => handleApplyPersona(persona.id)}
                disabled={isApplying}
              >
                <Text style={styles.personaButtonLabel}>{persona.name}</Text>
                <Text style={styles.personaButtonDetail}>
                  {persona.targetWpm} WPM | {getPersonaCertCount(persona)} cert{getPersonaCertCount(persona) !== 1 ? 's' : ''}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {isApplying && (
            <Text style={[styles.applyingText, { color: theme.accentColor }]}>
              Applying persona...
            </Text>
          )}
        </View>


        {/* ============================================================ */}
        {/* CERTIFICATES */}
        {/* ============================================================ */}

        <ComponentSection
          filename="src/components/certificates/CertificateCard.tsx"
          componentName="CertificateCard"
        >
          <CertificateCard certificate={MOCK_CERTIFICATE} size="large" />
        </ComponentSection>

        <ComponentSection
          filename="src/components/certificates/CertificateCard.tsx"
          componentName="LockedCertificateCard"
        >
          <LockedCertificateCard type="velocity_master" progress={0.5} />
        </ComponentSection>

        <ComponentSection
          filename="src/components/certificates/CertificateViewerModal.tsx"
          componentName="CertificateViewerModal"
        >
          <ModalToggle label="Show Certificate Viewer" onPress={() => setShowCertificateViewer(true)} />
          <CertificateViewerModal
            certificate={MOCK_CERTIFICATE}
            visible={showCertificateViewer}
            onClose={() => setShowCertificateViewer(false)}
          />
        </ComponentSection>

        <ComponentSection
          filename="src/components/certificates/NewCertificateModal.tsx"
          componentName="NewCertificateModal"
        >
          <ModalToggle label="Show New Certificate Modal" onPress={() => setShowNewCertificate(true)} />
          <NewCertificateModal
            certificate={MOCK_CERTIFICATE}
            visible={showNewCertificate}
            onClose={() => setShowNewCertificate(false)}
          />
        </ComponentSection>

        {/* ============================================================ */}
        {/* CERTIFICATIONS */}
        {/* ============================================================ */}

        <ComponentSection
          filename="src/components/certifications/CertificationEarnedModal.tsx"
          componentName="CertificationEarnedModal"
        >
          <ModalToggle
            label="Show Certification Earned"
            onPress={() => setShowCertificationEarned(true)}
          />
          <CertificationEarnedModal
            certification={MOCK_EARNED_CERTIFICATION}
            visible={showCertificationEarned}
            onClose={() => setShowCertificationEarned(false)}
          />
        </ComponentSection>

        <ComponentSection
          filename="src/components/certifications/CertificationReadyModal.tsx"
          componentName="CertificationReadyModal"
        >
          <ModalToggle
            label="Show Certification Ready"
            onPress={() => setShowCertificationReady(true)}
          />
          <CertificationReadyModal
            tier="velocity_master"
            currentWPM={850}
            currentVS={55}
            visible={showCertificationReady}
            onTakeTest={() => setShowCertificationReady(false)}
            onKeepPracticing={() => setShowCertificationReady(false)}
          />
        </ComponentSection>

        <ComponentSection
          filename="src/components/certifications/JourneyPath.tsx"
          componentName="JourneyPath"
        >
          <JourneyPath progress={MOCK_CERT_PROGRESS} velocityScore={55} />
        </ComponentSection>

        <ComponentSection
          filename="src/components/certifications/MilestoneBadge.tsx"
          componentName="MilestoneBadge (all sizes)"
        >
          <View style={styles.row}>
            <MilestoneBadge tier="speed_reader" progress={MOCK_CERT_PROGRESS.speed_reader} size="small" />
            <MilestoneBadge tier="velocity_master" progress={MOCK_TIER_PROGRESS} size="medium" />
            <MilestoneBadge tier="transcendent" progress={MOCK_CERT_PROGRESS.transcendent} size="large" />
          </View>
        </ComponentSection>

        <ComponentSection
          filename="src/components/certifications/ProgressRing.tsx"
          componentName="ProgressRing"
        >
          <View style={styles.row}>
            <ProgressRing progress={0.25} size={60} strokeWidth={6} color={DIFFICULTY_COLORS.intermediate} showPercentage />
            <ProgressRing progress={0.65} size={80} strokeWidth={8} color={JOURNEY_COLORS.success} showPercentage />
            <ProgressRing progress={0.95} size={100} strokeWidth={10} color={JOURNEY_COLORS.certificationAccent} showPercentage />
          </View>
        </ComponentSection>

        <ComponentSection
          filename="src/components/certifications/StatsSummary.tsx"
          componentName="StatsSummary"
        >
          <StatsSummary
            articlesRead={42}
            totalWords={125000}
            averageComprehension={82}
            bestWPM={650}
          />
        </ComponentSection>

        <ComponentSection
          filename="src/components/certifications/TierCard.tsx"
          componentName="TierCard"
        >
          <TierCard
            tier="velocity_master"
            progress={MOCK_TIER_PROGRESS}
            currentWPM={750}
            currentVS={55}
            onStartCertification={() => console.log('Start certification')}
          />
        </ComponentSection>

        {/* ============================================================ */}
        {/* COMMON */}
        {/* ============================================================ */}

        <ComponentSection
          filename="src/components/common/EdgeFadeScrollView.tsx"
          componentName="EdgeFadeScrollView"
        >
          <View style={{ height: 150 }}>
            <EdgeFadeScrollView topFadeHeight={20} bottomFadeHeight={20}>
              {Array.from({ length: 10 }).map((_, i) => (
                <Text key={i} style={[styles.demoText, { color: theme.textColor }]}>
                  Scrollable content line {i + 1}
                </Text>
              ))}
            </EdgeFadeScrollView>
          </View>
        </ComponentSection>

        {/* ============================================================ */}
        {/* CONTROLS */}
        {/* ============================================================ */}

        <ComponentSection
          filename="src/components/controls/PlaybackControls.tsx"
          componentName="PlaybackControls"
        >
          <PlaybackControls
            isPlaying={isPlaying}
            wpm={wpm}
            progress={0.35}
            currentIndex={350}
            totalWords={1000}
            onToggle={() => setIsPlaying(!isPlaying)}
            onWPMChange={setWpm}
            onRewind={() => console.log('Rewind')}
            onSkip={() => console.log('Skip')}
          />
        </ComponentSection>

        {/* ============================================================ */}
        {/* JOURNEY - ANIMATIONS */}
        {/* ============================================================ */}

        <ComponentSection
          filename="src/components/journey/animations/GlowAnimation.tsx"
          componentName="GlowAnimation"
        >
          <TouchableOpacity onPress={() => setGlowActive(!glowActive)}>
            <GlowAnimation active={glowActive} color={theme.accentColor}>
              <View style={[styles.animationBox, { backgroundColor: theme.secondaryBackground }]}>
                <Text style={[styles.animationText, { color: theme.textColor }]}>
                  Tap to toggle glow
                </Text>
              </View>
            </GlowAnimation>
          </TouchableOpacity>
        </ComponentSection>

        <ComponentSection
          filename="src/components/journey/animations/PulseAnimation.tsx"
          componentName="PulseAnimation"
        >
          <TouchableOpacity onPress={() => setPulseTrigger(!pulseTrigger)}>
            <PulseAnimation trigger={pulseTrigger}>
              <View style={[styles.animationBox, { backgroundColor: theme.secondaryBackground }]}>
                <Text style={[styles.animationText, { color: theme.textColor }]}>
                  Tap to pulse
                </Text>
              </View>
            </PulseAnimation>
          </TouchableOpacity>
        </ComponentSection>

        {/* ============================================================ */}
        {/* JOURNEY - PANELS */}
        {/* ============================================================ */}

        <ComponentSection
          filename="src/components/journey/InsightsPanel.tsx"
          componentName="InsightsPanel"
        >
          <InsightsPanel
            progressInsight={MOCK_PROGRESS_INSIGHT}
            weeklyTrend={MOCK_WEEKLY_TREND}
          />
        </ComponentSection>

        <ComponentSection
          filename="src/components/journey/MetricsPanel.tsx"
          componentName="MetricsPanel"
        >
          <MetricsPanel
            avgWpm={420}
            avgComprehension={82}
            streakDays={7}
            bestWpmAt80={520}
          />
        </ComponentSection>

        <ComponentSection
          filename="src/components/journey/SmartQueue.tsx"
          componentName="SmartQueue"
        >
          <SmartQueue
            primaryRecommendation={MOCK_RECOMMENDATION}
            stretchRecommendation={MOCK_STRETCH_RECOMMENDATION}
            continueTopicRecommendation={null}
            userState="neutral"
            onSelectArticle={(id, wpmVal, type) => console.log('Select:', id, wpmVal, type)}
            expanded={smartQueueExpanded}
            onToggleExpand={() => setSmartQueueExpanded(!smartQueueExpanded)}
          />
        </ComponentSection>

        <ComponentSection
          filename="src/components/journey/UnifiedProgressPath.tsx"
          componentName="UnifiedProgressPath"
        >
          <UnifiedProgressPath
            avgWpm={420}
            certProgress={MOCK_CERT_PROGRESS}
          />
        </ComponentSection>

        <ComponentSection
          filename="src/components/journey/UpNextCard.tsx"
          componentName="UpNextCard"
        >
          <UpNextCard
            articleId="art_001"
            title="The Science of Speed Reading"
            topicName="Science"
            wordCount={1200}
            suggestedWpm={350}
            onStart={(id, wpmVal) => console.log('Start:', id, wpmVal)}
          />
        </ComponentSection>

        {/* ============================================================ */}
        {/* PAYWALL */}
        {/* ============================================================ */}

        <ComponentSection
          filename="src/components/paywall/Paywall.tsx"
          componentName="Paywall"
        >
          <ModalToggle label="Show Paywall" onPress={() => setShowPaywall(true)} />
          <Paywall
            visible={showPaywall}
            onClose={() => setShowPaywall(false)}
            reason="wpm_limit"
          />
        </ComponentSection>

        {/* ============================================================ */}
        {/* QUIZ */}
        {/* ============================================================ */}

        <ComponentSection
          filename="src/components/quiz/SingleChoiceQuestion.tsx"
          componentName="SingleChoiceQuestion"
        >
          <SingleChoiceQuestion
            question={MOCK_SINGLE_CHOICE}
            selectedAnswer={singleChoiceAnswer}
            onSelect={setSingleChoiceAnswer}
            disabled={false}
          />
        </ComponentSection>

        <ComponentSection
          filename="src/components/quiz/MultipleSelectQuestion.tsx"
          componentName="MultipleSelectQuestion"
        >
          <MultipleSelectQuestion
            question={MOCK_MULTIPLE_SELECT}
            selectedAnswers={multiSelectAnswer}
            onSelect={setMultiSelectAnswer}
            disabled={false}
          />
        </ComponentSection>

        <ComponentSection
          filename="src/components/quiz/TrueFalseQuestion.tsx"
          componentName="TrueFalseQuestion"
        >
          <TrueFalseQuestion
            question={MOCK_TRUE_FALSE}
            selectedAnswer={trueFalseAnswer}
            onSelect={setTrueFalseAnswer}
            disabled={false}
          />
        </ComponentSection>

        <ComponentSection
          filename="src/components/quiz/NumericQuestion.tsx"
          componentName="NumericQuestion"
        >
          <NumericQuestion
            question={MOCK_NUMERIC}
            selectedAnswer={numericAnswer}
            onSelect={setNumericAnswer}
            disabled={false}
          />
        </ComponentSection>

        {/* ============================================================ */}
        {/* RSVP */}
        {/* ============================================================ */}

        <ComponentSection
          filename="src/components/rsvp/RSVPWord.tsx"
          componentName="RSVPWord"
        >
          <View style={[styles.rsvpContainer, { backgroundColor: theme.secondaryBackground }]}>
            <RSVPWord word={MOCK_PROCESSED_WORD} fontSize={RSVP_DISPLAY.fontSize} />
          </View>
        </ComponentSection>

        {/* ============================================================ */}
        {/* WORD SPLITTING TEST - Navigate to /reader/long-words */}
        {/* ============================================================ */}

        <ComponentSection
          filename="Test Long Words (11-18 chars)"
          componentName="Dynamic Word Splitting Test"
        >
          <TouchableOpacity
            style={[styles.testButton, { backgroundColor: theme.accentColor }]}
            onPress={() => router.push('/reader/long-words')}
          >
            <Ionicons name="text" size={20} color="#fff" />
            <Text style={styles.testButtonText}>Test Long Words in RSVP</Text>
            <Text style={styles.testButtonDetail}>50 words (11-18 chars) • Watch for wrapping</Text>
          </TouchableOpacity>

          <Text style={[styles.testInstructions, { color: theme.textSecondaryColor }]}>
            Or use Add Content → Enter Text with these words:
          </Text>
          <View style={[styles.testWordBox, { backgroundColor: theme.secondaryBackground }]}>
            <Text style={[styles.testWordText, { color: theme.textColor }]}>
              introducing photosynthesis extraordinary inconceivable telecommunications
            </Text>
          </View>
        </ComponentSection>

        {/* Bottom padding for floating nav */}
        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ============================================================
// Styles
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  closeButton: {
    padding: SPACING.sm,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.pageTitle.fontSize,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.body.fontSize,
    marginBottom: SPACING.xl,
  },
  section: {
    marginBottom: SPACING.xxl,
  },
  filename: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    fontFamily: 'monospace',
    opacity: 0.7,
  },
  componentName: {
    fontSize: TYPOGRAPHY.cardTitle.fontSize,
    fontWeight: FONT_WEIGHTS.semibold,
    marginTop: SPACING.xs,
  },
  divider: {
    height: 1,
    marginVertical: SPACING.md,
  },
  componentContainer: {
    minHeight: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    flexWrap: 'wrap',
  },
  modalToggle: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.chip,
    alignSelf: 'flex-start',
  },
  modalToggleText: {
    color: JOURNEY_COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.semibold,
    fontSize: TYPOGRAPHY.body.fontSize,
  },
  demoText: {
    fontSize: TYPOGRAPHY.body.fontSize,
    paddingVertical: SPACING.sm,
  },
  animationBox: {
    padding: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationText: {
    fontSize: TYPOGRAPHY.body.fontSize,
  },
  rsvpContainer: {
    padding: SPACING.xl,
    borderRadius: COMPONENT_RADIUS.card,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  // Persona switcher styles
  personaCard: {
    padding: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.card,
    marginBottom: SPACING.xl,
  },
  personaTitle: {
    fontSize: TYPOGRAPHY.sectionTitle.fontSize,
    fontWeight: FONT_WEIGHTS.semibold,
    marginBottom: SPACING.xs,
  },
  personaSubtitle: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    opacity: 0.6,
    marginBottom: SPACING.md,
  },
  personaScroll: {
    marginHorizontal: -SPACING.lg,
  },
  personaScrollContent: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  personaButton: {
    padding: SPACING.md,
    borderRadius: COMPONENT_RADIUS.chip,
    backgroundColor: 'rgba(255,255,255,0.1)',
    minWidth: 120,
    alignItems: 'center',
  },
  personaButtonActive: {
    borderWidth: 2,
    borderColor: JOURNEY_COLORS.accent,
  },
  personaButtonReset: {
    backgroundColor: 'rgba(255,100,100,0.2)',
  },
  personaButtonLabel: {
    color: JOURNEY_COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.medium,
    fontSize: TYPOGRAPHY.body.fontSize,
    marginBottom: SPACING.xs,
  },
  personaButtonDetail: {
    color: JOURNEY_COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption.fontSize,
  },
  applyingText: {
    marginTop: SPACING.md,
    fontSize: TYPOGRAPHY.body.fontSize,
    textAlign: 'center',
  },
  testButton: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.button,
    gap: SPACING.xs,
  },
  testButtonText: {
    color: '#fff',
    fontSize: TYPOGRAPHY.body.fontSize,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  testButtonDetail: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: TYPOGRAPHY.caption.fontSize,
  },
  testInstructions: {
    marginTop: SPACING.lg,
    fontSize: TYPOGRAPHY.caption.fontSize,
    marginBottom: SPACING.sm,
  },
  testWordBox: {
    padding: SPACING.md,
    borderRadius: COMPONENT_RADIUS.chip,
  },
  testWordText: {
    fontSize: TYPOGRAPHY.label.fontSize,
    fontFamily: 'monospace',
  },
});
