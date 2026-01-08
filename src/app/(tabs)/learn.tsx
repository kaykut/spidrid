/**
 * Learn Tab Screen (Placeholder)
 *
 * Placeholder for the future Learning mode.
 * This tab will contain interactive learning experiences.
 */

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../components/common/ThemeProvider';
import { SPACING, COMPONENT_RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

export default function LearnScreen() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]} edges={['top']}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.textColor }]}>Learn</Text>

        <View style={styles.placeholderContainer}>
          <View style={[styles.iconCircle, { backgroundColor: theme.secondaryBackground }]}>
            <Ionicons name="book-outline" size={48} color={theme.accentColor} />
          </View>

          <Text style={[styles.comingSoon, { color: theme.textColor }]}>
            Coming Soon
          </Text>

          <Text style={[styles.description, { color: theme.textColor }]}>
            Interactive learning experiences are being developed. In the meantime, build your speed reading skills with our training articles.
          </Text>

          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: theme.accentColor }]}
            onPress={() => router.push('/(tabs)/train')}
          >
            <Text style={styles.ctaButtonText}>Go to Train</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.pageTitle,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: SPACING.xxxl,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  comingSoon: {
    ...TYPOGRAPHY.sectionHeader,
    marginBottom: SPACING.md,
  },
  description: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    opacity: 0.7,
    paddingHorizontal: SPACING.xxl,
    marginBottom: SPACING.xxl,
  },
  ctaButton: {
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
  },
  ctaButtonText: {
    ...TYPOGRAPHY.button,
    color: '#ffffff',
  },
});
