'use client';

import {
  CreateView,
  CreateViewProps,
  DetailsView,
  EditView,
  EditViewProps,
  FieldView,
  ResourcePage,
  TextField,
} from '@/app/(admin)/admin-core';
import NumberField from '@/app/(admin)/admin-core/form/NumberField';
import TextAreaField from '@/app/(admin)/admin-core/form/TextAreaField';
import { shorten, stripHtml } from '@/lib/utils';
import { formatMoney } from '@/lib/utils/format';
import { Wine } from './Wine';
import { wineRepository } from './repository';
import { NumberInput } from '@mantine/core';

export default function WinePage() {
  return (
    <ResourcePage
      resourceLabel='Wine & Tonic'
      repository={wineRepository}
      create={WineCreate}
      edit={WineEdit}
      details={WineDetails}
      navLinkProps={(it) => ({
        label: `${it.name}`,
      })}
    ></ResourcePage>
  );
}

function WineDetails({ item }: { item: Wine }) {
  return (
    <DetailsView>
      <FieldView label='Name' value={item.name} />
      <FieldView label='Price' value={formatMoney(item.price)} />
      <FieldView label='Year' value={item.year} />
      <FieldView
        label={shorten(stripHtml(item.description), 100)}
        value={'Description'}
      />
    </DetailsView>
  );
}

function WineCreate(props: CreateViewProps<Wine>) {
  return (
    <CreateView {...props}>
      <TextField name='name' />
      <NumberField name='price' />
      <NumberInput name='year' label='Year' description='Optional' />
      <TextAreaField name='description' />
    </CreateView>
  );
}

function WineEdit(props: EditViewProps<Wine>) {
  return (
    <EditView {...props}>
      <TextField name='name' />
      <NumberField name='price' />
      <NumberField name='year' />
      <TextAreaField name='description' />
    </EditView>
  );
}
