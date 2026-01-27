# Swedish (sv) Translation Summary

**Date:** 2026-01-21
**Language Code:** sv
**Translator:** AI (Claude Sonnet 4.5)
**Status:** Complete

## Files Delivered
All 15 namespace files created:
- ✓ accessibility.json
- ✓ addContent.json
- ✓ auth.json
- ✓ certificates.json
- ✓ common.json
- ✓ consumption.json
- ✓ content.json
- ✓ errors.json
- ✓ generation.json
- ✓ interests.json
- ✓ playback.json
- ✓ quiz.json
- ✓ settings.json
- ✓ subscription.json
- ✓ topics.json

## Character Balancing Results

### Group 1: Portions (generation.json)
- "Tugga" = 5 chars (Bite)
- "Snack" = 5 chars (Snack)
- "Måltid" = 6 chars (Meal)
- "Fest" = 4 chars (Feast)
- **Spread: 2 ✓ PASS**

### Group 2: Tones/Flavors (generation.json)
- "Auto" = 4 chars (Auto)
- "Fakta" = 5 chars (Fact)
- "Saga" = 4 chars (Story)
- "Metafor" = 7 chars (Analogy)
- **Spread: 3 ✓ PASS**

### Group 3: Themes (settings.json)
- "Mörk" = 4 chars (Dark)
- "Midnatt" = 7 chars (Midnight)
- "Sepia" = 5 chars (Sepia)
- "Ljus" = 4 chars (Light)
- **Spread: 3 ✓ PASS**

## Translation Notes

### Swedish Language Considerations
- Swedish is a simple plural language (2 forms: _one, _other)
- Character balancing required shorter synonyms:
  - "Story" → "Saga" (not "Berättelse" which is 10 chars)
  - "Analogy" → "Metafor" (not "Liknelse" which is 8 chars)
- All emojis preserved exactly as in English
- Ampersands (&) kept in all topic names
- WPM, Devoro, and all {{variables}} preserved

### Tone Maintained
- Playful/energetic: "Servera" for "Serve it up"
- Formal/ceremonial: Certificate language uses formal register
- Friendly/encouraging: Empty states and onboarding
- Technical/precise: Settings and controls

## Validation
- ✓ All 15 files have valid JSON syntax
- ✓ All 3 button groups pass character balancing (spread ≤ 3)
- ✓ UTF-8 encoding, LF line endings
- ✓ 2-space indentation
- ✓ All interpolation variables preserved
- ✓ All emojis preserved
- ✓ Brand name "Devoro" unchanged
- ✓ Technical term "WPM" unchanged

## Quality Notes
Translations prioritize:
1. Natural Swedish that native speakers would use
2. Appropriate formality level for context
3. Cultural adaptation while maintaining metaphor domains
4. Brevity when multiple valid options exist
