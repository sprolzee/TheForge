'use client';

import { EchoAccount } from '@/components/echo-account-next';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Box,
  FileText,
  Github,
  Home,
  Menu,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { useState } from 'react';

interface HeaderProps {
  title?: string;
  className?: string;
  showAccount?: boolean;
  sticky?: boolean;
}

const menuItems = [
  {
    label: 'Home',
    href: '/',
    icon: Home,
    description: 'Return to home page',
  },
  {
    label: 'Chat',
    href: '/chat',
    icon: MessageSquare,
    description: 'AI-powered 3D model search',
  },
  {
    label: '3D Models',
    href: '/models',
    icon: Box,
    description: 'Browse 3D model providers',
  },
];

const Header: FC<HeaderProps> = ({
  title = 'The Forge',
  className = '',
  showAccount = false,
  sticky = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`${sticky ? 'fixed top-0 z-50' : 'relative'} w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}
    >
      <div className="flex h-16 w-full items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Image src="/Forge-Favicon.png" alt="The Forge" width={36} height={36} className="size-9" />
          <h1 className="font-bold text-xl tracking-tight">{title}</h1>
        </Link>

        <div className="flex items-center gap-3">
          {/* Echo Account - Only on chat pages */}
          {showAccount && (
            <div className="hidden md:block">
              <EchoAccount />
            </div>
          )}

          {/* Hamburger Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center gap-2">
                  <Image src="/Forge-Favicon.png" alt="The Forge" width={32} height={32} className="size-8" />
                  {title}
                </SheetTitle>
                <SheetDescription>
                  AI-powered 3D model search and chat
                </SheetDescription>
              </SheetHeader>

              <div className="mt-8 flex flex-col gap-4">
                {/* Navigation Links */}
                <nav className="flex flex-col gap-1">
                  <p className="px-3 font-medium text-muted-foreground text-sm">
                    Navigation
                  </p>
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-start gap-3 rounded-lg px-3 py-3 text-sm transition-colors hover:bg-accent"
                      >
                        <Icon className="mt-0.5 size-5 text-muted-foreground" />
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">{item.label}</span>
                          <span className="text-muted-foreground text-xs">
                            {item.description}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>

                <Separator />

                {/* Additional Links */}
                <div className="flex flex-col gap-1">
                  <p className="px-3 font-medium text-muted-foreground text-sm">
                    Resources
                  </p>
                  <Link
                    href="/docs"
                    className="flex items-start gap-3 rounded-lg px-3 py-3 text-sm transition-colors hover:bg-accent"
                  >
                    <FileText className="mt-0.5 size-5 text-muted-foreground" />
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">Documentation</span>
                      <span className="text-muted-foreground text-xs">
                        Learn more about our platform
                      </span>
                    </div>
                  </Link>
                  <Link
                    href="https://github.com/sprolzee/TheForge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 rounded-lg px-3 py-3 text-sm transition-colors hover:bg-accent"
                  >
                    <Github className="mt-0.5 size-5 text-muted-foreground" />
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">GitHub</span>
                      <span className="text-muted-foreground text-xs">
                        View source code
                      </span>
                    </div>
                  </Link>
                </div>

                <Separator />

                {/* Account Section - Always show in menu */}
                <div className="flex flex-col gap-2">
                  <p className="px-3 font-medium text-muted-foreground text-sm">
                    Account
                  </p>
                  <div className="px-3">
                    <EchoAccount />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
