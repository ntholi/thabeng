import { Button } from '@mantine/core';
import React, { useTransition } from 'react';
import { homePageRepository } from './repository';
import { IconWand } from '@tabler/icons-react';

export default function AutoArrange() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant='default'
      size='xs'
      onClick={() => {
        startTransition(async () => {
          await homePageRepository.autoArrange();
        });
      }}
      loading={isPending}
      rightSection={<IconWand size={'1rem'} />}
    >
      Auto Arrange
    </Button>
  );
}
