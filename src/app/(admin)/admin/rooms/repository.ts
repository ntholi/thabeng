import { FirebaseRepository } from '../../admin-core/repository';
import { Room } from './Room';

export class RoomRepository extends FirebaseRepository<Room> {
  constructor() {
    super('rooms');
  }
}

export const roomRepository = new RoomRepository();
