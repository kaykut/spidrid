import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SPACING, COMPONENT_RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { ChapterPauseInfo } from '../../types/playback';
import { useTheme } from '../common/ThemeProvider';

interface ChapterPauseOverlayProps {
  chapter: ChapterPauseInfo;
  onContinue: () => void;
}

/**
 * ChapterPauseOverlay Component
 *
 * Displays when RSVP playback reaches a new chapter.
 * Shows the chapter number and title, with a button to continue reading.
 */
export function ChapterPauseOverlay({ chapter, onContinue }: ChapterPauseOverlayProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.chapterLabel, { color: theme.accentColor }]}>
        Chapter {chapter.index}
      </Text>
      <Text
        style={[styles.chapterTitle, { color: theme.textColor }]}
        numberOfLines={3}
      >
        {chapter.title}
      </Text>
      <TouchableOpacity
        style={[styles.continueButton, { backgroundColor: theme.accentColor }]}
        onPress={onContinue}
        activeOpacity={0.8}
      >
        <Text style={styles.continueText}>Continue Reading</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xxl,
  },
  chapterLabel: {
    ...TYPOGRAPHY.caption,
    fontWeight: FONT_WEIGHTS.semibold,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: SPACING.sm,
  },
  chapterTitle: {
    ...TYPOGRAPHY.sectionTitle,
    textAlign: 'center',
    marginBottom: SPACING.xxl,
  },
  continueButton: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
  },
  continueText: {
    ...TYPOGRAPHY.button,
    color: '#000000',
    fontWeight: FONT_WEIGHTS.semibold,
  },
});
