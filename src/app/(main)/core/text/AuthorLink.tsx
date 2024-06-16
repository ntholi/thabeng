import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  author?: {
    id: string;
    name: string;
  };
  className?: string;
};

export default function AuthorLink({ author, className }: Props) {
  if (!author)
    return (
      <span
        className={twMerge(
          'block font-franklin text-lg font-light text-black',
          className,
        )}
      >
        Anonymous
      </span>
    );
  return (
    <Link
      href={`/authors/${author.id}`}
      className={twMerge(
        'm-0 block font-franklin text-lg font-medium text-black transition-colors duration-200 ease-in-out hover:text-zinc-600',
        className,
      )}
    >
      By {author?.name}
    </Link>
  );
}
