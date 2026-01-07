/**
 * Tests for Interests Data - Milestone 3
 *
 * Tests the 1:1 mapping between interests and curriculum topics.
 */

import { INTERESTS } from '../../src/data/interests';
import { TOPICS } from '../../src/data/curriculum';

describe('INTERESTS', () => {
  it('has exactly 15 interests', () => {
    expect(INTERESTS.length).toBe(15);
  });

  describe('interest structure', () => {
    it('each interest has required fields', () => {
      INTERESTS.forEach(interest => {
        expect(interest.id).toBeDefined();
        expect(typeof interest.id).toBe('string');
        expect(interest.label).toBeDefined();
        expect(typeof interest.label).toBe('string');
        expect(interest.emoji).toBeDefined();
        expect(typeof interest.emoji).toBe('string');
      });
    });

    it('each interest has unique ID', () => {
      const ids = INTERESTS.map(i => i.id);
      const uniqueIds = [...new Set(ids)];
      expect(uniqueIds.length).toBe(ids.length);
    });
  });
});

describe('Interest-Topic 1:1 Mapping', () => {
  it('each interest has a curriculumTopicId', () => {
    INTERESTS.forEach(interest => {
      expect(interest.curriculumTopicId).toBeDefined();
      expect(typeof interest.curriculumTopicId).toBe('string');
    });
  });

  it('each curriculumTopicId maps to a valid topic', () => {
    const topicIds = TOPICS.map(t => t.id);
    INTERESTS.forEach(interest => {
      expect(topicIds).toContain(interest.curriculumTopicId);
    });
  });

  it('each topic is mapped by exactly one interest (1:1)', () => {
    const mappedTopicIds = INTERESTS.map(i => i.curriculumTopicId);
    const uniqueMappedIds = [...new Set(mappedTopicIds)];

    // Each interest maps to a unique topic
    expect(uniqueMappedIds.length).toBe(INTERESTS.length);

    // All topics are covered
    const topicIds = TOPICS.map(t => t.id);
    topicIds.forEach(topicId => {
      expect(mappedTopicIds).toContain(topicId);
    });
  });

  it('total interests equals total topics', () => {
    expect(INTERESTS.length).toBe(TOPICS.length);
  });
});

describe('Expected interest-topic mappings', () => {
  const expectedMappings: Record<string, string> = {
    science: 'science-discovery',
    health: 'health-medicine',
    history: 'history-civilization',
    tech: 'technology-internet',
    nature: 'nature-wildlife',
    environment: 'climate-environment',
    space: 'space-cosmos',
    psychology: 'psychology-mind',
    'self-improvement': 'self-improvement',
    business: 'business-careers',
    money: 'finance-investing',
    trivia: 'trivia-facts',
    world: 'world-travel',
    arts: 'arts-culture',
    lifestyle: 'lifestyle-wellness',
  };

  Object.entries(expectedMappings).forEach(([interestId, expectedTopicId]) => {
    it(`interest "${interestId}" maps to topic "${expectedTopicId}"`, () => {
      const interest = INTERESTS.find(i => i.id === interestId);
      expect(interest).toBeDefined();
      expect(interest!.curriculumTopicId).toBe(expectedTopicId);
    });
  });
});

describe('Legacy curriculumTopicIds array (backwards compatibility)', () => {
  it('each interest has curriculumTopicIds array', () => {
    INTERESTS.forEach(interest => {
      expect(interest.curriculumTopicIds).toBeDefined();
      expect(Array.isArray(interest.curriculumTopicIds)).toBe(true);
    });
  });

  it('curriculumTopicIds array includes the primary curriculumTopicId', () => {
    INTERESTS.forEach(interest => {
      expect(interest.curriculumTopicIds).toContain(interest.curriculumTopicId);
    });
  });
});

// Import helper functions for testing
import {
  getCurriculumTopicsForInterests,
  getInterestById,
  getInterestForTopic,
} from '../../src/data/interests';

describe('getCurriculumTopicsForInterests', () => {
  it('returns curriculum topic IDs for selected interests', () => {
    const topicIds = getCurriculumTopicsForInterests(['science', 'health']);
    expect(topicIds).toContain('science-discovery');
    expect(topicIds).toContain('health-medicine');
    expect(topicIds.length).toBe(2);
  });

  it('returns unique topic IDs (no duplicates)', () => {
    const topicIds = getCurriculumTopicsForInterests(['science', 'science', 'health']);
    expect(topicIds.length).toBe(2);
  });

  it('returns empty array for empty input', () => {
    const topicIds = getCurriculumTopicsForInterests([]);
    expect(topicIds).toEqual([]);
  });

  it('ignores invalid interest IDs', () => {
    const topicIds = getCurriculumTopicsForInterests(['science', 'invalid-id']);
    expect(topicIds.length).toBe(1);
    expect(topicIds).toContain('science-discovery');
  });

  it('returns all topic IDs when all interests are selected', () => {
    const allInterestIds = INTERESTS.map(i => i.id);
    const topicIds = getCurriculumTopicsForInterests(allInterestIds);
    expect(topicIds.length).toBe(15);
  });
});

describe('getInterestById', () => {
  it('returns interest for valid ID', () => {
    const interest = getInterestById('science');
    expect(interest).toBeDefined();
    expect(interest!.id).toBe('science');
    expect(interest!.label).toBe('Science & Discovery');
  });

  it('returns undefined for invalid ID', () => {
    const interest = getInterestById('nonexistent');
    expect(interest).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    const interest = getInterestById('');
    expect(interest).toBeUndefined();
  });
});

describe('getInterestForTopic', () => {
  it('returns interest for valid topic ID', () => {
    const interest = getInterestForTopic('science-discovery');
    expect(interest).toBeDefined();
    expect(interest!.id).toBe('science');
  });

  it('returns undefined for invalid topic ID', () => {
    const interest = getInterestForTopic('nonexistent-topic');
    expect(interest).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    const interest = getInterestForTopic('');
    expect(interest).toBeUndefined();
  });

  it('returns correct interest for each topic', () => {
    TOPICS.forEach(topic => {
      const interest = getInterestForTopic(topic.id);
      expect(interest).toBeDefined();
      expect(interest!.curriculumTopicId).toBe(topic.id);
    });
  });
});
