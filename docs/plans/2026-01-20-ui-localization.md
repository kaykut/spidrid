# UI Localization for 11 European Languages

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with PLANS.md (located at `/Users/kaya/Coding/devoro/PLANS.md`).


## Purpose / Big Picture

Enable Devoro's user interface to be displayed in 11 European languages, matching the language support already built into the RSVP text processing engine. Currently, the app has language adapters for Czech, Dutch, English, French, German, Italian, Polish, Portuguese, Romanian, Spanish, and Swedish, but all UI text (buttons, labels, screens, messages) is hardcoded in English.

After this change, users will be able to:
1. Select their preferred language in the app settings
2. See all navigation, buttons, labels, error messages, and UI text in their chosen language
3. Have their language preference persist across app sessions
4. Have the app automatically detect their device language on first launch

The work will be verified by switching between languages in the settings screen and observing that all UI elements update accordingly, with special attention to screens like the journey profile, add content modal, playback controls, and quiz interface.


## Progress

- [x] **M1: Install and configure i18n infrastructure** - COMPLETED 2026-01-21
  - Installed i18next, react-i18next, expo-localization packages
  - Created `src/types/locale.ts` with SupportedLocale type and SUPPORTED_LOCALES constant
  - Created `src/store/localeStore.ts` following existing Zustand store patterns with initialize(), setLocale(), persistence
  - Created `src/services/i18n/index.ts` with i18next configuration for all 15 namespaces
  - Created `src/hooks/useLocale.ts` hook for component-level i18n access
  - Created `src/utils/localeUtils.ts` with locale mapping and validation helpers
  - Initialized i18n in `src/app/_layout.tsx` with device locale detection
  - Updated test utilities in `__tests__/integration/helpers/storeTestUtils.ts`
  - Created translation file structure: 15 namespaces × 11 languages (165 total files)
  - Test-Driven Development: 43 passing tests (16 localeStore + 14 i18nService + 13 useLocale)
  - Coverage: 90.9% overall (100% i18n service, 100% useLocale hook, 88% localeStore)
  - Gate checks: ✅ All tests pass, ✅ TypeScript compiles, ✅ Linting passes (0 errors)

- [ ] M2: Discover and catalog all UI strings using automated grep patterns
- [ ] M3: Design translation key architecture and namespace structure
- [ ] M4: Extract all English strings into structured translation files
- [ ] M5: Acquire translations for 10 additional languages (Czech, Dutch, French, German, Italian, Polish, Portuguese, Romanian, Spanish, Swedish)
- [ ] M6: Replace hardcoded strings with translation function calls throughout the app
- [ ] M7: Implement language switcher UI in settings screen
- [ ] M8: Test and validate all screens in all 11 languages


## Surprises & Discoveries

- **M1 TDD Success**: Following strict Test-Driven Development (RED → GREEN → REFACTOR) resulted in 90.9% test coverage with zero implementation drift. Writing 43 tests before implementation caught type mismatches and edge cases early.
- **M1 Locale Detection**: expo-localization.getLocales() can return null for languageCode, requiring null-coalescing operator (??) to convert to undefined before passing to utility functions.
- **M1 Import Order**: ESLint import/order rule auto-fixed import statements - AsyncStorage and expo-localization imports moved before zustand imports per project conventions.


## Decision Log

- **Decision**: Expanded namespace structure from 6 to 15 namespaces
  **Rationale**: Deep codebase exploration revealed extensive static data files (src/data/), certificate template text (src/services/certificateTemplate.ts), and comprehensive auth/sync UI that were not captured in initial plan. The granular namespace structure will make translations more maintainable and allow for better organization of 800-1200+ strings. Key additions: topics.json (15 curriculum topics), interests.json (15 categories), generation.json (AI content UI), auth.json (authentication flows), certificates.json (template text), errors.json (centralized error messages), accessibility.json (comprehensive a11y labels).
  **Date**: 2026-01-21

- **Decision**: Revised total string count estimate from "500-1000" to "800-1200"
  **Rationale**: Comprehensive exploration using Explore agent discovered significant content that was underestimated: 15 topics with descriptions, 15 interests, certificate template with ~15 strings, auth modal with multiple states (~30 strings), extensive form validation messages, accessibility labels for all interactive elements, and premium feature indicators. Updated estimate based on actual catalog: ~555 base strings + ~30 interpolation patterns + ~200 variations.
  **Date**: 2026-01-21

- **Decision**: Added explicit requirement to refactor src/data/ static files and src/services/certificateTemplate.ts
  **Rationale**: Initial plan focused only on component/screen text replacement but missed that curriculum topics, interest labels, and certificate HTML template contain hardcoded English text that must be refactored to use i18n keys. These require structural changes beyond simple string replacement - topics.ts and interests.ts must load translations dynamically, and certificateTemplate.ts must accept translated strings as parameters rather than hardcoding English text.
  **Date**: 2026-01-21

- **Decision**: Created "Comprehensive Content Inventory" section as definitive reference for Milestone 2
  **Rationale**: Rather than requiring implementers to re-discover all strings via grep, providing complete inventory upfront with file paths and line numbers ensures nothing is missed and serves as checklist during translation file creation. Includes all static data, screen text, component text, service text, error messages, dynamic patterns, accessibility labels, form validation, and empty states.
  **Date**: 2026-01-21


## Outcomes & Retrospective

_(To be filled at major milestones and completion)_


## Context and Orientation

**Current State**: Devoro is a React Native speed reading app built with Expo SDK 54 and Expo Router for file-based navigation. The app has sophisticated language support in its RSVP engine through language adapters located in `src/services/language/adapters/`, supporting 11 European languages with language-specific text processing rules (hyphenation, tokenization, optimal recognition point calculation).

However, the UI itself is entirely in English. All user-facing text is hardcoded as string literals across:
- 164 TypeScript files total in the codebase
- ~22 screen components in `src/app/` (Expo Router screens)
- Dozens of reusable components in `src/components/`
- **Static data files in `src/data/`** with curriculum content, topics, interests
- Store files in `src/store/` with UI-facing messages
- **Service files in `src/services/`** including certificate template HTML and error messages
- **Type definitions in `src/types/`** with user-facing labels (tones, portions, durations)

**Key Technologies**:
- **React Native**: The mobile framework
- **Expo**: Development platform and SDK
- **Zustand**: State management with AsyncStorage persistence
- **TypeScript**: Type-safe development

**What We'll Add**:
- **i18next**: Industry-standard internationalization framework for JavaScript
- **react-i18next**: React bindings for i18next (provides hooks and components)
- **expo-localization**: Expo module for detecting device locale and formatting

**Terminology**:
- **i18n**: Abbreviation for "internationalization" (18 letters between i and n)
- **Locale**: A language + region combination (e.g., "en-US", "fr-FR", "de-DE")
- **Translation key**: A string identifier used to look up translated text (e.g., "playback.play")
- **Namespace**: A way to organize translation keys into logical groups (e.g., "common", "playback", "settings")
- **Interpolation**: Inserting dynamic values into translated strings (e.g., "Hello {{name}}")
- **Pluralization**: Handling singular/plural forms that differ by language (e.g., "1 item" vs "2 items")
- **Fallback language**: The language used when a translation is missing (English in our case)


## Plan of Work

### Milestone 1: Infrastructure Setup

Install i18next ecosystem packages and configure the translation system. We will:

1. Install three npm packages:
   - `i18next`: Core translation engine
   - `react-i18next`: React hooks and components for translation
   - `expo-localization`: Expo's locale detection and device language access

2. Create `src/services/i18n/index.ts` to initialize i18next with:
   - Default language: English (en)
   - Supported languages: All 11 adapter languages
   - Fallback language: English
   - Device language detection
   - Integration with AsyncStorage for language persistence

3. Create translation file structure in `src/locales/`:
   ```
   src/locales/
     en/
       common.json           # Shared buttons, navigation, phrases
       topics.json          # 15 topic names + descriptions
       interests.json       # 15 interest labels
       generation.json      # AI generation UI (tones, portions, durations)
       playback.json        # Playback screen, controls, results
       quiz.json            # Quiz interface, results
       settings.json        # Settings, profile, preferences
       content.json         # Content list, filters, empty states
       addContent.json      # Add content modal (Practice/Read/Learn)
       consumption.json     # Content import (URL, text, files)
       auth.json            # Authentication, sign-in, sync
       subscription.json    # Paywall, benefits, limitations
       certificates.json    # Certificate template, achievements
       errors.json          # Error messages (validation, import, network)
       accessibility.json   # Accessibility labels and hints
     cs/
       (same 15-file structure)
     de/
       (same 15-file structure)
     ... (one folder per 11 languages)
   ```

4. Initialize i18n in the app's root layout (`src/app/_layout.tsx`) before any screens render.

5. Create a Zustand store (`src/store/localeStore.ts`) to manage language selection and expose it to the UI.

**Acceptance**: After this milestone, we can import `useTranslation` from `react-i18next` in any component, and the app will successfully initialize with English as the default language. Running `npm run typecheck` will pass.


### Milestone 2: String Discovery & Cataloging

Systematically find all user-facing strings in the codebase. We will:

1. Use grep patterns to identify:
   - Text content in TSX components: `<Text>content</Text>`
   - String literals in props: `placeholder="..."`, `title="..."`, `label="..."`
   - Alert/error messages in services and stores
   - Navigation titles and tab labels
   - Button labels and accessibility labels

2. Create a comprehensive catalog document (`docs/localization-strings.md`) listing:
   - **Static data inventory** (src/data/):
     - 15 topics with names + descriptions (topics.ts)
     - 15 interest category labels (interests.ts)
     - Tone/portion/duration definitions (types/generated.ts)
   - **Screen-by-screen breakdown**:
     - All screens in src/app/ (~22 screens)
     - All modal screens (add-content, playback, playback-quiz, journey-profile)
   - **Component-by-component text inventory**:
     - Filter pills, empty states, cards, buttons
     - Auth modal with all states (sign-in, email verification, password reset)
     - Paywall with benefits and limitations
     - Certificate cards and modal
   - **Service text inventory**:
     - Certificate template HTML (src/services/certificateTemplate.ts)
     - Error messages from content extraction
     - Validation messages from auth
   - **Form inputs**: Placeholders, labels, validation messages
   - **Dynamic text**: Interpolated strings (WPM, counts, progress)
   - **Accessibility**: Labels, hints for all interactive elements
   - **Estimated total: ~800-1200 individual strings** (more than initially estimated)

3. Identify special cases:
   - Strings with dynamic content (interpolation needed)
   - Pluralization requirements
   - Date/time formatting needs
   - Number formatting needs
   - HTML/Markdown content

**Acceptance**: The catalog document exists and contains a complete inventory. We can cross-reference any screen in the app and find all its strings documented. The catalog is organized by namespace (common, playback, learning, etc.).


### Milestone 3: Translation Key Architecture

Design the structure for translation keys and namespaces. We will:

1. Define namespace strategy based on feature areas:
   - `common`: Shared UI (buttons, navigation, common phrases)
   - `topics`: 15 topic names + descriptions (from src/data/curriculum/topics.ts)
   - `interests`: 15 interest category labels (from src/data/interests.ts)
   - `generation`: AI content generation UI (tones, portions, durations, prompts)
   - `playback`: RSVP playback screen, controls, results
   - `quiz`: Quiz interface, questions, results
   - `settings`: Settings, profile, preferences, theme names, font options
   - `content`: Content list, filters, cards, empty states
   - `addContent`: Add content modal (Practice/Read/Learn tiers)
   - `consumption`: Content import (URL, text, files)
   - `auth`: Authentication, sign-in, sync, email verification
   - `subscription`: Paywall, benefits, limitations, upgrade prompts
   - `certificates`: Certificate template text, achievement messages
   - `errors`: Centralized error messages (validation, import, network)
   - `accessibility`: Comprehensive accessibility labels and hints

2. Establish key naming conventions:
   - Use dot notation for hierarchy: `playback.controls.play`
   - Use camelCase for multi-word keys: `playback.controls.adjustSpeed`
   - Keep keys semantic, not positional: `playback.error.audioFailed` (not `playback.error1`)

3. Document interpolation patterns:
   - Use double curly braces: `"Hello {{userName}}"`
   - Define common variables: `{{count}}`, `{{wpm}}`, `{{languageName}}`

4. Document pluralization patterns:
   - Use i18next's pluralization: `"item"`, `"item_one"`, `"item_other"`
   - Language-specific plural rules handled by i18next

5. Create JSON schema/type definitions for translation files to ensure consistency and enable autocomplete.

**Acceptance**: We have a written design document (`docs/translation-architecture.md`) that any contributor can follow to add new translation keys consistently. The document includes 10+ real examples from the codebase showing how different string types should be translated.


### Milestone 4: English Baseline Extraction

Extract all English strings into structured JSON translation files. We will:

1. Create complete `en/*.json` files for all namespaces with every string from the catalog.

2. Each translation file will follow this structure:
   ```json
   {
     "sectionName": {
       "subsection": {
         "key": "English text here",
         "keyWithInterpolation": "Speed: {{wpm}} WPM"
       }
     }
   }
   ```

3. Start replacing hardcoded strings in a single screen (e.g., `src/app/playback.tsx`) with translation calls:
   ```tsx
   // Before
   <Text>Play</Text>

   // After
   import { useTranslation } from 'react-i18next';
   const { t } = useTranslation('playback');
   <Text>{t('controls.play')}</Text>
   ```

4. Verify the screen still works identically with English translations.

**Acceptance**: All `en/*.json` files exist and contain all identified strings. The playback screen is fully translated (still showing English, but sourced from JSON). Running `npm start` and navigating to the playback screen shows the same UI as before. No hardcoded strings remain in `src/app/playback.tsx`.


### Milestone 5: Translation Acquisition

Obtain translations for the 10 additional languages. We will:

1. Choose translation method:
   - Option A: Machine translation via API (Google Translate, DeepL)
   - Option B: Manual translation by native speakers
   - Option C: Hybrid (machine + human review)

2. For each of the 10 languages (cs, de, nl, fr, it, pl, pt, ro, es, sv):
   - Create complete translation files mirroring the English structure
   - Ensure language-specific considerations:
     - Right-to-left support (if needed)
     - Character set support
     - Pluralization rules
     - Formal vs informal address

3. Implement quality checks:
   - Verify all keys present in English also exist in other languages
   - Check for missing translations
   - Validate JSON syntax
   - Test sample strings for obvious errors

**Acceptance**: All 11 languages have complete translation files. A validation script (e.g., `scripts/validate-translations.ts`) confirms all keys are present across all languages. The playback screen can be switched to any language and displays appropriate text (even if we don't read that language, we can see it's different from English).


### Milestone 6: Full Integration

Replace all hardcoded strings throughout the app. We will:

1. Work systematically through each screen in `src/app/`:
   - Add `useTranslation` hook
   - Replace all hardcoded strings with `t()` calls
   - Handle interpolated values
   - Test screen functionality

2. Update all components in `src/components/`:
   - Replace hardcoded strings
   - Ensure props can accept translation keys or raw strings
   - Document which props should be pre-translated

3. Update static data files in `src/data/`:
   - Refactor `src/data/curriculum/topics.ts` to use translation keys
   - Refactor `src/data/interests.ts` to use translation keys
   - Update `src/types/generated.ts` labels to use translation keys
   - Create helper functions to load translated labels dynamically

4. Update stores in `src/store/`:
   - Replace error messages with translation keys
   - Ensure messages are translated at display time, not storage time

5. Update services in `src/services/`:
   - **Refactor `src/services/certificateTemplate.ts`** to accept translated strings as parameters
   - Replace user-facing error messages with translation keys
   - Keep internal/debug messages in English

**Acceptance**: Every screen in the app shows translated text when language is switched. Running `npm run typecheck` passes. All existing tests pass. No hardcoded English strings remain in user-facing code (verified by grep).


### Milestone 7: Language Switcher UI

Add language selection to the settings screen. We will:

1. Update the journey profile screen (`src/app/journey-profile.tsx`) or settings area to include a language picker.

2. Create a language selection component:
   - List all 11 supported languages
   - Show language in its native name (e.g., "Français" not "French")
   - Display current selection
   - Update locale store on selection

3. Integrate with `localeStore`:
   - Persist selection to AsyncStorage
   - Trigger i18next language change
   - Re-render all screens with new language

4. Add language detection on first launch:
   - Read device locale from expo-localization
   - Match to closest supported language
   - Fall back to English if no match

**Acceptance**: Opening settings shows a language picker. Selecting a language immediately updates the entire app UI. Closing and reopening the app preserves the language choice. Setting device language to Spanish (in iOS/Android settings) and launching the app for the first time shows Spanish UI.


### Milestone 8: Testing & Validation

Comprehensively test all languages across all screens. We will:

1. Create a testing checklist covering:
   - All screens in `src/app/`
   - All modals (add content, playback, quiz, paywall)
   - All critical user flows (RSVP playback, quiz, content import)
   - All error states and edge cases

2. For each language:
   - Navigate through all screens
   - Trigger all user flows
   - Verify no missing translations (English fallbacks are acceptable for now)
   - Check for layout issues (text overflow, wrapping)
   - Verify proper text alignment

3. Test language-specific features:
   - Pluralization (e.g., "1 word" vs "5 words")
   - Number formatting (1,000 vs 1.000)
   - Date formatting
   - Long strings in German/Dutch (compound words)
   - Special characters in Czech/Polish/Romanian

4. Performance testing:
   - Ensure language switching is instantaneous
   - Verify no memory leaks from translation reloads
   - Check bundle size impact

**Acceptance**: A test report document (`docs/localization-test-report.md`) confirms all 11 languages work across all screens. Any known issues are documented with workarounds or future improvement notes. The app performs identically in all languages with no crashes or layout breaks.


## Concrete Steps

### Milestone 1 Steps:

1. Navigate to project root:
   ```
   cd /Users/kaya/Coding/devoro-ui-localization
   ```

2. Install i18n packages:
   ```
   npm install i18next react-i18next expo-localization
   ```

3. Create locale directory structure:
   ```
   mkdir -p src/locales/en src/locales/cs src/locales/de src/locales/nl src/locales/fr src/locales/it src/locales/pl src/locales/pt src/locales/ro src/locales/es src/locales/sv
   ```

4. Create placeholder translation files for all namespaces:
   ```
   touch src/locales/en/common.json \
         src/locales/en/topics.json \
         src/locales/en/interests.json \
         src/locales/en/generation.json \
         src/locales/en/playback.json \
         src/locales/en/quiz.json \
         src/locales/en/settings.json \
         src/locales/en/content.json \
         src/locales/en/addContent.json \
         src/locales/en/consumption.json \
         src/locales/en/auth.json \
         src/locales/en/subscription.json \
         src/locales/en/certificates.json \
         src/locales/en/errors.json \
         src/locales/en/accessibility.json
   ```

5. Create `src/services/i18n/index.ts` with i18next configuration.

6. Update `src/app/_layout.tsx` to initialize i18n before rendering.

7. Create `src/store/localeStore.ts` for language state management.

8. Run type check:
   ```
   npm run typecheck
   ```
   Expected: No errors.

9. Start the app:
   ```
   npm start
   ```
   Expected: App launches successfully in English.


### Milestone 2 Steps:

1. Run grep commands to find all text strings:
   ```
   # Find Text component content
   grep -r "<Text" src/ --include="*.tsx" | grep -v "import" > /tmp/text-content.txt

   # Find placeholder attributes
   grep -r 'placeholder=' src/ --include="*.tsx" | grep -v "import" > /tmp/placeholders.txt

   # Find title attributes
   grep -r 'title=' src/ --include="*.tsx" | grep -v "import" > /tmp/titles.txt
   ```

2. Create `docs/localization-strings.md` and organize findings by screen/component.

3. Review each screen manually:
   - Launch app in simulator
   - Navigate to each screen
   - Document all visible text
   - Cross-reference with grep results

4. Review stores and services for error messages:
   ```
   grep -r 'throw new Error' src/services/ src/store/ > /tmp/errors.txt
   grep -r 'Alert.alert' src/ --include="*.tsx" > /tmp/alerts.txt
   ```

Expected output: A comprehensive catalog with 500-1000 strings organized by namespace.


### Milestone 3 Steps:

1. Create `docs/translation-architecture.md` with:
   - Namespace definitions
   - Key naming rules
   - 10+ examples from the catalog
   - Interpolation patterns
   - Pluralization patterns

2. Review with stakeholder (if applicable).

3. Create TypeScript types for translation keys to enable autocomplete:
   - Generate types from JSON structure
   - Update tsconfig to include generated types


### Milestone 4 Steps:

1. Populate `src/locales/en/*.json` with all strings from the catalog.

2. Update `src/app/playback.tsx`:
   - Import `useTranslation` hook
   - Replace all hardcoded strings with `t()` calls
   - Test screen functionality

3. Run app and verify playback screen works identically:
   ```
   npm start
   # Navigate to playback screen
   # Verify all text displays correctly
   ```


### Milestone 5 Steps:

1. Choose translation method (recommend DeepL API for quality).

2. For each language, create translation files:
   ```
   # Example for German
   cp -r src/locales/en/* src/locales/de/
   # Use translation API or service to translate content
   ```

3. Create `scripts/validate-translations.ts`:
   - Load all translation files
   - Compare keys across languages
   - Report missing keys
   - Validate JSON syntax

4. Run validation:
   ```
   npx tsx scripts/validate-translations.ts
   ```
   Expected: Report showing all languages have complete translations.


### Milestone 6 Steps:

1. Create a tracking document for integration progress.

2. For each screen, systematically:
   - Update imports
   - Replace strings
   - Test functionality
   - Mark complete in tracking document

3. Run tests after each screen:
   ```
   npm run test
   npm run typecheck
   ```

4. Final verification:
   ```
   grep -r '"[A-Z][a-z]' src/app/ src/components/ --include="*.tsx" | grep -v "import" | grep -v "//"
   ```
   This should show minimal results (only valid hardcoded strings like IDs, not UI text).


### Milestone 7 Steps:

1. Update `src/app/journey-profile.tsx` to add language picker section.

2. Create `src/components/settings/LanguagePicker.tsx`:
   - List all 11 languages with native names
   - Hook to locale store
   - Trigger i18next.changeLanguage()

3. Update `src/store/localeStore.ts` to persist selection.

4. Test language switching:
   ```
   npm start
   # Open settings
   # Select different language
   # Verify UI updates
   # Close and reopen app
   # Verify language persisted
   ```


### Milestone 8 Steps:

1. Create testing checklist in `docs/localization-test-report.md`.

2. For each of 11 languages:
   - Switch to language in settings
   - Navigate through all screens
   - Document any issues
   - Take screenshots of critical screens

3. Performance testing:
   ```
   # Use React DevTools to profile re-renders
   # Switch languages multiple times
   # Verify no memory leaks
   ```

4. Bundle size check:
   ```
   npx expo export
   # Compare bundle size before/after localization
   # Document impact
   ```


## Validation and Acceptance

After completing all milestones, the following must be true:

1. **Functional Validation**:
   - Open the app and navigate to Settings → Language
   - Select each of the 11 languages in turn
   - Observe that all UI text updates appropriately
   - Navigate through key flows in each language:
     - Playback screen with controls
     - Add content modal (all three tiers)
     - Quiz interface
     - Journey profile
     - Certificate display

2. **Persistence Validation**:
   - Select a non-English language (e.g., French)
   - Close the app completely
   - Reopen the app
   - Verify it opens in French, not English

3. **Device Locale Validation**:
   - Uninstall the app
   - Change device language to German (iOS Settings → General → Language)
   - Install and open the app
   - Verify it launches in German

4. **Completeness Validation**:
   - Run validation script: `npx tsx scripts/validate-translations.ts`
   - Expect: "All languages have complete translations. No missing keys."
   - Run grep check: `grep -r '"[A-Z][a-z]' src/app/ src/components/ --include="*.tsx" | grep -v "import" | grep -v "//"`
   - Expect: Minimal results, no user-facing English strings

5. **Performance Validation**:
   - Switch between languages 10 times in Settings
   - Observe smooth, instantaneous transitions
   - Check memory usage doesn't grow with switches

6. **Test Suite Validation**:
   - Run: `npm run test`
   - Expect: All tests pass
   - Run: `npm run typecheck`
   - Expect: No TypeScript errors


## Idempotence and Recovery

All steps can be safely re-run:

- Installing npm packages multiple times is safe (npm will skip if already installed)
- Creating directories with `mkdir -p` is idempotent
- Translation file creation can be repeated (will overwrite)
- Integration work can be redone (replacing `t()` calls is safe)

**Recovery from errors**:

- If i18next fails to initialize: Check that all translation files are valid JSON (`npx jsonlint src/locales/**/*.json`)
- If translations don't appear: Clear AsyncStorage and restart app
- If language switching doesn't work: Verify locale store is properly connected to i18next
- If app crashes after integration: Use git to bisect which screen broke, test each screen individually

**Rollback**:

All work is in a git worktree (`feature/ui-localization` branch). To rollback:
```
cd /Users/kaya/Coding/devoro
git worktree remove ../devoro-ui-localization
```


## Artifacts and Notes

### Expected Directory Structure After Completion:

```
src/
  locales/
    en/
      common.json           # Shared UI (buttons, navigation, phrases)
      topics.json          # 15 curriculum topics (names + descriptions)
      interests.json       # 15 interest category labels
      generation.json      # AI generation UI (tones, portions, durations)
      playback.json        # Playback screen, controls, results
      quiz.json            # Quiz interface, results
      settings.json        # Settings, profile, preferences
      content.json         # Content list, filters, empty states
      addContent.json      # Add content modal (Practice/Read/Learn)
      consumption.json     # Content import (URL, text, files)
      auth.json            # Authentication, sign-in, sync
      subscription.json    # Paywall, benefits, limitations
      certificates.json    # Certificate template, achievements
      errors.json          # Error messages (validation, import, network)
      accessibility.json   # Accessibility labels and hints
    cs/
      (same 15-file structure)
    de/
      (same 15-file structure)
    nl/
      (same 15-file structure)
    fr/
      (same 15-file structure)
    it/
      (same 15-file structure)
    pl/
      (same 15-file structure)
    pt/
      (same 15-file structure)
    ro/
      (same 15-file structure)
    es/
      (same 15-file structure)
    sv/
      (same 15-file structure)
    ... (11 language folders total, each with 15 JSON files)
  services/
    i18n/
      index.ts             # i18next initialization
      helpers.ts           # Helper functions for loading translated data
    certificateTemplate.ts # Refactored to accept translated strings
  store/
    localeStore.ts         # Language selection state
  data/
    curriculum/
      topics.ts            # Refactored to use i18n keys
    interests.ts           # Refactored to use i18n keys

docs/
  localization-strings.md        # Complete string catalog (generated in M2)
  translation-architecture.md    # Translation key design (M3)
  localization-test-report.md    # Validation report (M8)

scripts/
  validate-translations.ts       # Validation script (checks all keys present)
```


### Example Translation Files

**en/common.json** (Shared UI elements):
```json
{
  "buttons": {
    "done": "Done",
    "cancel": "Cancel",
    "continue": "Continue",
    "getStarted": "Get Started",
    "import": "Import",
    "save": "Save"
  },
  "navigation": {
    "back": "Back",
    "close": "Close"
  },
  "status": {
    "loading": "Loading...",
    "saving": "Saving...",
    "complete": "Complete!"
  }
}
```

**en/topics.json** (15 curriculum topics):
```json
{
  "scienceDiscovery": {
    "name": "Science & Discovery",
    "description": "Breakthrough discoveries that changed our world"
  },
  "healthMedicine": {
    "name": "Health & Medicine",
    "description": "Advances in healthcare and medical breakthroughs"
  },
  "historycivilization": {
    "name": "History & Civilization",
    "description": "Journey through time and human achievements"
  }
  // ... 12 more topics
}
```

**en/generation.json** (AI content generation UI):
```json
{
  "card": {
    "title": "Learn",
    "description": "Generate articles on topics you want to master"
  },
  "input": {
    "placeholder": "What do you want to learn about?",
    "listening": "Listening...",
    "transcribing": "Transcribing..."
  },
  "portions": {
    "label": "Portion",
    "bite": "Bite",
    "snack": "Snack",
    "meal": "Meal",
    "feast": "Feast"
  },
  "tones": {
    "label": "Flavor",
    "fact": "Fact",
    "factDescription": "Clear and educational",
    "story": "Story",
    "storyDescription": "Narrative and engaging",
    "analogy": "Analogy",
    "analogyDescription": "Rich in comparisons"
  },
  "customize": {
    "toggle": "Adjust duration and tone"
  },
  "actions": {
    "generate": "Serve it up"
  }
}
```

**en/playback.json** (Playback screen):
```json
{
  "controls": {
    "play": "Play",
    "pause": "Pause",
    "restart": "Restart",
    "skipBack": "Skip Back",
    "skipForward": "Skip Forward"
  },
  "speed": {
    "label": "Speed",
    "current": "{{wpm}} WPM",
    "currentWithMax": "{{wpm}} WPM (max {{maxWPM}})"
  },
  "progress": {
    "wordCounter": "{{current}} / {{total}}"
  },
  "results": {
    "title": "Complete!",
    "readingSpeed": "Reading Speed",
    "wordsRead": "Words Read",
    "readAgain": "Read Again"
  },
  "empty": {
    "title": "Content Not Found",
    "subtitle": "The requested content could not be loaded."
  }
}
```

**en/auth.json** (Authentication & sync):
```json
{
  "modal": {
    "titleSync": "Sync Across Devices",
    "titleEmailSent": "Email Sent",
    "description": "Sign in to sync your reading progress, certificates, and settings across all your devices."
  },
  "inputs": {
    "emailPlaceholder": "your@email.com",
    "passwordPlaceholder": "Password (min 8 characters)"
  },
  "actions": {
    "signInEmail": "Sign in with email",
    "signInGoogle": "Continue with Google",
    "forgotPassword": "Forgot Password?"
  },
  "confirmation": {
    "title": "Check your email",
    "passwordReset": "We sent a password reset link to {{email}}. Click the link to reset your password.",
    "verification": "We sent a verification link to {{email}}. Click the link to verify your account."
  },
  "validation": {
    "emailRequired": "Please enter your email address",
    "emailInvalid": "Please enter a valid email address",
    "passwordRequired": "Please enter your password",
    "passwordTooShort": "Password must be at least 8 characters long"
  },
  "status": {
    "signedIn": "Signed In",
    "accountVerified": "Account verified",
    "syncReady": "Ready to sync • Data sync coming soon"
  },
  "errors": {
    "accountNotFound": "Account not found. Creating new account...",
    "authFailed": "Authentication failed",
    "resetFailed": "Failed to send reset email"
  }
}
```

**en/certificates.json** (Certificate template):
```json
{
  "template": {
    "appName": "Devoro",
    "header": "Certificate of Achievement",
    "type": "Reading Excellence",
    "presentedTo": "This certificate is proudly presented to",
    "description": "For demonstrating exceptional speed reading proficiency by achieving a reading speed of",
    "signature": "Verified Achievement"
  },
  "details": {
    "dateAchieved": "Date Achieved",
    "certificateId": "Certificate ID"
  }
}
```

**en/errors.json** (Centralized error messages):
```json
{
  "import": {
    "failed": "Import Failed",
    "urlFailed": "Could not extract content from URL",
    "textFailed": "Could not process text",
    "extractFailed": "Could not extract content",
    "documentFailed": "Failed to pick document"
  },
  "subscription": {
    "purchaseFailed": "Purchase failed. Please try again.",
    "noPurchases": "No Purchases",
    "noPurchasesMessage": "No purchases found to restore.",
    "restored": "Restored",
    "restoredMessage": "Your purchases have been restored successfully."
  },
  "generic": {
    "error": "Error"
  }
}
```


### Example Component Integration

**Standard Component Translation:**
```tsx
// Before
export function PlaybackControls() {
  return (
    <View>
      <Text>Play</Text>
      <Text>Speed: {wpm} WPM</Text>
    </View>
  );
}

// After
import { useTranslation } from 'react-i18next';

export function PlaybackControls() {
  const { t } = useTranslation('playback');

  return (
    <View>
      <Text>{t('controls.play')}</Text>
      <Text>{t('speed.current', { wpm })}</Text>
    </View>
  );
}
```

**Static Data Refactoring (src/data/curriculum/topics.ts):**
```tsx
// Before - Hardcoded English
export const TOPICS: Topic[] = [
  {
    id: 'science-discovery',
    name: 'Science & Discovery',
    description: 'Breakthrough discoveries that changed our world',
    // ...
  },
  // ... 14 more topics
];

// After - i18n keys
import i18n from '@/services/i18n';

export const TOPICS: Topic[] = [
  {
    id: 'science-discovery',
    get name() {
      return i18n.t('topics.scienceDiscovery.name', { ns: 'topics' });
    },
    get description() {
      return i18n.t('topics.scienceDiscovery.description', { ns: 'topics' });
    },
    // ...
  },
  // ... 14 more topics
];

// Or better yet, create a helper function
export const getTopics = () => {
  const { t } = i18n;
  return [
    {
      id: 'science-discovery',
      name: t('topics.scienceDiscovery.name', { ns: 'topics' }),
      description: t('topics.scienceDiscovery.description', { ns: 'topics' }),
      // ...
    },
    // ... 14 more topics
  ];
};
```

**Certificate Template Refactoring (src/services/certificateTemplate.ts):**
```tsx
// Before - Hardcoded HTML
export function generateCertificateHTML(userName: string, wpm: number) {
  return `
    <h1>Certificate of Achievement</h1>
    <p>This certificate is proudly presented to</p>
    <h2>${userName}</h2>
    <p>For demonstrating exceptional speed reading proficiency...</p>
  `;
}

// After - Accept translated strings as parameters
import { TFunction } from 'i18next';

export function generateCertificateHTML(
  userName: string,
  wpm: number,
  t: TFunction
) {
  return `
    <h1>${t('certificates.template.header')}</h1>
    <p>${t('certificates.template.presentedTo')}</p>
    <h2>${userName}</h2>
    <p>${t('certificates.template.description')}</p>
  `;
}

// Usage in component
import { useTranslation } from 'react-i18next';
import { generateCertificateHTML } from '@/services/certificateTemplate';

function CertificateComponent() {
  const { t } = useTranslation('certificates');
  const html = generateCertificateHTML(userName, wpm, t);
  // ...
}
```


## Interfaces and Dependencies

### Dependencies to Install:

```json
{
  "dependencies": {
    "i18next": "^23.7.0",
    "react-i18next": "^14.0.0",
    "expo-localization": "~15.0.3"
  }
}
```

### Key Interfaces:

**src/services/i18n/index.ts**:
```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import all translation files
import commonEn from '@/locales/en/common.json';
import playbackEn from '@/locales/en/playback.json';
// ... import all namespaces for all languages

const resources = {
  en: {
    common: commonEn,
    playback: playbackEn,
    // ...
  },
  cs: {
    // ...
  },
  // ... all 11 languages
};

export const initializeI18n = async () => {
  const savedLanguage = await AsyncStorage.getItem('user-language');
  const deviceLanguage = Localization.locale.split('-')[0]; // e.g., 'en-US' -> 'en'

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: savedLanguage || deviceLanguage || 'en',
      fallbackLng: 'en',
      supportedLngs: ['en', 'cs', 'de', 'nl', 'fr', 'it', 'pl', 'pt', 'ro', 'es', 'sv'],
      interpolation: {
        escapeValue: false, // React already escapes
      },
      react: {
        useSuspense: false, // Avoid suspense issues in React Native
      },
    });
};

export default i18n;
```

**src/store/localeStore.ts**:
```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@/services/i18n';

interface LocaleState {
  currentLanguage: string;
  availableLanguages: Array<{ code: string; name: string; nativeName: string }>;
  changeLanguage: (languageCode: string) => Promise<void>;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      currentLanguage: 'en',
      availableLanguages: [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'cs', name: 'Czech', nativeName: 'Čeština' },
        { code: 'de', name: 'German', nativeName: 'Deutsch' },
        { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
        { code: 'fr', name: 'French', nativeName: 'Français' },
        { code: 'it', name: 'Italian', nativeName: 'Italiano' },
        { code: 'pl', name: 'Polish', nativeName: 'Polski' },
        { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
        { code: 'ro', name: 'Romanian', nativeName: 'Română' },
        { code: 'es', name: 'Spanish', nativeName: 'Español' },
        { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
      ],
      changeLanguage: async (languageCode: string) => {
        await i18n.changeLanguage(languageCode);
        await AsyncStorage.setItem('user-language', languageCode);
        set({ currentLanguage: languageCode });
      },
    }),
    {
      name: 'locale-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

**scripts/validate-translations.ts**:
```typescript
import * as fs from 'fs';
import * as path from 'path';

const LOCALES_DIR = path.join(__dirname, '../src/locales');
const LANGUAGES = ['en', 'cs', 'de', 'nl', 'fr', 'it', 'pl', 'pt', 'ro', 'es', 'sv'];
const NAMESPACES = [
  'common',
  'topics',
  'interests',
  'generation',
  'playback',
  'quiz',
  'settings',
  'content',
  'addContent',
  'consumption',
  'auth',
  'subscription',
  'certificates',
  'errors',
  'accessibility'
];

function getAllKeys(obj: any, prefix = ''): string[] {
  let keys: string[] = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

function validateTranslations() {
  const results: any = {};

  // Get all keys from English (baseline)
  const englishKeys: Record<string, string[]> = {};
  for (const namespace of NAMESPACES) {
    const enPath = path.join(LOCALES_DIR, 'en', `${namespace}.json`);
    const enContent = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
    englishKeys[namespace] = getAllKeys(enContent);
  }

  // Check each language
  for (const lang of LANGUAGES) {
    if (lang === 'en') continue; // Skip baseline

    results[lang] = { missing: [], extra: [] };

    for (const namespace of NAMESPACES) {
      const langPath = path.join(LOCALES_DIR, lang, `${namespace}.json`);
      const langContent = JSON.parse(fs.readFileSync(langPath, 'utf-8'));
      const langKeys = getAllKeys(langContent);

      // Find missing keys
      const missing = englishKeys[namespace].filter(k => !langKeys.includes(k));
      if (missing.length > 0) {
        results[lang].missing.push({ namespace, keys: missing });
      }

      // Find extra keys (not in English)
      const extra = langKeys.filter(k => !englishKeys[namespace].includes(k));
      if (extra.length > 0) {
        results[lang].extra.push({ namespace, keys: extra });
      }
    }
  }

  // Report
  let hasIssues = false;
  for (const lang of LANGUAGES) {
    if (lang === 'en') continue;

    if (results[lang].missing.length > 0) {
      console.error(`❌ ${lang}: Missing keys:`, results[lang].missing);
      hasIssues = true;
    }
    if (results[lang].extra.length > 0) {
      console.warn(`⚠️  ${lang}: Extra keys:`, results[lang].extra);
    }
  }

  if (!hasIssues) {
    console.log('✅ All languages have complete translations. No missing keys.');
  }

  process.exit(hasIssues ? 1 : 0);
}

validateTranslations();
```


## Comprehensive Content Inventory (Reference for M2)

This section catalogs ALL user-facing text discovered in the codebase. Use this as the definitive reference when creating translation files in Milestone 4.

### Static Data Files (src/data/)

**File: `src/data/interests.ts` (Lines 18-139)**
- 15 Interest category labels with emojis:
  - "Science & Discovery 🔬"
  - "Health & Medicine 🏥"
  - "History & Civilization 🏛️"
  - "Technology & Internet 💻"
  - "Nature & Wildlife 🦁"
  - "Climate & Environment 🌍"
  - "Space & Cosmos 🚀"
  - "Psychology & Mind 🧠"
  - "Self-Improvement 📈"
  - "Business & Careers 💼"
  - "Finance & Investing 💰"
  - "Trivia & Fun Facts 🎲"
  - "World & Travel ✈️"
  - "Arts & Culture 🎨"
  - "Lifestyle & Wellness 🧘"

**File: `src/data/curriculum/topics.ts` (Lines 6-157)**
- 15 Topic names + descriptions (one per interest):
  - Example: "Science & Discovery" → "Breakthrough discoveries that changed our world"
  - Example: "Health & Medicine" → "Advances in healthcare and medical breakthroughs"
  - (All 15 follow this pattern: name + description)

**File: `src/types/generated.ts` (Lines 24-66)**
- Article tone labels (3):
  - "Fact" → "Clear and educational"
  - "Story" → "Narrative and engaging"
  - "Analogy" → "Rich in comparisons"
- Duration labels (5):
  - "1 min", "2 min", "3 min", "5 min", "10 min"
- Portion options (4):
  - "Bite", "Snack", "Meal", "Feast"

### Screen Text (src/app/)

**add-content.tsx (Lines 274, 205-208)**
- Header: "New Content"
- Practice card: "Practice" + "Choose from pre-generated content to practice speed reading"

**journey-profile.tsx (Lines 206, 225, 244, 326, 375, 451, 247, 494)**
- Page title: "Journey & Settings"
- Section titles: "Theme", "Your Info", "Subscription", "Sync Across Devices", "Reading"
- Input label: "Name (for certificates)"
- Preview label: "Preview"
- Font options: "System", "Serif", "Round", "Condensed"
- Theme names: "dark", "midnight", "sepia", "light"
- Subscription status: "Premium" / "Free"
- Buttons: "Upgrade to Premium", "Restore Purchases", "Sign In to Sync", "Sign Out"
- Sync status: "Signed In", "Ready to sync • Data sync coming soon"
- Setting toggles:
  - "Paragraph Pause" + "Brief pause between paragraphs"
  - "Move to History" + "Completed items move to History"

**history.tsx (Lines 154, 165-169)**
- Page title: "History"
- Empty state: "No completed items yet" + "Items you finish reading will appear here"

**playback.tsx (Lines 261-262, 267-281)**
- Results title: "Complete!"
- Result labels: "Reading Speed", "Words Read"
- Buttons: "Done", "Read Again"
- Empty state: "Content Not Found" + "The requested content could not be loaded."

**playback-quiz.tsx (Lines 173, 206, 213-246, 270)**
- Header: "Quiz" / "Results" / "Comprehension Quiz"
- Empty state: "No Quiz Available" + "This content does not have quiz questions."
- Results labels: "Complete!", "Comprehension", "Correct Answers", "Reading Speed"
- Buttons: "Done", "Retake Quiz"
- Progress: "Question {{current}} of {{total}}"

### Component Text (src/components/)

**addContent/ExpandableReadCard.tsx (Lines 165-168, 217-237, 250)**
- Card title: "Read"
- Description: "Speed read your own articles or books from PDFs, EPUBs, or links"
- READ_OPTIONS labels: "A webpage", "Plain Text", "Epub & PDF"
- Input placeholders:
  - "Enter URL (e.g., https://example.com/article)"
  - "Paste your text here..."
- Button: "Import" / "Save & Read"

**addContent/ExpandableLearnCard.tsx (Lines 288-291, 305, 342, 357, 365, 428, 504)**
- Card title: "Learn"
- Description: "Generate articles on topics you want to master"
- Input placeholder: "What do you want to learn about?"
- Section labels: "Portion", "Flavor"
- Toggle: "Adjust duration and tone"
- Recording status: "Listening...", "Transcribing..."
- Button: "Serve it up"
- Portion labels: "Bite", "Snack", "Meal", "Feast"

**contentList/EmptyState.tsx (Lines 42-46, 59-61)**
- Title: "No content yet"
- Subtitle: "Add articles, books, or generate learning content to get started with speed reading."
- Button: "Get Started"

**contentList/FilterPills.tsx (Lines 22-28)**
- Filter labels: "All", "Books", "Articles", "Learning", "Training"

**paywall/Paywall.tsx (Lines 92-127, 146, 160, 66-70)**
- Title: "Upgrade to Premium"
- Benefit items (4):
  - "Read up to {{maxWPM}} WPM"
  - "Unlimited AI article generation"
  - "All topics & curriculum"
  - "Earn speed certificates"
- Buttons: "Subscribe Now", "Restore Purchases"
- Limit messages:
  - "Free tier is limited to {{freeWPM}} WPM"
  - "Free tier is limited to 3 AI-generated articles per day"
- Price labels: "Loading...", "Not available"

**auth/AuthModal.tsx (Lines 220, 241, 209, 197, 272, 153-176, 306-307)**
- Input placeholders:
  - "your@email.com"
  - "Password (min 8 characters)"
- Labels: "Sign in with email", "Continue with Google", "Forgot Password?"
- Confirmation title: "Check your email"
- Confirmation messages:
  - "We sent a password reset link to {{email}}..."
  - "We sent a verification link to {{email}}..."
- Header titles: "Sync Across Devices" / "Email Sent"
- Description: "Sign in to sync your reading progress, certificates, and settings across all your devices."
- Status labels: "Signed In", "Account verified"

**certifications/StatsSummary.tsx (Lines 41-57)**
- Stat labels: "Devoured", "Words", "Retention", "Best WPM"

**controls/PlaybackControls.tsx (Lines 77-96)**
- Word counter: "{{current}} / {{total}}"
- Speed label: "{{wpm}} WPM" (with optional "(max {{maxWPM}})")

### Service Text (src/services/)

**certificateTemplate.ts (Lines 256-291)**
- App name: "Devoro"
- Header: "Certificate of Achievement"
- Tier-specific names: (from JOURNEY_CERT_DEFINITIONS)
- Type: "Reading Excellence"
- Presented text: "This certificate is proudly presented to"
- Description: "For demonstrating exceptional speed reading proficiency by achieving a reading speed of"
- Detail labels: "Date Achieved", "Certificate ID"
- Signature: "Verified Achievement"

### Error Messages (Alert.alert calls)

**ExpandableReadCard.tsx (Lines 114-148)**
- "Import Failed" + "Could not extract content from URL"
- "Import Failed" + "Could not process text"
- "Import Failed" + "Could not extract content"
- "Error" + "Failed to pick document"

**journey-profile.tsx (Lines 141-146)**
- "Restored" + "Your purchases have been restored successfully."
- "Error" + (dynamic error message)
- "No Purchases" + "No purchases found to restore."

**AuthModal.tsx (Lines 66-84, 98, 108, 133)**
- "Please enter your email address"
- "Please enter a valid email address"
- "Please enter your password"
- "Password must be at least 8 characters long"
- "Account not found. Creating new account..."
- "Authentication failed"
- "Failed to send reset email"

**Paywall.tsx (Lines 49, 59-61)**
- "Purchase failed. Please try again."
- (Dynamic error message display)

### Dynamic/Interpolated Text Patterns

- Question progress: "Question {{currentIndex + 1}} of {{totalQuestions}}"
- Word counter: "{{currentIndex + 1}} / {{totalWords}}"
- Comprehension: "{{averageComprehension}}%"
- Best speed: "{{bestWPM}} WPM"
- Reading speed: "{{readingWPM}} WPM"
- Quiz results: "{{correctAnswers}} / {{totalQuestions}}"
- Final score: "{{finalScore}}%"
- WPM with max: "{{wpm}} WPM (max {{maxWPM}})"
- Email confirmation: "We sent a link to {{email}}..."

### Accessibility Labels (accessibilityLabel, accessibilityHint)

**ExpandableLearnCard.tsx (Lines 389-391, 470-472)**
- Portion accessibility:
  - Label: "{{portion}} portion (Premium feature)" / "{{portion}} portion"
  - Hint: "Upgrade to premium to unlock" / "Select {{portion}} portion"
- Flavor accessibility: (Similar pattern for tone selection)

### Form Validation Messages

- Email validation: "Please enter your email address", "Please enter a valid email address"
- Password validation: "Please enter your password", "Password must be at least 8 characters long"
- URL validation: (Implicit in import failed messages)
- Content validation: "Could not extract content from URL"

### Empty States Summary

1. Content list: "No content yet" + subtitle + "Get Started" button
2. History: "No completed items yet" + subtitle
3. Playback: "Content Not Found" + subtitle
4. Quiz: "No Quiz Available" + subtitle

### Premium Feature Indicators

- Lock icon labels (implicit)
- "Premium feature" badges
- "Upgrade to premium to unlock" hints
- Free tier limit messages (WPM cap, generation limit)

---

## Total String Count Estimate

Based on comprehensive exploration:
- **Static data**: ~50 strings (topics, interests, tones, portions, durations)
- **Screens & navigation**: ~80 strings (titles, headers, labels)
- **Components**: ~150 strings (buttons, cards, empty states, filters)
- **Forms & inputs**: ~40 strings (placeholders, labels, validation)
- **Auth & sync**: ~30 strings (sign-in flow, verification, sync status)
- **Paywall & subscription**: ~20 strings (benefits, limits, buttons)
- **Certificates**: ~15 strings (template text, achievement messages)
- **Error messages**: ~40 strings (alerts, validations, import errors)
- **Accessibility**: ~60 strings (labels, hints for interactive elements)
- **Dynamic/interpolated**: ~30 unique patterns
- **Settings & preferences**: ~40 strings (options, toggles, descriptions)

**Total: ~555 base strings + ~30 interpolation patterns + ~200 variations = ~800-1000 translatable strings**

This inventory confirms the revised estimate of 800-1200 strings is accurate. Every string cataloged here must appear in the final translation files.

---

**End of ExecPlan**
