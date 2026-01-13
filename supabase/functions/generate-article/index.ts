import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

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
const MODEL = 'gemini-3-flash-preview';

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
  required: ['title', 'content', 'questions'],
};

const SYSTEM_PROMPT = `You are an expert educational content writer creating articles for a speed reading practice app.

ARTICLE REQUIREMENTS:
1. Write approximately the requested word count (within 10% tolerance)
2. Use clear, well-structured prose with logical flow between paragraphs
3. Include interesting facts, insights, and memorable details
4. AVOID bullet points and lists - use flowing prose paragraphs only
5. Each paragraph should be 3-5 sentences
6. Make the content educational and substantive, not fluff
7. Separate paragraphs with blank lines

QUESTION REQUIREMENTS:
1. Generate exactly 5 comprehension questions
2. Use a mix of single_choice (3-4) and true_false (1-2) questions
3. Questions should test genuine comprehension, not trivia
4. For single_choice: MUST include options (4 choices) AND correctIndex (0, 1, 2, or 3)
5. For true_false: MUST include correctAnswer (true or false)`;

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
    const body: RequestBody = await req.json();
    const { topic, targetWordCount, tone, tonePrompt } = body;

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

    // Build prompt based on whether this is a curriculum article or standalone
    let userPrompt: string;

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

Writing style: ${tonePrompt}

Write the complete article content maintaining continuity with previous material if applicable. Focus on the key concepts listed above. Then generate exactly 5 comprehension questions.`;
    } else {
      userPrompt = `Write an educational article about: "${topic}"

Target word count: ${targetWordCount} words (stay within 10% of this target)

Writing style: ${tonePrompt}

Generate the article with title, content, and exactly 5 comprehension questions.`;
    }

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

    return new Response(
      JSON.stringify({
        success: true,
        article: {
          title: parsed.title,
          content: parsed.content,
          wordCount,
          questions: parsed.questions,
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
