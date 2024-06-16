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
  Flex,
} from '@mantine/core';
import { IconTrashFilled } from '@tabler/icons-react';

type Props = {
  form: ReturnType<typeof useForm<Room>>;
};

export default function AmenitiesInput({ form }: Props) {
  const [name, setName] = React.useState('');
  const [count, setCount] = React.useState(1);

  const rows = form.values.amenities?.map(
    (amenity: Amenities, index: number) => (
      <Table.Tr>
        <Table.Td>{amenity.name}</Table.Td>
        <Table.Td>{amenity.count}</Table.Td>
        <Table.Td ta={'right'}>
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
      <Flex justify={'space-between'}>
        <Group align='center'>
          <TextInput
            label='Name'
            placeholder='Name'
            w={200}
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <NumberInput
            label='Count'
            placeholder='Count'
            value={count}
            onChange={(value) => setCount(Number(value))}
          />
        </Group>
        <Button
          mt={22}
          variant='default'
          onClick={() => {
            if (name && count) {
              form.setFieldValue('amenities', [
                ...(form.values.amenities || []),
                { name, count },
              ]);
              setName('');
              setCount(1);
            }
          }}
        >
          Add
        </Button>
      </Flex>

      <Table withTableBorder mt={'md'}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Count</Table.Th>
            <Table.Th ta={'right'}>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Stack>
  );
}
