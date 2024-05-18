import { useForm } from '@mantine/form';
import React from 'react';
import { Room } from '../Room';
import {
  Grid,
  NumberInput,
  Select,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core';

type Props = {
  form: ReturnType<typeof useForm<Room>>;
};

export default function BasicInfoInput({ form }: Props) {
  return (
    <Stack py={50} px={70} pb={120}>
      <TextInput
        label='Name'
        placeholder='Name'
        {...form.getInputProps('name')}
      />
      <NumberInput
        label='Price'
        placeholder='Enter price'
        {...form.getInputProps('price')}
      />
      <Textarea
        label='Description'
        placeholder='Enter description'
        {...form.getInputProps('description')}
      />
    </Stack>
  );
}
