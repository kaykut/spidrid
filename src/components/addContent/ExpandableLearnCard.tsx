/**
 * ExpandableLearnCard
 *
 * Expandable card for AI article/curriculum generation with progressive disclosure.
 * - Default: Topic input + summary + "Additional options"
 * - Layer 1: Preset selector + "Design the curriculum" toggle
 * - Layer 2: Total duration + style (only when Design mode is ON)
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
  Switch,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { animateLayout } from '../../constants/animations';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { useWhisperRecording } from '../../hooks/useWhisperRecording';
import { useCurriculumStore } from '../../store/curriculumStore';
import { useGeneratedStore } from '../../store/generatedStore';
import { useJourneyStore } from '../../store/journeyStore';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import {
  ArticleTone,
  TONE_DEFINITIONS,
  PRESET_OPTIONS,
  TOTAL_DURATION_OPTIONS,
  getMaxWordsForWpm,
  PresetId,
} from '../../types/generated';
import { useTheme } from '../common/ThemeProvider';
import { Paywall } from '../paywall/Paywall';

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
  const [showOptions, setShowOptions] = useState(false); // Layer 1
  const [designMode, setDesignMode] = useState(false); // Layer 2 toggle
  const [preset, setPreset] = useState<PresetId>('nugget');
  const [totalDuration, setTotalDuration] = useState(15); // Layer 2
  const [style, setStyle] = useState<ArticleTone | null>(null); // Layer 2, null = auto
  const [showPaywall, setShowPaywall] = useState(false);

  // Recording hook for speech-to-text
  const {
    isRecording,
    isTranscribing,
    error: recordingError,
    startRecording: startWhisperRecording,
    stopAndTranscribe,
  } = useWhisperRecording();

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const optionsRotateAnim = useRef(new Animated.Value(0)).current;
  const recordingPulseAnim = useRef(new Animated.Value(1)).current;
  const recordingPulseRef = useRef<Animated.CompositeAnimation | null>(null);
  const isGenerating = isGeneratingArticle || isGeneratingCurriculum;
  const avgWpm = avgWpmLast3 || 250;

  // Get current preset config
  const currentPreset = PRESET_OPTIONS.find((p) => p.id === preset) || PRESET_OPTIONS[0];

  // Calculate values based on mode
  const maxWordsPerArticle = getMaxWordsForWpm(avgWpm);

  // Calculate article count and words based on mode
  const getCalculatedValues = () => {
    if (designMode) {
      // Design mode: calculate from total duration
      const durationPerArticle = maxWordsPerArticle / avgWpm;
      const articleCount = Math.max(1, Math.round(totalDuration / durationPerArticle));
      const cappedArticleCount = Math.min(articleCount, 15); // Max 15 articles
      const targetWords = maxWordsPerArticle;
      const actualTotalMinutes = cappedArticleCount * durationPerArticle;
      return {
        articleCount: cappedArticleCount,
        targetWords,
        totalMinutes: Math.round(actualTotalMinutes),
        totalWords: cappedArticleCount * targetWords,
      };
    } 
      // Preset mode: use preset values, capped by WPM
      const presetWords = currentPreset.durationMinutes * avgWpm;
      const targetWords = Math.min(presetWords, maxWordsPerArticle);
      const durationPerArticle = targetWords / avgWpm;
      const totalMinutes = Math.round(currentPreset.articles * durationPerArticle);
      return {
        articleCount: currentPreset.articles,
        targetWords,
        totalMinutes,
        totalWords: currentPreset.articles * targetWords,
      };
    
  };

  const { articleCount, targetWords, totalMinutes, totalWords } = getCalculatedValues();

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotateAnim]);

  useEffect(() => {
    Animated.timing(optionsRotateAnim, {
      toValue: showOptions ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [showOptions, optionsRotateAnim]);

  // Recording pulse animation
  useEffect(() => {
    if (isRecording) {
      // Start gentle pulsing
      recordingPulseRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(recordingPulseAnim, {
            toValue: 0.7,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(recordingPulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
      recordingPulseRef.current.start();
    } else {
      // Stop and reset
      recordingPulseRef.current?.stop();
      recordingPulseAnim.setValue(1);
    }
    return () => {
      recordingPulseRef.current?.stop();
    };
  }, [isRecording, recordingPulseAnim]);

  const chevronRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const optionsChevronRotation = optionsRotateAnim.interpolate({
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

  const handleOptionsToggle = () => {
    animateLayout();
    setShowOptions((prev) => !prev);
  };

  const handleDesignModeToggle = (value: boolean) => {
    animateLayout();
    setDesignMode(value);
    if (!value) {
      // Reset Layer 2 values when turning off
      setStyle(null);
    }
  };

  const resetForm = () => {
    setTopic('');
    setShowOptions(false);
    setDesignMode(false);
    setPreset('nugget');
    setTotalDuration(15);
    setStyle(null);
  };

  const handleMicPress = async () => {
    if (isRecording) {
      // Stop recording and transcribe
      const text = await stopAndTranscribe();
      if (text) {
        // Append transcribed text to existing topic (or set if empty)
        setTopic((prev) => (prev ? `${prev} ${text}` : text));
      }
    } else {
      // Start recording
      await startWhisperRecording();
    }
  };

  const handleGenerate = async () => {
    if (!isPremium) {
      setShowPaywall(true);
      return;
    }

    if (!topic.trim() || isGenerating) {return;}

    const toneToUse = designMode && style ? style : 'auto';

    if (articleCount === 1) {
      // Single article generation
      const article = await generateArticle({
        topic: topic.trim(),
        durationMinutes: Math.round(targetWords / avgWpm),
        tone: toneToUse === 'auto' ? 'explanatory' : toneToUse, // Fallback for now until backend supports auto
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
          tone: toneToUse === 'auto' ? 'explanatory' : toneToUse, // Fallback for now
          durationMinutes: Math.round(targetWords / avgWpm),
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

  const canGenerate = topic.trim().length >= 1 && !isGenerating;

  // Build summary text
  const summaryText =
    articleCount === 1
      ? `1 article, ~${Math.round(targetWords).toLocaleString()} words, ${totalMinutes} min read`
      : `${articleCount} articles, ~${Math.round(totalWords).toLocaleString()} total words, ${totalMinutes} min total`;

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
              Generate articles on topics you want to master
            </Text>
          </View>
          <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
            <Ionicons name="chevron-forward" size={SIZES.iconMd} color={theme.textColor} style={styles.chevron} />
          </Animated.View>
        </TouchableOpacity>

        {/* Expanded Form */}
        {isExpanded && (
          <View style={styles.expandedContent}>
            {/* Topic Input with Mic Button */}
            <View style={styles.topicInputContainer}>
              <TextInput
                style={[styles.topicInput, { backgroundColor: theme.backgroundColor, color: theme.textColor }]}
                placeholder="What do you want to learn about?"
                placeholderTextColor={`${theme.textColor}60`}
                value={topic}
                onChangeText={setTopic}
                multiline
                maxLength={500}
                editable={!isGenerating && !isRecording && !isTranscribing}
              />
              <Animated.View style={isRecording ? { opacity: recordingPulseAnim } : undefined}>
                <TouchableOpacity
                  style={[
                    styles.micButton,
                    { backgroundColor: theme.backgroundColor },
                    isRecording && styles.micButtonRecording,
                  ]}
                  onPress={handleMicPress}
                  disabled={isGenerating || isTranscribing}
                >
                  {isTranscribing ? (
                    <ActivityIndicator size="small" color={JOURNEY_COLORS.success} />
                  ) : (
                    <Ionicons
                      name={isRecording ? 'stop' : 'mic'}
                      size={SIZES.iconMd}
                      color={isRecording ? JOURNEY_COLORS.warning : theme.textColor}
                    />
                  )}
                </TouchableOpacity>
              </Animated.View>
            </View>

            {/* Recording Status / Error */}
            {(isRecording || isTranscribing || recordingError) && (
              <Text
                style={[
                  styles.recordingStatus,
                  { color: recordingError ? JOURNEY_COLORS.warning : JOURNEY_COLORS.success },
                ]}
              >
                {recordingError || (isRecording ? 'Listening...' : 'Transcribing...')}
              </Text>
            )}

            {/* Summary */}
            <Text style={[styles.summaryText, { color: theme.textColor }]}>{summaryText}</Text>

            {/* Additional Options Toggle */}
            <TouchableOpacity style={styles.optionsToggle} onPress={handleOptionsToggle} disabled={isGenerating}>
              <Text style={[styles.optionsToggleText, { color: JOURNEY_COLORS.success }]}>Additional options</Text>
              <Animated.View style={{ transform: [{ rotate: optionsChevronRotation }] }}>
                <Ionicons name="chevron-forward" size={SIZES.iconSm} color={JOURNEY_COLORS.success} />
              </Animated.View>
            </TouchableOpacity>

            {/* Layer 1: Preset + Design Toggle */}
            {showOptions && (
              <View style={styles.layer1}>
                {/* Preset Pills */}
                <Text style={[styles.label, { color: theme.textColor }]}>Preset</Text>
                <View style={styles.pillRow}>
                  {PRESET_OPTIONS.map((p) => (
                    <TouchableOpacity
                      key={p.id}
                      style={[
                        styles.pill,
                        styles.presetPill,
                        { backgroundColor: theme.backgroundColor },
                        preset === p.id && styles.pillSelected,
                        preset === p.id && { backgroundColor: JOURNEY_COLORS.success },
                      ]}
                      onPress={() => !isGenerating && !designMode && setPreset(p.id)}
                      disabled={isGenerating || designMode}
                    >
                      <Text
                        style={[
                          styles.pillText,
                          { color: theme.textColor },
                          preset === p.id && styles.pillTextSelected,
                          designMode && styles.pillTextDisabled,
                        ]}
                      >
                        {p.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Design Mode Toggle */}
                <View style={styles.designToggleRow}>
                  <Text style={[styles.designToggleLabel, { color: theme.textColor }]}>Design the curriculum</Text>
                  <Switch
                    value={designMode}
                    onValueChange={handleDesignModeToggle}
                    trackColor={{ false: theme.backgroundColor, true: JOURNEY_COLORS.success }}
                    thumbColor={theme.textColor}
                    disabled={isGenerating}
                  />
                </View>

                {/* Layer 2: Duration + Style (only when Design mode is ON) */}
                {designMode && (
                  <View style={styles.layer2}>
                    {/* Total Duration Pills */}
                    <Text style={[styles.label, { color: theme.textColor }]}>Total duration</Text>
                    <View style={styles.pillRow}>
                      {TOTAL_DURATION_OPTIONS.map((dur) => (
                        <TouchableOpacity
                          key={dur}
                          style={[
                            styles.pill,
                            { backgroundColor: theme.backgroundColor },
                            totalDuration === dur && styles.pillSelected,
                            totalDuration === dur && { backgroundColor: JOURNEY_COLORS.success },
                          ]}
                          onPress={() => !isGenerating && setTotalDuration(dur)}
                          disabled={isGenerating}
                        >
                          <Text
                            style={[
                              styles.pillText,
                              { color: theme.textColor },
                              totalDuration === dur && styles.pillTextSelected,
                            ]}
                          >
                            {dur}m
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    {/* Style Pills */}
                    <Text style={[styles.label, { color: theme.textColor }]}>Style</Text>
                    <View style={styles.pillRow}>
                      <TouchableOpacity
                        style={[
                          styles.pill,
                          styles.stylePill,
                          { backgroundColor: theme.backgroundColor },
                          style === null && styles.pillSelected,
                          style === null && { backgroundColor: JOURNEY_COLORS.success },
                        ]}
                        onPress={() => !isGenerating && setStyle(null)}
                        disabled={isGenerating}
                      >
                        <Text
                          style={[
                            styles.pillText,
                            { color: theme.textColor },
                            style === null && styles.pillTextSelected,
                          ]}
                        >
                          Auto
                        </Text>
                      </TouchableOpacity>
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
                  </View>
                )}
              </View>
            )}

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
  topicInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  topicInput: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: COMPONENT_RADIUS.input,
    ...TYPOGRAPHY.body,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  micButton: {
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButtonRecording: {
    backgroundColor: `${JOURNEY_COLORS.warning}20`,
  },
  recordingStatus: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  summaryText: {
    ...TYPOGRAPHY.caption,
    opacity: 0.7,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  optionsToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    gap: SPACING.xs,
  },
  optionsToggleText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '600',
  },
  layer1: {
    marginTop: SPACING.sm,
  },
  layer2: {
    marginTop: SPACING.sm,
  },
  label: {
    ...TYPOGRAPHY.label,
    marginBottom: SPACING.xs,
    marginTop: SPACING.sm,
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
  presetPill: {
    flex: 1,
    alignItems: 'center',
    minWidth: 70,
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
  pillTextDisabled: {
    opacity: 0.5,
  },
  designToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  designToggleLabel: {
    ...TYPOGRAPHY.body,
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
