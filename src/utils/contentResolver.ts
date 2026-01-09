import { getArticleById } from '../data/curriculum/index';
import { useContentStore } from '../store/contentStore';
import { Question, normalizeQuestion } from '../types/learning';
import { PlaylistItem, ResolvedContent } from '../types/playlist';

/**
 * Resolve a PlaylistItem to its full content for playback
 */
export function resolveContent(item: PlaylistItem): ResolvedContent | null {
  if (item.source === 'training') {
    const article = getArticleById(item.contentId);
    if (!article) {return null;}

    // Normalize questions to the new format
    const normalizedQuestions: Question[] = article.questions.map(normalizeQuestion);

    return {
      title: article.title,
      content: article.content,
      wordCount: article.wordCount,
      hasQuiz: normalizedQuestions.length > 0,
      questions: normalizedQuestions,
    };
  } else if (item.source === 'reading') {
    const content = useContentStore.getState().getContentById(item.contentId);
    if (!content) {return null;}

    return {
      title: content.title,
      content: content.content,
      wordCount: content.wordCount,
      hasQuiz: false,
    };
  }

  // Learning not implemented yet
  return null;
}

/**
 * Get content directly by ID and source (for loading without playlist item)
 */
export function resolveContentById(
  contentId: string,
  source: 'training' | 'reading'
): ResolvedContent | null {
  if (source === 'training') {
    const article = getArticleById(contentId);
    if (!article) {return null;}

    const normalizedQuestions: Question[] = article.questions.map(normalizeQuestion);

    return {
      title: article.title,
      content: article.content,
      wordCount: article.wordCount,
      hasQuiz: normalizedQuestions.length > 0,
      questions: normalizedQuestions,
    };
  } else if (source === 'reading') {
    const content = useContentStore.getState().getContentById(contentId);
    if (!content) {return null;}

    return {
      title: content.title,
      content: content.content,
      wordCount: content.wordCount,
      hasQuiz: false,
    };
  }

  return null;
}
