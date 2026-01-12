/**
 * Date Grouping Utility
 *
 * Provides functions to group content items by relative date buckets
 * (Today, Yesterday, Earlier This Week, etc.) for section headers.
 */

export type DateBucket =
  | 'today'
  | 'yesterday'
  | 'earlier_this_week'
  | 'last_week'
  | 'this_month'
  | 'older'
  | 'practice';

export const DATE_BUCKET_LABELS: Record<DateBucket, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  earlier_this_week: 'Earlier This Week',
  last_week: 'Last Week',
  this_month: 'This Month',
  older: 'Older',
  practice: 'Practice',
};

/**
 * Order of date buckets for display (most recent first)
 */
export const DATE_BUCKET_ORDER: DateBucket[] = [
  'today',
  'yesterday',
  'earlier_this_week',
  'last_week',
  'this_month',
  'older',
  'practice',
];

/**
 * Determine which date bucket a timestamp belongs to.
 *
 * @param timestamp - Unix timestamp in milliseconds (0 = practice/training)
 * @returns The date bucket for the timestamp
 */
export function getDateBucket(timestamp: number): DateBucket {
  // Training articles have timestamp 0
  if (timestamp === 0) {
    return 'practice';
  }

  const now = new Date();
  const date = new Date(timestamp);

  // Reset to start of day for comparison
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const itemDateStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const diffMs = todayStart.getTime() - itemDateStart.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'today';
  }

  if (diffDays === 1) {
    return 'yesterday';
  }

  // Earlier this week: 2-6 days ago
  if (diffDays >= 2 && diffDays <= 6) {
    return 'earlier_this_week';
  }

  // Last week: 7-13 days ago
  if (diffDays >= 7 && diffDays <= 13) {
    return 'last_week';
  }

  // This month: same month and year
  if (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return 'this_month';
  }

  return 'older';
}
