import { Card } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';
import Farm from './Farm';
import ImageGenerationCard from './ImageGenerationCard';
import ScrollToTechButton from './ScrollToTechButton';
import TechStack from './TechStack';

const stats = [
  { label: 'DUCKS OWNED', value: '28' },
  { label: 'VISITS', value: '160' },
  { label: 'DAYS TO TODAY', value: '31' },
  { label: 'NUMBER OF VISITS', value: '18,873' },
];

export default function HomePage() {
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
          <ScrollToTechButton />
        </section>

        {/* Farm Area */}
        <section id="farm" className="mt-25 w-full">
          <Farm />
        </section>

        {/* Stats Section */}
        <section className="mt-10 grid grid-cols-1 gap-8 p-10 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
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
          <TechStack />
        </section>
      </main>
    </div>
  );
}
