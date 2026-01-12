/**
 * FloatingActionBar - Unified Floating Action Bar
 *
 * A glass-style horizontal bar containing multiple action buttons.
 * Positioned equidistant from bottom and right edges of the screen.
 */

import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated, View } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DURATION } from '../../constants/animations';
import { SPACING, COMPONENT_RADIUS, SIZES, SHADOWS } from '../../constants/spacing';
import { GlassView } from '../common/GlassView';
import { useTheme } from '../common/ThemeProvider';

interface ActionItem {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  testID?: string;
}

interface FloatingActionBarProps {
  actions: ActionItem[];
}

export function FloatingActionBar({ actions }: FloatingActionBarProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';

  // Equidistant offset from safe area edges
  const offset = SPACING.lg; // 24pt from safe area edges

  return (
    <View
      style={[
        styles.container,
        {
          bottom: insets.bottom + offset,
          right: insets.right + offset,
        },
      ]}
    >
      <GlassView appearance={isDarkTheme ? 'dark' : 'light'} style={styles.glass}>
        <View style={styles.actionsRow}>
          {actions.map((action, index) => (
            <ActionButton
              key={action.testID || index}
              icon={action.icon}
              onPress={action.onPress}
              testID={action.testID}
              accentColor={theme.accentColor}
              isLast={index === actions.length - 1}
            />
          ))}
        </View>
      </GlassView>
    </View>
  );
}

interface ActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  testID?: string;
  accentColor: string;
  isLast: boolean;
}

function ActionButton({ icon, onPress, testID, accentColor, isLast }: ActionButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.85,
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

  return (
    <Animated.View
      style={[
        styles.buttonWrapper,
        !isLast && styles.buttonWithSeparator,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.touchable}
        testID={testID}
      >
        {icon === 'add' ? (
          <Entypo name="plus" size={SIZES.iconLg} color={accentColor} />
        ) : (
          <Ionicons name={icon} size={SIZES.iconLg} color={accentColor} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const BUTTON_SIZE = SIZES.touchTarget; // 44pt
const BAR_PADDING = SPACING.xs; // 4pt internal padding
const BAR_HEIGHT = BUTTON_SIZE + BAR_PADDING * 2; // 52pt total height

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    ...SHADOWS.lg,
  },
  glass: {
    borderRadius: BAR_HEIGHT / 2, // 26pt - true pill shape
    overflow: 'hidden',
    padding: BAR_PADDING,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWrapper: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWithSeparator: {
    marginRight: SPACING.xs,
  },
  touchable: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: COMPONENT_RADIUS.node,
  },
});
