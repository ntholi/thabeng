import { collection, orderBy, query, where } from 'firebase/firestore';
import { FirebaseRepository } from '../../admin-core/repository';
import { Room } from './Room';
import { db } from '@/lib/config/firebase';
import { ResourceCreate } from '../../admin-core/repository/repository';

class RoomRepository extends FirebaseRepository<Room> {
  constructor() {
    super('rooms');
  }
}

export const roomRepository = new RoomRepository();
