import React from 'react';

const articles = [
  {
    header: 'Frontend',
    content:
      'Built with Next.js 15 using the App Router architecture, leveraging both React Server Components and Client Components where needed. Uses Tailwind CSS and shadcn/ui to build a collection of accessible components and responsive UI.',
  },
  {
    header: 'Authentication & Security',
    content:
      'Implements Clerk for secure user authentication and session management. Features include OAuth integration and user management. A webhook is used to sync user data from Clerk to the database.',
  },
  {
    header: 'Backend and database',
    content:
      'API endpoints are powered by Express.js application, using MongoDB as the NoSQL database solution. Duck images are stored in Google Cloud Storage buckets.',
  },
  {
    header: 'Deployment & Infrastructure',
    content:
      'Both the frontend Next.js app and backend Express.js app are hosted on Vercel for seamless deployment. Implements CI/CD pipelines for automated deployment.',
  },
];

export default function TechStack() {
  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50/50 to-white" />

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold text-transparent">
            Tech Stack
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            This duck farm works as a playground for me to explore hands-on
            experience on{' '}
            <span className="font-medium text-gray-900">Next.js 15</span> with
            the App Router architecture. It is built with the following
            technologies:
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((article, index) => (
            <div
              key={`article-${index}`}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 transition-all duration-300 hover:shadow-lg"
            >
              {/* Card gradient border */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Content */}
              <div className="relative">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  {article.header}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {article.content}
                </p>
              </div>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-gray-200 to-gray-300 transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
