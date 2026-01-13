import {
  mergeItems,
  findNewItems,
  findModifiedSince,
  SyncItem,
} from '../../src/services/syncService';

interface TestItem extends SyncItem {
  id: string;
  updatedAt: number;
  name: string;
}

describe('syncService', () => {
  describe('mergeItems', () => {
    it('should return empty array when both inputs are empty', () => {
      const result = mergeItems<TestItem>([], []);
      expect(result).toEqual([]);
    });

    it('should return local items when remote is empty', () => {
      const local: TestItem[] = [
        { id: '1', updatedAt: 1000, name: 'Item 1' },
        { id: '2', updatedAt: 2000, name: 'Item 2' },
      ];

      const result = mergeItems(local, []);

      expect(result).toHaveLength(2);
      expect(result).toContainEqual({ id: '1', updatedAt: 1000, name: 'Item 1' });
      expect(result).toContainEqual({ id: '2', updatedAt: 2000, name: 'Item 2' });
    });

    it('should return remote items when local is empty', () => {
      const remote: TestItem[] = [
        { id: '1', updatedAt: 1000, name: 'Item 1' },
        { id: '2', updatedAt: 2000, name: 'Item 2' },
      ];

      const result = mergeItems([], remote);

      expect(result).toHaveLength(2);
      expect(result).toContainEqual({ id: '1', updatedAt: 1000, name: 'Item 1' });
      expect(result).toContainEqual({ id: '2', updatedAt: 2000, name: 'Item 2' });
    });

    it('should return union when items have no overlap', () => {
      const local: TestItem[] = [
        { id: '1', updatedAt: 1000, name: 'Local 1' },
        { id: '2', updatedAt: 2000, name: 'Local 2' },
      ];
      const remote: TestItem[] = [
        { id: '3', updatedAt: 3000, name: 'Remote 3' },
        { id: '4', updatedAt: 4000, name: 'Remote 4' },
      ];

      const result = mergeItems(local, remote);

      expect(result).toHaveLength(4);
      expect(result.map(i => i.id).sort()).toEqual(['1', '2', '3', '4']);
    });

    it('should deduplicate identical items', () => {
      const item: TestItem = { id: '1', updatedAt: 1000, name: 'Same Item' };
      const local: TestItem[] = [item];
      const remote: TestItem[] = [item];

      const result = mergeItems(local, remote);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(item);
    });

    it('should keep remote when remote is newer', () => {
      const local: TestItem[] = [{ id: '1', updatedAt: 1000, name: 'Old Local' }];
      const remote: TestItem[] = [{ id: '1', updatedAt: 2000, name: 'New Remote' }];

      const result = mergeItems(local, remote);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ id: '1', updatedAt: 2000, name: 'New Remote' });
    });

    it('should keep local when local is newer', () => {
      const local: TestItem[] = [{ id: '1', updatedAt: 2000, name: 'New Local' }];
      const remote: TestItem[] = [{ id: '1', updatedAt: 1000, name: 'Old Remote' }];

      const result = mergeItems(local, remote);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ id: '1', updatedAt: 2000, name: 'New Local' });
    });

    it('should keep local when timestamps are equal', () => {
      const local: TestItem[] = [{ id: '1', updatedAt: 1000, name: 'Local Version' }];
      const remote: TestItem[] = [{ id: '1', updatedAt: 1000, name: 'Remote Version' }];

      const result = mergeItems(local, remote);

      expect(result).toHaveLength(1);
      // When equal, local wins (it's added first and not replaced)
      expect(result[0]).toEqual({ id: '1', updatedAt: 1000, name: 'Local Version' });
    });

    it('should handle mixed scenario with new, conflicting, and equal items', () => {
      const local: TestItem[] = [
        { id: '1', updatedAt: 1000, name: 'Local Only' },
        { id: '2', updatedAt: 2000, name: 'Local Newer' },
        { id: '3', updatedAt: 1000, name: 'Local Older' },
      ];
      const remote: TestItem[] = [
        { id: '2', updatedAt: 1000, name: 'Remote Older' },
        { id: '3', updatedAt: 2000, name: 'Remote Newer' },
        { id: '4', updatedAt: 4000, name: 'Remote Only' },
      ];

      const result = mergeItems(local, remote);

      expect(result).toHaveLength(4);

      // Local only item preserved
      expect(result.find(i => i.id === '1')).toEqual({
        id: '1',
        updatedAt: 1000,
        name: 'Local Only',
      });

      // Local newer wins
      expect(result.find(i => i.id === '2')).toEqual({
        id: '2',
        updatedAt: 2000,
        name: 'Local Newer',
      });

      // Remote newer wins
      expect(result.find(i => i.id === '3')).toEqual({
        id: '3',
        updatedAt: 2000,
        name: 'Remote Newer',
      });

      // Remote only item added
      expect(result.find(i => i.id === '4')).toEqual({
        id: '4',
        updatedAt: 4000,
        name: 'Remote Only',
      });
    });
  });

  describe('findNewItems', () => {
    it('should return empty array when items is empty', () => {
      const existing: TestItem[] = [{ id: '1', updatedAt: 1000, name: 'Existing' }];

      const result = findNewItems<TestItem>([], existing);

      expect(result).toEqual([]);
    });

    it('should return all items when existing is empty', () => {
      const items: TestItem[] = [
        { id: '1', updatedAt: 1000, name: 'Item 1' },
        { id: '2', updatedAt: 2000, name: 'Item 2' },
      ];

      const result = findNewItems(items, []);

      expect(result).toHaveLength(2);
    });

    it('should return items not in existing', () => {
      const items: TestItem[] = [
        { id: '1', updatedAt: 1000, name: 'Item 1' },
        { id: '2', updatedAt: 2000, name: 'Item 2' },
        { id: '3', updatedAt: 3000, name: 'Item 3' },
      ];
      const existing: TestItem[] = [
        { id: '1', updatedAt: 1000, name: 'Item 1' },
        { id: '3', updatedAt: 3000, name: 'Item 3' },
      ];

      const result = findNewItems(items, existing);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2');
    });

    it('should return empty when all items exist', () => {
      const items: TestItem[] = [
        { id: '1', updatedAt: 1000, name: 'Item 1' },
      ];
      const existing: TestItem[] = [
        { id: '1', updatedAt: 2000, name: 'Updated Item 1' },
      ];

      const result = findNewItems(items, existing);

      expect(result).toEqual([]);
    });
  });

  describe('findModifiedSince', () => {
    it('should return empty array when items is empty', () => {
      const result = findModifiedSince<TestItem>([], 1000);
      expect(result).toEqual([]);
    });

    it('should return items updated after timestamp', () => {
      const items: TestItem[] = [
        { id: '1', updatedAt: 500, name: 'Old' },
        { id: '2', updatedAt: 1000, name: 'Equal' },
        { id: '3', updatedAt: 1500, name: 'New' },
        { id: '4', updatedAt: 2000, name: 'Newer' },
      ];

      const result = findModifiedSince(items, 1000);

      expect(result).toHaveLength(2);
      expect(result.map(i => i.id)).toEqual(['3', '4']);
    });

    it('should return all items when timestamp is 0', () => {
      const items: TestItem[] = [
        { id: '1', updatedAt: 500, name: 'Item 1' },
        { id: '2', updatedAt: 1000, name: 'Item 2' },
      ];

      const result = findModifiedSince(items, 0);

      expect(result).toHaveLength(2);
    });

    it('should return empty when no items modified since timestamp', () => {
      const items: TestItem[] = [
        { id: '1', updatedAt: 500, name: 'Old 1' },
        { id: '2', updatedAt: 1000, name: 'Old 2' },
      ];

      const result = findModifiedSince(items, 2000);

      expect(result).toEqual([]);
    });
  });
});
