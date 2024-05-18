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
import { MenuItem } from './MenuItem';
import { menuitemRepository } from './repository';
import NumberField from '../../admin-core/form/NumberField';

export default function MenuItemPage() {
  return (
    <ResourcePage
      resourceLabel='Restaurant Menu'
      repository={menuitemRepository}
      create={MenuItemCreate}
      edit={MenuItemEdit}
      details={MenuItemDetails}
      navLinkProps={(it) => ({
        label: `${it.name}`,
        leftSection: (
          <Image
            src={it.image}
            alt={it.name}
            component={NextImage}
            height={50}
            width={50}
            radius='md'
            h={30}
            w={30}
            fit='contain'
          />
        ),
      })}
    ></ResourcePage>
  );
}

function MenuItemDetails({ item }: { item: MenuItem }) {
  return (
    <DetailsView>
      <FieldView label='Name' value={item.name} />
      <FieldView label='Price' value={item.price} />
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

function MenuItemCreate(props: CreateViewProps<MenuItem>) {
  return (
    <CreateView {...props}>
      <TextField name='name' />
      <NumberField name='price' />
      <TextAreaField name='description' rows={5} />
      <ImagePicker name='image' folder='menuitems' />
    </CreateView>
  );
}

function MenuItemEdit(props: EditViewProps<MenuItem>) {
  return (
    <EditView {...props}>
      <TextField name='name' />
      <NumberField name='price' />
      <TextAreaField name='description' rows={5} />
      <ImagePicker name='image' folder='menuitems' />
    </EditView>
  );
}
