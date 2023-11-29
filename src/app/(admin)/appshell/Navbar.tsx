import { NavLink } from '@mantine/core';
import {
  IconCalendarEvent,
  IconChevronRight,
  IconHome,
} from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav>
      <NavLink
        label='Home Page'
        href={'/admin/home'}
        leftSection={<IconHome size='1rem' stroke={1.5} />}
        rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
      />
      <NavLink
        label='Events'
        component={Link}
        href={'/admin/events'}
        leftSection={<IconCalendarEvent size='1rem' stroke={1.5} />}
        rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
      />
    </nav>
  );
}
