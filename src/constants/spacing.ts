/**
 * Quiet Velocity Spacing System
 *
 * Pure 8pt grid with micro exceptions (2pt, 4pt) for fine details.
 * Grid: 8, 16, 24, 32, 40, 48, 56, 64...
 */

// =============================================================================
// Base Unit
// =============================================================================

const BASE = 8;

// =============================================================================
// Spacing Scale (8pt grid)
// =============================================================================

export const SPACING = {
  /** 2pt - Hairlines only */
  xxs: 2,
  /** 4pt - Fine gaps (micro exception) */
  xs: 4,
  /** 8pt - Tight */
  sm: BASE,             // 8
  /** 16pt - Standard */
  md: BASE * 2,         // 16 (was 12)
  /** 24pt - Comfortable */
  lg: BASE * 3,         // 24 (was 16)
  /** 32pt - Spacious */
  xl: BASE * 4,         // 32 (was 20)
  /** 40pt - Section gaps */
  xxl: BASE * 5,        // 40 (was 24)
  /** 48pt - Large sections */
  xxxl: BASE * 6,       // 48 (was 32)
  /** 56pt - Extra large */
  huge: BASE * 7,       // 56 (was 40)
  /** 64pt - Massive */
  massive: BASE * 8,    // 64 (was 48)
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
// Component-Specific Radius
// =============================================================================

/**
 * Semantic border radius tokens for UI components.
 */
export const COMPONENT_RADIUS = {
  // Interactive Elements (touch targets)
  /** Standard buttons, tabs, pills: 12pt */
  button: 12,
  /** Emphasized buttons (quiz options): 16pt - intentionally larger for visibility */
  buttonLarge: 16,
  /** Text inputs, selectors: 12pt */
  input: 12,

  // Containers
  /** Content cards, panels: 16pt */
  card: 16,
  /** Modal dialogs, bottom sheets: 20pt */
  modal: 20,

  // Decorative Elements
  /** Small labels, tags, difficulty badges: 8pt */
  chip: 8,
  /** Circular badges, avatars: full round */
  badge: 9999,

  // Functional Elements
  /** Progress bar tracks: 6pt (visually full round) */
  progressBar: 6,
  /** Journey path nodes: full round */
  node: 9999,
} as const;

// =============================================================================
// Line Heights
// =============================================================================

/**
 * Semantic line height tokens for typography.
 * Use these with custom text styles when overriding line height.
 */
export const LINE_HEIGHTS = {
  /** Tight - 18pt for captions */
  tight: 18,
  /** Normal - 20pt for body text */
  normal: 20,
  /** Relaxed - 22pt for readable paragraphs */
  relaxed: 22,
  /** Loose - 24pt for headings/titles */
  loose: 24,
  /** Extra loose - 26pt for descriptions */
  xl: 26,
  /** Very loose - 28pt for large display text */
  extraLoose: 28,
  /** Quiz option text - 32pt */
  xxxl: 32,
} as const;

// =============================================================================
// Sizes
// =============================================================================

export const SIZES = {
  // Functional elements
  /** Progress bar height */
  progressBarHeight: BASE,          // 8
  /** Journey path node size */
  nodeSize: BASE * 2,               // 16
  /** Journey path current node size */
  currentNodeSize: BASE * 3,        // 24
  /** Journey path line stroke (fine exception) */
  pathLineWidth: 3,
  /** Touch target minimum (Apple HIG) */
  touchTarget: 44,
  /** Hairline height */
  hairlineHeight: 1,
  /** Divider height */
  dividerHeight: 2,
  /** Slider thumb size */
  sliderThumb: BASE * 3,            // 24
  /** Slider track height (fine exception) */
  sliderTrack: 6,
  /** Progress percent label width */
  progressPercentWidth: BASE * 4,   // 32

  // Icon sizes (8pt grid)
  /** Micro icons - checkmarks in nodes */
  iconMicro: BASE,                  // 8
  /** Extra small icons - inline indicators */
  iconXs: BASE * 2,                 // 16 (was 12)
  /** Small icons */
  iconSm: BASE * 2,                 // 16
  /** Navigation icons - tab bars */
  iconNav: BASE * 3,                // 24 (was 20)
  /** Medium icons */
  iconMd: 20,                       // 20 (off-grid exception for nav)
  /** Large icons */
  iconLg: BASE * 3,                 // 24
  /** Extra large icons */
  iconXl: BASE * 4,                 // 32
  /** 2XL icons */
  iconXxl: BASE * 5,                // 40 (was 36)
  /** 3XL icons */
  iconXxxl: BASE * 5,               // 40
  /** Huge icons */
  iconHuge: BASE * 6,               // 48
  /** Massive icons */
  iconMassive: BASE * 7,            // 56
} as const;

// =============================================================================
// Component-Specific Sizes
// =============================================================================

export const COMPONENT_SIZES = {
  // Journey/Progress Path Elements
  /** Journey path large node */
  journeyNode: BASE * 8,                // 64
  /** Node column width */
  nodeColumnWidth: BASE * 6,            // 48
  /** Bottom sheet peek height */
  bottomSheetPeekHeight: BASE * 18,     // 144

  // Icon Containers
  /** Small icon container */
  iconContainerSm: BASE * 7,            // 56
  /** Medium icon container */
  iconContainerMd: BASE * 9,            // 72
  /** Large icon container */
  iconContainerLg: BASE * 10,           // 80
  /** Extra large icon container */
  iconContainerXl: BASE * 12,           // 96

  // Celebration/Modal Elements
  /** Celebration icon size */
  celebrationIcon: BASE * 12,           // 96
  /** Celebration glow size */
  celebrationGlow: BASE * 18,           // 144

  // Chart/Data Visualization
  /** Insight card height */
  insightCardHeight: BASE * 22,         // 176
  /** Chart height */
  chartHeight: BASE * 8,                // 64
  /** Skeleton chart height */
  skeletonChartHeight: BASE * 5,        // 40

  // Form Elements
  /** Text area height */
  textAreaHeight: BASE * 25,            // 200
  /** List max height */
  listMaxHeight: BASE * 25,             // 200

  // Label widths
  /** Stat minimum width */
  statMinWidth: BASE * 10,              // 80
  /** Label column width */
  labelWidth: BASE * 11,                // 88
  /** Value column width */
  valueWidth: BASE * 9,                 // 72
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
 * Calculate spacing based on multiplier of base unit (8pt)
 */
export function space(multiplier: number): number {
  return BASE * multiplier;
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
