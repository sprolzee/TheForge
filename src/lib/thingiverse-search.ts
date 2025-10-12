/**
 * 3D Model Search Utility
 * Searches multiple 3D model sites for models based on a query
 */

export interface Model3D {
  name: string;
  url: string;
  thumbnail: string;
  creator: string;
  likes: number;
  description: string;
  source: 'thingiverse' | 'thangs' | 'printables' | 'cults3d' | 'myminifactory';
}

/**
 * Search Thingiverse for 3D models
 * @param query - The search query describing the desired 3D model
 * @param limit - Maximum number of results to return (default: 5)
 */
export async function searchThingiverse(
  query: string,
  limit: number = 5
): Promise<Model3D[]> {
  try {
    // Thingiverse search URL
    const searchUrl = `https://www.thingiverse.com/search?q=${encodeURIComponent(query)}&type=things&sort=relevant`;

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Thingiverse: ${response.status}`);
    }

    const html = await response.text();

    // Parse HTML to extract model information
    const models: Model3D[] = [];
    
    // Extract things from the HTML
    // Thingiverse uses a specific structure for search results
    const thingMatches = html.matchAll(
      /<a[^>]*href="\/thing:(\d+)"[^>]*>[\s\S]*?<h3[^>]*>(.*?)<\/h3>[\s\S]*?<img[^>]*src="([^"]*)"[\s\S]*?<span[^>]*class="[^"]*creator[^"]*"[^>]*>(.*?)<\/span>/gi
    );

    for (const match of thingMatches) {
      if (models.length >= limit) break;
      
      const [_, id, name, thumbnail, creator] = match;
      
      models.push({
        name: name.trim().replace(/<[^>]*>/g, ''),
        url: `https://www.thingiverse.com/thing:${id}`,
        thumbnail: thumbnail.startsWith('http') ? thumbnail : `https:${thumbnail}`,
        creator: creator.trim().replace(/<[^>]*>/g, ''),
        likes: 0,
        description: '',
        source: 'thingiverse',
      });
    }

    // Fallback: Try alternative parsing if first method fails
    if (models.length === 0) {
      const simpleMatches = html.matchAll(/\/thing:(\d+)/g);
      const seen = new Set<string>();
      
      for (const match of simpleMatches) {
        if (models.length >= limit) break;
        const id = match[1];
        
        if (!seen.has(id)) {
          seen.add(id);
          models.push({
            name: `3D Model #${id}`,
            url: `https://www.thingiverse.com/thing:${id}`,
            thumbnail: '',
            creator: 'Unknown',
            likes: 0,
            description: `Thingiverse model matching "${query}"`,
            source: 'thingiverse',
          });
        }
      }
    }

    return models;
  } catch (error) {
    console.error('Error searching Thingiverse:', error);
    // Return fallback results with direct search link
    return [
      {
        name: `Search results for "${query}"`,
        url: `https://www.thingiverse.com/search?q=${encodeURIComponent(query)}&type=things&sort=relevant`,
        thumbnail: '',
        creator: 'Thingiverse',
        likes: 0,
        description: `Click to view search results on Thingiverse for "${query}"`,
        source: 'thingiverse',
      },
    ];
  }
}

/**
 * Search Thangs for 3D models
 * @param query - The search query describing the desired 3D model
 * @param limit - Maximum number of results to return (default: 5)
 */
export async function searchThangs(
  query: string,
  limit: number = 5
): Promise<Model3D[]> {
  try {
    const searchUrl = `https://thangs.com/search/${encodeURIComponent(query)}?scope=all`;

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Thangs: ${response.status}`);
    }

    const html = await response.text();
    const models: Model3D[] = [];

    // Thangs uses a different structure - attempt to extract model info
    // This is a simplified parser and may need adjustment based on actual HTML structure
    const modelMatches = html.matchAll(/thangs\.com\/(?:designer|m)\/([^"']+)/gi);
    const seen = new Set<string>();

    for (const match of modelMatches) {
      if (models.length >= limit) break;
      const path = match[1];
      
      if (!seen.has(path) && !path.includes('search')) {
        seen.add(path);
        models.push({
          name: `3D Model from Thangs`,
          url: `https://thangs.com/m/${path}`,
          thumbnail: '',
          creator: 'Thangs Creator',
          likes: 0,
          description: `Model matching "${query}" on Thangs`,
          source: 'thangs',
        });
      }
    }

    // Fallback
    if (models.length === 0) {
      models.push({
        name: `Search results for "${query}"`,
        url: searchUrl,
        thumbnail: '',
        creator: 'Thangs',
        likes: 0,
        description: `Click to view search results on Thangs for "${query}"`,
        source: 'thangs',
      });
    }

    return models;
  } catch (error) {
    console.error('Error searching Thangs:', error);
    return [
      {
        name: `Search results for "${query}"`,
        url: `https://thangs.com/search/${encodeURIComponent(query)}?scope=all`,
        thumbnail: '',
        creator: 'Thangs',
        likes: 0,
        description: `Click to view search results on Thangs for "${query}"`,
        source: 'thangs',
      },
    ];
  }
}

/**
 * Search Printables for 3D models
 * @param query - The search query describing the desired 3D model
 * @param limit - Maximum number of results to return (default: 5)
 */
export async function searchPrintables(
  query: string,
  limit: number = 5
): Promise<Model3D[]> {
  try {
    const searchUrl = `https://www.printables.com/search/models?q=${encodeURIComponent(query)}`;

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Printables: ${response.status}`);
    }

    const html = await response.text();
    const models: Model3D[] = [];

    // Extract model links from Printables
    const modelMatches = html.matchAll(/printables\.com\/model\/(\d+)/gi);
    const seen = new Set<string>();

    for (const match of modelMatches) {
      if (models.length >= limit) break;
      const id = match[1];
      
      if (!seen.has(id)) {
        seen.add(id);
        models.push({
          name: `3D Model #${id}`,
          url: `https://www.printables.com/model/${id}`,
          thumbnail: '',
          creator: 'Printables Creator',
          likes: 0,
          description: `Printables model matching "${query}"`,
          source: 'printables',
        });
      }
    }

    // Fallback
    if (models.length === 0) {
      models.push({
        name: `Search results for "${query}"`,
        url: searchUrl,
        thumbnail: '',
        creator: 'Printables',
        likes: 0,
        description: `Click to view search results on Printables for "${query}"`,
        source: 'printables',
      });
    }

    return models;
  } catch (error) {
    console.error('Error searching Printables:', error);
    return [
      {
        name: `Search results for "${query}"`,
        url: `https://www.printables.com/search/models?q=${encodeURIComponent(query)}`,
        thumbnail: '',
        creator: 'Printables',
        likes: 0,
        description: `Click to view search results on Printables for "${query}"`,
        source: 'printables',
      },
    ];
  }
}

/**
 * Search multiple 3D printing sites concurrently
 * @param query - The search query describing the desired 3D model
 */
export async function search3DModels(query: string): Promise<{
  results: Model3D[];
  searchQuery: string;
  sourceCount: {
    thingiverse: number;
    thangs: number;
    printables: number;
  };
}> {
  // Search all sites concurrently for better performance
  const [thingiverseResults, thangsResults, printablesResults] = await Promise.all([
    searchThingiverse(query, 6),
    searchThangs(query, 4),
    searchPrintables(query, 4),
  ]);

  // Combine and interleave results for variety
  const allResults: Model3D[] = [];
  const maxLength = Math.max(
    thingiverseResults.length,
    thangsResults.length,
    printablesResults.length
  );

  for (let i = 0; i < maxLength; i++) {
    if (i < thingiverseResults.length) allResults.push(thingiverseResults[i]);
    if (i < thangsResults.length) allResults.push(thangsResults[i]);
    if (i < printablesResults.length) allResults.push(printablesResults[i]);
  }

  return {
    results: allResults.slice(0, 15), // Limit to 15 total results
    searchQuery: query,
    sourceCount: {
      thingiverse: thingiverseResults.length,
      thangs: thangsResults.length,
      printables: printablesResults.length,
    },
  };
}

