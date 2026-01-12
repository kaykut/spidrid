/**
 * GlassView
 *
 * Cross-platform glass effect component.
 * - iOS 26+ (dev build): Native liquid glass via react-native-glass-effect-view
 * - Expo Go / Android / iOS < 26: Uses expo-blur BlurView as fallback
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import Constants from 'expo-constants';

interface GlassViewProps {
  appearance: 'dark' | 'light';
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

// Check if we're in Expo Go (can't use native modules)
const isExpoGo = Constants.appOwnership === 'expo';

// Check if native liquid glass is available (iOS 26+ in dev build)
const canUseNativeLiquidGlass =
  !isExpoGo &&
  Platform.OS === 'ios' &&
  parseInt(String(Platform.Version).split('.')[0], 10) >= 26;

// Dynamically require the native module only when available
// This prevents the import from failing in Expo Go
let NativeGlassEffectView: React.ComponentType<GlassViewProps> | null = null;
if (canUseNativeLiquidGlass) {
  try {
    const nativeModule = require('react-native-glass-effect-view');
    NativeGlassEffectView = nativeModule.GlassEffectView;
  } catch (e) {
    console.warn('Failed to load native GlassEffectView:', e);
  }
}

export function GlassView({ appearance, style, children }: GlassViewProps) {
  // Use native liquid glass on iOS 26+ dev builds
  if (NativeGlassEffectView) {
    return (
      <NativeGlassEffectView appearance={appearance} style={style}>
        {children}
      </NativeGlassEffectView>
    );
  }

  // Fallback: Use expo-blur BlurView with semi-transparent overlay for visibility
  const tint = appearance === 'dark' ? 'dark' : 'light';
  const overlayColor = appearance === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';

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
