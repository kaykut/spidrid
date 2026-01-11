/**
 * FloatingProfileButton
 *
 * A floating circular button positioned at the top-right corner.
 * Provides quick access to the Profile screen.
 */

import React, { useRef } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DURATION } from '../../constants/animations';
import { SPACING, COMPONENT_RADIUS, SIZES, SHADOWS } from '../../constants/spacing';
import { OVERLAY_COLORS } from '../../data/themes';
import { GlassView } from '../common/GlassView';
import { useTheme } from '../common/ThemeProvider';

export function FloatingProfileButton() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';
  const iconColor = isDarkTheme ? OVERLAY_COLORS.iconDark : OVERLAY_COLORS.iconLight;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.88,
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

  const handlePress = () => {
    router.push('/(tabs)/profile');
  };

  return (
    <GlassView
      appearance={isDarkTheme ? 'dark' : 'light'}
      style={[
        styles.container,
        {
          top: Math.max(insets.top, SPACING.xl) + SPACING.sm,
        },
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.touchable}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Ionicons
            name="person-outline"
            size={SIZES.iconMd}
            color={iconColor}
          />
        </Animated.View>
      </TouchableOpacity>
    </GlassView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: SPACING.xl,
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    borderRadius: COMPONENT_RADIUS.badge,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
