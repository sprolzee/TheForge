'use client';

import Header from '@/app/_components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  BookOpen,
  ExternalLink,
  Zap,
  Building2,
  Printer,
  ChevronRight,
  ChevronDown,
  Rocket,
  DollarSign,
  Code,
  Gauge,
  Layers,
  Thermometer
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const sections = [
  { id: 'merit-systems', label: 'Merit Systems', icon: Building2 },
  { id: 'echo', label: 'Echo Platform', icon: Zap },
  { id: '3d-providers', label: '3D Model Providers', icon: Layers },
  { id: 'printers', label: 'Our Printers', icon: Printer },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('merit-systems');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="The Forge" showAccount={false} sticky={true} />
      
      <div className="flex flex-1 pt-16 lg:flex-row">
        {/* Sidebar Navigation - Desktop */}
        <aside className="hidden w-64 border-r bg-muted/30 lg:block lg:h-[calc(100vh-4rem)] lg:overflow-y-auto lg:sticky lg:top-[4rem]">
          <div className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="size-5 text-[#E97D3A]" />
              <h2 className="font-semibold text-lg">Documentation</h2>
            </div>
            <Separator className="mb-4" />
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-[#E97D3A] text-white'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
                  >
                    <Icon className="size-4" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Navigation */}
        <div className="sticky top-[4rem] z-10 border-b bg-muted/30 p-4 lg:hidden">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-[#E97D3A]" />
            <h2 className="font-semibold text-lg">Documentation</h2>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    activeSection === section.id
                      ? 'bg-[#E97D3A] text-white'
                      : 'bg-background text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  <Icon className="size-4" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-background">
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
              {/* Merit Systems Section */}
              <section id="merit-systems" className="mb-16 scroll-mt-24">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5">
                    <Building2 className="size-6 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="font-bold text-3xl tracking-tight sm:text-4xl">Merit Systems</h1>
                    <p className="text-muted-foreground text-sm">Financial infrastructure for open source</p>
                  </div>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>About Merit Systems</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="leading-relaxed text-muted-foreground">
                      Merit Systems is building the financial stack for open source software. They provide tools for paying contributors, 
                      measuring impact, and handling compliance for open source projects worldwide.
                    </p>
                    <p className="leading-relaxed text-muted-foreground">
                      Founded with a vision to create sustainable open source ecosystems, Merit raised $10M in seed funding led by 
                      a16z and Blockchain Capital. Their mission is to enable instant, global payments to open source contributors 
                      using stablecoins, eliminating the complexity of traditional payment systems.
                    </p>
                  </CardContent>
                </Card>

                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <DollarSign className="mb-2 size-8 text-[#E97D3A]" />
                      <CardTitle className="text-lg">Instant Payments</CardTitle>
                      <CardDescription>
                        Pay contributors globally with stablecoins at minimal cost, no complex forms required.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Gauge className="mb-2 size-8 text-[#E97D3A]" />
                      <CardTitle className="text-lg">Impact Measurement</CardTitle>
                      <CardDescription>
                        Track and measure contributor impact across repositories with automated attribution.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Code className="mb-2 size-8 text-[#E97D3A]" />
                      <CardTitle className="text-lg">The Terminal</CardTitle>
                      <CardDescription>
                        Explore open source activity, find contributors, and understand project dynamics.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Rocket className="mb-2 size-8 text-[#E97D3A]" />
                      <CardTitle className="text-lg">Zero Bureaucracy</CardTitle>
                      <CardDescription>
                        Merit handles compliance, fund distribution, and paperwork so you can focus on code.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                <Button asChild variant="outline" className="gap-2">
                  <a href="https://www.merit.systems/" target="_blank" rel="noopener noreferrer">
                    Visit Merit Systems
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </section>

              <Separator className="my-12" />

              {/* Echo Section */}
              <section id="echo" className="mb-16 scroll-mt-24">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#E97D3A]/10 to-[#E97D3A]/5">
                    <Zap className="size-6 text-[#E97D3A]" />
                  </div>
                  <div>
                    <h1 className="font-bold text-3xl tracking-tight sm:text-4xl">Echo Platform</h1>
                    <p className="text-muted-foreground text-sm">Monetize AI apps in minutes</p>
                  </div>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>What is Echo?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="leading-relaxed text-muted-foreground">
                      Echo is Merit Systems&apos; flagship product that enables developers to monetize AI applications instantly. 
                      It provides a complete payment infrastructure specifically designed for AI-powered tools and services.
                    </p>
                    <p className="leading-relaxed text-muted-foreground">
                      With Echo, developers can integrate usage-based billing, handle payments, and manage user accounts without 
                      building complex payment systems. Perfect for micro-apps, AI tools, and SaaS products that need flexible 
                      monetization models.
                    </p>
                  </CardContent>
                </Card>

                <Card className="mb-6 border-[#E97D3A]/20 bg-gradient-to-br from-[#E97D3A]/5 to-transparent">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="size-5 text-[#E97D3A]" />
                      Key Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <ChevronRight className="mt-0.5 size-5 shrink-0 text-[#E97D3A]" />
                        <div>
                          <span className="font-medium">Per-Use Billing</span>
                          <p className="text-muted-foreground text-sm">Charge users based on actual usage, not subscriptions</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="mt-0.5 size-5 shrink-0 text-[#E97D3A]" />
                        <div>
                          <span className="font-medium">Instant Integration</span>
                          <p className="text-muted-foreground text-sm">Add monetization to your app in minutes with simple SDKs</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="mt-0.5 size-5 shrink-0 text-[#E97D3A]" />
                        <div>
                          <span className="font-medium">Built for AI</span>
                          <p className="text-muted-foreground text-sm">Optimized for AI applications and token-based pricing</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="mt-0.5 size-5 shrink-0 text-[#E97D3A]" />
                        <div>
                          <span className="font-medium">Global Payments</span>
                          <p className="text-muted-foreground text-sm">Accept payments from anywhere using stablecoins</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>How The Forge Uses Echo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="leading-relaxed text-muted-foreground">
                      The Forge is powered by Echo to provide seamless AI-powered 3D model search. Users can create an account, 
                      add balance, and pay per search query. Echo handles all the payment infrastructure, user authentication, 
                      and balance management.
                    </p>
                    <p className="leading-relaxed text-muted-foreground">
                      This allows The Forge to focus on delivering great search results while Echo takes care of monetization, 
                      billing, and user management automatically.
                    </p>
                  </CardContent>
                </Card>

                <Button asChild variant="outline" className="gap-2">
                  <a href="https://www.merit.systems/" target="_blank" rel="noopener noreferrer">
                    Learn More About Echo
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </section>

              <Separator className="my-12" />

              {/* 3D Model Providers Section */}
              <section id="3d-providers" className="mb-16 scroll-mt-24">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5">
                    <Layers className="size-6 text-purple-600" />
                  </div>
                  <div>
                    <h1 className="font-bold text-3xl tracking-tight sm:text-4xl">3D Model Providers</h1>
                    <p className="text-muted-foreground text-sm">Where to find 3D printable models</p>
                  </div>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="leading-relaxed text-muted-foreground">
                      The 3D printing community is supported by several major platforms that host millions of printable models. 
                      Each platform has its own strengths, community culture, and features. Whether you&apos;re looking for 
                      functional parts, artistic designs, or miniatures, these platforms have you covered.
                    </p>
                  </CardContent>
                </Card>

                {/* Thingiverse */}
                <Card className="mb-6 border-blue-500/20">
                  <CardHeader>
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5">
                        <Layers className="size-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Thingiverse</CardTitle>
                        <p className="text-muted-foreground text-sm">The original 3D printing community</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="leading-relaxed text-muted-foreground">
                      Founded in 2008 by MakerBot, Thingiverse is the oldest and largest 3D printing community. With over 2 million 
                      designs and 10 million users, it remains the go-to platform for finding free 3D models.
                    </p>
                    
                    <div>
                      <h4 className="mb-3 font-semibold">Key Features</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-blue-600" />
                          <span className="text-muted-foreground text-sm">Largest collection of free models with 2M+ designs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-blue-600" />
                          <span className="text-muted-foreground text-sm">Strong community with comments, remixes, and makes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-blue-600" />
                          <span className="text-muted-foreground text-sm">Collections and customizable designs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-blue-600" />
                          <span className="text-muted-foreground text-sm">Educational resources and tutorials</span>
                        </li>
                      </ul>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border p-3">
                        <p className="mb-1 font-medium text-sm">Best For</p>
                        <p className="text-muted-foreground text-sm">Hobbyists, educators, beginners</p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="mb-1 font-medium text-sm">License</p>
                        <p className="text-muted-foreground text-sm">Various (Creative Commons)</p>
                      </div>
                    </div>

                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href="https://www.thingiverse.com" target="_blank" rel="noopener noreferrer">
                        Visit Thingiverse
                        <ExternalLink className="size-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Printables */}
                <Card className="mb-6 border-orange-500/20">
                  <CardHeader>
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-500/5">
                        <Layers className="size-5 text-orange-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Printables</CardTitle>
                        <p className="text-muted-foreground text-sm">Modern platform by Prusa Research</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="leading-relaxed text-muted-foreground">
                      Launched by Prusa Research in 2022, Printables quickly became a major player with a modern interface, 
                      active contests, and a reward system for creators. It emphasizes quality and community engagement.
                    </p>
                    
                    <div>
                      <h4 className="mb-3 font-semibold">Key Features</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-orange-600" />
                          <span className="text-muted-foreground text-sm">Modern, fast interface with excellent search</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-orange-600" />
                          <span className="text-muted-foreground text-sm">Regular contests with prizes for creators</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-orange-600" />
                          <span className="text-muted-foreground text-sm">Integrated with PrusaSlicer for seamless workflow</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-orange-600" />
                          <span className="text-muted-foreground text-sm">Community points and rewards system</span>
                        </li>
                      </ul>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border p-3">
                        <p className="mb-1 font-medium text-sm">Best For</p>
                        <p className="text-muted-foreground text-sm">Quality-focused users, Prusa owners</p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="mb-1 font-medium text-sm">Models</p>
                        <p className="text-muted-foreground text-sm">500K+ high-quality designs</p>
                      </div>
                    </div>

                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href="https://www.printables.com" target="_blank" rel="noopener noreferrer">
                        Visit Printables
                        <ExternalLink className="size-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Thangs */}
                <Card className="mb-6 border-cyan-500/20">
                  <CardHeader>
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/10 to-cyan-500/5">
                        <Layers className="size-5 text-cyan-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Thangs</CardTitle>
                        <p className="text-muted-foreground text-sm">Modern search-focused platform</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="leading-relaxed text-muted-foreground">
                      Thangs is a modern platform built around powerful search and discovery. With advanced filtering and a clean interface,
                      it makes finding exactly what you need fast and easy. Great for both free and premium models.
                    </p>

                    <div>
                      <h4 className="mb-3 font-semibold">Key Features</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-cyan-600" />
                          <span className="text-muted-foreground text-sm">Advanced search with powerful filters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-cyan-600" />
                          <span className="text-muted-foreground text-sm">Clean, modern interface and fast navigation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-cyan-600" />
                          <span className="text-muted-foreground text-sm">Mix of free and premium content from creators</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-cyan-600" />
                          <span className="text-muted-foreground text-sm">Active community and regular new uploads</span>
                        </li>
                      </ul>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border p-3">
                        <p className="mb-1 font-medium text-sm">Best For</p>
                        <p className="text-muted-foreground text-sm">Discovery, search, variety</p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="mb-1 font-medium text-sm">Models</p>
                        <p className="text-muted-foreground text-sm">500K+ designs</p>
                      </div>
                    </div>

                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href="https://thangs.com" target="_blank" rel="noopener noreferrer">
                        Visit Thangs
                        <ExternalLink className="size-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* MakerWorld */}
                <Card className="mb-6 border-green-500/20">
                  <CardHeader>
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5">
                        <Layers className="size-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">MakerWorld</CardTitle>
                        <p className="text-muted-foreground text-sm">Bambu Lab's official model platform</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="leading-relaxed text-muted-foreground">
                      MakerWorld is Bambu Lab's official 3D model platform, optimized for their printers with pre-configured profiles
                      and slicing settings. Features a growing community and seamless integration with Bambu Studio.
                    </p>

                    <div>
                      <h4 className="mb-3 font-semibold">Key Features</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-green-600" />
                          <span className="text-muted-foreground text-sm">Optimized profiles for Bambu Lab printers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-green-600" />
                          <span className="text-muted-foreground text-sm">One-click printing with Bambu Studio integration</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-green-600" />
                          <span className="text-muted-foreground text-sm">Active community with contests and rewards</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-green-600" />
                          <span className="text-muted-foreground text-sm">200K+ models and rapidly growing</span>
                        </li>
                      </ul>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border p-3">
                        <p className="mb-1 font-medium text-sm">Best For</p>
                        <p className="text-muted-foreground text-sm">Bambu Lab printer owners</p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="mb-1 font-medium text-sm">Integration</p>
                        <p className="text-muted-foreground text-sm">Seamless Bambu Studio sync</p>
                      </div>
                    </div>

                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href="https://makerworld.com" target="_blank" rel="noopener noreferrer">
                        Visit MakerWorld
                        <ExternalLink className="size-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-[#E97D3A]/20 bg-gradient-to-br from-[#E97D3A]/5 to-transparent">
                  <CardHeader>
                    <CardTitle>Choosing the Right Platform</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <ChevronRight className="mt-0.5 size-5 shrink-0 text-[#E97D3A]" />
                        <div>
                          <span className="font-medium">For Variety</span>
                          <p className="text-muted-foreground text-sm">Thingiverse offers the largest selection across all categories</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="mt-0.5 size-5 shrink-0 text-[#E97D3A]" />
                        <div>
                          <span className="font-medium">For Modern Experience</span>
                          <p className="text-muted-foreground text-sm">Printables provides the best interface and active community engagement</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="mt-0.5 size-5 shrink-0 text-[#E97D3A]" />
                        <div>
                          <span className="font-medium">For Search & Discovery</span>
                          <p className="text-muted-foreground text-sm">Thangs excels at helping you find exactly what you need with powerful filters</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="mt-0.5 size-5 shrink-0 text-[#E97D3A]" />
                        <div>
                          <span className="font-medium">For Bambu Lab Printers</span>
                          <p className="text-muted-foreground text-sm">MakerWorld offers optimized profiles and seamless printing workflow</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              <Separator className="my-12" />

              {/* Printers Section */}
              <section id="printers" className="mb-16 scroll-mt-24">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5">
                    <Printer className="size-6 text-green-600" />
                  </div>
                  <div>
                    <h1 className="font-bold text-3xl tracking-tight sm:text-4xl">Our Printers</h1>
                    <p className="text-muted-foreground text-sm">Professional Bambu Lab 3D printers</p>
                  </div>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>About Our Equipment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="leading-relaxed text-muted-foreground">
                      We use Bambu Lab printers for their exceptional speed, reliability, and print quality. Both printers feature
                      advanced automation, CoreXY kinematics, and multi-material capabilities through the AMS system.
                    </p>
                  </CardContent>
                </Card>

                {/* X1 Carbon Collapsible */}
                <Collapsible className="mb-4">
                  <Card>
                    <CollapsibleTrigger className="w-full">
                      <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-left">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5">
                              <Printer className="size-5 text-green-600" />
                            </div>
                            <div>
                              <CardTitle className="text-2xl">Bambu Lab X1 Carbon</CardTitle>
                              <p className="text-muted-foreground text-sm">Flagship CoreXY printer with 16-color AMS</p>
                            </div>
                          </div>
                          <ChevronDown className="size-5 text-muted-foreground transition-transform [[data-state=open]>&]:rotate-180" />
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-4 pt-0">

                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <Gauge className="mb-2 size-8 text-green-600" />
                      <CardTitle className="text-lg">Lightning Fast</CardTitle>
                      <CardDescription>
                        Print speeds up to 500mm/s with 20,000mm/s² acceleration for rapid prototyping.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Layers className="mb-2 size-8 text-green-600" />
                      <CardTitle className="text-lg">Multi-Material</CardTitle>
                      <CardDescription>
                        AMS system supports up to 16 different filaments for complex, colorful prints.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Zap className="mb-2 size-8 text-green-600" />
                      <CardTitle className="text-lg">AI Detection</CardTitle>
                      <CardDescription>
                        Built-in camera with AI monitoring detects print failures and alerts you instantly.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Thermometer className="mb-2 size-8 text-green-600" />
                      <CardTitle className="text-lg">Active Chamber</CardTitle>
                      <CardDescription>
                        Heated chamber maintains optimal temperature for engineering-grade materials.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border p-3">
                        <p className="mb-1 font-medium text-sm">Build Volume</p>
                        <p className="text-muted-foreground text-sm">256 × 256 × 256 mm</p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="mb-1 font-medium text-sm">Max Speed</p>
                        <p className="text-muted-foreground text-sm">500 mm/s</p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="mb-1 font-medium text-sm">Layer Resolution</p>
                        <p className="text-muted-foreground text-sm">0.05 - 0.35 mm</p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="mb-1 font-medium text-sm">Nozzle Temp</p>
                        <p className="text-muted-foreground text-sm">Up to 300°C</p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="mb-1 font-medium text-sm">Bed Temp</p>
                        <p className="text-muted-foreground text-sm">Up to 110°C</p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="mb-1 font-medium text-sm">Connectivity</p>
                        <p className="text-muted-foreground text-sm">WiFi, LAN, USB</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6 border-green-600/20 bg-gradient-to-br from-green-600/5 to-transparent">
                  <CardHeader>
                    <CardTitle>Why Choose the X1C?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <ChevronRight className="mt-0.5 size-5 shrink-0 text-green-600" />
                        <span className="text-muted-foreground">Professional print quality with minimal post-processing needed</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="mt-0.5 size-5 shrink-0 text-green-600" />
                        <span className="text-muted-foreground">Automatic calibration and bed leveling save hours of manual setup</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="mt-0.5 size-5 shrink-0 text-green-600" />
                        <span className="text-muted-foreground">Cloud-based slicing and remote monitoring from anywhere</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="mt-0.5 size-5 shrink-0 text-green-600" />
                        <span className="text-muted-foreground">Active community support and regular firmware updates</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>

                {/* A1 Collapsible */}
                <Collapsible className="mb-6">
                  <Card>
                    <CollapsibleTrigger className="w-full">
                      <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-left">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5">
                              <Printer className="size-5 text-blue-600" />
                            </div>
                            <div>
                              <CardTitle className="text-2xl">Bambu Lab A1</CardTitle>
                              <p className="text-muted-foreground text-sm">Compact CoreXY printer with 4-color AMS</p>
                            </div>
                          </div>
                          <ChevronDown className="size-5 text-muted-foreground transition-transform [[data-state=open]>&]:rotate-180" />
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-4 pt-0">
                        <p className="leading-relaxed text-muted-foreground">
                          The Bambu Lab A1 is a compact and affordable CoreXY printer that delivers excellent print quality and reliability.
                          Equipped with an AMS Lite system for multi-color printing, it's perfect for hobbyists and makers.
                        </p>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Gauge className="size-5 text-blue-600" />
                              <span className="font-semibold">Fast &amp; Reliable</span>
                            </div>
                            <p className="text-muted-foreground text-sm">CoreXY kinematics with automatic calibration for consistent results</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Layers className="size-5 text-blue-600" />
                              <span className="font-semibold">4-Color AMS</span>
                            </div>
                            <p className="text-muted-foreground text-sm">AMS Lite system supports up to 4 different filaments</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Zap className="size-5 text-blue-600" />
                              <span className="font-semibold">AI Detection</span>
                            </div>
                            <p className="text-muted-foreground text-sm">Built-in camera with AI print failure detection</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Thermometer className="size-5 text-blue-600" />
                              <span className="font-semibold">Compact Design</span>
                            </div>
                            <p className="text-muted-foreground text-sm">Space-efficient footprint perfect for home workshops</p>
                          </div>
                        </div>

                        <div className="rounded-lg border-blue-600/20 bg-gradient-to-br from-blue-600/5 to-transparent p-4">
                          <h4 className="mb-3 font-semibold">Technical Specifications</h4>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <p className="mb-1 font-medium text-sm">Build Volume</p>
                              <p className="text-muted-foreground text-sm">256 × 256 × 256 mm</p>
                            </div>
                            <div>
                              <p className="mb-1 font-medium text-sm">Max Speed</p>
                              <p className="text-muted-foreground text-sm">500 mm/s</p>
                            </div>
                            <div>
                              <p className="mb-1 font-medium text-sm">Connectivity</p>
                              <p className="text-muted-foreground text-sm">WiFi, LAN, USB</p>
                            </div>
                            <div>
                              <p className="mb-1 font-medium text-sm">AMS Lite</p>
                              <p className="text-muted-foreground text-sm">4-color multi-material</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>

                <Button asChild variant="outline" className="gap-2">
                  <a href="https://bambulab.com" target="_blank" rel="noopener noreferrer">
                    Visit Bambu Lab
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </section>

              {/* Footer */}
              <footer className="mt-16 border-t bg-background px-4 py-6 sm:py-8">
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
        </main>
      </div>
    </div>
  );
}

