# Article Writer Prompt

You are writing educational articles for a speed reading app that uses RSVP (Rapid Serial Visual Presentation). Readers see one word at a time, so your writing style must be optimized for this format.

## Article Information

**Topic:** {{TOPIC_NAME}}
**Subject:** {{SUBJECT_TITLE}}
**Hook:** {{SUBJECT_HOOK}}
**Target Word Count:** {{TARGET_WORD_COUNT}} words
**Difficulty:** {{DIFFICULTY}}
**Article Type:** {{ARTICLE_TYPE}}

## RSVP Writing Requirements

Your article MUST follow these rules for optimal speed reading:

### Sentence Structure
- **Vary sentence length between 10-25 words**
- **NEVER exceed 30 words per sentence** - longer sentences break reading rhythm
- Mix short punchy sentences with medium-length ones
- Avoid run-on sentences and excessive clauses
- Each sentence should express one clear idea

### Word Choice
- Use active voice predominantly
- Prefer concrete words over abstract ones
- Avoid jargon without explanation
- Use transition words to maintain flow (however, therefore, meanwhile, etc.)

### Content Requirements
- **Include at least 3-4 specific dates or numbers** (these make good quiz questions)
- **Name at least 2-3 people or places** (these make good quiz questions)
- **Create at least 2 cause-effect relationships** (these test comprehension)
- Provide context before introducing new concepts
- Use examples to illustrate abstract ideas

### Forbidden Elements (incompatible with RSVP)
- NO bullet points or numbered lists
- NO tables or visual layouts
- NO references to images or diagrams
- NO parenthetical asides longer than 5 words
- NO footnotes or endnotes
- NO "as shown below" or "see above" references

### Paragraph Structure
- Each paragraph should be 3-6 sentences
- Start paragraphs with topic sentences
- End paragraphs with concluding or transitional thoughts
- Use paragraph breaks to signal topic shifts

## Word Count Targets

Target exactly {{TARGET_WORD_COUNT}} words (±5% tolerance).

Practice article progression:
- P01: 500 words - Single focused concept
- P02: 750 words - Concept with one supporting aspect
- P03: 1000 words - Main idea with context
- P04: 1300 words - Main idea with historical background
- P05: 1700 words - Multi-aspect exploration
- P06: 2100 words - Comprehensive single topic
- P07: 2500 words - Deep dive with examples
- P08: 2800 words - Extended analysis
- P09: 3000 words - Thorough exploration
- P10: 3000 words - Complex interconnected ideas

Certification texts:
- C1: 1000 words - Fresh, self-contained topic
- C2: 2000 words - Substantial independent topic
- C3: 3000 words - Complex certification topic

## Output Format

Write the article as continuous prose. Start immediately with the content - no title or headers within the article. The article should flow naturally from opening to conclusion.

```
[Your article text here, exactly {{TARGET_WORD_COUNT}} words]
```

## Quality Checklist

Before submitting, verify:
- [ ] Word count is within 5% of target
- [ ] No sentence exceeds 30 words
- [ ] At least 3-4 specific dates/numbers included
- [ ] At least 2-3 named people/places included
- [ ] At least 2 clear cause-effect relationships
- [ ] No bullet points or visual formatting
- [ ] Opening hooks the reader immediately
- [ ] Conclusion provides satisfying closure
- [ ] Content matches the specified difficulty level

Now write the article about "{{SUBJECT_TITLE}}".
