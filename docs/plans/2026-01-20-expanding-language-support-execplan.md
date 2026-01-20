# Add European Language Adapters with Enhanced Prefix Detection

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with PLANS.md at `/Users/kaya/Coding/devoro/PLANS.md`.

## Purpose / Big Picture

After this change, Devoro's RSVP speed reading engine will support 11 European languages instead of 6, enabling automatic text processing for Dutch, Polish, Romanian, Swedish, and Czech content. Additionally, all language adapters (both existing and new) will have enhanced compound prefix detection that correctly splits long vernacular words (not just Greek/Latin scientific terms), improving readability during RSVP playback.

A user will be able to import content in any of these 11 languages, and the system will automatically detect the language and apply appropriate hyphenation and word-splitting rules. For example, a Dutch article containing "Donaudampfschifffahrtsgesellschaft" (34 characters) will be split at meaningful boundaries for display, and a Spanish article with "sobrepeso" will recognize the "sobre" prefix and split accordingly.

You can verify this works by importing text in each language, starting RSVP playback, and observing that long words are split at linguistically meaningful boundaries (prefixes + syllables) rather than arbitrary character positions.

## Progress

- [ ] Milestone 1: Enhance existing adapters with comprehensive language-specific prefixes
  - [ ] Research and compile enhanced prefix lists for Spanish, French, Italian, Portuguese
  - [ ] Update SpanishAdapter with enhanced prefixes
  - [ ] Update FrenchAdapter with enhanced prefixes
  - [ ] Update ItalianAdapter with enhanced prefixes
  - [ ] Update PortugueseAdapter with enhanced prefixes
  - [ ] Update tests to verify enhanced prefixes exist
  - [ ] Run tests and verify all pass
  - [ ] Manual verification: Test long words with language-specific prefixes

- [ ] Milestone 2: Add type system support for new languages
  - [ ] Update SupportedLanguage type in types.ts
  - [ ] Update READING_LANGUAGES array in settings.ts
  - [ ] Update ISO 639-3 mapping in detection.ts
  - [ ] Verify TypeScript compilation succeeds

- [ ] Milestone 3: Implement Dutch adapter
  - [ ] Create DutchAdapter.ts with comprehensive prefix list
  - [ ] Create test file for Dutch adapter
  - [ ] Register Dutch adapter in registry.ts
  - [ ] Run tests and verify Dutch hyphenation works
  - [ ] Manual verification: Test Dutch text detection and splitting

- [ ] Milestone 4: Implement Polish adapter
  - [ ] Create PolishAdapter.ts with comprehensive prefix list
  - [ ] Create test file for Polish adapter
  - [ ] Register Polish adapter in registry.ts
  - [ ] Run tests and verify Polish hyphenation works
  - [ ] Manual verification: Test Polish text detection and splitting

- [ ] Milestone 5: Implement Romanian adapter
  - [ ] Create RomanianAdapter.ts with comprehensive prefix list
  - [ ] Create test file for Romanian adapter
  - [ ] Register Romanian adapter in registry.ts
  - [ ] Run tests and verify Romanian hyphenation works
  - [ ] Manual verification: Test Romanian text detection and splitting

- [ ] Milestone 6: Implement Swedish adapter
  - [ ] Create SwedishAdapter.ts with comprehensive prefix list
  - [ ] Create test file for Swedish adapter
  - [ ] Register Swedish adapter in registry.ts
  - [ ] Run tests and verify Swedish hyphenation works
  - [ ] Manual verification: Test Swedish text detection and splitting

- [ ] Milestone 7: Implement Czech adapter
  - [ ] Create CzechAdapter.ts with comprehensive prefix list
  - [ ] Create test file for Czech adapter
  - [ ] Register Czech adapter in registry.ts
  - [ ] Run tests and verify Czech hyphenation works
  - [ ] Manual verification: Test Czech text detection and splitting

- [ ] Milestone 8: End-to-end verification and documentation
  - [ ] Run full test suite and verify all 11 languages pass
  - [ ] Verify all 11 languages registered in registry
  - [ ] Test language detection with sample texts
  - [ ] Verify prefix splitting only occurs for words > 22 characters
  - [ ] Update CLAUDE.md with language count
  - [ ] Create final verification report

## Surprises & Discoveries

(To be filled during implementation)

## Decision Log

- Decision: Enhanced prefix lists to include productive language-specific prefixes
  Rationale: Current adapters only inherit 46 Greek/Latin prefixes from BaseLatinAdapter. These work well for international scientific terms (electro-, photo-, anti-) but miss vernacular compounds in each language. For example, Spanish "sobrepeso" (overweight) won't split at "sobre-" prefix with current list. Enhanced lists will include 15-25 productive prefixes per language, sorted by length (longest first) to match most specific prefixes.
  Date: 2026-01-20

- Decision: Prefix splitting only activates for words > 22 characters (MAX_WORD_LENGTH)
  Rationale: The existing syllables.ts code already implements this correctly via splitLongWord() which checks word.length <= maxLength before attempting any splitting. This prevents short words like "photo" (5 chars) from being unnecessarily split. This decision documents the existing behavior and adds explicit verification tests.
  Date: 2026-01-20

- Decision: Minimum remainder length of 4 characters (MIN_REMAINDER_LENGTH)
  Rationale: Prevents splits like "in-to" or "re-do" which create tiny, hard-to-read chunks. The tryPrefixSplit function already enforces remainder.length >= MIN_REMAINDER_LENGTH (4 chars). This is appropriate for RSVP reading where each chunk displays separately.
  Date: 2026-01-20

- Decision: Add 5 new languages in priority order: Dutch, Polish, Romanian, Swedish, Czech
  Rationale: Based on speaker population (Dutch 23M, Polish 50M, Romanian 24M, Swedish 10M, Czech 10M), confirmed hyphen package support, and Latin script compatibility. All 5 languages have existing TeX hyphenation patterns in the hyphen package v1.13.0.
  Date: 2026-01-20

- Decision: Use ISO 639-1 codes (2-letter) for language identifiers
  Rationale: Consistent with existing system (en, es, fr, de, pt, it). Franc-min detection library returns ISO 639-3 (3-letter) codes which we map to 639-1 in detection.ts.
  Date: 2026-01-20

## Outcomes & Retrospective

(To be filled at completion)

## Context and Orientation

Devoro is a React Native RSVP speed reading app built with Expo. The language adapter system provides language-specific text processing for RSVP playback. Key architectural components:

**Language Adapter Architecture**: Each language has a dedicated adapter class that extends BaseLatinAdapter (located at `/Users/kaya/Coding/devoro/src/services/language/adapters/BaseLatinAdapter.ts`). An adapter provides:
- Language code (ISO 639-1 two-letter code like 'en', 'es')
- Language name (human-readable like 'English', 'Spanish')
- Letter pattern (regex matching valid letters including accents/diacritics)
- Hyphenation function using the hyphen package with TeX patterns
- Compound prefix array for splitting long words
- Caption keywords for filtering image captions
- PDF artifact patterns for removing page numbers and figure references

**Word Splitting Logic**: Located at `/Users/kaya/Coding/devoro/src/services/syllables.ts`. The splitLongWord function uses a two-stage approach:
1. If word length > 22 characters (MAX_WORD_LENGTH), first try compound prefix detection
2. If no prefix match or word still too long after prefix split, fall back to balanced syllable splitting

The prefix detection (tryPrefixSplit function) enforces:
- Remainder must be >= 4 characters (MIN_REMAINDER_LENGTH) to avoid tiny chunks
- Prefix + hyphen must fit within maxLength
- Recursive splitting for remainders that are still too long

**Current State**: Six languages supported (English, Spanish, French, German, Italian, Portuguese). All non-English adapters currently inherit only the 46 Greek/Latin prefixes from BaseLatinAdapter. These prefixes are defined in BaseLatinAdapter.compoundPrefixes and include terms like 'electro', 'photo', 'anti', 'micro', 'super', 'trans', 'pre', 'bio', etc.

**Language Detection**: Uses the franc-min library (trigram statistical analysis) located at `/Users/kaya/Coding/devoro/src/services/language/detection.ts`. Franc returns ISO 639-3 codes which are mapped to ISO 639-1 codes via the ISO_639_3_TO_1 constant.

**Registry**: All adapters are registered in `/Users/kaya/Coding/devoro/src/services/language/registry.ts` as a Record<SupportedLanguage, LanguageAdapter>. The getAdapter function looks up adapters by code and falls back to genericAdapter for unsupported languages.

**Type System**: SupportedLanguage is a union type defined in `/Users/kaya/Coding/devoro/src/services/language/types.ts`. The READING_LANGUAGES array in `/Users/kaya/Coding/devoro/src/types/settings.ts` defines the UI picker options (currently includes 'auto' plus 6 language codes).

**Testing Pattern**: Adapter tests located in `/Users/kaya/Coding/devoro/__tests__/services/language/` follow a consistent structure testing: basic properties (code, name), hyphenation with challenging words, letter patterns, caption keywords, PDF artifact patterns, and adapter consistency across all adapters.

**Hyphen Package**: The project uses the hyphen package v1.13.0 which provides TeX-based hyphenation patterns for 80+ languages. Each adapter imports a language-specific pattern (e.g., 'hyphen/es' for Spanish) and calls hyphenateSync to get syllable arrays.

## Milestone 1: Enhance Existing Adapters with Comprehensive Prefixes

The goal of this milestone is to add language-specific compound prefixes to the four existing non-English adapters (Spanish, French, Italian, Portuguese). These prefixes will supplement (not replace) the inherited Greek/Latin prefixes, enabling better splitting of vernacular compound words.

Current state: Each adapter has only the 46 Greek/Latin prefixes inherited from BaseLatinAdapter. For example, Spanish adapter cannot detect the "sobre" prefix in "sobrepeso" (overweight), French cannot detect "pré" in "prénom" (first name), Italian cannot detect "stra" in "straordinario" (extraordinary), and Portuguese cannot detect "des" in "desconhecido" (unknown).

After this milestone: Each adapter will have 15-25 additional language-specific prefixes, sorted by length (longest first) to match the most specific prefix when multiple prefixes could match.

### Research: Enhanced Prefix Lists

For each language, identify productive prefixes that:
1. Are common in the language (appear in many words)
2. Create meaningful semantic units (splitting at prefix improves comprehension)
3. Are NOT already in BaseLatinAdapter's Greek/Latin list
4. Are long enough to avoid false positives (prefer 4+ characters, but include some 3-char if highly productive)

**Spanish Enhanced Prefixes** (sorted by length):
- 6+ chars: `contra` (against), `sobre` (over)
- 5 chars: `entre` (between/among), `infra` (below), `extra` (beyond), `ultra` (beyond)
- 4 chars: `ante` (before), `tras` (across/beyond), `post` (after)
- 3 chars: `des` (un-/dis-), `pre` (already in base), `con` (with - but too common as standalone word, skip)

Note: Some overlap with BaseLatinAdapter (ultra, extra, infra, post) but included for completeness. Deduplication will happen via array spreading.

Note: `auto`, `super`, `ultra`, `infra`, `extra` already in BaseLatinAdapter but included for completeness.

Final Spanish list (sorted longest first): `contra`, `sobre`, `entre`, `infra`, `extra`, `ante`, `tras`, `des`, `re`

**French Enhanced Prefixes**:
- 7 chars: `arrière` (back)
- 6 chars: `contre` (against)
- 5 chars: `avant` (before), `après` (after), `entre` (between)
- 4 chars: `sous` (under), `sans` (without)
- 3 chars: `pré` (pre-), `dés` (un-/dis-), `sur` (over)
- 2 chars: `re` (re-/again - most common French prefix), `dé` (un-/dis-), `de` (from/un-)

Final French list (sorted longest first): `arrière`, `contre`, `avant`, `après`, `entre`, `sous`, `sans`, `pré`, `dés`, `sur`, `re`, `dé`, `de`

**Italian Enhanced Prefixes**:
- 6+ chars: `contro` (against), `sovra` (over)
- 5 chars: `sopra` (above), `sotto` (under)
- 4 chars: `stra` (extra-), `dopo` (after)
- 3 chars: `dis` (un-/dis-), `fra`/`tra` (between - but too short and common, skip)

Final Italian list: `contro`, `sovra`, `sopra`, `sotto`, `stra`, `dopo`, `dis`

**Portuguese Enhanced Prefixes**:
- 6+ chars: `contra` (against), `sobre` (over)
- 5 chars: `entre` (between), `infra` (below), `extra` (beyond), `ultra` (beyond)
- 4 chars: `ante` (before), `após` (after)
- 3 chars: `des` (un-/dis-), `pós` (post-), `pré` (pre-)

Final Portuguese list: `contra`, `sobre`, `entre`, `infra`, `extra`, `ante`, `após`, `des`, `pós`, `pré`

### Code Changes

Edit `/Users/kaya/Coding/devoro/src/services/language/adapters/SpanishAdapter.ts`. After the `letterPattern` property and before `hyphenateSync`, add:

    /** Spanish compound prefixes (inherited + Spanish-specific) */
    readonly compoundPrefixes: string[] = [
      ...super.compoundPrefixes, // Inherit 46 Greek/Latin prefixes from BaseLatinAdapter
      // Spanish-specific prefixes (9 total), sorted by length (longest first)
      'contra', 'sobre', 'entre', 'infra', 'extra', 'ante', 'tras', 'des', 're',
    ];

The syntax ...super.compoundPrefixes spreads the inherited array from BaseLatinAdapter, then we append Spanish-specific prefixes. Duplicates (like 'extra', 'infra') will appear twice, but this is acceptable since prefix matching stops at first match and longest prefixes are checked first (both in BaseLatinAdapter and our additions).

Edit `/Users/kaya/Coding/devoro/src/services/language/adapters/FrenchAdapter.ts` similarly:

    /** French compound prefixes (inherited + French-specific) */
    readonly compoundPrefixes: string[] = [
      ...super.compoundPrefixes,
      // French-specific prefixes (13 total), sorted by length (longest first)
      'arrière', 'contre', 'avant', 'après', 'entre', 'sous', 'sans', 'pré', 'dés', 'sur', 're', 'dé', 'de',
    ];

Edit `/Users/kaya/Coding/devoro/src/services/language/adapters/ItalianAdapter.ts`:

    /** Italian compound prefixes (inherited + Italian-specific) */
    readonly compoundPrefixes: string[] = [
      ...super.compoundPrefixes,
      // Italian-specific prefixes (7 total), sorted by length
      'contro', 'sovra', 'sopra', 'sotto', 'stra', 'dopo', 'dis',
    ];

Edit `/Users/kaya/Coding/devoro/src/services/language/adapters/PortugueseAdapter.ts`:

    /** Portuguese compound prefixes (inherited + Portuguese-specific) */
    readonly compoundPrefixes: string[] = [
      ...super.compoundPrefixes,
      // Portuguese-specific prefixes (10 total), sorted by length
      'contra', 'sobre', 'entre', 'infra', 'extra', 'ante', 'após', 'des', 'pós', 'pré',
    ];

### Testing Changes

Edit `/Users/kaya/Coding/devoro/__tests__/services/language/AdditionalAdapters.test.ts`. Find the SpanishAdapter test block and add a new describe block after the existing tests:

    describe('compoundPrefixes', () => {
      it('should include language-specific Spanish prefixes', () => {
        expect(spanishAdapter.compoundPrefixes).toContain('sobre');
        expect(spanishAdapter.compoundPrefixes).toContain('contra');
        expect(spanishAdapter.compoundPrefixes).toContain('entre');
        expect(spanishAdapter.compoundPrefixes).toContain('des');
        // Should also inherit from BaseLatinAdapter
        expect(spanishAdapter.compoundPrefixes).toContain('photo');
        expect(spanishAdapter.compoundPrefixes).toContain('anti');
        // Total should be base (46) + Spanish-specific (8)
        expect(spanishAdapter.compoundPrefixes.length).toBeGreaterThan(46);
      });
    });

Repeat for FrenchAdapter, ItalianAdapter, and PortugueseAdapter test blocks, adjusting the expected prefixes for each language.

### Validation

From the repository root `/Users/kaya/Coding/devoro`, run:

    npm test AdditionalAdapters.test.ts

Expected output: All tests pass, including the new compoundPrefixes tests. You should see output like:

    PASS  __tests__/services/language/AdditionalAdapters.test.ts
      SpanishAdapter
        ✓ should include language-specific Spanish prefixes (X ms)
      FrenchAdapter
        ✓ should include language-specific French prefixes (X ms)
      ...

    Test Suites: 1 passed, 1 total
    Tests: XX passed, XX total

### Manual Verification

Create a small test script at `/Users/kaya/Coding/devoro/test-prefixes.js`:

    const { spanishAdapter } = require('./src/services/language/adapters/SpanishAdapter');
    const { splitLongWord } = require('./src/services/syllables');

    // Test Spanish "sobre" prefix with a long word
    const longWord = 'sobrepeso'.repeat(3); // "sobrepesosobrepesosobrepeso" = 27 chars
    const result = splitLongWord(longWord, 22, spanishAdapter);

    console.log('Word:', longWord);
    console.log('Length:', longWord.length);
    console.log('Split result:', result);
    console.log('First chunk starts with "sobre-"?', result[0].startsWith('sobre-'));

Run:

    node test-prefixes.js

Expected output:

    Word: sobrepesosobrepesosobrepeso
    Length: 27
    Split result: [ 'sobre-', 'pesosobrepesosobrepeso' ]
    First chunk starts with "sobre-"? true

This confirms that the "sobre" prefix is detected and used for splitting. Delete the test script after verification.

### Acceptance

After this milestone, the four existing language adapters (Spanish, French, Italian, Portuguese) will each have a compoundPrefixes array containing 46 inherited Greek/Latin prefixes plus 7-11 language-specific prefixes. Running the test suite shows all tests pass. Manual verification demonstrates that a long Spanish word with the "sobre" prefix is correctly split at the prefix boundary.

## Milestone 2: Add Type System Support for New Languages

The goal of this milestone is to update TypeScript types and constants to support five new language codes: nl (Dutch), pl (Polish), ro (Romanian), sv (Swedish), cs (Czech).

Current state: The SupportedLanguage type includes only 6 languages (en, es, fr, de, pt, it). The READING_LANGUAGES array has 6 language entries plus 'auto'. The ISO 639-3 to 639-1 mapping includes only 6 languages.

After this milestone: All type definitions and constants will support 11 languages. TypeScript compilation will recognize the new language codes. No runtime behavior changes yet (new adapters don't exist), but the types are ready.

### Update SupportedLanguage Type

Edit `/Users/kaya/Coding/devoro/src/services/language/types.ts`. Find the SupportedLanguage type definition (should be around line 10-15) and replace it with:

    export type SupportedLanguage =
      | 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it'
      | 'nl' | 'pl' | 'ro' | 'sv' | 'cs';

This union type constrains all language codes used in adapters, registry, and detection. The new codes are: nl (Dutch), pl (Polish), ro (Romanian), sv (Swedish), cs (Czech).

### Update READING_LANGUAGES Array

Edit `/Users/kaya/Coding/devoro/src/types/settings.ts`. Find the READING_LANGUAGES constant (around line 41-49) and replace it with:

    export const READING_LANGUAGES = [
      { code: 'auto', label: 'Auto-detect' },
      { code: 'cs', label: 'Czech' },
      { code: 'de', label: 'German' },
      { code: 'en', label: 'English' },
      { code: 'es', label: 'Spanish' },
      { code: 'fr', label: 'French' },
      { code: 'it', label: 'Italian' },
      { code: 'nl', label: 'Dutch' },
      { code: 'pl', label: 'Polish' },
      { code: 'pt', label: 'Portuguese' },
      { code: 'ro', label: 'Romanian' },
      { code: 'sv', label: 'Swedish' },
    ] as const;

This array defines the language options displayed in the UI language picker (currently commented out in journey-profile.tsx but data structure is maintained). Languages are sorted alphabetically by label for easier scanning.

### Update ISO 639-3 Mapping

Edit `/Users/kaya/Coding/devoro/src/services/language/detection.ts`. Find the ISO_639_3_TO_1 constant (should be around line 15-25) and add the new mappings:

    const ISO_639_3_TO_1: Record<string, SupportedLanguage> = {
      eng: 'en',
      spa: 'es',
      fra: 'fr',
      deu: 'de',
      por: 'pt',
      ita: 'it',
      // New languages
      nld: 'nl',
      pol: 'pl',
      ron: 'ro',
      swe: 'sv',
      ces: 'cs',
    };

The franc-min library returns ISO 639-3 codes (3-letter), which we map to ISO 639-1 codes (2-letter) used throughout the app. The mappings are: nld → nl (Dutch), pol → pl (Polish), ron → ro (Romanian), swe → sv (Swedish), ces → cs (Czech).

Note: The ISO 639-3 code for Romanian is 'ron' (not 'rum'), and Czech is 'ces' (not 'cze'). These are the canonical ISO 639-3 codes returned by franc-min.

### Validation

From the repository root, run TypeScript compilation:

    npx tsc --noEmit

Expected output: No errors. If you see errors about unknown language codes in registry.ts, that's expected (adapters don't exist yet). You can temporarily comment out the new codes in the registry or proceed to the next milestone to create the adapters.

Alternatively, check types programmatically:

    npm test types.test.ts

If types.test.ts doesn't exist, just verify that running npm test doesn't produce TypeScript compilation errors related to the type changes.

### Acceptance

After this milestone, the TypeScript type system recognizes 11 language codes. The READING_LANGUAGES array contains 11 language entries plus 'auto' (12 total). The detection.ts mapping can convert franc's 3-letter codes to our 2-letter codes for all 11 languages. No runtime errors occur from the type changes (though new adapters don't exist yet).

## Milestone 3: Implement Dutch Adapter

The goal of this milestone is to create a complete Dutch language adapter with comprehensive prefix detection, hyphenation, and content filtering patterns.

After this milestone: Dutch text can be automatically detected and processed. Long Dutch words will split at prefix boundaries (e.g., "voorkomen" at "voor-") and syllable boundaries. Dutch caption keywords and PDF artifacts will be filtered correctly.

### Research: Dutch Language Characteristics

Dutch (Nederlands) is a West Germanic language spoken by 23 million people in the Netherlands, Belgium, and Suriname. Key characteristics:

**Character set**: Primarily uses basic Latin alphabet a-z. Accents are rare in modern Dutch but appear in loanwords: á, à, ä, é, è, ë, í, ì, ï, ó, ò, ö, ú, ù, ü. The digraph "ij" is treated as a single letter in Dutch but we process it as two characters (i + j).

**Prefixes**: Dutch has a rich system of inseparable prefixes (be-, ge-, ver-, ont-, her-, er-, mis-) and separable prefixes (aan-, af-, bij-, in-, mee-, na-, om-, op-, over-, uit-, voor-, etc.). For RSVP splitting, we focus on the most productive inseparable prefixes and longer separable prefixes that create clear semantic units.

Enhanced Dutch prefix list (23 prefixes, sorted by length):
- 6 chars: `tussen` (between), `buiten` (outside), `binnen` (inside), `achter` (behind)
- 5 chars: `tegen` (against), `onder` (under), `boven` (above)
- 4 chars: `voor` (for/before), `over` (over), `door` (through), `rond` (around)
- 3 chars: `ver` (intensive prefix), `ont` (de-/un-), `her` (re-), `bij` (by/at), `mee` (with), `uit` (out), `aan` (on/to)
- 2 chars: `be` (common prefix), `ge` (past participle prefix), `op` (on/up), `in` (in), `af` (off)

Note: Very short prefixes (2 chars) are included because they're highly productive in Dutch (e.g., "begrijpen", "gelopen", "opnieuw"). MIN_REMAINDER_LENGTH = 4 prevents bad splits like "be-d" from "bed" (remainder "d" is only 1 char < 4).

**Caption keywords**: Foto (Photo), Afbeelding (Image/Picture), Figuur (Figure), Grafiek (Graph), Illustratie (Illustration), Tabel (Table), Diagram (Diagram), Schematisch (Schematic).

**PDF patterns**: Dutch uses "Pagina X van Y" for page numbers (Pagina = Page, van = of). Figure references: "Figuur X" or "Fig. X". Table references: "Tabel X" or "Tab. X".

### Create Dutch Adapter

Create the file `/Users/kaya/Coding/devoro/src/services/language/adapters/DutchAdapter.ts` with this content:

    /**
     * Dutch Language Adapter
     *
     * Provides Dutch-specific text processing for RSVP reading.
     * Dutch (Nederlands) is spoken by 23M people in Netherlands, Belgium, Suriname.
     *
     * Key features:
     * - Inseparable prefixes: be-, ge-, ver-, ont-, her-, er-, mis-
     * - Separable prefixes: voor-, over-, onder-, uit-, aan-, mee-, etc.
     * - Rare accents in loanwords: á, é, ë, ï, ó, ö, ü
     * - TeX-based hyphenation via hyphen/nl
     */

    // @ts-expect-error - hyphen package doesn't have type definitions
    import hyphenNl from 'hyphen/nl';
    import { HyphenationResult } from '../types';
    import { BaseLatinAdapter } from './BaseLatinAdapter';

    /** Soft hyphen character used by the hyphen library */
    const SOFT_HYPHEN = '\u00AD';

    export class DutchAdapter extends BaseLatinAdapter {
      readonly code = 'nl' as const;
      readonly name = 'Dutch';

      /**
       * Dutch letters including rare accents.
       * The ij digraph is not special-cased (processed as i + j).
       */
      readonly letterPattern: RegExp = /[a-zA-ZáàäéèëíìïóòöúùüÁÀÄÉÈËÍÌÏÓÒÖÚÙÜ]/;

      /**
       * Hyphenate a Dutch word using the TeX hyphenation patterns.
       */
      hyphenateSync(word: string): HyphenationResult {
        const hyphenated = hyphenNl.hyphenateSync(word);
        const syllables = hyphenated.split(SOFT_HYPHEN);

        return {
          syllables,
          hyphenatedWord: hyphenated,
        };
      }

      /**
       * Dutch compound prefixes (inherited + Dutch-specific).
       * Includes both inseparable (be-, ge-, ver-) and separable (voor-, over-) prefixes.
       * Total: 46 inherited + 23 Dutch-specific = 69 prefixes.
       */
      readonly compoundPrefixes: string[] = [
        ...super.compoundPrefixes,
        // Dutch-specific prefixes (23 total), sorted by length (longest first)
        // 6 chars
        'tussen', 'buiten', 'binnen', 'achter',
        // 5 chars
        'tegen', 'onder', 'boven',
        // 4 chars
        'voor', 'over', 'door', 'rond',
        // 3 chars
        'ver', 'ont', 'her', 'bij', 'mee', 'uit', 'aan',
        // 2 chars (highly productive, protected by MIN_REMAINDER_LENGTH = 4)
        'be', 'ge', 'op', 'in', 'af',
      ];

      /** Dutch caption keywords */
      readonly captionKeywords: string[] = [
        'Foto', 'Afbeelding', 'Figuur', 'Grafiek', 'Illustratie',
        'Tabel', 'Diagram', 'Schematisch',
      ];

      /** Dutch PDF artifact patterns */
      readonly pdfArtifactPatterns: RegExp[] = [
        /^(Pagina\s*)?\d+(\s*(van|\/)\s*\d+)?$/i, // "1", "Pagina 1", "1 van 10"
        /^-\s*\d+\s*-$/, // "- 1 -"
        /^\[\d+\]$/, // "[1]" standalone footnote refs
        /^(Figuur|Fig\.|Tabel|Tab\.)\s*\d+(\.\d+)?\.?$/i, // "Figuur 1", "Tabel 2.1"
      ];
    }

    /** Singleton instance of the Dutch adapter */
    export const dutchAdapter = new DutchAdapter();

### Register Dutch Adapter

Edit `/Users/kaya/Coding/devoro/src/services/language/registry.ts`. Add the import at the top (after the existing adapter imports):

    import { dutchAdapter } from './adapters/DutchAdapter';

Update the adapters Record (add the nl entry):

    const adapters: Record<SupportedLanguage, LanguageAdapter> = {
      en: englishAdapter,
      es: spanishAdapter,
      fr: frenchAdapter,
      de: germanAdapter,
      pt: portugueseAdapter,
      it: italianAdapter,
      nl: dutchAdapter,
    };

### Create Dutch Adapter Tests

Create the file `/Users/kaya/Coding/devoro/__tests__/services/language/DutchAdapter.test.ts`:

    /**
     * Tests for Dutch Language Adapter
     */

    import { dutchAdapter, DutchAdapter } from '../../../src/services/language/adapters/DutchAdapter';

    describe('DutchAdapter', () => {
      describe('basic properties', () => {
        it('should have correct language code', () => {
          expect(dutchAdapter.code).toBe('nl');
        });

        it('should have correct language name', () => {
          expect(dutchAdapter.name).toBe('Dutch');
        });

        it('should be an instance of DutchAdapter', () => {
          expect(dutchAdapter).toBeInstanceOf(DutchAdapter);
        });
      });

      describe('hyphenateSync', () => {
        it('should split Dutch words into syllables', () => {
          const result = dutchAdapter.hyphenateSync('begrijpen');
          expect(result.syllables.length).toBeGreaterThan(1);
          expect(result.syllables.join('')).toBe('begrijpen');
        });

        it('should handle Dutch words with prefixes', () => {
          const result = dutchAdapter.hyphenateSync('voorkomen');
          expect(result.syllables.join('')).toBe('voorkomen');
        });

        it('should handle long compound words', () => {
          const result = dutchAdapter.hyphenateSync('samenwerking');
          expect(result.syllables.join('')).toBe('samenwerking');
        });
      });

      describe('letterPattern', () => {
        it('should match basic Latin letters', () => {
          expect(dutchAdapter.letterPattern.test('a')).toBe(true);
          expect(dutchAdapter.letterPattern.test('Z')).toBe(true);
        });

        it('should match accented vowels', () => {
          expect(dutchAdapter.letterPattern.test('é')).toBe(true);
          expect(dutchAdapter.letterPattern.test('ë')).toBe(true);
          expect(dutchAdapter.letterPattern.test('ï')).toBe(true);
        });

        it('should not match punctuation', () => {
          expect(dutchAdapter.letterPattern.test('.')).toBe(false);
          expect(dutchAdapter.letterPattern.test(',')).toBe(false);
        });
      });

      describe('compoundPrefixes', () => {
        it('should include Dutch-specific prefixes', () => {
          expect(dutchAdapter.compoundPrefixes).toContain('voor');
          expect(dutchAdapter.compoundPrefixes).toContain('over');
          expect(dutchAdapter.compoundPrefixes).toContain('onder');
          expect(dutchAdapter.compoundPrefixes).toContain('be');
          expect(dutchAdapter.compoundPrefixes).toContain('ge');
        });

        it('should inherit Greek/Latin prefixes', () => {
          expect(dutchAdapter.compoundPrefixes).toContain('photo');
          expect(dutchAdapter.compoundPrefixes).toContain('anti');
        });

        it('should have comprehensive prefix list', () => {
          expect(dutchAdapter.compoundPrefixes.length).toBeGreaterThan(60);
        });
      });

      describe('captionKeywords', () => {
        it('should include Dutch caption keywords', () => {
          expect(dutchAdapter.captionKeywords).toContain('Foto');
          expect(dutchAdapter.captionKeywords).toContain('Afbeelding');
          expect(dutchAdapter.captionKeywords).toContain('Figuur');
        });

        it('should have at least 5 keywords', () => {
          expect(dutchAdapter.captionKeywords.length).toBeGreaterThanOrEqual(5);
        });
      });

      describe('pdfArtifactPatterns', () => {
        it('should match Dutch page indicators', () => {
          const patterns = dutchAdapter.pdfArtifactPatterns;
          const pagePattern = patterns[0];
          expect(pagePattern.test('Pagina 1')).toBe(true);
          expect(pagePattern.test('1 van 10')).toBe(true);
          expect(pagePattern.test('5')).toBe(true);
        });

        it('should match Dutch figure references', () => {
          const patterns = dutchAdapter.pdfArtifactPatterns;
          const figurePattern = patterns.find(p => p.source.includes('Figuur'));
          expect(figurePattern?.test('Figuur 1')).toBe(true);
          expect(figurePattern?.test('Tabel 2.1')).toBe(true);
        });
      });
    });

### Validation

Run the Dutch adapter tests:

    npm test DutchAdapter.test.ts

Expected output: All tests pass. You should see approximately 18 test cases passing.

Verify registry includes Dutch:

    npm test registry.test.ts

Expected: The test "should have all supported languages" should now expect 7 languages (was 6).

### Manual Verification

Create a test script `/Users/kaya/Coding/devoro/test-dutch.js`:

    const { dutchAdapter } = require('./src/services/language/adapters/DutchAdapter');
    const { detectLanguage } = require('./src/services/language/detection');
    const { getAdapter } = require('./src/services/language/registry');
    const { splitLongWord } = require('./src/services/syllables');

    // Test 1: Detection
    const dutchText = 'Dit is een Nederlandse tekst die gebruikt wordt om de taal te detecteren.';
    const detected = detectLanguage(dutchText);
    console.log('Detected language:', detected); // Should be 'nl'

    // Test 2: Adapter retrieval
    const adapter = getAdapter('nl');
    console.log('Adapter name:', adapter.name); // Should be 'Dutch'

    // Test 3: Prefix splitting
    const longWord = 'voorkomenvoor'.repeat(2); // "voorkomenvvoorkomenv" = 26 chars
    const split = splitLongWord(longWord, 22, dutchAdapter);
    console.log('Long word split:', split);
    console.log('First chunk has "voor-" prefix?', split[0].startsWith('voor-'));

Run:

    node test-dutch.js

Expected output:

    Detected language: nl
    Adapter name: Dutch
    Long word split: [ 'voor-', 'komenvvoorkomenv' ]
    First chunk has "voor-" prefix? true

Delete the test script after verification.

### Acceptance

After this milestone, Dutch is fully supported. The dutchAdapter is registered in the registry. Dutch text is automatically detected via franc-min. Long Dutch words split at Dutch-specific prefix boundaries. Dutch caption keywords and PDF artifacts are filtered. All tests pass.

## Milestones 4-7: Implement Polish, Romanian, Swedish, Czech Adapters

(Following the exact same pattern as Milestone 3, I'll provide detailed specifications for each language. Each milestone follows the structure: Research → Create Adapter → Register → Create Tests → Validation → Manual Verification → Acceptance.)

### Milestone 4: Polish Adapter (pl)

**Polish Language Characteristics:**
- 50 million speakers (largest Slavic language in EU)
- ISO 639-3 code: pol
- Unique characters: ą, ć, ę, ł, ń, ó, ś, ź, ż (VERY distinctive, ł is almost exclusive to Polish)
- Letter pattern: /[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/

**Enhanced Polish Prefixes** (26 prefixes, sorted by length):
- 6 chars: `między` (between)
- 5 chars: `współ` (co-/together), `przed` (before), `ponad` (above), `spoza` (from beyond)
- 4 chars: `prze` (trans-/through), `przy` (at/by), `poza` (beyond), `pozo` (remaining)
- 3 chars: `nie` (non-/un-), `roz` (dis-/apart), `pod` (under), `nad` (over), `bez` (without), `doz` (up to), `wyz` (out)
- 2 chars: `po` (after), `za` (behind/for), `do` (to/until), `od` (from), `na` (on), `we` (in), `ze` (with/from), `wy` (out), `uz` (augmentative), `ob` (around)

**Caption keywords**: Zdjęcie, Obraz, Fotografia, Figura, Wykres, Ilustracja, Tabela, Diagram

**PDF patterns**: "Strona X z Y" (Strona = Page, z = of/from), "Figura X", "Tabela X"

Create `/Users/kaya/Coding/devoro/src/services/language/adapters/PolishAdapter.ts` following the Dutch adapter template, adjusting for Polish specifics. Create tests at `/__tests__/services/language/PolishAdapter.test.ts`. Register in registry.ts.

### Milestone 5: Romanian Adapter (ro)

**Romanian Language Characteristics:**
- 24 million speakers (Romania, Moldova)
- ISO 639-3 code: ron (NOT rum)
- Romance language (closest to Latin among Romance languages)
- Unique characters: ă (schwa), â (close central unrounded vowel), î (same sound as â but different usage), ș (sh sound), ț (ts sound)
- Letter pattern: /[a-zA-ZăâîșțĂÂÎȘȚ]/

**Enhanced Romanian Prefixes** (15 prefixes):
- 5 chars: `supra` (over/above), `între` (between), `extra` (extra), `infra` (below), `ultra` (ultra)
- 4 chars: `ante` (before), `post` (after)
- 3 chars: `des` (un-/de-), `pre` (pre-), `sub` (under), `con` (with), `dis` (dis-)
- 2 chars: `ne` (non-/un-), `în` (in), `re` (re-)

**Caption keywords**: Fotografie, Imagine, Figura, Grafic, Ilustrație, Tabel, Diagramă

**PDF patterns**: "Pagina X din Y" (din = of/from), "Figura X", "Tabel X"

Create `/Users/kaya/Coding/devoro/src/services/language/adapters/RomanianAdapter.ts`. Create tests at `/__tests__/services/language/RomanianAdapter.test.ts`. Register in registry.ts.

### Milestone 6: Swedish Adapter (sv)

**Swedish Language Characteristics:**
- 10 million speakers (Sweden, Finland)
- ISO 639-3 code: swe
- North Germanic language (similar to Norwegian, Danish)
- Unique characters: å (long 'o' sound), ä (like 'e' in 'bed'), ö (like 'u' in 'urd')
- Letter pattern: /[a-zA-ZåäöÅÄÖ]/

**Enhanced Swedish Prefixes** (26 prefixes):
- 7 chars: `omkring` (around)
- 6 chars: `mellan` (between)
- 5 chars: `genom` (through), `bakom` (behind), `efter` (after), `innan` (before)
- 4 chars: `över` (over), `från` (from), `till` (to/until), `utan` (without), `runt` (around), `emot` (against), `åter` (re-/again)
- 3 chars: `för` (for/before), `mot` (towards), `upp` (up), `ned` (down), `sam` (co-/together), `mis` (mis-)
- 2 chars: `på` (on), `av` (of/from), `in` (in), `ut` (out), `om` (about/re-), `an` (on), `be` (prefix for verbs)

**Caption keywords**: Foto, Bild, Figur, Grafik, Illustration, Tabell, Diagram

**PDF patterns**: "Sida X av Y" (Sida = Page, av = of), "Figur X", "Tabell X"

Create `/Users/kaya/Coding/devoro/src/services/language/adapters/SwedishAdapter.ts`. Create tests at `/__tests__/services/language/SwedishAdapter.test.ts`. Register in registry.ts.

### Milestone 7: Czech Adapter (cs)

**Czech Language Characteristics:**
- 10 million speakers (Czech Republic)
- ISO 639-3 code: ces (NOT cze)
- West Slavic language (similar to Slovak)
- Unique characters: ř (unique to Czech, like 'rzh' sound), ů (long 'u'), ě (softens preceding consonant), plus č, ď, ň, š, ť, ž (with háček/caron)
- Letter pattern: /[a-zA-ZáčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/

**Enhanced Czech Prefixes** (22 prefixes):
- 4 chars: `před` (before), `mezi` (between), `mimo` (outside/beyond), `skrz` (through)
- 3 chars: `roz` (dis-/apart), `pod` (under), `nad` (over), `bez` (without), `při` (at/by), `pro` (for), `pre` (over/across), `pře` (trans-)
- 2 chars: `ne` (non-/un-), `po` (after), `za` (behind/for), `do` (into), `od` (from), `na` (on), `vy` (out), `ob` (around), `uz` (closed), `ze` (from)

**Caption keywords**: Fotografie, Obrázek, Figura, Graf, Ilustrace, Tabulka, Diagram

**PDF patterns**: "Strana X z Y" (Strana = Page, z = of/from), "Obrázek X", "Tabulka X"

Create `/Users/kaya/Coding/devoro/src/services/language/adapters/CzechAdapter.ts`. Create tests at `/__tests__/services/language/CzechAdapter.test.ts`. Register in registry.ts.

## Milestone 8: End-to-End Verification and Documentation

The goal of this milestone is to comprehensively verify that all 11 languages work correctly, that prefix splitting only occurs for long words (> 22 chars), and that all components integrate properly.

After this milestone: The feature is complete, tested, and documented. The Devoro app supports 11 European languages with enhanced prefix detection.

### Comprehensive Test Verification

Run the full test suite:

    npm test

Expected output: All tests pass. Total test count should increase by approximately 90-100 tests (5 new adapters × ~18 tests each).

Run language-specific test suites:

    npm test AdditionalAdapters.test.ts
    npm test DutchAdapter.test.ts
    npm test PolishAdapter.test.ts
    npm test RomanianAdapter.test.ts
    npm test SwedishAdapter.test.ts
    npm test CzechAdapter.test.ts

Expected: All pass.

Run registry tests:

    npm test registry.test.ts

Expected: The getSupportedLanguages() test should return 11 languages: ['en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'pl', 'ro', 'sv', 'cs'].

Run detection tests:

    npm test detection.test.ts

Expected: All existing tests pass. If detection tests don't cover the new languages, that's acceptable (franc-min handles detection internally).

### Verify Prefix Splitting Only for Long Words

Create a comprehensive verification script `/Users/kaya/Coding/devoro/verify-splitting.js`:

    const { splitLongWord } = require('./src/services/syllables');
    const { getAdapter } = require('./src/services/language/registry');

    // Test that short words with prefixes are NOT split (threshold is 22 chars)
    function testShortWords() {
      const tests = [
        { lang: 'nl', word: 'voor', expected: 1 }, // 4 chars, has prefix
        { lang: 'nl', word: 'begrijpen', expected: 1 }, // 9 chars, has prefix 'be'
        { lang: 'nl', word: 'voorkomen', expected: 1 }, // 9 chars, has prefix 'voor'
        { lang: 'es', word: 'sobre', expected: 1 }, // 5 chars, is a prefix
        { lang: 'es', word: 'sobrepeso', expected: 1 }, // 9 chars, has prefix 'sobre'
        { lang: 'pl', word: 'przed', expected: 1 }, // 5 chars, has prefix
        { lang: 'fr', word: 'contre', expected: 1 }, // 6 chars, has prefix
        { lang: 'en', word: 'photosynthesis', expected: 1 }, // 14 chars, has 'photo' prefix
        // Edge case: exactly 22 chars should NOT split
        { lang: 'en', word: 'a'.repeat(22), expected: 1 }, // 22 chars exactly
      ];

      console.log('Testing short words (≤22 chars should NOT split):');
      tests.forEach(({ lang, word, expected }) => {
        const adapter = getAdapter(lang);
        const result = splitLongWord(word, 22, adapter);
        const pass = result.length === expected && result[0] === word;
        const status = pass ? '✓' : '✗ FAIL';
        console.log(`  ${word} (${lang}, ${word.length} chars): ${status} (got ${result.length} chunks: ${result.join(', ')})`);
        if (!pass) {
          console.log(`    ERROR: Expected 1 chunk with original word, got ${result.length} chunks`);
        }
      });
    }

    // Test that long words with prefixes ARE split at prefix
    function testLongWordsWithPrefixes() {
      const tests = [
        { lang: 'nl', word: 'voorkomenvvoorkomenvoor', expectedPrefix: 'voor-' }, // 23 chars (> 22)
        { lang: 'es', word: 'sobrepesosobrepesosobrepeso', expectedPrefix: 'sobre-' }, // 27 chars
        { lang: 'pl', word: 'przedsiębiorstwoprzedsięba', expectedPrefix: 'przed-' }, // 26 chars
        { lang: 'fr', word: 'contreindicationcontreindd', expectedPrefix: 'contre-' }, // 26 chars
      ];

      console.log('\nTesting long words with prefixes (>22 chars should split at prefix):');
      tests.forEach(({ lang, word, expectedPrefix }) => {
        const adapter = getAdapter(lang);
        const result = splitLongWord(word, 22, adapter);
        const pass = result.length > 1 && result[0] === expectedPrefix;
        const status = pass ? '✓' : '✗ FAIL';
        console.log(`  ${word.substring(0, 20)}... (${lang}, ${word.length} chars): ${status} (first chunk: ${result[0]})`);
        if (!pass) {
          console.log(`    ERROR: Expected first chunk to be "${expectedPrefix}", got "${result[0]}"`);
        }
      });
    }

    // Test that long words fall back to syllable split (with or without prefix)
    function testLongWordsWithoutPrefixes() {
      const tests = [
        { lang: 'en', word: 'extraordinaryextraordinary' }, // 26 chars, has 'extra' prefix
        { lang: 'de', word: 'untersuchunguntersuchung' }, // 24 chars
        // Edge case: exactly 23 chars should split
        { lang: 'en', word: 'a'.repeat(23) }, // 23 chars (> 22)
      ];

      console.log('\nTesting long words (>22 chars should split):');
      tests.forEach(({ lang, word }) => {
        const adapter = getAdapter(lang);
        const result = splitLongWord(word, 22, adapter);
        const pass = result.length > 1;
        const status = pass ? '✓' : '✗ FAIL';
        console.log(`  ${word.substring(0, 20)}... (${lang}, ${word.length} chars): ${status} (${result.length} chunks)`);
        if (!pass) {
          console.log(`    ERROR: Expected word to be split, got single chunk: ${result[0]}`);
        }
      });
    }

    testShortWords();
    testLongWordsWithPrefixes();
    testLongWordsWithoutPrefixes();

Run:

    node verify-splitting.js

Expected output: All tests pass (✓). Short words are not split. Long words with prefixes split at prefix boundaries. Long words without clear prefixes split at syllable boundaries.

Delete the script after verification.

### Verify Language Detection

Create a detection verification script `/Users/kaya/Coding/devoro/verify-detection.js`:

    const { detectLanguage } = require('./src/services/language/detection');

    const samples = {
      nl: 'Dit is een Nederlandse tekst die gebruikt wordt om de taal te detecteren. Het bevat verschillende woorden en zinnen.',
      pl: 'To jest polski tekst używany do wykrywania języka. Zawiera polskie znaki takie jak ą, ę, ł, ń, ś, ź, ż.',
      ro: 'Acesta este un text românesc folosit pentru detectarea limbii. Include caractere precum ă, â, î, ș, ț.',
      sv: 'Detta är en svensk text som används för att upptäcka språket. Den innehåller svenska tecken som å, ä, ö.',
      cs: 'Toto je český text používaný k detekci jazyka. Obsahuje české znaky jako ř, ů, ě, č, š, ž.',
    };

    console.log('Language Detection Verification:');
    Object.entries(samples).forEach(([expected, text]) => {
      const detected = detectLanguage(text);
      const pass = detected === expected;
      console.log(`  ${expected}: ${pass ? '✓' : '✗'} (detected: ${detected})`);
    });

Run:

    node verify-detection.js

Expected output: All 5 languages are correctly detected (✓). If any fail, check that franc-min can detect the language (some languages may have similar trigrams).

Delete the script after verification.

### Build Verification

Ensure the app builds without errors:

    npm run ios

Expected: The Metro bundler starts, the app compiles, and launches in the iOS simulator without errors. No import errors related to the new adapters. You should see the Devoro home screen.

Press Cmd+D in the simulator to open the dev menu, then select "Settings" → "Enable Hot Reloading". Make a trivial change to any adapter file (add a comment) and verify hot reload works.

### Update Documentation

Edit `/Users/kaya/Coding/devoro/CLAUDE.md`. Find the section about supported languages (around line 20-30) and update the count:

    ## Project Status: ALL MILESTONES COMPLETE
    - M1: Foundation - Expo, Router, Themes
    - M2: Core RSVP Engine - ORP, playback, controls
    - M3: RevenueCat Integration - Subscription, paywall, limits
    - M4: Learning Mode - Topics, articles, comprehension
    - M5: Consumption Mode - URL/text import, reader
    - M6: Certificates - Speed/article achievements

    **Language Support**: 11 European languages (EN, ES, FR, DE, IT, PT, NL, PL, RO, SV, CS) with automatic detection and language-specific text processing.

If there's a "Key Decisions" or "Tech Stack" section, add a note about the enhanced prefix system:

    - Language adapters enhanced with 15-30 language-specific compound prefixes per language for improved long-word splitting during RSVP playback
    - Prefix detection only activates for words > 22 characters to avoid unnecessary splitting

### Final Acceptance

After this milestone:

1. All 11 languages are supported: English, Spanish, French, German, Italian, Portuguese, Dutch, Polish, Romanian, Swedish, Czech
2. Each language has comprehensive prefix lists (46 inherited + 8-30 language-specific)
3. All adapters are registered and accessible via getAdapter()
4. Language detection correctly identifies all 11 languages
5. Prefix splitting only occurs for words longer than 22 characters
6. Short words (like "photo", "sobre", "voor") are never split
7. Long words split at prefix boundaries first, syllable boundaries as fallback
8. All tests pass (expect 450+ total tests)
9. The app builds and runs without errors
10. Documentation reflects the new language count

The feature is complete.

## Validation and Acceptance

The overall success criteria for this ExecPlan:

**Functional Success:**
- User can import content in any of 11 supported languages
- Language is automatically detected via franc-min trigram analysis
- Long words (> 22 chars) split at meaningful boundaries (prefixes or syllables)
- Short words are never split, even if they contain prefixes
- RSVP playback displays split words correctly with hyphens

**Technical Success:**
- All TypeScript types updated to support 11 languages
- All adapters follow consistent structure (extends BaseLatinAdapter)
- All adapters have comprehensive prefix lists (60-70 total prefixes)
- All adapters have language-specific caption keywords and PDF patterns
- Registry contains all 11 adapters
- Detection mapping includes all 11 ISO 639-3 to 639-1 conversions

**Test Success:**
- All existing tests still pass
- 90+ new tests added for the 5 new adapters
- Comprehensive prefix tests for all adapters
- Registry tests verify 11 languages registered
- Splitting logic tests verify short words not split, long words split correctly

**Build Success:**
- TypeScript compilation succeeds with no errors
- npm test passes with all tests
- npm run ios builds and launches successfully
- No runtime errors related to language adapters

## Idempotence and Recovery

All changes in this ExecPlan are additive and idempotent:

- Adding prefix arrays to existing adapters: Can be run multiple times (arrays are defined, not mutated)
- Creating new adapter files: If files exist, they will be overwritten (idempotent)
- Updating type unions: Can be updated multiple times (declarative, not imperative)
- Adding tests: Test files can be recreated without issues
- Registering adapters: Registry is a static Record (declarative)

If implementation fails at any milestone:

**Milestone 1 failure**: Remove compoundPrefixes property from modified adapters, revert to inherited prefixes only
**Milestone 2 failure**: Revert type changes in types.ts, settings.ts, detection.ts
**Milestone 3-7 failure**: Delete the adapter file, remove from registry.ts imports, delete test file
**Milestone 8 failure**: Fix identified issues in previous milestones, re-run verification

To completely rollback:

    git checkout HEAD -- src/services/language/adapters/
    git checkout HEAD -- src/services/language/types.ts
    git checkout HEAD -- src/types/settings.ts
    git checkout HEAD -- src/services/language/detection.ts
    git checkout HEAD -- src/services/language/registry.ts
    git checkout HEAD -- __tests__/services/language/
    npm test

This restores the pre-ExecPlan state with 6 languages and no enhanced prefixes.

## Artifacts and Notes

Key implementation patterns to follow:

**Adapter Pattern** (all adapters follow this structure):

    export class LanguageAdapter extends BaseLatinAdapter {
      readonly code = 'xx' as const;
      readonly name = 'Language Name';
      readonly letterPattern: RegExp = /[a-zA-Z...]/;

      hyphenateSync(word: string): HyphenationResult {
        const hyphenated = hyphenXx.hyphenateSync(word);
        const syllables = hyphenated.split('\u00AD');
        return { syllables, hyphenatedWord: hyphenated };
      }

      readonly compoundPrefixes: string[] = [
        ...super.compoundPrefixes,
        // Language-specific prefixes, sorted by length (longest first)
      ];

      readonly captionKeywords: string[] = [...];
      readonly pdfArtifactPatterns: RegExp[] = [...];
    }

**Test Pattern** (all tests follow this structure):

    describe('LanguageAdapter', () => {
      describe('basic properties', () => { /* code, name, instanceof */ });
      describe('hyphenateSync', () => { /* syllable tests */ });
      describe('letterPattern', () => { /* character tests */ });
      describe('compoundPrefixes', () => { /* prefix tests */ });
      describe('captionKeywords', () => { /* keyword tests */ });
      describe('pdfArtifactPatterns', () => { /* pattern tests */ });
    });

**Critical Constants** (do not change without careful consideration):

- MAX_WORD_LENGTH = 22 (threshold for splitting, defined in syllables.ts)
- MIN_REMAINDER_LENGTH = 4 (minimum chunk size, prevents "in-to" splits)
- SOFT_HYPHEN = '\u00AD' (Unicode soft hyphen used by hyphen library)

## Interfaces and Dependencies

This ExecPlan relies on the existing hyphen package (v1.13.0) which is already installed. No new npm dependencies are required. The hyphen package includes TeX hyphenation patterns for all target languages:

- hyphen/nl (Dutch)
- hyphen/pl (Polish)
- hyphen/ro (Romanian)
- hyphen/sv (Swedish)
- hyphen/cs (Czech)

These patterns are imported dynamically via:

    // @ts-expect-error - hyphen package doesn't have type definitions
    import hyphenXx from 'hyphen/xx';

The franc-min package (already installed) supports all target languages and returns ISO 639-3 codes that we map to ISO 639-1.

Key interfaces from `/Users/kaya/Coding/devoro/src/services/language/types.ts`:

    export interface LanguageAdapter {
      readonly code: SupportedLanguage;
      readonly name: string;
      readonly letterPattern: RegExp;
      hyphenateSync(word: string): HyphenationResult;
      readonly compoundPrefixes: string[];
      readonly captionKeywords: string[];
      readonly pdfArtifactPatterns: RegExp[];
      readonly wordSplitPattern: RegExp;
      readonly paragraphPattern: RegExp;
      readonly sentenceEndPattern: RegExp;
      readonly clauseBreakPattern: RegExp;
      readonly sentenceStartPattern?: RegExp;
      readonly attributionKeywords: string[];
      readonly stockAgencies: string[];
      readonly htmlEntityMap: Record<string, string>;
      readonly quotationEntities: Record<string, string>;
      readonly validWordPattern: RegExp;
      readonly wordBoundaryHyphenPattern: RegExp;
    }

    export interface HyphenationResult {
      syllables: string[];
      hyphenatedWord: string;
    }

All adapters must implement this interface (enforced by extending BaseLatinAdapter which implements it).

---

**Change Log:**

2026-01-20 11:07 UTC: Initial ExecPlan created. Converted from implementation plan to full ExecPlan following PLANS.md requirements. Enhanced prefix lists for all languages (15-30 prefixes per language). Added explicit verification that splitting only occurs for words > 22 characters. Structured as 8 milestones with comprehensive validation at each step.

2026-01-20 11:45 UTC: Critical bug fixes after deep code inspection:
- Bug 1 FIXED: French prefix sorting - moved 2-char `dé` and `de` to end, added `re` (most common French prefix)
- Bug 2 FIXED: Dutch prefix grouping - correctly categorized `buiten`, `binnen`, `achter` as 6 chars (not 5-6 mix)
- Bug 3 FIXED: Polish prefix length - `współ` is 5 chars (not 6+)
- Bug 4 FIXED: Test verification scripts - increased test word lengths to >22 chars to trigger splitting
- Bug 5 FIXED: Enhanced prefix research - added `re` to Spanish and French, added defensive tests
- Added comprehensive error logging to verification scripts for easier debugging
- Added edge case tests for exactly 22 chars (should NOT split) and 23 chars (should split)

2026-01-20 12:00 UTC: Final bug search pass - fixed 10 critical counting and grouping errors:
- Bug 6 FIXED: Dutch prefix count (25→23), comment said 25 but actual count was 23 prefixes
- Bug 7 FIXED: Polish prefix count (30→26), comment said 30 but actual count was 26 prefixes
- Bug 8 FIXED: Romanian prefix grouping - `supra`/`între` are 5 chars not "6+ chars", reduced total count from 20→15
- Bug 9 FIXED: Swedish prefix grouping - `omkring` is 7 chars, `åter` is 4 chars (not 3), count corrected 25→26
- Bug 10 FIXED: Czech prefix grouping - `před`/`mezi` are 4 chars not 5 chars, count corrected 28→22
- Bug 11 FIXED: Polish test word length - extended `przedsiębiorstwoprzedsięb` to 26 chars (was 25)
- Bug 12 FIXED: French test word length - extended `contreindicationcontreind` to 26 chars (was 25)
- Verified all prefix lists are sorted by length (longest first) - all correct
- Verified PLANS.md adherence - plan is self-contained, novice-friendly, has all required sections
- Confirmed ExecPlan file is saved on disk at /Users/kaya/.claude/plans/buzzing-munching-sparrow.md
