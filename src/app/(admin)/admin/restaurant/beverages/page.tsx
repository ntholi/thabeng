'use client';

import {
  CreateView,
  CreateViewProps,
  DetailsView,
  EditView,
  EditViewProps,
  FieldView,
  ResourcePage,
  SelectField,
  TextField,
} from '@/app/(admin)/admin-core';
import NumberField from '@/app/(admin)/admin-core/form/NumberField';
import { formatMoney } from '@/lib/utils/format';
import { Beverage, BeverageCategories } from './Beverage';
import { beverageRepository } from './repository';

export default function BeveragePage() {
  return (
    <ResourcePage
      resourceLabel='Beverages'
      repository={beverageRepository}
      create={BeverageCreate}
      edit={BeverageEdit}
      details={BeverageDetails}
      navLinkProps={(it) => ({
        label: `${it.name}`,
        description: it.size,
      })}
    ></ResourcePage>
  );
}

function BeverageDetails({ item }: { item: Beverage }) {
  return (
    <DetailsView>
      <FieldView label='Name' value={item.name} />
      <FieldView label='Category' value={item.category} />
      <FieldView label='Price' value={formatMoney(item.price)} />
      <FieldView label='Size' value={item.size} />
    </DetailsView>
  );
}

function BeverageCreate(props: CreateViewProps<Beverage>) {
  return (
    <CreateView {...props}>
      <TextField name='name' />
      <SelectField
        name='category'
        options={BeverageCategories.sort((a, b) => a.localeCompare(b))}
      />
      <NumberField name='price' />
      <TextField name='size' />
    </CreateView>
  );
}

function BeverageEdit(props: EditViewProps<Beverage>) {
  return (
    <EditView {...props}>
      <TextField name='name' />
      <SelectField
        name='category'
        options={BeverageCategories.sort((a, b) => a.localeCompare(b))}
      />
      <NumberField name='price' />
      <TextField name='size' />
    </EditView>
  );
}
