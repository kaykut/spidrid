/**
 * Add Content Modal
 *
 * Two-level modal for adding new content.
 * Level 1: Choose category (Practice, Read, Learn)
 * Level 2: Category-specific content UI
 */

import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReadContent, LearnContent, MiniTopicCard } from '../components/addContent';
import { GlassView } from '../components/common/GlassView';
import { useTheme } from '../components/common/ThemeProvider';
import { animateLayout } from '../constants/animations';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../constants/typography';
import { TOPICS, getPracticeArticles } from '../data/curriculum';
import { JOURNEY_COLORS } from '../data/themes';
import { useLearningStore } from '../store/learningStore';

type ContentLevel = 'menu' | 'read' | 'learn';

interface MenuOption {
  id: ContentLevel;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
}

// Read and Learn cards remain as navigation options
const MENU_OPTIONS: MenuOption[] = [
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
    description: 'Generate articles or curricula on topics you want to master',
    icon: 'sparkles-outline',
    iconColor: JOURNEY_COLORS.success,
  },
];

// Calculate topic card width for 3-per-row grid inside Practice card
const getTopicCardWidth = () => {
  const screenWidth = Dimensions.get('window').width;
  // screenWidth - screen padding (SPACING.lg * 2) - topic grid padding (SPACING.md * 2) - gaps (SPACING.sm * 2)
  return (screenWidth - SPACING.lg * 2 - SPACING.md * 2 - SPACING.sm * 2) / 3;
};

export default function AddContentModal() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { getTopicProgress, getArticleProgress, startArticle } = useLearningStore();
  const [level, setLevel] = useState<ContentLevel>('menu');
  const [isPracticeExpanded, setIsPracticeExpanded] = useState(false);

  // Chevron rotation animation
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isPracticeExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isPracticeExpanded, rotateAnim]);

  const chevronRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const handleClose = () => {
    router.back();
  };

  const handleBack = () => {
    setLevel('menu');
  };

  const togglePracticeExpanded = () => {
    animateLayout();
    setIsPracticeExpanded((prev) => !prev);
  };

  const handleOptionPress = (optionId: ContentLevel) => {
    // Collapse practice when navigating to other levels
    if (isPracticeExpanded) {
      animateLayout();
      setIsPracticeExpanded(false);
    }
    setLevel(optionId);
  };

  const handleTopicPress = (topicId: string) => {
    // 1. Get practice articles sorted by orderIndex
    const articles = getPracticeArticles(topicId);

    // 2. Find next incomplete article
    const nextArticle = articles.find((article) => !getArticleProgress(article.id)?.completed);

    if (!nextArticle) {
      // All articles completed - could show a message or do nothing
      return;
    }

    // 3. Check if already has progress (already in content list)
    const existingProgress = getArticleProgress(nextArticle.id);

    // 4. If no progress entry, create one to add to content list
    if (!existingProgress) {
      startArticle(nextArticle.id);
    }

    // 5. Close modal and navigate to playback
    if (isPracticeExpanded) {
      setIsPracticeExpanded(false);
    }
    handleClose();
    router.push({
      pathname: '/playback',
      params: { sourceId: nextArticle.id, source: 'training' },
    });
  };

  const handleOutsidePress = () => {
    if (isPracticeExpanded) {
      animateLayout();
      setIsPracticeExpanded(false);
    }
  };

  const getTitle = () => {
    switch (level) {
      case 'read':
        return 'Read';
      case 'learn':
        return 'Learn';
      default:
        return 'New Content';
    }
  };

  const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';
  const topicCardWidth = getTopicCardWidth();

  const renderContent = () => {
    switch (level) {
      case 'read':
        return <ReadContent onClose={handleClose} />;
      case 'learn':
        return <LearnContent onClose={handleClose} />;
      default:
        return (
          <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <ScrollView
              style={styles.menuContainer}
              contentContainerStyle={styles.menuContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Expandable Practice Card */}
              <View
                style={[
                  styles.practiceCardWrapper,
                  { backgroundColor: theme.secondaryBackground },
                  isPracticeExpanded && styles.practiceCardExpanded,
                ]}
              >
                {/* Header row */}
                <TouchableOpacity
                  style={styles.practiceCardHeader}
                  onPress={togglePracticeExpanded}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.menuIconContainer,
                      { backgroundColor: `${JOURNEY_COLORS.warmAccent}20` },
                    ]}
                  >
                    <Ionicons
                      name="stopwatch-outline"
                      size={SIZES.iconLg}
                      color={JOURNEY_COLORS.warmAccent}
                    />
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={[styles.menuTitle, { color: theme.textColor }]}>Practice</Text>
                    <Text style={[styles.menuDescription, { color: theme.textColor }]}>
                      Choose from pre-generated content to practice speed reading
                    </Text>
                  </View>
                  <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
                    <Ionicons
                      name="chevron-forward"
                      size={SIZES.iconMd}
                      color={theme.textColor}
                      style={styles.chevron}
                    />
                  </Animated.View>
                </TouchableOpacity>

                {/* Topic Grid - shown when expanded, inside the card */}
                {isPracticeExpanded && (
                  <View style={styles.topicGrid}>
                    {TOPICS.map((topic) => {
                      const progress = getTopicProgress(topic.id);
                      return (
                        <MiniTopicCard
                          key={topic.id}
                          topic={topic}
                          progress={progress}
                          cardWidth={topicCardWidth}
                          backgroundColor={theme.backgroundColor}
                          onPress={() => handleTopicPress(topic.id)}
                        />
                      );
                    })}
                  </View>
                )}
              </View>

              {/* Read and Learn cards */}
              {MENU_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[styles.menuCard, { backgroundColor: theme.secondaryBackground }]}
                  onPress={() => handleOptionPress(option.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[styles.menuIconContainer, { backgroundColor: `${option.iconColor}20` }]}
                  >
                    <Ionicons name={option.icon} size={SIZES.iconLg} color={option.iconColor} />
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={[styles.menuTitle, { color: theme.textColor }]}>
                      {option.title}
                    </Text>
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
          </TouchableWithoutFeedback>
        );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Navigation button - absolute positioned in safe area */}
      <View style={[styles.navButtonContainer, { top: insets.top + SPACING.sm }]}>
        <GlassView
          appearance={isDarkTheme ? 'dark' : 'light'}
          style={styles.navButtonGlass}
        >
          <TouchableOpacity
            onPress={level === 'menu' ? handleClose : handleBack}
            style={styles.navButtonTouchable}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={level === 'menu' ? 'close' : 'chevron-back'}
              size={SIZES.iconMd}
              color={theme.textColor}
            />
          </TouchableOpacity>
        </GlassView>
      </View>

      {/* Title - absolute positioned, centered */}
      <Text
        style={[
          level === 'menu' ? styles.pageTitle : styles.headerTitle,
          { top: insets.top + SPACING.sm + (SIZES.touchTarget - 20) / 2, color: theme.textColor },
        ]}
      >
        {getTitle()}
      </Text>

      {/* Content */}
      <View
        style={[
          styles.contentContainer,
          { paddingTop: insets.top + SIZES.touchTarget + (level === 'menu' ? SPACING.lg : 0), paddingBottom: insets.bottom },
        ]}
      >
        {renderContent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navButtonContainer: {
    position: 'absolute',
    left: SPACING.md,
    zIndex: 10,
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
  },
  navButtonGlass: {
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    borderRadius: SIZES.touchTarget / 2,
    overflow: 'hidden',
  },
  navButtonTouchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    position: 'absolute',
    zIndex: 10,
    left: SIZES.touchTarget + SPACING.xl,
    right: SIZES.touchTarget + SPACING.xl,
    ...TYPOGRAPHY.sectionHeader,
    textAlign: 'center',
  },
  headerTitle: {
    position: 'absolute',
    zIndex: 10,
    left: SIZES.touchTarget + SPACING.xl,
    right: SIZES.touchTarget + SPACING.xl,
    ...TYPOGRAPHY.cardTitle,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
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
  practiceCardWrapper: {
    borderRadius: COMPONENT_RADIUS.card,
    overflow: 'hidden',
  },
  practiceCardExpanded: {
    paddingBottom: SPACING.md,
  },
  practiceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
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
  topicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
});
