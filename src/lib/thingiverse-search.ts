/**
 * Thingiverse 3D Model Search Utility
 * Searches Thingiverse for 3D models based on a query
 */

export interface ThingiverseModel {
  name: string;
  url: string;
  thumbnail: string;
  creator: string;
  likes: number;
  description: string;
}

/**
 * Search Thingiverse for 3D models
 * @param query - The search query describing the desired 3D model
 * @param limit - Maximum number of results to return (default: 5)
 */
export async function searchThingiverse(
  query: string,
  limit: number = 5
): Promise<ThingiverseModel[]> {
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
    const models: ThingiverseModel[] = [];
    
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
        likes: 0, // We'll need to scrape individual pages for this
        description: '', // Basic search doesn't include descriptions
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
      },
    ];
  }
}

/**
 * Search multiple 3D printing sites
 * @param query - The search query describing the desired 3D model
 */
export async function search3DModels(query: string): Promise<{
  thingiverse: ThingiverseModel[];
  searchQuery: string;
}> {
  const thingiverseResults = await searchThingiverse(query, 5);
  
  return {
    thingiverse: thingiverseResults,
    searchQuery: query,
  };
}

