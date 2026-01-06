import React, { ReactNode } from 'react';
import { View, ScrollView, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from './ThemeProvider';

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
  topFadeHeight = 40,
  bottomFadeHeight = 60,
  extraBottomPadding = 60,
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
        colors={[theme.backgroundColor, `${theme.backgroundColor}00`]}
        style={[styles.topFade, { height: topGradientHeight }]}
        pointerEvents="none"
      />

      {/* Bottom gradient fade - extends to screen edge */}
      <LinearGradient
        colors={[`${theme.backgroundColor}00`, theme.backgroundColor]}
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
