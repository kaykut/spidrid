/**
 * Content Deep Link Screen
 *
 * Redirects to the playback modal for imported content.
 * This enables deep linking to imported content from external sources.
 */

import { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../components/common/ThemeProvider';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { useContentStore } from '../../store/contentStore';

export default function ContentDeepLinkScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const { t: tConsumption } = useTranslation('consumption');
  const { t: tAddContent } = useTranslation('addContent');
  const { t: tCommon } = useTranslation('common');

  const content = useContentStore((state) =>
    id ? state.getContentById(id) : undefined
  );

  useEffect(() => {
    if (!content) {
      // Content not found, go back after a moment
      const timer = setTimeout(() => {
        router.back();
      }, 1500);
      return () => clearTimeout(timer);
    }

    if ((content.processingStatus ?? 'ready') !== 'ready') {
      return;
    }

    // Navigate to playback modal
    router.replace({
      pathname: '/playback',
      params: { sourceId: id, source: 'imported' },
    });
  }, [content, id]);

  if (!content) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.errorText, { color: theme.textColor }]}>{tConsumption('content_not_found')}</Text>
      </SafeAreaView>
    );
  }

  const isProcessing = (content.processingStatus ?? 'ready') === 'processing';
  const isError = content.processingStatus === 'error';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.loadingContainer}>
        {!isError && <ActivityIndicator size="large" color={theme.accentColor} />}
        <Text style={[styles.loadingText, { color: theme.textColor }]}>
          {(() => {
            if (isError) { return tAddContent('errors.import_failed'); }
            if (isProcessing) { return tConsumption('import.processing'); }
            return tCommon('loading');
          })()}
        </Text>
        {isError && content.processingError && (
          <Text style={[styles.errorDetail, { color: theme.textColor }]}>
            {content.processingError}
          </Text>
        )}
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
  errorDetail: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.sm,
    textAlign: 'center',
    opacity: 0.7,
  },
  errorText: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginTop: SPACING.huge,
  },
});
