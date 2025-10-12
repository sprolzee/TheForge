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
  description: 'AI-powered chat with 3D model search on Thingiverse',
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
          <Header title="The Forge" />
          <main className="min-h-0 flex-1 overflow-hidden">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
