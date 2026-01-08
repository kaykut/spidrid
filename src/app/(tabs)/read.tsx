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
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import { EdgeFadeScrollView } from '../../components/common/EdgeFadeScrollView';
import { useTheme } from '../../components/common/ThemeProvider';
import { Paywall } from '../../components/paywall/Paywall';
import { usePdfExtractor } from '../../components/PdfExtractorProvider';
import { SPACING, RADIUS, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { extractFromUrl, createFromText, extractFromEbook } from '../../services/contentExtractor';
import { useContentStore } from '../../store/contentStore';
import { useSubscriptionStore } from '../../store/subscriptionStore';

type ImportMode = 'url' | 'text' | null;

export default function ReadScreen() {
  const { theme } = useTheme();
  const { extractPdf } = usePdfExtractor();
  const { importedContent, addContent, deleteContent } = useContentStore();
  const { canAccessContent, incrementContentCount, isPremium } = useSubscriptionStore();

  const [importMode, setImportMode] = useState<ImportMode>(null);
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  const handleOpenContent = (id: string) => {
    const content = importedContent.find(c => c.id === id);
    if (!content) {return;}

    // Check content limit for unfinished content
    if (content.readProgress < 1 && !isPremium) {
      if (!canAccessContent()) {
        setShowPaywall(true);
        return;
      }
    }

    router.push(`/content/${id}`);
  };

  const handleImportUrl = async () => {
    if (!urlInput.trim()) {return;}

    // Check content limit before importing
    if (!isPremium && !canAccessContent()) {
      setShowPaywall(true);
      return;
    }

    setIsLoading(true);
    const result = await extractFromUrl(urlInput.trim());
    setIsLoading(false);

    if (result.success && result.content) {
      const saved = addContent(result.content);
      if (!isPremium) {incrementContentCount();}
      setImportMode(null);
      setUrlInput('');
      router.push(`/content/${saved.id}`);
    } else {
      Alert.alert('Import Failed', result.error || 'Could not extract content from URL');
    }
  };

  const handleImportText = () => {
    if (!textInput.trim()) {return;}

    // Check content limit before importing
    if (!isPremium && !canAccessContent()) {
      setShowPaywall(true);
      return;
    }

    const result = createFromText(textInput.trim(), titleInput.trim() || undefined);

    if (result.success && result.content) {
      const saved = addContent(result.content);
      if (!isPremium) {incrementContentCount();}
      setImportMode(null);
      setTextInput('');
      setTitleInput('');
      router.push(`/content/${saved.id}`);
    } else {
      Alert.alert('Import Failed', result.error || 'Could not process text');
    }
  };

  const handleDeleteContent = (id: string) => {
    Alert.alert(
      'Delete Content',
      'Are you sure you want to delete this content?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteContent(id) },
      ]
    );
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

      if (result.canceled) {
        return;
      }

      const asset = result.assets[0];

      // Check content limit before importing
      if (!isPremium && !canAccessContent()) {
        setShowPaywall(true);
        return;
      }

      setIsLoading(true);

      const importResult = await extractFromEbook(asset.uri, asset.name, {
        pdfExtractor: extractPdf,
      });

      setIsLoading(false);

      if (importResult.success && importResult.content) {
        const saved = addContent(importResult.content);
        if (!isPremium) {incrementContentCount();}
        router.push(`/content/${saved.id}`);
      } else {
        Alert.alert('Import Failed', importResult.error || 'Could not extract content');
      }
    } catch (_error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
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
                <Text style={[styles.closeButton, { color: theme.textColor }]}>✕</Text>
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
                  placeholderTextColor={`${theme.textColor  }60`}
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
                    <ActivityIndicator color="#ffffff" />
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
                  placeholderTextColor={`${theme.textColor  }60`}
                  value={titleInput}
                  onChangeText={setTitleInput}
                />
                <TextInput
                  style={[
                    styles.textArea,
                    { backgroundColor: theme.backgroundColor, color: theme.textColor },
                  ]}
                  placeholder="Paste your text here..."
                  placeholderTextColor={`${theme.textColor  }60`}
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

      <EdgeFadeScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.textColor }]}>Read</Text>

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
                <Text style={styles.importIcon}>📚</Text>
                <View style={styles.ebookTextContainer}>
                  <Text style={[styles.importLabel, { color: theme.textColor }]}>Import E-book</Text>
                  <Text style={[styles.importDesc, { color: theme.textColor }]}>
                    EPUB & PDF files
                  </Text>
                </View>
              </>
            )}
          </TouchableOpacity>

          {/* Content List */}
          {importedContent.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                Your Content
              </Text>
              <View style={styles.contentList}>
                {importedContent.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.contentCard, { backgroundColor: theme.secondaryBackground }]}
                    onPress={() => handleOpenContent(item.id)}
                    onLongPress={() => handleDeleteContent(item.id)}
                  >
                    <View style={styles.contentInfo}>
                      <Text
                        style={[styles.contentTitle, { color: theme.textColor }]}
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                      <View style={styles.contentMeta}>
                        <Text style={[styles.metaText, { color: theme.textColor }]}>
                          {item.source === 'url' ? '🔗' : item.source === 'epub' ? '📚' : item.source === 'pdf' ? '📄' : '📝'} {item.wordCount} words
                        </Text>
                        <Text style={[styles.metaText, { color: theme.textColor }]}>
                          · {formatDate(item.createdAt)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.progressIndicator}>
                      {item.readProgress >= 1 ? (
                        <View style={[styles.completeBadge, { backgroundColor: theme.accentColor }]}>
                          <Text style={styles.completeText}>✓</Text>
                        </View>
                      ) : (
                        <Text style={[styles.progressText, { color: theme.accentColor }]}>
                          {Math.round(item.readProgress * 100)}%
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={[styles.hint, { color: theme.textColor }]}>
                Long press to delete
              </Text>
            </>
          )}

          {importedContent.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, { color: theme.textColor }]}>
                Import content to start speed reading
              </Text>
            </View>
        )}
      </EdgeFadeScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.pageTitle,
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
    marginBottom: SPACING.xxxl,
  },
  ebookTextContainer: {
    marginLeft: SPACING.md,
  },
  importIcon: {
    fontSize: SIZES.iconXl,
    marginBottom: SPACING.sm,
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
  sectionTitle: {
    ...TYPOGRAPHY.sectionHeader,
    marginBottom: SPACING.lg,
  },
  contentList: {
    gap: SPACING.md,
  },
  contentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: RADIUS.lg + 2, // 14pt
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    ...TYPOGRAPHY.cardSubtitle,
    marginBottom: SPACING.xs,
  },
  contentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    ...TYPOGRAPHY.caption,
    opacity: 0.6,
  },
  progressIndicator: {
    marginLeft: SPACING.md,
  },
  progressText: {
    ...TYPOGRAPHY.buttonSmall,
  },
  completeBadge: {
    width: SIZES.iconLg,
    height: SIZES.iconLg,
    borderRadius: SIZES.iconLg / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  hint: {
    ...TYPOGRAPHY.caption,
    opacity: 0.5,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: SPACING.huge,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    opacity: 0.6,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: SPACING.xxl,
    borderTopRightRadius: SPACING.xxl,
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
    fontSize: 16,
    marginBottom: SPACING.md,
  },
  textArea: {
    padding: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.input,
    fontSize: 16,
    marginBottom: SPACING.md,
    height: 200,
  },
  importButton: {
    paddingVertical: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
  },
  importButtonText: {
    color: '#ffffff',
    ...TYPOGRAPHY.button,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
