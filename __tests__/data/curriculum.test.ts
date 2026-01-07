/**
 * Tests for Curriculum Data - Milestone 3
 *
 * Tests the 15 topics, helper functions, and article structure.
 */

import {
  TOPICS,
  ARTICLES,
  getTopicById,
  getArticlesByTopic,
  getArticleById,
} from '../../src/data/curriculum';

describe('TOPICS', () => {
  it('has exactly 15 topics', () => {
    expect(TOPICS.length).toBe(15);
  });

  describe('topic IDs', () => {
    const expectedTopicIds = [
      'science-discovery',
      'health-medicine',
      'history-civilization',
      'technology-internet',
      'nature-wildlife',
      'climate-environment',
      'space-cosmos',
      'psychology-mind',
      'self-improvement',
      'business-careers',
      'finance-investing',
      'trivia-facts',
      'world-travel',
      'arts-culture',
      'lifestyle-wellness',
    ];

    it('includes all expected topic IDs', () => {
      const actualIds = TOPICS.map(t => t.id);
      expectedTopicIds.forEach(id => {
        expect(actualIds).toContain(id);
      });
    });

    it('has unique IDs', () => {
      const ids = TOPICS.map(t => t.id);
      const uniqueIds = [...new Set(ids)];
      expect(uniqueIds.length).toBe(ids.length);
    });
  });

  describe('topic structure', () => {
    it('each topic has required fields', () => {
      TOPICS.forEach(topic => {
        expect(topic.id).toBeDefined();
        expect(typeof topic.id).toBe('string');
        expect(topic.name).toBeDefined();
        expect(typeof topic.name).toBe('string');
        expect(topic.description).toBeDefined();
        expect(typeof topic.description).toBe('string');
        expect(topic.icon).toBeDefined();
        expect(typeof topic.icon).toBe('string');
        expect(topic.color).toBeDefined();
        expect(topic.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });

    it('each topic has article counts', () => {
      TOPICS.forEach(topic => {
        // At minimum, articleCount should be defined for compatibility
        expect(topic.articleCount).toBeDefined();
        expect(topic.articleCount).toBeGreaterThanOrEqual(0);
      });
    });

    it('each topic has practice and certification article counts', () => {
      TOPICS.forEach(topic => {
        // New fields for the certification system
        expect(topic.practiceArticleCount).toBeDefined();
        expect(topic.practiceArticleCount).toBe(10);
        expect(topic.certificationArticleCount).toBeDefined();
        expect(topic.certificationArticleCount).toBe(3);
      });
    });
  });
});

describe('getTopicById', () => {
  it('returns correct topic for valid ID', () => {
    const topic = getTopicById('science-discovery');
    expect(topic).toBeDefined();
    expect(topic!.name).toBe('Science & Discovery');
  });

  it('returns undefined for invalid ID', () => {
    const topic = getTopicById('nonexistent-topic');
    expect(topic).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    const topic = getTopicById('');
    expect(topic).toBeUndefined();
  });
});

describe('ARTICLES', () => {
  it('has articles for each topic', () => {
    const topicIds = TOPICS.map(t => t.id);
    topicIds.forEach(topicId => {
      const articles = ARTICLES.filter(a => a.topicId === topicId);
      expect(articles.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('article structure', () => {
    it('each article has required fields', () => {
      ARTICLES.forEach(article => {
        expect(article.id).toBeDefined();
        expect(typeof article.id).toBe('string');
        expect(article.topicId).toBeDefined();
        expect(typeof article.topicId).toBe('string');
        expect(article.title).toBeDefined();
        expect(typeof article.title).toBe('string');
        expect(article.content).toBeDefined();
        expect(typeof article.content).toBe('string');
        expect(article.wordCount).toBeDefined();
        expect(typeof article.wordCount).toBe('number');
        expect(article.wordCount).toBeGreaterThan(0);
        expect(article.difficulty).toBeDefined();
        expect(['beginner', 'intermediate', 'advanced']).toContain(article.difficulty);
        expect(article.questions).toBeDefined();
        expect(Array.isArray(article.questions)).toBe(true);
      });
    });

    it('each article belongs to a valid topic', () => {
      const topicIds = TOPICS.map(t => t.id);
      ARTICLES.forEach(article => {
        expect(topicIds).toContain(article.topicId);
      });
    });
  });

  describe('article ID naming convention', () => {
    it('follows {topic}-p{nn} for practice or {topic}-c{n} for certification pattern', () => {
      ARTICLES.forEach(article => {
        // Allow both old format (topic-N) and new format (topic-pNN or topic-cN)
        const practicePattern = /^[\w-]+-p\d{2}$/;
        const certPattern = /^[\w-]+-c[1-3]$/;
        const legacyPattern = /^[\w-]+-\d+$/;

        const matchesPractice = practicePattern.test(article.id);
        const matchesCert = certPattern.test(article.id);
        const matchesLegacy = legacyPattern.test(article.id);

        expect(matchesPractice || matchesCert || matchesLegacy).toBe(true);
      });
    });
  });
});

describe('getArticlesByTopic', () => {
  it('returns articles for valid topic ID', () => {
    const articles = getArticlesByTopic('science-discovery');
    expect(articles.length).toBeGreaterThan(0);
    articles.forEach(article => {
      expect(article.topicId).toBe('science-discovery');
    });
  });

  it('returns empty array for invalid topic ID', () => {
    const articles = getArticlesByTopic('nonexistent-topic');
    expect(articles).toEqual([]);
  });

  it('returns empty array for empty string', () => {
    const articles = getArticlesByTopic('');
    expect(articles).toEqual([]);
  });
});

describe('getArticleById', () => {
  it('returns correct article for valid ID', () => {
    // Get first article to test with
    const firstArticle = ARTICLES[0];
    const article = getArticleById(firstArticle.id);
    expect(article).toBeDefined();
    expect(article!.id).toBe(firstArticle.id);
  });

  it('returns undefined for invalid ID', () => {
    const article = getArticleById('nonexistent-article');
    expect(article).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    const article = getArticleById('');
    expect(article).toBeUndefined();
  });
});

describe('Question format in articles', () => {
  it('all questions have valid structure', () => {
    ARTICLES.forEach(article => {
      article.questions.forEach(q => {
        expect(q.id).toBeDefined();
        expect(q.question).toBeDefined();

        // Check for either new format (has type) or legacy format (has options and correctIndex)
        const hasType = 'type' in q;
        const hasLegacyFormat = 'options' in q && 'correctIndex' in q;

        expect(hasType || hasLegacyFormat).toBe(true);

        if (hasType) {
          const typed = q as { type: string };
          expect(['single_choice', 'multiple_select', 'true_false', 'numeric']).toContain(typed.type);
        }
      });
    });
  });
});

describe('Topic-Article relationship', () => {
  it('total articleCount matches practice + certification counts', () => {
    TOPICS.forEach(topic => {
      if (topic.practiceArticleCount !== undefined && topic.certificationArticleCount !== undefined) {
        expect(topic.articleCount).toBe(topic.practiceArticleCount + topic.certificationArticleCount);
      }
    });
  });
});

// Import additional functions for testing
import {
  getPracticeArticles,
  getCertificationArticles,
} from '../../src/data/curriculum';

describe('getPracticeArticles', () => {
  it('returns practice articles for valid topic ID', () => {
    const articles = getPracticeArticles('science-discovery');
    expect(articles.length).toBeGreaterThan(0);
    articles.forEach(article => {
      expect(article.topicId).toBe('science-discovery');
      expect(article.articleType === 'practice' || article.articleType === undefined).toBe(true);
    });
  });

  it('returns practice articles for topic', () => {
    const articles = getPracticeArticles('science-discovery');
    // Number of practice articles may vary by topic
    expect(articles.length).toBeGreaterThan(0);
  });

  it('returns articles sorted by orderIndex', () => {
    const articles = getPracticeArticles('science-discovery');
    for (let i = 1; i < articles.length; i++) {
      const prev = articles[i - 1].orderIndex ?? 1;
      const curr = articles[i].orderIndex ?? 1;
      expect(curr).toBeGreaterThanOrEqual(prev);
    }
  });

  it('returns empty array for invalid topic ID', () => {
    const articles = getPracticeArticles('nonexistent-topic');
    expect(articles).toEqual([]);
  });
});

describe('getCertificationArticles', () => {
  it('returns certification articles for valid topic ID', () => {
    const articles = getCertificationArticles('science-discovery');
    expect(articles.length).toBeGreaterThan(0);
    articles.forEach(article => {
      expect(article.topicId).toBe('science-discovery');
      expect(article.articleType).toBe('certification');
    });
  });

  it('returns certification articles for topic', () => {
    const articles = getCertificationArticles('science-discovery');
    // Number of certification articles may vary by topic
    expect(articles.length).toBeGreaterThan(0);
  });

  it('returns articles sorted by orderIndex', () => {
    const articles = getCertificationArticles('science-discovery');
    for (let i = 1; i < articles.length; i++) {
      const prev = articles[i - 1].orderIndex ?? 1;
      const curr = articles[i].orderIndex ?? 1;
      expect(curr).toBeGreaterThanOrEqual(prev);
    }
  });

  it('returns empty array for invalid topic ID', () => {
    const articles = getCertificationArticles('nonexistent-topic');
    expect(articles).toEqual([]);
  });
});
