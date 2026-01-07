# Quiz Generator Prompt

You are creating comprehension quiz questions for a speed reading app. Questions should test genuine understanding, not just memorization of trivial details.

## Article Information

**Topic:** {{TOPIC_NAME}}
**Subject:** {{SUBJECT_TITLE}}
**Word Count:** {{WORD_COUNT}}
**Article Content:**
```
{{ARTICLE_CONTENT}}
```

## Question Count Calculation

Calculate question count based on word count:
- Formula: `min(20, max(5, floor(wordCount / 150)))`
- {{WORD_COUNT}} words ÷ 150 = {{CALCULATED_QUESTIONS}} questions

Target: **{{TARGET_QUESTIONS}} questions**

## Question Type Distribution

Create a mix of question types:
- **40% Factual Recall (Single Choice)** - Test specific facts from the article
- **40% Comprehension (Various Types)** - Test understanding of concepts
- **20% Inference** - Test ability to draw conclusions

## Question Types

### 1. Single Choice (`single_choice`)
Traditional multiple-choice with one correct answer.

```json
{
  "id": "{{ARTICLE_ID}}-q1",
  "type": "single_choice",
  "question": "What year was X discovered?",
  "options": ["1885", "1895", "1905", "1915"],
  "correctIndex": 1
}
```

**Guidelines:**
- 4 options required
- Distractors should be plausible but clearly wrong
- Avoid "all of the above" or "none of the above"
- Put correct answer in random position

### 2. Multiple Select (`multiple_select`)
Select all correct answers.

```json
{
  "id": "{{ARTICLE_ID}}-q2",
  "type": "multiple_select",
  "question": "Which factors contributed to X? Select all that apply.",
  "options": ["Factor A", "Factor B", "Factor C", "Factor D"],
  "correctIndices": [0, 2]
}
```

**Guidelines:**
- 4 options required
- 2-3 correct answers typical
- Make clear in question that multiple selections are needed
- All correct answers must be in the article

### 3. True/False (`true_false`)
Simple yes/no comprehension check.

```json
{
  "id": "{{ARTICLE_ID}}-q3",
  "type": "true_false",
  "question": "The Industrial Revolution began in France.",
  "correctAnswer": false
}
```

**Guidelines:**
- Statement must be clearly true or false based on article
- Avoid trick questions or technicalities
- Test understanding, not memory of exact wording

### 4. Numeric (`numeric`)
Slider input for numerical answers.

```json
{
  "id": "{{ARTICLE_ID}}-q4",
  "type": "numeric",
  "question": "Approximately how many years did X take to complete?",
  "correctValue": 22,
  "tolerance": 3,
  "min": 5,
  "max": 50,
  "step": 1,
  "unit": "years"
}
```

**Guidelines:**
- Number must appear in article or be easily calculated
- Set reasonable tolerance (10-20% typically)
- Min/max should bracket possible answers
- Include unit for context

## Question Quality Guidelines

### DO Ask About:
- Main ideas and themes
- Cause-effect relationships
- Important names, dates, numbers mentioned
- Comparisons made in the article
- Conclusions drawn by the author
- The significance of events or discoveries

### DON'T Ask About:
- Trivial details (colors, minor adjectives)
- Information not in the article
- Opinions not stated in the text
- Exact wording (unless a direct quote is important)
- Information only in the introduction/conclusion

### Comprehension Levels:
1. **Literal** - Facts directly stated
2. **Inferential** - Drawing conclusions
3. **Evaluative** - Judging significance

Include questions at all three levels.

## Output Format

```json
{
  "articleId": "{{ARTICLE_ID}}",
  "questionCount": {{TARGET_QUESTIONS}},
  "questions": [
    // Questions here
  ]
}
```

## Example Complete Output

```json
{
  "articleId": "science-discovery-p01",
  "questionCount": 5,
  "questions": [
    {
      "id": "science-discovery-p01-q1",
      "type": "single_choice",
      "question": "What powers the water cycle?",
      "options": ["Wind currents", "The moon's gravity", "Heat from the sun", "Ocean currents"],
      "correctIndex": 2
    },
    {
      "id": "science-discovery-p01-q2",
      "type": "true_false",
      "question": "Transpiration is the process by which plants release water into the atmosphere.",
      "correctAnswer": true
    },
    {
      "id": "science-discovery-p01-q3",
      "type": "multiple_select",
      "question": "Which of these are forms of precipitation? Select all that apply.",
      "options": ["Evaporation", "Rain", "Snow", "Condensation"],
      "correctIndices": [1, 2]
    },
    {
      "id": "science-discovery-p01-q4",
      "type": "numeric",
      "question": "For how many billions of years has the water cycle been operating?",
      "correctValue": 4,
      "tolerance": 1,
      "min": 1,
      "max": 10,
      "step": 0.5,
      "unit": "billion years"
    },
    {
      "id": "science-discovery-p01-q5",
      "type": "single_choice",
      "question": "What is the main effect of climate change on the water cycle?",
      "options": [
        "It stops the cycle completely",
        "It changes evaporation rates and precipitation patterns",
        "It only affects polar regions",
        "It makes water permanently evaporate"
      ],
      "correctIndex": 1
    }
  ]
}
```

Now generate {{TARGET_QUESTIONS}} questions for the article about "{{SUBJECT_TITLE}}".
