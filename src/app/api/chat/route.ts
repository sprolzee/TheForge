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
      system: `You are a helpful 3D printing assistant specializing in finding 3D printable models across multiple platforms including Thingiverse, Thangs, and Printables.

Your role is to:
1. Proactively ask users what kind of 3D model they're looking for if they haven't specified
2. Help them refine their search terms to get better results
3. Search multiple 3D model websites concurrently using the search_3d_models tool
4. Present results clearly, highlighting different sources
5. Offer to search again with different terms if needed

When presenting search results:
- Mention how many results were found from each site
- Suggest refinements if results seem limited
- Help users understand which model might be best for their needs

Be conversational, friendly, and focused on helping users find the perfect 3D model for their project.`,
      tools: {
        search_3d_models: {
          description:
            'Search multiple 3D model sites (Thingiverse, Thangs, Printables) for 3D printable models based on a description. Use this when users describe what they want to print or are looking for specific models.',
          inputSchema: z.object({
            query: z
              .string()
              .describe(
                'The search query describing the 3D model to find. Be specific and include relevant keywords like the object type, style, size, or purpose.'
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
