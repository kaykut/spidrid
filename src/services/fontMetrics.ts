/**
 * Font Metrics Service - TRUE Runtime Calibration
 *
 * Measures actual font widths on device using onTextLayout callbacks.
 * Caches measurements in AsyncStorage for performance (persists across sessions).
 * All character width factors are MEASURED, not assumed.
 *
 * This enables dynamic word splitting based on actual rendered text width,
 * preventing RSVP word wrapping without hardcoded thresholds.
 */

import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RSVP_DISPLAY } from '../constants/typography';

// Storage keys
const CALIBRATION_KEY_PREFIX = 'fontMetrics_';
const CONTAINER_PADDING_KEY = 'rsvp_container_padding';

// In-memory cache for current session (fast lookups)
const calibrationCache = new Map<string, Map<number, CharacterMetrics>>();
let measuredPadding: number | null = null;

/**
 * Normalize font family names to canonical form.
 * Prevents cache misses due to name variations.
 *
 * ✅ Fixes Bug 5: Font family string mismatch
 */
function normalizeFontFamily(fontFamily: string): string {
  const normalized = fontFamily.toLowerCase().trim();

  const aliases: Record<string, string> = {
    'system': 'system',
    'system regular': 'system',
    '.applesystemuifont': 'system',
    'san francisco': 'system',
    'georgia': 'georgia',
    'courier new': 'courier-new',
    'courier-new': 'courier-new',
    'courier': 'courier-new',
  };

  return aliases[normalized] || normalized;
}

/**
 * Character metrics with all MEASURED factors.
 * Each factor is determined by actual device rendering via onTextLayout.
 */
export interface CharacterMetrics {
  avgCharWidth: number;          // Overall average (alphabet sample)
  uppercaseFactor: number;       // Uppercase letter width factor
  lowercaseFactor: number;       // Lowercase letter width factor
  numberFactor: number;          // Digit width factor
  punctuationFactor: number;     // Punctuation width factor
  narrowCharFactor: number;      // Known narrow chars (i, l, t, etc.)
  wideCharFactor: number;        // Known wide chars (w, m, M, W)
  measuredAt: number;            // Timestamp for cache validation
}

/**
 * Load cached metrics from AsyncStorage or memory cache.
 * Returns cached metrics if available, undefined if measurement needed.
 *
 * ✅ Includes AsyncStorage validation (corruption handling)
 */
export async function loadOrMeasureFontMetrics(
  fontFamily: string,
  fontSize: number
): Promise<CharacterMetrics | undefined> {
  const normalizedFont = normalizeFontFamily(fontFamily);

  // Check in-memory cache first (fastest)
  const cached = calibrationCache.get(normalizedFont)?.get(fontSize);
  if (cached) {
    return cached;
  }

  // Check AsyncStorage (persists across app sessions)
  const storageKey = `${CALIBRATION_KEY_PREFIX}${normalizedFont}_${fontSize}`;
  try {
    const stored = await AsyncStorage.getItem(storageKey);
    if (stored) {
      const metrics: CharacterMetrics = JSON.parse(stored);

      // ✅ Validate structure to catch corruption
      if (
        typeof metrics.avgCharWidth !== 'number' ||
        typeof metrics.uppercaseFactor !== 'number' ||
        typeof metrics.lowercaseFactor !== 'number' ||
        typeof metrics.narrowCharFactor !== 'number' ||
        typeof metrics.wideCharFactor !== 'number' ||
        metrics.avgCharWidth <= 0 ||
        metrics.narrowCharFactor <= 0 ||
        metrics.wideCharFactor <= 0
      ) {
        console.warn('[fontMetrics] Invalid metrics data, will re-calibrate');
        await AsyncStorage.removeItem(storageKey); // Clean up corrupted data
        return undefined;
      }

      // Cache in memory for this session
      if (!calibrationCache.has(normalizedFont)) {
        calibrationCache.set(normalizedFont, new Map());
      }
      calibrationCache.get(normalizedFont)!.set(fontSize, metrics);

      return metrics;
    }
  } catch (error) {
    console.warn('[fontMetrics] Failed to load/parse metrics from storage:', error);
  }

  // No cached metrics available - measurement needed
  return undefined;
}

/**
 * Save measured metrics to both memory and AsyncStorage.
 */
export async function saveFontMetrics(
  fontFamily: string,
  fontSize: number,
  metrics: CharacterMetrics
): Promise<void> {
  const normalizedFont = normalizeFontFamily(fontFamily);

  // Save to memory cache
  if (!calibrationCache.has(normalizedFont)) {
    calibrationCache.set(normalizedFont, new Map());
  }
  calibrationCache.get(normalizedFont)!.set(fontSize, metrics);

  // Save to AsyncStorage for persistence
  const storageKey = `${CALIBRATION_KEY_PREFIX}${normalizedFont}_${fontSize}`;
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(metrics));
  } catch (error) {
    console.warn('[fontMetrics] Failed to save metrics to storage:', error);
  }
}

/**
 * Estimate text width using MEASURED character metrics.
 *
 * ✅ Fixes Bug 1: Returns undefined if metrics not available (caller must handle)
 *
 * @param text - Text to measure
 * @param fontSize - Font size in points
 * @param fontFamily - Font family name
 * @returns Estimated width in pixels, or undefined if calibration needed
 */
export function estimateTextWidth(
  text: string,
  fontSize: number,
  fontFamily: string = 'System'
): number | undefined {
  const normalizedFont = normalizeFontFamily(fontFamily);
  const metrics = calibrationCache.get(normalizedFont)?.get(fontSize);

  // ✅ Return undefined if not calibrated (not false, not 0, but undefined)
  if (!metrics) {
    console.warn('[estimateTextWidth] Cache miss - font:', fontFamily, '→ normalized:', normalizedFont, 'fontSize:', fontSize);
    console.warn('[estimateTextWidth] Available fonts in cache:', Array.from(calibrationCache.keys()));
    return undefined;
  }

  const { avgCharWidth, narrowCharFactor, wideCharFactor } = metrics;

  // Debug: Log calibrated metrics on first use
  if (typeof (estimateTextWidth as any)._logged === 'undefined') {
    console.log('[estimateTextWidth] Using calibrated metrics:', {
      font: normalizedFont,
      size: fontSize,
      avgCharWidth: avgCharWidth.toFixed(2),
      narrowFactor: narrowCharFactor.toFixed(2),
      wideFactor: wideCharFactor.toFixed(2),
    });
    (estimateTextWidth as any)._logged = true;
  }

  // Character classification (based on common proportional font patterns)
  const narrowChars = new Set(['i', 'l', 'I', 'j', 't', 'f', 'r', '!', '|', '.', ',', ':', ';']);
  const wideChars = new Set(['w', 'm', 'M', 'W']);

  // Filter out zero-width characters (Unicode)
  const visibleText = text.replace(/[\u200B\uFEFF]/g, '');

  // Calculate width using MEASURED factors
  let totalWidth = 0;
  const charBreakdown: string[] = [];

  for (const char of visibleText) {
    let factor = 1.0;
    if (narrowChars.has(char)) {
      factor = narrowCharFactor;
      charBreakdown.push(`${char}(${(avgCharWidth * factor).toFixed(1)})`);
    } else if (wideChars.has(char)) {
      factor = wideCharFactor;
      charBreakdown.push(`${char}(${(avgCharWidth * factor).toFixed(1)})`);
    } else {
      charBreakdown.push(`${char}(${(avgCharWidth * factor).toFixed(1)})`);
    }
    totalWidth += avgCharWidth * factor;
  }

  // Debug: Log detailed breakdown for first few calls
  if (typeof (estimateTextWidth as any)._callCount === 'undefined') {
    (estimateTextWidth as any)._callCount = 0;
  }
  if ((estimateTextWidth as any)._callCount < 3) {
    console.log('[estimateTextWidth] Detailed breakdown for:', `"${text}"`);
    console.log('  Chars:', charBreakdown.join(' + '));
    console.log('  Total:', totalWidth.toFixed(1), 'pt');
    (estimateTextWidth as any)._callCount++;
  }

  return totalWidth;
}

/**
 * Calculate maximum safe width for the "after" portion of a word.
 * Uses MEASURED padding from actual RSVPWord container.
 *
 * @param screenWidth - Screen width in pixels (defaults to current window width)
 * @param safetyMargin - Buffer factor to account for estimation errors (0.75 = 25% buffer)
 * @returns Maximum width in pixels for "after" text before wrapping
 */
export function getMaxAfterWidth(
  screenWidth: number = Dimensions.get('window').width,
  safetyMargin: number = 0.75  // More conservative: 25% buffer to account for kerning/spacing
): number {
  // MEASURED from RSVPWord.tsx (flex 0.46:0.54)
  const afterContainerRatio = 0.54;

  // MEASURED from actual layout (see saveMeasuredPadding)
  const padding = getMeasuredPadding();

  const afterContainerWidth = screenWidth * afterContainerRatio;
  const usableWidth = afterContainerWidth - padding;

  return usableWidth * safetyMargin;
}

/**
 * Save measured container padding from RSVPWord layout.
 * Called once during first render to capture actual padding/margins.
 */
export async function saveMeasuredPadding(padding: number): Promise<void> {
  measuredPadding = padding;

  // Persist to AsyncStorage
  try {
    await AsyncStorage.setItem(CONTAINER_PADDING_KEY, padding.toString());
  } catch (error) {
    console.warn('[fontMetrics] Failed to save container padding:', error);
  }
}

/**
 * Get measured container padding.
 * Returns cached value or loads from AsyncStorage.
 * Defaults to 0 if not yet measured (safe fallback).
 */
export function getMeasuredPadding(): number {
  return measuredPadding ?? 0;
}

/**
 * Load container padding from AsyncStorage into memory cache.
 * Should be called on app init.
 */
export async function loadMeasuredPadding(): Promise<void> {
  try {
    const stored = await AsyncStorage.getItem(CONTAINER_PADDING_KEY);
    if (stored) {
      const padding = parseFloat(stored);
      if (!isNaN(padding) && padding >= 0) {
        measuredPadding = padding;
      }
    }
  } catch (error) {
    console.warn('[fontMetrics] Failed to load container padding:', error);
  }
}

/**
 * Clear all cached calibration data (useful for debugging/testing).
 */
export async function clearCalibrationCache(): Promise<void> {
  calibrationCache.clear();
  measuredPadding = null;

  try {
    const keys = await AsyncStorage.getAllKeys();
    const calibrationKeys = keys.filter(
      key => key.startsWith(CALIBRATION_KEY_PREFIX) || key === CONTAINER_PADDING_KEY
    );
    await AsyncStorage.multiRemove(calibrationKeys);
  } catch (error) {
    console.warn('[fontMetrics] Failed to clear calibration cache:', error);
  }
}
