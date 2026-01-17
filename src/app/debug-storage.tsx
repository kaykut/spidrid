import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../components/common/ThemeProvider';
import { SPACING } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { useContentStore } from '../store/contentStore';

export default function DebugStorage() {
  const { theme } = useTheme();
  const { importedContent } = useContentStore();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backButton, { color: theme.textColor }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.textColor }]}>Debug Storage</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
          Imported Content ({importedContent.length} items)
        </Text>

        {importedContent.map((item, index) => (
          <View key={item.id} style={[styles.item, { backgroundColor: theme.secondaryBackground }]}>
            <Text style={[styles.itemTitle, { color: theme.textColor }]}>
              #{index + 1}: {item.title}
            </Text>
            <Text style={[styles.itemDetail, { color: theme.textColor }]}>
              ID: {item.id}
            </Text>
            <Text style={[styles.itemDetail, { color: theme.textColor }]}>
              Source: {item.source}
            </Text>
            {item.sourceUrl && (
              <Text style={[styles.itemDetail, { color: theme.textColor }]}>
                URL: {item.sourceUrl}
              </Text>
            )}
            <Text style={[styles.itemDetail, { color: theme.textColor }]}>
              Word Count: {item.wordCount}
            </Text>
            <Text style={[styles.itemDetail, { color: theme.textColor }]}>
              Content Length: {item.content.length} chars
            </Text>
            <Text style={[styles.itemDetail, { color: theme.textColor }]}>
              Created: {new Date(item.createdAt).toLocaleString()}
            </Text>
            <View style={styles.contentPreview}>
              <Text style={[styles.previewLabel, { color: theme.textColor }]}>
                Content Preview (first 500 chars):
              </Text>
              <Text style={[styles.previewText, { color: theme.textColor }]}>
                {item.content.substring(0, 500)}...
              </Text>
            </View>
          </View>
        ))}

        {importedContent.length === 0 && (
          <Text style={[styles.emptyText, { color: theme.textColor }]}>
            No imported content found in storage
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: SPACING.lg,
    paddingTop: SPACING.xxxl,
  },
  backButton: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.pageTitle,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.sectionHeader,
    marginBottom: SPACING.md,
  },
  item: {
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.md,
  },
  itemTitle: {
    ...TYPOGRAPHY.cardTitle,
    marginBottom: SPACING.sm,
  },
  itemDetail: {
    ...TYPOGRAPHY.caption,
    marginBottom: SPACING.xs,
    opacity: 0.8,
  },
  contentPreview: {
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  previewLabel: {
    ...TYPOGRAPHY.caption,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  previewText: {
    ...TYPOGRAPHY.caption,
    opacity: 0.7,
    fontFamily: 'Courier',
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    opacity: 0.5,
    marginTop: SPACING.xl,
  },
});
