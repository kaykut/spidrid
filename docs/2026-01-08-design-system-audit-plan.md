# Design System Audit & Remediation Plan
**Date**: 2026-01-08
**Status**: Audit Complete - Remediation Pending
**Philosophy**: Maximize consistency by standardizing to existing tokens, NOT by adding tokens for every variation

---

## Executive Summary

Comprehensive audit of all `.tsx` and `.ts` files in `src/` identified **45+ violations** across **20+ files**. Most files properly use design tokens, but arithmetic manipulations (`token ± N`) and hardcoded small values (<10px) are the primary violations.

**Severity Breakdown**:
- **HIGH** (10 violations): Spacing/radius arithmetic that defeats design system purpose
- **MEDIUM** (20 violations): Hardcoded values and inconsistent implementations
- **LOW** (5 violations): Minor font/progress bar inconsistencies

**Design System Philosophy**:
- ✅ **Constrain choices** - Force components to use existing tokens
- ❌ **Don't accommodate variations** - If something doesn't fit, change it, don't add a token
- ✅ **Only add semantic tokens** - Tokens should represent meaning, not measurements
- ❌ **No component-specific tokens** - Keep magic numbers as local constants

---

## SECTION 1: FILES NOT USING THE DESIGN SYSTEM

### 1.1 Spacing Arithmetic Violations (HIGH PRIORITY)

**Pattern**: Using `SPACING.X ± N` or `RADIUS.X ± N` defeats token system purpose

#### [src/app/(tabs)/play.tsx](src/app/(tabs)/play.tsx)
- **Line 390-391**: `borderRadius: RADIUS.lg + 2` (14px)
- **Line 402**: `paddingVertical: SPACING.lg - 2` (14px)
- **Fix**: Use `COMPONENT_RADIUS.card` (16px) and `SPACING.md` (12px) - no arithmetic

#### [src/app/(tabs)/profile.tsx](src/app/(tabs)/profile.tsx)
- **Line 345**: `paddingHorizontal: SPACING.lg - 2` (14px)
- **Line 347**: `borderRadius: RADIUS.md + 2` (10px)
- **Line 363**: `borderRadius: RADIUS.md + 2` (10px)
- **Line 387**: `paddingVertical: SPACING.lg - 2` (14px)
- **Line 427**: `borderRadius: SIZES.iconLg / 2` (calculated)
- **Fix**: Use `SPACING.md` (12px) for padding, `COMPONENT_RADIUS.card` (16px) for cards, `RADIUS.full` for circular elements

#### [src/app/(tabs)/content/read.tsx](src/app/(tabs)/content/read.tsx)
- **Line 465**: `borderRadius: RADIUS.lg + 2` (14px)
- **Fix**: Use `COMPONENT_RADIUS.card` (16px)

#### [src/app/topic/[id].tsx](src/app/topic/[id].tsx)
- **Line 348**: `borderRadius: RADIUS.md + 2` (10px)
- **Fix**: Use `COMPONENT_RADIUS.button` (12px) - standard for list items

#### [src/components/quiz/SingleChoiceQuestion.tsx](src/components/quiz/SingleChoiceQuestion.tsx)
- **Line 92**: `padding: SPACING.lg + 2` (18px)
- **Fix**: Use `SPACING.lg` (16px) - quiz options don't need special padding

#### [src/components/quiz/MultipleSelectQuestion.tsx](src/components/quiz/MultipleSelectQuestion.tsx)
- **Line 159**: `padding: SPACING.lg + 2` (18px)
- **Fix**: Use `SPACING.lg` (16px)

---

### 1.2 Hardcoded Small Values (MEDIUM PRIORITY)

**Pattern**: Small values hardcoded instead of using existing tokens or keeping as local constants

#### [src/components/playlist/NowPlayingBar.tsx](src/components/playlist/NowPlayingBar.tsx)
- **Line 115**: `height: 4` (progress bar)
- **Line 116-121**: `borderRadius: 2` (progress bar)
- **Fix**: Use `SIZES.progressBarHeight` (8px) and `RADIUS.xs` (2px) - standardize ALL progress bars to 8px height

#### [src/components/playlist/PlaylistBottomSheet.tsx](src/components/playlist/PlaylistBottomSheet.tsx)
- **Line 206-208**: Drag handle dimensions (width: 36, height: 4, borderRadius: 2)
- **Fix**: Keep as local constant in this file - this is component-specific UI chrome, not a design token
  ```ts
  const DRAG_HANDLE = { width: 36, height: SPACING.xs, radius: RADIUS.xs };
  ```

#### [src/components/journey/VerticalProgressPath.tsx](src/components/journey/VerticalProgressPath.tsx)
- **Line 230**: `const NODE_COLUMN_WIDTH = 40`
- **Line 336**: `height: 6` (progress bar)
- **Fix**:
  - Keep `NODE_COLUMN_WIDTH` as local constant (component-specific layout)
  - Change progress bar to `SIZES.progressBarHeight` (8px) - standardize

#### [src/components/journey/InsightsPanel.tsx](src/components/journey/InsightsPanel.tsx)
- **Lines 34-36**: `CARD_HEIGHT = 180`, `CARD_SPACING = 12`, `CARD_BORDER_WIDTH = 1`
- **Line 178**: `chartHeight: 60`
- **Line 231-232**: Chart point offsets (4px)
- **Line 401**: Chart line thickness (2px)
- **Line 407-408**: Chart point dimensions (8x8, radius 4)
- **Fix**:
  - Keep all chart-specific values as local constants (this is data visualization, not UI design tokens)
  - Change `CARD_SPACING` to use `SPACING.md` instead of hardcoded 12
  - Use `SPACING.xs` for 4px offsets, `SPACING.sm` for 8px dimensions

#### [src/components/journey/MetricsPanel.tsx](src/components/journey/MetricsPanel.tsx)
- **Line 205**: `height: 32` (milestone icon)
- **Line 236**: `fontSize: 8` (chart label)
- **Fix**:
  - Use `SIZES.iconMd` (32px) - already exists!
  - Use `TYPOGRAPHY.caption` (12px) - 8px is too small and barely readable

#### [src/app/(tabs)/content/train.tsx](src/app/(tabs)/content/train.tsx)
- **Line 136-140**: `width: 48, height: 48` (icon container)
- **Line 162**: `height: 4` (progress bar)
- **Fix**:
  - Use `SIZES.iconLg` (48px) - already exists!
  - Change progress bar to `SIZES.progressBarHeight` (8px)

#### [src/components/controls/PlaybackControls.tsx](src/components/controls/PlaybackControls.tsx)
- **Line 30**: `playIconSize: 28`
- **Fix**: Use `SIZES.iconMd` (32px) - standardize, 4px won't make UX difference

#### [src/components/certifications/TierCard.tsx](src/components/certifications/TierCard.tsx)
- **Line 375**: `paddingVertical: 14`
- **Fix**: Use `SPACING.md` (12px) - standardize with other buttons

#### [src/components/rsvp/RSVPWord.tsx](src/components/rsvp/RSVPWord.tsx)
- **Line 14-18**: `RSVP_SIZES` object with `crosshairWidth: 2`
- **Fix**: Keep as local constant - this is RSVP-specific rendering logic, not a design token

---

### 1.3 Hardcoded Colors (MEDIUM PRIORITY)

#### [src/app/topic/[id].tsx](src/app/topic/[id].tsx)
- **Line 83**: `'#fab005'` (amber - intermediate difficulty)
- **Line 85**: `'#ff6b6b'` (coral - advanced difficulty)
- **Fix**: ✅ **ADD THIS TOKEN** - difficulty is semantic and used across curriculum
  ```ts
  // Add to src/data/themes.ts
  export const DIFFICULTY_COLORS = {
    beginner: JOURNEY_COLORS.success,
    intermediate: '#fab005',
    advanced: '#ff6b6b',
  } as const;
  ```

---

### 1.4 Missing Token Imports (LOW PRIORITY)

Most files properly import design tokens. No significant violations found.

---

## SECTION 2: DESIGN INCONSISTENCIES

### 2.1 Card Border Radius Inconsistencies (HIGH PRIORITY)

**Problem**: Cards use 5 different radius values (10px, 12px, 14px, 16px, 20px)

| File | Current | Fix To |
|------|---------|--------|
| [play.tsx](src/app/(tabs)/play.tsx) L390 | `RADIUS.lg + 2` (14px) | `COMPONENT_RADIUS.card` (16px) |
| [play.tsx](src/app/(tabs)/play.tsx) Results | `RADIUS.xxl` (20px) | `COMPONENT_RADIUS.card` (16px) |
| [profile.tsx](src/app/(tabs)/profile.tsx) L335 | `COMPONENT_RADIUS.button` (12px) | `COMPONENT_RADIUS.card` (16px) |
| [profile.tsx](src/app/(tabs)/profile.tsx) L347 | `RADIUS.md + 2` (10px) | `COMPONENT_RADIUS.card` (16px) |
| [read.tsx](src/app/(tabs)/content/read.tsx) L465 | `RADIUS.lg + 2` (14px) | `COMPONENT_RADIUS.card` (16px) |
| [topic/[id].tsx](src/app/topic/[id].tsx) L348 | `RADIUS.md + 2` (10px) | `COMPONENT_RADIUS.button` (12px) |

**Standard Rule**:
- **All content cards**: `COMPONENT_RADIUS.card` (16px)
- **All list items/buttons**: `COMPONENT_RADIUS.button` (12px)
- No exceptions, no variations

---

### 2.2 Progress Bar Height Inconsistencies (HIGH PRIORITY)

**Problem**: 3 different heights (4px, 6px, 8px) with no clear pattern

| Component | Current | Fix To |
|-----------|---------|--------|
| [NowPlayingBar](src/components/playlist/NowPlayingBar.tsx) L115 | 4px | `SIZES.progressBarHeight` (8px) |
| [PlaybackControls](src/components/controls/PlaybackControls.tsx) | 4px | `SIZES.progressBarHeight` (8px) |
| [train.tsx](src/app/(tabs)/content/train.tsx) L162 | 4px | `SIZES.progressBarHeight` (8px) |
| [TierCard](src/components/certifications/TierCard.tsx) | 8px ✓ | Keep (already correct) |
| [VerticalProgressPath](src/components/journey/VerticalProgressPath.tsx) L336 | 6px | `SIZES.progressBarHeight` (8px) |

**Standard Rule**:
- **ALL progress bars**: `SIZES.progressBarHeight` (8px)
- **Progress bar radius**: `RADIUS.xs` (2px)
- No thin/thick variations - ONE standard height

**Rationale**: The 2px difference between 4/6/8px is barely perceptible. Standardizing improves consistency without UX cost.

---

### 2.3 Icon Container Size Inconsistencies (MEDIUM PRIORITY)

**Problem**: Similar icons use different sizes, often hardcoded

| Component | Current | Fix To |
|-----------|---------|--------|
| [train.tsx](src/app/(tabs)/content/train.tsx) L136-140 | 48px (hardcoded) | `SIZES.iconLg` |
| [MetricsPanel](src/components/journey/MetricsPanel.tsx) L205 | 32px (hardcoded) | `SIZES.iconMd` |
| [PlaybackControls](src/components/controls/PlaybackControls.tsx) L30 | 28px (hardcoded) | `SIZES.iconMd` (32px) |
| [topic/[id].tsx] Topic header | 72px (hardcoded) | Keep as `ICON_SIZE` local constant |

**Standard Rule**:
- **Small icons**: `SIZES.iconSm` (24px)
- **Medium icons**: `SIZES.iconMd` (32px)
- **Large icons**: `SIZES.iconLg` (48px)
- **Oversized decorative icons**: Keep as local constants (not design tokens)

**Rationale**: The 72px topic header icon is component-specific and appears once. Don't pollute global tokens.

---

### 2.4 Button Padding Inconsistencies (MEDIUM PRIORITY)

**Problem**: Buttons use 4 different padding values (12px, 14px, 16px, 18px)

| Component | Current | Fix To |
|-----------|---------|--------|
| Quiz options | `SPACING.lg + 2` (18px) | `SPACING.lg` (16px) |
| Standard buttons | `SPACING.lg` (16px) ✓ | Keep |
| Small buttons | `SPACING.md` (12px) ✓ | Keep |
| [TierCard](src/components/certifications/TierCard.tsx) L375 | 14px | `SPACING.md` (12px) |

**Standard Rule**:
- **Primary/Large buttons**: `SPACING.lg` horizontal (16px), `SPACING.md` vertical (12px)
- **Secondary/Small buttons**: `SPACING.md` horizontal (12px), `SPACING.sm` vertical (8px)
- No in-between values (14px, 18px)

---

### 2.5 Shadow Implementation Inconsistencies (LOW PRIORITY)

**Problem**: FloatingNavBar uses custom Platform.select shadow instead of SHADOWS tokens

#### [src/components/navigation/FloatingNavBar.tsx](src/components/navigation/FloatingNavBar.tsx)
- **Current**: Custom `Platform.select` with hardcoded shadow values
- **Fix**: Use `...SHADOWS.large` for consistency

---

## SECTION 3: REMEDIATION PLAN

### Philosophy: Eliminate Variations, Don't Accommodate Them

**Goal**: Reduce the number of unique values in use, forcing consistency through constraint.

---

### Phase 1: Remove All Arithmetic (HIGH Priority)
**Impact**: 10 files, ~15 violations

**Task**: Eliminate all `token ± N` patterns

| File | Lines | Change |
|------|-------|--------|
| [play.tsx](src/app/(tabs)/play.tsx) | 390, 402 | Remove `+ 2` and `- 2`, use exact tokens |
| [profile.tsx](src/app/(tabs)/profile.tsx) | 345, 347, 363, 387, 427 | Remove all arithmetic |
| [read.tsx](src/app/(tabs)/content/read.tsx) | 465 | Remove `+ 2` |
| [topic/[id].tsx](src/app/topic/[id].tsx) | 348 | Remove `+ 2` |
| [SingleChoiceQuestion.tsx](src/components/quiz/SingleChoiceQuestion.tsx) | 92 | Remove `+ 2` |
| [MultipleSelectQuestion.tsx](src/components/quiz/MultipleSelectQuestion.tsx) | 159 | Remove `+ 2` |

**Zero tolerance**: No arithmetic on tokens. If it doesn't fit, choose the closest token.

---

### Phase 2: Standardize to Existing Tokens (HIGH Priority)
**Impact**: 15 files, ~25 violations

#### 2A. Standardize ALL Progress Bars to 8px

| File | Line | Change |
|------|------|--------|
| [NowPlayingBar.tsx](src/components/playlist/NowPlayingBar.tsx) | 115, 116, 121 | `height: SIZES.progressBarHeight`, `borderRadius: RADIUS.xs` |
| [train.tsx](src/app/(tabs)/content/train.tsx) | 162 | `height: SIZES.progressBarHeight` |
| [VerticalProgressPath.tsx](src/components/journey/VerticalProgressPath.tsx) | 336 | `height: SIZES.progressBarHeight` |

#### 2B. Standardize ALL Cards to 16px Radius

| File | Line | Change |
|------|------|--------|
| [play.tsx](src/app/(tabs)/play.tsx) | 390, Results card | `borderRadius: COMPONENT_RADIUS.card` |
| [profile.tsx](src/app/(tabs)/profile.tsx) | 335, 347, 363 | `borderRadius: COMPONENT_RADIUS.card` |
| [read.tsx](src/app/(tabs)/content/read.tsx) | 465 | `borderRadius: COMPONENT_RADIUS.card` |

#### 2C. Standardize Icon Containers to SIZES Tokens

| File | Line | Change |
|------|------|--------|
| [train.tsx](src/app/(tabs)/content/train.tsx) | 136-140 | `width: SIZES.iconLg, height: SIZES.iconLg` |
| [MetricsPanel.tsx](src/components/journey/MetricsPanel.tsx) | 205 | `height: SIZES.iconMd` |
| [PlaybackControls.tsx](src/components/controls/PlaybackControls.tsx) | 30 | `playIconSize: SIZES.iconMd` |

#### 2D. Standardize Button Padding

| File | Line | Change |
|------|------|--------|
| [TierCard.tsx](src/components/certifications/TierCard.tsx) | 375 | `paddingVertical: SPACING.md` |

---

### Phase 3: Replace Hardcoded Values (MEDIUM Priority)
**Impact**: 8 files, ~15 violations

#### 3A. Replace with Existing Tokens

| File | Line | Current | Fix |
|------|------|---------|-----|
| [InsightsPanel.tsx](src/components/journey/InsightsPanel.tsx) | 88 | `CARD_SPACING = 12` | `SPACING.md` |
| [InsightsPanel.tsx](src/components/journey/InsightsPanel.tsx) | 231-232 | `- 4` offsets | `SPACING.xs` |
| [InsightsPanel.tsx](src/components/journey/InsightsPanel.tsx) | 407-408 | `8x8` points | `SPACING.sm` |
| [MetricsPanel.tsx](src/components/journey/MetricsPanel.tsx) | 236 | `fontSize: 8` | `TYPOGRAPHY.caption.fontSize` (12px) |

#### 3B. Convert to Local Constants

Keep these as component-specific constants (NOT global tokens):

| File | Values | Rationale |
|------|--------|-----------|
| [PlaylistBottomSheet.tsx](src/components/playlist/PlaylistBottomSheet.tsx) | Drag handle: 36w × 4h | UI chrome, appears once |
| [VerticalProgressPath.tsx](src/components/journey/VerticalProgressPath.tsx) | `NODE_COLUMN_WIDTH = 40` | Layout constant, component-specific |
| [InsightsPanel.tsx](src/components/journey/InsightsPanel.tsx) | Chart dimensions, line thickness | Data viz, not UI design |
| [RSVPWord.tsx](src/components/rsvp/RSVPWord.tsx) | `RSVP_SIZES` | RSVP rendering logic |
| [topic/[id].tsx](src/app/topic/[id].tsx) | 72px topic icon | Decorative hero element |

**Guideline**: If it's used in ONE component and doesn't represent a semantic design decision, keep it local.

---

### Phase 4: Add ONE Semantic Token (LOW Priority)
**Impact**: 2 files

#### Add DIFFICULTY_COLORS to themes.ts

```ts
// Add to src/data/themes.ts
export const DIFFICULTY_COLORS = {
  beginner: JOURNEY_COLORS.success,   // green
  intermediate: '#fab005',             // amber
  advanced: '#ff6b6b',                 // coral red
} as const;
```

**Rationale**: Difficulty is a semantic concept used across the curriculum system. This is a legitimate design token.

#### Update topic/[id].tsx

```ts
// Replace difficultyColor function
import { DIFFICULTY_COLORS } from '@/data/themes';

const difficultyColor = (level: string) => DIFFICULTY_COLORS[level as keyof typeof DIFFICULTY_COLORS];
```

---

### Phase 5: Fix Shadow Inconsistency (LOW Priority)
**Impact**: 1 file

#### [src/components/navigation/FloatingNavBar.tsx](src/components/navigation/FloatingNavBar.tsx)

Replace custom Platform.select shadow with:
```ts
...SHADOWS.large
```

---

## SECTION 4: VALIDATION CHECKLIST

After remediation, verify:

- [ ] **Zero arithmetic**: No `SPACING.X ± N` or `RADIUS.X ± N` patterns anywhere
  ```bash
  grep -r "SPACING\.[a-z]* [+-]" src/ --exclude-dir=constants
  grep -r "RADIUS\.[a-z]* [+-]" src/ --exclude-dir=constants
  ```

- [ ] **All progress bars are 8px**: Only `SIZES.progressBarHeight` used
  ```bash
  grep -r "height: [0-9]" src/ | grep -i progress
  ```

- [ ] **All cards are 16px**: Only `COMPONENT_RADIUS.card` for content cards
  ```bash
  grep -r "borderRadius: RADIUS\." src/ | grep -i card
  ```

- [ ] **No hardcoded small values**: All <10px values are tokens or local constants
  ```bash
  grep -r "padding: [0-9]" src/ --exclude-dir=constants
  grep -r "margin: [0-9]" src/ --exclude-dir=constants
  ```

- [ ] **No hardcoded colors**: Except in theme definitions
  ```bash
  grep -r "color: ['\"]#" src/ --exclude=themes.ts
  ```

- [ ] **Icon containers use tokens**: All use `SIZES.icon{Sm,Md,Lg}`
  ```bash
  grep -r "width: [0-9].*height: [0-9]" src/ | grep -i icon
  ```

---

## SECTION 5: TOKENS SUMMARY

### NO New Tokens Required (Except 1)

The existing design system has everything we need:

#### Current Tokens (Keep As-Is)
```ts
// spacing.ts
SPACING: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 }
RADIUS: { xs: 2, sm: 4, md: 6, lg: 12, xl: 16, xxl: 20, full: 9999 }
COMPONENT_RADIUS: { card: 16, button: 12 }
SIZES: {
  iconSm: 24,
  iconMd: 32,
  iconLg: 48,
  progressBarHeight: 8,
}
SHADOWS: { small, medium, large }

// typography.ts
TYPOGRAPHY.caption: { fontSize: 12, ... }

// themes.ts
JOURNEY_COLORS: { primary, success, warning, error, ... }
```

#### Add Only This Token
```ts
// themes.ts
export const DIFFICULTY_COLORS = {
  beginner: JOURNEY_COLORS.success,
  intermediate: '#fab005',
  advanced: '#ff6b6b',
} as const;
```

**That's it.** Everything else standardizes to existing tokens or stays as local constants.

---

## SECTION 6: BEFORE/AFTER COMPARISON

### Current State: 19 Unique Values
- **Card radii**: 10, 12, 14, 16, 20 (5 values)
- **Progress bars**: 4, 6, 8 (3 values)
- **Button padding**: 12, 14, 16, 18 (4 values)
- **Icon sizes**: 24, 28, 32, 48, 72 (5 values)
- **Small spacing**: 2, 4, 6, 8 (4 values, some hardcoded)

### After Remediation: 10 Unique Values
- **Card radii**: 12, 16 (2 values: button vs card)
- **Progress bars**: 8 (1 value: ALL standardized)
- **Button padding**: 12, 16 (2 values: small vs large)
- **Icon sizes**: 24, 32, 48 (3 values: sm/md/lg) + local 72
- **Small spacing**: 2, 4, 8 (3 values: all from SPACING/RADIUS)

**47% reduction in unique values** while maintaining visual quality.

---

## FILES REQUIRING CHANGES (Priority Order)

### HIGH Priority (10 files)
1. [src/app/(tabs)/play.tsx](src/app/(tabs)/play.tsx) - Remove arithmetic, standardize radii
2. [src/app/(tabs)/profile.tsx](src/app/(tabs)/profile.tsx) - Remove arithmetic, standardize radii
3. [src/app/(tabs)/content/read.tsx](src/app/(tabs)/content/read.tsx) - Remove arithmetic
4. [src/app/topic/[id].tsx](src/app/topic/[id].tsx) - Remove arithmetic, add DIFFICULTY_COLORS
5. [src/components/quiz/SingleChoiceQuestion.tsx](src/components/quiz/SingleChoiceQuestion.tsx) - Remove arithmetic
6. [src/components/quiz/MultipleSelectQuestion.tsx](src/components/quiz/MultipleSelectQuestion.tsx) - Remove arithmetic
7. [src/components/playlist/NowPlayingBar.tsx](src/components/playlist/NowPlayingBar.tsx) - Standardize progress bar
8. [src/app/(tabs)/content/train.tsx](src/app/(tabs)/content/train.tsx) - Standardize icon size, progress bar
9. [src/components/certifications/TierCard.tsx](src/components/certifications/TierCard.tsx) - Standardize padding
10. [src/data/themes.ts](src/data/themes.ts) - Add DIFFICULTY_COLORS

### MEDIUM Priority (6 files)
11. [src/components/playlist/PlaylistBottomSheet.tsx](src/components/playlist/PlaylistBottomSheet.tsx) - Convert to local constant
12. [src/components/journey/VerticalProgressPath.tsx](src/components/journey/VerticalProgressPath.tsx) - Standardize progress bar
13. [src/components/journey/InsightsPanel.tsx](src/components/journey/InsightsPanel.tsx) - Replace hardcoded values with tokens
14. [src/components/journey/MetricsPanel.tsx](src/components/journey/MetricsPanel.tsx) - Use iconMd, caption fontSize
15. [src/components/controls/PlaybackControls.tsx](src/components/controls/PlaybackControls.tsx) - Standardize icon size

### LOW Priority (2 files)
16. [src/components/navigation/FloatingNavBar.tsx](src/components/navigation/FloatingNavBar.tsx) - Use SHADOWS.large
17. [src/components/rsvp/RSVPWord.tsx](src/components/rsvp/RSVPWord.tsx) - Keep local constant (no change needed)

---

**Total**: 17 files requiring changes, 45+ violations eliminated, design system reduced from 19 to 10 unique values.

**Result**: A more constrained, consistent design system that says "no" to arbitrary variations.
