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
import Link from 'next/link';
import type { FC } from 'react';
import { useState } from 'react';

interface HeaderProps {
  title?: string;
  className?: string;
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
    href: '/chat',
    icon: Box,
    description: 'Search for 3D printable models',
  },
  {
    label: 'Documentation',
    href: '#features',
    icon: FileText,
    description: 'View features and docs',
  },
];

const Header: FC<HeaderProps> = ({
  title = 'The Forge',
  className = '',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Sparkles className="size-5 text-white" />
            </div>
            <h1 className="font-bold text-xl tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Home className="mr-2 size-4" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/chat">
                <MessageSquare className="mr-2 size-4" />
                Chat
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/#features">
                <Sparkles className="mr-2 size-4" />
                Features
              </Link>
            </Button>
          </nav>

          {/* Echo Account */}
          <div className="hidden md:block">
            <EchoAccount />
          </div>

          {/* Hamburger Menu (Mobile) */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                    <Sparkles className="size-4 text-white" />
                  </div>
                  {title}
                </SheetTitle>
                <SheetDescription>
                  AI-powered 3D model search and chat
                </SheetDescription>
              </SheetHeader>

              <div className="mt-8 flex flex-col gap-4">
                {/* Account Section */}
                <div className="flex flex-col gap-2">
                  <p className="px-3 font-medium text-muted-foreground text-sm">
                    Account
                  </p>
                  <div className="px-3">
                    <EchoAccount />
                  </div>
                </div>

                <Separator />

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
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                  >
                    <Github className="size-5 text-muted-foreground" />
                    <span>GitHub</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Menu Icon (for additional options) */}
          <Sheet open={desktopMenuOpen} onOpenChange={setDesktopMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex"
              >
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                    <Sparkles className="size-4 text-white" />
                  </div>
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
                      <SheetClose asChild key={item.label}>
                        <Link
                          href={item.href}
                          className="flex items-start gap-3 rounded-lg px-3 py-3 text-sm transition-colors hover:bg-accent"
                          onClick={() => setDesktopMenuOpen(false)}
                        >
                          <Icon className="mt-0.5 size-5 text-muted-foreground" />
                          <div className="flex flex-col gap-1">
                            <span className="font-medium">{item.label}</span>
                            <span className="text-muted-foreground text-xs">
                              {item.description}
                            </span>
                          </div>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>

                <Separator />

                {/* Additional Links */}
                <div className="flex flex-col gap-1">
                  <p className="px-3 font-medium text-muted-foreground text-sm">
                    Resources
                  </p>
                  <SheetClose asChild>
                    <Link
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                    >
                      <Github className="size-5 text-muted-foreground" />
                      <span>GitHub</span>
                    </Link>
                  </SheetClose>
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
