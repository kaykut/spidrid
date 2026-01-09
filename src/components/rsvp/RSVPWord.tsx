import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { space } from '../../constants/spacing';
import { FONT_WEIGHTS, FONT_FAMILY, RSVP_DISPLAY } from '../../constants/typography';
import { ProcessedWord } from '../../types/playback';
import { useTheme } from '../common/ThemeProvider';

interface RSVPWordProps {
  word: ProcessedWord | null;
  fontSize?: number;
}

// Component-specific sizes based on 8pt grid
const RSVP_SIZES = {
  containerHeight: space(15), // 120
  crosshairWidth: 2, // Thin line
  crosshairHeight: space(10), // 80
};

/**
 * RSVPWord Component
 *
 * Displays a single word with the ORP letter highlighted.
 * The ORP letter is ALWAYS positioned at the exact horizontal center (aligned with crosshair).
 * This eliminates eye movement - the core principle of RSVP speed reading.
 */
export function RSVPWord({ word, fontSize = RSVP_DISPLAY.fontSize }: RSVPWordProps) {
  const { theme } = useTheme();

  if (!word) {
    return (
      <View style={styles.container}>
        <Text style={[styles.placeholder, { color: theme.textColor, fontSize }]}>
          Ready
        </Text>
      </View>
    );
  }

  const { display, orpIndex } = word;
  const before = display.slice(0, orpIndex);
  const orpChar = display[orpIndex] || '';
  const after = display.slice(orpIndex + 1);

  return (
    <View style={styles.container}>
      {/* Crosshair indicator - marks the fixed ORP position */}
      <View style={[styles.crosshair, { backgroundColor: theme.crosshairColor }]} />

      {/* Word row: before text | ORP char | after text */}
      <View style={styles.wordRow}>
        {/* Before text: right-aligned so it ends at the ORP */}
        <View style={styles.beforeContainer}>
          <Text style={[styles.word, { color: theme.textColor, fontSize }]}>
            {before}
          </Text>
        </View>

        {/* ORP character: fixed at center */}
        <Text style={[styles.word, styles.orpChar, { color: theme.orpColor, fontSize }]}>
          {orpChar}
        </Text>

        {/* After text: left-aligned so it starts after the ORP */}
        <View style={styles.afterContainer}>
          <Text style={[styles.word, { color: theme.textColor, fontSize }]}>
            {after}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: RSVP_SIZES.containerHeight,
    width: '100%',
  },
  crosshair: {
    position: 'absolute',
    width: RSVP_SIZES.crosshairWidth,
    height: RSVP_SIZES.crosshairHeight,
    opacity: 0.3,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  beforeContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  afterContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  word: {
    fontFamily: FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.regular,
  },
  orpChar: {
    fontWeight: FONT_WEIGHTS.semibold,
  },
  placeholder: {
    opacity: 0.5,
  },
});
