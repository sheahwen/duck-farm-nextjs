import { Toaster } from '@/components/ui/sonner';
import Hero from './Hero';
import Farm from './Farm';
import ImageGenerationCard from './ImageGenerationCard';
import TechStack from './TechStack';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Toaster position="bottom-center" />
      {/* Main Content */}
      <main className="mx-auto py-8">
        <Hero />

        {/* Farm Area */}
        <section id="farm" className="mt-25 w-full">
          <Farm />
        </section>

        {/* Form Section */}
        <section className="mt-24 px-10 sm:p-0">
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
