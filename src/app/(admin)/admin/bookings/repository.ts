import { FirebaseRepository } from '../../admin-core/repository';
import { Booking } from './Booking';

class BookingRepository extends FirebaseRepository<Booking> {
  constructor() {
    super('bookings');
  }
}

export const bookingRepository = new BookingRepository();
