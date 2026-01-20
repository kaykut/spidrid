/**
 * useItemChangeTracking - Track item changes across renders
 *
 * Identifies which items are new, existing, or removed between renders
 * for selective list animations. Uses stable item IDs to track changes.
 */

import { useRef, useEffect, useMemo } from 'react';

export type ChangeType = 'new' | 'existing' | 'removed';

interface ItemChangeMap {
  changeMap: Map<string, ChangeType>;
  removedItems: Array<{ id: string; index: number }>;
}

/**
 * Tracks item changes across renders to identify new, existing, and removed items
 * @param currentIds - Array of current item IDs
 * @returns Map of item ID to change type, plus array of removed items
 */
export function useItemChangeTracking(currentIds: string[]): ItemChangeMap {
  const prevIdsRef = useRef<string[]>([]);

  // Compute change map synchronously during render (prevents flash)
  const changeMap = useMemo(() => {
    const newMap = new Map<string, ChangeType>();
    const prevIdSet = new Set(prevIdsRef.current);

    // Identify new and existing items
    currentIds.forEach((id) => {
      if (prevIdSet.has(id)) {
        newMap.set(id, 'existing');
      } else {
        newMap.set(id, 'new');
      }
    });

    return newMap;
  }, [currentIds]);

  // Compute removed items synchronously during render
  const removedItems = useMemo(() => {
    const currentIdSet = new Set(currentIds);
    const removed: Array<{ id: string; index: number }> = [];

    prevIdsRef.current.forEach((id, index) => {
      if (!currentIdSet.has(id)) {
        removed.push({ id, index });
      }
    });

    return removed;
  }, [currentIds]);

  // Update prevIdsRef after render
  useEffect(() => {
    prevIdsRef.current = currentIds;
  }, [currentIds]);

  return { changeMap, removedItems };
}
