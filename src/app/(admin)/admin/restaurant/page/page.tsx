'use client';
import { ImagePicker } from '@/app/(admin)/admin-core';
import {
  Box,
  Button,
  Stack,
  TextInput,
  Textarea,
  useComputedColorScheme,
} from '@mantine/core';
import { useEffect, useState, useTransition } from 'react';
import { restaurantPageRepository } from './repository';

export default function LandingPage() {
  const [image, setImage] = useState<string>();
  const [heading, setHeading] = useState<string>();
  const [subheading, setSubheading] = useState<string>();
  const colorScheme = useComputedColorScheme();
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    restaurantPageRepository.getRestaurantPage().then((it) => {
      if (!it) return;
      setImage(it.backgroundImage);
      setHeading(it.heading);
      setSubheading(it.subheading);
    });
  }, []);

  function handleSave() {
    startTransition(async () => {
      await restaurantPageRepository.setRestaurantPage({
        backgroundImage: image,
        heading,
        subheading,
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
        name="Background Image"
        value={image}
        onChange={(it: string) => setImage(it)}
        folder="restaurant-page"
        height={200}
      />
      <TextInput
        value={heading}
        onChange={(e) => setHeading(e.currentTarget.value)}
        placeholder="Heading"
      />
      <Textarea
        value={subheading}
        onChange={(e) => setSubheading(e.currentTarget.value)}
        placeholder="Subheading"
      />
      <Button
        color="dark"
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
