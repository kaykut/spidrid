/**
 * ContentListScreen - Main Content List View
 *
 * The primary screen showing all user content in a unified list.
 * Features:
 * - Filter pills at top for category filtering
 * - FlatList of content items (cards and curricula)
 * - FAB buttons for Journey+Profile (top-right) and Add Content (bottom-right)
 * - Empty state when no content
 */

import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  SectionList,
  StyleSheet,
  SectionListRenderItem,
  RefreshControl,
  SectionListData,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SPACING } from '../../constants/spacing';
import { useStats } from '../../hooks/useStats';
import { useContentListStore } from '../../store/contentListStore';
import { useContentStore } from '../../store/contentStore';
import { useCurriculumStore } from '../../store/curriculumStore';
import { useGeneratedStore } from '../../store/generatedStore';
import { useLearningStore } from '../../store/learningStore';
import { useSettingsStore } from '../../store/settingsStore';
import { ContentListItem, ContentSection } from '../../types/contentList';
import { StatsSummary } from '../certifications';
import { GlassView } from '../common/GlassView';
import { useTheme } from '../common/ThemeProvider';
import { FloatingActionBar } from '../navigation/FloatingActionBar';
import { ContentListItemCard } from './ContentListItemCard';
import { CurriculumAccordionItem } from './CurriculumAccordionItem';
import { DateSectionHeader } from './DateSectionHeader';
import { EmptyState } from './EmptyState';
import { FilterPills } from './FilterPills';

// Helper to convert hex to rgba with alpha
function hexToRGBA(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function ContentListScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const stats = useStats();
  const [headerHeight, setHeaderHeight] = useState(0);
  const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';

  const activeFilter = useContentListStore((state) => state.activeFilter);
  const setFilter = useContentListStore((state) => state.setFilter);
  const getGroupedContentList = useContentListStore((state) => state.getGroupedContentList);
  const hasAnyContent = useContentListStore((state) => state.hasAnyContent);
  const deleteItem = useContentListStore((state) => state.deleteItem);

  // Subscribe to source stores to trigger re-render when content changes
  const importedContent = useContentStore((state) => state.importedContent);
  const generatedArticles = useGeneratedStore((state) => state.articles);
  const curricula = useCurriculumStore((state) => state.curricula);
  const articleProgress = useLearningStore((state) => state.articleProgress);
  const moveFinishedToHistory = useSettingsStore((state) => state.moveFinishedToHistory);

  // Get the computed grouped content list - recomputes when source stores change
  // eslint-disable-next-line react-hooks/exhaustive-deps -- Dependencies trigger recomputation when stores change
  const sections = useMemo(() => getGroupedContentList(), [
    getGroupedContentList,
    activeFilter,
    importedContent,
    generatedArticles,
    curricula,
    articleProgress,
    moveFinishedToHistory,
  ]);

  // Check if list is truly empty (no content at all, ignoring filter)
  const isEmptyWithoutFilter = useMemo(() => {
    return !hasAnyContent();
  }, [hasAnyContent]);

  // Navigation handlers
  const handleJourneyPress = useCallback(() => {
    router.push('/journey-profile');
  }, [router]);

  const handleAddContentPress = useCallback(() => {
    router.push('/add-content');
  }, [router]);

  const handleItemPress = useCallback(
    (item: ContentListItem) => {
      // Navigate to playback modal with content info
      router.push({
        pathname: '/playback',
        params: { sourceId: item.sourceId, source: item.source },
      });
    },
    [router]
  );

  const handleDeleteItem = useCallback(
    (item: ContentListItem) => {
      deleteItem(item);
    },
    [deleteItem]
  );

  const handleQuizPress = useCallback(
    (item: ContentListItem) => {
      // Navigate to quiz modal
      router.push({
        pathname: '/playback-quiz',
        params: { sourceId: item.sourceId, source: item.source },
      });
    },
    [router]
  );

  // Render individual list items
  const renderItem: SectionListRenderItem<ContentListItem, ContentSection> = useCallback(
    ({ item }) => {
      // Render curriculum with accordion
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

      // Render regular content item
      return (
        <ContentListItemCard
          item={item}
          onPress={() => handleItemPress(item)}
          onDelete={item.source !== 'training' ? () => handleDeleteItem(item) : undefined}
          onQuizPress={item.quizPending ? () => handleQuizPress(item) : undefined}
        />
      );
    },
    [handleItemPress, handleDeleteItem, handleQuizPress]
  );

  // Key extractor for SectionList
  const keyExtractor = useCallback((item: ContentListItem) => item.id, []);

  // Render section headers
  const renderSectionHeader = useCallback(
    ({ section }: { section: SectionListData<ContentListItem, ContentSection> }) => (
      <DateSectionHeader title={section.title} />
    ),
    []
  );

  // Handle header layout to get its height for SectionList padding
  const handleHeaderLayout = useCallback((event: { nativeEvent: { layout: { height: number } } }) => {
    setHeaderHeight(event.nativeEvent.layout.height);
  }, []);

  // Empty state component
  const ListEmptyComponent = useMemo(
    () =>
      isEmptyWithoutFilter ? (
        <EmptyState onAddContent={handleAddContentPress} />
      ) : (
        // Show filtered empty state
        <View style={styles.filteredEmpty}>
          {/* Can add a "No items in this category" message here if desired */}
        </View>
      ),
    [isEmptyWithoutFilter, handleAddContentPress]
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={[
          styles.listContent,
          { paddingTop: headerHeight },
          sections.length === 0 && styles.emptyListContent,
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              // Force re-render by toggling filter
              const currentFilter = activeFilter;
              setFilter(null);
              setTimeout(() => setFilter(currentFilter), 0);
            }}
            tintColor={theme.accentColor}
          />
        }
      />

      {/* Sticky glass header with stats and filter pills */}
      <View
        style={styles.stickyHeader}
        onLayout={handleHeaderLayout}
      >
        <GlassView
          appearance={isDarkTheme ? 'dark' : 'light'}
          style={[styles.glassContainer, { paddingTop: insets.top }]}
        >
          <View style={styles.statsContainer}>
            <StatsSummary
              articlesRead={stats.articlesRead}
              totalWords={stats.totalWords}
              averageComprehension={stats.averageComprehension}
              bestWPM={stats.bestWPM}
              transparent
            />
          </View>
          <FilterPills activeFilter={activeFilter} onFilterChange={setFilter} />
        </GlassView>
      </View>

      {/* Floating Action Bar (bottom-right) */}
      <FloatingActionBar
        actions={[
          { icon: 'person', onPress: handleJourneyPress, testID: 'content-list.fab-profile' },
          { icon: 'add', onPress: handleAddContentPress, testID: 'content-list.fab-add' },
        ]}
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
  listContent: {
    paddingBottom: SPACING.huge + SPACING.xxxl, // Space for bottom FAB
  },
  emptyListContent: {
    flexGrow: 1,
  },
  filteredEmpty: {
    flex: 1,
    paddingTop: SPACING.xxxl,
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  glassContainer: {
    overflow: 'hidden',
  },
  statsContainer: {
    marginHorizontal: SPACING.md,
    marginTop: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
