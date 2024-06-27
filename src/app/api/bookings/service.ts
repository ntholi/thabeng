import { Booking } from '../../(admin)/admin/bookings/Booking';
import axios from 'axios';
import { bookingRepository } from '../../(admin)/admin/bookings/repository';
import { settingsRepository } from '../../(admin)/admin/settings/repository';
import { ResourceCreate } from '@/app/(admin)/admin-core/repository/repository';
import { dateTime } from '@/lib/utils/format';
import { sendMail } from '../emails/service';

export async function processBooking(booking: ResourceCreate<Booking>) {
  await bookingRepository.create(booking);
  const settings = await settingsRepository.getSettings();
  if (settings?.bookingEmailRecipient) {
    await sendMail(
      settings.bookingEmailRecipient,
      'New Booking',
      internalAlert(booking),
    );
    if (booking.user?.email) {
      await sendMail(
        booking.user.email,
        'Booking Confirmation',
        getMessageForUser(booking),
      );
    }
  }
}

function internalAlert(booking: ResourceCreate<Booking>) {
  if (booking.seen) {
    return;
  }
  return `New booking from ${booking?.user?.name || 'Unknown'} for ${booking.room.name} on ${dateTime(booking.checkIn)}`;
}

function getMessageForUser(booking: ResourceCreate<Booking>) {
  return `Thank you for booking ${booking.room.name} on ${dateTime(booking.checkIn)}. We will contact you soon.`;
}
