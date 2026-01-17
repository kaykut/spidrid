/**
 * Quiet Velocity Typography Scale
 *
 * Precision typography for the Journey tab and app-wide consistency.
 * All sizes in points, following iOS HIG conventions.
 */

import { TextStyle, Platform } from 'react-native';

// =============================================================================
// Font Weights (React Native compatible)
// =============================================================================

export const FONT_WEIGHTS = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
};

// =============================================================================
// Letter Spacing Scale
// =============================================================================

/**
 * Letter spacing tokens for consistent typography.
 * Use these instead of hardcoded letterSpacing values.
 */
export const LETTER_SPACING = {
  /** No letter spacing */
  none: 0,
  /** Tight spacing for small labels */
  tight: 0.5,
  /** Normal spacing for badges/labels */
  normal: 1,
  /** Wide spacing for emphasis */
  wide: 2,
  /** Extra wide for celebration text */
  extraWide: 3,
} as const;

// =============================================================================
// Typography Scale
// =============================================================================

/**
 * VS Number - The hero metric
 * 56pt Bold, letter-spacing -2%
 */
const VS_NUMBER: TextStyle = {
  fontSize: 56,
  fontWeight: FONT_WEIGHTS.bold,
  letterSpacing: -1.12, // -2% of 56
  fontVariant: ['tabular-nums'],
};

/**
 * Level/Rank Name
 * 18pt Semibold, uppercase, tracking +5%
 */
const LEVEL_NAME: TextStyle = {
  fontSize: 18,
  fontWeight: FONT_WEIGHTS.semibold,
  letterSpacing: 0.9, // +5% of 18
  textTransform: 'uppercase',
};

/**
 * Section Titles
 * 14pt Semibold, ALL CAPS, tracking +10%
 */
const SECTION_TITLE: TextStyle = {
  fontSize: 14,
  fontWeight: FONT_WEIGHTS.semibold,
  letterSpacing: 1.4, // +10% of 14
  textTransform: 'uppercase',
};

/**
 * Card Titles
 * 17pt Semibold
 */
const CARD_TITLE: TextStyle = {
  fontSize: 17,
  fontWeight: FONT_WEIGHTS.semibold,
};

/**
 * Body Text
 * 15pt Regular
 */
const BODY: TextStyle = {
  fontSize: 15,
  fontWeight: FONT_WEIGHTS.regular,
  lineHeight: 22,
};

/**
 * Labels
 * 13pt Regular, secondary color
 */
const LABEL: TextStyle = {
  fontSize: 13,
  fontWeight: FONT_WEIGHTS.regular,
};

/**
 * Small Labels
 * 12pt Regular
 */
const LABEL_SMALL: TextStyle = {
  fontSize: 12,
  fontWeight: FONT_WEIGHTS.regular,
};

/**
 * Metrics/Numbers
 * 20pt Medium, tabular figures
 */
const METRIC: TextStyle = {
  fontSize: 20,
  fontWeight: FONT_WEIGHTS.medium,
  fontVariant: ['tabular-nums'],
};

/**
 * Large Metric
 * 24pt Bold, tabular figures
 */
const METRIC_LARGE: TextStyle = {
  fontSize: 24,
  fontWeight: FONT_WEIGHTS.bold,
  fontVariant: ['tabular-nums'],
};

/**
 * Stat Large
 * 28pt Bold, tabular figures - between metricLarge and pageTitle
 */
const STAT_LARGE: TextStyle = {
  fontSize: 28,
  fontWeight: FONT_WEIGHTS.bold,
  fontVariant: ['tabular-nums'],
};

/**
 * Button Text
 * 16pt Semibold
 */
const BUTTON: TextStyle = {
  fontSize: 16,
  fontWeight: FONT_WEIGHTS.semibold,
};

/**
 * Button Text Small
 * 14pt Semibold
 */
const BUTTON_SMALL: TextStyle = {
  fontSize: 14,
  fontWeight: FONT_WEIGHTS.semibold,
};

/**
 * Page Title
 * 32pt Bold - for main screen titles
 */
const PAGE_TITLE: TextStyle = {
  fontSize: 32,
  fontWeight: FONT_WEIGHTS.bold,
};

/**
 * Stat Value
 * 32pt Bold with tabular nums - for hero statistics
 */
const STAT_VALUE: TextStyle = {
  fontSize: 32,
  fontWeight: FONT_WEIGHTS.bold,
  fontVariant: ['tabular-nums'],
};

/**
 * Caption
 * 12pt Regular - for small descriptive text
 */
const CAPTION: TextStyle = {
  fontSize: 12,
  fontWeight: FONT_WEIGHTS.regular,
};

/**
 * Micro Text
 * 9-10pt Regular - for very small labels (use sparingly)
 */
const MICRO_TEXT: TextStyle = {
  fontSize: 9,
  fontWeight: FONT_WEIGHTS.regular,
  lineHeight: 12,
};

/**
 * Topic/Card Name
 * 16pt Semibold
 */
const CARD_SUBTITLE: TextStyle = {
  fontSize: 16,
  fontWeight: FONT_WEIGHTS.semibold,
};

/**
 * Section Header (non-caps)
 * 20pt Semibold - for section titles that shouldn't be uppercase
 */
const SECTION_HEADER: TextStyle = {
  fontSize: 20,
  fontWeight: FONT_WEIGHTS.semibold,
};

// =============================================================================
// Composite Styles (commonly used combinations)
// =============================================================================

export const TYPOGRAPHY = {
  vsNumber: VS_NUMBER,
  levelName: LEVEL_NAME,
  sectionTitle: SECTION_TITLE,
  sectionHeader: SECTION_HEADER,
  cardTitle: CARD_TITLE,
  cardSubtitle: CARD_SUBTITLE,
  body: BODY,
  label: LABEL,
  labelSmall: LABEL_SMALL,
  caption: CAPTION,
  microText: MICRO_TEXT,
  metric: METRIC,
  metricLarge: METRIC_LARGE,
  statLarge: STAT_LARGE,
  statValue: STAT_VALUE,
  pageTitle: PAGE_TITLE,
  button: BUTTON,
  buttonSmall: BUTTON_SMALL,
} as const;

// =============================================================================
// Font Family (platform-specific)
// =============================================================================

export const FONT_FAMILY = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

/**
 * Display font for VS number (if custom font is added later)
 * Currently uses system font
 */
export const DISPLAY_FONT_FAMILY = FONT_FAMILY;

// =============================================================================
// Additional Typography Styles
// =============================================================================

/**
 * Badge Text
 * 10pt Semibold - for small counters and badges
 */
export const BADGE_TEXT: TextStyle = {
  fontSize: 10,
  fontWeight: FONT_WEIGHTS.semibold,
};

/**
 * RSVP Display
 * 42pt Bold - for RSVP reader display
 */
export const RSVP_DISPLAY: TextStyle = {
  fontSize: 42,
  fontWeight: FONT_WEIGHTS.bold,
};

/**
 * RSVP Font Sizes - Adaptive sizing for long words
 *
 * Prevents wrapping on narrow screens (iPhone SE 375px) by reducing font size
 * for longer words. Words 22+ chars use improved hyphenation in production.
 */
export const RSVP_FONT_SIZES = {
  size42: 42,  // ≤13 chars
  size38: 38,  // 14 chars
  size34: 34,  // 15 chars
  size32: 32,  // 16 chars
  size30: 30,  // 17 chars
  size28: 28,  // 18-19 chars
  size26: 26,  // 20 chars
  size24: 24,  // 21 chars (22+ uses hyphenation)
};
