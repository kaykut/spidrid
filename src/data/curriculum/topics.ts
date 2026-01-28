import { TOPIC_COLORS } from '../../constants/dataColors';
import { i18n } from '../../services/i18n';
import { Topic } from '../../types/learning';

/**
 * 15 curriculum topics - each maps 1:1 with a user interest
 *
 * Names and descriptions are translated via i18n - use getLocalizedTopics() or
 * getLocalizedTopicById() to get topics with current locale labels.
 */

/** Topic data without translated strings - for internal use */
interface TopicData {
  id: string;
  /** i18n key for name lookup (without _desc suffix) */
  nameKey: string;
  icon: string;
  color: string;
  articleCount: number;
  practiceArticleCount: number;
  certificationArticleCount: number;
}

const TOPIC_DATA: TopicData[] = [
  {
    id: 'science-discovery',
    nameKey: 'science_discovery',
    icon: '🔬',
    color: TOPIC_COLORS.scienceDiscovery,
    articleCount: 13,
    practiceArticleCount: 10,
    certificationArticleCount: 3,
  },
  {
    id: 'health-medicine',
    nameKey: 'health_medicine',
    icon: '💊',
    color: TOPIC_COLORS.healthMedicine,
    articleCount: 13,
    practiceArticleCount: 10,
    certificationArticleCount: 3,
  },
  {
    id: 'history-civilization',
    nameKey: 'history_civilization',
    icon: '🏛️',
    color: TOPIC_COLORS.historyCivilization,
    articleCount: 13,
    practiceArticleCount: 10,
    certificationArticleCount: 3,
  },
  {
    id: 'technology-internet',
    nameKey: 'technology_internet',
    icon: '💻',
    color: TOPIC_COLORS.technologyInternet,
    articleCount: 13,
    practiceArticleCount: 10,
    certificationArticleCount: 3,
  },
  {
    id: 'nature-wildlife',
    nameKey: 'nature_wildlife',
    icon: '🌿',
    color: TOPIC_COLORS.natureWildlife,
    articleCount: 13,
    practiceArticleCount: 10,
    certificationArticleCount: 3,
  },
  {
    id: 'climate-environment',
    nameKey: 'climate_environment',
    icon: '🌍',
    color: TOPIC_COLORS.climateEnvironment,
    articleCount: 13,
    practiceArticleCount: 10,
    certificationArticleCount: 3,
  },
  {
    id: 'space-cosmos',
    nameKey: 'space_cosmos',
    icon: '🚀',
    color: TOPIC_COLORS.spaceCosmos,
    articleCount: 13,
    practiceArticleCount: 10,
    certificationArticleCount: 3,
  },
  {
    id: 'psychology-mind',
    nameKey: 'psychology_mind',
    icon: '🧠',
    color: TOPIC_COLORS.psychologyMind,
    articleCount: 13,
    practiceArticleCount: 10,
    certificationArticleCount: 3,
  },
  {
    id: 'self-improvement',
    nameKey: 'self_improvement',
    icon: '⚡',
    color: TOPIC_COLORS.selfImprovement,
    articleCount: 13,
    practiceArticleCount: 10,
    certificationArticleCount: 3,
  },
  {
    id: 'business-careers',
    nameKey: 'business_careers',
    icon: '💼',
    color: TOPIC_COLORS.businessCareers,
    articleCount: 13,
    practiceArticleCount: 10,
    certificationArticleCount: 3,
  },
  {
    id: 'finance-investing',
    nameKey: 'finance_investing',
    icon: '💰',
    color: TOPIC_COLORS.financeInvesting,
    articleCount: 13,
    practiceArticleCount: 10,
    certificationArticleCount: 3,
  },
  {
    id: 'trivia-facts',
    nameKey: 'trivia_fun_facts',
    icon: '🎯',
    color: TOPIC_COLORS.triviaFacts,
    articleCount: 13,
    practiceArticleCount: 10,
    certificationArticleCount: 3,
  },
  {
    id: 'world-travel',
    nameKey: 'world_travel',
    icon: '✈️',
    color: TOPIC_COLORS.worldTravel,
    articleCount: 13,
    practiceArticleCount: 10,
    certificationArticleCount: 3,
  },
  {
    id: 'arts-culture',
    nameKey: 'arts_culture',
    icon: '🎨',
    color: TOPIC_COLORS.artsCulture,
    articleCount: 13,
    practiceArticleCount: 10,
    certificationArticleCount: 3,
  },
  {
    id: 'lifestyle-wellness',
    nameKey: 'lifestyle_wellness',
    icon: '🧘',
    color: TOPIC_COLORS.lifestyleWellness,
    articleCount: 13,
    practiceArticleCount: 10,
    certificationArticleCount: 3,
  },
];

/**
 * Get all topics with localized names and descriptions
 */
export function getLocalizedTopics(): Topic[] {
  return TOPIC_DATA.map((data) => ({
    id: data.id,
    name: i18n.t(`topics:${data.nameKey}`),
    description: i18n.t(`topics:${data.nameKey}_desc`),
    icon: data.icon,
    color: data.color,
    articleCount: data.articleCount,
    practiceArticleCount: data.practiceArticleCount,
    certificationArticleCount: data.certificationArticleCount,
  }));
}

/**
 * @deprecated Use getLocalizedTopics() for translated labels
 * This constant uses English labels only - kept for backwards compatibility
 */
export const TOPICS: Topic[] = TOPIC_DATA.map((data) => ({
  id: data.id,
  name: i18n.t(`topics:${data.nameKey}`, { lng: 'en' }),
  description: i18n.t(`topics:${data.nameKey}_desc`, { lng: 'en' }),
  icon: data.icon,
  color: data.color,
  articleCount: data.articleCount,
  practiceArticleCount: data.practiceArticleCount,
  certificationArticleCount: data.certificationArticleCount,
}));

/**
 * Get a topic by ID with localized name and description
 */
export function getLocalizedTopicById(id: string): Topic | undefined {
  const data = TOPIC_DATA.find((t) => t.id === id);
  if (!data) {
    return undefined;
  }
  return {
    id: data.id,
    name: i18n.t(`topics:${data.nameKey}`),
    description: i18n.t(`topics:${data.nameKey}_desc`),
    icon: data.icon,
    color: data.color,
    articleCount: data.articleCount,
    practiceArticleCount: data.practiceArticleCount,
    certificationArticleCount: data.certificationArticleCount,
  };
}

/**
 * @deprecated Use getLocalizedTopicById() for translated labels
 */
export function getTopicById(id: string): Topic | undefined {
  return TOPICS.find((t) => t.id === id);
}
