import Header from '@/app/_components/header';
import { Button } from '@/components/ui/button';
import { isSignedIn } from '@/echo';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const signedIn = await isSignedIn();

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="The Forge" showAccount={false} sticky={false} />
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden border-b bg-gradient-to-br from-[#FDF4EC] via-gray-50 to-[#FCE8D8] px-4 py-16 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 sm:py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-slate-700/25" />
        <div className="relative mx-auto flex w-full max-w-7xl items-center">
          <div className="mx-auto w-full max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center justify-center sm:mb-8">
              <Image src="/forge-favicon.png" alt="The Forge" width={96} height={96} className="size-20 drop-shadow-2xl sm:size-24" />
            </div>
            <h1 className="mb-4 font-bold text-4xl tracking-tight sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-[#E97D3A] to-[#4A4A4A] bg-clip-text text-transparent">
                The Forge
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground sm:mb-10 sm:text-lg md:text-xl">
              Search for 3D printable models using natural language. Powered by AI to help you find exactly what you need on Thingiverse.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {signedIn ? (
                <Button size="lg" asChild className="group gap-2 bg-gradient-to-r from-[#E97D3A] to-[#D97030] shadow-lg shadow-[#E97D3A]/50 hover:from-[#D97030] hover:to-[#C96328]">
                  <Link href="/chat">
                    Start Chatting
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" asChild className="gap-2 bg-gradient-to-r from-[#E97D3A] to-[#D97030] shadow-lg shadow-[#E97D3A]/50 hover:from-[#D97030] hover:to-[#C96328]">
                  <Link href="/chat">
                    Get Started
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              )}
              <Button size="lg" variant="outline" asChild className="border-[#E97D3A] text-[#E97D3A] hover:bg-[#FDF4EC] dark:border-[#E97D3A] dark:text-[#E97D3A] dark:hover:bg-[#E97D3A]/10">
                <Link href="/chat">Try It Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30 px-4 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-3 font-bold text-2xl tracking-tight sm:mb-4 sm:text-3xl md:text-4xl">
            Ready to start creating?
          </h2>
          <p className="mb-6 text-base text-muted-foreground sm:mb-8 sm:text-lg">
            Join The Forge and discover thousands of 3D printable models with the power of AI
          </p>
          <Button size="lg" asChild className="gap-2 bg-gradient-to-r from-[#E97D3A] to-[#D97030] shadow-lg shadow-[#E97D3A]/50 hover:from-[#D97030] hover:to-[#C96328]">
            <Link href="/chat">
              {signedIn ? 'Go to Chat' : 'Get Started'}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

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
                href="https://www.meritsystems.com" 
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
