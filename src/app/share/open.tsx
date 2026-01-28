import { useEffect, useMemo, useRef } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../components/common/ThemeProvider';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { enqueueImport } from '../../services/contentProcessingQueue';
import { useShareIntentStore } from '../../store/shareIntentStore';
import { PendingImportPayload } from '../../types/content';

type ShareParams = {
  type?: string;
  url?: string;
  text?: string;
  value?: string;
  fileUri?: string;
  fileName?: string;
  mimeType?: string;
};

function buildPayload(params: ShareParams): PendingImportPayload | null {
  const type = params.type;
  const value = safeDecode(params.value);

  if (type === 'url') {
    const url = safeDecode(params.url) || value;
    return url ? { type: 'url', url } : null;
  }

  if (type === 'text') {
    const text = safeDecode(params.text) || value;
    return text ? { type: 'text', text } : null;
  }

  if (type === 'pdf' || type === 'epub') {
    if (!params.fileUri || !params.fileName) {
      return null;
    }
    return {
      type: 'file',
      uri: params.fileUri,
      fileName: params.fileName,
      mimeType: params.mimeType,
      source: type,
    };
  }

  return null;
}

function safeDecode(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default function ShareOpenScreen() {
  const params = useLocalSearchParams<ShareParams>();
  const { theme } = useTheme();
  const { t: tConsumption } = useTranslation('consumption');
  const { t: tAddContent } = useTranslation('addContent');
  const pendingPayload = useShareIntentStore((state) => state.pendingPayload);
  const clearPendingPayload = useShareIntentStore((state) => state.clearPendingPayload);
  const didEnqueueRef = useRef(false);

  const payload = useMemo(() => {
    return pendingPayload || buildPayload(params);
  }, [pendingPayload, params]);

  useEffect(() => {
    if (didEnqueueRef.current) {
      return;
    }
    if (!payload) {
      return;
    }

    didEnqueueRef.current = true;
    const saved = enqueueImport(payload);
    if (pendingPayload) {
      clearPendingPayload();
    }
    router.replace(`/content/${saved.id}`);
  }, [payload, pendingPayload, clearPendingPayload]);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <ActivityIndicator size="large" color={theme.accentColor} />
      <Text style={[styles.title, { color: theme.textColor }]}>
        {payload ? tConsumption('import.processing') : tAddContent('errors.import_failed')}
      </Text>
      {!payload && (
        <Text style={[styles.subtitle, { color: theme.textColor }]}>
          {tAddContent('errors.extract_content')}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.body,
    marginTop: SPACING.lg,
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.sm,
    textAlign: 'center',
    opacity: 0.7,
  },
});
