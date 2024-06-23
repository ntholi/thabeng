import { MealTime } from '@/app/(admin)/admin/restaurant/meal-times/MealTime';
import { mealtimeRepository } from '@/app/(admin)/admin/restaurant/meal-times/repository';
import { restaurantPageRepository } from '@/app/(admin)/admin/restaurant/page/repository';
import { cn } from '@/lib/utils';
import { formatMoney } from '@/lib/utils/format';
import { Spinner } from '@nextui-org/react';
import {
  IconBread,
  IconEggCracked,
  IconLollipop,
  IconSalad,
  IconSoup,
} from '@tabler/icons-react';
import { Salsa } from 'next/font/google';
import Image from 'next/image';
import React, { Suspense } from 'react';

const font = Salsa({ weight: '400', subsets: ['latin'] });

export default async function Header() {
  const page = await restaurantPageRepository.getRestaurantPage();

  return (
    <>
      <header className='relative'>
        <Image
          src={page?.backgroundImage || ''}
          width={1920}
          height={1080}
          alt='Banner'
          className='h-[60vh] w-full object-cover'
        />
        <div className='absolute inset-0 flex h-full flex-col items-center justify-center bg-black/30 px-6 py-5 text-white'>
          <h1 className={cn(font.className, 'text-5xl font-bold sm:text-7xl')}>
            {page?.heading}
          </h1>
          <p className='mt-2'>{page?.subheading}</p>
        </div>
      </header>
      <Suspense
        fallback={
          <div className='flex justify-center'>
            <Spinner />
          </div>
        }
      >
        <MealTimeDisplay />
      </Suspense>
    </>
  );
}

async function MealTimeDisplay() {
  const mealTimes = await mealtimeRepository.getAll();
  return (
    <section className='-top-28 mx-auto flex w-full bg-blue-900/95 text-white md:relative md:w-[60vw]'>
      {mealTimes.map((it, i) => (
        <React.Fragment key={it.id}>
          <div className='flex flex-1 flex-col items-center gap-1 p-4 sm:gap-2 sm:px-5 sm:py-10'>
            <Icon mealName={it.name} />
            <h4>{it.name}</h4>
            <div className='flex items-center gap-2'>
              <p className='text-sm text-green-200'>{formatMoney(it.price)}</p>
              <span className='flex'>•</span>
              <p className='text-xs sm:text-sm'>
                {it.startTime} - {it.endTime}
              </p>
            </div>
            <p className='hidden text-center text-xs sm:block'>
              {it.description}
            </p>
          </div>
          {i < mealTimes.length - 1 && (
            <div className='border-r border-zinc-300' />
          )}
        </React.Fragment>
      ))}
    </section>
  );
}

function Icon({ mealName }: { mealName: MealTime['name'] }) {
  const size = '2rem';
  switch (mealName) {
    case 'Breakfast':
      return <IconBread size={size} />;
    case 'Lunch':
      return <IconSalad size={size} />;
    case 'Brunch':
      return <IconEggCracked size={size} />;
    case 'Dinner':
      return <IconSoup size={size} />;
    case 'Snack':
      return <IconLollipop size={size} />;
  }
}
