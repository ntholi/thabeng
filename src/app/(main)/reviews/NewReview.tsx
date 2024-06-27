import { Button, Textarea } from '@nextui-org/react';
import React from 'react';
import Container from '../core/Container';

export default function NewReview() {
  return (
    <Container width={'sm'} className='flex flex-col gap-2'>
      <Textarea
        label='Review'
        placeholder='Please give us your feedback here...'
      />
      <footer className='flex justify-between'>
        <Button variant='flat'>Submit</Button>
      </footer>
    </Container>
  );
}
