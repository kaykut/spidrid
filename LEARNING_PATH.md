# Devoro Learning Path System

Reference documentation for the practice and certification implementation.

## Overview

The Devoro learning path consists of two main components:

1. **Practice Articles** - Progressive skill-building content across 15 topics
2. **Certification System** - Three tiers validating speed reading mastery

## Content Structure

### Topics (15 total)

Each topic contains 13 articles:
- **10 Practice Articles** (P01-P10) - Progressive word counts for skill building
- **3 Certification Texts** (C1-C3) - Dedicated assessment content

| Topic ID | Name | Icon |
|----------|------|------|
| science-discovery | Science & Discovery | 🔬 |
| health-medicine | Health & Medicine | 🏥 |
| history-civilization | History & Civilization | 🏛️ |
| technology-internet | Technology & Internet | 💻 |
| nature-wildlife | Nature & Wildlife | 🌿 |
| climate-environment | Climate & Environment | 🌍 |
| space-cosmos | Space & Cosmos | 🚀 |
| psychology-mind | Psychology & Mind | 🧠 |
| self-improvement | Self-Improvement | 🎯 |
| business-careers | Business & Careers | 💼 |
| finance-investing | Finance & Investing | 💰 |
| trivia-facts | Trivia & Facts | 🎲 |
| world-travel | World & Travel | 🗺️ |
| arts-culture | Arts & Culture | 🎨 |
| lifestyle-wellness | Lifestyle & Wellness | ✨ |

### Article Word Count Progression

Practice articles follow an exponential progression to gradually build reading stamina:

| Article | Target Words | Difficulty |
|---------|-------------|------------|
| P01 | 500 | beginner |
| P02 | 750 | beginner |
| P03 | 1,000 | beginner |
| P04 | 1,300 | intermediate |
| P05 | 1,700 | intermediate |
| P06 | 2,100 | intermediate |
| P07 | 2,500 | advanced |
| P08 | 2,800 | advanced |
| P09 | 3,000 | advanced |
| P10 | 3,000 | advanced |

Certification texts have fixed lengths:

| Text | Length | Target Words |
|------|--------|-------------|
| C1 | short | 1,000 |
| C2 | medium | 2,000 |
| C3 | long | 3,000 |

## Question System

### Question Types

Four question types assess comprehension:

#### 1. Single Choice (`single_choice`)
Standard multiple choice with one correct answer.

```typescript
interface SingleChoiceQuestion {
  type: 'single_choice';
  id: string;
  question: string;
  options: string[];      // 4 options
  correctIndex: number;   // 0-3
}
```

#### 2. Multiple Select (`multiple_select`)
Multiple correct answers possible.

```typescript
interface MultipleSelectQuestion {
  type: 'multiple_select';
  id: string;
  question: string;
  options: string[];
  correctIndices: number[];  // Array of correct indices
}
```

#### 3. True/False (`true_false`)
Binary true/false questions.

```typescript
interface TrueFalseQuestion {
  type: 'true_false';
  id: string;
  question: string;
  correctAnswer: boolean;
}
```

#### 4. Numeric (`numeric`)
Slider-based numeric input with tolerance.

```typescript
interface NumericQuestion {
  type: 'numeric';
  id: string;
  question: string;
  correctValue: number;
  tolerance: number;      // Acceptable deviation
  min: number;
  max: number;
  step?: number;
  unit?: string;          // e.g., "years", "%", "million"
}
```

### Question Count Formula

Questions per article: `min(20, max(5, floor(wordCount / 150)))`

| Word Count | Questions |
|------------|-----------|
| 500 | 5 |
| 750 | 5 |
| 1,000 | 6 |
| 1,500 | 10 |
| 2,000 | 13 |
| 3,000 | 20 |

### Question Distribution

- 40% Factual recall (dates, names, numbers)
- 40% Comprehension (understanding relationships)
- 20% Inference (conclusions from text)

## Certification System

### Three Tiers

| Tier | Title | Min WPM | Min Accuracy | Required Texts |
|------|-------|---------|--------------|----------------|
| `quick_reader` | Quick Reader | 600 | 80% | 3 (any length) |
| `speed_reader` | Speed Reader | 900 | 85% | 3 (medium/long) |
| `lightning_reader` | Lightning Reader | 1,200 | 90% | 3 (long only) |

### Certification Flow

1. **Practice Phase** - User completes practice articles, building WPM and accuracy
2. **Readiness Detection** - System monitors recent performance (last 5 articles)
3. **Readiness Prompt** - Modal appears when user approaches tier thresholds
4. **Certification Attempt** - User takes certification text (first attempt counts)
5. **Award/Retry** - Certificate awarded if requirements met, or encouragement shown

### Readiness Thresholds

A tier becomes "ready to attempt" when:
- Practice WPM ≥ 90% of tier requirement
- Practice accuracy ≥ 95% of tier requirement

Example: Quick Reader (600 WPM, 80%) triggers readiness at 540 WPM + 76% accuracy.

### First-Attempt Rule

Certification texts track the **first attempt only** for certification scoring:
- `certificationAttemptUsed: boolean` - Whether first attempt was taken
- `certificationAttemptScore: number` - Score on first attempt
- `certificationAttemptWPM: number` - WPM on first attempt

Users can re-read for practice, but only the first attempt counts toward certification.

## Progress Tracking

### Article Progress

```typescript
interface ArticleProgress {
  articleId: string;
  completed: boolean;
  comprehensionScore: number;      // 0-100
  highestWPM: number;
  lastReadAt: number;              // timestamp
  attemptCount: number;
  certificationAttemptUsed?: boolean;
  certificationAttemptScore?: number;
  certificationAttemptWPM?: number;
}
```

### Certification Progress

```typescript
interface CertificationProgress {
  highestCertificationWPM: number;
  averageCertificationAccuracy: number;
  shortTextsPassed: number;
  mediumTextsPassed: number;
  longTextsPassed: number;
  earnedTiers: CertificationTier[];
  tierProgress: Record<CertificationTier, CertificationTierProgress>;
}

interface CertificationTierProgress {
  speedProgress: number;      // 0-1 ratio toward WPM requirement
  accuracyProgress: number;   // 0-1 ratio toward accuracy requirement
  textsProgress: number;      // 0-1 ratio toward text count requirement
  overallProgress: number;    // Combined progress
  isUnlocked: boolean;        // Prerequisites met
  isReady: boolean;           // Ready to attempt
  isEarned: boolean;          // Certification earned
  earnedAt?: number;          // timestamp
}
```

## Key Files

### Types
- `src/types/learning.ts` - Article, Topic, Question types
- `src/types/certificates.ts` - Certification types and definitions

### Data
- `src/data/curriculum/` - Topic-specific article content
- `src/data/curriculum/topics.ts` - Topic definitions
- `src/data/curriculum/index.ts` - Exports and helper functions
- `src/data/interests.ts` - User interest to topic mapping

### Stores
- `src/store/learningStore.ts` - Article progress tracking
- `src/store/certificateStore.ts` - Certification progress and awards

### Components

#### Quiz Components (`src/components/quiz/`)
- `QuestionRenderer.tsx` - Dispatcher for question types
- `SingleChoiceQuestion.tsx` - Single choice UI
- `MultipleSelectQuestion.tsx` - Multiple select UI
- `TrueFalseQuestion.tsx` - True/false UI
- `NumericQuestion.tsx` - Numeric slider UI

#### Certification Components (`src/components/certifications/`)
- `CertificationReadyModal.tsx` - Readiness prompt
- `CertificationEarnedModal.tsx` - Award celebration
- `JourneyPath.tsx` - Visual journey map
- `TierCard.tsx` - Expandable tier details
- `MilestoneBadge.tsx` - Tier badge indicators
- `ProgressRing.tsx` - Circular progress indicator
- `StatsSummary.tsx` - Stats display

### Screens
- `src/app/(tabs)/learn.tsx` - Topic grid
- `src/app/topic/[id].tsx` - Article list (practice + certification)
- `src/app/article/[id].tsx` - RSVP reader with quiz
- `src/app/certifications.tsx` - Full journey visualization
- `src/app/(tabs)/profile.tsx` - User stats and certification badges

### Utilities
- `src/utils/calculateQuizScore.ts` - Scoring for all question types
- `src/hooks/useCertificationDetection.ts` - Readiness detection hook

## UI Patterns

### Article Cards

Practice articles show:
- Numbered badge (1-10) in topic color
- Title, difficulty, word count
- Completion checkmark and stats if completed

Certification articles show:
- Trophy badge (🏆) in purple (#9775fa)
- Title, length (Short/Medium/Long), word count
- Purple border accent
- "Ready!" badge when user is certification-ready

### Journey Visualization

The certification journey shows:
- Vertical path with 3 tier waypoints
- Earned tiers: Full color with checkmark
- Current tier: Color with progress ring
- Future tiers: Faded with lock icon

### Certification Modals

**Readiness Modal** appears when:
- User completes a practice article
- Recent performance crosses readiness threshold
- 24 hours since last prompt for same tier

**Earned Modal** appears when:
- User completes certification text
- First-attempt WPM and accuracy meet requirements

## Scoring

### Quiz Score Calculation

```typescript
// Single choice: 1 point if correct
// Multiple select: 1 point if all correct indices selected, no extras
// True/false: 1 point if correct
// Numeric: 1 point if within tolerance

const score = (correctAnswers / totalQuestions) * 100;
```

### Certification Requirements Check

```typescript
function isCertificationEarned(
  tier: CertificationTier,
  wpm: number,
  accuracy: number,
  passedTexts: { short: number; medium: number; long: number }
): boolean {
  const def = getCertificationTierDefinition(tier);
  return (
    wpm >= def.requirement.minWPM &&
    accuracy >= def.requirement.minAccuracy &&
    // Text count requirements met based on tier
  );
}
```

## Accessibility

All interactive elements include:
- `accessibilityRole` - button, radio, image as appropriate
- `accessibilityLabel` - Descriptive text for screen readers
- `accessibilityHint` - Action guidance (e.g., "Double tap to select")
- `accessibilityState` - selected, disabled states

## Related Documentation

- `CLAUDE.md` - Project overview and conventions
- `docs/2026-01-06-spidrid-execplan.md` - Original implementation plan
