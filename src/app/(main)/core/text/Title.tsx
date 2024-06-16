import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
};

export default function Title({ children, className, as }: Props) {
  const Tag = as || 'h2';
  return (
    <Tag
      className={twMerge(
        'font-garamond text-2xl sm:font-normal md:text-3xl',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
