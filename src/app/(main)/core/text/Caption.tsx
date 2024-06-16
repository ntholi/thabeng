import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
};

export default function Caption({ children, className, as }: Props) {
  const Tag = as || 'p';
  return (
    <Tag className={twMerge('font-sole md:text-xl', className)}>{children}</Tag>
  );
}
