/**
 * Generate Curriculum Outline V2 Edge Function
 *
 * Uses Google Gemini 3.0 Flash with Structured Output to generate
 * a curriculum outline based on article RANGE (LLM decides optimal count).
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

interface RequestBody {
  goal: string;
  articleRange: { min: number; max: number };
  durationRange: { min: number; max: number };
  tone: string; // Can be 'auto' or specific tone
  tonePrompt?: string;
  targetWordsPerArticle: number;
}

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY') || '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const MODEL = 'gemini-3-flash-preview';

// Auto-tone guidance for LLM to choose appropriate style
const AUTO_TONE_GUIDANCE = `You may choose the writing style that best fits the topic:
- Explanatory (Facts): Clear, educational, step-by-step for technical/factual topics
- Storytelling (Story): Narrative-driven for historical/biographical topics
- Analogical (Analogy): Rich in metaphors for abstract/complex concepts
Choose one style or blend them as appropriate.`;

const SYSTEM_PROMPT = `You are an expert curriculum designer creating structured learning paths.

REQUIREMENTS:
1. You will receive:
   - Article count RANGE (e.g., 2-3 or 4-6 articles)
   - Total duration RANGE (e.g., 5-8 min or 12-15 min)
2. You MUST decide the optimal number of articles AND total duration within these ranges based on:
   - Natural topic breakpoints (does the topic divide well into N subtopics?)
   - Content density (is there enough depth for more articles, or too little for fewer?)
   - Reading time per article (each article should be 2-5 minutes reading time)
3. Each article should be substantial enough to justify its existence (no padding)
4. Each article should build on previous knowledge
5. Article 1 must be foundational with NO prerequisites
6. Final article should synthesize and apply all concepts
7. Titles should be engaging and specific (not generic like "Introduction")
8. Summaries should be 2-3 sentences explaining what the article covers
9. Key concepts should be specific, learnable items (3-5 per article)

CHUNKING STRATEGY:
- Prefer fewer, richer articles over many shallow ones
- Aim for 400-1000 words per article (2-5 min read at 250 WPM)
- Natural boundaries are better than forced splits
- Choose optimal values within both article count AND duration ranges

OUTPUT:
Generate a structured curriculum outline with your chosen article count and duration (both within the given ranges).`;

serve(async (req) => {
  // Handle CORS preflight
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
    // Manual JWT verification required with new sb_publishable_ keys
    const authHeader = req.headers.get('Authorization');
    console.log('[generate-curriculum-v2] Auth header present:', !!authHeader);

    if (!authHeader) {
      console.error('[generate-curriculum-v2] Missing authorization header');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing authorization header',
          errorCode: 'UNAUTHORIZED',
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Verify JWT by calling Supabase Auth service
    console.log('[generate-curriculum-v2] Creating Supabase client and verifying JWT...');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Extract JWT from Authorization header and pass it directly to getUser()
    const jwt = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);

    console.log('[generate-curriculum-v2] getUser() result:', {
      hasUser: !!user,
      userId: user?.id,
      hasError: !!authError,
      errorMessage: authError?.message,
    });

    if (authError || !user) {
      console.error('[generate-curriculum-v2] Authentication failed:', authError);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid authentication',
          errorCode: 'UNAUTHORIZED',
          debugInfo: { errorMessage: authError?.message },
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    console.log('[generate-curriculum-v2] User authenticated:', user.id);

    // User authenticated - proceed with curriculum generation
    const body: RequestBody = await req.json();
    const { goal, articleRange, durationRange, tone, tonePrompt, targetWordsPerArticle } = body;

    // Input validation
    if (!goal || goal.length < 10 || goal.length > 1000) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Learning goal must be between 10 and 1000 characters',
          errorCode: 'INVALID_REQUEST',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!articleRange || !articleRange.min || !articleRange.max) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Article range must include min and max values',
          errorCode: 'INVALID_REQUEST',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (articleRange.min < 1 || articleRange.max > 10 || articleRange.min > articleRange.max) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Article range must be between 1 and 10, with min <= max',
          errorCode: 'INVALID_REQUEST',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!durationRange || !durationRange.min || !durationRange.max) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Duration range must include min and max values',
          errorCode: 'INVALID_REQUEST',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (durationRange.min < 1 || durationRange.max > 100 || durationRange.min > durationRange.max) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Duration range must be between 1 and 100 minutes, with min <= max',
          errorCode: 'INVALID_REQUEST',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Determine tone guidance
    const effectiveTonePrompt = tone === 'auto'
      ? AUTO_TONE_GUIDANCE
      : (tonePrompt || 'Write in an educational style.');

    // Build JSON schema with dynamic min/max based on range
    const OUTLINE_SCHEMA = {
      type: 'object',
      properties: {
        curriculumTitle: {
          type: 'string',
          description: 'An engaging title for the entire curriculum',
        },
        articles: {
          type: 'array',
          description: 'Array of article outlines in progressive learning order',
          minItems: articleRange.min,
          maxItems: articleRange.max,
          items: {
            type: 'object',
            properties: {
              orderIndex: {
                type: 'integer',
                description: 'Position in curriculum (0-indexed)',
              },
              title: {
                type: 'string',
                description: 'Engaging article title',
              },
              summary: {
                type: 'string',
                description: '2-3 sentence summary of what this article covers',
              },
              keyConceptsToIntroduce: {
                type: 'array',
                items: { type: 'string' },
                description: 'Key concepts this article will introduce (3-5 items)',
              },
              prerequisiteConcepts: {
                type: 'array',
                items: { type: 'string' },
                description: 'Concepts from earlier articles that this article builds upon',
              },
            },
            required: ['orderIndex', 'title', 'summary', 'keyConceptsToIntroduce', 'prerequisiteConcepts'],
          },
        },
      },
      required: ['curriculumTitle', 'articles'],
    };

    const userPrompt = `Design a curriculum for the following learning goal:

"${goal}"

CONSTRAINTS:
- Article count: Between ${articleRange.min} and ${articleRange.max} articles (YOU decide optimal count)
- Total duration: Between ${durationRange.min} and ${durationRange.max} minutes (YOU decide optimal duration)
- Target per article: ~${targetWordsPerArticle} words (~${Math.round(targetWordsPerArticle / 250)} min)
- Writing style: ${effectiveTonePrompt}

Choose the optimal article count AND duration within the ranges based on natural topic boundaries and content depth.
Prefer fewer, richer articles over many shallow ones.

IMPORTANT:
- Articles must be numbered 0 to N-1 in orderIndex (where N is your chosen count)
- Build knowledge progressively from foundational to advanced
- First article (orderIndex: 0) must have an EMPTY prerequisiteConcepts array
- Each subsequent article should reference concepts from previous articles in its prerequisites
- Make titles engaging and specific to the topic`;

    // Call Gemini API with Structured Output
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: [
            {
              parts: [{ text: userPrompt }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 4096,
            temperature: 0.7,
            responseMimeType: 'application/json',
            responseSchema: OUTLINE_SCHEMA,
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', errorText);
      throw new Error('Failed to generate outline');
    }

    const geminiData = await geminiResponse.json();
    const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!responseText) {
      console.error('Empty response from Gemini');
      throw new Error('Empty response from AI');
    }

    // Parse the structured JSON response (guaranteed valid by schema)
    const outline = JSON.parse(responseText);

    // Ensure articles are sorted by orderIndex
    outline.articles.sort(
      (a: { orderIndex: number }, b: { orderIndex: number }) => a.orderIndex - b.orderIndex
    );

    // Validate article count is within range
    if (outline.articles.length < articleRange.min || outline.articles.length > articleRange.max) {
      console.error(
        `Article count out of range: expected ${articleRange.min}-${articleRange.max}, got ${outline.articles.length}`
      );
      return new Response(
        JSON.stringify({
          success: false,
          error: `Generated ${outline.articles.length} articles, but expected ${articleRange.min}-${articleRange.max}. Please try again.`,
          errorCode: 'ARTICLE_COUNT_OUT_OF_RANGE',
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

    console.log(`[generate-curriculum-v2] Successfully generated ${outline.articles.length} articles within range ${articleRange.min}-${articleRange.max}`);

    return new Response(
      JSON.stringify({
        success: true,
        outline,
      }),
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
      JSON.stringify({
        success: false,
        error: 'Failed to generate curriculum outline. Please try again.',
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
