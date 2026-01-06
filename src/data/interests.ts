export interface Interest {
  id: string;
  label: string;
  emoji: string;
  curriculumTopicIds: string[];
}

export const INTERESTS: Interest[] = [
  // Science & Learning
  { id: 'science', label: 'Science & Discovery', emoji: '🔬', curriculumTopicIds: ['science'] },
  { id: 'health', label: 'Health & Medicine', emoji: '💊', curriculumTopicIds: ['science'] },

  // History & Culture
  { id: 'history', label: 'History & Civilization', emoji: '🏛️', curriculumTopicIds: ['history'] },

  // Technology
  { id: 'tech', label: 'Technology & Internet', emoji: '💻', curriculumTopicIds: ['technology'] },

  // Nature & Environment
  { id: 'nature', label: 'Nature & Wildlife', emoji: '🌿', curriculumTopicIds: ['nature'] },
  { id: 'environment', label: 'Climate & Environment', emoji: '🌍', curriculumTopicIds: ['nature', 'science'] },

  // Space
  { id: 'space', label: 'Space & Cosmos', emoji: '🚀', curriculumTopicIds: ['space'] },

  // Mind & Self
  { id: 'psychology', label: 'Psychology & Mind', emoji: '🧠', curriculumTopicIds: ['psychology'] },
  { id: 'self-improvement', label: 'Self-Improvement', emoji: '⚡', curriculumTopicIds: ['psychology'] },

  // Business & Money
  { id: 'business', label: 'Business & Careers', emoji: '💼', curriculumTopicIds: ['economics'] },
  { id: 'money', label: 'Money & Investing', emoji: '💰', curriculumTopicIds: ['economics'] },

  // Broad / Inclusive
  { id: 'trivia', label: 'Trivia & Fun Facts', emoji: '🎯', curriculumTopicIds: ['science', 'history', 'nature', 'space'] },
  { id: 'world', label: 'World & Travel', emoji: '✈️', curriculumTopicIds: ['history', 'nature'] },
  { id: 'arts', label: 'Arts & Culture', emoji: '🎨', curriculumTopicIds: ['history', 'psychology'] },
  { id: 'lifestyle', label: 'Lifestyle & Wellness', emoji: '🧘', curriculumTopicIds: ['psychology', 'science'] },
];

export function getCurriculumTopicsForInterests(interestIds: string[]): string[] {
  const topicIds = new Set<string>();
  interestIds.forEach((id) => {
    const interest = INTERESTS.find((i) => i.id === id);
    if (interest) {
      interest.curriculumTopicIds.forEach((topicId) => topicIds.add(topicId));
    }
  });
  return Array.from(topicIds);
}
