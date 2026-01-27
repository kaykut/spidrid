#!/usr/bin/env tsx
/**
 * Generate Project Status
 *
 * Scans all 10 target languages and generates a complete translation status tensor.
 * This is the Source of Truth for the project's translation progress.
 *
 * Usage:
 *   npm run generate-project-status
 *   npx tsx scripts/generate-project-status.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  TOPIC_IDS,
  TRANSLATION_LANGUAGES,
  TopicId,
  TranslationLanguage,
  TranslationStatusTensor,
  ArticleTranslationStatus,
  load_baseline,
  load_language_topic,
  clear_caches,
} from './translation-utils';

// ============================================================
// Quiz Translation Detection (CORRECTED)
// ============================================================

/**
 * Check if quiz is ACTUALLY translated (not just copied from English)
 */
function isQuizActuallyTranslated(
  targetQuestions: any[] | undefined,
  englishQuestions: any[]
): boolean {
  if (!targetQuestions || targetQuestions.length === 0) {
    return false;
  }

  if (targetQuestions.length !== englishQuestions.length) {
    return false;
  }

  const targetFirstQuestion = targetQuestions[0]?.question || '';
  const englishFirstQuestion = englishQuestions[0]?.question || '';

  return targetFirstQuestion !== englishFirstQuestion;
}

// ============================================================
// Language Status Generator
// ============================================================

interface LanguageStats {
  totalArticles: number;
  articlesTranslated: number;
  quizzesTranslated: number;
  totalWordsEnglish: number;
  wordsTranslated: number;
}

function generateLanguageStatus(
  language: TranslationLanguage,
  baseline: ReturnType<typeof load_baseline>,
  tensor: TranslationStatusTensor
): LanguageStats {
  // Initialize language object
  if (!tensor.languages[language]) {
    tensor.languages[language] = {};
  }

  const stats: LanguageStats = {
    totalArticles: 0,
    articlesTranslated: 0,
    quizzesTranslated: 0,
    totalWordsEnglish: 0,
    wordsTranslated: 0,
  };

  // Process each topic
  for (const topicId of TOPIC_IDS) {
    // Initialize topic object
    if (!tensor.languages[language][topicId]) {
      tensor.languages[language][topicId] = {};
    }

    const englishArticles = baseline.topics[topicId];
    if (!englishArticles) continue;

    const targetArticles = load_language_topic(language, topicId as TopicId);
    const targetArticleMap = new Map(targetArticles.map((a) => [a.id, a]));

    // Process each article
    for (const englishArticle of englishArticles) {
      stats.totalArticles++;
      stats.totalWordsEnglish += englishArticle.wordCount;

      const articleId = englishArticle.id;
      const targetArticle = targetArticleMap.get(articleId);

      let wordCount = 0;
      let quizTranslated = false;
      let questionCount = 0;

      if (targetArticle) {
        wordCount = targetArticle.wordCount || 0;
        questionCount = targetArticle.questions?.length || 0;
        quizTranslated = isQuizActuallyTranslated(
          targetArticle.questions,
          englishArticle.questions
        );

        if (wordCount > 0) {
          stats.articlesTranslated++;
          stats.wordsTranslated += wordCount;
        }

        if (quizTranslated) {
          stats.quizzesTranslated++;
        }
      }

      const status: ArticleTranslationStatus = {
        wordCount,
        quizTranslated,
        questionCount,
        lastUpdated: Date.now(),
      };

      tensor.languages[language][topicId][articleId] = status;
    }
  }

  return stats;
}

// ============================================================
// Main Function
// ============================================================

function generateProjectStatus(): void {
  console.log('\n📊 GENERATING FULL PROJECT STATUS');
  console.log('═'.repeat(60));

  // Clear caches for fresh read
  clear_caches();

  // Load English baseline
  const baseline = load_baseline();

  // Initialize tensor
  const tensor: TranslationStatusTensor = {
    version: '1.0.0',
    generatedAt: Date.now(),
    languages: {},
    stats: {
      totalArticles: 0,
      articlesTranslated: 0,
      quizzesTranslated: 0,
      totalWords: 0,
      wordsTranslated: 0,
    },
  };

  // Calculate totals (across all languages)
  const articlesPerLanguage = 195;
  const totalLanguages = TRANSLATION_LANGUAGES.length;
  tensor.stats.totalArticles = articlesPerLanguage * totalLanguages;

  // Get total English words
  let totalEnglishWords = 0;
  for (const topicId of TOPIC_IDS) {
    const articles = baseline.topics[topicId];
    if (articles) {
      totalEnglishWords += articles.reduce((sum, a) => sum + a.wordCount, 0);
    }
  }
  tensor.stats.totalWords = totalEnglishWords * totalLanguages;

  // Process each language
  console.log('\n  Language    Articles          Quizzes           Words');
  console.log('  ──────────  ────────────────  ────────────────  ────────────────');

  let totalArticlesTranslated = 0;
  let totalQuizzesTranslated = 0;
  let totalWordsTranslated = 0;

  for (const language of TRANSLATION_LANGUAGES) {
    const stats = generateLanguageStatus(language, baseline, tensor);

    totalArticlesTranslated += stats.articlesTranslated;
    totalQuizzesTranslated += stats.quizzesTranslated;
    totalWordsTranslated += stats.wordsTranslated;

    const articlePct = ((stats.articlesTranslated / articlesPerLanguage) * 100).toFixed(0);
    const quizPct = ((stats.quizzesTranslated / articlesPerLanguage) * 100).toFixed(0);
    const wordPct = ((stats.wordsTranslated / totalEnglishWords) * 100).toFixed(0);

    const articleStatus = stats.articlesTranslated === articlesPerLanguage ? '✓' : ' ';
    const quizStatus = stats.quizzesTranslated === articlesPerLanguage ? '✓' : ' ';

    console.log(
      `  ${language.toUpperCase().padEnd(10)}  ${String(stats.articlesTranslated).padStart(3)}/${articlesPerLanguage} (${articlePct.padStart(3)}%) ${articleStatus}  ` +
      `${String(stats.quizzesTranslated).padStart(3)}/${articlesPerLanguage} (${quizPct.padStart(3)}%) ${quizStatus}  ` +
      `${stats.wordsTranslated.toLocaleString().padStart(7)}/${totalEnglishWords.toLocaleString()} (${wordPct}%)`
    );
  }

  // Update global stats
  tensor.stats.articlesTranslated = totalArticlesTranslated;
  tensor.stats.quizzesTranslated = totalQuizzesTranslated;
  tensor.stats.wordsTranslated = totalWordsTranslated;

  // Write tensor
  const statusPath = path.join(__dirname, '..', 'translation-status.json');
  fs.writeFileSync(statusPath, JSON.stringify(tensor, null, 2), 'utf-8');

  // Print summary
  console.log('  ──────────  ────────────────  ────────────────  ────────────────');

  const totalArticlePct = ((totalArticlesTranslated / tensor.stats.totalArticles) * 100).toFixed(1);
  const totalQuizPct = ((totalQuizzesTranslated / tensor.stats.totalArticles) * 100).toFixed(1);

  console.log(`  TOTAL       ${totalArticlesTranslated}/${tensor.stats.totalArticles} (${totalArticlePct}%)   ` +
    `${totalQuizzesTranslated}/${tensor.stats.totalArticles} (${totalQuizPct}%)   ` +
    `${totalWordsTranslated.toLocaleString()}/${tensor.stats.totalWords.toLocaleString()}`);

  console.log('\n═'.repeat(60));
  console.log(`✓ Status saved to: translation-status.json`);
  console.log(`  Generated at: ${new Date(tensor.generatedAt).toISOString()}\n`);

  // Print pending work summary
  const pendingArticles = tensor.stats.totalArticles - totalArticlesTranslated;
  const pendingQuizzes = tensor.stats.totalArticles - totalQuizzesTranslated;

  if (pendingArticles > 0 || pendingQuizzes > 0) {
    console.log('📋 PENDING WORK:');
    console.log(`   Articles: ${pendingArticles} remaining`);
    console.log(`   Quizzes:  ${pendingQuizzes} remaining\n`);
  } else {
    console.log('🎉 ALL TRANSLATIONS COMPLETE!\n');
  }
}

// ============================================================
// CLI Entry Point
// ============================================================

generateProjectStatus();
