import { SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { ImagePicker } from '../../../admin-core';
import { Room } from '../Room';
import NewPhoto from './NewPhoto';

type Props = {
  form: ReturnType<typeof useForm<Room>>;
};

export default function PhotoInput({ form }: Props) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    form.setFieldValue('images', images);
  }, [images]);

  return (
    <SimpleGrid cols={3} py={50} px={70} pb={120}>
      <NewPhoto
        w={'100%'}
        h={200}
        folder='roomId'
        onComplete={(url) => {
          setImages([...images, url]);
        }}
      />
      {images?.map((image) => (
        <ImagePicker height={200} key={image} folder='rooms' value={image} />
      ))}
    </SimpleGrid>
  );
}
