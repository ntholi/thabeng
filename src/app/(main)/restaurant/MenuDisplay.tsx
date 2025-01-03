import { Beverage } from '@/app/(admin)/admin/restaurant/beverages/Beverage';
import { Meal } from '@/app/(admin)/admin/restaurant/meals/Meal';
import {
  MenuItem,
  MenuItemType,
} from '@/app/(admin)/admin/restaurant/menu/MenuItem';
import { formatMoney } from '@/lib/utils/format';
import Container from '../core/Container';
import { Divider, cn } from '@nextui-org/react';
import { Salsa } from 'next/font/google';
import { Cocktail } from '@/app/(admin)/admin/restaurant/cocktails/Cocktail';
import { Gin } from '@/app/(admin)/admin/restaurant/gins/Gin';
import { Wine } from '@/app/(admin)/admin/restaurant/wine/Wine';
import React from 'react';

type Props = {
  menuType: MenuItemType | null;
  data: MenuItem[];
};

const font = Salsa({ weight: '400', subsets: ['latin'] });

export default function MenuDisplay({ data, menuType }: Props) {
  const withCategory = ['Meals', 'Beverages'];
  const groupedItems = React.useMemo(() => {
    if (!withCategory.includes(menuType!)) return null;
    const meals = data as Meal[];
    return meals.reduce(
      (acc, meal) => {
        if (!acc[meal.category]) {
          acc[meal.category] = [];
        }
        acc[meal.category].push(meal);
        return acc;
      },
      {} as Record<string, Meal[]>,
    );
  }, [data, menuType]);

  return (
    <Container width='md' className='pt-20'>
      <h1 className={cn(font.className, 'mb-8 text-5xl font-light')}>
        {menuType} Menu
      </h1>
      {withCategory.includes(menuType!) && groupedItems ? (
        Object.entries(groupedItems).map(([category, meals]) => (
          <div key={category} className='mb-12'>
            <h2 className={cn(font.className, 'mb-4 text-2xl text-gray-500')}>
              {category}
            </h2>
            <Divider className='mb-6' />
            <div className='grid grid-cols-1 gap-x-32 gap-y-6 sm:grid-cols-2'>
              {meals.map((meal) => (
                <MealDisplay key={meal.name} value={meal} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <>
          <Divider className='my-3' />
          <div className='grid grid-cols-1 gap-x-32 gap-y-5 sm:grid-cols-2'>
            {data.map((it) => (
              <ItemSwitch key={it.id} value={it} />
            ))}
          </div>
        </>
      )}
    </Container>
  );
}

function ItemSwitch({ value }: { value: MenuItem }) {
  switch (value.type) {
    case 'Meals':
      return <MealDisplay value={value as Meal} />;
    case 'Desserts':
      return <MealDisplay value={value as Meal} />;
    case 'Beverages':
      return <BeverageDisplay value={value as Beverage} />;
    case 'Cocktails':
      return <MealDisplay value={value as Cocktail} />;
    case 'Gin & Tonic':
      return <MealDisplay value={value as Gin} />;
    case 'Wine':
      return <WineDisplay value={value as Wine} />;
  }
}

function MealDisplay({ value }: { value: Meal | Cocktail | Gin }) {
  return (
    <div className='group -m-4 rounded-lg p-4 transition-colors hover:bg-gray-50'>
      <div>
        <div className='flex items-start justify-between'>
          <p className='font-semibold transition-colors group-hover:text-blue-900/90'>
            {value.name}
          </p>
          <p className='ml-4 text-sm font-medium text-blue-900/90'>
            {formatMoney(value.price)}
          </p>
        </div>
        <p className='mt-1 text-sm text-gray-500'>{value.description}</p>
      </div>
    </div>
  );
}

function BeverageDisplay({ value }: { value: Beverage }) {
  return (
    <div>
      <div className='flex justify-between'>
        <p className='font-semibold'>
          {value.name}
          {value.price}
        </p>
        <p className='text-sm text-blue-900/90'>{formatMoney(value.price)}</p>
      </div>
      <p className='text-sm text-gray-500'>{value.category}</p>
    </div>
  );
}

function WineDisplay({ value }: { value: Wine }) {
  return (
    <div>
      <div className='flex justify-between'>
        <p className='font-semibold'>
          {value.name} {value.year}
        </p>
        <p className='text-sm text-blue-900/90'>{formatMoney(value.price)}</p>
      </div>
      <p className='text-sm text-gray-500'>{value.description}</p>
    </div>
  );
}
