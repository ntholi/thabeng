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
import { Image, SimpleGrid, Table, Tabs, Title } from '@mantine/core';
import NextImage from 'next/image';
import TextAreaField from '../../admin-core/form/TextAreaField';
import { Amenities, Room } from './Room';
import { roomRepository } from './repository';
import RoomForm from './RoomForm';
import { IconInfoSquare, IconPhoto } from '@tabler/icons-react';
import { formatMoney } from '@/lib/utils/format';

export default function RoomPage() {
  return (
    <ResourcePage
      resourceLabel='Rooms'
      repository={roomRepository}
      create={RoomForm}
      edit={RoomEdit}
      details={Details}
      navLinkProps={(it) => ({ label: `${it.name}` })}
    ></ResourcePage>
  );
}

function Details({ item }: { item: Room }) {
  return (
    <Tabs defaultValue='basic' m={'sm'}>
      <Tabs.List>
        <Tabs.Tab value='basic' leftSection={<IconInfoSquare size='1rem' />}>
          Basic
        </Tabs.Tab>
        <Tabs.Tab value='photos' leftSection={<IconPhoto size={'1rem'} />}>
          Photos
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value='basic'>
        <RoomDetails room={item} />
      </Tabs.Panel>
      <Tabs.Panel value='photos'>
        <RoomPhotos item={item} />
      </Tabs.Panel>
    </Tabs>
  );
}

function RoomDetails({ room }: { room: Room }) {
  return (
    <DetailsView>
      <FieldView label='Name' value={room.name} />
      <FieldView label='Description' value={room.description} />
      <FieldView label='Price' value={formatMoney(room.price)} />
      <AmenitiesTable amenities={room.amenities} />
    </DetailsView>
  );
}

function RoomEdit(props: EditViewProps<Room>) {
  return (
    <EditView {...props}>
      <TextField name='name' />
      <TextAreaField name='description' rows={5} />
      <ImagePicker name='image' folder='rooms' />
    </EditView>
  );
}

function RoomPhotos({ item }: { item: Room }) {
  return (
    <DetailsView>
      <SimpleGrid cols={3}>
        {item.images?.map((image) => (
          <Image
            component={NextImage}
            radius='md'
            width={500}
            height={500}
            h={200}
            key={image}
            src={image}
            alt={item.name}
          />
        ))}
      </SimpleGrid>
    </DetailsView>
  );
}

function AmenitiesTable({ amenities }: { amenities: Amenities[] }) {
  return (
    <>
      <Title size={'1.1rem'} fw={'normal'} mt={'md'}>
        Amenities
      </Title>
      <Table withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Count</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {amenities.map((amenity) => (
            <Table.Tr>
              <Table.Td>{amenity.name}</Table.Td>
              <Table.Td>{amenity.count}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}
