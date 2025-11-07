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
  source: 'thingiverse' | 'thangs' | 'printables' | 'cults3d' | 'myminifactory' | 'makerworld';
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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Thingiverse: ${response.status}`);
    }

    const html = await response.text();

    // Parse HTML to extract model information
    const models: Model3D[] = [];
    
    // First, try to extract thing IDs
    const thingIds = new Set<string>();
    const thingIdMatches = html.matchAll(/\/thing:(\d+)/g);
    
    for (const match of thingIdMatches) {
      if (thingIds.size >= limit) break;
      thingIds.add(match[1]);
    }

    // For each thing ID, try to find associated image
    const imageMap = new Map<string, string>();
    const imageMatches = html.matchAll(/<img[^>]*src="([^"]*)"[^>]*>/gi);
    
    for (const match of imageMatches) {
      const imgSrc = match[1];
      // Look for Thingiverse CDN images
      if (imgSrc.includes('cdn.thingiverse.com') || imgSrc.includes('thingiverse-production')) {
        // Find nearby thing ID
        const imgIndex = html.indexOf(match[0]);
        const context = html.substring(Math.max(0, imgIndex - 500), Math.min(html.length, imgIndex + 500));
        const thingMatch = context.match(/\/thing:(\d+)/);
        if (thingMatch && thingIds.has(thingMatch[1])) {
          imageMap.set(thingMatch[1], imgSrc);
        }
      }
    }

    // Build results
    for (const id of Array.from(thingIds)) {
      if (models.length >= limit) break;
      const thumbnail = imageMap.get(id) || '';
      
      models.push({
        name: `3D Model #${id}`,
        url: `https://www.thingiverse.com/thing:${id}`,
        thumbnail: thumbnail.startsWith('http') ? thumbnail : thumbnail ? `https:${thumbnail}` : '',
        creator: 'Thingiverse',
        likes: 0,
        description: `Thingiverse model for "${query}"`,
        source: 'thingiverse',
      });
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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Thangs: ${response.status}`);
    }

    const html = await response.text();
    const models: Model3D[] = [];

    // Extract model links first
    const modelLinks = new Set<string>();
    const linkMatches = html.matchAll(/href="(\/m\/[^"]+)"/gi);
    
    for (const match of linkMatches) {
      if (modelLinks.size >= limit) break;
      const path = match[1];
      if (!path.includes('mythangs') && !path.includes('/search')) {
        modelLinks.add(path);
      }
    }

    // Extract all images
    const imageMatches = html.matchAll(/<img[^>]*src="([^"]+)"[^>]*(?:alt="([^"]*)")?[^>]*>/gi);
    const imageMap = new Map<string, { url: string; alt: string }>();
    
    for (const match of imageMatches) {
      const imgSrc = match[1];
      const alt = match[2] || '';
      
      // Filter for actual model images
      if ((imgSrc.includes('thangs-static') || imgSrc.includes('thangs.com')) && 
          !imgSrc.includes('avatar') && 
          !imgSrc.includes('logo') &&
          !imgSrc.includes('icon')) {
        // Find nearby model link
        const imgIndex = html.indexOf(match[0]);
        const context = html.substring(Math.max(0, imgIndex - 300), Math.min(html.length, imgIndex + 300));
        const linkMatch = context.match(/href="(\/m\/[^"]+)"/);
        if (linkMatch) {
          imageMap.set(linkMatch[1], { url: imgSrc, alt });
        }
      }
    }

    // Build results
    for (const link of Array.from(modelLinks)) {
      if (models.length >= limit) break;
      const imageInfo = imageMap.get(link);
      
      models.push({
        name: imageInfo?.alt || `3D Model from Thangs`,
        url: `https://thangs.com${link}`,
        thumbnail: imageInfo ? (imageInfo.url.startsWith('http') ? imageInfo.url : `https:${imageInfo.url}`) : '',
        creator: 'Thangs',
        likes: 0,
        description: `Model for "${query}" on Thangs`,
        source: 'thangs',
      });
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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Printables: ${response.status}`);
    }

    const html = await response.text();
    const models: Model3D[] = [];

    // Extract model IDs first
    const modelIds = new Set<string>();
    const modelMatches = html.matchAll(/\/model\/(\d+)/g);
    
    for (const match of modelMatches) {
      if (modelIds.size >= limit) break;
      modelIds.add(match[1]);
    }

    // Extract images and associate with models
    const imageMap = new Map<string, { url: string; alt: string }>();
    const imageMatches = html.matchAll(/<img[^>]*src="([^"]+)"[^>]*(?:alt="([^"]*)")?[^>]*>/gi);
    
    for (const match of imageMatches) {
      const imgSrc = match[1];
      const alt = match[2] || '';
      
      // Filter for Printables CDN images
      if (imgSrc.includes('media.printables.com') || imgSrc.includes('printables')) {
        // Find nearby model ID
        const imgIndex = html.indexOf(match[0]);
        const context = html.substring(Math.max(0, imgIndex - 400), Math.min(html.length, imgIndex + 400));
        const modelMatch = context.match(/\/model\/(\d+)/);
        
        if (modelMatch && modelIds.has(modelMatch[1])) {
          imageMap.set(modelMatch[1], { url: imgSrc, alt });
        }
      }
    }

    // Build results
    for (const id of Array.from(modelIds)) {
      if (models.length >= limit) break;
      const imageInfo = imageMap.get(id);
      
      models.push({
        name: imageInfo?.alt || `3D Model #${id}`,
        url: `https://www.printables.com/model/${id}`,
        thumbnail: imageInfo ? (imageInfo.url.startsWith('http') ? imageInfo.url : `https:${imageInfo.url}`) : '',
        creator: 'Printables',
        likes: 0,
        description: `Printables model for "${query}"`,
        source: 'printables',
      });
    }

    console.log(`Printables found ${models.length} models for "${query}"`);
    return models;
  } catch (error) {
    console.error('Error searching Printables:', error);
    return [];
  }
}

/**
 * Search MakerWorld for 3D models
 * @param query - The search query describing the desired 3D model
 * @param limit - Maximum number of results to return (default: 5)
 */
export async function searchMakerWorld(
  query: string,
  limit: number = 5
): Promise<Model3D[]> {
  try {
    const searchUrl = `https://makerworld.com/en/search/models?keyword=${encodeURIComponent(query)}`;

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from MakerWorld: ${response.status}`);
    }

    const html = await response.text();
    const models: Model3D[] = [];

    // Extract model URLs first
    const modelUrls = new Set<string>();
    const urlMatches = html.matchAll(/href="(\/en\/models\/[^"]+)"/gi);

    for (const match of urlMatches) {
      if (modelUrls.size >= limit) break;
      const path = match[1];
      // Filter out user profiles and other non-model pages
      if (!path.includes('/user/') && !path.includes('/search')) {
        modelUrls.add(path);
      }
    }

    // Extract images and associate with models
    const imageMap = new Map<string, { url: string; alt: string }>();
    const imageMatches = html.matchAll(/<img[^>]*src="([^"]+)"[^>]*(?:alt="([^"]*)")?[^>]*>/gi);

    for (const match of imageMatches) {
      const imgSrc = match[1];
      const alt = match[2] || '';

      // Filter for MakerWorld CDN images - more lenient filtering
      const isModelImage = (imgSrc.includes('makerworld') || imgSrc.includes('bambulab') || imgSrc.includes('public')) &&
          !imgSrc.includes('avatar') &&
          !imgSrc.includes('logo') &&
          !imgSrc.includes('icon');

      if (isModelImage) {
        // Find nearby model link - check both before and after
        const imgIndex = html.indexOf(match[0]);
        const context = html.substring(Math.max(0, imgIndex - 600), Math.min(html.length, imgIndex + 600));
        const linkMatch = context.match(/href="(\/en\/models\/[^"]+)"/);

        if (linkMatch && !linkMatch[1].includes('/user/')) {
          // Only store if we don't have an image for this link yet
          if (!imageMap.has(linkMatch[1])) {
            imageMap.set(linkMatch[1], { url: imgSrc, alt });
          }
        }
      }
    }

    console.log(`MakerWorld: Found ${modelUrls.size} model URLs, ${imageMap.size} images matched`);

    // Build results
    for (const url of Array.from(modelUrls)) {
      if (models.length >= limit) break;
      const imageInfo = imageMap.get(url);

      models.push({
        name: imageInfo?.alt || `MakerWorld Model`,
        url: `https://makerworld.com${url}`,
        thumbnail: imageInfo ? (imageInfo.url.startsWith('http') ? imageInfo.url : `https:${imageInfo.url}`) : '',
        creator: 'MakerWorld',
        likes: 0,
        description: `Model for "${query}" on MakerWorld`,
        source: 'makerworld',
      });
    }

    console.log(`MakerWorld found ${models.length} models for "${query}"`);
    if (models.length > 0) {
      console.log('Sample MakerWorld model:', JSON.stringify(models[0], null, 2));
    }
    return models;
  } catch (error) {
    console.error('Error searching MakerWorld:', error);
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
    makerworld: number;
  };
}> {
  // Search all sites concurrently with individual error handling
  const [thingiverseResults, thangsResults, printablesResults, makerworldResults] = await Promise.all([
    searchThingiverse(query, 5).catch(err => {
      console.error('Thingiverse search failed:', err.message || err);
      return [];
    }),
    searchThangs(query, 5).catch(err => {
      console.error('Thangs search failed:', err.message || err);
      return [];
    }),
    searchPrintables(query, 5).catch(err => {
      console.error('Printables search failed:', err.message || err);
      return [];
    }),
    searchMakerWorld(query, 5).catch(err => {
      console.error('MakerWorld search failed:', err.message || err);
      return [];
    }),
  ]);

  console.log(`Search results - Thingiverse: ${thingiverseResults.length}, Thangs: ${thangsResults.length}, Printables: ${printablesResults.length}, MakerWorld: ${makerworldResults.length}`);

  // Combine and interleave results for variety
  const allResults: Model3D[] = [];
  const maxLength = Math.max(
    thingiverseResults.length,
    thangsResults.length,
    printablesResults.length,
    makerworldResults.length
  );

  for (let i = 0; i < maxLength; i++) {
    if (i < thingiverseResults.length) allResults.push(thingiverseResults[i]);
    if (i < thangsResults.length) allResults.push(thangsResults[i]);
    if (i < printablesResults.length) allResults.push(printablesResults[i]);
    if (i < makerworldResults.length) allResults.push(makerworldResults[i]);
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
        {
          name: `MakerWorld: ${query}`,
          url: `https://makerworld.com/en/search/models?keyword=${encodeURIComponent(query)}`,
          thumbnail: '',
          creator: 'MakerWorld',
          likes: 0,
          description: 'View search results on MakerWorld',
          source: 'makerworld' as const,
        },
      ],
      searchQuery: query,
      sourceCount: {
        thingiverse: 1,
        thangs: 1,
        printables: 1,
        makerworld: 1,
      },
    };
  }

  return {
    results: allResults.slice(0, 20), // Limit to 20 total results
    searchQuery: query,
    sourceCount: {
      thingiverse: thingiverseResults.length,
      thangs: thangsResults.length,
      printables: printablesResults.length,
      makerworld: makerworldResults.length,
    },
  };
}

