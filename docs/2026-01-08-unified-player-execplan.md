# Unified Player and Playlist Architecture: Tab Restructuring

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with PLANS.md at the repository root.


## Purpose / Big Picture

Spidrid currently organizes content consumption around three tabs: Journey (certification progress), Read (import content), and Profile. The user experience will be improved by restructuring navigation to clearly separate the three ways users can add content to a unified playlist:

1. **Train** - Pre-generated curriculum articles for skill training
2. **Read** - User-imported content (URLs, text, ebooks)
3. **Learn** - Placeholder for future learning mode

After this change, users will see three tabs in the bottom navigation corresponding to these three content sources. The Journey certification screen will be removed from the main tabs (its content may be reintegrated elsewhere in a future milestone). This first increment establishes the new tab structure; subsequent increments will add the Player screen with playlist functionality.


## Progress

- [x] (2026-01-08) Create Train tab screen with MetricsPanel and topic picker
- [x] (2026-01-08) Create Learn tab placeholder screen
- [x] (2026-01-08) Update tab layout to register Train, Read, Learn, Profile
- [x] (2026-01-08) Create FloatingProfileButton component for top-right
- [x] (2026-01-08) Update FloatingNavBar with 4 nav items (Journey, Train, Read, Learn)
- [x] (2026-01-08) Update MetricsPanel with hideStreak prop
- [x] (2026-01-08) Update index.tsx to redirect to train tab
- [x] (2026-01-08) TypeScript compilation verified - no source errors
- [ ] Manual testing: Verify navigation between all tabs and profile button


## Surprises & Discoveries

- Observation: Journey tab restored to navigation after initial removal
  Evidence: User requested Journey remain visible as the leftmost tab. Nav now has 4 items: Journey, Train, Read, Learn.


## Decision Log

- Decision: Tab order will be Journey, Train, Read, Learn (left to right) - 4 tabs in nav
  Rationale: Journey remains visible as the leftmost tab for certification progress. Train, Read, Learn are the three content sources for the playlist. Profile is accessed via floating button.
  Date/Author: 2026-01-08 / User + Claude (revised)

- Decision: Profile accessible via floating button in top-right corner
  Rationale: Profile is not a content source for the playlist, so it should not be a main tab. A floating profile button in the top-right provides quick access without cluttering the content-source tabs.
  Date/Author: 2026-01-08 / User

- Decision: MetricsPanel in Train tab will show WPM and Comprehension only (no Streak)
  Rationale: User explicitly requested removing the Streak section to simplify the metrics display.
  Date/Author: 2026-01-08 / User

- Decision: Train tab triggers article by adding to playlist top, navigating to player, and auto-playing
  Rationale: User specified this as the expected behavior when selecting an article from the Train tab. However, Player infrastructure is deferred to a later increment.
  Date/Author: 2026-01-08 / User

- Decision: Playlist modal tabs in Player will be {Training, Reading, Learning} as 3 distinct queues
  Rationale: Each queue maps to content from the corresponding tab, allowing unified playback across content sources.
  Date/Author: 2026-01-08 / User


## Outcomes & Retrospective

(To be completed after implementation)


## Context and Orientation

Spidrid is a React Native (Expo) RSVP speed reading app. Navigation uses Expo Router with file-based routing. The relevant files are:

**Tab Layout and Navigation:**
- `src/app/(tabs)/_layout.tsx` - Registers tabs using Expo Router's `<Tabs>` component. Currently defines journey, read, profile tabs.
- `src/components/navigation/FloatingNavBar.tsx` - Custom floating navigation bar positioned at bottom-right. Contains `NAV_ITEMS` array defining routes, icons, and labels.

**Current Tab Screens:**
- `src/app/(tabs)/journey.tsx` - Certification progress with StatsSummary and VerticalProgressPath. Will be removed from tabs.
- `src/app/(tabs)/read.tsx` - Content import UI (URL, text, ebook). Unchanged.
- `src/app/(tabs)/profile.tsx` - User stats and certificates. Unchanged.

**Old Learn Tab (deleted, in git history):**
- Contained: stats card, demo button, topics grid with progress bars
- Used: `TOPICS` from curriculum, `useLearningStore` for progress tracking
- Navigated to `/topic/{id}` for article lists

**MetricsPanel Component:**
- `src/components/journey/MetricsPanel.tsx` - Displays avg WPM, comprehension %, streak in horizontal row
- Props: `avgWpm`, `avgComprehension`, `streakDays`, `bestWpmAt80`, `embedded`
- We will create a modified version or pass props to hide streak

**Curriculum Data:**
- `src/data/curriculum.ts` - Exports `TOPICS`, `ARTICLES`, helper functions
- `src/data/curriculum/index.ts` - Actual implementation
- Topics have: id, name, description, icon, color
- Articles have: id, topicId, title, content, wordCount, articleType

**Stores:**
- `src/store/learningStore.ts` - Article progress, topic progress, WPM tracking
- `src/store/journeyStore.ts` - Certification progress (avgWpmLast3, avgCompLast5)


## Plan of Work

This increment restructures tabs only. The Player screen and playlist infrastructure are deferred.

**Step 1: Create Train tab screen**

Create `src/app/(tabs)/train.tsx`. This screen combines the old Learn tab's topic picker with a MetricsPanel at the top (without streak). The screen will:
- Import `MetricsPanel` from `src/components/journey/MetricsPanel.tsx`
- Import `TOPICS` and use `useLearningStore` for progress
- Display MetricsPanel with avgWpm and avgComprehension from `useLearningStore.getRecentPerformance()`, passing `streakDays: 0` to effectively hide it (or we modify the component to accept a `hideStreak` prop)
- Display topic grid below, identical to the old Learn tab
- Navigation to `/topic/{id}` remains unchanged for now (Player integration comes later)

**Step 2: Create Learn tab placeholder**

Create `src/app/(tabs)/learn.tsx`. A simple placeholder screen with:
- SafeAreaView wrapper
- Title "Learn"
- Centered "Coming Soon" message with brief explanation
- Link/button encouraging users to use Train tab in the meantime

**Step 3: Update tab layout**

Modify `src/app/(tabs)/_layout.tsx`:
- Replace `<Tabs.Screen name="journey" />` with `<Tabs.Screen name="train" />`
- Add `<Tabs.Screen name="learn" />` after read
- Order: train, read, learn, profile (profile stays for now)

Wait - the user said 3 tabs: Train, Read, Learn. Profile may need to move or be accessible elsewhere. Let me check the user's intent... The user mentioned "The various ways that can add to the playlist each have their own tab from the main navigation" - so the 3 tabs are specifically for content sources. Profile might become a settings/account accessible from elsewhere, or remain as a 4th tab.

Profile will be a separate floating button in the top-right corner, not a tab. The FloatingNavBar will show Train, Read, Learn only.

**Step 4: Update FloatingNavBar**

Modify `src/components/navigation/FloatingNavBar.tsx`:
- Update `NAV_ITEMS` array to only 3 items:
  - Train: route `/(tabs)/train`, icon `barbell` (or `school` or `flash`)
  - Read: unchanged, icon `document-text`
  - Learn: route `/(tabs)/learn`, icon `book` or `library`
- Remove Profile from nav items
- Adjust NavItem type to include the new routes

**Step 5.5: Create FloatingProfileButton**

Create `src/components/navigation/FloatingProfileButton.tsx`:
- A floating circular button positioned at top-right
- Uses person icon from Ionicons
- Navigates to `/(tabs)/profile` on press
- Similar glass/blur styling as FloatingNavBar for consistency

**Step 5: Update MetricsPanel to support hiding streak**

Modify `src/components/journey/MetricsPanel.tsx`:
- Add optional `hideStreak?: boolean` prop
- Conditionally render the streak MetricItem and its divider based on this prop
- This is a minimal change that preserves existing behavior elsewhere


## Concrete Steps

All commands run from `/Users/kaya/Coding/spidrid`.

**1. Create Train tab:**

    npx expo start  # Verify app runs before changes

Create file `src/app/(tabs)/train.tsx` with topic picker and MetricsPanel.

**2. Modify MetricsPanel:**

Edit `src/components/journey/MetricsPanel.tsx` to add `hideStreak` prop.

**3. Create Learn placeholder:**

Create file `src/app/(tabs)/learn.tsx` with placeholder content.

**4. Update tab layout:**

Edit `src/app/(tabs)/_layout.tsx` to register train, read, learn, profile.

**5. Update FloatingNavBar:**

Edit `src/components/navigation/FloatingNavBar.tsx` with new NAV_ITEMS.

**6. Test:**

    npx expo start --ios

- Tap each tab in FloatingNavBar, verify navigation
- On Train tab: verify MetricsPanel shows WPM and Comprehension (no streak), verify topics grid displays
- Tap a topic, verify article list loads
- On Read tab: verify import UI works
- On Learn tab: verify placeholder displays


## Validation and Acceptance

After implementation, start the app with `npx expo start --ios` (or use a running dev server).

1. **Train tab**: Tapping the Train icon navigates to the Train screen. The screen shows a MetricsPanel at the top displaying average WPM and comprehension percentage (streak is hidden or shows "-"). Below is a grid of topics. Tapping a topic navigates to `/topic/{id}` and shows the article list.

2. **Read tab**: Unchanged from current behavior. Import buttons (URL, Text, Ebook) work correctly.

3. **Learn tab**: Shows "Coming Soon" placeholder text with encouragement to use Train tab.

4. **Profile tab**: Unchanged from current behavior. Stats and certificates display.

5. **FloatingNavBar**: Four icons visible. Active state highlights correctly when navigating between tabs.


## Idempotence and Recovery

All changes are additive file creations or edits. If a step fails:
- Train tab: Delete `src/app/(tabs)/train.tsx` and retry
- Learn tab: Delete `src/app/(tabs)/learn.tsx` and retry
- Layout/NavBar changes: Revert edits using git checkout

The old `journey.tsx` file will remain in the codebase but will no longer be registered in the tab layout. It can be deleted in a later cleanup step or repurposed.


## Artifacts and Notes

**Expected Train tab structure:**

    // src/app/(tabs)/train.tsx
    export default function TrainScreen() {
      // MetricsPanel at top (hideStreak=true)
      // Topics grid below
      // Each topic links to /topic/{id}
    }

**Expected FloatingNavBar NAV_ITEMS (3 items only):**

    const NAV_ITEMS: NavItem[] = [
      { name: 'Train', route: '/(tabs)/train', activeIcon: 'barbell', inactiveIcon: 'barbell-outline' },
      { name: 'Read', route: '/(tabs)/read', activeIcon: 'document-text', inactiveIcon: 'document-text-outline' },
      { name: 'Learn', route: '/(tabs)/learn', activeIcon: 'book', inactiveIcon: 'book-outline' },
    ];

**Expected FloatingProfileButton:**

    // src/components/navigation/FloatingProfileButton.tsx
    // Circular floating button at top-right with person icon
    // Navigates to /(tabs)/profile on press


## Interfaces and Dependencies

**MetricsPanel modification:**

In `src/components/journey/MetricsPanel.tsx`, modify the interface:

    export interface MetricsPanelProps {
      avgWpm: number;
      avgComprehension: number;
      streakDays: number;
      bestWpmAt80?: number;
      embedded?: boolean;
      hideStreak?: boolean;  // NEW: When true, hides the streak metric and its divider
    }

**Train screen dependencies:**

    import { MetricsPanel } from '../../components/journey/MetricsPanel';
    import { TOPICS } from '../../data/curriculum';
    import { useLearningStore } from '../../store/learningStore';
    import { useOnboardingStore } from '../../store/onboardingStore';

**NavItem type update:**

In `src/components/navigation/FloatingNavBar.tsx`:

    interface NavItem {
      name: string;
      route: '/(tabs)/train' | '/(tabs)/read' | '/(tabs)/learn';
      activeIcon: keyof typeof Ionicons.glyphMap;
      inactiveIcon: keyof typeof Ionicons.glyphMap;
    }


---

**Revision Notes:**

2026-01-08: Initial ExecPlan created for tab restructuring (Increment 1). Scope limited to renaming/restructuring tabs. Player screen, playlist modal, and play button in FloatingNavBar are deferred to subsequent increments.
