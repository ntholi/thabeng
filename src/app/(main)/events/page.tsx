import { eventRepository } from '@/app/(admin)/admin/events/repository';
import { Timestamp } from 'firebase/firestore';
import Container from '../core/Container';
import { Salsa } from 'next/font/google';
import { Card, CardBody, cn } from '@nextui-org/react';
import { Metadata } from 'next';
import Link from 'next/link';
import { shorten } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Thabeng Events',
  description: 'Events at Thabeng Hotel',
  keywords: 'Events, Thabeng, Hotel, Lesotho',
};

const font = Salsa({ weight: '400', subsets: ['latin'] });

export const revalidate = 60 * 5;

export default async function EventsPage() {
  const events = await eventRepository.latestEvents();
  return (
    <main className='min-h-screen pt-20'>
      <h1
        className={cn(
          font.className,
          'text-center text-6xl font-bold text-blue-900',
        )}
      >
        Thabeng, Events
      </h1>
      <Container width='lg' className='mt-3 space-y-5 px-4'>
        {events.map((event) => (
          <Card
            as={Link}
            href={`/events/${event.id}`}
            key={event.id}
            isPressable
            className='w-full'
          >
            <article className='grid-cols-12 bg-white px-4 py-8 sm:grid md:pe-20'>
              <div className='col-span-3 hidden text-center sm:block'>
                <p className='text-lg uppercase text-zinc-600'>
                  {month(event.date)}
                </p>
                <p className='text-2xl'>{dayOfMonth(event.date)}</p>
              </div>
              <div className='col-span-9'>
                <p className='font-bold text-zinc-600'>
                  {fullDate(event.date)}
                </p>
                <h2 className='text-3xl'>{event.name}</h2>
                <p className='mt-3'>{shorten(event.description, 150)}</p>
              </div>
            </article>
          </Card>
        ))}
      </Container>
    </main>
  );
}

function dayOfMonth(date: Timestamp | null | undefined) {
  return date?.toDate().toLocaleDateString('en-LS', {
    day: 'numeric',
  });
}

function month(date: Timestamp | null | undefined) {
  return date?.toDate().toLocaleDateString('en-LS', {
    month: 'short',
  });
}

function fullDate(date: Timestamp | null | undefined) {
  return date?.toDate().toLocaleDateString('en-LS', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}
