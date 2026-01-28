import {
  TOPICS,
  ARTICLES,
  getTopicById,
  getArticlesByTopic,
  getArticleById,
  getPracticeArticles,
  getCertificationArticles,
} from '../../src/data/curriculum';

describe('curriculum exports', () => {
  it('re-exports curriculum data helpers', () => {
    expect(Array.isArray(TOPICS)).toBe(true);
    expect(Array.isArray(ARTICLES)).toBe(true);
    expect(typeof getTopicById).toBe('function');
    expect(typeof getArticlesByTopic).toBe('function');
    expect(typeof getArticleById).toBe('function');
  });

  it('returns articles by topic and article id', () => {
    const firstTopic = TOPICS[0];
    expect(firstTopic).toBeTruthy();

    const topicArticles = getArticlesByTopic(firstTopic.id);
    expect(topicArticles.length).toBeGreaterThan(0);

    const firstArticle = topicArticles[0];
    const resolved = getArticleById(firstArticle.id);
    expect(resolved?.id).toBe(firstArticle.id);
  });

  it('returns practice and certification articles', () => {
    const firstTopic = TOPICS[0];
    const practiceArticles = getPracticeArticles(firstTopic.id);
    const certificationArticles = getCertificationArticles(firstTopic.id);

    expect(practiceArticles.length).toBeGreaterThan(0);
    expect(certificationArticles.length).toBeGreaterThan(0);
  });
});
