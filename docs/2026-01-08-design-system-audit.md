# Design System Comprehensive Audit
**Date**: 2026-01-08
**Status**: Analysis Complete

---

## Executive Summary

| Category | Issues Found | Severity |
|----------|-------------|----------|
| Hardcoded Colors | 8 files | Medium |
| Hardcoded Spacing/Radii | 25 files, 95+ violations | High |
| Hardcoded Typography | 6 files | Medium |
| Semantic Inconsistencies | 15+ patterns | High |

---

# SECTION 1: Files NOT Using the Design System

## 1.1 Hardcoded Colors

### Critical: Dynamic Color Opacity Suffixes
These files use hardcoded hex opacity suffixes (`20`, `30`, `15`) instead of design tokens:

| File | Line | Hardcoded Value | Should Use |
|------|------|-----------------|------------|
| CertificateCard.tsx | 33 | `` `${definition.color}20` `` | COLOR_OPACITY helper |
| TierCard.tsx | 123 | `` `${definition.color}20` `` | COLOR_OPACITY helper |
| CertificationReadyModal.tsx | 48 | `` `${definition.color}20` `` | COLOR_OPACITY helper |
| CertificationEarnedModal.tsx | 53, 59 | `` `${definition.color}30` ``, `20` | COLOR_OPACITY helper |
| PlaylistItemRow.tsx | 67 | `` `${sourceColor}15` `` | COLOR_OPACITY helper |

### Medium: Hardcoded 'transparent'
| File | Line | Context |
|------|------|---------|
| TierCard.tsx | 287 | nodeFuture background |
| GlowAnimation.tsx | 115 | shadowColor |
| UnifiedProgressPath.tsx | 299 | nodeFuture background |
| SmartQueue.tsx | 365 | continueAction background |

---

## 1.2 Hardcoded Spacing & Sizing

### HIGH PRIORITY: Container Dimensions (need new COMPONENT_SIZES tokens)

| File | Line | Value | Suggested Token |
|------|------|-------|-----------------|
| purpose.tsx | 90-91 | `width: 56, height: 56` | COMPONENT_SIZES.iconContainerMd |
| topic/[id].tsx | 298-299 | `width: 72, height: 72` | COMPONENT_SIZES.iconContainerLg |
| topic/[id].tsx | 378-379 | `width: 28, height: 28` | SIZES.iconMd + 8 or new token |
| learn.tsx | 69-70 | `width: 96, height: 96` | COMPONENT_SIZES.iconContainerXl |
| read.tsx | 558 | `height: 200` | COMPONENT_SIZES.previewContainer |
| CertificationReadyModal.tsx | 169-170 | `width: 80, height: 80` | COMPONENT_SIZES.iconContainerLg |
| CertificationEarnedModal.tsx | 150-151 | `width: 140, height: 140` | COMPONENT_SIZES.celebrationGlow |
| CertificationEarnedModal.tsx | 157-158 | `width: 100, height: 100` | COMPONENT_SIZES.celebrationIcon |
| CertificateCard.tsx | 149-150 | `width: 56, height: 56` | COMPONENT_SIZES.iconContainerMd |
| CertificateCard.tsx | 153-154 | `width: 80, height: 80` | COMPONENT_SIZES.iconContainerLg |
| NewCertificateModal.tsx | 87-88 | `width: 100, height: 100` | COMPONENT_SIZES.celebrationIcon |

### HIGH PRIORITY: Hardcoded borderRadius

| File | Line | Value | Should Use |
|------|------|-------|------------|
| SmartQueue.tsx | 263 | `borderRadius: 4` | COMPONENT_RADIUS.chip (8) |
| NowPlayingBar.tsx | 102 | `borderRadius: 4` | COMPONENT_RADIUS.chip (8) |
| QueueTabs.tsx | 95 | `borderRadius: 9` | COMPONENT_RADIUS.badge (9999) |
| InsightsPanel.tsx | 403, 470 | `borderRadius: 1` | New RADIUS.hairline token |
| InsightsPanel.tsx | 455 | `borderRadius: 4` | COMPONENT_RADIUS.chip (8) |
| CertificationEarnedModal.tsx | 133 | `borderRadius: 28` | COMPONENT_RADIUS.modal (20) |
| MultipleSelectQuestion.tsx | 165 | `borderRadius: 4` | COMPONENT_RADIUS.chip (8) |

### MEDIUM PRIORITY: Micro-spacing (1-2px values)

| File | Line | Value | Suggested Token |
|------|------|-------|-----------------|
| profile.tsx | 298 | `width: 1` | BORDER_WIDTH.thin |
| profile.tsx | 472 | `marginTop: 2` | SPACING.micro (new) |
| CertificationEarnedModal.tsx | 201 | `width: 1` | BORDER_WIDTH.thin |
| JourneyPath.tsx | 224 | `marginBottom: 2` | SPACING.micro |
| UnifiedProgressPath.tsx | 319, 325 | `marginTop: 2` | SPACING.micro |
| VerticalProgressPath.tsx | 302 | `paddingTop: 2` | SPACING.micro |
| PlaylistItemRow.tsx | 140 | `marginTop: 2` | SPACING.micro |
| NowPlayingBar.tsx | 101 | `paddingVertical: 2` | SPACING.micro |
| InsightsPanel.tsx | 401 | `height: 2` | BORDER_WIDTH.medium |
| InsightsPanel.tsx | 416 | `height: 1` | BORDER_WIDTH.thin |
| MetricsPanel.tsx | 194, 204, 215 | `marginLeft: 2`, `width: 1`, `height: 1` | Micro tokens |

### MEDIUM PRIORITY: Fixed layout widths

| File | Line | Value | Context |
|------|------|-------|---------|
| CertificationReadyModal.tsx | 208 | `width: 90` | requirementLabel |
| CertificationReadyModal.tsx | 230 | `width: 70` | requirementValue |
| JourneyPath.tsx | 162 | `left: 30` | Node position |
| JourneyPath.tsx | 248 | `width: 35` | progressPercent |
| InsightsPanel.tsx | 383 | `width: 36` | Comparison label |
| InsightsPanel.tsx | 464 | `height: 40` | Skeleton chart |

---

## 1.3 Hardcoded Typography

### HIGH PRIORITY: Hardcoded fontSize

| File | Line | Value | Should Use |
|------|------|-------|------------|
| play.tsx | 383 | `fontSize: 16` | TYPOGRAPHY.button.fontSize |
| play.tsx | 397 | `fontSize: 18` | TYPOGRAPHY.levelName.fontSize |
| train.tsx | 144 | `fontSize: 24` | TYPOGRAPHY.metricLarge.fontSize |
| topics.tsx | 110 | `fontSize: 20` | TYPOGRAPHY.sectionHeader.fontSize |
| topics.tsx | 135 | `fontSize: 24` | SIZES.iconLg |

### MEDIUM PRIORITY: Hardcoded fontWeight strings

| File | Line | Value | Should Use |
|------|------|-------|------------|
| NowPlayingBar.tsx | 106 | `fontWeight: '600'` | FONT_WEIGHTS.semibold |
| play.tsx | 358 | `fontWeight: '400'` | FONT_WEIGHTS.regular |

### MEDIUM PRIORITY: Hardcoded lineHeight/letterSpacing

| File | Line | Value | Should Use |
|------|------|-------|------------|
| journey.tsx | 123 | `lineHeight: 22` | TYPOGRAPHY.body.lineHeight |
| InsightsPanel.tsx | 341 | `letterSpacing: 1` | New LETTER_SPACING.wide token |
| play.tsx | 399 | `letterSpacing: 0` | LETTER_SPACING.normal |
| StatsSummary.tsx | 109 | `letterSpacing: 0.5` | LETTER_SPACING.wide |

---

# SECTION 2: Semantic Inconsistencies

## 2.1 Border Radius Inconsistencies

### Cards NOT using COMPONENT_RADIUS.card (16)

| File | Line | Current | Issue |
|------|------|---------|-------|
| CertificationReadyModal.tsx | 164 | `SPACING.xxl` (24) | Wrong token type (SPACING vs RADIUS) |
| topic/[id].tsx | 300 | `SPACING.xl` (20) | Wrong value AND token type |

### Modals NOT using COMPONENT_RADIUS.modal (20)

| File | Line | Current | Issue |
|------|------|---------|-------|
| CertificationEarnedModal.tsx | 133 | `28` (hardcoded) | Wrong value (28 vs 20) |
| CertificationReadyModal.tsx | 164 | `SPACING.xxl` (24) | Wrong value (24 vs 20) |
| NewCertificateModal.tsx | 75 | `SPACING.xxl` (24) | Wrong value (24 vs 20) |

### Chips/Badges NOT using COMPONENT_RADIUS.chip (8)

| File | Line | Current | Issue |
|------|------|---------|-------|
| InterestPill.tsx | 47 | `COMPONENT_RADIUS.modal` (20) | Completely wrong - pill using modal radius! |
| JourneyPath.tsx | 207 | `SPACING.md` (12) | Wrong token and value |
| SmartQueue.tsx | 263 | `4` (hardcoded) | Should be 8 |
| NowPlayingBar.tsx | 102 | `4` (hardcoded) | Should be 8 |

### Progress Bars NOT using COMPONENT_RADIUS.progressBar (6)

| File | Line | Current | Issue |
|------|------|---------|-------|
| topics.tsx | 154 | `SPACING.xs / 2` (2) | Should be 6 |

### Icon Containers using SPACING instead of COMPONENT_RADIUS

| File | Line | Current | Should Use |
|------|------|---------|------------|
| TierCard.tsx | 283 | `SPACING.xxl` (24) | COMPONENT_RADIUS value |
| CertificationReadyModal.tsx | 171 | `SPACING.huge` (40) | COMPONENT_RADIUS.badge |

---

## 2.2 Padding/Spacing Token Misuse

### Using SPACING when COMPONENT_SPACING exists

| File | Context | Current | Should Use |
|------|---------|---------|------------|
| Multiple files | Card padding | `SPACING.xl` (20) | `COMPONENT_SPACING.cardPadding` (20) |
| Multiple files | Screen padding | `SPACING.lg` (16) | `COMPONENT_SPACING.screenPadding` (16) |

*Note: Values are same, but semantic tokens improve clarity*

---

## 2.3 Icon Size Inconsistencies

### Same visual element, different sizing approach

| Context | File A | File B | Issue |
|---------|--------|--------|-------|
| Topic emoji | topics.tsx: `24` hardcoded | topic/[id].tsx: `SIZES.iconXxl` | Inconsistent approach |
| Playlist icon | PlaylistItemRow.tsx: `24` hardcoded | PlaylistBottomSheet.tsx: `36` hardcoded | Both should use SIZES |

---

# RECOMMENDED ACTION PLAN

## Phase 1: New Design Tokens (Prerequisites)

### Add to spacing.ts:

```typescript
// Micro spacing for fine adjustments
export const SPACING_MICRO = 2;

// Border widths
export const BORDER_WIDTH = {
  thin: 1,
  medium: 2,
} as const;

// Extend COMPONENT_SIZES
export const COMPONENT_SIZES = {
  // ... existing
  iconContainerSm: 48,
  iconContainerMd: 56,
  iconContainerLg: 80,
  iconContainerXl: 96,
  celebrationIcon: 100,
  celebrationGlow: 140,
} as const;
```

### Add to typography.ts:

```typescript
export const LETTER_SPACING = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
} as const;
```

### Add to themes.ts:

```typescript
// Color opacity helper
export function withOpacity(color: string, opacity: number): string {
  const hex = Math.round(opacity * 255).toString(16).padStart(2, '0');
  return `${color}${hex}`;
}
```

---

## Phase 2: Fix Hardcoded Values (25 files)

### Priority Order:
1. **Border radius fixes** (8 files) - Visual consistency
2. **Typography fixes** (6 files) - Text consistency
3. **Container size fixes** (11 files) - Layout consistency
4. **Color opacity fixes** (5 files) - Theme consistency
5. **Micro-spacing fixes** (10 files) - Fine-tuning

---

## Phase 3: Fix Semantic Inconsistencies (15 files)

### Critical (Change visible behavior):
1. InterestPill.tsx - `COMPONENT_RADIUS.modal` → `COMPONENT_RADIUS.chip`
2. CertificationEarnedModal.tsx - `28` → `COMPONENT_RADIUS.modal`
3. topics.tsx - Progress bar radius fix

### Medium (Token consistency):
1. All modal containers → `COMPONENT_RADIUS.modal`
2. All card containers → `COMPONENT_RADIUS.card`
3. All chips/badges → `COMPONENT_RADIUS.chip`

---

## Estimated Changes

| Phase | Files | Edits | Priority |
|-------|-------|-------|----------|
| Phase 1: New tokens | 3 | ~30 | Required first |
| Phase 2: Hardcoded values | 25 | ~100 | High |
| Phase 3: Semantic fixes | 15 | ~25 | Medium |
| **Total** | **~35 unique** | **~155** | |

---

## Verification Checklist

After fixes:
- [ ] `npx tsc --noEmit` passes
- [ ] `npm test` passes
- [ ] Visual regression check on all screens
- [ ] No hardcoded hex colors in components (grep test)
- [ ] No hardcoded borderRadius values (grep test)
- [ ] No hardcoded fontSize values (grep test)
