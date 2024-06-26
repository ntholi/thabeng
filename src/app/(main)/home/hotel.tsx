'use client';
import { Room } from '@/app/(admin)/admin/rooms/Room';
import { roomRepository } from '@/app/(admin)/admin/rooms/repository';
import { cn } from '@/lib/utils';
import { formatMoney } from '@/lib/utils/format';
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Link,
  Spinner,
} from '@nextui-org/react';
import { Salsa } from 'next/font/google';
import NextImage from 'next/image';
import React, { useEffect } from 'react';
import Container from '../core/Container';

type Props = {
  className?: string;
};

const font = Salsa({ weight: '400', subsets: ['latin'] });

export default function Hotel({ className }: Props) {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    roomRepository
      .getAll()
      .then(setRooms)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div id='hotel' className='min-h-dvh pt-20'>
      <Container
        as={'section'}
        className={cn('min-h-[80dvh] rounded-sm bg-white shadow-md', className)}
      >
        <div className='col-span-12 my-8'>
          <p className='text-center text-xs uppercase text-foreground-400'>
            Our rooms
          </p>
          <h1
            className={cn(
              font.className,
              'text-center text-6xl font-bold text-blue-900',
            )}
          >
            Hotel
          </h1>
        </div>
        {loading ? (
          <div className='mt-10 flex justify-center'>
            <Spinner size='lg' />
          </div>
        ) : (
          <div className='col-span-12'>
            <div className='grid grid-cols-12 gap-5'>
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

function RoomCard({ room }: { room: Room }) {
  return (
    <Card
      className='col-span-12 py-4 sm:col-span-6 md:col-span-4'
      isPressable
      as={Link}
      href={`/rooms/${room.id}`}
    >
      <CardHeader className='flex-col items-start px-4 pb-0 pt-2'>
        <small className='text-green-500'>{formatMoney(room.price)}</small>
        <h4 className='text-large font-bold'>{room.name}</h4>
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <Image
          alt='Card background'
          className='h-48 w-full rounded-xl object-cover sm:h-52'
          src={room.images[0]}
          as={NextImage}
          width={500}
          height={500}
        />
      </CardBody>
    </Card>
  );
}
