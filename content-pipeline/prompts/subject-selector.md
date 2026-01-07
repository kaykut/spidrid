# Subject Selector Prompt

You are generating subject ideas for a speed reading educational app. Each article teaches readers something interesting while they practice reading quickly.

## Topic Information

**Topic:** {{TOPIC_NAME}}
**Topic ID:** {{TOPIC_ID}}
**Description:** {{TOPIC_DESCRIPTION}}

## Task

Generate 15 compelling subject ideas for this topic. Each subject should:

1. **Be specific, not generic** - "The Discovery of Penicillin" not "Antibiotics"
2. **Have narrative potential** - Stories engage readers better than dry facts
3. **Contain quizzable information** - Specific dates, names, numbers, cause-effect relationships
4. **Be educational and surprising** - Readers should learn something memorable
5. **Work well for RSVP reading** - No reliance on visual elements, lists, or complex formatting

## Output Format

For each subject, provide:

```json
{
  "subjects": [
    {
      "id": 1,
      "title": "The subject title",
      "hook": "One compelling sentence that makes readers want to learn more",
      "keyFacts": [
        "Specific date/number/name that can be quizzed",
        "Another quizzable fact",
        "A cause-effect relationship"
      ],
      "suggestedLength": "short|medium|long",
      "articleType": "practice|certification",
      "orderIndex": 1
    }
  ]
}
```

## Length Assignments

Distribute subjects across these word count targets:

**Practice Articles (10 total):**
- P01: 500 words (beginner)
- P02: 750 words (beginner)
- P03: 1000 words (beginner)
- P04: 1300 words (intermediate)
- P05: 1700 words (intermediate)
- P06: 2100 words (intermediate)
- P07: 2500 words (advanced)
- P08: 2800 words (advanced)
- P09: 3000 words (advanced)
- P10: 3000 words (advanced)

**Certification Texts (3 total):**
- C1: 1000 words (short certification)
- C2: 2000 words (medium certification)
- C3: 3000 words (long certification)

## Guidelines

- Shorter articles need simpler, more focused subjects
- Longer articles can cover more complex topics or multiple aspects
- Certification texts should be distinct from practice content (different subjects)
- Ensure variety within the topic - don't repeat similar subjects
- Consider difficulty progression - earlier articles should be more accessible

## Example Subject (for Science topic)

```json
{
  "id": 1,
  "title": "The Accidental Discovery of X-Rays",
  "hook": "Wilhelm Roentgen was experimenting in his darkened lab when he noticed an eerie glow that would revolutionize medicine.",
  "keyFacts": [
    "Discovered on November 8, 1895",
    "Roentgen named them 'X-rays' because he didn't understand them",
    "First medical X-ray was of his wife's hand, showing her wedding ring"
  ],
  "suggestedLength": "medium",
  "articleType": "practice",
  "orderIndex": 4
}
```

Now generate 15 subjects for the {{TOPIC_NAME}} topic.
