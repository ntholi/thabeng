'use client';

import {
  DetailsView,
  FieldView,
  ReferenceView,
  ResourcePage,
} from '@/app/(admin)/admin-core';
import { date } from '@/lib/utils/format';
import { Card, Stack, Title } from '@mantine/core';
import { IconCheck, IconExclamationCircle } from '@tabler/icons-react';
import { Booking } from './Booking';
import { bookingRepository } from './repository';

export default function BookingPage() {
  return (
    <ResourcePage
      resourceLabel='Bookings'
      repository={bookingRepository}
      details={BookingDetails}
      navLinkProps={(it) => ({
        label: `${it?.user?.name || 'Guest'}`,
        description: `${it.room.name} - ${date(it.checkIn)}`,
        rightSection: <StatusIcon seen={it.seen} />,
      })}
    />
  );
}

function BookingDetails({ item }: { item: Booking }) {
  bookingRepository.markAsSeen(item.id);
  return (
    <DetailsView>
      <ReferenceView
        label='Room'
        reference={'rooms'}
        referenceKey={item.room.id}
        value={item.room.name}
      />
      <FieldView label='Check In' value={date(item.checkIn)} />
      <Card withBorder>
        <Title order={2} fw={'lighter'}>
          Guest Details
        </Title>
        <Stack mt={'xl'}>
          <FieldView label='Name' value={item?.user?.name} />
          <FieldView label='Phone' value={item?.user?.phoneNumber} />
          <FieldView label='Email' value={item?.user?.email} />
        </Stack>
      </Card>
    </DetailsView>
  );
}

function StatusIcon({ seen }: { seen?: boolean }) {
  const size = '1.2rem';

  return !seen ? <IconExclamationCircle color='orange' size={size} /> : null;
}
