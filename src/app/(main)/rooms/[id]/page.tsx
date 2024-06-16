import { roomRepository } from '@/app/(admin)/admin/rooms/repository';
import { Card, CardBody, CardHeader, Divider, Link } from '@nextui-org/react';
import { IconCheckbox } from '@tabler/icons-react';
import { notFound } from 'next/navigation';
import React from 'react';
import Container from '../../core/Container';
import BookingModal from './BookingModal';
import ImageViewer from './ImageViewer';

type Props = {
  params: {
    id: string;
  };
};

export default async function PropertyPage({ params: { id } }: Props) {
  const property = await roomRepository.get(id);

  if (!property) return notFound();

  return (
    <Container>
      <ImageViewer images={property.images} />
      <main className='mt-5 grid grid-cols-12 gap-5 sm:gap-10 sm:mt-10'>
        <div className='col-span-12 md:col-span-8'>
          <header className='flex justify-between'>
            <h1 className='text-3xl font-bold'>{property.name}</h1>
            <BookingModal roomId={id} />
          </header>
          <Divider className='my-3' />
          <p className='text-foreground/80'>{property.description}</p>
        </div>
        <Card className='col-span-12 md:col-span-4' radius='sm' shadow='sm'>
          <CardHeader>
            <Link color='foreground'>Amenities</Link>
          </CardHeader>
          <Divider />
          <CardBody className='flex flex-col gap-3'>
            {property.amenities.map((amenity, index) => (
              <React.Fragment key={index}>
                <Feature label={amenity.name} count={amenity.count} />
              </React.Fragment>
            ))}
          </CardBody>
        </Card>
      </main>
    </Container>
  );
}

type FeatureProp = {
  label: string;
  count: number;
};

function Feature({ label, count }: FeatureProp) {
  return (
    <div className='flex items-center gap-3'>
      <IconCheckbox className='text-blue-900' size={'1rem'} />
      <p className='text-sm font-semibold text-foreground/90'>{label}</p>
      {count > 1 && <p className='text-sm text-foreground/80'> (x {count})</p>}
    </div>
  );
}
