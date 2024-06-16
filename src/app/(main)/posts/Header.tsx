import { categoryRepository } from '@/app/(admin)/admin/categories/repository';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import Category from '../../base/text/Category';

type Props = {
  id: string;
};

export default function Header({ id }: Props) {
  return (
    <header>
      <Suspense fallback={<Skeleton className='h-12 w-[250px]' />}>
        <Display id={id} />
      </Suspense>
    </header>
  );
}

async function Display({ id }: Props) {
  const category = await categoryRepository.get(id);
  return (
    <Category className='text-center text-4xl text-black/90'>
      {category?.name}
    </Category>
  );
}
