import React, { useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DURATION } from '../../constants/animations';
import { SPACING, RADIUS, SIZES } from '../../constants/spacing';
import { useTheme } from '../common/ThemeProvider';

interface NavItem {
  name: string;
  route: '/(tabs)/journey' | '/(tabs)/play' | '/(tabs)/content';
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
}

const NAV_ITEMS: NavItem[] = [
  {
    name: 'Journey',
    route: '/(tabs)/journey',
    activeIcon: 'rocket',
    inactiveIcon: 'rocket-outline',
  },
  {
    name: 'Play',
    route: '/(tabs)/play',
    activeIcon: 'play-circle',
    inactiveIcon: 'play-circle-outline',
  },
  {
    name: 'Content',
    route: '/(tabs)/content',
    activeIcon: 'library',
    inactiveIcon: 'library-outline',
  },
];

export function FloatingNavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const isActive = (route: string) => {
    const routeName = route.replace('/(tabs)/', '');
    return pathname.includes(routeName);
  };

  const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';
  const glassBackground = isDarkTheme
    ? 'rgba(26, 26, 26, 0.92)'
    : 'rgba(245, 245, 245, 0.95)';
  const borderColor = isDarkTheme
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.08)';

  return (
    <View
      style={[
        styles.container,
        {
          bottom: Math.max(insets.bottom, SPACING.xl) + SPACING.md,
          backgroundColor: glassBackground,
          borderColor: borderColor,
        },
      ]}
    >
      {NAV_ITEMS.map((item) => {
        const active = isActive(item.route);
        return (
          <NavButton
            key={item.name}
            item={item}
            active={active}
            activeColor={theme.accentColor}
            inactiveColor={isDarkTheme ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'}
            onPress={() => router.push(item.route)}
          />
        );
      })}
    </View>
  );
}

interface NavButtonProps {
  item: NavItem;
  active: boolean;
  activeColor: string;
  inactiveColor: string;
  onPress: () => void;
}

function NavButton({ item, active, activeColor, inactiveColor, onPress }: NavButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

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

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      style={styles.navButton}
    >
      <Animated.View
        style={[
          styles.iconContainer,
          { transform: [{ scale: scaleAnim }] },
          active && styles.activeIconContainer,
        ]}
      >
        <Ionicons
          name={active ? item.activeIcon : item.inactiveIcon}
          size={SIZES.iconLg}
          color={active ? activeColor : inactiveColor}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    gap: SPACING.xs,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: SPACING.xs },
        shadowOpacity: 0.2,
        shadowRadius: SPACING.md,
      },
      android: {
        elevation: SPACING.sm,
      },
    }),
  },
  navButton: {
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: SPACING.huge,
    height: SPACING.huge,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.xxl,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(0, 212, 170, 0.15)',
  },
});
