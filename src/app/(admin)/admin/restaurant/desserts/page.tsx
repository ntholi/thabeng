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
import { Dessert } from './Dessert';
import { dessertRepository } from './repository';

export default function DessertPage() {
  return (
    <ResourcePage
      resourceLabel='Desserts'
      repository={dessertRepository}
      create={DessertCreate}
      edit={DessertEdit}
      details={DessertDetails}
      navLinkProps={(it) => ({
        label: `${it.name}`,
      })}
    ></ResourcePage>
  );
}

function DessertDetails({ item }: { item: Dessert }) {
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

function DessertCreate(props: CreateViewProps<Dessert>) {
  return (
    <CreateView {...props}>
      <TextField name='name' />
      <NumberField name='price' />
      <TextAreaField name='description' />
    </CreateView>
  );
}

function DessertEdit(props: EditViewProps<Dessert>) {
  return (
    <EditView {...props}>
      <TextField name='name' />
      <NumberField name='price' />
      <TextAreaField name='description' />
    </EditView>
  );
}
