# LLM-Powered Learn Tab: AI-Generated Articles and Curricula

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds. This document must be maintained in accordance with `PLANS.md` at the repository root.


## Purpose / Big Picture

After this change, premium users can tap the new "Learn" tab and generate custom educational articles on any topic they choose. They specify what they want to learn, pick a reading duration (which determines word count based on their current average reading speed), and select a writing tone (such as storytelling, sarcastic, or explanatory). The app calls Claude via a Supabase Edge Function, generates the article with quiz questions, and presents it in the familiar RSVP reader. All reading activity counts toward the user's Velocity Score and comprehension stats.

In Phase 2, users can create entire curricula: multi-article learning paths with 3 to 10 articles that progressively build knowledge. Articles unlock linearly as users complete quizzes, and the system pre-generates upcoming articles in the background to minimize wait times.

To see it working after Phase 1: open the app, navigate to the Learn tab, tap "Generate Article," enter a topic like "The history of coffee," select 3 minutes and "Storytelling" tone, tap Generate. After a few seconds, the article appears. Read it with RSVP, complete the quiz, and observe your stats updated on the Journey tab.


## Progress

- [ ] Milestone 1: Types and Store Foundation
- [ ] Milestone 2: Supabase Edge Function
- [ ] Milestone 3: Learn Tab UI with Article Generation
- [ ] Milestone 4: Generated Article Reader
- [ ] Milestone 5: Curriculum Types and Store
- [ ] Milestone 6: Curriculum Generation Backend
- [ ] Milestone 7: Curriculum UI (Wizard and Accordion)
- [ ] Milestone 8: Background Pre-generation


## Surprises & Discoveries

(To be populated during implementation)


## Decision Log

- Decision: Use Claude (Anthropic) as the LLM provider.
  Rationale: User preference, already in Anthropic ecosystem. Claude excels at nuanced writing and tone control.
  Date/Author: 2026-01-08

- Decision: Premium-only access for all LLM features.
  Rationale: Simplifies implementation, clear value proposition for subscription, avoids complex usage tracking.
  Date/Author: 2026-01-08

- Decision: Persist generated content locally for offline reading.
  Rationale: Users expect to read content they paid to generate without internet. Uses AsyncStorage consistent with existing stores.
  Date/Author: 2026-01-08

- Decision: No article regeneration allowed.
  Rationale: Simplifies UX, prevents API abuse, encourages thoughtful topic input. Users can generate new articles instead.
  Date/Author: 2026-01-08

- Decision: Segmented tab UI (Articles | Curricula) with generate buttons in each segment.
  Rationale: Cleaner separation of concerns, each segment is self-contained, avoids cluttered single-view design.
  Date/Author: 2026-01-08

- Decision: Linear curriculum unlock with max 2 articles pre-generated ahead.
  Rationale: Ensures pedagogical progression, pre-generation reduces wait times without wasting API calls on unread content.
  Date/Author: 2026-01-08


## Outcomes & Retrospective

(To be populated at milestone completions and final delivery)


## Context and Orientation

Spidrid is a React Native (Expo SDK 54) speed reading app using RSVP (Rapid Serial Visual Presentation). Users read articles word-by-word at configurable speeds, then take comprehension quizzes. The app tracks reading speed (WPM) and comprehension scores to calculate a "Velocity Score" representing overall reading proficiency.

Key directories:

- `src/app/` contains Expo Router screens. File-based routing means `src/app/(tabs)/learn.tsx` creates a `/learn` route accessible as a tab.
- `src/store/` contains Zustand stores. Each store follows the pattern `use[Name]Store.ts` with AsyncStorage persistence via `zustand/middleware/persist`.
- `src/types/` contains TypeScript type definitions. The existing `learning.ts` defines `Question` types used by quizzes.
- `src/components/` contains reusable React components organized by feature area.

Key existing files:

- `src/store/journeyStore.ts`: Tracks all reading sessions via `recordSession({wpm, comprehension, articleId, articleType})`. This is where generated article readings must be recorded.
- `src/types/journey.ts`: Defines `ArticleType = 'curriculum' | 'certification' | 'imported'`. We will add `'generated'`.
- `src/types/learning.ts`: Defines the `Question` union type (SingleChoiceQuestion, MultipleSelectQuestion, TrueFalseQuestion, NumericQuestion). Generated articles will use these same types.
- `src/app/article/[id].tsx`: The existing article reader with RSVP playback and quiz flow. We will adapt this pattern for generated articles.
- `src/components/navigation/FloatingNavBar.tsx`: The custom tab bar. Currently has 4 items (journey, read, profile, testing). We will add a "Learn" item.
- `src/store/subscriptionStore.ts`: Contains `isPremium` state for gating premium features.

Terms defined:

- RSVP: Rapid Serial Visual Presentation, a speed reading technique that displays one word at a time at a set pace.
- ORP: Optimal Recognition Point, the character in a word where the eye naturally focuses. Highlighted in red in this app.
- Velocity Score (VS): A 0-100 metric calculated from effective WPM (raw WPM multiplied by comprehension percentage) over recent sessions.
- WPM: Words Per Minute, the user's reading speed setting.
- Zustand: A lightweight React state management library. Stores are created with `create()` and can be persisted to AsyncStorage.
- Supabase Edge Function: A serverless function hosted on Supabase that can securely call external APIs (like Claude) without exposing API keys to the client.


## Plan of Work

The work is divided into two phases. Phase 1 delivers single article generation. Phase 2 adds curriculum generation. Each phase has multiple milestones that can be verified independently.


### Phase 1: Single Article Generation

Phase 1 enables users to generate one-off educational articles. By the end of Phase 1, a user can open the Learn tab, generate an article, read it with RSVP, take a quiz, and see their stats updated.


### Phase 2: Curriculum Generation

Phase 2 enables users to create multi-article curricula. By the end of Phase 2, a user can create a curriculum with 3-10 articles, progress through them linearly (completing quizzes to unlock subsequent articles), and see the system pre-generate upcoming articles automatically.


---


## Milestone 1: Types and Store Foundation

This milestone establishes the data layer for generated content. At the end, we will have TypeScript types for generated articles and tones, a Zustand store for persisting generated articles, and an updated journey type to recognize generated content.

### Files to Create

Create `src/types/generated.ts`:

    import { Question } from './learning';

    export type ArticleTone =
      | 'robotic'
      | 'explanatory'
      | 'sarcastic'
      | 'storytelling'
      | 'analogical';

    export interface ToneDefinition {
      id: ArticleTone;
      label: string;
      description: string;
      emoji: string;
      promptModifier: string;
    }

    export const TONE_DEFINITIONS: ToneDefinition[] = [
      {
        id: 'robotic',
        label: 'Robotic',
        description: 'Clinical and technical',
        emoji: '🤖',
        promptModifier: 'Write in a clinical, technical, matter-of-fact style. Be precise and avoid emotional language. Present information systematically.',
      },
      {
        id: 'explanatory',
        label: 'Explanatory',
        description: 'Clear and educational',
        emoji: '📚',
        promptModifier: 'Write in a clear, educational style. Break down concepts step-by-step. Anticipate reader questions and address them. Use examples liberally.',
      },
      {
        id: 'sarcastic',
        label: 'Sarcastic',
        description: 'Witty and irreverent',
        emoji: '😏',
        promptModifier: 'Write with dry wit and occasional sarcasm. Be irreverent but still informative. Use humor to make points memorable. Do not be mean-spirited.',
      },
      {
        id: 'storytelling',
        label: 'Storytelling',
        description: 'Narrative and engaging',
        emoji: '📖',
        promptModifier: 'Write as if telling a story. Use narrative techniques: set scenes, introduce characters or personas, create tension, deliver payoffs. Make dry facts come alive through narrative.',
      },
      {
        id: 'analogical',
        label: 'Analogical',
        description: 'Rich in comparisons',
        emoji: '🔗',
        promptModifier: 'Explain every concept using analogies and metaphors. Relate abstract ideas to everyday experiences. Help the reader see familiar patterns in new material.',
      },
    ];

    export interface DurationOption {
      minutes: number;
      label: string;
    }

    export const DURATION_OPTIONS: DurationOption[] = [
      { minutes: 1, label: '1 min' },
      { minutes: 2, label: '2 min' },
      { minutes: 3, label: '3 min' },
      { minutes: 5, label: '5 min' },
      { minutes: 10, label: '10 min' },
    ];

    export type GenerationStatus = 'pending' | 'generating' | 'complete' | 'error';

    export interface GeneratedArticle {
      id: string;
      topic: string;
      targetDuration: number;
      tone: ArticleTone;
      title: string;
      content: string;
      wordCount: number;
      questions: Question[];
      status: GenerationStatus;
      errorMessage?: string;
      generatedAt: number;
      completed: boolean;
      comprehensionScore?: number;
      highestWPM?: number;
      lastReadAt?: number;
      attemptCount: number;
    }

    export interface GenerateArticleRequest {
      topic: string;
      targetWordCount: number;
      tone: ArticleTone;
      tonePrompt: string;
      userId: string;
    }

    export interface GenerateArticleResponse {
      success: boolean;
      article?: {
        title: string;
        content: string;
        wordCount: number;
        questions: Question[];
      };
      error?: string;
      errorCode?: 'NOT_PREMIUM' | 'RATE_LIMITED' | 'GENERATION_FAILED' | 'INVALID_REQUEST';
    }

Create `src/store/generatedStore.ts`:

    import AsyncStorage from '@react-native-async-storage/async-storage';
    import { create } from 'zustand';
    import { persist, createJSONStorage } from 'zustand/middleware';
    import {
      GeneratedArticle,
      ArticleTone,
      GenerationStatus,
      GenerateArticleResponse,
      TONE_DEFINITIONS,
    } from '../types/generated';

    const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
    const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

    const generateId = () => `gen_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    interface GeneratedState {
      articles: GeneratedArticle[];
      isGenerating: boolean;
      generationError: string | null;
    }

    interface GeneratedActions {
      generateArticle: (params: {
        topic: string;
        durationMinutes: number;
        tone: ArticleTone;
        avgWpm: number;
        userId: string;
      }) => Promise<GeneratedArticle | null>;
      updateArticleProgress: (
        id: string,
        updates: Partial<Pick<GeneratedArticle, 'completed' | 'comprehensionScore' | 'highestWPM' | 'lastReadAt' | 'attemptCount'>>
      ) => void;
      getArticleById: (id: string) => GeneratedArticle | undefined;
      deleteArticle: (id: string) => void;
      clearError: () => void;
    }

    type GeneratedStore = GeneratedState & GeneratedActions;

    export const useGeneratedStore = create<GeneratedStore>()(
      persist(
        (set, get) => ({
          articles: [],
          isGenerating: false,
          generationError: null,

          generateArticle: async ({ topic, durationMinutes, tone, avgWpm, userId }) => {
            const targetWordCount = Math.round(durationMinutes * avgWpm);
            const toneDefinition = TONE_DEFINITIONS.find((t) => t.id === tone);

            const placeholderId = generateId();
            const placeholderArticle: GeneratedArticle = {
              id: placeholderId,
              topic,
              targetDuration: durationMinutes,
              tone,
              title: '',
              content: '',
              wordCount: 0,
              questions: [],
              status: 'generating',
              generatedAt: Date.now(),
              completed: false,
              attemptCount: 0,
            };

            set({ isGenerating: true, generationError: null });
            set((state) => ({ articles: [placeholderArticle, ...state.articles] }));

            try {
              const response = await fetch(`${SUPABASE_URL}/functions/v1/generate-article`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                },
                body: JSON.stringify({
                  topic,
                  targetWordCount,
                  tone,
                  tonePrompt: toneDefinition?.promptModifier || '',
                  userId,
                }),
              });

              const result: GenerateArticleResponse = await response.json();

              if (!result.success || !result.article) {
                throw new Error(result.error || 'Generation failed');
              }

              const completedArticle: GeneratedArticle = {
                ...placeholderArticle,
                title: result.article.title,
                content: result.article.content,
                wordCount: result.article.wordCount,
                questions: result.article.questions,
                status: 'complete',
              };

              set((state) => ({
                articles: state.articles.map((a) => (a.id === placeholderId ? completedArticle : a)),
                isGenerating: false,
              }));

              return completedArticle;
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : 'Unknown error';

              set((state) => ({
                articles: state.articles.map((a) =>
                  a.id === placeholderId
                    ? { ...a, status: 'error' as GenerationStatus, errorMessage }
                    : a
                ),
                isGenerating: false,
                generationError: errorMessage,
              }));

              return null;
            }
          },

          updateArticleProgress: (id, updates) => {
            set((state) => ({
              articles: state.articles.map((a) => (a.id === id ? { ...a, ...updates } : a)),
            }));
          },

          getArticleById: (id) => {
            return get().articles.find((a) => a.id === id);
          },

          deleteArticle: (id) => {
            set((state) => ({
              articles: state.articles.filter((a) => a.id !== id),
            }));
          },

          clearError: () => {
            set({ generationError: null });
          },
        }),
        {
          name: 'spidrid-generated',
          storage: createJSONStorage(() => AsyncStorage),
          partialize: (state) => ({
            articles: state.articles.filter((a) => a.status === 'complete'),
          }),
        }
      )
    );

### Files to Modify

In `src/types/journey.ts`, find the line defining `ArticleType` and add `'generated'`:

    // Before:
    export type ArticleType = 'curriculum' | 'certification' | 'imported';

    // After:
    export type ArticleType = 'curriculum' | 'certification' | 'imported' | 'generated';

### Validation

Run TypeScript compilation to verify types are correct:

    npx tsc --noEmit

Expected output: no errors. If there are errors, they will indicate missing imports or type mismatches to fix.


---


## Milestone 2: Supabase Edge Function

This milestone creates the backend that securely calls Claude without exposing the API key. At the end, we will have a deployed Supabase Edge Function that accepts article generation requests, calls Claude, parses the response, and returns structured JSON.

### Prerequisites

You need a Supabase project. If one does not exist, create one at supabase.com. You will need:

- The project URL (e.g., `https://abcdefgh.supabase.co`)
- The anon public key (safe to embed in client)
- Access to deploy Edge Functions via Supabase CLI

You also need an Anthropic API key with access to Claude.

### Supabase CLI Setup

If not installed:

    npm install -g supabase

Login:

    supabase login

Link to your project (from repository root):

    supabase link --project-ref YOUR_PROJECT_REF

### Edge Function Code

Create the function directory and file:

    mkdir -p supabase/functions/generate-article
    touch supabase/functions/generate-article/index.ts

Contents of `supabase/functions/generate-article/index.ts`:

    import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

    interface RequestBody {
      topic: string;
      targetWordCount: number;
      tone: string;
      tonePrompt: string;
      userId: string;
    }

    interface Question {
      id: string;
      type: 'single_choice' | 'true_false' | 'multiple_select' | 'numeric';
      question: string;
      options?: string[];
      correctIndex?: number;
      correctIndices?: number[];
      correctAnswer?: boolean;
      correctValue?: number;
      tolerance?: number;
      min?: number;
      max?: number;
      unit?: string;
    }

    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY') || '';

    const SYSTEM_PROMPT = `You are an expert educational content writer creating articles for a speed reading practice app. Your task is to generate engaging, informative articles that help readers learn while practicing their reading speed.

    CRITICAL REQUIREMENTS:
    1. The article MUST be approximately the requested word count (within 10% tolerance)
    2. Use clear, well-structured prose with logical flow between paragraphs
    3. Include interesting facts, insights, and memorable details
    4. AVOID bullet points and lists - use flowing prose paragraphs only
    5. Each paragraph should be 3-5 sentences
    6. Make the content educational and substantive, not fluff

    After the article, generate 5 comprehension questions. Use a mix of question types:
    - single_choice: Multiple choice with 4 options, 1 correct (correctIndex is 0-based)
    - true_false: Statement with boolean correctAnswer
    - numeric: Number answer with correctValue, tolerance, min, max, and optional unit

    Questions should test genuine comprehension of the article content, not trivia. Include plausible wrong answers for multiple choice.

    OUTPUT FORMAT (follow exactly):
    ---ARTICLE---
    [Article title on first line, no # prefix]
    [Blank line]
    [Article content as paragraphs separated by blank lines...]
    ---QUESTIONS---
    [JSON array of exactly 5 questions]`;

    serve(async (req) => {
      if (req.method === 'OPTIONS') {
        return new Response('ok', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        });
      }

      try {
        const body: RequestBody = await req.json();
        const { topic, targetWordCount, tone, tonePrompt, userId } = body;

        // Input validation
        if (!topic || topic.length < 3 || topic.length > 500) {
          return new Response(
            JSON.stringify({
              success: false,
              error: 'Topic must be between 3 and 500 characters',
              errorCode: 'INVALID_REQUEST',
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }

        if (!targetWordCount || targetWordCount < 100 || targetWordCount > 10000) {
          return new Response(
            JSON.stringify({
              success: false,
              error: 'Invalid word count',
              errorCode: 'INVALID_REQUEST',
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }

        // TODO: Add premium verification check using userId
        // For now, assume all requests are authorized

        const userPrompt = `Write an educational article about: "${topic}"

    Target word count: ${targetWordCount} words (IMPORTANT: stay within 10% of this target)

    Writing style instructions: ${tonePrompt}

    Remember:
    - Write in flowing prose paragraphs, no bullet points or lists
    - Make the content genuinely educational and interesting
    - Include specific facts, examples, and insights
    - End with exactly 5 comprehension questions in valid JSON format`;

        const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 8192,
            system: SYSTEM_PROMPT,
            messages: [{ role: 'user', content: userPrompt }],
          }),
        });

        if (!anthropicResponse.ok) {
          const errorText = await anthropicResponse.text();
          console.error('Anthropic API error:', errorText);
          throw new Error('Failed to generate content');
        }

        const anthropicData = await anthropicResponse.json();
        const responseText =
          anthropicData.content[0]?.type === 'text' ? anthropicData.content[0].text : '';

        // Parse the response
        const articleMatch = responseText.match(/---ARTICLE---\s*([\s\S]*?)\s*---QUESTIONS---/);
        const questionsMatch = responseText.match(/---QUESTIONS---\s*([\s\S]*?)$/);

        if (!articleMatch || !questionsMatch) {
          console.error('Failed to parse response format:', responseText.substring(0, 500));
          throw new Error('Failed to parse LLM response format');
        }

        const articleText = articleMatch[1].trim();
        const lines = articleText.split('\n');
        const title = lines[0].replace(/^#\s*/, '').trim();
        const content = lines
          .slice(1)
          .join('\n')
          .trim();

        let questions: Question[];
        try {
          const questionsJson = questionsMatch[1].trim();
          // Handle potential markdown code fence around JSON
          const cleanJson = questionsJson.replace(/^```json?\s*|\s*```$/g, '');
          questions = JSON.parse(cleanJson);
        } catch (parseError) {
          console.error('Failed to parse questions JSON:', questionsMatch[1]);
          throw new Error('Failed to parse questions JSON');
        }

        const wordCount = content.split(/\s+/).filter(Boolean).length;

        return new Response(
          JSON.stringify({
            success: true,
            article: { title, content, wordCount, questions },
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      } catch (error) {
        console.error('Generation error:', error);
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Failed to generate article. Please try again.',
            errorCode: 'GENERATION_FAILED',
          }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }
    });

### Deploy the Function

Set the Anthropic API key as a secret:

    supabase secrets set ANTHROPIC_API_KEY=sk-ant-your-key-here

Deploy the function:

    supabase functions deploy generate-article

### Client Environment Variables

Create or update `.env` at the repository root:

    EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
    EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

Update `app.config.js` or `app.json` to expose these to Expo if needed.

### Validation

Test the function with curl:

    curl -X POST https://your-project.supabase.co/functions/v1/generate-article \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer YOUR_ANON_KEY" \
      -d '{
        "topic": "The history of coffee",
        "targetWordCount": 500,
        "tone": "storytelling",
        "tonePrompt": "Write as if telling a story...",
        "userId": "test-user"
      }'

Expected response (abbreviated):

    {
      "success": true,
      "article": {
        "title": "The Caffeinated Journey: How Coffee Conquered the World",
        "content": "In the misty highlands of Ethiopia...",
        "wordCount": 487,
        "questions": [
          {"id": "q1", "type": "single_choice", "question": "...", ...},
          ...
        ]
      }
    }


---


## Milestone 3: Learn Tab UI with Article Generation

This milestone adds the Learn tab to the app navigation and creates the article generation UI. At the end, users can navigate to the Learn tab, see a segmented control for Articles vs Curricula, tap "Generate Article," fill out the form, and trigger generation.

### Files to Modify

In `src/app/(tabs)/_layout.tsx`, add the Learn tab screen. Find the Tabs component and add:

    <Tabs.Screen name="learn" />

Place it before or after other screens as desired. The tab order in the UI is controlled by FloatingNavBar, not this file.

In `src/components/navigation/FloatingNavBar.tsx`, add the Learn item to NAV_ITEMS. Find the array definition and add:

    {
      name: 'Learn',
      route: '/(tabs)/learn',
      activeIcon: 'sparkles',
      inactiveIcon: 'sparkles-outline',
    },

Also update the NavItem route type union to include the new route:

    route: '/(tabs)/journey' | '/(tabs)/read' | '/(tabs)/profile' | '/(tabs)/testing' | '/(tabs)/learn';

### Files to Create

Create `src/app/(tabs)/learn.tsx`:

    import React, { useState } from 'react';
    import {
      View,
      Text,
      StyleSheet,
      SafeAreaView,
      TouchableOpacity,
      FlatList,
      ActivityIndicator,
    } from 'react-native';
    import { useRouter } from 'expo-router';
    import { useTheme } from '../../data/themes';
    import { useGeneratedStore } from '../../store/generatedStore';
    import { useSubscriptionStore } from '../../store/subscriptionStore';
    import { useJourneyStore } from '../../store/journeyStore';
    import { GenerateArticleModal } from '../../components/learn/GenerateArticleModal';
    import { GeneratedArticleCard } from '../../components/learn/GeneratedArticleCard';
    import { Paywall } from '../../components/paywall/Paywall';

    type Segment = 'articles' | 'curricula';

    export default function LearnScreen() {
      const theme = useTheme();
      const router = useRouter();
      const [segment, setSegment] = useState<Segment>('articles');
      const [showGenerateModal, setShowGenerateModal] = useState(false);
      const [showPaywall, setShowPaywall] = useState(false);

      const { articles, isGenerating } = useGeneratedStore();
      const { isPremium } = useSubscriptionStore();
      const { avgWpmLast3 } = useJourneyStore();

      const completedArticles = articles.filter((a) => a.status === 'complete');

      const handleGeneratePress = () => {
        if (!isPremium) {
          setShowPaywall(true);
          return;
        }
        setShowGenerateModal(true);
      };

      const handleArticlePress = (articleId: string) => {
        router.push(`/generated/${articleId}`);
      };

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        header: {
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 10,
        },
        title: {
          fontSize: 28,
          fontWeight: 'bold',
          color: theme.colors.text,
          marginBottom: 16,
        },
        segmentContainer: {
          flexDirection: 'row',
          backgroundColor: theme.colors.surface,
          borderRadius: 12,
          padding: 4,
        },
        segmentButton: {
          flex: 1,
          paddingVertical: 10,
          alignItems: 'center',
          borderRadius: 10,
        },
        segmentButtonActive: {
          backgroundColor: theme.colors.primary,
        },
        segmentText: {
          fontSize: 14,
          fontWeight: '600',
          color: theme.colors.textSecondary,
        },
        segmentTextActive: {
          color: theme.colors.background,
        },
        content: {
          flex: 1,
          paddingHorizontal: 20,
        },
        generateButton: {
          backgroundColor: theme.colors.primary,
          borderRadius: 12,
          paddingVertical: 14,
          alignItems: 'center',
          marginVertical: 16,
        },
        generateButtonDisabled: {
          opacity: 0.6,
        },
        generateButtonText: {
          fontSize: 16,
          fontWeight: '600',
          color: theme.colors.background,
        },
        sectionTitle: {
          fontSize: 18,
          fontWeight: '600',
          color: theme.colors.text,
          marginBottom: 12,
        },
        emptyText: {
          fontSize: 14,
          color: theme.colors.textSecondary,
          textAlign: 'center',
          marginTop: 40,
        },
        comingSoon: {
          fontSize: 16,
          color: theme.colors.textSecondary,
          textAlign: 'center',
          marginTop: 60,
        },
      });

      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Learn</Text>
            <View style={styles.segmentContainer}>
              <TouchableOpacity
                style={[styles.segmentButton, segment === 'articles' && styles.segmentButtonActive]}
                onPress={() => setSegment('articles')}
              >
                <Text
                  style={[styles.segmentText, segment === 'articles' && styles.segmentTextActive]}
                >
                  Articles
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.segmentButton, segment === 'curricula' && styles.segmentButtonActive]}
                onPress={() => setSegment('curricula')}
              >
                <Text
                  style={[styles.segmentText, segment === 'curricula' && styles.segmentTextActive]}
                >
                  Curricula
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.content}>
            {segment === 'articles' ? (
              <>
                <TouchableOpacity
                  style={[styles.generateButton, isGenerating && styles.generateButtonDisabled]}
                  onPress={handleGeneratePress}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <ActivityIndicator color={theme.colors.background} />
                  ) : (
                    <Text style={styles.generateButtonText}>+ Generate Article</Text>
                  )}
                </TouchableOpacity>

                {completedArticles.length > 0 ? (
                  <>
                    <Text style={styles.sectionTitle}>My Articles</Text>
                    <FlatList
                      data={completedArticles}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                        <GeneratedArticleCard
                          article={item}
                          onPress={() => handleArticlePress(item.id)}
                        />
                      )}
                      showsVerticalScrollIndicator={false}
                    />
                  </>
                ) : (
                  <Text style={styles.emptyText}>
                    No articles yet. Generate your first one!
                  </Text>
                )}
              </>
            ) : (
              <Text style={styles.comingSoon}>Curricula coming soon...</Text>
            )}
          </View>

          <GenerateArticleModal
            visible={showGenerateModal}
            onClose={() => setShowGenerateModal(false)}
            avgWpm={avgWpmLast3 || 250}
          />

          <Paywall visible={showPaywall} onClose={() => setShowPaywall(false)} />
        </SafeAreaView>
      );
    }

Create `src/components/learn/GenerateArticleModal.tsx`:

    import React, { useState } from 'react';
    import {
      View,
      Text,
      StyleSheet,
      Modal,
      TouchableOpacity,
      TextInput,
      ScrollView,
      ActivityIndicator,
      KeyboardAvoidingView,
      Platform,
    } from 'react-native';
    import { useRouter } from 'expo-router';
    import { Ionicons } from '@expo/vector-icons';
    import { useTheme } from '../../data/themes';
    import { useGeneratedStore } from '../../store/generatedStore';
    import {
      ArticleTone,
      TONE_DEFINITIONS,
      DURATION_OPTIONS,
    } from '../../types/generated';
    import { TonePill } from './TonePill';
    import { DurationPill } from './DurationPill';

    interface Props {
      visible: boolean;
      onClose: () => void;
      avgWpm: number;
    }

    export function GenerateArticleModal({ visible, onClose, avgWpm }: Props) {
      const theme = useTheme();
      const router = useRouter();
      const { generateArticle, isGenerating } = useGeneratedStore();

      const [topic, setTopic] = useState('');
      const [duration, setDuration] = useState(3);
      const [tone, setTone] = useState<ArticleTone>('explanatory');

      const estimatedWords = Math.round(duration * avgWpm);

      const handleGenerate = async () => {
        if (!topic.trim()) return;

        const article = await generateArticle({
          topic: topic.trim(),
          durationMinutes: duration,
          tone,
          avgWpm,
          userId: 'current-user', // TODO: Get from auth
        });

        if (article) {
          onClose();
          setTopic('');
          router.push(`/generated/${article.id}`);
        }
      };

      const styles = StyleSheet.create({
        overlay: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end',
        },
        container: {
          backgroundColor: theme.colors.background,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingBottom: 40,
          maxHeight: '90%',
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.surface,
        },
        headerTitle: {
          fontSize: 20,
          fontWeight: '600',
          color: theme.colors.text,
        },
        closeButton: {
          padding: 4,
        },
        content: {
          padding: 20,
        },
        label: {
          fontSize: 14,
          fontWeight: '600',
          color: theme.colors.text,
          marginBottom: 8,
          marginTop: 16,
        },
        topicInput: {
          backgroundColor: theme.colors.surface,
          borderRadius: 12,
          padding: 16,
          fontSize: 16,
          color: theme.colors.text,
          minHeight: 80,
          textAlignVertical: 'top',
        },
        durationRow: {
          flexDirection: 'row',
          gap: 8,
        },
        estimatedWords: {
          fontSize: 12,
          color: theme.colors.textSecondary,
          marginTop: 8,
        },
        toneGrid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
        },
        generateButton: {
          backgroundColor: theme.colors.primary,
          borderRadius: 12,
          paddingVertical: 16,
          alignItems: 'center',
          marginTop: 24,
        },
        generateButtonDisabled: {
          opacity: 0.5,
        },
        generateButtonText: {
          fontSize: 16,
          fontWeight: '600',
          color: theme.colors.background,
        },
      });

      return (
        <Modal visible={visible} animationType="slide" transparent>
          <KeyboardAvoidingView
            style={styles.overlay}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Generate Article</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Ionicons name="close" size={24} color={theme.colors.text} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.content}>
                <Text style={[styles.label, { marginTop: 0 }]}>
                  What do you want to learn about?
                </Text>
                <TextInput
                  style={styles.topicInput}
                  placeholder="e.g., The history of coffee, How black holes form, Why cats purr..."
                  placeholderTextColor={theme.colors.textSecondary}
                  value={topic}
                  onChangeText={setTopic}
                  multiline
                  maxLength={500}
                />

                <Text style={styles.label}>Reading Duration</Text>
                <View style={styles.durationRow}>
                  {DURATION_OPTIONS.map((opt) => (
                    <DurationPill
                      key={opt.minutes}
                      label={opt.label}
                      selected={duration === opt.minutes}
                      onPress={() => setDuration(opt.minutes)}
                    />
                  ))}
                </View>
                <Text style={styles.estimatedWords}>
                  ~{estimatedWords} words at your current pace
                </Text>

                <Text style={styles.label}>Writing Style</Text>
                <View style={styles.toneGrid}>
                  {TONE_DEFINITIONS.map((t) => (
                    <TonePill
                      key={t.id}
                      tone={t}
                      selected={tone === t.id}
                      onPress={() => setTone(t.id)}
                    />
                  ))}
                </View>

                <TouchableOpacity
                  style={[
                    styles.generateButton,
                    (!topic.trim() || isGenerating) && styles.generateButtonDisabled,
                  ]}
                  onPress={handleGenerate}
                  disabled={!topic.trim() || isGenerating}
                >
                  {isGenerating ? (
                    <ActivityIndicator color={theme.colors.background} />
                  ) : (
                    <Text style={styles.generateButtonText}>Generate</Text>
                  )}
                </TouchableOpacity>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      );
    }

Create `src/components/learn/DurationPill.tsx`:

    import React from 'react';
    import { TouchableOpacity, Text, StyleSheet } from 'react-native';
    import { useTheme } from '../../data/themes';

    interface Props {
      label: string;
      selected: boolean;
      onPress: () => void;
    }

    export function DurationPill({ label, selected, onPress }: Props) {
      const theme = useTheme();

      const styles = StyleSheet.create({
        pill: {
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 20,
          backgroundColor: selected ? theme.colors.primary : theme.colors.surface,
        },
        text: {
          fontSize: 14,
          fontWeight: '500',
          color: selected ? theme.colors.background : theme.colors.text,
        },
      });

      return (
        <TouchableOpacity style={styles.pill} onPress={onPress}>
          <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
      );
    }

Create `src/components/learn/TonePill.tsx`:

    import React from 'react';
    import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
    import { useTheme } from '../../data/themes';
    import { ToneDefinition } from '../../types/generated';

    interface Props {
      tone: ToneDefinition;
      selected: boolean;
      onPress: () => void;
    }

    export function TonePill({ tone, selected, onPress }: Props) {
      const theme = useTheme();

      const styles = StyleSheet.create({
        pill: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: 20,
          backgroundColor: selected ? theme.colors.primary : theme.colors.surface,
          gap: 6,
        },
        emoji: {
          fontSize: 16,
        },
        text: {
          fontSize: 14,
          fontWeight: '500',
          color: selected ? theme.colors.background : theme.colors.text,
        },
      });

      return (
        <TouchableOpacity style={styles.pill} onPress={onPress}>
          <Text style={styles.emoji}>{tone.emoji}</Text>
          <Text style={styles.text}>{tone.label}</Text>
        </TouchableOpacity>
      );
    }

Create `src/components/learn/GeneratedArticleCard.tsx`:

    import React from 'react';
    import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';
    import { useTheme } from '../../data/themes';
    import { GeneratedArticle, TONE_DEFINITIONS } from '../../types/generated';

    interface Props {
      article: GeneratedArticle;
      onPress: () => void;
    }

    export function GeneratedArticleCard({ article, onPress }: Props) {
      const theme = useTheme();
      const toneDefinition = TONE_DEFINITIONS.find((t) => t.id === article.tone);

      const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      };

      const styles = StyleSheet.create({
        card: {
          backgroundColor: theme.colors.surface,
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        },
        title: {
          fontSize: 16,
          fontWeight: '600',
          color: theme.colors.text,
          flex: 1,
          marginRight: 8,
        },
        completedBadge: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        },
        meta: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8,
          gap: 12,
        },
        metaItem: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        },
        metaText: {
          fontSize: 12,
          color: theme.colors.textSecondary,
        },
        topic: {
          fontSize: 13,
          color: theme.colors.textSecondary,
          marginTop: 6,
          fontStyle: 'italic',
        },
        stats: {
          flexDirection: 'row',
          marginTop: 10,
          gap: 16,
        },
        stat: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        },
        statText: {
          fontSize: 13,
          color: theme.colors.primary,
          fontWeight: '500',
        },
      });

      return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={2}>
              {article.title}
            </Text>
            {article.completed && (
              <View style={styles.completedBadge}>
                <Ionicons name="checkmark-circle" size={18} color={theme.colors.primary} />
              </View>
            )}
          </View>

          <Text style={styles.topic} numberOfLines={1}>
            "{article.topic}"
          </Text>

          <View style={styles.meta}>
            <View style={styles.metaItem}>
              <Text style={styles.metaText}>{toneDefinition?.emoji}</Text>
              <Text style={styles.metaText}>{toneDefinition?.label}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="document-text-outline" size={14} color={theme.colors.textSecondary} />
              <Text style={styles.metaText}>{article.wordCount} words</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color={theme.colors.textSecondary} />
              <Text style={styles.metaText}>{formatDate(article.generatedAt)}</Text>
            </View>
          </View>

          {article.completed && article.comprehensionScore !== undefined && (
            <View style={styles.stats}>
              <View style={styles.stat}>
                <Ionicons name="speedometer-outline" size={16} color={theme.colors.primary} />
                <Text style={styles.statText}>{article.highestWPM} WPM</Text>
              </View>
              <View style={styles.stat}>
                <Ionicons name="school-outline" size={16} color={theme.colors.primary} />
                <Text style={styles.statText}>{article.comprehensionScore}%</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      );
    }

Create barrel export at `src/components/learn/index.ts`:

    export { GenerateArticleModal } from './GenerateArticleModal';
    export { DurationPill } from './DurationPill';
    export { TonePill } from './TonePill';
    export { GeneratedArticleCard } from './GeneratedArticleCard';

### Validation

Start the development server:

    npx expo start

Open the app in Expo Go or simulator. Navigate using the floating nav bar. You should see a new "Learn" icon (sparkles). Tap it. The Learn screen should appear with:

- A segmented control showing "Articles" and "Curricula"
- A "Generate Article" button
- Either an empty state message or a list of previously generated articles

Tap "Generate Article." The modal should appear with:

- A text input for the topic
- Duration pills (1, 2, 3, 5, 10 min)
- Tone pills with emojis
- A "Generate" button (disabled until topic is entered)

If you are not premium, tapping "Generate Article" should show the paywall instead.


---


## Milestone 4: Generated Article Reader

This milestone creates the reader screen for generated articles. At the end, users can read a generated article with RSVP, take the quiz, and have their stats recorded to journeyStore.

### Files to Create

Create `src/app/generated/[id].tsx`:

This file adapts the pattern from `src/app/article/[id].tsx`. The key differences are:

- Article data comes from `useGeneratedStore` instead of curriculum
- Uses `articleType: 'generated'` when recording sessions
- Updates progress in `generatedStore` instead of `learningStore`

    import React, { useState, useEffect, useCallback } from 'react';
    import {
      View,
      Text,
      StyleSheet,
      SafeAreaView,
      TouchableOpacity,
      ScrollView,
      ActivityIndicator,
    } from 'react-native';
    import { useLocalSearchParams, useRouter } from 'expo-router';
    import { Ionicons } from '@expo/vector-icons';
    import { useTheme } from '../../data/themes';
    import { useGeneratedStore } from '../../store/generatedStore';
    import { useJourneyStore } from '../../store/journeyStore';
    import { useSettingsStore } from '../../store/settingsStore';
    import { useRSVPEngine } from '../../hooks/useRSVPEngine';
    import { RSVPWord } from '../../components/rsvp/RSVPWord';
    import { PlaybackControls } from '../../components/controls/PlaybackControls';
    import { QuestionRenderer } from '../../components/quiz/QuestionRenderer';
    import { calculateQuizScore } from '../../utils/calculateQuizScore';
    import { Question } from '../../types/learning';

    type Phase = 'reading' | 'quiz' | 'results';

    export default function GeneratedArticleScreen() {
      const theme = useTheme();
      const router = useRouter();
      const { id } = useLocalSearchParams<{ id: string }>();

      const { getArticleById, updateArticleProgress } = useGeneratedStore();
      const { recordSession } = useJourneyStore();
      const { wpm } = useSettingsStore();

      const article = getArticleById(id || '');

      const [phase, setPhase] = useState<Phase>('reading');
      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
      const [answers, setAnswers] = useState<Record<string, unknown>>({});
      const [quizScore, setQuizScore] = useState(0);
      const [readingWpm, setReadingWpm] = useState(wpm);

      const engine = useRSVPEngine({
        text: article?.content || '',
        initialWpm: wpm,
        onComplete: () => setPhase('quiz'),
      });

      useEffect(() => {
        if (engine.wpm) {
          setReadingWpm(engine.wpm);
        }
      }, [engine.wpm]);

      const handleAnswer = useCallback(
        (questionId: string, answer: unknown) => {
          setAnswers((prev) => ({ ...prev, [questionId]: answer }));
        },
        []
      );

      const handleNextQuestion = useCallback(() => {
        if (!article) return;

        if (currentQuestionIndex < article.questions.length - 1) {
          setCurrentQuestionIndex((i) => i + 1);
        } else {
          // Calculate score and record session
          const result = calculateQuizScore(article.questions as Question[], answers);
          const score = Math.round(result.percentage);
          setQuizScore(score);

          // Record to journey store
          recordSession({
            wpm: readingWpm,
            comprehension: score,
            articleId: article.id,
            articleType: 'generated',
          });

          // Update article progress
          updateArticleProgress(article.id, {
            completed: true,
            comprehensionScore: score,
            highestWPM: readingWpm,
            lastReadAt: Date.now(),
            attemptCount: (article.attemptCount || 0) + 1,
          });

          setPhase('results');
        }
      }, [article, currentQuestionIndex, answers, readingWpm, recordSession, updateArticleProgress]);

      if (!article) {
        return (
          <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.centered}>
              <Text style={[styles.errorText, { color: theme.colors.text }]}>
                Article not found
              </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={[styles.linkText, { color: theme.colors.primary }]}>Go back</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        );
      }

      const currentQuestion = article.questions[currentQuestionIndex] as Question;

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        centered: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        errorText: {
          fontSize: 16,
          marginBottom: 16,
        },
        linkText: {
          fontSize: 16,
          fontWeight: '600',
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.surface,
        },
        backButton: {
          padding: 8,
          marginRight: 8,
        },
        headerTitle: {
          flex: 1,
          fontSize: 16,
          fontWeight: '600',
          color: theme.colors.text,
        },
        aiBadge: {
          backgroundColor: theme.colors.primary + '20',
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 8,
        },
        aiBadgeText: {
          fontSize: 11,
          fontWeight: '600',
          color: theme.colors.primary,
        },
        readingContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        },
        quizContainer: {
          flex: 1,
          padding: 20,
        },
        quizProgress: {
          fontSize: 14,
          color: theme.colors.textSecondary,
          marginBottom: 20,
        },
        nextButton: {
          backgroundColor: theme.colors.primary,
          borderRadius: 12,
          paddingVertical: 14,
          alignItems: 'center',
          marginTop: 24,
        },
        nextButtonDisabled: {
          opacity: 0.5,
        },
        nextButtonText: {
          fontSize: 16,
          fontWeight: '600',
          color: theme.colors.background,
        },
        resultsContainer: {
          flex: 1,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        },
        resultsTitle: {
          fontSize: 24,
          fontWeight: 'bold',
          color: theme.colors.text,
          marginBottom: 32,
        },
        statRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 16,
          gap: 12,
        },
        statLabel: {
          fontSize: 16,
          color: theme.colors.textSecondary,
          width: 120,
        },
        statValue: {
          fontSize: 20,
          fontWeight: '600',
          color: theme.colors.primary,
        },
        doneButton: {
          backgroundColor: theme.colors.primary,
          borderRadius: 12,
          paddingVertical: 14,
          paddingHorizontal: 48,
          marginTop: 40,
        },
        doneButtonText: {
          fontSize: 16,
          fontWeight: '600',
          color: theme.colors.background,
        },
      });

      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {article.title}
            </Text>
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>AI</Text>
            </View>
          </View>

          {phase === 'reading' && (
            <>
              <View style={styles.readingContainer}>
                <RSVPWord word={engine.currentWord} />
              </View>
              <PlaybackControls
                isPlaying={engine.isPlaying}
                onPlayPause={engine.togglePlayPause}
                wpm={engine.wpm}
                onWpmChange={engine.setWpm}
                progress={engine.progress}
                onSeek={engine.seekToProgress}
              />
            </>
          )}

          {phase === 'quiz' && currentQuestion && (
            <ScrollView style={styles.quizContainer}>
              <Text style={styles.quizProgress}>
                Question {currentQuestionIndex + 1} of {article.questions.length}
              </Text>
              <QuestionRenderer
                question={currentQuestion}
                onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
                selectedAnswer={answers[currentQuestion.id]}
              />
              <TouchableOpacity
                style={[
                  styles.nextButton,
                  answers[currentQuestion.id] === undefined && styles.nextButtonDisabled,
                ]}
                onPress={handleNextQuestion}
                disabled={answers[currentQuestion.id] === undefined}
              >
                <Text style={styles.nextButtonText}>
                  {currentQuestionIndex < article.questions.length - 1 ? 'Next' : 'Finish'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          {phase === 'results' && (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsTitle}>Reading Complete!</Text>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Reading Speed</Text>
                <Text style={styles.statValue}>{readingWpm} WPM</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Comprehension</Text>
                <Text style={styles.statValue}>{quizScore}%</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Word Count</Text>
                <Text style={styles.statValue}>{article.wordCount}</Text>
              </View>
              <TouchableOpacity style={styles.doneButton} onPress={() => router.back()}>
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      );
    }

Note: The above code is a simplified version. The actual implementation should match the patterns in `src/app/article/[id].tsx` more closely, including any animations, error handling, and edge cases. Review that file and adapt accordingly.

### Validation

With the app running:

1. Go to Learn tab
2. Generate an article (requires premium and Supabase function deployed)
3. After generation completes, you should be navigated to the reader
4. The RSVP display should show words one at a time
5. Playback controls should work (play/pause, WPM adjustment)
6. After reading completes, quiz questions should appear
7. Answer all questions and tap Finish
8. Results screen should show WPM and comprehension score
9. Tap Done to return to Learn tab
10. The article card should now show a checkmark and the stats

To verify stats were recorded:

- Navigate to Journey tab
- Your Velocity Score should reflect the new session
- Or check AsyncStorage for the `spidrid-journey` key


---


## Milestone 5: Curriculum Types and Store

This milestone establishes the data layer for curricula. At the end, we will have TypeScript types for curricula and curriculum articles, plus a Zustand store for managing curriculum state.

### Files to Create

Create `src/types/curriculum.ts`:

    import { Question } from './learning';
    import { ArticleTone } from './generated';

    export type ArticleGenerationStatus = 'pending' | 'generating' | 'generated' | 'failed';
    export type ArticleCompletionStatus = 'locked' | 'unlocked' | 'in_progress' | 'completed';

    export interface CurriculumArticle {
      id: string;
      curriculumId: string;
      orderIndex: number;
      title: string;
      summary: string;
      content: string;
      wordCount: number;
      questions: Question[];
      generationStatus: ArticleGenerationStatus;
      completionStatus: ArticleCompletionStatus;
      generatedAt?: number;
      completedAt?: number;
      comprehensionScore?: number;
      readingWPM?: number;
      generationError?: string;
    }

    export interface CurriculumOutline {
      curriculumTitle: string;
      articles: Array<{
        orderIndex: number;
        title: string;
        summary: string;
        keyConceptsToIntroduce: string[];
        prerequisiteConcepts: string[];
      }>;
    }

    export interface Curriculum {
      id: string;
      title: string;
      goal: string;
      articleCount: number;
      tone: ArticleTone;
      targetWordCount: number;
      createdAt: number;
      updatedAt: number;
      currentArticleIndex: number;
      completedArticleCount: number;
      isCompleted: boolean;
      outline?: CurriculumOutline;
      articles: CurriculumArticle[];
    }

    export interface CurriculumCreationInput {
      goal: string;
      articleCount: number;
      tone: ArticleTone;
      durationMinutes: number;
    }

Create `src/store/curriculumStore.ts`:

    import AsyncStorage from '@react-native-async-storage/async-storage';
    import { create } from 'zustand';
    import { persist, createJSONStorage } from 'zustand/middleware';
    import {
      Curriculum,
      CurriculumArticle,
      CurriculumCreationInput,
      CurriculumOutline,
      ArticleGenerationStatus,
    } from '../types/curriculum';
    import { ArticleTone, TONE_DEFINITIONS } from '../types/generated';
    import { Question } from '../types/learning';

    const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
    const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

    const generateId = () => `curr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    function durationToWordCount(durationMinutes: number, avgWpm: number = 250): number {
      const targetWords = durationMinutes * avgWpm;
      return Math.max(500, Math.min(5000, targetWords));
    }

    interface CurriculumState {
      curricula: Record<string, Curriculum>;
      isGenerating: boolean;
      generationProgress: { current: number; total: number; message: string } | null;
      generationError: string | null;
    }

    interface CurriculumActions {
      createCurriculum: (input: CurriculumCreationInput, avgWpm: number) => Promise<string | null>;
      getCurriculum: (id: string) => Curriculum | undefined;
      getAllCurricula: () => Curriculum[];
      deleteCurriculum: (id: string) => void;
      markArticleCompleted: (curriculumId: string, articleIndex: number, score: number, wpm: number) => void;
      generateArticle: (curriculumId: string, articleIndex: number) => Promise<void>;
      clearError: () => void;
    }

    type CurriculumStore = CurriculumState & CurriculumActions;

    export const useCurriculumStore = create<CurriculumStore>()(
      persist(
        (set, get) => ({
          curricula: {},
          isGenerating: false,
          generationProgress: null,
          generationError: null,

          createCurriculum: async (input, avgWpm) => {
            const id = generateId();
            const targetWordCount = durationToWordCount(input.durationMinutes, avgWpm);

            // Create initial curriculum with placeholder articles
            const curriculum: Curriculum = {
              id,
              title: '',
              goal: input.goal,
              articleCount: input.articleCount,
              tone: input.tone,
              targetWordCount,
              createdAt: Date.now(),
              updatedAt: Date.now(),
              currentArticleIndex: 0,
              completedArticleCount: 0,
              isCompleted: false,
              articles: Array.from({ length: input.articleCount }, (_, i) => ({
                id: `${id}-article-${i}`,
                curriculumId: id,
                orderIndex: i,
                title: `Article ${i + 1}`,
                summary: '',
                content: '',
                wordCount: targetWordCount,
                questions: [],
                generationStatus: 'pending',
                completionStatus: i === 0 ? 'unlocked' : 'locked',
              })),
            };

            set((state) => ({
              curricula: { ...state.curricula, [id]: curriculum },
              isGenerating: true,
              generationProgress: { current: 0, total: input.articleCount + 1, message: 'Creating outline...' },
              generationError: null,
            }));

            try {
              // Step 1: Generate outline
              const toneDefinition = TONE_DEFINITIONS.find((t) => t.id === input.tone);
              const outlineResponse = await fetch(`${SUPABASE_URL}/functions/v1/generate-curriculum-outline`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                },
                body: JSON.stringify({
                  goal: input.goal,
                  articleCount: input.articleCount,
                  tone: input.tone,
                  tonePrompt: toneDefinition?.promptModifier || '',
                }),
              });

              const outlineResult = await outlineResponse.json();
              if (!outlineResult.success) {
                throw new Error(outlineResult.error || 'Failed to generate outline');
              }

              const outline: CurriculumOutline = outlineResult.outline;

              // Update curriculum with outline
              set((state) => {
                const curr = state.curricula[id];
                return {
                  curricula: {
                    ...state.curricula,
                    [id]: {
                      ...curr,
                      title: outline.curriculumTitle,
                      outline,
                      articles: curr.articles.map((a, i) => ({
                        ...a,
                        title: outline.articles[i]?.title || a.title,
                        summary: outline.articles[i]?.summary || '',
                      })),
                    },
                  },
                  generationProgress: { current: 1, total: input.articleCount + 1, message: 'Generating article 1...' },
                };
              });

              // Step 2: Generate first two articles
              for (let i = 0; i < Math.min(2, input.articleCount); i++) {
                set((state) => ({
                  generationProgress: {
                    current: i + 2,
                    total: input.articleCount + 1,
                    message: `Generating article ${i + 1}...`,
                  },
                }));

                await get().generateArticle(id, i);
              }

              set({ isGenerating: false, generationProgress: null });
              return id;
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : 'Unknown error';
              set({
                isGenerating: false,
                generationProgress: null,
                generationError: errorMessage,
              });
              // Clean up failed curriculum
              set((state) => {
                const { [id]: _, ...rest } = state.curricula;
                return { curricula: rest };
              });
              return null;
            }
          },

          getCurriculum: (id) => get().curricula[id],

          getAllCurricula: () => Object.values(get().curricula).sort((a, b) => b.createdAt - a.createdAt),

          deleteCurriculum: (id) => {
            set((state) => {
              const { [id]: _, ...rest } = state.curricula;
              return { curricula: rest };
            });
          },

          markArticleCompleted: (curriculumId, articleIndex, score, wpm) => {
            set((state) => {
              const curriculum = state.curricula[curriculumId];
              if (!curriculum) return state;

              const updatedArticles = curriculum.articles.map((a, i) => {
                if (i === articleIndex) {
                  return {
                    ...a,
                    completionStatus: 'completed' as const,
                    completedAt: Date.now(),
                    comprehensionScore: score,
                    readingWPM: wpm,
                  };
                }
                if (i === articleIndex + 1 && a.completionStatus === 'locked') {
                  return { ...a, completionStatus: 'unlocked' as const };
                }
                return a;
              });

              const completedCount = updatedArticles.filter((a) => a.completionStatus === 'completed').length;

              return {
                curricula: {
                  ...state.curricula,
                  [curriculumId]: {
                    ...curriculum,
                    articles: updatedArticles,
                    completedArticleCount: completedCount,
                    currentArticleIndex: Math.min(articleIndex + 1, curriculum.articleCount - 1),
                    isCompleted: completedCount === curriculum.articleCount,
                    updatedAt: Date.now(),
                  },
                },
              };
            });

            // Trigger background generation of article N+2
            const curriculum = get().curricula[curriculumId];
            if (curriculum) {
              const pregenerateIndex = articleIndex + 2;
              if (
                pregenerateIndex < curriculum.articleCount &&
                curriculum.articles[pregenerateIndex]?.generationStatus === 'pending'
              ) {
                get().generateArticle(curriculumId, pregenerateIndex);
              }
            }
          },

          generateArticle: async (curriculumId, articleIndex) => {
            const curriculum = get().curricula[curriculumId];
            if (!curriculum || !curriculum.outline) return;

            const articleOutline = curriculum.outline.articles[articleIndex];
            if (!articleOutline) return;

            // Mark as generating
            set((state) => {
              const curr = state.curricula[curriculumId];
              if (!curr) return state;
              return {
                curricula: {
                  ...state.curricula,
                  [curriculumId]: {
                    ...curr,
                    articles: curr.articles.map((a, i) =>
                      i === articleIndex ? { ...a, generationStatus: 'generating' as const } : a
                    ),
                  },
                },
              };
            });

            try {
              const toneDefinition = TONE_DEFINITIONS.find((t) => t.id === curriculum.tone);
              const prevArticle = articleIndex > 0 ? curriculum.articles[articleIndex - 1] : null;

              const response = await fetch(`${SUPABASE_URL}/functions/v1/generate-article`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                },
                body: JSON.stringify({
                  topic: `${curriculum.goal} - ${articleOutline.title}`,
                  targetWordCount: curriculum.targetWordCount,
                  tone: curriculum.tone,
                  tonePrompt: toneDefinition?.promptModifier || '',
                  userId: 'curriculum-gen',
                  curriculumContext: {
                    curriculumTitle: curriculum.title,
                    articleTitle: articleOutline.title,
                    articleSummary: articleOutline.summary,
                    keyConceptsToIntroduce: articleOutline.keyConceptsToIntroduce,
                    prerequisiteConcepts: articleOutline.prerequisiteConcepts,
                    previousArticleSummary: prevArticle?.summary || null,
                    position: `${articleIndex + 1} of ${curriculum.articleCount}`,
                  },
                }),
              });

              const result = await response.json();
              if (!result.success || !result.article) {
                throw new Error(result.error || 'Generation failed');
              }

              set((state) => {
                const curr = state.curricula[curriculumId];
                if (!curr) return state;
                return {
                  curricula: {
                    ...state.curricula,
                    [curriculumId]: {
                      ...curr,
                      articles: curr.articles.map((a, i) =>
                        i === articleIndex
                          ? {
                              ...a,
                              title: result.article.title,
                              content: result.article.content,
                              wordCount: result.article.wordCount,
                              questions: result.article.questions,
                              generationStatus: 'generated' as const,
                              generatedAt: Date.now(),
                            }
                          : a
                      ),
                      updatedAt: Date.now(),
                    },
                  },
                };
              });
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : 'Unknown error';
              set((state) => {
                const curr = state.curricula[curriculumId];
                if (!curr) return state;
                return {
                  curricula: {
                    ...state.curricula,
                    [curriculumId]: {
                      ...curr,
                      articles: curr.articles.map((a, i) =>
                        i === articleIndex
                          ? { ...a, generationStatus: 'failed' as const, generationError: errorMessage }
                          : a
                      ),
                    },
                  },
                };
              });
            }
          },

          clearError: () => {
            set({ generationError: null });
          },
        }),
        {
          name: 'spidrid-curriculum',
          storage: createJSONStorage(() => AsyncStorage),
          partialize: (state) => ({
            curricula: state.curricula,
          }),
        }
      )
    );

### Validation

Run TypeScript compilation:

    npx tsc --noEmit

Expected: no errors.


---


## Milestone 6: Curriculum Generation Backend

This milestone creates the Supabase Edge Function for generating curriculum outlines. The article generation function from Milestone 2 will be enhanced to support curriculum context.

### Files to Create

Create `supabase/functions/generate-curriculum-outline/index.ts`:

    import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

    interface RequestBody {
      goal: string;
      articleCount: number;
      tone: string;
      tonePrompt: string;
    }

    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY') || '';

    const SYSTEM_PROMPT = `You are an expert curriculum designer creating structured learning paths. Your task is to design a curriculum outline that progressively builds knowledge on a topic.

    REQUIREMENTS:
    1. Each article should build on previous knowledge
    2. Article 1 should be foundational/introductory
    3. Final article should synthesize and apply all concepts
    4. Titles should be engaging and specific
    5. Each article should cover a distinct subtopic
    6. Summaries should be 2-3 sentences explaining what the article covers
    7. Key concepts should be specific, learnable items
    8. Prerequisites should reference concepts from earlier articles

    OUTPUT FORMAT (JSON only, no markdown):
    {
      "curriculumTitle": "Engaging overall title for the curriculum",
      "articles": [
        {
          "orderIndex": 0,
          "title": "Engaging article title",
          "summary": "2-3 sentence summary of what this article covers",
          "keyConceptsToIntroduce": ["concept1", "concept2", "concept3"],
          "prerequisiteConcepts": []
        },
        ...
      ]
    }`;

    serve(async (req) => {
      if (req.method === 'OPTIONS') {
        return new Response('ok', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        });
      }

      try {
        const body: RequestBody = await req.json();
        const { goal, articleCount, tone, tonePrompt } = body;

        if (!goal || goal.length < 10 || goal.length > 1000) {
          return new Response(
            JSON.stringify({ success: false, error: 'Invalid learning goal' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }

        if (!articleCount || articleCount < 3 || articleCount > 10) {
          return new Response(
            JSON.stringify({ success: false, error: 'Article count must be between 3 and 10' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }

        const userPrompt = `Design a ${articleCount}-article curriculum about: "${goal}"

    Writing style for the eventual articles: ${tonePrompt}

    Remember:
    - Create exactly ${articleCount} articles
    - Build knowledge progressively from foundational to advanced
    - Make titles engaging and specific
    - Output valid JSON only, no markdown code fences`;

        const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 4096,
            system: SYSTEM_PROMPT,
            messages: [{ role: 'user', content: userPrompt }],
          }),
        });

        if (!anthropicResponse.ok) {
          throw new Error('Failed to generate outline');
        }

        const anthropicData = await anthropicResponse.json();
        const responseText =
          anthropicData.content[0]?.type === 'text' ? anthropicData.content[0].text : '';

        // Parse JSON (handle potential markdown code fence)
        const cleanJson = responseText.replace(/^```json?\s*|\s*```$/g, '').trim();
        const outline = JSON.parse(cleanJson);

        return new Response(
          JSON.stringify({ success: true, outline }),
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      } catch (error) {
        console.error('Outline generation error:', error);
        return new Response(
          JSON.stringify({ success: false, error: 'Failed to generate curriculum outline' }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }
    });

### Deploy

    supabase functions deploy generate-curriculum-outline

### Enhance Article Generation for Curriculum Context

Update `supabase/functions/generate-article/index.ts` to accept and use curriculum context. Add to the RequestBody interface:

    curriculumContext?: {
      curriculumTitle: string;
      articleTitle: string;
      articleSummary: string;
      keyConceptsToIntroduce: string[];
      prerequisiteConcepts: string[];
      previousArticleSummary: string | null;
      position: string;
    };

Modify the user prompt construction to include curriculum context when present:

    let userPrompt = `Write an educational article about: "${topic}"

    Target word count: ${targetWordCount} words
    Writing style: ${tonePrompt}`;

    if (body.curriculumContext) {
      const ctx = body.curriculumContext;
      userPrompt = `You are writing article ${ctx.position} in a curriculum titled "${ctx.curriculumTitle}".

    Article title: ${ctx.articleTitle}
    Article summary: ${ctx.articleSummary}
    Key concepts to cover: ${ctx.keyConceptsToIntroduce.join(', ')}
    ${ctx.prerequisiteConcepts.length > 0 ? `Prerequisites already covered: ${ctx.prerequisiteConcepts.join(', ')}` : ''}
    ${ctx.previousArticleSummary ? `Previous article summary (for continuity): ${ctx.previousArticleSummary}` : 'This is the first article in the curriculum.'}

    Target word count: ${targetWordCount} words
    Writing style: ${tonePrompt}

    Write the complete article content, maintaining continuity with previous material. Then generate 5 comprehension questions in valid JSON format.`;
    }

Redeploy after changes:

    supabase functions deploy generate-article

### Validation

Test outline generation:

    curl -X POST https://your-project.supabase.co/functions/v1/generate-curriculum-outline \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer YOUR_ANON_KEY" \
      -d '{
        "goal": "Learn the fundamentals of machine learning",
        "articleCount": 5,
        "tone": "explanatory",
        "tonePrompt": "Write in a clear, educational style..."
      }'

Expected response structure:

    {
      "success": true,
      "outline": {
        "curriculumTitle": "Machine Learning Fundamentals: From Zero to Practitioner",
        "articles": [
          {
            "orderIndex": 0,
            "title": "What is Machine Learning?",
            "summary": "An introduction to ML concepts...",
            "keyConceptsToIntroduce": ["supervised learning", "features", "labels"],
            "prerequisiteConcepts": []
          },
          ...
        ]
      }
    }


---


## Milestone 7: Curriculum UI (Wizard and Accordion)

This milestone adds the UI for creating curricula and viewing them in an accordion layout. At the end, users can create curricula via a wizard and see them listed with expandable article views.

### Files to Create

Create `src/components/curriculum/CurriculumCreationWizard.tsx`:

This is a multi-step modal that collects: goal, article count, tone, and duration. Due to length, implement this following the pattern of `GenerateArticleModal` but with step navigation.

Key steps:

1. Goal step: Large text input for learning goal
2. Count step: Segmented control or stepper for 3-10 articles
3. Tone step: Reuse TonePill components
4. Duration step: Reuse DurationPill components, show total estimated time
5. Confirm step: Summary of selections, "Create Curriculum" button

Create `src/components/curriculum/CurriculumAccordion.tsx`:

    import React, { useState } from 'react';
    import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';
    import { useTheme } from '../../data/themes';
    import { Curriculum } from '../../types/curriculum';
    import { TONE_DEFINITIONS } from '../../types/generated';
    import { ArticleRow } from './ArticleRow';

    interface Props {
      curriculum: Curriculum;
      onArticlePress: (articleIndex: number) => void;
    }

    export function CurriculumAccordion({ curriculum, onArticlePress }: Props) {
      const theme = useTheme();
      const [expanded, setExpanded] = useState(false);

      const toneDefinition = TONE_DEFINITIONS.find((t) => t.id === curriculum.tone);
      const progress = curriculum.completedArticleCount / curriculum.articleCount;

      const toggleExpanded = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
      };

      const styles = StyleSheet.create({
        container: {
          backgroundColor: theme.colors.surface,
          borderRadius: 12,
          marginBottom: 12,
          overflow: 'hidden',
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
        },
        headerContent: {
          flex: 1,
        },
        title: {
          fontSize: 16,
          fontWeight: '600',
          color: theme.colors.text,
          marginBottom: 4,
        },
        meta: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
        metaText: {
          fontSize: 12,
          color: theme.colors.textSecondary,
        },
        progressBar: {
          height: 4,
          backgroundColor: theme.colors.background,
          borderRadius: 2,
          marginTop: 8,
        },
        progressFill: {
          height: '100%',
          backgroundColor: theme.colors.primary,
          borderRadius: 2,
        },
        chevron: {
          marginLeft: 8,
        },
        articlesContainer: {
          paddingHorizontal: 16,
          paddingBottom: 16,
        },
      });

      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.header} onPress={toggleExpanded}>
            <View style={styles.headerContent}>
              <Text style={styles.title} numberOfLines={2}>
                {curriculum.title || curriculum.goal}
              </Text>
              <View style={styles.meta}>
                <Text style={styles.metaText}>
                  {curriculum.completedArticleCount}/{curriculum.articleCount} articles
                </Text>
                <Text style={styles.metaText}>{toneDefinition?.emoji}</Text>
                {curriculum.isCompleted && (
                  <Ionicons name="checkmark-circle" size={14} color={theme.colors.primary} />
                )}
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
              </View>
            </View>
            <Ionicons
              name={expanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={theme.colors.textSecondary}
              style={styles.chevron}
            />
          </TouchableOpacity>

          {expanded && (
            <View style={styles.articlesContainer}>
              {curriculum.articles.map((article, index) => (
                <ArticleRow
                  key={article.id}
                  article={article}
                  onPress={() => onArticlePress(index)}
                />
              ))}
            </View>
          )}
        </View>
      );
    }

Create `src/components/curriculum/ArticleRow.tsx`:

    import React from 'react';
    import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';
    import { useTheme } from '../../data/themes';
    import { CurriculumArticle } from '../../types/curriculum';

    interface Props {
      article: CurriculumArticle;
      onPress: () => void;
    }

    export function ArticleRow({ article, onPress }: Props) {
      const theme = useTheme();

      const isLocked = article.completionStatus === 'locked';
      const isCompleted = article.completionStatus === 'completed';
      const isGenerating = article.generationStatus === 'generating';
      const isFailed = article.generationStatus === 'failed';
      const canRead = !isLocked && article.generationStatus === 'generated';

      const getStatusIcon = () => {
        if (isCompleted) return <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />;
        if (isLocked) return <Ionicons name="lock-closed" size={18} color={theme.colors.textSecondary} />;
        if (isGenerating) return <ActivityIndicator size="small" color={theme.colors.primary} />;
        if (isFailed) return <Ionicons name="alert-circle" size={20} color={theme.colors.error || '#ff6b6b'} />;
        return <Ionicons name="arrow-forward" size={20} color={theme.colors.primary} />;
      };

      const styles = StyleSheet.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.background,
          opacity: isLocked ? 0.5 : 1,
        },
        index: {
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: isCompleted ? theme.colors.primary : theme.colors.background,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        },
        indexText: {
          fontSize: 12,
          fontWeight: '600',
          color: isCompleted ? theme.colors.background : theme.colors.textSecondary,
        },
        content: {
          flex: 1,
        },
        title: {
          fontSize: 14,
          fontWeight: '500',
          color: theme.colors.text,
        },
        status: {
          fontSize: 12,
          color: theme.colors.textSecondary,
          marginTop: 2,
        },
        stats: {
          fontSize: 12,
          color: theme.colors.primary,
          marginTop: 2,
        },
        icon: {
          marginLeft: 8,
        },
      });

      return (
        <TouchableOpacity
          style={styles.row}
          onPress={onPress}
          disabled={!canRead}
        >
          <View style={styles.index}>
            <Text style={styles.indexText}>{article.orderIndex + 1}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1}>
              {article.title}
            </Text>
            {isLocked && <Text style={styles.status}>Complete previous article to unlock</Text>}
            {isGenerating && <Text style={styles.status}>Generating...</Text>}
            {isFailed && <Text style={styles.status}>Generation failed - tap to retry</Text>}
            {isCompleted && article.comprehensionScore !== undefined && (
              <Text style={styles.stats}>
                {article.readingWPM} WPM · {article.comprehensionScore}%
              </Text>
            )}
          </View>
          <View style={styles.icon}>{getStatusIcon()}</View>
        </TouchableOpacity>
      );
    }

### Update Learn Tab for Curricula Segment

Update `src/app/(tabs)/learn.tsx` to show curricula list when the "Curricula" segment is selected:

In the curricula segment section, replace the "coming soon" text with:

    {segment === 'curricula' && (
      <>
        <TouchableOpacity
          style={[styles.generateButton, isCreatingCurriculum && styles.generateButtonDisabled]}
          onPress={handleCreateCurriculum}
          disabled={isCreatingCurriculum}
        >
          {isCreatingCurriculum ? (
            <ActivityIndicator color={theme.colors.background} />
          ) : (
            <Text style={styles.generateButtonText}>+ Create Curriculum</Text>
          )}
        </TouchableOpacity>

        {curricula.length > 0 ? (
          <FlatList
            data={curricula}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CurriculumAccordion
                curriculum={item}
                onArticlePress={(index) => handleCurriculumArticlePress(item.id, index)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.emptyText}>
            No curricula yet. Create your first learning path!
          </Text>
        )}

        <CurriculumCreationWizard
          visible={showCurriculumWizard}
          onClose={() => setShowCurriculumWizard(false)}
          avgWpm={avgWpmLast3 || 250}
        />
      </>
    )}

Add the necessary imports and state variables.

### Create Curriculum Article Reader

Create `src/app/curriculum/[curriculumId]/article/[articleIndex].tsx`:

This follows the same pattern as the generated article reader, but:

- Gets article from `useCurriculumStore`
- Calls `markArticleCompleted` on quiz completion
- The markArticleCompleted function handles unlocking the next article and triggering pre-generation

### Validation

With the app running:

1. Go to Learn tab, select Curricula segment
2. Tap "Create Curriculum"
3. Complete the wizard (enter goal, select count, tone, duration)
4. Watch the generation progress
5. After completion, see the new curriculum in the list
6. Tap to expand and see articles
7. First article should be unlocked, others locked
8. Read the first article, complete quiz
9. Return to list, first article shows completed, second is now unlocked


---


## Milestone 8: Background Pre-generation

This milestone ensures that articles are pre-generated ahead of the user's progress to minimize wait times. Most of this logic is already in the store's `markArticleCompleted` function. This milestone verifies it works and adds any necessary polish.

### Verification Steps

1. Create a curriculum with 5 articles
2. Complete article 1
3. Verify article 2 is unlocked and article 3 starts generating in background
4. While article 3 is generating, start reading article 2
5. Complete article 2
6. Article 3 should already be generated (or nearly done)
7. Article 4 should start generating

### Edge Case Handling

If article generation fails:

- The ArticleRow shows an error state with "Generation failed - tap to retry"
- Tapping the row should call `generateArticle` for that specific article
- The user can still read previously generated articles while a failed one is being retried

Add retry functionality to ArticleRow onPress when the article failed:

    const handlePress = () => {
      if (isFailed) {
        // Trigger retry
        useCurriculumStore.getState().generateArticle(article.curriculumId, article.orderIndex);
        return;
      }
      if (canRead) {
        onPress();
      }
    };

### Network Failure During Curriculum Creation

If the network fails during initial curriculum creation:

- The curriculum is deleted from the store (cleanup happens in the catch block)
- User sees an error message
- User can retry by creating a new curriculum

Consider adding a "draft" state to preserve partial progress, but this is a future enhancement.


---


## Validation and Acceptance

### Phase 1 Complete Acceptance

A user can:

1. Navigate to the Learn tab and see two segments: Articles and Curricula
2. In Articles segment, tap "Generate Article"
3. Enter a topic, select duration and tone
4. Tap Generate and wait for the article to be created
5. Read the article using RSVP
6. Complete the quiz
7. See their stats (WPM, comprehension) on the results screen
8. Return to Learn tab and see the article listed with completion status
9. Navigate to Journey tab and see updated Velocity Score reflecting the new session

### Phase 2 Complete Acceptance

A user can:

1. In Curricula segment, tap "Create Curriculum"
2. Complete the 4-step wizard (goal, count, tone, duration)
3. Wait for outline and initial articles to generate
4. See the new curriculum in the list
5. Expand the curriculum to see all articles
6. Read the first (unlocked) article
7. Complete the quiz, see second article unlock
8. Continue through the curriculum
9. See pre-generated articles ready when they unlock
10. Complete all articles and see the curriculum marked as complete


---


## Idempotence and Recovery

All store operations are idempotent. Generating the same article twice will overwrite the previous content. Completing an already-completed article will update the timestamp but not cause errors.

If the app crashes mid-generation:

- Placeholder articles with status 'generating' will persist
- On next app open, these will remain in generating state
- The user can trigger regeneration by navigating to the Learn tab

Consider adding a cleanup function that resets 'generating' status to 'pending' on app startup for articles that were generating for more than 10 minutes.

Environment variables must be set before running. If missing, generation calls will fail with network errors.


---


## Artifacts and Notes

Example generated article structure:

    {
      "id": "gen_1704700800000_abc123",
      "topic": "The history of coffee",
      "targetDuration": 3,
      "tone": "storytelling",
      "title": "The Caffeinated Journey: How Coffee Conquered the World",
      "content": "In the misty highlands of Ethiopia, a young goat herder named Kaldi noticed something peculiar...",
      "wordCount": 723,
      "questions": [
        {
          "id": "q1",
          "type": "single_choice",
          "question": "According to the legend, who first discovered the effects of coffee?",
          "options": ["A merchant", "A goat herder", "A monk", "A farmer"],
          "correctIndex": 1
        }
      ],
      "status": "complete",
      "generatedAt": 1704700800000,
      "completed": false,
      "attemptCount": 0
    }


---


## Interfaces and Dependencies

### External Dependencies

- `@anthropic-ai/sdk` (via Deno for Edge Functions)
- Supabase project with Edge Functions enabled
- Anthropic API key with Claude access

### Key Interfaces

In `src/types/generated.ts`:

    export interface GeneratedArticle { ... }
    export interface GenerateArticleRequest { ... }
    export interface GenerateArticleResponse { ... }
    export type ArticleTone = 'robotic' | 'explanatory' | 'sarcastic' | 'storytelling' | 'analogical';

In `src/types/curriculum.ts`:

    export interface Curriculum { ... }
    export interface CurriculumArticle { ... }
    export interface CurriculumOutline { ... }

In `src/store/generatedStore.ts`:

    export const useGeneratedStore: () => GeneratedStore;
    // Methods: generateArticle, updateArticleProgress, getArticleById, deleteArticle

In `src/store/curriculumStore.ts`:

    export const useCurriculumStore: () => CurriculumStore;
    // Methods: createCurriculum, getCurriculum, getAllCurricula, deleteCurriculum, markArticleCompleted, generateArticle

In `src/store/journeyStore.ts` (existing, no changes to interface):

    recordSession: (params: { wpm: number; comprehension: number; articleId: string; articleType: ArticleType }) => void;