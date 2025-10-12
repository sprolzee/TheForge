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

    // Track tool execution to prevent multiple calls
    let toolExecuted = false;

    const result = streamText({
      model: openai(model),
      messages: convertToModelMessages(messages),
      system: `You are a helpful 3D printing assistant. When users ask for 3D models:

IMPORTANT: You MUST respond with text BEFORE calling any tools.

When a user asks for models:
1. FIRST respond with a friendly message like "Let me search for that!" or "I'll find some great models for you!"
2. THEN call the search_3d_models tool ONCE (it searches all sites automatically)
3. The system will handle the follow-up response with results

Always acknowledge the user's request with text before taking action. Only call the search tool ONCE per request.`,
      tools: {
        search_3d_models: {
          description:
            'Search for 3D models across all three major sites: Thingiverse, Thangs, and Printables. This tool searches ALL THREE sites simultaneously and returns results from each. You should respond with text BEFORE calling this tool. Only call this tool ONCE - it automatically searches all sites.',
          inputSchema: z.object({
            query: z.string().describe('Search query for 3D models'),
          }),
          execute: async ({ query }: { query: string }) => {
            if (toolExecuted) {
              console.log('Tool already executed, skipping duplicate call');
              return { results: [], searchQuery: query, sourceCount: { thingiverse: 0, thangs: 0, printables: 0 } };
            }
            toolExecuted = true;
            const results = await search3DModels(query);
            console.log('Tool executed - Total:', results.results.length, 'Breakdown:', results.sourceCount);
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
