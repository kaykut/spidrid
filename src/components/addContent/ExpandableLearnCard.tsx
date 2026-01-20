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
  TONE_DEFINITIONS,
  PORTION_OPTIONS,
  FlavorOption,
  PortionId,
} from '../../types/generated';
import { useTheme } from '../common/ThemeProvider';
import { Paywall } from '../paywall/Paywall';
import { PremiumBadge } from '../premium/PremiumBadge';

interface ExpandableLearnCardProps {
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
  onClose: () => void;
}

export function ExpandableLearnCard({ isExpanded, onExpandChange, onClose }: ExpandableLearnCardProps) {
  const { theme } = useTheme();
  const { generateArticle, isGenerating: isGeneratingArticle } = useGeneratedStore();
  const { createCurriculumV2, isGenerating: isGeneratingCurriculum } = useCurriculumStore();
  const { avgWpmLast3 } = useJourneyStore();
  const { isPremium, canGenerateArticle, incrementGenerationCount } = useSubscriptionStore();

  // Form state
  const [topic, setTopic] = useState('');
  const [portion, setPortion] = useState<PortionId>('bite');
  const [showCustomize, setShowCustomize] = useState(false);
  const [flavor, setFlavor] = useState<FlavorOption>('auto');
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallReason, setPaywallReason] = useState<'generation_limit' | undefined>();

  // Recording hook for speech-to-text
  const {
    isRecording,
    isTranscribing,
    error: recordingError,
    startRecording: startWhisperRecording,
    stopAndTranscribe,
  } = useWhisperRecording();

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const customizeRotateAnim = useRef(new Animated.Value(0)).current;
  const recordingPulseAnim = useRef(new Animated.Value(1)).current;
  const recordingPulseRef = useRef<Animated.CompositeAnimation | null>(null);
  const isGenerating = isGeneratingArticle || isGeneratingCurriculum;
  const avgWpm = avgWpmLast3 || 250;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotateAnim]);

  useEffect(() => {
    Animated.timing(customizeRotateAnim, {
      toValue: showCustomize ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [showCustomize, customizeRotateAnim]);

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

  const customizeChevronRotation = customizeRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'], // Down arrow rotates 180 when expanded
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

  const handlePortionChange = (newPortion: PortionId) => {
    setPortion(newPortion);
    animateLayout();
  };

  const handleCustomizeToggle = () => {
    animateLayout();
    setShowCustomize((prev) => !prev);
  };

  const resetForm = () => {
    setTopic('');
    setPortion('bite');
    setShowCustomize(false);
    setFlavor('auto');
  };

  // Helper to get portion card display text
  const getPortionDisplay = (option: typeof PORTION_OPTIONS[number]) => {
    const { min: minArticles, max: maxArticles } = option.articleRange;
    const { min: minDur, max: maxDur } = option.durationRange;

    // Add "articles" or "article" suffix
    const articleCount = minArticles === maxArticles ? minArticles : `${minArticles}-${maxArticles}`;
    const articleText = minArticles === 1 ? '1 article' : `${articleCount} articles`;
    const durationText = minDur === maxDur ? `${minDur}min` : `${minDur}-${maxDur}min`;

    return { articleText, durationText };
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
    if (!topic.trim() || isGenerating) {
      return;
    }

    // Use Bite as default when customization is hidden
    const effectivePortion = showCustomize ? portion : 'bite';
    const effectiveFlavor = showCustomize ? flavor : 'auto';

    // Check if user is trying to use premium features
    const isPremiumPortion = effectivePortion !== 'bite';
    const isPremiumFlavor = effectiveFlavor !== 'auto';

    if (!isPremium && (isPremiumPortion || isPremiumFlavor)) {
      setPaywallReason(undefined);
      setShowPaywall(true);
      return;
    }

    // Check if free user has hit daily generation limit
    if (!isPremium && !canGenerateArticle()) {
      setPaywallReason('generation_limit');
      setShowPaywall(true);
      return;
    }

    const currentOption = PORTION_OPTIONS.find((p) => p.id === effectivePortion)!;
    const { min, max } = currentOption.articleRange;
    const durationRange = currentOption.durationRange;

    if (min === 1 && max === 1) {
      // Bite: standalone article generation (fixed 3 min)
      const article = await generateArticle({
        topic: topic.trim(),
        durationMinutes: durationRange.min, // 3 min for Bite
        tone: effectiveFlavor,
        avgWpm,
        userId: 'current-user',
      });

      if (article) {
        // Increment generation count for free users
        if (!isPremium) {
          incrementGenerationCount();
        }
        resetForm();
        onExpandChange(false);
        onClose();
        router.push(`/generated/${article.id}`);
      }
    } else {
      // Curriculum generation with duration range (V2 API)
      const curriculumId = await createCurriculumV2(
        {
          goal: topic.trim(),
          articleRange: { min, max },
          tone: effectiveFlavor, // Can be 'auto'
          durationRange, // Pass range instead of fixed duration
        },
        avgWpm
      );

      if (curriculumId) {
        // Increment generation count for free users
        if (!isPremium) {
          incrementGenerationCount();
        }
        resetForm();
        onExpandChange(false);
        onClose();
        router.push(`/curriculum/${curriculumId}/article/0`);
      }
    }
  };

  const canGenerate = topic.trim().length >= 1 && !isGenerating;

  return (
    <>
      <Paywall
        visible={showPaywall}
        onClose={() => {
          setShowPaywall(false);
          setPaywallReason(undefined);
        }}
        reason={paywallReason}
      />
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
            {/* Topic Input with Mic Button and Customize Toggle Inside */}
            <View style={styles.topicInputWrapper}>
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
              <Animated.View
                style={[
                  styles.micButtonInside,
                  isRecording ? { opacity: recordingPulseAnim } : undefined,
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.micButtonInner,
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

              {/* Customize Toggle - Inside Text Box at Bottom */}
              <TouchableOpacity style={styles.customizeToggleInside} onPress={handleCustomizeToggle} disabled={isGenerating}>
                <Text style={[styles.customizeToggleText, { color: theme.textColor }]}>Adjust duration and tone</Text>
                <Animated.View style={{ transform: [{ rotate: customizeChevronRotation }] }}>
                  <Ionicons name="chevron-down" size={SIZES.iconSm} color={theme.textColor} />
                </Animated.View>
              </TouchableOpacity>
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

            {/* Customize Section (Expanded) */}
            {showCustomize && (
              <View>
                {/* Portion Section */}
                <Text style={[styles.label, { color: theme.textColor }]}>Portion</Text>
                <View style={styles.portionCardsRow}>
                  {PORTION_OPTIONS.map((p) => {
                    const { articleText, durationText } = getPortionDisplay(p);
                    const isLocked = !isPremium && p.id !== 'bite';
                    return (
                      <TouchableOpacity
                        key={p.id}
                        style={[
                          styles.portionCard,
                          { backgroundColor: theme.backgroundColor },
                          portion === p.id && { backgroundColor: JOURNEY_COLORS.success },
                        ]}
                        onPress={() => {
                          if (isLocked) {
                            setPaywallReason(undefined);
                            setShowPaywall(true);
                          } else {
                            handlePortionChange(p.id);
                          }
                        }}
                        disabled={isGenerating}
                        accessible={true}
                        accessibilityRole="button"
                        accessibilityLabel={`${p.label} portion${isLocked ? ' (Premium feature)' : ''}`}
                        accessibilityHint={isLocked ? 'Upgrade to premium to unlock' : `Select ${p.label} portion`}
                        accessibilityState={{ disabled: isGenerating || isLocked }}
                      >
                        <Text
                          style={[
                            styles.portionCardLabel,
                            { color: theme.textColor },
                            portion === p.id && styles.portionCardTextSelected,
                          ]}
                        >
                          {p.label}
                        </Text>
                        <Text
                          style={[
                            styles.portionCardArticles,
                            { color: theme.textColor },
                            portion === p.id && styles.portionCardTextSelected,
                          ]}
                        >
                          {articleText}
                        </Text>
                        <Text
                          style={[
                            styles.portionCardDuration,
                            { color: theme.textColor },
                            portion === p.id && styles.portionCardTextSelected,
                          ]}
                        >
                          {durationText}
                        </Text>

                        {isLocked && <PremiumBadge />}
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Flavor Pills */}
                <Text style={[styles.label, { color: theme.textColor }]}>Flavor</Text>
                <View style={styles.flavorPillRow}>
                  <TouchableOpacity
                    style={[
                      styles.flavorPill,
                      { backgroundColor: theme.backgroundColor },
                      flavor === 'auto' && { backgroundColor: JOURNEY_COLORS.success },
                    ]}
                    onPress={() => !isGenerating && setFlavor('auto')}
                    disabled={isGenerating}
                  >
                    <Text
                      style={[
                        styles.flavorPillText,
                        { color: theme.textColor },
                        flavor === 'auto' && styles.pillTextSelected,
                      ]}
                    >
                      Auto
                    </Text>
                  </TouchableOpacity>
                  {TONE_DEFINITIONS.map((t) => {
                    const isLocked = !isPremium;
                    return (
                      <TouchableOpacity
                        key={t.id}
                        style={[
                          styles.flavorPill,
                          { backgroundColor: theme.backgroundColor },
                          flavor === t.id && { backgroundColor: JOURNEY_COLORS.success },
                        ]}
                        onPress={() => {
                          if (isLocked) {
                            setPaywallReason(undefined);
                            setShowPaywall(true);
                          } else if (!isGenerating) {
                            setFlavor(t.id);
                          }
                        }}
                        disabled={isGenerating}
                        accessible={true}
                        accessibilityRole="button"
                        accessibilityLabel={`${t.label} flavor${isLocked ? ' (Premium feature)' : ''}`}
                        accessibilityHint={isLocked ? 'Upgrade to premium to unlock' : `Select ${t.label} writing style`}
                        accessibilityState={{ disabled: isGenerating || isLocked }}
                      >
                        <Text
                          style={[
                            styles.flavorPillText,
                            { color: theme.textColor },
                            flavor === t.id && styles.pillTextSelected,
                          ]}
                        >
                          {t.label}
                        </Text>
                        {isLocked && <PremiumBadge size={8} top={2} right={2} />}
                      </TouchableOpacity>
                    );
                  })}
                </View>
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
                <Text style={styles.generateButtonText}>Serve it up</Text>
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
  topicInputWrapper: {
    position: 'relative',
    width: '100%',
  },
  topicInput: {
    width: '100%',
    paddingTop: SPACING.md,
    paddingLeft: SPACING.md,
    paddingRight: SIZES.touchTarget + SPACING.xs,
    paddingBottom: SIZES.touchTarget + SPACING.xs,
    borderRadius: COMPONENT_RADIUS.input,
    ...TYPOGRAPHY.body,
    minHeight: 150,
    textAlignVertical: 'top',
  },
  micButtonInside: {
    position: 'absolute',
    right: SPACING.xs,
    top: SPACING.xs,
  },
  micButtonInner: {
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
  label: {
    ...TYPOGRAPHY.label,
    marginBottom: SPACING.xxs,
    marginTop: SPACING.xs,
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
  customizeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  customizeToggleInside: {
    position: 'absolute',
    bottom: SPACING.xs,
    left: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  customizeToggleText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '600',
  },
  portionCardsRow: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  portionCard: {
    flex: 1,
    borderRadius: COMPONENT_RADIUS.button,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xs,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xxs,
  },
  portionCardLabel: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  portionCardArticles: {
    fontSize: 11,
    fontWeight: '400',
  },
  portionCardDuration: {
    fontSize: 11,
    fontWeight: '400',
    opacity: 0.7,
  },
  portionCardTextSelected: {
    color: JOURNEY_COLORS.textPrimary,
  },
  flavorPillRow: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginTop: SPACING.xs,
  },
  flavorPill: {
    position: 'relative',
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: COMPONENT_RADIUS.button,
  },
  flavorPillText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '600',
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
