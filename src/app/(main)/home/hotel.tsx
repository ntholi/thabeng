import { roomRepository } from '@/app/(admin)/admin/rooms/repository';
import React from 'react';
import Container from '../core/Container';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export default async function Hotel({ className }: Props) {
  const rooms = await roomRepository.getAll();
  return (
    <Container as={'section'} className={cn('h-dvh', className)}>
      <div className='col-span-12 h-1/2 my-10'>
        <h1 className=' text-4xl font-bold text-center'>Thabeng Hotel</h1>
      </div>
      <div className='col-span-12 h-1/2 '>
        <div className='grid grid-cols-12 gap-5'>
          {rooms.map((room) => (
            <div
              key={room.id}
              className='col-span-12 sm:col-span-6 md:col-span-4'
            >
              <img
                src={room.images[0]}
                alt={room.name}
                className='w-full h-40 object-cover'
              />
              <h3 className=' text-xl font-bold'>{room.name}</h3>
              <p className=''>{room.description}</p>
              <p className=''>R {room.price}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
