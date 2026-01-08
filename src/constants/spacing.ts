/**
 * Quiet Velocity Spacing System
 *
 * 8pt grid system for consistent spacing throughout the app.
 * All values are multiples of the base unit (8).
 */

// =============================================================================
// Base Unit
// =============================================================================

export const BASE_UNIT = 8;

// =============================================================================
// Spacing Scale
// =============================================================================

export const SPACING = {
  /** 4pt - Extra small gaps */
  xs: 4,
  /** 8pt - Small gaps, tight padding */
  sm: 8,
  /** 12pt - Between small and medium */
  md: 12,
  /** 16pt - Standard padding */
  lg: 16,
  /** 20pt - Card padding */
  xl: 20,
  /** 24pt - Section gaps */
  xxl: 24,
  /** 32pt - Large section gaps */
  xxxl: 32,
  /** 40pt - Extra large gaps */
  huge: 40,
  /** 48pt - Massive gaps */
  massive: 48,
} as const;

// =============================================================================
// Component-Specific Spacing
// =============================================================================

export const COMPONENT_SPACING = {
  /** Card internal padding */
  cardPadding: 20,
  /** Standard screen horizontal padding */
  screenPadding: 16,
  /** Gap between cards/sections */
  sectionGap: 24,
  /** Gap between items in a list */
  listItemGap: 12,
  /** Gap between inline elements */
  inlineGap: 8,
  /** Header padding */
  headerPadding: 16,
  /** Tab bar height */
  tabBarHeight: 56,
} as const;

// =============================================================================
// Border Radius
// =============================================================================

export const RADIUS = {
  /** 4pt - Small elements */
  xs: 4,
  /** 6pt - Progress bars (full round feel) */
  sm: 6,
  /** 8pt - Small cards, chips */
  md: 8,
  /** 12pt - Buttons */
  lg: 12,
  /** 16pt - Cards */
  xl: 16,
  /** 20pt - Large cards, modals */
  xxl: 20,
  /** Full round */
  full: 9999,
} as const;

// =============================================================================
// Component-Specific Radius
// =============================================================================

export const COMPONENT_RADIUS = {
  /** Cards: 16pt */
  card: 16,
  /** Buttons: 12pt */
  button: 12,
  /** Progress bars: 6pt (full round) */
  progressBar: 6,
  /** Input fields: 12pt */
  input: 12,
  /** Modals: 20pt */
  modal: 20,
  /** Chips/badges: 8pt */
  chip: 8,
  /** Journey path nodes */
  node: 9999,
} as const;

// =============================================================================
// Sizes
// =============================================================================

export const SIZES = {
  /** Progress bar height */
  progressBarHeight: 8,
  /** Journey path node size */
  nodeSize: 16,
  /** Journey path current node size */
  currentNodeSize: 24,
  /** Journey path line stroke */
  pathLineWidth: 3,
  /** Touch target minimum */
  touchTarget: 44,
  /** Icon sizes */
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
  iconXl: 32,
} as const;

// =============================================================================
// Shadows (iOS-style)
// =============================================================================

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  /** Glow effect for current node */
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 0,
  }),
} as const;

// =============================================================================
// Layout Helpers
// =============================================================================

/**
 * Calculate spacing based on multiplier of base unit
 */
export function space(multiplier: number): number {
  return BASE_UNIT * multiplier;
}

/**
 * Create consistent padding object
 */
export function padding(
  vertical: number,
  horizontal?: number
): { paddingVertical: number; paddingHorizontal: number } {
  return {
    paddingVertical: vertical,
    paddingHorizontal: horizontal ?? vertical,
  };
}

/**
 * Create consistent margin object
 */
export function margin(
  vertical: number,
  horizontal?: number
): { marginVertical: number; marginHorizontal: number } {
  return {
    marginVertical: vertical,
    marginHorizontal: horizontal ?? vertical,
  };
}
