import { Indicator } from '@mantine/core';
import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{ label: React.ReactNode }>;

export default function NotificationIndicator({ children, label }: Props) {
  return (
    <Indicator
      position='middle-end'
      color='red'
      offset={20}
      size={23}
      label={label}
      disabled={!label}
    >
      {children}
    </Indicator>
  );
}
