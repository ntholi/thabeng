'use client';

import { DetailsView, FieldView, ResourcePage } from '@/app/(admin)/admin-core';
import { date } from '@/lib/utils/format';
import { Card, Stack, Text, Title } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';
import { Review } from './Review';
import { reviewRepository } from './repository';

export default function ReviewPage() {
  return (
    <ResourcePage
      resourceLabel='Reviews'
      repository={reviewRepository}
      details={ReviewDetails}
      navLinkProps={(it) => ({
        label: `${it.rating} Stars`,
        rightSection: <StatusIcon seen={it.seen} />,
      })}
    />
  );
}

function ReviewDetails({ item }: { item: Review }) {
  reviewRepository.markAsSeen(item.id);
  return (
    <DetailsView>
      <FieldView label='Rating' value={item.rating} />
      <FieldView label='Date' value={date(item.createdAt)} />
      <Card withBorder>
        <Title order={3} fw={'lighter'}>
          Comments
        </Title>
        <Stack mt={'sm'}>
          <Text size='sm'>{item.comment}</Text>
        </Stack>
      </Card>
    </DetailsView>
  );
}

function StatusIcon({ seen }: { seen?: boolean }) {
  const size = '1.2rem';

  return !seen ? <IconExclamationCircle color='orange' size={size} /> : null;
}
