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

type Props = {
  menuType: MenuItemType | null;
  data: MenuItem[];
};

const font = Salsa({ weight: '400', subsets: ['latin'] });

export default function MenuDisplay({ data, menuType }: Props) {
  return (
    <Container width='md' className='pt-20'>
      <h1 className={cn(font.className, 'text-5xl font-light')}>
        {menuType} Menu
      </h1>
      <Divider className='my-3' />
      <div className='grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2'>
        {data.map((it) => (
          <ItemSwitch value={it} />
        ))}
      </div>
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
    case 'Gin & Tonic':
    case 'Wine':
  }
}

function MealDisplay({ value }: { value: Meal }) {
  return (
    <div>
      <div className='flex justify-between'>
        <p className='font-semibold'>{value.name}</p>
        <p className='text-sm text-blue-900/90'>{formatMoney(value.price)}</p>
      </div>
      <p className='text-sm text-gray-500'>{value.description}</p>
    </div>
  );
}

function BeverageDisplay({ value }: { value: Beverage }) {
  return (
    <div className='flex justify-between'>
      <div>
        <p>
          <span>{value.name}</span>
          <span>{value.size}</span>
        </p>
        <p>{value.category}</p>
      </div>
      <p>{value.price}</p>
    </div>
  );
}
