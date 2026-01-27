# Quiz Translation Automation Plan

**Status:** 249/1950 quizzes translated (12.8%)
**Remaining:** 1701 quizzes across 10 languages × 15 topics

## Problem

- Skill tool invocations don't execute translations - they only acknowledge
- Manual Task tool invocations work but are slow (2-3 min each)
- 1701 quizzes × 3 minutes = 85 hours of sequential work
- Need massive parallelization to complete in reasonable time

## Solution: Automated Translation Script

Create `/Users/kaya/Coding/devoro-ui-localization/scripts/auto-translate-all-quizzes.ts` that:

1. Reads `pending-quiz-translations.json` (1701 tasks)
2. For each batch of 50 quizzes:
   - Reads English quiz from `src/data/curriculum/en/{topic}.ts`
   - Calls Translation API (DeepL or Claude) in parallel
   - Validates translated JSON structure
   - Updates target language file
   - Updates `translation-status.json`
3. Runs in batches until all 1701 complete

## Implementation

```typescript
#!/usr/bin/env tsx
/**
 * Automated Quiz Translation Script
 *
 * Translates all pending quizzes using DeepL API or Claude API
 * Processes in batches of 50 for parallelization
 */

import * as fs from 'fs';
import { load_baseline, get_article_from_file, update_language_topic_file } from './translation-utils';

interface PendingTask {
  articleId: string;
  topicId: string;
  language: string;
  title: string;
}

const LANGUAGE_NAMES = {
  cs: 'čeština', de: 'Deutsch', nl: 'Nederlands', fr: 'français',
  it: 'italiano', pl: 'polski', pt: 'português', ro: 'română',
  es: 'español', sv: 'svenska'
};

async function translateQuiz(
  questions: any[],
  title: string,
  language: string
): Promise<any[]> {
  // Call Translation API (DeepL or Claude Haiku)
  // Format: Same JSON structure, just translate text fields
  // Return: Validated translated quiz array
}

async function processQuizBatch(tasks: PendingTask[]) {
  const baseline = load_baseline();
  const promises = tasks.map(async (task) => {
    try {
      // 1. Get English quiz
      const englishArticle = baseline.topics[task.topicId]?.find(a => a.id === task.articleId);
      if (!englishArticle?.questions) return null;

      // 2. Translate quiz
      const translatedQuestions = await translateQuiz(
        englishArticle.questions,
        task.title,
        task.language
      );

      // 3. Update target file
      const targetArticle = get_article_from_file(task.articleId, task.language as any);
      if (targetArticle) {
        targetArticle.questions = translatedQuestions;
        update_language_topic_file(
          task.language as any,
          task.topicId as any,
          [targetArticle]
        );
      }

      console.log(`✓ Translated ${task.articleId} to ${task.language}`);
      return { success: true, task };
    } catch (error) {
      console.error(`✗ Failed ${task.articleId} (${task.language}):`, error);
      return { success: false, task, error };
    }
  });

  return await Promise.all(promises);
}

async function main() {
  const pending: PendingTask[] = JSON.parse(
    fs.readFileSync('pending-quiz-translations.json', 'utf-8')
  );

  console.log(`\n🚀 AUTO-TRANSLATE ALL QUIZZES`);
  console.log(`═`.repeat(60));
  console.log(`Total pending: ${pending.length} quizzes\n`);

  const BATCH_SIZE = 50;
  let completed = 0;

  for (let i = 0; i < pending.length; i += BATCH_SIZE) {
    const batch = pending.slice(i, i + BATCH_SIZE);
    console.log(`\nProcessing batch ${Math.floor(i / BATCH_SIZE) + 1}...`);

    const results = await processQuizBatch(batch);
    completed += results.filter(r => r?.success).length;

    console.log(`Progress: ${completed}/${pending.length} (${((completed/pending.length)*100).toFixed(1)}%)`);

    // Rate limiting: wait 1 second between batches
    if (i + BATCH_SIZE < pending.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log(`\n✓ Translation complete!`);
  console.log(`  Successful: ${completed}/${pending.length}`);
  console.log(`\nRun: npm run generate-project-status\n`);
}

main();
```

## API Options

### Option 1: DeepL API (Recommended)
- Cost: $5/M words (~$10 total for all quizzes)
- Quality: Excellent for European languages
- Speed: Fast, supports batching
- Setup: `npm install deepl-node`, get API key from deepl.com

### Option 2: Claude Haiku API
- Cost: ~$0.25/M tokens (~$5 total)
- Quality: Excellent, understands JSON structure
- Speed: Fast enough for batching
- Setup: Use existing Anthropic SDK

### Option 3: Manual with Claude Code Skills
- Cost: $0 (uses existing Claude subscription)
- Quality: Excellent
- Speed: Very slow (85+ hours sequential)
- Setup: None needed, but not scalable

## Recommended Approach

1. **Implement automated script** with DeepL or Claude API
2. **Run overnight** - should complete in 2-4 hours with batching
3. **Validate results** with `npm run generate-project-status`
4. **Spot check** 10-20 random quizzes for quality
5. **Re-run failed** translations if any

## Next Steps

1. Get API key (DeepL or Anthropic)
2. Implement `auto-translate-all-quizzes.ts`
3. Test with 10 quizzes
4. Run full automation
5. Verify 100% completion

## Cost Estimate

- DeepL API: ~$10 for 1701 quizzes
- Claude Haiku API: ~$5 for 1701 quizzes
- Time: 2-4 hours with automation vs 85+ hours manual

**Recommendation:** Invest $5-10 in API automation to save 80+ hours of manual work.
