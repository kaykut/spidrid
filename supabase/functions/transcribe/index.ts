/**
 * Transcribe Edge Function
 *
 * Proxies audio transcription requests to OpenAI Whisper API.
 * Accepts base64-encoded audio and returns transcribed text.
 *
 * Note: With new sb_publishable_ keys, Edge Functions no longer automatically
 * verify JWTs. We must manually verify using supabase.auth.getUser().
 */

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? '';

interface TranscribeRequest {
  audio: string; // base64-encoded audio
  fileType: 'wav' | 'm4a' | 'mp3' | 'webm';
}

interface TranscribeResponse {
  text?: string;
  error?: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Manual JWT verification required with new sb_publishable_ keys
    // Platform no longer automatically verifies JWTs with publishable key format
    const authHeader = req.headers.get('Authorization');
    console.log('[transcribe] Auth header present:', !!authHeader);
    console.log('[transcribe] Auth header prefix:', authHeader?.substring(0, 20));

    if (!authHeader) {
      console.error('[transcribe] Missing authorization header');
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create Supabase client to verify JWT
    console.log('[transcribe] Creating Supabase client...');
    console.log('[transcribe] SUPABASE_URL:', SUPABASE_URL);
    console.log('[transcribe] SUPABASE_ANON_KEY prefix:', SUPABASE_ANON_KEY.substring(0, 20));

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Extract JWT from Authorization header and pass it directly to getUser()
    const jwt = authHeader.replace('Bearer ', '');
    console.log('[transcribe] Calling supabase.auth.getUser() with JWT...');
    const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);

    console.log('[transcribe] getUser() result:', {
      hasUser: !!user,
      userId: user?.id,
      userRole: user?.role,
      isAnonymous: user?.is_anonymous,
      hasError: !!authError,
      errorMessage: authError?.message,
      errorStatus: authError?.status,
      errorName: authError?.name,
    });

    if (authError || !user) {
      console.error('[transcribe] Authentication failed:', {
        error: authError,
        hasUser: !!user,
      });
      return new Response(
        JSON.stringify({
          error: 'Invalid JWT',
          details: authError?.message,
          debugInfo: {
            hasUser: !!user,
            errorStatus: authError?.status,
            errorName: authError?.name,
          }
        }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('[transcribe] User authenticated successfully:', user.id);
    // User authenticated - proceed with transcription

    // Validate OpenAI API key
    if (!OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse request body
    const { audio, fileType }: TranscribeRequest = await req.json();

    if (!audio) {
      return new Response(
        JSON.stringify({ error: 'No audio data provided' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Convert base64 to binary
    const binaryAudio = Uint8Array.from(atob(audio), (c) => c.charCodeAt(0));

    // Determine MIME type
    const mimeTypes: Record<string, string> = {
      wav: 'audio/wav',
      m4a: 'audio/m4a',
      mp3: 'audio/mpeg',
      webm: 'audio/webm',
    };
    const mimeType = mimeTypes[fileType] || 'audio/m4a';

    // Create form data for OpenAI API
    const formData = new FormData();
    formData.append(
      'file',
      new Blob([binaryAudio], { type: mimeType }),
      `audio.${fileType}`
    );
    formData.append('model', 'whisper-1');
    formData.append('language', 'en'); // Default to English, can be made configurable

    // Call OpenAI Whisper API
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);

      // Handle specific error codes
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Transcription failed' }),
        {
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const result = await response.json();

    const transcribeResponse: TranscribeResponse = {
      text: result.text,
    };

    return new Response(JSON.stringify(transcribeResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Transcribe function error:', error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
