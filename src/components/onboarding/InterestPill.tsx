import { TouchableOpacity, Text, StyleSheet } from 'react-native';
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
          { color: selected ? '#ffffff' : theme.textColor },
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
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  emoji: {
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});
