import React from 'react';
import Category from './Category';
import Link from 'next/link';

type Props = {
  className?: string;
  category?: {
    id: string;
    name: string;
  };
};

export default function CategoryLink({ category, className }: Props) {
  if (!category) return null;
  return (
    <Category className={className}>
      <Link href={`/categories/${category.id}`}>{category.name}</Link>
    </Category>
  );
}
