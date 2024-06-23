import React, { Suspense } from 'react';
import Image from 'next/image';
import { restaurantPageRepository } from '@/app/(admin)/admin/restaurant/page/repository';
import { mealtimeRepository } from '@/app/(admin)/admin/restaurant/meal-times/repository';
import { Spinner } from '@nextui-org/react';
import { MealTime } from '@/app/(admin)/admin/restaurant/meal-times/MealTime';
import {
  IconBread,
  IconDogBowl,
  IconEggCracked,
  IconLollipop,
  IconMeat,
  IconSalad,
  IconSoup,
} from '@tabler/icons-react';

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
          className='h-[55vh] w-full object-cover'
        />
        <div className='absolute inset-0 flex h-full flex-col items-center justify-center bg-black/30 px-6 py-5 text-white'>
          <h1 className='text-5xl font-bold sm:text-7xl'>{page?.heading}</h1>
          <p className='text-xl'>{page?.subheading}</p>
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
    <section className='-top-24 mx-auto flex w-full bg-blue-900/95 text-white md:relative md:w-[60vw]'>
      {mealTimes.map((it) => (
        <div
          key={it.id}
          className='flex flex-1 flex-col items-center gap-2 py-14'
        >
          <Icon mealName={it.name} />
          <h4 className='text-sm'>{it.name}</h4>
          <p className='text-xs'>
            {it.startTime} - {it.endTime}
          </p>
        </div>
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
