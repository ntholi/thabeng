'use client';
import { homePageRepository } from '@/app/(admin)/admin/home-page/repository';
import { Button, Skeleton } from '@nextui-org/react';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function LandingPost() {
  const [post, setPost] = useState<HomePage | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    homePageRepository
      .getPost()
      .then(setPost)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <article className='flex flex-col items-center gap-5 my-5'>
      {loading ? (
        <Skeleton className='h-5 w-24 rounded-sm' />
      ) : (
        <Link href={`/posts/${post?.value}`}>{post?.label}</Link>
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
