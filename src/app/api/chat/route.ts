import { convertToModelMessages, streamText, type UIMessage } from 'ai';
import { openai } from '@/echo';
import { z } from 'zod';
import { search3DModels } from '@/lib/thingiverse-search';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const {
      model,
      messages,
    }: {
      messages: UIMessage[];
      model: string;
    } = await req.json();

    // Validate required parameters
    if (!model) {
      return new Response(
        JSON.stringify({
          error: 'Bad Request',
          message: 'Model parameter is required',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({
          error: 'Bad Request',
          message: 'Messages parameter is required and must be an array',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const result = streamText({
      model: openai(model),
      messages: convertToModelMessages(messages),
      tools: {
        search_3d_models: {
          description:
            'Search Thingiverse.com for 3D printable models based on a description. Use this when users ask about finding, searching for, or getting 3D models, STL files, or printable designs.',
          inputSchema: z.object({
            query: z
              .string()
              .describe(
                'The search query describing the 3D model the user wants to find. Be specific and include relevant keywords.'
              ),
          }),
          execute: async ({ query }: { query: string }) => {
            const results = await search3DModels(query);
            return results;
          },
        },
      },
    });

    return result.toUIMessageStreamResponse({
      sendSources: true,
      sendReasoning: true,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: 'Failed to process chat request',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
