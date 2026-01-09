/**
 * TonePill Component
 *
 * Selectable pill for writing tone in the article generation form.
 * Displays emoji and label for the tone option.
 */

import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { ToneDefinition } from '../../types/generated';
import { useTheme } from '../common/ThemeProvider';

interface Props {
  tone: ToneDefinition;
  selected: boolean;
  onPress: () => void;
}

export function TonePill({ tone, selected, onPress }: Props) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.pill,
        { backgroundColor: selected ? theme.accentColor : theme.secondaryBackground },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.emoji}>{tone.emoji}</Text>
      <Text
        style={[
          styles.text,
          { color: selected ? JOURNEY_COLORS.textPrimary : theme.textColor },
        ]}
      >
        {tone.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: COMPONENT_RADIUS.button,
    gap: SPACING.xs,
  },
  emoji: {
    fontSize: SIZES.iconSm,
  },
  text: {
    ...TYPOGRAPHY.buttonSmall,
  },
});
