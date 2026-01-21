/**
 * PaywallFeature Component
 *
 * Displays a single premium feature row with an icon, title, and subtitle.
 * Used to show premium benefits on the paywall screen.
 */

import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { useTheme } from '../common/ThemeProvider';

interface PaywallFeatureProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
}

export function PaywallFeature({ icon, title, subtitle }: PaywallFeatureProps) {
  const { theme } = useTheme();

  return (
    <View testID="paywall-feature-row" style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={SIZES.iconMd} color={theme.accentColor} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.textColor }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondaryColor }]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  iconContainer: {
    width: SIZES.touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.cardSubtitle,
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.xxs,
  },
});
