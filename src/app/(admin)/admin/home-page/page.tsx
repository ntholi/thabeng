'use client';
import { ImagePicker } from '@/app/(admin)/admin-core';
import {
  Button,
  Stack,
  TextInput,
  useComputedColorScheme,
} from '@mantine/core';
import { useEffect, useState, useTransition } from 'react';
import { homePageRepository } from './repository';

export default function LandingPage() {
  const [image, setImage] = useState<string>();
  const [tagline, setTagline] = useState<string>('');
  const colorScheme = useComputedColorScheme();
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    homePageRepository.getHomePage().then((it) => {
      if (!it) return;
      setImage(it.backgroundImage);
      setTagline(it.tagline);
    });
  }, []);

  function handleSave() {
    startTransition(async () => {
      await homePageRepository.setHomePage({
        backgroundImage: image,
        tagline,
      });
    });
  }

  return (
    <Stack
      px={{
        base: 'xl',
        md: 200,
        lg: 400,
      }}
      py={{
        base: 'lg',
        sm: 70,
      }}
    >
      <ImagePicker
        name='Background Image'
        value={image}
        onChange={(it: string) => setImage(it)}
        folder='restaurant-page'
        height={200}
      />
      <TextInput
        value={tagline}
        onChange={(e) => setTagline(e.currentTarget.value)}
        placeholder='Tagline'
      />
      <Button
        color='dark'
        mt={'lg'}
        fullWidth
        loading={pending}
        onClick={handleSave}
        variant={colorScheme === 'dark' ? 'default' : 'filled'}
      >
        Save
      </Button>
    </Stack>
  );
}
