# Navigation Revamp: Single-Screen Content List with Modal Architecture

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with PLANS.md at the repository root.

## Purpose / Big Picture

Currently, Spidrid uses a 4-tab navigation (Journey, Play, Content, Profile) with the Content tab having 3 sub-tabs (Train, Read, Learn). This creates cognitive overhead and fragments the user's content across multiple screens.

After this change, users will see a single unified content list showing ALL their content (training articles, imported books/articles, AI-generated content, and curricula) in one place. Two floating action buttons (FABs) provide access to Journey+Profile (top-right) and adding new content (bottom-right). Everything else—playback, content addition, settings—happens in full-screen modals.

The user can: (1) see all their content at a glance with filter pills, (2) tap any item to immediately start reading in a playback modal, (3) access their progress stats and settings via a single button, (4) add new content through a tiered modal flow.

## Progress

- [x] (2026-01-11) M1: Create unified content store and types
  - Created `src/types/contentList.ts` with ContentSource, ContentCategory, ContentItemState, ContentListItem
  - Created `src/store/contentListStore.ts` with getContentList(), setFilter(), deleteItem()
  - Created `src/__tests__/store/contentListStore.test.ts` with 30 comprehensive tests
  - All tests pass (2094 total), typecheck and lint clean
- [x] (2026-01-11) M2: Build content list screen with filter pills
  - Created `src/components/navigation/FABButton.tsx` - floating action button with glass effect
  - Created `src/components/contentList/FilterPills.tsx` - horizontal category filter pills
  - Created `src/components/contentList/ContentListItemCard.tsx` - content item card with swipe-to-delete
  - Created `src/components/contentList/CurriculumAccordionItem.tsx` - expandable curriculum card
  - Created `src/components/contentList/EmptyState.tsx` - empty state with CTA
  - Created `src/components/contentList/ContentListScreen.tsx` - main screen with FlatList
  - Updated `src/app/index.tsx` to render ContentListScreen directly (removed onboarding redirect)
  - Updated `__tests__/app/index.test.tsx` for new behavior
  - All tests pass (2093 total), typecheck and lint clean
- [ ] M3: Create Journey+Profile full-screen modal
- [ ] M4: Create Add Content tiered modal (Practice/Read/Learn)
- [ ] M5: Convert play.tsx to Playback modal with separate Quiz modal
- [ ] M6: Remove tab navigation infrastructure
- [ ] M7: Deprecate playlistStore and migrate progress tracking
- [ ] M8: Remove linear unlock progression for training articles
- [ ] M9: Polish, cleanup dead code, handle edge cases
- [ ] M10: Combine Journey+Profile content refinement (deferred)

## Surprises & Discoveries

- Observation: contentStore.addContent() returns the created content with generated id, so tests need to capture return value rather than use pre-created mocks with ids
  Evidence: Test failures when using factory-created mocks led to using addContent return value

- Observation: ContentListScreen requires ThemeProvider context for useTheme hook; existing index.test.tsx was testing old redirect behavior
  Evidence: Tests failed with "useTheme must be used within a ThemeProvider" until wrapped properly

## Decision Log

- Decision: Replace playlist concept entirely with content list
  Rationale: User clarified that the content list IS the library; no separate queue needed since playback is visual reading (not audio) and has no background state
  Date: 2026-01-11

- Decision: No tab navigation at all
  Rationale: User wants radical simplification—single main screen with FABs for Journey+Profile (top-right) and Add Content (bottom-right)
  Date: 2026-01-11

- Decision: Closing playback modal resets state
  Rationale: Playback is reading (visual), not audio—there is no "background playback" concept
  Date: 2026-01-11

- Decision: Quiz opens as separate modal after reading completes
  Rationale: User preference for distinct modal flow
  Date: 2026-01-11

- Decision: All training articles accessible immediately (remove linear unlock)
  Rationale: User requested simplified access without progression gates
  Date: 2026-01-11

- Decision: iOS 26 Liquid Glass style with full-screen back gesture
  Rationale: User requested adherence to iOS 26 navigation paradigm (swipe from anywhere to go back, fluid glass material)
  Date: 2026-01-11

- Decision: Filters are mutually exclusive
  Rationale: User preference—tap one filter deselects others
  Date: 2026-01-11

- Decision: Fixed 50-page threshold for books vs articles
  Rationale: User confirmed hardcoded constant, no configuration needed
  Date: 2026-01-11

- Decision: Curricula expanded by default when added to list
  Rationale: User preference for immediate visibility of curriculum articles
  Date: 2026-01-11

- Decision: Curriculum articles only shown when fully generated
  Rationale: User clarified that generation is synchronous; no "generating" placeholder items in list
  Date: 2026-01-11

- Decision: Playback modal opens ready but user must press play
  Rationale: User clarified modal adds item and opens player, but user initiates playback manually
  Date: 2026-01-11

- Decision: Mandatory design system token adherence with zero hardcoded values
  Rationale: Per CLAUDE.md, all styling must use design tokens from spacing.ts, typography.ts, and themes.ts. No hardcoded colors, spacing, radii, or typography values. No creating new tokens—use existing system only.
  Date: 2026-01-11

## Outcomes & Retrospective

(To be completed at milestones and project end)

## Glossary of Terms

This section defines technical terms used throughout this plan. Per PLANS.md, every term of art must be defined in plain language.

**FAB (Floating Action Button)**: A circular button that "floats" above other content, typically positioned at a screen corner. In this app, two FABs provide quick access to Journey+Profile (top-right) and Add Content (bottom-right). Implementation uses absolute positioning with the GlassView component.

**RSVP (Rapid Serial Visual Presentation)**: A speed reading technique that displays words one at a time at a fixed position, eliminating eye movement. The user reads by focusing on a single point while words flash sequentially. Implemented in `src/hooks/useRSVPEngine.ts`.

**ORP (Optimal Recognition Point)**: The letter position within a word where the eye naturally focuses for fastest recognition, typically slightly left of center. The RSVP display highlights this position in coral red. Calculated in `src/services/orp.ts`.

**Curriculum**: A structured sequence of AI-generated articles on a topic, containing 3-10 articles that build on each other progressively. Stored in `src/store/curriculumStore.ts`.

**Velocity Score (VS)**: A 0-100 composite metric measuring the user's speed reading proficiency, combining WPM (words per minute) and comprehension accuracy. Tracked in `src/store/journeyStore.ts`.

**GlassView**: A reusable component implementing the iOS 26 "Liquid Glass" visual style—a translucent material that reflects and refracts content behind it. Located at `src/components/common/GlassView.tsx`.

**Zustand Store**: A lightweight state management solution. Each store file (e.g., `useContentStore`) provides global state accessible via React hooks. Files follow the pattern `src/store/use[Name]Store.ts`.

## Design System Compliance (Mandatory)

All new components MUST use the existing design system tokens. NEVER hardcode colors, spacing, radii, shadows, or typography values. NEVER create new design tokens—use only what exists.

### Token Files

The design system is defined in these files, which must be imported and used for ALL styling:

    src/constants/spacing.ts      - Spacing and sizing tokens
    src/constants/typography.ts   - Font styles and weights
    src/data/themes.ts           - Color themes (dark, midnight, sepia, light)
    src/utils/colorUtils.ts      - Color manipulation utilities

### Required Tokens

**Spacing** (8pt grid system): Use `SPACING.{xxs=2, xs=4, sm=8, md=16, lg=24, xl=32, xxl=40, xxxl=48, huge=56, massive=64}` for all margins, paddings, and gaps.

**Component Spacing**: Use `COMPONENT_SPACING.{cardPadding=20, screenPadding=16, sectionGap=24, listItemGap=12, inlineGap=8}` for standard component layouts.

**Border Radius**: Use `COMPONENT_RADIUS.{button=12, card=16, modal=20, chip=8, input=12, progressBar=6, node='full'}` for all rounded corners.

**Touch Targets & Icons**: Use `SIZES.{touchTarget=44, iconSm=16, iconMd=24, iconLg=24, iconXl=32, iconHuge=48}` for interactive elements and icons.

**Typography**: Use `TYPOGRAPHY.{vsNumber, pageTitle, sectionTitle, cardTitle, body, label, caption, metric, button}` for all text styling. Use `FONT_WEIGHTS` for weight variations.

**Colors**: Use `theme.{textColor, backgroundColor, secondaryBackground, accentColor}` from the current theme context. Use `JOURNEY_COLORS.{accent, success, warning, low, textPrimary, textSecondary}` for semantic colors. Use `COLOR_OPACITY.{successTint, lowTint}` for tinted backgrounds.

**Shadows**: Use `SHADOWS.{sm, md, lg, glow(color)}` for elevation effects.

### Enforcement Rules

1. Every new component file must import from `spacing.ts`, `typography.ts`, and access theme via `useTheme()` hook
2. Code review must reject any hardcoded numeric values for spacing (e.g., `padding: 16` must be `padding: SPACING.md`)
3. Code review must reject any hardcoded color values (e.g., `color: '#ffffff'` must be `color: theme.textColor`)
4. If a design requires a value not in the system, STOP and discuss with the user rather than creating a new token
5. The FilterPills component must use `COMPONENT_RADIUS.chip` (8). The cards must use `COMPONENT_RADIUS.card` (16). The FABs must use `COMPONENT_RADIUS.node` (full/circular).
6. All touchable areas must meet `SIZES.touchTarget` (44pt minimum)

## Context and Orientation

### Current Navigation Structure

The app uses Expo Router with a tab-based layout:

- `src/app/_layout.tsx` - Root Stack navigator wrapping everything
- `src/app/(tabs)/_layout.tsx` - Tabs component with 4 tabs (Journey, Play, Content, Profile)
- `src/app/(tabs)/content/_layout.tsx` - Nested layout with 3 sub-tabs (Train, Read, Learn)

Custom navigation components:
- `src/components/navigation/FloatingNavBar.tsx` - Glass pill at bottom-right for tab switching
- `src/components/navigation/FloatingProfileButton.tsx` - Profile access on Journey tab
- `src/components/navigation/ContentSubTabBar.tsx` - Pills for Train/Read/Learn sub-tabs

### Current Data Stores

All in `src/store/`:
- `playlistStore.ts` - Three queues (training/reading/learning), nowPlaying state, progress tracking (TO BE REMOVED)
- `contentStore.ts` - Imported content (URL, PDF, EPUB, text)
- `curriculumStore.ts` - AI-generated multi-article curricula
- `generatedStore.ts` - AI-generated single articles
- `learningStore.ts` - Training article progress and completion
- `journeyStore.ts` - User stats, velocity score, certifications
- `settingsStore.ts` - App preferences
- `subscriptionStore.ts` - Premium status
- `onboardingStore.ts` - Onboarding state (TO BE REMOVED)

### Current Content Types

Defined in `src/types/`:
- `ImportedContent` (content.ts) - URL/PDF/EPUB/text imports with `source` field
- `Curriculum` and `CurriculumArticle` (curriculum.ts) - AI curricula
- `GeneratedArticle` (learning.ts) - AI single articles
- `Article` (learning.ts) - Pre-seeded training articles
- `PlaylistItem` (playlist.ts) - Queue items (TO BE REMOVED)

### Key Utilities

- `src/utils/contentResolver.ts` - Resolves PlaylistItem to actual content
- `src/services/textProcessor.ts` - Processes text for RSVP
- `src/hooks/useRSVPEngine.ts` - RSVP playback engine

## Plan of Work

### Milestone 1: Unified Content Store Foundation

Create a new store that aggregates all content types into a unified list view without replacing the source stores.

Create `src/types/contentList.ts`:

    export type ContentSource = 'training' | 'imported' | 'generated' | 'curriculum';
    export type ContentCategory = 'books' | 'articles' | 'learning' | 'training';
    export type ContentItemState = 'not_started' | 'in_progress' | 'completed';

    export interface ContentListItem {
      id: string;
      sourceId: string;
      source: ContentSource;
      category: ContentCategory;
      title: string;
      wordCount: number;
      pageCount?: number;
      state: ContentItemState;
      progress: number;
      quizScore?: number;
      hasQuiz: boolean;
      quizPending: boolean;  // reading done but quiz not taken
      addedAt: number;
      lastPlayedAt?: number;
      isCurriculum?: boolean;
      curriculumId?: string;
      curriculumProgress?: { completed: number; total: number };
      curriculumArticles?: ContentListItem[];
    }

Create `src/store/contentListStore.ts`:

This store does NOT persist—it computes the unified list by reading from existing stores (contentStore, curriculumStore, generatedStore, learningStore, and the static curriculum data). Key methods:

    interface ContentListState {
      activeFilter: ContentCategory | null;
      setFilter: (filter: ContentCategory | null) => void;
      getContentList: () => ContentListItem[];
      deleteItem: (item: ContentListItem) => void;
    }

The `getContentList()` method:
1. Gets all ImportedContent from contentStore
2. Gets all GeneratedArticle from generatedStore
3. Gets all Curriculum from curriculumStore (each becomes expandable item with nested articles)
4. Gets all training topics/articles from static curriculum data (`src/data/curriculum/index.ts`)
5. Determines category for each item using this logic:
   - source='training' → category='training'
   - source='generated' or 'curriculum' → category='learning'
   - source='imported' with (pdf AND pageCount>50) OR epub → category='books'
   - source='imported' otherwise → category='articles'
6. Filters by activeFilter if set
7. Sorts by addedAt descending (most recent first)

### Milestone 2: Content List Screen

Create the main screen that replaces the tab-based home.

Create `src/components/contentList/FilterPills.tsx`:

Horizontal row of glass-style pills: "All", "Books", "Articles", "Learning", "Training". Uses GlassView component. Only one active at a time. Active pill gets accent color background.

Create `src/components/contentList/ContentListItemCard.tsx`:

Card showing:
- Left: Icon based on source/category (book icon for books, link icon for URLs, brain for AI, stopwatch for training)
- Center: Title, word count, state indicator
- Right: Progress bar (0-100%) OR quiz score (e.g., "85%") OR "Take Quiz" button if quizPending
- Swipeable with delete action (uses react-native-gesture-handler Swipeable)

Create `src/components/contentList/CurriculumAccordionItem.tsx`:

Extends ContentListItemCard for curricula. Shows chevron for expand/collapse. When expanded, renders nested ContentListItemCard for each generated article only (generation is synchronous, so articles not yet generated are not displayed). Nested articles use the same progress bar logic as top-level items (progress %, quiz score, or "Take Quiz" button). Curriculum-level progress shows "3/10 articles" format. Starts expanded by default when added.

Create `src/components/contentList/EmptyState.tsx`:

Centered illustration with "No content yet" message and CTA button "Get Started" that opens add-content modal.

Create `src/components/contentList/ContentListScreen.tsx`:

Main screen component with:
- SafeAreaView wrapper
- FilterPills at top
- FlatList of ContentListItem (use keyExtractor with item.id)
- FABButton top-right (Journey+Profile)
- FABButton bottom-right (+ Add content)
- EmptyState when list is empty

Create `src/components/navigation/FABButton.tsx`:

Generic floating action button using GlassView. Props: position ('top-right'|'bottom-right'), icon (Ionicons name), onPress. Uses absolute positioning with safe area insets.

Modify `src/app/index.tsx`:

Remove all onboarding redirect logic. Simply render ContentListScreen:

    export default function Index() {
      return <ContentListScreen />;
    }

### Milestone 3: Journey+Profile Full-Screen Modal

Create modal route `src/app/journey-profile.tsx`:

Full-screen modal combining journey stats and profile settings. Uses ScrollView with sections:
1. Close button (X) in top-left corner
2. Stats Summary (from journey.tsx StatsSummary component)
3. Vertical Progress Path (from journey.tsx)
4. Profile Settings section with:
   - Theme selector grid
   - Subscription status
   - Reading settings
   - Developer controls (if debug mode)

Modify `src/app/_layout.tsx`:

Add modal route:

    <Stack.Screen
      name="journey-profile"
      options={{
        presentation: 'fullScreenModal',
        animation: 'slide_from_bottom',
        gestureEnabled: true,
      }}
    />

Wire FABButton in ContentListScreen to navigate:

    onPress={() => router.push('/journey-profile')}

### Milestone 4: Add Content Tiered Modal

Create modal route `src/app/add-content.tsx`:

Two-level modal with internal state management (not nested routes).

Level 1 shows 3 cards with chevrons:
- Practice: "choose from a list of pre-generated content to practice speed reading" → loads TrainContent
- Read: "speed read your own articles or books, provided as PDFs, Epubs, or Links" → loads ReadContent
- Learn: "generate articles or extensive curricula to ramp up on topics in a blaze" → loads LearnContent

Level 2 renders the appropriate content component with back navigation (either swipe gesture or back button in header).

Extract reusable content components from existing sub-tabs:

Create `src/components/addContent/TrainContent.tsx`:
- Extract topic grid logic from `src/app/(tabs)/content/train.tsx`
- When user taps a topic → navigate to `/topic/[id]` (existing route)
- After selecting article, close modal and open playback

Create `src/components/addContent/ReadContent.tsx`:
- Extract import UI from `src/app/(tabs)/content/read.tsx`
- URL input modal, text paste modal, document picker
- After import completes, add to contentStore, close modal, open playback

Create `src/components/addContent/LearnContent.tsx`:
- Extract generate UI from `src/app/(tabs)/content/learn.tsx`
- Segment control for Articles/Curricula
- Generate Article modal, Curriculum wizard
- After generation, add to appropriate store, close modal, open playback

Add to `src/app/_layout.tsx`:

    <Stack.Screen
      name="add-content"
      options={{
        presentation: 'fullScreenModal',
        animation: 'slide_from_bottom',
        gestureEnabled: true,
      }}
    />

### Milestone 5: Playback Modal

Create modal route `src/app/playback.tsx`:

Extract playback logic from `src/app/(tabs)/play.tsx` into a modal. Key differences:
- No PlaylistBottomSheet
- No nowPlaying from playlistStore—receives content via route params
- Modal-local state only (no persistent background state)
- Opens with content loaded but paused—user must press play to start
- When reading completes with quiz, navigate to quiz modal
- When reading completes without quiz, close modal and return to list

Route params:

    type PlaybackParams = {
      sourceId: string;
      source: ContentSource;
    };

The modal resolves content using existing `resolveContent` utility (may need slight modification to accept ContentSource instead of PlaylistSource).

Create quiz modal route `src/app/playback-quiz.tsx`:

Separate modal for quiz flow. Receives article questions via params or reads from store. Shows QuestionRenderer for each question. On completion, saves score to appropriate store, closes both modals, returns to content list.

Modify ContentListScreen:

Tap on ContentListItemCard navigates to playback:

    router.push({
      pathname: '/playback',
      params: { sourceId: item.sourceId, source: item.source }
    });

### Milestone 6: Remove Tab Navigation Infrastructure

Delete entire `src/app/(tabs)/` directory (after extracting needed logic to new components).

Delete navigation components:
- `src/components/navigation/FloatingNavBar.tsx`
- `src/components/navigation/ContentSubTabBar.tsx`
- `src/components/navigation/FloatingProfileButton.tsx`

Delete onboarding:
- `src/app/onboarding/` directory
- `src/store/onboardingStore.ts`

Update `src/app/_layout.tsx`:

Remove (tabs) route. Final structure:

    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="journey-profile" options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="add-content" options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="playback" options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="playback-quiz" options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="topic" />
      <Stack.Screen name="article" />
      <Stack.Screen name="content" />
      <Stack.Screen name="generated" />
      <Stack.Screen name="curriculum" />
      <Stack.Screen name="testing" options={{ presentation: 'modal' }} />
    </Stack>

### Milestone 7: Deprecate playlistStore

The playlist concept is fully replaced by contentListStore. Progress tracking moves to source stores.

Modify `src/store/contentStore.ts`:
- Add `lastPlayedAt?: number` to ImportedContent interface
- Add `updateLastPlayed(id: string)` action

Modify `src/store/generatedStore.ts`:
- Ensure `lastReadAt` field exists and is updated on playback

Modify `src/store/curriculumStore.ts`:
- Ensure article `completedAt` is updated on completion

Delete:
- `src/store/playlistStore.ts`
- `src/types/playlist.ts`
- `src/components/playlist/` directory

Update all imports that referenced playlistStore (search codebase for "playlistStore" and "PlaylistItem").

### Milestone 8: Remove Linear Unlock Progression

Modify `src/store/learningStore.ts`:

Change `isArticleUnlocked` to always return true:

    isArticleUnlocked: () => true

Update `src/app/topic/[id].tsx`:
- Remove lock icons from articles
- Remove disabled state from article cards
- All articles are tappable regardless of completion

### Milestone 9: Polish and Cleanup

Run through entire app flow and fix edge cases:
- Empty state displays correctly
- Filters work properly
- Swipe-to-delete works
- All modals open/close correctly
- Progress persists correctly
- Quiz scores save correctly

Remove dead code:
- Unused components
- Unused types
- Unused store actions

Performance optimization:
- Ensure FlatList uses proper keyExtractor
- Test with 100+ content items
- Profile for memory leaks

## Concrete Steps

Commands run from project root `/Users/kaya/Coding/spidrid`:

1. Create new type definitions:

       # Create the file
       touch src/types/contentList.ts

2. Create new store:

       touch src/store/contentListStore.ts

3. Create content list components:

       mkdir -p src/components/contentList
       touch src/components/contentList/FilterPills.tsx
       touch src/components/contentList/ContentListItemCard.tsx
       touch src/components/contentList/CurriculumAccordionItem.tsx
       touch src/components/contentList/EmptyState.tsx
       touch src/components/contentList/ContentListScreen.tsx

4. Create FAB component:

       touch src/components/navigation/FABButton.tsx

5. Create modal routes:

       touch src/app/journey-profile.tsx
       touch src/app/add-content.tsx
       touch src/app/playback.tsx
       touch src/app/playback-quiz.tsx

6. Create add-content sub-components:

       mkdir -p src/components/addContent
       touch src/components/addContent/TrainContent.tsx
       touch src/components/addContent/ReadContent.tsx
       touch src/components/addContent/LearnContent.tsx

7. Run tests after each milestone:

       npm test

8. Run the app to verify:

       npm run ios

## Validation and Acceptance

After each milestone, verify:

**M1**: Run `npm test` - new store tests pass. Import contentListStore in a component and call `getContentList()` - returns array.

**M2**: Run `npm run ios`. App launches to content list. Filter pills visible. FABs visible. Existing content appears in list.

**M3**: Tap top-right FAB. Journey+Profile modal opens. Stats visible. Settings functional. Swipe down or tap X to close.

**M4**: Tap bottom-right FAB. Add content modal opens at Level 1. Tap card to see Level 2. Back gesture returns to Level 1.

**M5**: Tap any content item. Playback modal opens. RSVP works. Quiz appears after reading (if applicable). Scores save.

**M6**: No tab bar visible. All navigation via FABs and modals. Deep links to `/topic/[id]` still work.

**M7**: No errors related to playlistStore. Content list shows "last played" sorting.

**M8**: All training articles tappable without completing previous ones.

**M9**: Full user flow works end-to-end. No console errors. Performance acceptable.

Final acceptance:
1. Fresh install shows empty state with CTA
2. Add content via + modal → content appears in list
3. Tap content → playback modal opens → reading works → quiz works → score saves
4. Filter by category → list filters correctly
5. Swipe to delete → item removed
6. Tap Journey FAB → stats and settings accessible
7. Close all modals → back to content list

## Idempotence and Recovery

Each milestone creates new files or modifies existing ones additively. The old (tabs) directory remains until M6, allowing rollback.

If a milestone fails:
1. Git stash or revert changes for that milestone
2. Fix the issue
3. Re-apply changes

The contentListStore is read-only from source stores—no data migration needed. Source stores remain unchanged until M7.

## Artifacts and Notes

Key file locations after completion:

    src/
    ├── app/
    │   ├── _layout.tsx          # Root Stack with modal routes
    │   ├── index.tsx            # Renders ContentListScreen
    │   ├── journey-profile.tsx  # Journey+Profile modal
    │   ├── add-content.tsx      # Add content tiered modal
    │   ├── playback.tsx         # Playback modal
    │   ├── playback-quiz.tsx    # Quiz modal
    │   ├── topic/[id].tsx       # Topic articles (kept)
    │   ├── article/[id].tsx     # Article reader (kept)
    │   └── ...
    ├── components/
    │   ├── contentList/
    │   │   ├── FilterPills.tsx
    │   │   ├── ContentListItemCard.tsx
    │   │   ├── CurriculumAccordionItem.tsx
    │   │   ├── EmptyState.tsx
    │   │   └── ContentListScreen.tsx
    │   ├── addContent/
    │   │   ├── TrainContent.tsx
    │   │   ├── ReadContent.tsx
    │   │   └── LearnContent.tsx
    │   └── navigation/
    │       └── FABButton.tsx
    ├── store/
    │   ├── contentListStore.ts  # NEW unified view
    │   ├── contentStore.ts      # KEPT
    │   ├── curriculumStore.ts   # KEPT
    │   ├── generatedStore.ts    # KEPT
    │   ├── learningStore.ts     # MODIFIED (unlock logic)
    │   └── journeyStore.ts      # KEPT
    └── types/
        └── contentList.ts       # NEW unified types

## Interfaces and Dependencies

In `src/types/contentList.ts`, define:

    export type ContentSource = 'training' | 'imported' | 'generated' | 'curriculum';
    export type ContentCategory = 'books' | 'articles' | 'learning' | 'training';
    export type ContentItemState = 'not_started' | 'in_progress' | 'completed';

    export interface ContentListItem {
      id: string;
      sourceId: string;
      source: ContentSource;
      category: ContentCategory;
      title: string;
      wordCount: number;
      pageCount?: number;
      state: ContentItemState;
      progress: number;
      quizScore?: number;
      hasQuiz: boolean;
      quizPending: boolean;
      addedAt: number;
      lastPlayedAt?: number;
      isCurriculum?: boolean;
      curriculumId?: string;
      curriculumProgress?: { completed: number; total: number };
      curriculumArticles?: ContentListItem[];
    }

In `src/store/contentListStore.ts`, define:

    interface ContentListState {
      activeFilter: ContentCategory | null;
      setFilter: (filter: ContentCategory | null) => void;
      getContentList: () => ContentListItem[];
      deleteItem: (item: ContentListItem) => void;
    }

    export const useContentListStore: UseBoundStore<StoreApi<ContentListState>>;

In `src/components/navigation/FABButton.tsx`, define:

    interface FABButtonProps {
      position: 'top-right' | 'bottom-right';
      icon: string;
      onPress: () => void;
    }

    export const FABButton: React.FC<FABButtonProps>;

---

## Revision Notes

Initial plan created 2026-01-11 based on user requirements discussion. Key requirements confirmed:
- Single main screen (content list) with no tabs
- Two FABs: Journey+Profile (top-right), Add Content (bottom-right)
- All other screens are full-screen modals
- Playlist concept removed entirely
- iOS 26 Liquid Glass style navigation
- Mutually exclusive filter pills
- Training articles all accessible (no linear unlock)
- Quiz as separate modal after playback
- Curricula expanded by default in list
- Curriculum articles only shown when generated (synchronous)
- Playback modal opens ready but paused; user presses play
- MANDATORY: 100% design system token adherence (see Design System Compliance section)

Revision 2 (2026-01-11): Added Glossary of Terms section defining FAB, RSVP, ORP, Curriculum, Velocity Score, GlassView, and Zustand Store per PLANS.md requirement that every term of art must be defined. Added comprehensive Design System Compliance section with all token references from CLAUDE.md and enforcement rules prohibiting hardcoded values.
