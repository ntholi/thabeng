import { galleryRepository } from '@/app/(admin)/admin/gallery/repository';
import React from 'react';
import ImageGallery from './ImageGallery';

export default async function GalleryPage() {
  const images = await galleryRepository.getAll();
  if (images.length < 1)
    return (
      <div className='mt-20 flex items-center justify-center'>
        <h1 className='text-lg text-gray-500'>Empty Gallery</h1>
      </div>
    );
  return <ImageGallery images={images} />;
}
