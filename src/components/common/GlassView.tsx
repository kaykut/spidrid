/**
 * GlassView - Cross-platform glass effect component
 * - iOS 26+ (dev build): Native liquid glass via expo-glass-effect
 * - Expo Go / Android / iOS < 26: Uses expo-blur BlurView as fallback
 *
 * Note: ThemeProvider signals color scheme to iOS via Appearance.setColorScheme(),
 * allowing glass effects to adapt automatically to dark/light mode.
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import Constants from 'expo-constants';
import { GlassView as ExpoGlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { OVERLAY_COLORS } from '../../data/themes';

type GlassStyle = 'clear' | 'regular';

interface GlassViewProps {
  appearance: 'dark' | 'light';
  /** iOS glass style: "clear" (more transparent) or "regular" (more opaque). Default: "clear" */
  glassStyle?: GlassStyle;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const isExpoGo = Constants.appOwnership === 'expo';
const FORCE_EXPO_BLUR_FALLBACK = false;

const canUseNativeLiquidGlass =
  !FORCE_EXPO_BLUR_FALLBACK &&
  !isExpoGo &&
  Platform.OS === 'ios' &&
  isLiquidGlassAvailable();

export function GlassView({ appearance, glassStyle = 'clear', style, children }: GlassViewProps) {
  if (canUseNativeLiquidGlass) {
    // iOS 26+ native liquid glass
    // Color scheme is signaled via Appearance.setColorScheme() in ThemeProvider
    return (
      <ExpoGlassView
        glassEffectStyle={glassStyle}
        style={style}
      >
        {children}
      </ExpoGlassView>
    );
  }

  // Fallback: expo-blur for Expo Go, Android, and iOS < 26
  const tint = appearance === 'dark' ? 'dark' : 'light';
  const overlayColor = appearance === 'dark'
    ? OVERLAY_COLORS.glassBorderDark
    : OVERLAY_COLORS.glassBorderLight;

  return (
    <View style={style}>
      <BlurView
        intensity={80}
        tint={tint}
        experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : undefined}
        style={StyleSheet.absoluteFill}
      />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: overlayColor }]} />
      {children}
    </View>
  );
}
