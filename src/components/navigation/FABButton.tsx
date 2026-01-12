/**
 * FABButton - Floating Action Button
 *
 * A glass-style circular button that floats at a fixed position.
 * Used for primary actions like accessing Journey+Profile or Add Content.
 */

import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated, ViewStyle } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DURATION } from '../../constants/animations';
import { SPACING, COMPONENT_RADIUS, SIZES, SHADOWS } from '../../constants/spacing';
import { GlassView } from '../common/GlassView';
import { useTheme } from '../common/ThemeProvider';

export type FABPosition = 'top-right' | 'bottom-right';

interface FABButtonProps {
  position: FABPosition;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  testID?: string;
}

export function FABButton({ position, icon, onPress, testID }: FABButtonProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.9,
      duration: DURATION.instant,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: DURATION.instant,
      useNativeDriver: true,
    }).start();
  };

  const positionStyle: ViewStyle =
    position === 'top-right'
      ? {
        top: insets.top + SPACING.sm,
        right: SPACING.md,
      }
      : {
        bottom: Math.max(insets.bottom, SPACING.lg) + SPACING.md,
        right: SPACING.md,
      };

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyle,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <GlassView appearance={isDarkTheme ? 'dark' : 'light'} style={styles.glass}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
          style={styles.touchable}
          testID={testID}
        >
          {icon === 'add' ? (
            <Entypo
              name="plus"
              size={SIZES.iconLg}
              color={theme.accentColor}
            />
          ) : (
            <Ionicons
              name={icon}
              size={SIZES.iconLg}
              color={theme.accentColor}
            />
          )}
        </TouchableOpacity>
      </GlassView>
    </Animated.View>
  );
}

const FAB_SIZE = SIZES.touchTarget; // 44pt

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    ...SHADOWS.lg,
  },
  glass: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: COMPONENT_RADIUS.node, // Circular
    overflow: 'hidden',
  },
  touchable: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
