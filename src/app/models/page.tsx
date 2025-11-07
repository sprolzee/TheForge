import Header from '@/app/_components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';
import { ExternalLink, Box, Layers, Sparkles, Hexagon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const providers = [
  {
    name: 'Thingiverse',
    description: 'The largest 3D printing community with millions of free designs.',
    url: 'https://www.thingiverse.com',
    icon: Box,
    iconBg: 'from-blue-500/10 to-blue-500/5',
    iconColor: 'text-blue-600',
    models: '2M+'
  },
  {
    name: 'Thangs',
    description: 'Modern search-focused platform for discovering 3D printable models.',
    url: 'https://thangs.com',
    icon: Sparkles,
    iconBg: 'from-cyan-500/10 to-cyan-500/5',
    iconColor: 'text-cyan-600',
    models: '500K+'
  },
  {
    name: 'Printables',
    description: 'Prusa Research platform with contests and rewards for creators.',
    url: 'https://www.printables.com',
    icon: Layers,
    iconBg: 'from-orange-500/10 to-orange-500/5',
    iconColor: 'text-orange-600',
    models: '500K+'
  },
  {
    name: 'MakerWorld',
    description: 'Bambu Lab\'s official platform optimized for their printers.',
    url: 'https://makerworld.com',
    icon: Hexagon,
    iconBg: 'from-green-500/10 to-green-500/5',
    iconColor: 'text-green-600',
    models: '200K+'
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
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-4">
            {providers.map((provider) => {
              const Icon = provider.icon;
              return (
                <div
                  key={provider.name}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:border-[#E97D3A]/50 hover:shadow-2xl hover:shadow-[#E97D3A]/10 hover:-translate-y-1"
                >
                  <DottedGlowBackground
                    className="pointer-events-none"
                    gap={13}
                    radius={1.4}
                    color="rgba(233, 125, 58, 0.45)"
                    glowColor="rgba(233, 125, 58, 0.65)"
                    opacity={0.55}
                    backgroundOpacity={0}
                    speedMin={0.3}
                    speedMax={1.0}
                    speedScale={0.75}
                  />
                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col p-6">
                    {/* Icon */}
                    <div className={`mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${provider.iconBg} ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className={`size-6 ${provider.iconColor} transition-transform duration-300`} />
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 font-bold text-foreground text-xl tracking-tight">
                      {provider.name}
                    </h3>

                    {/* Description */}
                    <p className="mb-4 flex-1 text-muted-foreground text-sm leading-relaxed">
                      {provider.description}
                    </p>

                    {/* Stats */}
                    <div className="mb-4 border-t border-border/50 pt-4">
                      <p className="font-bold text-foreground text-2xl">{provider.models}</p>
                      <p className="text-muted-foreground text-xs">Available Models</p>
                    </div>

                    {/* CTA Button */}
                    <a
                      href={provider.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#E97D3A] to-[#D97030] px-4 py-2.5 font-semibold text-sm text-white shadow-md shadow-[#E97D3A]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#E97D3A]/40 hover:scale-[1.02]"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Visit Site
                        <ExternalLink className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                      </span>
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover/btn:translate-x-full" />
                    </a>
                  </div>
                </div>
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
              <Image src="/Forge-Favicon.png" alt="The Forge" width={32} height={32} className="size-8" />
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

