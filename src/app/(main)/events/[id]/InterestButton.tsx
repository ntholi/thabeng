'use client';
import { eventRepository } from '@/app/(admin)/admin/events/repository';
import { Button } from '@nextui-org/react';
import { IconCheck } from '@tabler/icons-react';
import React, { useTransition } from 'react';

type Props = {
  eventId: string;
  ipAddress: string;
};

export default function InterestButton({ ipAddress, eventId }: Props) {
  const [checked, setChecked] = React.useState(false);
  const [pending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await eventRepository.interested(eventId, ipAddress);
      setChecked(true);
    });
  }

  return (
    <div className='flex flex-col items-end'>
      <Button
        color='primary'
        onPress={handleClick}
        isLoading={pending}
        variant='flat'
        endContent={checked && <IconCheck size='1rem' />}
      >
        Interested
      </Button>
      <p className='text-xs text-gray-600'>
        Are you interested in joining this event?
      </p>
    </div>
  );
}
