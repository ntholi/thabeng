import { Meal } from '@/app/(admin)/admin/restaurant/meals/Meal';
import { MenuItem } from '@/app/(admin)/admin/restaurant/menu/MenuItem';

type Props = {
  data: MenuItem[];
};

export default function MenuDisplay({ data }: Props) {
  return (
    <div className='col-span-1 grid gap-10 sm:col-span-2'>
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
      <div>
        <p>{value.name}</p>
        <p>{value.description}</p>
      </div>
      <p>{value.price}</p>
    </div>
  );
}
