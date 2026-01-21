# Translation Project Plan
## Devoro UI - 10 European Languages

**Date:** 2026-01-21
**Source Language:** English (en)
**Target Languages:** Czech (cs), German (de), Dutch (nl), French (fr), Italian (it), Polish (pl), Portuguese (pt), Romanian (ro), Spanish (es), Swedish (sv)
**Total Strings:** 227 across 15 namespaces
**Quality Requirement:** Native speaker, culturally nuanced

---

## ⚡ What Makes This Plan 100% Deterministic

This plan eliminates ALL ambiguity. Every specification is explicit:

**✅ Resolved Ambiguities:**
1. **Character counting method:** Exactly defined (include spaces/punctuation, exclude emojis)
2. **Character balancing calculation:** Exact formula (max spread ≤ 3: `longest - shortest ≤ 3`)
3. **Which keys need balancing:** Explicit list of 3 button groups (12 total keys)
4. **Ampersand handling:** Keep `&` symbol, don't translate to "and"
5. **Numbers in strings:** Keep Arabic numerals unchanged
6. **URLs in placeholders:** Keep as-is (example.com)
7. **JSON formatting:** Exact specs (2-space indent, UTF-8 no BOM, LF line endings)
8. **Emoji preservation:** Keep exact Unicode codepoints
9. **Escalation procedure:** Explicit steps if balancing impossible
10. **Delivery format:** Exact directory structure specified
11. **Stats labels:** Marked as informational only (don't translate)
12. **Priority conflicts:** Natural-sounding beats literal when both valid
13. **Metaphor adaptation:** Keep metaphor domain (food stays food)
14. **Pluralization rules:** Explicit for simple (2 forms) vs complex (4 forms) languages
15. **File encoding:** UTF-8 without BOM, LF endings, 2-space indent, trailing newline

**📖 Reading order:**
1. Read "CRITICAL CLARIFICATIONS" section first (eliminates all ambiguity)
2. Skim "Translation Guidelines" section (DO/DON'T lists)
3. Reference individual namespace sections as you translate each file
4. Check "Quality Checklist" before submitting

---

## 🎯 HOW TO EXECUTE THIS PLAN (MANDATORY WORKFLOW)

**CRITICAL:** Long plans lead to drift when executors don't maintain fidelity. This section defines **mandatory checkpoints** where you MUST re-read critical sections to prevent errors.

### Execution Workflow

#### BEFORE YOU START (ONE-TIME SETUP)
1. **Read this entire "HOW TO EXECUTE" section** to understand the workflow
2. **Read "CRITICAL CLARIFICATIONS" section in full** (lines 89-262) - DO NOT SKIP
3. **Read "Translation Guidelines" section in full** (lines 263-420)
4. **Create a checklist document** to track progress (150 files total)

#### FOR EACH LANGUAGE (10 iterations: cs, de, nl, fr, it, pl, pt, ro, es, sv)

**CHECKPOINT 1 - Before starting each new language:**
- [ ] **RE-READ: "CRITICAL CLARIFICATIONS" section** (all of it, every time)
- [ ] **RE-READ: Character balancing section** (lines 105-142)
- [ ] **RE-READ: Pluralization rules for this language** (lines 175-198)
  - Simple languages (de, nl, fr, it, pt, es, sv): 2 forms (_one, _other)
  - Complex languages (cs, pl, ro): 4 forms (_one, _few, _many, _other)
- [ ] Create directory: `src/locales/{language_code}/`

**FOR EACH NAMESPACE within the language (15 iterations per language):**

**CHECKPOINT 2 - Before starting each namespace:**
- [ ] **RE-READ the specific namespace section** in this plan (e.g., "Namespace 1: common" section)
- [ ] **Note the tone** (playful/formal/technical) specified for this namespace
- [ ] **Note which keys** (if any) require character balancing
- [ ] Create blank JSON file: `src/locales/{language_code}/{namespace}.json`

**CHECKPOINT 3 - While translating:**
- [ ] For EVERY string with `{{variables}}`: **PRESERVE variable names exactly** (e.g., `{{wpm}}` stays `{{wpm}}`)
- [ ] For EVERY plural form: **Use correct suffix** (_one, _other) or (_one, _few, _many, _other)
- [ ] For ALL emojis: **KEEP EXACT UNICODE** - don't change, don't remove
- [ ] For topic names with `&`: **KEEP THE AMPERSAND** - don't translate to "and"
- [ ] For numbers (1 min, 2 min, etc.): **KEEP ARABIC NUMERALS** - don't spell out or translate
- [ ] For "Devoro": **NEVER TRANSLATE** - it's the brand name

**CHECKPOINT 4 - After completing each namespace file:**
- [ ] **Validate JSON syntax:** Open file in code editor or use `python -m json.tool {file}` to check
- [ ] **Check file encoding:** Ensure UTF-8 without BOM (check file properties or use `file {filename}`)
- [ ] **Check line endings:** Ensure LF (Unix), not CRLF (Windows)
- [ ] **Check indentation:** Ensure exactly 2 spaces (not tabs, not 4 spaces)
- [ ] **Check final newline:** File should end with one blank line
- [ ] **If this namespace has character-balanced button groups:**
  - [ ] **RE-READ: Character balancing calculation** (lines 105-123)
  - [ ] **Calculate spread** for each button group: `(longest - shortest) ≤ 3`
  - [ ] **If spread > 3:** Follow escalation procedure (lines 143-174)

**CHECKPOINT 5 - After completing all 15 namespaces for a language:**
- [ ] **Run validation:** Compare all translation keys against English source
  - Every key in English MUST exist in target language
  - No extra keys in target language
  - All `{{variable}}` names match exactly
- [ ] **Character balancing final check:**
  - [ ] Re-verify Portion buttons (Bite, Snack, Meal, Feast)
  - [ ] Re-verify Flavor buttons (Fact, Story, Analogy)
  - [ ] Re-verify Theme buttons (dark, midnight, sepia, light)
  - All 3 groups MUST have spread ≤ 3 characters

#### AFTER COMPLETING ALL 10 LANGUAGES (FINAL VALIDATION)

**CHECKPOINT 6 - Before delivery:**
- [ ] **Validate all 150 files exist:** 15 namespaces × 10 languages = 150 files
- [ ] **RE-READ: Quality Checklist section** (lines 1014-1050)
- [ ] **Verify file encoding across ALL files:** UTF-8 without BOM, LF line endings
- [ ] **Spot-check 5 random files** from different languages for JSON validity
- [ ] **Final character balancing audit:** Sample 3 languages, verify all 3 button groups comply
- [ ] Package files in exact directory structure specified

### Execution Time Estimates (for planning purposes only)

**Per file:** 15-30 minutes (depending on namespace size)
**Per language:** 4-8 hours (15 files)
**Total project:** 40-80 hours (10 languages)

**These are estimates only. Quality takes priority over speed.**

### If You Get Stuck

**Character balancing impossible:**
1. RE-READ the escalation procedure (lines 143-174)
2. Try shorter synonyms (prefer concise over wordy)
3. Consider abbreviations if culturally appropriate
4. If truly impossible: Document in a `BALANCING_ISSUES.md` file with explanation

**Unclear context:**
1. RE-READ the namespace-specific section for that string
2. Check the inline comment next to the string in this plan
3. If still unclear: Note in `TRANSLATION_QUESTIONS.md` and translate literally

**Technical issues (encoding, JSON, etc.):**
1. RE-READ the JSON formatting section (lines 199-207)
2. Use validation tools: `python -m json.tool`, `jq`, or online JSON validators
3. Check file encoding with `file` command or editor properties

---

## Project Scope

### Input Files
**Source files:** All 15 English JSON files will be provided in the `src/locales/en/` directory.

(Note: Exact file paths depend on your environment. Files are located relative to project root at `src/locales/en/`)

15 JSON namespace files:
1. common.json (13 strings)
2. topics.json (30 strings)
3. interests.json (15 strings)
4. generation.json (35 strings)
5. quiz.json (12 strings)
6. settings.json (21 strings)
7. content.json (7 strings)
8. addContent.json (17 strings)
9. auth.json (24 strings)
10. subscription.json (21 strings)
11. certificates.json (9 strings)
12. playback.json (8 strings)
13. consumption.json (3 strings)
14. errors.json (6 strings)
15. accessibility.json (6 strings)

### Output Requirements
**Total files to create:** 150 (15 namespaces × 10 languages)

**Directory structure:**
```
src/locales/
├── cs/  (Czech)
│   ├── common.json
│   ├── topics.json
│   └── ... (all 15 files)
├── de/  (German)
│   ├── common.json
│   └── ... (all 15 files)
├── nl/  (Dutch)
├── fr/  (French)
├── it/  (Italian)
├── pl/  (Polish)
├── pt/  (Portuguese)
├── ro/  (Romanian)
├── es/  (Spanish)
└── sv/  (Swedish)
```

---

## CRITICAL CLARIFICATIONS - READ FIRST

These specifications eliminate all ambiguity. Follow them exactly.

### Character Counting Method
**How to count characters for button balancing:**
- ✅ Count ALL visible characters including letters, numbers, spaces, punctuation
- ❌ DO NOT count emojis (they must stay unchanged anyway)
- ❌ DO NOT count JSON quotes or commas

**Examples:**
- "Bite" = 4 characters
- "1 min" = 5 characters (includes space)
- "Science & Discovery" = 21 characters (excluding emoji 🔬)
- "Loading..." = 10 characters (includes dots)

### Character Balancing Calculation
**"±3 character deviation" means:**

**Maximum spread ≤ 3 characters**

Calculate as: `(longest string) - (shortest string) ≤ 3`

**Example 1 - ACCEPTABLE:**
- Bite = 4 chars
- Snack = 5 chars
- Meal = 4 chars
- Feast = 5 chars
- Spread = 5 - 4 = 1 char ✅ ACCEPTABLE

**Example 2 - ACCEPTABLE:**
- Dark = 4 chars
- Mitternacht = 11 chars → use shorter synonym "Nacht" = 5 chars
- Sepia = 5 chars
- Light = 5 chars
- Spread = 5 - 4 = 1 char ✅ ACCEPTABLE

**Example 3 - NOT ACCEPTABLE:**
- Bite = 4 chars
- Snack = 5 chars
- Mahlzeit = 8 chars
- Feast = 5 chars
- Spread = 8 - 4 = 4 chars ❌ EXCEEDS LIMIT (use shorter synonym for "Mahlzeit")

### Character-Balanced Button Groups
**Exactly 3 button groups must have balanced characters (max spread ≤ 3 chars):**

**Group 1 - Portion Buttons (generation.json):**
```json
{
  "portions": {
    "bite": "...",    // MUST balance with group
    "snack": "...",   // MUST balance with group
    "meal": "...",    // MUST balance with group
    "feast": "..."    // MUST balance with group
  }
}
```

**Group 2 - Flavor Buttons (generation.json):**
```json
{
  "tones": {
    "auto": "...",    // MUST balance with group
    "fact": "...",    // MUST balance with group
    "story": "...",   // MUST balance with group
    "analogy": "..." // MUST balance with group
  }
}
```

**Group 3 - Theme Buttons (settings.json):**
```json
{
  "themes": {
    "dark": "...",     // MUST balance with group
    "midnight": "...", // MUST balance with group
    "sepia": "...",    // MUST balance with group
    "light": "..."     // MUST balance with group
  }
}
```

**All other strings:** No character constraints. Translate naturally.

### Ampersand (&) in Topic Names
**KEEP the ampersand `&` symbol in all topic names.**

Do NOT translate "&" to your language's word for "and".

**Correct:**
- English: "Science & Discovery 🔬"
- German: "Wissenschaft & Entdeckung 🔬" (keep &)
- French: "Science & Découverte 🔬" (keep &)

**Incorrect:**
- German: "Wissenschaft und Entdeckung 🔬" ❌
- French: "Science et Découverte 🔬" ❌

### Numbers and URLs
**Numbers:**
- Keep Arabic numerals unchanged: 1, 2, 3, 5, 10
- Do NOT localize number format
- Example: "1 min" stays "1 min" (not "1,0 min" or "ein Minute")

**URLs in placeholders:**
- Keep example URLs unchanged: `https://example.com/article`
- Do NOT change to example.de, example.fr, etc.

### JSON Formatting Requirements
**All JSON files MUST use this exact formatting:**
- **Indentation:** 2 spaces (not tabs, not 4 spaces)
- **Encoding:** UTF-8 **without BOM** (Byte Order Mark)
- **Line endings:** LF (Unix-style `\n`, not Windows CRLF `\r\n`)
- **Final newline:** Include one blank line at end of file
- **No trailing commas:** JSON spec forbids trailing commas
- **Key order:** Preserve the exact order of keys from English source files (don't alphabetize)
- **Line wrapping:** Keep string values on single lines (don't word-wrap even if long)

**Example of correct formatting:**
```json
{
  "app_name": "Devoro",
  "loading": "Chargement...",
  "actions": {
    "cancel": "Annuler",
    "done": "Terminé"
  }
}
[blank line here]
```

### Escalation for Impossible Balancing
**If character balancing within ±3 is genuinely impossible:**

1. Try ALL synonyms and natural variations in your language
2. If still impossible, use your best effort translations
3. Flag the button group in a separate file: `REVIEW-NEEDED.md`
4. In that file, note:
   - Language code
   - Namespace and keys
   - Your translations with character counts
   - Why balancing is impossible
   - Alternative options considered
5. DO NOT leave strings untranslated or use English placeholders
6. Proceed with other files

**Example escalation note:**
```
Language: German (de)
Issue: settings.json - themes group
Translations:
- dark: "Dunkel" (6 chars)
- midnight: "Mitternacht" (11 chars) - no shorter synonym exists
- sepia: "Sepia" (5 chars)
- light: "Hell" (4 chars)
Spread: 11 - 4 = 7 chars (exceeds ±3 limit)
Attempted alternatives: "Nacht", "Schwarz", "Tief" - all lose meaning
```

### Delivery Format
**Submit as .zip archive or Git repository with this exact structure:**

```
devoro-translations.zip (or git repo)
└── src/
    └── locales/
        ├── cs/
        │   ├── accessibility.json
        │   ├── addContent.json
        │   └── ... (all 15 files)
        ├── de/
        ├── nl/
        ├── fr/
        ├── it/
        ├── pl/
        ├── pt/
        ├── ro/
        ├── es/
        └── sv/
```

**If any files need review:** Include `REVIEW-NEEDED.md` in the root.

### Stats Labels - INFORMATIONAL ONLY
**Lines 699-718 describe future strings NOT in current translation files.**

- "Devoured", "Retention", "Words", "Best WPM" are for future reference
- **DO NOT create** additional keys for these
- **DO NOT translate** these now
- This section helps you understand app context only

### Priority When Values Conflict
**If "natural-sounding" conflicts with "literal accuracy":**

1. ✅ **Prioritize natural language** that native speakers actually use
2. Adapt metaphors to cultural context if needed (but keep food theme for food metaphors)
3. Only use literal translation if the natural version completely changes meaning
4. For technical terms with no native equivalent (like "WPM"), keep English

**Example:**
- "Serve it up" (food metaphor for "generate")
- If your language doesn't use "serve" in this context, use equivalent food/cooking metaphor
- DON'T switch to non-food metaphor
- Maintain playful, energetic tone

---

## Translation Guidelines

### DO:
✅ Translate all string VALUES while preserving JSON structure
✅ Maintain natural, culturally nuanced language - sound like a native speaker
✅ When multiple equally valid translations exist, **prefer the shorter word** (within target language's natural vocabulary - don't sacrifice meaning for brevity)
✅ Preserve tone and energy of original (playful vs formal vs technical)
✅ Keep emojis exactly as-is (same Unicode codepoints - don't substitute similar emoji)
✅ Adapt phrasal structures to sound natural in target language
✅ Use culturally appropriate metaphors when direct translation feels awkward (but maintain metaphor domain: food metaphors stay food-themed)

### DON'T:
❌ Translate JSON keys (only translate values)
❌ Translate the brand name "Devoro"
❌ Translate interpolation variables like `{{wpm}}`, `{{email}}`, `{{count}}`
❌ Remove or modify curly braces `{{}}` around variables
❌ Change file structure or add/remove keys
❌ Translate technical terms: "WPM" stays as "WPM"
❌ Remove emojis or change emoji characters

---

## CRITICAL: Character Length Balancing

**⚠️ See "CRITICAL CLARIFICATIONS" section above for complete balancing rules.**

**Quick summary:** Three button groups MUST have balanced character lengths.

**Calculation:** Maximum spread ≤ 3 characters (longest - shortest ≤ 3)

**Character counting:** Include ALL visible characters (letters, numbers, spaces, punctuation). Exclude emojis.

### 1. Portion Buttons (generation.json)
**English reference lengths:**
- `portions.bite`: "Bite" (4 chars)
- `portions.snack`: "Snack" (5 chars)
- `portions.meal`: "Meal" (4 chars)
- `portions.feast`: "Feast" (5 chars)
- **English spread:** 5 - 4 = 1 char ✅

**Your translation requirement:** All 4 translations must have max spread ≤ 3 chars.

**Context:** Horizontal button group for content size selection. Visual balance critical.

**Strategy:** Use short, punchy food metaphor words. If one word is long, find shorter synonyms for all to maintain balance.

### 2. Flavor Buttons (generation.json)
**English reference lengths:**
- `tones.auto`: "Auto" (4 chars)
- `tones.fact`: "Fact" (4 chars)
- `tones.story`: "Story" (5 chars)
- `tones.analogy`: "Analogy" (7 chars)
- **English spread:** 7 - 4 = 3 chars ✅

**Your translation requirement:** All 4 translations must have max spread ≤ 3 chars.

**Context:** Horizontal button group for writing style selection.

**Strategy:** If "analogy" equivalent is very long, consider abbreviation or shorter synonym that maintains meaning.

### 3. Theme Buttons (settings.json)
**English reference lengths:**
- `themes.dark`: "Dark" (4 chars)
- `themes.midnight`: "Midnight" (8 chars)
- `themes.sepia`: "Sepia" (5 chars)
- `themes.light`: "Light" (5 chars)
- **English spread:** 8 - 4 = 4 chars ❌ (English exceeds limit but is acceptable)

**Your translation requirement:** All 4 translations must have max spread ≤ 3 chars.

**Context:** Theme selection buttons.

**Strategy:** Find shorter synonym for "Midnight" (e.g., German "Nacht" instead of "Mitternacht"). "Sepia" can often stay as-is (international term).

**If balancing is impossible:** Follow escalation procedure in CRITICAL CLARIFICATIONS section (create REVIEW-NEEDED.md).

---

## Interpolation & Variables

### Syntax
Variables use double curly braces: `{{variableName}}`

**Examples:**
```json
"question_progress": "Question {{current}} of {{total}}"
"reason_wpm": "Free tier is limited to {{wpm}} WPM"
"check_email_verify": "We sent a verification link to {{email}}."
```

### Rules
- **Never translate variable names**: `{{email}}` stays as `{{email}}` in all languages
- **Preserve curly braces**: `{{` and `}}` must remain
- **Rearrange sentence** structure as needed for natural grammar, but keep variables intact

### Common Variables
- `{{count}}` - numeric count
- `{{current}}`, `{{total}}` - position indicators
- `{{wpm}}` - words per minute (technical term, don't translate)
- `{{email}}` - email address
- `{{name}}` - user's name
- `{{portion}}`, `{{flavor}}` - option names
- `{{min}}`, `{{max}}` - min/max values

**Translation Example:**
```json
// English
"question_progress": "Question {{current}} of {{total}}"

// German (grammar requires different word order)
"question_progress": "Frage {{current}} von {{total}}"

// French (also different structure)
"question_progress": "Question {{current}} sur {{total}}"
```

---

## Pluralization

i18next uses language-specific plural rules. Different languages need different plural forms.

### Simple Languages (en, de, nl, fr, it, es, sv, pt)
Use two forms: `_one` (singular) and `_other` (plural)

**English example:**
```json
{
  "article_one": "{{count}} article",
  "article_other": "{{count}} articles"
}
```

**German translation:**
```json
{
  "article_one": "{{count}} Artikel",
  "article_other": "{{count}} Artikel"
}
```
(Note: German "Artikel" is same for both - that's correct!)

### Complex Languages (cs, pl, ro)
Require 3-4 forms: `_one`, `_few`, `_many`, `_other`

**Czech example:**
```json
{
  "article_one": "{{count}} článek",      // 1
  "article_few": "{{count}} články",      // 2-4
  "article_many": "{{count}} článku",     // 0.x decimals
  "article_other": "{{count}} článků"     // 5+
}
```

**Polish example:**
```json
{
  "article_one": "{{count}} artykuł",     // 1
  "article_few": "{{count}} artykuły",    // 2-4, 22-24, 32-34...
  "article_many": "{{count}} artykułu",   // 0.x decimals
  "article_other": "{{count}} artykułów"  // 5-21, 25-31...
}
```

**Romanian example:**
```json
{
  "article_one": "{{count}} articol",     // 1
  "article_few": "{{count}} articole",    // 2-19
  "article_other": "{{count}} de articole" // 0, 20+
}
```

### Plural Forms in This Project
Only found in `generation.json`:
- `article_one` / `article_other`

**For cs, pl, ro:** You MUST add `_few` and `_many` forms following your language's plural rules.

---

## Tone & Context Guide

Different parts of the app have different tones. Maintain these in translations:

### Playful / Energetic
- **"Devoured"** (stats label for "articles read") - Keep playful energy, not literal "consumed"
- **"Serve it up"** (generation button) - Food metaphor for "generate content", use culturally appropriate playful equivalent
- **Portion names** (Bite, Snack, Meal, Feast) - Food metaphor for content size, maintain playfulness

### Friendly / Encouraging
- Empty state messages - "No content yet" + helpful guidance
- Error messages - Clear but not harsh
- Onboarding text - Welcoming tone

### Formal / Ceremonial
- Certificate template text - "Certificate of Achievement", "Reading Excellence", "Presented to" - Use formal register appropriate for official documents

### Technical / Precise
- Settings labels - Clear, concise
- Quiz interface - Straightforward
- Playback controls - Functional

### Professional / Marketing
- Paywall benefits - Persuasive but not pushy
- Feature descriptions - Clear value propositions

---

## Source Strings with Context

### 1. common.json (13 strings)
**Purpose:** App-wide shared UI elements

```json
{
  "app_name": "Devoro",  // NEVER TRANSLATE - brand name
  "loading": "Loading...",  // Generic loading indicator
  "not_available": "Not available",  // When data/feature is unavailable
  "actions": {
    "cancel": "Cancel",  // Button to cancel action
    "confirm": "Confirm",  // Button to confirm action
    "close": "Close",  // Button to close modal/screen
    "done": "Done",  // Button when task completed
    "continue": "Continue",  // Button to proceed
    "get_started": "Get Started",  // CTA button for empty states
    "import": "Import",  // Button to import content
    "save_and_read": "Save & Read"  // Button to save content and start reading
  },
  "or": "or",  // Conjunction between options (e.g., "Sign in with Google OR email")
  "wpm_suffix": "WPM"  // NEVER TRANSLATE - technical abbreviation "Words Per Minute"
}
```

---

### 2. topics.json (30 strings)
**Purpose:** Curriculum topic names and descriptions

**Context:** 15 learning topics with emoji icons + short descriptions. Keep emojis identical.

```json
{
  "science_discovery": "Science & Discovery 🔬",  // Keep emoji
  "science_discovery_desc": "Breakthrough discoveries that changed our world",

  "health_medicine": "Health & Medicine ⚕️",  // Keep emoji
  "health_medicine_desc": "Advances in healthcare and medical breakthroughs",

  "history_civilization": "History & Civilization 🏛️",  // Keep emoji
  "history_civilization_desc": "Pivotal moments that shaped human history",

  "technology_internet": "Technology & Internet 💻",  // Keep emoji
  "technology_internet_desc": "Innovations reshaping how we live and work",

  "nature_wildlife": "Nature & Wildlife 🌿",  // Keep emoji
  "nature_wildlife_desc": "Earth's ecosystems and remarkable creatures",

  "climate_environment": "Climate & Environment 🌍",  // Keep emoji
  "climate_environment_desc": "Understanding our planet's changing climate",

  "space_cosmos": "Space & Cosmos 🌌",  // Keep emoji
  "space_cosmos_desc": "Exploring the mysteries beyond Earth",

  "psychology_mind": "Psychology & Mind 🧠",  // Keep emoji
  "psychology_mind_desc": "How our minds work and why we behave",

  "self_improvement": "Self-Improvement ✨",  // Keep emoji
  "self_improvement_desc": "Strategies for personal growth and success",

  "business_careers": "Business & Careers 💼",  // Keep emoji
  "business_careers_desc": "Building skills and thriving at work",

  "finance_investing": "Finance & Investing 📈",  // Keep emoji
  "finance_investing_desc": "Growing wealth and financial literacy",

  "trivia_fun_facts": "Trivia & Fun Facts 🎯",  // Keep emoji
  "trivia_fun_facts_desc": "Surprising facts about our world",

  "world_travel": "World & Travel ✈️",  // Keep emoji
  "world_travel_desc": "Cultures, places, and global perspectives",

  "arts_culture": "Arts & Culture 🎭",  // Keep emoji
  "arts_culture_desc": "Creativity, expression, and cultural heritage",

  "lifestyle_wellness": "Lifestyle & Wellness 🌸",  // Keep emoji
  "lifestyle_wellness_desc": "Living healthier and more balanced lives"
}
```

---

### 3. interests.json (15 strings)
**Purpose:** User interest category labels (identical to topic names)

**Context:** User selects interests during onboarding. Same labels as topics, keep emojis.

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

---

### 4. generation.json (35 strings)
**Purpose:** AI article generation interface

**Context:** Users generate learning articles with customizable tone, duration, portion size.

**⚠️ CRITICAL:** Portion and Flavor buttons MUST be character-balanced (±3 chars)!

```json
{
  "tones": {
    "fact": "Fact",  // ⚠️ BALANCE WITH OTHER FLAVORS - Writing style: informative
    "fact_desc": "Clear and educational",  // Description of Fact tone
    "story": "Story",  // ⚠️ BALANCE - Writing style: narrative
    "story_desc": "Narrative and engaging",  // Description of Story tone
    "analogy": "Analogy",  // ⚠️ BALANCE - Writing style: comparative
    "analogy_desc": "Rich in comparisons",  // Description of Analogy tone
    "auto": "Auto"  // ⚠️ BALANCE - System picks tone automatically
  },
  "durations": {
    "1min": "1 min",  // Reading duration option
    "2min": "2 min",  // Reading duration option
    "3min": "3 min",  // Reading duration option
    "5min": "5 min",  // Reading duration option
    "10min": "10 min"  // Reading duration option
  },
  "portions": {
    "bite": "Bite",  // ⚠️ BALANCE WITH OTHER PORTIONS - Smallest content size (food metaphor)
    "snack": "Snack",  // ⚠️ BALANCE - Small content size
    "meal": "Meal",  // ⚠️ BALANCE - Medium content size
    "feast": "Feast"  // ⚠️ BALANCE - Large content size
  },
  "labels": {
    "portion": "Portion",  // Label for portion selection
    "flavor": "Flavor",  // Label for tone/flavor selection
    "auto": "Auto"  // Short label for automatic selection
  },
  "placeholders": {
    "topic": "What do you want to learn about?"  // Text input placeholder for topic entry
  },
  "actions": {
    "serve_it_up": "Serve it up",  // Generate button - playful food metaphor for "generate article"
    "listening": "Listening...",  // Voice input active state
    "transcribing": "Transcribing...",  // Converting voice to text state
    "adjust_duration_tone": "Adjust duration and tone"  // Expandable section label
  },
  "a11y": {
    "portion_premium": "{{portion}} portion (Premium feature)",  // Accessibility label for locked portions
    "portion_hint_upgrade": "Upgrade to premium to unlock",  // Accessibility hint for locked features
    "portion_hint_select": "Select {{portion}} portion",  // Accessibility hint for selecting portion
    "flavor_premium": "{{flavor}} flavor (Premium feature)",  // Accessibility label for locked flavors
    "flavor_hint_select": "Select {{flavor}} writing style"  // Accessibility hint for flavor selection
  },
  "article_one": "{{count}} article",  // Singular form with count
  "article_other": "{{count}} articles",  // Plural form with count
  "min_suffix": "min"  // Abbreviation for "minutes"
}
```

**For cs, pl, ro:** Add `article_few` and `article_many` forms per your plural rules!

---

### 5. quiz.json (12 strings)
**Purpose:** Comprehension quiz after reading

**Context:** Multiple choice questions to test reading comprehension.

```json
{
  "quiz_title": "Comprehension Quiz",  // Modal header during quiz
  "quiz_results": "Results",  // Modal header when showing results
  "quiz_only": "Quiz",  // Shorter header variant
  "question_progress": "Question {{current}} of {{total}}",  // Progress indicator "Question 2 of 5"
  "no_quiz_available": "No Quiz Available",  // Empty state title
  "no_quiz_desc": "This content does not have quiz questions.",  // Empty state description
  "results_complete": "Complete!",  // Results screen title
  "results_comprehension": "Comprehension",  // Label for comprehension score
  "results_correct_answers": "Correct Answers",  // Label for # correct answers
  "results_reading_speed": "Reading Speed",  // Label for WPM metric
  "results_done": "Done",  // Button to close results
  "results_retake": "Retake Quiz"  // Button to restart quiz
}
```

---

### 6. settings.json (21 strings)
**Purpose:** Settings and profile screen

**Context:** User preferences, theme selection, font selection, reading settings.

**⚠️ CRITICAL:** Theme names MUST be character-balanced (±3 chars)!

```json
{
  "page_title": "Journey & Settings",  // Screen title
  "section_theme": "Theme",  // Section header for theme selection
  "themes": {
    "dark": "Dark",  // ⚠️ BALANCE WITH OTHER THEMES - Default dark theme
    "midnight": "Midnight",  // ⚠️ BALANCE - Darker variant
    "sepia": "Sepia",  // ⚠️ BALANCE - Warm beige theme
    "light": "Light"  // ⚠️ BALANCE - Light mode
  },
  "section_your_info": "Your Info",  // Section header for user profile
  "label_name": "Name (for certificates)",  // Label for name input field
  "placeholder_name": "Enter your name",  // Placeholder text for name input
  "section_fonts": "Fonts",  // Section header for font selection
  "fonts": {
    "system": "System",  // System default font
    "serif": "Serif",  // Serif font (Lora)
    "round": "Round",  // Rounded font (Inter)
    "condensed": "Condensed"  // Condensed font (Reddit Sans)
  },
  "font_preview": "Preview",  // Label for font preview text
  "section_reading": "Reading",  // Section header for reading preferences
  "paragraph_pause": "Paragraph Pause",  // Toggle label
  "paragraph_pause_desc": "Brief pause between paragraphs",  // Toggle description
  "move_to_history": "Move to History",  // Toggle label
  "move_to_history_desc": "Completed items move to History",  // Toggle description
  "section_developer": "Developer",  // Section header for dev tools
  "dev_tools": "Dev Tools"  // Button label for developer tools
}
```

---

### 7. content.json (7 strings)
**Purpose:** Content list screen

**Context:** Main screen showing user's reading library with filter pills.

```json
{
  "empty_title": "No content yet",  // Empty state title - friendly tone
  "empty_subtitle": "Add articles, books, or generate learning content to get started with speed reading.",  // Empty state description - encouraging
  "filter_all": "All",  // Filter pill for showing all content
  "filter_books": "Books",  // Filter pill for books only
  "filter_articles": "Articles",  // Filter pill for articles only
  "filter_learning": "Learning",  // Filter pill for learning content only
  "filter_training": "Training"  // Filter pill for training content only
}
```

---

### 8. addContent.json (17 strings)
**Purpose:** Add content modal

**Context:** Modal with 3 expandable cards: Practice (pre-made), Read (import), Learn (generate).

```json
{
  "page_title": "New Content",  // Modal header
  "practice_title": "Practice",  // Card 1 title
  "practice_desc": "Choose from pre-generated content to practice speed reading",  // Card 1 description
  "read_title": "Read",  // Card 2 title
  "read_desc": "Speed read your own articles or books from PDFs, EPUBs, or links",  // Card 2 description
  "read_option_webpage": "A webpage",  // Option: import from URL
  "read_option_text": "Plain Text",  // Option: paste text directly
  "read_option_ebook": "Epub & PDF",  // Option: upload file
  "placeholder_url": "Enter URL (e.g., https://example.com/article)",  // URL input placeholder
  "placeholder_text": "Paste your text here...",  // Text area placeholder
  "learn_title": "Learn",  // Card 3 title
  "learn_desc": "Generate articles on topics you want to master",  // Card 3 description
  "import_failed": "Import Failed",  // Alert title for import errors
  "error_extract_url": "Could not extract content from URL",  // URL extraction error
  "error_process_text": "Could not process text",  // Text processing error
  "error_extract_content": "Could not extract content",  // Generic extraction error
  "error_pick_document": "Failed to pick document"  // File picker error
}
```

---

### 9. auth.json (24 strings)
**Purpose:** Authentication and sync

**Context:** Modal for signing in with Google or email/password, email verification flow.

```json
{
  "section_sync": "Sync Across Devices",  // Settings section header
  "sync_signed_in": "Signed In",  // Status indicator
  "sync_account_verified": "Account verified",  // Status text when email verified
  "sync_status_ready": "Ready to sync • Data sync coming soon",  // Status with feature note
  "sync_desc": "Sign in to sync your reading progress, certificates, and settings across all your devices.",  // Feature description
  "sign_in_to_sync": "Sign In to Sync",  // Button to open auth modal
  "sign_out": "Sign Out",  // Button to sign out
  "modal_title_sync": "Sync Across Devices",  // Modal header default state
  "modal_title_email_sent": "Email Sent",  // Modal header after email sent
  "continue_with_google": "Continue with Google",  // Google sign-in button
  "label_sign_in_email": "Sign in with email",  // Section label for email auth
  "placeholder_email": "your@email.com",  // Email input placeholder
  "placeholder_password": "Password (min 8 characters)",  // Password input placeholder
  "forgot_password": "Forgot Password?",  // Link to password reset
  "check_email_title": "Check your email",  // Confirmation screen title
  "check_email_reset": "We sent a password reset link to {{email}}. Click the link to reset your password.",  // Password reset confirmation
  "check_email_verify": "We sent a verification link to {{email}}. Click the link to confirm your account and sign in.",  // Email verification confirmation
  "error_email_required": "Please enter your email address",  // Validation error
  "error_email_invalid": "Please enter a valid email address",  // Validation error
  "error_password_required": "Please enter your password",  // Validation error
  "error_password_length": "Password must be at least 8 characters long",  // Validation error
  "error_account_not_found": "Account not found. Creating new account...",  // Auto-signup message
  "error_auth_failed": "Authentication failed",  // Generic auth error
  "error_reset_failed": "Failed to send reset email"  // Password reset error
}
```

---

### 10. subscription.json (21 strings)
**Purpose:** Premium subscription and paywall

**Context:** Paywall modal promoting premium features, subscription status display.

```json
{
  "section_subscription": "Subscription",  // Settings section header
  "status": "Status",  // Label for subscription status
  "status_premium": "Premium",  // Status value when premium
  "status_free": "Free",  // Status value when free tier
  "max_wpm": "Max WPM",  // Label for WPM limit
  "upgrade_to_premium": "Upgrade to Premium",  // Button text
  "restore_purchases": "Restore Purchases",  // Button text
  "paywall_title": "Upgrade to Premium",  // Paywall modal header
  "paywall_reason_wpm": "Free tier is limited to {{wpm}} WPM",  // Reason shown when WPM limit hit
  "paywall_reason_generation": "Free tier is limited to 3 AI-generated articles per day",  // Reason for generation limit
  "benefit_max_wpm": "Read up to {{wpm}} WPM",  // Premium benefit
  "benefit_unlimited_generation": "Unlimited AI article generation",  // Premium benefit
  "benefit_all_topics": "All topics & curriculum",  // Premium benefit
  "benefit_certificates": "Earn speed certificates",  // Premium benefit
  "subscribe_now": "Subscribe Now",  // Purchase button
  "purchase_failed": "Purchase failed. Please try again.",  // Error message
  "no_purchases": "No previous purchases found.",  // Restore error message
  "alert_restored_title": "Restored",  // Alert title for successful restore
  "alert_restored_message": "Your purchases have been restored successfully.",  // Alert message
  "alert_error_title": "Error",  // Generic error alert title
  "alert_no_purchases_title": "No Purchases"  // Alert title when no purchases to restore
}
```

---

### 11. certificates.json (9 strings)
**Purpose:** Speed reading achievement certificates

**Context:** Formal certificate template text - use ceremonial/official tone.

```json
{
  "template_title": "Certificate of Achievement",  // Certificate main title - formal
  "template_subtitle": "Reading Excellence",  // Certificate subtitle - formal
  "presented_to": "This certificate is proudly presented to",  // Formal presentation text
  "exceptional_proficiency": "For demonstrating exceptional speed reading proficiency",  // Achievement description - formal
  "reading_speed_achieved": "by achieving a reading speed of",  // Lead-in to WPM metric
  "date_achieved": "Date Achieved",  // Label for achievement date
  "certificate_id": "Certificate ID",  // Label for unique ID
  "verified_achievement": "Verified Achievement",  // Footer badge text
  "default_name": "Speed Reader"  // Placeholder when user hasn't entered name
}
```

---

### 12. playback.json (8 strings)
**Purpose:** RSVP playback screen

**Context:** Reading interface with word-by-word display and results screen.

```json
{
  "default_title": "Reading",  // Screen title when no content title available
  "empty_content_not_found": "Content Not Found",  // Error state title
  "empty_content_not_loaded": "The requested content could not be loaded.",  // Error state description
  "results_complete": "Complete!",  // Results screen title (no quiz)
  "results_reading_speed": "Reading Speed",  // Label for WPM metric
  "results_words_read": "Words Read",  // Label for word count
  "results_read_again": "Read Again",  // Button to restart reading
  "controls_play": "Play"  // Accessibility label for play button
}
```

---

### 13. consumption.json (3 strings)
**Purpose:** Content consumption/import

**Context:** Minimal - needs more discovery in future.

```json
{
  "import_url": "Import from URL",  // Option label
  "import_text": "Import text",  // Option label
  "import_file": "Import file"  // Option label
}
```

---

### 14. errors.json (6 strings)
**Purpose:** Centralized error messages

**Context:** Generic error handling - needs more discovery in future.

```json
{
  "network_timeout": "Network request timed out",  // Network error
  "network_error": "Network error occurred",  // Generic network error
  "validation_required": "This field is required",  // Form validation
  "validation_invalid": "Invalid value",  // Form validation
  "generic_error": "An error occurred",  // Fallback error
  "try_again": "Please try again"  // Generic retry message
}
```

---

### 15. accessibility.json (6 strings)
**Purpose:** Accessibility labels and hints

**Context:** Screen reader labels for navigation elements.

```json
{
  "close": "Close",  // Close button label
  "back": "Go back",  // Back button label
  "fab_profile": "Open journey and profile",  // FAB button hint (bottom-right)
  "fab_add_content": "Add new content",  // FAB button hint
  "nav_home": "Home screen",  // Navigation hint
  "nav_settings": "Settings screen"  // Navigation hint
}
```

---

## Special Translation Notes

### Stats Labels (Not Yet in Translation Files)
**Context:** Journey stats summary displayed prominently

- **"Devoured"** - Creative label for "articles read". Current English uses playful food metaphor. Translate to maintain playful/energetic tone, NOT literal "consumed" or "eaten". Consider words meaning "completed with enthusiasm" or "accomplished".

- **"Retention"** - Label for comprehension/memory score. May need different word than literal "retention" depending on language. Consider "Understanding", "Comprehension", or equivalent that sounds natural.

- **"Words"** - Total words read count. Straightforward translation.

- **"Best WPM"** - Highest speed achieved. "WPM" stays as-is (technical term).

### Journey Milestone Labels (Not Yet in Translation Files)
**Context:** Progress path milestone names

Milestone progression (not yet in translation files, noted for future):
- Beginner → Explorer → Reader → Proficient → Advanced → Expert

When these are added to translation files, maintain progression sense and aspiration tone.

---

## Quality Checklist

Before submitting translations, verify:

### Structure
- [ ] All 15 JSON files created for each language (150 files total)
- [ ] JSON syntax is valid (no trailing commas, proper quotes, proper escaping)
- [ ] All keys match English version exactly (only values translated)
- [ ] File encoding is UTF-8

### Content
- [ ] "Devoro" brand name unchanged in all files
- [ ] All emojis preserved exactly as-is
- [ ] All interpolation variables `{{variableName}}` preserved
- [ ] "WPM" technical term unchanged
- [ ] Pluralization forms correct for language (cs, pl, ro have 4 forms)

### Character Balancing
- [ ] Portion options (Bite/Snack/Meal/Feast) within ±3 character range
- [ ] Flavor options (Auto/Fact/Story/Analogy) within ±3 character range
- [ ] Theme names (Dark/Midnight/Sepia/Light) within ±3 character range

### Tone
- [ ] Playful strings maintain energy (Devoured, Serve it up, portion names)
- [ ] Certificate text uses formal/ceremonial register
- [ ] Error messages are clear but not harsh
- [ ] Empty states are encouraging and friendly

### Language Quality
- [ ] Sounds natural to native speakers
- [ ] Culturally appropriate (metaphors, idioms adapted as needed)
- [ ] Shorter word chosen when multiple valid options exist
- [ ] Grammar and spelling correct
- [ ] Appropriate formality level for context

---

## Validation Commands

After creating translation files, validate JSON syntax:

**Unix/Mac/Linux:**
```bash
# Validate all JSON files
cd src/locales
for lang in cs de nl fr it pl pt ro es sv; do
  echo "Validating $lang..."
  for file in $lang/*.json; do
    node -e "JSON.parse(require('fs').readFileSync('$file', 'utf8'))" && echo "✓ $file" || echo "✗ $file INVALID"
  done
done
```

**Windows (PowerShell):**
```powershell
# Validate all JSON files
cd src\locales
foreach ($lang in @('cs','de','nl','fr','it','pl','pt','ro','es','sv')) {
  Write-Host "Validating $lang..."
  Get-ChildItem -Path "$lang\*.json" | ForEach-Object {
    node -e "JSON.parse(require('fs').readFileSync('$($_.FullName)', 'utf8'))"
    if ($?) { Write-Host "✓ $($_.Name)" } else { Write-Host "✗ $($_.Name) INVALID" }
  }
}
```

**Or use online JSON validator:** https://jsonlint.com/ (paste each file's content)

---

## Delivery Format

### File Structure
Deliver as directory containing all 150 JSON files organized by language:

```
translation-output/
├── cs/
│   ├── accessibility.json
│   ├── addContent.json
│   ├── auth.json
│   └── ... (all 15 files)
├── de/
├── nl/
├── fr/
├── it/
├── pl/
├── pt/
├── ro/
├── es/
└── sv/
```

### File Naming
- Use exact same filenames as English source
- Use lowercase
- Use `.json` extension
- Examples: `common.json`, `topics.json`, `generation.json`

### Directory Naming
- Use ISO 639-1 language codes
- Lowercase only
- Examples: `cs`, `de`, `nl`, `fr`, `it`, `pl`, `pt`, `ro`, `es`, `sv`

---

## Questions / Support

If you encounter ambiguous strings or need clarification:
1. Note the namespace and key (e.g., `generation.json → portions.feast`)
2. Describe the ambiguity
3. Provide 2-3 translation options with character counts
4. Flag for review rather than guessing

**Do NOT:**
- Skip strings
- Leave English text in target language files
- Invent new keys or remove existing keys
- Change JSON structure

---

## Summary

**Total Scope:** 227 strings × 10 languages = 2,270 translated strings
**Output:** 150 JSON files (15 namespaces × 10 languages)
**Critical Constraints:** Character balancing for 3 button groups
**Quality:** Native speaker, culturally nuanced, natural-sounding
**Special:** Preserve interpolation, pluralization, emojis, brand name

**Timeline Estimate:** Professional translator would need 10-15 hours for this volume with quality requirements.

---

**End of Translation Project Plan**
