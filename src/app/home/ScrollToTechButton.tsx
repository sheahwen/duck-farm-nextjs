'use client';

import { Button } from '@/components/ui/button';
import { ArrowDownRight } from 'lucide-react';

export default function ScrollToTechButton() {
  const handleScrollToTech = () => {
    const techSection = document.getElementById('tech-stack');
    if (techSection) {
      techSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button
      variant="outline"
      className="mt-6 rounded-[5px] border border-black px-8 py-5 lowercase md:mt-10"
      onClick={handleScrollToTech}
    >
      I want to know the tech
      <ArrowDownRight className="-ml-1" />
    </Button>
  );
}
