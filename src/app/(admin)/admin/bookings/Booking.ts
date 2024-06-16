import { Resource } from '../../admin-core/repository/repository';

export interface Booking extends Resource {
  room: {
    id: string;
    name: string;
  };
  user: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  checkIn: Date;
  seen?: boolean;
}
