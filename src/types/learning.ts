// Learning Mode Types

export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  articleCount: number;
}

export interface Article {
  id: string;
  topicId: string;
  title: string;
  content: string;
  wordCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: ComprehensionQuestion[];
}

export interface ComprehensionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface ArticleProgress {
  articleId: string;
  completed: boolean;
  comprehensionScore: number; // 0-100
  highestWPM: number;
  lastReadAt: number;
}

export interface TopicProgress {
  topicId: string;
  articlesCompleted: number;
  totalArticles: number;
  averageScore: number;
}
