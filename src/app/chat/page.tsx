import Chat from '@/app/_components/chat';
import SignInButton from '@/app/_components/echo/sign-in-button';
import { ForgeLogo } from '@/components/logo';
import { isSignedIn } from '@/echo';
import { Search, Sparkles, Zap } from 'lucide-react';

export default async function ChatPage() {
  const signedIn = await isSignedIn();

  if (!signedIn) {
    return (
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-lg space-y-8">
          {/* Header with Logo */}
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-3">
              <ForgeLogo className="size-12" />
              <h1 className="font-bold text-4xl tracking-tight">The Forge</h1>
            </div>
            <div className="space-y-2">
              <h2 className="font-semibold text-2xl text-foreground">
                AI-Powered 3D Model Discovery
              </h2>
              <p className="text-balance text-lg text-muted-foreground">
                Search thousands of 3D printable models using natural language
              </p>
            </div>
          </div>

          {/* Main Card */}
          <div className="space-y-6 rounded-2xl border bg-card p-8 shadow-xl">
            <div className="space-y-4">
              <h3 className="font-semibold text-xl">Sign in to get started</h3>

              <SignInButton />

              <p className="text-center text-muted-foreground text-sm">
                Secure authentication powered by{' '}
                <span className="font-medium text-foreground">Echo</span>
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 border-t pt-6">
              <p className="font-semibold text-foreground text-sm">
                What you can do:
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Search className="size-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground text-sm">
                      Natural Language Search
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Describe what you need and let AI find the perfect models
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="size-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground text-sm">
                      Smart Recommendations
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Get AI-curated suggestions based on your search
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Zap className="size-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground text-sm">
                      Multi-Platform Access
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Search across Thingiverse, Printables, and more
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-balance text-center text-muted-foreground text-sm">
            Start exploring the world of 3D printing with intelligent search
          </p>
        </div>
      </div>
    );
  }

  return <Chat />;
}

