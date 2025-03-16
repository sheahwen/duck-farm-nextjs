'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowDownRight, ArrowUp } from 'lucide-react';

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
  const handleScrollToTech = () => {
    const techSection = document.getElementById('tech-stack');
    if (techSection) {
      techSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
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
              <div key={`article-${index}`}>
                <h3 className="font-semibold">{article.header}</h3>
                <p className="text-gray-600">{article.content}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
