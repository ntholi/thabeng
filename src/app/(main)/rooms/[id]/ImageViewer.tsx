'use client';
import React, { useState } from 'react';
import { Image } from '@nextui-org/react';
import NextImage from 'next/image';
import { APP_NAME } from '@/lib/constants';

type Props = {
  images: string[];
};

export default function ImageViewer({ images }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <div className='grid grid-cols-12 gap-3'>
      <div className='col-span-12 md:col-span-10'>
        <Image
          as={NextImage}
          className='h-[60vh] w-full object-cover'
          width={900}
          height={900}
          alt={APP_NAME}
          src={images[currentImage]}
        />
      </div>
      <div className='col-span-12 flex gap-3 md:col-span-2 md:flex-col'>
        {images.map((image, index) => (
          <Image
            key={image}
            as={NextImage}
            width={200}
            height={200}
            src={image}
            className='h-16 w-16 cursor-pointer rounded-md object-cover md:h-24 md:w-full'
            alt={APP_NAME}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
}
