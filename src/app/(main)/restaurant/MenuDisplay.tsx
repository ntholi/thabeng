import { Meal } from '@/app/(admin)/admin/restaurant/meals/Meal';
import {
  MenuItem,
  MenuItemType,
} from '@/app/(admin)/admin/restaurant/menu/MenuItem';
import React from 'react';

type Props = {
  data: MenuItem[];
};

export default function MenuDisplay({ data }: Props) {
  return (
    <div className='gird-2 grid gap-10'>
      {data.map((it) => (
        <ItemSwitch value={it} />
      ))}
    </div>
  );
}

function ItemSwitch({ value }: { value: MenuItem }) {
  switch (value.type) {
    case 'Meals':
      return <MealDisplay value={value as Meal} />;
    case 'Desserts':
    case 'Beverages':
    case 'Cocktails':
    case 'Gin & Tonic':
    case 'Wine':
  }
}

function MealDisplay({ value }: { value: Meal }) {
  return (
    <div className='flex justify-between'>
      <p>{value.name}</p>
      <p>{value.price}</p>
    </div>
  );
}
