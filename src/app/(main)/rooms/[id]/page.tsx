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
              <>
                <Feature label={amenity.name} value={amenity.count} />
                {index < property.amenities.length - 1 && (
                  <span className='hidden sm:block'>·</span>
                )}
              </>
            ))}
          </section>
          <Divider className='my-3' />
          <p className='text-foreground/80'>{property.description}</p>
        </div>
        <Card className='col-span-12 md:col-span-4' radius='sm' shadow='sm'>
          <CardHeader>
            <Link color='foreground'>xxx</Link>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className='flex justify-between text-sm text-foreground/80'>
              <span className='font-semibold'>Contact Person</span>
              <Link
                size='sm'
                className='text-gray-500'
                href={`#`}
                as={NextLink}
              >
                The Name
              </Link>
            </p>
            <div className='mt-5 flex items-start justify-between'>
              <Button>Click me</Button>
            </div>
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
    <div className='flex items-center gap-1'>
      <p className='text-sm font-semibold text-foreground/90'>{value}</p>
      <p className='text-sm text-foreground/80'>{label}</p>
    </div>
  );
}
