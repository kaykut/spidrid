# Spidrid Test Plan - 90% Coverage Target

**Date:** 2026-01-07
**Scope:** Unit & Integration Tests (no E2E)
**Framework:** Jest + React Native Testing Library
**Query Style:** TestID-based

---

## Table of Contents
1. [Test Infrastructure Setup](#1-test-infrastructure-setup)
2. [Mocking Strategy](#2-mocking-strategy)
3. [Test Pyramid Distribution](#3-test-pyramid-distribution)
4. [Unit Tests by Module](#4-unit-tests-by-module)
5. [Integration Tests](#5-integration-tests)
6. [Test File Structure](#6-test-file-structure)
7. [Implementation Order](#7-implementation-order)

---

## 1. Test Infrastructure Setup

### 1.1 Install Dependencies

```bash
npx expo install jest-expo jest @types/jest --dev
npx expo install @testing-library/react-native @testing-library/jest-native --dev
```

### 1.2 Jest Configuration

**jest.config.js** (create new file):
```javascript
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/types/**/*',
    '!src/app/**/_layout.tsx',  // Layout files are minimal
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|zustand)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
```

### 1.3 Jest Setup File

**jest.setup.js** (create new file):
```javascript
import '@testing-library/jest-native/extend-expect';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock expo-print
jest.mock('expo-print', () => ({
  printToFileAsync: jest.fn().mockResolvedValue({ uri: 'file://mock.pdf' }),
}));

// Mock expo-sharing
jest.mock('expo-sharing', () => ({
  isAvailableAsync: jest.fn().mockResolvedValue(true),
  shareAsync: jest.fn().mockResolvedValue(undefined),
}));

// Silence React Native warnings in tests
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Reset all mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
```

### 1.4 Package.json Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --runInBand"
  }
}
```

---

## 2. Mocking Strategy

### 2.1 Core Principles

| Principle | Application |
|-----------|-------------|
| **Don't mock SUT** | Never mock the module you're testing |
| **Mock at boundaries** | Mock external APIs, native modules, network |
| **Real integration where possible** | Use real Zustand stores when testing store-dependent components |
| **Predictable async** | Mock timers for RSVP engine tests |

### 2.2 What to Mock vs. Test as Integration

| Dependency | Strategy | Rationale |
|------------|----------|-----------|
| AsyncStorage | **Mock** | Native module, requires device |
| fetch/network | **Mock** | External dependency, flaky |
| expo-print | **Mock** | Native module |
| expo-sharing | **Mock** | Native module |
| Zustand stores | **Real** (mostly) | Test real state logic; reset between tests |
| ORP service | **Real** | Pure functions, our code |
| textProcessor | **Real** | Pure functions, our code |
| Timers (setTimeout) | **Fake timers** | Deterministic RSVP timing |
| Expo Router | **Mock with renderRouter** | Use expo-router/testing-library |

### 2.3 Zustand Store Reset Pattern

**__mocks__/zustand.ts** (create new file):
```typescript
import { act } from '@testing-library/react-native';
import * as zustand from 'zustand';

const { create: actualCreate, createStore: actualCreateStore } =
  jest.requireActual<typeof zustand>('zustand');

// Store references for reset
export const storeResetFns = new Set<() => void>();

// Wrap create to capture initial state
const createUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreate(stateCreator);
  const initialState = store.getState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

// Export wrapped create
export const create = (<T>(stateCreator: zustand.StateCreator<T>) => {
  return typeof stateCreator === 'function'
    ? createUncurried(stateCreator)
    : createUncurried;
}) as typeof zustand.create;

// Reset all stores between tests
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => resetFn());
  });
});
```

### 2.4 Network Mock Helper

**__tests__/helpers/mockFetch.ts** (create new file):
```typescript
export function mockFetchSuccess(html: string, status = 200) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    text: () => Promise.resolve(html),
  });
}

export function mockFetchError(message: string) {
  global.fetch = jest.fn().mockRejectedValue(new Error(message));
}

export function mockFetchTimeout() {
  global.fetch = jest.fn().mockImplementation(
    () => new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 100)
    )
  );
}
```

---

## 3. Test Pyramid Distribution

Following the 70/20/10 test pyramid for unit/integration/E2E (E2E excluded per scope):

| Test Type | Target % | Focus |
|-----------|----------|-------|
| **Unit Tests** | 80% | Services, stores, hooks, pure components |
| **Integration Tests** | 20% | Screen flows, store+component combos |

### 3.1 Coverage Targets by Module

| Module | Files | Target Coverage | Est. Test Files |
|--------|-------|-----------------|-----------------|
| Services | 5 | 95% | 5 |
| Stores | 6 | 95% | 6 |
| Hooks | 1 | 95% | 1 |
| Types (helpers) | 2 | 90% | 2 |
| Data | 3 | 85% | 2 |
| Components | 10 | 85% | 8 |
| Screens | 17 | 80% | 6 |
| **Total** | 44 | **90%** | **30** |

---

## 4. Unit Tests by Module

### 4.1 Services (5 files → 5 test files)

#### `src/services/orp.ts` → `__tests__/services/orp.test.ts`
**Priority: P0 (Critical)**

| Function | Test Cases |
|----------|------------|
| `calculateORP()` | 1-char word (index 0) |
| | 2-5 char words (floor(len/3)) |
| | 6-9 char words (floor(len*0.3)) |
| | 10-13 char words (floor(len*0.25)+1) |
| | 14+ char words (floor(len*0.25)+2) |
| | Empty string edge case |
| `calculatePauseMultiplier()` | Sentence-ending (. ! ?) → 1.8 |
| | Clause breaks (, ; :) → 1.3 |
| | Long words (>12 chars) → 1.2 |
| | Normal words → 1.0 |
| | Multiple punctuation (e.g., "...") |
| `isSentenceEnd()` | True for . ! ? endings |
| | False for other punctuation |
| | False for no punctuation |

**Est. tests:** 20

---

#### `src/services/textProcessor.ts` → `__tests__/services/textProcessor.test.ts`
**Priority: P0 (Critical)**

| Function | Test Cases |
|----------|------------|
| `tokenize()` | Basic word splitting |
| | Multiple spaces collapsed |
| | Tabs and newlines normalized |
| | Empty string → empty array |
| | Single word |
| | Preserves punctuation attached to words |
| `processWord()` | Returns ProcessedWord with correct ORP |
| | Correct pauseMultiplier |
| | Correct isSentenceEnd flag |
| `processText()` | Multiple sentences |
| | Returns correct length array |
| | Empty text → empty array |
| `findSentenceStarts()` | First word always included (index 0) |
| | After sentence-ending words |
| | Single sentence |
| | Multiple sentences |
| `findPreviousSentenceStart()` | Returns previous start |
| | At first sentence → stays at 0 |
| | Mid-sentence → start of current |
| `findNextSentenceStart()` | Returns next start |
| | At last sentence → end of text |
| | Multiple jumps |

**Est. tests:** 25

---

#### `src/services/contentExtractor.ts` → `__tests__/services/contentExtractor.test.ts`
**Priority: P1 (High)**

| Function | Test Cases |
|----------|------------|
| `extractFromUrl()` | Valid URL with content |
| | Invalid URL format → error |
| | 404 response → error |
| | Network timeout → error |
| | Empty page content → error |
| | HTML entity decoding (&amp; etc.) |
| | Title extraction from `<title>` |
| | Title extraction from `<h1>` |
| | Content extraction from `<article>` |
| | Content extraction from `<p>` tags |
| | Word count accuracy |
| | Strips script/style tags |
| `createFromText()` | Creates content with generated ID |
| | Uses provided title |
| | Generates title from content if none |
| | Calculates correct word count |
| | Returns success: true |

**Mock:** `global.fetch`
**Est. tests:** 18

---

#### `src/services/certificateTemplate.ts` → `__tests__/services/certificateTemplate.test.ts`
**Priority: P2 (Medium)**

| Function | Test Cases |
|----------|------------|
| `generateCertificateHTML()` | Contains user name |
| | Contains certificate title |
| | Contains achievement type |
| | Date formatted correctly |
| | WPM displayed |
| | Language label mapping |
| | HTML is well-formed |

**Est. tests:** 10

---

#### `src/services/certificatePDF.ts` → `__tests__/services/certificatePDF.test.ts`
**Priority: P2 (Medium)**

| Function | Test Cases |
|----------|------------|
| `generateCertificatePDF()` | Calls expo-print with HTML |
| | Returns file URI |
| | Handles print error |
| `shareCertificate()` | Calls expo-sharing |
| | Handles sharing unavailable |
| | Handles sharing error |
| `deleteCertificatePDF()` | No-op (returns void) |

**Mock:** `expo-print`, `expo-sharing`
**Est. tests:** 8

---

### 4.2 Stores (6 files → 6 test files)

#### `src/store/subscriptionStore.ts` → `__tests__/store/subscriptionStore.test.ts`
**Priority: P0 (Critical)**

| State/Action | Test Cases |
|--------------|------------|
| Initial state | isPremium = false |
| | isLoading = true |
| | contentAccessCount = 0 |
| `initialize()` | Sets isInitialized = true |
| | Sets isLoading = false |
| | Loads from AsyncStorage |
| `setPremium()` | Updates isPremium |
| | Persists to AsyncStorage |
| `incrementContentCount()` | Increments count |
| | Persists to AsyncStorage |
| `resetContentCount()` | Resets to 0 |
| `canAccessContent()` | True if premium |
| | True if count < 3 (free tier) |
| | False if count >= 3 (free tier) |
| `getMaxWPM()` | 1500 if premium |
| | 450 if free |
| `canUseWPM()` | True if wpm <= maxWPM |
| | False if wpm > maxWPM |
| `simulatePurchase()` | Sets isPremium = true |
| `simulateRestore()` | Sets isPremium = true |

**Mock:** AsyncStorage (via jest.setup.js)
**Est. tests:** 20

---

#### `src/store/learningStore.ts` → `__tests__/store/learningStore.test.ts`
**Priority: P0 (Critical)**

| State/Action | Test Cases |
|--------------|------------|
| Initial state | Empty articleProgress |
| | currentWPM = 250 |
| `completeArticle()` | Creates new progress record |
| | Updates existing record |
| | Saves best WPM |
| | Saves best score |
| | Persists to AsyncStorage |
| `getArticleProgress()` | Returns progress for ID |
| | Returns undefined for unknown |
| `getTopicProgress()` | Counts completed articles |
| | Calculates average score |
| | Calculates max WPM |
| `getTotalArticlesCompleted()` | Counts unique completed |
| `getHighestWPM()` | Returns max across all articles |
| | Returns 0 if none |
| `resetProgress()` | Clears all progress |

**Est. tests:** 18

---

#### `src/store/contentStore.ts` → `__tests__/store/contentStore.test.ts`
**Priority: P1 (High)**

| State/Action | Test Cases |
|--------------|------------|
| `addContent()` | Adds to array |
| | Generates unique ID |
| | Sets initial progress = 0 |
| `updateProgress()` | Updates correct item |
| | Clamps to 0-1 range |
| `updateLastRead()` | Sets lastReadAt timestamp |
| `deleteContent()` | Removes from array |
| | No-op for unknown ID |
| `getContentById()` | Returns content by ID |
| | Returns undefined for unknown |
| `setCurrentContent()` | Sets currentContentId |

**Est. tests:** 12

---

#### `src/store/certificateStore.ts` → `__tests__/store/certificateStore.test.ts`
**Priority: P1 (High)**

| State/Action | Test Cases |
|--------------|------------|
| `checkAndAwardCertificates()` | Awards for WPM thresholds (150, 200, 250, 300, 350, 400) |
| | No duplicate awards |
| | Returns newly awarded certificates |
| | Updates lastCheckedWPM |
| `hasCertificate()` | True for owned |
| | False for not owned |
| `getCertificate()` | Returns by ID |
| `getAllCertificates()` | Returns all sorted by date |

**Est. tests:** 15

---

#### `src/store/settingsStore.ts` → `__tests__/store/settingsStore.test.ts`
**Priority: P1 (High)**

| State/Action | Test Cases |
|--------------|------------|
| Initial state | Default theme = 'dark' |
| | Default WPM = 250 |
| Each setter | Updates correct field |
| | Persists to AsyncStorage |
| Theme object | Resolves correct theme colors |
| `resetSettings()` | Restores all defaults |

**Est. tests:** 15

---

#### `src/store/onboardingStore.ts` → `__tests__/store/onboardingStore.test.ts`
**Priority: P2 (Medium)**

| State/Action | Test Cases |
|--------------|------------|
| `setUsageMode()` | Sets learn/consume/both |
| `toggleInterest()` | Adds if not present |
| | Removes if present |
| `completeOnboarding()` | Sets hasCompletedOnboarding = true |
| `resetOnboarding()` | Clears all state |

**Est. tests:** 10

---

### 4.3 Hooks (1 file → 1 test file)

#### `src/hooks/useRSVPEngine.ts` → `__tests__/hooks/useRSVPEngine.test.ts`
**Priority: P0 (Critical)**

| Feature | Test Cases |
|---------|------------|
| Initialization | currentIndex = 0 |
| | isPlaying = false |
| | wpm = initialWPM |
| | totalWords = words.length |
| | progress = 0 |
| `play()` | Sets isPlaying = true |
| | Resets to 0 if at end |
| `pause()` | Sets isPlaying = false |
| `toggle()` | Toggles isPlaying |
| Playback loop | Advances currentIndex |
| | Uses correct interval (60000/wpm) |
| | Applies pauseMultiplier |
| | Stops at end |
| `setWPM()` | Updates wpm |
| | Clamps to 50-1500 |
| `rewindSentence()` | Jumps to previous sentence start |
| | Pauses playback |
| | Stays at 0 if first sentence |
| `skipSentence()` | Jumps to next sentence start |
| | Pauses playback |
| | Goes to end if last sentence |
| `jumpToIndex()` | Sets currentIndex |
| | Clamps to valid range |
| `reset()` | Sets index = 0 |
| | Sets isPlaying = false |
| Timer cleanup | Clears on unmount |
| | Clears on pause |
| Edge cases | Empty words array |
| | Single word |

**Test approach:** Use `renderHook`, `act`, fake timers
**Est. tests:** 30

---

### 4.4 Types with Logic (2 files → 2 test files)

#### `src/types/certificates.ts` → `__tests__/types/certificates.test.ts`
**Priority: P2 (Medium)**

| Function | Test Cases |
|----------|------------|
| `getCertificationTierDefinition()` | Returns correct tier |
| | Returns undefined for invalid |
| `checkTierReadiness()` | Returns ready = true when met |
| | Returns ready = false when not met |
| | Returns missing requirements |
| `getRequiredTextCounts()` | Returns correct counts per tier |
| `mapLegacyToTier()` | Maps old certificates correctly |

**Est. tests:** 12

---

#### `src/types/learning.ts` → `__tests__/types/learning.test.ts`
**Priority: P2 (Medium)**

| Function | Test Cases |
|----------|------------|
| `isPassing()` | True for score >= 70 |
| | False for score < 70 |
| `migrateLegacyQuestion()` | Converts old format |
| `isLegacyQuestion()` | Detects legacy format |
| `normalizeQuestion()` | Handles both formats |

**Est. tests:** 8

---

### 4.5 Data Files (3 files → 2 test files)

#### `src/data/curriculum.ts` → `__tests__/data/curriculum.test.ts`
**Priority: P2 (Medium)**

| Aspect | Test Cases |
|--------|------------|
| Data integrity | All topics have unique IDs |
| | All articles have unique IDs |
| | All articles have valid topicId |
| | All questions have correct answers |
| | Word counts are positive |
| `getArticlesByTopic()` | Returns correct articles |
| | Returns empty for invalid topic |

**Est. tests:** 10

---

#### `src/data/interests.ts` → `__tests__/data/interests.test.ts`
**Priority: P3 (Low)**

| Function | Test Cases |
|----------|------------|
| `getCurriculumTopicsForInterests()` | Maps interests to topics |
| | Handles invalid IDs |
| | No duplicate topics |

**Est. tests:** 5

---

### 4.6 Components (10 files → 8 test files)

#### `src/components/rsvp/RSVPWord.tsx` → `__tests__/components/RSVPWord.test.tsx`
**Priority: P1 (High)**

| Behavior | Test Cases |
|----------|------------|
| Render | Shows word text |
| | Highlights ORP character |
| | Shows "Ready" when word is null |
| | Applies fontSize prop |
| TestIDs | `rsvp-word`, `rsvp-orp`, `rsvp-ready` |

**Est. tests:** 8

---

#### `src/components/controls/PlaybackControls.tsx` → `__tests__/components/PlaybackControls.test.tsx`
**Priority: P1 (High)**

| Behavior | Test Cases |
|----------|------------|
| Display | Shows current WPM |
| | Shows word counter (X / Y) |
| | Shows progress bar |
| Interactions | Play button calls onToggle |
| | Pause button calls onToggle |
| | WPM+ calls onWPMChange(wpm + 25) |
| | WPM- calls onWPMChange(wpm - 25) |
| | WPM+ at limit calls onWPMLimitHit |
| | Rewind calls onRewind |
| | Skip calls onSkip |
| TestIDs | `playback-play`, `playback-wpm-up`, `playback-wpm-down`, `playback-rewind`, `playback-skip`, `playback-progress` |

**Est. tests:** 15

---

#### `src/components/paywall/Paywall.tsx` → `__tests__/components/Paywall.test.tsx`
**Priority: P1 (High)**

| Behavior | Test Cases |
|----------|------------|
| Visibility | Shows modal when visible=true |
| | Hidden when visible=false |
| Content | Shows WPM limit reason |
| | Shows content limit reason |
| Interactions | Purchase button triggers simulatePurchase |
| | Restore button triggers simulateRestore |
| | Close button calls onClose |
| States | Shows loading during purchase |
| TestIDs | `paywall-modal`, `paywall-purchase`, `paywall-restore`, `paywall-close` |

**Est. tests:** 12

---

#### `src/components/common/ThemeProvider.tsx` → `__tests__/components/ThemeProvider.test.tsx`
**Priority: P2 (Medium)**

| Behavior | Test Cases |
|----------|------------|
| `useTheme()` | Returns theme object |
| | Throws outside provider |
| Theme switch | Updates when settings change |

**Est. tests:** 5

---

#### `src/components/certificates/CertificateCard.tsx` → `__tests__/components/CertificateCard.test.tsx`
**Priority: P2 (Medium)**

| Behavior | Test Cases |
|----------|------------|
| Render | Shows certificate title |
| | Shows earned date |
| | Shows WPM achieved |
| | Small size variant |
| | Large size variant |
| Interaction | onPress callback |
| TestIDs | `certificate-card`, `certificate-title`, `certificate-wpm` |

**Est. tests:** 8

---

#### `src/components/certificates/NewCertificateModal.tsx` → `__tests__/components/NewCertificateModal.test.tsx`
**Priority: P2 (Medium)**

| Behavior | Test Cases |
|----------|------------|
| Visibility | Shows when visible=true |
| Content | Shows congratulations message |
| | Shows certificate info |
| | Shows user name |
| Interactions | Share button calls onShare |
| | Close calls onClose |
| TestIDs | `new-cert-modal`, `new-cert-share`, `new-cert-close` |

**Est. tests:** 8

---

#### `src/components/navigation/FloatingNavBar.tsx` → `__tests__/components/FloatingNavBar.test.tsx`
**Priority: P3 (Low)**

| Behavior | Test Cases |
|----------|------------|
| Render | Shows all 4 tab icons |
| | Highlights active tab |
| TestIDs | `nav-learn`, `nav-read`, `nav-profile`, `nav-settings` |

**Est. tests:** 5

---

#### `src/components/onboarding/InterestPill.tsx` → `__tests__/components/InterestPill.test.tsx`
**Priority: P3 (Low)**

| Behavior | Test Cases |
|----------|------------|
| Render | Shows interest label |
| | Selected state styling |
| | Unselected state styling |
| Interaction | onPress callback |
| TestID | `interest-pill-{id}` |

**Est. tests:** 5

---

## 5. Integration Tests

### 5.1 Screen Integration Tests (6 test files)

#### `__tests__/integration/ArticleReader.test.tsx`
**Priority: P0 (Critical)**
**Tests:** Article reading → quiz → scoring → certificate award flow

| Scenario | Assertion |
|----------|-----------|
| Load article | RSVPWord shows first word |
| Complete reading | Progress reaches 100% |
| Answer quiz correctly | Score calculated correctly |
| Pass quiz (≥70%) | Progress saved to learningStore |
| Certificate threshold | NewCertificateModal appears |

**Stores involved:** learningStore, certificateStore, settingsStore

---

#### `__tests__/integration/ContentImport.test.tsx`
**Priority: P1 (High)**
**Tests:** URL import → content reading flow

| Scenario | Assertion |
|----------|-----------|
| Import valid URL | Content added to contentStore |
| Free tier limit | Paywall shown after 3 imports |
| Premium user | No limit on imports |
| Read imported content | Progress tracked |

**Stores involved:** contentStore, subscriptionStore

---

#### `__tests__/integration/SubscriptionFlow.test.tsx`
**Priority: P1 (High)**
**Tests:** Premium upgrade flows

| Scenario | Assertion |
|----------|-----------|
| WPM limit hit | Paywall shows with wpm_limit reason |
| Content limit hit | Paywall shows with content_limit reason |
| Purchase | isPremium = true, limits removed |
| Restore | isPremium = true |

**Stores involved:** subscriptionStore, settingsStore

---

#### `__tests__/integration/LearningProgress.test.tsx`
**Priority: P1 (High)**
**Tests:** Learning mode navigation and progress

| Scenario | Assertion |
|----------|-----------|
| Topic list | Shows topics filtered by interests |
| Topic progress | Shows correct completion % |
| Article completion | Updates topic progress |
| Highest WPM | Updates across articles |

**Stores involved:** learningStore, onboardingStore

---

#### `__tests__/integration/OnboardingFlow.test.tsx`
**Priority: P2 (Medium)**
**Tests:** Onboarding screens

| Scenario | Assertion |
|----------|-----------|
| Purpose selection | Sets usageMode |
| Interest selection | Sets selectedInterests |
| Complete | hasCompletedOnboarding = true |
| Skip | Can complete without selections |

**Stores involved:** onboardingStore

---

#### `__tests__/integration/CertificateSharing.test.tsx`
**Priority: P2 (Medium)**
**Tests:** Certificate view and share

| Scenario | Assertion |
|----------|-----------|
| View certificate | Shows in CertificateViewerModal |
| Share certificate | Generates PDF, calls share API |

**Stores involved:** certificateStore
**Mocks:** expo-print, expo-sharing

---

### 5.2 Expo Router Integration Pattern

```tsx
import { renderRouter, screen } from 'expo-router/testing-library';
import { fireEvent } from '@testing-library/react-native';

describe('Article Reader Integration', () => {
  it('completes article and awards certificate', async () => {
    renderRouter({
      'article/[id]': ArticleScreen,
    }, {
      initialUrl: '/article/science-001',
    });

    // Verify screen loaded
    expect(screen).toHavePathname('/article/science-001');

    // Find and interact with components by testID
    const playButton = screen.getByTestId('playback-play');
    fireEvent.press(playButton);

    // ... continue flow
  });
});
```

---

## 6. Test File Structure

```
__tests__/
├── helpers/
│   ├── mockFetch.ts
│   ├── renderWithProviders.tsx
│   └── testUtils.ts
├── services/
│   ├── orp.test.ts
│   ├── textProcessor.test.ts
│   ├── contentExtractor.test.ts
│   ├── certificateTemplate.test.ts
│   └── certificatePDF.test.ts
├── store/
│   ├── subscriptionStore.test.ts
│   ├── learningStore.test.ts
│   ├── contentStore.test.ts
│   ├── certificateStore.test.ts
│   ├── settingsStore.test.ts
│   └── onboardingStore.test.ts
├── hooks/
│   └── useRSVPEngine.test.ts
├── types/
│   ├── certificates.test.ts
│   └── learning.test.ts
├── data/
│   ├── curriculum.test.ts
│   └── interests.test.ts
├── components/
│   ├── RSVPWord.test.tsx
│   ├── PlaybackControls.test.tsx
│   ├── Paywall.test.tsx
│   ├── ThemeProvider.test.tsx
│   ├── CertificateCard.test.tsx
│   ├── NewCertificateModal.test.tsx
│   ├── FloatingNavBar.test.tsx
│   └── InterestPill.test.tsx
└── integration/
    ├── ArticleReader.test.tsx
    ├── ContentImport.test.tsx
    ├── SubscriptionFlow.test.tsx
    ├── LearningProgress.test.tsx
    ├── OnboardingFlow.test.tsx
    └── CertificateSharing.test.tsx

__mocks__/
├── zustand.ts
└── @react-native-async-storage/
    └── async-storage.ts (may not need if using built-in mock)
```

---

## 7. Implementation Order

### Phase 1: Infrastructure (Day 1)
1. Install dependencies
2. Create jest.config.js
3. Create jest.setup.js
4. Create __mocks__/zustand.ts
5. Create __tests__/helpers/*

### Phase 2: Core Unit Tests - P0 (Days 2-4)
1. `orp.test.ts` (20 tests)
2. `textProcessor.test.ts` (25 tests)
3. `useRSVPEngine.test.ts` (30 tests)
4. `subscriptionStore.test.ts` (20 tests)
5. `learningStore.test.ts` (18 tests)

### Phase 3: Secondary Unit Tests - P1 (Days 5-7)
1. `contentExtractor.test.ts` (18 tests)
2. `contentStore.test.ts` (12 tests)
3. `certificateStore.test.ts` (15 tests)
4. `settingsStore.test.ts` (15 tests)
5. `RSVPWord.test.tsx` (8 tests)
6. `PlaybackControls.test.tsx` (15 tests)
7. `Paywall.test.tsx` (12 tests)

### Phase 4: Lower Priority Unit Tests - P2/P3 (Days 8-9)
1. `certificateTemplate.test.ts` (10 tests)
2. `certificatePDF.test.ts` (8 tests)
3. `onboardingStore.test.ts` (10 tests)
4. Type helper tests (20 tests)
5. Data validation tests (15 tests)
6. Remaining component tests (26 tests)

### Phase 5: Integration Tests (Days 10-12)
1. `ArticleReader.test.tsx`
2. `ContentImport.test.tsx`
3. `SubscriptionFlow.test.tsx`
4. `LearningProgress.test.tsx`
5. `OnboardingFlow.test.tsx`
6. `CertificateSharing.test.tsx`

### Phase 6: Coverage Gap Analysis (Day 13)
1. Run coverage report
2. Identify gaps
3. Add missing tests to reach 90%

---

## Summary

| Metric | Target |
|--------|--------|
| Total test files | ~30 |
| Total test cases | ~350 |
| Line coverage | 90% |
| Branch coverage | 85% |
| Function coverage | 90% |

### Key Best Practices Applied

1. **Test Pyramid:** 80% unit, 20% integration
2. **Don't Mock SUT:** Only mock external dependencies
3. **TestID Queries:** All component queries via testID
4. **Fake Timers:** For RSVP engine timing tests
5. **Zustand Reset:** Store state reset between tests
6. **Real Integration:** Use real stores when testing store-dependent components
7. **Expo Router Testing:** Use expo-router/testing-library's renderRouter

### Sources

- [Expo Unit Testing Documentation](https://docs.expo.dev/develop/unit-testing/)
- [Expo Router Testing Documentation](https://docs.expo.dev/router/reference/testing/)
- [React Native Testing Overview](https://reactnative.dev/docs/testing-overview)
- [React Native Testing Library](https://github.com/callstack/react-native-testing-library)
- [Zustand Testing Guide](https://zustand.docs.pmnd.rs/guides/testing)
- [Testing Custom React Hooks](https://www.builder.io/blog/test-custom-hooks-react-testing-library)
- [AsyncStorage Jest Integration](https://react-native-async-storage.github.io/async-storage/docs/advanced/jest/)
