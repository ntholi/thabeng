'use client';
import { ImagePicker } from '@/app/(admin)/admin-core';
import {
  Box,
  Button,
  Fieldset,
  Stack,
  TextInput,
  Textarea,
  useComputedColorScheme,
} from '@mantine/core';
import { useEffect, useState, useTransition } from 'react';
import { settingsRepository } from './repository';

export default function LandingPage() {
  const [image, setImage] = useState<string>();
  const [bookingEmailRecipient, setBookingEmailRecipient] = useState<string>();
  const colorScheme = useComputedColorScheme();
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    settingsRepository.getSettings().then((it) => {
      if (!it) return;
      setBookingEmailRecipient(it.bookingEmailRecipient);
    });
  }, []);

  function handleSave() {
    startTransition(async () => {
      await settingsRepository.setSettings({
        bookingEmailRecipient,
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
      <Fieldset legend='Settings' style={{ maxWidth: 600 }}>
        <TextInput
          value={bookingEmailRecipient}
          label='Booking Email Recipient'
          onChange={(e) => setBookingEmailRecipient(e.currentTarget.value)}
          type='email'
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
      </Fieldset>
    </Stack>
  );
}
