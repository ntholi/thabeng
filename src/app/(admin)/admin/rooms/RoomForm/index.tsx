'use client';

import { Tabs } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconBedFilled, IconInfoSquare, IconPhoto } from '@tabler/icons-react';
import { useQueryState } from 'nuqs';
import SubmitButton from '../../../admin-core/form/SubmitButton';
import { Room } from '../Room';
import { roomRepository } from '../repository';
import BasicDetails from './BasicInfoInput';
import PhotoInput from './PhotoInput';
import AmenitiesInput from './AmenitiesInput';

export default function RoomForm() {
  const form = useForm<Room>({});
  const [_, setView] = useQueryState('view');
  const [__, setId] = useQueryState('id');

  async function handleSubmit(value: Room) {
    const res = await roomRepository.create(value);
    await setView(null);
    await setId(res.id);
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Tabs defaultValue='basic' m={'sm'}>
        <Tabs.List>
          <Tabs.Tab value='basic' leftSection={<IconInfoSquare size='1rem' />}>
            Basic
          </Tabs.Tab>
          <Tabs.Tab
            value='amenities'
            leftSection={<IconBedFilled size={'1rem'} />}
          >
            Amenities
          </Tabs.Tab>
          <Tabs.Tab value='photos' leftSection={<IconPhoto size={'1rem'} />}>
            Photos
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='basic'>
          <BasicDetails form={form} />
        </Tabs.Panel>
        <Tabs.Panel value='amenities'>
          <AmenitiesInput form={form} />
        </Tabs.Panel>
        <Tabs.Panel value='photos'>
          <PhotoInput form={form} />
        </Tabs.Panel>
      </Tabs>
      <SubmitButton>Create</SubmitButton>
    </form>
  );
}
