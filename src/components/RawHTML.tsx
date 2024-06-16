import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  html?: string;
  className?: string | undefined;
  as?: React.ElementType;
};

export default function RawHTML({ html, className, as }: Props) {
  if (!html) return null;
  const Tag = as || 'div';
  return (
    <Tag
      className={twMerge(
        `raw-div mx-auto mt-8 font-garamond text-[1.3rem] text-gray-500 md:w-[100%]`,
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
