'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavigationButton = () => {
  const pathname = usePathname();
  const { user } = useUser();

  console.log('user', user);

  const defaultConfig = {
    href: '/home',
    bgColor: 'bg-orange-400',
    fontColor: 'text-black',
    hoverBgColor: 'hover:bg-orange-500',
    hoverFontColor: 'hover:text-white',
    text: 'Back to farm',
  };
  const config = {
    home: {
      href: `/farms/${user?.id || '1'}`,
      bgColor: 'bg-black',
      fontColor: 'text-white',
      hoverBgColor: 'hover:bg-black',
      hoverFontColor: 'hover:text-white',
      text: 'See my ducks',
    },
    farms: defaultConfig,
  };
  const firstPath = pathname.split('/')[1] || '';
  const currentConfig =
    config[firstPath as keyof typeof config] ?? defaultConfig;

  return (
    <div className="flex gap-x-4">
      <Link href={currentConfig.href}>
        <Button
          className={cn(
            `w-32 cursor-pointer rounded-md px-6 text-sm lowercase transition-colors duration-200 hover:cursor-pointer`,
            currentConfig.bgColor,
            currentConfig.fontColor,
            currentConfig.hoverBgColor,
            currentConfig.hoverFontColor
          )}
        >
          {currentConfig.text}
        </Button>
      </Link>
    </div>
  );
};

export default NavigationButton;
