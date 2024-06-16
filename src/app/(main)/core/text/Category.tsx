import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
};
export default function Category({ children, className, as }: Props) {
  const Tag = as || 'span';
  return (
    <Tag
      className={twMerge(
        'block font-franklin text-base font-[500] uppercase text-teal-400',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
