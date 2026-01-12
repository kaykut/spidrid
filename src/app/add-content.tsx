/**
 * Add Content Modal
 *
 * Two-level modal for adding new content.
 * Level 1: Choose category (Practice, Read, Learn)
 * Level 2: Category-specific content UI
 */

import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrainContent, ReadContent, LearnContent } from '../components/addContent';
import { useTheme } from '../components/common/ThemeProvider';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../constants/typography';
import { JOURNEY_COLORS } from '../data/themes';

type ContentLevel = 'menu' | 'practice' | 'read' | 'learn';

interface MenuOption {
  id: ContentLevel;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
}

const MENU_OPTIONS: MenuOption[] = [
  {
    id: 'practice',
    title: 'Practice',
    description: 'Choose from pre-generated content to practice speed reading',
    icon: 'stopwatch-outline',
    iconColor: JOURNEY_COLORS.warmAccent,
  },
  {
    id: 'read',
    title: 'Read',
    description: 'Speed read your own articles or books from PDFs, EPUBs, or links',
    icon: 'book-outline',
    iconColor: JOURNEY_COLORS.accent,
  },
  {
    id: 'learn',
    title: 'Learn',
    description: 'Generate AI-powered articles or curricula on topics you want to master',
    icon: 'sparkles-outline',
    iconColor: JOURNEY_COLORS.success,
  },
];

export default function AddContentModal() {
  const { theme } = useTheme();
  const [level, setLevel] = useState<ContentLevel>('menu');

  const handleClose = () => {
    router.back();
  };

  const handleBack = () => {
    setLevel('menu');
  };

  const handleOptionPress = (optionId: ContentLevel) => {
    setLevel(optionId);
  };

  const getTitle = () => {
    switch (level) {
      case 'practice':
        return 'Practice';
      case 'read':
        return 'Read';
      case 'learn':
        return 'Learn';
      default:
        return 'Add Content';
    }
  };

  const renderContent = () => {
    switch (level) {
      case 'practice':
        return <TrainContent onClose={handleClose} />;
      case 'read':
        return <ReadContent onClose={handleClose} />;
      case 'learn':
        return <LearnContent onClose={handleClose} />;
      default:
        return (
          <ScrollView
            style={styles.menuContainer}
            contentContainerStyle={styles.menuContent}
            showsVerticalScrollIndicator={false}
          >
            {MENU_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[styles.menuCard, { backgroundColor: theme.secondaryBackground }]}
                onPress={() => handleOptionPress(option.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.menuIconContainer, { backgroundColor: `${option.iconColor}20` }]}>
                  <Ionicons name={option.icon} size={SIZES.iconLg} color={option.iconColor} />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={[styles.menuTitle, { color: theme.textColor }]}>{option.title}</Text>
                  <Text style={[styles.menuDescription, { color: theme.textColor }]}>
                    {option.description}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={SIZES.iconMd}
                  color={theme.textColor}
                  style={styles.chevron}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        );
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      edges={['top', 'bottom']}
    >
      {/* Header */}
      <View style={styles.header}>
        {level === 'menu' ? (
          <TouchableOpacity
            onPress={handleClose}
            style={styles.headerButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={SIZES.iconLg} color={theme.textColor} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleBack}
            style={styles.headerButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={SIZES.iconLg} color={theme.textColor} />
          </TouchableOpacity>
        )}
        <Text style={[styles.headerTitle, { color: theme.textColor }]}>{getTitle()}</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>{renderContent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerButton: {
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...TYPOGRAPHY.cardTitle,
  },
  headerSpacer: {
    width: SIZES.touchTarget,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  menuContainer: {
    flex: 1,
  },
  menuContent: {
    gap: SPACING.md,
    paddingBottom: SPACING.xxxl,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.card,
  },
  menuIconContainer: {
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    borderRadius: COMPONENT_RADIUS.badge,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    ...TYPOGRAPHY.cardSubtitle,
    fontWeight: FONT_WEIGHTS.semibold,
    marginBottom: SPACING.xs,
  },
  menuDescription: {
    ...TYPOGRAPHY.body,
    opacity: 0.7,
  },
  chevron: {
    opacity: 0.5,
    marginLeft: SPACING.sm,
  },
});
