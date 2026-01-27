# Curriculum Content Translation Architecture

**Version**: 1.0
**Date**: 2026-01-21
**Status**: Approved for M1

This document defines the technical architecture for translating all curriculum content (195 articles across 15 topics, ~370,000 words) into 10 European languages (Czech, Dutch, French, German, Italian, Polish, Portuguese, Romanian, Spanish, Swedish).

## Table of Contents

1. [Storage Approach](#storage-approach)
2. [Content Loading API Design](#content-loading-api-design)
3. [Fallback Mechanism](#fallback-mechanism)
4. [Translation File Format](#translation-file-format)
5. [File Structure Diagram](#file-structure-diagram)
6. [Integration Points](#integration-points)
7. [Implementation Roadmap](#implementation-roadmap)

---

## Storage Approach

### Decision: Mirrored File Structure (Option A)

We will create parallel directory trees for each language, mirroring the existing curriculum structure. Each language folder will contain the same 15 topic files with translated content.

#### Rationale

**Advantages**:
1. **Type Safety**: Full TypeScript type checking at compile time ensures Article interfaces are correctly implemented across all languages
2. **Consistency**: Maintains the existing TypeScript-first approach used throughout the Devoro codebase
3. **Developer Experience**: Easy navigation and familiar structure for contributors; clear separation by language
4. **Scalability**: Adding new languages only requires creating a new folder and updating one configuration file
5. **Validation**: TypeScript compiler catches structural errors before runtime (missing fields, incorrect types)
6. **IDE Support**: Full autocomplete, type hints, and refactoring support for all translated content

**Trade-offs**:
- **Bundle Size**: All languages included in bundle by default
  - **Mitigation**: Dynamic imports with lazy loading (addressed in M6)
  - **Measurement**: Production bundle analysis will guide optimization strategy
- **Duplication**: Metadata (IDs, difficulty, orderIndex) duplicated across languages
  - **Acceptable**: Enables independent updates per language without cross-language dependencies

#### Rejected Alternatives

**Option B: Database/JSON Approach**
- Store translations in JSON files indexed by article ID and language
- **Rejected because**:
  - Loses compile-time type safety
  - Requires runtime validation (performance cost + complexity)
  - Harder to catch structural errors during development
  - Inconsistent with existing TypeScript-first patterns

**Option C: Hybrid Approach**
- Keep TypeScript for English, use JSON for translations
- **Rejected because**:
  - Maintenance complexity: Two different systems to maintain
  - Inconsistent patterns confuse contributors
  - Type safety only for English; translations prone to runtime errors
  - Harder to validate translations against source structure

---

## Content Loading API Design

### New Service: `src/services/curriculumLoader.ts`

This service provides language-aware article loading with fallback to English.

#### API Surface

```typescript
/**
 * Get a single article by ID in the user's preferred language
 * @param id - Article ID (e.g., "science-discovery-p01")
 * @param language - Optional language override (defaults to user preference)
 * @returns Article or undefined if not found
 */
export function getArticleByIdLocalized(
  id: string,
  language?: string
): Article | undefined;

/**
 * Get all articles for a topic in the user's preferred language
 * @param topicId - Topic ID (e.g., "science-discovery")
 * @param language - Optional language override (defaults to user preference)
 * @returns Array of articles sorted by orderIndex
 */
export function getArticlesByTopicLocalized(
  topicId: string,
  language?: string
): Article[];

/**
 * Get practice articles for a topic (sorted by orderIndex 1-10)
 * @param topicId - Topic ID
 * @param language - Optional language override
 * @returns Practice articles in progression order
 */
export function getPracticeArticlesLocalized(
  topicId: string,
  language?: string
): Article[];

/**
 * Get certification articles for a topic (sorted by orderIndex 1-3)
 * @param topicId - Topic ID
 * @param language - Optional language override
 * @returns Certification articles (short, medium, long)
 */
export function getCertificationArticlesLocalized(
  topicId: string,
  language?: string
): Article[];

/**
 * Get all articles across all topics (flattened array)
 * @param language - Optional language override
 * @returns All 195 articles
 */
export function getAllArticlesLocalized(language?: string): Article[];
```

#### Language Resolution Strategy

The loader determines which language to use following this priority:

1. **Explicit parameter**: If `language` parameter is provided, use that language
2. **User preference**: Else, read `settingsStore.readingLanguage`
3. **Auto-detection handling**: If `readingLanguage === 'auto'`, default to English for curriculum content
   - **Rationale**: Curriculum content is structured and pre-translated; auto-detection is for user-imported content only
4. **Fallback**: If translation file missing or corrupted, fall back to English (see Fallback Mechanism below)

```typescript
function resolveLanguage(languageParam?: string): string {
  // 1. Explicit parameter wins
  if (languageParam && languageParam !== 'auto') {
    return languageParam;
  }

  // 2. Check user preference
  const userLanguage = useSettingsStore.getState().readingLanguage;

  // 3. Handle 'auto' mode
  if (userLanguage === 'auto') {
    return 'en'; // Default to English for structured curriculum content
  }

  return userLanguage;
}
```

#### Backward Compatibility

Existing non-localized functions remain available for legacy code:

```typescript
// Legacy functions (call localized versions with 'en')
export function getArticleById(id: string): Article | undefined {
  return getArticleByIdLocalized(id, 'en');
}

export function getArticlesByTopic(topicId: string): Article[] {
  return getArticlesByTopicLocalized(topicId, 'en');
}

// ... similar wrappers for other functions
```

This ensures components can migrate to localized versions incrementally without breaking changes.

---

## Fallback Mechanism

### Graceful Degradation Strategy

When a translation is missing or fails to load, the system gracefully falls back to English without user-facing errors.

#### Implementation

```typescript
function loadArticlesForLanguage(topicId: string, language: string): Article[] {
  try {
    // Attempt dynamic import of translated content
    const module = require(`@/data/curriculum/${language}/${topicId}.ts`);

    // Validate that module exports ARTICLES array
    if (!module.ARTICLES || !Array.isArray(module.ARTICLES)) {
      throw new Error(`Invalid module structure for ${topicId} in ${language}`);
    }

    return module.ARTICLES;

  } catch (error) {
    // Log missing translation in dev mode only (not user-facing)
    if (__DEV__) {
      console.warn(
        `[CurriculumLoader] Translation missing: ${topicId} in ${language}`,
        `Falling back to English. Error: ${error.message}`
      );
    }

    // Fallback to English
    try {
      const englishModule = require(`@/data/curriculum/en/${topicId}.ts`);
      return englishModule.ARTICLES;
    } catch (fallbackError) {
      // English should always exist; this is a critical error
      console.error(
        `[CurriculumLoader] CRITICAL: English baseline missing for ${topicId}`,
        fallbackError
      );
      return []; // Return empty array to prevent crashes
    }
  }
}
```

#### QA Tracking

Missing translations are logged in development mode, allowing the validation script (M2) to catch and report incomplete translations during QA.

**Validation Script Output Example**:
```
Validating curriculum translations...

✓ French (fr): Complete (195/195 articles)
⚠️  German (de): Incomplete (193/195 articles)
   Missing: science-discovery, health-medicine
✓ Spanish (es): Complete (195/195 articles)

Summary: 2 languages need attention
```

#### User Experience

- **Users never see errors** - fallback happens silently
- **No language-switching failures** - always loads valid content
- **Graceful degradation** - partial translations still usable (e.g., 190/195 articles translated → 190 show in target language, 5 show in English)

---

## Translation File Format

### Article Interface

The existing `Article` interface (defined in `src/types/learning.ts`) already supports all languages. No changes needed to the type definition.

```typescript
interface Article {
  // Identifiers - NEVER TRANSLATED
  id: string;                    // e.g., "science-discovery-p01"
  topicId: string;              // e.g., "science-discovery"

  // Human-readable content - TRANSLATED
  title: string;                // ✓ TRANSLATED
  content: string;              // ✓ TRANSLATED (full article text)

  // Metadata - NEVER TRANSLATED
  wordCount: number;            // ✓ RECALCULATED after translation (language expansion/contraction)
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  articleType?: 'practice' | 'certification';
  orderIndex?: number;          // 1-10 for practice, 1-3 for certification
  certificationLength?: 'short' | 'medium' | 'long';

  // Questions - PARTIALLY TRANSLATED (see below)
  questions: Question[];
}
```

### Question Translation Rules

Questions use a discriminated union with 4 types. Each type has specific translation rules:

#### 1. Single Choice Questions

```typescript
{
  id: string;                   // ✗ NOT TRANSLATED
  type: 'single_choice';        // ✗ NOT TRANSLATED (type discriminator)
  question: string;             // ✓ TRANSLATED
  options: string[];            // ✓ TRANSLATED (all options)
  correctIndex: number;         // ✗ NOT TRANSLATED (array index)
}
```

**Example**:
```typescript
// English
{
  id: "space-cosmos-p01-q1",
  type: "single_choice",
  question: "What is the closest planet to the Sun?",
  options: ["Venus", "Mercury", "Earth", "Mars"],
  correctIndex: 1
}

// French Translation
{
  id: "space-cosmos-p01-q1",        // Same
  type: "single_choice",            // Same
  question: "Quelle est la planète la plus proche du Soleil ?",  // Translated
  options: ["Vénus", "Mercure", "Terre", "Mars"],                // Translated
  correctIndex: 1                    // Same (index stays 1 for "Mercury"/"Mercure")
}
```

#### 2. Multiple Select Questions

```typescript
{
  id: string;                   // ✗ NOT TRANSLATED
  type: 'multiple_select';      // ✗ NOT TRANSLATED
  question: string;             // ✓ TRANSLATED
  options: string[];            // ✓ TRANSLATED
  correctIndices: number[];     // ✗ NOT TRANSLATED (array indices)
}
```

**Critical**: The `correctIndices` array references option positions and must remain identical across languages.

#### 3. True/False Questions

```typescript
{
  id: string;                   // ✗ NOT TRANSLATED
  type: 'true_false';           // ✗ NOT TRANSLATED
  question: string;             // ✓ TRANSLATED
  correctAnswer: boolean;       // ✗ NOT TRANSLATED (boolean value)
}
```

**Note**: The `correctAnswer` boolean (true/false) is language-independent and must not be translated.

#### 4. Numeric Questions

```typescript
{
  id: string;                   // ✗ NOT TRANSLATED
  type: 'numeric';              // ✗ NOT TRANSLATED
  question: string;             // ✓ TRANSLATED
  correctValue: number;         // ✗ NOT TRANSLATED
  tolerance: number;            // ✗ NOT TRANSLATED
  min: number;                  // ✗ NOT TRANSLATED
  max: number;                  // ✗ NOT TRANSLATED
  unit: string;                 // ✗ NOT TRANSLATED (unit symbols are international: km, kg, m, etc.)
}
```

**Example**:
```typescript
// English
{
  id: "space-cosmos-p05-q3",
  type: "numeric",
  question: "What is the distance from Earth to the Moon in kilometers?",
  correctValue: 384400,
  tolerance: 10000,
  min: 300000,
  max: 400000,
  unit: "km"
}

// German Translation
{
  id: "space-cosmos-p05-q3",                              // Same
  type: "numeric",                                        // Same
  question: "Wie groß ist die Entfernung von der Erde zum Mond in Kilometern?",  // Translated
  correctValue: 384400,                                   // Same (number)
  tolerance: 10000,                                       // Same
  min: 300000,                                            // Same
  max: 400000,                                            // Same
  unit: "km"                                              // Same (international unit symbol)
}
```

### Translation Principles

**Golden Rule**: Only translate **human-readable text strings**. Never translate:
- Identifiers (IDs, keys)
- Structural data (indices, booleans)
- Numeric values
- Type discriminators
- Metadata fields

This ensures quiz scoring logic works identically across all languages without code changes.

### Word Count Recalculation

After translation, the `wordCount` field must be recalculated to reflect the target language's word count:

```typescript
function recalculateWordCount(translatedContent: string): number {
  return translatedContent
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;
}
```

**Language Expansion Factors** (approximate):
- English → French: +15-20% words
- English → German: +10-15% words
- English → Spanish: +15-25% words
- English → Czech/Polish: +10-20% words

Validation scripts will flag articles with word count deviations >30% for manual review.

---

## File Structure Diagram

### Complete Directory Tree

```
src/data/curriculum/
│
├── en/                                   # English (source, 370K words)
│   ├── science-discovery.ts             # 13 articles (~24,500 words)
│   ├── health-medicine.ts               # 13 articles (~24,500 words)
│   ├── history-civilization.ts          # 13 articles (~24,500 words)
│   ├── technology-internet.ts           # 13 articles (~24,500 words)
│   ├── nature-wildlife.ts               # 13 articles (~24,500 words)
│   ├── climate-environment.ts           # 13 articles (~24,500 words)
│   ├── space-cosmos.ts                  # 13 articles (~24,500 words)
│   ├── psychology-mind.ts               # 13 articles (~24,500 words)
│   ├── self-improvement.ts              # 13 articles (~24,500 words)
│   ├── business-careers.ts              # 13 articles (~24,500 words)
│   ├── finance-investing.ts             # 13 articles (~24,500 words)
│   ├── trivia-facts.ts                  # 13 articles (~24,500 words)
│   ├── world-travel.ts                  # 13 articles (~24,500 words)
│   ├── arts-culture.ts                  # 13 articles (~24,500 words)
│   └── lifestyle-wellness.ts            # 13 articles (~24,500 words)
│
├── cs/                                   # Czech (čeština)
│   └── [same 15 topic files]
│
├── de/                                   # German (Deutsch)
│   └── [same 15 topic files]
│
├── nl/                                   # Dutch (Nederlands)
│   └── [same 15 topic files]
│
├── fr/                                   # French (Français)
│   └── [same 15 topic files]
│
├── it/                                   # Italian (Italiano)
│   └── [same 15 topic files]
│
├── pl/                                   # Polish (Polski)
│   └── [same 15 topic files]
│
├── pt/                                   # Portuguese (Português)
│   └── [same 15 topic files]
│
├── ro/                                   # Romanian (Română)
│   └── [same 15 topic files]
│
├── es/                                   # Spanish (Español)
│   └── [same 15 topic files]
│
├── sv/                                   # Swedish (Svenska)
│   └── [same 15 topic files]
│
├── index.ts                              # Central export hub (language-aware)
└── topics.ts                             # Topic metadata (unchanged)
```

### File Counts

- **Languages**: 11 (en + 10 translations)
- **Topic files per language**: 15
- **Total topic files**: 165 (11 × 15)
- **Articles per language**: 195 (15 topics × 13 articles)
- **Total articles**: 2,145 (11 × 195)
- **Total words**: ~4.07 million (11 × 370K)

### Topic File Structure Example

Each topic file (e.g., `science-discovery.ts`) follows this structure:

```typescript
import { Article } from '../../types/learning';

export const SCIENCE_DISCOVERY_ARTICLES: Article[] = [
  // Practice Article 1 (500 words, beginner)
  {
    id: 'science-discovery-p01',
    topicId: 'science-discovery',
    title: 'The Water Cycle',
    content: `Water moves through our planet in a continuous cycle...`,
    wordCount: 502,
    difficulty: 'beginner',
    articleType: 'practice',
    orderIndex: 1,
    questions: [
      {
        id: 'science-discovery-p01-q1',
        type: 'single_choice',
        question: 'What causes water to evaporate from oceans?',
        options: ['Wind', 'Heat from the sun', 'Gravity', 'Salt concentration'],
        correctIndex: 1,
      },
      // ... 2-4 more questions
    ],
  },

  // Practice Articles 2-10 (750w, 1000w, 1300w, 1700w, 2100w, 2500w, 2800w, 3000w, 3000w)
  // ...

  // Certification Article 1 (1000w, intermediate, short)
  {
    id: 'science-discovery-c1',
    topicId: 'science-discovery',
    title: 'Scientific Method and Experimentation',
    content: `The scientific method is a systematic approach...`,
    wordCount: 1008,
    difficulty: 'intermediate',
    articleType: 'certification',
    orderIndex: 1,
    certificationLength: 'short',
    questions: [
      // ... 5-7 questions
    ],
  },

  // Certification Articles 2-3 (2000w advanced medium, 3000w advanced long)
  // ...
];
```

This structure is identical across all 11 languages, with only `title`, `content`, `wordCount`, and `questions.question`/`questions.options` translated.

---

## Integration Points

### Existing Systems (No Changes Required)

1. **Article Type Definition** (`src/types/learning.ts`)
   - Already language-agnostic
   - No changes needed

2. **Quiz Normalization Logic** (`src/utils/quizUtils.ts`)
   - Handles discriminated union Question types
   - Works identically for all languages
   - No changes needed

3. **Progress Tracking** (`src/store/learningStore.ts`)
   - Uses article IDs as keys (language-independent)
   - No changes needed

4. **RSVP Engine** (`src/hooks/useRSVPEngine.ts`)
   - Processes text via language adapters (already multilingual)
   - No changes needed

5. **Language Adapters** (`src/services/language/adapters/`)
   - Already support 11 languages for hyphenation/tokenization
   - No changes needed

### Systems Requiring Updates (Later Milestones)

1. **Curriculum Index** (`src/data/curriculum/index.ts`) - **M2**
   - Update imports to reference `en/` folder
   - Add language-aware loading functions
   - Maintain backward compatibility with legacy functions

2. **Content Resolver** (`src/utils/contentResolver.ts`) - **M6**
   - Update `resolveTrainingContent()` to use localized loader
   - Pass language parameter through resolution pipeline

3. **Article Reader Screen** (`src/app/article/[id].tsx`) - **M6**
   - Use `getArticleByIdLocalized()` instead of `getArticleById()`

4. **Topic Screen** (`src/app/topic/[id].tsx`) - **M6**
   - Use `getArticlesByTopicLocalized()` instead of `getArticlesByTopic()`

5. **Playback Modal** (`src/app/playback.tsx`) - **M6**
   - Ensure localized articles pass through RSVP pipeline

6. **Quiz Modal** (`src/app/playback-quiz.tsx`) - **M6**
   - Verify questions render correctly in all languages
   - No logic changes needed (discriminated union handles all types)

### Data Flow After Implementation

```
User opens article
    ↓
Component calls getArticleByIdLocalized(id)
    ↓
curriculumLoader resolves language (user preference or param)
    ↓
Attempts to load from src/data/curriculum/{language}/{topic}.ts
    ↓
    ├─ Success → Return translated article
    └─ Failure → Fall back to en/ → Return English article
        ↓
Article passed to RSVP engine
    ↓
Language adapter processes text (hyphenation, tokenization)
    ↓
Display in playback modal
    ↓
After completion → Quiz shows localized questions
```

---

## Implementation Roadmap

### Milestone Sequence

1. **M1: Architecture Design** (Current)
   - ✓ Choose storage approach
   - ✓ Design API surface
   - ✓ Define translation rules
   - ✓ Document structure

2. **M2: Infrastructure Setup**
   - Create 11 language directories
   - Move English content to `en/` folder
   - Implement `curriculumLoader.ts` service
   - Add validation script
   - Generate empty templates for 10 target languages

3. **M3: English Baseline Extraction**
   - Audit all 195 articles for completeness
   - Generate JSON export for translators
   - Create glossary of technical terms (200+ terms)
   - Calculate translation costs

4. **M4: French Pilot Translation**
   - Translate all 195 articles to French (~370K words)
   - Human review of 20% of content
   - Test app with French articles
   - Document lessons learned

5. **M4.5: AI Agent Review**
   - Use Claude to review French translations
   - Identify technical term inconsistencies
   - Flag cultural appropriateness issues
   - Generate quality report

6. **M5: Batch Translation (9 Languages)**
   - Apply learnings from French pilot
   - Translate Germanic languages (de, nl, sv)
   - Translate Romance languages (it, pt, ro, es)
   - Translate Slavic languages (cs, pl)
   - Spot-check quality per language

7. **M6: Runtime Language Switching**
   - Update components to use localized loaders
   - Handle language switch mid-article
   - Optimize bundle size with lazy loading
   - Test language switching performance

8. **M7: QA & Validation**
   - Automated tests for content loading
   - Manual testing in all 11 languages
   - Performance testing
   - Accessibility testing

9. **M8: Performance Optimization**
   - Bundle size analysis
   - Implement caching strategy
   - User testing with native speakers
   - Final validation

### Success Metrics

- **Completeness**: 2,145 article files exist (195 × 11 languages)
- **Quality**: Native speaker ratings average 6/10 or higher
- **Performance**: Article load time <500ms in all languages
- **Integration**: Language switching affects both UI and curriculum seamlessly
- **Coverage**: 100% of articles available in all 11 languages

---

## Appendix: Key Files Reference

### Critical Files
- `src/types/learning.ts` - Article and Question type definitions
- `src/data/curriculum/index.ts` - Current curriculum exports
- `src/data/curriculum/science-discovery.ts` - Example topic file
- `src/store/settingsStore.ts` - User language preference
- `src/services/language/index.ts` - Language detection and adapters

### Test Files
- `__tests__/services/curriculumLoader.test.ts` - Unit tests for new loader (M2)
- `__tests__/integration/languageSwitching.test.ts` - E2E tests (M6)

### Documentation
- `/Users/kaya/Coding/devoro/PLANS.md` - ExecPlan requirements
- `/Users/kaya/Coding/devoro-ui-localization/docs/plans/2026-01-21-curriculum-translation-execplan.md` - Full implementation plan

---

**End of Architecture Document**

This architecture provides a solid foundation for translating all curriculum content while maintaining type safety, developer experience, and backward compatibility. Implementation begins with M2 (Infrastructure Setup).
