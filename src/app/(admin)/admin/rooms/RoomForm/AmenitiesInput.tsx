import { useForm } from '@mantine/form';
import React from 'react';
import { Room, Amenities } from '../Room';
import {
  NumberInput,
  Select,
  Stack,
  TextInput,
  Table,
  Button,
  Group,
  ActionIcon,
} from '@mantine/core';
import { IconTrashFilled } from '@tabler/icons-react';

type Props = {
  form: ReturnType<typeof useForm<Room>>;
};

export default function AmenitiesInput({ form }: Props) {
  const [name, setName] = React.useState('');
  const [count, setCount] = React.useState(0);

  const rows = form.values.amenities?.map(
    (amenity: Amenities, index: number) => (
      <Table.Tr>
        <Table.Td>{amenity.name}</Table.Td>
        <Table.Td>{amenity.count}</Table.Td>
        <Table.Td>
          <ActionIcon
            variant='light'
            color='red'
            onClick={() => {
              form.setFieldValue(
                'amenities',
                form.values.amenities.filter((_, i) => i !== index)
              );
            }}
          >
            <IconTrashFilled size={'1rem'} />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    )
  );

  return (
    <Stack py={50} px={70} pb={120}>
      <Group>
        <TextInput
          label='Name'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <NumberInput
          label='Count'
          placeholder='Count'
          value={count}
          onChange={(value) => setCount(Number(value))}
        />
        <Button
          variant='default'
          onClick={() => {
            form.setFieldValue('amenities', [
              ...(form.values.amenities || []),
              { name, count },
            ]);
            setName('');
            setCount(0);
          }}
        >
          Add
        </Button>
      </Group>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Count</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Stack>
  );
}
