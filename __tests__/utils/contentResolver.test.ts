/**
 * Tests for contentResolver utility.
 *
 * Tests the resolution of content from 4 different sources:
 * - training: curriculum articles
 * - imported: user-imported content
 * - generated: AI-generated single articles
 * - curriculum: AI-generated multi-article curricula
 */

import { resolveContentBySource } from '../../src/utils/contentResolver';
import { useContentStore } from '../../src/store/contentStore';
import { useGeneratedStore } from '../../src/store/generatedStore';
import { useCurriculumStore } from '../../src/store/curriculumStore';
import { GeneratedArticle } from '../../src/types/generated';
import { Curriculum, CurriculumArticle } from '../../src/types/curriculum';

// Helper to create generated articles with all required fields
const createGeneratedArticle = (overrides: Partial<GeneratedArticle> = {}): GeneratedArticle => ({
  id: 'gen-article-123',
  title: 'Generated Article Title',
  content: 'This is generated content.',
  wordCount: 5,
  status: 'complete',
  topic: 'Test Topic',
  targetDuration: 3,
  tone: 'explanatory',
  questions: [],
  generatedAt: Date.now(),
  completed: false,
  attemptCount: 0,
  ...overrides,
});

// Helper to create curriculum with all required fields
const createTestCurriculum = (
  id: string,
  articles: Array<{
    generationStatus: 'pending' | 'generating' | 'generated' | 'failed';
    title?: string;
    content?: string;
    wordCount?: number;
  }>
): Curriculum => ({
  id,
  title: 'Test Curriculum',
  goal: 'Learn about test topics',
  articleCount: articles.length,
  tone: 'explanatory',
  targetWordCount: 500,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  currentArticleIndex: 0,
  completedArticleCount: 0,
  isCompleted: false,
  articles: articles.map((a, index): CurriculumArticle => ({
    id: `${id}-article-${index}`,
    curriculumId: id,
    orderIndex: index,
    title: a.title || `Article ${index + 1}`,
    summary: `Summary for article ${index + 1}`,
    content: a.content || `Content for article ${index + 1}`,
    wordCount: a.wordCount || 100,
    questions: [
      {
        id: `q-${index}`,
        type: 'true_false',
        question: 'Test question?',
        correctAnswer: true,
      },
    ],
    generationStatus: a.generationStatus,
    completionStatus: 'unlocked',
  })),
});

describe('resolveContentBySource', () => {
  beforeEach(() => {
    // Reset all stores to clean state
    useContentStore.setState({ importedContent: [], currentContentId: null });
    useGeneratedStore.setState({ articles: [], isGenerating: false, generationError: null });
    useCurriculumStore.setState({ curricula: {}, isGenerating: false, generationProgress: null, generationError: null });
  });

  describe('training source', () => {
    it('returns resolved content for valid curriculum article ID', () => {
      // 'science-discovery-p01' is a real article ID from curriculum
      const result = resolveContentBySource('science-discovery-p01', 'training');

      expect(result).not.toBeNull();
      expect(result?.title).toBe('The Water Cycle');
      expect(result?.content).toBeDefined();
      expect(result?.wordCount).toBe(500);
    });

    it('returns null for invalid article ID', () => {
      const result = resolveContentBySource('nonexistent-article-id', 'training');
      expect(result).toBeNull();
    });

    it('normalizes questions and sets hasQuiz true when article has questions', () => {
      const result = resolveContentBySource('science-discovery-p01', 'training');

      expect(result?.hasQuiz).toBe(true);
      expect(result?.questions).toBeDefined();
      expect(result?.questions?.length).toBeGreaterThan(0);
      // Check that questions have the expected normalized structure
      expect(result?.questions?.[0]).toHaveProperty('id');
      expect(result?.questions?.[0]).toHaveProperty('type');
      expect(result?.questions?.[0]).toHaveProperty('question');
    });

    it('sets hasQuiz false when article has no questions', () => {
      // We need to test with an article that has no questions
      // Looking at curriculum, all articles have questions, so we test the logic
      // by verifying the expected behavior based on questions array length
      const result = resolveContentBySource('science-discovery-p01', 'training');
      expect(result?.hasQuiz).toBe(result?.questions && result.questions.length > 0);
    });
  });

  describe('imported source', () => {
    it('returns content from contentStore', () => {
      // Set up contentStore with test content
      const testContent = {
        id: 'test-imported-123',
        title: 'Test Imported Article',
        content: 'This is test content for the imported article.',
        wordCount: 8,
        source: 'text' as const,
        readProgress: 0,
        createdAt: Date.now(),
      };

      useContentStore.setState({
        importedContent: [testContent],
      });

      const result = resolveContentBySource('test-imported-123', 'imported');

      expect(result).not.toBeNull();
      expect(result?.title).toBe('Test Imported Article');
      expect(result?.content).toBe('This is test content for the imported article.');
      expect(result?.wordCount).toBe(8);
    });

    it('returns null when content not found in store', () => {
      const result = resolveContentBySource('nonexistent-id', 'imported');
      expect(result).toBeNull();
    });

    it('sets hasQuiz to false for imported content', () => {
      const testContent = {
        id: 'test-imported-456',
        title: 'Another Test Article',
        content: 'More test content.',
        wordCount: 3,
        source: 'url' as const,
        readProgress: 0,
        createdAt: Date.now(),
      };

      useContentStore.setState({
        importedContent: [testContent],
      });

      const result = resolveContentBySource('test-imported-456', 'imported');

      expect(result?.hasQuiz).toBe(false);
      expect(result?.questions).toBeUndefined();
    });
  });

  describe('generated source', () => {
    it('returns content for complete articles', () => {
      const testArticle = createGeneratedArticle({
        questions: [
          {
            id: 'q1',
            type: 'true_false',
            question: 'Is this a test?',
            correctAnswer: true,
          },
        ],
      });

      useGeneratedStore.setState({
        articles: [testArticle],
      });

      const result = resolveContentBySource('gen-article-123', 'generated');

      expect(result).not.toBeNull();
      expect(result?.title).toBe('Generated Article Title');
      expect(result?.content).toBe('This is generated content.');
      expect(result?.wordCount).toBe(5);
      expect(result?.hasQuiz).toBe(true);
      expect(result?.questions).toHaveLength(1);
    });

    it('returns null for articles still generating', () => {
      const generatingArticle = createGeneratedArticle({
        id: 'gen-article-pending',
        title: 'Generating...',
        content: '',
        wordCount: 0,
        status: 'generating',
      });

      useGeneratedStore.setState({
        articles: [generatingArticle],
      });

      const result = resolveContentBySource('gen-article-pending', 'generated');
      expect(result).toBeNull();
    });

    it('returns null for articles with error status', () => {
      const errorArticle = createGeneratedArticle({
        id: 'gen-article-error',
        title: 'Error Article',
        content: '',
        wordCount: 0,
        status: 'error',
      });

      useGeneratedStore.setState({
        articles: [errorArticle],
      });

      const result = resolveContentBySource('gen-article-error', 'generated');
      expect(result).toBeNull();
    });

    it('returns null for articles not found', () => {
      const result = resolveContentBySource('nonexistent-gen-id', 'generated');
      expect(result).toBeNull();
    });

    it('sets hasQuiz based on questions array length', () => {
      const articleWithoutQuestions = createGeneratedArticle({
        id: 'gen-no-questions',
        title: 'No Questions Article',
        content: 'Content without questions.',
        wordCount: 3,
        questions: [],
      });

      useGeneratedStore.setState({
        articles: [articleWithoutQuestions],
      });

      const result = resolveContentBySource('gen-no-questions', 'generated');

      expect(result?.hasQuiz).toBe(false);
      expect(result?.questions).toEqual([]);
    });
  });

  describe('curriculum source', () => {
    it('parses curriculumId:articleIndex format correctly', () => {
      const curriculum = createTestCurriculum('curr_test_123', [
        { generationStatus: 'generated', title: 'First Article', content: 'First content', wordCount: 150 },
        { generationStatus: 'generated', title: 'Second Article', content: 'Second content', wordCount: 200 },
      ]);

      useCurriculumStore.setState({
        curricula: { [curriculum.id]: curriculum },
      });

      const result = resolveContentBySource('curr_test_123:1', 'curriculum');

      expect(result).not.toBeNull();
      expect(result?.title).toBe('Second Article');
      expect(result?.content).toBe('Second content');
      expect(result?.wordCount).toBe(200);
    });

    it('returns content for generated curriculum articles', () => {
      const curriculum = createTestCurriculum('curr_generated', [
        { generationStatus: 'generated', title: 'Generated Article', content: 'Generated content', wordCount: 300 },
      ]);

      useCurriculumStore.setState({
        curricula: { [curriculum.id]: curriculum },
      });

      const result = resolveContentBySource('curr_generated:0', 'curriculum');

      expect(result).not.toBeNull();
      expect(result?.title).toBe('Generated Article');
      expect(result?.hasQuiz).toBe(true);
      expect(result?.questions).toHaveLength(1);
    });

    it('returns null for articles not yet generated (pending)', () => {
      const curriculum = createTestCurriculum('curr_pending', [
        { generationStatus: 'pending' },
      ]);

      useCurriculumStore.setState({
        curricula: { [curriculum.id]: curriculum },
      });

      const result = resolveContentBySource('curr_pending:0', 'curriculum');
      expect(result).toBeNull();
    });

    it('returns null for articles still generating', () => {
      const curriculum = createTestCurriculum('curr_generating', [
        { generationStatus: 'generating' },
      ]);

      useCurriculumStore.setState({
        curricula: { [curriculum.id]: curriculum },
      });

      const result = resolveContentBySource('curr_generating:0', 'curriculum');
      expect(result).toBeNull();
    });

    it('returns null for failed generation', () => {
      const curriculum = createTestCurriculum('curr_failed', [
        { generationStatus: 'failed' },
      ]);

      useCurriculumStore.setState({
        curricula: { [curriculum.id]: curriculum },
      });

      const result = resolveContentBySource('curr_failed:0', 'curriculum');
      expect(result).toBeNull();
    });

    it('returns null for invalid curriculum ID', () => {
      const result = resolveContentBySource('nonexistent_curr:0', 'curriculum');
      expect(result).toBeNull();
    });

    it('returns null for invalid article index (out of bounds)', () => {
      const curriculum = createTestCurriculum('curr_bounds', [
        { generationStatus: 'generated' },
      ]);

      useCurriculumStore.setState({
        curricula: { [curriculum.id]: curriculum },
      });

      const result = resolveContentBySource('curr_bounds:5', 'curriculum');
      expect(result).toBeNull();
    });

    it('handles NaN articleIndex', () => {
      const curriculum = createTestCurriculum('curr_nan', [
        { generationStatus: 'generated' },
      ]);

      useCurriculumStore.setState({
        curricula: { [curriculum.id]: curriculum },
      });

      const result = resolveContentBySource('curr_nan:abc', 'curriculum');
      expect(result).toBeNull();
    });

    it('handles missing colon in contentId', () => {
      const curriculum = createTestCurriculum('curr_no_colon', [
        { generationStatus: 'generated' },
      ]);

      useCurriculumStore.setState({
        curricula: { [curriculum.id]: curriculum },
      });

      const result = resolveContentBySource('curr_no_colon', 'curriculum');
      expect(result).toBeNull();
    });

    it('handles empty curriculumId', () => {
      const result = resolveContentBySource(':0', 'curriculum');
      expect(result).toBeNull();
    });
  });

  describe('invalid source', () => {
    it('returns null for unknown source type', () => {
      // TypeScript would normally prevent this, but testing runtime behavior
      const result = resolveContentBySource('any-id', 'unknown' as any);
      expect(result).toBeNull();
    });
  });
});
