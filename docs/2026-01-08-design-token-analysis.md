# Design Token Structure Analysis
**Date**: 2026-01-08
**Status**: Analysis Complete

---

## Part 1: Token Structure Issues

### Problem: Redundant Token Hierarchies

The design system currently has **both base tokens AND component-specific tokens with duplicate values**:

#### RADIUS vs COMPONENT_RADIUS Overlap

| Base Token | Value | Component Token | Value | Issue |
|------------|-------|-----------------|-------|-------|
| `RADIUS.xs` | 4px | - | - | ✓ No overlap |
| `RADIUS.sm` | 6px | `COMPONENT_RADIUS.progressBar` | 6px | ❌ Duplicate |
| `RADIUS.md` | 8px | `COMPONENT_RADIUS.chip` | 8px | ❌ Duplicate |
| `RADIUS.lg` | 12px | `COMPONENT_RADIUS.button` | 12px | ❌ Duplicate |
| - | - | `COMPONENT_RADIUS.input` | 12px | ❌ Also 12px |
| `RADIUS.xl` | 16px | `COMPONENT_RADIUS.card` | 16px | ❌ Duplicate |
| `RADIUS.xxl` | 20px | `COMPONENT_RADIUS.modal` | 20px | ❌ Duplicate |
| `RADIUS.full` | 9999 | `COMPONENT_RADIUS.node` | 9999 | ❌ Duplicate |

**Result**: 7 out of 8 COMPONENT_RADIUS values are exact duplicates of base RADIUS tokens.

#### SPACING vs COMPONENT_SPACING Overlap

| Base Token | Value | Component Token | Value | Issue |
|------------|-------|-----------------|-------|-------|
| `SPACING.sm` | 8px | `COMPONENT_SPACING.inlineGap` | 8px | ❌ Duplicate |
| `SPACING.md` | 12px | `COMPONENT_SPACING.listItemGap` | 12px | ❌ Duplicate |
| `SPACING.lg` | 16px | `COMPONENT_SPACING.screenPadding` | 16px | ❌ Duplicate |
| - | - | `COMPONENT_SPACING.headerPadding` | 16px | ❌ Also 16px |
| `SPACING.xl` | 20px | `COMPONENT_SPACING.cardPadding` | 20px | ❌ Duplicate |
| `SPACING.xxl` | 24px | `COMPONENT_SPACING.sectionGap` | 24px | ❌ Duplicate |

**Result**: 6 out of 7 COMPONENT_SPACING values are exact duplicates of base SPACING tokens.

### Why This Is Problematic

1. **Confusion**: Developers don't know whether to use `RADIUS.xl` or `COMPONENT_RADIUS.card` for a card
2. **Maintenance burden**: Two sources of truth that must be kept in sync
3. **No actual semantic benefit**: The "component-specific" tokens don't add semantic meaning since they just alias base tokens
4. **Import overhead**: Files need to import both `RADIUS` and `COMPONENT_RADIUS` unnecessarily

### Current Usage in Codebase

```
COMPONENT_RADIUS.card:   27 occurrences (16px)
COMPONENT_RADIUS.button: 18 occurrences (12px)
RADIUS.xl:                5 occurrences (16px - same value as card!)
RADIUS.lg:               11 occurrences (12px - same value as button!)
```

**Both `RADIUS.xl` AND `COMPONENT_RADIUS.card` are being used for 16px radii** - no consistency!

---

## Part 2: Inconsistent Component Usage

### Issue 1: Quiz Options Use Different Radius Than Buttons

**Problem**: Quiz answer options use `RADIUS.xl` (16px) while all other buttons use `COMPONENT_RADIUS.button` (12px)

| Component | Current Radius | Expected |
|-----------|----------------|----------|
| Quiz single choice options | `RADIUS.xl` (16px) | Should be 12px like other buttons |
| Quiz multiple select options | `RADIUS.xl` (16px) | Should be 12px like other buttons |
| Quiz true/false options | `RADIUS.xl` (16px) | Should be 12px like other buttons |
| Quiz numeric answer input | `RADIUS.xl` (16px) | Should be 12px like other buttons |
| All other buttons | `COMPONENT_RADIUS.button` (12px) | ✓ Correct |

**Files affected**:
- [src/components/quiz/SingleChoiceQuestion.tsx:93](src/components/quiz/SingleChoiceQuestion.tsx#L93)
- [src/components/quiz/MultipleSelectQuestion.tsx:160](src/components/quiz/MultipleSelectQuestion.tsx#L160)
- [src/components/quiz/TrueFalseQuestion.tsx:112](src/components/quiz/TrueFalseQuestion.tsx#L112)
- [src/components/quiz/NumericQuestion.tsx:218](src/components/quiz/NumericQuestion.tsx#L218)

**Decision needed**: Should quiz options be:
- **Option A**: Same as buttons (12px) for consistency
- **Option B**: Intentionally larger (16px) to emphasize quiz interaction?

### Issue 2: Mixed Usage of RADIUS.lg vs COMPONENT_RADIUS.button

**Problem**: 12px border radius is used via TWO different tokens

```typescript
// Some files use:
borderRadius: COMPONENT_RADIUS.button  // 12px

// Other files use:
borderRadius: RADIUS.lg  // Also 12px!
```

**Files using RADIUS.lg (should use COMPONENT_RADIUS.button)**:
- [src/app/testing.tsx:749](src/app/testing.tsx#L749) - Test button
- [src/app/topics.tsx:129](src/app/topics.tsx#L129) - Topic pill
- [src/app/onboarding/purpose.tsx:92](src/app/onboarding/purpose.tsx#L92) - Purpose button
- [src/components/playlist/NowPlayingBar.tsx:83](src/components/playlist/NowPlayingBar.tsx#L83) - Source badge
- [src/components/playlist/QueueTabs.tsx:83](src/components/playlist/QueueTabs.tsx#L83) - Tab buttons
- [src/components/navigation/ContentSubTabBar.tsx:98](src/components/navigation/ContentSubTabBar.tsx#L98) - Sub-tab button
- [src/components/certificates/NewCertificateModal.tsx:118](src/components/certificates/NewCertificateModal.tsx#L118) - Modal button

**Recommendation**: Standardize all 12px button radii to `COMPONENT_RADIUS.button`

### Issue 3: Cards Using RADIUS.xl Instead of COMPONENT_RADIUS.card

**Problem**: Some cards use base token instead of semantic token (though same value)

**Files affected**:
- Very few - most cards correctly use `COMPONENT_RADIUS.card` ✓

### Issue 4: FloatingNavBar Icon Container Uses RADIUS.xxl

**Problem**: [src/components/navigation/FloatingNavBar.tsx:167](src/components/navigation/FloatingNavBar.tsx#L167)

```typescript
iconContainer: {
  borderRadius: RADIUS.xxl,  // 20px - too large for small icons
  // Should probably be RADIUS.full or RADIUS.lg
}
```

This is the only non-full-round icon container using a specific radius value.

### Issue 5: Inconsistent Small Element Radii

**Problem**: Small UI elements (badges, pills, source indicators) use varying radii

| Element | Current Radius | Files |
|---------|----------------|-------|
| Now playing badge | `RADIUS.full` | PlaylistItemRow.tsx ✓ |
| Source badge (queue) | `RADIUS.lg` (12px) | NowPlayingBar.tsx |
| Difficulty badge | `COMPONENT_RADIUS.chip` (8px) | topic/[id].tsx ✓ |
| Queue tab pill | `RADIUS.lg` (12px) | QueueTabs.tsx |

**Inconsistency**: Source badges and pills use 12px while other badges/chips use 8px or full round.

---

## Part 3: Recommended Solutions

### Solution A: Eliminate Redundant Component Tokens (Radical)

**Remove** all component tokens that are just aliases:

```typescript
// DELETE COMPONENT_RADIUS entirely
export const COMPONENT_RADIUS = {
  card: 16,     // ❌ DELETE - use RADIUS.xl
  button: 12,   // ❌ DELETE - use RADIUS.lg
  progressBar: 6, // ❌ DELETE - use RADIUS.sm
  input: 12,    // ❌ DELETE - use RADIUS.lg
  modal: 20,    // ❌ DELETE - use RADIUS.xxl
  chip: 8,      // ❌ DELETE - use RADIUS.md
  node: 9999,   // ❌ DELETE - use RADIUS.full
};

// Keep only base tokens
export const RADIUS = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,    // For buttons, inputs
  xl: 16,    // For cards
  xxl: 20,   // For modals
  full: 9999,
};
```

**Pros**:
- One source of truth
- Less confusion
- Cleaner imports
- Easier to maintain

**Cons**:
- Large refactor (45+ files)
- Loses semantic naming (button vs lg)
- Need to document conventions somewhere

### Solution B: Make Component Tokens Truly Semantic (Recommended)

**Keep COMPONENT_RADIUS** but make it the ONLY way to specify component radii. Make base RADIUS private or only for internal use.

```typescript
// COMPONENT_RADIUS becomes the public API
export const COMPONENT_RADIUS = {
  // Interactive elements
  button: 12,          // All buttons, pills, tabs
  buttonLarge: 16,     // Quiz options (intentionally larger)
  input: 12,           // Text inputs, selectors

  // Containers
  card: 16,            // All content cards
  cardSmall: 12,       // Compact cards
  modal: 20,           // Modals, large sheets

  // Decorative
  chip: 8,             // Small badges, labels
  badge: RADIUS.full,  // Circular badges (full round)
  avatar: RADIUS.full, // Profile images

  // Special
  progressBar: 6,
  node: RADIUS.full,
};

// RADIUS becomes internal-only (or remove)
const RADIUS = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 9999,
};
```

**Usage rules**:
- ✅ **Always** use `COMPONENT_RADIUS.button` for buttons (never `RADIUS.lg`)
- ✅ **Always** use `COMPONENT_RADIUS.card` for cards (never `RADIUS.xl`)
- ✅ Add `buttonLarge: 16` for quiz options if they should be intentionally larger
- ❌ **Never** use base `RADIUS` tokens directly in components

**Pros**:
- Clear semantic meaning
- Self-documenting
- Easier to enforce consistency
- Can deviate from base scale when needed

**Cons**:
- Still need to refactor ~20 files
- Need to update documentation

### Solution C: Hybrid Approach (Least Change)

Keep both but establish clear rules:

**COMPONENT_RADIUS**: Use for semantic UI elements where the component type is clear
- Cards: `COMPONENT_RADIUS.card`
- Buttons: `COMPONENT_RADIUS.button`
- Inputs: `COMPONENT_RADIUS.input`

**RADIUS**: Use for non-semantic or decorative elements
- Progress bars: `RADIUS.xs`
- Dividers: `RADIUS.xs`
- Overlays: `RADIUS.xl`

**Pros**:
- Minimal refactor
- Preserves existing patterns

**Cons**:
- Still confusing
- Doesn't solve the duplication problem

---

## Part 4: Specific Inconsistencies to Fix (Regardless of Solution)

### High Priority

1. **Standardize quiz option radii** (4 files)
   - Currently `RADIUS.xl` (16px)
   - Decision: Should be 12px like buttons OR explicitly 16px with new token

2. **Standardize button radii token usage** (7 files)
   - Change all `RADIUS.lg` → `COMPONENT_RADIUS.button` (or vice versa if we eliminate component tokens)

3. **Fix FloatingNavBar icon container** (1 file)
   - `RADIUS.xxl` (20px) → probably `RADIUS.full` or `RADIUS.lg`

### Medium Priority

4. **Standardize badge/pill radii** (4 files)
   - Source badges: 12px → should be 8px (chip) or full round
   - Queue tabs: 12px → should be consistent with other pills

### Low Priority

5. **Document the token hierarchy**
   - Add comments explaining when to use which tokens
   - Add linting rules to enforce patterns

---

## Part 5: Recommended Action Plan

### Phase 1: Make Decision on Token Structure

**Recommend Solution B**: Make COMPONENT_RADIUS the primary API

### Phase 2: Create New Token Definitions (if Solution B)

```typescript
export const COMPONENT_RADIUS = {
  // Interactive (touch targets)
  button: 12,           // Standard buttons, tabs, pills
  buttonLarge: 16,      // Quiz options (emphasized interaction)
  input: 12,            // Text fields, selectors

  // Containers
  card: 16,             // Content cards
  modal: 20,            // Modal dialogs, sheets

  // Decorative
  chip: 8,              // Small labels, tags
  badge: RADIUS.full,   // Circular indicators

  // Functional
  progressBar: 6,
  node: RADIUS.full,
} as const;
```

### Phase 3: Refactor Files (20 files, ~30 changes)

1. Quiz components (4 files): `RADIUS.xl` → `COMPONENT_RADIUS.buttonLarge` (16px, intentional)
2. Button radii (7 files): `RADIUS.lg` → `COMPONENT_RADIUS.button`
3. Badges/pills (4 files): Standardize to `COMPONENT_RADIUS.chip` or badge
4. FloatingNavBar (1 file): Fix icon container radius

### Phase 4: Add Linting/Documentation

1. Document token usage in CLAUDE.md
2. Add ESLint rule to prevent direct RADIUS usage (optional)
3. Update design system documentation

---

## Summary

**Current State**:
- 7/8 component tokens are exact duplicates of base tokens
- Multiple tokens reference the same value (12px has 3 different names!)
- 20+ files use inconsistent tokens for the same purpose

**Proposed State (Solution B)**:
- COMPONENT_RADIUS is the only public API
- Each component type has ONE semantic token
- Base RADIUS tokens are internal implementation detail
- Clear, self-documenting code

**Impact**: 20 files requiring changes, but much clearer system going forward.
