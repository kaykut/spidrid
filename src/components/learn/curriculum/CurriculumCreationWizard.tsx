/**
 * CurriculumCreationWizard Component
 *
 * A multi-step modal wizard for creating curricula. Steps:
 * 1. Goal - Learning goal input
 * 2. Articles - Article count selection (3, 5, 7, 10)
 * 3. Tone - Writing style selection
 * 4. Duration - Reading duration per article
 * 5. Confirm - Review and create
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SPACING, COMPONENT_RADIUS } from '../../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../../constants/typography';
import { JOURNEY_COLORS, OVERLAY_COLORS } from '../../../data/themes';
import { useCurriculumStore } from '../../../store/curriculumStore';
import { CurriculumCreationInput, durationToWordCount } from '../../../types/curriculum';
import { ArticleTone, TONE_DEFINITIONS, DURATION_OPTIONS } from '../../../types/generated';
import { useTheme } from '../../common/ThemeProvider';
import { DurationPill } from '../DurationPill';
import { TonePill } from '../TonePill';

interface Props {
  visible: boolean;
  onClose: () => void;
  avgWpm: number;
}

type WizardStep = 'goal' | 'articles' | 'tone' | 'duration' | 'confirm';

const STEPS: WizardStep[] = ['goal', 'articles', 'tone', 'duration', 'confirm'];
const ARTICLE_COUNT_OPTIONS = [3, 5, 7, 10];

export function CurriculumCreationWizard({ visible, onClose, avgWpm }: Props) {
  const { theme } = useTheme();
  const { createCurriculum, isGenerating, generationProgress, generationError, clearError } =
    useCurriculumStore();

  // Form state
  const [goal, setGoal] = useState('');
  const [articleCount, setArticleCount] = useState(5);
  const [tone, setTone] = useState<ArticleTone>('explanatory');
  const [durationMinutes, setDurationMinutes] = useState(3);
  const [hasQuizzes, setHasQuizzes] = useState(true); // Default enabled
  const [currentStep, setCurrentStep] = useState<WizardStep>('goal');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stepIndex = STEPS.indexOf(currentStep);
  const wordsPerArticle = durationToWordCount(durationMinutes, avgWpm);
  const totalWords = wordsPerArticle * articleCount;
  const totalMinutes = durationMinutes * articleCount;

  const canGoNext = useMemo(() => {
    switch (currentStep) {
      case 'goal':
        return goal.trim().length >= 10;
      case 'articles':
      case 'tone':
      case 'duration':
        return true;
      case 'confirm':
        return !isSubmitting;
      default:
        return false;
    }
  }, [currentStep, goal, isSubmitting]);

  const goNext = () => {
    if (stepIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[stepIndex + 1]);
    }
  };

  const goBack = () => {
    if (stepIndex > 0) {
      setCurrentStep(STEPS[stepIndex - 1]);
    }
  };

  const resetForm = () => {
    setGoal('');
    setArticleCount(5);
    setTone('explanatory');
    setDurationMinutes(3);
    setHasQuizzes(true); // Reset to default
    setCurrentStep('goal');
    setIsSubmitting(false);
  };

  const handleClose = () => {
    if (!isGenerating && !isSubmitting) {
      resetForm();
      onClose();
    }
  };

  const handleCreate = async () => {
    if (isSubmitting || isGenerating) {
      return;
    }

    setIsSubmitting(true);

    const input: CurriculumCreationInput = {
      goal: goal.trim(),
      articleCount,
      tone,
      durationMinutes,
      hasQuizzes, // NEW: Quiz generation toggle
    };

    const curriculumId = await createCurriculum(input, avgWpm);

    if (curriculumId) {
      resetForm();
      onClose();
      router.push(`/curriculum/${curriculumId}/article/0`);
    } else {
      setIsSubmitting(false);
    }
  };

  const toneDefinition = TONE_DEFINITIONS.find((t) => t.id === tone);

  // Render generation progress overlay
  if (isGenerating && generationProgress) {
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={styles.progressContainer}>
              <ActivityIndicator size="large" color={theme.accentColor} />
              <Text style={[styles.progressMessage, { color: theme.textColor }]}>
                {generationProgress.message}
              </Text>
              <Text style={[styles.progressStep, { color: JOURNEY_COLORS.textSecondary }]}>
                Step {generationProgress.current} of {generationProgress.total}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={handleClose} />
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
          <View style={[styles.header, { borderBottomColor: theme.secondaryBackground }]}>
            <Text style={[styles.headerTitle, { color: theme.textColor }]}>Create Curriculum</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              disabled={isGenerating}
            >
              <Ionicons
                name="close"
                size={24}
                color={isGenerating ? JOURNEY_COLORS.textTertiary : theme.textColor}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Step 1: Goal */}
            {currentStep === 'goal' && (
              <>
                <Text style={[styles.label, styles.labelFirst, { color: theme.textColor }]}>
                  What do you want to learn?
                </Text>
                <TextInput
                  style={[
                    styles.goalInput,
                    { backgroundColor: theme.secondaryBackground, color: theme.textColor },
                  ]}
                  placeholder="e.g., Learn the fundamentals of machine learning, Understand cryptocurrency, Master cooking basics..."
                  placeholderTextColor={JOURNEY_COLORS.textTertiary}
                  value={goal}
                  onChangeText={setGoal}
                  multiline
                  maxLength={500}
                />
                <Text style={styles.charCount}>
                  {goal.length}/500 {goal.length < 10 && '(min 10 characters)'}
                </Text>
              </>
            )}

            {/* Step 2: Article Count */}
            {currentStep === 'articles' && (
              <>
                <Text style={[styles.label, styles.labelFirst, { color: theme.textColor }]}>
                  How many articles?
                </Text>
                <View style={styles.pillRow}>
                  {ARTICLE_COUNT_OPTIONS.map((count) => (
                    <TouchableOpacity
                      key={count}
                      style={[
                        styles.countPill,
                        { backgroundColor: theme.secondaryBackground },
                        articleCount === count && { backgroundColor: theme.accentColor },
                      ]}
                      onPress={() => setArticleCount(count)}
                    >
                      <Text
                        style={[
                          styles.countPillText,
                          { color: theme.textColor },
                          articleCount === count && { color: JOURNEY_COLORS.textPrimary },
                        ]}
                      >
                        {count}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.helperText}>
                  More articles = deeper coverage of your topic
                </Text>
              </>
            )}

            {/* Step 3: Tone */}
            {currentStep === 'tone' && (
              <>
                <Text style={[styles.label, styles.labelFirst, { color: theme.textColor }]}>
                  Writing Style
                </Text>
                <View style={styles.toneGrid}>
                  {TONE_DEFINITIONS.map((t) => (
                    <TonePill
                      key={t.id}
                      tone={t}
                      selected={tone === t.id}
                      onPress={() => setTone(t.id)}
                    />
                  ))}
                </View>
              </>
            )}

            {/* Step 4: Duration */}
            {currentStep === 'duration' && (
              <>
                <Text style={[styles.label, styles.labelFirst, { color: theme.textColor }]}>
                  Reading Duration
                </Text>
                <Text style={styles.subLabel}>Per article</Text>
                <View style={styles.pillRow}>
                  {DURATION_OPTIONS.map((opt) => (
                    <DurationPill
                      key={opt.minutes}
                      label={opt.label}
                      selected={durationMinutes === opt.minutes}
                      onPress={() => setDurationMinutes(opt.minutes)}
                    />
                  ))}
                </View>
                <Text style={styles.helperText}>
                  ~{wordsPerArticle.toLocaleString()} words per article at your pace
                </Text>
                <Text style={styles.helperText}>
                  Total: ~{totalMinutes} min ({totalWords.toLocaleString()} words)
                </Text>
              </>
            )}

            {/* Step 5: Confirmation */}
            {currentStep === 'confirm' && (
              <>
                <Text style={[styles.label, styles.labelFirst, { color: theme.textColor }]}>
                  Review your curriculum
                </Text>
                <View style={[styles.summaryCard, { backgroundColor: theme.secondaryBackground }]}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Goal</Text>
                    <Text
                      style={[styles.summaryValue, { color: theme.textColor }]}
                      numberOfLines={2}
                    >
                      {goal}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Articles</Text>
                    <Text style={[styles.summaryValue, { color: theme.textColor }]}>
                      {articleCount} articles
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Style</Text>
                    <Text style={[styles.summaryValue, { color: theme.textColor }]}>
                      {toneDefinition?.emoji} {toneDefinition?.label}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Duration</Text>
                    <Text style={[styles.summaryValue, { color: theme.textColor }]}>
                      {durationMinutes} min per article (~{totalMinutes} min total)
                    </Text>
                  </View>
                  <View style={[styles.summaryRow, { marginTop: SPACING.md }]}>
                    <View style={styles.quizToggleInfo}>
                      <Text style={[styles.summaryLabel, { color: theme.textColor }]}>
                        Test comprehension
                      </Text>
                      <Text style={[styles.summaryHint, { color: JOURNEY_COLORS.textSecondary }]}>
                        Include 5 quiz questions per article
                      </Text>
                    </View>
                    <Switch
                      value={hasQuizzes}
                      onValueChange={setHasQuizzes}
                      trackColor={{ false: theme.backgroundColor, true: JOURNEY_COLORS.success }}
                      thumbColor={theme.textColor}
                    />
                  </View>
                </View>

                {generationError && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{generationError}</Text>
                    <TouchableOpacity onPress={clearError}>
                      <Text style={[styles.retryText, { color: theme.accentColor }]}>
                        Try Again
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}

            {/* Navigation buttons */}
            <View style={styles.buttonRow}>
              {stepIndex > 0 && (
                <TouchableOpacity
                  style={[styles.backButton, { borderColor: theme.accentColor }]}
                  onPress={goBack}
                >
                  <Text style={[styles.backButtonText, { color: theme.accentColor }]}>Back</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[
                  styles.nextButton,
                  { backgroundColor: theme.accentColor },
                  !canGoNext && styles.buttonDisabled,
                  stepIndex === 0 && styles.fullWidthButton,
                ]}
                onPress={currentStep === 'confirm' ? handleCreate : goNext}
                disabled={!canGoNext}
              >
                {isSubmitting ? (
                  <ActivityIndicator color={JOURNEY_COLORS.textPrimary} />
                ) : (
                  <Text style={styles.nextButtonText}>
                    {currentStep === 'confirm' ? 'Create Curriculum' : 'Next'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: OVERLAY_COLORS.modalBackdrop,
  },
  container: {
    borderTopLeftRadius: COMPONENT_RADIUS.modal,
    borderTopRightRadius: COMPONENT_RADIUS.modal,
    paddingBottom: SPACING.huge,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.xl,
    borderBottomWidth: 1,
  },
  headerTitle: {
    ...TYPOGRAPHY.sectionHeader,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  content: {
    padding: SPACING.xl,
  },
  label: {
    ...TYPOGRAPHY.labelSmall,
    fontWeight: FONT_WEIGHTS.semibold,
    marginBottom: SPACING.sm,
    marginTop: SPACING.lg,
  },
  labelFirst: {
    marginTop: 0,
  },
  subLabel: {
    ...TYPOGRAPHY.caption,
    color: JOURNEY_COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  goalInput: {
    borderRadius: COMPONENT_RADIUS.input,
    padding: SPACING.lg,
    ...TYPOGRAPHY.body,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    ...TYPOGRAPHY.caption,
    color: JOURNEY_COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: 'right',
  },
  pillRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  countPill: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
  },
  countPillText: {
    ...TYPOGRAPHY.button,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  helperText: {
    ...TYPOGRAPHY.caption,
    color: JOURNEY_COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
  toneGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  summaryCard: {
    borderRadius: COMPONENT_RADIUS.card,
    padding: SPACING.lg,
  },
  summaryRow: {
    marginBottom: SPACING.md,
  },
  summaryLabel: {
    ...TYPOGRAPHY.caption,
    color: JOURNEY_COLORS.textSecondary,
    marginBottom: SPACING.xxs,
  },
  summaryValue: {
    ...TYPOGRAPHY.body,
  },
  quizToggleInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  summaryHint: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.xxs,
  },
  errorContainer: {
    marginTop: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: COMPONENT_RADIUS.card,
  },
  errorText: {
    ...TYPOGRAPHY.body,
    color: '#ff6b6b',
    marginBottom: SPACING.sm,
  },
  retryText: {
    ...TYPOGRAPHY.button,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.xl,
  },
  backButton: {
    flex: 1,
    paddingVertical: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.button,
    borderWidth: 1,
    alignItems: 'center',
  },
  backButtonText: {
    ...TYPOGRAPHY.button,
  },
  nextButton: {
    flex: 1,
    paddingVertical: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
  },
  fullWidthButton: {
    flex: 1,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    ...TYPOGRAPHY.button,
    color: JOURNEY_COLORS.textPrimary,
  },
  progressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xxl,
  },
  progressMessage: {
    ...TYPOGRAPHY.body,
    marginTop: SPACING.xl,
    textAlign: 'center',
  },
  progressStep: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.sm,
  },
});
