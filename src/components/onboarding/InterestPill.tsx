import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SPACING, COMPONENT_RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { useTheme } from '../common/ThemeProvider';

interface InterestPillProps {
  label: string;
  emoji: string;
  selected: boolean;
  onPress: () => void;
}

export function InterestPill({ label, emoji, selected, onPress }: InterestPillProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.pill,
        {
          backgroundColor: selected ? theme.accentColor : theme.secondaryBackground,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text
        style={[
          styles.label,
          { color: selected ? JOURNEY_COLORS.textPrimary : theme.textColor },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.chip,
    gap: SPACING.sm,
  },
  emoji: {
    fontSize: TYPOGRAPHY.button.fontSize,
  },
  label: {
    fontSize: TYPOGRAPHY.buttonSmall.fontSize,
    fontWeight: FONT_WEIGHTS.medium,
  },
});
