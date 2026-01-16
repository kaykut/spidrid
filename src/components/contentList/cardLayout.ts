/**
 * Unified Card Layout System
 *
 * Provides consistent spacing, alignment, and width calculations
 * for all horizontal card layouts in the content list.
 *
 * This is the single source of truth for card layout values.
 * DO NOT modify these constants without updating ALL card components.
 */

import { StyleSheet, Dimensions } from 'react-native';
import { SPACING, COMPONENT_RADIUS, SIZES, SHADOWS } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

// =============================================================================
// Layout Constants
// =============================================================================

/**
 * Critical spacing values that must remain consistent across all cards.
 * DO NOT modify these without updating ALL card components.
 */
export const CARD_LAYOUT = {
  // Padding
  cardPadding: SPACING.md,              // 16pt on all sides
  cardMarginHorizontal: SPACING.md,     // 16pt screen margins
  cardMarginVertical: SPACING.xs,       // 4pt between cards

  // Icon container
  iconMarginLeft: SPACING.xs,           // 4pt
  iconSize: SIZES.iconMd,               // 24pt
  iconMarginRight: SPACING.md,          // 16pt
  iconPaddingTop: SPACING.xxs,          // 2pt (vertical alignment)

  // Title container
  titleMarginRight: SPACING.xs,         // 4pt (gap before right element)

  // Right elements
  chevronButtonPadding: 0,              // Removed for optimization
  chevronButtonMarginLeft: 0,           // Removed for optimization
  chevronIconSize: SIZES.iconMd,        // 24pt

  // Calculated totals
  get iconContainerWidth(): number {
    return this.iconMarginLeft + this.iconSize + this.iconMarginRight; // 44pt
  },

  get chevronButtonWidth(): number {
    return this.chevronIconSize; // 24pt (no padding/margin)
  },
} as const;

// =============================================================================
// Layout Hook
// =============================================================================

export interface CardLayoutMetrics {
  /** Total width available for the card */
  cardWidth: number;
  /** Width available for title text (accounting for all fixed elements) */
  titleContainerWidth: number;
  /** Width of icon container space */
  iconSpace: number;
  /** Width of right element space (chevron, score, or 0) */
  rightSpace: number;
}

export interface UseCardLayoutOptions {
  /** Type of right element: 'chevron', 'score', or 'none' */
  rightElement: 'chevron' | 'score' | 'none';
  /** Override screen width (for testing) */
  screenWidth?: number;
}

/**
 * Calculate precise layout metrics for card components.
 * Ensures all cards have identical alignment and text width calculations.
 *
 * @example
 * const layout = useCardLayout({ rightElement: 'chevron' });
 * // Use layout.titleContainerWidth to set exact text container width
 */
export function useCardLayout(options: UseCardLayoutOptions): CardLayoutMetrics {
  const { rightElement, screenWidth } = options;

  const width = screenWidth ?? Dimensions.get('window').width;

  // Calculate total card width (screen width minus horizontal margins)
  const cardWidth = width - (CARD_LAYOUT.cardMarginHorizontal * 2);

  // Calculate right element space
  let rightSpace = 0;
  switch (rightElement) {
    case 'chevron':
      rightSpace = SIZES.touchTarget; // 44pt touch target
      break;
    case 'score':
      rightSpace = 48; // Approximate max width for "100%" text
      break;
    case 'none':
      rightSpace = 0;
      break;
  }

  // Calculate available width for title container
  // Formula: CardWidth - (CardPadding * 2) - IconSpace - TitleMarginRight - RightSpace
  const titleContainerWidth =
    cardWidth -
    (CARD_LAYOUT.cardPadding * 2) -     // 32pt (padding on both sides)
    CARD_LAYOUT.iconContainerWidth -     // 44pt
    CARD_LAYOUT.titleMarginRight -       // 4pt
    rightSpace;                          // 44pt (chevron) or 48pt (score) or 0pt

  return {
    cardWidth,
    titleContainerWidth,
    iconSpace: CARD_LAYOUT.iconContainerWidth,
    rightSpace,
  };
}

// =============================================================================
// Shared Styles
// =============================================================================

/**
 * Base card styles shared across all card types.
 * Import these to ensure visual consistency.
 */
export const cardBaseStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: CARD_LAYOUT.cardPadding,
    marginHorizontal: CARD_LAYOUT.cardMarginHorizontal,
    marginVertical: CARD_LAYOUT.cardMarginVertical,
    borderRadius: COMPONENT_RADIUS.card,
    ...SHADOWS.sm,
  },

  iconContainer: {
    marginLeft: CARD_LAYOUT.iconMarginLeft,
    marginRight: CARD_LAYOUT.iconMarginRight,
    justifyContent: 'flex-start',
    paddingTop: CARD_LAYOUT.iconPaddingTop,
  },

  titleContainer: {
    flex: 1,
    marginRight: CARD_LAYOUT.titleMarginRight,
  },

  title: {
    fontWeight: TYPOGRAPHY.cardTitle.fontWeight,
    marginBottom: SPACING.xs,
  },

  chevronButton: {
    padding: CARD_LAYOUT.chevronButtonPadding,
    marginLeft: CARD_LAYOUT.chevronButtonMarginLeft,
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scoreContainer: {
    alignItems: 'center',
  },

  scoreText: {
    ...TYPOGRAPHY.label,
  },
});

/**
 * Helper to get consistent icon size
 */
export function getCardIconSize(): number {
  return CARD_LAYOUT.iconSize;
}
