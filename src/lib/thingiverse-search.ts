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
        'User-Agent': 'Mozilla/5.0',
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
      
      // Properly format thumbnail URL
      let thumbnailUrl = thumbnail.trim();
      if (thumbnailUrl && !thumbnailUrl.startsWith('http')) {
        thumbnailUrl = thumbnailUrl.startsWith('//') ? `https:${thumbnailUrl}` : `https://${thumbnailUrl}`;
      }
      
      models.push({
        name: name.trim().replace(/<[^>]*>/g, ''),
        url: `https://www.thingiverse.com/thing:${id}`,
        thumbnail: thumbnailUrl,
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

    console.log(`Thingiverse found ${models.length} models for "${query}"`);
    return models;
  } catch (error) {
    console.error('Error searching Thingiverse:', error);
    return [];
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
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Thangs: ${response.status}`);
    }

    const html = await response.text();
    const models: Model3D[] = [];

    // Extract thumbnail images and model info
    const imageMatches = html.matchAll(/<img[^>]*src="([^"]*(?:thangs-static|thangs\.com)[^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi);
    
    for (const match of imageMatches) {
      if (models.length >= limit) break;
      const [_, thumbnail, altText] = match;
      
      // Look for associated model link near this image
      const modelLinkMatch = html.match(new RegExp(`href="(/m/[^"]+)"[^>]*>(?:[\\s\\S]{0,200})?${altText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
      
      if (thumbnail && !thumbnail.includes('avatar') && !thumbnail.includes('logo')) {
        const modelUrl = modelLinkMatch ? `https://thangs.com${modelLinkMatch[1]}` : `https://thangs.com/search/${encodeURIComponent(query)}`;
        
        // Properly format thumbnail URL
        let thumbnailUrl = thumbnail.trim();
        if (!thumbnailUrl.startsWith('http')) {
          thumbnailUrl = thumbnailUrl.startsWith('//') ? `https:${thumbnailUrl}` : `https://${thumbnailUrl}`;
        }
        
        models.push({
          name: altText || `3D Model from Thangs`,
          url: modelUrl,
          thumbnail: thumbnailUrl,
          creator: 'Thangs',
          likes: 0,
          description: `Model for "${query}" on Thangs`,
          source: 'thangs',
        });
      }
    }

    console.log(`Thangs found ${models.length} models for "${query}"`);
    return models;
  } catch (error) {
    console.error('Error searching Thangs:', error);
    return [];
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
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Printables: ${response.status}`);
    }

    const html = await response.text();
    const models: Model3D[] = [];
    const seen = new Set<string>();

    // Extract images and model information
    const imageMatches = html.matchAll(/<img[^>]*src="([^"]*media\.printables\.com[^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi);
    
    for (const match of imageMatches) {
      if (models.length >= limit) break;
      const [_, thumbnail, altText] = match;
      
      // Look for model link near this image
      const contextStart = html.indexOf(match[0]) - 300;
      const contextEnd = html.indexOf(match[0]) + 300;
      const context = html.substring(Math.max(0, contextStart), Math.min(html.length, contextEnd));
      
      const modelLinkMatch = context.match(/href="\/model\/(\d+)[^"]*"/);
      
      if (modelLinkMatch && !seen.has(modelLinkMatch[1])) {
        seen.add(modelLinkMatch[1]);
        const id = modelLinkMatch[1];
        
        // Properly format thumbnail URL
        let thumbnailUrl = thumbnail.trim();
        if (!thumbnailUrl.startsWith('http')) {
          thumbnailUrl = thumbnailUrl.startsWith('//') ? `https:${thumbnailUrl}` : `https://${thumbnailUrl}`;
        }
        
        models.push({
          name: altText || `3D Model #${id}`,
          url: `https://www.printables.com/model/${id}`,
          thumbnail: thumbnailUrl,
          creator: 'Printables',
          likes: 0,
          description: `Printables model for "${query}"`,
          source: 'printables',
        });
      }
    }

    console.log(`Printables found ${models.length} models for "${query}"`);
    return models;
  } catch (error) {
    console.error('Error searching Printables:', error);
    return [];
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
  // Search all sites concurrently with individual error handling
  const [thingiverseResults, thangsResults, printablesResults] = await Promise.all([
    searchThingiverse(query, 5).catch(err => {
      console.error('Thingiverse search failed:', err);
      return [];
    }),
    searchThangs(query, 5).catch(err => {
      console.error('Thangs search failed:', err);
      return [];
    }),
    searchPrintables(query, 5).catch(err => {
      console.error('Printables search failed:', err);
      return [];
    }),
  ]);

  console.log(`Search results - Thingiverse: ${thingiverseResults.length}, Thangs: ${thangsResults.length}, Printables: ${printablesResults.length}`);

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

  // If NO results from any site, provide direct search links as fallback
  if (allResults.length === 0) {
    console.log('All searches failed, returning direct search links');
    return {
      results: [
        {
          name: `Thingiverse: ${query}`,
          url: `https://www.thingiverse.com/search?q=${encodeURIComponent(query)}&type=things&sort=relevant`,
          thumbnail: '',
          creator: 'Thingiverse',
          likes: 0,
          description: 'View search results on Thingiverse',
          source: 'thingiverse' as const,
        },
        {
          name: `Thangs: ${query}`,
          url: `https://thangs.com/search/${encodeURIComponent(query)}?scope=all`,
          thumbnail: '',
          creator: 'Thangs',
          likes: 0,
          description: 'View search results on Thangs',
          source: 'thangs' as const,
        },
        {
          name: `Printables: ${query}`,
          url: `https://www.printables.com/search/models?q=${encodeURIComponent(query)}`,
          thumbnail: '',
          creator: 'Printables',
          likes: 0,
          description: 'View search results on Printables',
          source: 'printables' as const,
        },
      ],
      searchQuery: query,
      sourceCount: {
        thingiverse: 1,
        thangs: 1,
        printables: 1,
      },
    };
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

