/**
 * DurationPill Component
 *
 * Selectable pill for reading duration in the article generation form.
 */

import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SPACING, COMPONENT_RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { useTheme } from '../common/ThemeProvider';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function DurationPill({ label, selected, onPress }: Props) {
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
      <Text
        style={[
          styles.text,
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
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: COMPONENT_RADIUS.button,
  },
  text: {
    ...TYPOGRAPHY.buttonSmall,
  },
});
