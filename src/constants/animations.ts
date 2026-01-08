/**
 * Quiet Velocity Animation System
 *
 * Timing specs and easing functions for consistent, intentional animations.
 * "Elements appear and disappear with intention, not abruptly."
 */

import { Easing , LayoutAnimation, Platform, UIManager } from 'react-native';

// =============================================================================
// LayoutAnimation Configs (for height changes)
// =============================================================================


// =============================================================================
// Durations (in milliseconds)
// =============================================================================

export const DURATION = {
  /** Instant feedback - 100ms */
  instant: 100,
  /** Tooltip appear - 150ms */
  tooltip: 150,
  /** VS pulse animation - 200ms */
  vsPulse: 200,
  /** Screen transitions - 250ms */
  transition: 250,
  /** Expand/collapse panels - 300ms */
  expand: 300,
  /** Milestone bloom effect - 600ms */
  bloom: 600,
  /** Path glow loop - 2000ms */
  glowLoop: 2000,
} as const;

// =============================================================================
// Easing Functions
// =============================================================================

export const EASING = {
  /** Standard ease-out for expand/collapse */
  easeOut: Easing.out(Easing.cubic),
  /** Ease-in-out for VS pulse and loops */
  easeInOut: Easing.inOut(Easing.cubic),
  /** Ease-out for bloom effect */
  bloomEase: Easing.out(Easing.quad),
  /** Linear for progress indicators */
  linear: Easing.linear,
  /** Spring-like bounce for celebrations */
  spring: Easing.bezier(0.175, 0.885, 0.32, 1.275),
} as const;

// =============================================================================
// Animation Configs
// =============================================================================

export const ANIMATION_CONFIG = {
  /**
   * VS Pulse - When VS increases after a session
   * Scale 1 → 1.05 → 1 over 200ms
   */
  vsPulse: {
    duration: DURATION.vsPulse,
    easing: EASING.easeInOut,
    scale: 1.05,
    useNativeDriver: true,
  },

  /**
   * Milestone Bloom - Ring expanding outward when reaching new rank
   * Scale 1 → 2, opacity 1 → 0 over 600ms
   */
  milestonBloom: {
    duration: DURATION.bloom,
    easing: EASING.bloomEase,
    scaleEnd: 2,
    useNativeDriver: true,
  },

  /**
   * Path Glow - Pulsing glow on current journey node
   * Opacity 0.3 → 0.6 → 0.3 over 2s loop
   */
  pathGlow: {
    duration: DURATION.glowLoop,
    easing: EASING.easeInOut,
    opacityMin: 0.3,
    opacityMax: 0.6,
    useNativeDriver: true,
  },

  /**
   * Expand/Collapse - For panels and cards
   */
  expand: {
    duration: DURATION.expand,
    easing: EASING.easeOut,
    useNativeDriver: false, // Height animations can't use native driver
  },

  /**
   * Tooltip Appear
   */
  tooltip: {
    duration: DURATION.tooltip,
    easing: EASING.easeOut,
    useNativeDriver: true,
  },

  /**
   * Screen Transition
   */
  transition: {
    duration: DURATION.transition,
    easing: EASING.easeInOut,
    useNativeDriver: true,
  },
} as const;

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Preset for smooth expand/collapse
 */
export const LAYOUT_ANIMATION_EXPAND = {
  duration: DURATION.expand,
  create: {
    type: LayoutAnimation.Types.easeOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeOut,
  },
  delete: {
    type: LayoutAnimation.Types.easeOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

/**
 * Trigger expand/collapse animation
 */
export function animateLayout(): void {
  LayoutAnimation.configureNext(LAYOUT_ANIMATION_EXPAND);
}

// =============================================================================
// Spring Animation Config (for Animated.spring)
// =============================================================================

export const SPRING_CONFIG = {
  /** Gentle spring for UI elements */
  gentle: {
    tension: 40,
    friction: 7,
    useNativeDriver: true,
  },
  /** Bouncy spring for celebrations */
  bouncy: {
    tension: 80,
    friction: 5,
    useNativeDriver: true,
  },
  /** Stiff spring for quick responses */
  stiff: {
    tension: 200,
    friction: 20,
    useNativeDriver: true,
  },
} as const;

// =============================================================================
// Delay Helpers
// =============================================================================

/**
 * Stagger delay for list items
 * @param index Item index
 * @param baseDelay Base delay per item (default 50ms)
 */
export function staggerDelay(index: number, baseDelay: number = 50): number {
  return index * baseDelay;
}

/**
 * Create a promise that resolves after a delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
