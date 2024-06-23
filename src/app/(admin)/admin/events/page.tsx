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
import { Event } from './Event';
import { eventRepository } from './repository';
import { dateTime } from '@/lib/utils/format';
import DateTimeField from '../../admin-core/form/DateTimeField';
import RichTextField from '../../admin-core/form/RichTextField';
import { number } from 'zod';
import { useEffect, useState } from 'react';

export default function EventPage() {
  return (
    <ResourcePage
      resourceLabel='Events'
      repository={eventRepository}
      create={EventCreate}
      edit={EventEdit}
      details={EventDetails}
      navLinkProps={(it) => ({ label: `${it.name}` })}
    ></ResourcePage>
  );
}

function EventDetails({ item }: { item: Event }) {
  const [interested, setInterested] = useState<number | string>('?');

  useEffect(() => {
    eventRepository.getInterested(item.id).then(setInterested);
  }, [item.id]);

  return (
    <DetailsView>
      <FieldView label='Name' value={item.name} />
      <FieldView label='Interested' value={interested} />
      <FieldView label='Date' value={dateTime(item.date)} />
      <FieldView
        label={shorten(stripHtml(item.description), 100)}
        value={'Description'}
      />
      <Image
        component={NextImage}
        radius='md'
        width={500}
        height={500}
        h={200}
        src={item.poster}
        alt={item.name}
      />
    </DetailsView>
  );
}

function EventCreate(props: CreateViewProps<Event>) {
  return (
    <CreateView {...props}>
      <TextField name='name' />
      <DateTimeField name='date' />
      <ImagePicker name='poster' height={200} folder='events' />
      <RichTextField name='description' />
    </CreateView>
  );
}

function EventEdit(props: EditViewProps<Event>) {
  return (
    <EditView {...props}>
      <TextField name='name' />
      <DateTimeField name='date' />
      <ImagePicker name='poster' height={200} folder='events' />
      <RichTextField name='description' />
    </EditView>
  );
}
