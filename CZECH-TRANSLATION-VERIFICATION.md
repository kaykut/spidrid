# Czech (cs) Translation Verification

**Date:** 2026-01-21
**Language:** Czech (cs)
**Status:** ✅ COMPLETE

## Files Created: 15/15

All 15 JSON namespace files have been created in `/src/locales/cs/`:

1. ✅ accessibility.json
2. ✅ addContent.json
3. ✅ auth.json
4. ✅ certificates.json
5. ✅ common.json
6. ✅ consumption.json
7. ✅ content.json
8. ✅ errors.json
9. ✅ generation.json
10. ✅ interests.json
11. ✅ playback.json
12. ✅ quiz.json
13. ✅ settings.json
14. ✅ subscription.json
15. ✅ topics.json

## Character Balancing Verification

### Group 1: Portion Buttons (generation.json)
| Key | Czech Translation | Character Count |
|-----|------------------|-----------------|
| bite | Sousto | 6 |
| snack | Svačina | 7 |
| meal | Jídlo | 5 |
| feast | Hostina | 7 |

**Spread:** 7 - 5 = **2 characters** ✅ (≤3 required)

### Group 2: Tone/Flavor Buttons (generation.json)
| Key | Czech Translation | Character Count |
|-----|------------------|-----------------|
| auto | Auto | 4 |
| fact | Fakt | 4 |
| story | Příběh | 6 |
| analogy | Podoby | 6 |

**Spread:** 6 - 4 = **2 characters** ✅ (≤3 required)

### Group 3: Theme Buttons (settings.json)
| Key | Czech Translation | Character Count |
|-----|------------------|-----------------|
| dark | Tmavý | 5 |
| midnight | Půlnoc | 6 |
| sepia | Sépie | 5 |
| light | Světlý | 6 |

**Spread:** 6 - 5 = **1 character** ✅ (≤3 required)

## Czech Pluralization

Czech is a complex plural language requiring 4 forms. The `article_*` keys in generation.json have been correctly implemented:

```json
"article_one": "{{count}} článek",      // 1
"article_few": "{{count}} články",      // 2-4
"article_many": "{{count}} článku",     // 0.x decimals
"article_other": "{{count}} článků"     // 5+
```

## Special Elements Preserved

✅ Brand name "Devoro" unchanged
✅ Technical term "WPM" unchanged
✅ All emojis preserved (🔬 ⚕️ 🏛️ 💻 🌿 🌍 🌌 🧠 ✨ 💼 📈 🎯 ✈️ 🎭 🌸)
✅ All interpolation variables preserved ({{email}}, {{wpm}}, {{count}}, etc.)
✅ Ampersands (&) kept in all topic names
✅ Numbers unchanged (1 min, 2 min, etc.)

## JSON Format Compliance

✅ UTF-8 encoding (no BOM)
✅ LF line endings (Unix-style)
✅ 2-space indentation
✅ Trailing newline included
✅ No trailing commas
✅ Key order preserved from English source
✅ All JSON files validated successfully

## Translation Quality Notes

- **Tone preservation:** Playful elements maintained (e.g., "Serve it up" → "Podávejte")
- **Formal register:** Certificate text uses appropriate formal Czech
- **Natural language:** Translations sound native, not literal
- **Cultural adaptation:** Metaphors adapted while maintaining food theme
- **Topic names:** Kept ampersands per specification (e.g., "Věda & Objevy")

## Files Ready for Integration

All 15 Czech translation files are production-ready and can be integrated into the Devoro app immediately.
