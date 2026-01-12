import React, { ReactNode } from 'react';
import { View, ScrollView, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SPACING } from '../../constants/spacing';
import { useTheme } from './ThemeProvider';

// Helper to convert hex to rgba with alpha
function hexToRGBA(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Default fade heights using design system constants
const DEFAULT_TOP_FADE_HEIGHT = SPACING.huge; // 40
const DEFAULT_BOTTOM_FADE_HEIGHT = SPACING.huge + SPACING.xl; // 60
const DEFAULT_EXTRA_BOTTOM_PADDING = SPACING.huge + SPACING.xl; // 60

interface EdgeFadeScrollViewProps {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  topFadeHeight?: number;
  bottomFadeHeight?: number;
  extraBottomPadding?: number;
  style?: StyleProp<ViewStyle>;
}

export function EdgeFadeScrollView({
  children,
  contentContainerStyle,
  topFadeHeight = DEFAULT_TOP_FADE_HEIGHT,
  bottomFadeHeight = DEFAULT_BOTTOM_FADE_HEIGHT,
  extraBottomPadding = DEFAULT_EXTRA_BOTTOM_PADDING,
  style,
}: EdgeFadeScrollViewProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  // Gradients extend from screen edge through safe area
  const topGradientHeight = insets.top + topFadeHeight;
  const bottomGradientHeight = insets.bottom + bottomFadeHeight;

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }, style]}>
      <ScrollView
        contentContainerStyle={[
          contentContainerStyle,
          {
            paddingTop: topGradientHeight,
            paddingBottom: bottomGradientHeight + extraBottomPadding,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      {/* Top gradient fade - extends from screen edge */}
      <LinearGradient
        colors={[theme.backgroundColor, hexToRGBA(theme.backgroundColor, 0)]}
        style={[styles.topFade, { height: topGradientHeight }]}
        pointerEvents="none"
      />

      {/* Bottom gradient fade - extends to screen edge */}
      <LinearGradient
        colors={[hexToRGBA(theme.backgroundColor, 0), theme.backgroundColor]}
        style={[styles.bottomFade, { height: bottomGradientHeight }]}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bottomFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
