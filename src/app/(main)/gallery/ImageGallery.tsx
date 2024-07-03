import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import React, { useState } from 'react';

interface Image {
  id: number;
  src: string;
  alt: string;
}

export default function ImageGallery() {
  const images: Image[] = [
    { id: 1, src: '/api/placeholder/800/600', alt: 'Image 1' },
    { id: 2, src: '/api/placeholder/800/600', alt: 'Image 2' },
    { id: 3, src: '/api/placeholder/800/600', alt: 'Image 3' },
    { id: 4, src: '/api/placeholder/800/600', alt: 'Image 4' },
    { id: 5, src: '/api/placeholder/800/600', alt: 'Image 5' },
  ];

  const [currentImage, setCurrentImage] = useState<Image>(images[0]);

  const handleThumbnailClick = (image: Image): void => {
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
          src={currentImage.src}
          alt={currentImage.alt}
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
            src={image.src}
            alt={image.alt}
            className={`h-20 w-20 cursor-pointer rounded-md object-cover ${currentImage.id === image.id ? 'border-2 border-blue-500' : ''}`}
            onClick={() => handleThumbnailClick(image)}
          />
        ))}
      </div>
    </div>
  );
}
