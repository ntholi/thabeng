import { storage } from '@/lib/config/firebase';
import {
  ActionIcon,
  ActionIconProps,
  Loader,
  Stack,
  Text,
} from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React, { useRef, useState, useTransition } from 'react';

type Props = {
  folder: string;
  onComplete: (url: string) => void;
} & ActionIconProps;

export default function NewPhoto({ folder, onComplete, ...props }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleUpload() {
    if (inputRef.current?.files?.length) {
      const file = inputRef.current.files[0];
      const path = await generateFilePath(folder, file);
      const fileRef = ref(storage, path);
      startTransition(async () => {
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        onComplete(url);
      });
    }
  }

  return (
    <>
      <ActionIcon
        variant='default'
        onClick={() => inputRef?.current?.click()}
        disabled={isPending}
        {...props}
      >
        {isPending ? (
          <Loader />
        ) : (
          <Stack align='center'>
            <IconPhoto size={'2rem'} />
            <Text size='xs' c={'gray'}>
              New Photo
            </Text>
          </Stack>
        )}
      </ActionIcon>
      <input
        type='file'
        ref={inputRef}
        accept='image/*'
        onChange={handleUpload}
        hidden
      />
    </>
  );
}

async function generateFilePath(folder: string | undefined, file: File) {
  const message = file.name + file.size + file.lastModified;
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const digest = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(digest));
  const hash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  const fileName = `${hash}.${file.name.split('.').pop()}`;
  if (folder) {
    return `${folder}/${fileName}`;
  }
  return fileName;
}
