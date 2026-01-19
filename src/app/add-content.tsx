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
import { ExpandableReadCard, ExpandableLearnCard, MiniTopicCard } from '../components/addContent';
import { GlassView } from '../components/common/GlassView';
import { useTheme } from '../components/common/ThemeProvider';
import { animateLayout } from '../constants/animations';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../constants/typography';
import { TOPICS, getPracticeArticles } from '../data/curriculum';
import { JOURNEY_COLORS } from '../data/themes';
import { useLearningStore } from '../store/learningStore';

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
  const [isPracticeExpanded, setIsPracticeExpanded] = useState(false);
  const [isReadExpanded, setIsReadExpanded] = useState(false);
  const [isLearnExpanded, setIsLearnExpanded] = useState(false);

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

  const togglePracticeExpanded = () => {
    if (isReadExpanded) {
      animateLayout();
      setIsReadExpanded(false);
    }
    if (isLearnExpanded) {
      animateLayout();
      setIsLearnExpanded(false);
    }
    animateLayout();
    setIsPracticeExpanded((prev) => !prev);
  };

  const handleReadExpandChange = (expanded: boolean) => {
    if (expanded && isPracticeExpanded) {
      animateLayout();
      setIsPracticeExpanded(false);
    }
    if (expanded && isLearnExpanded) {
      animateLayout();
      setIsLearnExpanded(false);
    }
    setIsReadExpanded(expanded);
  };

  const handleLearnExpandChange = (expanded: boolean) => {
    if (expanded && isPracticeExpanded) {
      animateLayout();
      setIsPracticeExpanded(false);
    }
    if (expanded && isReadExpanded) {
      animateLayout();
      setIsReadExpanded(false);
    }
    setIsLearnExpanded(expanded);
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
    if (isReadExpanded) {
      animateLayout();
      setIsReadExpanded(false);
    }
    if (isLearnExpanded) {
      animateLayout();
      setIsLearnExpanded(false);
    }
  };

  const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';
  const topicCardWidth = getTopicCardWidth();

  const renderContent = () => {
    return (
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <ScrollView
          style={styles.menuContainer}
          contentContainerStyle={styles.menuContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Expandable Read Card */}
          <ExpandableReadCard
            isExpanded={isReadExpanded}
            onExpandChange={handleReadExpandChange}
            onClose={handleClose}
          />

          {/* Expandable Learn Card */}
          <ExpandableLearnCard
            isExpanded={isLearnExpanded}
            onExpandChange={handleLearnExpandChange}
            onClose={handleClose}
          />

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
              testID="add-content.practice-card"
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
                <Text style={[styles.menuTitle, { color: theme.textColor }]} testID="add-content.practice-text">Practice</Text>
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
                {TOPICS.map((topic, index) => {
                  const progress = getTopicProgress(topic.id);
                  return (
                    <MiniTopicCard
                      key={topic.id}
                      topic={topic}
                      progress={progress}
                      cardWidth={topicCardWidth}
                      backgroundColor={theme.backgroundColor}
                      onPress={() => handleTopicPress(topic.id)}
                      testID={`add-content.practice.topic-${index}`}
                    />
                  );
                })}
              </View>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
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
            onPress={handleClose}
            style={styles.navButtonTouchable}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name="close"
              size={SIZES.iconMd}
              color={theme.textColor}
            />
          </TouchableOpacity>
        </GlassView>
      </View>

      {/* Title - absolute positioned, centered */}
      <Text
        style={[
          styles.pageTitle,
          { top: insets.top + SPACING.sm + (SIZES.touchTarget - 20) / 2, color: theme.textColor },
        ]}
      >
        New Content
      </Text>

      {/* Content */}
      <View
        style={[
          styles.contentContainer,
          { paddingTop: insets.top + SIZES.touchTarget + SPACING.lg, paddingBottom: insets.bottom },
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
