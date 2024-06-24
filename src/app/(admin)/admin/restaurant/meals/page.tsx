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
import { Image } from '@mantine/core';
import NextImage from 'next/image';
import { Meal, MealCategories } from './Meal';
import { mealRepository } from './repository';
import { formatMoney } from '@/lib/utils/format';
import NumberField from '@/app/(admin)/admin-core/form/NumberField';
import TextAreaField from '@/app/(admin)/admin-core/form/TextAreaField';

export default function MealPage() {
  return (
    <ResourcePage
      resourceLabel='Meals'
      repository={mealRepository}
      create={MealCreate}
      edit={MealEdit}
      details={MealDetails}
      navLinkProps={(it) => ({
        label: `${it.name}`,
        description: `${it.category}`,
      })}
    ></ResourcePage>
  );
}

function MealDetails({ item }: { item: Meal }) {
  return (
    <DetailsView>
      <FieldView label='Name' value={item.name} />
      <FieldView label='Category' value={item.category} />
      <FieldView label='Price' value={formatMoney(item.price)} />
      <FieldView
        label={shorten(stripHtml(item.description), 100)}
        value={'Description'}
      />
    </DetailsView>
  );
}

function MealCreate(props: CreateViewProps<Meal>) {
  return (
    <CreateView {...props}>
      <TextField name='name' />
      <SelectField name='category' options={[...MealCategories]} />
      <NumberField name='price' />
      <TextAreaField name='description' />
    </CreateView>
  );
}

function MealEdit(props: EditViewProps<Meal>) {
  return (
    <EditView {...props}>
      <TextField name='name' />
      <SelectField name='category' options={[...MealCategories]} />
      <NumberField name='price' />
      <TextAreaField name='description' />
    </EditView>
  );
}
