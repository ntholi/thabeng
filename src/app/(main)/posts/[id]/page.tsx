import { postRepository } from '@/app/(admin)/admin/posts/repository';
import AuthorLink from '@/app/(main)/core/text/AuthorLink';
import Caption from '@/app/(main)/core/text/Caption';
import CategoryLink from '@/app/(main)/core/text/CategoryLink';
import Title from '@/app/(main)/core/text/Title';
import { date } from '@/lib/utils/format';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PiShareFatThin } from 'react-icons/pi';
import RawHTML from '@/components/RawHTML';
import { Button, Divider, cn } from '@nextui-org/react';
import Container from '../../core/Container';
import { Salsa } from 'next/font/google';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props) {
  const article = await postRepository.get(id);
  if (!article) {
    return;
  }
  return {
    title: article.title,
    authors: ['Thabeng'],
    description: article.caption,
    image: article.image,
    keywords: 'Thabeng, Hotel',
    publisher: 'Thabeng',
    publishedAt: article.publishedAt,
  } as Metadata;
}

const font = Salsa({ weight: '400', subsets: ['latin'] });

export default async function ArticlePage({ params: { id } }: Props) {
  const article = await postRepository.get(id);
  if (!article) {
    return notFound();
  }

  return (
    <main className='flex flex-col items-center sm:mt-8'>
      <Container width='lg' className='flex flex-col gap-3'>
        <h1 className={cn(font.className, 'text-6xl font-bold text-blue-900')}>
          {article.title}
        </h1>
        <Caption className='text-lg md:text-[1.3rem]'>
          {article.caption}
        </Caption>
        <Divider className='my-3' />
        <figure className='sm:w-full'>
          <Image
            src={article.image}
            alt={article.title}
            className='h-auto w-full object-cover shadow-lg sm:h-[60vh]'
            width={1400}
            height={1400}
          />
        </figure>
      </Container>
      <Container as='section' width='md'>
        <div className='flex items-center justify-between'>
          <span className='text-xs'>{date(article.publishedAt)}</span>
        </div>
        <Divider className='my-6' />
        <RawHTML className='text-black' as={'section'} html={article.body} />
      </Container>
    </main>
  );
}
