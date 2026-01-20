# Implement Word Position Tracking and Remove Unused user_progress Table

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with `/Users/kaya/Coding/devoro/PLANS.md`.


## Purpose / Big Picture

Users can now resume reading long-form content (imported URLs, PDFs, EPUBs, generated articles, and curriculum articles) from exactly where they left off, even across multiple devices when sync is enabled. Before this change, exiting mid-read would lose all position state, forcing users to restart from the beginning. After this change, closing the playback modal or backgrounding the app saves the current word position, and reopening the same content resumes playback from that exact word.

To verify this works: import a long article or PDF, read halfway through (around word 500 out of 1000), close the playback modal, then reopen the same content. Playback begins at word 500, not word 0. On a second device logged into the same account, after syncing, the same article opens at word 500.

Additionally, this change removes the unused `user_progress` database table by deleting its migration file (no production users exist yet).


## Progress

- [ ] Research and document complete playback flow (entry/exit points, lifecycle)
- [ ] Add currentWordIndex field to ImportedContent type (src/types/content.ts)
- [ ] Add currentWordIndex field to GeneratedArticle type (src/types/generated.ts)
- [ ] Add currentWordIndex field to CurriculumArticle type (src/types/curriculum.ts)
- [ ] Extend contentStore.updateProgress to accept optional currentWordIndex parameter
- [ ] Add getCurrentWordIndex getter to contentStore
- [ ] Add saveArticlePosition and getArticlePosition helpers to curriculumStore
- [ ] Modify useRSVPEngine hook to accept initialIndex parameter
- [ ] Implement position restore logic in playback.tsx (retrieve from store, validate, pass to engine)
- [ ] Implement position save in playback.tsx handleClose function
- [ ] Implement position clear in playback.tsx handlePlaybackComplete function
- [ ] Add periodic auto-save effect with refs to capture latest values
- [ ] Add unmount cleanup effect with refs and isComplete check
- [ ] Add AppState listener to _layout.tsx for app backgrounding
- [ ] Implement position clear in playback-quiz.tsx after quiz completion
- [ ] Write unit tests for store position methods
- [ ] Write integration tests for playback save/restore flow
- [ ] Test multi-device sync (position syncs correctly across devices)
- [ ] Test merge conflict resolution (offline edits from multiple devices)
- [ ] Delete unused migration file 20260113000001_create_user_progress.sql
- [ ] Drop user_progress table from development database if exists
- [ ] Verify app continues functioning after migration removal
- [ ] Final end-to-end testing (manual resume scenarios)
- [ ] Document outcomes and retrospective


## Surprises & Discoveries

(To be filled during implementation)


## Decision Log

- Decision: Use timer-based periodic saves (every 15 seconds) rather than word-count-based saves
  Rationale: Timer-based saves are predictable and don't create performance issues at high WPM. Word-based saves would trigger too frequently (e.g., at 1000 WPM, saving every 50 words means saving every 3 seconds).
  Date: 2026-01-20

- Decision: Track position per CurriculumArticle, not per Curriculum
  Rationale: Each article in a curriculum is a discrete playback unit opened separately. The Curriculum object doesn't represent a unified content stream, so per-article tracking aligns with existing article-level metadata (completionStatus, comprehensionScore, etc.).
  Date: 2026-01-20

- Decision: Clear position immediately after quiz completion, not after readProgress reaches 1.0
  Rationale: Quiz completion is the definitive "finished reading" signal. Clearing position allows users to restart cleanly when re-reading. For content without quizzes, completion already clears the intent to resume.
  Date: 2026-01-20

- Decision: Extend existing store update methods rather than create dedicated position-tracking actions
  Rationale: Minimizes API surface area. ImportedContent already has updateProgress, GeneratedArticle has updateArticleProgress accepting partial updates. Adding position as an optional parameter or field in the update object keeps the API consistent.
  Date: 2026-01-20

- Decision: Fail-safe validation returns index 0 for any invalid saved position
  Rationale: Silent recovery provides better UX than error messages. If content changes (word count mismatch), corrupt data (NaN/null), or negative index, starting from beginning is the safe default.
  Date: 2026-01-20

- Decision: Use refs to capture latest values in periodic save and unmount cleanup effects
  Rationale: React useEffect cleanup functions with empty dependencies capture stale values at mount time. Using refs allows the cleanup to access the latest currentIndex and isComplete values at unmount time. Similarly, periodic save interval must read latest currentIndex via ref to avoid re-creating the interval on every word change.
  Date: 2026-01-20

- Decision: Delete existing migration file instead of creating new DROP TABLE migration
  Rationale: No production users exist yet, so we can safely delete the unused migration file (20260113000001_create_user_progress.sql) rather than create a new migration to drop the table. Simpler and cleaner for a never-used table.
  Date: 2026-01-20


## Outcomes & Retrospective

(To be filled at completion)


## Context and Orientation

### Current System Architecture

Devoro is a React Native (Expo) speed reading app using RSVP (Rapid Serial Visual Presentation) playback. The playback modal (`src/app/playback.tsx`) displays words one at a time at a user-selected WPM. The RSVP engine (`src/hooks/useRSVPEngine.ts`) manages playback state, tracking the current word index (position in the text), playback controls, and timing.

Content is stored in Zustand stores with AsyncStorage persistence. Four content types exist:
- **Imported content** (URLs, PDFs, EPUBs): stored in `contentStore` (`src/store/contentStore.ts`)
- **Generated articles** (AI-generated): stored in `generatedStore` (`src/store/generatedStore.ts`)
- **Curriculum articles** (multi-article learning paths): stored in `curriculumStore` (`src/store/curriculumStore.ts`)
- **Training articles** (practice mode): stored in `learningStore` (`src/store/learningStore.ts`) - these do NOT resume (always start fresh)

Multi-device sync is handled by `syncOrchestrator` (`src/services/syncOrchestrator.ts`), which uses sync adapters to push/pull data to Supabase's `user_content` table. This table uses a polymorphic schema: a single JSONB `data` field stores the entire content object, and an `item_type` discriminator field identifies the content type ('imported', 'generated', 'curriculum', 'learning_progress'). The sync strategy is latest-timestamp-wins for conflict resolution.

### Current Playback Flow

Users open content from the main content list (`src/components/contentList/ContentListScreen.tsx`), which navigates to `/playback` modal with `sourceId` and `source` parameters. The playback modal processes the text into words, initializes the RSVP engine starting at word index 0, and displays words sequentially. When users close the modal (via close button, back navigation, or completion), the modal unmounts and position state is lost.

For content with comprehension quizzes (training, generated, curriculum), completing playback navigates to `/playback-quiz` modal. Quiz completion saves progress (score, WPM, completion status) but does not save reading position.

### The Problem

Currently, only a `readProgress` field (0-1 percentage) exists on `ImportedContent`, and it is only updated to `1` upon completion. No word-level position is tracked. If a user reads 50% of a 10,000-word article and exits, reopening starts from word 0. For long PDFs (multi-thousand words) or EPUBs (tens of thousands of words), this is unusable.

The Supabase database also contains an unused `user_progress` table (created in migration `20260113000001_create_user_progress.sql`) that was never integrated into the sync architecture. All progress tracking currently uses the `user_content` table with `item_type = 'learning_progress'` for article completion records.

### The Solution

Add a `currentWordIndex` field to resumable content types (ImportedContent, GeneratedArticle, CurriculumArticle), modify the RSVP engine to start from a saved index, implement save logic at exit/completion/periodic intervals using refs to avoid stale value bugs, and remove the unused migration file. The sync architecture requires no changes because the `user_content.data` field is already JSONB and sync adapters serialize the entire object.

### React useEffect Cleanup and Refs Pattern

A critical implementation detail: React useEffect cleanup functions with empty dependency arrays `[]` capture values at mount time, not unmount time. For example:

    const [count, setCount] = useState(0);
    useEffect(() => {
      return () => {
        console.log(count); // Always logs 0, even if count is now 100
      };
    }, []); // Empty deps

To access the latest values in cleanup, use refs:

    const countRef = useRef(count);
    useEffect(() => {
      countRef.current = count;
    }, [count]);

    useEffect(() => {
      return () => {
        console.log(countRef.current); // Logs current value at unmount
      };
    }, []); // Empty deps is fine with ref

This pattern is essential for the unmount cleanup and periodic save logic in this plan.


## Plan of Work

The work proceeds in six milestones. Each milestone is independently testable and adds observable functionality.

### Milestone 1: Type Definitions and Store Updates

Add the `currentWordIndex?: number` field to three TypeScript type definitions:
- In `src/types/content.ts`, add to the `ImportedContent` interface after the `readProgress` field
- In `src/types/generated.ts`, add to the `GeneratedArticle` interface after the `attemptCount` field
- In `src/types/curriculum.ts`, add to the `CurriculumArticle` interface after the `readingWPM` field

Modify `src/store/contentStore.ts`:
- Change the `updateProgress` signature from `(id: string, progress: number)` to `(id: string, progress: number, currentWordIndex?: number)`
- In the implementation (around line 43-49), update the mapped object to include `currentWordIndex: currentWordIndex ?? c.currentWordIndex` (preserve existing value if new value is undefined)
- Add a new method `getCurrentWordIndex: (id: string) => number | undefined` that returns `get().importedContent.find(c => c.id === id)?.currentWordIndex`

Modify `src/store/curriculumStore.ts`:
- Add a new action `saveArticlePosition: (curriculumId: string, articleIndex: number, wordIndex?: number) => void` that updates `curricula[curriculumId].articles[articleIndex].currentWordIndex = wordIndex`
- Add a new action `getArticlePosition: (curriculumId: string, articleIndex: number) => number | undefined` that returns `curricula[curriculumId]?.articles[articleIndex]?.currentWordIndex`

The `generatedStore` already has `updateArticleProgress` accepting partial updates, so no signature change is needed there. The `currentWordIndex` field will flow through automatically once added to the type.

After these changes, run the TypeScript compiler (`npm run tsc` or `npx tsc --noEmit`) to verify no type errors. Run the app (`npm run ios` or `npm run android`) and verify it starts without crashes. At this point, the field exists but is not yet used by the playback flow.

### Milestone 2: Modify RSVP Engine to Accept Initial Position

In `src/hooks/useRSVPEngine.ts`, change the function signature from:

    export function useRSVPEngine(words: ProcessedWord[], initialWPM: number = 250)

to:

    export function useRSVPEngine(words: ProcessedWord[], initialWPM: number = 250, initialIndex: number = 0)

Change line 16 from `const [currentIndex, setCurrentIndex] = useState(0);` to `const [currentIndex, setCurrentIndex] = useState(initialIndex);`.

This change is backward compatible (existing callers pass only two arguments, defaulting `initialIndex` to 0). Test by running the app and verifying playback still works normally (starts from word 0 when no position is saved).

### Milestone 3: Implement Position Restore Logic in Playback Modal

In `src/app/playback.tsx`, after the `resolvedContent` is computed (around line 43-49), add position restoration logic. Create a helper function at the top of the file (before the component definition):

    function getValidStartIndex(savedIndex: number | undefined, totalWords: number): number {
      if (savedIndex === undefined || savedIndex < 0 || savedIndex >= totalWords) {
        return 0;
      }
      return savedIndex;
    }

After `processedWords` is computed (around line 52-58), add a `useMemo` hook to retrieve the saved position:

    const savedPosition = useMemo(() => {
      if (!sourceId || processedWords.length === 0) {
        return 0;
      }

      let rawPosition: number | undefined;

      if (source === 'imported') {
        const content = useContentStore.getState().getContentById(sourceId);
        rawPosition = content?.currentWordIndex;
      } else if (source === 'generated') {
        const article = useGeneratedStore.getState().getArticleById(sourceId);
        rawPosition = article?.currentWordIndex;
      } else if (source === 'curriculum') {
        const [curriculumId, articleIndexStr] = sourceId.split(':');
        const articleIndex = parseInt(articleIndexStr, 10);
        if (curriculumId && !isNaN(articleIndex)) {
          rawPosition = useCurriculumStore.getState().getArticlePosition(curriculumId, articleIndex);
        }
      }
      // Training articles (source === 'training') don't resume, return 0

      return getValidStartIndex(rawPosition, processedWords.length);
    }, [sourceId, source, processedWords.length]);

Change the `useRSVPEngine` call (around line 68) from:

    const engine = useRSVPEngine(processedWords, currentWPM);

to:

    const engine = useRSVPEngine(processedWords, currentWPM, savedPosition);

Test by manually editing AsyncStorage (using React Native Debugger or by adding a temporary button to set `currentWordIndex = 500`), then opening the content. Verify playback starts at word 500, not word 0. Test with invalid positions (negative, greater than word count, NaN) and verify playback starts at word 0 (fail-safe).

### Milestone 4: Implement Position Save on Exit and Completion

In `src/app/playback.tsx`, modify the `handleClose` function (around line 127-129). Replace the current implementation:

    const handleClose = () => {
      router.back();
    };

with:

    const handleClose = () => {
      // Save current position before closing
      if (source === 'imported') {
        updateProgress(sourceId, engine.progress, engine.currentIndex);
      } else if (source === 'generated') {
        updateGeneratedProgress(sourceId, { currentWordIndex: engine.currentIndex });
      } else if (source === 'curriculum') {
        const [curriculumId, articleIndexStr] = sourceId.split(':');
        const articleIndex = parseInt(articleIndexStr, 10);
        if (curriculumId && !isNaN(articleIndex)) {
          const { saveArticlePosition } = useCurriculumStore.getState();
          saveArticlePosition(curriculumId, articleIndex, engine.currentIndex);
        }
      }
      // Training articles don't save position (always start fresh)
      router.back();
    };

In the `handlePlaybackComplete` function (around line 76-103), after updating progress (lines 82, 85-89), clear the position by setting `currentWordIndex` to `undefined`:

    if (source === 'imported') {
      updateProgress(sourceId, 1, undefined); // Clear position on completion
    } else if (source === 'generated' && !resolvedContent?.hasQuiz) {
      updateGeneratedProgress(sourceId, {
        completed: true,
        highestWPM: engine.wpm,
        lastReadAt: Date.now(),
        currentWordIndex: undefined, // Clear position on completion
      });
    }

Test by reading an article halfway, closing the modal, reopening, and verifying the position is restored. Then read to completion, reopen, and verify playback starts from word 0 (position cleared).

### Milestone 5: Implement Periodic Auto-Save and Lifecycle Hooks with Refs

This milestone implements periodic saves and unmount cleanup using refs to avoid React's stale closure problem.

In `src/app/playback.tsx`, add refs to track latest values at the top of the component (after the useState declarations around line 40):

    // Refs to track latest values for cleanup and periodic save
    const latestStateRef = useRef({
      currentIndex: 0,
      isComplete: false,
      sourceId,
      source,
      progress: 0,
    });

Add an effect to update the ref whenever values change:

    useEffect(() => {
      latestStateRef.current = {
        currentIndex: engine.currentIndex,
        isComplete,
        sourceId,
        source,
        progress: engine.progress,
      };
    }, [engine.currentIndex, isComplete, sourceId, source, engine.progress]);

Add the periodic save effect after the existing effects (around line 125). This effect saves position every 15 seconds while playback is active:

    // Periodic auto-save every 15 seconds
    useEffect(() => {
      if (!engine.isPlaying || !sourceId) {
        return;
      }

      const saveInterval = setInterval(() => {
        const { currentIndex, source, sourceId } = latestStateRef.current;

        if (source === 'imported') {
          const { updateProgress } = useContentStore.getState();
          updateProgress(sourceId, latestStateRef.current.progress, currentIndex);
        } else if (source === 'generated') {
          const { updateArticleProgress } = useGeneratedStore.getState();
          updateArticleProgress(sourceId, { currentWordIndex: currentIndex });
        } else if (source === 'curriculum') {
          const [curriculumId, articleIndexStr] = sourceId.split(':');
          const articleIndex = parseInt(articleIndexStr, 10);
          if (curriculumId && !isNaN(articleIndex)) {
            const { saveArticlePosition } = useCurriculumStore.getState();
            saveArticlePosition(curriculumId, articleIndex, currentIndex);
          }
        }
      }, 15000); // 15 seconds

      return () => clearInterval(saveInterval);
    }, [engine.isPlaying, sourceId]); // Only re-run when isPlaying or sourceId changes

Note that the dependencies are `[engine.isPlaying, sourceId]` only, not `engine.currentIndex`. This prevents the interval from being recreated on every word change. The interval callback reads the latest `currentIndex` from the ref.

Add unmount cleanup effect:

    // Save position on unmount (for dismiss gestures, back navigation, etc.)
    useEffect(() => {
      return () => {
        const { currentIndex, isComplete, sourceId, source, progress } = latestStateRef.current;

        // Don't save if completed (position was already cleared) or if at beginning
        if (isComplete || currentIndex === 0 || source === 'training') {
          return;
        }

        if (source === 'imported') {
          const { updateProgress } = useContentStore.getState();
          updateProgress(sourceId, progress, currentIndex);
        } else if (source === 'generated') {
          const { updateArticleProgress } = useGeneratedStore.getState();
          updateArticleProgress(sourceId, { currentWordIndex: currentIndex });
        } else if (source === 'curriculum') {
          const [curriculumId, articleIndexStr] = sourceId.split(':');
          const articleIndex = parseInt(articleIndexStr, 10);
          if (curriculumId && !isNaN(articleIndex)) {
            const { saveArticlePosition } = useCurriculumStore.getState();
            saveArticlePosition(curriculumId, articleIndex, currentIndex);
          }
        }
      };
    }, []); // Empty deps - cleanup runs only on unmount, reads latest values from ref

The key fix here is checking `isComplete` in the unmount cleanup. Without this check, if a user completes reading (which clears position to undefined), the unmount cleanup would re-save the position (at `totalWords - 1`), overwriting the cleared state. This would cause the article to resume at the end instead of the beginning on next open.

In `src/app/_layout.tsx`, add an AppState listener to save positions when the app backgrounds. Import `AppState` from `react-native` at the top, then add this effect inside the `RootLayout` component (after existing hooks):

    useEffect(() => {
      const subscription = AppState.addEventListener('change', (nextAppState) => {
        if (nextAppState === 'background' || nextAppState === 'inactive') {
          // Trigger sync push to save any pending position updates
          import('../services/syncOrchestrator').then(({ pushAllChanges }) => {
            pushAllChanges().catch(err => {
              console.warn('Background sync failed:', err);
            });
          });
        }
      });

      return () => {
        subscription.remove();
      };
    }, []);

Test by reading for 20 seconds, then force-quitting the app (iOS: swipe up from app switcher, Android: force stop). Restart the app, reopen the content, and verify position was saved. Test backgrounding the app (press home button) and verify position saves.

### Milestone 6: Clear Position After Quiz Completion

In `src/app/playback-quiz.tsx`, modify the quiz completion logic (inside the `handleAnswer` callback, around lines 78-116). After the existing progress-saving code, add position-clearing logic:

    if (source === 'training') {
      completeArticle(sourceId, score, readingWPM);
      // Training articles don't track position (not resumable)
    } else if (source === 'generated') {
      updateArticleProgress(sourceId, {
        completed: true,
        comprehensionScore: score,
        highestWPM: readingWPM,
        lastReadAt: Date.now(),
        currentWordIndex: undefined, // Clear position on quiz completion
      });
    } else if (source === 'curriculum') {
      const [curriculumId, articleIndexStr] = sourceId.split(':');
      const articleIndex = parseInt(articleIndexStr, 10);
      if (curriculumId && !isNaN(articleIndex)) {
        markArticleCompleted(curriculumId, articleIndex, score, readingWPM);
        // Also clear the saved position
        const { saveArticlePosition } = useCurriculumStore.getState();
        saveArticlePosition(curriculumId, articleIndex, undefined);
      }
    }

Test by completing an article with a quiz, then reopening the article. Verify playback starts from word 0 (position cleared). Test exiting the quiz modal mid-quiz (without completion), then reopening the article. Verify position is still saved from the reading phase (quiz not completed, position preserved).

### Milestone 7: Remove Unused user_progress Migration

Since no production users exist, we can safely delete the unused migration file rather than create a new migration to drop the table.

Delete the file:

    rm supabase/migrations/20260113000001_create_user_progress.sql

If you have already applied migrations to a development database, manually drop the table:

    -- Run in Supabase SQL editor or via psql
    DROP TABLE IF EXISTS user_progress;

Verify the app continues to function normally. The table was never used by the application code, so its removal has no impact on functionality.

Run the app and navigate through different screens to verify no errors appear. Check the browser console (for Expo Go) or native logs (for development builds) for any database-related errors.


## Validation and Acceptance

### Manual Testing Scenarios

**Scenario 1: Basic Position Save and Restore**
1. Import a long article (1000+ words) via URL or text import
2. Open the article and start playback
3. Read to approximately word 500 (progress bar around 50%)
4. Close the playback modal using the close button (top-left X)
5. Reopen the same article from the content list
6. Expected: Playback starts at word 500 (or nearby), not word 0
7. Verify the progress bar shows 50% from the start

**Scenario 2: Periodic Auto-Save**
1. Open a long article and start playback
2. Let it play for 20 seconds (engine.isPlaying = true)
3. Force quit the app (iOS: swipe up from app switcher, Android: force stop)
4. Restart the app and reopen the same article
5. Expected: Playback resumes near the last position (within 15 seconds of playback, accounting for WPM)

**Scenario 3: Completion Clears Position**
1. Open a short article (500 words)
2. Read to completion (progress = 100%)
3. Close the completion modal
4. Reopen the same article
5. Expected: Playback starts at word 0 (position cleared after completion)

**Scenario 4: Quiz Completion Clears Position**
1. Open a training article with a quiz
2. Read to completion, take the quiz, and complete it
3. Reopen the same article
4. Expected: Playback starts at word 0 (position cleared after quiz)

**Scenario 5: Multi-Device Sync**
1. On Device A: Import an article, read to word 500, close playback
2. On Device B (logged into same account): Trigger sync by pulling down on content list
3. On Device B: Open the same article
4. Expected: Playback starts at word 500 (position synced from Device A)

**Scenario 6: Fail-Safe Validation (Corrupt Data)**
1. Manually edit AsyncStorage to set `currentWordIndex = -100` for an article
2. Reopen the article
3. Expected: Playback starts at word 0 (fail-safe validation)
4. Repeat with `currentWordIndex = 99999` (greater than word count)
5. Expected: Playback starts at word 0

**Scenario 7: Training Articles Don't Resume**
1. Open a practice article from Learning Mode
2. Read halfway, then exit
3. Reopen the same article
4. Expected: Playback starts at word 0 (training articles always start fresh)

**Scenario 8: EPUB Chapter Boundaries**
1. Import a large EPUB (30,000+ words with chapters)
2. Read through chapter 1, close playback
3. Reopen the EPUB
4. Expected: Playback resumes in chapter 1 at the saved word position

**Scenario 9: Unmount Cleanup After Completion Bug**
1. Open an article and read to 100% completion
2. The completion modal shows (position cleared to undefined)
3. Close the completion modal (unmount cleanup runs)
4. Reopen the article
5. Expected: Playback starts at word 0 (not at the end)
6. This tests that the `isComplete` check in unmount cleanup prevents re-saving position after it was cleared

**Scenario 10: Periodic Save Interval Stability**
1. Open an article and start playback at 1000 WPM
2. Let it run for 60 seconds (1000 words)
3. Check browser console for any interval-related warnings or errors
4. Expected: Only 4 periodic saves occur (at 15s, 30s, 45s, 60s), not 1000 saves (one per word)
5. This tests that the effect dependencies are correct and the interval isn't recreated on every word change

### Automated Testing

Run the test suite:

    npm test

Expected output should show:
- All existing tests continue to pass (no regressions)
- New tests added for position tracking pass:
  - `contentStore.getCurrentWordIndex` returns correct value
  - `contentStore.updateProgress` saves currentWordIndex
  - `curriculumStore.saveArticlePosition` updates article position
  - `curriculumStore.getArticlePosition` retrieves article position
  - `getValidStartIndex` returns 0 for invalid positions

### Migration Verification

After deleting the migration file and dropping the table (if it exists in development):

1. Verify the migration file is gone:

       ls supabase/migrations/20260113000001_create_user_progress.sql

   Expected: `No such file or directory`

2. If you had applied migrations to a development database, verify the table is dropped:

       psql -h <supabase-host> -U postgres -d postgres
       \dt user_progress

   Expected: `Did not find any relation named "user_progress".`

3. Launch the app and verify it functions normally with no database errors

### Sync Verification

Test multi-device sync:
1. Device A: Read article to word 500, trigger sync (pull-to-refresh or wait for auto-sync)
2. Device B: Trigger sync, verify `user_content` table contains updated record with `currentWordIndex: 500` in the `data` JSONB field
3. Device B: Open article, verify playback starts at word 500

Check Supabase database directly:

    SELECT item_id, item_type, data->'currentWordIndex' as position
    FROM user_content
    WHERE user_id = '<user-uuid>' AND item_type = 'imported';

Expected: The `position` column shows the saved word index for each imported content item.


## Concrete Steps

All commands should be run from the repository root `/Users/kaya/Coding/devoro`.

**Step 1: Type Definitions**

Edit `src/types/content.ts`:

    export interface ImportedContent {
      id: string;
      title: string;
      content: string;
      wordCount: number;
      source: 'url' | 'text' | 'epub' | 'pdf' | 'mobi';
      sourceUrl?: string;
      fileName?: string;
      createdAt: number;
      lastReadAt?: number;
      readProgress: number; // 0-1
      currentWordIndex?: number; // NEW: saved playback position
      author?: string;
      excerpt?: string;
      siteName?: string;
    }

Edit `src/types/generated.ts`, locate `GeneratedArticle` interface and add:

    export interface GeneratedArticle {
      id: string;
      topic: string;
      targetDuration: number;
      tone: ArticleTone;
      title: string;
      content: string;
      wordCount: number;
      questions: Question[];
      status: GenerationStatus;
      errorMessage?: string;
      generatedAt: number;
      completed: boolean;
      comprehensionScore?: number;
      highestWPM?: number;
      lastReadAt?: number;
      attemptCount: number;
      currentWordIndex?: number; // NEW: saved playback position
    }

Edit `src/types/curriculum.ts`, locate `CurriculumArticle` interface and add:

    export interface CurriculumArticle {
      id: string;
      curriculumId: string;
      orderIndex: number;
      title: string;
      summary: string;
      content: string;
      wordCount: number;
      hasQuiz: boolean;
      questions: Question[];
      generationStatus: ArticleGenerationStatus;
      completionStatus: ArticleCompletionStatus;
      completedAt?: number;
      comprehensionScore?: number;
      readingWPM?: number;
      generationStartedAt?: number;
      generatedAt?: number;
      generationError?: string;
      currentWordIndex?: number; // NEW: saved playback position
    }

**Step 2: Store Updates**

Edit `src/store/contentStore.ts`, update the `updateProgress` method signature and implementation:

    updateProgress: (id, progress, currentWordIndex) => {
      set((state) => ({
        importedContent: state.importedContent.map((c) =>
          c.id === id ? { ...c, readProgress: progress, currentWordIndex: currentWordIndex ?? c.currentWordIndex } : c
        ),
      }));
    },

Add the `getCurrentWordIndex` method after `updateProgress`:

    getCurrentWordIndex: (id) => {
      return get().importedContent.find((c) => c.id === id)?.currentWordIndex;
    },

Update the `ContentStore` interface at the top of the file to reflect the new signature:

    interface ContentStore {
      importedContent: ImportedContent[];
      currentContentId: string | null;
      addContent: (content: Omit<ImportedContent, 'id' | 'createdAt' | 'readProgress'>) => ImportedContent;
      updateProgress: (id: string, progress: number, currentWordIndex?: number) => void;
      getCurrentWordIndex: (id: string) => number | undefined;
      updateLastRead: (id: string) => void;
      deleteContent: (id: string) => void;
      getContentById: (id: string) => ImportedContent | undefined;
      setCurrentContent: (id: string | null) => void;
      clearAllContent: () => void;
      hydrateForTesting: (data: { importedContent: ImportedContent[] }) => void;
    }

Edit `src/store/curriculumStore.ts`, add two new methods after `getAllCurricula`:

    saveArticlePosition: (curriculumId, articleIndex, wordIndex) => {
      set((state) => {
        const curriculum = state.curricula[curriculumId];
        if (!curriculum) return state;

        const updatedArticles = curriculum.articles.map((a, i) =>
          i === articleIndex ? { ...a, currentWordIndex: wordIndex } : a
        );

        return {
          curricula: {
            ...state.curricula,
            [curriculumId]: {
              ...curriculum,
              articles: updatedArticles,
              updatedAt: Date.now(),
            },
          },
        };
      });
    },

    getArticlePosition: (curriculumId, articleIndex) => {
      const curriculum = get().curricula[curriculumId];
      return curriculum?.articles[articleIndex]?.currentWordIndex;
    },

Update the `CurriculumActions` interface to include the new methods:

    interface CurriculumActions {
      // ... existing methods
      saveArticlePosition: (curriculumId: string, articleIndex: number, wordIndex?: number) => void;
      getArticlePosition: (curriculumId: string, articleIndex: number) => number | undefined;
    }

**Step 3: Modify RSVP Engine**

Edit `src/hooks/useRSVPEngine.ts`, change the function signature (line 12):

    export function useRSVPEngine(
      words: ProcessedWord[],
      initialWPM: number = 250,
      initialIndex: number = 0
    ): RSVPEngineControls {

Change line 16:

    const [currentIndex, setCurrentIndex] = useState(initialIndex);

**Step 4: Position Restore in Playback**

Edit `src/app/playback.tsx`. Add the validation helper function at the top of the file, before the component:

    function getValidStartIndex(savedIndex: number | undefined, totalWords: number): number {
      if (savedIndex === undefined || savedIndex < 0 || savedIndex >= totalWords) {
        return 0;
      }
      return savedIndex;
    }

After the `processedWords` useMemo (around line 58), add:

    const savedPosition = useMemo(() => {
      if (!sourceId || processedWords.length === 0) {
        return 0;
      }

      let rawPosition: number | undefined;

      if (source === 'imported') {
        const content = useContentStore.getState().getContentById(sourceId);
        rawPosition = content?.currentWordIndex;
      } else if (source === 'generated') {
        const article = useGeneratedStore.getState().getArticleById(sourceId);
        rawPosition = article?.currentWordIndex;
      } else if (source === 'curriculum') {
        const [curriculumId, articleIndexStr] = sourceId.split(':');
        const articleIndex = parseInt(articleIndexStr, 10);
        if (curriculumId && !isNaN(articleIndex)) {
          rawPosition = useCurriculumStore.getState().getArticlePosition(curriculumId, articleIndex);
        }
      }

      return getValidStartIndex(rawPosition, processedWords.length);
    }, [sourceId, source, processedWords.length]);

Change the `useRSVPEngine` call (line 68):

    const engine = useRSVPEngine(processedWords, currentWPM, savedPosition);

**Step 5: Position Save on Exit/Completion**

Edit `src/app/playback.tsx`, replace `handleClose` (line 127):

    const handleClose = () => {
      if (source === 'imported') {
        updateProgress(sourceId, engine.progress, engine.currentIndex);
      } else if (source === 'generated') {
        updateGeneratedProgress(sourceId, { currentWordIndex: engine.currentIndex });
      } else if (source === 'curriculum') {
        const [curriculumId, articleIndexStr] = sourceId.split(':');
        const articleIndex = parseInt(articleIndexStr, 10);
        if (curriculumId && !isNaN(articleIndex)) {
          const { saveArticlePosition } = useCurriculumStore.getState();
          saveArticlePosition(curriculumId, articleIndex, engine.currentIndex);
        }
      }
      router.back();
    };

In `handlePlaybackComplete` (line 76), modify the progress updates to clear position:

    if (source === 'imported') {
      updateProgress(sourceId, 1, undefined);
    } else if (source === 'generated' && !resolvedContent?.hasQuiz) {
      updateGeneratedProgress(sourceId, {
        completed: true,
        highestWPM: engine.wpm,
        lastReadAt: Date.now(),
        currentWordIndex: undefined,
      });
    }

**Step 6: Periodic Auto-Save and Lifecycle with Refs**

Edit `src/app/playback.tsx`, add refs after useState declarations (around line 40):

    // Refs to track latest values for cleanup and periodic save
    const latestStateRef = useRef({
      currentIndex: 0,
      isComplete: false,
      sourceId,
      source,
      progress: 0,
    });

Add effect to update ref:

    useEffect(() => {
      latestStateRef.current = {
        currentIndex: engine.currentIndex,
        isComplete,
        sourceId,
        source,
        progress: engine.progress,
      };
    }, [engine.currentIndex, isComplete, sourceId, source, engine.progress]);

Add periodic save effect after the existing completion detection effect (around line 125):

    // Periodic auto-save every 15 seconds
    useEffect(() => {
      if (!engine.isPlaying || !sourceId) {
        return;
      }

      const saveInterval = setInterval(() => {
        const { currentIndex, source, sourceId } = latestStateRef.current;

        if (source === 'imported') {
          const { updateProgress } = useContentStore.getState();
          updateProgress(sourceId, latestStateRef.current.progress, currentIndex);
        } else if (source === 'generated') {
          const { updateArticleProgress } = useGeneratedStore.getState();
          updateArticleProgress(sourceId, { currentWordIndex: currentIndex });
        } else if (source === 'curriculum') {
          const [curriculumId, articleIndexStr] = sourceId.split(':');
          const articleIndex = parseInt(articleIndexStr, 10);
          if (curriculumId && !isNaN(articleIndex)) {
            const { saveArticlePosition } = useCurriculumStore.getState();
            saveArticlePosition(curriculumId, articleIndex, currentIndex);
          }
        }
      }, 15000);

      return () => clearInterval(saveInterval);
    }, [engine.isPlaying, sourceId]);

Add unmount cleanup effect:

    // Save position on unmount
    useEffect(() => {
      return () => {
        const { currentIndex, isComplete, sourceId, source, progress } = latestStateRef.current;

        if (isComplete || currentIndex === 0 || source === 'training') {
          return;
        }

        if (source === 'imported') {
          const { updateProgress } = useContentStore.getState();
          updateProgress(sourceId, progress, currentIndex);
        } else if (source === 'generated') {
          const { updateArticleProgress } = useGeneratedStore.getState();
          updateArticleProgress(sourceId, { currentWordIndex: currentIndex });
        } else if (source === 'curriculum') {
          const [curriculumId, articleIndexStr] = sourceId.split(':');
          const articleIndex = parseInt(articleIndexStr, 10);
          if (curriculumId && !isNaN(articleIndex)) {
            const { saveArticlePosition } = useCurriculumStore.getState();
            saveArticlePosition(curriculumId, articleIndex, currentIndex);
          }
        }
      };
    }, []);

Edit `src/app/_layout.tsx`, add import at the top:

    import { AppState } from 'react-native';

Inside the `RootLayout` component, add:

    useEffect(() => {
      const subscription = AppState.addEventListener('change', (nextAppState) => {
        if (nextAppState === 'background' || nextAppState === 'inactive') {
          import('../services/syncOrchestrator').then(({ pushAllChanges }) => {
            pushAllChanges().catch(err => {
              console.warn('Background sync failed:', err);
            });
          });
        }
      });

      return () => {
        subscription.remove();
      };
    }, []);

**Step 7: Clear Position After Quiz**

Edit `src/app/playback-quiz.tsx`, in the `handleAnswer` callback (around line 78-116), modify the completion logic:

    if (source === 'training') {
      completeArticle(sourceId, score, readingWPM);
    } else if (source === 'generated') {
      updateArticleProgress(sourceId, {
        completed: true,
        comprehensionScore: score,
        highestWPM: readingWPM,
        lastReadAt: Date.now(),
        currentWordIndex: undefined,
      });
    } else if (source === 'curriculum') {
      const [curriculumId, articleIndexStr] = sourceId.split(':');
      const articleIndex = parseInt(articleIndexStr, 10);
      if (curriculumId && !isNaN(articleIndex)) {
        markArticleCompleted(curriculumId, articleIndex, score, readingWPM);
        const { saveArticlePosition } = useCurriculumStore.getState();
        saveArticlePosition(curriculumId, articleIndex, undefined);
      }
    }

**Step 8: Remove Migration File**

Delete the unused migration:

    rm supabase/migrations/20260113000001_create_user_progress.sql

If the table exists in a development database, drop it manually via Supabase dashboard or psql:

    DROP TABLE IF EXISTS user_progress;

**Step 9: Run Tests**

    npm test

Expected: All tests pass.

**Step 10: Manual Testing**

Follow the validation scenarios described in the "Validation and Acceptance" section above, paying special attention to Scenarios 9 and 10 which test the critical bug fixes.


## Idempotence and Recovery

All steps are idempotent:
- Adding optional TypeScript fields does not break existing data (undefined is valid)
- Adding optional parameters to functions is backward compatible (defaults to 0 for initialIndex)
- Position save logic checks for valid data before updating (fail-safe validation)
- Deleting migration file is safe (table was never used)
- Using refs prevents stale closure bugs

If an error occurs during implementation:
- Type changes can be reverted without data loss (the field will simply be ignored)
- Store method changes are additive (existing data remains valid)
- Playback logic falls back to index 0 on any validation failure
- Migration file can be restored from git history if needed (though unnecessary)

To recover from a bad state:
1. Reset AsyncStorage: Clear app data (iOS Settings > App > Clear Data, Android Settings > Apps > Clear Storage)
2. Revert code changes: `git checkout src/app/playback.tsx src/hooks/useRSVPEngine.ts`
3. Restart app: Position tracking is disabled, playback works normally from index 0


## Artifacts and Notes

### Critical Bug Fixes in This Plan

**Bug 1: Unmount cleanup captures stale values**
- Problem: `useEffect(() => { return () => { save(engine.currentIndex); }; }, [])` captures currentIndex at mount time (always 0)
- Fix: Use ref to track latest value: `latestStateRef.current.currentIndex`

**Bug 2: Unmount cleanup doesn't check isComplete**
- Problem: After completion (position cleared to undefined), unmount saves `currentIndex = totalWords - 1`, re-creating position
- Fix: Check `if (isComplete) return;` in cleanup

**Bug 3: Periodic save effect has currentIndex in deps**
- Problem: `useEffect(() => { interval... }, [engine.currentIndex])` recreates interval on every word change (1000 times/minute at 1000 WPM)
- Fix: Remove currentIndex from deps, read from ref inside callback

**Bug 4: Periodic save callback captures stale currentIndex**
- Problem: `setInterval(() => { save(currentIndex); })` captures currentIndex at effect run time
- Fix: Read from ref: `latestStateRef.current.currentIndex`

### Expected AsyncStorage Structure After Implementation

For an imported article with position saved:

    {
      "devoro-content": {
        "state": {
          "importedContent": [
            {
              "id": "abc123",
              "title": "How to Build Better Software",
              "content": "...",
              "wordCount": 3500,
              "source": "url",
              "sourceUrl": "https://example.com/article",
              "createdAt": 1705680000000,
              "readProgress": 0.43,
              "currentWordIndex": 1500,  // ← NEW FIELD
              "lastReadAt": 1705681234567
            }
          ]
        }
      }
    }

### Expected Supabase user_content Record

    {
      "id": "uuid-1",
      "user_id": "user-uuid",
      "item_id": "abc123",
      "item_type": "imported",
      "data": {
        "id": "abc123",
        "title": "How to Build Better Software",
        "wordCount": 3500,
        "readProgress": 0.43,
        "currentWordIndex": 1500,  // ← Syncs automatically via JSONB
        "updatedAt": 1705681234567,
        ...
      },
      "updated_at": "2026-01-20T12:34:56Z"
    }

### Test Transcript Example

Starting the app and reading an article:

    $ npm run ios
    ...
    [App launched]
    [User taps "How to Build Better Software" article]
    [Playback modal opens, starts at word 0]
    [User reads to word 500, progress bar shows 14%]
    [User taps close button]
    [Playback modal closes]
    [AsyncStorage shows: currentWordIndex: 500]

    [User taps same article again]
    [Playback modal opens, starts at word 500] ✓
    [Progress bar shows 14%] ✓
    [User reads to completion]
    [Completion modal shows]
    [AsyncStorage shows: currentWordIndex: undefined] ✓

    [User taps article again]
    [Playback modal opens, starts at word 0] ✓


## Interfaces and Dependencies

No new dependencies are required. All changes use existing libraries:
- React Native (useEffect, useState, useMemo, useRef)
- Zustand stores (useContentStore, useGeneratedStore, useCurriculumStore, useLearningStore)
- Expo Router (router.back, useLocalSearchParams)

### Key Interfaces

**Modified Hook Signature:**

    // src/hooks/useRSVPEngine.ts
    export function useRSVPEngine(
      words: ProcessedWord[],
      initialWPM: number = 250,
      initialIndex: number = 0
    ): RSVPEngineControls;

**Modified Store Method Signature:**

    // src/store/contentStore.ts
    updateProgress: (id: string, progress: number, currentWordIndex?: number) => void;
    getCurrentWordIndex: (id: string) => number | undefined;

**New Store Methods:**

    // src/store/curriculumStore.ts
    saveArticlePosition: (curriculumId: string, articleIndex: number, wordIndex?: number) => void;
    getArticlePosition: (curriculumId: string, articleIndex: number) => number | undefined;

**Type Definitions:**

    // src/types/content.ts
    export interface ImportedContent {
      // ... existing fields
      currentWordIndex?: number;
    }

    // src/types/generated.ts
    export interface GeneratedArticle {
      // ... existing fields
      currentWordIndex?: number;
    }

    // src/types/curriculum.ts
    export interface CurriculumArticle {
      // ... existing fields
      currentWordIndex?: number;
    }

All interfaces use optional fields (`?:`) to maintain backward compatibility with existing data.


---

## Plan Revision Log

**2026-01-20:** Initial plan creation with comprehensive word position tracking implementation and user_progress table cleanup. Key decisions: timer-based periodic saves, per-article position tracking for curricula, refs pattern for React cleanup functions, deletion of unused migration file instead of creating new DROP TABLE migration.
