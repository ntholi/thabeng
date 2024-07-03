'use client';

import {
  CreateView,
  CreateViewProps,
  DetailsView,
  EditView,
  EditViewProps,
  FieldView,
  ImagePicker,
  ResourcePage,
} from '@/app/(admin)/admin-core';
import { Image } from '@mantine/core';
import NextImage from 'next/image';
import TextAreaField from '../../admin-core/form/TextAreaField';
import { Gallery } from './Gallery';
import { galleryRepository } from './repository';
import { shorten } from '@/lib/utils';

export default function GalleryPage() {
  return (
    <ResourcePage
      resourceLabel='Gallery'
      repository={galleryRepository}
      create={GalleryCreate}
      edit={GalleryEdit}
      details={GalleryDetails}
      navLinkProps={(it) => ({ label: `${shorten(it.caption, 25)}` })}
    />
  );
}

function GalleryDetails({ item }: { item: Gallery }) {
  return (
    <DetailsView>
      <Image
        component={NextImage}
        radius='md'
        width={500}
        height={500}
        h={200}
        src={item.image}
        alt={'Thabeng Hotel'}
      />
      <FieldView label={item.caption} value={'Caption'} />
    </DetailsView>
  );
}

function GalleryCreate(props: CreateViewProps<Gallery>) {
  return (
    <CreateView {...props}>
      <ImagePicker name='image' height={200} folder='gallery' />
      <TextAreaField name='caption' />
    </CreateView>
  );
}

function GalleryEdit(props: EditViewProps<Gallery>) {
  return (
    <EditView {...props}>
      <ImagePicker name='image' height={200} folder='gallery' />
      <TextAreaField name='caption' />
    </EditView>
  );
}
