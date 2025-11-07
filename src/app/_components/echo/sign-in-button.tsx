'use client';

import { useEcho } from '@merit-systems/echo-next-sdk/client';
import { Button } from '@/components/echo-button';
import { ArrowRight } from 'lucide-react';

export default function SignInButton() {
  const { signIn } = useEcho();

  return (
    <Button
      onClick={() => signIn()}
      variant="turbo"
      size="lg"
      className="group w-full"
    >
      <span className="font-semibold">Sign in with Echo</span>
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </Button>
  );
}
