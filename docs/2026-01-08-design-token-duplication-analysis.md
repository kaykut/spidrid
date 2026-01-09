# Design Token Duplication & Semantic Opportunities Analysis
**Date**: 2026-01-08
**Status**: Analysis Complete

---

## Executive Summary

After the RADIUS → COMPONENT_RADIUS migration, I analyzed the remaining design token system for similar issues. Found **3 significant opportunities** for improvement:

| Issue | Severity | Impact | Recommendation |
|-------|----------|--------|----------------|
| Icon sizes in 2 places | **HIGH** | Conflicting values | Consolidate |
| Typography double-export | MEDIUM | Confusing imports | Standardize |
| COMPONENT_SPACING underused | LOW | Inconsistent semantics | Document best practices |

---

## Issue 1: Icon Sizes in Two Places (HIGH SEVERITY)

### Problem

Icon sizes are defined in **two different files** with **conflicting values**:

**ICON_SIZES (typography.ts)**
```typescript
export const ICON_SIZES = {
  micro: 10,
  small: 16,
  medium: 24,
  large: 36,    // ⚠️ Different from SIZES!
  xlarge: 48,
  huge: 52,
} as const;
```

**SIZES (spacing.ts)**
```typescript
export const SIZES = {
  iconSm: 16,   // = ICON_SIZES.small ✓
  iconMd: 20,   // No equivalent in ICON_SIZES!
  iconLg: 24,   // = ICON_SIZES.medium ✓
  iconXl: 32,   // ≠ ICON_SIZES.large (36) ✗
  // ...
} as const;
```

### Comparison Table

| Concept | ICON_SIZES (typography) | SIZES (spacing) | Match? |
|---------|-------------------------|-----------------|--------|
| Extra small | micro: 10 | - | N/A |
| Small | small: 16 | iconSm: 16 | ✓ |
| Medium-small | - | iconMd: 20 | N/A |
| Medium | medium: 24 | iconLg: 24 | ✓ |
| Large | large: 36 | iconXl: 32 | ✗ CONFLICT |
| Extra large | xlarge: 48 | - | N/A |
| Huge | huge: 52 | - | N/A |

### Current Usage

- `ICON_SIZES.*`: **6 usages** (for emoji sizing in modals)
- `SIZES.icon*`: **23 usages** (for Ionicons)

### Impact

Developers don't know which to use. Same semantic meaning ("large icon") yields different values depending on which token they pick.

### Recommended Solution

**Consolidate into SIZES** with semantic naming:

```typescript
export const SIZES = {
  // Icon sizes (consolidated from ICON_SIZES)
  iconMicro: 10,    // Was ICON_SIZES.micro
  iconSm: 16,       // Already exists
  iconMd: 20,       // Already exists
  iconLg: 24,       // Already exists
  iconXl: 32,       // Keep (used 23x)
  iconXxl: 36,      // Was ICON_SIZES.large
  iconHuge: 48,     // Was ICON_SIZES.xlarge

  // Other sizes...
  progressBarHeight: 8,
  // etc.
} as const;
```

Then **deprecate ICON_SIZES** in typography.ts (or remove after migration).

---

## Issue 2: Typography Double-Export (MEDIUM SEVERITY)

### Problem

Every typography style is exported **twice**:

```typescript
// Individual export
export const CARD_TITLE: TextStyle = {
  fontSize: 17,
  fontWeight: FONT_WEIGHTS.semibold,
};

// Also in TYPOGRAPHY object
export const TYPOGRAPHY = {
  cardTitle: CARD_TITLE,  // Same thing!
  // ...
} as const;
```

### Current Usage

- `TYPOGRAPHY.*`: **241 usages** (majority)
- Individual exports: **49 usages** (minority)

### Files Using Individual Exports

```
src/app/testing.tsx:
import { FONT_WEIGHTS, PAGE_TITLE, BODY, CAPTION, CARD_TITLE } from '../constants/typography';

src/components/journey/UpNextCard.tsx:
import { TYPOGRAPHY, FONT_WEIGHTS, SECTION_TITLE, CARD_TITLE, LABEL } from '../../constants/typography';
```

### Impact

- Inconsistent import patterns
- Both `TYPOGRAPHY.cardTitle` and `CARD_TITLE` work
- Code reviews can't enforce a single pattern
- Bundle includes duplicate references

### Recommended Solution

**Option A (Recommended): Standardize on TYPOGRAPHY object**

1. Keep individual const definitions (for readability)
2. Remove `export` from individual constants
3. Only export `TYPOGRAPHY` object

```typescript
// Internal definition (not exported)
const CARD_TITLE: TextStyle = {
  fontSize: 17,
  fontWeight: FONT_WEIGHTS.semibold,
};

// Only public API
export const TYPOGRAPHY = {
  cardTitle: CARD_TITLE,
  // ...
} as const;
```

4. Migrate 2 files from individual imports to TYPOGRAPHY

**Option B: Keep both but document**

Add comments indicating preference:
```typescript
// Prefer using TYPOGRAPHY.cardTitle over direct CARD_TITLE import
export const CARD_TITLE: TextStyle = { ... };
```

---

## Issue 3: COMPONENT_SPACING Underutilized (LOW SEVERITY)

### Problem

COMPONENT_SPACING tokens exist but are rarely used:

| Token | Value | Same as | COMPONENT_SPACING usages | SPACING usages |
|-------|-------|---------|--------------------------|----------------|
| cardPadding | 20 | SPACING.xl | 3 | 61 |
| screenPadding | 16 | SPACING.lg | 2 | 94 |
| sectionGap | 24 | SPACING.xxl | 0 | 30+ |
| listItemGap | 12 | SPACING.md | 1 | 40+ |
| inlineGap | 8 | SPACING.sm | 0 | 50+ |
| headerPadding | 16 | SPACING.lg | 0 | - |
| tabBarHeight | 56 | (unique) | 3 | N/A |

**Total COMPONENT_SPACING usages: 9**

### Analysis

Unlike RADIUS (where components should have consistent radii), spacing is inherently more flexible:
- A card might need `SPACING.lg` padding in one context, `SPACING.xl` in another
- Screen padding varies by screen type
- Gap sizes depend on content density

### Recommendation

**Keep COMPONENT_SPACING but don't enforce** - it's useful for documenting "standard" values but shouldn't constrain developers like COMPONENT_RADIUS does.

Add documentation to CLAUDE.md:
```markdown
## Spacing Usage Guidelines
- Use SPACING for general layout (margins, padding, gaps)
- Use COMPONENT_SPACING.cardPadding for standard card padding
- COMPONENT_SPACING defines defaults, not requirements
```

---

## Issue 4: Color System Architecture (INFORMATIONAL)

### Current Structure

```
JOURNEY_COLORS (static)     → 26 accent usages, 36 textPrimary usages
     ↓
theme.* (dynamic)           → 61 accentColor usages, 177 textColor usages
     ↓
COLOR_OPACITY (computed)    → Pre-calculated opacity variants
OVERLAY_COLORS             → Glassmorphism colors
DIFFICULTY_COLORS          → Semantic difficulty levels
```

### Analysis

The two-tier system (JOURNEY_COLORS → theme) is **intentional**:
- `JOURNEY_COLORS`: Used for elements that should be consistent across themes (e.g., success green, certification purple)
- `theme.*`: Used for elements that should adapt to the selected theme

**No changes needed** - this is a valid pattern.

### Minor Observation

`DIFFICULTY_COLORS.intermediate` uses hardcoded `#fab005` instead of a JOURNEY_COLORS reference:

```typescript
export const DIFFICULTY_COLORS = {
  beginner: JOURNEY_COLORS.success,     // ✓ References
  intermediate: '#fab005',               // ✗ Hardcoded
  advanced: '#ff6b6b',                   // Could be JOURNEY_COLORS.low
} as const;
```

Consider adding `intermediate` to JOURNEY_COLORS if it's used elsewhere.

---

## Recommended Action Plan

### Phase 1: Fix Icon Size Conflict (HIGH PRIORITY)

1. Add missing sizes to SIZES in spacing.ts
2. Create migration mapping
3. Update 6 files using ICON_SIZES
4. Deprecate/remove ICON_SIZES from typography.ts

**Estimated changes**: 8 files, ~20 edits

### Phase 2: Standardize Typography Exports (MEDIUM PRIORITY)

1. Remove `export` from individual typography constants
2. Update 2 files to use TYPOGRAPHY object
3. Keep FONT_WEIGHTS as separate export (it's a utility)

**Estimated changes**: 3 files, ~15 edits

### Phase 3: Documentation (LOW PRIORITY)

1. Update CLAUDE.md with spacing guidelines
2. Add comments to COMPONENT_SPACING explaining purpose
3. Document JOURNEY_COLORS vs theme.* usage

**Estimated changes**: 2 files

---

## Summary

| What | Status | Action |
|------|--------|--------|
| RADIUS → COMPONENT_RADIUS | ✅ DONE | Completed today |
| ICON_SIZES consolidation | ⚠️ TODO | High priority |
| Typography standardization | ⚠️ TODO | Medium priority |
| COMPONENT_SPACING | ✅ OK | Document only |
| Color system | ✅ OK | Minor cleanup |

The icon size conflict is the most urgent issue as it can cause visual inconsistencies. The typography double-export is a code quality issue that should be addressed for consistency.
