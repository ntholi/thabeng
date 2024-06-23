import { auth } from '@/lib/config/firebase';
import { AppShell, Avatar, Divider, NavLink, ScrollArea } from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  IconBed,
  IconBowlSpoon,
  IconBrandBooking,
  IconCalendarEvent,
  IconCategory,
  IconChevronRight,
  IconClock,
  IconGlass,
  IconHome,
  IconLogout2,
  IconMeat,
  IconNews,
  IconToolsKitchen,
  IconUserEdit,
  IconWallpaper,
} from '@tabler/icons-react';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSession } from '../auth/SessionProvider';
import NotificationIndicator from './NotificationIndicator';
import { useUnseenBookings } from '../admin/bookings/UnseenBookingsProvider';

export default function Navigation() {
  const pathname = usePathname();
  const unseenBookings = useUnseenBookings();

  return (
    <AppShell.Navbar p='xs'>
      <AppShell.Section grow component={ScrollArea}>
        <NavLink
          label='Home Page'
          component={Link}
          active={pathname.startsWith('/admin/home-page')}
          href={'/admin/home-page'}
          leftSection={<IconHome size='1.1rem' />}
          rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
        />
        <NavLink
          label='Posts'
          component={Link}
          active={pathname.startsWith('/admin/posts')}
          href={'/admin/posts'}
          leftSection={<IconNews size='1.1rem' />}
          rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
        />
        <NotificationIndicator label={unseenBookings}>
          <NavLink
            label='Bookings'
            component={Link}
            active={pathname.startsWith('/admin/bookings')}
            href={'/admin/bookings'}
            leftSection={<IconBrandBooking size='1.1rem' />}
            rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
          />
        </NotificationIndicator>
        <NavLink
          label='Rooms'
          component={Link}
          active={pathname.startsWith('/admin/rooms')}
          href={'/admin/rooms'}
          leftSection={<IconBed size='1.1rem' />}
          rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
        />
        <NavLink
          label='Restaurant'
          leftSection={<IconToolsKitchen size='1.1rem' />}
          opened
        >
          <NavLink
            label='Page'
            component={Link}
            active={pathname.startsWith('/admin/restaurant/page')}
            href={'/admin/restaurant/page'}
            leftSection={<IconWallpaper size='1.1rem' />}
            rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
          />
          <NavLink
            label='Meal Times'
            component={Link}
            active={pathname.startsWith('/admin/restaurant/meal-times')}
            href={'/admin/restaurant/meal-times'}
            leftSection={<IconClock size='1.1rem' />}
            rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
          />
          <NavLink
            label='Meals'
            component={Link}
            active={pathname.startsWith('/admin/restaurant/meals')}
            href={'/admin/restaurant/meals'}
            leftSection={<IconBowlSpoon size='1.1rem' />}
            rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
          />
          <NavLink
            label='Beverage'
            component={Link}
            active={pathname.startsWith('/admin/restaurant/beverages')}
            href={'/admin/restaurant/beverages'}
            leftSection={<IconGlass size='1.1rem' />}
            rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
          />
        </NavLink>
        <NavLink
          label='Events'
          component={Link}
          active={pathname.startsWith('/admin/events')}
          href={'/admin/events'}
          leftSection={<IconCalendarEvent size='1.1rem' />}
          rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
        />
        <NavLink
          label='About Us'
          component={Link}
          active={pathname.startsWith('/admin/about-us')}
          href={'/admin/about-us'}
          leftSection={<IconCalendarEvent size='1.1rem' />}
          rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
        />
      </AppShell.Section>
      <AppShell.Section>
        <Divider mb='md' />
        <UserButton />
      </AppShell.Section>
    </AppShell.Navbar>
  );
}

function UserButton() {
  const { user } = useSession();

  const openModal = () =>
    modals.openConfirmModal({
      centered: true,
      title: 'Confirm logout',
      children: 'Are you sure you want to logout?',
      confirmProps: { color: 'dark' },
      labels: { confirm: 'Logout', cancel: 'Cancel' },
      onConfirm: () => signOut(auth),
    });

  return (
    <NavLink
      label='Logout'
      description={user?.displayName}
      onClick={openModal}
      leftSection={<Avatar src={user?.photoURL} />}
      rightSection={<IconLogout2 size='1.1rem' />}
    />
  );
}
