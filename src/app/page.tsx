'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowDownRight, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const articles = [
  {
    header: 'header1',
    content: 'content1',
  },
  {
    header: 'header2',
    content: 'content2',
  },
];

export default function Home() {
  const router = useRouter();

  const handleQuack = () => {
    router.push('/');
  };

  const handleScrollToTech = () => {
    const techSection = document.getElementById('tech-stack');
    if (techSection) {
      techSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-6">
          <Link
            href="/"
            className="text-xl font-medium text-black"
            onClick={handleQuack}
          >
            Quack ( •◡• )
          </Link>
          <Link href="/ducks">
            <Button className="rounded-md bg-black px-6 text-white transition-colors duration-200 hover:bg-black">
              See my ducks
            </Button>
          </Link>
        </div>
        <div className="border-b border-neutral-400"></div>
      </header>

      {/* Main Content */}
      <main className="mx-auto py-8">
        {/* Hero Section */}
        <section className="mt-10 text-center md:px-24 md:text-left">
          <h1 className="text-4xl font-bold md:text-left">
            Welcome to the Duck Farm
          </h1>
          <p className="mt-4 text-gray-600 md:mt-8">
            This is a simple page to see and add cute ducks.
            <br />
            Scroll to the 🦆 for the tech stack used and to visit other farms.
          </p>
          <Button
            variant="outline"
            className="mt-6 rounded-[5px] border border-black px-8 py-5 md:mt-10"
            onClick={handleScrollToTech}
          >
            I want to know the tech
            <ArrowDownRight className="-ml-1" />
          </Button>
        </section>

        {/* Farm Area */}
        <section id="farm" className="mt-25 w-full">
          <div className="aspect-video w-full border-y-2 border-black bg-[#FDFFE7]">
            Insert the duck photos here
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-10 grid grid-cols-1 gap-8 p-10 sm:grid-cols-2 md:grid-cols-4">
          {[
            { label: 'DUCKS OWNED', value: '28' },
            { label: 'VISITS', value: '160' },
            { label: 'DAYS TO TODAY', value: '31' },
            { label: 'NUMBER OF VISITS', value: '18,873' },
          ].map((stat, index) => (
            <Card
              key={index}
              className="col-span-1 rounded-[25px] border-2 border-black px-6 py-6"
            >
              <div className="text-sm leading-0 font-medium">{stat.label}</div>
              <div className="text-medium -mt-1 leading-0 font-semibold">
                {stat.value}
              </div>
            </Card>
          ))}
        </section>

        {/* Form Section */}
        <section className="mt-12 px-10 sm:p-0">
          <Card className="mx-auto gap-y-5 border border-black p-2 pb-6 text-center sm:max-w-100 md:max-w-140">
            <div className="aspect-square h-full bg-yellow-50"></div>
            <div className="relative">
              <Textarea
                placeholder="What kind of duck would you like to generate?"
                className="h-27 rounded-lg border border-black pr-16 md:h-17"
              />
              <Button
                variant="default"
                size="icon"
                className="absolute right-2 bottom-2 rounded-full bg-black p-2 hover:bg-black/90"
              >
                <ArrowUp className="h-4 w-4 text-white" />
              </Button>
            </div>
            <div className="xs:flex-row xs:items-center xs:justify-between xs:space-y-0 flex flex-col space-y-5 text-sm sm:space-x-2">
              <div className="flex items-center space-x-2">
                <div className="whitespace-nowrap">Name:</div>
                <Input className="w-40" />
              </div>
              <Button variant="default">Add to the farm ➡️</Button>
            </div>
          </Card>
        </section>

        {/* Tech Stack Section */}
        <section id="tech-stack" className="mt-20 bg-gray-50 p-8">
          <h2 className="text-2xl font-bold">Tech stack</h2>
          <p className="py-4 text-gray-600">
            This app is built with <b>NextJS version 15</b> with{' '}
            <b>BetterAuth</b>. The API is built with GraphQL and the DB is SQL.
            It is hosted on Vercel.
          </p>

          <div className="space-y-6">
            {articles.map((article, index) => (
              <div id={`article-${index}`}>
                <h3 className="font-semibold">{article.header}</h3>
                <p className="text-gray-600">{article.content}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mx-auto mt-8 mb-20 px-20">
        <div className="grid grid-cols-2">
          <div className="justify-self-start">
            <Link
              href="/portfolio"
              className="text-gray-600 hover:text-gray-900"
            >
              Visit my full portfolio
            </Link>
            <div className="mt-12">
              <div className="flex space-x-8">
                <Link
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="h-8 w-8 text-gray-500 transition-colors hover:text-gray-900">
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>GitHub</title>
                      <path
                        fill="currentColor"
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                      />
                    </svg>
                  </div>
                </Link>
                <Link
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="h-8 w-8 text-gray-500 transition-colors hover:text-gray-900">
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>LinkedIn</title>
                      <path
                        fill="currentColor"
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                      />
                    </svg>
                  </div>
                </Link>
                <Link
                  href="https://instagram.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="h-8 w-8 text-gray-500 transition-colors hover:text-gray-900">
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Instagram</title>
                      <path
                        fill="currentColor"
                        d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-4 justify-self-end text-gray-600">
            <div className="">Topic 1</div>
            <div className="">Topic 2</div>
            <div className="">Topic 3</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
