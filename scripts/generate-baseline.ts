#!/usr/bin/env tsx

/**
 * Generate curriculum-baseline-full.json from English source files
 *
 * This creates a complete snapshot of the English curriculum that serves
 * as the source of truth for all translations.
 *
 * Usage: npm run generate-baseline
 */

import * as fs from 'fs';
import * as path from 'path';
import { TOPIC_IDS, load_language_topic, type CurriculumBaseline, type TopicId } from './translation-utils';

function generateBaseline(): void {
  console.log('Generating curriculum baseline from English source files...\n');

  const baseline: CurriculumBaseline = {
    version: '1.0.0',
    generatedAt: Date.now(),
    topics: {},
  };

  let totalArticles = 0;
  let totalWords = 0;
  let totalQuestions = 0;

  // Load all English topics
  for (const topicId of TOPIC_IDS) {
    console.log(`Loading topic: ${topicId}`);
    const articles = load_language_topic('en', topicId as TopicId);

    if (articles.length === 0) {
      console.warn(`  ⚠  No articles found for ${topicId}`);
      continue;
    }

    // Convert to baseline format
    baseline.topics[topicId] = articles.map(article => ({
      id: article.id,
      topicId: article.topicId,
      title: article.title,
      content: article.content,
      wordCount: article.wordCount,
      difficulty: article.difficulty,
      questions: article.questions as import('../src/types/learning').Question[],
      articleType: article.articleType,
      orderIndex: article.orderIndex,
      certificationLength: article.certificationLength,
    }));

    const articleCount = articles.length;
    const wordCount = articles.reduce((sum, a) => sum + a.wordCount, 0);
    const questionCount = articles.reduce((sum, a) => sum + a.questions.length, 0);

    totalArticles += articleCount;
    totalWords += wordCount;
    totalQuestions += questionCount;

    console.log(`  ✓ ${articleCount} articles, ${wordCount.toLocaleString()} words, ${questionCount} questions`);
  }

  // Create exports directory if it doesn't exist
  const exportsDir = path.join(__dirname, 'exports');
  if (!fs.existsSync(exportsDir)) {
    fs.mkdirSync(exportsDir, { recursive: true });
  }

  // Write baseline file
  const outputPath = path.join(exportsDir, 'curriculum-baseline-full.json');
  fs.writeFileSync(outputPath, JSON.stringify(baseline, null, 2), 'utf-8');

  console.log(`\n✓ Baseline generated: ${outputPath}`);
  console.log(`  Total: ${totalArticles} articles`);
  console.log(`  Words: ${totalWords.toLocaleString()}`);
  console.log(`  Questions: ${totalQuestions}`);

  // Verify the output
  const fileStats = fs.statSync(outputPath);
  console.log(`  File size: ${(fileStats.size / 1024 / 1024).toFixed(2)} MB`);
}

// Run the generator
try {
  generateBaseline();
} catch (error) {
  console.error('\n✗ Error generating baseline:', error);
  process.exit(1);
}
