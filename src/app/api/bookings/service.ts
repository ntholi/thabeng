import { Booking } from '../../(admin)/admin/bookings/Booking';
import axios from 'axios';
import { bookingRepository } from '../../(admin)/admin/bookings/repository';
import { settingsRepository } from '../../(admin)/admin/settings/repository';
import { ResourceCreate } from '@/app/(admin)/admin-core/repository/repository';
import { dateTime } from '@/lib/utils/format';

export async function processBooking(booking: ResourceCreate<Booking>) {
  await bookingRepository.create(booking);
  const settings = await settingsRepository.getSettings();
  if (settings?.bookingEmailRecipient) {
    await axios.post('/api/emails', {
      to: settings.bookingEmailRecipient,
      subject: 'Booking Request',
      text: internalAlert(booking),
    });

    axios.post('/api/emails', {
      to: booking.user.email,
      subject: 'Thabeng Hotel Booking',
      text: getMessageForUser(booking),
    });
  }
}

function internalAlert(booking: ResourceCreate<Booking>) {
  if (booking.seen) {
    return;
  }
  return `New booking from ${booking.user.name} for ${booking.room.name} on ${dateTime(booking.checkIn)}`;
}

function getMessageForUser(booking: ResourceCreate<Booking>) {
  return `Thank you for booking ${booking.room.name} on ${dateTime(booking.checkIn)}. We will contact you soon.`;
}
