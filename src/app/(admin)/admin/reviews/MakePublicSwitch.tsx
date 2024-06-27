import { Flex, Switch, rem, useMantineTheme } from '@mantine/core';
import {
  IconCheck,
  IconCircleCheck,
  IconCircleCheckFilled,
  IconExclamationCircle,
  IconX,
} from '@tabler/icons-react';
import React, { useEffect, useState, useTransition } from 'react';
import { Review } from './Review';
import { reviewRepository } from './repository';

type Props = {
  review: Review;
};

export default function PublishSwitch({ review }: Props) {
  const theme = useMantineTheme();
  const isPublic = review.isPublic || false;
  const [isPending, startTransition] = useTransition();

  const update = () => {
    startTransition(async () => {
      await reviewRepository.updatePublishStatus(review.id, !isPublic);
    });
  };

  return (
    <Flex justify={'space-between'}>
      <Switch
        checked={isPublic}
        onChange={update}
        color='teal'
        size='sm'
        label={isPending ? 'Updating...' : isPublic ? 'Public' : 'Private'}
        description='Click switch to publish or private this review.'
        disabled={isPending}
        thumbIcon={
          isPublic ? (
            <IconCheck
              style={{ width: rem(12), height: rem(12) }}
              color={theme.colors.green[5]}
              stroke={3}
            />
          ) : (
            <IconX
              style={{ width: rem(12), height: rem(12) }}
              color={theme.colors.red[6]}
              stroke={3}
            />
          )
        }
      />
      <>
        {isPublic ? (
          <IconCircleCheck size={'2rem'} color={theme.colors.green[5]} />
        ) : (
          <IconExclamationCircle size={'2rem'} />
        )}
      </>
    </Flex>
  );
}
