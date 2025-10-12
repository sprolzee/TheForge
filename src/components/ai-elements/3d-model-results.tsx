import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Box } from 'lucide-react';

export interface ThingiverseModel {
  name: string;
  url: string;
  thumbnail: string;
  creator: string;
  likes: number;
  description: string;
}

interface ModelResultsProps {
  results: {
    thingiverse: ThingiverseModel[];
    searchQuery: string;
  };
}

export function ModelResults({ results }: ModelResultsProps) {
  const { thingiverse, searchQuery } = results;

  if (!thingiverse || thingiverse.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Box className="size-5" />
            No 3D Models Found
          </CardTitle>
          <CardDescription>
            No results found for &quot;{searchQuery}&quot;
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Box className="size-5" />
          3D Models from Thingiverse
        </CardTitle>
        <CardDescription>
          Found {thingiverse.length} model{thingiverse.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {thingiverse.map((model, index) => (
            <a
              key={index}
              href={model.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-lg border bg-card transition-all hover:border-primary hover:shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                {model.thumbnail ? (
                  <img
                    src={model.thumbnail}
                    alt={model.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <Box className="size-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="mb-1 flex items-start justify-between gap-2 font-semibold text-sm leading-tight">
                  <span className="line-clamp-2">{model.name}</span>
                  <ExternalLink className="mt-0.5 size-3 flex-shrink-0 text-muted-foreground" />
                </h3>
                {model.creator && (
                  <p className="text-muted-foreground text-xs">by {model.creator}</p>
                )}
                {model.description && (
                  <p className="mt-2 line-clamp-2 text-muted-foreground text-xs">
                    {model.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

