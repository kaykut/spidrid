/**
 * Play Tab Screen (Placeholder)
 *
 * Unified playback screen for the player.
 * Will show current content being played with RSVP controls.
 */

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../components/common/ThemeProvider';
import { SPACING, COMPONENT_RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

export default function PlayScreen() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]} edges={['top']}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.textColor }]}>Player</Text>

        <View style={styles.placeholderContainer}>
          <View style={[styles.iconCircle, { backgroundColor: theme.secondaryBackground }]}>
            <Ionicons name="play-circle-outline" size={64} color={theme.accentColor} />
          </View>

          <Text style={[styles.emptyTitle, { color: theme.textColor }]}>
            No Content Playing
          </Text>

          <Text style={[styles.description, { color: theme.textColor }]}>
            Add content from Train, Read, or Learn tabs to start your speed reading session.
          </Text>

          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: theme.accentColor }]}
            onPress={() => router.push('/(tabs)/content/train')}
          >
            <Text style={styles.ctaButtonText}>Browse Content</Text>
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
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  emptyTitle: {
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
