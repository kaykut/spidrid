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
  accent: '#00D4AA',            // Electric teal - VS number, CTAs, interactive
  warmAccent: '#FFB84D',        // Amber - achievements, milestones

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
  accentTint: '#00D4AA26',       // accent @ 15%
  accentSubtle: '#00D4AA15',     // accent @ 8% - nav highlight
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
    textColor: '#ffffff',
    orpColor: '#ff6b6b',
    crosshairColor: '#333333',
    accentColor: '#00D4AA',
    secondaryBackground: '#1a1a1a',
    secondaryBackgroundGradient: '#141414',
    trackColor: '#2a2a2a',
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight',
    backgroundColor: '#1a1a2e',
    textColor: '#eaeaea',
    orpColor: '#e94560',
    crosshairColor: '#16213e',
    accentColor: '#0f3460',
    secondaryBackground: '#16213e',
    secondaryBackgroundGradient: '#121b33',
    trackColor: '#1e2d4d',
  },
  sepia: {
    id: 'sepia',
    name: 'Sepia',
    backgroundColor: '#f4ecd8',
    textColor: '#5c4033',
    orpColor: '#c41e3a', // Cardinal red - good contrast against brown text
    crosshairColor: '#d4c4a8',
    accentColor: '#704214',
    secondaryBackground: '#d9ceb8',
    secondaryBackgroundGradient: '#cfc4ae',
    trackColor: '#c4b9a3',
  },
  light: {
    id: 'light',
    name: 'Light',
    backgroundColor: '#ffffff',
    textColor: '#1a1a1a',
    orpColor: '#dc3545',
    crosshairColor: '#e0e0e0',
    accentColor: '#007bff',
    secondaryBackground: '#e8e8e8',
    secondaryBackgroundGradient: '#dedede',
    trackColor: '#d0d0d0',
  },
};

export const themeList = Object.values(themes);
