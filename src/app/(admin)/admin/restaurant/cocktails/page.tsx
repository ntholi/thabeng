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
import { Cocktail } from './Cocktail';
import { cocktailRepository } from './repository';

export default function CocktailPage() {
  return (
    <ResourcePage
      resourceLabel='Cocktails'
      repository={cocktailRepository}
      create={CocktailCreate}
      edit={CocktailEdit}
      details={CocktailDetails}
      navLinkProps={(it) => ({
        label: `${it.name}`,
      })}
    ></ResourcePage>
  );
}

function CocktailDetails({ item }: { item: Cocktail }) {
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

function CocktailCreate(props: CreateViewProps<Cocktail>) {
  return (
    <CreateView {...props}>
      <TextField name='name' />
      <NumberField name='price' />
      <TextAreaField name='description' />
    </CreateView>
  );
}

function CocktailEdit(props: EditViewProps<Cocktail>) {
  return (
    <EditView {...props}>
      <TextField name='name' />
      <NumberField name='price' />
      <TextAreaField name='description' />
    </EditView>
  );
}
