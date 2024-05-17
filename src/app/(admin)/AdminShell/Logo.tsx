'use client';
import React from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import {
  Image,
  Text,
  MantineSize,
  useComputedColorScheme,
} from '@mantine/core';

type Props = {
  size?: MantineSize;
};

export default function Logo({ size = 'xs' }: Props) {
  const colorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });
  const logo =
    colorScheme === 'dark' ? '/images/logo-white.png' : '/images/logo.png';

  const sizeMap = {
    xs: 20,
    sm: 80,
    md: 120,
    lg: 200,
    xl: 400,
  };

  return (
    <Link href='/'>
      <Image
        component={NextImage}
        h={sizeMap[size]}
        width={sizeMap[size] * 5}
        height={sizeMap[size] * 5}
        src={logo}
        alt='Logo'
      />
    </Link>
  );
}
