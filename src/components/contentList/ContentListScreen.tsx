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
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SPACING } from '../../constants/spacing';
import { useContentListStore } from '../../store/contentListStore';
import { ContentListItem } from '../../types/contentList';
import { useTheme } from '../common/ThemeProvider';
import { FABButton } from '../navigation/FABButton';
import { ContentListItemCard } from './ContentListItemCard';
import { CurriculumAccordionItem } from './CurriculumAccordionItem';
import { EmptyState } from './EmptyState';
import { FilterPills } from './FilterPills';

export function ContentListScreen() {
  const { theme } = useTheme();
  const router = useRouter();

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

  // List header with filter pills
  const ListHeader = useMemo(
    () => (
      <FilterPills activeFilter={activeFilter} onFilterChange={setFilter} />
    ),
    [activeFilter, setFilter]
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      edges={['top']}
    >
      <FlatList
        data={contentList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={[
          styles.listContent,
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

      {/* Journey+Profile FAB (top-right) */}
      <FABButton
        position="top-right"
        icon="stats-chart"
        onPress={handleJourneyPress}
        testID="fab-journey"
      />

      {/* Add Content FAB (bottom-right) */}
      <FABButton
        position="bottom-right"
        icon="add"
        onPress={handleAddContentPress}
        testID="fab-add-content"
      />
    </SafeAreaView>
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
});
