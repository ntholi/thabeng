import { Button } from '@nextui-org/react';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <header className='h-[70vh]'>
        <Image
          src='/images/test-image.jpg'
          width={1000}
          height={1000}
          className='w-full h-full object-cover'
          alt='Thabeng Hotel'
        />
      </header>
      <nav className='flex justify-center gap-5 p-5 bg-white relative sm:-top-10 sm:w-[40vw] sm:mx-auto'>
        <a href='#' className='text-lg'>
          Restaurant
        </a>
      </nav>
    </main>
  );
}
