# Spidrid Complexity Reduction: Remove Non-Value-Adding Patterns

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

Reference: This document must be maintained in accordance with PLANS.md at the repository root.

## Purpose / Big Picture

This ExecPlan removes complexity patterns that do not provide user value from the Spidrid codebase. After completing this work, developers will experience a cleaner, more maintainable codebase with approximately 2,500 fewer lines of dead code, zero duplicate data systems, and consistent design token usage. Users will experience identical functionality with potentially slightly faster app load times due to reduced bundle size.

The changes are entirely internal. Users can verify the app works identically by running through the main flows: opening topics, reading articles with RSVP, completing quizzes, viewing certificates, and importing content. Developers can verify success by running the test suite and confirming no new failures appear.

## Progress

- [ ] Milestone 1: Delete dead stores and consolidate state (estimated ~400 lines removed)
- [ ] Milestone 2: Delete dead services (estimated ~400 lines removed)
- [ ] Milestone 3: Delete dead components (estimated ~1,400 lines removed)
- [ ] Milestone 4: Simplify screens and fix navigation (estimated ~200 lines simplified)
- [ ] Milestone 5: Remove dead hooks, utils, constants, types (estimated ~300 lines removed)
- [ ] Milestone 6: Consolidate design tokens (estimated ~100 lines changed)
- [ ] Final validation: Run full test suite and manual verification

## Surprises & Discoveries

(To be populated during implementation)

## Decision Log

- Decision: Organize work into 6 milestones by code layer rather than by severity.
  Rationale: Layer-based organization allows each milestone to be tested independently and reduces cross-cutting risk. State changes before components because components depend on stores.
  Date/Author: 2026-01-09 / Complexity Analysis

- Decision: Prioritize deletion over refactoring.
  Rationale: Dead code provides zero user value. Deleting is safer and simpler than attempting to "fix" or "improve" unused code. If features are needed later, they can be re-implemented with current requirements.
  Date/Author: 2026-01-09 / Complexity Analysis

## Outcomes & Retrospective

(To be populated at completion)

## Context and Orientation

The Spidrid codebase is a React Native (Expo) RSVP speed reading app. Five complexity analysis agents reviewed all code and identified patterns that add cognitive overhead, maintenance burden, or runtime cost without providing corresponding user value.

Key architectural components:

- **Zustand stores** in `src/store/` manage application state (8 stores, ~1,200 lines)
- **Services** in `src/services/` contain business logic (8 files, ~1,100 lines)
- **Components** in `src/components/` are reusable UI pieces (37 files across subdirectories)
- **Screens** in `src/app/` are Expo Router pages (23 files)
- **Hooks** in `src/hooks/` provide React hook abstractions (2 files)
- **Utils/Constants/Types** in respective directories provide shared utilities

The app is complete (all 6 milestones from the original execplan done) but has accumulated dead code from iterative development, abandoned features, and backwards-compatibility shims that are no longer needed.

## Plan of Work

The work proceeds in 6 milestones, each independently testable. Within each milestone, deletions happen before consolidations, and tests are run after each significant change.


## Milestone 1: Delete Dead Stores and Consolidate State

After this milestone, the codebase will have 7 stores instead of 8, with no duplicate session tracking and cleaner state shapes. Users experience no change. Developers see simpler state management.

### 1.1 Delete certificateStore.ts Entirely

The file `src/store/certificateStore.ts` is a 59-line wrapper around `journeyStore` with zero state of its own. It exists solely for "backwards compatibility" that is no longer needed.

**Step 1:** Update the single consumer to use journeyStore directly.

In `src/app/topic/[id].tsx`, locate the import and usage around lines 8-12 and 55-65:

    // Current code:
    import { useCertificateStore } from '@/store/certificateStore';
    const { getCertificationProgress } = useCertificateStore();
    const earnedTiers = getCertificationProgress().earnedTiers;

Replace with direct journeyStore access:

    // New code:
    import { useJourneyStore } from '@/store/journeyStore';
    import { CERTIFICATION_TIER_DEFINITIONS } from '@/types/journey';
    const { certProgress } = useJourneyStore();
    const earnedTiers = CERTIFICATION_TIER_DEFINITIONS
      .filter(def => certProgress[def.tier].examPassed)
      .map(def => def.tier);

**Step 2:** Delete `src/store/certificateStore.ts`.

**Step 3:** Delete the test file `src/__tests__/store/certificateStore.test.ts` if it exists.

**Verification:** Run `npm test -- --testPathPattern="topic"` and confirm tests pass.

### 1.2 Remove Duplicate Session Tracking from learningStore

The `learningStore` maintains `recentCompletions` which duplicates data already in `journeyStore.sessions`. The cross-store sync in `journeyStore.recordSession()` calls `learningStore.completeArticle()` for "backwards compatibility."

**Step 1:** In `src/store/journeyStore.ts`, remove the cross-store call at lines 234-237:

    // DELETE these lines:
    if (articleType === 'curriculum') {
      useLearningStore.getState().completeArticle(articleId, comprehension, wpm, false);
    }

**Step 2:** In `src/store/learningStore.ts`:
- Remove the `recentCompletions` field from state (line 27-33)
- Remove the logic that populates it in `completeArticle` action
- Keep the `articleProgress` tracking since that stores different data (completion status, quiz attempts)

**Step 3:** Update any component that reads `recentCompletions` to read from `journeyStore.sessions` instead.

**Verification:** Run `npm test -- --testPathPattern="learning|journey"` and confirm tests pass.

### 1.3 Remove Dead State Fields

**In `src/store/contentStore.ts`:** Remove `currentContentId` field (line 9) and `setCurrentContent` action (lines 67-69). These are only used in tests.

**In `src/store/journeyStore.ts`:** Remove `levelHistory` field (line 90) and its update logic (lines 275-278). This tracks "when each level was first reached" but is never displayed to users.

**In `src/store/learningStore.ts`:** Remove `isCertificationAttemptAvailable` (lines 199-202) and related certification tracking fields in `ArticleProgress`. These overlap with journeyStore's certification system.

**Verification:** Run `npm test` and update/delete tests that reference removed fields.

### 1.4 Convert Cached Derived State to Selectors

In `src/store/journeyStore.ts`, the following fields are stored but could be computed on-demand from `sessions`:

- `avgWpmLast3`
- `avgWpmLast5`
- `avgCompLast5`
- `avgCompLast10`
- `bestWpmAt80`

**Step 1:** Remove these five fields from the state interface and initial state.

**Step 2:** Convert them to selector functions:

    // Add as store methods:
    getAvgWpmLast3: () => {
      const sessions = get().sessions;
      const last3 = sessions.slice(-3);
      return last3.length > 0
        ? Math.round(last3.reduce((s, x) => s + x.wpm, 0) / last3.length)
        : 0;
    },

**Step 3:** Update `recalculateAll()` to not set these values.

**Step 4:** Update consumers to call the getter functions instead of reading state.

**Verification:** Run full test suite. Performance impact is negligible (array operations on max 10 elements).

### 1.5 Remove Dev Code from Production

In `src/store/subscriptionStore.ts`:

**Step 1:** Change `isPremium: true` to `isPremium: false` (line 31).

**Step 2:** Guard `simulatePurchase` and `simulateRestore` behind development check:

    ...(process.env.NODE_ENV === 'development' && {
      simulatePurchase: async () => { /* existing code */ },
      simulateRestore: async () => { /* existing code */ },
    }),

**Verification:** In development mode, confirm simulate functions still work. In production build, confirm they are not accessible.


## Milestone 2: Delete Dead Services

After this milestone, the services directory will have 7 files instead of 8, with no unused 368-line recommendation service.

### 2.1 Delete recommendationService.ts Entirely

The file `src/services/recommendationService.ts` (368 lines) implements article recommendations but is never imported by any production code. Only used in testing.tsx with hardcoded mock data.

**Step 1:** Delete `src/services/recommendationService.ts`.

**Step 2:** Delete `src/__tests__/services/recommendationService.test.ts` if it exists.

**Step 3:** Remove any barrel exports from `src/services/index.ts` if present.

**Verification:** Run `npm test` and confirm no import errors.

### 2.2 Extract Shared stripHtml Utility

Both `src/services/contentExtractor.ts` and `src/services/epubParser.ts` contain their own `stripHtml()` functions.

**Step 1:** Create `src/utils/htmlUtils.ts`:

    export function stripHtml(html: string, options?: { preserveParagraphs?: boolean }): string {
      let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
      text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

      if (options?.preserveParagraphs) {
        text = text.replace(/<\/?(p|div|br|h[1-6]|li|tr)[^>]*>/gi, '\n');
      }

      text = text.replace(/<[^>]+>/g, ' ');

      // Entity replacements (comprehensive list from epubParser)
      text = text.replace(/&nbsp;/g, ' ');
      text = text.replace(/&amp;/g, '&');
      text = text.replace(/&lt;/g, '<');
      text = text.replace(/&gt;/g, '>');
      text = text.replace(/&quot;/g, '"');
      text = text.replace(/&#39;/g, "'");
      text = text.replace(/&mdash;/g, '—');
      text = text.replace(/&ndash;/g, '–');
      text = text.replace(/&ldquo;/g, '"');
      text = text.replace(/&rdquo;/g, '"');
      text = text.replace(/&lsquo;/g, "'");
      text = text.replace(/&rsquo;/g, "'");
      text = text.replace(/&#\d+;/g, '');

      text = text.replace(/\s+/g, ' ').trim();
      return text;
    }

**Step 2:** Update both service files to import from the shared utility.

**Step 3:** Delete the local `stripHtml` functions from both files.

**Verification:** Run tests for both services. Import and process a URL and an EPUB to confirm behavior unchanged.

### 2.3 Remove No-Op Function

In `src/services/certificatePDF.ts`, delete `deleteCertificatePDF` (lines 39-42) and its usage in `CertificateViewerModal.tsx`. The function does nothing and the comment explains why (temp files auto-cleanup).


## Milestone 3: Delete Dead Components

After this milestone, approximately 1,400 lines of unused component code will be removed from the bundle.

### 3.1 Delete Components Only Used in testing.tsx

The following components are only imported by `src/app/testing.tsx` and provide no production value:

1. `src/components/certifications/JourneyPath.tsx` (255 lines)
2. `src/components/certifications/ProgressRing.tsx` (136 lines)
3. `src/components/journey/InsightsPanel.tsx` (473 lines)
4. `src/components/journey/UpNextCard.tsx` (356 lines)

**Step 1:** Delete all four component files.

**Step 2:** Update `testing.tsx` to remove imports and usages of these components.

**Step 3:** Delete corresponding test files if they exist.

**Verification:** Run `npm test` and confirm no import errors.

### 3.2 Delete Unused Hook Exports

In `src/components/journey/animations/`:
- Remove `export` from `useGlowAnimation` in `GlowAnimation.tsx`
- Remove `export` from `usePulseAnimation` in `PulseAnimation.tsx`
- Update barrel export in `index.ts` to not re-export these hooks

These hooks are internal implementation details, not public API.

### 3.3 Delete LockedCertificateCard Export

In `src/components/certificates/CertificateCard.tsx`, remove the `LockedCertificateCard` export (lines 95-127). It's only used in testing.tsx. If locked state display is needed, add a `locked` prop to `CertificateCard` instead.

### 3.4 Remove Unused Props

**In `src/components/playlist/PlaylistItemRow.tsx`:** Remove `onDragStart` prop and drag handle UI. The prop is defined but never passed by `PlaylistBottomSheet.tsx`. The drag handle creates false affordance.

### 3.5 Extract Shared ProgressBar Component

Both `TierCard.tsx` and `VerticalProgressPath.tsx` define local `ProgressBar` components.

**Step 1:** Create `src/components/common/ProgressBar.tsx` with the shared implementation.

**Step 2:** Update both files to import and use the shared component.


## Milestone 4: Simplify Screens and Fix Navigation

### 4.1 Delete Redundant Layout Files

Delete these three files that only contain `<Stack screenOptions={{ headerShown: false }} />` (already set in root layout):

- `src/app/article/_layout.tsx`
- `src/app/content/_layout.tsx`
- `src/app/topic/_layout.tsx`

### 4.2 Fix Broken Paywall Route

In `src/app/topic/[id].tsx` line 55, replace:

    router.push('/paywall?reason=content_limit');

With the component pattern used elsewhere:

    setShowPaywall(true);

And add the Paywall component to the render, matching the pattern in `profile.tsx` and `read.tsx`.

### 4.3 Remove Placeholder Learn Sub-Tab

Delete `src/app/(tabs)/content/learn.tsx` (96 lines). It's a "Coming Soon" placeholder that adds confusion. Update `ContentSubTabBar.tsx` to show only Train and Read tabs until Learn mode is implemented.

### 4.4 Extract TopicGrid Component

Create `src/components/topics/TopicGrid.tsx` to eliminate duplication between `src/app/topics.tsx` and `src/app/(tabs)/content/train.tsx`.

### 4.5 Centralize Navigation Logic

Create `src/utils/navigation.ts`:

    import { UsageMode } from '@/types';

    export function getDefaultRoute(usageMode: UsageMode): string {
      return usageMode === 'import-only'
        ? '/(tabs)/content/read'
        : '/(tabs)/content/train';
    }

Update `src/app/index.tsx` and `src/app/onboarding/topics.tsx` to use this function.


## Milestone 5: Remove Dead Hooks, Utils, Constants, Types

### 5.1 Delete Dead Hook

Delete `src/hooks/useCertificationDetection.ts` (103 lines). It's never imported by any component.

### 5.2 Clean Constants

In `src/constants/animations.ts`, delete:
- `animateLayout` function
- `SPRING_CONFIG` constant
- `staggerDelay` function
- `delay` function
- Remove `export` from `EASING` (make it private)

In `src/constants/spacing.ts`, delete:
- `padding()` function
- `margin()` function

In `src/constants/typography.ts`, delete:
- `BADGE_TEXT` constant
- `DISPLAY_FONT_FAMILY` constant

### 5.3 Clean Utils

In `src/utils/colorUtils.ts`, delete `HEX_ALPHA` export.

In `src/utils/contentResolver.ts`, remove `export` from `resolveContentById`.

In `src/utils/journeyCalculations.ts`:
- Delete `isSpeedProof` function
- Remove `export` from `getWeekStartDate`
- Move `generateSessionId` to `journeyStore.ts` as private function

In `src/utils/calculateQuizScore.ts`, delete `getCorrectAnswerDisplay`.

### 5.4 Clean Types

In `src/types/learning.ts`, delete:
- `PRACTICE_WORD_COUNTS`
- `CERTIFICATION_WORD_COUNTS`
- `getRecommendedQuizSize`

In `src/types/certificates.ts`:
- Delete `getCertificateDefinition` (keep only `getCertificationTierDefinition`)
- Delete `earnedCertificationToCertificate`
- Remove type re-exports, update consumers to import from `journey.ts` directly

In `src/types/journey.ts`, delete `JourneyPathNode` interface.

In `src/types/playback.ts`, delete `PlaybackState` interface.


## Milestone 6: Consolidate Design Tokens

### 6.1 Merge Radius Systems

In `src/constants/spacing.ts`, there are two radius systems: `RADIUS` (base tokens) and `COMPONENT_RADIUS` (semantic tokens). Consolidate into one:

    export const RADIUS = {
      // Base tokens
      xs: 2,
      sm: 4,
      md: 6,
      lg: 8,
      xl: 12,
      xxl: 16,
      xxxl: 20,
      full: 9999,
      // Semantic aliases (for common components)
      button: 12,
      buttonLarge: 16,
      input: 12,
      card: 16,
      modal: 20,
      chip: 8,
      badge: 9999,
      progressBar: 6,
      node: 9999,
    } as const;

Delete `COMPONENT_RADIUS`. Update all imports to use the unified `RADIUS`.


## Concrete Steps

All commands run from repository root `/Users/kaya/Coding/spidrid`:

    # Before starting: Create a branch
    git checkout -b complexity-reduction

    # After each milestone: Run tests
    npm test

    # After each milestone: Verify app runs
    npm run ios

    # After all milestones: Run full verification
    npm test
    npm run ios
    # Manually test: Open topic -> Read article -> Complete quiz -> View certificates

    # When complete: Commit with clear message
    git add -A
    git commit -m "Remove ~2,500 lines of dead code and consolidate duplicates"


## Validation and Acceptance

**Test Suite:** Run `npm test` after each milestone. All existing tests should pass (some tests may need deletion if they test removed code).

**Manual Verification:** After all milestones:
1. Start the app with `npm run ios`
2. Navigate through Topics -> select a topic -> read an article with RSVP
3. Complete a quiz and verify score displays correctly
4. View Profile and verify certificates display
5. Import content via URL and via text input
6. Verify theme switching works
7. Verify all navigation flows work without crashes

**Expected Outcomes:**
- ~2,500 fewer lines of code
- 1 fewer Zustand store (certificateStore deleted)
- 1 fewer service file (recommendationService deleted)
- 4 fewer component files (dead testing components)
- No change to user-visible functionality
- Potentially faster app load time (smaller bundle)


## Idempotence and Recovery

Each milestone can be run independently. If a milestone fails partway:
1. Run `git diff` to see current changes
2. Run `git checkout -- <file>` to revert specific files
3. Or run `git stash` to save partial progress

The work is entirely subtractive (deleting code) or consolidative (merging duplicates). No data migrations are required. The app's persisted storage format is unchanged.

If tests fail after a deletion, it indicates either:
- The deleted code was actually used (investigate and restore if needed)
- Tests existed for dead code (delete the tests too)


## Artifacts and Notes

Complexity analysis was performed by 5 specialized agents examining:
1. State management (8 stores, ~1,200 lines)
2. Services layer (8 files, ~1,100 lines)
3. Components (37 files across subdirectories)
4. Navigation and screens (23 files)
5. Hooks, utilities, constants, and types

Key findings aggregated from all agents:

**Dead code by category:**
- 1 entire store (certificateStore): 59 lines
- 1 entire service (recommendationService): 368 lines
- 4 entire components: ~1,220 lines
- 1 unused hook: 103 lines
- Numerous dead exports: ~200 lines

**Duplicate systems:**
- Session tracking in both learningStore and journeyStore
- stripHtml in both contentExtractor and epubParser
- ProgressBar in both TierCard and VerticalProgressPath
- RADIUS and COMPONENT_RADIUS token systems

**Risk assessment:**
- Breakage risk: LOW (all identified dead code verified unused)
- Test impact: MEDIUM (some tests exist for dead code)
- User impact: NONE (all changes are internal)


## Interfaces and Dependencies

No external interfaces change. Internal interfaces simplified:

**Removed stores:**
- `useCertificateStore` - consumers migrate to `useJourneyStore`

**Removed exports from services:**
- `getSimpleRecommendation` from recommendationService
- `getSmartQueueRecommendations` from recommendationService

**Removed type exports:**
- `CertificateDefinition` alias (use `JourneyCertDefinition`)
- `CertificationTierProgress` alias (use `JourneyCertProgress`)

**Design tokens consolidated:**
- `COMPONENT_RADIUS` merged into `RADIUS`

---

## Revision Notes

2026-01-09: Initial ExecPlan created based on synthesis of 5 complexity guardian agent analyses. Plan covers all identified non-value-adding complexity patterns organized into 6 milestones by code layer.
