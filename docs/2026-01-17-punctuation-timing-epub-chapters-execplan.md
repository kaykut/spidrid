# Punctuation-Based Variable Display Timing & EPUB Chapter Navigation

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with PLANS.md (located at `/Users/kaya/Coding/spidrid/PLANS.md`).

## Purpose / Big Picture

After this change, users reading EPUB books or articles will experience more natural comprehension pacing. Words followed by commas will pause 1.5× longer than normal words, sentence endings will pause 3× longer for mental "wrap-up," and paragraph breaks will pause 5× longer to signal major context shifts. When reading EPUB books with chapters, the player will automatically pause between chapters and display "Chapter 2: [Title] / Continue Reading" so users can take a mental break at natural boundaries.

To see this working: import an EPUB file with chapters, start playback, and observe the variable pause durations at punctuation marks. When a chapter ends, playback will auto-pause and show the chapter overlay. Paste text with commas and periods and notice the longer pauses at sentence boundaries compared to mid-sentence commas.

## Progress

- [x] (2026-01-17) Update pause multiplier values in src/services/orp.ts (comma 1.3→1.5×, sentence 1.8→3.0×)
- [x] (2026-01-17) Fix paragraph timing in src/hooks/useRSVPEngine.ts (changed from additive +3× to direct override 5.0×)
- [x] (2026-01-17) Add injectChapterMarkers helper function to src/services/epubParser.ts
- [x] (2026-01-17) Inject chapter markers before filterCaptions in EPUB parsing flow
- [x] (2026-01-17) Detect chapter markers during tokenization in src/services/textProcessor.ts
- [x] (2026-01-17) Simplify textProcessor.ts by removing unnecessary backward compatibility code
  - Removed `chapters` parameter from `processText()` and `processTextNoSplit()`
  - Removed `mapChapterOffsetsToWordIndices()` function entirely
  - Removed merge logic between marker-based and old-style chapters
  - Updated all call sites (playback.tsx, demo.tsx, generated/[id].tsx, long-words.tsx, curriculum article reader)
  - Updated tests to use marker-based approach instead of character offsets
- [ ] Test with real EPUB file containing chapters
- [ ] Verify punctuation timing with comma/period test content (manual testing)
- [ ] Verify server sync preserves markers (for premium users)
- [ ] Verify markers persist across app restarts

## Surprises & Discoveries

- **Discovery**: Word indices are not data, they're transient processing state
  **Evidence**: During implementation, realized that word indices (like `823`) are just loop counters during tokenization. They're calculated fresh each time from markers and never persisted. The confusion arose from thinking "word index storage" meant persisting indices, when actually it just means "using indices during the processing loop to attach metadata to words."
  **Impact**: The "chapters parameter backward compatibility" code is unnecessary - there's no old data to be compatible with. `contentExtractor.ts` never preserved chapters before this change.
  **Date**: 2026-01-17

- **Discovery**: Overcomplicated the implementation with unnecessary backward compatibility
  **Evidence**: Added logic to merge `chapterInfoMap` (from markers) with `mappedChapters` (from chapters parameter). But `parseEpub()` now returns `chapters: undefined`, and no EPUBs ever had chapters stored before this change.
  **Impact**: Simplified by removing unused `chapters` parameter and `mapChapterOffsetsToWordIndices()` function entirely from `processText()`. Markers are now the only source of truth.
  **Resolution**: (2026-01-17) Completed simplification - removed chapters parameter from all call sites, deleted mapChapterOffsetsToWordIndices() function, removed merge logic, updated tests to use markers.
  **Date**: 2026-01-17

## Decision Log

- **Decision**: Use marker injection instead of word index storage for chapter detection
  **Rationale**: After tracing the complete data flow E2E, marker injection is more robust. Word indices are brittle because they depend on tokenization logic remaining exactly the same forever. If we ever change how "don't" is split (1 word vs 2 words), all stored indices become wrong. Markers are line-based and detected before tokenization, making them immune to tokenization changes. The existing codebase already uses marker injection for headers (`[[HEADER]]...[[/HEADER]]`), proving the pattern works. Markers survive AsyncStorage persistence, Supabase server sync, and cross-device sync because they're embedded in the content string.
  **Date/Author**: 2026-01-17 / Claude

- **Decision**: Use format `[SPIDRID_CH:{index}:{title}]` for chapter markers
  **Rationale**: Square brackets are unlikely in book content. SPIDRID_CH namespace prevents collisions. Index and title on same line enables detection with single regex. Similar to existing `[[HEADER]]` markers.
  **Date/Author**: 2026-01-17 / Claude

- **Decision**: Inject markers BEFORE filterCaptions() in EPUB parsing
  **Rationale**: Character offsets are calculated from raw content before filtering. By injecting markers before filtering, we use the offsets while they're still accurate. Markers survive filtering (don't match caption patterns) and end up in final content at correct positions. This bypasses the offset accuracy issue entirely.
  **Date/Author**: 2026-01-17 / Claude

- **Decision**: Use ONLY marker-based chapter detection (backward compatibility removed)
  **Rationale**: Initially added merge logic for backward compatibility, but analysis revealed no EPUBs ever had chapters stored before this change (contentExtractor.ts never preserved them). Removed chapters parameter, mapChapterOffsetsToWordIndices(), and merge logic. Markers are now the single source of truth.
  **Date/Author**: 2026-01-17 / Claude

- **Decision**: Changed paragraph timing from additive to override
  **Rationale**: Old logic was `interval += baseInterval * 3` which added to the word's pause multiplier. This was confusing because a sentence-ending word at paragraph end would get 1.8× + 3× = 4.8× pause. New logic is `interval = baseInterval * 5.0` which overrides the word's multiplier entirely. This makes paragraph breaks consistently 5× regardless of punctuation, which is clearer and matches the requirement.
  **Date/Author**: 2026-01-17 / Claude

## Outcomes & Retrospective

(To be filled at completion)

## Context and Orientation

Devoro is a React Native speed reading app using Expo Router for navigation. The RSVP (Rapid Serial Visual Presentation) engine displays one word at a time with ORP (Optimal Recognition Point) highlighting. The current implementation has basic pause multipliers for punctuation but they're tuned too low for comprehension.

### Key Files and Their Roles

**RSVP Timing System:**
- `src/services/orp.ts` - Calculates pause multipliers based on punctuation. Currently returns 1.3× for commas, 1.8× for periods.
- `src/hooks/useRSVPEngine.ts` - Playback loop using setTimeout. Calculates display duration as `(60000/WPM) × pauseMultiplier`.
- `src/components/rsvp/RSVPWord.tsx` - Pure presentation component, no timing logic.

**EPUB Import Pipeline:**
- `src/services/epubParser.ts` - Parses EPUB ZIP files using JSZip. Extracts chapter metadata from NCX (EPUB2) or nav.xhtml (EPUB3). Returns `{title, content, author, chapters}`.
- `src/services/contentExtractor.ts` - Routes file imports. Calls `parseEpub()` for .epub files but currently discards chapter metadata.
- `src/store/contentStore.ts` - Zustand store with AsyncStorage persistence. Stores `ImportedContent` objects.
- `src/services/sync/contentSyncAdapter.ts` - Syncs content to Supabase for premium users. Stores entire object as JSON in `data` field.

**Text Processing:**
- `src/services/textProcessor.ts` - Tokenizes text into `ProcessedWord[]` array. Already detects `[[HEADER]]` markers and preserves them as metadata. Uses `paragraphPattern = /\n\s*\n/` to split paragraphs.
- `src/app/playback.tsx` - Calls `processText(content)` and passes result to `useRSVPEngine()`.

**Chapter UI (already exists):**
- `src/components/rsvp/ChapterPauseOverlay.tsx` - Displays "Chapter X / [Title] / Continue Reading" overlay.
- `src/hooks/useRSVPEngine.ts` lines 44-49 - Auto-pauses when `currentWord.chapterStart` is present.

### Terms Defined

**Base Word Duration (BWD)**: The time in milliseconds a word is displayed at a given WPM. Formula: `60000 / WPM`. At 250 WPM, BWD = 240ms.

**Pause Multiplier**: Factor applied to BWD for specific word types. Current: 1.0× for normal words, 1.3× for commas, 1.8× for sentence ends.

**ProcessedWord**: TypeScript interface representing one word with metadata: `{original, display, orpIndex, pauseMultiplier, sentenceEnd, paragraphEnd, chapterStart?}`.

**ORP (Optimal Recognition Point)**: The character position (usually 1/3 into word) highlighted in red to optimize reading speed.

**Marker Injection**: Pattern of embedding metadata into content strings as special text sequences that are detected during processing but not displayed. Example: `[[HEADER]]Title[[/HEADER]]` for headers.

## Plan of Work

### Step 1: Update Punctuation Pause Multipliers

In `src/services/orp.ts`, the function `calculatePauseMultiplier()` (lines 32-47) returns numeric multipliers based on word punctuation. Currently these values are too conservative. Change:
- Sentence end (`.!?`): 1.8 → 3.0 (for "wrap-up effect")
- Clause break (`,;:`): 1.3 → 1.5 (for clause integration)
- Keep long word multiplier at 1.2

Language adapters already detect semicolons via `clauseBreakPattern` regex, so no adapter changes needed.

### Step 2: Fix Paragraph Timing

In `src/hooks/useRSVPEngine.ts` lines 59-62, paragraph pauses use an additive bonus (`interval += baseInterval * 3`). This creates confusion because it stacks on top of the word's pause multiplier. Change to direct override: `interval = baseInterval * 5.0` when `paragraphEnd` is true. This makes paragraph breaks 5× base duration regardless of the word's punctuation.

### Step 3: Inject Chapter Markers During EPUB Import

In `src/services/epubParser.ts`, inject chapter markers BEFORE the `filterCaptions()` call on line 288. The current code calculates character offsets at line 267-282 based on the raw content before filtering. These offsets are correct for `rawContent` but would be wrong for `fullContent` (which is shorter after filtering removes caption lines).

By injecting markers into `rawContent` before filtering, we use the offsets while they're still accurate. Markers survive the filtering step (they don't match caption patterns like "Photo by:" or "Figure 1:") and end up in the final content at the correct positions.

Change the code from:
```typescript
const rawContent = contentParts.join('\n\n');
const fullContent = filterCaptions(rawContent);
```

To:
```typescript
const rawContent = contentParts.join('\n\n');
const contentWithMarkers = injectChapterMarkers(rawContent, chapters);
const fullContent = filterCaptions(contentWithMarkers);
```

Marker format: `[SPIDRID_CH:{chapterIndex}:{chapterTitle}]` on its own line. The helper function inserts as `\n[SPIDRID_CH:2:Methods]\n` before the first character of each chapter.

After injecting markers, the `chapters` array is no longer needed because chapter info is embedded in content. Return `chapters: undefined` to save storage space.

### Step 4: Detect Chapter Markers During Tokenization

In `src/services/textProcessor.ts`, the function `tokenizeWithParagraphs()` (lines 44-128) already detects `[[HEADER]]` markers using regex. Add similar detection for chapter markers.

After line 58 (inside the paragraph loop), add regex check:
```
const chapterMatch = paragraph.match(/^\[SPIDRID_CH:(\d+):(.+)\]$/);
```

If match found:
1. Extract chapter index (match[1]) and title (match[2])
2. Store chapter info to attach to next word
3. Skip this paragraph (don't tokenize the marker line itself)
4. Continue to next paragraph

When processing the next word (first word of chapter), attach `chapterStart: {title, index}` metadata to the ProcessedWord object.

### Step 5: Remove Unused Chapter Storage from Types

Since chapter metadata is now embedded in content strings via markers, remove the optional `chapters` field from `ImportedContent` type in `src/types/content.ts` to avoid confusion. This is backward compatible because it was optional and never populated.

## Concrete Steps

### Testing Punctuation Timing

Run the app in dev mode:
```
cd /Users/kaya/Coding/spidrid
npm start
```

Create test content with various punctuation:
```
First word, second word; third word. Fourth word.

New paragraph here.
```

Navigate to Playback and paste this text. Set WPM to 250 (BWD = 240ms). Observe:
- "word," pauses 360ms (1.5× × 240ms)
- "word;" pauses 360ms (1.5× × 240ms)
- "word." pauses 720ms (3.0× × 240ms)
- "here." at paragraph end pauses 1200ms (5.0× × 240ms, overrides sentence pause)

### Testing EPUB Chapter Detection

Import an EPUB file with chapters (use existing test EPUB or download a public domain book from Project Gutenberg). Start playback and read through first chapter. When chapter ends, playback should auto-pause and display overlay showing "Chapter 2: [Title]". Press Continue Reading and verify playback resumes at first word of chapter 2.

Check AsyncStorage persistence: quit app completely, restart, and verify chapter markers still present by reading the same content (should still pause at chapter boundary).

For premium users: verify Supabase sync preserves markers by importing EPUB on one device, syncing, then reading on another device (chapter pauses should still work).

Expected console output during EPUB import:
```
[EPUB Parser] Extracted 12 chapters from NCX
[EPUB Parser] Injecting chapter markers...
[EPUB Parser] Marker injected at position 0: [SPIDRID_CH:1:Introduction]
[EPUB Parser] Marker injected at position 5247: [SPIDRID_CH:2:Background]
...
```

Expected during playback:
```
[TextProcessor] Detected chapter marker: Chapter 2 "Background"
[TextProcessor] Attaching chapter info to word index 823
[RSVPEngine] Auto-pausing at chapter boundary
```

## Validation and Acceptance

### Acceptance Criteria

1. **Punctuation timing verified**: Import text "Hello, world. New paragraph." at 300 WPM. Comma pause ≈ 300ms, period pause ≈ 600ms, paragraph pause ≈ 1000ms (visual observation - pauses should feel progressively longer).

2. **EPUB chapter detection verified**: Import EPUB with at least 3 chapters. Playback auto-pauses after first chapter. Overlay displays "Chapter 2: [Title]". Resume continues to chapter 2 first word. Repeat for chapter 2→3 transition.

3. **Persistence verified**: After importing EPUB and reading to chapter break, force quit app (swipe away from multitasking). Relaunch app and continue reading same content. Chapter pause still triggers (proves markers persisted to AsyncStorage).

4. **Server sync verified** (premium users only): Import EPUB on Device A, wait for sync, load on Device B. Chapter pauses work on Device B (proves markers synced via Supabase).

### Test Commands

No automated tests exist for RSVP timing or chapter detection (visual/manual testing only). To verify code compiles:
```
npm run ios
```

Should build without TypeScript errors and launch simulator successfully.

## Idempotence and Recovery

All file edits are additive or replacement-based (no destructive migrations). Changes can be made iteratively:
1. Pause multipliers can be adjusted independently
2. Marker injection can be implemented without affecting non-EPUB content
3. Marker detection is backward compatible (content without markers works normally)

If marker format needs to change, old markers can coexist (detect both formats in regex) or can be cleared by deleting and re-importing EPUB files.

To rollback: revert commits and re-import EPUB files (markers only exist in newly imported content, old content unaffected).

## Artifacts and Notes

### Why Inject Markers Before Filtering

Current implementation in `epubParser.ts` calculates character offsets at lines 267-282 based on raw content before filtering:

```typescript
// Calculate offsets using raw text lengths
for (const itemPath of spineItems) {
  const text = stripHtml(html);
  spineOffsets.set(normalizedPath, currentOffset);
  currentOffset += text.length + 2;  // Offset for rawContent
}

const rawContent = contentParts.join('\n\n');
const fullContent = filterCaptions(rawContent);  // Content shrinks!

// If we used offsets here, they'd be wrong (calculated for rawContent, used on fullContent)
```

The `filterCaptions()` function removes caption lines, making `fullContent` shorter than `rawContent`. By injecting markers into `rawContent` (before filtering), we use the offsets while they're still accurate. Markers then survive the filtering step and end up in `fullContent` at the correct positions. This approach bypasses the offset accuracy issue entirely.

### Marker Detection Example

Given content with marker:
```
...end of chapter one.

[SPIDRID_CH:2:Methods and Materials]

The methods used in this study...
```

Tokenization detects marker line, extracts `{index: 2, title: "Methods and Materials"}`, and attaches to word "The":
```typescript
processedWords[823] = {
  original: "The",
  display: "The",
  orpIndex: 1,
  pauseMultiplier: 1.0,
  chapterStart: {index: 2, title: "Methods and Materials"}
}
```

When RSVP engine reaches word 823, it detects `chapterStart`, pauses playback, and shows overlay.

## Interfaces and Dependencies

### Modified Functions

In `src/services/orp.ts`:
```typescript
export function calculatePauseMultiplier(
  word: string,
  adapter: LanguageAdapter = getCurrentAdapter()
): number {
  if (adapter.sentenceEndPattern.test(word)) {return 3.0;}  // Changed from 1.8
  if (adapter.clauseBreakPattern.test(word)) {return 1.5;}  // Changed from 1.3
  if (word.length > 12) {return 1.2;}
  return 1.0;
}
```

In `src/services/epubParser.ts`, new helper function (add before `parseEpub`):
```typescript
function injectChapterMarkers(
  content: string,
  chapters: ChapterMetadata[]
): string {
  if (chapters.length === 0) {return content;}

  // Sort chapters by offset descending (inject from end to avoid offset drift)
  const sorted = [...chapters].sort((a, b) => b.startCharOffset - a.startCharOffset);

  let result = content;
  for (let i = sorted.length - 1; i >= 0; i--) {
    const chapter = sorted[i];
    const marker = `\n[SPIDRID_CH:${sorted.length - i}:${chapter.title}]\n`;

    // Insert marker at chapter start position (in rawContent before filtering)
    result = result.slice(0, chapter.startCharOffset) +
             marker +
             result.slice(chapter.startCharOffset);
  }

  return result;
}
```

In `src/services/textProcessor.ts`, modify `tokenizeWithParagraphs()`:
```typescript
// Inside paragraph loop (after line 58):
// Check for chapter marker before header check
const chapterMatch = paragraph.match(/^\[SPIDRID_CH:(\d+):(.+)\]$/);
if (chapterMatch) {
  const chapterInfo = {
    index: parseInt(chapterMatch[1], 10),
    title: chapterMatch[2].trim()
  };
  // Store to attach to next word
  pendingChapterInfo = chapterInfo;
  continue;  // Skip tokenizing this paragraph
}

// Later when creating ProcessedWord:
if (pendingChapterInfo && tokens.length === 0) {
  // Attach to first word after marker
  processedWord.chapterStart = pendingChapterInfo;
  pendingChapterInfo = null;
}
```

### Dependencies

No new dependencies required. Uses existing:
- JSZip for EPUB parsing (already installed)
- AsyncStorage for local persistence (already installed)
- Supabase client for server sync (already installed)

### Type Changes

Optional: Remove `chapters?: ChapterMetadata[]` from `ImportedContent` interface in `src/types/content.ts` since markers replace this field. If keeping for backward compatibility, document that it's deprecated and always undefined for new imports.