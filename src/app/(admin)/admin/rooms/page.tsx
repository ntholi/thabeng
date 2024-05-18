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
  TextField,
} from '@/app/(admin)/admin-core';
import { shorten, stripHtml } from '@/lib/utils';
import { Image } from '@mantine/core';
import NextImage from 'next/image';
import TextAreaField from '../../admin-core/form/TextAreaField';
import { Room } from './Room';
import { roomRepository } from './repository';
import RoomForm from './RoomForm';

export default function RoomPage() {
  return (
    <ResourcePage
      resourceLabel='Rooms'
      repository={roomRepository}
      create={RoomForm}
      edit={RoomEdit}
      details={RoomDetails}
      navLinkProps={(it) => ({ label: `${it.name}` })}
    ></ResourcePage>
  );
}

function RoomDetails({ item }: { item: Room }) {
  return (
    <DetailsView>
      <FieldView label='Name' value={item.name} />
      <FieldView
        label={shorten(stripHtml(item.description), 100)}
        value={'Description'}
      />
      <div>
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            component={NextImage}
            height={400}
            width={400}
            radius='md'
            h={200}
            w='auto'
            fit='contain'
          />
        )}
      </div>
    </DetailsView>
  );
}

function RoomCreate(props: CreateViewProps<Room>) {
  return (
    <CreateView {...props}>
      <TextField name='name' />
      <TextAreaField name='description' rows={5} />
      <ImagePicker name='image' folder='rooms' />
    </CreateView>
  );
}

function RoomEdit(props: EditViewProps<Room>) {
  return (
    <EditView {...props}>
      <TextField name='name' />
      <TextAreaField name='description' rows={5} />
      <ImagePicker name='image' folder='rooms' />
    </EditView>
  );
}
