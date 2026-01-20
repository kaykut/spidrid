import { Theme } from '../types/settings';

/**
 * Quiet Velocity Design System Colors
 * Used throughout the Journey tab and applied app-wide
 */
export const JOURNEY_COLORS = {
  // Backgrounds
  background: '#000000',        // True black - app background
  surface: '#1A1A1A',           // Cards, elevated elements
  surfaceLight: '#2A2A2A',      // Borders, subtle divisions

  // Accents
  // DEPRECATED: Use theme.accentColor from useTheme() hook for theme-aware components
  // This constant is kept for backwards compatibility but may be removed in future versions
  accent: '#E85D24',            // Burnt orange (dark theme) - DEPRECATED, use theme.accentColor
  premiumAccent: '#FFB84D',     // Amber - premium badges, achievements, milestones

  // Text
  textPrimary: '#FFFFFF',       // Headlines, VS, primary content
  textSecondary: '#8E8E93',     // Labels, supporting text
  textTertiary: '#636366',      // Hints, disabled states

  // Semantic
  success: '#34C759',           // Good comprehension, streaks
  warning: '#FF9F0A',           // Stretch challenges
  low: '#FF6B6B',               // Low comprehension (muted coral, not alarm red)
  certificationAccent: '#9775fa', // Purple - certification tiers
} as const;

/**
 * Difficulty level colors for curriculum content
 * Semantic colors representing learning progression
 */
export const DIFFICULTY_COLORS = {
  beginner: JOURNEY_COLORS.success,   // Green - easy, accessible
  intermediate: '#fab005',             // Amber - moderate challenge
  advanced: '#ff6b6b',                 // Coral red - advanced difficulty
} as const;

/**
 * Color opacity variants for semantic colors
 * Pre-computed for performance (avoids runtime string concatenation)
 */
export const COLOR_OPACITY = {
  successTint: '#34C75940',      // success @ 25% - quiz correct bg
  successSubtle: '#34C75960',    // success @ 38% - numeric range
  lowTint: '#FF6B6B40',          // low @ 25% - quiz incorrect bg
  certificationTint: '#9775fa4D', // certificationAccent @ 30% - certification card borders
} as const;

/**
 * Base color constants
 */
export const COLORS = {
  transparent: 'transparent',
} as const;

/**
 * Overlay and glassmorphism colors
 */
export const OVERLAY_COLORS = {
  modalBackdrop: 'rgba(0, 0, 0, 0.7)',
  glassLight: 'rgba(245, 245, 245, 0.95)',
  glassDark: 'rgba(26, 26, 26, 0.92)',
  glassBorderLight: 'rgba(0, 0, 0, 0.08)',
  glassBorderDark: 'rgba(255, 255, 255, 0.1)',
  dividerLight: 'rgba(255, 255, 255, 0.1)',
  dividerDark: 'rgba(0, 0, 0, 0.1)',
  inactiveLight: 'rgba(0, 0, 0, 0.5)',
  inactiveDark: 'rgba(255, 255, 255, 0.6)',
  iconLight: 'rgba(0, 0, 0, 0.7)',
  iconDark: 'rgba(255, 255, 255, 0.8)',
} as const;

export const themes: Record<string, Theme> = {
  dark: {
    id: 'dark',
    name: 'Dark',
    backgroundColor: '#0a0a0a',
    textColor: '#F5F5F5',
    orpColor: '#ff6b6b',
    crosshairColor: '#333333',
    accentColor: '#E85D24',
    accentMuted: '#C75D3A',
    secondaryBackground: '#1a1a1a',
    secondaryBackgroundGradient: '#141414',
    trackColor: '#2a2a2a',
    metaColor: '#888888', // Muted gray for headers
    textSecondaryColor: '#888888',
    background: '#0a0a0a',
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight',
    backgroundColor: '#0D1421',
    textColor: '#E8EAF0',
    orpColor: '#e94560',
    crosshairColor: '#16213e',
    accentColor: '#F06A2E',
    accentMuted: '#B85A3A',
    secondaryBackground: '#1A2333',
    secondaryBackgroundGradient: '#121b33',
    trackColor: '#1e2d4d',
    metaColor: '#7A8599', // Muted blue-gray for headers
    textSecondaryColor: '#7A8599',
    background: '#0D1421',
  },
  sepia: {
    id: 'sepia',
    name: 'Sepia',
    backgroundColor: '#F5F0E6',
    textColor: '#2C2416',
    orpColor: '#c41e3a', // Cardinal red - good contrast against brown text
    crosshairColor: '#d4c4a8',
    accentColor: '#C44D1A',
    accentMuted: '#A65D3A',
    secondaryBackground: '#FFFFFF',
    secondaryBackgroundGradient: '#cfc4ae',
    trackColor: '#c4b9a3',
    metaColor: '#7A7062', // Muted warm gray for headers
    textSecondaryColor: '#7A7062',
    background: '#F5F0E6',
  },
  light: {
    id: 'light',
    name: 'Light',
    backgroundColor: '#FAFAFA',
    textColor: '#1a1a1a',
    orpColor: '#dc3545',
    crosshairColor: '#e0e0e0',
    accentColor: '#D4521A',
    accentMuted: '#B86B4A',
    secondaryBackground: '#FFFFFF',
    secondaryBackgroundGradient: '#dedede',
    trackColor: '#d0d0d0',
    metaColor: '#6B6B6B', // Muted gray for headers
    textSecondaryColor: '#6B6B6B',
    background: '#FAFAFA',
  },
};

export const themeList = Object.values(themes);
