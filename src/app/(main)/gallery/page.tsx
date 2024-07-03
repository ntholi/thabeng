import { galleryRepository } from '@/app/(admin)/admin/gallery/repository';
import React from 'react';
import ImageGallery from './ImageGallery';

export default async function GalleryPage() {
  const images = await galleryRepository.getAll();
  return <ImageGallery images={images} />;
}
