import { roomRepository } from '@/app/(admin)/admin/rooms/repository';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from '@nextui-org/react';
import { IconMapPin } from '@tabler/icons-react';
import { headers } from 'next/headers';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import Container from '../../core/Container';
import ImageViewer from './ImageViewer';
import { MdPhone, MdWhatsapp } from 'react-icons/md';
import React from 'react';

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
      <h1 className='mt-5 text-3xl font-bold'>{property.name}</h1>
      <main className='grid grid-cols-12 gap-5'>
        <div className='col-span-12 md:col-span-8'>
          <section className='mt-3 flex gap-5'>
            {property.amenities.map((amenity, index) => (
              <React.Fragment key={index}>
                <Feature label={amenity.name} value={amenity.count} />
                {index < property.amenities.length - 1 && (
                  <span className='hidden sm:block'>·</span>
                )}
              </React.Fragment>
            ))}
          </section>
          <Divider className='my-3' />
          <p className='text-foreground/80'>{property.description}</p>
        </div>
        <Card className='col-span-12 md:col-span-4' radius='sm' shadow='sm'>
          <CardHeader>
            <Link color='foreground'>Booking Details</Link>
          </CardHeader>
          <Divider />
          <CardBody className='flex flex-col gap-3'>
            <Link href={`tel:+26658123456`}>
              <MdPhone size={'1rem'} className='mr-3 text-black' />
              <span>(+266) 58123456</span>
            </Link>
            <Link href={`https://wa.me/+26658123456`}>
              <MdWhatsapp size={'1rem'} className='mr-3 text-green-500' />
              <span>WhatsApp</span>
            </Link>
          </CardBody>
        </Card>
      </main>
    </Container>
  );
}

type FeatureProp = {
  label: string;
  value: number;
};

function Feature({ label, value }: FeatureProp) {
  if (value === 0) return null;
  return (
    <div className='flex items-center gap-3'>
      <p className='text-sm font-semibold text-foreground/90'>{value}</p>
      <p className='text-sm text-foreground/80'>{label}</p>
    </div>
  );
}
