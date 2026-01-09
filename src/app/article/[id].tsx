/**
 * Article Deep Link Screen
 *
 * Adds the article to the training queue and redirects to the Player.
 * This enables deep linking to articles from external sources.
 */

import { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../components/common/ThemeProvider';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { getArticleById } from '../../data/curriculum';
import { usePlaylistStore } from '../../store/playlistStore';
import { useSubscriptionStore } from '../../store/subscriptionStore';

export default function ArticleDeepLinkScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const { loadContent } = usePlaylistStore();
  const { canAccessContent, incrementContentCount, isPremium } = useSubscriptionStore();

  const article = getArticleById(id);

  useEffect(() => {
    if (!article) {
      // Article not found, go back after a moment
      const timer = setTimeout(() => {
        router.back();
      }, 1500);
      return () => clearTimeout(timer);
    }

    // Check content limit for non-premium users
    if (!isPremium && !canAccessContent()) {
      router.replace('/paywall?reason=content_limit');
      return;
    }

    // Increment content count for non-premium users
    if (!isPremium) {
      incrementContentCount();
    }

    // Load content into playlist and navigate to player
    loadContent(id, 'training');
    router.replace('/(tabs)/play');
  }, [article, id, isPremium, canAccessContent, incrementContentCount, loadContent]);

  if (!article) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.errorText, { color: theme.textColor }]}>Article not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.accentColor} />
        <Text style={[styles.loadingText, { color: theme.textColor }]}>
          Loading {article.title}...
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
