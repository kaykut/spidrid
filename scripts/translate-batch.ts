#!/usr/bin/env tsx
/**
 * Batch Translation Script
 *
 * Translates curriculum articles using Google Gemini API.
 * Supports content and quiz translation with status tracking.
 *
 * Usage:
 *   npm run translate-batch -- --language de --mode sequential --limit 1
 *   npm run translate-batch -- --language fr --mode batch
 *   npm run translate-batch -- --language es --type quiz --dry-run
 *   npm run translate-batch -- --language de --use-cache  # Retry from cached responses
 */

import * as fs from 'fs';
import * as path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Article, Question } from '../src/types/learning';
import {
  TOPIC_IDS,
  LANGUAGE_NAMES,
  TopicId,
  TranslationLanguage,
  TranslationStatusTensor,
  BaselineArticle,
  load_baseline,
  extract_original_article,
  get_article_from_file,
  update_language_topic_file,
  calculate_wordcount,
  loadStatusTensor,
  saveStatusTensor,
  recalculateStats,
  isValidLanguage,
  isValidTopicId,
} from './translation-utils';

// ============================================================
// Types
// ============================================================

interface CLIArgs {
  language: TranslationLanguage;
  topic?: TopicId;
  mode: 'sequential' | 'batch';
  limit?: number;
  type: 'content' | 'quiz' | 'both';
  dryRun: boolean;
  useCache: boolean;  // Retry from cached API responses without calling API
  batchSize: number;  // Parallel requests per batch (default 5)
  delayMs: number;    // Delay between batches in ms (default 500)
}

interface TranslationTask {
  articleId: string;
  topicId: TopicId;
  language: TranslationLanguage;
  type: 'content' | 'quiz';
  englishTitle: string;
  englishWordCount: number;
}

interface TranslationResult {
  task: TranslationTask;
  success: boolean;
  wordCount?: number;
  questionCount?: number;
  error?: string;
  durationMs?: number;
}

// ============================================================
// CLI Argument Parsing
// ============================================================

function parseArgs(): CLIArgs {
  const args = process.argv.slice(2);

  const getArg = (name: string): string | undefined => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 ? args[idx + 1] : undefined;
  };

  const hasFlag = (name: string): boolean => args.includes(`--${name}`);

  const language = getArg('language');
  if (!language) {
    console.error('Error: --language is required');
    console.error('Usage: npm run translate-batch -- --language <code> [options]');
    console.error('Languages: cs, de, nl, fr, it, pl, pt, ro, es, sv');
    process.exit(1);
  }

  if (!isValidLanguage(language) || language === 'en') {
    console.error(`Error: Invalid language "${language}"`);
    console.error('Valid languages: cs, de, nl, fr, it, pl, pt, ro, es, sv');
    process.exit(1);
  }

  const topic = getArg('topic');
  if (topic && !isValidTopicId(topic)) {
    console.error(`Error: Invalid topic "${topic}"`);
    process.exit(1);
  }

  const mode = (getArg('mode') || 'sequential') as 'sequential' | 'batch';
  if (mode !== 'sequential' && mode !== 'batch') {
    console.error('Error: --mode must be "sequential" or "batch"');
    process.exit(1);
  }

  const limitStr = getArg('limit');
  const limit = limitStr ? parseInt(limitStr, 10) : undefined;

  const typeArg = getArg('type') || 'both';
  if (!['content', 'quiz', 'both'].includes(typeArg)) {
    console.error('Error: --type must be "content", "quiz", or "both"');
    process.exit(1);
  }

  const batchSizeStr = getArg('batch-size');
  const batchSize = batchSizeStr ? parseInt(batchSizeStr, 10) : 5;  // Default 5

  const delayStr = getArg('delay');
  const delayMs = delayStr ? parseInt(delayStr, 10) : 500;  // Default 500ms

  return {
    language: language as TranslationLanguage,
    topic: topic as TopicId | undefined,
    mode,
    limit,
    type: typeArg as 'content' | 'quiz' | 'both',
    dryRun: hasFlag('dry-run'),
    useCache: hasFlag('use-cache'),
    batchSize,
    delayMs,
  };
}

// ============================================================
// Response Caching (Recovery Mechanism)
// ============================================================

const CACHE_DIR = path.join(__dirname, 'cache');

function getCachePath(language: string, articleId: string, type: 'content' | 'quiz'): string {
  return path.join(CACHE_DIR, language, `${articleId}-${type}.txt`);
}

function saveToCache(language: string, articleId: string, type: 'content' | 'quiz', response: string): void {
  const cachePath = getCachePath(language, articleId, type);
  const cacheDir = path.dirname(cachePath);

  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  fs.writeFileSync(cachePath, response, 'utf-8');
}

function loadFromCache(language: string, articleId: string, type: 'content' | 'quiz'): string | null {
  const cachePath = getCachePath(language, articleId, type);

  if (!fs.existsSync(cachePath)) {
    return null;
  }

  return fs.readFileSync(cachePath, 'utf-8');
}

function clearCache(language: string, articleId: string, type: 'content' | 'quiz'): void {
  const cachePath = getCachePath(language, articleId, type);

  if (fs.existsSync(cachePath)) {
    fs.unlinkSync(cachePath);
  }
}

// ============================================================
// Retry Logic with Exponential Backoff
// ============================================================

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 2000;  // 2 seconds

async function withRetry<T>(
  operation: () => Promise<T>,
  _operationName: string
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      const isRateLimit = error.message?.includes('429') ||
                          error.message?.includes('rate') ||
                          error.message?.includes('quota') ||
                          error.message?.includes('Resource exhausted');

      if (isRateLimit && attempt < MAX_RETRIES) {
        const delayMs = BASE_DELAY_MS * Math.pow(2, attempt);  // 2s, 4s, 8s
        console.log(`    ⏳ Rate limited, retrying in ${delayMs / 1000}s... (attempt ${attempt + 1}/${MAX_RETRIES})`);
        await delay(delayMs);
      } else if (!isRateLimit) {
        // Non-rate-limit error, don't retry
        throw error;
      }
    }
  }

  throw lastError;
}

// ============================================================
// Task Discovery
// ============================================================

function findPendingTasks(args: CLIArgs): TranslationTask[] {
  const tensor = loadStatusTensor();
  const baseline = load_baseline();
  const tasks: TranslationTask[] = [];

  const topics = args.topic ? [args.topic] : TOPIC_IDS;

  for (const topicId of topics) {
    const topicArticles = baseline.topics[topicId];
    if (!topicArticles) continue;

    for (const article of topicArticles) {
      const status = tensor.languages[args.language]?.[topicId]?.[article.id];
      const wordCount = status?.wordCount ?? 0;

      // Content pending: wordCount = 0 (not attempted)
      // Skip failed: wordCount = -1
      if (args.type !== 'quiz' && wordCount === 0) {
        tasks.push({
          articleId: article.id,
          topicId: topicId as TopicId,
          language: args.language,
          type: 'content',
          englishTitle: article.title,
          englishWordCount: article.wordCount,
        });
      }

      // Quiz pending: content done (wordCount > 0) but quizTranslated = false
      if (args.type !== 'content' && wordCount > 0 && !status?.quizTranslated) {
        tasks.push({
          articleId: article.id,
          topicId: topicId as TopicId,
          language: args.language,
          type: 'quiz',
          englishTitle: article.title,
          englishWordCount: article.wordCount,
        });
      }
    }
  }

  // Apply limit if specified
  if (args.limit && args.limit > 0) {
    return tasks.slice(0, args.limit);
  }

  return tasks;
}

/**
 * Create batches ensuring no two tasks in the same batch share a topic.
 * This prevents race conditions when parallel tasks update the same file.
 */
function createSafeBatches(tasks: TranslationTask[], batchSize: number): TranslationTask[][] {
  const batches: TranslationTask[][] = [];
  const remaining = [...tasks];

  while (remaining.length > 0) {
    const batch: TranslationTask[] = [];
    const topicsInBatch = new Set<string>();

    // Fill batch with tasks from different topics
    for (let i = 0; i < remaining.length && batch.length < batchSize; ) {
      const task = remaining[i];
      if (!topicsInBatch.has(task.topicId)) {
        batch.push(task);
        topicsInBatch.add(task.topicId);
        remaining.splice(i, 1);
      } else {
        i++;
      }
    }

    if (batch.length > 0) {
      batches.push(batch);
    } else {
      // Safety: if we can't make progress, break (shouldn't happen)
      break;
    }
  }

  return batches;
}

// ============================================================
// Prompt Builders
// ============================================================

function buildContentPrompt(english: BaselineArticle, language: TranslationLanguage): string {
  const langName = LANGUAGE_NAMES[language];

  return `Translate the following article to ${langName}:

**Article ID:** ${english.id}
**Title:** ${english.title}

**Content:**
${english.content}

---

**Translation Instructions:**
- Translate for native speakers of ${langName}
- Maintain educational, clear, and engaging tone
- Preserve technical accuracy
- Adapt cultural references where appropriate (e.g., convert measurements if common in target culture)
- Preserve paragraph structure exactly

Return ONLY in this exact format (no markdown code blocks, no extra text):

Title: [translated title]

Content:
[translated content with all paragraphs preserved]`;
}

function buildQuizPrompt(english: BaselineArticle, language: TranslationLanguage): string {
  const langName = LANGUAGE_NAMES[language];

  const formattedQuestions = english.questions.map((q, idx) => {
    let formatted = `Question ${idx + 1}:\n  id: "${q.id}"\n  type: "${q.type}"\n  question: "${q.question}"\n`;

    if (q.type === 'single_choice' && 'options' in q) {
      formatted += '  options:\n';
      (q.options as string[]).forEach((opt, i) => {
        const marker = i === (q as any).correctIndex ? ' ← correct' : '';
        formatted += `    [${i}] "${opt}"${marker}\n`;
      });
    } else if (q.type === 'multiple_select' && 'options' in q) {
      formatted += '  options:\n';
      (q.options as string[]).forEach((opt, i) => {
        const marker = (q as any).correctIndices?.includes(i) ? ' ← correct' : '';
        formatted += `    [${i}] "${opt}"${marker}\n`;
      });
    } else if (q.type === 'true_false') {
      formatted += `  correctAnswer: ${(q as any).correctAnswer}\n`;
    } else if (q.type === 'numeric') {
      formatted += `  correctValue: ${(q as any).correctValue}\n`;
      if ((q as any).unit) formatted += `  unit: "${(q as any).unit}"\n`;
    }

    return formatted;
  }).join('\n');

  // Build example using actual first question
  const firstQ = english.questions[0];
  let exampleJson = '';
  if (firstQ.type === 'single_choice' && 'options' in firstQ) {
    exampleJson = `[
  {
    "id": "${firstQ.id}",
    "type": "single_choice",
    "question": "[TRANSLATED]",
    "options": ["[TRANSLATED]", "[TRANSLATED]", "[TRANSLATED]", "[TRANSLATED]"],
    "correctIndex": ${(firstQ as any).correctIndex}
  },
  ...
]`;
  } else {
    exampleJson = `[
  {
    "id": "${firstQ.id}",
    "type": "${firstQ.type}",
    "question": "[TRANSLATED]",
    ...
  },
  ...
]`;
  }

  return `Translate these quiz questions to ${langName}:

**Article:** ${english.title}

**Questions to translate:**
${formattedQuestions}

**CRITICAL INSTRUCTIONS:**
1. Translate ONLY the "question" text and "options" text
2. Keep these fields EXACTLY as shown above: id, type, correctIndex, correctIndices, correctAnswer, correctValue

Return ONLY a valid JSON array with ALL ${english.questions.length} questions:

${exampleJson}

NO markdown. NO explanations. ONLY raw JSON array.`;
}

// ============================================================
// Response Parsers
// ============================================================

function parseContentResponse(text: string): { title: string; content: string } {
  // Extract title
  const titleMatch = text.match(/^Title:\s*(.+?)(?:\n|$)/m);
  if (!titleMatch) {
    throw new Error('Could not parse title from response');
  }
  const title = titleMatch[1].trim();

  // Extract content (everything after "Content:")
  const contentMatch = text.match(/Content:\s*\n([\s\S]+)$/m);
  if (!contentMatch) {
    throw new Error('Could not parse content from response');
  }
  const content = contentMatch[1].trim();

  return { title, content };
}

function parseQuizResponse(text: string, englishQuestions: Question[]): Question[] {
  // Strip markdown code blocks if present
  let jsonStr = text.trim();
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }

  let parsed: any[];
  try {
    parsed = JSON.parse(jsonStr);
  } catch (e) {
    throw new Error(`Failed to parse quiz JSON: ${e}`);
  }

  if (!Array.isArray(parsed)) {
    throw new Error('Quiz response is not an array');
  }

  if (parsed.length !== englishQuestions.length) {
    throw new Error(`Question count mismatch: got ${parsed.length}, expected ${englishQuestions.length}`);
  }

  // Validate and merge with English structure to preserve all fields
  const validated: Question[] = parsed.map((q, i) => {
    const eng = englishQuestions[i];

    // Validate critical fields weren't changed
    if (q.id !== eng.id) {
      throw new Error(`Question ${i + 1}: ID changed from "${eng.id}" to "${q.id}"`);
    }
    if (q.type !== eng.type) {
      throw new Error(`Question ${i + 1}: type changed from "${eng.type}" to "${q.type}"`);
    }

    // Build the translated question, preserving answer fields from English
    const translated: any = {
      id: eng.id,
      type: eng.type,
      question: q.question,
    };

    if (eng.type === 'single_choice' && 'options' in eng) {
      translated.options = q.options;
      translated.correctIndex = (eng as any).correctIndex;
    } else if (eng.type === 'multiple_select' && 'options' in eng) {
      translated.options = q.options;
      translated.correctIndices = (eng as any).correctIndices;
    } else if (eng.type === 'true_false') {
      translated.correctAnswer = (eng as any).correctAnswer;
    } else if (eng.type === 'numeric') {
      translated.correctValue = (eng as any).correctValue;
      translated.tolerance = (eng as any).tolerance;
      if ((eng as any).min !== undefined) translated.min = (eng as any).min;
      if ((eng as any).max !== undefined) translated.max = (eng as any).max;
      if ((eng as any).step !== undefined) translated.step = (eng as any).step;
      if ((eng as any).unit !== undefined) translated.unit = (eng as any).unit;
    }

    return translated as Question;
  });

  return validated;
}

// ============================================================
// Translation Functions
// ============================================================

async function translateContent(
  task: TranslationTask,
  model: any,
  useCache: boolean
): Promise<TranslationResult> {
  const startTime = Date.now();

  try {
    const english = extract_original_article(task.articleId, 'en');
    if (!english) {
      throw new Error(`Article not found in baseline: ${task.articleId}`);
    }

    let text: string;

    // Check cache first if useCache flag is set
    const cached = loadFromCache(task.language, task.articleId, 'content');
    if (useCache && cached) {
      text = cached;
    } else {
      // Call API with retry logic
      const prompt = buildContentPrompt(english, task.language);
      text = await withRetry(async () => {
        const result = await model.generateContent(prompt);
        return result.response.text();
      }, `content:${task.articleId}`);

      // Save to cache IMMEDIATELY after API call (before parsing)
      saveToCache(task.language, task.articleId, 'content', text);
    }

    const { title, content } = parseContentResponse(text);
    const wordCount = calculate_wordcount(content);

    // Build translated article (preserve all metadata from English)
    const translated: Article = {
      id: english.id,
      topicId: english.topicId,
      title,
      content,
      wordCount,
      difficulty: english.difficulty,
      questions: english.questions, // Keep English until quiz translated
      articleType: english.articleType,
      orderIndex: english.orderIndex,
    };

    if (english.certificationLength) {
      translated.certificationLength = english.certificationLength;
    }

    // Save to file
    update_language_topic_file(task.language, task.topicId, [translated]);

    // Clear cache on success (response was successfully processed)
    clearCache(task.language, task.articleId, 'content');

    return {
      task,
      success: true,
      wordCount,
      durationMs: Date.now() - startTime,
    };
  } catch (error: any) {
    return {
      task,
      success: false,
      error: error.message,
      durationMs: Date.now() - startTime,
    };
  }
}

async function translateQuiz(
  task: TranslationTask,
  model: any,
  useCache: boolean
): Promise<TranslationResult> {
  const startTime = Date.now();

  try {
    const english = extract_original_article(task.articleId, 'en');
    if (!english) {
      throw new Error(`Article not found in baseline: ${task.articleId}`);
    }

    const current = get_article_from_file(task.articleId, task.language);
    if (!current) {
      throw new Error(`Content must be translated before quiz: ${task.articleId}`);
    }

    let text: string;

    // Check cache first if useCache flag is set
    const cached = loadFromCache(task.language, task.articleId, 'quiz');
    if (useCache && cached) {
      text = cached;
    } else {
      // Call API with retry logic
      const prompt = buildQuizPrompt(english, task.language);
      text = await withRetry(async () => {
        const result = await model.generateContent(prompt);
        return result.response.text();
      }, `quiz:${task.articleId}`);

      // Save to cache IMMEDIATELY after API call (before parsing)
      saveToCache(task.language, task.articleId, 'quiz', text);
    }

    const translatedQuestions = parseQuizResponse(text, english.questions);

    // Update article with translated quiz
    const updated: Article = { ...current, questions: translatedQuestions };
    update_language_topic_file(task.language, task.topicId, [updated]);

    // Clear cache on success
    clearCache(task.language, task.articleId, 'quiz');

    return {
      task,
      success: true,
      questionCount: translatedQuestions.length,
      durationMs: Date.now() - startTime,
    };
  } catch (error: any) {
    return {
      task,
      success: false,
      error: error.message,
      durationMs: Date.now() - startTime,
    };
  }
}

// ============================================================
// Status Update
// ============================================================

function updateStatus(tensor: TranslationStatusTensor, result: TranslationResult): void {
  const { language, topicId, articleId, type } = result.task;

  // Ensure path exists
  tensor.languages[language] ??= {};
  tensor.languages[language][topicId] ??= {};
  tensor.languages[language][topicId][articleId] ??= { wordCount: 0, quizTranslated: false, questionCount: 0 };

  const status = tensor.languages[language][topicId][articleId];

  if (type === 'content') {
    status.wordCount = result.success ? result.wordCount! : -1;
  }
  if (type === 'quiz') {
    status.quizTranslated = result.success;
    if (result.success && result.questionCount) {
      status.questionCount = result.questionCount;
    }
  }
  status.lastUpdated = Date.now();

  recalculateStats(tensor);
}

// ============================================================
// Logging
// ============================================================

function logSuccess(result: TranslationResult): void {
  const { task, wordCount, questionCount, durationMs } = result;
  const duration = durationMs ? `(${(durationMs / 1000).toFixed(1)}s)` : '';

  if (task.type === 'content') {
    console.log(`  ✓ ${task.articleId} -> ${task.language}: ${wordCount} words ${duration}`);
  } else {
    console.log(`  ✓ ${task.articleId} quiz -> ${task.language}: ${questionCount} questions ${duration}`);
  }
}

function logError(result: TranslationResult): void {
  const { task, error, durationMs } = result;
  const duration = durationMs ? `(${(durationMs / 1000).toFixed(1)}s)` : '';
  console.error(`  ✗ ${task.articleId} ${task.type} -> ${task.language}: ${error} ${duration}`);
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================
// Main
// ============================================================

async function main(): Promise<void> {
  console.log('\n🌍 Translation Batch Processor\n');

  // Parse CLI arguments
  const args = parseArgs();
  console.log(`Language: ${args.language} (${LANGUAGE_NAMES[args.language]})`);
  console.log(`Mode: ${args.mode}${args.mode === 'batch' ? ` (${args.batchSize} parallel, ${args.delayMs}ms delay)` : ''}`);
  console.log(`Type: ${args.type}`);
  if (args.topic) console.log(`Topic: ${args.topic}`);
  if (args.limit) console.log(`Limit: ${args.limit}`);
  if (args.useCache) console.log(`Cache: Using cached responses (no API calls)`);
  console.log('');

  // Find pending tasks
  const tasks = findPendingTasks(args);

  if (tasks.length === 0) {
    console.log('✓ No pending translations found.\n');
    return;
  }

  console.log(`Found ${tasks.length} pending translations:\n`);

  // Dry run - just list tasks
  if (args.dryRun) {
    tasks.forEach(t => console.log(`  ${t.type.padEnd(7)} ${t.articleId}`));
    console.log('\nDry run - no translations performed.\n');
    return;
  }

  // Initialize Gemini (API key required unless using cache-only mode)
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey && !args.useCache) {
    console.error('Error: GEMINI_API_KEY environment variable not set');
    console.error('Use --use-cache to retry from cached responses without API calls');
    process.exit(1);
  }

  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
  const model = genAI?.getGenerativeModel({ model: 'gemini-2.0-flash' }) ?? null;

  // Load status tensor
  const tensor = loadStatusTensor();

  // Process tasks
  let successCount = 0;
  let failCount = 0;

  if (args.mode === 'sequential') {
    for (const task of tasks) {
      console.log(`Translating ${task.type}: ${task.articleId}${args.useCache ? ' (from cache)' : ''}`);

      const result = task.type === 'content'
        ? await translateContent(task, model, args.useCache)
        : await translateQuiz(task, model, args.useCache);

      updateStatus(tensor, result);
      saveStatusTensor(tensor);

      if (result.success) {
        logSuccess(result);
        successCount++;
      } else {
        logError(result);
        failCount++;
      }
    }
  } else {
    // Batch mode with safe batching (no two tasks in same batch share a topic)
    const safeBatches = createSafeBatches(tasks, args.batchSize);

    for (let batchIdx = 0; batchIdx < safeBatches.length; batchIdx++) {
      const batch = safeBatches[batchIdx];
      console.log(`\nBatch ${batchIdx + 1}/${safeBatches.length}: ${batch.map(t => t.articleId).join(', ')}${args.useCache ? ' (from cache)' : ''}`);

      const results = await Promise.allSettled(
        batch.map(task =>
          task.type === 'content'
            ? translateContent(task, model, args.useCache)
            : translateQuiz(task, model, args.useCache)
        )
      );

      for (let j = 0; j < results.length; j++) {
        const settledResult = results[j];
        const task = batch[j];

        if (settledResult.status === 'fulfilled') {
          const result = settledResult.value;
          updateStatus(tensor, result);
          saveStatusTensor(tensor);  // Save immediately after each result

          if (result.success) {
            logSuccess(result);
            successCount++;
          } else {
            logError(result);
            failCount++;
          }
        } else {
          const errorResult: TranslationResult = {
            task,
            success: false,
            error: settledResult.reason?.message || 'Unknown error',
          };
          updateStatus(tensor, errorResult);
          saveStatusTensor(tensor);  // Save immediately after each result
          logError(errorResult);
          failCount++;
        }
      }

      // Delay between batches to avoid rate limits
      if (batchIdx < safeBatches.length - 1) {
        await delay(args.delayMs);
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`\n✓ Complete: ${successCount} succeeded, ${failCount} failed`);
  console.log(`  Articles: ${tensor.stats.articlesTranslated}/${tensor.stats.totalArticles}`);
  console.log(`  Quizzes: ${tensor.stats.quizzesTranslated}/${tensor.stats.totalArticles}`);
  console.log('');
}

// Run
main().catch(error => {
  console.error('\n✗ Fatal error:', error);
  process.exit(1);
});
