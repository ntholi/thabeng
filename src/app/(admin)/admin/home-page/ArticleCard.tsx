import {
  ActionIcon,
  Card,
  CardProps,
  Flex,
  Grid,
  GridCol,
  Image,
  Text,
} from '@mantine/core';
import { IconPlus, IconTrashFilled } from '@tabler/icons-react';
import NextImage from 'next/image';
import { Post } from '../posts/Post';
import AddArticleCard from './AddArticleCard';
import { useTransition } from 'react';
import { homePageRepository } from './repository';

type Props = {
  index: number;
  article: Post | null;
  imageHeight?: number | string;
  orientation?: 'horizontal' | 'vertical';
} & CardProps;

export default function ArticleCard({ article, orientation, ...props }: Props) {
  if (!article) {
    return <AddArticleCard {...props} />;
  }
  return orientation === 'vertical' ? (
    <VerticalCard article={article} {...props} />
  ) : (
    <HorizontalCard article={article} {...props} />
  );
}

function HorizontalCard({ article, index, ...props }: Props) {
  return (
    <Card padding='xs' radius='md' withBorder {...props} pos={'relative'}>
      <Card.Section>
        <Grid>
          <GridCol span={4}>
            <Image
              component={NextImage}
              src={article?.image || ''}
              h={props.imageHeight || '100%'}
              w={'100%'}
              height={500}
              width={500}
              alt='Norway'
            />
            <DeleteButton index={index} />
          </GridCol>
          <GridCol span={8}>
            <Text fw={500} mt={'sm'} size='1.2rem'>
              {article?.title}
            </Text>
            <Text size='sm' c='dimmed' truncate='end'>
              {article?.caption}
            </Text>
          </GridCol>
        </Grid>
      </Card.Section>
    </Card>
  );
}

const VerticalCard = ({ article, index, ...props }: Props) => {
  return (
    <Card padding={'xs'} radius='md' withBorder {...props} pos={'relative'}>
      <Card.Section>
        <Image
          component={NextImage}
          src={article?.image || ''}
          h={props.imageHeight || '100%'}
          height={400}
          width={400}
          alt='Norway'
        />
      </Card.Section>
      <DeleteButton index={index} />

      <Text size='sm' mt={'md'} fw={500}>
        {article?.title}
      </Text>

      <Text size='xs' c='dimmed' truncate='end'>
        {article?.caption}
      </Text>
    </Card>
  );
};

function DeleteButton({ index }: { index: number }) {
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    startTransition(async () => {
      await homePageRepository.deleteArticle(index);
    });
  };
  return (
    <ActionIcon
      pos={'absolute'}
      radius={'xl'}
      variant='filled'
      color='rgba(0, 0, 0, 0.8)'
      top={5}
      right={5}
      loading={isPending}
      onClick={handleDelete}
    >
      <IconTrashFilled size={'0.9rem'} />
    </ActionIcon>
  );
}
