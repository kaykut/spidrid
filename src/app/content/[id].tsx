/**
 * Content Deep Link Screen
 *
 * Adds the imported content to the reading queue and redirects to the Player.
 * This enables deep linking to imported content from external sources.
 */

import { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../components/common/ThemeProvider';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { useContentStore } from '../../store/contentStore';
import { usePlaylistStore } from '../../store/playlistStore';

export default function ContentDeepLinkScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const { getContentById } = useContentStore();
  const { loadContent } = usePlaylistStore();

  const content = getContentById(id);

  useEffect(() => {
    if (!content) {
      // Content not found, go back after a moment
      const timer = setTimeout(() => {
        router.back();
      }, 1500);
      return () => clearTimeout(timer);
    }

    // Load content into playlist and navigate to player
    loadContent(id, 'reading');
    router.replace('/(tabs)/play');
  }, [content, id, loadContent]);

  if (!content) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.errorText, { color: theme.textColor }]}>Content not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.accentColor} />
        <Text style={[styles.loadingText, { color: theme.textColor }]}>
          Loading {content.title}...
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  loadingText: {
    ...TYPOGRAPHY.body,
    marginTop: SPACING.lg,
    textAlign: 'center',
  },
  errorText: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginTop: SPACING.huge,
  },
});
