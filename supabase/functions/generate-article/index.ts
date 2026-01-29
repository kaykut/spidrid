import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

interface CurriculumContext {
  curriculumTitle: string;
  articleTitle: string;
  articleSummary: string;
  keyConceptsToIntroduce: string[];
  prerequisiteConcepts: string[];
  previousArticleSummary: string | null;
  position: string; // e.g., "1 of 5"
}

interface RequestBody {
  topic: string;
  targetWordCount: number;
  tone: 'explanatory' | 'storytelling' | 'analogical' | 'auto';
  tonePrompt?: string;
  userId: string;
  curriculumContext?: CurriculumContext;
  includeQuiz?: boolean; // Optional, defaults to true for backward compatibility
  isPremium?: boolean;
  localDate?: string;
}

// Tone prompts for explicit tone selection
const TONE_PROMPTS: Record<string, string> = {
  explanatory:
    'Write in a clear, educational style. Break down concepts step-by-step. Anticipate reader questions and address them. Use examples liberally.',
  storytelling:
    'Write as if telling a story. Use narrative techniques: set scenes, introduce characters or personas, create tension, deliver payoffs. Make dry facts come alive through narrative.',
  analogical:
    'Explain every concept using analogies and metaphors. Relate abstract ideas to everyday experiences. Help the reader see familiar patterns in new material.',
};

// Auto-tone prompt: LLM decides the appropriate mix of styles
const AUTO_TONE_PROMPT = `WRITING STYLE SELECTION:
You have three writing style options to blend as appropriate for this topic:

1. EXPLANATORY (Facts): Clear, educational, step-by-step. Break down concepts, anticipate questions, use examples liberally.

2. STORYTELLING (Story): Narrative-driven. Set scenes, introduce characters/personas, create tension, deliver payoffs. Make facts come alive through story.

3. ANALOGICAL (Analogy): Rich in metaphors and comparisons. Relate abstract ideas to everyday experiences. Help readers see familiar patterns in new material.

Choose the appropriate mix of these styles for the topic. This can be a "corner solution" (100% one style) or a blend. For example:
- "How photosynthesis works" → mostly Explanatory
- "The fall of Rome" → mostly Storytelling
- "Understanding quantum mechanics" → blend of Analogical + Explanatory
- "The life of Einstein" → blend of Storytelling + Explanatory

Apply your chosen style mix consistently throughout the article.`;

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY') || '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const MODEL = 'gemini-3-flash-preview';
const FREE_DAILY_LIMIT = 3;
const QUOTA_ITEM_TYPE = 'generation_quota';
const QUOTA_ITEM_ID = 'daily_generation';

// JSON Schema for Structured Output - guarantees response format
const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      description: 'The article title - engaging and descriptive',
    },
    content: {
      type: 'string',
      description: 'The full article content as flowing prose paragraphs separated by newlines',
    },
    questions: {
      type: 'array',
      description: 'Exactly 5 comprehension questions',
      items: {
        anyOf: [
          {
            type: 'object',
            description: 'Multiple choice question with 4 options',
            properties: {
              id: { type: 'string' },
              type: { type: 'string', enum: ['single_choice'] },
              question: { type: 'string' },
              options: {
                type: 'array',
                items: { type: 'string' },
                minItems: 4,
                maxItems: 4,
              },
              correctIndex: {
                type: 'integer',
                minimum: 0,
                maximum: 3,
              },
            },
            required: ['id', 'type', 'question', 'options', 'correctIndex'],
          },
          {
            type: 'object',
            description: 'True or false question',
            properties: {
              id: { type: 'string' },
              type: { type: 'string', enum: ['true_false'] },
              question: { type: 'string' },
              correctAnswer: { type: 'boolean' },
            },
            required: ['id', 'type', 'question', 'correctAnswer'],
          },
        ],
      },
    },
  },
  required: ['title', 'content'], // questions now optional
};

// Function to generate system prompt conditionally based on includeQuiz flag
function getSystemPrompt(includeQuiz: boolean): string {
  const basePrompt = `You are an expert educational content writer creating articles for a speed reading practice app.

ARTICLE REQUIREMENTS:
1. Write approximately the requested word count (within 10% tolerance)
2. Use clear, well-structured prose with logical flow between paragraphs
3. Include interesting facts, insights, and memorable details
4. AVOID bullet points and lists - use flowing prose paragraphs only
5. Each paragraph should be 3-5 sentences
6. Make the content educational and substantive, not fluff
7. Separate paragraphs with blank lines`;

  if (!includeQuiz) {
    return basePrompt; // No quiz requirements
  }

  return `${basePrompt}

QUESTION REQUIREMENTS:
1. Generate exactly 5 comprehension questions
2. Use a mix of single_choice (3-4) and true_false (1-2) questions
3. Questions should test genuine comprehension, not trivia
4. For single_choice: MUST include options (4 choices) AND correctIndex (0, 1, 2, or 3)
5. For true_false: MUST include correctAnswer (true or false)`;
}

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
    console.log('[generate-article] Auth header present:', !!authHeader);

    if (!authHeader) {
      console.error('[generate-article] Missing authorization header');
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
    console.log('[generate-article] Creating Supabase client and verifying JWT...');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Extract JWT from Authorization header and pass it directly to getUser()
    const jwt = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);

    console.log('[generate-article] getUser() result:', {
      hasUser: !!user,
      userId: user?.id,
      hasError: !!authError,
      errorMessage: authError?.message,
    });

    if (authError || !user) {
      console.error('[generate-article] Authentication failed:', authError);
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

    console.log('[generate-article] User authenticated:', user.id);
    // User authenticated - proceed with article generation
    const body: RequestBody = await req.json();
    const { topic, targetWordCount, tone, tonePrompt } = body;
    const isPremium = body.isPremium === true;
    const localDate = body.localDate || new Date().toDateString();

    // Extract includeQuiz flag (defaults to true for backward compatibility)
    const includeQuiz = body.includeQuiz ?? true;

    // Determine the writing style prompt
    let effectiveTonePrompt: string;
    if (tone === 'auto') {
      // Let the LLM decide the appropriate mix of styles
      effectiveTonePrompt = AUTO_TONE_PROMPT;
    } else if (tonePrompt) {
      effectiveTonePrompt = tonePrompt;
    } else {
      effectiveTonePrompt = TONE_PROMPTS[tone] || TONE_PROMPTS.explanatory;
    }

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

    // Enforce free-tier daily generation limit (server-side, cross-device)
    let nextQuotaCount: number | null = null;
    let quotaClient: ReturnType<typeof createClient> | null = null;
    if (!isPremium) {
      quotaClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: { headers: { Authorization: authHeader } },
      });

      const { data: quotaRow, error: quotaError } = await quotaClient
        .from('user_content')
        .select('data')
        .eq('user_id', user.id)
        .eq('item_type', QUOTA_ITEM_TYPE)
        .eq('item_id', QUOTA_ITEM_ID)
        .is('deleted_at', null)
        .maybeSingle();

      if (quotaError) {
        console.error('[generate-article] Failed to read quota:', quotaError);
      } else {
        const existingDate = quotaRow?.data?.date as string | undefined;
        const existingCount = Number(quotaRow?.data?.count ?? 0);
        const normalizedCount = existingDate === localDate ? existingCount : 0;

        if (normalizedCount >= FREE_DAILY_LIMIT) {
          return new Response(
            JSON.stringify({
              success: false,
              error: 'Daily generation limit reached',
              errorCode: 'DAILY_LIMIT',
              limit: FREE_DAILY_LIMIT,
              date: localDate,
            }),
            {
              status: 403,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
        }

        nextQuotaCount = normalizedCount + 1;
      }
    }

    // Build prompt based on whether this is a curriculum article or standalone
    let userPrompt: string;

    // Conditional quiz instruction
    const quizInstruction = includeQuiz
      ? 'Then generate exactly 5 comprehension questions.'
      : 'Do not generate quiz questions (return empty questions array).';

    if (body.curriculumContext) {
      const ctx = body.curriculumContext;
      userPrompt = `You are writing article ${ctx.position} in a curriculum titled "${ctx.curriculumTitle}".

ARTICLE DETAILS:
- Title: ${ctx.articleTitle}
- Summary: ${ctx.articleSummary}
- Key concepts to cover: ${ctx.keyConceptsToIntroduce.join(', ')}
${ctx.prerequisiteConcepts.length > 0 ? `- Prerequisites already covered: ${ctx.prerequisiteConcepts.join(', ')}` : '- This is the first article in the curriculum (no prerequisites)'}
${ctx.previousArticleSummary ? `- Previous article summary (for continuity): ${ctx.previousArticleSummary}` : ''}

Target word count: ${targetWordCount} words (stay within 10% of this target)

Writing style: ${effectiveTonePrompt}

Write the complete article content maintaining continuity with previous material if applicable. Focus on the key concepts listed above. ${quizInstruction}`;
    } else {
      const quizPart = includeQuiz
        ? 'and exactly 5 comprehension questions'
        : '(no quiz questions needed)';

      userPrompt = `Write an educational article about: "${topic}"

Target word count: ${targetWordCount} words (stay within 10% of this target)

Writing style: ${effectiveTonePrompt}

Generate the article with title, content${includeQuiz ? ', ' + quizPart : ' ' + quizPart}.`;
    }

    // Call Gemini API with Structured Output
    const systemPrompt = getSystemPrompt(includeQuiz);

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: [
            {
              parts: [{ text: userPrompt }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 8192,
            temperature: 0.7,
            responseMimeType: 'application/json',
            responseSchema: RESPONSE_SCHEMA,
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', errorText);
      throw new Error('Failed to generate content');
    }

    const geminiData = await geminiResponse.json();
    const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!responseText) {
      console.error('Empty response from Gemini');
      throw new Error('Empty response from AI');
    }

    // Parse the structured JSON response (guaranteed valid by schema)
    const parsed = JSON.parse(responseText);
    const wordCount = parsed.content.split(/\s+/).filter(Boolean).length;

    // Defensive: Ensure questions array respects includeQuiz flag
    // (in case LLM generates questions despite being told not to)
    const questions = includeQuiz ? (parsed.questions || []) : [];

    if (quotaClient && nextQuotaCount !== null) {
      const { error: quotaWriteError } = await quotaClient
        .from('user_content')
        .upsert(
          {
            user_id: user.id,
            item_id: QUOTA_ITEM_ID,
            item_type: QUOTA_ITEM_TYPE,
            data: { date: localDate, count: nextQuotaCount },
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,item_id' }
        );

      if (quotaWriteError) {
        console.error('[generate-article] Failed to update quota:', quotaWriteError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        article: {
          title: parsed.title,
          content: parsed.content,
          wordCount,
          questions, // Use normalized questions array
        },
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
