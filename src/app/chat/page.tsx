import Chat from '@/app/_components/chat';
import SignInButton from '@/app/_components/echo/sign-in-button';
import { isSignedIn } from '@/echo';

export default async function ChatPage() {
  const signedIn = await isSignedIn();

  if (!signedIn) {
    return (
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50">
              <span className="font-bold text-2xl text-white">TF</span>
            </div>
            <div>
              <h2 className="mt-2 font-bold text-3xl tracking-tight">
                Sign In Required
              </h2>
              <p className="mt-3 text-muted-foreground">
                Please sign in to access the chat
              </p>
            </div>
          </div>

          <div className="space-y-6 rounded-xl border bg-card p-8 shadow-lg">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Get Started</h3>
              <p className="text-muted-foreground text-sm">
                Sign in to start searching for 3D models on Thingiverse
              </p>
            </div>

            <SignInButton />

            <div className="space-y-2 border-t pt-4">
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                Features
              </p>
              <ul className="space-y-2 text-left text-muted-foreground text-sm">
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-blue-500" />
                  Search Thingiverse with natural language
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-purple-500" />
                  AI-powered model recommendations
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-pink-500" />
                  Built-in billing and user management
                </li>
              </ul>
            </div>
          </div>

          <p className="text-muted-foreground text-xs">
            Secure authentication powered by Echo
          </p>
        </div>
      </div>
    );
  }

  return <Chat />;
}

