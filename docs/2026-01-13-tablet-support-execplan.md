# Tablet Form Factor Support ExecPlan

**Created:** 2026-01-13
**Scope:** Solid tablet support (~15h)
**Excludes:** Landscape orientation, keyboard shortcuts, pointer/hover states

---

## Overview

Add responsive tablet support to Devoro with multi-column layouts, adaptive spacing, and tablet-appropriate modal presentation. The app currently has no tablet consideration—all layouts are mobile-first with fixed dimensions.

### Goals
- Content looks polished on iPad (768-1024pt+ screens)
- Multi-column grids for content lists, topics, certificates
- RSVP display scales appropriately for larger screens
- Modals use centered card presentation instead of full-screen

### Non-Goals
- Landscape orientation support
- Keyboard shortcuts
- Pointer/trackpad hover states
- Split View / Slide Over support

---

## Milestone 1: Responsive Foundation (~2h)

### Objective
Create the responsive infrastructure that all other changes depend on.

### Tasks

#### 1.1 Create useResponsive hook
**File:** `src/hooks/useResponsive.ts` (new)

```typescript
import { useWindowDimensions } from 'react-native';

export interface ResponsiveInfo {
  screenWidth: number;
  screenHeight: number;
  isTablet: boolean;
  contentMaxWidth: number;
  columnCount: number;
  scaleFactor: number;
}

export const BREAKPOINTS = {
  tablet: 768,
  largeTablet: 1024,
} as const;

export function useResponsive(): ResponsiveInfo {
  const { width, height } = useWindowDimensions();

  const isTablet = width >= BREAKPOINTS.tablet;
  const isLargeTablet = width >= BREAKPOINTS.largeTablet;

  return {
    screenWidth: width,
    screenHeight: height,
    isTablet,
    contentMaxWidth: isTablet ? 720 : width,
    columnCount: isLargeTablet ? 3 : isTablet ? 2 : 1,
    scaleFactor: isTablet ? 1.25 : 1.0,
  };
}
```

#### 1.2 Create responsive spacing helpers
**File:** `src/constants/responsive.ts` (new)

```typescript
import { SPACING, COMPONENT_SPACING, SIZES } from './spacing';
import { RSVP_DISPLAY } from './typography';

export const RESPONSIVE_SPACING = {
  screenPadding: (isTablet: boolean) => isTablet ? SPACING.xl : COMPONENT_SPACING.screenPadding,
  cardPadding: (isTablet: boolean) => isTablet ? SPACING.lg : COMPONENT_SPACING.cardPadding,
  sectionGap: (isTablet: boolean) => isTablet ? SPACING.xl : COMPONENT_SPACING.sectionGap,
};

export const RESPONSIVE_TYPOGRAPHY = {
  rsvpFontSize: (isTablet: boolean) => isTablet ? 64 : RSVP_DISPLAY.fontSize,
  rsvpContainerHeight: (isTablet: boolean) => isTablet ? 160 : 120,
};

export const RESPONSIVE_CONTROLS = {
  playButton: (isTablet: boolean) => isTablet ? 96 : 72,
  controlButton: (isTablet: boolean) => isTablet ? 72 : 56,
};

export function getGridColumnCount(screenWidth: number, itemMinWidth: number = 150): number {
  if (screenWidth >= 1024) return 5;
  if (screenWidth >= 768) return 4;
  if (screenWidth >= 600) return 3;
  return 3; // Default for phones
}

export function calculateGridItemWidth(
  screenWidth: number,
  columnCount: number,
  horizontalPadding: number,
  gap: number
): number {
  const totalGaps = (columnCount - 1) * gap;
  return (screenWidth - horizontalPadding * 2 - totalGaps) / columnCount;
}
```

#### 1.3 Create ResponsiveContainer component
**File:** `src/components/layout/ResponsiveContainer.tsx` (new)

```typescript
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export function ResponsiveContainer({
  children,
  style,
  fullWidth = false
}: ResponsiveContainerProps) {
  const { contentMaxWidth, isTablet } = useResponsive();

  if (fullWidth || !isTablet) {
    return <View style={[styles.container, style]}>{children}</View>;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.content, { maxWidth: contentMaxWidth }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
  },
});
```

### Verification
- [ ] `useResponsive` returns correct values for different screen widths
- [ ] Import and use hook in a test screen to verify it works
- [ ] No TypeScript errors

---

## Milestone 2: Content Width Constraints (~3h)

### Objective
Prevent content from stretching edge-to-edge on tablet screens.

### Tasks

#### 2.1 Apply ResponsiveContainer to main content list
**File:** `src/components/contentList/ContentListScreen.tsx`

Wrap the SectionList content area with ResponsiveContainer:
- Import ResponsiveContainer
- Wrap the main content area
- Ensure proper flex behavior

#### 2.2 Apply to journey-profile modal
**File:** `src/app/journey-profile.tsx`

Wrap ScrollView content with maxWidth constraint:
- Content should be centered on tablets
- Maintain existing padding structure
- Settings cards should have reasonable width

#### 2.3 Apply to playback screen
**File:** `src/app/playback.tsx`

Center RSVP display and controls:
- RSVP word display centered with maxWidth
- Controls remain centered (already are, but verify)
- Progress bar constrained to content width

#### 2.4 Apply to add-content modal
**File:** `src/app/add-content.tsx`

Content should be constrained:
- Practice/Read/Learn cards centered
- Topic grid still uses full available width within constraint

### Verification
- [ ] Test on iPad Pro 12.9" simulator
- [ ] Content is centered, not stretched
- [ ] Scrolling works correctly
- [ ] Touch targets remain accessible

---

## Milestone 3: Multi-Column Content List (~5h)

### Objective
Display content items in 2 columns on tablet instead of single column.

### Analysis
Current `SectionList` has challenges with multi-column:
- Section headers need to span full width
- Curriculum expandable items complicate grid layout
- Swipe-to-delete needs per-item width handling

### Tasks

#### 3.1 Create ContentListGrid component
**File:** `src/components/contentList/ContentListGrid.tsx` (new)

New component that renders content in a grid:
- Accept items and render in columns
- Handle section headers spanning full width
- Use FlatList with conditional numColumns

```typescript
// Key approach:
// 1. Flatten sections into array with header markers
// 2. Render headers as full-width items
// 3. Use numColumns for content items
// 4. Handle curriculum items specially (full-width when expanded)
```

#### 3.2 Update ContentListItemCard for grid layout
**File:** `src/components/contentList/ContentListItemCard.tsx`

Add grid mode support:
- Accept `isGridItem` prop
- When grid mode: vertical card layout
- Adjust padding and sizing for narrower cards
- Consider swipe action in narrow mode

Card layout in grid mode:
```
┌────────────────┐
│     [Icon]     │
│                │
│     Title      │
│   Word Count   │
│  [Progress]    │
│   [Quiz Btn]   │
└────────────────┘
```

#### 3.3 Update ContentListScreen to use grid on tablet
**File:** `src/components/contentList/ContentListScreen.tsx`

Conditional rendering:
- Use `useResponsive` to detect tablet
- Render `ContentListGrid` on tablet
- Keep existing `SectionList` on phone
- Handle empty state, filtering, etc.

#### 3.4 Handle curriculum items in grid
**File:** `src/components/contentList/CurriculumAccordionItem.tsx`

Curriculum expansion in grid:
- Parent item renders as grid card
- When expanded, nested articles render below (full width or in grid)
- Consider: expanded curriculum could span row

### Verification
- [ ] Content list shows 2 columns on iPad
- [ ] Section headers span full width
- [ ] Curriculum expand/collapse works
- [ ] Swipe-to-delete works on cards
- [ ] Filter and search work correctly
- [ ] Empty state displays properly
- [ ] Pull-to-refresh works

---

## Milestone 4: Tablet-Optimized Grids (~2h)

### Objective
Update topic grid and certificate display for tablet column counts.

### Tasks

#### 4.1 Update topic grid calculation
**File:** `src/app/add-content.tsx`

Replace hardcoded 3-column with responsive calculation:
```typescript
const { screenWidth, isTablet } = useResponsive();
const columnCount = getGridColumnCount(screenWidth);
const cardWidth = calculateGridItemWidth(
  screenWidth,
  columnCount,
  SPACING.lg + SPACING.md,
  SPACING.sm
);
```

Result: 4-5 columns on tablet instead of 3

#### 4.2 Update read options grid
**File:** `src/components/addContent/ExpandableReadCard.tsx`

Same pattern as topics:
- Use responsive column count
- Calculate card width dynamically

#### 4.3 Update certificate grid
**File:** `src/components/certificates/CertificateCard.tsx`

Change from hardcoded 48% width:
- Accept `width` prop or calculate based on context
- Parent component passes calculated width
- Update wherever certificates are rendered in grid

### Verification
- [ ] Topic grid shows 4-5 columns on iPad
- [ ] Cards are evenly spaced
- [ ] Touch targets remain usable
- [ ] Read options grid adapts similarly

---

## Milestone 5: Tablet Modal Presentation (~1.5h)

### Objective
Use centered card modals on tablet instead of full-screen.

### Tasks

#### 5.1 Create useModalPresentation hook
**File:** `src/hooks/useModalPresentation.ts` (new)

```typescript
import { useResponsive } from './useResponsive';
import { StackNavigationOptions } from '@react-navigation/stack';

export function useModalPresentation(): Partial<StackNavigationOptions> {
  const { isTablet } = useResponsive();

  return {
    presentation: isTablet ? 'formSheet' : 'fullScreenModal',
    animation: 'slide_from_bottom',
    gestureEnabled: true,
    headerShown: false,
  };
}
```

#### 5.2 Update _layout.tsx modal screens
**File:** `src/app/_layout.tsx`

Apply tablet presentation to modals:
- journey-profile
- add-content
- playback (may want to stay fullscreen)
- playback-quiz
- history

Note: Playback might benefit from staying full-screen even on tablet for immersion.

### Verification
- [ ] Modals appear as centered cards on iPad
- [ ] Gesture dismiss still works
- [ ] Background is visible around modal
- [ ] Transition animations smooth

---

## Milestone 6: RSVP Display Scaling (~1.5h)

### Objective
Scale RSVP word display for larger tablet screens.

### Tasks

#### 6.1 Update RSVPWord component
**File:** `src/components/rsvp/RSVPWord.tsx`

Add responsive sizing:
```typescript
const { isTablet } = useResponsive();
const fontSize = RESPONSIVE_TYPOGRAPHY.rsvpFontSize(isTablet);
const containerHeight = RESPONSIVE_TYPOGRAPHY.rsvpContainerHeight(isTablet);
```

Props to make configurable:
- containerHeight (currently hardcoded 120pt)
- fontSize (currently prop with 48pt default)
- crosshairHeight (proportional to container)

#### 6.2 Update PlaybackControls sizing
**File:** `src/components/controls/PlaybackControls.tsx`

Scale button sizes on tablet:
```typescript
const { isTablet } = useResponsive();
const playButtonSize = RESPONSIVE_CONTROLS.playButton(isTablet);
const controlButtonSize = RESPONSIVE_CONTROLS.controlButton(isTablet);
```

#### 6.3 Update playback screen layout
**File:** `src/app/playback.tsx`

Ensure proper spacing on tablet:
- Use responsive padding
- Center content with maxWidth
- Verify safe area handling

### Verification
- [ ] RSVP text is larger on iPad (64pt vs 48pt)
- [ ] Controls are larger and easier to tap
- [ ] Layout remains balanced
- [ ] Playback functions correctly

---

## Milestone 7: Typography Scaling (~1h)

### Objective
Slightly scale typography for better tablet readability.

### Tasks

#### 7.1 Update typography constants
**File:** `src/constants/typography.ts`

Add tablet-aware helper or update values:
```typescript
export const getTypography = (isTablet: boolean) => ({
  ...TYPOGRAPHY,
  pageTitle: {
    ...TYPOGRAPHY.pageTitle,
    fontSize: isTablet ? 36 : 32,
  },
  body: {
    ...TYPOGRAPHY.body,
    fontSize: isTablet ? 17 : 15,
  },
});
```

#### 7.2 Apply to key screens
- Page titles in modals
- Body text in content areas
- Section headers

### Verification
- [ ] Text is slightly larger on iPad
- [ ] Hierarchy remains clear
- [ ] No text truncation issues

---

## Testing Checklist

### Simulators to Test
- [ ] iPhone 15 Pro (393pt) - baseline phone
- [ ] iPad mini 6th gen (744pt) - small tablet
- [ ] iPad Pro 11" (834pt) - medium tablet
- [ ] iPad Pro 12.9" (1024pt) - large tablet

### Key Flows to Verify
1. **Content List**
   - Browse content in 2-column grid
   - Expand/collapse curriculum
   - Swipe to delete
   - Filter and search

2. **Add Content**
   - Topic selection (4-5 column grid)
   - URL/text import
   - Practice/Read/Learn cards

3. **Playback**
   - RSVP word display scaling
   - Control buttons tap targets
   - Quiz modal

4. **Profile**
   - Theme selection
   - Settings toggles
   - Certificate display

### Accessibility
- [ ] Touch targets minimum 44pt
- [ ] Text remains readable
- [ ] VoiceOver navigation works

---

## File Summary

### New Files
- `src/hooks/useResponsive.ts`
- `src/hooks/useModalPresentation.ts`
- `src/constants/responsive.ts`
- `src/components/layout/ResponsiveContainer.tsx`
- `src/components/contentList/ContentListGrid.tsx`

### Modified Files
- `src/app/_layout.tsx` - Modal presentation
- `src/app/journey-profile.tsx` - Content constraints
- `src/app/playback.tsx` - RSVP scaling, constraints
- `src/app/add-content.tsx` - Topic grid columns
- `src/components/contentList/ContentListScreen.tsx` - Grid mode
- `src/components/contentList/ContentListItemCard.tsx` - Grid layout
- `src/components/contentList/CurriculumAccordionItem.tsx` - Grid handling
- `src/components/addContent/ExpandableReadCard.tsx` - Grid columns
- `src/components/certificates/CertificateCard.tsx` - Dynamic width
- `src/components/rsvp/RSVPWord.tsx` - Scaling
- `src/components/controls/PlaybackControls.tsx` - Scaling
- `src/constants/typography.ts` - Tablet sizes

---

## Estimated Timeline

| Milestone | Description | Estimate |
|-----------|-------------|----------|
| M1 | Responsive Foundation | 2h |
| M2 | Content Width Constraints | 3h |
| M3 | Multi-Column Content List | 5h |
| M4 | Tablet-Optimized Grids | 2h |
| M5 | Tablet Modal Presentation | 1.5h |
| M6 | RSVP Display Scaling | 1.5h |
| M7 | Typography Scaling | 1h |
| **Total** | | **16h** |
