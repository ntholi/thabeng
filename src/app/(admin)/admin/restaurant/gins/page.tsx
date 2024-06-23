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
import { Gin } from './Gin';
import { ginRepository } from './repository';

export default function GinPage() {
  return (
    <ResourcePage
      resourceLabel='Gin & Tonic'
      repository={ginRepository}
      create={GinCreate}
      edit={GinEdit}
      details={GinDetails}
      navLinkProps={(it) => ({
        label: `${it.name}`,
      })}
    ></ResourcePage>
  );
}

function GinDetails({ item }: { item: Gin }) {
  return (
    <DetailsView>
      <FieldView label='Name' value={item.name} />
      <FieldView label='Price' value={formatMoney(item.price)} />
      <FieldView
        label={shorten(stripHtml(item.description), 100)}
        value={'Description'}
      />
    </DetailsView>
  );
}

function GinCreate(props: CreateViewProps<Gin>) {
  return (
    <CreateView {...props}>
      <TextField name='name' />
      <NumberField name='price' />
      <TextAreaField name='description' />
    </CreateView>
  );
}

function GinEdit(props: EditViewProps<Gin>) {
  return (
    <EditView {...props}>
      <TextField name='name' />
      <NumberField name='price' />
      <TextAreaField name='description' />
    </EditView>
  );
}
