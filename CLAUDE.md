# Spidrid - Speed Reading App

## Project Overview
React Native (Expo) RSVP speed reading app with freemium monetization.

## Tech Stack
- Framework: Expo SDK 54 with Expo Router
- State: Zustand with AsyncStorage persistence (MMKV for production builds)
- Language: TypeScript (strict mode)

## Directory Structure
- src/app/ - Expo Router screens (file-based routing)
- src/components/ - Reusable React components
- src/hooks/ - Custom React hooks
- src/store/ - Zustand stores
- src/services/ - Business logic (ORP, text processing, content extraction)
- src/data/ - Static data and curriculum content
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
- NEVER use --legacy-peer-deps or --force with npm install; fix dependency conflicts properly

## Project Status: ALL MILESTONES COMPLETE
- M1: Foundation - Expo, Router, Themes
- M2: Core RSVP Engine - ORP, playback, controls
- M3: RevenueCat Integration - Subscription, paywall, limits
- M4: Learning Mode - Topics, articles, comprehension
- M5: Consumption Mode - URL/text import, reader
- M6: Certificates - Speed/article achievements

## Key Files
### Navigation & Layout
- src/app/_layout.tsx - Root layout with providers
- src/app/(tabs)/_layout.tsx - Tab navigation (Learn, Read, Profile, Settings)
- src/app/(tabs)/learn.tsx - Topics grid with progress
- src/app/(tabs)/read.tsx - Import content UI
- src/app/(tabs)/profile.tsx - Stats and certificates
- src/app/(tabs)/settings.tsx - Subscription and themes

### RSVP Engine
- src/services/orp.ts - ORP calculation algorithm
- src/services/textProcessor.ts - Text tokenization
- src/hooks/useRSVPEngine.ts - Playback control hook
- src/components/rsvp/RSVPWord.tsx - Word display with ORP
- src/components/controls/PlaybackControls.tsx - Play/pause, WPM

### Learning Mode
- src/data/curriculum.ts - 7 topics, 21 articles
- src/app/topic/[id].tsx - Article list for topic
- src/app/article/[id].tsx - Reader with quiz

### Consumption Mode
- src/services/contentExtractor.ts - URL/text extraction
- src/store/contentStore.ts - Imported content
- src/app/content/[id].tsx - Content reader

### Subscription
- src/store/subscriptionStore.ts - Premium state
- src/components/paywall/Paywall.tsx - Upgrade modal

### Certificates
- src/store/certificateStore.ts - Award logic
- src/components/certificates/CertificateCard.tsx - Display
- src/components/certificates/NewCertificateModal.tsx - Award popup

## Key Decisions
- Expo Router for file-based navigation
- AsyncStorage for dev, MMKV for production (requires native build)
- No react-native-reanimated in dev (Expo Go incompatible); setTimeout for RSVP timing
- 4 themes: dark (default), midnight, sepia, light
- ORP highlight color: coral red (#ff6b6b in dark theme)
- WPM range: 50-1500 (free tier capped at 450)
- Simulated purchases in Expo Go (real RevenueCat for production)

## ExecPlan Reference
Full implementation plan: docs/2026-01-06-spidrid-execplan.md
