'use client';
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from '@nextui-org/react';

import { Link } from '@nextui-org/react';

import Image from 'next/image';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

const navItems = [
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
  {
    label: 'Gallery',
    href: '/gallery',
  },
];

export default function Navbar() {
  const [homeStyle, setHomeStyle] = React.useState('');
  const pathname = usePathname();

  useEffect(() => {
    const checkIfHome = () => {
      if (
        (window.scrollY < 100 && pathname === '/') ||
        pathname.includes('/locations/')
      ) {
        setHomeStyle('sm:absolute sm:text-white sm:bg-black/10');
      } else {
        setHomeStyle('');
      }
    };
    checkIfHome();
    const handleScroll = () => {
      checkIfHome();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const scrollToGallery = () => {
    const gallerySection = document.getElementById('gallery');
    gallerySection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <NextUINavbar maxWidth='xl' shouldHideOnScroll className={homeStyle}>
      <NavbarContent>
        <NavbarMenuToggle className='sm:hidden' />
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
        <ul className='ml-2 hidden justify-start gap-4 sm:flex'>
          {navItems.map((item) => {
            if (item.label == 'Gallery') {
              return (
                <NavbarItem key={item.href}>
                  <button color='foreground' onClick={scrollToGallery}>
                    {item.label}
                  </button>
                </NavbarItem>
              );
            }
            return (
              <NavbarItem key={item.href}>
                <NextLink color='foreground' href={item.href}>
                  {item.label}
                </NextLink>
              </NavbarItem>
            );
          })}
        </ul>
      </NavbarContent>

      <NavbarMenu>
        <div className='mx-4 mt-2 flex flex-col gap-2'>
          {navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={index === 2 ? 'primary' : 'foreground'}
                href='#'
                size='lg'
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
}
