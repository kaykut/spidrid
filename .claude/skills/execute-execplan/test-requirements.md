# Test Requirements Reference

This document defines the strict testing standards for ExecPlan execution.

## Core Principles

### 1. No Mocking the System Under Test (SUT)

The SUT is the code you're actually testing. Never mock it.

**Wrong:**
```typescript
// Testing UserService but mocking its internal methods
jest.spyOn(userService, 'validateEmail').mockReturnValue(true);
const result = userService.createUser(data);
```

**Right:**
```typescript
// Test the real UserService, only mock external dependencies
const mockDatabase = { save: jest.fn().mockResolvedValue({ id: '123' }) };
const userService = new UserService(mockDatabase);
const result = await userService.createUser(validData);
expect(result.id).toBe('123');
```

### 2. Test Behavior, Not Implementation

Tests should verify WHAT the code does, not HOW it does it internally.

**Wrong:**
```typescript
// Testing implementation details
it('should call validateEmail before saving', () => {
  const spy = jest.spyOn(userService, 'validateEmail');
  userService.createUser(data);
  expect(spy).toHaveBeenCalled();
});
```

**Right:**
```typescript
// Testing behavior/outcome
it('should reject invalid email addresses', async () => {
  const invalidData = { email: 'not-an-email', name: 'Test' };
  await expect(userService.createUser(invalidData))
    .rejects.toThrow('Invalid email format');
});

it('should create user with valid data', async () => {
  const validData = { email: 'test@example.com', name: 'Test' };
  const result = await userService.createUser(validData);
  expect(result.email).toBe('test@example.com');
});
```

### 3. What TO Mock

Mock these external dependencies:
- Network requests (APIs, databases)
- File system operations
- Time/dates (use fake timers)
- Random number generators (when determinism needed)
- Third-party services (payment, auth providers)
- Platform-specific APIs (in cross-platform code)

### 4. What NOT TO Mock

Never mock:
- The code you're testing (SUT)
- Pure functions from your codebase
- Value objects and data structures
- Internal helper methods of the SUT
- Collaborating classes when testing integration

## Test Structure

### Arrange-Act-Assert (AAA)

```typescript
it('should calculate total with discount', () => {
  // Arrange - set up test data and dependencies
  const cart = new ShoppingCart();
  cart.addItem({ price: 100, quantity: 2 });
  const discount = new PercentageDiscount(10);

  // Act - execute the behavior being tested
  const total = cart.calculateTotal(discount);

  // Assert - verify the outcome
  expect(total).toBe(180); // 200 - 10%
});
```

### Given-When-Then (for complex scenarios)

```typescript
describe('User Registration', () => {
  describe('given a user with valid credentials', () => {
    const validUser = { email: 'test@test.com', password: 'Secure123!' };

    describe('when they register', () => {
      it('then they should receive a confirmation email', async () => {
        const emailService = createMockEmailService();
        const auth = new AuthService(emailService);

        await auth.register(validUser);

        expect(emailService.send).toHaveBeenCalledWith(
          expect.objectContaining({ to: validUser.email, type: 'confirmation' })
        );
      });
    });
  });
});
```

## Coverage Guidelines

### Target Coverage: 80%+ on New Code

Focus coverage on:
1. **Happy paths** - Primary use cases work correctly
2. **Edge cases** - Boundary conditions, empty inputs, limits
3. **Error paths** - Failures are handled gracefully
4. **Business logic** - Core domain rules are verified

### Coverage Quality Over Quantity

A meaningful 80% is better than superficial 100%.

**Superficial coverage (bad):**
```typescript
it('should exist', () => {
  expect(myFunction).toBeDefined();
});
```

**Meaningful coverage (good):**
```typescript
it('should parse date strings in ISO format', () => {
  expect(parseDate('2024-01-15')).toEqual(new Date(2024, 0, 15));
});

it('should throw for invalid date strings', () => {
  expect(() => parseDate('not-a-date')).toThrow('Invalid date format');
});
```

## Test File Organization

```
src/
  services/
    userService.ts
    userService.test.ts      # Unit tests co-located
  components/
    Button.tsx
    Button.test.tsx          # Component tests co-located
__tests__/
  integration/
    userFlow.test.ts         # Integration tests separate
  e2e/
    registration.test.ts     # E2E tests separate
```

## React Native/Expo Specific

### Component Testing

```typescript
import { render, fireEvent } from '@testing-library/react-native';

it('should call onPress when button is tapped', () => {
  const onPress = jest.fn();
  const { getByText } = render(<Button onPress={onPress}>Tap Me</Button>);

  fireEvent.press(getByText('Tap Me'));

  expect(onPress).toHaveBeenCalledTimes(1);
});
```

### Hook Testing

```typescript
import { renderHook, act } from '@testing-library/react-hooks';

it('should increment counter', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

### Store Testing (Zustand)

```typescript
import { useUserStore } from '../store/userStore';

beforeEach(() => {
  useUserStore.setState({ user: null, isLoading: false });
});

it('should update user on login', () => {
  const { login } = useUserStore.getState();

  login({ id: '1', name: 'Test User' });

  expect(useUserStore.getState().user).toEqual({ id: '1', name: 'Test User' });
});
```

## Anti-Patterns to Avoid

### 1. Testing the Framework
Don't test that React renders or that Zustand stores work.

### 2. Snapshot Abuse
Snapshots are for catching unintended changes, not for validating behavior.

### 3. Test Interdependence
Each test must be independent. Use beforeEach for setup.

### 4. Magic Numbers/Strings
Use constants or clearly named variables for expected values.

### 5. Ignoring Async
Always await async operations and handle promises properly.

### 6. Over-Mocking
If you're mocking more than external dependencies, you're testing the wrong thing.

## TDD Red-Green-Refactor Cycle

1. **RED**: Write a failing test that defines desired behavior
2. **GREEN**: Write minimum code to make the test pass
3. **REFACTOR**: Improve code quality while keeping tests green

```typescript
// 1. RED - Write failing test first
it('should format currency with symbol', () => {
  expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
});
// Test fails: formatCurrency is not defined

// 2. GREEN - Minimum implementation
function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
}
// Test passes

// 3. REFACTOR - Improve if needed (add types, handle edge cases)
// Keep running tests to ensure they stay green
```
