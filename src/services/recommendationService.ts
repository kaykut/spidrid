/**
 * Recommendation Service
 *
 * Simple algorithm for selecting the next article to recommend
 * per PRD section 4.4 (Simple) and 5.4 (Smart Queue).
 */

import { TOPICS, getArticlesByTopic, getArticleById } from '../data/curriculum';
import { useJourneyStore } from '../store/journeyStore';
import { useLearningStore } from '../store/learningStore';
import { ArticleRecommendation, RecommendationReason } from '../types/journey';
import { Article, Topic } from '../types/learning';

// =============================================================================
// Types
// =============================================================================

interface TopicEngagement {
  topicId: string;
  lastReadAt: number;
  articlesCompleted: number;
  totalArticles: number;
  progressPercent: number;
}

interface RecommendationResult {
  primary: ArticleRecommendation | null;
  stretch: ArticleRecommendation | null;
  continueTopic: ArticleRecommendation | null;
}

// =============================================================================
// Simple Version Recommendation
// =============================================================================

/**
 * Get simple recommendation (for Simple Version)
 * Logic:
 * - Select next uncompleted article in user's most recently engaged topic
 * - If no history: random Article 1 from any topic
 * - If current topic complete: Article 1 from least-engaged topic
 */
export function getSimpleRecommendation(): ArticleRecommendation | null {
  const learningState = useLearningStore.getState();
  const journeyState = useJourneyStore.getState();
  const topics = TOPICS;

  if (topics.length === 0) {return null;}

  // Get topic engagement data
  const engagements = getTopicEngagements(topics, learningState);

  // Sort by last read (most recent first)
  const sortedByRecent = [...engagements].sort((a, b) => b.lastReadAt - a.lastReadAt);

  // Find an uncompleted article
  for (const engagement of sortedByRecent) {
    const article = getNextUncompletedArticle(engagement.topicId, learningState);
    if (article) {
      const topic = topics.find(t => t.id === engagement.topicId);
      const suggestedWpm = calculateSuggestedWpm(journeyState, 'primary');
      return createRecommendation(article, topic!, suggestedWpm, 'continue_topic');
    }
  }

  // All engaged topics complete - try least engaged topic
  const leastEngaged = [...engagements].sort((a, b) => a.progressPercent - b.progressPercent)[0];
  if (leastEngaged && leastEngaged.progressPercent < 1) {
    const article = getNextUncompletedArticle(leastEngaged.topicId, learningState);
    if (article) {
      const topic = topics.find(t => t.id === leastEngaged.topicId);
      const suggestedWpm = calculateSuggestedWpm(journeyState, 'primary');
      return createRecommendation(article, topic!, suggestedWpm, 'new_topic');
    }
  }

  // No history or all complete - get first article from random topic
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  const firstArticle = getPracticeArticles(randomTopic.id)[0];

  if (firstArticle) {
    const suggestedWpm = calculateSuggestedWpm(journeyState, 'primary');
    return createRecommendation(firstArticle, randomTopic, suggestedWpm, 'new_topic');
  }

  return null;
}

// =============================================================================
// Smart Queue Recommendation (Detailed Version)
// =============================================================================

/**
 * Get full smart queue recommendations (for Detailed Version)
 * Returns primary, stretch, and continue topic options
 */
export function getSmartQueueRecommendations(): RecommendationResult {
  const learningState = useLearningStore.getState();
  const journeyState = useJourneyStore.getState();
  const { userState } = journeyState;
  const topics = TOPICS;

  const result: RecommendationResult = {
    primary: null,
    stretch: null,
    continueTopic: null,
  };

  if (topics.length === 0) {return result;}

  // Get topic engagement data
  const engagements = getTopicEngagements(topics, learningState);

  // Primary recommendation
  result.primary = getPrimaryRecommendation(topics, engagements, journeyState, learningState);

  // Stretch recommendation (only if not CONSOLIDATE)
  if (userState !== 'consolidate' && result.primary) {
    result.stretch = getStretchRecommendation(result.primary, journeyState);
  }

  // Continue topic recommendation (different from primary)
  result.continueTopic = getContinueTopicRecommendation(
    topics,
    engagements,
    journeyState,
    learningState,
    result.primary?.topicId
  );

  return result;
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get practice articles for a topic (excludes certification articles)
 */
function getPracticeArticles(topicId: string): Article[] {
  return getArticlesByTopic(topicId).filter(a => a.articleType !== 'certification');
}

function getTopicEngagements(
  topics: Topic[],
  learningState: ReturnType<typeof useLearningStore.getState>
): TopicEngagement[] {
  return topics.map(topic => {
    const articles = getPracticeArticles(topic.id);
    const completedArticles = articles.filter(a =>
      learningState.articleProgress[a.id]?.completed
    );

    // Find most recent completion in this topic
    let lastReadAt = 0;
    for (const article of articles) {
      const progress = learningState.articleProgress[article.id];
      if (progress?.completed) {
        // We don't have exact timestamps per article, use a heuristic
        lastReadAt = Math.max(lastReadAt, 1);
      }
    }

    return {
      topicId: topic.id,
      lastReadAt,
      articlesCompleted: completedArticles.length,
      totalArticles: articles.length,
      progressPercent: articles.length > 0 ? completedArticles.length / articles.length : 0,
    };
  });
}

function getNextUncompletedArticle(
  topicId: string,
  learningState: ReturnType<typeof useLearningStore.getState>
): Article | null {
  const articles = getPracticeArticles(topicId)
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));

  for (const article of articles) {
    if (!learningState.articleProgress[article.id]?.completed) {
      return article;
    }
  }
  return null;
}

function calculateSuggestedWpm(
  journeyState: ReturnType<typeof useJourneyStore.getState>,
  cardType: 'primary' | 'stretch'
): number {
  const { comfortBand, userState, avgWpmLast3 } = journeyState;

  // If no sessions, use default starting WPM
  if (avgWpmLast3 === 0) {
    return 300;
  }

  if (cardType === 'stretch') {
    if (userState === 'consolidate') {return 0;}
    if (userState === 'push') {return Math.round(comfortBand.ceiling * 1.15);}
    return Math.round(comfortBand.ceiling * 1.1);
  }

  // Primary card
  switch (userState) {
    case 'push':
      return comfortBand.ceiling;
    case 'consolidate':
      return comfortBand.floor;
    default:
      // Gentle stretch: median + 10%
      return Math.round(comfortBand.median * 1.1);
  }
}

function createRecommendation(
  article: Article,
  topic: Topic,
  suggestedWpm: number,
  reason: RecommendationReason
): ArticleRecommendation {
  const wordsPerMinute = suggestedWpm || 300;
  const estimatedMinutes = Math.max(1, Math.round(article.wordCount / wordsPerMinute));

  return {
    articleId: article.id,
    topicId: topic.id,
    title: article.title,
    topicName: topic.name,
    wordCount: article.wordCount,
    estimatedMinutes,
    suggestedWpm,
    reason,
  };
}

function getPrimaryRecommendation(
  topics: Topic[],
  engagements: TopicEngagement[],
  journeyState: ReturnType<typeof useJourneyStore.getState>,
  learningState: ReturnType<typeof useLearningStore.getState>
): ArticleRecommendation | null {
  // Apply topic variety rules:
  // - No same-topic streak > 3 articles
  // - Recency penalty for topics read in last 24h
  // - Completion momentum for topics > 50% progress

  const recentSessions = journeyState.sessions.slice(-3);
  const recentTopicCounts = new Map<string, number>();

  for (const session of recentSessions) {
    const article = getArticleById(session.articleId);
    if (article) {
      const count = recentTopicCounts.get(article.topicId) || 0;
      recentTopicCounts.set(article.topicId, count + 1);
    }
  }

  // Score topics
  const scoredTopics = engagements
    .filter(e => e.progressPercent < 1) // Has uncompleted articles
    .map(e => {
      let score = 100;

      // Penalty for same-topic streak
      const recentCount = recentTopicCounts.get(e.topicId) || 0;
      if (recentCount >= 3) {
        score -= 50; // Hard block effect
      } else if (recentCount > 0) {
        score -= recentCount * 10;
      }

      // Completion momentum bonus
      if (e.progressPercent > 0.5) {
        score += 30;
      }

      // Recent engagement bonus (but not too recent)
      if (e.lastReadAt > 0 && e.articlesCompleted > 0) {
        score += 15;
      }

      return { ...e, score };
    })
    .sort((a, b) => b.score - a.score);

  // Get best topic
  for (const engagement of scoredTopics) {
    const article = getNextUncompletedArticle(engagement.topicId, learningState);
    if (article) {
      const topic = topics.find(t => t.id === engagement.topicId);
      const suggestedWpm = calculateSuggestedWpm(journeyState, 'primary');
      const reason: RecommendationReason = engagement.articlesCompleted > 0
        ? 'continue_topic'
        : 'new_topic';
      return createRecommendation(article, topic!, suggestedWpm, reason);
    }
  }

  return null;
}

function getStretchRecommendation(
  primary: ArticleRecommendation,
  journeyState: ReturnType<typeof useJourneyStore.getState>
): ArticleRecommendation | null {
  const stretchWpm = calculateSuggestedWpm(journeyState, 'stretch');
  if (stretchWpm === 0) {return null;}

  const wpmIncrease = stretchWpm - primary.suggestedWpm;
  if (wpmIncrease <= 0) {return null;}

  return {
    ...primary,
    suggestedWpm: stretchWpm,
    estimatedMinutes: Math.max(1, Math.round(primary.wordCount / stretchWpm)),
    reason: 'stretch_goal',
  };
}

function getContinueTopicRecommendation(
  topics: Topic[],
  engagements: TopicEngagement[],
  journeyState: ReturnType<typeof useJourneyStore.getState>,
  learningState: ReturnType<typeof useLearningStore.getState>,
  excludeTopicId?: string
): ArticleRecommendation | null {
  // Find a different in-progress topic
  const inProgressTopics = engagements
    .filter(e =>
      e.topicId !== excludeTopicId &&
      e.progressPercent > 0 &&
      e.progressPercent < 1
    )
    .sort((a, b) => b.progressPercent - a.progressPercent);

  for (const engagement of inProgressTopics) {
    const article = getNextUncompletedArticle(engagement.topicId, learningState);
    if (article) {
      const topic = topics.find(t => t.id === engagement.topicId);
      const suggestedWpm = calculateSuggestedWpm(journeyState, 'primary');
      return createRecommendation(article, topic!, suggestedWpm, 'continue_topic');
    }
  }

  // No in-progress topics, suggest a new one
  const newTopics = engagements
    .filter(e =>
      e.topicId !== excludeTopicId &&
      e.progressPercent === 0
    );

  if (newTopics.length > 0) {
    const randomNew = newTopics[Math.floor(Math.random() * newTopics.length)];
    const article = getNextUncompletedArticle(randomNew.topicId, learningState);
    if (article) {
      const topic = topics.find(t => t.id === randomNew.topicId);
      const suggestedWpm = calculateSuggestedWpm(journeyState, 'primary');
      return createRecommendation(article, topic!, suggestedWpm, 'new_topic');
    }
  }

  return null;
}
