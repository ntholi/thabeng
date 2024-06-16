import { Button, Skeleton } from '@nextui-org/react';
import { IconArrowRight } from '@tabler/icons-react';
import React, { useState } from 'react';

export default function LandingPost() {
  const [post, setPost] = useState<HomePage>();
  const [loading, setLoading] = useState();

  return (
    <article className='flex flex-col items-center gap-5 my-5'>
      {loading ? (
        <Skeleton className='h-5 w-24 rounded-sm' />
      ) : (
        <p>
          Welcome to Thabeng Hotel, where you can find the best services for
          your stay.
        </p>
      )}
      <Button
        isDisabled={loading}
        variant='bordered'
        color='primary'
        radius='sm'
        className='text-white border-white border-1 px-8'
        endContent={<IconArrowRight />}
      >
        Read More
      </Button>
    </article>
  );
}
