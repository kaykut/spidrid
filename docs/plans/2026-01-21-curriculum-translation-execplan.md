# Curriculum Content Translation for 11 European Languages

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with PLANS.md (located at `/Users/kaya/Coding/devoro/PLANS.md`).


## Purpose / Big Picture

Translate all practice and certification curriculum content into 10 European languages, matching the language support built into the RSVP engine and UI. Currently, all 195 articles (titles, content, and quiz questions) are written in English. This ExecPlan covers translating approximately **433,000 words of educational content** (370K article content + 63K quiz content) into Czech, Dutch, French, German, Italian, Polish, Portuguese, Romanian, Spanish, and Swedish.

After this change, users will be able to:
1. Read all practice articles and certification texts in their preferred language
2. Take quizzes with questions and answers in their chosen language
3. Have article titles and metadata displayed in their language
4. Access the same high-quality educational content regardless of language preference

**Scope:**
- 15 curriculum topics
- 195 articles (10 practice + 3 certification per topic)
- ~370,000 words of article content
- ~1,800 quiz questions with ~7,200 answer options
- Total translation volume: **~4.3 million words** (433K × 10 languages)

The work will be verified by switching languages and confirming that article content, titles, and quiz questions all display in the selected language with no English fallbacks visible.


## Progress

- [ ] M1: Design translation architecture and file structure
- [ ] M2: Set up translation infrastructure (separate from UI i18n)
- [ ] M3: Extract all English content into structured baseline files
- [ ] M4: Translate content for first language (pilot: French)
- [ ] M4.5: AI agent review of French translations
- [ ] M5: Translate content for remaining 9 languages (batch translation)
- [ ] M6: Implement runtime language switching for curriculum content
- [ ] M7: Quality assurance and validation across all languages
- [ ] M8: Performance optimization and final testing


## Surprises & Discoveries

_(To be filled as work proceeds)_


## Decision Log

_(To be filled as decisions are made)_


## Outcomes & Retrospective

_(To be filled at major milestones and completion)_


## Context and Orientation

**Current State**: Devoro has a comprehensive curriculum with 15 topics covering science, health, history, technology, nature, climate, space, psychology, self-improvement, business, finance, trivia, travel, arts, and lifestyle. Each topic contains:
- 10 practice articles (500-3000 words, progressive difficulty)
- 3 certification articles (1000w, 2000w, 3000w)

All content is currently stored in TypeScript files in `src/data/curriculum/`:
- 15 topic files (e.g., `science-discovery.ts`, `health-medicine.ts`)
- Each file exports an array of Article objects with title, content, wordCount, questions
- Total: ~22,000 lines of code, ~370,000 words of content

**Key Challenge**: Unlike UI strings (which are short, numerous, and scattered), curriculum content consists of:
- Long-form educational articles (500-3000 words each)
- Contextual integrity is critical (paragraph flow, technical accuracy, readability)
- Quiz questions that must align semantically with translated article content
- Much larger translation volume (~3.7M words vs ~800-1200 for UI)

**Existing Infrastructure**:
- UI i18n system (from ExecPlan 2026-01-20) handles interface strings with 15 namespaces
- Language adapters in `src/services/language/adapters/` for RSVP text processing
- User language preference stored in `src/store/localeStore.ts`
- AsyncStorage persistence for language selection

**What We'll Build**:
- Separate content translation system (curriculum content is fundamentally different from UI strings)
- Language-specific content files (mirrored directory structure per language)
- Runtime content loading based on user's selected language
- Fallback mechanism to English for any missing translations
- Translation validation script to verify completeness


## Plan of Work

### Milestone 1: Translation Architecture Design

Design the translation infrastructure to handle large-scale content. We will:

1. **Choose storage approach**:
   - **Option A: Mirrored file structure** — Create parallel directory trees for each language:
     ```
     src/data/curriculum/
       en/ (source)
         science-discovery.ts
         health-medicine.ts
         ...
       fr/
         science-discovery.ts
         health-medicine.ts
         ...
       de/
         ...
     ```
   - **Option B: Database/JSON approach** — Use JSON files indexed by article ID and language
   - **Option C: Hybrid** — Keep TypeScript for English, use JSON for translations
   - **Recommended: Option A** for consistency with existing codebase structure

2. **Design content loading API**:
   ```typescript
   // Example API
   getArticleContent(articleId: string, language: string): Article
   getTopicArticles(topicId: string, language: string): Article[]
   ```

3. **Plan fallback strategy**:
   - Load user's preferred language
   - Fall back to English if translation missing
   - Log missing translations for QA tracking

4. **Design translation file format**:
   - Keep existing Article interface structure
   - Ensure quiz questions maintain correctIndex/correctAnswer references
   - Recalculate wordCount after translation (language expansion/contraction)
   - Preserve other metadata (difficulty, orderIndex)

**Acceptance**: Architecture document exists (`docs/curriculum-translation-architecture.md`) with:
- Chosen storage approach with rationale
- API design for content loading
- Fallback mechanism specification
- Translation file format examples
- File structure diagram showing 11 language folders

**Estimated Scope**: 1-2 days of design and documentation


### Milestone 2: Translation Infrastructure Setup

Build the technical infrastructure for loading translated content. We will:

1. **Create directory structure**:
   ```bash
   mkdir -p src/data/curriculum/{en,cs,de,nl,fr,it,pl,pt,ro,es,sv}
   ```

2. **Move existing English content**:
   - Relocate 15 topic files from `src/data/curriculum/` to `src/data/curriculum/en/`
   - Update imports in `src/data/curriculum/index.ts`
   - Verify app still works with relocated files

3. **Create content loader service** (`src/services/contentLoader.ts`):
   ```typescript
   import { useLocaleStore } from '@/store/localeStore';

   export function getArticlesByLanguage(
     topicId: string,
     language: string
   ): Article[] {
     try {
       // Dynamic import based on language
       const module = require(`@/data/curriculum/${language}/${topicId}.ts`);
       return module.ARTICLES;
     } catch (error) {
       // Fallback to English
       console.warn(`Translation not found for ${topicId} in ${language}, using English`);
       const englishModule = require(`@/data/curriculum/en/${topicId}.ts`);
       return englishModule.ARTICLES;
     }
   }

   export function useLocalizedCurriculum() {
     const { currentLanguage } = useLocaleStore();
     return {
       getArticles: (topicId: string) => getArticlesByLanguage(topicId, currentLanguage),
       // ... other helper methods
     };
   }
   ```

4. **Update curriculum index** (`src/data/curriculum/index.ts`):
   - Refactor to load from language-specific folders
   - Add language parameter support
   - Maintain backward compatibility with existing imports

5. **Create translation file templates**:
   - Generate empty TypeScript files for all 10 languages
   - Include type definitions and structure comments
   - Add TODO comments for translation work

6. **Add validation script** (`scripts/validate-curriculum-translations.ts`):
   - Check that all article IDs exist across languages
   - Verify quiz structure integrity (question count, option count)
   - Report missing translations
   - Validate wordCount consistency (±10% tolerance)

**Acceptance**:
- English articles load successfully from `en/` folder
- App functions normally with refactored structure
- Empty template files exist for all 10 target languages
- Validation script runs and confirms English baseline is complete
- `npm run typecheck` passes

**Estimated Scope**: 2-3 days of implementation


### Milestone 3: English Baseline Extraction

Prepare English content for translation by extracting it into a structured, translator-friendly format. We will:

1. **Audit existing English content**:
   - Verify all 195 articles are present and complete
   - Check quiz question formatting consistency
   - Identify any placeholder or incomplete content
   - Document content quality issues for fixing

2. **Create translation source files**:
   - Generate JSON export of all articles for translator consumption:
     ```json
     {
       "articles": [
         {
           "id": "science-discovery-p01",
           "title": "The Water Cycle",
           "content": "Water moves through our planet...",
           "questions": [
             {
               "question": "What causes water to evaporate...",
               "options": ["...", "..."]
             }
           ]
         }
       ]
     }
     ```
   - Create metadata file listing all articles with word counts
   - Generate glossary of technical terms that need consistent translation

3. **Calculate translation costs**:
   - Research translation API pricing (DeepL, Google Translate)
   - Estimate cost for 3.7M words across 10 languages
   - Consider human review costs for quality assurance
   - Document cost breakdown by language and topic

4. **Create translation guidelines**:
   - Writing style guide (educational, clear, engaging)
   - Technical term handling (science, medical, financial terms)
   - Cultural adaptation notes (examples, idioms)
   - Quiz question translation requirements (maintain difficulty, avoid ambiguity)

**Acceptance**:
- JSON export files exist with all 195 articles
- Glossary document contains 200+ technical terms with context
- Translation cost estimate document shows breakdown by language
- Translation guidelines document (3-5 pages) provides clear instructions

**Estimated Scope**: 2-3 days


### Milestone 4: Pilot Translation (French)

Translate all content for one language to validate the workflow. We will:

1. **Choose translation approach**:
   - **Machine Translation + Human Review** (recommended for speed and cost)
   - Use DeepL Pro API (highest quality for European languages)
   - Budget 20% of translated content for human expert review
   - Focus review on: quiz questions, technical terms, educational clarity

2. **Translate French content**:
   - Run batch translation for all 195 articles (~370K words)
   - Translate all quiz questions and options (~1,800 questions)
   - Generate French TypeScript files in `src/data/curriculum/fr/`
   - Recalculate wordCount for each translated article

3. **Human review process**:
   - Hire native French speaker with education/science background
   - Review 20% of content (focus on: certification articles, quiz questions)
   - Create feedback document with corrections and style notes
   - Apply learnings to improve machine translation prompts

4. **Technical validation**:
   - Run validation script to check French file structure
   - Verify all article IDs match English baseline
   - Test app loading French articles
   - Check quiz functionality with French questions
   - Verify word counts are reasonable (±15% of English)

5. **Quality spot-checks**:
   - Native speaker reads 3 articles end-to-end
   - Test quiz questions for clarity and correctness
   - Verify technical terms (photosynthesis, GDP, algorithms) are accurate
   - Check cultural examples are appropriate

6. **Document lessons learned**:
   - Translation quality issues discovered
   - API configuration optimizations
   - Human review process improvements
   - Estimated time and cost per article

**Acceptance**:
- All 195 articles exist in French in `src/data/curriculum/fr/`
- App successfully loads and displays French articles
- Quizzes function correctly with French questions
- Human reviewer provides written quality assessment (7/10+ rating)
- Lessons learned document captures process improvements

**Estimated Scope**: 5-7 days (includes translation time, review, and iteration)


### Milestone 4.5: AI Agent Review of French Translations

Use an AI agent (Claude) to review the machine-translated French content before human review. This provides a cost-effective first-pass quality check that can identify cultural issues, technical term inconsistencies, and semantic problems. We will:

1. **Create agent review prompt with expert role**:
   ```markdown
   <role>
   You are an expert translator specializing in English-to-French educational content translation. Your expertise includes:
   - Native-level fluency in both English and French
   - Deep understanding of French cultural context and regional variations
   - Expertise in educational content writing (clear, engaging, pedagogically sound)
   - Technical knowledge across multiple domains (science, health, technology, finance, psychology)
   - Understanding of quiz question translation (maintaining difficulty level, avoiding ambiguity)
   - Sensitivity to cultural appropriateness (examples, idioms, units of measurement)
   - Consistency in technical terminology across long-form content
   </role>

   Your task is to review machine-translated educational articles from English to French. For each article, assess:
   1. Translation accuracy and naturalness
   2. Cultural appropriateness (examples, references, idioms)
   3. Technical term consistency and correctness
   4. Quiz question clarity and semantic preservation
   5. Educational tone (clear, engaging, appropriate for difficulty level)

   Flag any issues and suggest improvements. Rate overall quality 1-10.
   ```

2. **Set up agent review workflow**:
   - Create script (`scripts/agent-review-translations.ts`) that:
     - Loads translated articles (French) alongside English originals
     - Sends both versions to Claude API with expert role prompt
     - Collects quality ratings and issue reports
     - Generates structured review report per article
   - Configure Claude API with appropriate model (Sonnet for balance of quality/cost)
   - Set up batch processing (10-20 articles at a time)

3. **Run agent review on all French articles**:
   - Review all 195 translated articles
   - Focus areas:
     - Technical terms: photosynthesis, GDP, algorithms, medical terms
     - Cultural examples: currency (euros vs dollars), measurements (metric)
     - Quiz questions: maintain difficulty, avoid French-specific ambiguities
     - Idiomatic expressions: translate meaning, not literal words
   - Generate per-article quality scores (1-10 scale)
   - Compile list of issues by category (technical terms, cultural, semantic)

4. **Analyze agent feedback**:
   - Identify patterns in flagged issues:
     - Common technical terms that need glossary additions
     - Cultural adaptations needed (examples, units)
     - Quiz question patterns that lose clarity
     - Tone issues (too formal, too casual)
   - Prioritize issues by impact (certification articles > practice articles)
   - Create correction priority list for human reviewer

5. **Apply agent-suggested improvements**:
   - Auto-fix obvious issues (e.g., consistent technical term replacements)
   - Document issues that need human judgment
   - Update glossary with newly identified terms
   - Refine DeepL translation parameters based on findings

6. **Prepare focused human review scope**:
   - Provide human reviewer with:
     - Agent review report (quality scores, flagged issues)
     - Priority list (low-scoring articles, high-impact issues)
     - Specific questions for human judgment
   - Reduce human review scope from 20% → 10-15% (agent pre-filtering)
   - Focus human time on highest-value reviews

**Acceptance**:
- Agent review script successfully processes all 195 French articles
- Review report contains quality score (1-10) for each article
- Issue report categorizes problems: technical terms, cultural, semantic, quiz clarity
- At least 50 specific improvement suggestions generated
- Human reviewer receives focused review scope (30-40 articles instead of 40)
- Average agent quality rating is 7/10 or higher (if lower, indicates DeepL config issues)

**Estimated Scope**: 2-3 days (script development + agent review + analysis)


### Milestone 5: Batch Translation (Remaining 9 Languages)

Translate content for Czech, Dutch, German, Italian, Polish, Portuguese, Romanian, Spanish, and Swedish. We will:

1. **Apply lessons from French pilot**:
   - Update translation prompts/parameters with learnings
   - Refine glossary with corrections from human review
   - Optimize API usage patterns for cost/quality

2. **Set up batch translation pipeline**:
   ```bash
   # Pseudo-code for translation script
   for language in cs de nl it pl pt ro es sv:
     translate_all_articles(source=en, target=language)
     generate_typescript_files(language)
     validate_structure(language)
     report_progress(language)
   ```

3. **Translate in phases**:
   - **Phase 1: Germanic languages** (de, nl, sv)
     - Similar grammatical structure to English
     - Strong DeepL support
   - **Phase 2: Romance languages** (it, pt, ro, es)
     - Shared linguistic roots
     - Consistent technical terminology
   - **Phase 3: Slavic languages** (cs, pl)
     - More complex grammar
     - May require additional review

4. **Quality checks per language**:
   - Run validation script after each language
   - Automated checks: structure, IDs, quiz format
   - Spot-check 5 random articles per language
   - Verify technical terms in glossary were translated consistently
   - **Optional**: Run agent review (like M4.5) for high-priority languages (Spanish, German)

5. **Human review (selective)**:
   - Budget for light review of 2-3 high-priority languages
   - Focus on quiz questions only (faster, high impact)
   - Native speakers check: Spanish, German, Polish (largest user bases)
   - Document quality issues by language for future iteration

**Acceptance**:
- All 9 languages have complete article sets (195 × 9 = 1,755 article files)
- Validation script passes for all languages
- TypeScript files compile without errors
- Spot-check quality assessment shows 6/10+ rating average

**Estimated Scope**: 10-14 days (parallelizable; can run translations concurrently)


### Milestone 6: Runtime Language Switching

Integrate translated content into the app with dynamic language loading. We will:

1. **Update article loading logic**:
   - Modify `src/data/curriculum/index.ts` to use language-aware loaders
   - Integrate with `useLocaleStore` for current language
   - Implement lazy loading to avoid bundle size bloat
   - Add English fallback for missing translations

2. **Create hooks for localized content**:
   ```typescript
   // src/hooks/useLocalizedArticle.ts
   export function useLocalizedArticle(articleId: string) {
     const { currentLanguage } = useLocaleStore();
     const [article, setArticle] = useState<Article | null>(null);

     useEffect(() => {
       const loadArticle = async () => {
         try {
           const content = await getArticleByLanguage(articleId, currentLanguage);
           setArticle(content);
         } catch (error) {
           // Fallback to English
           const englishContent = await getArticleByLanguage(articleId, 'en');
           setArticle(englishContent);
         }
       };

       loadArticle();
     }, [articleId, currentLanguage]);

     return article;
   }
   ```

3. **Update all curriculum-consuming screens**:
   - `src/app/article/[id].tsx` — Article reader
   - `src/app/topic/[id].tsx` — Article list
   - `src/app/playback.tsx` — RSVP playback (for learning mode articles)
   - `src/app/playback-quiz.tsx` — Quiz interface
   - Any components that display article titles or excerpts

4. **Handle language switching edge cases**:
   - User switches language mid-article: reload article in new language
   - User completes quiz in one language, retakes in another: maintain state correctly
   - History and progress tracking: store article ID + language
   - Certificates: ensure article titles on certificates match language

5. **Optimize bundle size**:
   - Use dynamic imports to load only current language content
   - Test bundle size doesn't grow linearly with languages
   - Implement code splitting by language
   - Measure app launch time impact (must be <500ms increase)

6. **Add language-switching UI feedback**:
   - Show loading indicator when switching language mid-article
   - Display language badge on article cards
   - Add "View in original language" option for reference

**Acceptance**:
- User can switch language in settings and all articles reload in new language
- Article reader displays correct language content
- Quiz questions appear in selected language
- Fallback to English works gracefully when translation missing
- App bundle size increase is <25% (acceptable for 10× content)
- Language switching feels instantaneous (<300ms perceived delay)

**Estimated Scope**: 4-5 days


### Milestone 7: Quality Assurance & Validation

Systematically test all languages and content. We will:

1. **Automated testing**:
   - Create test suite for content loading (`__tests__/contentLoader.test.ts`)
   - Test fallback mechanism (missing translations → English)
   - Verify quiz correctIndex/correctAnswer integrity across languages
   - Check article metadata consistency (wordCount, difficulty)
   - Validate all 2,145 files load without errors (195 articles × 11 languages)

2. **Manual testing checklist** (per language):
   - [ ] Load 3 random articles from different topics
   - [ ] Verify article text is in correct language (not English)
   - [ ] Complete quiz and verify questions/options are translated
   - [ ] Check quiz scoring works correctly
   - [ ] Verify article titles on content list
   - [ ] Test language switching mid-article
   - [ ] Check certificate generation with translated titles

3. **Cross-language consistency checks**:
   - Verify same article has similar length across languages (±20%)
   - Check quiz questions have same number of options
   - Ensure technical terms are translated consistently
   - Spot-check 10 articles: compare English vs 3 random languages

4. **Performance testing**:
   - Measure article load time in each language
   - Test app with 50+ articles in history (worst-case scenario)
   - Profile memory usage with multiple language switches
   - Verify AsyncStorage/MMKV size is reasonable

5. **Accessibility testing**:
   - Verify screen readers work with all languages
   - Check right-to-left support (not needed for these 11 languages, but test anyway)
   - Test with large font sizes (text doesn't overflow)
   - Verify VoiceOver/TalkBack read content correctly

6. **Create quality report** (`docs/curriculum-translation-quality-report.md`):
   - Language-by-language quality assessment
   - Known issues and workarounds
   - Translation accuracy spot-check results
   - Performance metrics
   - User acceptance criteria status

**Acceptance**:
- All automated tests pass (100% success rate)
- Manual testing checklist complete for all 11 languages
- Quality report documents any issues with mitigation plans
- Performance metrics show <500ms load time for articles in all languages
- No crashes or errors when switching between all language pairs

**Estimated Scope**: 5-7 days


### Milestone 8: Performance Optimization & Final Testing

Optimize and polish the translation system. We will:

1. **Bundle size optimization**:
   - Analyze bundle size impact per language
   - Implement lazy loading for article content
   - Use dynamic imports with React.lazy for language-specific modules
   - Test bundle size on iOS/Android production builds

2. **Caching strategy**:
   - Implement in-memory cache for recently accessed articles
   - Cache last 10 articles per language in AsyncStorage
   - Pre-load next article in topic for faster navigation
   - Measure cache hit rate and performance improvement

3. **Final user testing**:
   - Test with native speakers of 3-4 languages
   - Gather feedback on translation quality and naturalness
   - Test with non-English primary language users
   - Verify educational value is preserved across languages

4. **Documentation**:
   - Update README with translation architecture
   - Add inline code comments for translation loading logic

5. **Monitoring and analytics** (optional):
   - Track article language distribution in analytics
   - Monitor fallback-to-English rate (indicator of missing translations)
   - Log translation load errors for debugging
   - A/B test translation quality with user feedback

**Acceptance**:
- Production build bundle size is acceptable (<50MB total for iOS, <40MB Android)
- Cache reduces article load time by 50%+ on repeat views
- User testing shows positive feedback (4/5+ rating)
- All documentation is complete and reviewed

**Estimated Scope**: 2-3 days


## Concrete Steps

### Milestone 1 Steps:

1. Create architecture document:
   ```bash
   touch docs/curriculum-translation-architecture.md
   ```

2. Research and document storage approaches:
   - Pros/cons of mirrored file structure vs JSON vs hybrid
   - Bundle size implications
   - Maintenance complexity trade-offs

3. Design content loading API:
   - Sketch out function signatures
   - Consider caching requirements
   - Plan fallback strategy

4. Create file structure diagram:
   - Show folder hierarchy for 11 languages
   - Illustrate import paths
   - Document naming conventions

5. Review architecture with stakeholder (if applicable)

**Expected Output**: Architecture document (5-10 pages) with clear technical decisions


### Milestone 2 Steps:

1. Create language directories:
   ```bash
   cd src/data/curriculum
   mkdir -p {en,cs,de,nl,fr,it,pl,pt,ro,es,sv}
   ```

2. Move English content:
   ```bash
   mv *.ts en/
   # Keep index.ts and topics.ts in root
   mv en/index.ts .
   mv en/topics.ts .
   ```

3. Update imports in `curriculum/index.ts`:
   ```typescript
   // Change all imports like:
   // import { SCIENCE_ARTICLES } from './science-discovery';
   // To:
   // import { SCIENCE_ARTICLES } from './en/science-discovery';
   ```

4. Test app still works:
   ```bash
   npm start
   # Navigate to learning mode
   # Verify articles load correctly
   ```

5. Create content loader service:
   ```bash
   touch src/services/contentLoader.ts
   # Implement language-aware loading logic
   ```

6. Generate empty template files:
   ```bash
   for lang in cs de nl fr it pl pt ro es sv; do
     for topic in science-discovery health-medicine history-civilization technology-internet nature-wildlife climate-environment space-cosmos psychology-mind self-improvement business-careers finance-investing trivia-facts world-travel arts-culture lifestyle-wellness; do
       cp src/data/curriculum/en/$topic.ts src/data/curriculum/$lang/$topic.ts
       # Replace content with TODOs
     done
   done
   ```

7. Create validation script:
   ```bash
   touch scripts/validate-curriculum-translations.ts
   ```

8. Run validation:
   ```bash
   npx tsx scripts/validate-curriculum-translations.ts
   ```


### Milestone 3 Steps:

1. Run content audit:
   ```bash
   npx tsx scripts/audit-english-content.ts
   ```

2. Generate JSON export for translators:
   ```bash
   npx tsx scripts/export-for-translation.ts --format=json --output=translation-source
   ```

3. Create glossary:
   ```bash
   npx tsx scripts/extract-technical-terms.ts --output=docs/curriculum-glossary.md
   ```

4. Research translation costs:
   - Sign up for DeepL API Pro trial
   - Calculate cost: 370K words × 10 languages × $0.00002/char
   - Document estimates in `docs/translation-cost-analysis.md`

5. Write translation guidelines:
   ```bash
   touch docs/translation-guidelines.md
   # Document style, tone, technical term handling
   ```


### Milestone 4 Steps:

1. Set up DeepL API:
   ```bash
   npm install deepl-node
   touch scripts/translate-content.ts
   ```

2. Run French translation:
   ```bash
   npx tsx scripts/translate-content.ts --source=en --target=fr --glossary=docs/curriculum-glossary.md
   ```

3. Generate TypeScript files:
   ```bash
   npx tsx scripts/generate-ts-from-translations.ts --language=fr
   ```

4. Hire French reviewer:
   - Post job on Upwork/Fiverr for native French speaker with education background
   - Provide review guidelines and sample articles
   - Request 20% content review (~40 articles)

5. Apply review feedback:
   ```bash
   # Manually update files based on reviewer comments
   # Document patterns for improving machine translation
   ```

6. Test French content:
   ```bash
   npm start
   # Switch language to French
   # Navigate to learning mode
   # Read 3 articles, complete quizzes
   # Verify correctness
   ```


### Milestone 4.5 Steps:

1. Create agent review script:
   ```bash
   touch scripts/agent-review-translations.ts
   ```

2. Implement agent review logic:
   ```typescript
   // scripts/agent-review-translations.ts
   import Anthropic from '@anthropic-ai/sdk';
   import * as fs from 'fs';
   import * as path from 'path';

   const client = new Anthropic({
     apiKey: process.env.ANTHROPIC_API_KEY!,
   });

   const EXPERT_ROLE = `<role>
   You are an expert translator specializing in English-to-French educational content translation. Your expertise includes:
   - Native-level fluency in both English and French
   - Deep understanding of French cultural context and regional variations
   - Expertise in educational content writing (clear, engaging, pedagogically sound)
   - Technical knowledge across multiple domains (science, health, technology, finance, psychology)
   - Understanding of quiz question translation (maintaining difficulty level, avoiding ambiguity)
   - Sensitivity to cultural appropriateness (examples, idioms, units of measurement)
   - Consistency in technical terminology across long-form content
   </role>`;

   async function reviewArticle(englishArticle: Article, frenchArticle: Article) {
     const prompt = `${EXPERT_ROLE}

   Review this machine-translated educational article:

   ENGLISH ORIGINAL:
   Title: ${englishArticle.title}
   ${englishArticle.content}

   FRENCH TRANSLATION:
   Title: ${frenchArticle.title}
   ${frenchArticle.content}

   Assess:
   1. Translation accuracy and naturalness
   2. Cultural appropriateness
   3. Technical term consistency
   4. Quiz question clarity
   5. Educational tone

   Provide:
   - Quality rating (1-10)
   - Specific issues found (with examples)
   - Improvement suggestions
   - Category tags: [technical|cultural|semantic|quiz]`;

     const response = await client.messages.create({
       model: 'claude-sonnet-4-20250514',
       max_tokens: 2000,
       messages: [{ role: 'user', content: prompt }],
     });

     return parseAgentResponse(response.content[0].text);
   }

   // Run review on all 195 articles, generate report
   ```

3. Run agent review:
   ```bash
   export ANTHROPIC_API_KEY=your-api-key
   npx tsx scripts/agent-review-translations.ts --language=fr --output=docs/agent-review-french.json
   ```

4. Analyze agent feedback:
   ```bash
   # Generate summary report
   npx tsx scripts/analyze-agent-review.ts --input=docs/agent-review-french.json
   # Output: categorized issues, quality scores, priority list
   ```

5. Apply automated fixes:
   ```bash
   # Apply technical term corrections automatically
   npx tsx scripts/apply-agent-suggestions.ts --auto-fix --input=docs/agent-review-french.json
   ```

6. Prepare human review scope:
   ```bash
   # Generate focused review list (30-40 articles with lowest scores or critical issues)
   npx tsx scripts/prepare-human-review.ts --input=docs/agent-review-french.json --output=docs/human-review-scope.md
   ```


### Milestone 5 Steps:

1. Update translation script with learnings:
   ```typescript
   // Update scripts/translate-content.ts
   // - Add formality parameter if needed
   // - Improve context handling
   ```

2. Translate Germanic languages:
   ```bash
   for lang in de nl sv; do
     npx tsx scripts/translate-content.ts --source=en --target=$lang --glossary=docs/curriculum-glossary.md
     npx tsx scripts/generate-ts-from-translations.ts --language=$lang
     npx tsx scripts/validate-curriculum-translations.ts --language=$lang
   done
   ```

3. Translate Romance languages:
   ```bash
   for lang in it pt ro es; do
     npx tsx scripts/translate-content.ts --source=en --target=$lang --glossary=docs/curriculum-glossary.md
     npx tsx scripts/generate-ts-from-translations.ts --language=$lang
     npx tsx scripts/validate-curriculum-translations.ts --language=$lang
   done
   ```

4. Translate Slavic languages:
   ```bash
   for lang in cs pl; do
     npx tsx scripts/translate-content.ts --source=en --target=$lang --glossary=docs/curriculum-glossary.md
     npx tsx scripts/generate-ts-from-translations.ts --language=$lang
     npx tsx scripts/validate-curriculum-translations.ts --language=$lang
   done
   ```

5. Run comprehensive validation:
   ```bash
   npx tsx scripts/validate-curriculum-translations.ts --all-languages
   ```

6. Spot-check quality:
   ```bash
   # Manually review 5 random articles per language
   # Document quality scores in spreadsheet
   ```


### Milestone 6 Steps:

1. Create localized content hook:
   ```bash
   touch src/hooks/useLocalizedArticle.ts
   touch src/hooks/useLocalizedTopic.ts
   ```

2. Update article reader:
   ```typescript
   // src/app/article/[id].tsx
   // Replace: import { getArticleById } from '@/data/curriculum';
   // With: const article = useLocalizedArticle(id);
   ```

3. Update topic screen:
   ```typescript
   // src/app/topic/[id].tsx
   // Replace: import { getArticlesByTopic } from '@/data/curriculum';
   // With: const articles = useLocalizedTopicArticles(topicId);
   ```

4. Update playback screen:
   ```typescript
   // src/app/playback.tsx
   // Ensure articles loaded via localized hooks
   ```

5. Update quiz screen:
   ```typescript
   // src/app/playback-quiz.tsx
   // Verify questions use localized content
   ```

6. Test language switching:
   ```bash
   npm start
   # Start reading article in English
   # Switch to French mid-article
   # Verify article reloads in French
   ```


### Milestone 7 Steps:

1. Write automated tests:
   ```bash
   touch src/services/__tests__/contentLoader.test.ts
   ```

2. Run test suite:
   ```bash
   npm run test
   ```

3. Create manual testing checklist:
   ```bash
   touch docs/curriculum-translation-testing-checklist.md
   ```

4. Test each language:
   ```bash
   # For each of 11 languages:
   # - Switch language in settings
   # - Load 3 random articles
   # - Complete quizzes
   # - Document results
   ```

5. Run performance tests:
   ```bash
   # Use React DevTools Profiler
   # Measure article load times
   # Test memory usage
   ```

6. Generate quality report:
   ```bash
   touch docs/curriculum-translation-quality-report.md
   ```


### Milestone 8 Steps:

1. Analyze bundle size:
   ```bash
   npx expo export --platform ios
   npx expo export --platform android
   # Check .expo output folder sizes
   ```

2. Implement caching:
   ```typescript
   // Add to src/services/contentLoader.ts
   const articleCache = new Map<string, Article>();
   ```

3. Conduct user testing:
   - Recruit 4-6 native speakers
   - Provide testing script and feedback form
   - Collect quality ratings and suggestions

4. Write documentation:
   ```bash
   # Update README.md with translation architecture
   ```

5. Final validation:
   ```bash
   npm run typecheck
   npm run test
   npm run lint
   ```


## Validation and Acceptance

After completing all milestones, the following must be true:

1. **Functional Validation**:
   - Open the app and switch to each of 11 languages
   - Navigate to learning mode and open articles from 3 different topics
   - Verify article content is in correct language (not English)
   - Complete quiz and verify questions/answers are translated
   - Switch language mid-article and verify content reloads

2. **Completeness Validation**:
   - Run validation script: `npx tsx scripts/validate-curriculum-translations.ts --all-languages`
   - Expect: "All 11 languages have complete translations for all 195 articles"
   - Verify: 2,145 article files exist (195 articles × 11 languages)
   - Check: All quiz questions have correct number of options

3. **Quality Validation**:
   - Native speakers rate translations: average 6/10 or higher
   - Technical terms verified: 90%+ accuracy in glossary terms
   - Quiz questions tested: 95%+ function correctly
   - User feedback: 4/5 stars or higher

4. **Performance Validation**:
   - Article load time: <500ms in all languages
   - Language switching: <300ms perceived delay
   - Bundle size: iOS <50MB, Android <40MB
   - Cache hit rate: >50% for repeat article views

5. **Integration Validation**:
   - App works seamlessly with UI i18n (language preference is unified)
   - Language switching affects both UI and content simultaneously
   - History and progress tracking work across languages
   - Certificates display article titles in correct language

6. **Test Suite Validation**:
   - Run: `npm run test`
   - Expect: All tests pass (100% success rate)
   - Run: `npm run typecheck`
   - Expect: No TypeScript errors


## Idempotence and Recovery

All steps can be safely re-run:

- Creating directories with `mkdir -p` is idempotent
- Translation scripts can be re-run (will overwrite existing translations)
- Validation scripts are read-only (safe to run multiple times)
- Content loading hooks gracefully handle missing translations

**Recovery from errors**:

- If translation fails mid-batch: Resume from last successful language
- If translated file is corrupted: Delete and re-translate that specific file
- If app crashes loading content: Check TypeScript syntax in translated files
- If quiz doesn't work: Validate correctIndex/correctAnswer in translated questions
- If memory issues occur: Implement pagination or lazy loading

**Rollback**:

All work should be in a git branch (`feature/curriculum-translation`). To rollback:
```bash
git checkout main
# Or revert specific commits
```


## Artifacts and Notes

### Expected Directory Structure After Completion:

```
src/data/curriculum/
  en/                          # English (source)
    science-discovery.ts       # 13 articles
    health-medicine.ts         # 13 articles
    ... (15 topic files)
  cs/                          # Czech
    science-discovery.ts
    ... (15 topic files)
  de/                          # German
    science-discovery.ts
    ... (15 topic files)
  nl/                          # Dutch
    ... (15 topic files)
  fr/                          # French
    ... (15 topic files)
  it/                          # Italian
    ... (15 topic files)
  pl/                          # Polish
    ... (15 topic files)
  pt/                          # Portuguese
    ... (15 topic files)
  ro/                          # Romanian
    ... (15 topic files)
  es/                          # Spanish
    ... (15 topic files)
  sv/                          # Swedish
    ... (15 topic files)
  index.ts                     # Curriculum index with language-aware loading
  topics.ts                    # Topic metadata (uses i18n keys for names)

src/services/
  contentLoader.ts             # Language-aware article loading service

src/hooks/
  useLocalizedArticle.ts       # Hook for loading articles in current language
  useLocalizedTopic.ts         # Hook for loading topic articles

scripts/
  translate-content.ts         # Batch translation script (DeepL API)
  agent-review-translations.ts # AI agent review of translations (Claude API)
  analyze-agent-review.ts      # Analyze agent review results
  apply-agent-suggestions.ts   # Apply automated fixes from agent review
  prepare-human-review.ts      # Generate focused human review scope
  generate-ts-from-translations.ts   # Convert JSON to TypeScript
  validate-curriculum-translations.ts # Validation and completeness checks
  audit-english-content.ts     # Content quality audit
  export-for-translation.ts    # Export to translator-friendly format
  extract-technical-terms.ts   # Glossary generation

docs/
  curriculum-translation-architecture.md   # Technical design
  curriculum-glossary.md                   # 200+ technical terms
  translation-guidelines.md                # Style and quality guidelines
  translation-cost-analysis.md             # Budget and pricing
  agent-review-french.json                 # AI agent review results for French
  human-review-scope.md                    # Focused human review list
  curriculum-translation-quality-report.md # QA results

**Total Files**: ~2,145 article files (195 × 11 languages) + infrastructure files
```


### Translation Script Example:

```typescript
// scripts/translate-content.ts
import * as deepl from 'deepl-node';
import * as fs from 'fs';
import * as path from 'path';

const translator = new deepl.Translator(process.env.DEEPL_API_KEY!);

interface Article {
  id: string;
  title: string;
  content: string;
  questions: Array<{
    question: string;
    options?: string[];
  }>;
}

async function translateArticle(
  article: Article,
  targetLang: string,
  glossary?: deepl.GlossaryInfo
): Promise<Article> {
  // Translate title
  const translatedTitle = await translator.translateText(
    article.title,
    'en',
    targetLang as deepl.TargetLanguageCode,
    { glossary: glossary?.glossary_id }
  );

  // Translate content (split into chunks if >5000 chars)
  const translatedContent = await translator.translateText(
    article.content,
    'en',
    targetLang as deepl.TargetLanguageCode,
    { glossary: glossary?.glossary_id, formality: 'default' }
  );

  // Translate quiz questions
  const translatedQuestions = await Promise.all(
    article.questions.map(async (q) => {
      const translatedQuestion = await translator.translateText(
        q.question,
        'en',
        targetLang as deepl.TargetLanguageCode,
        { glossary: glossary?.glossary_id }
      );

      const translatedOptions = q.options ? await Promise.all(
        q.options.map((opt) =>
          translator.translateText(opt, 'en', targetLang as deepl.TargetLanguageCode)
        )
      ) : undefined;

      return {
        ...q,
        question: translatedQuestion.text,
        options: translatedOptions?.map(t => t.text),
      };
    })
  );

  // Recalculate word count for translated content
  const translatedWordCount = translatedContent.text.split(/\s+/).filter(w => w.length > 0).length;

  return {
    ...article,
    title: translatedTitle.text,
    content: translatedContent.text,
    wordCount: translatedWordCount,
    questions: translatedQuestions,
  };
}

async function translateAllArticles(
  sourceDir: string,
  targetLang: string,
  outputDir: string
) {
  const files = fs.readdirSync(sourceDir);

  for (const file of files) {
    if (!file.endsWith('.ts')) continue;

    console.log(`Translating ${file} to ${targetLang}...`);

    // Load source articles
    const module = require(path.join(sourceDir, file));
    const articles: Article[] = module.ARTICLES;

    // Translate each article
    const translatedArticles = await Promise.all(
      articles.map((a) => translateArticle(a, targetLang))
    );

    // Generate TypeScript file
    const tsContent = generateTypeScriptFile(translatedArticles, file);
    fs.writeFileSync(path.join(outputDir, file), tsContent);

    console.log(`✓ Completed ${file}`);
  }
}

function generateTypeScriptFile(articles: Article[], filename: string): string {
  return `import { Article } from '../../types/learning';

export const ${filename.replace('.ts', '').toUpperCase()}_ARTICLES: Article[] = ${JSON.stringify(articles, null, 2)};
`;
}

// Run translation
const sourceLanguage = process.argv[2] || 'en';
const targetLanguage = process.argv[3] || 'fr';

translateAllArticles(
  path.join(__dirname, '../src/data/curriculum', sourceLanguage),
  targetLanguage,
  path.join(__dirname, '../src/data/curriculum', targetLanguage)
).then(() => {
  console.log(`✓ Translation complete: ${sourceLanguage} → ${targetLanguage}`);
}).catch((error) => {
  console.error('Translation failed:', error);
  process.exit(1);
});
```


### Validation Script Example:

```typescript
// scripts/validate-curriculum-translations.ts
import * as fs from 'fs';
import * as path from 'path';

const LANGUAGES = ['en', 'cs', 'de', 'nl', 'fr', 'it', 'pl', 'pt', 'ro', 'es', 'sv'];
const CURRICULUM_DIR = path.join(__dirname, '../src/data/curriculum');

interface ValidationResult {
  language: string;
  missingFiles: string[];
  missingArticles: string[];
  invalidQuizzes: string[];
  wordCountIssues: string[];
}

function validateLanguage(language: string, baseline: any): ValidationResult {
  const result: ValidationResult = {
    language,
    missingFiles: [],
    missingArticles: [],
    invalidQuizzes: [],
    wordCountIssues: [],
  };

  const langDir = path.join(CURRICULUM_DIR, language);

  // Check all expected files exist
  const baselineFiles = fs.readdirSync(path.join(CURRICULUM_DIR, 'en'));
  for (const file of baselineFiles) {
    if (!file.endsWith('.ts')) continue;

    const langFile = path.join(langDir, file);
    if (!fs.existsSync(langFile)) {
      result.missingFiles.push(file);
      continue;
    }

    // Load and validate articles
    try {
      const module = require(langFile);
      const articles = module[Object.keys(module)[0]]; // Get exported array

      // Check article count matches
      const baselineModule = require(path.join(CURRICULUM_DIR, 'en', file));
      const baselineArticles = baselineModule[Object.keys(baselineModule)[0]];

      if (articles.length !== baselineArticles.length) {
        result.missingArticles.push(`${file}: ${articles.length}/${baselineArticles.length}`);
      }

      // Validate quiz structure
      articles.forEach((article: any, index: number) => {
        const baselineArticle = baselineArticles[index];

        if (article.questions.length !== baselineArticle.questions.length) {
          result.invalidQuizzes.push(`${file}:${article.id} - question count mismatch`);
        }

        // Check word count is reasonable (±20%)
        const ratio = article.wordCount / baselineArticle.wordCount;
        if (ratio < 0.8 || ratio > 1.2) {
          result.wordCountIssues.push(
            `${file}:${article.id} - ${article.wordCount}w vs ${baselineArticle.wordCount}w`
          );
        }
      });

    } catch (error) {
      result.missingFiles.push(`${file} (load error)`);
    }
  }

  return result;
}

function main() {
  console.log('Validating curriculum translations...\n');

  const baseline = loadBaseline();
  const results: ValidationResult[] = [];

  for (const language of LANGUAGES) {
    if (language === 'en') continue; // Skip baseline

    console.log(`Validating ${language}...`);
    const result = validateLanguage(language, baseline);
    results.push(result);

    if (result.missingFiles.length === 0 &&
        result.missingArticles.length === 0 &&
        result.invalidQuizzes.length === 0 &&
        result.wordCountIssues.length === 0) {
      console.log(`  ✓ ${language}: Complete and valid`);
    } else {
      console.log(`  ⚠️  ${language}: Issues found`);
      if (result.missingFiles.length > 0) {
        console.log(`    Missing files: ${result.missingFiles.join(', ')}`);
      }
      if (result.missingArticles.length > 0) {
        console.log(`    Article count issues: ${result.missingArticles.join(', ')}`);
      }
      if (result.invalidQuizzes.length > 0) {
        console.log(`    Quiz issues: ${result.invalidQuizzes.join(', ')}`);
      }
      if (result.wordCountIssues.length > 0) {
        console.log(`    Word count issues: ${result.wordCountIssues.join(', ')}`);
      }
    }
  }

  // Summary
  console.log('\n=== SUMMARY ===');
  const completeLanguages = results.filter(r =>
    r.missingFiles.length === 0 &&
    r.missingArticles.length === 0 &&
    r.invalidQuizzes.length === 0
  ).length;

  console.log(`Complete languages: ${completeLanguages}/${results.length}`);
  console.log(`Total articles expected: ${results.length * 195}`);

  if (completeLanguages === results.length) {
    console.log('\n✅ All translations complete and valid!');
    process.exit(0);
  } else {
    console.log('\n❌ Translations incomplete. See issues above.');
    process.exit(1);
  }
}

main();
```


## Interfaces and Dependencies

### Additional Dependencies:

```json
{
  "devDependencies": {
    "deepl-node": "^1.12.0"
  }
}
```

### Environment Variables:

```bash
# .env
DEEPL_API_KEY=your-api-key-here
```

### TypeScript Interfaces (No Changes Needed):

The existing `Article` interface in `src/types/learning.ts` already supports all languages:

```typescript
export interface Article {
  id: string;
  topicId: string;
  title: string;              // Translated
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  wordCount: number;
  articleType?: 'practice' | 'certification';
  orderIndex?: number;
  content: string;            // Translated
  questions: QuizQuestion[];  // Translated
}

export interface QuizQuestion {
  id: string;
  type: 'single_choice' | 'multiple_select' | 'true_false';
  question: string;           // Translated
  options?: string[];         // Translated
  correctIndex?: number;      // Not translated (index reference)
  correctIndices?: number[];  // Not translated
  correctAnswer?: boolean;    // Not translated
}
```


## Cost and Timeline Estimates

### Translation Costs (DeepL API Pro):

- **Rate**: ~$0.00002 per character (~$0.01 per 500 characters)
- **English baseline**: ~433,000 words × 5 chars/word = 2.165M characters
- **Per language cost**: 2.165M × $0.00002 = **$43 per language**
- **10 languages total**: **$430**
- **Buffer for API overhead/retries** (17% more): **$503**
- **AI agent review** (Claude Sonnet for French): **~$3-5** (negligible)
- **Human review** (3 languages, 10-15% of content with agent pre-filtering): **$200-400** (reduced scope)
- **Total estimated cost**: **$703-908**

### Timeline:

- **M1**: 2 days (architecture)
- **M2**: 3 days (infrastructure)
- **M3**: 3 days (baseline extraction)
- **M4**: 5-7 days (French translation with DeepL)
- **M4.5**: 2-3 days (AI agent review of French)
- **M5**: 14 days (batch translation for 9 languages, can parallelize)
- **M6**: 5 days (integration)
- **M7**: 7 days (QA)
- **M8**: 2-3 days (optimization)

**Total**: ~6.5-7 weeks (45-49 days)

**Parallelization opportunities**: M5 translations can run concurrently, reducing calendar time to ~4-5 weeks.


## Risks and Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Translation quality is poor | Medium | High | Pilot with French first; budget for human review |
| Bundle size grows too large | High | Medium | Implement lazy loading and code splitting |
| Quiz questions lose semantic accuracy | Medium | High | Manual review of quiz questions by native speakers |
| Technical terms mistranslated | Medium | High | Use glossary; validate against reference materials |
| Cost overruns (API usage) | Low | Medium | Monitor API usage; consider alternative APIs if needed |
| Timeline slippage on human review | Medium | Low | Have backup reviewers; prioritize highest-value languages |
| Performance degradation | Low | High | Test early and often; optimize before M8 if needed |


## Success Metrics

After completion, we will measure:

1. **Completeness**: 100% of articles available in all 11 languages
2. **Quality**: Native speaker ratings average 6/10 or higher
3. **Performance**: Article load time <500ms in all languages
4. **Adoption**: 30%+ of non-English users engage with translated content
5. **Accuracy**: Quiz questions function correctly in 95%+ of cases

---

**End of ExecPlan**
