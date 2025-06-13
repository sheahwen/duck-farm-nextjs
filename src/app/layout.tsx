import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import AuthButtons from './layout/AuthButtons';

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
    <ClerkProvider>
      <Analytics />
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* Header */}
          <header className="w-full bg-white">
            <div className="container mx-auto flex items-center justify-between px-2 py-4">
              <Link href="/" className="text-lg font-medium text-black">
                quack ( •◡• )
              </Link>
              <AuthButtons />
            </div>
            <div className="border-b border-neutral-400"></div>
          </header>

          {children}

          {/* Footer */}
          <footer className="mx-auto mt-20 border-t border-gray-100 bg-white px-4 py-12">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {/* About Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium tracking-wider text-gray-900 lowercase">
                    about
                  </h3>
                  <p className="text-sm text-gray-600 lowercase">
                    just a duck enthusiast who loves to code trying to build an
                    app
                  </p>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium tracking-wider text-gray-900 lowercase">
                    quick links
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/home"
                        className="text-sm text-gray-600 lowercase transition-colors hover:text-gray-900"
                      >
                        home page
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/farms/1"
                        className="text-sm text-gray-600 lowercase transition-colors hover:text-gray-900"
                      >
                        my ducks
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://sheahwen-portfolio.netlify.app/about-me"
                        className="text-sm text-gray-600 lowercase transition-colors hover:text-gray-900"
                      >
                        ⭐️ more about me ⭐️
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Other Projects */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium tracking-wider text-gray-900 lowercase">
                    other projects
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="https://github.com/sheahwen/time-is-money"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 lowercase transition-colors hover:text-gray-900"
                      >
                        time is money productivity app
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://sheahwen-portfolio.netlify.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 lowercase transition-colors hover:text-gray-900"
                      >
                        portfolio site
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/sheahwenliaw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 lowercase transition-colors hover:text-gray-900"
                      >
                        more on github
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Connect */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium tracking-wider text-gray-900 lowercase">
                    connect
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/sheahwen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors hover:text-gray-600"
                    >
                      <span className="sr-only">github</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com/in/sheahwen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors hover:text-gray-600"
                    >
                      <span className="sr-only">linkedin</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="mailto:sheahwen@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors hover:text-gray-600"
                    >
                      <span className="sr-only">email</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="mt-12 border-t border-gray-100 pt-8 text-center">
                <p className="text-sm text-gray-500 lowercase">
                  built with 🦆 by{' '}
                  <span className="font-medium text-gray-900">
                    Liaw Sheah Wen
                  </span>
                </p>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
