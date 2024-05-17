'use client';
import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Loader,
  Paper,
  SegmentedControl,
  Stack,
  Text,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import Logo from '../../AdminShell/Logo';
import { Post } from '../posts/Post';
import ArticleCard from './ArticleCard';
import { homePageRepository } from './repository';
import ThemedButton from '../../admin-core/components/ThemedButton';
import AutoArrange from './AutoArrange';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Array<Post | null>>([]);

  useEffect(() => {
    return homePageRepository.listenArticles(setArticles);
  }, []);

  useEffect(() => {
    if (articles.length) setLoading(false);
  }, [articles]);

  if (loading) {
    return (
      <Flex h={'100%'} w={'100%'} justify={'center'} align={'center'}>
        <Loader />
      </Flex>
    );
  }

  return (
    <Box p={'md'}>
      <Paper withBorder p={8} shadow='sm'>
        <Paper p={'sm'}>
          <Group justify='space-between'>
            <Logo />
            <AutoArrange />
          </Group>
        </Paper>
        <Divider />
        <Stack mt={'xl'}>
          <Flex justify={'center'}>
            <ArticleCard
              index={0}
              article={articles[0]}
              w={{ base: '100%', sm: 300 }}
              orientation='vertical'
            />
          </Flex>
          <Flex justify={'center'} gap={'xl'} p={'xl'}>
            {articles.slice(1, 4).map((it, i) => (
              <ArticleCard
                key={i}
                index={i + 1}
                article={it}
                imageHeight={150}
                w={{ base: '100%', sm: 200 }}
                orientation='vertical'
              />
            ))}
          </Flex>
          <Divider mx={'lg'} />
          <Flex justify={'center'} gap={'xl'} p={'xl'}>
            {articles.slice(4, 8).map((it, i) => (
              <ArticleCard
                key={i}
                index={i + 4}
                article={it}
                imageHeight={130}
                w={{ base: '100%', sm: 200 }}
                orientation='vertical'
              />
            ))}
          </Flex>
          <Divider mx={'lg'} />
          <Stack px={80}>
            {articles.slice(8, 11).map((it, i) => (
              <ArticleCard
                key={i}
                index={i + 4}
                article={it}
                imageHeight={130}
                orientation='horizontal'
              />
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
