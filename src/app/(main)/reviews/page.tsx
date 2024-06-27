import React from 'react';
import Container from '../core/Container';
import { Salsa } from 'next/font/google';
import { cn } from '@/lib/utils';

const font = Salsa({ weight: '400', subsets: ['latin'] });

export default function ReviewPage() {
  return (
    <>
      <h1 className={cn(font.className, 'text-center text-3xl')}>
        Thabeng Hotel
      </h1>
      <h2 className={'mt-3 text-center text-5xl'}>
        <span className='text-gray-500'>Customer</span>{' '}
        <span className='font-bold text-gray-800'>Reviews</span>
      </h2>
      <Container>xx</Container>
    </>
  );
}
