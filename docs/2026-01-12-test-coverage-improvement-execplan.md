# Test Coverage Improvement: Bring Coverage to Goal Levels

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with PLANS.md at the repository root.


## Purpose / Big Picture

After this change, the test suite will pass its coverage thresholds (84% statements, 85% lines, 84% functions, 65% branches) and the team can confidently ship code knowing critical business logic is well-tested. Currently, `npm run test:coverage` fails with coverage below thresholds. After implementation, running that same command will succeed and report green coverage metrics.

The primary gaps are in content resolution logic (how the app loads different content types for playback) and text processing (how the app tokenizes and parses text with headers and chapters). These are critical paths - bugs here break the core reading experience.


## Progress

- [x] (2026-01-12 14:30Z) M1: Create `__tests__/utils/contentResolver.test.ts` with full coverage of all 4 content sources - 23 tests, 100% coverage on contentResolver.ts
- [x] (2026-01-12 15:05Z) M2: Add `tokenizeWithParagraphs` tests to `__tests__/services/textProcessor.test.ts` - 18 tests covering paragraph detection, header detection, edge cases
- [x] (2026-01-12 15:05Z) M2: Add `mapChapterOffsetsToWordIndices` tests to `__tests__/services/textProcessor.test.ts` - 7 tests for character to word index mapping
- [x] (2026-01-12 15:05Z) M2: Add `processText` with chapters tests to `__tests__/services/textProcessor.test.ts` - 6 tests for combined chapter/header handling. textProcessor.ts now at 100% coverage
- [x] (2026-01-12 15:15Z) M3: Add test helper factories to `__tests__/helpers/testUtils.ts` - added createArticleProgress, createArticleProgressMap, createCertProgress, createFullCertProgress, createGeneratedArticle, createCurriculumArticle, createCurriculum
- [x] (2026-01-12 15:20Z) M4: Create `__tests__/hooks/useStats.test.ts` - 16 tests, 100% coverage on useStats.ts
- [x] (2026-01-12 15:25Z) M5: Create `__tests__/components/rsvp/ChapterPauseOverlay.test.tsx` - 8 tests, 100% coverage on ChapterPauseOverlay.tsx
- [ ] BLOCKED: Coverage thresholds still not passing

**Coverage progression:**
- Start: 72.25% statements, 72.31% lines, 69.89% functions
- After M2: 75.16% statements, 75.15% lines, 71.66% functions
- After M4: 75.32% statements, 75.29% lines, 72.29% functions
- After M5: 75.42% statements, 75.39% lines, 72.41% functions
- Goal: 84% statements, 85% lines, 84% functions


## Surprises & Discoveries

- **Critical Discovery**: The targeted files (contentResolver.ts, textProcessor.ts, useStats.ts, ChapterPauseOverlay.tsx) are relatively small compared to the total codebase. Achieving 100% coverage on these files only raised overall coverage by ~3%. The real coverage gap is in the component layer - most UI components in `src/components/` and `src/app/` have 0-30% coverage. These weren't identified in the initial plan.

- **Test Type Distribution**: The codebase is heavily weighted toward component code (~4000 lines in components + app) vs business logic (~2000 lines in services, utils, hooks, stores). Unit tests on business logic cannot close the coverage gap alone.

- **Type Safety in Tests**: Had to create factory functions with complete type definitions to avoid TypeScript errors. The types `GeneratedArticle`, `Curriculum`, and `CurriculumArticle` have many required properties that tests must provide.


## Decision Log

- Decision: Focus on unit tests for pure functions and stores rather than component tests
  Rationale: The test pyramid recommends more unit tests than integration/component tests. The critical gaps (contentResolver, textProcessor) are pure logic, not UI. Unit tests are faster, more reliable, and provide better error messages.
  Date/Author: 2026-01-12 / Plan Author

- Decision: Do not add E2E tests
  Rationale: User explicitly stated "no E2E tests for now". Focus effort on unit and integration layers.
  Date/Author: 2026-01-12 / Plan Author

- Decision: Test real stores with getState/setState rather than mocking
  Rationale: User principle "never mock the system under test". Zustand stores are simple enough to test directly. Only external dependencies (network, storage) should be mocked.
  Date/Author: 2026-01-12 / Plan Author


## Outcomes & Retrospective

### What Was Achieved
- **77 new tests added** across 4 test files
- **4 critical files now at 100% coverage:**
  - contentResolver.ts (0% → 100%)
  - textProcessor.ts (42.99% → 100%)
  - useStats.ts (66.66% → 100%)
  - ChapterPauseOverlay.tsx (0% → 100%)
- **Test infrastructure improved:** New factory functions for ArticleProgress, CertProgress, GeneratedArticle, Curriculum types
- **All 1869 tests passing**, no regressions

### What Was Not Achieved
- **Coverage thresholds not met:** 75.42%/75.39%/72.41% vs goal of 84%/85%/84%
- The gap (~9% statements, ~10% lines, ~12% functions) is primarily in untested UI components

### Root Cause Analysis
The initial plan underestimated the coverage contribution of the targeted files. The files identified represented only ~500 lines of the ~6000 total source lines. To reach thresholds, component testing at scale would be required - but the user principle of "no E2E tests" and focus on behavior testing makes comprehensive component coverage challenging.

### Recommendations for Future Work
1. **Reduce coverage thresholds** to achievable levels (e.g., 75%/75%/72%) that reflect the test pyramid philosophy
2. **OR add component tests** for high-value screens (playback, profile, content list) using React Testing Library
3. **OR exclude UI-heavy directories** from coverage calculation (app/, components/) and maintain high coverage on business logic only


## Context and Orientation

The Devoro app is a React Native/Expo speed reading application. It has a Jest test suite configured in `jest.config.js` with coverage thresholds defined in `package.json`. The test setup file at `jest.setup.js` mocks AsyncStorage, expo-print, and expo-sharing.

**Current Coverage Status** (as of 2026-01-12):

    Statements: 72.25% (threshold: 84%) - FAILING
    Lines: 72.31% (threshold: 85%) - FAILING
    Functions: 69.89% (threshold: 84%) - FAILING
    Branches: ~66% (threshold: 65%) - PASSING

**Test counts**: 68 test suites, 1792 tests, all passing.

**Key Files with Coverage Gaps:**

1. `src/utils/contentResolver.ts` - 0% coverage (122 lines). This file resolves content from 4 different sources (training curriculum, imported content, AI-generated articles, multi-article curricula) into a unified format for playback. Each source has different lookup logic and data shapes.

2. `src/services/textProcessor.ts` - 42.99% coverage. The `tokenize`, `processWord`, `findSentenceStarts`, and navigation functions are tested. However, `tokenizeWithParagraphs` (handles paragraph breaks and `[[HEADER]]` markers) and `mapChapterOffsetsToWordIndices` (converts character offsets to word indices for chapter navigation) are completely untested.

3. `src/hooks/useStats.ts` - 66.66% coverage, 16.66% branch coverage. A simple hook that aggregates stats from journeyStore.

4. `src/components/rsvp/ChapterPauseOverlay.tsx` - 0% coverage. A UI component that shows when playback pauses at a chapter boundary.

**Testing Principles (from user):**

1. Never mock the system under test - only mock external dependencies (network, storage, timers)
2. Test behavior, not implementation - test what code does, not how
3. Work with the framework - use React Testing Library patterns, Zustand's getState/setState

**Directory Structure:**

    __tests__/
      helpers/
        testUtils.ts          # Mock factories and utilities
        renderWithProviders.tsx  # Custom render with ThemeProvider
        mockFetch.ts          # Network request mocking
      services/
        textProcessor.test.ts # Existing tests (needs additions)
        orp.test.ts          # Complete
        ...
      store/
        journeyStore.test.ts # Complete
        learningStore.test.ts # Complete
        ...
      utils/
        journeyCalculations.test.ts # Complete
        calculateQuizScore.test.ts # Complete
        (contentResolver.test.ts - MISSING)
      hooks/
        useRSVPEngine.test.ts # Complete
        (useStats.test.ts - MISSING)
      components/
        rsvp/
          RSVPWord.test.tsx # Exists
          (ChapterPauseOverlay.test.tsx - MISSING)


## Plan of Work

### Milestone 1: Create contentResolver.test.ts

The file `src/utils/contentResolver.ts` exports one main function `resolveContentBySource(contentId, source)` that dispatches to four internal resolver functions based on the source type. Each resolver accesses a different Zustand store or static data.

Create `__tests__/utils/contentResolver.test.ts` that tests each source type:

For **training** source: Call `resolveContentBySource('some-article-id', 'training')`. This should call `getArticleById` from `src/data/curriculum/index.ts`. Test that valid IDs return `ResolvedContent` with normalized questions, invalid IDs return null.

For **imported** source: Set up contentStore with test content using `useContentStore.getState().setState()`. Call resolver with that content ID. Verify returned content matches store data. Verify hasQuiz is always false for imported content.

For **generated** source: Set up generatedStore with a test article. Test that only articles with `status === 'complete'` return content. Articles with 'generating' or 'error' status should return null.

For **curriculum** source: The contentId format is `"curriculumId:articleIndex"`. Set up curriculumStore with a test curriculum containing articles. Test parsing of the colon-separated format. Test that only articles with `generationStatus === 'generated'` return content.

### Milestone 2: Complete textProcessor.test.ts

Add tests to the existing file `__tests__/services/textProcessor.test.ts`.

For `tokenizeWithParagraphs`: This function splits text on double newlines (`\n\n`) and detects `[[HEADER]]..[[/HEADER]]` markers. Test that:
- Double newlines create paragraph boundaries (paragraphEndIndices set contains last word index of each paragraph)
- Short headers (<=3 words AND <=25 chars) become a single token with headerText property
- Long headers become word-by-word tokens with isHeader flag
- Mixed content (text, headers, text) is processed in order
- Edge cases: empty text, only headers, malformed markers

For `mapChapterOffsetsToWordIndices`: This function converts character offsets to word indices. Test that:
- Empty chapters array returns empty array
- Offset 0 maps to word index 0
- Character offset in middle of text maps to correct word
- Multiple chapters are all mapped correctly

For `processText` with chapters: This function combines tokenization with chapter mapping. Test that:
- Chapters metadata is applied to correct words
- chapterStart property is set on words where chapters begin

### Milestone 3: Add test helper factories

Add to `__tests__/helpers/testUtils.ts`:

    export function createMockResolvedContent(overrides = {}) {
      return {
        title: 'Test Article',
        content: 'Test content.',
        wordCount: 100,
        hasQuiz: false,
        questions: [],
        ...overrides,
      };
    }

    export function createMockCurriculumArticle(overrides = {}) {
      return {
        id: 'curr_test-article-0',
        curriculumId: 'curr_test',
        orderIndex: 0,
        title: 'Test Article',
        summary: 'Test summary',
        content: 'Test content',
        wordCount: 500,
        questions: [],
        generationStatus: 'generated',
        completionStatus: 'unlocked',
        ...overrides,
      };
    }

### Milestone 4: Add useStats tests

Create `__tests__/hooks/useStats.test.ts`. The hook at `src/hooks/useStats.ts` reads from journeyStore to compute aggregate statistics. Use `renderHook` from testing-library to test the hook. Set up journeyStore state with test sessions, verify the hook returns correct computed values.

### Milestone 5: Add ChapterPauseOverlay tests

Create `__tests__/components/rsvp/ChapterPauseOverlay.test.tsx`. The component at `src/components/rsvp/ChapterPauseOverlay.tsx` displays chapter information when playback pauses at a chapter boundary. Test that:
- Chapter title is rendered
- Chapter number is rendered
- Resume button calls onResume callback when pressed


## Concrete Steps

All commands run from repository root `/Users/kaya/Coding/spidrid`.

**Step 1: Verify current coverage baseline**

    npm run test:coverage

Expected output shows coverage FAILING thresholds:

    Jest: "global" coverage threshold for statements (84%) not met: 72.25%
    Jest: "global" coverage threshold for lines (85%) not met: 72.31%
    Jest: "global" coverage threshold for functions (84%) not met: 69.89%

**Step 2: Create contentResolver.test.ts**

Create file `__tests__/utils/contentResolver.test.ts` with tests for all 4 source types as described in Milestone 1.

**Step 3: Run tests to verify contentResolver tests pass**

    npm test -- __tests__/utils/contentResolver.test.ts

Expected: All new tests pass.

**Step 4: Add tokenizeWithParagraphs and mapChapterOffsetsToWordIndices tests**

Edit `__tests__/services/textProcessor.test.ts` to add new describe blocks as described in Milestone 2.

**Step 5: Run textProcessor tests**

    npm test -- __tests__/services/textProcessor.test.ts

Expected: All tests pass including new ones.

**Step 6: Add test helper factories**

Edit `__tests__/helpers/testUtils.ts` to add the factory functions described in Milestone 3.

**Step 7: Create useStats.test.ts**

Create file `__tests__/hooks/useStats.test.ts` as described in Milestone 4.

**Step 8: Create ChapterPauseOverlay.test.tsx**

Create file `__tests__/components/rsvp/ChapterPauseOverlay.test.tsx` as described in Milestone 5.

**Step 9: Verify all tests pass**

    npm test

Expected: All 68+ test suites pass.

**Step 10: Verify coverage thresholds**

    npm run test:coverage

Expected output shows coverage PASSING thresholds:

    All tests passed
    Coverage thresholds met


## Validation and Acceptance

Run `npm run test:coverage` from repository root. The command should exit with code 0 (success) and report:
- Statements >= 84%
- Lines >= 85%
- Functions >= 84%
- Branches >= 65%

Specific file improvements to verify:
- `src/utils/contentResolver.ts` should show >80% coverage (was 0%)
- `src/services/textProcessor.ts` should show >80% coverage (was 42.99%)

The new tests should:
1. Not mock the system under test (stores are tested with real getState/setState)
2. Test behavior (what functions return) not implementation (internal state)
3. Use testing-library patterns (renderHook for hooks, render for components)


## Idempotence and Recovery

All steps can be repeated safely. Running `npm test` multiple times produces the same results. If a test file has syntax errors, Jest will report the error location. Fix and re-run.

If coverage still fails after all changes:
1. Run `npm run test:coverage` and examine the detailed file-by-file report
2. Identify which files still have low coverage
3. Add targeted tests for uncovered lines shown in the report

The coverage report writes to `coverage/` directory which is gitignored. No cleanup needed.


## Artifacts and Notes

**Example contentResolver test structure:**

    import { resolveContentBySource } from '../../src/utils/contentResolver';
    import { useContentStore } from '../../src/store/contentStore';
    import { useGeneratedStore } from '../../src/store/generatedStore';
    import { useCurriculumStore } from '../../src/store/curriculumStore';

    describe('resolveContentBySource', () => {
      beforeEach(() => {
        // Reset stores to clean state
        useContentStore.setState({ importedContent: [] });
        useGeneratedStore.setState({ articles: [] });
        useCurriculumStore.setState({ curricula: [] });
      });

      describe('training source', () => {
        it('returns resolved content for valid article ID', () => {
          // 'focus-basics' is a real article ID from curriculum
          const result = resolveContentBySource('focus-basics', 'training');
          expect(result).not.toBeNull();
          expect(result?.title).toBeDefined();
          expect(result?.content).toBeDefined();
          expect(result?.hasQuiz).toBe(true);
        });

        it('returns null for invalid article ID', () => {
          const result = resolveContentBySource('nonexistent-id', 'training');
          expect(result).toBeNull();
        });
      });
      // ... more tests
    });

**Example tokenizeWithParagraphs test:**

    describe('tokenizeWithParagraphs', () => {
      it('marks paragraph boundaries on double newlines', () => {
        const text = 'First paragraph.\n\nSecond paragraph.';
        const { tokens, paragraphEndIndices } = tokenizeWithParagraphs(text);

        expect(tokens).toEqual(['First', 'paragraph.', 'Second', 'paragraph.']);
        expect(paragraphEndIndices.has(1)).toBe(true); // 'paragraph.' at index 1
        expect(paragraphEndIndices.has(3)).toBe(true); // 'paragraph.' at index 3
      });

      it('detects short headers as single tokens', () => {
        const text = '[[HEADER]]Chapter 1[[/HEADER]]\n\nSome content.';
        const { tokens, headerInfoMap } = tokenizeWithParagraphs(text);

        expect(tokens[0]).toBe('Chapter 1');
        expect(headerInfoMap.get(0)?.isHeader).toBe(true);
        expect(headerInfoMap.get(0)?.headerText).toBe('Chapter 1');
      });
    });


## Interfaces and Dependencies

**Files to create:**

1. `__tests__/utils/contentResolver.test.ts` - Tests for content resolution
2. `__tests__/hooks/useStats.test.ts` - Tests for stats hook
3. `__tests__/components/rsvp/ChapterPauseOverlay.test.tsx` - Tests for chapter overlay

**Files to modify:**

1. `__tests__/services/textProcessor.test.ts` - Add tokenizeWithParagraphs and mapChapterOffsetsToWordIndices tests
2. `__tests__/helpers/testUtils.ts` - Add createMockResolvedContent and createMockCurriculumArticle factories

**Dependencies used (already installed):**

- `jest` - Test runner
- `@testing-library/react-native` - Component and hook testing utilities
- `@testing-library/jest-native` - Native matchers

**Key type definitions to reference:**

From `src/utils/contentResolver.ts`:

    interface ResolvedContent {
      title: string;
      content: string;
      wordCount: number;
      hasQuiz: boolean;
      questions?: Question[];
    }

From `src/services/textProcessor.ts`:

    function tokenizeWithParagraphs(text: string): {
      tokens: string[];
      paragraphEndIndices: Set<number>;
      headerInfoMap: Map<number, HeaderInfo>;
    }

    function mapChapterOffsetsToWordIndices(
      text: string,
      chapters: ChapterMetadata[]
    ): ChapterMetadata[]
