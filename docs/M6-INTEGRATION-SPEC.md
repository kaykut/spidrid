# M6: Complete Integration Specification

**Goal:** Replace ALL hardcoded English strings with i18n t() calls. Missing even ONE string creates terrible user experience.

**Created:** 2026-01-21
**Status:** Ready for execution (awaiting M5 translations)

---

## ⚠️ CRITICAL: Zero Tolerance Policy

**Every user-visible text MUST be localized.** This includes:
- Button labels
- Page titles
- Section headers
- Descriptions
- Placeholders
- Error messages
- Alert dialogs
- Empty states
- Accessibility labels
- Status text
- Conditional text
- Interpolated text

**If a user sees ANY English text when using a non-English locale, M6 has failed.**

---

## Execution Workflow

### BEFORE STARTING
1. [ ] Confirm M5 translations delivered (150 JSON files)
2. [ ] Run `npm run typecheck` - must pass
3. [ ] Run `npm test` - must pass
4. [ ] Create git commit checkpoint before M6 changes

### DURING EXECUTION
1. Process files in order (screens → components → data → services)
2. After EACH file: Run `npm run typecheck`
3. After EACH section: Run `npm test`
4. Use verification grep commands to detect remaining strings

### AFTER COMPLETION
1. Run ALL detection commands (Section 7)
2. Visual walkthrough in iOS simulator - EVERY screen
3. Switch language and verify NO English visible
4. Gate check: typecheck + lint + test

---

## Section 1: Screen Files (src/app/)

### 1.1 playback.tsx
**Location:** `src/app/playback.tsx`
**Namespace:** `playback`
**Strings:** ~12
**Complexity:** Interpolated

**Strings to replace:**
```
"Reading" → t('default_title')
"Complete!" → t('results.complete')
"Reading Speed" → t('results.reading_speed')
"Words Read" → t('results.words_read')
"Done" → t('results.done') or common:t('actions.done')
"Read Again" → t('results.read_again')
"Content Not Found" → t('empty.content_not_found')
"The requested content could not be loaded." → t('empty.content_not_loaded')
```

**Pattern:**
```tsx
// Before
<Text>Complete!</Text>

// After
import { useTranslation } from 'react-i18next';
const { t } = useTranslation('playback');
<Text>{t('results.complete')}</Text>
```

**Interpolated patterns:**
```tsx
// WPM display
<Text>{t('results.wpm', { wpm: readingWPM })}</Text>
// Word count
<Text>{t('results.word_count', { count: wordsRead })}</Text>
```

**Checklist:**
- [ ] Import useTranslation hook
- [ ] Add const { t } = useTranslation('playback')
- [ ] Replace all <Text> string literals
- [ ] Handle conditional "max WPM" display
- [ ] Verify interpolation works
- [ ] Run typecheck

---

### 1.2 playback-quiz.tsx
**Location:** `src/app/playback-quiz.tsx`
**Namespace:** `quiz`
**Strings:** ~12
**Complexity:** Interpolated (question progress)

**Strings to replace:**
```
"Quiz" → t('title')
"Comprehension Quiz" → t('comprehension_title')
"Results" → t('results_title')
"Complete!" → t('results.complete')
"Comprehension" → t('results.comprehension')
"Correct Answers" → t('results.correct_answers')
"Reading Speed" → t('results.reading_speed')
"Done" → common:t('actions.done')
"Retake Quiz" → t('results.retake')
"No Quiz Available" → t('empty.title')
"This content does not have quiz questions." → t('empty.subtitle')
"Question X of Y" → t('question_progress', { current, total })
```

**Critical interpolation:**
```tsx
// Question progress
<Text>{t('question_progress', { current: currentIndex + 1, total: questions.length })}</Text>
```

**Checklist:**
- [ ] Import useTranslation hook
- [ ] Replace all static text
- [ ] Handle question_progress interpolation
- [ ] Handle percentage display for comprehension
- [ ] Run typecheck

---

### 1.3 journey-profile.tsx
**Location:** `src/app/journey-profile.tsx`
**Namespaces:** `settings`, `subscription`, `auth`
**Strings:** ~45+
**Complexity:** High (conditional text, alerts, multiple namespaces)

**Section headers:**
```
"Journey & Settings" → t('page_title')
"Theme" → t('sections.theme')
"Your Info" → t('sections.info')
"Subscription" → t('sections.subscription')
"Sync Across Devices" → t('sections.sync')
"Reading" → t('sections.reading')
```

**Settings labels:**
```
"Name (for certificates)" → t('info.name_label')
"Enter your name" → t('info.name_placeholder')
"Preview" → t('fonts.preview')
"Paragraph Pause" → t('reading.paragraph_pause')
"Brief pause between paragraphs" → t('reading.paragraph_pause_desc')
"Move to History" → t('reading.move_to_history')
"Completed items move to History" → t('reading.move_to_history_desc')
```

**Font options (in settings namespace):**
```
"System" → t('fonts.system')
"Serif" → t('fonts.serif')
"Round" → t('fonts.round')
"Condensed" → t('fonts.condensed')
```

**Theme names (in settings namespace):**
```
"dark" → t('themes.dark')
"midnight" → t('themes.midnight')
"sepia" → t('themes.sepia')
"light" → t('themes.light')
```

**Subscription section (use subscription namespace):**
```tsx
const { t: tSub } = useTranslation('subscription');
"Status" → tSub('status_label')
"Premium" → tSub('status_premium')
"Free" → tSub('status_free')
"Max WPM" → tSub('max_wpm_label')
"Upgrade to Premium" → tSub('upgrade_button')
"Restore Purchases" → tSub('restore_button')
```

**Auth section (use auth namespace):**
```tsx
const { t: tAuth } = useTranslation('auth');
"Signed In" → tAuth('status.signed_in')
"Account verified" → tAuth('status.verified')
"Ready to sync • Data sync coming soon" → tAuth('status.sync_ready')
"Sign Out" → tAuth('sign_out')
"Sign in to sync your reading progress, certificates, and settings across all your devices." → tAuth('modal.description')
"Sign In to Sync" → tAuth('modal.sign_in_button')
```

**Alert messages (CRITICAL - easy to miss):**
```tsx
// Use t() inside Alert.alert callbacks
Alert.alert(
  t('alerts.restored_title'),      // "Restored"
  t('alerts.restored_message'),    // "Your purchases have been restored successfully."
);

Alert.alert(
  t('alerts.error_title'),         // "Error"
  error.message,                   // Keep dynamic error
);

Alert.alert(
  t('alerts.no_purchases_title'),  // "No Purchases"
  t('alerts.no_purchases_message') // "No purchases found to restore."
);
```

**Checklist:**
- [ ] Import useTranslation for settings, subscription, auth namespaces
- [ ] Replace all section headers
- [ ] Replace all setting labels and descriptions
- [ ] Replace font option labels
- [ ] Replace theme names
- [ ] Replace subscription status text (conditional)
- [ ] Replace auth status text (conditional)
- [ ] Replace ALL Alert.alert() calls
- [ ] Handle conditional Premium/Free display
- [ ] Handle conditional SignedIn/SignOut states
- [ ] Run typecheck

---

### 1.4 add-content.tsx
**Location:** `src/app/add-content.tsx`
**Namespace:** `addContent`
**Strings:** ~5
**Complexity:** Simple

**Strings to replace:**
```
"New Content" → t('header')
"Practice" → t('practice.title')
"Choose from pre-generated content to practice speed reading" → t('practice.description')
```

**Note:** Read and Learn cards are in separate components.

**Checklist:**
- [ ] Import useTranslation
- [ ] Replace page header
- [ ] Replace Practice card title and description
- [ ] Run typecheck

---

### 1.5 history.tsx
**Location:** `src/app/history.tsx`
**Namespace:** `content`
**Strings:** ~3
**Complexity:** Simple

**Strings to replace:**
```
"History" → t('history.title')
"No completed items yet" → t('history.empty_title')
"Items you finish reading will appear here" → t('history.empty_subtitle')
```

**Checklist:**
- [ ] Import useTranslation
- [ ] Replace page title
- [ ] Replace empty state text
- [ ] Run typecheck

---

### 1.6 topics.tsx (and topic/[id].tsx)
**Location:** `src/app/topics.tsx`, `src/app/topic/[id].tsx`
**Namespace:** `topics`
**Strings:** ~2
**Complexity:** Simple + data-driven

**Strings to replace:**
```
"Topics" → t('page_title')
```

**Note:** Topic names and descriptions come from src/data/curriculum/topics.ts - see Section 4.

**Checklist:**
- [ ] Import useTranslation
- [ ] Replace page title
- [ ] Verify topic data integration (Section 4)
- [ ] Run typecheck

---

### 1.7 content/[id].tsx and article/[id].tsx
**Location:** Dynamic route screens
**Namespace:** `content`, `playback`
**Strings:** Check for any hardcoded text

**Checklist:**
- [ ] Audit for any hardcoded strings
- [ ] Replace if found
- [ ] Run typecheck

---

### 1.8 +not-found.tsx
**Location:** `src/app/+not-found.tsx`
**Namespace:** `errors`
**Strings:** ~2

**Strings to replace:**
```
"Page Not Found" → t('not_found.title')
"This page doesn't exist" → t('not_found.message')
```

**Checklist:**
- [ ] Import useTranslation
- [ ] Replace error text
- [ ] Run typecheck

---

## Section 2: Component Files (src/components/)

### 2.1 contentList/EmptyState.tsx
**Namespace:** `content`
**Strings:** ~3

```
"No content yet" → t('empty.title')
"Add articles, books, or generate learning content to get started with speed reading." → t('empty.subtitle')
"Get Started" → t('empty.button') or common:t('actions.get_started')
```

**Checklist:**
- [ ] Import useTranslation
- [ ] Replace all text
- [ ] Run typecheck

---

### 2.2 contentList/FilterPills.tsx
**Namespace:** `content`
**Strings:** 5 filter labels

**CRITICAL: Static array needs refactoring**

```tsx
// Before
const FILTERS = ['All', 'Books', 'Articles', 'Learning', 'Training'];

// After - Option A: Inline t() calls
const { t } = useTranslation('content');
const FILTERS = [
  { key: 'all', label: t('filters.all') },
  { key: 'books', label: t('filters.books') },
  { key: 'articles', label: t('filters.articles') },
  { key: 'learning', label: t('filters.learning') },
  { key: 'training', label: t('filters.training') },
];

// After - Option B: Generate at render time
const filterKeys = ['all', 'books', 'articles', 'learning', 'training'];
const filters = filterKeys.map(key => ({ key, label: t(`filters.${key}`) }));
```

**Checklist:**
- [ ] Refactor FILTERS array
- [ ] Ensure labels update on language change
- [ ] Run typecheck

---

### 2.3 contentList/ContentListItemCard.tsx
**Namespace:** `content`
**Strings:** Word count display

```
"words" → t('word_count', { count: wordCount })
// Handle pluralization: "1 word" vs "5 words"
```

**Checklist:**
- [ ] Handle word count pluralization
- [ ] Run typecheck

---

### 2.4 contentList/DateSectionHeader.tsx
**Namespace:** `content`
**Strings:** Date grouping labels

```
"Today" → t('dates.today')
"Yesterday" → t('dates.yesterday')
"This Week" → t('dates.this_week')
"Last Week" → t('dates.last_week')
"This Month" → t('dates.this_month')
"Older" → t('dates.older')
```

**Checklist:**
- [ ] Replace all date section labels
- [ ] Run typecheck

---

### 2.5 paywall/Paywall.tsx
**Namespace:** `subscription`
**Strings:** ~12
**Complexity:** Interpolated

**Strings to replace:**
```
"Upgrade to Premium" → t('paywall.title')
"Free tier is limited to {{wpm}} WPM" → t('paywall.reason_wpm', { wpm })
"Free tier is limited to 3 AI-generated articles per day" → t('paywall.reason_generation')
"Read up to {{wpm}} WPM" → t('benefits.max_wpm', { wpm })
"Unlimited AI article generation" → t('benefits.unlimited_generation')
"All topics & curriculum" → t('benefits.all_topics')
"Earn speed certificates" → t('benefits.certificates')
"Loading..." → common:t('loading')
"Not available" → common:t('not_available')
"Subscribe Now" → t('paywall.subscribe_button')
"Restore Purchases" → t('paywall.restore_button')
"Purchase failed. Please try again." → t('errors.purchase_failed')
```

**Checklist:**
- [ ] Import useTranslation
- [ ] Replace title and all benefits
- [ ] Handle WPM interpolation in limit message
- [ ] Handle price display states
- [ ] Replace error messages
- [ ] Run typecheck

---

### 2.6 controls/PlaybackControls.tsx
**Namespace:** `playback`
**Strings:** ~4
**Complexity:** Interpolated

```tsx
// Word counter: "123 / 456"
<Text>{t('controls.word_counter', { current: currentIndex + 1, total: totalWords })}</Text>

// WPM display
<Text>{wpm} {common:t('wpm_suffix')}</Text>

// Optional max WPM
<Text>({t('controls.max_wpm', { max: maxWPM })})</Text>
```

**Checklist:**
- [ ] Handle word counter interpolation
- [ ] Handle WPM suffix
- [ ] Handle conditional max WPM display
- [ ] Run typecheck

---

### 2.7 addContent/ExpandableReadCard.tsx
**Namespace:** `addContent`
**Strings:** ~12
**Complexity:** Static array + Alert messages

**Card text:**
```
"Read" → t('read.title')
"Speed read your own articles or books from PDFs, EPUBs, or links" → t('read.description')
```

**Option labels (STATIC ARRAY - needs refactoring):**
```tsx
// Before
const READ_OPTIONS = [
  { key: 'url', label: 'A webpage', icon: '🔗' },
  { key: 'text', label: 'Plain Text', icon: '📝' },
  { key: 'file', label: 'Epub & PDF', icon: '📄' },
];

// After
const { t } = useTranslation('addContent');
const READ_OPTIONS = [
  { key: 'url', label: t('read.options.webpage'), icon: '🔗' },
  { key: 'text', label: t('read.options.text'), icon: '📝' },
  { key: 'file', label: t('read.options.file'), icon: '📄' },
];
```

**Placeholders:**
```
"Enter URL (e.g., https://example.com/article)" → t('read.url_placeholder')
"Paste your text here..." → t('read.text_placeholder')
```

**Buttons:**
```
"Import" → common:t('actions.import')
"Save & Read" → common:t('actions.save_and_read')
```

**CRITICAL: Alert messages**
```tsx
Alert.alert(
  t('errors.import_failed'),           // "Import Failed"
  t('errors.url_extraction_failed')    // "Could not extract content from URL"
);

Alert.alert(
  t('errors.import_failed'),
  t('errors.text_processing_failed')   // "Could not process text"
);

Alert.alert(
  common:t('error'),                   // "Error"
  t('errors.document_pick_failed')     // "Failed to pick document"
);
```

**Checklist:**
- [ ] Replace card title and description
- [ ] Refactor READ_OPTIONS array
- [ ] Replace placeholders
- [ ] Replace button labels
- [ ] Replace ALL Alert.alert() messages
- [ ] Run typecheck

---

### 2.8 addContent/ExpandableLearnCard.tsx
**Namespace:** `addContent`, `generation`
**Strings:** ~15
**Complexity:** Conditional (premium), static arrays

**Card text:**
```
"Learn" → t('learn.title')
"Generate articles on topics you want to master" → t('learn.description')
```

**Input:**
```
"What do you want to learn about?" → t('learn.input_placeholder')
```

**Labels:**
```
"Portion" → generation:t('labels.portion')
"Flavor" → generation:t('labels.flavor')
"Adjust duration and tone" → t('learn.customize_toggle')
```

**Buttons:**
```
"Serve it up" → generation:t('actions.serve_it_up')
"Listening..." → generation:t('actions.listening')
"Transcribing..." → generation:t('actions.transcribing')
```

**Portion options (CHARACTER BALANCED - see Section 4):**
```
"Bite" → generation:t('portions.bite')
"Snack" → generation:t('portions.snack')
"Meal" → generation:t('portions.meal')
"Feast" → generation:t('portions.feast')
```

**Tone options (CHARACTER BALANCED - see Section 4):**
```
"Auto" → generation:t('tones.auto')
"Fact" → generation:t('tones.fact')
"Story" → generation:t('tones.story')
"Analogy" → generation:t('tones.analogy')
```

**Accessibility labels:**
```
"{{portion}} portion (Premium feature)" → generation:t('a11y.portion_premium', { portion })
"{{portion}} portion" → generation:t('a11y.portion', { portion })
"Upgrade to premium to unlock" → generation:t('a11y.upgrade_hint')
```

**Checklist:**
- [ ] Replace card title and description
- [ ] Replace input placeholder
- [ ] Replace section labels
- [ ] Replace button text (including loading states)
- [ ] Integrate portion/tone options from generation namespace
- [ ] Replace accessibility labels
- [ ] Handle premium conditional text
- [ ] Run typecheck

---

### 2.9 auth/AuthModal.tsx
**Namespace:** `auth`
**Strings:** ~25
**Complexity:** Multiple states, validation messages

**Modal headers:**
```
"Sync Across Devices" → t('modal.title_sync')
"Email Sent" → t('modal.title_email_sent')
"Sign in to sync your reading progress, certificates, and settings across all your devices." → t('modal.description')
```

**Input placeholders:**
```
"your@email.com" → t('inputs.email_placeholder')
"Password (min 8 characters)" → t('inputs.password_placeholder')
```

**Buttons:**
```
"Sign in with email" → t('actions.sign_in_email')
"Continue with Google" → t('actions.continue_google')
"Forgot Password?" → t('actions.forgot_password')
```

**Confirmation messages:**
```
"Check your email" → t('confirmation.title')
"We sent a password reset link to {{email}}. Click the link to reset your password." → t('confirmation.password_reset', { email })
"We sent a verification link to {{email}}. Click the link to verify your account." → t('confirmation.verification', { email })
```

**Validation errors:**
```
"Please enter your email address" → t('errors.email_required')
"Please enter a valid email address" → t('errors.email_invalid')
"Please enter your password" → t('errors.password_required')
"Password must be at least 8 characters long" → t('errors.password_too_short')
```

**Status messages:**
```
"Account not found. Creating new account..." → t('status.creating_account')
"Authentication failed" → t('errors.auth_failed')
"Failed to send reset email" → t('errors.reset_failed')
```

**Checklist:**
- [ ] Replace all modal headers
- [ ] Replace input placeholders
- [ ] Replace button labels
- [ ] Replace confirmation messages (with email interpolation)
- [ ] Replace validation error messages
- [ ] Replace status messages
- [ ] Run typecheck

---

### 2.10 certifications/StatsSummary.tsx
**Namespace:** `stats` (or `content`)
**Strings:** 4 stat labels

```
"Devoured" → t('stats.devoured')
"Words" → t('stats.words')
"Retention" → t('stats.retention')
"Best WPM" → t('stats.best_wpm')
```

**Note:** These are thematic labels that enhance app personality. Translations should maintain the same energy.

**Checklist:**
- [ ] Replace all stat labels
- [ ] Run typecheck

---

### 2.11 quiz/*.tsx components
**Namespace:** `quiz`

**SingleChoiceQuestion.tsx:**
```
Accessibility labels for options
"Option {{number}}: {{text}}" → t('a11y.option_label', { number, text })
"Double tap to select this answer" → t('a11y.select_hint')
```

**TrueFalseQuestion.tsx:**
```
"True" → t('true_false.true')
"False" → t('true_false.false')
Accessibility hints
```

**MultipleSelectQuestion.tsx:** Audit for strings

**NumericQuestion.tsx:** Audit for strings

**Checklist:**
- [ ] Replace quiz component labels
- [ ] Replace accessibility labels
- [ ] Run typecheck

---

### 2.12 rsvp/ChapterPauseOverlay.tsx
**Namespace:** `playback`
**Strings:** ~2

```
"Chapter {{number}}" → t('chapter_pause.title', { number })
"Continue Reading" → t('chapter_pause.continue')
```

**Checklist:**
- [ ] Replace chapter label (with interpolation)
- [ ] Replace button label
- [ ] Run typecheck

---

### 2.13 learn/GenerateArticleModal.tsx
**Namespace:** `generation`
**Strings:** ~4

```
"Generate Article" → t('modal.title')
"What do you want to learn about?" → t('modal.input_label')
"Generate" → t('actions.generate')
```

**Checklist:**
- [ ] Replace all text
- [ ] Run typecheck

---

### 2.14 premium/PremiumBadge.tsx
**Namespace:** `subscription`
**Strings:** ~1

```
"Premium" → t('badge.premium')
```

**Checklist:**
- [ ] Replace badge label
- [ ] Run typecheck

---

### 2.15 Other components to audit
- [ ] contentList/CurriculumAccordionItem.tsx
- [ ] learn/DurationPill.tsx
- [ ] learn/TonePill.tsx
- [ ] learn/GeneratedArticleCard.tsx
- [ ] journey/VerticalProgressPath.tsx (milestone names)
- [ ] Any component with <Text> children

---

## Section 3: Service Files (src/services/)

### 3.1 certificateTemplate.ts
**Namespace:** `certificates`
**Strings:** ~15
**Complexity:** HTML template injection

**CRITICAL: This file generates HTML certificates with embedded English text.**

**Pattern: Accept translated strings as parameters**

```tsx
// Before
export function generateCertificateHTML(userName: string, wpm: number) {
  return `
    <h1>Certificate of Achievement</h1>
    <p>This certificate is proudly presented to</p>
    <h2>${userName}</h2>
    ...
  `;
}

// After
interface CertificateStrings {
  header: string;           // "Certificate of Achievement"
  presentedTo: string;      // "This certificate is proudly presented to"
  description: string;      // "For demonstrating exceptional speed reading proficiency..."
  dateLabel: string;        // "Date Achieved"
  idLabel: string;          // "Certificate ID"
  signature: string;        // "Verified Achievement"
}

export function generateCertificateHTML(
  userName: string,
  wpm: number,
  certStrings: CertificateStrings
) {
  return `
    <h1>${certStrings.header}</h1>
    <p>${certStrings.presentedTo}</p>
    <h2>${userName}</h2>
    ...
  `;
}

// Usage in component
const { t } = useTranslation('certificates');
const certStrings: CertificateStrings = {
  header: t('template.header'),
  presentedTo: t('template.presented_to'),
  description: t('template.description'),
  dateLabel: t('template.date_label'),
  idLabel: t('template.id_label'),
  signature: t('template.signature'),
};
const html = generateCertificateHTML(userName, wpm, certStrings);
```

**Checklist:**
- [ ] Create CertificateStrings interface
- [ ] Refactor function to accept translated strings
- [ ] Update all callers to pass translated strings
- [ ] Run typecheck

---

### 3.2 epubParser.ts
**Namespace:** `errors`
**Strings:** 6 error messages

```
"This e-book is DRM protected and cannot be imported. Please use a DRM-free version." → errors:t('epub.drm_protected')
"Invalid EPUB: missing container.xml" → errors:t('epub.missing_container')
"Invalid EPUB: cannot find content file" → errors:t('epub.content_not_found')
"Invalid EPUB: missing content file" → errors:t('epub.missing_content')
"Not enough readable content found in this EPUB" → errors:t('epub.insufficient_content')
"Failed to parse EPUB file" → errors:t('epub.parse_failed')
```

**Pattern: Return error keys, translate at display time**

```tsx
// Before
throw new Error('This e-book is DRM protected...');

// After
throw new Error('epub.drm_protected'); // Key only

// At display time in component
const errorKey = error.message;
const localizedMessage = t(`errors.${errorKey}`);
Alert.alert(t('errors.title'), localizedMessage);
```

**Checklist:**
- [ ] Convert error messages to keys
- [ ] Update error handlers to translate at display time
- [ ] Run typecheck

---

### 3.3 contentExtractor.ts
**Audit for error messages**

**Checklist:**
- [ ] Audit for user-facing strings
- [ ] Convert to error keys if found
- [ ] Run typecheck

---

### 3.4 Other services to audit
- [ ] purchases.ts (error messages)
- [ ] Any service with user-facing strings

---

## Section 4: Static Data Files (src/data/, src/types/)

### 4.1 curriculum/topics.ts
**Namespace:** `topics`
**Strings:** 30 (15 topics × name + description)
**Complexity:** Static data refactoring

**CRITICAL: All 15 topics need localization**

**Pattern: Getter function with i18n**

```tsx
// Before
export const TOPICS: Topic[] = [
  {
    id: 'science-discovery',
    name: 'Science & Discovery',
    description: 'Breakthrough discoveries that changed our world',
    emoji: '🔬',
    ...
  },
  // ... 14 more
];

// After - Option A: Getter function
import i18n from '@/services/i18n';

export const getTopics = (): Topic[] => [
  {
    id: 'science-discovery',
    get name() { return i18n.t('topics:science_discovery.name'); },
    get description() { return i18n.t('topics:science_discovery.desc'); },
    emoji: '🔬',
    ...
  },
  // ... 14 more
];

// After - Option B: ID-based lookup
export const TOPIC_IDS = [
  'science_discovery',
  'health_medicine',
  'history_civilization',
  // ... 12 more
] as const;

export const getTopicById = (id: string) => {
  return {
    id,
    name: i18n.t(`topics:${id}.name`),
    description: i18n.t(`topics:${id}.desc`),
    // ...
  };
};
```

**All 15 topic keys:**
1. science_discovery
2. health_medicine
3. history_civilization
4. technology_internet
5. nature_wildlife
6. climate_environment
7. space_cosmos
8. psychology_mind
9. self_improvement
10. business_careers
11. finance_investing
12. trivia_fun_facts
13. world_travel
14. arts_culture
15. lifestyle_wellness

**Checklist:**
- [ ] Refactor topics.ts to use getter pattern
- [ ] Update all consumers of TOPICS
- [ ] Verify topic names display correctly
- [ ] Run typecheck

---

### 4.2 interests.ts
**Namespace:** `interests`
**Strings:** 15 interest labels
**Complexity:** Static array refactoring

**Pattern: Same as topics**

**All 15 interest keys:**
1. science_discovery
2. health_medicine
3. history_civilization
4. technology_internet
5. nature_wildlife
6. climate_environment
7. space_cosmos
8. psychology_mind
9. self_improvement
10. business_careers
11. finance_investing
12. trivia_fun_facts
13. world_travel
14. arts_culture
15. lifestyle_wellness

**Checklist:**
- [ ] Refactor interests.ts to use getter pattern
- [ ] Update all consumers
- [ ] Run typecheck

---

### 4.3 types/generated.ts
**Namespace:** `generation`
**Strings:** Tone, portion, duration labels

**TONE_DEFINITIONS (CHARACTER BALANCED):**
```tsx
// Before
export const TONE_DEFINITIONS = {
  fact: { label: 'Fact', description: 'Clear and educational' },
  story: { label: 'Story', description: 'Narrative and engaging' },
  analogy: { label: 'Analogy', description: 'Rich in comparisons' },
};

// After - getter function
export const getToneDefinitions = () => ({
  auto: { label: i18n.t('generation:tones.auto'), description: '' },
  fact: { label: i18n.t('generation:tones.fact'), description: i18n.t('generation:tones.fact_desc') },
  story: { label: i18n.t('generation:tones.story'), description: i18n.t('generation:tones.story_desc') },
  analogy: { label: i18n.t('generation:tones.analogy'), description: i18n.t('generation:tones.analogy_desc') },
});
```

**PORTION_OPTIONS (CHARACTER BALANCED):**
```tsx
export const getPortionOptions = () => [
  { key: 'bite', label: i18n.t('generation:portions.bite') },
  { key: 'snack', label: i18n.t('generation:portions.snack') },
  { key: 'meal', label: i18n.t('generation:portions.meal') },
  { key: 'feast', label: i18n.t('generation:portions.feast') },
];
```

**DURATION_OPTIONS:**
```tsx
export const getDurationOptions = () => [
  { key: '1', label: i18n.t('generation:durations.1min') },
  { key: '2', label: i18n.t('generation:durations.2min') },
  { key: '3', label: i18n.t('generation:durations.3min') },
  { key: '5', label: i18n.t('generation:durations.5min') },
  { key: '10', label: i18n.t('generation:durations.10min') },
];
```

**Checklist:**
- [ ] Refactor TONE_DEFINITIONS to getter
- [ ] Refactor PORTION_OPTIONS to getter
- [ ] Refactor DURATION_OPTIONS to getter
- [ ] Update all consumers
- [ ] Run typecheck

---

### 4.4 themes.ts
**Namespace:** `settings`
**Strings:** 4 theme names

```tsx
// Theme display names
"Dark" → t('themes.dark')
"Midnight" → t('themes.midnight')
"Sepia" → t('themes.sepia')
"Light" → t('themes.light')
```

**Note:** Character balancing required for these labels.

**Checklist:**
- [ ] Refactor theme names to use i18n
- [ ] Update theme picker component
- [ ] Run typecheck

---

### 4.5 types/journey.ts
**Namespace:** `journey`
**Strings:** Milestone names if any

**SIMPLE_MILESTONES array:**
```
"Beginner" → t('milestones.beginner')
"Explorer" → t('milestones.explorer')
"Reader" → t('milestones.reader')
"Sprinter" → t('milestones.sprinter')
"Racer" → t('milestones.racer')
"Champion" → t('milestones.champion')
```

**Checklist:**
- [ ] Audit journey types for user-facing strings
- [ ] Refactor milestone names if needed
- [ ] Run typecheck

---

## Section 5: Store Files (src/store/)

### 5.1 General pattern
Stores should NOT contain translated strings. Store error keys only, translate at display time.

**Checklist:**
- [ ] Audit all stores for user-facing strings
- [ ] Convert any found to translation keys
- [ ] Update consumers to translate at display time

---

## Section 6: Accessibility Labels

### Critical: All accessibility text must be localized

**Common patterns:**
```tsx
// Before
accessibilityLabel="Close button"
accessibilityHint="Double tap to close"

// After
accessibilityLabel={t('accessibility.close')}
accessibilityHint={t('accessibility.close_hint')}
```

**Files to audit for accessibility:**
- [ ] All interactive components (buttons, inputs, pressables)
- [ ] Navigation elements
- [ ] Modal close buttons
- [ ] Quiz answer options
- [ ] Playback controls
- [ ] FAB buttons

---

## Section 7: Verification & Detection

### 7.1 Grep commands to detect remaining hardcoded strings

**Run AFTER completing all M6 work:**

```bash
# Detect string literals in JSX Text elements
grep -rn ">\s*[A-Z][a-zA-Z ]*\s*<" src/app/ src/components/ --include="*.tsx" | grep -v "import" | grep -v "//"

# Detect hardcoded strings in props
grep -rn 'title="[A-Z]' src/ --include="*.tsx"
grep -rn 'label="[A-Z]' src/ --include="*.tsx"
grep -rn 'placeholder="[A-Z]' src/ --include="*.tsx"
grep -rn 'description="[A-Z]' src/ --include="*.tsx"

# Detect Alert.alert with hardcoded strings
grep -rn 'Alert\.alert(' src/ --include="*.tsx" -A 2 | grep -v "t("

# Detect accessibilityLabel with hardcoded strings
grep -rn 'accessibilityLabel="[A-Z]' src/ --include="*.tsx"
grep -rn 'accessibilityHint="[A-Z]' src/ --include="*.tsx"

# Detect strings in static arrays/objects
grep -rn "label:\s*['\"][A-Z]" src/ --include="*.ts" --include="*.tsx"
grep -rn "name:\s*['\"][A-Z]" src/data/ --include="*.ts"
grep -rn "description:\s*['\"][A-Z]" src/data/ --include="*.ts"
```

### 7.2 Expected false positives (OK to ignore)
- Import statements
- Type definitions with string literals as discriminators
- Console.log/debug messages
- API error codes (internal)
- Test files

### 7.3 Visual verification checklist

**Switch app to each non-English language and verify:**

**Main screens:**
- [ ] Content list (empty state, filters)
- [ ] Content cards (word counts, status)
- [ ] History (empty state)
- [ ] Topics list
- [ ] Topic detail (article list)
- [ ] Add Content modal (all three cards)

**Playback:**
- [ ] Playback screen (title, controls)
- [ ] Results screen (all labels)
- [ ] Chapter pause overlay
- [ ] Quiz (questions, progress, results)

**Profile/Settings:**
- [ ] Journey profile (all sections)
- [ ] Theme picker (theme names)
- [ ] Font picker (font names)
- [ ] Subscription section (status, buttons)
- [ ] Auth section (all states)
- [ ] Settings toggles (labels, descriptions)

**Modals:**
- [ ] Auth modal (all states)
- [ ] Paywall (title, benefits, buttons)
- [ ] Alerts (all messages)

**Error states:**
- [ ] Content not found
- [ ] Quiz not available
- [ ] Import failed
- [ ] Network errors

---

## Section 8: Gate Check

**Before marking M6 complete:**

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes (0 errors)
- [ ] `npm test` passes (all existing tests)
- [ ] All detection grep commands return no actionable results
- [ ] Visual verification complete in iOS simulator
- [ ] Language switch shows NO English text in non-English locale
- [ ] All Alert.alert() calls use t() functions
- [ ] All accessibility labels use t() functions
- [ ] All static data arrays refactored to use getters
- [ ] Certificate template accepts translated strings

---

## Estimated Effort

- **Screen files:** 8 screens × 30 min = 4 hours
- **Component files:** 20 components × 20 min = 7 hours
- **Service files:** 3 services × 1 hour = 3 hours
- **Static data refactoring:** 5 files × 1 hour = 5 hours
- **Verification & testing:** 3 hours

**Total: ~22 hours**

---

## Summary

**Total strings to localize:** ~260
**Files to modify:** ~40
**Static arrays to refactor:** 8
**Alert.alert() calls to update:** ~15
**Accessibility labels:** ~30

**Zero tolerance for missed strings. Every text element must be verified.**

---

**End of M6 Integration Specification**
