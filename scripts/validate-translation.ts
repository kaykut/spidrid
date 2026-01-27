#!/usr/bin/env tsx

/**
 * Validate a single translated article against baseline
 *
 * Checks:
 * - Article structure integrity
 * - Word count deviation (<20%)
 * - Quiz structure match
 * - No missing required fields
 *
 * Usage:
 *   npm run validate-translation <article-id> <language>
 *   npm run validate-translation science-discovery-p01 fr
 */

import {
  type TranslationLanguage,
  get_article_from_file,
  extract_original_article,
  validate_wordcount_deviation,
  is_quiz_translated,
} from './translation-utils';

function validateTranslation(articleId: string, language: TranslationLanguage): void {
  console.log(`Validating ${articleId} (${language})...\n`);

  const article = get_article_from_file(articleId, language);
  const original = extract_original_article(articleId, 'en');

  if (!article) {
    console.error('✗ Article not found in language file');
    process.exit(1);
  }

  if (!original) {
    console.error('✗ Original article not found in baseline');
    process.exit(1);
  }

  let errors = 0;
  let warnings = 0;

  // Check required fields
  if (!article.title || article.title.trim().length === 0) {
    console.error('✗ Missing or empty title');
    errors++;
  } else {
    console.log(`✓ Title: "${article.title.substring(0, 50)}${article.title.length > 50 ? '...' : ''}"`);
  }

  if (!article.content || article.content.trim().length === 0) {
    console.error('✗ Missing or empty content');
    errors++;
  } else {
    console.log(`✓ Content: ${article.content.length} characters`);
  }

  if (!article.wordCount || article.wordCount === 0) {
    console.error('✗ Missing or zero wordCount');
    errors++;
  }

  // Check word count deviation
  if (article.wordCount > 0 && original.wordCount > 0) {
    const wcValidation = validate_wordcount_deviation(original.wordCount, article.wordCount);
    if (!wcValidation.valid) {
      console.warn(`⚠ ${wcValidation.message}`);
      warnings++;
    } else {
      console.log(`✓ Word count: ${article.wordCount} (baseline: ${original.wordCount}, deviation: ${wcValidation.deviation.toFixed(1)}%)`);
    }
  }

  // Check quiz
  const quizValid = is_quiz_translated(articleId, language);
  if (!quizValid) {
    console.warn('⚠ Quiz not translated or invalid structure');
    warnings++;
  } else {
    console.log(`✓ Quiz: ${article.questions.length} questions (matches baseline: ${original.questions.length})`);

    // Validate each question
    for (let i = 0; i < article.questions.length; i++) {
      const q = article.questions[i];
      const origQ = original.questions[i];

      if (!q.question || q.question.trim().length === 0) {
        console.error(`  ✗ Question ${i + 1}: Missing question text`);
        errors++;
      }

      // Get question type (handle legacy ComprehensionQuestion without type field)
      const qType = 'type' in q ? q.type : 'single_choice';

      // Type-specific validation
      if (qType === 'single_choice' && 'options' in q) {
        if (!q.options || q.options.length === 0) {
          console.error(`  ✗ Question ${i + 1}: Missing options`);
          errors++;
        } else if ('options' in origQ && q.options.length !== origQ.options.length) {
          console.error(`  ✗ Question ${i + 1}: Option count mismatch (${q.options.length} vs ${origQ.options.length})`);
          errors++;
        } else {
          console.log(`  ✓ Question ${i + 1}: ${qType}, ${q.options.length} options`);
        }

        if ('correctIndex' in q && 'correctIndex' in origQ && q.correctIndex !== origQ.correctIndex) {
          console.error(`  ✗ Question ${i + 1}: correctIndex changed (${q.correctIndex} vs ${origQ.correctIndex})`);
          errors++;
        }
      }

      if (qType === 'multiple_select' && 'options' in q) {
        if (!q.options || q.options.length === 0) {
          console.error(`  ✗ Question ${i + 1}: Missing options`);
          errors++;
        } else if ('options' in origQ && q.options.length !== origQ.options.length) {
          console.error(`  ✗ Question ${i + 1}: Option count mismatch`);
          errors++;
        } else {
          console.log(`  ✓ Question ${i + 1}: ${qType}, ${q.options.length} options`);
        }

        if ('correctIndices' in q && 'correctIndices' in origQ) {
          if (JSON.stringify(q.correctIndices.sort()) !== JSON.stringify(origQ.correctIndices.sort())) {
            console.error(`  ✗ Question ${i + 1}: correctIndices changed`);
            errors++;
          }
        }
      }

      if (qType === 'true_false') {
        if ('correctAnswer' in q && 'correctAnswer' in origQ && q.correctAnswer !== origQ.correctAnswer) {
          console.error(`  ✗ Question ${i + 1}: correctAnswer changed`);
          errors++;
        } else {
          console.log(`  ✓ Question ${i + 1}: ${qType}`);
        }
      }

      if (qType === 'numeric') {
        if ('correctValue' in q && 'correctValue' in origQ && q.correctValue !== origQ.correctValue) {
          console.error(`  ✗ Question ${i + 1}: correctValue changed`);
          errors++;
        } else {
          console.log(`  ✓ Question ${i + 1}: ${qType}`);
        }
      }
    }
  }

  // Check metadata preservation
  if (article.id !== original.id) {
    console.error('✗ Article ID changed');
    errors++;
  }

  if (article.topicId !== original.topicId) {
    console.error('✗ Topic ID changed');
    errors++;
  }

  if (article.difficulty !== original.difficulty) {
    console.error('✗ Difficulty changed');
    errors++;
  }

  if (article.articleType !== original.articleType) {
    console.error('✗ Article type changed');
    errors++;
  }

  if (article.orderIndex !== original.orderIndex) {
    console.error('✗ Order index changed');
    errors++;
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  if (errors > 0) {
    console.error(`\n✗ Validation failed with ${errors} error(s) and ${warnings} warning(s)`);
    process.exit(1);
  } else if (warnings > 0) {
    console.warn(`\n⚠ Validation passed with ${warnings} warning(s)`);
  } else {
    console.log('\n✓ Validation passed - article is correctly translated');
  }
}

// Parse args and run
const articleId = process.argv[2];
const language = process.argv[3] as TranslationLanguage;

if (!articleId || !language) {
  console.error('Usage: npm run validate-translation <article-id> <language>');
  console.error('Example: npm run validate-translation science-discovery-p01 fr');
  process.exit(1);
}

try {
  validateTranslation(articleId, language);
} catch (error) {
  console.error('\n✗ Validation error:', error);
  process.exit(1);
}
