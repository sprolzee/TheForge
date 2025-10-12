import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { isSignedIn } from '@/echo';
import { ArrowRight, Box, MessageSquare, Search, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const signedIn = await isSignedIn();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 py-20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 sm:py-32">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-slate-700/25" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center justify-center">
              <div className="flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl shadow-blue-500/50">
                <Sparkles className="size-10 text-white" />
              </div>
            </div>
            <h1 className="mb-6 font-bold text-5xl tracking-tight sm:text-6xl md:text-7xl">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                The Forge
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Search for 3D printable models using natural language. Powered by AI to help you find exactly what you need on Thingiverse.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {signedIn ? (
                <Button size="lg" asChild className="group gap-2 shadow-lg">
                  <Link href="/chat">
                    Start Chatting
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" asChild className="gap-2 shadow-lg">
                  <Link href="/chat">
                    Get Started
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              )}
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl">
              Powerful Features
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Everything you need to find the perfect 3D model
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="border-2 transition-all hover:border-blue-500 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <Search className="size-6 text-blue-600" />
                </div>
                <CardTitle>Natural Language Search</CardTitle>
                <CardDescription>
                  Describe what you're looking for in plain English and let AI find the perfect match
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2 transition-all hover:border-purple-500 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <Box className="size-6 text-purple-600" />
                </div>
                <CardTitle>Thingiverse Integration</CardTitle>
                <CardDescription>
                  Search millions of 3D models directly from Thingiverse with thumbnails and details
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2 transition-all hover:border-pink-500 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-pink-500/10">
                  <MessageSquare className="size-6 text-pink-600" />
                </div>
                <CardTitle>Conversational AI</CardTitle>
                <CardDescription>
                  Chat naturally with AI to refine your search and get recommendations
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 4 */}
            <Card className="border-2 transition-all hover:border-green-500 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-green-500/10">
                  <Zap className="size-6 text-green-600" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Get instant results with our optimized search and AI-powered filtering
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 5 */}
            <Card className="border-2 transition-all hover:border-orange-500 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-orange-500/10">
                  <Sparkles className="size-6 text-orange-600" />
                </div>
                <CardTitle>Smart Recommendations</CardTitle>
                <CardDescription>
                  AI suggests related models and variations based on your interests
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 6 */}
            <Card className="border-2 transition-all hover:border-indigo-500 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-indigo-500/10">
                  <Box className="size-6 text-indigo-600" />
                </div>
                <CardTitle>Multiple Models</CardTitle>
                <CardDescription>
                  Choose from GPT-4o and other AI models for the best results
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/50 px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl">
            Ready to start creating?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join The Forge and discover thousands of 3D printable models with the power of AI
          </p>
          <Button size="lg" asChild className="gap-2 shadow-lg">
            <Link href="/chat">
              {signedIn ? 'Go to Chat' : 'Get Started'}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Sparkles className="size-4 text-white" />
              </div>
              <span className="font-semibold">The Forge</span>
            </div>
            <p className="text-center text-muted-foreground text-sm">
              © 2025 The Forge. Powered by Echo and OpenAI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
