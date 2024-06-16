'use client';
import { cn } from '@/lib/utils';
import { formatMoney } from '@/lib/utils/format';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
  Spinner,
} from '@nextui-org/react';
import { Salsa } from 'next/font/google';
import NextImage from 'next/image';
import React, { useEffect } from 'react';
import Container from '../core/Container';
import { menuitemRepository } from '@/app/(admin)/admin/restaurant/repository';
import { MenuItem } from '@/app/(admin)/admin/restaurant/MenuItem';

type Props = {
  className?: string;
};

const font = Salsa({ weight: '400', subsets: ['latin'] });

export default function Restaurant({ className }: Props) {
  const [menuitems, setMenuItems] = React.useState<MenuItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    menuitemRepository
      .getAll()
      .then(setMenuItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div id='restaurant' className='min-h-dvh bg-gray-50'>
      <Container
        as={'section'}
        width='lg'
        className={cn('bg-white min-h-[80dvh] rounded-sm', className)}
      >
        <div className='col-span-12 my-8'>
          <h1
            className={cn(font.className, 'text-6xl font-bold text-blue-900')}
          >
            Restaurant
          </h1>
          <p className='text-sm text-foreground-500'>
            Savor exquisite flavors with our diverse and delightful menu.
          </p>
        </div>
        {loading ? (
          <div className='flex justify-center mt-10'>
            <Spinner size='lg' />
          </div>
        ) : (
          <div className='col-span-12'>
            <div className='grid grid-cols-12 gap-5'>
              {menuitems.map((menuitem) => (
                <MenuItemCard key={menuitem.id} menuitem={menuitem} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

function MenuItemCard({ menuitem }: { menuitem: MenuItem }) {
  return (
    <Card className='py-4 col-span-6 sm:col-span-4 md:col-span-3'>
      <CardBody className='overflow-visible py-2 items-center'>
        <Image
          alt='Card background'
          className='object-cover rounded-full size-36 border p-1'
          src={menuitem.image}
          as={NextImage}
          width={500}
          height={500}
        />
      </CardBody>
      <CardFooter className='flex-col'>
        <h3>{menuitem.name}</h3>
        <p className='text-sm text-center mt-2 text-foreground-400'>
          {menuitem.description}
        </p>
        <p className='text-center mt-2 text-sm font-bold text-green-500'>
          {formatMoney(menuitem.price)}
        </p>
      </CardFooter>
    </Card>
  );
}
