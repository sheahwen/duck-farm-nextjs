'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';
import { ArrowDownRight } from 'lucide-react';
import Image from 'next/image';
import ImageGenerationCard from './features/ImageGenerationCard';

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

export default function HomePage() {
  const handleScrollToTech = () => {
    const techSection = document.getElementById('tech-stack');
    if (techSection) {
      techSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="bottom-center" />
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
          <div className="relative aspect-video bg-red-500">
            <Image
              src="/duck-farm.png"
              alt="Duck Farm"
              fill
              className="object-cover"
            />
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
          <ImageGenerationCard />
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
