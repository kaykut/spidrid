/**
 * History Modal
 *
 * Shows completed items that have been moved from the homepage.
 * Only accessible when "Move finished items to history" setting is enabled.
 */

import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  SectionListRenderItem,
  SectionListData,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassView } from '../components/common/GlassView';
import { useTheme } from '../components/common/ThemeProvider';
import { ContentListItemCard } from '../components/contentList/ContentListItemCard';
import { CurriculumAccordionItem } from '../components/contentList/CurriculumAccordionItem';
import { DateSectionHeader } from '../components/contentList/DateSectionHeader';
import { SPACING, SIZES } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { useContentListStore } from '../store/contentListStore';
import { useContentStore } from '../store/contentStore';
import { useCurriculumStore } from '../store/curriculumStore';
import { useGeneratedStore } from '../store/generatedStore';
import { useLearningStore } from '../store/learningStore';
import { ContentListItem, ContentSection } from '../types/contentList';

// Helper to convert hex to rgba with alpha
function hexToRGBA(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function HistoryModal() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation('content');
  const routerNav = useRouter();
  const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';

  const getGroupedHistoryList = useContentListStore((state) => state.getGroupedHistoryList);
  const deleteItem = useContentListStore((state) => state.deleteItem);

  // Subscribe to source stores to trigger re-render when content changes
  const importedContent = useContentStore((state) => state.importedContent);
  const generatedArticles = useGeneratedStore((state) => state.articles);
  const curricula = useCurriculumStore((state) => state.curricula);
  const articleProgress = useLearningStore((state) => state.articleProgress);

  // Get the computed grouped history list - recomputes when source stores change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sections = useMemo(() => getGroupedHistoryList(), [
    getGroupedHistoryList,
    importedContent,
    generatedArticles,
    curricula,
    articleProgress,
  ]);

  const handleClose = () => {
    router.back();
  };

  const handleItemPress = useCallback(
    (item: ContentListItem) => {
      routerNav.push({
        pathname: '/playback',
        params: { sourceId: item.sourceId, source: item.source },
      });
    },
    [routerNav]
  );

  const handleDeleteItem = useCallback(
    (item: ContentListItem) => {
      deleteItem(item);
    },
    [deleteItem]
  );

  const renderItem: SectionListRenderItem<ContentListItem, ContentSection> = useCallback(
    ({ item }) => {
      if (item.isCurriculum) {
        return (
          <CurriculumAccordionItem
            item={item}
            onPress={() => handleItemPress(item)}
            onDelete={() => handleDeleteItem(item)}
            onArticlePress={handleItemPress}
          />
        );
      }

      return (
        <ContentListItemCard
          item={item}
          onPress={() => handleItemPress(item)}
          onDelete={item.source !== 'training' ? () => handleDeleteItem(item) : undefined}
        />
      );
    },
    [handleItemPress, handleDeleteItem]
  );

  const keyExtractor = useCallback((item: ContentListItem) => item.id, []);

  const renderSectionHeader = useCallback(
    ({ section }: { section: SectionListData<ContentListItem, ContentSection> }) => (
      <DateSectionHeader title={section.title} />
    ),
    []
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Close button (top-left) */}
      <View style={[styles.closeButtonContainer, { top: insets.top + SPACING.sm }]}>
        <GlassView
          appearance={isDarkTheme ? 'dark' : 'light'}
          style={styles.closeButtonGlass}
        >
          <TouchableOpacity
            onPress={handleClose}
            style={styles.closeButtonTouchable}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={SIZES.iconLg} color={theme.textColor} />
          </TouchableOpacity>
        </GlassView>
      </View>

      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={keyExtractor}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={[
          styles.listContent,
          { paddingTop: insets.top + SIZES.touchTarget + SPACING.md },
          sections.length === 0 && styles.emptyListContent,
        ]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={[styles.pageTitle, { color: theme.textColor }]}>{t('history.title')}</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons
              name="time-outline"
              size={SIZES.iconHuge}
              color={theme.textColor}
              style={{ opacity: 0.3 }}
            />
            <Text style={[styles.emptyTitle, { color: theme.textColor }]}>
              {t('history.empty_title')}
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.textColor }]}>
              {t('history.empty_subtitle')}
            </Text>
          </View>
        }
      />

      {/* Top gradient overlay */}
      <LinearGradient
        colors={[theme.backgroundColor, hexToRGBA(theme.backgroundColor, 0)]}
        style={[styles.gradientTop, { height: insets.top + SPACING.xxxl }]}
        pointerEvents="none"
      />

      {/* Bottom gradient overlay */}
      <LinearGradient
        colors={[hexToRGBA(theme.backgroundColor, 0), theme.backgroundColor]}
        style={[styles.gradientBottom, { height: insets.bottom + SPACING.xxxl }]}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButtonContainer: {
    position: 'absolute',
    left: SPACING.md,
    zIndex: 10,
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
  },
  closeButtonGlass: {
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    borderRadius: SIZES.touchTarget / 2,
    overflow: 'hidden',
  },
  closeButtonTouchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xxxl,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  pageTitle: {
    ...TYPOGRAPHY.pageTitle,
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.sm,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SPACING.massive,
    gap: SPACING.md,
  },
  emptyTitle: {
    ...TYPOGRAPHY.sectionTitle,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    opacity: 0.6,
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
