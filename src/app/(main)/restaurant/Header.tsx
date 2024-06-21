import React from 'react';
import Image from 'next/image';

export default function Header() {
  const banner = '/images/test-image.jpg';

  return (
    <div className='relative'>
      <Image
        src={banner}
        width={1920}
        height={1080}
        alt='Banner'
        className='h-[50vh] object-cover w-full'
      />
      <div className='text-white text-center bg-black/30 absolute inset-0 h-full px-6 sm:px-20 py-5 flex flex-col justify-between'>
        <h1 className='text-5xl sm:text-7xl font-bold'>Thabeng Hotel</h1>
        <p className='text-white text-xl'>
          Savor exquisite flavors with our diverse and delightful menu.
        </p>
      </div>
    </div>
  );
}
