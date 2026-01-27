# Curriculum Translation Execution Plan

**Created:** 2026-01-22
**Updated:** 2026-01-22 (corrected quiz detection)
**Status:** Ready for Execution
**Objective:** Translate all 195 curriculum articles × 10 languages = 1,950 article translations

---

## Current Status

Run `npm run generate-project-status` to regenerate this table.

```
Global Progress: 22.3% articles, 12.2% quizzes
  Articles: 435/1950
  Quizzes: 237/1950
  Words: 758,674/3,697,500
```

**Per-Language Status:**

| Language | Articles | Quizzes | Words | Status |
|----------|----------|---------|-------|--------|
| de (German) | 195/195 (100%) ✓ | 14/195 (7%) | 335,956 | 🟢 Content Complete, Quizzes Pending |
| fr (French) | 31/195 (16%) | 27/195 (14%) | 54,898 | 🟡 In Progress |
| pt (Portuguese) | 31/195 (16%) | 31/195 (16%) | 54,964 | 🟡 In Progress |
| es (Spanish) | 31/195 (16%) | 28/195 (14%) | 56,090 | 🟡 In Progress |
| pl (Polish) | 26/195 (13%) | 26/195 (13%) | 48,631 | 🟡 In Progress |
| ro (Romanian) | 26/195 (13%) | 21/195 (11%) | 51,639 | 🟡 In Progress |
| sv (Swedish) | 26/195 (13%) | 21/195 (11%) | 48,094 | 🟡 In Progress |
| cs (Czech) | 23/195 (12%) | 23/195 (12%) | 41,775 | 🟡 In Progress |
| nl (Dutch) | 23/195 (12%) | 23/195 (12%) | 25,862 | 🟡 In Progress |
| it (Italian) | 23/195 (12%) | 23/195 (12%) | 40,765 | 🟡 In Progress |

**Important Note - Quiz Detection:**
Quiz is marked as "translated" ONLY if the question text is DIFFERENT from English.
Previously, quizzes were incorrectly marked as translated if the structure existed.

---

## Status Generation Scripts

### Generate Project Status (All Languages)
```bash
npm run generate-project-status
```
Scans all 10 languages and generates complete status tensor.
Use at the start of each session to get fresh status.

### Generate Language Status (Single Language)
```bash
npm run generate-language-status -- --language de
```
Scans only the specified language. Faster for checking progress on one language.

### Update Translation Status (After Single Article)
```bash
npm run update-translation-status -- --article <id> --language <lang>
```
Called automatically by translation skills after each article.

---

## Execution Strategy

### Priority Order

1. **Complete German first** (only 26 articles remaining)
   - This gives us our first 100% complete language
   - Validates the full workflow end-to-end

2. **Complete languages that are furthest along** (French, Portuguese, Spanish)
   - Each has ~31/195 done
   - 164 articles remaining per language

3. **Complete remaining languages** (Polish, Romanian, Swedish, Czech, Dutch, Italian)
   - Each has ~23-26/195 done
   - ~170 articles remaining per language

### Batching Strategy

- **Max 5 articles in parallel** to avoid overwhelming the cultural-translator agent
- Translate by topic (13 articles per batch, but invoke 5 at a time)
- Content translation first, then quiz translation
- Use skills: `/translate-article-content` and `/translate-article-quiz`
- Status tensor updates automatically after each article

### Parallel Execution

- Max 5 parallel invocations per batch
- After each batch of 5, regenerate status: `npm run generate-language-status -- --language <lang>`
- Monitor progress with `npm run generate-project-status`

### Batch Execution Pattern
```
# Batch 1 (5 articles)
/translate-article-content <topic>-p01 <lang>
/translate-article-content <topic>-p02 <lang>
/translate-article-content <topic>-p03 <lang>
/translate-article-content <topic>-p04 <lang>
/translate-article-content <topic>-p05 <lang>

# After batch completes
npm run generate-language-status -- --language <lang>

# Batch 2 (5 articles)
/translate-article-content <topic>-p06 <lang>
...
```

---

## Milestones

### Milestone 0: Test Skills (This Session)
**Status:** Not Started
**Goal:** Validate skills work correctly with cultural-translator agent

**Tasks:**
1. Test `/translate-article-content` with 1 article
2. Verify file updated correctly
3. Verify status tensor updated
4. Test `/translate-article-quiz` with same article
5. Run validation: `npm run validate-translation`

**Test Cases:**
```
/translate-article-content science-discovery-p01 de
/translate-article-quiz science-discovery-p01 de
npm run validate-translation science-discovery-p01 de
```

**Success Criteria:**
- [ ] Content skill successfully translates article
- [ ] Quiz skill successfully translates questions
- [ ] Status tensor shows article as complete
- [ ] Validation passes

---

### Milestone 1: Complete German (de) Quizzes
**Status:** In Progress
**Articles:** 195/195 (100%) ✓ COMPLETE
**Quizzes:** 14/195 (7%) - **181 quizzes remaining**

German article content is fully translated. However, most quizzes still have English question text (they were copied from the English baseline but never actually translated).

**Task:** Translate all remaining German quizzes (181 total across all topics)

**Execution Plan (by topic, 5 at a time):**

```
# Batch 1: science-discovery quizzes
/translate-article-quiz science-discovery-p01 de
/translate-article-quiz science-discovery-p02 de
/translate-article-quiz science-discovery-p03 de
/translate-article-quiz science-discovery-p04 de
/translate-article-quiz science-discovery-p05 de

npm run generate-language-status -- --language de

# Batch 2: science-discovery quizzes (continued)
/translate-article-quiz science-discovery-p06 de
/translate-article-quiz science-discovery-p07 de
/translate-article-quiz science-discovery-p08 de
/translate-article-quiz science-discovery-p09 de
/translate-article-quiz science-discovery-p10 de

npm run generate-language-status -- --language de

# Batch 3: science-discovery certifications
/translate-article-quiz science-discovery-c1 de
/translate-article-quiz science-discovery-c2 de
/translate-article-quiz science-discovery-c3 de

# Continue with other topics...
```

**Success Criteria:**
- [ ] German at 195/195 quizzes (100%)
- [ ] All quiz questions in German (not English)
- [ ] Quiz structure validated (same question count, correct indices preserved)

---

### Milestone 2: Complete French (fr)
**Status:** Not Started
**Articles Remaining:** 164 (12+ topics)

**Topics to translate:** (check status for specifics)
- All topics except science-discovery and health-medicine (partially done)

**Execution:** Same pattern as German, topic by topic

---

### Milestone 3: Complete Portuguese (pt)
**Status:** Not Started
**Articles Remaining:** 164

---

### Milestone 4: Complete Spanish (es)
**Status:** Not Started
**Articles Remaining:** 164

---

### Milestone 5: Complete Polish (pl)
**Status:** Not Started
**Articles Remaining:** 169

---

### Milestone 6: Complete Romanian (ro)
**Status:** Not Started
**Articles Remaining:** 169

---

### Milestone 7: Complete Swedish (sv)
**Status:** Not Started
**Articles Remaining:** 169

---

### Milestone 8: Complete Czech (cs)
**Status:** Not Started
**Articles Remaining:** 172

---

### Milestone 9: Complete Dutch (nl)
**Status:** Not Started
**Articles Remaining:** 172

---

### Milestone 10: Complete Italian (it)
**Status:** Not Started
**Articles Remaining:** 172

---

### Milestone 11: Final Validation
**Status:** Not Started

**Tasks:**
1. Run validation on all translated articles
2. Check for word count deviations > 20%
3. Verify quiz structure integrity
4. Update curriculum loader registry
5. Test app with all languages

---

## Commands Reference

### Check Progress
```bash
npm run translation-status
npm run translation-status -- --language fr
npm run translation-status -- --pending
```

### Translate Articles
```
/translate-article-content <article-id> <language>
/translate-article-quiz <article-id> <language>
```

### Validate Translations
```bash
npm run validate-translation <article-id> <language>
```

### Update Status (automatically called by skills)
```bash
npm run update-translation-status -- --article <article-id> --language <language>
```

---

## Work Tracking

### Articles by Topic Structure

Each topic has 13 articles:
- Practice articles: p01, p02, p03, p04, p05, p06, p07, p08, p09, p10
- Certification articles: c1, c2, c3

### 15 Topics

1. science-discovery
2. health-medicine
3. history-civilization
4. technology-internet
5. nature-wildlife
6. climate-environment
7. space-cosmos
8. psychology-mind
9. self-improvement
10. business-careers
11. finance-investing
12. trivia-facts
13. world-travel
14. arts-culture
15. lifestyle-wellness

### Total Work

- 195 articles × 10 languages = 1,950 article translations
- Current: 409 complete (21.0%)
- Remaining: 1,541 article translations

---

## Estimated Effort

**Per article (with skills):**
- Content translation: ~2 minutes (mostly LLM work)
- Quiz translation: ~1 minute (mostly LLM work)
- Total: ~3 minutes per article

**Per language:**
- ~195 articles × 3 minutes = ~10 hours per language
- Can be parallelized across multiple sessions

**Total remaining:**
- ~1,541 articles × 3 minutes = ~77 hours of work
- With 5-10 parallel sessions: ~8-15 hours calendar time

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-01-22 | Created scaffolding infrastructure | Minimize LLM overhead, systematic tracking |
| 2026-01-22 | Complete German first | Validate workflow, nearly complete already |
| 2026-01-22 | Topic-by-topic batching | Natural grouping, easier progress tracking |

---

## Notes

- All skills use `cultural-translator` agent for natural translations
- Scripts handle all validation and counting (zero LLM overhead)
- Status tensor at `/translation-status.json` is source of truth
- Skills automatically update status after each translation
