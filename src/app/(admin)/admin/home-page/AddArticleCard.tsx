'use client';
import {
  Autocomplete,
  Button,
  Card,
  CardProps,
  Combobox,
  Flex,
  Input,
  InputBase,
  Modal,
  Text,
  TextInput,
  useCombobox,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import ThemedIconButton from '../../admin-core/components/ThemedIconButton';
import { IconPlus } from '@tabler/icons-react';
import { postRepository } from '../posts/repository';
import { Post } from '../posts/Post';
import { slugify } from '../../admin-core/utils/utils';
import { homePageRepository } from './repository';

type Props = {
  index: number;
  imageHeight?: number | string;
  orientation?: 'horizontal' | 'vertical';
} & CardProps;

export default function AddArticleCard({ index, ...props }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = React.useState<Post[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  useEffect(() => {
    if (search.length >= 3) {
      postRepository.search('slug', slugify(search)).then(setData);
    } else {
      setData([]);
    }
  }, [search]);

  useEffect(() => {
    if (value) {
      homePageRepository.setArticle(index, value);
      setValue(null);
      setSearch('');
      close();
    }
  }, [value, close, index]);

  const shouldFilterOptions = data.every((item) => item.title !== search);
  const filteredOptions = shouldFilterOptions
    ? data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase().trim()),
      )
    : data;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item.id} key={item.id}>
      {item.title}
    </Combobox.Option>
  ));

  return (
    <>
      <Modal opened={opened} onClose={close} title={'Pick an Article'}>
        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
            setValue(val);
            setSearch(val);
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <TextInput
              label='Article'
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents='none'
              onClick={() => combobox.openDropdown()}
              onFocus={() => combobox.openDropdown()}
              onBlur={() => {
                combobox.closeDropdown();
                setSearch(value || '');
              }}
              placeholder='Search by title'
              value={search}
              onChange={(event) => {
                combobox.updateSelectedOptionIndex();
                setSearch(event.currentTarget.value);
              }}
            />
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>
              {options.length > 0 ? (
                options
              ) : (
                <Combobox.Empty>Nothing found</Combobox.Empty>
              )}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </Modal>
      <Card
        padding='xs'
        radius='md'
        h={props.orientation == 'horizontal' ? 300 : 240}
        withBorder
        {...props}
        pos={'relative'}
      >
        <Flex w='100%' h='100%' align={'center'} justify={'center'}>
          <ThemedIconButton h={50} w={50} onClick={open}>
            <IconPlus size={20} />
          </ThemedIconButton>
        </Flex>
      </Card>
    </>
  );
}
