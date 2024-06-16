import { Post } from '@/app/(admin)/admin/posts/Post';
import { postRepository } from '@/app/(admin)/admin/posts/repository';
import { date } from '@/lib/utils/format';
import { Divider, Skeleton } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

type Props = {
  id: string;
};

export default function Content({ id }: Props) {
  return (
    <section className='flex flex-col gap-2'>
      <Suspense fallback={<Loader />}>
        <Display id={id} />
      </Suspense>
    </section>
  );
}

async function Display({ id }: Props) {
  const articles = await postRepository.latestPosts();
  return (
    <section className='mt-10 flex flex-col gap-2.5 sm:gap-5'>
      {articles.map((post, index) => (
        <>
          <Article key={index} article={post} />
          <Divider />
        </>
      ))}
    </section>
  );
}

export function Article({ article }: { article: Post }) {
  return (
    <article className={'grid grid-cols-12 gap-5 sm:gap-10'}>
      <Link href={`/posts/${article.id}`} className='col-span-4'>
        <Image
          src={article.image}
          alt={article.title}
          className={'h-20 rounded object-cover shadow-lg sm:h-32'}
          width={700}
          height={700}
        />
      </Link>
      <div className={'font-serif gap-`1 z-10 col-span-8 flex flex-col'}>
        <h2 className='text-xl'>
          <Link href={`/posts/${article.id}`}>{article.title}</Link>
        </h2>
        <p className='hidden sm:block'>{article.caption}</p>
        <span className='mt-1 block font-franklin text-xs font-medium text-black sm:mt-0'>
          {date(article.publishedAt)}
        </span>
      </div>
    </article>
  );
}

function Loader() {
  return (
    <section className='mt-10 flex flex-col gap-2.5 sm:gap-5'>
      {new Array(5).fill(0).map((_, index) => (
        <article key={index} className={'grid grid-cols-12 gap-5 sm:gap-10'}>
          <Skeleton className='col-span-4 h-20 sm:h-32' />
          <div className='col-span-8 space-y-2'>
            <Skeleton className='h-5 w-24 rounded-sm' />
            <Skeleton className='h-5 rounded-sm' />
            <Skeleton className='h-14 rounded-sm' />
          </div>
        </article>
      ))}
    </section>
  );
}
