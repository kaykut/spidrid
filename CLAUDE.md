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
- NEVER use --legacy-peer-deps or --force with npm install; fix dependency conflicts properly

## Design System ("Quiet Velocity") - 8pt Grid
ALWAYS use design tokens - NEVER hardcode colors, spacing, radii, or typography values.

**Files:** src/constants/spacing.ts, src/constants/typography.ts, src/data/themes.ts, src/utils/colorUtils.ts

**Spacing:** `SPACING.{xxs=2,xs=4,sm=8,md=16,lg=24,xl=32,xxl=40,xxxl=48,huge=56,massive=64}`
**Component Spacing:** `COMPONENT_SPACING.{cardPadding=20,screenPadding=16,sectionGap=24,listItemGap=12,inlineGap=8}`
**Radius:** `COMPONENT_RADIUS.{button=12,card=16,modal=20,chip=8,input=12,progressBar=6,node=full}`
**Sizes:** `SIZES.{touchTarget=44,iconSm=16,iconMd=24,iconLg=24,iconXl=32,iconHuge=48}`
**Typography:** `TYPOGRAPHY.{vsNumber,pageTitle,sectionTitle,cardTitle,body,label,caption,metric,button}`
**Colors:** `JOURNEY_COLORS.{accent,success,warning,low,textPrimary,textSecondary}`, `COLOR_OPACITY.{successTint,lowTint}`, `themes.{dark,midnight,sepia,light}`
**Shadows:** `SHADOWS.{sm,md,lg,glow(color)}`

## Project Status: ALL MILESTONES COMPLETE
- M1: Foundation - Expo, Router, Themes
- M2: Core RSVP Engine - ORP, playback, controls
- M3: RevenueCat Integration - Subscription, paywall, limits
- M4: Learning Mode - Topics, articles, comprehension
- M5: Consumption Mode - URL/text import, reader
- M6: Certificates - Speed/article achievements

## Key Files
### Navigation & Layout
- src/app/_layout.tsx - Root layout with providers and modal routes
- src/app/index.tsx - Main ContentListScreen (unified content list with FABs)
- src/app/journey-profile.tsx - Journey stats + profile settings modal
- src/app/add-content.tsx - Tiered add content modal (Practice/Read/Learn)
- src/app/playback.tsx - RSVP playback modal
- src/app/playback-quiz.tsx - Quiz modal after reading

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
- RevenueCat SDK with graceful degradation (defaults to free tier in Expo Go)

## Anti-Patterns
- **NO Expo Go simulation layers**: Never create fake SDK methods (simulatePurchase, etc.) for Expo Go. Use real SDK calls with try/catch graceful degradation instead.

## ExecPlan Reference
Full implementation plan: docs/2026-01-06-spidrid-execplan.md
