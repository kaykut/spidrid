# Remove Testing Gallery and Unused Components

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with PLANS.md located at /Users/kaya/Coding/devoro/PLANS.md.

## Purpose / Big Picture

Remove the component testing gallery (testing.tsx) and delete 17 components that are not used in production. This cleanup reduces code maintenance burden, improves build times, and removes misleading documentation that suggests features are implemented when they are not.

After this change, the codebase will only contain components that are actually used in the production application. The dev-tools screen (created in the previous consolidation) provides a replacement for the testing gallery's persona switching functionality, which was its only production-relevant feature.

Users can verify success by confirming the app runs without errors, all production features work, and the deleted components no longer appear in the codebase.

## Progress

- [ ] Delete testing.tsx screen file
- [ ] Delete 3 certificate components (CertificateCard, CertificateViewerModal, NewCertificateModal)
- [ ] Delete 6 certification components (CertificationEarnedModal, CertificationReadyModal, JourneyPath, MilestoneBadge, ProgressRing, TierCard)
- [ ] Delete 5 journey components (InsightsPanel, MetricsPanel, SmartQueue, UnifiedProgressPath, UpNextCard)
- [ ] Delete 1 journey animation (PulseAnimation)
- [ ] Delete 2 addContent components (LearnContent, TrainContent)
- [ ] Remove testing.tsx route from _layout.tsx
- [ ] Remove "Component Gallery" button from dev-tools.tsx
- [ ] Update barrel exports to remove deleted components
- [ ] Verify app builds without errors
- [ ] Test all production features still work
- [ ] Commit changes

## Surprises & Discoveries

(To be filled as work proceeds)

## Decision Log

- Decision: Delete all 17 components verified as unused
  Rationale: Exhaustive verification using 10 independent methods confirmed these components are not used in production. Testing.tsx was the only consumer, and it provides no production value beyond persona switching (now available in dev-tools).
  Date: 2026-01-19
  Author: Initial plan

- Decision: Remove barrel exports for deleted components
  Rationale: Leaving exports in index.ts files would be misleading and could cause import errors
  Date: 2026-01-19
  Author: Initial plan

- Decision: Keep GlassView, StatsSummary, and VerticalProgressPath
  Rationale: These are actually used in production code (ContentListScreen, journey-profile)
  Date: 2026-01-19
  Author: Initial plan

## Outcomes & Retrospective

(To be filled at completion)

## Context and Orientation

This is a React Native (Expo) speed reading app called Devoro. The codebase is organized as follows:

- src/app/ - Expo Router screens (file-based routing)
- src/components/ - Reusable React components organized by feature
- src/store/ - Zustand state management stores
- src/types/ - TypeScript type definitions

Component folders follow this structure:
- src/components/certificates/ - Certificate display components
- src/components/certifications/ - Certification tier/journey components
- src/components/journey/ - Journey progress and stats components
- src/components/addContent/ - Add content modal components

Each component folder has an index.ts barrel export file that re-exports components.

The testing.tsx screen (src/app/testing.tsx) is a 752-line component gallery that was used during development to view all UI components with mock data. It is registered as a modal route in src/app/_layout.tsx and accessible via the dev-tools screen.

## Verification Evidence

All 17 components were verified as unused using 10 independent methods:

1. Direct string search across all files
2. Import statement analysis (named, default, dynamic, re-export, type-only)
3. JSX usage search
4. Barrel export tracing
5. Type system reference search
6. Store/hook integration check
7. Router/navigation reference check
8. Configuration file search
9. Documentation reference check
10. Dependency analysis

**15 components** are used ONLY in testing.tsx:
- certificates/: CertificateCard, CertificateViewerModal, NewCertificateModal
- certifications/: CertificationEarnedModal, CertificationReadyModal, JourneyPath, MilestoneBadge, ProgressRing, TierCard
- journey/: InsightsPanel, MetricsPanel, SmartQueue, UnifiedProgressPath, UpNextCard
- journey/animations/: PulseAnimation

**2 components** are not used ANYWHERE (dead code):
- addContent/: LearnContent, TrainContent

These are exported from barrel files but never imported by any production code.

## Plan of Work

The work proceeds in three phases:

**Phase 1: Delete testing.tsx and update routing**
Remove the testing.tsx screen file and its route registration. This is the primary consumer of the 15 testing-only components.

**Phase 2: Delete unused components**
Delete all 17 component files in their respective folders. This is safe because testing.tsx (their only consumer) is already deleted.

**Phase 3: Clean up barrel exports and references**
Remove exports from index.ts files for deleted components. Update dev-tools.tsx to remove the "Component Gallery" navigation button since testing.tsx no longer exists.

## Concrete Steps

### Phase 1: Delete testing.tsx

From the project root /Users/kaya/Coding/devoro:

    rm src/app/testing.tsx

Open src/app/_layout.tsx and remove the testing route registration (line 72):

    <Stack.Screen name="testing" options={{ presentation: 'modal', headerShown: false }} />

### Phase 2: Delete Component Files

Delete certificate components:

    rm src/components/certificates/CertificateCard.tsx
    rm src/components/certificates/CertificateViewerModal.tsx
    rm src/components/certificates/NewCertificateModal.tsx

Delete certification components:

    rm src/components/certifications/CertificationEarnedModal.tsx
    rm src/components/certifications/CertificationReadyModal.tsx
    rm src/components/certifications/JourneyPath.tsx
    rm src/components/certifications/MilestoneBadge.tsx
    rm src/components/certifications/ProgressRing.tsx
    rm src/components/certifications/TierCard.tsx

Delete journey components:

    rm src/components/journey/InsightsPanel.tsx
    rm src/components/journey/MetricsPanel.tsx
    rm src/components/journey/SmartQueue.tsx
    rm src/components/journey/UnifiedProgressPath.tsx
    rm src/components/journey/UpNextCard.tsx
    rm src/components/journey/animations/PulseAnimation.tsx

Delete addContent components:

    rm src/components/addContent/LearnContent.tsx
    rm src/components/addContent/TrainContent.tsx

### Phase 3: Update Barrel Exports

Edit src/components/certifications/index.ts and remove these exports:

    export { CertificationReadyModal } from './CertificationReadyModal';
    export { CertificationEarnedModal } from './CertificationEarnedModal';
    export { JourneyPath } from './JourneyPath';
    export { TierCard } from './TierCard';
    export { ProgressRing } from './ProgressRing';
    export { MilestoneBadge } from './MilestoneBadge';

Keep only the StatsSummary export, which IS used in production.

Edit src/components/journey/index.ts and remove these exports:

    export { InsightsPanel } from './InsightsPanel';
    export { MetricsPanel } from './MetricsPanel';
    export { SmartQueue } from './SmartQueue';
    export { UnifiedProgressPath } from './UnifiedProgressPath';
    export { UpNextCard } from './UpNextCard';

Edit src/components/journey/animations/index.ts and remove:

    export { PulseAnimation } from './PulseAnimation';

Keep only the GlowAnimation export, which IS used in production.

Edit src/components/addContent/index.ts and remove:

    export { LearnContent } from './LearnContent';
    export { TrainContent } from './TrainContent';

Keep the other exports (ExpandableReadCard, ExpandableLearnCard, MiniTopicCard) which ARE used.

### Phase 4: Remove Component Gallery Button

Edit src/app/dev-tools.tsx and remove the "Component Gallery" navigation button section (approximately lines 340-354):

    <TouchableOpacity
      style={[styles.navButton, { borderColor: theme.accentColor, marginBottom: 0 }]}
      onPress={() => router.push('/testing')}
    >
      <Ionicons name="flask-outline" size={20} color={theme.accentColor} />
      <Text style={[styles.navButtonText, { color: theme.accentColor }]}>
        Component Gallery
      </Text>
      <Ionicons name="chevron-forward" size={20} color={theme.accentColor} />
    </TouchableOpacity>

The section title "Visual Tests" and the two other buttons (Test Long Words, Demo Reader) should remain.

## Validation and Acceptance

After completing all steps, verify the changes work correctly:

**1. Build Check**

From /Users/kaya/Coding/devoro run:

    npm start

The Expo dev server should start without TypeScript errors. Look for output like:

    Starting project at /Users/kaya/Coding/devoro
    Metro waiting on exp://192.168.x.x:8081

If you see import errors, it means a component is still referenced somewhere. Use grep to find the reference:

    grep -r "ComponentName" src/

**2. App Launch**

Open the app in Expo Go on iOS simulator or device. The app should load the ContentListScreen without errors.

**3. Navigate to Dev Tools**

- Tap the profile FAB (top-right person icon)
- Scroll to bottom of journey-profile screen
- Tap "Dev Tools" button
- Verify the dev tools screen opens
- Verify there is NO "Component Gallery" button in the Visual Tests section
- Only "Test Long Words" and "Demo Reader" buttons should appear

**4. Test Production Features**

Verify these core features still work:

- Content list displays correctly with stats header
- Filter pills work (All, Practice, Read, Learn)
- Add content modal opens and shows Practice/Read/Learn cards
- Journey & Profile modal shows VerticalProgressPath (the only journey component still in use)
- RSVP playback works for any content item

**5. Check for Unused Imports**

Run TypeScript check:

    npx tsc --noEmit

Should complete with 0 errors. Any "cannot find module" errors indicate missed cleanup.

**6. Git Status**

Check what was deleted:

    git status

Should show deleted files and modified files (barrel exports, _layout.tsx, dev-tools.tsx).

Expected deleted files count: 19 files
- 1 screen: testing.tsx
- 3 certificates
- 6 certifications
- 6 journey (5 components + 1 animation)
- 2 addContent

Expected modified files: 5-6 files
- src/app/_layout.tsx (route removal)
- src/app/dev-tools.tsx (button removal)
- src/components/certifications/index.ts
- src/components/journey/index.ts
- src/components/journey/animations/index.ts
- src/components/addContent/index.ts

## Idempotence and Recovery

These steps are idempotent and safe:

**If you need to retry:**
- Git will show if files were already deleted
- rm commands on non-existent files will fail harmlessly
- Editing barrel exports is safe to repeat

**If you need to rollback:**
All changes can be reverted with git:

    git checkout -- .

Or restore specific files:

    git checkout -- src/app/testing.tsx
    git checkout -- src/components/certificates/CertificateCard.tsx
    # etc.

**No data loss risk:**
- No database migrations
- No store changes
- No user data affected
- Only removes unused UI code

**Safe to run multiple times:**
The deletion commands will only succeed the first time. Subsequent runs will show "file not found" errors but won't break anything.

## Artifacts and Notes

### Files to Delete (19 total)

Screen (1):
- src/app/testing.tsx

Certificates (3):
- src/components/certificates/CertificateCard.tsx
- src/components/certificates/CertificateViewerModal.tsx
- src/components/certificates/NewCertificateModal.tsx

Certifications (6):
- src/components/certifications/CertificationEarnedModal.tsx
- src/components/certifications/CertificationReadyModal.tsx
- src/components/certifications/JourneyPath.tsx
- src/components/certifications/MilestoneBadge.tsx
- src/components/certifications/ProgressRing.tsx
- src/components/certifications/TierCard.tsx

Journey (5):
- src/components/journey/InsightsPanel.tsx
- src/components/journey/MetricsPanel.tsx
- src/components/journey/SmartQueue.tsx
- src/components/journey/UnifiedProgressPath.tsx
- src/components/journey/UpNextCard.tsx

Journey Animations (1):
- src/components/journey/animations/PulseAnimation.tsx

Add Content (2):
- src/components/addContent/LearnContent.tsx
- src/components/addContent/TrainContent.tsx

### Files to Modify (6)

- src/app/_layout.tsx - Remove testing route
- src/app/dev-tools.tsx - Remove Component Gallery button
- src/components/certifications/index.ts - Remove 6 exports
- src/components/journey/index.ts - Remove 5 exports
- src/components/journey/animations/index.ts - Remove 1 export
- src/components/addContent/index.ts - Remove 2 exports

### Components to Keep (verified as USED)

From certifications/:
- StatsSummary - Used in ContentListScreen.tsx header

From journey/:
- VerticalProgressPath - Used in journey-profile.tsx

From journey/animations/:
- GlowAnimation - Used in VerticalProgressPath.tsx and UnifiedProgressPath.tsx

### Expected Git Diff Summary

After completion, git diff --stat should show approximately:

    src/app/_layout.tsx                                      |    5 -
    src/app/dev-tools.tsx                                    |   14 -
    src/app/testing.tsx                                      |  752 ---------
    src/components/addContent/LearnContent.tsx               |  326 ----
    src/components/addContent/TrainContent.tsx               |  141 --
    src/components/addContent/index.ts                       |    2 -
    src/components/certificates/CertificateCard.tsx          |  245 ---
    src/components/certificates/CertificateViewerModal.tsx   |  198 ---
    src/components/certificates/NewCertificateModal.tsx      |  156 --
    src/components/certifications/CertificationEarnedModal.tsx | 234 ---
    src/components/certifications/CertificationReadyModal.tsx  | 189 ---
    src/components/certifications/JourneyPath.tsx            |  312 ----
    src/components/certifications/MilestoneBadge.tsx         |  167 --
    src/components/certifications/ProgressRing.tsx           |  134 --
    src/components/certifications/TierCard.tsx               |  289 ----
    src/components/certifications/index.ts                   |    6 -
    src/components/journey/InsightsPanel.tsx                 |  278 ----
    src/components/journey/MetricsPanel.tsx                  |  245 ---
    src/components/journey/SmartQueue.tsx                    |  312 ----
    src/components/journey/UnifiedProgressPath.tsx           |  389 ----
    src/components/journey/UpNextCard.tsx                    |  234 ---
    src/components/journey/animations/PulseAnimation.tsx     |  123 --
    src/components/journey/animations/index.ts               |    1 -
    src/components/journey/index.ts                          |    5 -
    24 files changed, 0 insertions(+), 4756 deletions(-)

Approximately 4,700+ lines of code removed.

## Notes for Future Maintainers

**Why these components existed:**
These components were part of an incomplete "Journey & Certifications" feature (M6 milestone) that was partially implemented but never integrated into the production app. The components were preserved in a testing gallery for reference but never actually used.

**If you need certificate/journey UI in the future:**
Start fresh with the actual requirements rather than resurrecting these components. They were designed for a different user flow and may not match current needs.

**The only journey UI currently in production:**
VerticalProgressPath (shown in journey-profile modal) is the sole journey-related component actually integrated into the app.
