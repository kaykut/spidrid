# Unified Player and Playlist Architecture: 3-Tab Navigation

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with PLANS.md at the repository root.


## Purpose / Big Picture

Spidrid's navigation is being simplified from 4+ tabs down to 3 main tabs to reduce user confusion while maintaining access to all functionality. The three main tabs are:

1. **Journey** - Certification progress and milestones (leftmost)
2. **Play** - The unified player with playlist (center)
3. **Content** - A single tab containing 3 sub-tabs for content sources (rightmost)

The Content tab consolidates three content sources (Train, Read, Learn) into sub-tabs within a single main tab. This keeps the main navigation clean while preserving the distinct content pathways. Profile remains accessible via a floating button in the top-right corner.

After this change, users see exactly 3 tabs in the floating navbar. Tapping Content reveals a horizontal sub-tab bar at the top of the screen with Train, Read, and Learn options. The active sub-tab is remembered between visits.


## Progress

**Increment 1 (Completed):**
- [x] (2026-01-08) Created Train screen with MetricsPanel and topic picker
- [x] (2026-01-08) Created Learn placeholder screen
- [x] (2026-01-08) Created FloatingProfileButton component
- [x] (2026-01-08) Updated MetricsPanel with hideStreak prop

**Increment 2 (Current - 3-Tab Restructure):**
- [ ] Create Content tab with nested sub-tabs (Train, Read, Learn)
- [ ] Create Play tab placeholder screen
- [ ] Move train.tsx, read.tsx, learn.tsx into content/ folder
- [ ] Create ContentSubTabBar component for horizontal sub-navigation
- [ ] Update FloatingNavBar to 3 items (Journey, Play, Content)
- [ ] Update tab layout for new structure
- [ ] Persist active content sub-tab in store
- [ ] Update index.tsx redirect
- [ ] Test navigation and sub-tab persistence


## Surprises & Discoveries

- Observation: Initial 4-tab design (Journey, Train, Read, Learn) would become 5 tabs with Play, causing user confusion.
  Evidence: User feedback indicated need for simpler navigation structure.

- Observation: Sub-tabs within Content tab provide cleaner UX than multiple top-level tabs.
  Evidence: Consolidating content sources into one tab reduces cognitive load while maintaining functionality.


## Decision Log

- Decision: Main nav has exactly 3 tabs: Journey, Play, Content
  Rationale: Adding Play as a 5th tab would be confusing. Consolidating Train/Read/Learn into Content sub-tabs keeps navigation simple.
  Date/Author: 2026-01-08 / User

- Decision: Content sub-tabs use horizontal tab bar at top of screen with icon + text
  Rationale: Clear visual distinction from main nav. Icons provide quick recognition, text provides clarity.
  Date/Author: 2026-01-08 / User

- Decision: Content sub-tab state persists (remembers last visited)
  Rationale: Users returning to Content tab should see where they left off, not always reset to a default.
  Date/Author: 2026-01-08 / User

- Decision: Profile button must not overlap rightmost sub-tab
  Rationale: UI collision would make the rightmost sub-tab (Learn) difficult to tap.
  Date/Author: 2026-01-08 / User

- Decision: Content tab icon is `library`
  Rationale: Represents collection of content sources. Other options considered: `albums`, `add-circle`.
  Date/Author: 2026-01-08 / Claude

- Decision: Profile accessible via floating button in top-right corner
  Rationale: Profile is not a content source, so it should not be a main tab. Floating button provides quick access.
  Date/Author: 2026-01-08 / User

- Decision: MetricsPanel in Train sub-tab shows WPM and Comprehension only (no Streak)
  Rationale: Simplify metrics display in training context.
  Date/Author: 2026-01-08 / User


## Outcomes & Retrospective

(To be completed after implementation)


## Context and Orientation

Spidrid is a React Native (Expo) RSVP speed reading app using Expo Router for file-based navigation. This section describes the current state after Increment 1 and what needs to change for Increment 2.

**Current State (after Increment 1):**

The FloatingNavBar currently has 4 items: Journey, Train, Read, Learn. These are registered as separate tabs in `src/app/(tabs)/_layout.tsx`. The files are:

- `src/app/(tabs)/journey.tsx` - Certification progress screen
- `src/app/(tabs)/train.tsx` - MetricsPanel + topics grid (created in Increment 1)
- `src/app/(tabs)/read.tsx` - Content import UI
- `src/app/(tabs)/learn.tsx` - Placeholder (created in Increment 1)
- `src/app/(tabs)/profile.tsx` - User stats and certificates

The FloatingProfileButton component exists at `src/components/navigation/FloatingProfileButton.tsx` and provides access to Profile from the top-right corner.

**Target State (after Increment 2):**

The FloatingNavBar will have 3 items: Journey, Play, Content. The Content tab uses Expo Router's nested navigation to provide sub-tabs:

    src/app/(tabs)/
      _layout.tsx              # Main tab layout: journey, play, content, profile
      journey.tsx              # Unchanged
      play.tsx                 # NEW: Player screen placeholder
      profile.tsx              # Unchanged (accessed via floating button)
      content/                 # NEW: Nested route group
        _layout.tsx            # Sub-tab layout with ContentSubTabBar
        train.tsx              # Moved from (tabs)/train.tsx
        read.tsx               # Moved from (tabs)/read.tsx
        learn.tsx              # Moved from (tabs)/learn.tsx

**Key Components:**

- `FloatingNavBar` at `src/components/navigation/FloatingNavBar.tsx` - Will be updated to 3 items
- `FloatingProfileButton` at `src/components/navigation/FloatingProfileButton.tsx` - Unchanged
- `ContentSubTabBar` (NEW) at `src/components/navigation/ContentSubTabBar.tsx` - Horizontal sub-tab bar for Content

**Stores:**

- `src/store/settingsStore.ts` - Will add `activeContentTab` state to persist sub-tab selection


## Plan of Work

**Step 1: Create Content nested route structure**

Create directory `src/app/(tabs)/content/` with a layout file that renders the ContentSubTabBar and child screens. The layout uses Expo Router's `<Slot>` to render the active sub-tab.

**Step 2: Create ContentSubTabBar component**

Create `src/components/navigation/ContentSubTabBar.tsx`. This is a horizontal bar at the top of the Content tab showing three sub-tabs: Train (barbell icon), Read (document icon), Learn (book icon). Each sub-tab shows icon + text label. The bar must be positioned so it doesn't collide with the FloatingProfileButton in the top-right.

**Step 3: Move existing screens into content folder**

Move the following files:
- `src/app/(tabs)/train.tsx` → `src/app/(tabs)/content/train.tsx`
- `src/app/(tabs)/read.tsx` → `src/app/(tabs)/content/read.tsx`
- `src/app/(tabs)/learn.tsx` → `src/app/(tabs)/content/learn.tsx`

Update imports if any paths change (likely not, since imports use relative paths from the file location).

**Step 4: Create Play tab placeholder**

Create `src/app/(tabs)/play.tsx`. For now, this is a placeholder screen similar to the Learn placeholder. It will show "Player" title and a message indicating the player functionality is coming.

**Step 5: Update main tab layout**

Modify `src/app/(tabs)/_layout.tsx` to register: journey, play, content, profile. The content route will automatically use the nested layout.

**Step 6: Update FloatingNavBar**

Modify `src/components/navigation/FloatingNavBar.tsx`:
- Change NAV_ITEMS to 3 items: Journey, Play, Content
- Journey: route `/(tabs)/journey`, icon `rocket`
- Play: route `/(tabs)/play`, icon `play-circle`
- Content: route `/(tabs)/content`, icon `library`

**Step 7: Add sub-tab persistence**

Add `activeContentTab: 'train' | 'read' | 'learn'` to settingsStore (or create a dedicated uiStore). The ContentSubTabBar reads this value on mount and navigates to it. When user switches sub-tabs, update the store.

**Step 8: Update index.tsx redirect**

Change the default redirect from `/(tabs)/train` to `/(tabs)/content/train` (or just `/(tabs)/content` if the layout handles default routing).


## Concrete Steps

All commands run from `/Users/kaya/Coding/spidrid`.

**1. Create content directory and layout:**

    mkdir -p src/app/\(tabs\)/content

Create `src/app/(tabs)/content/_layout.tsx` with SafeAreaView, ContentSubTabBar, and Slot.

**2. Create ContentSubTabBar component:**

Create `src/components/navigation/ContentSubTabBar.tsx` with horizontal tabs.

**3. Move screen files:**

    mv src/app/\(tabs\)/train.tsx src/app/\(tabs\)/content/train.tsx
    mv src/app/\(tabs\)/read.tsx src/app/\(tabs\)/content/read.tsx
    mv src/app/\(tabs\)/learn.tsx src/app/\(tabs\)/content/learn.tsx

**4. Create Play placeholder:**

Create `src/app/(tabs)/play.tsx` with placeholder content.

**5. Update _layout.tsx:**

Edit `src/app/(tabs)/_layout.tsx` to register journey, play, content, profile.

**6. Update FloatingNavBar:**

Edit `src/components/navigation/FloatingNavBar.tsx` with 3 nav items.

**7. Update settingsStore:**

Add activeContentTab state to persist sub-tab selection.

**8. Update index.tsx:**

Change redirect to `/(tabs)/content/train` or `/(tabs)/content`.

**9. Test:**

    npx expo start --ios

- Tap Journey: see certification progress
- Tap Play: see placeholder
- Tap Content: see sub-tab bar with Train active (or last visited)
- Tap each sub-tab: Train shows topics, Read shows import UI, Learn shows placeholder
- Navigate away and back to Content: sub-tab should persist
- Tap Profile button: see profile screen


## Validation and Acceptance

After implementation, start the app with `npx expo start --ios`.

1. **FloatingNavBar**: Shows exactly 3 icons: Journey (rocket), Play (play-circle), Content (library). Active states work correctly.

2. **Journey tab**: Tapping Journey shows certification progress screen with milestones. Unchanged from before.

3. **Play tab**: Tapping Play shows placeholder with "Player" title and coming soon message.

4. **Content tab**: Tapping Content shows:
   - Horizontal sub-tab bar at top with Train, Read, Learn (icon + text each)
   - Sub-tab bar does not overlap with Profile button in top-right
   - Active sub-tab is highlighted
   - Content area shows the selected sub-tab's screen

5. **Content sub-tabs**:
   - Train: MetricsPanel (WPM + Comprehension, no streak) + topics grid
   - Read: Import UI (URL, Text, Ebook buttons) + content list
   - Learn: Placeholder with "Coming Soon"

6. **Sub-tab persistence**: Navigate to Read sub-tab, then navigate to Journey, then back to Content. Content should show Read (not Train).

7. **Profile button**: Floating button in top-right navigates to Profile screen. Does not overlap with Learn sub-tab.


## Idempotence and Recovery

All changes are file moves, creates, and edits. If a step fails:
- Content directory: Delete `src/app/(tabs)/content/` and restore original files from git
- FloatingNavBar: Revert using git checkout
- Store changes: Revert using git checkout

The original train.tsx, read.tsx, learn.tsx files can be restored from git if the move fails.


## Artifacts and Notes

**Expected ContentSubTabBar structure:**

    // src/components/navigation/ContentSubTabBar.tsx
    const SUB_TABS = [
      { name: 'Train', route: 'train', icon: 'barbell' },
      { name: 'Read', route: 'read', icon: 'document-text' },
      { name: 'Learn', route: 'learn', icon: 'book' },
    ];

    export function ContentSubTabBar() {
      // Horizontal row of touchable tabs
      // Each tab shows icon + text
      // Active tab highlighted
      // On press, navigate to sub-route and update store
    }

**Expected content/_layout.tsx structure:**

    // src/app/(tabs)/content/_layout.tsx
    export default function ContentLayout() {
      return (
        <SafeAreaView>
          <ContentSubTabBar />
          <Slot />
        </SafeAreaView>
      );
    }

**Expected FloatingNavBar NAV_ITEMS:**

    const NAV_ITEMS: NavItem[] = [
      { name: 'Journey', route: '/(tabs)/journey', activeIcon: 'rocket', inactiveIcon: 'rocket-outline' },
      { name: 'Play', route: '/(tabs)/play', activeIcon: 'play-circle', inactiveIcon: 'play-circle-outline' },
      { name: 'Content', route: '/(tabs)/content', activeIcon: 'library', inactiveIcon: 'library-outline' },
    ];


## Interfaces and Dependencies

**ContentSubTabBar component:**

    interface SubTab {
      name: string;
      route: string;
      icon: keyof typeof Ionicons.glyphMap;
    }

**settingsStore addition:**

    interface SettingsStore {
      // existing fields...
      activeContentTab: 'train' | 'read' | 'learn';
      setActiveContentTab: (tab: 'train' | 'read' | 'learn') => void;
    }

**NavItem type update:**

    interface NavItem {
      name: string;
      route: '/(tabs)/journey' | '/(tabs)/play' | '/(tabs)/content';
      activeIcon: keyof typeof Ionicons.glyphMap;
      inactiveIcon: keyof typeof Ionicons.glyphMap;
    }


---

**Revision Notes:**

2026-01-08: Initial ExecPlan created for tab restructuring (Increment 1).

2026-01-08: Major revision - Changed from 4-tab structure to 3-tab structure. Train, Read, Learn become sub-tabs within a unified Content tab. Play becomes a main tab. This simplifies navigation while maintaining all functionality.
