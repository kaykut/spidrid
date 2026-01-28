/**
 * User Interests - 1:1 mapping with curriculum topics
 *
 * Each interest maps directly to a single curriculum topic.
 * This allows users to select their interests and get personalized content.
 *
 * Labels are translated via i18n - use getLocalizedInterests() or getLocalizedInterestById()
 * to get interests with current locale labels.
 */

import { i18n } from '../services/i18n';

export interface Interest {
  id: string;
  label: string;
  emoji: string;
  /** Curriculum topic ID (1:1 mapping) */
  curriculumTopicId: string;
  /** @deprecated Use curriculumTopicId instead - kept for backwards compat */
  curriculumTopicIds: string[];
}

/** Interest data without translated label - for internal use */
interface InterestData {
  id: string;
  /** i18n key for label lookup */
  labelKey: string;
  emoji: string;
  curriculumTopicId: string;
  curriculumTopicIds: string[];
}

const INTEREST_DATA: InterestData[] = [
  // Science & Learning
  {
    id: 'science',
    labelKey: 'science_discovery',
    emoji: '🔬',
    curriculumTopicId: 'science-discovery',
    curriculumTopicIds: ['science-discovery'],
  },
  {
    id: 'health',
    labelKey: 'health_medicine',
    emoji: '💊',
    curriculumTopicId: 'health-medicine',
    curriculumTopicIds: ['health-medicine'],
  },

  // History & Culture
  {
    id: 'history',
    labelKey: 'history_civilization',
    emoji: '🏛️',
    curriculumTopicId: 'history-civilization',
    curriculumTopicIds: ['history-civilization'],
  },

  // Technology
  {
    id: 'tech',
    labelKey: 'technology_internet',
    emoji: '💻',
    curriculumTopicId: 'technology-internet',
    curriculumTopicIds: ['technology-internet'],
  },

  // Nature & Environment
  {
    id: 'nature',
    labelKey: 'nature_wildlife',
    emoji: '🌿',
    curriculumTopicId: 'nature-wildlife',
    curriculumTopicIds: ['nature-wildlife'],
  },
  {
    id: 'environment',
    labelKey: 'climate_environment',
    emoji: '🌍',
    curriculumTopicId: 'climate-environment',
    curriculumTopicIds: ['climate-environment'],
  },

  // Space
  {
    id: 'space',
    labelKey: 'space_cosmos',
    emoji: '🚀',
    curriculumTopicId: 'space-cosmos',
    curriculumTopicIds: ['space-cosmos'],
  },

  // Mind & Self
  {
    id: 'psychology',
    labelKey: 'psychology_mind',
    emoji: '🧠',
    curriculumTopicId: 'psychology-mind',
    curriculumTopicIds: ['psychology-mind'],
  },
  {
    id: 'self-improvement',
    labelKey: 'self_improvement',
    emoji: '⚡',
    curriculumTopicId: 'self-improvement',
    curriculumTopicIds: ['self-improvement'],
  },

  // Business & Money
  {
    id: 'business',
    labelKey: 'business_careers',
    emoji: '💼',
    curriculumTopicId: 'business-careers',
    curriculumTopicIds: ['business-careers'],
  },
  {
    id: 'money',
    labelKey: 'finance_investing',
    emoji: '💰',
    curriculumTopicId: 'finance-investing',
    curriculumTopicIds: ['finance-investing'],
  },

  // Broad / Inclusive
  {
    id: 'trivia',
    labelKey: 'trivia_fun_facts',
    emoji: '🎯',
    curriculumTopicId: 'trivia-facts',
    curriculumTopicIds: ['trivia-facts'],
  },
  {
    id: 'world',
    labelKey: 'world_travel',
    emoji: '✈️',
    curriculumTopicId: 'world-travel',
    curriculumTopicIds: ['world-travel'],
  },
  {
    id: 'arts',
    labelKey: 'arts_culture',
    emoji: '🎨',
    curriculumTopicId: 'arts-culture',
    curriculumTopicIds: ['arts-culture'],
  },
  {
    id: 'lifestyle',
    labelKey: 'lifestyle_wellness',
    emoji: '🧘',
    curriculumTopicId: 'lifestyle-wellness',
    curriculumTopicIds: ['lifestyle-wellness'],
  },
];

/**
 * Get all interests with localized labels
 */
export function getLocalizedInterests(): Interest[] {
  return INTEREST_DATA.map((data) => ({
    id: data.id,
    label: i18n.t(`interests:${data.labelKey}`),
    emoji: data.emoji,
    curriculumTopicId: data.curriculumTopicId,
    curriculumTopicIds: data.curriculumTopicIds,
  }));
}

/**
 * @deprecated Use getLocalizedInterests() for translated labels
 * This constant uses English labels only - kept for backwards compatibility
 */
export const INTERESTS: Interest[] = INTEREST_DATA.map((data) => ({
  id: data.id,
  label: i18n.t(`interests:${data.labelKey}`, { lng: 'en' }),
  emoji: data.emoji,
  curriculumTopicId: data.curriculumTopicId,
  curriculumTopicIds: data.curriculumTopicIds,
}));

/**
 * Get curriculum topic IDs for selected interests
 */
export function getCurriculumTopicsForInterests(interestIds: string[]): string[] {
  const topicIds = new Set<string>();
  interestIds.forEach((id) => {
    const data = INTEREST_DATA.find((i) => i.id === id);
    if (data) {
      topicIds.add(data.curriculumTopicId);
    }
  });
  return Array.from(topicIds);
}

/**
 * Get a single interest by ID with localized label
 */
export function getLocalizedInterestById(id: string): Interest | undefined {
  const data = INTEREST_DATA.find((i) => i.id === id);
  if (!data) {
    return undefined;
  }
  return {
    id: data.id,
    label: i18n.t(`interests:${data.labelKey}`),
    emoji: data.emoji,
    curriculumTopicId: data.curriculumTopicId,
    curriculumTopicIds: data.curriculumTopicIds,
  };
}

/**
 * @deprecated Use getLocalizedInterestById() for translated labels
 */
export function getInterestById(id: string): Interest | undefined {
  return INTERESTS.find((i) => i.id === id);
}

/**
 * Get interest for a curriculum topic with localized label
 */
export function getLocalizedInterestForTopic(topicId: string): Interest | undefined {
  const data = INTEREST_DATA.find((i) => i.curriculumTopicId === topicId);
  if (!data) {
    return undefined;
  }
  return {
    id: data.id,
    label: i18n.t(`interests:${data.labelKey}`),
    emoji: data.emoji,
    curriculumTopicId: data.curriculumTopicId,
    curriculumTopicIds: data.curriculumTopicIds,
  };
}

/**
 * @deprecated Use getLocalizedInterestForTopic() for translated labels
 */
export function getInterestForTopic(topicId: string): Interest | undefined {
  return INTERESTS.find((i) => i.curriculumTopicId === topicId);
}
