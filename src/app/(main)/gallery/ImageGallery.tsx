'use client';
import { GalleryImage } from '@/app/(admin)/admin/gallery/image';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import React, { useState } from 'react';

export default function ImageGallery({ images }: { images: GalleryImage[] }) {
  const [currentImage, setCurrentImage] = useState<GalleryImage>(images[0]);

  const handleThumbnailClick = (image: GalleryImage): void => {
    setCurrentImage(image);
  };

  const handlePrevious = (): void => {
    const currentIndex = images.findIndex((img) => img.id === currentImage.id);
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentImage(images[previousIndex]);
  };

  const handleNext = (): void => {
    const currentIndex = images.findIndex((img) => img.id === currentImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentImage(images[nextIndex]);
  };

  return (
    <div className='mx-auto max-w-4xl p-4'>
      <div className='relative'>
        <img
          src={currentImage.image}
          alt={'Thabeng Hotel'}
          className='h-96 w-full rounded-lg object-cover shadow-lg'
        />
        <button
          onClick={handlePrevious}
          className='absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md'
        >
          <IconChevronLeft className='h-6 w-6' />
        </button>
        <button
          onClick={handleNext}
          className='absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md'
        >
          <IconChevronRight className='h-6 w-6' />
        </button>
      </div>
      <div className='mt-4 flex space-x-2 overflow-x-auto'>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.image}
            alt={'Thabeng Hotel'}
            className={`h-20 w-20 cursor-pointer rounded-md object-cover ${currentImage.id === image.id ? 'border-2 border-blue-500' : ''}`}
            onClick={() => handleThumbnailClick(image)}
          />
        ))}
      </div>
    </div>
  );
}
