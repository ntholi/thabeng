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
  SelectField,
  TextField,
} from '@/app/(admin)/admin-core';
import { shorten, stripHtml } from '@/lib/utils';
import { Image, Textarea } from '@mantine/core';
import NextImage from 'next/image';
import { MealTime, MealTimeNames } from './MealTime';
import { mealtimeRepository } from './repository';
import { dateTime } from '@/lib/utils/format';
import { TimeInput } from '@mantine/dates';
import NumberField from '@/app/(admin)/admin-core/form/NumberField';

export default function MealTimePage() {
  return (
    <ResourcePage
      resourceLabel='MealTimes'
      repository={mealtimeRepository}
      create={MealTimeCreate}
      edit={MealTimeEdit}
      details={MealTimeDetails}
      navLinkProps={(it) => ({ label: `${it.name}` })}
    ></ResourcePage>
  );
}

function MealTimeDetails({ item }: { item: MealTime }) {
  return (
    <DetailsView>
      <FieldView label='Name' value={item.name} />
      <FieldView label='Price' value={item.price} />
      <FieldView label='Start' value={item.startTime} />
      <FieldView label='End' value={item.endTime} />
      <FieldView label={item.description} value={'Description'} />
    </DetailsView>
  );
}

function MealTimeCreate(props: CreateViewProps<MealTime>) {
  return (
    <CreateView {...props}>
      <SelectField name='name' options={[...MealTimeNames]} />
      <NumberField name='price' />
      <TimeInput label='Start Time' name='startTime' />
      <TimeInput lang='End Time' name='endTime' />
      <Textarea name='description' />
    </CreateView>
  );
}

function MealTimeEdit(props: EditViewProps<MealTime>) {
  return (
    <EditView {...props}>
      <SelectField name='name' options={[...MealTimeNames]} />
      <NumberField name='price' />
      <TimeInput label='Start Time' name='startTime' />
      <TimeInput lang='End Time' name='endTime' />
      <Textarea name='description' />
    </EditView>
  );
}
