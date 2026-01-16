/**
 * FontMetricsCalibrator Component
 *
 * Hidden component that measures font metrics using actual rendering.
 * Renders off-screen text, measures via onTextLayout, then saves results.
 *
 * ✅ Fixes Bug 2: Proper React component (hooks inside component, not external function)
 * ✅ Fixes Bug 3: Timeout/retry logic for measurement failures
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { LayoutChangeEvent, NativeSyntheticEvent, TextLayoutEventData } from 'react-native';
import { CharacterMetrics, saveFontMetrics } from '../../services/fontMetrics';

interface Props {
  fontFamily: string;
  fontSize: number;
  onComplete: () => void;
}

// Sample strings for calibration
const ALPHABET_SAMPLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // 52 chars
const NARROW_SAMPLE = 'iiiiiiiiii'; // 10 narrow chars
const WIDE_SAMPLE = 'wwwwwwwwww'; // 10 wide chars

/**
 * Hidden component that measures font metrics using onTextLayout.
 *
 * Lifecycle:
 * 1. Renders three hidden Text components with sample strings
 * 2. onTextLayout fires for each, capturing actual rendered widths
 * 3. Calculates average char width and width factors
 * 4. Saves to fontMetrics service
 * 5. Calls onComplete() callback
 *
 * ✅ Includes timeout/retry logic (Bug 3 fix)
 */
export function FontMetricsCalibrator({ fontFamily, fontSize, onComplete }: Props) {
  const [metrics, setMetrics] = useState<{
    avgWidth: number | null;
    narrowWidth: number | null;
    wideWidth: number | null;
  }>({
    avgWidth: null,
    narrowWidth: null,
    wideWidth: null,
  });

  const [attempt, setAttempt] = useState(0);
  const MAX_ATTEMPTS = 3;
  const TIMEOUT_MS = 1000;

  // Handle alphabet sample measurement (average character width)
  const handleAlphabetLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
    const width = event.nativeEvent.lines[0]?.width;
    if (width && width > 0) {
      const avgCharWidth = width / ALPHABET_SAMPLE.length;
      setMetrics(prev => ({ ...prev, avgWidth: avgCharWidth }));
    }
  };

  // Handle narrow character sample measurement
  const handleNarrowLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
    const width = event.nativeEvent.lines[0]?.width;
    if (width && width > 0) {
      const narrowCharWidth = width / NARROW_SAMPLE.length;
      setMetrics(prev => ({ ...prev, narrowWidth: narrowCharWidth }));
    }
  };

  // Handle wide character sample measurement
  const handleWideLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
    const width = event.nativeEvent.lines[0]?.width;
    if (width && width > 0) {
      const wideCharWidth = width / WIDE_SAMPLE.length;
      setMetrics(prev => ({ ...prev, wideWidth: wideCharWidth }));
    }
  };

  // ✅ Bug 3 Fix: Timeout and retry logic
  useEffect(() => {
    const timeout = setTimeout(() => {
      const { avgWidth, narrowWidth, wideWidth } = metrics;

      // Check if all measurements complete
      if (avgWidth && narrowWidth && wideWidth) {
        return; // Success, no timeout needed
      }

      // Incomplete measurements - retry or give up
      if (attempt < MAX_ATTEMPTS) {
        console.warn(`[FontMetricsCalibrator] Measurement timeout, retrying... (attempt ${attempt + 1}/${MAX_ATTEMPTS})`);
        setAttempt(prev => prev + 1);
      } else {
        console.error('[FontMetricsCalibrator] Measurement failed after max attempts, giving up');
        onComplete(); // Give up and proceed without calibration
      }
    }, TIMEOUT_MS);

    return () => clearTimeout(timeout);
  }, [metrics, attempt, onComplete]);

  // Save metrics when all measurements complete
  useEffect(() => {
    const { avgWidth, narrowWidth, wideWidth } = metrics;

    if (avgWidth && narrowWidth && wideWidth) {
      // Calculate factors (relative to average)
      const narrowCharFactor = narrowWidth / avgWidth;
      const wideCharFactor = wideWidth / avgWidth;

      const characterMetrics: CharacterMetrics = {
        avgCharWidth: avgWidth,
        uppercaseFactor: 1.0, // Can be enhanced later with separate measurement
        lowercaseFactor: 1.0, // Can be enhanced later with separate measurement
        numberFactor: 1.0,    // Can be enhanced later with separate measurement
        punctuationFactor: 0.8, // Can be enhanced later with separate measurement
        narrowCharFactor,
        wideCharFactor,
        measuredAt: Date.now(),
      };

      // Save to fontMetrics service (async)
      saveFontMetrics(fontFamily, fontSize, characterMetrics)
        .then(() => {
          console.log('[FontMetricsCalibrator] Calibration complete:', {
            fontFamily,
            fontSize,
            avgCharWidth: avgWidth.toFixed(2),
            narrowFactor: narrowCharFactor.toFixed(2),
            wideFactor: wideCharFactor.toFixed(2),
          });
          onComplete();
        })
        .catch(error => {
          console.error('[FontMetricsCalibrator] Failed to save metrics:', error);
          onComplete(); // Proceed anyway, next load will retry
        });
    }
  }, [metrics, fontFamily, fontSize, onComplete]);

  // Render hidden measurement text
  // Position off-screen, opacity 0 for complete invisibility
  return (
    <View style={styles.container}>
      <Text
        key={`alphabet-${attempt}`}
        style={[styles.hiddenText, { fontFamily, fontSize }]}
        onTextLayout={handleAlphabetLayout}
      >
        {ALPHABET_SAMPLE}
      </Text>
      <Text
        key={`narrow-${attempt}`}
        style={[styles.hiddenText, { fontFamily, fontSize }]}
        onTextLayout={handleNarrowLayout}
      >
        {NARROW_SAMPLE}
      </Text>
      <Text
        key={`wide-${attempt}`}
        style={[styles.hiddenText, { fontFamily, fontSize }]}
        onTextLayout={handleWideLayout}
      >
        {WIDE_SAMPLE}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: -9999, // Off-screen
    top: -9999,
    opacity: 0, // Completely invisible
    pointerEvents: 'none', // No interaction
  },
  hiddenText: {
    // No wrapping, single line
    numberOfLines: 1,
  },
});
