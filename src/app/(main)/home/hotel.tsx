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
        className={cn('bg-white min-h-[80dvh] rounded-sm', className)}
      >
        <div className='col-span-12 my-8'>
          <p className='text-center text-xs text-foreground-400 uppercase'>
            Our rooms
          </p>
          <h1
            className={cn(
              font.className,
              'text-6xl font-bold text-center text-blue-900'
            )}
          >
            Hotel
          </h1>
        </div>
        {loading ? (
          <div className='flex justify-center mt-10'>
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
      className='py-4 col-span-12 sm:col-span-6 md:col-span-4'
      isPressable
      as={Link}
      href={`/rooms/${room.id}`}
    >
      <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
        <small className='text-green-500'>{formatMoney(room.price)}</small>
        <h4 className='font-bold text-large'>{room.name}</h4>
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <Image
          alt='Card background'
          className='object-cover rounded-xl h-48 sm:h-52 w-full'
          src={room.images[0]}
          as={NextImage}
          width={500}
          height={500}
        />
      </CardBody>
    </Card>
  );
}
