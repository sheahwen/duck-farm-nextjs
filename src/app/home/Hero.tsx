'use client';

import ScrollToTechButton from './ScrollToTechButton';

export default function Hero() {
  // Calculate days from June 12, 2025
  const targetDate = new Date('2025-06-12');
  const today = new Date();
  const diffTime = today.getTime() - targetDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <section className="relative mt-16 overflow-hidden px-4 py-12 md:mt-20 md:px-8 lg:px-16">
      {/* Subtle background elements with animation */}
      <div className="animate-blob absolute -top-4 -right-4 h-32 w-32 rounded-full bg-gray-50 opacity-80 blur-3xl"></div>
      <div className="animate-blob animation-delay-2000 absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-gray-50 opacity-80 blur-3xl"></div>
      <div className="animate-blob animation-delay-4000 absolute top-1/4 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-gray-50 opacity-80 blur-2xl"></div>

      <div className="relative mx-auto max-w-4xl">
        {/* Welcome Text */}
        <div className="flex flex-col items-center space-y-8 md:items-start">
          {/* Title Section */}
          <div className="flex w-full flex-col items-center gap-4 md:flex-row md:justify-start">
            <span className="order-2 animate-bounce text-4xl md:order-1">
              🦆
            </span>
            <h1 className="order-1 text-center md:order-2 md:text-left">
              <span className="animate-fade-in block text-4xl font-medium text-gray-600 md:text-5xl lg:text-6xl">
                welcome to
              </span>
              <span className="animate-slide-up mt-2 block text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                duck farm
              </span>
            </h1>
            <span className="animation-delay-1000 order-3 animate-bounce text-4xl">
              🦆
            </span>
          </div>

          {/* Description */}
          <div className="w-full max-w-2xl text-center md:text-left">
            <p className="animate-fade-in animation-delay-300 text-lg text-gray-600 md:text-xl">
              a cozy corner of the internet where you can collect, customize,
              and care for your very own virtual ducks
            </p>
            <p className="animate-fade-in animation-delay-500 mt-2 text-sm text-gray-500">
              scroll down to explore the tech stack and visit other farms
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex w-full flex-col items-center gap-4 md:flex-row md:justify-start">
            <ScrollToTechButton />
          </div>

          {/* Stats Section */}
          <div className="animate-fade-in animation-delay-700 w-full border-t border-gray-100 pt-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="group flex flex-col items-center rounded-lg bg-gray-50 p-4 text-center transition-all hover:scale-105 hover:shadow-md md:items-start md:text-left">
                <div className="text-2xl font-semibold text-gray-900 transition-transform group-hover:scale-110">
                  142
                </div>
                <div className="text-sm text-gray-600">unique ducks</div>
              </div>
              <div className="group flex flex-col items-center rounded-lg bg-gray-50 p-4 text-center transition-all hover:scale-105 hover:shadow-md md:items-start md:text-left">
                <div className="text-2xl font-semibold text-gray-900 transition-transform group-hover:scale-110">
                  24/7
                </div>
                <div className="text-sm text-gray-600">duck care</div>
              </div>
              <div className="group flex flex-col items-center rounded-lg bg-gray-50 p-4 text-center transition-all hover:scale-105 hover:shadow-md md:items-start md:text-left">
                <div className="text-2xl font-semibold text-gray-900 transition-transform group-hover:scale-110">
                  {diffDays}
                </div>
                <div className="text-sm text-gray-600">days in operation</div>
              </div>
              <div className="group flex flex-col items-center rounded-lg bg-gray-50 p-4 text-center transition-all hover:scale-105 hover:shadow-md md:items-start md:text-left">
                <div className="text-2xl font-semibold text-gray-900 transition-transform group-hover:scale-110">
                  31
                </div>
                <div className="text-sm text-gray-600">farmers</div>
              </div>
            </div>
          </div>

          {/* Decorative elements with animation */}
          <div className="animate-float pointer-events-none absolute top-1/4 -right-8 hidden text-4xl text-gray-200 md:block">
            🌿
          </div>
        </div>
      </div>
    </section>
  );
}
