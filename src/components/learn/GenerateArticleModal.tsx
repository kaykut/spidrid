/**
 * GenerateArticleModal Component
 *
 * Bottom sheet modal for generating AI articles.
 * Allows user to enter topic, select duration, and choose writing tone.
 */

import { useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { JOURNEY_COLORS, OVERLAY_COLORS } from '../../data/themes';
import { useGeneratedStore } from '../../store/generatedStore';
import { ArticleTone, TONE_DEFINITIONS, DURATION_OPTIONS } from '../../types/generated';
import { useTheme } from '../common/ThemeProvider';
import { DurationPill } from './DurationPill';
import { TonePill } from './TonePill';

interface Props {
  visible: boolean;
  onClose: () => void;
  avgWpm: number;
}

export function GenerateArticleModal({ visible, onClose, avgWpm }: Props) {
  const { theme } = useTheme();
  const { generateArticle, isGenerating } = useGeneratedStore();

  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState(3);
  const [tone, setTone] = useState<ArticleTone>('explanatory');

  const estimatedWords = Math.round(duration * avgWpm);

  const handleGenerate = async () => {
    if (!topic.trim() || isGenerating) {return;}

    const article = await generateArticle({
      topic: topic.trim(),
      durationMinutes: duration,
      tone,
      avgWpm,
      userId: 'current-user', // TODO: Get from auth when implemented
    });

    if (article) {
      onClose();
      setTopic('');
      router.push(`/generated/${article.id}`);
    }
  };

  const handleClose = () => {
    if (!isGenerating) {
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={handleClose} />
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
          <View style={[styles.header, { borderBottomColor: theme.secondaryBackground }]}>
            <Text style={[styles.headerTitle, { color: theme.textColor }]}>Generate Article</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              disabled={isGenerating}
            >
              <Ionicons
                name="close"
                size={SIZES.iconMd}
                color={isGenerating ? JOURNEY_COLORS.textTertiary : theme.textColor}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={[styles.label, styles.labelFirst, { color: theme.textColor }]}>
              What do you want to learn about?
            </Text>
            <TextInput
              style={[
                styles.topicInput,
                {
                  backgroundColor: theme.secondaryBackground,
                  color: theme.textColor,
                },
              ]}
              placeholder="e.g., The history of coffee, How black holes form, Why cats purr..."
              placeholderTextColor={JOURNEY_COLORS.textTertiary}
              value={topic}
              onChangeText={setTopic}
              multiline
              maxLength={500}
              editable={!isGenerating}
            />

            <Text style={[styles.label, { color: theme.textColor }]}>Reading Duration</Text>
            <View style={styles.durationRow}>
              {DURATION_OPTIONS.map((opt) => (
                <DurationPill
                  key={opt.minutes}
                  label={opt.label}
                  selected={duration === opt.minutes}
                  onPress={() => !isGenerating && setDuration(opt.minutes)}
                />
              ))}
            </View>
            <Text style={[styles.estimatedWords, { color: JOURNEY_COLORS.textSecondary }]}>
              ~{estimatedWords.toLocaleString()} words at your current pace
            </Text>

            <Text style={[styles.label, { color: theme.textColor }]}>Writing Style</Text>
            <View style={styles.toneGrid}>
              {TONE_DEFINITIONS.map((t) => (
                <TonePill
                  key={t.id}
                  tone={t}
                  selected={tone === t.id}
                  onPress={() => !isGenerating && setTone(t.id)}
                />
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.generateButton,
                { backgroundColor: theme.accentColor },
                (!topic.trim() || isGenerating) && styles.generateButtonDisabled,
              ]}
              onPress={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              activeOpacity={0.8}
            >
              {isGenerating ? (
                <ActivityIndicator color={JOURNEY_COLORS.textPrimary} />
              ) : (
                <Text style={styles.generateButtonText}>Generate</Text>
              )}
            </TouchableOpacity>
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
  topicInput: {
    borderRadius: COMPONENT_RADIUS.input,
    padding: SPACING.lg,
    ...TYPOGRAPHY.body,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  durationRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  estimatedWords: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.sm,
  },
  toneGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  generateButton: {
    borderRadius: COMPONENT_RADIUS.button,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  generateButtonDisabled: {
    opacity: 0.5,
  },
  generateButtonText: {
    ...TYPOGRAPHY.button,
    color: JOURNEY_COLORS.textPrimary,
  },
});
