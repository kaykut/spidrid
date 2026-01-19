# Devoro: RSVP Speed Reading App

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

Reference: This document must be maintained in accordance with `/PLANS.md`.

## Purpose / Big Picture

Devoro is a cross-platform speed reading app that uses RSVP (Rapid Serial Visual Presentation) to help users read faster. Words appear one at a time, centered on the screen, with a single letter highlighted in a contrasting color (the "Optimal Recognition Point" or ORP). This anchors the user's eye and eliminates saccadic movement, enabling reading speeds of 300-1500+ words per minute.

After implementation, users can:
1. **Learn to speed read** through a progressive curriculum of 7-8 topics with comprehension testing
2. **Consume any content** by importing URLs or PDF files
3. **Track their progress** and earn certificates at 900 WPM and 1500 WPM milestones
4. **Upgrade to Premium** to unlock speeds above 450 WPM and unlimited content access

**Monetization (Freemium via RevenueCat):**
- Free tier: Up to 450 WPM, 5 articles/uploads total
- Premium: Unlimited WPM (up to 1500), unlimited content

## Progress

- [x] (2026-01-06 21:32Z) Milestone 1: Project Foundation - COMPLETE
  - Expo SDK 54 initialized with TypeScript
  - Expo Router configured with file-based navigation
  - Zustand + AsyncStorage for state (MMKV requires dev build)
  - 4 themes implemented: dark (default), midnight, sepia, light
  - Tab navigation working: Learn, Read, Settings
  - CLAUDE.md created with project conventions
- [x] (2026-01-06 21:54Z) Milestone 2: Core RSVP Engine - COMPLETE
  - ORP calculation algorithm implemented (src/services/orp.ts)
  - Text processor with tokenization and pause multipliers (src/services/textProcessor.ts)
  - useRSVPEngine hook with play/pause/WPM controls (src/hooks/useRSVPEngine.ts)
  - RSVPWord component with ORP highlighting (src/components/rsvp/RSVPWord.tsx)
  - PlaybackControls with progress bar and WPM slider (src/components/controls/PlaybackControls.tsx)
  - Demo reader screen accessible from Learn tab (src/app/reader/demo.tsx)
  - Note: react-native-reanimated removed due to Expo Go incompatibility; basic timing works with setTimeout
- [x] (2026-01-06 22:00Z) Milestone 3: RevenueCat Integration - COMPLETE
  - Subscription types and store (src/types/subscription.ts, src/store/subscriptionStore.ts)
  - Paywall modal component (src/components/paywall/Paywall.tsx)
  - FREE_TIER_LIMITS: 5 articles, 450 WPM max
  - PREMIUM_LIMITS: Unlimited articles, 1500 WPM max
  - Simulated purchases for Expo Go testing (real RevenueCat requires native build)
  - WPM limit enforcement in PlaybackControls
  - Subscription status display in Settings
- [x] (2026-01-06 22:15Z) Milestone 4: Learning Mode MVP - COMPLETE
  - 7 topics with 3 articles each (21 total articles)
  - Topics: Science, History, Technology, Nature, Space, Psychology, Economics
  - Comprehension questions (2 per article)
  - Progress tracking with learningStore (src/store/learningStore.ts)
  - Topic list screen with progress bars (src/app/(tabs)/learn.tsx)
  - Article list screen (src/app/topic/[id].tsx)
  - Article reader with RSVP + quiz flow (src/app/article/[id].tsx)
- [x] (2026-01-06 22:25Z) Milestone 5: Consumption Mode - COMPLETE
  - Content types and store (src/types/content.ts, src/store/contentStore.ts)
  - URL import with HTML extraction (src/services/contentExtractor.ts)
  - Text paste import
  - Read tab with import UI (src/app/(tabs)/read.tsx)
  - Content reader with progress saving (src/app/content/[id].tsx)
  - Content list with progress indicators
- [x] (2026-01-06 22:35Z) Milestone 6: Certificates & Polish - COMPLETE
  - Certificate types and definitions (src/types/certificates.ts)
  - Certificate store with auto-award logic (src/store/certificateStore.ts)
  - 4 certificates: Speed Reader (900 WPM), Master Reader (1500 WPM), Avid Learner (10 articles), Knowledge Seeker (50 articles)
  - Certificate cards and locked cards (src/components/certificates/CertificateCard.tsx)
  - New certificate modal (src/components/certificates/NewCertificateModal.tsx)
  - Profile tab with stats and certificates (src/app/(tabs)/profile.tsx)
  - Certificate awarded on article completion

## Surprises & Discoveries

- Observation: MMKV requires native build (Expo Go incompatible)
  Evidence: Error "NitroModules are not supported in Expo Go! Use EAS (expo prebuild)"
  Resolution: Using AsyncStorage for development; will switch to MMKV in production build

- Observation: expo-linking not auto-installed with expo-router
  Evidence: Bundle error "Unable to resolve expo-linking from Unmatched.js"
  Resolution: Manually installed with `npx expo install expo-linking`

- Observation: Expo SDK 54 uses React 19.1.0 with peer dependency conflicts
  Evidence: npm ERESOLVE errors when installing packages
  Resolution: Using `--legacy-peer-deps` flag for some installations

- Observation: react-native-reanimated requires react-native-worklets which causes babel plugin cascade failures
  Evidence: Error "Cannot find module 'react-native-worklets/plugin'" and "Cannot find module 'babel-preset-expo'"
  Resolution: Removed reanimated entirely; basic RSVP timing works fine with setTimeout; will add reanimated later for production builds if smooth animations needed

## Decision Log

- Decision: Remove react-native-reanimated for Expo Go development
  Rationale: Reanimated requires native worklets plugin which conflicts with Expo Go's managed workflow; setTimeout-based timing is sufficient for RSVP playback; can add reanimated in production build for smoother animations
  Date/Author: 2026-01-06 / M2 Implementation

- Decision: Use AsyncStorage instead of MMKV for Expo Go development
  Rationale: MMKV requires native code and doesn't work in Expo Go; AsyncStorage provides same API surface for development; will migrate to MMKV when creating production build with `expo prebuild`
  Date/Author: 2026-01-06 / M1 Implementation

- Decision: Use Expo with Expo Router for cross-platform support
  Rationale: Fastest path to iOS + Android with potential web support; managed workflow reduces native configuration complexity
  Date/Author: 2026-01-06 / Planning phase

- Decision: Use Zustand + MMKV for state management and persistence
  Rationale: Zustand is lightweight with minimal boilerplate; MMKV is 30x faster than AsyncStorage with synchronous API
  Date/Author: 2026-01-06 / Planning phase

- Decision: Freemium model with 450 WPM cap and 5 article limit for free tier
  Rationale: Allows users to experience core value before paying; high WPM is the key differentiator worth paying for
  Date/Author: 2026-01-06 / User requirement

- Decision: RevenueCat in MVP rather than post-launch
  Rationale: Validates monetization model early; easier to integrate before complex features
  Date/Author: 2026-01-06 / User requirement

## Outcomes & Retrospective

(To be populated at completion)

## Context and Orientation

**Repository State:** Empty greenfield project with only `README.md` initialized.

**Key Terms:**
- **RSVP (Rapid Serial Visual Presentation):** Displaying text one word at a time at a fixed position, eliminating eye movement
- **ORP (Optimal Recognition Point):** The letter in each word where the eye naturally focuses for fastest recognition; approximately 30% into the word
- **WPM (Words Per Minute):** Reading speed; average is 200-250, trained speed readers reach 500-1000+
- **RevenueCat:** Third-party service for managing in-app subscriptions across iOS/Android
- **Curriculum:** Pre-bundled learning content organized into topics with comprehension questions

**Target File Structure:**
```
/Users/kaya/Coding/spidrid/
├── CLAUDE.md                         # Project conventions (created in M1)
├── app.json                          # Expo configuration
├── App.tsx                           # Entry point
├── src/
│   ├── app/                          # Expo Router screens
│   ├── components/                   # React components
│   ├── hooks/                        # Custom React hooks
│   ├── store/                        # Zustand stores
│   ├── services/                     # Business logic
│   ├── data/                         # Bundled curriculum content
│   └── types/                        # TypeScript types
├── assets/                           # Fonts, images
└── scripts/                          # Build-time content generation
```

## Plan of Work

### Milestone 1: Project Foundation

**Goal:** Establish the Expo project with navigation, theming, and CLAUDE.md conventions. At the end, the app launches on iOS/Android simulator showing a home screen with tab navigation.

#### M1 Step-by-Step Commands

```bash
# Step 1: Initialize Expo in current directory
cd /Users/kaya/Coding/spidrid
npx create-expo-app@latest . --template expo-template-blank-typescript

# Step 2: Install Expo Router for file-based navigation
npx expo install expo-router react-native-screens react-native-safe-area-context react-native-gesture-handler

# Step 3: Install state management
npm install zustand

# Step 4: Install MMKV for fast storage
npx expo install react-native-mmkv

# Step 5: Create directory structure
mkdir -p src/app/\(tabs\)
mkdir -p src/components/common
mkdir -p src/store
mkdir -p src/types
mkdir -p src/data

# Step 6: Update package.json main entry for expo-router
# (will be done via file edit)

# Step 7: Start and verify
npx expo start
```

#### M1 File-by-File Breakdown

**File 1: `/CLAUDE.md`**

Purpose: Project conventions for all future Claude sessions. Must be updated each milestone.

```markdown
# Devoro - Speed Reading App

## Project Overview
React Native (Expo) RSVP speed reading app with freemium monetization.

## Tech Stack
- Framework: Expo SDK 52 with Expo Router
- State: Zustand with MMKV persistence
- Language: TypeScript (strict mode)

## Directory Structure
- src/app/ - Expo Router screens (file-based routing)
- src/components/ - Reusable React components
- src/hooks/ - Custom React hooks
- src/store/ - Zustand stores
- src/services/ - Business logic
- src/data/ - Static data and content
- src/types/ - TypeScript type definitions

## Commands
- npm start / npx expo start - Start dev server
- npm run ios - Run on iOS simulator
- npm run android - Run on Android emulator

## Conventions
- Use functional components with hooks
- Prefer named exports over default exports
- Store files use pattern: use[Name]Store
- All colors from theme, never hardcoded

## Current Milestone: 1 - Foundation
```

**File 2: `/src/types/settings.ts`**

```typescript
export interface Theme {
  id: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  orpColor: string;
  crosshairColor: string;
  accentColor: string;
  secondaryBackground: string;
}

export interface UserSettings {
  themeId: string;
  defaultWPM: number;
  showCrosshairs: boolean;
  crosshairOpacity: number;
  fontSize: number;
  hapticFeedback: boolean;
}

export const DEFAULT_SETTINGS: UserSettings = {
  themeId: 'dark',
  defaultWPM: 250,
  showCrosshairs: true,
  crosshairOpacity: 0.5,
  fontSize: 48,
  hapticFeedback: true,
};
```

**File 3: `/src/data/themes.ts`**

```typescript
import { Theme } from '../types/settings';

export const themes: Record<string, Theme> = {
  dark: {
    id: 'dark',
    name: 'Dark',
    backgroundColor: '#0a0a0a',
    textColor: '#ffffff',
    orpColor: '#ff6b6b',
    crosshairColor: '#333333',
    accentColor: '#4dabf7',
    secondaryBackground: '#1a1a1a',
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight',
    backgroundColor: '#1a1a2e',
    textColor: '#eaeaea',
    orpColor: '#e94560',
    crosshairColor: '#16213e',
    accentColor: '#0f3460',
    secondaryBackground: '#16213e',
  },
  sepia: {
    id: 'sepia',
    name: 'Sepia',
    backgroundColor: '#f4ecd8',
    textColor: '#5c4033',
    orpColor: '#8b4513',
    crosshairColor: '#d4c4a8',
    accentColor: '#704214',
    secondaryBackground: '#ebe3d1',
  },
  light: {
    id: 'light',
    name: 'Light',
    backgroundColor: '#ffffff',
    textColor: '#1a1a1a',
    orpColor: '#dc3545',
    crosshairColor: '#e0e0e0',
    accentColor: '#007bff',
    secondaryBackground: '#f5f5f5',
  },
};

export const themeList = Object.values(themes);
```

**File 4: `/src/store/settingsStore.ts`**

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';
import { UserSettings, DEFAULT_SETTINGS } from '../types/settings';
import { themes, Theme } from '../data/themes';

const storage = new MMKV({ id: 'spidrid-settings' });

const mmkvStorage = {
  getItem: (name: string) => storage.getString(name) ?? null,
  setItem: (name: string, value: string) => storage.set(name, value),
  removeItem: (name: string) => storage.delete(name),
};

interface SettingsState extends UserSettings {
  theme: Theme;
  setTheme: (themeId: string) => void;
  setDefaultWPM: (wpm: number) => void;
  setShowCrosshairs: (show: boolean) => void;
  setCrosshairOpacity: (opacity: number) => void;
  setFontSize: (size: number) => void;
  setHapticFeedback: (enabled: boolean) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      theme: themes[DEFAULT_SETTINGS.themeId],

      setTheme: (themeId) => set({
        themeId,
        theme: themes[themeId] || themes.dark
      }),

      setDefaultWPM: (defaultWPM) => set({ defaultWPM }),
      setShowCrosshairs: (showCrosshairs) => set({ showCrosshairs }),
      setCrosshairOpacity: (crosshairOpacity) => set({ crosshairOpacity }),
      setFontSize: (fontSize) => set({ fontSize }),
      setHapticFeedback: (hapticFeedback) => set({ hapticFeedback }),

      resetSettings: () => set({
        ...DEFAULT_SETTINGS,
        theme: themes[DEFAULT_SETTINGS.themeId],
      }),
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        themeId: state.themeId,
        defaultWPM: state.defaultWPM,
        showCrosshairs: state.showCrosshairs,
        crosshairOpacity: state.crosshairOpacity,
        fontSize: state.fontSize,
        hapticFeedback: state.hapticFeedback,
      }),
    }
  )
);
```

**File 5: `/src/components/common/ThemeProvider.tsx`**

```typescript
import React, { createContext, useContext, ReactNode } from 'react';
import { useSettingsStore } from '../../store/settingsStore';
import { Theme } from '../../types/settings';

interface ThemeContextType {
  theme: Theme;
  setTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSettingsStore((state) => state.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

**File 6: `/src/app/_layout.tsx`**

```typescript
import { Stack } from 'expo-router';
import { ThemeProvider } from '../components/common/ThemeProvider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}
```

**File 7: `/src/app/(tabs)/_layout.tsx`**

```typescript
import { Tabs } from 'expo-router';
import { useTheme } from '../../components/common/ThemeProvider';

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.secondaryBackground,
          borderTopColor: theme.crosshairColor,
        },
        tabBarActiveTintColor: theme.accentColor,
        tabBarInactiveTintColor: theme.textColor,
      }}
    >
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarLabel: 'Learn',
        }}
      />
      <Tabs.Screen
        name="read"
        options={{
          title: 'Read',
          tabBarLabel: 'Read',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
        }}
      />
    </Tabs>
  );
}
```

**File 8: `/src/app/(tabs)/learn.tsx`**

```typescript
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../components/common/ThemeProvider';

export default function LearnScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>
        Learn to Speed Read
      </Text>
      <Text style={[styles.subtitle, { color: theme.textColor, opacity: 0.7 }]}>
        Coming in Milestone 4
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
});
```

**File 9: `/src/app/(tabs)/read.tsx`**

```typescript
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../components/common/ThemeProvider';

export default function ReadScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>
        Import Content
      </Text>
      <Text style={[styles.subtitle, { color: theme.textColor, opacity: 0.7 }]}>
        Coming in Milestone 5
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
});
```

**File 10: `/src/app/(tabs)/settings.tsx`**

```typescript
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../components/common/ThemeProvider';
import { themeList } from '../../data/themes';

export default function SettingsScreen() {
  const { theme, setTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.textColor }]}>Settings</Text>

        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Theme</Text>
        <View style={styles.themeGrid}>
          {themeList.map((t) => (
            <TouchableOpacity
              key={t.id}
              style={[
                styles.themeButton,
                { backgroundColor: t.backgroundColor, borderColor: t.crosshairColor },
                theme.id === t.id && { borderColor: theme.accentColor, borderWidth: 3 },
              ]}
              onPress={() => setTheme(t.id)}
            >
              <Text style={[styles.themeName, { color: t.textColor }]}>{t.name}</Text>
              <View style={[styles.orpPreview, { backgroundColor: t.orpColor }]} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  themeButton: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  themeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  orpPreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
```

**File 11: `/app.json` modifications**

```json
{
  "expo": {
    "name": "Devoro",
    "slug": "spidrid",
    "scheme": "spidrid",
    "version": "1.0.0",
    "platforms": ["ios", "android"],
    "ios": {
      "bundleIdentifier": "com.yourname.spidrid",
      "supportsTablet": true
    },
    "android": {
      "package": "com.yourname.spidrid",
      "adaptiveIcon": {
        "backgroundColor": "#0a0a0a"
      }
    },
    "plugins": ["expo-router"]
  }
}
```

**File 12: `/package.json` main entry update**

Add to package.json:
```json
{
  "main": "expo-router/entry"
}
```

#### M1 Validation Checklist

1. Run `npx expo start`
2. Press `i` for iOS simulator
3. App launches without crashes
4. Bottom tab bar shows: Learn, Read, Settings
5. Tap Learn - shows placeholder text
6. Tap Read - shows placeholder text
7. Tap Settings - shows theme selector with 4 themes
8. Tap "Light" theme - background turns white, text turns dark
9. Tap "Sepia" theme - background turns cream colored
10. Tap "Dark" theme - background returns to black
11. Force close app, reopen - theme persists

**Validation:** Run `npx expo start`, open in iOS Simulator. App shows 3 tabs (Learn, Read, Settings). Settings screen allows theme switching; background color changes accordingly.

---

### Milestone 2: Core RSVP Engine

**Goal:** Build the word display and playback engine. At the end, a test screen shows words flowing one-at-a-time with ORP highlighting, controllable via play/pause/WPM slider.

#### M2 Step-by-Step Commands

```bash
# Working directory: /Users/kaya/Coding/spidrid

# Step 1: Install animation library for smooth transitions
npx expo install react-native-reanimated

# Step 2: Update babel.config.js to add reanimated plugin
# (will be done via file edit - add 'react-native-reanimated/plugin' to plugins array)

# Step 3: Create RSVP component directories
mkdir -p src/components/rsvp
mkdir -p src/components/controls
mkdir -p src/services
mkdir -p src/hooks
mkdir -p src/app/reader

# Step 4: Clear metro cache after babel config change
npx expo start --clear
```

#### M2 File-by-File Breakdown

**File 1: `/src/types/playback.ts`**

```typescript
export interface ProcessedWord {
  original: string;
  display: string;
  orpIndex: number;
  pauseMultiplier: number;
  sentenceEnd: boolean;
}

export interface PlaybackState {
  isPlaying: boolean;
  currentIndex: number;
  wpm: number;
}

export interface RSVPEngineControls {
  currentIndex: number;
  currentWord: ProcessedWord | null;
  isPlaying: boolean;
  wpm: number;
  totalWords: number;
  progress: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setWPM: (wpm: number) => void;
  rewindSentence: () => void;
  skipSentence: () => void;
  jumpToIndex: (index: number) => void;
  reset: () => void;
}
```

**File 2: `/src/services/orp.ts`**

```typescript
/**
 * ORP (Optimal Recognition Point) calculation.
 *
 * The ORP is the letter where the eye naturally focuses for fastest word recognition.
 * Research shows this is approximately 30% into the word, slightly left of center.
 * This algorithm is based on the Spritz speed reading research.
 *
 * Examples:
 * - "a" (1 char) -> ORP at index 0 -> "a"
 * - "the" (3 chars) -> ORP at index 1 -> "the" (h is red)
 * - "reading" (7 chars) -> ORP at index 2 -> "reading" (a is red)
 * - "understanding" (13 chars) -> ORP at index 4 -> "understanding" (r is red)
 */
export function calculateORP(word: string): number {
  const len = word.length;

  if (len <= 1) return 0;
  if (len <= 5) return Math.floor(len / 3);
  if (len <= 9) return Math.floor(len * 0.3);
  if (len <= 13) return Math.floor(len * 0.25) + 1;
  return Math.floor(len * 0.25) + 2;
}

/**
 * Calculate pause multiplier based on word content.
 *
 * Longer pauses after sentence-ending punctuation help comprehension.
 * Slightly longer pauses for clause breaks and long words.
 */
export function calculatePauseMultiplier(word: string): number {
  // Sentence end - longest pause
  if (/[.!?]$/.test(word)) return 1.8;

  // Clause break - medium pause
  if (/[,;:]$/.test(word)) return 1.3;

  // Long word - slightly longer
  if (word.length > 12) return 1.2;

  // Normal
  return 1.0;
}

/**
 * Detect if word ends a sentence.
 */
export function isSentenceEnd(word: string): boolean {
  return /[.!?]$/.test(word);
}
```

**File 3: `/src/services/textProcessor.ts`**

```typescript
import { ProcessedWord } from '../types/playback';
import { calculateORP, calculatePauseMultiplier, isSentenceEnd } from './orp';

/**
 * Tokenize text into words.
 *
 * Preserves punctuation attached to words (e.g., "Hello," stays as one token).
 * Filters out empty strings and whitespace-only tokens.
 */
export function tokenize(text: string): string[] {
  return text
    .split(/\s+/)
    .map(word => word.trim())
    .filter(word => word.length > 0);
}

/**
 * Process a single word into a ProcessedWord with ORP data.
 */
export function processWord(word: string): ProcessedWord {
  return {
    original: word,
    display: word,
    orpIndex: calculateORP(word),
    pauseMultiplier: calculatePauseMultiplier(word),
    sentenceEnd: isSentenceEnd(word),
  };
}

/**
 * Process full text into array of ProcessedWords.
 */
export function processText(text: string): ProcessedWord[] {
  const tokens = tokenize(text);
  return tokens.map(processWord);
}

/**
 * Find indices where sentences start.
 * Used for rewind/skip functionality.
 */
export function findSentenceStarts(words: ProcessedWord[]): number[] {
  const starts: number[] = [0]; // First word is always a sentence start

  for (let i = 0; i < words.length - 1; i++) {
    if (words[i].sentenceEnd) {
      starts.push(i + 1);
    }
  }

  return starts;
}

/**
 * Find the sentence start index before or at the given index.
 */
export function findPreviousSentenceStart(
  sentenceStarts: number[],
  currentIndex: number
): number {
  // Find the largest sentence start that is less than currentIndex
  for (let i = sentenceStarts.length - 1; i >= 0; i--) {
    if (sentenceStarts[i] < currentIndex) {
      return sentenceStarts[i];
    }
  }
  return 0;
}

/**
 * Find the sentence start index after the given index.
 */
export function findNextSentenceStart(
  sentenceStarts: number[],
  currentIndex: number
): number {
  for (const start of sentenceStarts) {
    if (start > currentIndex) {
      return start;
    }
  }
  // If no next sentence, return current position
  return currentIndex;
}
```

**File 4: `/src/hooks/useRSVPEngine.ts`**

```typescript
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ProcessedWord, RSVPEngineControls } from '../types/playback';
import {
  processText,
  findSentenceStarts,
  findPreviousSentenceStart,
  findNextSentenceStart,
} from '../services/textProcessor';

interface UseRSVPEngineOptions {
  initialWPM?: number;
  onComplete?: () => void;
}

export function useRSVPEngine(
  text: string,
  options: UseRSVPEngineOptions = {}
): RSVPEngineControls {
  const { initialWPM = 250, onComplete } = options;

  // Process text into words
  const words = useMemo(() => processText(text), [text]);
  const sentenceStarts = useMemo(() => findSentenceStarts(words), [words]);

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wpm, setWPM] = useState(initialWPM);

  // Ref to track if we should continue playing
  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Calculate base interval from WPM
  // WPM = words per minute, so interval = 60000ms / wpm
  const baseInterval = useMemo(() => 60000 / wpm, [wpm]);

  // Current word
  const currentWord = words[currentIndex] || null;

  // Progress percentage
  const progress = words.length > 0 ? (currentIndex / (words.length - 1)) * 100 : 0;

  // Playback timer
  useEffect(() => {
    if (!isPlaying || !currentWord) return;

    const interval = baseInterval * currentWord.pauseMultiplier;

    const timer = setTimeout(() => {
      if (!isPlayingRef.current) return;

      if (currentIndex < words.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Reached end
        setIsPlaying(false);
        onComplete?.();
      }
    }, interval);

    return () => clearTimeout(timer);
  }, [isPlaying, currentIndex, baseInterval, currentWord, words.length, onComplete]);

  // Controls
  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const toggle = useCallback(() => setIsPlaying(prev => !prev), []);

  const rewindSentence = useCallback(() => {
    const prevStart = findPreviousSentenceStart(sentenceStarts, currentIndex);
    setCurrentIndex(prevStart);
  }, [sentenceStarts, currentIndex]);

  const skipSentence = useCallback(() => {
    const nextStart = findNextSentenceStart(sentenceStarts, currentIndex);
    setCurrentIndex(nextStart);
  }, [sentenceStarts, currentIndex]);

  const jumpToIndex = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, words.length - 1)));
  }, [words.length]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setIsPlaying(false);
  }, []);

  return {
    currentIndex,
    currentWord,
    isPlaying,
    wpm,
    totalWords: words.length,
    progress,
    play,
    pause,
    toggle,
    setWPM,
    rewindSentence,
    skipSentence,
    jumpToIndex,
    reset,
  };
}
```

**File 5: `/src/components/rsvp/ORPWord.tsx`**

```typescript
import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProcessedWord } from '../../types/playback';
import { useTheme } from '../common/ThemeProvider';

interface ORPWordProps {
  word: ProcessedWord;
  fontSize?: number;
}

/**
 * Displays a single word with the ORP letter highlighted.
 *
 * The word is split into three parts:
 * - Before ORP: regular color
 * - ORP letter: highlighted color (orpColor from theme)
 * - After ORP: regular color
 *
 * The component positions the ORP letter at the center of its container.
 */
export function ORPWord({ word, fontSize = 48 }: ORPWordProps) {
  const { theme } = useTheme();

  const { before, orp, after } = useMemo(() => {
    const { display, orpIndex } = word;
    return {
      before: display.slice(0, orpIndex),
      orp: display[orpIndex] || '',
      after: display.slice(orpIndex + 1),
    };
  }, [word]);

  return (
    <View style={styles.container}>
      {/* Before ORP - aligned right */}
      <Text
        style={[
          styles.text,
          styles.beforeText,
          { color: theme.textColor, fontSize },
        ]}
      >
        {before}
      </Text>

      {/* ORP letter - centered, highlighted */}
      <Text
        style={[
          styles.text,
          styles.orpText,
          { color: theme.orpColor, fontSize },
        ]}
      >
        {orp}
      </Text>

      {/* After ORP - aligned left */}
      <Text
        style={[
          styles.text,
          styles.afterText,
          { color: theme.textColor, fontSize },
        ]}
      >
        {after}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'System',
    fontWeight: '400',
  },
  beforeText: {
    textAlign: 'right',
    minWidth: 0,
  },
  orpText: {
    fontWeight: '600',
  },
  afterText: {
    textAlign: 'left',
    minWidth: 0,
  },
});
```

**File 6: `/src/components/rsvp/Crosshairs.tsx`**

```typescript
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../common/ThemeProvider';
import { useSettingsStore } from '../../store/settingsStore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Crosshairs overlay for the RSVP display.
 *
 * Renders horizontal and vertical guide lines that intersect at the center.
 * The ORP letter is positioned at this intersection point.
 */
export function Crosshairs() {
  const { theme } = useTheme();
  const showCrosshairs = useSettingsStore((state) => state.showCrosshairs);
  const opacity = useSettingsStore((state) => state.crosshairOpacity);

  if (!showCrosshairs) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Horizontal line */}
      <View
        style={[
          styles.horizontalLine,
          {
            backgroundColor: theme.crosshairColor,
            opacity,
          },
        ]}
      />

      {/* Vertical line */}
      <View
        style={[
          styles.verticalLine,
          {
            backgroundColor: theme.crosshairColor,
            opacity,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
  },
  verticalLine: {
    position: 'absolute',
    width: 1,
    height: '100%',
  },
});
```

**File 7: `/src/components/rsvp/WPMIndicator.tsx`**

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../common/ThemeProvider';

interface WPMIndicatorProps {
  wpm: number;
}

export function WPMIndicator({ wpm }: WPMIndicatorProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.textColor }]}>
        {wpm} wpm
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  text: {
    fontSize: 16,
    opacity: 0.6,
  },
});
```

**File 8: `/src/components/rsvp/RSVPDisplay.tsx`**

```typescript
import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../common/ThemeProvider';
import { useSettingsStore } from '../../store/settingsStore';
import { ProcessedWord } from '../../types/playback';
import { ORPWord } from './ORPWord';
import { Crosshairs } from './Crosshairs';
import { WPMIndicator } from './WPMIndicator';

interface RSVPDisplayProps {
  word: ProcessedWord | null;
  wpm: number;
  onTap?: () => void;
}

/**
 * Main RSVP display component.
 *
 * Combines:
 * - Background with theme color
 * - Crosshairs overlay
 * - Centered word with ORP highlighting
 * - WPM indicator
 *
 * Tap anywhere to toggle play/pause.
 */
export function RSVPDisplay({ word, wpm, onTap }: RSVPDisplayProps) {
  const { theme } = useTheme();
  const fontSize = useSettingsStore((state) => state.fontSize);

  return (
    <TouchableWithoutFeedback onPress={onTap}>
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Crosshairs />

        <View style={styles.wordContainer}>
          {word && <ORPWord word={word} fontSize={fontSize} />}
        </View>

        <WPMIndicator wpm={wpm} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordContainer: {
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

**File 9: `/src/components/controls/WPMSlider.tsx`**

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme } from '../common/ThemeProvider';

interface WPMSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function WPMSlider({
  value,
  onChange,
  min = 50,
  max = 1500,
}: WPMSliderProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.textColor }]}>
        Speed: {Math.round(value)} WPM
      </Text>
      <Slider
        style={styles.slider}
        value={value}
        onValueChange={onChange}
        minimumValue={min}
        maximumValue={max}
        step={10}
        minimumTrackTintColor={theme.accentColor}
        maximumTrackTintColor={theme.crosshairColor}
        thumbTintColor={theme.accentColor}
      />
      <View style={styles.labels}>
        <Text style={[styles.minMax, { color: theme.textColor }]}>{min}</Text>
        <Text style={[styles.minMax, { color: theme.textColor }]}>{max}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  minMax: {
    fontSize: 12,
    opacity: 0.6,
  },
});
```

**File 10: `/src/components/controls/PlaybackControls.tsx`**

```typescript
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../common/ThemeProvider';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onRewind: () => void;
  onSkip: () => void;
  progress: number;
  currentIndex: number;
  totalWords: number;
}

export function PlaybackControls({
  isPlaying,
  onPlayPause,
  onRewind,
  onSkip,
  progress,
  currentIndex,
  totalWords,
}: PlaybackControlsProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.secondaryBackground }]}>
      {/* Progress bar */}
      <View style={[styles.progressBar, { backgroundColor: theme.crosshairColor }]}>
        <View
          style={[
            styles.progressFill,
            { backgroundColor: theme.accentColor, width: `${progress}%` },
          ]}
        />
      </View>

      {/* Word count */}
      <Text style={[styles.wordCount, { color: theme.textColor }]}>
        {currentIndex + 1} / {totalWords}
      </Text>

      {/* Control buttons */}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.crosshairColor }]}
          onPress={onRewind}
        >
          <Text style={[styles.buttonText, { color: theme.textColor }]}>⏮</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.playButton, { backgroundColor: theme.accentColor }]}
          onPress={onPlayPause}
        >
          <Text style={styles.playButtonText}>
            {isPlaying ? '⏸' : '▶'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.crosshairColor }]}
          onPress={onSkip}
        >
          <Text style={[styles.buttonText, { color: theme.textColor }]}>⏭</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  wordCount: {
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    fontSize: 28,
    color: '#ffffff',
  },
});
```

**File 11: `/src/app/reader/demo.tsx`**

```typescript
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../components/common/ThemeProvider';
import { RSVPDisplay } from '../../components/rsvp/RSVPDisplay';
import { PlaybackControls } from '../../components/controls/PlaybackControls';
import { WPMSlider } from '../../components/controls/WPMSlider';
import { useRSVPEngine } from '../../hooks/useRSVPEngine';

const DEMO_TEXT = `The quick brown fox jumps over the lazy dog. This is a simple demonstration of the RSVP speed reading technique. Each word appears one at a time, with a highlighted letter marking the optimal recognition point. By focusing on this point, your eyes don't need to move across the page. This allows you to read much faster than traditional reading methods. With practice, you can reach speeds of 500, 700, or even 1000 words per minute while maintaining good comprehension. Let's see if you can keep up!`;

export default function DemoReaderScreen() {
  const { theme } = useTheme();
  const [showControls, setShowControls] = useState(true);

  const engine = useRSVPEngine(DEMO_TEXT, {
    initialWPM: 250,
    onComplete: () => {
      console.log('Reading complete!');
    },
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      edges={['top']}
    >
      <View style={styles.displayContainer}>
        <RSVPDisplay
          word={engine.currentWord}
          wpm={engine.wpm}
          onTap={engine.toggle}
        />
      </View>

      <View style={styles.controlsContainer}>
        <WPMSlider
          value={engine.wpm}
          onChange={engine.setWPM}
          min={50}
          max={1500}
        />

        <PlaybackControls
          isPlaying={engine.isPlaying}
          onPlayPause={engine.toggle}
          onRewind={engine.rewindSentence}
          onSkip={engine.skipSentence}
          progress={engine.progress}
          currentIndex={engine.currentIndex}
          totalWords={engine.totalWords}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayContainer: {
    flex: 1,
  },
  controlsContainer: {
    gap: 16,
  },
});
```

**File 12: Install slider dependency**

```bash
npx expo install @react-native-community/slider
```

**File 13: Update `/babel.config.js`**

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

**File 14: Add demo route to navigation - modify `/src/app/_layout.tsx`**

```typescript
import { Stack } from 'expo-router';
import { ThemeProvider } from '../components/common/ThemeProvider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="reader/demo" options={{ presentation: 'fullScreenModal' }} />
      </Stack>
    </ThemeProvider>
  );
}
```

**File 15: Add demo link to Learn tab - modify `/src/app/(tabs)/learn.tsx`**

```typescript
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../components/common/ThemeProvider';

export default function LearnScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>
        Learn to Speed Read
      </Text>

      <TouchableOpacity
        style={[styles.demoButton, { backgroundColor: theme.accentColor }]}
        onPress={() => router.push('/reader/demo')}
      >
        <Text style={styles.demoButtonText}>Try Demo Reader</Text>
      </TouchableOpacity>

      <Text style={[styles.subtitle, { color: theme.textColor, opacity: 0.7 }]}>
        Full curriculum coming in Milestone 4
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  demoButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  demoButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
  },
});
```

#### M2 Validation Checklist

1. Run `npx expo start --clear` (clear cache after babel changes)
2. Open app in iOS simulator
3. Tap Learn tab
4. Tap "Try Demo Reader" button
5. Demo reader screen opens full-screen
6. First word "The" displayed with "h" in red (ORP)
7. Tap screen or play button - words begin flowing
8. Verify WPM indicator shows "250 wpm"
9. Move WPM slider up to 500 - words flow faster
10. Move WPM slider down to 100 - words flow slower
11. Tap pause button - word stops
12. Tap rewind button - jumps back to previous sentence
13. Tap skip button - jumps forward to next sentence
14. Progress bar shows completion percentage
15. Word counter shows current/total (e.g., "45 / 89")
16. Let it play to end - verify it stops at last word

**Validation:** Navigate to demo reader. Tap play; words appear at 250 WPM with ORP letter in red. Pause works. WPM slider adjusts speed in real-time. Rewind goes back one sentence.

---

### Milestone 3: RevenueCat Integration

**Goal:** Integrate RevenueCat for freemium monetization. At the end, the app checks subscription status, shows paywall when free limits exceeded, and processes test purchases.

#### M3 Step-by-Step Commands

```bash
# Working directory: /Users/kaya/Coding/spidrid

# Step 1: Install RevenueCat SDK
npm install react-native-purchases

# Step 2: For development builds (native code), prebuild the project
npx expo prebuild --clean

# Step 3: Install iOS dependencies (if using bare workflow)
cd ios && pod install && cd ..

# Step 4: Create paywall component directories
mkdir -p src/components/paywall

# Step 5: Start with native build for testing purchases
npx expo run:ios
```

#### M3 RevenueCat Dashboard Setup

Before coding, set up RevenueCat:

1. **Create RevenueCat Account:**
   - Go to https://app.revenuecat.com
   - Create new project "Devoro"

2. **Configure iOS Product:**
   - In App Store Connect, create subscription product:
     - Product ID: `spidrid_premium_monthly`
     - Reference Name: "Devoro Premium Monthly"
     - Price: $4.99/month (or your chosen price)
     - Subscription Group: "Devoro Premium"
   - In RevenueCat, add App Store app and connect product

3. **Configure Android Product (if applicable):**
   - In Google Play Console, create subscription
   - Connect to RevenueCat

4. **Get API Keys:**
   - iOS API Key: `appl_xxxxxxxxxxxxxxxxxxxxxxxx`
   - Android API Key: `goog_xxxxxxxxxxxxxxxxxxxxxxxx`
   - Note: Store these in environment variables, not in code

#### M3 File-by-File Breakdown

**File 1: `/src/types/subscription.ts`**

```typescript
export interface SubscriptionState {
  isPremium: boolean;
  isLoading: boolean;
  contentAccessCount: number;

  // Limits
  maxFreeContent: number;  // 5
  maxFreeWPM: number;      // 450
  maxPremiumWPM: number;   // 1500
}

export interface PurchaseOffering {
  identifier: string;
  title: string;
  description: string;
  priceString: string;
  product: any; // RevenueCat product
}

// Free tier limits as constants
export const FREE_TIER_LIMITS = {
  MAX_CONTENT: 5,
  MAX_WPM: 450,
} as const;

export const PREMIUM_LIMITS = {
  MAX_WPM: 1500,
} as const;
```

**File 2: `/src/services/purchases.ts`**

```typescript
import Purchases, {
  PurchasesPackage,
  CustomerInfo,
  LOG_LEVEL,
} from 'react-native-purchases';
import { Platform } from 'react-native';

// RevenueCat API keys - in production, use environment variables
const REVENUECAT_IOS_KEY = 'appl_YOUR_IOS_KEY_HERE';
const REVENUECAT_ANDROID_KEY = 'goog_YOUR_ANDROID_KEY_HERE';

// Entitlement identifier configured in RevenueCat dashboard
const PREMIUM_ENTITLEMENT = 'premium';

/**
 * Initialize RevenueCat SDK.
 * Call this once at app startup.
 */
export async function initializePurchases(): Promise<void> {
  Purchases.setLogLevel(LOG_LEVEL.DEBUG); // Remove in production

  const apiKey = Platform.select({
    ios: REVENUECAT_IOS_KEY,
    android: REVENUECAT_ANDROID_KEY,
  });

  if (!apiKey) {
    console.error('RevenueCat API key not configured for platform');
    return;
  }

  await Purchases.configure({ apiKey });
}

/**
 * Check if user has premium entitlement.
 */
export async function checkPremiumStatus(): Promise<boolean> {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo.entitlements.active[PREMIUM_ENTITLEMENT] !== undefined;
  } catch (error) {
    console.error('Error checking premium status:', error);
    return false;
  }
}

/**
 * Get available subscription packages.
 */
export async function getOfferings(): Promise<PurchasesPackage[]> {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.current?.availablePackages) {
      return offerings.current.availablePackages;
    }
    return [];
  } catch (error) {
    console.error('Error getting offerings:', error);
    return [];
  }
}

/**
 * Purchase a subscription package.
 * Returns true if purchase was successful.
 */
export async function purchasePackage(
  pkg: PurchasesPackage
): Promise<{ success: boolean; customerInfo?: CustomerInfo; error?: string }> {
  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    const isPremium = customerInfo.entitlements.active[PREMIUM_ENTITLEMENT] !== undefined;
    return { success: isPremium, customerInfo };
  } catch (error: any) {
    // User cancelled
    if (error.userCancelled) {
      return { success: false, error: 'cancelled' };
    }
    console.error('Purchase error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Restore previous purchases.
 * Useful for users who reinstall or switch devices.
 */
export async function restorePurchases(): Promise<{
  success: boolean;
  isPremium: boolean;
  error?: string;
}> {
  try {
    const customerInfo = await Purchases.restorePurchases();
    const isPremium = customerInfo.entitlements.active[PREMIUM_ENTITLEMENT] !== undefined;
    return { success: true, isPremium };
  } catch (error: any) {
    console.error('Restore error:', error);
    return { success: false, isPremium: false, error: error.message };
  }
}

/**
 * Listen for customer info updates (subscription changes).
 */
export function addCustomerInfoListener(
  callback: (info: CustomerInfo) => void
): () => void {
  Purchases.addCustomerInfoUpdateListener(callback);
  return () => {
    // RevenueCat SDK doesn't have a direct remove listener method
    // The listener persists for the app lifetime
  };
}
```

**File 3: `/src/store/subscriptionStore.ts`**

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';
import { FREE_TIER_LIMITS, PREMIUM_LIMITS } from '../types/subscription';
import {
  checkPremiumStatus,
  initializePurchases,
  restorePurchases as restorePurchasesService,
} from '../services/purchases';

const storage = new MMKV({ id: 'spidrid-subscription' });

const mmkvStorage = {
  getItem: (name: string) => storage.getString(name) ?? null,
  setItem: (name: string, value: string) => storage.set(name, value),
  removeItem: (name: string) => storage.delete(name),
};

interface SubscriptionStore {
  // State
  isPremium: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  contentAccessCount: number;

  // Computed limits
  maxWPM: number;
  canAccessContent: boolean;

  // Actions
  initialize: () => Promise<void>;
  refreshPremiumStatus: () => Promise<void>;
  setPremium: (isPremium: boolean) => void;
  incrementContentCount: () => void;
  resetContentCount: () => void;
  restorePurchases: () => Promise<{ success: boolean; error?: string }>;

  // Helpers
  checkCanAccessContent: () => boolean;
  getEffectiveMaxWPM: () => number;
}

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isPremium: false,
      isLoading: true,
      isInitialized: false,
      contentAccessCount: 0,

      // Computed (will be recalculated)
      maxWPM: FREE_TIER_LIMITS.MAX_WPM,
      canAccessContent: true,

      // Initialize RevenueCat and check status
      initialize: async () => {
        if (get().isInitialized) return;

        set({ isLoading: true });
        try {
          await initializePurchases();
          const isPremium = await checkPremiumStatus();
          set({
            isPremium,
            isLoading: false,
            isInitialized: true,
            maxWPM: isPremium ? PREMIUM_LIMITS.MAX_WPM : FREE_TIER_LIMITS.MAX_WPM,
            canAccessContent: isPremium || get().contentAccessCount < FREE_TIER_LIMITS.MAX_CONTENT,
          });
        } catch (error) {
          console.error('Failed to initialize purchases:', error);
          set({ isLoading: false, isInitialized: true });
        }
      },

      // Refresh premium status (call after purchase)
      refreshPremiumStatus: async () => {
        try {
          const isPremium = await checkPremiumStatus();
          set({
            isPremium,
            maxWPM: isPremium ? PREMIUM_LIMITS.MAX_WPM : FREE_TIER_LIMITS.MAX_WPM,
            canAccessContent: isPremium || get().contentAccessCount < FREE_TIER_LIMITS.MAX_CONTENT,
          });
        } catch (error) {
          console.error('Failed to refresh premium status:', error);
        }
      },

      // Set premium status (called by listener)
      setPremium: (isPremium) => {
        set({
          isPremium,
          maxWPM: isPremium ? PREMIUM_LIMITS.MAX_WPM : FREE_TIER_LIMITS.MAX_WPM,
          canAccessContent: isPremium || get().contentAccessCount < FREE_TIER_LIMITS.MAX_CONTENT,
        });
      },

      // Increment content access count
      incrementContentCount: () => {
        const { isPremium, contentAccessCount } = get();
        if (isPremium) return; // Premium users don't count

        const newCount = contentAccessCount + 1;
        set({
          contentAccessCount: newCount,
          canAccessContent: newCount < FREE_TIER_LIMITS.MAX_CONTENT,
        });
      },

      // Reset content count (for testing)
      resetContentCount: () => {
        set({
          contentAccessCount: 0,
          canAccessContent: true,
        });
      },

      // Restore purchases
      restorePurchases: async () => {
        set({ isLoading: true });
        const result = await restorePurchasesService();
        if (result.success) {
          set({
            isPremium: result.isPremium,
            isLoading: false,
            maxWPM: result.isPremium ? PREMIUM_LIMITS.MAX_WPM : FREE_TIER_LIMITS.MAX_WPM,
          });
        } else {
          set({ isLoading: false });
        }
        return result;
      },

      // Check if user can access content
      checkCanAccessContent: () => {
        const { isPremium, contentAccessCount } = get();
        return isPremium || contentAccessCount < FREE_TIER_LIMITS.MAX_CONTENT;
      },

      // Get effective max WPM
      getEffectiveMaxWPM: () => {
        return get().isPremium ? PREMIUM_LIMITS.MAX_WPM : FREE_TIER_LIMITS.MAX_WPM;
      },
    }),
    {
      name: 'subscription',
      storage: createJSONStorage(() => mmkvStorage),
      // Only persist contentAccessCount, not premium status (that comes from RevenueCat)
      partialize: (state) => ({
        contentAccessCount: state.contentAccessCount,
      }),
    }
  )
);
```

**File 4: `/src/hooks/useSubscription.ts`**

```typescript
import { useEffect } from 'react';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { addCustomerInfoListener } from '../services/purchases';

/**
 * Hook for subscription management.
 * Initializes RevenueCat and provides subscription state.
 */
export function useSubscription() {
  const store = useSubscriptionStore();

  // Initialize on mount
  useEffect(() => {
    store.initialize();
  }, []);

  // Listen for subscription changes
  useEffect(() => {
    const unsubscribe = addCustomerInfoListener((customerInfo) => {
      const isPremium = customerInfo.entitlements.active['premium'] !== undefined;
      store.setPremium(isPremium);
    });

    return unsubscribe;
  }, []);

  return {
    isPremium: store.isPremium,
    isLoading: store.isLoading,
    maxWPM: store.maxWPM,
    canAccessContent: store.canAccessContent,
    contentAccessCount: store.contentAccessCount,
    remainingFreeContent: Math.max(0, 5 - store.contentAccessCount),
    incrementContentCount: store.incrementContentCount,
    refreshPremiumStatus: store.refreshPremiumStatus,
    restorePurchases: store.restorePurchases,
  };
}
```

**File 5: `/src/components/paywall/Paywall.tsx`**

```typescript
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PurchasesPackage } from 'react-native-purchases';
import { useTheme } from '../common/ThemeProvider';
import { useSubscription } from '../../hooks/useSubscription';
import { getOfferings, purchasePackage } from '../../services/purchases';

interface PaywallProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function Paywall({ onClose, onSuccess }: PaywallProps) {
  const { theme } = useTheme();
  const { restorePurchases, refreshPremiumStatus } = useSubscription();

  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Load offerings
  useEffect(() => {
    async function loadOfferings() {
      const offerings = await getOfferings();
      setPackages(offerings);
      setIsLoading(false);
    }
    loadOfferings();
  }, []);

  // Handle purchase
  const handlePurchase = async (pkg: PurchasesPackage) => {
    setIsPurchasing(true);
    const result = await purchasePackage(pkg);
    setIsPurchasing(false);

    if (result.success) {
      await refreshPremiumStatus();
      onSuccess();
    } else if (result.error && result.error !== 'cancelled') {
      Alert.alert('Purchase Failed', result.error);
    }
  };

  // Handle restore
  const handleRestore = async () => {
    setIsPurchasing(true);
    const result = await restorePurchases();
    setIsPurchasing(false);

    if (result.success && result.isPremium) {
      Alert.alert('Success', 'Your purchase has been restored!');
      onSuccess();
    } else if (result.success && !result.isPremium) {
      Alert.alert('No Purchase Found', 'No previous purchase was found for this account.');
    } else {
      Alert.alert('Error', result.error || 'Failed to restore purchases');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={[styles.closeText, { color: theme.textColor }]}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.textColor }]}>
          Upgrade to Premium
        </Text>

        <Text style={[styles.subtitle, { color: theme.textColor }]}>
          Unlock your full speed reading potential
        </Text>

        {/* Benefits */}
        <View style={styles.benefits}>
          <BenefitItem
            icon="⚡"
            text="Read up to 1500 WPM (vs 450 free)"
            theme={theme}
          />
          <BenefitItem
            icon="📚"
            text="Unlimited articles and uploads"
            theme={theme}
          />
          <BenefitItem
            icon="🏆"
            text="Earn speed reading certificates"
            theme={theme}
          />
        </View>

        {/* Packages */}
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.accentColor} />
        ) : (
          <View style={styles.packages}>
            {packages.map((pkg) => (
              <TouchableOpacity
                key={pkg.identifier}
                style={[
                  styles.packageButton,
                  { backgroundColor: theme.accentColor },
                ]}
                onPress={() => handlePurchase(pkg)}
                disabled={isPurchasing}
              >
                {isPurchasing ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <>
                    <Text style={styles.packageTitle}>
                      {pkg.product.title}
                    </Text>
                    <Text style={styles.packagePrice}>
                      {pkg.product.priceString}/month
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Restore */}
        <TouchableOpacity onPress={handleRestore} disabled={isPurchasing}>
          <Text style={[styles.restoreText, { color: theme.accentColor }]}>
            Restore Purchases
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function BenefitItem({
  icon,
  text,
  theme,
}: {
  icon: string;
  text: string;
  theme: any;
}) {
  return (
    <View style={styles.benefitItem}>
      <Text style={styles.benefitIcon}>{icon}</Text>
      <Text style={[styles.benefitText, { color: theme.textColor }]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 32,
    textAlign: 'center',
  },
  benefits: {
    width: '100%',
    marginBottom: 32,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  benefitText: {
    fontSize: 16,
    flex: 1,
  },
  packages: {
    width: '100%',
    marginBottom: 24,
  },
  packageButton: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  packageTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  packagePrice: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
  },
  restoreText: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
```

**File 6: `/src/components/paywall/PremiumGate.tsx`**

```typescript
import React, { useState, ReactNode } from 'react';
import { Modal } from 'react-native';
import { useSubscription } from '../../hooks/useSubscription';
import { Paywall } from './Paywall';

interface PremiumGateProps {
  children: ReactNode;
  onAccessGranted?: () => void;
}

/**
 * Wrapper component that shows paywall if user has exceeded free tier limits.
 *
 * Usage:
 * <PremiumGate onAccessGranted={() => startReading()}>
 *   <ReadButton />
 * </PremiumGate>
 */
export function PremiumGate({ children, onAccessGranted }: PremiumGateProps) {
  const { canAccessContent, incrementContentCount } = useSubscription();
  const [showPaywall, setShowPaywall] = useState(false);

  const handleAccess = () => {
    if (canAccessContent) {
      incrementContentCount();
      onAccessGranted?.();
    } else {
      setShowPaywall(true);
    }
  };

  return (
    <>
      {React.cloneElement(children as React.ReactElement, {
        onPress: handleAccess,
      })}

      <Modal
        visible={showPaywall}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <Paywall
          onClose={() => setShowPaywall(false)}
          onSuccess={() => {
            setShowPaywall(false);
            onAccessGranted?.();
          }}
        />
      </Modal>
    </>
  );
}
```

**File 7: Modify `/src/components/controls/WPMSlider.tsx`**

Update to respect premium limits:

```typescript
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme } from '../common/ThemeProvider';
import { useSubscription } from '../../hooks/useSubscription';

interface WPMSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export function WPMSlider({
  value,
  onChange,
  min = 50,
}: WPMSliderProps) {
  const { theme } = useTheme();
  const { maxWPM, isPremium } = useSubscription();

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, { color: theme.textColor }]}>
          Speed: {Math.round(value)} WPM
        </Text>
        {!isPremium && (
          <Text style={[styles.limitBadge, { color: theme.orpColor }]}>
            Free: max {maxWPM}
          </Text>
        )}
      </View>
      <Slider
        style={styles.slider}
        value={value}
        onValueChange={onChange}
        minimumValue={min}
        maximumValue={maxWPM}
        step={10}
        minimumTrackTintColor={theme.accentColor}
        maximumTrackTintColor={theme.crosshairColor}
        thumbTintColor={theme.accentColor}
      />
      <View style={styles.labels}>
        <Text style={[styles.minMax, { color: theme.textColor }]}>{min}</Text>
        <Text style={[styles.minMax, { color: theme.textColor }]}>{maxWPM}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  limitBadge: {
    fontSize: 12,
    fontWeight: '500',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  minMax: {
    fontSize: 12,
    opacity: 0.6,
  },
});
```

**File 8: Initialize RevenueCat in `/src/app/_layout.tsx`**

```typescript
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '../components/common/ThemeProvider';
import { useSubscriptionStore } from '../store/subscriptionStore';

export default function RootLayout() {
  const initialize = useSubscriptionStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="reader/demo" options={{ presentation: 'fullScreenModal' }} />
      </Stack>
    </ThemeProvider>
  );
}
```

**File 9: Add subscription info to Settings - modify `/src/app/(tabs)/settings.tsx`**

Add subscription section:

```typescript
// Add to imports
import { useSubscription } from '../../hooks/useSubscription';
import { Paywall } from '../../components/paywall/Paywall';
import { Modal } from 'react-native';

// Inside SettingsScreen component, add:
const { isPremium, remainingFreeContent, restorePurchases } = useSubscription();
const [showPaywall, setShowPaywall] = useState(false);

// Add to JSX after theme section:
<Text style={[styles.sectionTitle, { color: theme.textColor }]}>Subscription</Text>
<View style={[styles.subscriptionCard, { backgroundColor: theme.secondaryBackground }]}>
  <Text style={[styles.subscriptionStatus, { color: theme.textColor }]}>
    {isPremium ? '✓ Premium' : 'Free Tier'}
  </Text>
  {!isPremium && (
    <>
      <Text style={[styles.subscriptionDetail, { color: theme.textColor }]}>
        {remainingFreeContent} free reads remaining
      </Text>
      <TouchableOpacity
        style={[styles.upgradeButton, { backgroundColor: theme.accentColor }]}
        onPress={() => setShowPaywall(true)}
      >
        <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
      </TouchableOpacity>
    </>
  )}
</View>

<Modal visible={showPaywall} animationType="slide" presentationStyle="pageSheet">
  <Paywall
    onClose={() => setShowPaywall(false)}
    onSuccess={() => setShowPaywall(false)}
  />
</Modal>
```

#### M3 Validation Checklist

1. Build and run app on simulator: `npx expo run:ios`
2. Open Settings tab - see "Free Tier" status and "5 free reads remaining"
3. Open demo reader - WPM slider max is 450
4. Try to move slider past 450 - it stops at 450
5. See "Free: max 450" badge on slider
6. Tap "Upgrade to Premium" in Settings
7. Paywall modal appears with benefits and pricing
8. Tap close (X) - paywall dismisses
9. Tap "Restore Purchases" - shows "No Purchase Found" (expected)
10. Complete sandbox purchase flow
11. After purchase, WPM slider now goes to 1500
12. Settings shows "✓ Premium" status
13. Delete and reinstall app
14. Tap "Restore Purchases" - premium status restored

**Validation:**
1. Launch app, verify free tier (WPM slider max 450)
2. Read 5 articles, attempt 6th - paywall appears
3. Complete sandbox purchase - WPM slider extends to 1500, counter bypassed
4. Restore purchases works on fresh install

---

### Milestone 4: Learning Mode MVP

**Goal:** Implement progressive curriculum with sample content and comprehension testing. At the end, users can select topics, read articles with RSVP, take quizzes, and see progress.

#### M4 Step-by-Step Commands

```bash
# Working directory: /Users/kaya/Coding/spidrid

# Step 1: Create curriculum directories
mkdir -p src/data/curriculum/topics
mkdir -p src/data/curriculum/questions
mkdir -p src/components/curriculum
mkdir -p src/app/learn

# Step 2: Create build scripts directory
mkdir -p scripts

# Step 3: Install Claude SDK for question generation (build-time only)
npm install --save-dev @anthropic-ai/sdk

# Step 4: Run question generation script
ANTHROPIC_API_KEY=your_key npx ts-node scripts/generate-questions.ts
```

#### M4 Key Files with Code

**File 1: `/src/types/curriculum.ts`**

```typescript
export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  articleIds: string[];
  unlockAfterTopicId?: string; // null = always unlocked
}

export interface Article {
  id: string;
  topicId: string;
  title: string;
  author: string;
  source: string;
  license: 'public-domain' | 'cc-by' | 'cc-by-sa';
  content: string;
  wordCount: number;
  difficulty: number; // 1-10
}

export interface QuizQuestion {
  id: string;
  articleId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizResult {
  articleId: string;
  score: number; // 0-100
  correctCount: number;
  totalQuestions: number;
  passed: boolean; // score >= 90
}
```

**File 2: `/src/types/progress.ts`**

```typescript
export interface UserProgress {
  completedArticles: Record<string, ArticleProgress>;
  unlockedTopics: string[];
  totalWordsRead: number;
  currentStreak: number;
  lastReadDate: string | null;
  certificates: CertificateRecord[];
}

export interface ArticleProgress {
  articleId: string;
  completedAt: string;
  quizScore: number;
  wpmUsed: number;
}

export interface CertificateRecord {
  id: string;
  type: '900wpm' | '1500wpm';
  earnedAt: string;
  wpm: number;
  comprehension: number;
}

export const INITIAL_PROGRESS: UserProgress = {
  completedArticles: {},
  unlockedTopics: ['science'], // First topic always unlocked
  totalWordsRead: 0,
  currentStreak: 0,
  lastReadDate: null,
  certificates: [],
};
```

**File 3: `/src/store/progressStore.ts`**

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';
import { UserProgress, ArticleProgress, INITIAL_PROGRESS } from '../types/progress';
import { curriculum } from '../data/curriculum';

const storage = new MMKV({ id: 'spidrid-progress' });
const mmkvStorage = {
  getItem: (name: string) => storage.getString(name) ?? null,
  setItem: (name: string, value: string) => storage.set(name, value),
  removeItem: (name: string) => storage.delete(name),
};

interface ProgressStore extends UserProgress {
  completeArticle: (articleId: string, quizScore: number, wpm: number, wordCount: number) => void;
  isArticleCompleted: (articleId: string) => boolean;
  isTopicUnlocked: (topicId: string) => boolean;
  getTopicProgress: (topicId: string) => { completed: number; total: number };
  checkAndUnlockNextTopic: (currentTopicId: string) => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_PROGRESS,

      completeArticle: (articleId, quizScore, wpm, wordCount) => {
        const progress: ArticleProgress = {
          articleId,
          completedAt: new Date().toISOString(),
          quizScore,
          wpmUsed: wpm,
        };

        set((state) => ({
          completedArticles: {
            ...state.completedArticles,
            [articleId]: progress,
          },
          totalWordsRead: state.totalWordsRead + wordCount,
        }));

        // Check if this unlocks next topic
        const article = curriculum.articles[articleId];
        if (article && quizScore >= 90) {
          get().checkAndUnlockNextTopic(article.topicId);
        }
      },

      isArticleCompleted: (articleId) => {
        return !!get().completedArticles[articleId];
      },

      isTopicUnlocked: (topicId) => {
        return get().unlockedTopics.includes(topicId);
      },

      getTopicProgress: (topicId) => {
        const topic = curriculum.topics[topicId];
        if (!topic) return { completed: 0, total: 0 };

        const completed = topic.articleIds.filter(
          (id) => get().completedArticles[id]?.quizScore >= 90
        ).length;

        return { completed, total: topic.articleIds.length };
      },

      checkAndUnlockNextTopic: (currentTopicId) => {
        const { completed, total } = get().getTopicProgress(currentTopicId);

        // Unlock next topic if current is 100% complete
        if (completed >= total) {
          const topicOrder = Object.keys(curriculum.topics);
          const currentIndex = topicOrder.indexOf(currentTopicId);
          const nextTopicId = topicOrder[currentIndex + 1];

          if (nextTopicId && !get().unlockedTopics.includes(nextTopicId)) {
            set((state) => ({
              unlockedTopics: [...state.unlockedTopics, nextTopicId],
            }));
          }
        }
      },
    }),
    {
      name: 'progress',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
```

**File 4: `/src/data/curriculum/index.ts`** (manifest)

```typescript
import { Topic, Article, QuizQuestion } from '../../types/curriculum';

// Import topic data
import scienceArticles from './topics/science.json';
import literatureArticles from './topics/literature.json';
// ... other topics

export const curriculum = {
  topics: {
    science: {
      id: 'science',
      name: 'Science',
      description: 'Explore scientific discoveries and natural phenomena',
      icon: '🔬',
      difficulty: 'beginner',
      articleIds: ['sci-001', 'sci-002', 'sci-003'],
      unlockAfterTopicId: null,
    },
    literature: {
      id: 'literature',
      name: 'Literature',
      description: 'Classic works and literary analysis',
      icon: '📚',
      difficulty: 'beginner',
      articleIds: ['lit-001', 'lit-002', 'lit-003'],
      unlockAfterTopicId: 'science',
    },
    // ... 5 more topics
  } as Record<string, Topic>,

  articles: {
    ...scienceArticles,
    ...literatureArticles,
    // ... other articles
  } as Record<string, Article>,

  questions: {} as Record<string, QuizQuestion[]>, // Loaded separately
};

export const topicOrder = ['science', 'literature', 'history', 'philosophy', 'technology', 'nature', 'biography'];
```

**File 5: Sample article `/src/data/curriculum/topics/science.json`**

```json
{
  "sci-001": {
    "id": "sci-001",
    "topicId": "science",
    "title": "The Discovery of Penicillin",
    "author": "Wikipedia Contributors",
    "source": "Wikipedia",
    "license": "cc-by-sa",
    "content": "In 1928, Scottish scientist Alexander Fleming made one of the most important discoveries in medical history...",
    "wordCount": 450,
    "difficulty": 3
  }
}
```

**File 6: `/scripts/generate-questions.ts`** (build-time script)

```typescript
import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import { curriculum } from '../src/data/curriculum';

const client = new Anthropic();

async function generateQuestionsForArticle(article: any) {
  const response = await client.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Generate 5 multiple-choice comprehension questions for this article.
      Each question should test understanding, not memorization.

      Format as JSON array:
      [{"question": "...", "options": ["A", "B", "C", "D"], "correctIndex": 0, "explanation": "..."}]

      Article: ${article.content}`
    }]
  });

  return JSON.parse(response.content[0].text);
}

async function main() {
  const questions: Record<string, any[]> = {};

  for (const [id, article] of Object.entries(curriculum.articles)) {
    console.log(`Generating questions for ${id}...`);
    questions[id] = await generateQuestionsForArticle(article);
  }

  fs.writeFileSync(
    './src/data/curriculum/questions.json',
    JSON.stringify(questions, null, 2)
  );
}

main();
```

#### M4 Screen Components (summarized)

| File | Purpose |
|------|---------|
| `/src/app/(tabs)/learn.tsx` | Topic grid with unlock status, progress bars |
| `/src/app/learn/[topicId].tsx` | Article list for selected topic |
| `/src/app/learn/reader/[articleId].tsx` | RSVP reader integrated with curriculum |
| `/src/app/learn/quiz/[articleId].tsx` | Quiz screen with 5 MC questions, score display |
| `/src/components/curriculum/TopicCard.tsx` | Card showing topic icon, name, progress, lock state |
| `/src/components/curriculum/QuizQuestion.tsx` | Single question with options, selection state |

#### M4 Validation Checklist

1. Launch app, tap Learn tab
2. See 7 topic cards in grid layout
3. "Science" is unlocked (no lock icon), others show lock
4. Topic cards show progress bars (0/3 articles)
5. Tap Science - see list of 3 articles
6. Tap first article - RSVP reader opens
7. Complete reading (reach end)
8. Quiz modal appears with 5 questions
9. Answer 5/5 correct (90%+) - see "Passed!" message
10. Article marked complete with checkmark
11. Progress bar updates to 1/3
12. Complete all 3 Science articles
13. Literature topic unlocks (lock icon disappears)
14. Close and reopen app - progress persisted

**Validation:**
1. Launch app, tap Learn tab, see 7 topics (first unlocked, others locked)
2. Tap Science topic, see 3-5 articles
3. Read article with RSVP, complete to end
4. Quiz appears with 5 questions
5. Score 90%+ - article marked complete, next unlocked
6. Progress persists after app restart

---

### Milestone 5: Consumption Mode

**Goal:** Allow users to import external content from URLs and PDFs. At the end, users can paste a URL or select a PDF and read it in RSVP format.

#### M5 Step-by-Step Commands

```bash
# Working directory: /Users/kaya/Coding/spidrid

# Step 1: Install content extraction libraries
npm install @mozilla/readability linkedom

# Step 2: Install PDF handling
npx expo install expo-document-picker
npm install react-native-blob-util

# Step 3: Create consumption directories
mkdir -p src/components/consumption
mkdir -p src/app/read
```

#### M5 Key Files with Code

**File 1: `/src/types/consumption.ts`**

```typescript
export interface ImportedContent {
  id: string;
  type: 'url' | 'pdf';
  title: string;
  source: string; // URL or filename
  content: string;
  wordCount: number;
  importedAt: string;
  lastReadPosition?: number;
}

export interface Bookmark {
  contentId: string;
  wordIndex: number;
  createdAt: string;
}
```

**File 2: `/src/services/articleExtractor.ts`**

```typescript
import { Readability } from '@mozilla/readability';
import { parseHTML } from 'linkedom';

export interface ExtractionResult {
  success: boolean;
  title?: string;
  content?: string;
  wordCount?: number;
  error?: string;
}

/**
 * Extract article content from URL using Readability.
 * Falls back to full text extraction if article mode fails.
 */
export async function extractFromURL(url: string): Promise<ExtractionResult> {
  try {
    // Fetch the page
    const response = await fetch(url);
    const html = await response.text();

    // Parse HTML with linkedom (lightweight DOM)
    const { document } = parseHTML(html);

    // Try Readability extraction first
    const reader = new Readability(document);
    const article = reader.parse();

    if (article && article.textContent && article.textContent.length > 100) {
      const content = cleanText(article.textContent);
      return {
        success: true,
        title: article.title || 'Imported Article',
        content,
        wordCount: content.split(/\s+/).length,
      };
    }

    // Fallback: extract all text
    const bodyText = document.body?.textContent || '';
    const content = cleanText(bodyText);

    return {
      success: true,
      title: document.title || 'Imported Content',
      content,
      wordCount: content.split(/\s+/).length,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to extract content',
    };
  }
}

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();
}
```

**File 3: `/src/store/bookmarkStore.ts`**

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';
import { ImportedContent, Bookmark } from '../types/consumption';

const storage = new MMKV({ id: 'spidrid-bookmarks' });
const mmkvStorage = {
  getItem: (name: string) => storage.getString(name) ?? null,
  setItem: (name: string, value: string) => storage.set(name, value),
  removeItem: (name: string) => storage.delete(name),
};

interface BookmarkStore {
  importedContent: ImportedContent[];
  bookmarks: Record<string, Bookmark>;

  addImportedContent: (content: ImportedContent) => void;
  removeImportedContent: (id: string) => void;
  setBookmark: (contentId: string, wordIndex: number) => void;
  getBookmark: (contentId: string) => number;
  clearBookmark: (contentId: string) => void;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      importedContent: [],
      bookmarks: {},

      addImportedContent: (content) => {
        set((state) => ({
          importedContent: [content, ...state.importedContent].slice(0, 50), // Keep last 50
        }));
      },

      removeImportedContent: (id) => {
        set((state) => ({
          importedContent: state.importedContent.filter((c) => c.id !== id),
          bookmarks: Object.fromEntries(
            Object.entries(state.bookmarks).filter(([key]) => key !== id)
          ),
        }));
      },

      setBookmark: (contentId, wordIndex) => {
        set((state) => ({
          bookmarks: {
            ...state.bookmarks,
            [contentId]: {
              contentId,
              wordIndex,
              createdAt: new Date().toISOString(),
            },
          },
        }));
      },

      getBookmark: (contentId) => {
        return get().bookmarks[contentId]?.wordIndex ?? 0;
      },

      clearBookmark: (contentId) => {
        set((state) => {
          const { [contentId]: _, ...rest } = state.bookmarks;
          return { bookmarks: rest };
        });
      },
    }),
    {
      name: 'bookmarks',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
```

#### M5 Screen Components (summarized)

| File | Purpose |
|------|---------|
| `/src/app/(tabs)/read.tsx` | Main import screen with URL/PDF buttons, recent imports list |
| `/src/app/read/url.tsx` | URL input screen with validation, extraction status |
| `/src/app/read/pdf.tsx` | PDF file picker using expo-document-picker |
| `/src/app/read/reader/[id].tsx` | RSVP reader for imported content with bookmark support |
| `/src/components/consumption/URLInput.tsx` | Text input with URL validation |
| `/src/components/consumption/ImportedCard.tsx` | Card showing imported content with resume button |

#### M5 PDF Extraction (summarized)

PDF extraction requires native code and can be tricky. For MVP, we'll use a simpler approach:

```typescript
// /src/services/pdfParser.ts
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

// For MVP: Use a PDF-to-text service or basic extraction
// Full native PDF parsing can be added in a future iteration
export async function extractFromPDF(uri: string): Promise<ExtractionResult> {
  // Implementation depends on chosen library
  // Options: pdf-parse, react-native-pdf-lib, or external API
}
```

#### M5 Validation Checklist

1. Tap Read tab
2. See "Import from URL" and "Import PDF" buttons
3. See "Recent Imports" section (empty initially)
4. Tap "Import from URL"
5. Enter valid article URL (e.g., Wikipedia article)
6. See loading indicator
7. Extraction completes, redirects to reader
8. Read a few words, tap bookmark button
9. Exit reader, tap same article from Recent Imports
10. Reader opens at bookmarked position
11. Tap "Import PDF"
12. File picker opens
13. Select PDF file
14. Text extracted and displayed in reader
15. On 6th import (free tier), paywall appears

**Validation:**
1. Tap Read tab, see URL and PDF options
2. Enter news article URL, tap Import
3. Article text extracted and displayed in RSVP reader
4. Bookmark position, close, reopen - resumes from bookmark
5. Pick PDF file, text extracted and readable
6. 6th import triggers paywall (unless premium)

---

### Milestone 6: Certificates & Polish

**Goal:** Add certificate generation and final polish. At the end, users earn shareable PDF certificates and experience a polished UI with all themes working.

#### M6 Step-by-Step Commands

```bash
# Working directory: /Users/kaya/Coding/spidrid

# Step 1: Install PDF generation and sharing
npm install react-native-pdf-lib
npx expo install expo-sharing expo-haptics

# Step 2: Create certificate directories
mkdir -p src/components/certificates
mkdir -p src/app/certificates
mkdir -p assets/certificates

# Step 3: Create certificate template (design in Figma/Canva, export as PNG)
# Place at: assets/certificates/template-900.png
# Place at: assets/certificates/template-1500.png
```

#### M6 Key Files with Code

**File 1: `/src/services/certificateGenerator.ts`**

```typescript
import { PDFDocument, PDFPage, rgb } from 'react-native-pdf-lib';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export interface CertificateData {
  type: '900wpm' | '1500wpm';
  userName?: string;
  wpm: number;
  comprehension: number;
  date: string;
}

/**
 * Generate a PDF certificate and return the file path.
 */
export async function generateCertificate(data: CertificateData): Promise<string> {
  const { type, userName, wpm, comprehension, date } = data;

  // Create new PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // Letter size

  // Certificate title
  const title = type === '900wpm'
    ? 'Speed Reader Certificate'
    : 'Master Speed Reader Certificate';

  page.drawText(title, {
    x: 150,
    y: 650,
    fontSize: 28,
    color: rgb(0.2, 0.2, 0.2),
  });

  // Achievement text
  page.drawText('This certifies that', {
    x: 220,
    y: 550,
    fontSize: 16,
  });

  if (userName) {
    page.drawText(userName, {
      x: 200,
      y: 500,
      fontSize: 24,
      color: rgb(0.1, 0.1, 0.5),
    });
  }

  page.drawText(`has achieved a reading speed of ${wpm} WPM`, {
    x: 150,
    y: 420,
    fontSize: 18,
  });

  page.drawText(`with ${comprehension}% comprehension`, {
    x: 180,
    y: 380,
    fontSize: 18,
  });

  page.drawText(`Awarded on ${date}`, {
    x: 200,
    y: 300,
    fontSize: 14,
    color: rgb(0.5, 0.5, 0.5),
  });

  page.drawText('Devoro Speed Reading', {
    x: 200,
    y: 100,
    fontSize: 12,
  });

  // Save PDF
  const pdfBytes = await pdfDoc.save();
  const fileName = `spidrid-certificate-${type}-${Date.now()}.pdf`;
  const filePath = `${FileSystem.documentDirectory}${fileName}`;

  await FileSystem.writeAsStringAsync(filePath, pdfBytes, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return filePath;
}

/**
 * Share a certificate PDF via native share sheet.
 */
export async function shareCertificate(filePath: string): Promise<void> {
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(filePath, {
      mimeType: 'application/pdf',
      dialogTitle: 'Share your speed reading certificate',
    });
  }
}
```

**File 2: Certificate check in quiz completion (add to quiz handler)**

```typescript
// In quiz completion handler, check for certificate eligibility
import { useProgressStore } from '../store/progressStore';

function handleQuizComplete(score: number, wpm: number) {
  const { certificates, completedArticles } = useProgressStore.getState();

  // Check for 900 WPM certificate
  if (wpm >= 900 && score >= 95 && !certificates.find(c => c.type === '900wpm')) {
    // Trigger certificate modal
    showCertificateModal({
      type: '900wpm',
      wpm,
      comprehension: score,
    });
  }

  // Check for 1500 WPM certificate
  if (wpm >= 1500 && score >= 95 && !certificates.find(c => c.type === '1500wpm')) {
    showCertificateModal({
      type: '1500wpm',
      wpm,
      comprehension: score,
    });
  }
}
```

**File 3: `/src/components/certificates/CertificateModal.tsx`**

```typescript
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useTheme } from '../common/ThemeProvider';
import { generateCertificate, shareCertificate, CertificateData } from '../../services/certificateGenerator';
import { useProgressStore } from '../../store/progressStore';

interface CertificateModalProps {
  visible: boolean;
  data: Omit<CertificateData, 'userName' | 'date'>;
  onClose: () => void;
}

export function CertificateModal({ visible, data, onClose }: CertificateModalProps) {
  const { theme } = useTheme();
  const [userName, setUserName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);

    const certificateData: CertificateData = {
      ...data,
      userName: userName || undefined,
      date: new Date().toLocaleDateString(),
    };

    const filePath = await generateCertificate(certificateData);

    // Save to progress store
    useProgressStore.getState().addCertificate({
      id: `cert-${Date.now()}`,
      type: data.type,
      earnedAt: new Date().toISOString(),
      wpm: data.wpm,
      comprehension: data.comprehension,
    });

    // Share
    await shareCertificate(filePath);

    setIsGenerating(false);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: theme.backgroundColor }]}>
          <Text style={[styles.title, { color: theme.textColor }]}>
            {data.type === '900wpm' ? '🎉 Congratulations!' : '🏆 Amazing Achievement!'}
          </Text>

          <Text style={[styles.achievement, { color: theme.orpColor }]}>
            {data.wpm} WPM with {data.comprehension}% comprehension!
          </Text>

          <Text style={[styles.subtitle, { color: theme.textColor }]}>
            You've earned a {data.type === '900wpm' ? 'Speed Reader' : 'Master Speed Reader'} certificate!
          </Text>

          <TextInput
            style={[styles.input, { color: theme.textColor, borderColor: theme.crosshairColor }]}
            placeholder="Your name (optional)"
            placeholderTextColor={theme.textColor + '80'}
            value={userName}
            onChangeText={setUserName}
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.accentColor }]}
            onPress={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Generate & Share</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={[styles.skipText, { color: theme.textColor }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  achievement: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipText: {
    fontSize: 14,
    opacity: 0.7,
  },
});
```

#### M6 Polish Tasks

| Task | File(s) | Description |
|------|---------|-------------|
| Haptic feedback | All button components | Add `Haptics.impactAsync()` on press |
| Loading states | All async screens | Add ActivityIndicator during loads |
| Error states | URL/PDF extraction | Show error messages with retry |
| Empty states | Learn, Read tabs | Show friendly message when no content |
| Theme consistency | All components | Verify all colors from theme |

#### M6 Validation Checklist

1. Complete an article at 900+ WPM
2. Score 95%+ on quiz
3. Certificate modal appears automatically
4. Enter name (optional), tap "Generate & Share"
5. PDF generates, share sheet opens
6. Certificate appears in Settings > Certificates
7. Repeat at 1500+ WPM for Master certificate
8. Verify all 4 themes work on:
   - Home/Learn screen
   - Article list
   - RSVP reader
   - Quiz screen
   - Settings
   - Paywall
9. Test haptic feedback on buttons (physical device)
10. Test loading states on slow network
11. Test error states with invalid URLs

**Validation:**
1. Read at 900+ WPM with 95%+ quiz score
2. Certificate modal appears with preview
3. Tap Share - native share sheet with PDF
4. Certificate saved to collection screen
5. All themes work correctly across all screens
6. Haptic feedback felt on button presses

---

## CLAUDE.md Template

Create `/CLAUDE.md` at project root in M1, update each milestone:

```markdown
# Devoro - Speed Reading App

## Quick Reference
- Start dev: `npx expo start`
- Run iOS: `npx expo run:ios`
- Run Android: `npx expo run:android`

## Tech Stack
- Expo SDK 52 + Expo Router (file-based navigation)
- Zustand + MMKV (state + persistence)
- RevenueCat (subscriptions)
- TypeScript (strict)

## Project Structure
src/
├── app/          # Screens (Expo Router)
├── components/   # UI components
├── hooks/        # Custom hooks
├── store/        # Zustand stores
├── services/     # Business logic
├── data/         # Static content
└── types/        # TypeScript types

## Conventions
- Functional components only
- Named exports (not default)
- Colors from theme, never hardcoded
- Store pattern: use[Name]Store

## Current Status
- Milestone: [UPDATE EACH MILESTONE]
- Last updated: [DATE]

## Key Decisions
[ADD DECISIONS AS MADE]
```

---

## Concrete Steps

### Milestone 1 Commands

```bash
# Working directory: /Users/kaya/Coding/spidrid

# Initialize Expo project (will scaffold into current dir)
npx create-expo-app@latest . --template expo-template-blank-typescript

# Install navigation dependencies
npx expo install expo-router react-native-screens react-native-safe-area-context

# Install state management and storage
npm install zustand
npx expo install react-native-mmkv

# Start development server
npx expo start

# Press 'i' for iOS simulator or 'a' for Android emulator
```

Expected: App launches showing "Open up App.tsx to start working on your app!"

### Milestone 2 Commands

```bash
# Install animation library
npx expo install react-native-reanimated

# Update babel.config.js to include reanimated plugin
# Run metro bundler with cache clear
npx expo start --clear
```

Expected: Demo reader screen shows flowing words with red ORP letter.

### Milestone 3 Commands

```bash
# Install RevenueCat SDK
npm install react-native-purchases

# For iOS, run pod install (Expo handles this in managed workflow)
npx expo prebuild --clean

# Configure app.json with RevenueCat API keys
# Test with sandbox accounts
```

Expected: Paywall appears when attempting to exceed free limits.

### Milestone 4-6 Commands

```bash
# Install content extraction dependencies
npm install @mozilla/readability linkedom
npm install react-native-blob-util
npm install pdf-parse

# Install PDF generation
npm install react-native-pdf-lib

# Install sharing
npx expo install expo-sharing expo-document-picker expo-haptics

# Run question generation script (requires ANTHROPIC_API_KEY)
ANTHROPIC_API_KEY=your_key npx ts-node scripts/generate-questions.ts
```

## Validation and Acceptance

**Milestone 1 Acceptance:**
- App launches in simulator without crashes
- Three tabs visible: Learn, Read, Settings
- Tapping Settings shows theme picker
- Selecting theme changes background color immediately
- Theme persists after app restart

**Milestone 2 Acceptance:**
- Navigate to demo reader (temporary dev route)
- Text "The quick brown fox jumps over the lazy dog" displays word by word
- Each word has exactly one red letter (the ORP)
- Play/pause button works
- WPM slider changes speed in real-time (verify by timing word transitions)
- Rewind button jumps back approximately one sentence

**Milestone 3 Acceptance:**
- Fresh install shows free tier status
- WPM slider capped at 450 for free users
- After reading 5 items, 6th attempt shows paywall
- Sandbox purchase grants premium status
- Premium status: WPM extends to 1500, no content limit
- Restore purchases works on reinstall

**Milestone 4 Acceptance:**
- Learn tab shows 7 topic cards
- First topic (Science) is unlocked, others locked
- Tapping Science shows article list
- Tapping article opens RSVP reader
- Completing article triggers quiz
- 90%+ score marks article complete, updates progress
- Progress bar reflects completion percentage
- App restart preserves all progress

**Milestone 5 Acceptance:**
- Read tab shows URL and PDF import options
- Entering valid article URL extracts readable content
- Entering non-article URL offers full text fallback
- PDF file picker opens native file browser
- Selected PDF text is extracted and displayed
- Bookmark saves position, reopening resumes correctly
- Free tier limit applies to imported content

**Milestone 6 Acceptance:**
- Achieving 900 WPM + 95% triggers certificate modal
- Certificate shows correct data (WPM, score, date)
- Share button opens native share sheet with PDF
- Certificate appears in certificates collection
- All 4 themes render correctly on all screens
- Haptic feedback present on button interactions

## Idempotence and Recovery

All steps can be repeated safely:
- `create-expo-app` will warn if directory not empty; start fresh with `rm -rf` if needed
- npm installs are idempotent
- MMKV storage can be cleared via app settings or reinstall
- RevenueCat sandbox purchases can be reset in App Store Connect
- Content JSON files are overwritten on regeneration

**Recovery from common failures:**
- Metro bundler crash: `npx expo start --clear`
- iOS build failure: `npx expo prebuild --clean`
- MMKV corruption: Clear app data or reinstall
- RevenueCat errors: Verify API keys, check dashboard logs

## Artifacts and Notes

**Theme Colors (from screenshots):**
```typescript
const themes = {
  dark: {
    background: '#0a0a0a',
    text: '#ffffff',
    orp: '#ff6b6b',      // Coral red
    crosshair: '#333333',
  },
  // ... other themes
};
```

**ORP Positioning:**
The ORP letter must be positioned at the exact horizontal center of the screen. The word is then shifted so this letter aligns with center, meaning shorter words appear slightly right of center, longer words slightly left.

**WPM Timing Formula:**
```
interval_ms = (60000 / wpm) * pause_multiplier

pause_multiplier values:
- Sentence end (. ! ?): 1.8
- Clause break (, ; :): 1.3
- Long word (12+ chars): 1.2
- Normal: 1.0
```

## Interfaces and Dependencies

**Key Dependencies:**
- `expo` ~52.0.0 - Framework
- `expo-router` ~4.0.0 - File-based navigation
- `zustand` ^5.0.0 - State management
- `react-native-mmkv` ^3.0.0 - Fast persistent storage
- `react-native-purchases` ^8.0.0 - RevenueCat SDK
- `react-native-reanimated` ^3.0.0 - Animations
- `@mozilla/readability` ^0.5.0 - Article extraction
- `react-native-pdf-lib` ^0.4.0 - PDF generation

**Key Interfaces:**

In `/src/services/orp.ts`:
```typescript
export function calculateORP(word: string): number;
export function processWord(word: string): ProcessedWord;
export function processText(text: string): ProcessedWord[];
```

In `/src/hooks/useRSVPEngine.ts`:
```typescript
export function useRSVPEngine(words: ProcessedWord[], initialWPM: number): {
  currentIndex: number;
  currentWord: ProcessedWord;
  isPlaying: boolean;
  wpm: number;
  play: () => void;
  pause: () => void;
  setWPM: (wpm: number) => void;
  rewindSentence: () => void;
  skipSentence: () => void;
};
```

In `/src/services/purchases.ts`:
```typescript
export function initializePurchases(): Promise<void>;
export function checkPremiumStatus(): Promise<boolean>;
export function purchasePremium(): Promise<boolean>;
export function restorePurchases(): Promise<boolean>;
```

In `/src/store/subscriptionStore.ts`:
```typescript
interface SubscriptionState {
  isPremium: boolean;
  contentCount: number;
  maxFreeContent: 5;
  maxFreeWPM: 450;
  incrementContentCount: () => void;
  canAccessContent: () => boolean;
  canUseWPM: (wpm: number) => boolean;
}
```

---

## CLAUDE.md Updates Per Milestone

Each milestone must update `/CLAUDE.md` with:
1. New file patterns and their purposes
2. Key commands added
3. Architecture decisions made
4. Testing conventions used

The CLAUDE.md file serves as living documentation for future Claude sessions working on this project.
