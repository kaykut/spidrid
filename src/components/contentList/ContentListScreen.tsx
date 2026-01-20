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
import { useItemChangeTracking } from '../../hooks/useItemChangeTracking';
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
import { AnimatedListItem } from './AnimatedListItem';
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
  const _importedContent = useContentStore((state) => state.importedContent);
  const _generatedArticles = useGeneratedStore((state) => state.articles);
  const _curricula = useCurriculumStore((state) => state.curricula);
  const _articleProgress = useLearningStore((state) => state.articleProgress);
  const _moveFinishedToHistory = useSettingsStore((state) => state.moveFinishedToHistory);

  // Mark subscriptions as intentionally unused (they trigger re-renders via side effects)
  void _importedContent;
  void _generatedArticles;
  void _curricula;
  void _articleProgress;
  void _moveFinishedToHistory;

  // Get the computed grouped content list - recomputes when source stores change
  const sections = useMemo(() => {
    return getGroupedContentList();
  }, [getGroupedContentList]);

  // Check if list is truly empty (no content at all, ignoring filter)
  const isEmptyWithoutFilter = useMemo(() => {
    return !hasAnyContent();
  }, [hasAnyContent]);

  // Extract current item IDs for change tracking
  const currentItemIds = useMemo(() => {
    return sections.flatMap((section) => section.data.map((item) => item.id));
  }, [sections]);

  // Track item changes (new, existing, removed) for animations
  const { changeMap } = useItemChangeTracking(currentItemIds);

  // Helper to calculate global index across sections for stagger
  const getGlobalIndex = useCallback(
    (sectionIndex: number, itemIndex: number): number => {
      let globalIndex = 0;
      for (let i = 0; i < sectionIndex; i++) {
        globalIndex += sections[i].data.length;
      }
      return globalIndex + itemIndex;
    },
    [sections]
  );

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

  // Render individual list items
  const renderItem: SectionListRenderItem<ContentListItem, ContentSection> = useCallback(
    ({ item, section, index: itemIndex }) => {
      // Calculate global index for stagger animation
      const sectionIndex = sections.indexOf(section);
      const globalIndex = getGlobalIndex(sectionIndex, itemIndex);

      // Get change type for this item (default to 'existing' if not found)
      const changeType = changeMap.get(item.id) || 'existing';

      // Render curriculum with accordion
      if (item.isCurriculum) {
        return (
          <AnimatedListItem index={globalIndex} changeType={changeType}>
            <CurriculumAccordionItem
              item={item}
              onPress={() => undefined} // Curriculum itself is not playable - only expands/collapses
              onDelete={() => handleDeleteItem(item)}
              onArticlePress={handleItemPress}
            />
          </AnimatedListItem>
        );
      }

      // Render regular content item
      return (
        <AnimatedListItem index={globalIndex} changeType={changeType}>
          <ContentListItemCard
            item={item}
            onPress={() => handleItemPress(item)}
            onDelete={item.source !== 'training' ? () => handleDeleteItem(item) : undefined}
          />
        </AnimatedListItem>
      );
    },
    [handleItemPress, handleDeleteItem, sections, getGlobalIndex, changeMap]
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
          glassStyle="regular"
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
