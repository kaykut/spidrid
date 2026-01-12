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

import React, { useCallback, useMemo } from 'react';
import { View, FlatList, StyleSheet, ListRenderItem, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SPACING, SIZES } from '../../constants/spacing';
import { useStats } from '../../hooks/useStats';
import { useContentListStore } from '../../store/contentListStore';
import { useContentStore } from '../../store/contentStore';
import { useCurriculumStore } from '../../store/curriculumStore';
import { useGeneratedStore } from '../../store/generatedStore';
import { useLearningStore } from '../../store/learningStore';
import { ContentListItem } from '../../types/contentList';
import { StatsSummary } from '../certifications';
import { useTheme } from '../common/ThemeProvider';
import { FABButton } from '../navigation/FABButton';
import { ContentListItemCard } from './ContentListItemCard';
import { CurriculumAccordionItem } from './CurriculumAccordionItem';
import { EmptyState } from './EmptyState';
import { FilterPills } from './FilterPills';

export function ContentListScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const stats = useStats();

  const activeFilter = useContentListStore((state) => state.activeFilter);
  const setFilter = useContentListStore((state) => state.setFilter);
  const getContentList = useContentListStore((state) => state.getContentList);
  const hasAnyContent = useContentListStore((state) => state.hasAnyContent);
  const deleteItem = useContentListStore((state) => state.deleteItem);

  // Get the computed content list - recomputes when activeFilter changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const contentList = useMemo(() => getContentList(), [getContentList, activeFilter]);

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
  const renderItem: ListRenderItem<ContentListItem> = useCallback(
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

  // Key extractor for FlatList
  const keyExtractor = useCallback((item: ContentListItem) => item.id, []);

  // Calculate top margin for stats panel to clear the FAB
  const FAB_SIZE = SIZES.touchTarget + SPACING.sm; // 52pt (matches FABButton)
  const statsTopMargin = FAB_SIZE + SPACING.sm; // Space below FAB

  // List header with stats panel and filter pills
  const ListHeader = useMemo(
    () => (
      <View>
        <View style={[styles.statsContainer, { marginTop: statsTopMargin }]}>
          <StatsSummary
            articlesRead={stats.articlesRead}
            totalWords={stats.totalWords}
            averageAccuracy={stats.averageAccuracy}
            bestWPM={stats.bestWPM}
            tiersEarned={stats.tiersEarned}
          />
        </View>
        <FilterPills activeFilter={activeFilter} onFilterChange={setFilter} />
      </View>
    ),
    [activeFilter, setFilter, stats, statsTopMargin]
  );

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
      <FlatList
        data={contentList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={[
          styles.listContent,
          { paddingTop: insets.top },
          contentList.length === 0 && styles.emptyListContent,
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

      {/* Profile FAB (top-right) */}
      <FABButton
        position="top-right"
        icon="person"
        onPress={handleJourneyPress}
        testID="fab-profile"
      />

      {/* Add Content FAB (bottom-right) */}
      <FABButton
        position="bottom-right"
        icon="add"
        onPress={handleAddContentPress}
        testID="fab-add-content"
      />

      {/* Top gradient overlay */}
      <LinearGradient
        colors={[theme.backgroundColor, 'transparent']}
        style={[styles.gradientTop, { height: insets.top + SPACING.xxxl }]}
        pointerEvents="none"
      />

      {/* Bottom gradient overlay */}
      <LinearGradient
        colors={['transparent', theme.backgroundColor]}
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
  statsContainer: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
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
