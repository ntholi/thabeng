import { eventRepository } from '@/app/(admin)/admin/events/repository';
import { notFound } from 'next/navigation';
import React from 'react';
import Container from '../../core/Container';
import { Button, Divider, cn } from '@nextui-org/react';
import { Salsa } from 'next/font/google';
import Image from 'next/image';
import RawHTML from '@/components/RawHTML';
import { dateTime } from '@/lib/utils/format';
import { IconCalendar, IconCheck } from '@tabler/icons-react';

type Props = { params: { id: string } };

async function getEvent(id: string) {
  return await eventRepository.get(id);
}
const font = Salsa({ weight: '400', subsets: ['latin'] });

export async function generateMetadata({ params: { id } }: Props) {
  const event = await getEvent(id);
  return {
    title: event?.name,
    description: event?.description,
    image: event?.poster,
  };
}

export default async function EventPage({ params: { id } }: Props) {
  const event = await getEvent(id);
  if (!event) {
    return notFound();
  }

  return (
    <main className='flex flex-col items-center sm:mt-8'>
      <Container width='lg' className='flex flex-col gap-3'>
        <h1
          className={cn(
            font.className,
            'text-4xl font-bold text-blue-900 sm:text-6xl',
          )}
        >
          {event.name}
        </h1>
        <div className='flex justify-between'>
          <p className='flex items-center gap-2'>
            <IconCalendar size='1.2rem' />
            <span>{dateTime(event.date)}</span>
          </p>
          <Button color='primary' variant='flat'>
            Interested
          </Button>
        </div>
        <figure className='sm:w-full'>
          <Image
            src={event.poster}
            alt={event.name}
            className='h-auto w-full object-cover shadow-lg sm:h-[60vh]'
            width={1400}
            height={1400}
          />
        </figure>
      </Container>
      <Container as='section' width='md'>
        <Divider className='my-6' />
        <RawHTML
          className='text-black'
          as={'section'}
          html={event.description}
        />
      </Container>
    </main>
  );
}
