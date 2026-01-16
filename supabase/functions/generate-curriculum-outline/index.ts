/**
 * Generate Curriculum Outline Edge Function
 *
 * Uses Google Gemini 3.0 Flash with Structured Output to generate
 * a curriculum outline (title + article summaries) based on user's learning goal.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

interface RequestBody {
  goal: string;
  articleCount: number;
  tone: string;
  tonePrompt: string;
}

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY') || '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const MODEL = 'gemini-3-flash-preview';

// JSON Schema for Structured Output - guarantees response format
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
      minItems: 3,
      maxItems: 10,
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

const SYSTEM_PROMPT = `You are an expert curriculum designer creating structured learning paths. Your task is to design a curriculum outline that progressively builds knowledge on a topic.

REQUIREMENTS:
1. Each article should build on previous knowledge
2. Article 1 should be foundational/introductory with NO prerequisites
3. Final article should synthesize and apply all concepts
4. Titles should be engaging and specific (not generic like "Introduction" or "Advanced Topics")
5. Each article should cover a distinct subtopic
6. Summaries should be 2-3 sentences explaining what the article covers
7. Key concepts should be specific, learnable items (3-5 per article)
8. Prerequisites should reference concepts from earlier articles (first article has empty array)
9. Concepts should be consistent across articles (if Article 1 introduces "machine learning", Article 2's prerequisites can reference "machine learning")

OUTPUT:
Generate a structured curriculum outline with the exact number of articles requested.`;

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
    console.log('[generate-curriculum] Auth header present:', !!authHeader);

    if (!authHeader) {
      console.error('[generate-curriculum] Missing authorization header');
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
    console.log('[generate-curriculum] Creating Supabase client and verifying JWT...');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Extract JWT from Authorization header and pass it directly to getUser()
    const jwt = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);

    console.log('[generate-curriculum] getUser() result:', {
      hasUser: !!user,
      userId: user?.id,
      hasError: !!authError,
      errorMessage: authError?.message,
    });

    if (authError || !user) {
      console.error('[generate-curriculum] Authentication failed:', authError);
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

    console.log('[generate-curriculum] User authenticated:', user.id);
    // User authenticated - proceed with curriculum generation
    const body: RequestBody = await req.json();
    const { goal, articleCount, tonePrompt } = body;

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

    if (!articleCount || articleCount < 3 || articleCount > 10) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Article count must be between 3 and 10',
          errorCode: 'INVALID_REQUEST',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const userPrompt = `Design a ${articleCount}-article curriculum for the following learning goal:

"${goal}"

Writing style guidance for the eventual articles: ${tonePrompt}

IMPORTANT:
- Create exactly ${articleCount} articles
- Articles must be numbered 0 to ${articleCount - 1} in orderIndex
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

    // Validate article count matches request
    if (outline.articles.length !== articleCount) {
      console.error(`Article count mismatch: expected ${articleCount}, got ${outline.articles.length}`);
      return new Response(
        JSON.stringify({
          success: false,
          error: `Generated ${outline.articles.length} articles instead of requested ${articleCount}. Please try again.`,
          errorCode: 'ARTICLE_COUNT_MISMATCH',
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
