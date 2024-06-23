import { Spinner } from '@nextui-org/react';
import React from 'react';

export default function Loading() {
  return (
    <div className='flex items-center justify-center'>
      <Spinner size='lg' />
    </div>
  );
}
