/**
 * User Interests - 1:1 mapping with curriculum topics
 *
 * Each interest maps directly to a single curriculum topic.
 * This allows users to select their interests and get personalized content.
 */

export interface Interest {
  id: string;
  label: string;
  emoji: string;
  /** Curriculum topic ID (1:1 mapping) */
  curriculumTopicId: string;
  /** @deprecated Use curriculumTopicId instead - kept for backwards compat */
  curriculumTopicIds: string[];
}

export const INTERESTS: Interest[] = [
  // Science & Learning
  {
    id: 'science',
    label: 'Science & Discovery',
    emoji: '🔬',
    curriculumTopicId: 'science-discovery',
    curriculumTopicIds: ['science-discovery'],
  },
  {
    id: 'health',
    label: 'Health & Medicine',
    emoji: '💊',
    curriculumTopicId: 'health-medicine',
    curriculumTopicIds: ['health-medicine'],
  },

  // History & Culture
  {
    id: 'history',
    label: 'History & Civilization',
    emoji: '🏛️',
    curriculumTopicId: 'history-civilization',
    curriculumTopicIds: ['history-civilization'],
  },

  // Technology
  {
    id: 'tech',
    label: 'Technology & Internet',
    emoji: '💻',
    curriculumTopicId: 'technology-internet',
    curriculumTopicIds: ['technology-internet'],
  },

  // Nature & Environment
  {
    id: 'nature',
    label: 'Nature & Wildlife',
    emoji: '🌿',
    curriculumTopicId: 'nature-wildlife',
    curriculumTopicIds: ['nature-wildlife'],
  },
  {
    id: 'environment',
    label: 'Climate & Environment',
    emoji: '🌍',
    curriculumTopicId: 'climate-environment',
    curriculumTopicIds: ['climate-environment'],
  },

  // Space
  {
    id: 'space',
    label: 'Space & Cosmos',
    emoji: '🚀',
    curriculumTopicId: 'space-cosmos',
    curriculumTopicIds: ['space-cosmos'],
  },

  // Mind & Self
  {
    id: 'psychology',
    label: 'Psychology & Mind',
    emoji: '🧠',
    curriculumTopicId: 'psychology-mind',
    curriculumTopicIds: ['psychology-mind'],
  },
  {
    id: 'self-improvement',
    label: 'Self-Improvement',
    emoji: '⚡',
    curriculumTopicId: 'self-improvement',
    curriculumTopicIds: ['self-improvement'],
  },

  // Business & Money
  {
    id: 'business',
    label: 'Business & Careers',
    emoji: '💼',
    curriculumTopicId: 'business-careers',
    curriculumTopicIds: ['business-careers'],
  },
  {
    id: 'money',
    label: 'Finance & Investing',
    emoji: '💰',
    curriculumTopicId: 'finance-investing',
    curriculumTopicIds: ['finance-investing'],
  },

  // Broad / Inclusive
  {
    id: 'trivia',
    label: 'Trivia & Fun Facts',
    emoji: '🎯',
    curriculumTopicId: 'trivia-facts',
    curriculumTopicIds: ['trivia-facts'],
  },
  {
    id: 'world',
    label: 'World & Travel',
    emoji: '✈️',
    curriculumTopicId: 'world-travel',
    curriculumTopicIds: ['world-travel'],
  },
  {
    id: 'arts',
    label: 'Arts & Culture',
    emoji: '🎨',
    curriculumTopicId: 'arts-culture',
    curriculumTopicIds: ['arts-culture'],
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle & Wellness',
    emoji: '🧘',
    curriculumTopicId: 'lifestyle-wellness',
    curriculumTopicIds: ['lifestyle-wellness'],
  },
];

/**
 * Get curriculum topic IDs for selected interests
 */
export function getCurriculumTopicsForInterests(interestIds: string[]): string[] {
  const topicIds = new Set<string>();
  interestIds.forEach((id) => {
    const interest = INTERESTS.find((i) => i.id === id);
    if (interest) {
      topicIds.add(interest.curriculumTopicId);
    }
  });
  return Array.from(topicIds);
}

/**
 * Get a single interest by ID
 */
export function getInterestById(id: string): Interest | undefined {
  return INTERESTS.find((i) => i.id === id);
}

/**
 * Get interest for a curriculum topic
 */
export function getInterestForTopic(topicId: string): Interest | undefined {
  return INTERESTS.find((i) => i.curriculumTopicId === topicId);
}
