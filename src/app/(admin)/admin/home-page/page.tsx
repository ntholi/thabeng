'use client';
import { Box, Button, Select, useComputedColorScheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Post } from '../posts/Post';
import { postRepository } from '../posts/repository';
import { homePageRepository } from './repository';

export default function LandingPage() {
  const [homePost, setHomePost] = useState<HomePage | null>(null);
  const [data, setData] = useState<Post[]>([]);
  const colorScheme = useComputedColorScheme();

  useEffect(() => {
    homePageRepository.getPost().then((it) => {
      if (it) {
        setHomePost({
          value: it.value,
          label: it.label,
        });
      }
    });
    postRepository.getAll().then(setData);
  }, []);

  function handleSave() {
    if (homePost) {
      homePageRepository.setPost({
        value: homePost.value,
        label: homePost.label,
      });
    }
  }

  return (
    <Box
      px={{
        base: 'xl',
        md: 200,
        lg: 400,
      }}
      py={{
        base: 'lg',
        sm: 100,
      }}
    >
      <Select
        searchable
        clearable
        label={'Home Page Post'}
        value={homePost?.value}
        onChange={(_, options) => {
          if (options) {
            const post = data.find((it) => it.id === options.value);
            if (!post) {
              throw new Error('Post not found');
            }
            setHomePost({
              value: post.id,
              label: post.title,
            });
            console.log(homePost);
          }
        }}
        data={data.map((it) => {
          if (!it.id) {
            throw new Error('Resource does not have an id');
          }
          return {
            value: it.id,
            label: it.title,
          };
        })}
      />
      <Button
        color='dark'
        fullWidth
        onClick={handleSave}
        variant={colorScheme === 'dark' ? 'default' : 'filled'}
      >
        Save
      </Button>
    </Box>
  );
}
