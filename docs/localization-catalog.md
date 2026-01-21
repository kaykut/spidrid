# UI Localization String Catalog

**Generated:** 2026-01-21
**Status:** M2 Discovery Phase - Pass 1 Complete

This document catalogs all user-facing strings discovered in the Devoro codebase that require translation into 11 European languages.

## Summary

- **Total Namespaces:** 15
- **Estimated Strings:** 300+
- **Target Languages:** 11 (en, cs, de, nl, fr, it, pl, pt, ro, es, sv)

---

## 1. common - App-Wide General Strings

**File:** `src/locales/en/common.json`

### Brand & App
```json
{
  "app_name": "Devoro",
  "loading": "Loading...",
  "not_available": "Not available"
}
```

### Actions
```json
{
  "cancel": "Cancel",
  "confirm": "Confirm",
  "close": "✕",
  "done": "Done",
  "continue": "Continue",
  "get_started": "Get Started",
  "import": "Import",
  "or": "or"
}
```

### Misc
```json
{
  "wpm_suffix": "WPM"
}
```

---

## 2. topics - Curriculum Topics

**File:** `src/locales/en/topics.json`
**Source:** `src/data/curriculum/topics.ts`

### Topic Names (15 total)
```json
{
  "science_discovery": "Science & Discovery 🔬",
  "health_medicine": "Health & Medicine ⚕️",
  "history_civilization": "History & Civilization 🏛️",
  "technology_internet": "Technology & Internet 💻",
  "nature_wildlife": "Nature & Wildlife 🌿",
  "climate_environment": "Climate & Environment 🌍",
  "space_cosmos": "Space & Cosmos 🌌",
  "psychology_mind": "Psychology & Mind 🧠",
  "self_improvement": "Self-Improvement ✨",
  "business_careers": "Business & Careers 💼",
  "finance_investing": "Finance & Investing 📈",
  "trivia_fun_facts": "Trivia & Fun Facts 🎯",
  "world_travel": "World & Travel ✈️",
  "arts_culture": "Arts & Culture 🎭",
  "lifestyle_wellness": "Lifestyle & Wellness 🌸"
}
```

### Topic Descriptions (15 total)
```json
{
  "science_discovery_desc": "Breakthrough discoveries that changed our world",
  "health_medicine_desc": "Advances in healthcare and medical breakthroughs",
  "history_civilization_desc": "Pivotal moments that shaped human history",
  "technology_internet_desc": "Innovations reshaping how we live and work",
  "nature_wildlife_desc": "Earth's ecosystems and remarkable creatures",
  "climate_environment_desc": "Understanding our planet's changing climate",
  "space_cosmos_desc": "Exploring the mysteries beyond Earth",
  "psychology_mind_desc": "How our minds work and why we behave",
  "self_improvement_desc": "Strategies for personal growth and success",
  "business_careers_desc": "Building skills and thriving at work",
  "finance_investing_desc": "Growing wealth and financial literacy",
  "trivia_fun_facts_desc": "Surprising facts about our world",
  "world_travel_desc": "Cultures, places, and global perspectives",
  "arts_culture_desc": "Creativity, expression, and cultural heritage",
  "lifestyle_wellness_desc": "Living healthier and more balanced lives"
}
```

---

## 3. interests - User Interest Selection

**File:** `src/locales/en/interests.json`
**Source:** `src/data/interests.ts`

Same 15 labels as topics (interests map 1:1 to topics):

```json
{
  "science_discovery": "Science & Discovery 🔬",
  "health_medicine": "Health & Medicine ⚕️",
  ...
}
```

---

## 4. generation - AI Article Generation

**File:** `src/locales/en/generation.json`
**Source:** `src/types/generated.ts`, `src/components/addContent/ExpandableLearnCard.tsx`

### Tone Labels & Descriptions
```json
{
  "tone_fact": "Fact",
  "tone_fact_desc": "Clear and educational",
  "tone_story": "Story",
  "tone_story_desc": "Narrative and engaging",
  "tone_analogy": "Analogy",
  "tone_analogy_desc": "Rich in comparisons"
}
```

### Duration Options
```json
{
  "duration_1min": "1 min",
  "duration_2min": "2 min",
  "duration_3min": "3 min",
  "duration_5min": "5 min",
  "duration_10min": "10 min"
}
```

### Portion Options (V2 Menu-Style)
```json
{
  "portion_bite": "Bite",
  "portion_snack": "Snack",
  "portion_meal": "Meal",
  "portion_feast": "Feast",
  "portion_article_singular": "article",
  "portion_articles_plural": "articles",
  "portion_min_suffix": "min"
}
```

### Deprecated Preset Options
```json
{
  "preset_nugget": "Nugget",
  "preset_primer": "Primer",
  "preset_topic": "Topic",
  "preset_deep_dive": "Deep Dive"
}
```

### UI Labels
```json
{
  "flavor_auto": "Auto",
  "portion_label": "Portion",
  "flavor_label": "Flavor",
  "placeholder_topic": "What do you want to learn about?",
  "adjust_duration_tone": "Adjust duration and tone",
  "serve_it_up": "Serve it up",
  "listening": "Listening...",
  "transcribing": "Transcribing..."
}
```

### Accessibility
```json
{
  "a11y_portion_premium": "{{portion}} portion (Premium feature)",
  "a11y_portion_hint_upgrade": "Upgrade to premium to unlock",
  "a11y_portion_hint_select": "Select {{portion}} portion",
  "a11y_flavor_premium": "{{flavor}} flavor (Premium feature)",
  "a11y_flavor_hint_select": "Select {{flavor}} writing style"
}
```

---

## 5. playback - Reading Playback UI

**File:** `src/locales/en/playback.json`

*Note: No playback screen files examined yet - may need additional discovery pass*

---

## 6. quiz - Comprehension Quiz

**File:** `src/locales/en/quiz.json`
**Source:** `src/app/playback-quiz.tsx`

### Quiz Flow
```json
{
  "quiz_title": "Comprehension Quiz",
  "quiz_results": "Results",
  "quiz_only": "Quiz",
  "question_progress": "Question {{current}} of {{total}}",
  "no_quiz_available": "No Quiz Available",
  "no_quiz_desc": "This content does not have quiz questions."
}
```

### Results Screen
```json
{
  "results_complete": "Complete!",
  "results_comprehension": "Comprehension",
  "results_correct_answers": "Correct Answers",
  "results_reading_speed": "Reading Speed",
  "results_done": "Done",
  "results_retake": "Retake Quiz"
}
```

---

## 7. settings - Settings & Profile

**File:** `src/locales/en/settings.json`
**Source:** `src/app/journey-profile.tsx`

### Page Header
```json
{
  "page_title": "Journey & Settings"
}
```

### Theme Section
```json
{
  "section_theme": "Theme",
  "theme_dark": "Dark",
  "theme_midnight": "Midnight",
  "theme_sepia": "Sepia",
  "theme_light": "Light"
}
```

### User Info Section
```json
{
  "section_your_info": "Your Info",
  "label_name": "Name (for certificates)",
  "placeholder_name": "Enter your name"
}
```

### Font Section
```json
{
  "font_system": "System",
  "font_serif": "Serif",
  "font_round": "Round",
  "font_condensed": "Condensed",
  "font_preview": "Preview"
}
```

### Reading Settings
```json
{
  "section_reading": "Reading",
  "paragraph_pause": "Paragraph Pause",
  "paragraph_pause_desc": "Brief pause between paragraphs",
  "move_to_history": "Move to History",
  "move_to_history_desc": "Completed items move to History"
}
```

### Developer Section
```json
{
  "section_developer": "Developer",
  "dev_tools": "Dev Tools"
}
```

---

## 8. subscription - Premium & Paywall

**File:** `src/locales/en/subscription.json`
**Source:** `src/app/journey-profile.tsx`, `src/components/paywall/Paywall.tsx`

### Subscription Status
```json
{
  "section_subscription": "Subscription",
  "status": "Status",
  "status_premium": "Premium",
  "status_free": "Free",
  "max_wpm": "Max WPM",
  "upgrade_to_premium": "Upgrade to Premium",
  "restore_purchases": "Restore Purchases"
}
```

### Paywall
```json
{
  "paywall_title": "Upgrade to Premium",
  "paywall_reason_wpm": "Free tier is limited to {{wpm}} WPM",
  "paywall_reason_generation": "Free tier is limited to 3 AI-generated articles per day",
  "benefit_max_wpm": "Read up to {{wpm}} WPM",
  "benefit_unlimited_generation": "Unlimited AI article generation",
  "benefit_all_topics": "All topics & curriculum",
  "benefit_certificates": "Earn speed certificates",
  "subscribe_now": "Subscribe Now",
  "purchase_failed": "Purchase failed. Please try again.",
  "no_purchases": "No previous purchases found."
}
```

### Restore Alerts
```json
{
  "alert_restored_title": "Restored",
  "alert_restored_message": "Your purchases have been restored successfully.",
  "alert_error_title": "Error",
  "alert_no_purchases_title": "No Purchases"
}
```

---

## 9. content - Content List & Management

**File:** `src/locales/en/content.json`
**Source:** `src/components/contentList/*.tsx`

### Empty State
```json
{
  "empty_title": "No content yet",
  "empty_subtitle": "Add articles, books, or generate learning content to get started with speed reading."
}
```

### Filter Pills
```json
{
  "filter_all": "All",
  "filter_books": "Books",
  "filter_articles": "Articles",
  "filter_learning": "Learning",
  "filter_training": "Training"
}
```

---

## 10. addContent - Add Content Modal

**File:** `src/locales/en/addContent.json`
**Source:** `src/app/add-content.tsx`, `src/components/addContent/*.tsx`

### Main Modal
```json
{
  "page_title": "New Content"
}
```

### Practice Card
```json
{
  "practice_title": "Practice",
  "practice_desc": "Choose from pre-generated content to practice speed reading"
}
```

### Read Card
```json
{
  "read_title": "Read",
  "read_desc": "Speed read your own articles or books from PDFs, EPUBs, or links",
  "read_option_webpage": "A webpage",
  "read_option_text": "Plain Text",
  "read_option_ebook": "Epub & PDF",
  "placeholder_url": "Enter URL (e.g., https://example.com/article)",
  "placeholder_text": "Paste your text here...",
  "save_and_read": "Save & Read"
}
```

### Learn Card
```json
{
  "learn_title": "Learn",
  "learn_desc": "Generate articles on topics you want to master"
}
```

### Import Errors
```json
{
  "import_failed": "Import Failed",
  "error_extract_url": "Could not extract content from URL",
  "error_process_text": "Could not process text",
  "error_extract_content": "Could not extract content",
  "error_pick_document": "Failed to pick document"
}
```

---

## 11. auth - Authentication

**File:** `src/locales/en/auth.json`
**Source:** `src/components/auth/AuthModal.tsx`, `src/app/journey-profile.tsx`

### Sync Section
```json
{
  "section_sync": "Sync Across Devices",
  "sync_signed_in": "Signed In",
  "sync_account_verified": "Account verified",
  "sync_status_ready": "Ready to sync • Data sync coming soon",
  "sync_desc": "Sign in to sync your reading progress, certificates, and settings across all your devices.",
  "sign_in_to_sync": "Sign In to Sync",
  "sign_out": "Sign Out"
}
```

### Auth Modal
```json
{
  "modal_title_sync": "Sync Across Devices",
  "modal_title_email_sent": "Email Sent",
  "continue_with_google": "Continue with Google",
  "label_sign_in_email": "Sign in with email",
  "placeholder_email": "your@email.com",
  "placeholder_password": "Password (min 8 characters)",
  "forgot_password": "Forgot Password?"
}
```

### Email Sent Confirmation
```json
{
  "check_email_title": "Check your email",
  "check_email_reset": "We sent a password reset link to {{email}}. Click the link to reset your password.",
  "check_email_verify": "We sent a verification link to {{email}}. Click the link to confirm your account and sign in."
}
```

### Validation Errors
```json
{
  "error_email_required": "Please enter your email address",
  "error_email_invalid": "Please enter a valid email address",
  "error_password_required": "Please enter your password",
  "error_password_length": "Password must be at least 8 characters long",
  "error_account_not_found": "Account not found. Creating new account...",
  "error_auth_failed": "Authentication failed",
  "error_reset_failed": "Failed to send reset email"
}
```

---

## 12. certificates - Speed Certificates

**File:** `src/locales/en/certificates.json`
**Source:** `src/services/certificateTemplate.ts`

### Certificate Template
```json
{
  "certificate_of_achievement": "Certificate of Achievement",
  "reading_excellence": "Reading Excellence",
  "presented_to": "This certificate is proudly presented to",
  "exceptional_proficiency": "For demonstrating exceptional speed reading proficiency",
  "reading_speed_achieved": "by achieving a reading speed of",
  "date_achieved": "Date Achieved",
  "certificate_id": "Certificate ID",
  "verified_achievement": "Verified Achievement",
  "default_name": "Speed Reader"
}
```

---

## 13. errors - Error Messages

**File:** `src/locales/en/errors.json`

*Note: Most error messages currently in Alert.alert() calls - need additional discovery pass for all error strings*

---

## 14. accessibility - Accessibility Labels

**File:** `src/locales/en/accessibility.json`

### General
```json
{
  "close_button": "Close",
  "back_button": "Go back"
}
```

### Content List FABs
```json
{
  "fab_profile": "Open journey and profile",
  "fab_add_content": "Add new content"
}
```

---

## 15. consumption - Reading/Consumption Mode

**File:** `src/locales/en/consumption.json`

*Note: Reader screens not yet examined - need additional discovery pass*

---

## Discovery Progress

### ✅ Completed Files (Pass 1)
- `src/app/index.tsx`
- `src/app/journey-profile.tsx`
- `src/app/add-content.tsx`
- `src/app/playback-quiz.tsx`
- `src/components/addContent/ExpandableReadCard.tsx`
- `src/components/addContent/ExpandableLearnCard.tsx`
- `src/components/contentList/ContentListScreen.tsx`
- `src/components/contentList/EmptyState.tsx`
- `src/components/contentList/FilterPills.tsx`
- `src/components/paywall/Paywall.tsx`
- `src/components/auth/AuthModal.tsx`
- `src/data/interests.ts`
- `src/data/curriculum/topics.ts`
- `src/types/generated.ts`
- `src/services/certificateTemplate.ts`

### 🔄 Pending Discovery (Additional Passes Required)
- **src/app/playback.tsx** - Main RSVP reader controls
- **src/app/content/[id].tsx** - Imported content reader
- **src/app/article/[id].tsx** - Curriculum article reader
- **src/app/topic/[id].tsx** - Topic article list
- **src/app/generated/[id].tsx** - Generated article reader
- **src/app/curriculum/[id]/*.tsx** - Curriculum reader
- **src/app/history.tsx** - History modal
- **src/components/controls/*.tsx** - Playback controls
- **src/components/quiz/*.tsx** - Quiz components
- **src/components/certifications/*.tsx** - Certificate display
- **src/components/contentList/*.tsx** - Additional list components
- **Dynamic text patterns** - Template literals, conditionals, ternaries
- **Error messages** - console.error, throw Error, Alert.alert
- **Validation messages** - Form validation feedback

### 📊 Estimated Coverage
- **Pass 1 Complete:** ~40% of UI strings
- **Remaining Passes Needed:** 3-4 more comprehensive passes
- **Total Estimated Strings:** 300-400 across all 15 namespaces

---

## Next Steps (M2 Continuation)

1. **Pass 2:** Read all remaining screen files (playback, content readers, history)
2. **Pass 3:** Search for dynamic text patterns (template literals, interpolations)
3. **Pass 4:** Error message comprehensive search (console, throw, Alert)
4. **Pass 5:** Manual verification - launch app and navigate through all screens
5. **Finalize catalog** with exact counts per namespace

---

## Translation Key Naming Convention (M3)

To be defined in next milestone. Preliminary structure:

```
{namespace}.{section}.{key}

Examples:
- common.actions.cancel
- topics.names.science_discovery
- quiz.results.complete
- auth.errors.email_required
```
