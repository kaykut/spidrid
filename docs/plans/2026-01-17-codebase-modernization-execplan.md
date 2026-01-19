# Devoro Codebase Modernization and Quality Improvement

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with PLANS.md at the repository root.


## Purpose / Big Picture

After this change, the Devoro codebase will be significantly more maintainable, testable, and scalable. The work addresses technical debt accumulated across 174 TypeScript files, reducing cognitive complexity by 40%, eliminating 60% of code duplication, and establishing consistent patterns that make future development faster and safer.

From a developer's perspective, the experience is transformed. When a developer needs to modify the journey metrics calculation, they will find focused modules averaging 80 lines instead of a sprawling 676-line utility file. When they need to understand how content aggregation works, they will see a clear transformation pipeline instead of 250 lines of duplicated loops. When they need to modify a large component, they will find separated concerns with form logic in custom hooks, not tangled with animation state in a 669-line component.

The modernization preserves all functionality while improving structure. No user-visible behavior changes. After completion, all tests pass, the app runs identically, and stores persist correctly. However, the code becomes dramatically easier to understand, modify, and extend. New features that previously required touching 5-8 files can now be implemented by modifying 2-3 focused modules. Bug fixes that required understanding 400+ lines of context now require understanding <100 lines.

To verify this improvement works, compare file sizes before and after (largest logic file drops from 676 to <300 LOC), run the full test suite (all tests pass), launch the app and exercise critical flows (RSVP playback, content import, journey tracking, sync), and measure developer velocity on the next feature implementation.


## Progress

### Milestone 1: Foundation - State Aggregation Layer Simplification
- [ ] Run code-simplifier agent on contentListStore.ts
- [ ] Run code-simplifier agent on journeyStore.ts
- [ ] Run code-simplifier agent on journeyCalculations.ts
- [ ] Break journeyCalculations into 8 focused modules
- [ ] Verify all tests pass after simplification
- [ ] Verify app launches and content list displays correctly
- [ ] Verify journey metrics calculate correctly
- [ ] Document file size reductions and complexity improvements

### Milestone 2: Text Processing Pipeline Refactoring
- [ ] Run code-simplifier agent on textProcessor.ts
- [ ] Merge processText and processTextNoSplit into single function
- [ ] Run code-simplifier agent on contentExtractor.ts
- [ ] Extract readabilityExtractor, htmlExtractor, htmlUtils, networkUtils modules
- [ ] Verify all tests pass after refactoring
- [ ] Test RSVP playback with various text inputs (long words, headers, chapters)
- [ ] Test content extraction from URLs, PDFs, EPUBs
- [ ] Document duplication eliminated and module boundaries

### Milestone 3: Large Component Decomposition
- [ ] Run code-simplifier agent on ExpandableLearnCard.tsx
- [ ] Split into container, form, generating state, and custom hook
- [ ] Run code-simplifier agent on CurriculumCreationWizard.tsx
- [ ] Split into wizard shell, 4 step components, and wizard state hook
- [ ] Run code-simplifier agent on InsightsPanel.tsx
- [ ] Split into container, progress card, trend card, and placeholder
- [ ] Verify all tests pass after decomposition
- [ ] Test add content flow (Train, Learn, Read tabs)
- [ ] Test curriculum creation wizard end-to-end
- [ ] Test journey profile insights display
- [ ] Document component size reductions and separation of concerns

### Milestone 4: Type System Organization
- [ ] Run code-simplifier agent on types/journey.ts
- [ ] Split into core.ts, constants.ts, certifications.ts
- [ ] Run code-simplifier agent on types/content.ts
- [ ] Run code-simplifier agent on data/curriculum.ts
- [ ] Split into articles.ts, topics.ts, and utils
- [ ] Verify no circular dependencies exist
- [ ] Verify all imports resolve correctly
- [ ] Run full typecheck (npm run typecheck)
- [ ] Document type system improvements and dependency graph

### Milestone 5: Service Layer Optimization
- [ ] Run code-simplifier agent on syncOrchestrator.ts
- [ ] Simplify error handling and adapter delegation
- [ ] Run code-simplifier agent on certificateTemplate.ts
- [ ] Extract shared SVG components and consolidate templates
- [ ] Run code-simplifier agent on recommendationService.ts
- [ ] Consider inlining into journeyStore if complexity warrants
- [ ] Verify all tests pass after optimization
- [ ] Test sync flows (full sync, incremental sync, push-only)
- [ ] Test certificate generation for all tiers
- [ ] Document service simplifications

### Milestone 6: Hook Simplification and Testing
- [ ] Run code-simplifier agent on useSyncManager.ts
- [ ] Extract sync state machine to separate module
- [ ] Run code-simplifier agent on useRSVPEngine.ts
- [ ] Separate timing logic from word navigation
- [ ] Add unit tests for simplified hooks
- [ ] Verify all tests pass
- [ ] Test RSVP playback controls (play, pause, skip, rewind)
- [ ] Test auto-sync on app focus
- [ ] Document hook complexity reductions

### Milestone 7: Test Coverage Enhancement
- [ ] Audit test coverage for simplified modules
- [ ] Add unit tests for journeyCalculations split modules (target: >90% coverage)
- [ ] Add integration tests for contentListStore aggregation
- [ ] Add component tests for split form components
- [ ] Add edge case tests for text processing pipeline
- [ ] Run test coverage report (npm run test:coverage)
- [ ] Document coverage improvements and critical test additions

### Milestone 8: Data File Optimization (Optional)
- [ ] Run code-simplifier agent on curriculum data files
- [ ] Consider JSON migration for static article data
- [ ] Run code-simplifier agent on testPersonas.ts
- [ ] Split personas by type for focused testing
- [ ] Verify all data loads correctly
- [ ] Document data file improvements

### Milestone 9: Design System Consolidation (Optional)
- [ ] Run code-simplifier agent on design token files
- [ ] Consolidate into constants/designSystem/ folder structure
- [ ] Create single source of truth for design tokens
- [ ] Verify all components use consolidated tokens
- [ ] Document design system organization

### Milestone 10: Documentation and Knowledge Transfer
- [ ] Update CLAUDE.md with new architecture patterns
- [ ] Document new module boundaries and responsibilities
- [ ] Create architecture decision records for major simplifications
- [ ] Update component README files if they exist
- [ ] Document migration guide for ongoing work


## Surprises & Discoveries

(To be filled in during implementation)


## Decision Log

- **Decision:** Prioritize state aggregation layer (Milestone 1) as highest priority
  **Rationale:** contentListStore and journeyCalculations are the highest complexity hotspots (625 and 676 LOC respectively) and touch the most critical user flows. Simplifying these first provides maximum ROI and unblocks dependent work.
  **Date:** 2026-01-17

- **Decision:** Break journeyCalculations.ts into 8 focused modules rather than 3-4 larger modules
  **Rationale:** The utility file mixes 8 distinct concerns (velocity score, stats, user state, comfort band, streaks, baseline, certifications, milestones, trends). Each concern is independently testable and has minimal coupling. Fine-grained modules improve discoverability and reduce cognitive load.
  **Date:** 2026-01-17

- **Decision:** Use code-simplifier agent for systematic refactoring rather than manual edits
  **Rationale:** The code-simplifier agent specializes in preserving functionality while improving clarity. Manual refactoring of 174 files risks introducing subtle bugs. The agent provides consistent patterns and maintains test coverage.
  **Date:** 2026-01-17

- **Decision:** Make test coverage enhancement (Milestone 7) mandatory, data/design optimizations (Milestones 8-9) optional
  **Rationale:** Test coverage ensures refactoring preserves behavior and prevents regressions. Data file and design system improvements are lower priority "nice-to-haves" that can be deferred if timeline constraints exist.
  **Date:** 2026-01-17


## Outcomes & Retrospective

(To be filled in at completion)


## Context and Orientation

The Devoro codebase is a React Native (Expo) speed reading app with 174 TypeScript files organized into feature modules. The current state shows several complexity hotspots:

**State Layer:** The `src/store/contentListStore.ts` file (625 lines) aggregates content from 4 independent stores (contentStore, generatedStore, curriculumStore, learningStore) with 80% duplicated code between `getContentList()` and `getHistoryList()` methods. The `src/store/journeyStore.ts` file (617 lines) recalculates 6 metrics on every session record with no selective optimization. The `src/utils/journeyCalculations.ts` utility file (676 lines) contains 25+ unrelated pure functions spanning velocity scoring, streaks, baselines, certifications, milestones, and trends.

**Service Layer:** The `src/services/textProcessor.ts` file (445 lines) has `processText()` and `processTextNoSplit()` functions that differ by only one line but duplicate 80% of their code. The `src/services/contentExtractor.ts` file (540 lines) mixes HTML parsing, fallback extraction, network retry, and text utilities in one file with repeated validation logic across 3 extraction attempts.

**Component Layer:** The `src/components/addContent/ExpandableLearnCard.tsx` component (669 lines) mixes accordion state, form validation, AI generation orchestration, and animation in one file. The `src/components/learn/curriculum/CurriculumCreationWizard.tsx` component (554 lines) implements a 4-step wizard with all steps inline. The `src/components/journey/InsightsPanel.tsx` component (472 lines) combines scroll container, chart rendering, and card layout logic.

**Type System:** The `src/types/journey.ts` file (278 lines) mixes interface definitions with constant definitions (LEVEL_DEFINITIONS, JOURNEY_CERT_DEFINITIONS). The `src/data/curriculum.ts` file (308 lines) mixes static article data, topic definitions, and helper functions. Circular dependencies exist between types and data files.

The app uses Expo SDK 54, Zustand for state management with AsyncStorage persistence, TypeScript in strict mode, and follows an 8pt grid design system ("Quiet Velocity") with centralized design tokens in `src/constants/` and `src/data/themes.ts`.

All stores persist to AsyncStorage (MMKV in production builds). Navigation uses Expo Router with file-based routing in `src/app/`. The RSVP engine is in `src/services/` and `src/hooks/useRSVPEngine.ts`. RevenueCat handles subscriptions in `src/store/subscriptionStore.ts`. Supabase provides authentication and multi-device sync via `src/store/authStore.ts` and `src/services/syncOrchestrator.ts` with 6 sync adapters in `src/services/sync/`.


## Plan of Work

This plan follows a phased approach, starting with highest-impact simplifications and progressing to lower-priority polish work. Each milestone uses the code-simplifier agent to systematically refactor files while preserving functionality.

**Milestone 1: State Aggregation Layer Simplification (3-4 days)**

This milestone addresses the largest complexity hotspot. We invoke the code-simplifier agent on three interconnected files: `src/store/contentListStore.ts`, `src/store/journeyStore.ts`, and `src/utils/journeyCalculations.ts`.

For contentListStore, the goal is to eliminate the 80% duplication between `getContentList()` and `getHistoryList()`. The agent should extract shared transformation logic into helper functions like `transformImportedContent()`, `transformGeneratedArticle()`, `transformCurriculum()`, and `transformTrainingArticle()`. Then merge the two methods into a single `getList(filterType: 'all' | 'completed')` method that calls these helpers. Expected result: file size drops from 625 to ~350 lines.

For journeyCalculations, the goal is to break the monolithic 676-line utility file into 8 focused modules. Create a new folder `src/utils/journey/` with these files: `velocityScore.ts` (VS calculation, level detection, effective WPM - ~80 lines), `stats.ts` (average WPM, average comprehension, best WPM - ~70 lines), `userState.ts` (state detection, comfort band, suggested WPM - ~90 lines), `streaks.ts` (streak update, freeze logic, date utilities - ~120 lines), `baseline.ts` (baseline capture - ~30 lines), `certifications.ts` (cert unlock status, speed proof validation - ~100 lines), `milestones.ts` (milestone progress, path calculations - ~100 lines), `trends.ts` (weekly trend calculation - ~60 lines). Move the `generateSessionId()` UUID function to a separate `utils/uuid.ts` file. Expected result: 8 focused files averaging 80 lines each, total ~650 lines (slight reduction from removing redundancy).

For journeyStore, the goal is to add selective recalculation. The current `recalculateAll()` method recomputes velocity score, level, averages, best WPM, comfort band, and user state on every session. Modify to compute only changed metrics. For example, if adding a session, recompute velocity score and averages, but only recompute comfort band if session count crosses threshold (10 sessions minimum). Expected result: performance improvement, no line count change.

After these changes, update all imports throughout the codebase to point to the new module locations. Run `npm run typecheck` and `npm test` to verify no breakage. Launch the app with `npm run ios` or `npm run android` and verify the content list displays correctly, journey metrics calculate correctly, and no errors appear in console.

**Milestone 2: Text Processing Pipeline Refactoring (2-3 days)**

This milestone simplifies the text processing and content extraction services. We invoke the code-simplifier agent on `src/services/textProcessor.ts` and `src/services/contentExtractor.ts`.

For textProcessor, the goal is to merge the duplicated `processText()` and `processTextNoSplit()` functions. Add an optional parameter `skipWordSplitting?: boolean = false` to `processText()`. Inside the loop over tokens, wrap the `needsSplitting()` and `splitLongWord()` logic in `if (!skipWordSplitting)`. Delete the `processTextNoSplit()` function entirely. Update all call sites (likely in test files) to use `processText(text, chapters, adapter, true)` for the no-split variant. Expected result: file size drops from 445 to ~350 lines, eliminating ~95 lines of duplication.

For contentExtractor, the goal is to extract focused modules for different extraction strategies. Create a new folder `src/services/extraction/` with these files: `readabilityExtractor.ts` (Readability.js logic, content validation - ~150 lines), `htmlExtractor.ts` (fallback regex extraction - ~100 lines), `htmlUtils.ts` (stripHtml, extractTitle, whitespace normalization - ~80 lines), `networkUtils.ts` (fetch with retry logic - ~80 lines). The main `contentExtractor.ts` file becomes a thin orchestrator that chains these extractors in a pipeline: try Readability, fall back to HTML regex extraction, fall back to XMLHttpRequest. Expected result: contentExtractor.ts drops from 540 to ~150 lines, with clear module boundaries.

After these changes, run `npm test` to verify text processing tests pass. Test RSVP playback with various inputs: short words, long words (>22 characters that trigger splitting), headers, chapter boundaries. Test content extraction from URLs (Wikipedia articles, Medium posts), PDFs, and EPUBs. Verify no regressions in word tokenization, ORP calculation, or content import flows.

**Milestone 3: Large Component Decomposition (4-5 days)**

This milestone breaks large components into smaller, focused pieces. We invoke the code-simplifier agent on three components: `src/components/addContent/ExpandableLearnCard.tsx`, `src/components/learn/curriculum/CurriculumCreationWizard.tsx`, and `src/components/journey/InsightsPanel.tsx`.

For ExpandableLearnCard (669 lines), split into: `ExpandableLearnCard.tsx` (container component managing accordion expansion state - ~150 lines), `LearnCardForm.tsx` (form UI with topic input, style selection, duration picker - ~200 lines), `LearnCardGenerating.tsx` (generating state with loading indicator - ~100 lines), `src/hooks/useLearnCardForm.ts` (custom hook managing form state, validation, submission - ~150 lines). The container renders either the form, generating state, or error state based on current mode. Form validation logic moves entirely into the hook, separating concerns.

For CurriculumCreationWizard (554 lines), split into: `CurriculumCreationWizard.tsx` (wizard shell with step navigation - ~150 lines), `src/components/learn/curriculum/steps/TopicStep.tsx` (step 1: topic input - ~100 lines), `src/components/learn/curriculum/steps/InterestsStep.tsx` (step 2: interest selection - ~100 lines), `src/components/learn/curriculum/steps/DurationStep.tsx` (step 3: duration picker - ~100 lines), `src/components/learn/curriculum/steps/ReviewStep.tsx` (step 4: review and submit - ~100 lines), `src/hooks/useWizardState.ts` (wizard state machine managing current step, navigation, data collection - ~100 lines). Each step is independently testable.

For InsightsPanel (472 lines), split into: `InsightsPanel.tsx` (scroll container with horizontal layout - ~100 lines), `ProgressInsightCard.tsx` (progress insight card with metrics - ~150 lines), `WeeklyTrendCard.tsx` (trend card with chart rendering - ~150 lines), `InsightPlaceholder.tsx` (placeholder states for empty data - ~70 lines). Chart rendering logic isolates in the trend card component.

After these changes, run `npm test` to verify component tests pass. Manually test the add content flow: tap the + FAB, navigate through Train, Learn, and Read tabs, generate a single article, create a curriculum. Verify the wizard advances through all 4 steps. Test the journey profile screen and verify insights display correctly with progress card and trend chart.

**Milestone 4: Type System Organization (2-3 days)**

This milestone organizes type definitions and eliminates circular dependencies. We invoke the code-simplifier agent on `src/types/journey.ts`, `src/types/content.ts`, and `src/data/curriculum.ts`.

For journey.ts (278 lines), split into: `src/types/journey/core.ts` (interface definitions only: VelocityLevel, UserState, ComfortBand, JourneySession, StreakData, etc. - ~120 lines), `src/types/journey/constants.ts` (LEVEL_DEFINITIONS, DEFAULT_COMFORT_BAND - ~80 lines), `src/types/journey/certifications.ts` (certification-specific types and JOURNEY_CERT_DEFINITIONS - ~80 lines). Create `src/types/journey/index.ts` that re-exports all types for backward compatibility. Update imports throughout the codebase.

For curriculum.ts (308 lines), split into: `src/data/curriculum/articles.ts` (ARTICLES array with static article data - ~200 lines), `src/data/curriculum/topics.ts` (TOPICS array with topic definitions - ~60 lines), `src/utils/curriculumUtils.ts` (findArticle, findTopic helper functions - ~40 lines), `src/data/curriculum/index.ts` (re-exports for backward compatibility). Move utility functions out of the data layer into `src/utils/`.

Review import statements across the codebase to identify circular dependencies. Common pattern: types import from data files, data files import from types. Break by ensuring types only import from other types, data files only import from types (not vice versa), and utility files import from both but are imported by neither.

After these changes, run `npm run typecheck` to verify no type errors. Use a tool like `madge` (`npx madge --circular --extensions ts,tsx src/`) to verify zero circular dependencies. Document the type system structure in a comment at the top of `src/types/journey/index.ts`.

**Milestone 5: Service Layer Optimization (2-3 days)**

This milestone simplifies over-engineered services. We invoke the code-simplifier agent on `src/services/syncOrchestrator.ts`, `src/services/certificateTemplate.ts`, and `src/services/recommendationService.ts`.

For syncOrchestrator (410 lines), simplify the generic abstraction. The current design uses a generic sync pattern with complex error handling and rollback logic for 6 adapters. Inline the adapter calls instead of abstracting them. Replace the generic `syncAdapter<T>()` method with direct calls to each adapter's push/pull methods. Simplify error handling: fail fast on first error rather than attempting rollback. Remove in-memory state management if it's not essential. Expected result: file size drops from 410 to ~250 lines.

For certificateTemplate (305 lines), consolidate duplicated SVG rendering. The file generates certificates for 3 tiers (Novice, Swift, Rapid, Elite, Legendary). Extract shared SVG components like `renderBackground()`, `renderBorder()`, `renderTitle()`, `renderStats()`. Use template literals for common patterns rather than verbose string concatenation. Consider a single template function with a `tier` parameter that varies colors and text. Expected result: file size drops from 305 to ~200 lines.

For recommendationService (~250 lines estimated), review complexity. If the service is simple (just scoring and filtering), consider inlining it into `src/store/journeyStore.ts` as a computed getter. If it has complex logic, leave it as a separate service but simplify internal implementation. Expected result: either file deleted (inlined) or reduced to ~150 lines.

After these changes, run `npm test` to verify sync tests pass. Test multi-device sync flows: full sync on first sign-in, incremental sync on app focus, push-only sync when offline. Test certificate generation: complete articles to unlock Novice, Swift, Rapid tiers, verify PDFs generate correctly with appropriate styling. Test content recommendations if the recommendation service remains.

**Milestone 6: Hook Simplification and Testing (2 days)**

This milestone simplifies complex custom hooks. We invoke the code-simplifier agent on `src/hooks/useSyncManager.ts` and `src/hooks/useRSVPEngine.ts`.

For useSyncManager (211 lines), extract the sync state machine to a separate file `src/utils/syncStateMachine.ts`. The state machine tracks sync status (idle, syncing, error), manages retry logic, and handles conflict resolution. The hook becomes a thin wrapper that initializes the state machine, subscribes to auth changes, and exposes sync methods. Reduce useEffect dependencies by consolidating related effects. Expected result: hook drops to ~100 lines, state machine is ~100 lines, both independently testable.

For useRSVPEngine (149 lines), separate timing logic from word navigation. Extract a `src/utils/rsvpTiming.ts` utility that calculates word display duration based on WPM, ORP, pause multipliers, sentence ends, and paragraph ends. Extract a `src/utils/wordNavigation.ts` utility that handles index management, sentence starts, skip, and rewind. The hook orchestrates these utilities. Expected result: hook drops to ~80 lines, each utility is ~60 lines.

Add unit tests for the extracted utilities and simplified hooks. For rsvpTiming, test edge cases: minimum WPM (50), maximum WPM (1500), sentence endings (1.5x pause), paragraph endings (2x pause), headers (3x pause). For wordNavigation, test boundary conditions: skip at end of text, rewind at start of text, finding sentence starts. For useSyncManager, test retry logic, conflict resolution, offline handling.

After these changes, run `npm test` and verify >90% coverage for new utilities. Test RSVP playback: play, pause, adjust WPM, skip sentence, rewind sentence, verify timing feels correct at 200 WPM, 400 WPM, 800 WPM. Test auto-sync: sign in, close app, reopen app, verify sync triggers on focus.

**Milestone 7: Test Coverage Enhancement (2-3 days)**

This milestone adds comprehensive test coverage for simplified modules. The goal is >90% line coverage for critical business logic.

Add unit tests for the 8 journey calculation modules created in Milestone 1. For `velocityScore.ts`, test: calculateEffectiveWpm() with various WPM and comprehension values, calculateVelocityScore() with 0 sessions, 1-4 sessions, 5+ sessions, edge cases like all 100% comprehension vs all 60% comprehension. For `streaks.ts`, test: streak extension (completed yesterday), streak break (missed days), freeze application, freeze reset on new week. For `certifications.ts`, test: cert unlock status for each tier, speed proof validation, multiple speed proofs in one session.

Add integration tests for `contentListStore.ts` aggregation. Test: all 4 content sources appear in list, filtering by category (books, articles, learning, training), date grouping (Today, This Week, This Month, Earlier), completion filtering when "Move to History" setting is enabled. Mock the 4 source stores with known data and verify the aggregated list matches expectations.

Add component tests for split form components from Milestone 3. For `LearnCardForm.tsx`, test: topic input validation (min length, max length), style selection updates state, duration picker changes reflected, form submission triggers generation. For wizard steps, test: each step renders correctly, navigation between steps works, form data persists across steps, final submission collects all data.

Add edge case tests for text processing pipeline from Milestone 2. Test: tokenization with empty string, single word, multiple paragraphs, unicode characters, punctuation-only text. Test: long word splitting with 22-character word, 50-character word, hyphenated words. Test: header detection with short headers (<25 chars, ≤3 words), long headers (>25 chars or >3 words), nested headers.

Run `npm run test:coverage` (if configured) or `npm test -- --coverage` to generate a coverage report. Target >90% line coverage for business logic modules (store utilities, calculation utilities, sync adapters). UI components may have lower coverage (>70%) due to snapshot testing.

After tests are added, verify all pass with `npm test`. Run the full suite in CI if available. Document coverage improvements in the Decision Log: "Test coverage increased from X% to Y%, adding N new test cases for critical flows."

**Milestone 8: Data File Optimization (Optional, 1 day)**

This milestone optimizes large data files. We invoke the code-simplifier agent on curriculum data files in `src/data/curriculum/` and `src/data/testPersonas.ts`.

For curriculum data files, the current structure has 13 TypeScript files, each 1400-1500 lines with static article definitions. Consider migrating to JSON format: move article data to `src/data/curriculum/articles.json`, keep type definitions in `src/types/curriculum.ts`, add a loader utility in `src/utils/curriculumLoader.ts` that reads JSON at runtime. This separates data from code and makes articles easier to edit without triggering TypeScript recompilation. Expected result: easier content maintenance, faster build times.

For testPersonas.ts (759 lines), split by persona type: create `src/data/testPersonas/novice.ts` (novice user with 0-5 sessions), `src/data/testPersonas/intermediate.ts` (swift/rapid users with 10-20 sessions), `src/data/testPersonas/advanced.ts` (elite/legendary users with 50+ sessions), `src/data/testPersonas/index.ts` (re-exports all personas). Expected result: focused test data, easier to find relevant persona for test case.

After these changes, verify data loads correctly. Launch the app, navigate to Learning mode, verify all 7 topics and 21 articles display. Load each test persona in development mode (if supported) and verify state hydrates correctly.

**Milestone 9: Design System Consolidation (Optional, 1 day)**

This milestone consolidates design tokens into a single location. We invoke the code-simplifier agent on `src/constants/spacing.ts`, `src/constants/typography.ts`, `src/data/themes.ts`, and `src/utils/colorUtils.ts`.

Create a new folder `src/constants/designSystem/` with these files: `spacing.ts` (SPACING, COMPONENT_SPACING, COMPONENT_RADIUS, SIZES), `typography.ts` (TYPOGRAPHY, RSVP_FONT_SIZES), `colors.ts` (JOURNEY_COLORS, COLOR_OPACITY, DIFFICULTY_COLORS), `themes.ts` (theme objects for dark, midnight, sepia, light), `shadows.ts` (SHADOWS with sm, md, lg, glow), `index.ts` (re-exports all tokens). Move `colorUtils.ts` into this folder as `utils.ts`.

Update `src/data/themes.ts` to import from `src/constants/designSystem/themes.ts`. Update all components to import design tokens from `@/constants/designSystem` instead of scattered locations. Expected result: single source of truth for design system, easier to maintain and extend.

After these changes, run `npm run typecheck` to verify imports resolve. Launch the app and verify theming works correctly: switch between dark, midnight, sepia, and light themes, verify colors update, verify spacing and typography remain consistent.

**Milestone 10: Documentation and Knowledge Transfer (1 day)**

This milestone documents the modernized architecture for future developers. No code changes, only documentation updates.

Update `CLAUDE.md` in the repository root with new architecture patterns. Add a section "Post-Modernization Architecture" that describes: the 8 journey calculation modules in `src/utils/journey/`, the 4 extraction modules in `src/services/extraction/`, the component splitting pattern for large components, the type system organization with separated types and constants.

Create architecture decision records (ADRs) for major simplifications. For example, create `docs/architecture/2026-01-17-journey-calculations-split.md` that explains why journeyCalculations was split into 8 modules, what each module does, and the benefits (reduced cognitive load, improved testability, easier to extend). Create `docs/architecture/2026-01-17-component-decomposition.md` that explains the pattern for splitting large components (container + focused subcomponents + custom hook for state).

Update component README files if they exist. For example, create `src/components/addContent/README.md` that explains the ExpandableLearnCard decomposition and how form state flows through the custom hook.

Create a migration guide for ongoing work. Document: "If you need to add a new journey metric calculation, add it to the appropriate module in `src/utils/journey/` (e.g., stats.ts for aggregations, streaks.ts for streak logic). Do not add to journeyStore directly unless it's store-specific." Document: "If you need to add a new content extraction strategy, create a new module in `src/services/extraction/` and add it to the extraction pipeline in contentExtractor.ts."

After documentation is complete, review with the team (if applicable) or commit with a descriptive message: "docs: document post-modernization architecture and patterns."


## Concrete Steps

Here are the exact commands to run and where to run them. All commands assume you are in the repository root `/Users/kaya/Coding/devoro`.

**Milestone 1: State Aggregation Layer Simplification**

1. Use the code-simplifier agent on contentListStore:

       claude-code "Use the code-simplifier agent to simplify src/store/contentListStore.ts. Goals: eliminate 80% duplication between getContentList() and getHistoryList() by extracting shared transformation helpers, merge into single getList(filterType) method, reduce file size from 625 to ~350 LOC."

2. Use the code-simplifier agent on journeyCalculations:

       claude-code "Use the code-simplifier agent to simplify src/utils/journeyCalculations.ts. Goals: break 676-line file into 8 focused modules in src/utils/journey/ folder: velocityScore.ts, stats.ts, userState.ts, streaks.ts, baseline.ts, certifications.ts, milestones.ts, trends.ts. Move generateSessionId() to src/utils/uuid.ts."

3. Use the code-simplifier agent on journeyStore:

       claude-code "Use the code-simplifier agent to simplify src/store/journeyStore.ts. Goals: add selective recalculation to recalculateAll() method - only recompute changed metrics rather than all 6 metrics on every session."

4. Verify type checking:

       npm run typecheck

   Expected output: "No errors found."

5. Verify tests:

       npm test

   Expected output: All tests pass (exact count depends on test suite).

6. Verify app launches:

       npm run ios
       # or
       npm run android

   Expected: App launches without errors. Navigate to home screen (ContentListScreen), verify content list displays with all 4 sources (imported, generated, curricula, training). Tap "Journey/Profile" FAB, verify metrics display correctly (velocity score, level, streak, comfort band).

**Milestone 2: Text Processing Pipeline Refactoring**

1. Use the code-simplifier agent on textProcessor:

       claude-code "Use the code-simplifier agent to simplify src/services/textProcessor.ts. Goals: merge processText() and processTextNoSplit() into single function with skipWordSplitting parameter, eliminate ~95 lines of duplication, reduce file size from 445 to ~350 LOC."

2. Use the code-simplifier agent on contentExtractor:

       claude-code "Use the code-simplifier agent to simplify src/services/contentExtractor.ts. Goals: extract 4 focused modules in src/services/extraction/ folder: readabilityExtractor.ts, htmlExtractor.ts, htmlUtils.ts, networkUtils.ts. Make contentExtractor.ts a thin orchestrator (~150 LOC)."

3. Verify tests:

       npm test

   Expected: All text processing tests pass.

4. Test RSVP playback manually:

   Launch app, import a Wikipedia article (Settings → Add Content → Read → URL), tap the article to start playback. Verify:
   - Short words display correctly
   - Long words (e.g., "internationalization") split at syllable boundaries
   - Headers pause for 3x duration
   - Chapter boundaries show pause overlay
   - ORP highlighting appears on correct character

5. Test content extraction manually:

   Try importing from:
   - URL (Wikipedia, Medium article)
   - PDF (upload a PDF file)
   - EPUB (upload an EPUB file)
   - Text (paste plain text)

   Verify content extracts successfully in all cases.

**Milestone 3: Large Component Decomposition**

1. Use the code-simplifier agent on ExpandableLearnCard:

       claude-code "Use the code-simplifier agent to simplify src/components/addContent/ExpandableLearnCard.tsx. Goals: split 669-line component into: ExpandableLearnCard.tsx (container, ~150 LOC), LearnCardForm.tsx (form UI, ~200 LOC), LearnCardGenerating.tsx (generating state, ~100 LOC), hooks/useLearnCardForm.ts (form state hook, ~150 LOC)."

2. Use the code-simplifier agent on CurriculumCreationWizard:

       claude-code "Use the code-simplifier agent to simplify src/components/learn/curriculum/CurriculumCreationWizard.tsx. Goals: split 554-line component into: CurriculumCreationWizard.tsx (shell, ~150 LOC), steps/TopicStep.tsx, steps/InterestsStep.tsx, steps/DurationStep.tsx, steps/ReviewStep.tsx (~100 LOC each), hooks/useWizardState.ts (state machine, ~100 LOC)."

3. Use the code-simplifier agent on InsightsPanel:

       claude-code "Use the code-simplifier agent to simplify src/components/journey/InsightsPanel.tsx. Goals: split 472-line component into: InsightsPanel.tsx (container, ~100 LOC), ProgressInsightCard.tsx (~150 LOC), WeeklyTrendCard.tsx (~150 LOC), InsightPlaceholder.tsx (~70 LOC)."

4. Verify tests:

       npm test

   Expected: All component tests pass.

5. Test add content flow manually:

   Launch app, tap + FAB, navigate through Train, Learn, Read tabs. In Learn tab, expand "Generate Article" card, fill in topic, select style, choose duration, tap "Generate". Verify article generates and appears in content list. Test "Create Curriculum" flow: tap "Create Curriculum", proceed through all 4 wizard steps, submit, verify curriculum appears in content list.

6. Test journey profile:

   Tap "Journey/Profile" FAB, scroll down to "Insights" section. Verify progress insight card displays (shows progress to next level), weekly trend chart displays (shows last 4 weeks of WPM/comprehension), placeholder displays if no data.

**Milestone 4: Type System Organization**

1. Use the code-simplifier agent on types/journey.ts:

       claude-code "Use the code-simplifier agent to simplify src/types/journey.ts. Goals: split 278-line file into: types/journey/core.ts (interfaces, ~120 LOC), types/journey/constants.ts (LEVEL_DEFINITIONS, ~80 LOC), types/journey/certifications.ts (cert types + JOURNEY_CERT_DEFINITIONS, ~80 LOC). Create index.ts re-export file."

2. Use the code-simplifier agent on data/curriculum.ts:

       claude-code "Use the code-simplifier agent to simplify src/data/curriculum.ts. Goals: split 308-line file into: data/curriculum/articles.ts (ARTICLES array, ~200 LOC), data/curriculum/topics.ts (TOPICS array, ~60 LOC), utils/curriculumUtils.ts (helper functions, ~40 LOC). Create index.ts re-export file."

3. Verify type checking:

       npm run typecheck

   Expected: "No errors found."

4. Check for circular dependencies:

       npx madge --circular --extensions ts,tsx src/

   Expected: No circular dependencies found. If found, refactor to break cycles.

**Milestone 5: Service Layer Optimization**

1. Use the code-simplifier agent on syncOrchestrator:

       claude-code "Use the code-simplifier agent to simplify src/services/syncOrchestrator.ts. Goals: inline adapter calls instead of generic abstraction, simplify error handling (fail fast), reduce file size from 410 to ~250 LOC."

2. Use the code-simplifier agent on certificateTemplate:

       claude-code "Use the code-simplifier agent to simplify src/services/certificateTemplate.ts. Goals: extract shared SVG components (renderBackground, renderBorder, renderTitle), consolidate 3 cert tier templates, reduce file size from 305 to ~200 LOC."

3. Use the code-simplifier agent on recommendationService:

       claude-code "Use the code-simplifier agent to simplify src/services/recommendationService.ts. Goals: if simple, inline into journeyStore. If complex, simplify to ~150 LOC."

4. Verify tests:

       npm test

   Expected: All sync and certificate tests pass.

5. Test multi-device sync:

   Sign in on Device A (or simulator), add content, complete an article. Sign in with same account on Device B (or different simulator). Verify content syncs and appears on Device B. Verify no duplicate entries. Verify last-write-wins conflict resolution works correctly.

6. Test certificate generation:

   Complete 3 articles in Learning mode with ≥80% comprehension at ≥200 WPM. Navigate to Journey/Profile → Certifications. Verify Novice tier unlocks. Complete more articles at ≥350 WPM to unlock Swift tier. Tap "Download Certificate" and verify PDF generates correctly.

**Milestone 6: Hook Simplification and Testing**

1. Use the code-simplifier agent on useSyncManager:

       claude-code "Use the code-simplifier agent to simplify src/hooks/useSyncManager.ts. Goals: extract sync state machine to src/utils/syncStateMachine.ts (~100 LOC), reduce hook to ~100 LOC thin wrapper."

2. Use the code-simplifier agent on useRSVPEngine:

       claude-code "Use the code-simplifier agent to simplify src/hooks/useRSVPEngine.ts. Goals: extract src/utils/rsvpTiming.ts (~60 LOC) and src/utils/wordNavigation.ts (~60 LOC), reduce hook to ~80 LOC orchestrator."

3. Add unit tests for extracted utilities:

   Create `__tests__/utils/rsvpTiming.test.ts`, `__tests__/utils/wordNavigation.test.ts`, `__tests__/utils/syncStateMachine.test.ts`. Add comprehensive test cases covering edge cases, boundary conditions, and error handling.

4. Verify tests:

       npm test

   Expected: All tests pass, including new utility tests.

5. Run coverage report:

       npm test -- --coverage

   Expected: >90% line coverage for rsvpTiming, wordNavigation, and syncStateMachine utilities.

6. Test RSVP playback:

   Launch app, import content, start playback. Test: play (words advance), pause (playback stops), adjust WPM slider (speed changes), skip sentence (jumps to next sentence), rewind sentence (jumps to previous sentence). Verify timing feels natural at 200 WPM, 400 WPM, and 800 WPM.

7. Test auto-sync:

   Sign in, close app, reopen app. Verify sync triggers automatically on app focus. Check console logs for "Sync completed" message.

**Milestone 7: Test Coverage Enhancement**

1. Add unit tests for journey calculation modules:

   Create test files: `__tests__/utils/journey/velocityScore.test.ts`, `__tests__/utils/journey/stats.test.ts`, `__tests__/utils/journey/userState.test.ts`, `__tests__/utils/journey/streaks.test.ts`, `__tests__/utils/journey/baseline.test.ts`, `__tests__/utils/journey/certifications.test.ts`, `__tests__/utils/journey/milestones.test.ts`, `__tests__/utils/journey/trends.test.ts`.

   For each module, add tests covering:
   - Normal cases with typical inputs
   - Edge cases (empty arrays, zero values, max values)
   - Boundary conditions (exactly at threshold, just below threshold, just above threshold)
   - Error handling (invalid inputs, null/undefined values)

2. Add integration tests for contentListStore:

   Create `__tests__/store/contentListStore.integration.test.ts`. Mock the 4 source stores with known data. Test:
   - All 4 content sources appear in aggregated list
   - Filtering by category (books, articles, learning, training)
   - Date grouping (Today, This Week, This Month, Earlier)
   - Completion filtering when "Move to History" setting is enabled
   - Edge cases (empty stores, single item in each store, 100 items in one store)

3. Add component tests for split components:

   Create `__tests__/components/addContent/LearnCardForm.test.tsx`, `__tests__/components/learn/curriculum/steps/TopicStep.test.tsx`, etc. Use React Testing Library to test:
   - Component renders correctly
   - User interactions trigger expected state changes
   - Form validation works (minimum length, maximum length, required fields)
   - Submission calls correct handler with correct data

4. Add edge case tests for text processing:

   Create `__tests__/services/textProcessor.edge-cases.test.ts`. Test:
   - Empty string tokenization
   - Single word tokenization
   - Multiple paragraphs with varying line breaks
   - Unicode characters (emoji, Chinese characters, Arabic script)
   - Punctuation-only text
   - Long word splitting (22, 30, 50 character words)
   - Header detection (short headers ≤3 words ≤25 chars, long headers >3 words >25 chars)

5. Run full test suite:

       npm test

   Expected: All tests pass. Total test count should increase significantly (100+ new tests).

6. Run coverage report:

       npm test -- --coverage

   Expected output should show:
   - Business logic modules (journey calculations, sync adapters): >90% line coverage
   - UI components: >70% line coverage
   - Overall project coverage: >80%

   If coverage is below target, add more tests for uncovered branches.

**Milestone 8: Data File Optimization (Optional)**

1. Use the code-simplifier agent on curriculum data:

       claude-code "Use the code-simplifier agent to simplify curriculum data files in src/data/curriculum/. Goals: consider JSON migration for static article data, separate data from code."

2. Use the code-simplifier agent on testPersonas:

       claude-code "Use the code-simplifier agent to simplify src/data/testPersonas.ts. Goals: split 759-line file into: testPersonas/novice.ts, testPersonas/intermediate.ts, testPersonas/advanced.ts, testPersonas/index.ts."

3. Verify data loads:

       npm run ios

   Navigate to Learning mode. Verify all 7 topics display. Open each topic and verify all articles display (21 total). Tap an article and verify content loads correctly.

4. Test test personas (if supported in dev mode):

   Load each persona and verify state hydrates correctly.

**Milestone 9: Design System Consolidation (Optional)**

1. Use the code-simplifier agent on design token files:

       claude-code "Use the code-simplifier agent to consolidate design tokens. Goals: create src/constants/designSystem/ folder with: spacing.ts, typography.ts, colors.ts, themes.ts, shadows.ts, utils.ts. Update all imports throughout codebase."

2. Verify type checking:

       npm run typecheck

   Expected: "No errors found." All imports resolve correctly.

3. Verify theming:

       npm run ios

   Navigate to Journey/Profile → Settings → Theme. Switch between dark, midnight, sepia, light. Verify colors update correctly for each theme. Verify spacing and typography remain consistent.

**Milestone 10: Documentation and Knowledge Transfer**

1. Update CLAUDE.md:

   Add "Post-Modernization Architecture" section describing new module structure, component splitting patterns, type system organization.

2. Create architecture decision records:

   Create `docs/architecture/2026-01-17-journey-calculations-split.md`, `docs/architecture/2026-01-17-component-decomposition.md`. Document decisions, rationale, and benefits.

3. Update component READMEs:

   Create `src/components/addContent/README.md`, `src/components/learn/curriculum/README.md` documenting decomposed component structure.

4. Create migration guide:

   Document patterns for future developers: "How to add new journey metrics", "How to add new content extraction strategies", "How to split large components".

5. Commit documentation:

       git add docs/ CLAUDE.md src/components/**/README.md
       git commit -m "docs: document post-modernization architecture and patterns"


## Validation and Acceptance

Success is defined by observable behavior, not just code changes. After completing all milestones, perform these validation steps:

**1. File Size Metrics (Quantitative Validation)**

Run this command to measure file sizes before and after:

    find src/ -name "*.ts" -o -name "*.tsx" | xargs wc -l | sort -n | tail -20

Expected results:
- Largest logic file: <300 LOC (down from 676)
- Largest store file: <400 LOC (down from 625)
- Largest component file: <300 LOC (down from 669)
- Total files over 500 LOC: <5 (only data files)

**2. Test Suite Validation (Functionality Preservation)**

Run the full test suite:

    npm test

Expected: All tests pass. If any test fails, the refactoring broke functionality and must be fixed before proceeding.

Run test coverage:

    npm test -- --coverage

Expected: Line coverage >80% overall, >90% for business logic modules.

**3. Type Safety Validation (No Regressions)**

Run type checking:

    npm run typecheck

Expected: "No errors found." Zero type errors.

Check for circular dependencies:

    npx madge --circular --extensions ts,tsx src/

Expected: No circular dependencies. Clean dependency graph.

**4. Build Validation (No Build Errors)**

Verify production build succeeds:

    eas build --platform ios --profile preview
    # or
    eas build --platform android --profile preview

Expected: Build completes successfully. APK/IPA generated without errors.

**5. Critical User Flows (End-to-End Validation)**

Launch the app on a physical device or simulator and test these flows:

**Flow 1: RSVP Playback**
1. Launch app
2. Tap + FAB → Read → URL
3. Enter "https://en.wikipedia.org/wiki/Speed_reading"
4. Tap article to start playback
5. Verify: Words display one at a time, ORP highlight appears, WPM slider adjusts speed, pause works, skip sentence works, rewind sentence works

**Flow 2: Content Import**
1. Import from URL (Wikipedia article) → content appears in list
2. Import from PDF (upload .pdf file) → book appears in list with page count
3. Import from EPUB (upload .epub file) → book appears in list with chapters
4. Import from text (paste plain text) → article appears in list

**Flow 3: Journey Tracking**
1. Complete 3 articles in Learning mode with ≥80% comprehension
2. Tap Journey/Profile FAB
3. Verify: Velocity score displays, level shows (Novice/Swift/Rapid), streak count displays, comfort band shows WPM range, insights panel displays progress card and trend chart

**Flow 4: AI Content Generation**
1. Tap + FAB → Learn → Generate Article
2. Enter topic "photosynthesis", select "Explanatory" style, choose "5 min" duration
3. Tap "Generate"
4. Verify: Article generates, appears in content list, can be played back, has quiz questions

**Flow 5: Multi-Device Sync (Premium Only)**
1. Purchase premium subscription (or use test account)
2. Tap Journey/Profile → Sync Across Devices → Sign In
3. Sign in with Google (or magic link)
4. Add content on Device A
5. Sign in with same account on Device B
6. Verify: Content from Device A appears on Device B, no duplicates, last-write-wins conflict resolution

**Flow 6: Certification**
1. Complete 3 articles at ≥200 WPM with ≥80% comprehension
2. Tap Journey/Profile → Certifications
3. Verify: Novice tier unlocks, "Download Certificate" button appears, tapping downloads PDF with correct styling

**6. Performance Validation (No Regressions)**

Measure performance before and after refactoring:

- **Startup time:** Time from app launch to ContentListScreen render (target: <2 seconds)
- **Content list render:** Time to render 100 items (target: <500ms)
- **RSVP playback:** Frame drops during playback (target: 0 dropped frames at 400 WPM)
- **Journey recalculation:** Time to recalculate all metrics after adding session (target: <100ms)

Use React DevTools Profiler or Chrome DevTools Performance tab to measure. If performance degrades >10%, investigate and optimize.

**7. Regression Testing (Spot Check)**

Randomly select 10 files from the refactored modules and review for common mistakes:
- Imports resolve correctly (no broken imports)
- No unused variables (ESLint catches these)
- No console.log statements left in production code
- No hardcoded values (use design tokens)
- No TODO comments without GitHub issue reference

Run linter:

    npm run lint

Expected: Zero linting errors or warnings.


## Idempotence and Recovery

This plan is designed to be safe to run multiple times and to recover from interruptions.

**Idempotence:**

Each milestone can be re-run without causing damage:
- Code-simplifier agent is deterministic and produces the same output given the same input
- File splits create new files and modify existing files, but do not delete data
- Test additions are additive (new test files, new test cases)
- Documentation updates can be re-written without side effects

If a milestone fails partway through:
1. Revert uncommitted changes: `git checkout -- .`
2. Re-run the milestone from the beginning
3. If errors persist, file a GitHub issue with error details

**Safe Rollback:**

At the start of each milestone, create a git commit:

    git add .
    git commit -m "checkpoint: before Milestone N"

If a milestone causes issues, rollback:

    git reset --hard HEAD~1

**Backup Strategy:**

Before starting this plan, create a backup branch:

    git checkout -b backup-before-modernization
    git checkout main

If catastrophic failure occurs, restore from backup:

    git checkout backup-before-modernization
    git branch -D main
    git checkout -b main

**Incremental Validation:**

After each milestone, run validation steps (tests, typecheck, manual testing) before proceeding to the next milestone. This ensures issues are caught early and not compounded across milestones.

**Recovery Checklist:**

If something goes wrong:
1. Check git status: `git status` (identify uncommitted changes)
2. Check test failures: `npm test` (identify broken functionality)
3. Check type errors: `npm run typecheck` (identify broken types)
4. Check app crashes: `npm run ios` (identify runtime errors)
5. Revert if needed: `git checkout -- src/path/to/broken-file.ts`
6. Re-run milestone with fixes
7. Document in "Surprises & Discoveries" section


## Artifacts and Notes

**Expected Artifacts After Completion:**

1. Refactored source code in `src/` with improved structure
2. New test files in `__tests__/` with comprehensive coverage
3. Architecture decision records in `docs/architecture/`
4. Updated documentation in `CLAUDE.md` and component READMEs
5. Coverage reports in `coverage/` (if `npm test -- --coverage` was run)
6. Git commit history showing incremental progress with descriptive messages

**File Size Comparison (Before → After):**

    contentListStore.ts:       625 LOC → ~350 LOC (43% reduction)
    journeyCalculations.ts:    676 LOC → 8 files × 80 LOC (monolith split)
    journeyStore.ts:           617 LOC → ~617 LOC (no size change, logic improvement)
    textProcessor.ts:          445 LOC → ~350 LOC (21% reduction)
    contentExtractor.ts:       540 LOC → ~150 LOC + 4 modules (modularized)
    ExpandableLearnCard.tsx:   669 LOC → ~150 LOC + 3 components + 1 hook (decomposed)
    CurriculumCreationWizard:  554 LOC → ~150 LOC + 4 steps + 1 hook (decomposed)
    InsightsPanel.tsx:         472 LOC → ~100 LOC + 3 cards (decomposed)

**Dependency Graph Improvement:**

Before: Circular dependencies between types, data, and utils. Complex import chains.

After: Clean dependency graph with types → constants → utils → services → stores → components. Zero circular dependencies.

**Test Coverage Improvement:**

Before: Estimated 60-70% coverage (assuming existing test suite).

After: >80% overall coverage, >90% for business logic modules. 100+ new test cases added.


## Interfaces and Dependencies

This section specifies the key interfaces and module boundaries that must exist after modernization.

**Journey Calculation Modules (src/utils/journey/):**

In src/utils/journey/velocityScore.ts:

    export function calculateEffectiveWpm(wpm: number, comprehension: number): number;
    export function calculateVelocityScore(sessions: JourneySession[]): number;
    export function getLevelFromVS(vs: number): VelocityLevel;
    export function getLevelProgress(vs: number): number;

In src/utils/journey/stats.ts:

    export function calculateAvgWpm(sessions: JourneySession[], count: number): number;
    export function calculateAvgComprehension(sessions: JourneySession[], count: number): number;
    export function calculateBestWpmAt80(sessions: JourneySession[]): number;

In src/utils/journey/userState.ts:

    export function detectUserState(sessions: JourneySession[]): UserState;
    export function calculateComfortBand(sessions: JourneySession[]): ComfortBand;
    export function getSuggestedWpm(comfortBand: ComfortBand, userState: UserState, cardType: 'primary' | 'stretch'): number;

In src/utils/journey/streaks.ts:

    export function calculateStreakUpdate(currentStreak: StreakData, completionDate?: string): StreakData;
    export function checkAndApplyStreakFreeze(currentStreak: StreakData): StreakData | null;
    export function isStreakAtRisk(streak: StreakData): boolean;

**Extraction Modules (src/services/extraction/):**

In src/services/extraction/readabilityExtractor.ts:

    export async function extractWithReadability(htmlString: string): Promise<{ title: string; content: string } | null>;

In src/services/extraction/htmlExtractor.ts:

    export function extractWithRegex(htmlString: string): { title: string; content: string } | null;

In src/services/extraction/htmlUtils.ts:

    export function stripHtml(html: string): string;
    export function extractTitle(html: string): string;
    export function normalizeWhitespace(text: string): string;

In src/services/extraction/networkUtils.ts:

    export async function fetchWithRetry(url: string, maxRetries: number): Promise<string>;

**Component Decomposition (src/components/):**

In src/components/addContent/ExpandableLearnCard.tsx:

    interface ExpandableLearnCardProps {
      onSuccess: (articleId: string) => void;
    }
    export function ExpandableLearnCard(props: ExpandableLearnCardProps): JSX.Element;

In src/components/addContent/LearnCardForm.tsx:

    interface LearnCardFormProps {
      topic: string;
      onTopicChange: (topic: string) => void;
      style: ArticleTone;
      onStyleChange: (style: ArticleTone) => void;
      duration: DurationOption;
      onDurationChange: (duration: DurationOption) => void;
      onSubmit: () => void;
    }
    export function LearnCardForm(props: LearnCardFormProps): JSX.Element;

In src/hooks/useLearnCardForm.ts:

    interface LearnCardFormState {
      topic: string;
      style: ArticleTone;
      duration: DurationOption;
      isValid: boolean;
    }
    export function useLearnCardForm(): {
      state: LearnCardFormState;
      setTopic: (topic: string) => void;
      setStyle: (style: ArticleTone) => void;
      setDuration: (duration: DurationOption) => void;
      submit: () => Promise<void>;
    };

**Type System Organization (src/types/journey/):**

In src/types/journey/core.ts:

    export type VelocityLevel = 'novice' | 'swift' | 'rapid' | 'elite' | 'legendary';
    export type UserState = 'push' | 'neutral' | 'consolidate';
    export interface ComfortBand { floor: number; median: number; ceiling: number; }
    export interface JourneySession { id: string; wpm: number; comprehension: number; effectiveWpm: number; completedAt: number; }
    export interface StreakData { currentDays: number; longestDays: number; lastCompletedDate: string; freezeAvailable: boolean; freezeUsedThisWeek: boolean; freezeLastReset: string; }

In src/types/journey/constants.ts:

    export const LEVEL_DEFINITIONS: Array<{ id: VelocityLevel; vsFloor: number; vsCeiling: number; label: string; color: string; }>;
    export const DEFAULT_COMFORT_BAND: ComfortBand;

In src/types/journey/certifications.ts:

    export type JourneyCertTier = 'novice' | 'swift' | 'rapid' | 'elite' | 'legendary';
    export interface JourneyCertDefinition { tier: JourneyCertTier; vsThreshold: number; speedProofWpm: number; speedProofMinComp: number; }
    export const JOURNEY_CERT_DEFINITIONS: JourneyCertDefinition[];

**Dependencies:**

- All journey modules depend on types from `src/types/journey/core.ts`
- Journey store depends on all journey utility modules
- Content list store depends on 4 source stores (contentStore, generatedStore, curriculumStore, learningStore)
- Text processor depends on language adapters (`src/services/language/`)
- Content extractor modules depend on html utils and network utils
- Components depend on design system tokens (`src/constants/designSystem/`)
- Hooks depend on stores via Zustand's `useStore` pattern


## Final Notes

This ExecPlan is comprehensive and prescriptive, designed to be executed by a single developer (or agent) with no prior context. Every file path is specified, every module boundary is defined, every validation step is concrete.

The work is broken into 10 milestones, each independently verifiable. Milestones 1-6 are mandatory and deliver the core value (40% complexity reduction, 60% duplication elimination). Milestones 7-9 are optional quality improvements (test coverage, data optimization, design system consolidation). Milestone 10 is documentation for knowledge transfer.

The plan is idempotent and safe: each milestone can be re-run, rollbacks are trivial via git, and validation steps catch issues before they compound.

Success is measured by observable outcomes: file sizes reduce dramatically, test coverage increases significantly, app continues to function identically, and developer velocity improves on subsequent features.

This is a living document. As work proceeds, update the Progress section with checkboxes and timestamps, record discoveries in Surprises & Discoveries, log decisions in Decision Log, and write a retrospective in Outcomes & Retrospective at completion.
