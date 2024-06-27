'use client';
import {
  Navbar as NextUiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from '@nextui-org/react';
import { useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith('/auth')) return null;

  const menuItems = [
    {
      label: 'Hotel',
      href: '/#hotel',
    },
    {
      label: 'Restaurant',
      href: '/restaurant',
    },
    {
      label: 'Events',
      href: '/events',
    },
    {
      label: 'Posts',
      href: '/posts',
    },
    {
      label: 'Reviews',
      href: '/reviews',
    },
  ];

  return (
    <NextUiNavbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <NextLink href='/'>
            <Image
              src={'/images/logo.png'}
              width={50}
              height={50}
              className='h-10 w-auto'
              alt={'Thabeng Hotel'}
            />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden gap-5 sm:flex' justify='center'>
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link color='foreground' href={item.href} as={NextLink}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              as={NextLink}
              color={
                index === 2
                  ? 'primary'
                  : index === menuItems.length - 1
                    ? 'danger'
                    : 'foreground'
              }
              className='w-full'
              href={item.href}
              size='lg'
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUiNavbar>
  );
}
