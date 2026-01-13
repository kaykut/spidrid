/**
 * Transcribe Edge Function
 *
 * Proxies audio transcription requests to OpenAI Whisper API.
 * Accepts base64-encoded audio and returns transcribed text.
 */

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

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
    // Validate API key
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
