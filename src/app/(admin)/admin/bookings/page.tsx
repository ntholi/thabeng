'use client';

import { DetailsView, FieldView, ResourcePage } from '@/app/(admin)/admin-core';
import { dateTime } from '@/lib/utils/format';
import { Booking } from './Booking';
import { bookingRepository } from './repository';

export default function BookingPage() {
  return (
    <ResourcePage
      resourceLabel='Bookings'
      repository={bookingRepository}
      details={BookingDetails}
      navLinkProps={(it) => ({ label: `${it.user.name}` })}
    />
  );
}

function BookingDetails({ item }: { item: Booking }) {
  return (
    <DetailsView>
      <FieldView label='Name' value={item.user.name} />
      <FieldView label='Date' value={dateTime(item.createdAt)} />
    </DetailsView>
  );
}
