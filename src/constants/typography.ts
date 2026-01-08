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
// Typography Scale
// =============================================================================

/**
 * VS Number - The hero metric
 * 56pt Bold, letter-spacing -2%
 */
export const VS_NUMBER: TextStyle = {
  fontSize: 56,
  fontWeight: FONT_WEIGHTS.bold,
  letterSpacing: -1.12, // -2% of 56
  fontVariant: ['tabular-nums'],
};

/**
 * Level/Rank Name
 * 18pt Semibold, uppercase, tracking +5%
 */
export const LEVEL_NAME: TextStyle = {
  fontSize: 18,
  fontWeight: FONT_WEIGHTS.semibold,
  letterSpacing: 0.9, // +5% of 18
  textTransform: 'uppercase',
};

/**
 * Section Titles
 * 14pt Semibold, ALL CAPS, tracking +10%
 */
export const SECTION_TITLE: TextStyle = {
  fontSize: 14,
  fontWeight: FONT_WEIGHTS.semibold,
  letterSpacing: 1.4, // +10% of 14
  textTransform: 'uppercase',
};

/**
 * Card Titles
 * 17pt Semibold
 */
export const CARD_TITLE: TextStyle = {
  fontSize: 17,
  fontWeight: FONT_WEIGHTS.semibold,
};

/**
 * Body Text
 * 15pt Regular
 */
export const BODY: TextStyle = {
  fontSize: 15,
  fontWeight: FONT_WEIGHTS.regular,
  lineHeight: 22,
};

/**
 * Labels
 * 13pt Regular, secondary color
 */
export const LABEL: TextStyle = {
  fontSize: 13,
  fontWeight: FONT_WEIGHTS.regular,
};

/**
 * Small Labels
 * 12pt Regular
 */
export const LABEL_SMALL: TextStyle = {
  fontSize: 12,
  fontWeight: FONT_WEIGHTS.regular,
};

/**
 * Metrics/Numbers
 * 20pt Medium, tabular figures
 */
export const METRIC: TextStyle = {
  fontSize: 20,
  fontWeight: FONT_WEIGHTS.medium,
  fontVariant: ['tabular-nums'],
};

/**
 * Large Metric
 * 24pt Bold, tabular figures
 */
export const METRIC_LARGE: TextStyle = {
  fontSize: 24,
  fontWeight: FONT_WEIGHTS.bold,
  fontVariant: ['tabular-nums'],
};

/**
 * Button Text
 * 16pt Semibold
 */
export const BUTTON: TextStyle = {
  fontSize: 16,
  fontWeight: FONT_WEIGHTS.semibold,
};

/**
 * Button Text Small
 * 14pt Semibold
 */
export const BUTTON_SMALL: TextStyle = {
  fontSize: 14,
  fontWeight: FONT_WEIGHTS.semibold,
};

/**
 * Page Title
 * 32pt Bold - for main screen titles
 */
export const PAGE_TITLE: TextStyle = {
  fontSize: 32,
  fontWeight: FONT_WEIGHTS.bold,
};

/**
 * Stat Value
 * 32pt Bold with tabular nums - for hero statistics
 */
export const STAT_VALUE: TextStyle = {
  fontSize: 32,
  fontWeight: FONT_WEIGHTS.bold,
  fontVariant: ['tabular-nums'],
};

/**
 * Caption
 * 12pt Regular - for small descriptive text
 */
export const CAPTION: TextStyle = {
  fontSize: 12,
  fontWeight: FONT_WEIGHTS.regular,
};

/**
 * Topic/Card Name
 * 16pt Semibold
 */
export const CARD_SUBTITLE: TextStyle = {
  fontSize: 16,
  fontWeight: FONT_WEIGHTS.semibold,
};

/**
 * Section Header (non-caps)
 * 20pt Semibold - for section titles that shouldn't be uppercase
 */
export const SECTION_HEADER: TextStyle = {
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
  metric: METRIC,
  metricLarge: METRIC_LARGE,
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
