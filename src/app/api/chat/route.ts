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
      maxSteps: 5,
      system: `You are a helpful 3D printing assistant. When users ask for 3D models:
1. Call the search_3d_models tool
2. After getting results, ALWAYS provide a text response with:
   - A friendly greeting like "I found some great models for you!"
   - Brief description of the top 2-3 models
   - Links to the models
   - Ask if they want more details

You MUST respond with text after using the tool. Do not just show tool results.`,
      tools: {
        search_3d_models: {
          description:
            'Search for 3D models. After using this, you MUST respond with text summarizing the results.',
          inputSchema: z.object({
            query: z.string().describe('Search query'),
          }),
          execute: async ({ query }: { query: string }) => {
            const results = await search3DModels(query);
            console.log('Tool executed, returning:', results.results.length, 'results');
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
