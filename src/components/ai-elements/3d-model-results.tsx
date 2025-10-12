import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Box } from 'lucide-react';

export interface Model3D {
  name: string;
  url: string;
  thumbnail: string;
  creator: string;
  likes: number;
  description: string;
  source: 'thingiverse' | 'thangs' | 'printables' | 'cults3d' | 'myminifactory';
}

interface ModelResultsProps {
  results: {
    results: Model3D[];
    searchQuery: string;
    sourceCount: {
      thingiverse: number;
      thangs: number;
      printables: number;
    };
  };
}

const sourceColors = {
  thingiverse: 'bg-blue-500',
  thangs: 'bg-purple-500',
  printables: 'bg-orange-500',
  cults3d: 'bg-red-500',
  myminifactory: 'bg-green-500',
} as const;

const sourceNames = {
  thingiverse: 'Thingiverse',
  thangs: 'Thangs',
  printables: 'Printables',
  cults3d: 'Cults3D',
  myminifactory: 'MyMiniFactory',
} as const;

export function ModelResults({ results }: ModelResultsProps) {
  const { results: models, searchQuery, sourceCount } = results;

  if (!models || models.length === 0) {
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

  const totalResults = sourceCount.thingiverse + sourceCount.thangs + sourceCount.printables;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Box className="size-5" />
          3D Models from Multiple Sites
        </CardTitle>
        <CardDescription className="space-y-2">
          <div>
            Found {totalResults} model{totalResults !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
          </div>
          <div className="flex flex-wrap gap-2">
            {sourceCount.thingiverse > 0 && (
              <Badge variant="secondary" className="gap-1">
                <div className={`size-2 rounded-full ${sourceColors.thingiverse}`} />
                {sourceCount.thingiverse} from Thingiverse
              </Badge>
            )}
            {sourceCount.thangs > 0 && (
              <Badge variant="secondary" className="gap-1">
                <div className={`size-2 rounded-full ${sourceColors.thangs}`} />
                {sourceCount.thangs} from Thangs
              </Badge>
            )}
            {sourceCount.printables > 0 && (
              <Badge variant="secondary" className="gap-1">
                <div className={`size-2 rounded-full ${sourceColors.printables}`} />
                {sourceCount.printables} from Printables
              </Badge>
            )}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((model, index) => (
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
                <div className="mb-2 flex items-start justify-between gap-2">
                  <Badge 
                    variant="outline" 
                    className="flex-shrink-0"
                    style={{
                      borderColor: sourceColors[model.source].replace('bg-', '#'),
                    }}
                  >
                    <div className={`mr-1 size-2 rounded-full ${sourceColors[model.source]}`} />
                    {sourceNames[model.source]}
                  </Badge>
                  <ExternalLink className="mt-0.5 size-3 flex-shrink-0 text-muted-foreground" />
                </div>
                <h3 className="mb-1 font-semibold text-sm leading-tight">
                  <span className="line-clamp-2">{model.name}</span>
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

