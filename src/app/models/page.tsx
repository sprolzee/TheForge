import Header from '@/app/_components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Box, Layers, Sparkles, Hexagon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const providers = [
  {
    name: 'Thingiverse',
    description: 'The largest 3D printing community with millions of free designs. Perfect for hobbyists and makers looking for a wide variety of models.',
    url: 'https://www.thingiverse.com',
    icon: Box,
    color: 'from-blue-500 to-blue-600',
    iconBg: 'from-blue-500/10 to-blue-500/5',
    iconColor: 'text-blue-600',
    stats: { models: '2M+', users: '10M+' }
  },
  {
    name: 'Printables',
    description: 'A modern platform by Prusa with high-quality models and an active community. Features contests and rewards for creators.',
    url: 'https://www.printables.com',
    icon: Layers,
    color: 'from-orange-500 to-orange-600',
    iconBg: 'from-orange-500/10 to-orange-500/5',
    iconColor: 'text-orange-600',
    stats: { models: '500K+', users: '2M+' }
  },
  {
    name: 'MyMiniFactory',
    description: 'Curated collection of premium 3D models. Every design is test printed and guaranteed to work perfectly.',
    url: 'https://www.myminifactory.com',
    icon: Sparkles,
    color: 'from-purple-500 to-purple-600',
    iconBg: 'from-purple-500/10 to-purple-500/5',
    iconColor: 'text-purple-600',
    stats: { models: '100K+', quality: 'Verified' }
  },
  {
    name: 'MakerWorld',
    description: 'Bambu Lab\'s official platform for 3D models, optimized for their printers. Free models with strong community support.',
    url: 'https://makerworld.com',
    icon: Hexagon,
    color: 'from-green-500 to-green-600',
    iconBg: 'from-green-500/10 to-green-500/5',
    iconColor: 'text-green-600',
    stats: { models: '200K+', community: 'Active' }
  },
];

export default function ModelsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header title="The Forge" showAccount={false} sticky={true} />
      
      <div className="pt-16">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-br from-[#FDF4EC] via-gray-50 to-white px-4 py-12 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              3D Model{' '}
              <span className="bg-gradient-to-r from-[#E97D3A] to-[#D97030] bg-clip-text text-transparent">
                Providers
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
              Explore the leading platforms for 3D printable models. Find thousands of designs from creators worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Providers Grid */}
      <section className="flex-1 bg-background px-4 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => {
              const Icon = provider.icon;
              return (
                <Card 
                  key={provider.name}
                  className="group flex flex-col border-border/50 transition-all hover:border-[#E97D3A]/50 hover:shadow-xl"
                >
                  <CardHeader className="flex-1">
                    <div className={`mb-4 flex size-14 items-center justify-center rounded-xl bg-gradient-to-br ${provider.iconBg}`}>
                      <Icon className={`size-7 ${provider.iconColor}`} />
                    </div>
                    <CardTitle className="text-2xl">{provider.name}</CardTitle>
                    <CardDescription className="mt-2 text-base leading-relaxed">
                      {provider.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4 border-t pt-4">
                      {Object.entries(provider.stats).map(([key, value]) => (
                        <div key={key} className="flex-1">
                          <p className="font-semibold text-foreground text-lg">{value}</p>
                          <p className="text-muted-foreground text-xs capitalize">{key}</p>
                        </div>
                      ))}
                    </div>
                    <Button 
                      asChild 
                      className="w-full gap-2 bg-gradient-to-r from-[#E97D3A] to-[#D97030] shadow-lg shadow-[#E97D3A]/30 transition-all hover:from-[#D97030] hover:to-[#C96328] hover:shadow-xl group-hover:shadow-[#E97D3A]/40"
                    >
                      <a 
                        href={provider.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Visit {provider.name}
                        <ExternalLink className="size-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* AI Search CTA */}
          <div className="mt-12 rounded-xl border bg-gradient-to-br from-muted/50 to-muted/30 p-6 text-center sm:mt-16 sm:p-8">
            <h2 className="mb-3 font-bold text-2xl sm:text-3xl">
              Want AI to search for you?
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
              Use our AI-powered chat to search across these platforms and find exactly what you need in seconds.
            </p>
            <Button 
              size="lg" 
              asChild 
              className="gap-2 bg-gradient-to-r from-[#E97D3A] to-[#D97030] shadow-lg shadow-[#E97D3A]/50 hover:from-[#D97030] hover:to-[#C96328]"
            >
              <Link href="/chat">
                Try AI Search
                <Sparkles className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      </div>

      {/* Footer */}
      <footer className="border-t px-4 py-6 sm:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-4">
            <div className="flex items-center gap-2">
              <Image src="/forge-favicon.png" alt="The Forge" width={32} height={32} className="size-8" />
              <span className="font-semibold">The Forge</span>
            </div>
            <p className="text-center text-muted-foreground text-sm">
              © 2025 The Forge. Powered by{' '}
              <a 
                href="https://www.merit.systems/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#E97D3A] transition-colors hover:text-[#D97030] hover:underline"
              >
                Merit System&apos;s Echo
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

