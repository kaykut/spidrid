/**
 * Color Utilities for Quiet Velocity Design System
 *
 * Provides utilities for working with colors and opacity consistently.
 */

// =============================================================================
// Opacity Levels
// =============================================================================

/**
 * Standard opacity levels for color tinting.
 * Maps to hex suffixes: 0.125 = 20 (hex), 0.19 = 30 (hex), etc.
 */
export const OPACITY = {
  /** 8% opacity - very subtle backgrounds */
  subtle: 0.08,
  /** 12.5% opacity - light tinting (hex: 20) */
  light: 0.125,
  /** 19% opacity - medium tinting (hex: 30) */
  medium: 0.19,
  /** 25% opacity - stronger tinting (hex: 40) */
  strong: 0.25,
} as const;

// =============================================================================
// Color Utilities
// =============================================================================

/**
 * Adds opacity to a hex color by appending alpha hex value.
 *
 * @param color - Hex color string (e.g., '#FF6B6B' or '#ff6b6b')
 * @param opacity - Opacity value from 0 to 1
 * @returns Hex color with alpha (e.g., '#FF6B6B20')
 *
 * @example
 * withOpacity('#FF6B6B', 0.125) // '#FF6B6B20'
 * withOpacity('#00D4AA', OPACITY.light) // '#00D4AA20'
 */
export function withOpacity(color: string, opacity: number): string {
  // Clamp opacity between 0 and 1
  const clampedOpacity = Math.max(0, Math.min(1, opacity));

  // Convert opacity to hex (0-255 -> 00-FF)
  const alphaHex = Math.round(clampedOpacity * 255)
    .toString(16)
    .padStart(2, '0');

  // Remove any existing alpha from color if present
  const baseColor = color.length === 9 ? color.slice(0, 7) : color;

  return `${baseColor}${alphaHex}`;
}

/**
 * Pre-computed opacity suffixes for common opacity levels.
 * Use these with template literals for type-safe color creation.
 *
 * @example
 * `${tierColor}${HEX_ALPHA.light}` // 12.5% opacity
 */
export const HEX_ALPHA = {
  /** 8% opacity */
  subtle: '14',
  /** 12.5% opacity */
  light: '20',
  /** 19% opacity */
  medium: '30',
  /** 25% opacity */
  strong: '40',
} as const;
