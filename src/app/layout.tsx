import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import NavigationButton from './features/layout/NavigationButton';
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
  title: {
    default: 'Duck Farm',
    template: '%s | Duck Farm',
  },
  description: 'A simple page to see and add cute ducks',
  icons: {
    icon: '/duck-sunglasses.png',
    apple: '/duck-sunglasses.png',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header */}
        <header className="w-full bg-white">
          <div className="container mx-auto flex items-center justify-between px-2 py-4">
            <Link href="/" className="text-lg font-medium text-black">
              Quack ( •◡• )
            </Link>
            <NavigationButton />
          </div>
          <div className="border-b border-neutral-400"></div>
        </header>
        {children}
      </body>
    </html>
  );
}
