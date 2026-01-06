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
import { router } from 'expo-router';
import { useTheme } from '../../components/common/ThemeProvider';
import { EdgeFadeScrollView } from '../../components/common/EdgeFadeScrollView';
import { useContentStore } from '../../store/contentStore';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { extractFromUrl, createFromText } from '../../services/contentExtractor';
import { Paywall } from '../../components/paywall/Paywall';

type ImportMode = 'url' | 'text' | null;

export default function ReadScreen() {
  const { theme } = useTheme();
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
    if (!content) return;

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
    if (!urlInput.trim()) return;

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
      if (!isPremium) incrementContentCount();
      setImportMode(null);
      setUrlInput('');
      router.push(`/content/${saved.id}`);
    } else {
      Alert.alert('Import Failed', result.error || 'Could not extract content from URL');
    }
  };

  const handleImportText = () => {
    if (!textInput.trim()) return;

    // Check content limit before importing
    if (!isPremium && !canAccessContent()) {
      setShowPaywall(true);
      return;
    }

    const result = createFromText(textInput.trim(), titleInput.trim() || undefined);

    if (result.success && result.content) {
      const saved = addContent(result.content);
      if (!isPremium) incrementContentCount();
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
                  placeholderTextColor={theme.textColor + '60'}
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
                  placeholderTextColor={theme.textColor + '60'}
                  value={titleInput}
                  onChangeText={setTitleInput}
                />
                <TextInput
                  style={[
                    styles.textArea,
                    { backgroundColor: theme.backgroundColor, color: theme.textColor },
                  ]}
                  placeholder="Paste your text here..."
                  placeholderTextColor={theme.textColor + '60'}
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
                          {item.source === 'url' ? '🔗' : '📝'} {item.wordCount} words
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  importButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  importCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  importIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  importLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  importDesc: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  contentList: {
    gap: 12,
  },
  contentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    opacity: 0.6,
  },
  progressIndicator: {
    marginLeft: 12,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
  },
  completeBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  hint: {
    fontSize: 12,
    opacity: 0.5,
    textAlign: 'center',
    marginTop: 16,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.6,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    fontSize: 24,
    padding: 4,
  },
  input: {
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  textArea: {
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 12,
    height: 200,
  },
  importButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  importButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
});
