'use client';
import React, { useEffect, useState, useTransition } from 'react';

import { ResourceCreate } from '@/app/(admin)/admin-core/repository/repository';
import { Booking } from '@/app/(admin)/admin/bookings/Booking';
import {
  Button,
  DatePicker,
  DateValue,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { IconCheck, IconHandClick } from '@tabler/icons-react';
import axios from 'axios';

type Prop = {
  roomId: string;
  roomName: string;
};

export default function BookingModal({ roomId, roomName }: Prop) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [checkInDate, setCheckInDate] = React.useState<DateValue>();
  const [booked, setBooked] = React.useState(false);
  const [disableBtn, setDisableBtn] = useState(true);

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    if (name && phoneNumber) {
      setDisableBtn(false);
    }
  }, [name, email, phoneNumber]);

  function handleBooking() {
    startTransition(async () => {
      const booking: ResourceCreate<Booking> = {
        room: { id: roomId, name: roomName },
        user: {
          name,
          email,
          phoneNumber,
        },
        checkIn: checkInDate?.toDate(timeZone) || new Date(),
      };
      axios.post('/api/bookings', booking);
      setBooked(true);
    });
  }

  return (
    <>
      <Button
        radius='sm'
        variant='shadow'
        onPress={onOpen}
        endContent={<IconHandClick size={'1.2rem'} />}
        color='primary'
      >
        Book Now
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Booking ({roomName})
              </ModalHeader>
              <ModalBody>
                <Input
                  label='Full Name'
                  variant='bordered'
                  value={name}
                  onValueChange={setName}
                />

                <Input
                  type='tel'
                  variant='bordered'
                  label='Phone Number'
                  value={phoneNumber}
                  onValueChange={setPhoneNumber}
                />
                <Input
                  type='email'
                  label='Email'
                  description='Optional'
                  variant='bordered'
                  value={email}
                  onValueChange={setEmail}
                />
                <DatePicker
                  variant='bordered'
                  label={'check-in Date'}
                  value={checkInDate}
                  onChange={setCheckInDate}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button
                  color='primary'
                  onPress={handleBooking}
                  isLoading={isPending}
                  isDisabled={booked || disableBtn}
                  endContent={
                    booked ? (
                      <IconCheck size={'1rem'} />
                    ) : (
                      <IconHandClick size={'1rem'} />
                    )
                  }
                >
                  {booked ? 'Booked' : 'Book'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
