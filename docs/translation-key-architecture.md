# Translation Key Architecture

**Created:** 2026-01-21
**Milestone:** M3
**Status:** Complete

This document defines the structure, naming conventions, and patterns for all translation keys in the Devoro UI localization system.

---

## Namespace Strategy

Translation keys are organized into **15 namespaces** based on feature areas:

| Namespace | Purpose | Example Keys |
|-----------|---------|--------------|
| `common` | Shared UI elements, buttons, actions | `common.actions.cancel`, `common.loading` |
| `topics` | Curriculum topic names and descriptions | `topics.science_discovery.name`, `topics.science_discovery.desc` |
| `interests` | User interest category labels | `interests.science_discovery`, `interests.health_medicine` |
| `generation` | AI content generation UI | `generation.portions.bite`, `generation.flavors.story` |
| `playback` | RSVP playback screen and controls | `playback.results.complete`, `playback.controls.play` |
| `quiz` | Comprehension quiz interface | `quiz.results.comprehension`, `quiz.question_progress` |
| `settings` | Settings, profile, preferences | `settings.themes.dark`, `settings.fonts.serif` |
| `content` | Content list, filters, cards | `content.filters.all`, `content.empty.title` |
| `addContent` | Add content modal tiers | `addContent.practice.title`, `addContent.read.options.webpage` |
| `consumption` | Content import (URL, text, files) | `consumption.import.url_placeholder`, `consumption.errors.extract_failed` |
| `auth` | Authentication and sync | `auth.modal.title`, `auth.errors.email_invalid` |
| `subscription` | Paywall, benefits, upgrade prompts | `subscription.paywall.title`, `subscription.benefits.max_wpm` |
| `certificates` | Certificate template and achievements | `certificates.template.title`, `certificates.achievement` |
| `errors` | Centralized error messages | `errors.network.timeout`, `errors.validation.required` |
| `accessibility` | Accessibility labels and hints | `accessibility.close`, `accessibility.fab.profile` |

---

## Key Naming Conventions

### Hierarchical Structure

Use **dot notation** to create logical hierarchies:

```
{namespace}.{section}.{subsection}.{key}
```

**Examples:**
```json
{
  "playback.results.complete": "Complete!",
  "playback.results.reading_speed": "Reading Speed",
  "playback.controls.play": "Play",
  "playback.controls.pause": "Pause"
}
```

### Naming Rules

1. **Use camelCase** for multi-word keys:
   - ✅ `readingSpeed`
   - ❌ `reading_speed`, `reading-speed`

2. **Keep keys semantic**, not positional:
   - ✅ `playback.errors.content_not_found`
   - ❌ `playback.error1`, `playback.error_msg`

3. **Use descriptive names** that indicate content:
   - ✅ `quiz.results.correct_answers`
   - ❌ `quiz.label3`

4. **Group related keys** under common prefixes:
   ```json
   {
     "auth.modal.title_sync": "Sync Across Devices",
     "auth.modal.title_email_sent": "Email Sent",
     "auth.modal.continue_google": "Continue with Google",
     "auth.modal.sign_in_email": "Sign in with email"
   }
   ```

5. **Use consistent suffixes** for related types:
   - Placeholders: `*_placeholder` (e.g., `auth.email_placeholder`)
   - Descriptions: `*_desc` (e.g., `topics.science_discovery_desc`)
   - Labels: `*_label` (e.g., `generation.portion_label`)
   - Titles: `*_title` (e.g., `addContent.practice_title`)

---

## Interpolation Patterns

### Syntax

Use **double curly braces** for variable interpolation:

```json
{
  "quiz.question_progress": "Question {{current}} of {{total}}",
  "subscription.paywall.reason_wpm": "Free tier is limited to {{wpm}} WPM",
  "auth.check_email_verify": "We sent a verification link to {{email}}."
}
```

### Common Variables

Standardized variable names used across namespaces:

| Variable | Usage | Example |
|----------|-------|---------|
| `{{count}}` | Generic count | "{{count}} articles" |
| `{{current}}` | Current position | "Question {{current}} of {{total}}" |
| `{{total}}` | Total count | "Question {{current}} of {{total}}" |
| `{{wpm}}` | Words per minute | "{{wpm}} WPM" |
| `{{email}}` | Email address | "Sent to {{email}}" |
| `{{name}}` | User name | "Hello {{name}}" |
| `{{portion}}` | Portion type | "{{portion}} portion" |
| `{{flavor}}` | Flavor type | "{{flavor}} flavor" |
| `{{min}}` | Minimum value | "{{min}}-{{max}} articles" |
| `{{max}}` | Maximum value | "{{min}}-{{max}} articles" |
| `{{n}}` | Numeric value (short form) | "{{n}} articles" |

### Implementation Example

```typescript
// Usage in component
const { t } = useLocale('quiz');

// Renders: "Question 2 of 5"
<Text>{t('question_progress', { current: 2, total: 5 })}</Text>
```

---

## Pluralization Patterns

### i18next Pluralization

i18next handles pluralization automatically based on a `count` variable:

```json
{
  "generation.article": "article",
  "generation.article_one": "{{count}} article",
  "generation.article_other": "{{count}} articles"
}
```

### Language-Specific Rules

i18next uses language-specific plural rules automatically:
- English: `one`, `other` (e.g., 1 item, 2 items)
- Czech: `one`, `few`, `many`, `other` (complex rules)
- Polish: `one`, `few`, `many`, `other` (complex rules)

**Example:**
```json
// English (en/generation.json)
{
  "article_one": "{{count}} article",
  "article_other": "{{count}} articles"
}

// Czech (cs/generation.json)
{
  "article_one": "{{count}} článek",    // 1
  "article_few": "{{count}} články",     // 2-4
  "article_many": "{{count}} článku",    // 0.1-1.9
  "article_other": "{{count}} článků"    // 5+
}
```

### Implementation Example

```typescript
const { t } = useLocale('generation');

// Automatically selects correct plural form
<Text>{t('article', { count: 1 })}</Text>  // "1 article"
<Text>{t('article', { count: 5 })}</Text>  // "5 articles"
```

---

## Special Patterns

### 1. HTML Content

For strings with HTML (like certificate templates), **store plain text** in translation files and apply styling in code:

```json
{
  "certificates.template.title": "Certificate of Achievement",
  "certificates.template.subtitle": "Reading Excellence"
}
```

Then assemble HTML in code:
```typescript
const title = t('certificates.template.title');
const html = `<h1>${title}</h1>`;
```

### 2. Emoji in Strings

Emojis can be included in translation strings but should be **optional**:

```json
{
  "topics.science_discovery": "Science & Discovery 🔬"
}
```

**Guideline:** Emojis enhance readability but shouldn't carry essential meaning. Some languages/cultures may prefer to omit them.

### 3. Accessibility Labels

Accessibility labels follow the pattern:

```json
{
  "accessibility.{element}": "Descriptive label",
  "accessibility.{element}_hint": "Hint for screen readers"
}
```

**Example:**
```json
{
  "accessibility.fab_profile": "Open journey and profile",
  "accessibility.close": "Close",
  "generation.a11y_portion_premium": "{{portion}} portion (Premium feature)",
  "generation.a11y_portion_hint_upgrade": "Upgrade to premium to unlock"
}
```

### 4. Contextual Variations

When the same English word needs different translations based on context, use descriptive keys:

```json
{
  "common.actions.close_modal": "Close",
  "common.actions.close_app": "Exit"
}
```

### 5. Conditional Text

For ternary expressions or conditional rendering, create separate keys:

```json
{
  "subscription.status_premium": "Premium",
  "subscription.status_free": "Free"
}
```

Usage:
```typescript
const status = isPremium ? t('status_premium') : t('status_free');
```

---

## Key Organization Examples

### Example 1: Common Namespace

```json
{
  "app_name": "Devoro",
  "loading": "Loading...",
  "actions": {
    "cancel": "Cancel",
    "confirm": "Confirm",
    "close": "Close",
    "done": "Done",
    "continue": "Continue",
    "get_started": "Get Started"
  },
  "wpm_suffix": "WPM"
}
```

### Example 2: Playback Namespace

```json
{
  "default_title": "Reading",
  "empty": {
    "content_not_found": "Content Not Found",
    "content_not_loaded": "The requested content could not be loaded."
  },
  "results": {
    "complete": "Complete!",
    "reading_speed": "Reading Speed",
    "words_read": "Words Read",
    "read_again": "Read Again"
  },
  "controls": {
    "play": "Play",
    "pause": "Pause",
    "rewind": "Rewind sentence",
    "skip": "Skip sentence"
  }
}
```

### Example 3: Generation Namespace

```json
{
  "tones": {
    "fact": "Fact",
    "fact_desc": "Clear and educational",
    "story": "Story",
    "story_desc": "Narrative and engaging",
    "analogy": "Analogy",
    "analogy_desc": "Rich in comparisons"
  },
  "durations": {
    "1min": "1 min",
    "2min": "2 min",
    "3min": "3 min",
    "5min": "5 min",
    "10min": "10 min"
  },
  "portions": {
    "bite": "Bite",
    "snack": "Snack",
    "meal": "Meal",
    "feast": "Feast"
  },
  "labels": {
    "portion": "Portion",
    "flavor": "Flavor",
    "auto": "Auto"
  },
  "placeholders": {
    "topic": "What do you want to learn about?"
  },
  "actions": {
    "serve_it_up": "Serve it up",
    "listening": "Listening...",
    "transcribing": "Transcribing..."
  },
  "article_one": "{{count}} article",
  "article_other": "{{count}} articles",
  "min_suffix": "min"
}
```

---

## Migration Strategy

When replacing hardcoded strings in M6, follow this process:

1. **Identify the string** in code
2. **Find the namespace** (common, playback, quiz, etc.)
3. **Create hierarchical key** following naming conventions
4. **Add to translation file** (src/locales/en/{namespace}.json)
5. **Replace with t() call**:
   ```typescript
   // Before
   <Text>Complete!</Text>

   // After
   const { t } = useLocale('playback');
   <Text>{t('results.complete')}</Text>
   ```

---

## Validation Rules

All translation keys must:
1. ✅ Be valid JSON property names (no spaces, no special chars except dots)
2. ✅ Use dot notation for hierarchy (`section.subsection.key`)
3. ✅ Use camelCase for multi-word keys
4. ✅ Be semantic and descriptive
5. ✅ Use consistent suffixes (_placeholder, _desc, _title, etc.)
6. ✅ Include interpolation variables with `{{variableName}}` syntax
7. ✅ Support pluralization with `_one`, `_other` suffixes when needed

---

## Reference

- **i18next Documentation**: https://www.i18next.com/
- **Pluralization Rules**: https://www.i18next.com/translation-function/plurals
- **Interpolation**: https://www.i18next.com/translation-function/interpolation
- **react-i18next Hooks**: https://react.i18next.com/latest/usetranslation-hook

---

## Next Steps (M4)

With this architecture defined, M4 will:
1. Create all 15 namespace JSON files for English (`src/locales/en/*.json`)
2. Populate each file with properly structured translation keys
3. Ensure all ~275-300 strings discovered in M2 are included
4. Validate JSON syntax and key naming conventions
