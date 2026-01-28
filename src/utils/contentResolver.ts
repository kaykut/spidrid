import { getArticleById } from '../data/curriculum/index';
import { useContentStore } from '../store/contentStore';
import { useCurriculumStore } from '../store/curriculumStore';
import { useGeneratedStore } from '../store/generatedStore';
import { ContentSource } from '../types/contentList';
import { Question, normalizeQuestion } from '../types/learning';

/**
 * Resolved content ready for playback.
 */
export interface ResolvedContent {
  title: string;
  content: string;
  wordCount: number;
  hasQuiz: boolean;
  questions?: Question[];
}

/**
 * Resolve training content from curriculum article
 */
function resolveTrainingContent(contentId: string): ResolvedContent | null {
  const article = getArticleById(contentId);
  if (!article) {
    return null;
  }

  const normalizedQuestions: Question[] = article.questions.map(normalizeQuestion);

  return {
    title: article.title,
    content: article.content,
    wordCount: article.wordCount,
    hasQuiz: normalizedQuestions.length > 0,
    questions: normalizedQuestions,
  };
}

/**
 * Resolve imported content from content store
 */
function resolveImportedContent(contentId: string): ResolvedContent | null {
  const content = useContentStore.getState().getContentById(contentId);
  if (!content || (content.processingStatus ?? 'ready') !== 'ready') {
    return null;
  }

  return {
    title: content.title,
    content: content.content,
    wordCount: content.wordCount,
    hasQuiz: false,
  };
}

/**
 * Resolve generated article from generated store
 */
function resolveGeneratedContent(contentId: string): ResolvedContent | null {
  const article = useGeneratedStore.getState().getArticleById(contentId);
  if (!article || article.status !== 'complete') {
    return null;
  }

  return {
    title: article.title,
    content: article.content,
    wordCount: article.wordCount,
    hasQuiz: article.questions.length > 0,
    questions: article.questions,
  };
}

/**
 * Resolve curriculum article from curriculum store
 * contentId format: "curriculumId:articleIndex"
 */
function resolveCurriculumContent(contentId: string): ResolvedContent | null {
  const [curriculumId, articleIndexStr] = contentId.split(':');
  const articleIndex = parseInt(articleIndexStr, 10);

  if (!curriculumId || isNaN(articleIndex)) {
    return null;
  }

  const curriculum = useCurriculumStore.getState().getCurriculum(curriculumId);
  if (!curriculum) {
    return null;
  }

  const article = curriculum.articles[articleIndex];
  if (!article || article.generationStatus !== 'generated') {
    return null;
  }

  return {
    title: article.title,
    content: article.content,
    wordCount: article.wordCount,
    hasQuiz: article.questions.length > 0,
    questions: article.questions,
  };
}

/**
 * Get content by ID and ContentSource type
 */
export function resolveContentBySource(
  contentId: string,
  source: ContentSource
): ResolvedContent | null {
  switch (source) {
    case 'training':
      return resolveTrainingContent(contentId);
    case 'imported':
      return resolveImportedContent(contentId);
    case 'generated':
      return resolveGeneratedContent(contentId);
    case 'curriculum':
      return resolveCurriculumContent(contentId);
    default:
      return null;
  }
}
