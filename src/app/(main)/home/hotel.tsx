import { roomRepository } from '@/app/(admin)/admin/rooms/repository';
import React from 'react';
import Container from '../core/Container';
import { cn } from '@/lib/utils';
import { Card, CardBody, CardHeader, Image, Link } from '@nextui-org/react';
import NextImage from 'next/image';
import { formatMoney } from '@/lib/utils/format';
import { Room } from '@/app/(admin)/admin/rooms/Room';

type Props = {
  className?: string;
};

export default async function Hotel({ className }: Props) {
  const rooms = await roomRepository.getAll();
  return (
    <Container as={'section'} id='hotel' className={cn('h-dvh', className)}>
      <div className='col-span-12  my-10'>
        <h1 className=' text-4xl font-bold text-center'>Thabeng Hotel</h1>
      </div>
      <div className='col-span-12'>
        <div className='grid grid-cols-12 gap-5'>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </Container>
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
        <small className='text-default-500'>{formatMoney(room.price)}</small>
        <h4 className='font-bold text-large'>{room.name}</h4>
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <Image
          alt='Card background'
          className='object-cover rounded-xl h-full w-full'
          src={room.images[0]}
          as={NextImage}
          width={500}
          height={500}
        />
      </CardBody>
    </Card>
  );
}
