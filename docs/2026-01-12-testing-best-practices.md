# React Native Component Testing Best Practices

Reference guide for Devoro test development.

## Current State Summary

- **71 test files**, 1869 tests passing
- **@testing-library/react-native** v13.3.3 in use
- **jest-expo** preset configured
- Coverage: 75% statements, 75% lines, 72% functions (thresholds: 84/85/84)

## Best Practices

### 1. Query Priority (User-Centric)

```typescript
// Preferred order:
getByText('Continue Reading')     // What users see
getByRole('button')               // Accessibility role
getByLabelText('Submit')          // Accessibility label
getByPlaceholderText('Email')     // Form inputs
getByTestId('submit-btn')         // Last resort only
```

### 2. Test Behavior, Not Implementation

```typescript
// Good - tests outcome
fireEvent.press(getByText('Add'));
expect(getByText('Item added')).toBeTruthy();

// Bad - tests implementation
expect(component.state.items.length).toBe(1);
```

### 3. Use Real Stores, Not Mocks

```typescript
// Good - real store with controlled state
useLearningStore.setState({ articleProgress: {...} });
const { result } = renderHook(() => useStats());

// Avoid - mocking the system under test
jest.mock('../../src/store/learningStore');
```

### 4. Async Testing Pattern

```typescript
fireEvent.press(getByText('Submit'));
await waitFor(() => {
  expect(getByText('Success')).toBeTruthy();
});
```

### 5. Component Test Structure

```typescript
describe('ComponentName', () => {
  describe('rendering', () => {
    it('displays expected content', () => {...});
  });

  describe('interactions', () => {
    it('calls handler when pressed', () => {...});
  });

  describe('edge cases', () => {
    it('handles empty state', () => {...});
  });
});
```

## Current Gaps to Address

### High Priority

| Issue | Impact | Fix |
|-------|--------|-----|
| Duplicated `renderWithProviders` | 149+ copies across tests | Consolidate to shared helper |
| Some stores mocked instead of real | Tests don't catch real bugs | Use `setState()` pattern |
| Missing interaction verification | False passing tests | Add `toHaveBeenCalled()` checks |

### Medium Priority

| Issue | Impact | Fix |
|-------|--------|-----|
| No accessibility queries | Miss a11y regressions | Use `getByRole`, `getByA11yHint` |
| Disabled states not verified | Buttons may still be clickable | Verify `onPress` not called |
| Limited error state testing | Miss error handling bugs | Test timeouts, rejections |

### Low Priority

| Issue | Impact | Fix |
|-------|--------|-----|
| No snapshot tests | Miss visual regressions | Add for complex UI components |
| Navigation not deeply tested | Routing bugs slip through | Verify push/back calls |

## What NOT to Test

- Styling details (colors, spacing) - brittle
- Internal component state - test outcomes instead
- Third-party library behavior - assume it works
- Implementation details that users don't see

## Recommended Actions

### Immediate (No New Tests)
1. Consolidate `renderWithProviders` to `__tests__/helpers/renderWithProviders.tsx`
2. Replace store mocks with real stores + `setState()`

### Short-term (Improve Existing)
1. Add `toHaveBeenCalled()` assertions for interaction handlers
2. Add accessibility queries where missing
3. Test disabled button states properly

### Long-term (New Coverage)
1. Add component tests for high-value screens (playback, profile)
2. Add integration tests for multi-store interactions
3. Consider reducing coverage thresholds to realistic levels (75%)

## File Locations

- Test setup: `jest.setup.js`, `jest.config.js`
- Test utilities: `__tests__/helpers/testUtils.ts`
- Provider wrapper: `__tests__/helpers/renderWithProviders.tsx`
- Component tests: `__tests__/components/`
- Store tests: `__tests__/store/`
- Hook tests: `__tests__/hooks/`
