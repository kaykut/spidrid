/**
 * ReadContent - Import Content UI
 *
 * URL input, text paste, and document picker for importing content.
 * Extracted from read.tsx for use in add-content modal.
 */

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { JOURNEY_COLORS, OVERLAY_COLORS } from '../../data/themes';
import { extractFromUrl, createFromText, extractFromEbook } from '../../services/contentExtractor';
import { useContentStore } from '../../store/contentStore';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { useTheme } from '../common/ThemeProvider';
import { Paywall } from '../paywall/Paywall';
import { usePdfExtractor } from '../PdfExtractorProvider';

type ImportMode = 'url' | 'text' | null;

interface ReadContentProps {
  onClose: () => void;
}

export function ReadContent({ onClose }: ReadContentProps) {
  const { theme } = useTheme();
  const { extractPdf } = usePdfExtractor();
  const { addContent } = useContentStore();
  const { canAccessContent, incrementContentCount, isPremium } = useSubscriptionStore();

  const [importMode, setImportMode] = useState<ImportMode>(null);
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  /**
   * Check if import is allowed (non-premium users have limits).
   */
  const checkImportLimit = (): boolean => {
    if (isPremium) {
      return true;
    }
    if (!canAccessContent()) {
      setShowPaywall(true);
      return false;
    }
    return true;
  };

  /**
   * Track import for non-premium users and navigate to content.
   */
  const handleImportSuccess = (contentId: string) => {
    if (!isPremium) {
      incrementContentCount();
    }
    onClose();
    // Navigate to content view (will be updated to /playback in M5)
    router.push(`/content/${contentId}`);
  };

  const handleImportUrl = async () => {
    if (!urlInput.trim() || !checkImportLimit()) {
      return;
    }

    setIsLoading(true);
    const result = await extractFromUrl(urlInput.trim());
    setIsLoading(false);

    if (result.success && result.content) {
      const saved = addContent(result.content);
      setImportMode(null);
      setUrlInput('');
      handleImportSuccess(saved.id);
    } else {
      Alert.alert('Import Failed', result.error || 'Could not extract content from URL');
    }
  };

  const handleImportText = () => {
    if (!textInput.trim() || !checkImportLimit()) {
      return;
    }

    const result = createFromText(textInput.trim(), titleInput.trim() || undefined);

    if (result.success && result.content) {
      const saved = addContent(result.content);
      setImportMode(null);
      setTextInput('');
      setTitleInput('');
      handleImportSuccess(saved.id);
    } else {
      Alert.alert('Import Failed', result.error || 'Could not process text');
    }
  };

  const handlePickEbook = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/epub+zip',
          'application/pdf',
          'application/x-mobipocket-ebook',
        ],
        copyToCacheDirectory: true,
      });

      if (result.canceled || !checkImportLimit()) {
        return;
      }

      const asset = result.assets[0];
      setIsLoading(true);

      const importResult = await extractFromEbook(asset.uri, asset.name, {
        pdfExtractor: extractPdf,
      });

      setIsLoading(false);

      if (importResult.success && importResult.content) {
        const saved = addContent(importResult.content);
        handleImportSuccess(saved.id);
      } else {
        Alert.alert('Import Failed', importResult.error || 'Could not extract content');
      }
    } catch (_error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  return (
    <>
      <Paywall
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        reason="content_limit"
      />

      {/* Import Modal */}
      <Modal
        visible={importMode !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setImportMode(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.secondaryBackground }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.textColor }]}>
                {importMode === 'url' ? 'Import from URL' : 'Paste Text'}
              </Text>
              <TouchableOpacity onPress={() => setImportMode(null)}>
                <Text style={[styles.closeButton, { color: theme.textColor }]}>X</Text>
              </TouchableOpacity>
            </View>

            {importMode === 'url' && (
              <>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: theme.backgroundColor, color: theme.textColor },
                  ]}
                  placeholder="Enter URL (e.g., https://example.com/article)"
                  placeholderTextColor={`${theme.textColor}60`}
                  value={urlInput}
                  onChangeText={setUrlInput}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="url"
                />
                <TouchableOpacity
                  style={[
                    styles.importButton,
                    { backgroundColor: theme.accentColor },
                    isLoading && styles.disabledButton,
                  ]}
                  onPress={handleImportUrl}
                  disabled={isLoading || !urlInput.trim()}
                >
                  {isLoading ? (
                    <ActivityIndicator color={JOURNEY_COLORS.textPrimary} />
                  ) : (
                    <Text style={styles.importButtonText}>Import</Text>
                  )}
                </TouchableOpacity>
              </>
            )}

            {importMode === 'text' && (
              <>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: theme.backgroundColor, color: theme.textColor },
                  ]}
                  placeholder="Title (optional)"
                  placeholderTextColor={`${theme.textColor}60`}
                  value={titleInput}
                  onChangeText={setTitleInput}
                />
                <TextInput
                  style={[
                    styles.textArea,
                    { backgroundColor: theme.backgroundColor, color: theme.textColor },
                  ]}
                  placeholder="Paste your text here..."
                  placeholderTextColor={`${theme.textColor}60`}
                  value={textInput}
                  onChangeText={setTextInput}
                  multiline
                  textAlignVertical="top"
                />
                <TouchableOpacity
                  style={[
                    styles.importButton,
                    { backgroundColor: theme.accentColor },
                  ]}
                  onPress={handleImportText}
                  disabled={!textInput.trim()}
                >
                  <Text style={styles.importButtonText}>Save & Read</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.description, { color: theme.textColor }]}>
          Speed read your own articles or books from PDFs, EPUBs, or web links.
        </Text>

        {/* Import Buttons */}
        <View style={styles.importButtons}>
          <TouchableOpacity
            style={[styles.importCard, { backgroundColor: theme.secondaryBackground }]}
            onPress={() => setImportMode('url')}
          >
            <Text style={styles.importIcon}>🔗</Text>
            <Text style={[styles.importLabel, { color: theme.textColor }]}>From URL</Text>
            <Text style={[styles.importDesc, { color: theme.textColor }]}>
              Import web articles
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.importCard, { backgroundColor: theme.secondaryBackground }]}
            onPress={() => setImportMode('text')}
          >
            <Text style={styles.importIcon}>📝</Text>
            <Text style={[styles.importLabel, { color: theme.textColor }]}>Paste Text</Text>
            <Text style={[styles.importDesc, { color: theme.textColor }]}>
              Any text content
            </Text>
          </TouchableOpacity>
        </View>

        {/* E-book Import Button */}
        <TouchableOpacity
          style={[styles.ebookCard, { backgroundColor: theme.secondaryBackground }]}
          onPress={handlePickEbook}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.accentColor} />
          ) : (
            <>
              <Text style={styles.ebookIcon}>📚</Text>
              <View style={styles.ebookTextContainer}>
                <Text style={[styles.importLabel, { color: theme.textColor }]}>Import E-book</Text>
                <Text style={[styles.importDesc, { color: theme.textColor }]}>
                  EPUB & PDF files
                </Text>
              </View>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: SPACING.xxxl,
  },
  description: {
    ...TYPOGRAPHY.body,
    opacity: 0.7,
    marginBottom: SPACING.xl,
  },
  importButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  importCard: {
    flex: 1,
    padding: SPACING.xl,
    borderRadius: COMPONENT_RADIUS.card,
    alignItems: 'center',
  },
  ebookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.card,
  },
  ebookTextContainer: {
    marginLeft: SPACING.md,
  },
  importIcon: {
    fontSize: SIZES.iconXl,
    marginBottom: SPACING.sm,
  },
  ebookIcon: {
    fontSize: SIZES.iconXl,
  },
  importLabel: {
    ...TYPOGRAPHY.cardSubtitle,
    marginBottom: SPACING.xs,
  },
  importDesc: {
    ...TYPOGRAPHY.caption,
    opacity: 0.6,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: OVERLAY_COLORS.modalBackdrop,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: COMPONENT_RADIUS.modal,
    borderTopRightRadius: COMPONENT_RADIUS.modal,
    padding: SPACING.xxl,
    paddingBottom: SPACING.huge,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  modalTitle: {
    ...TYPOGRAPHY.sectionHeader,
  },
  closeButton: {
    fontSize: SIZES.iconLg,
    padding: SPACING.xs,
  },
  input: {
    padding: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.input,
    fontSize: TYPOGRAPHY.button.fontSize,
    marginBottom: SPACING.md,
  },
  textArea: {
    padding: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.input,
    fontSize: TYPOGRAPHY.button.fontSize,
    marginBottom: SPACING.md,
    height: 200,
  },
  importButton: {
    paddingVertical: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
  },
  importButtonText: {
    color: JOURNEY_COLORS.textPrimary,
    ...TYPOGRAPHY.button,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
