# Test Coverage Improvement Plan

**Date:** 2026-01-28
**Current Status:** Below thresholds
**Goal:** Exceed all coverage thresholds

---

## Current Coverage vs Thresholds

| Metric | Current | Threshold | Gap | Status |
|--------|---------|-----------|-----|--------|
| Statements | 72.57% (3572/4922) | 84% | -11.43% | **FAILING** |
| Lines | 72.69% (3365/4629) | 85% | -12.31% | **FAILING** |
| Functions | 74.69% (797/1067) | 84% | -9.31% | **FAILING** |
| Branches | 65.62% (1903/2900) | 65% | +0.62% | PASSING |

### Required Coverage to Meet Thresholds:
- **Statements:** Need 4134 covered (+562 more)
- **Lines:** Need 3935 covered (+570 more)
- **Functions:** Need 896 covered (+99 more)

---

## Strategy Overview

The plan uses a **three-phase approach**:

1. **Phase 1:** Reduce denominator by excluding non-testable files
2. **Phase 2:** Test high-impact 0% coverage files
3. **Phase 3:** Improve coverage in partially-tested files

**Projected Final Result:** 85-86% statements, 85% lines, 85% functions

---

## Phase 1: Coverage Configuration Adjustments

### Files to Exclude from Coverage

These files are either pure data exports or dev-only tooling that don't benefit from test coverage:

#### 1.1 Locale-Specific Curriculum Data (150 statements)
```
src/data/curriculum/(cs|de|es|fr|it|nl|pl|pt|ro|sv)/**
```
- **Rationale:** These are translated data exports (15 files × 10 locales = 150 files)
- **Why exclude:** Pure data, no logic to test; English curriculum already tested
- **Impact:** Removes 150 statements from denominator

#### 1.2 Development-Only Screens (30 statements)
```
src/app/dev-tools.tsx
src/app/debug-storage.tsx
```
- **Rationale:** Dev/debug screens not shipped to production
- **Impact:** Removes 30 statements from denominator

### Updated jest.config.js collectCoverageFrom:
```javascript
collectCoverageFrom: [
  'src/**/*.{ts,tsx}',
  '!src/**/*.d.ts',
  '!src/types/**/*',
  '!src/app/**/_layout.tsx',
  '!src/app/testing.tsx',
  // NEW EXCLUSIONS:
  '!src/data/curriculum/+(cs|de|es|fr|it|nl|pl|pt|ro|sv)/**',
  '!src/app/dev-tools.tsx',
  '!src/app/debug-storage.tsx',
],
```

### Phase 1 Impact:
- **Removed from total:** ~180 statements
- **New denominator:** ~4742 statements
- **New baseline:** 3572/4742 = **75.3%** statements

---

## Phase 2: Test 0% Coverage Files

### Priority 1 - High Impact (376 statements, 78 functions)

| File | Stmts | Funcs | Test File to Create |
|------|-------|-------|---------------------|
| `ExpandableLearnCard.tsx` | 111 | 20 | `__tests__/components/addContent/ExpandableLearnCard.test.tsx` |
| `purchases.ts` | 80 | 15 | `__tests__/services/purchases.test.ts` |
| `ExpandableReadCard.tsx` | 78 | 11 | `__tests__/components/addContent/ExpandableReadCard.test.tsx` |
| `add-content.tsx` | 64 | 13 | `__tests__/app/add-content.test.tsx` |
| `history.tsx` | 43 | 19 | `__tests__/app/history.test.tsx` |

**Expected coverage:** ~70% = **263 statements, 55 functions**

### Priority 2 - Medium Impact (67 statements, 21 functions)

| File | Stmts | Funcs | Test File to Create |
|------|-------|-------|---------------------|
| `reader/long-words.tsx` | 15 | 5 | `__tests__/app/reader/long-words.test.tsx` |
| `content/[id].tsx` | 15 | 4 | `__tests__/app/content/[id].test.tsx` |
| `article/[id].tsx` | 14 | 4 | `__tests__/app/article/[id].test.tsx` |
| `FABButton.tsx` | 12 | 3 | `__tests__/components/navigation/FABButton.test.tsx` |
| `topics.tsx` | 11 | 4 | `__tests__/app/topics.test.tsx` |

**Expected coverage:** ~70% = **47 statements, 15 functions**

### Priority 3 - Low Impact (16 statements, 3 functions)

| File | Stmts | Funcs | Test File to Create |
|------|-------|-------|---------------------|
| `GlassView.tsx` | 8 | 1 | `__tests__/components/common/GlassView.test.tsx` |
| `MiniTopicCard.tsx` | 6 | 1 | `__tests__/components/addContent/MiniTopicCard.test.tsx` |
| `PremiumBadge.tsx` | 2 | 1 | `__tests__/components/premium/PremiumBadge.test.tsx` |

**Expected coverage:** ~75% = **12 statements, 3 functions**

### Phase 2 Total Expected Gain:
- **Statements:** +322
- **Functions:** +73

---

## Phase 3: Improve Partially Covered Files

### Priority Files with Highest Uncovered Statements

| File | Current % | Uncovered | Target Gain | Approach |
|------|-----------|-----------|-------------|----------|
| `curriculumStore.ts` | 66% | 70 | +40 | Extend existing tests for edge cases |
| `contentListStore.ts` | 60% | 69 | +35 | Test filtering/sorting functions |
| `syllables.ts` | 20% | 68 | +40 | Test syllable detection algorithms |
| `CurriculumAccordionItem.tsx` | 5% | 39 | +30 | Add render + interaction tests |
| `paywall.tsx` | 63% | 31 | +20 | Test edge cases, error states |
| `cardLayout.ts` | 10% | 18 | +15 | Test layout calculation functions |
| `article/[articleIndex].tsx` | 50% | 47 | +25 | Test navigation + quiz completion |

### Phase 3 Total Expected Gain:
- **Statements:** +205
- **Functions:** +35 (estimated from improved file coverage)

---

## Projected Final Results

### After All Phases:

| Metric | Before | After Exclusions | After Testing | Threshold | Margin |
|--------|--------|------------------|---------------|-----------|--------|
| Statements | 72.57% | 75.3% | **86.0%** | 84% | +2.0% |
| Lines | 72.69% | 75.5% | **85.5%** | 85% | +0.5% |
| Functions | 74.69% | 75.2% | **85.3%** | 84% | +1.3% |
| Branches | 65.62% | 65.8% | **67%** | 65% | +2.0% |

### Calculation:
- **New total statements after exclusions:** 4742
- **Current covered:** 3572
- **New tests (Phase 2):** +322
- **Improved coverage (Phase 3):** +205
- **Total covered:** 4099
- **Final percentage:** 4099/4742 = **86.4%** (exceeds 84% threshold)

---

## Implementation Order

### Week 1: Configuration + High-Impact Tests
1. Update `jest.config.js` with exclusions
2. Write tests for `ExpandableLearnCard.tsx`
3. Write tests for `ExpandableReadCard.tsx`
4. Write tests for `add-content.tsx`
5. Write tests for `purchases.ts`

### Week 2: Screen Tests + Store Improvements
6. Write tests for `history.tsx`
7. Write tests for `topics.tsx`
8. Extend `curriculumStore.ts` tests
9. Extend `contentListStore.ts` tests
10. Add tests for `syllables.ts`

### Week 3: Component Tests + Polish
11. Write tests for remaining 0% components
12. Extend `CurriculumAccordionItem.tsx` tests
13. Extend `paywall.tsx` tests
14. Final coverage verification and adjustments

---

## Test File Templates

### Component Test Pattern
```typescript
// __tests__/components/addContent/ExpandableLearnCard.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ExpandableLearnCard } from '@/components/addContent/ExpandableLearnCard';

// Mock dependencies
jest.mock('@/store/subscriptionStore', () => ({
  useSubscriptionStore: () => ({ isPremium: false }),
}));

describe('ExpandableLearnCard', () => {
  it('renders collapsed state correctly', () => {});
  it('expands when pressed', () => {});
  it('shows premium features for premium users', () => {});
  // ... more tests covering all branches
});
```

### Service Test Pattern
```typescript
// __tests__/services/purchases.test.ts
import * as purchases from '@/services/purchases';

// Mock RevenueCat
jest.mock('react-native-purchases', () => ({
  configure: jest.fn(),
  getOfferings: jest.fn(),
  purchasePackage: jest.fn(),
}));

describe('purchases service', () => {
  it('configures RevenueCat on init', () => {});
  it('fetches offerings successfully', () => {});
  it('handles purchase errors gracefully', () => {});
});
```

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| RevenueCat SDK difficult to mock | Use jest.mock with simulated responses |
| Async state updates in stores | Use act() wrapper and waitFor() |
| Complex UI interactions | Use fireEvent for user interactions |
| Coverage below estimate | Build in 10% buffer for unexpected complexity |

---

## Definition of Done

- [ ] All coverage thresholds met or exceeded
- [ ] No failing tests
- [ ] All new test files follow existing patterns
- [ ] Tests are deterministic (no flaky tests)

---

## Appendix: Files at 0% Coverage (Non-Data)

| File Path | Statements | Functions |
|-----------|------------|-----------|
| `src/components/addContent/ExpandableLearnCard.tsx` | 111 | 20 |
| `src/services/purchases.ts` | 80 | 15 |
| `src/components/addContent/ExpandableReadCard.tsx` | 78 | 11 |
| `src/app/add-content.tsx` | 64 | 13 |
| `src/app/history.tsx` | 43 | 19 |
| `src/app/reader/long-words.tsx` | 15 | 5 |
| `src/app/content/[id].tsx` | 15 | 4 |
| `src/app/article/[id].tsx` | 14 | 4 |
| `src/components/navigation/FABButton.tsx` | 12 | 3 |
| `src/app/topics.tsx` | 11 | 4 |
| `src/components/common/GlassView.tsx` | 8 | 1 |
| `src/components/addContent/MiniTopicCard.tsx` | 6 | 1 |
| `src/components/premium/PremiumBadge.tsx` | 2 | 1 |
| **Total** | **459** | **101** |
