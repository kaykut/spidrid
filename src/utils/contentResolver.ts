import { getArticleById } from '../data/curriculum/index';
import { useContentStore } from '../store/contentStore';
import { Question, normalizeQuestion } from '../types/learning';
import { PlaylistItem, ResolvedContent } from '../types/playlist';

/**
 * Resolve training content from curriculum article
 */
function resolveTrainingContent(contentId: string): ResolvedContent | null {
  const article = getArticleById(contentId);
  if (!article) { return null; }

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
 * Resolve reading content from imported content store
 */
function resolveReadingContent(contentId: string): ResolvedContent | null {
  const content = useContentStore.getState().getContentById(contentId);
  if (!content) { return null; }

  return {
    title: content.title,
    content: content.content,
    wordCount: content.wordCount,
    hasQuiz: false,
  };
}

/**
 * Resolve a PlaylistItem to its full content for playback
 */
export function resolveContent(item: PlaylistItem): ResolvedContent | null {
  return resolveContentById(item.contentId, item.source as 'training' | 'reading');
}

/**
 * Get content directly by ID and source (for loading without playlist item)
 */
export function resolveContentById(
  contentId: string,
  source: 'training' | 'reading'
): ResolvedContent | null {
  switch (source) {
    case 'training':
      return resolveTrainingContent(contentId);
    case 'reading':
      return resolveReadingContent(contentId);
    default:
      return null;
  }
}
