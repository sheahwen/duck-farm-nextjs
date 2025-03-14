import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found | Duck Farm',
  description: 'Sorry, the page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="container mx-auto py-20 text-center">
      <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-8 text-gray-600">
        Oops! Looks like this duck flew away.
      </p>
      <Link href="/" className="text-black hover:underline">
        Return to Home
      </Link>
    </div>
  );
}
