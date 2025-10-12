import Header from '@/app/_components/header';
import { Providers } from '@/providers';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'The Forge - AI 3D Model Search',
  description: 'AI-powered chat with 3D model search on Thingiverse, Thangs, and Printables',
  icons: {
    icon: '/forge-favicon.png',
    shortcut: '/forge-favicon.png',
    apple: '/forge-favicon.png',
  },
  openGraph: {
    title: 'The Forge - AI 3D Model Search',
    description: 'AI-powered chat with 3D model search on Thingiverse, Thangs, and Printables',
    images: ['/forge-favicon.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'The Forge - AI 3D Model Search',
    description: 'AI-powered chat with 3D model search on Thingiverse, Thangs, and Printables',
    images: ['/forge-favicon.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex h-screen flex-col antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
