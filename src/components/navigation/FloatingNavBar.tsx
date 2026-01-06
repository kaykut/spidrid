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
import { useTheme } from '../common/ThemeProvider';

interface NavItem {
  name: string;
  route: '/(tabs)/learn' | '/(tabs)/read' | '/(tabs)/profile';
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
}

const NAV_ITEMS: NavItem[] = [
  {
    name: 'Learn',
    route: '/(tabs)/learn',
    activeIcon: 'book',
    inactiveIcon: 'book-outline',
  },
  {
    name: 'Read',
    route: '/(tabs)/read',
    activeIcon: 'document-text',
    inactiveIcon: 'document-text-outline',
  },
  {
    name: 'Profile',
    route: '/(tabs)/profile',
    activeIcon: 'person',
    inactiveIcon: 'person-outline',
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
          bottom: Math.max(insets.bottom, 20) + 12,
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
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
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
          size={22}
          color={active ? activeColor : inactiveColor}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 28,
    borderWidth: 1,
    gap: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  navButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(77, 171, 247, 0.15)',
  },
});
