/**
 * Journey Tab Components
 *
 * Components for the Journey tab, implementing the "Quiet Velocity" design system.
 * Unified view with 7-level progress path, metrics panel, and smart recommendations.
 */

// Animation components
export * from './animations';

// Unified Progress Path (6 WPM milestones - horizontal)
export { UnifiedProgressPath } from './UnifiedProgressPath';
export type { UnifiedProgressPathProps } from './UnifiedProgressPath';

// Vertical Progress Path (6 WPM milestones - vertical)
export { VerticalProgressPath } from './VerticalProgressPath';
export type { VerticalProgressPathProps } from './VerticalProgressPath';

// Metrics Panel (WPM, Comprehension, Streak)
export { MetricsPanel } from './MetricsPanel';
export type { MetricsPanelProps } from './MetricsPanel';

// Smart Queue for recommendations
export { SmartQueue } from './SmartQueue';
export type { SmartQueueProps } from './SmartQueue';

// Insights Panel (progress and trends)
export { InsightsPanel } from './InsightsPanel';
export type { InsightsPanelProps } from './InsightsPanel';

// Up Next Card (legacy, may be removed)
export { UpNextCard } from './UpNextCard';
export type { UpNextCardProps } from './UpNextCard';
