'use client';

import {
  MenuItem,
  MenuItemType,
} from '@/app/(admin)/admin/restaurant/menu/MenuItem';
import { menuItemRepository } from '@/app/(admin)/admin/restaurant/menu/menuItemRepository';
import { cn } from '@/lib/utils';
import { Salsa } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';
import Container from '../core/Container';
import MenuDisplay from './MenuDisplay';

const font = Salsa({ weight: '400', subsets: ['latin'] });

type MenuType = {
  type: MenuItemType;
  image: string;
}[];

const menu: MenuType = [
  { type: 'Meals', image: 'meals.jpg' },
  { type: 'Desserts', image: 'dessert.jpg' },
  { type: 'Beverages', image: 'beverages.webp' },
  { type: 'Cocktails', image: 'cocktails.jpg' },
  { type: 'Gin & Tonic', image: 'gin.jpg' },
  { type: 'Wine', image: 'wine.jpg' },
];

export default function Menu() {
  const [data, setData] = useState<MenuItem[]>([]);
  const [filtered, setFiltered] = useState<MenuItem[]>([]);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<MenuItemType | null>(null);

  useEffect(() => {
    menuItemRepository.getAll(500).then(setData);
  }, []);

  function handleSelect(type: MenuItemType) {
    setFiltered(data.filter((item) => item.type === type));
    setSelected(type);
  }

  useEffect(() => {
    if (filtered.length > 0) {
      menuItemsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filtered]);

  return (
    <div className='sm:-mt-20'>
      <div className='col-span-12 my-8'>
        <p className='text-center text-xs uppercase text-foreground-400'>
          Browse our menu
        </p>
        <h1
          className={cn(
            font.className,
            'text-center text-6xl font-bold text-blue-900',
          )}
        >
          Menu
        </h1>
      </div>
      <Container as={'nav'} className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
        {menu.map((item, index) => (
          <button
            key={index}
            className='group relative overflow-hidden'
            onClick={() => handleSelect(item.type)}
          >
            <img
              src={`/images/${item.image}`}
              alt={item.type}
              className='h-52 w-full object-cover transition-transform duration-300 group-hover:scale-110 group-active:scale-105'
            />
            <div className='absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:bg-opacity-20'></div>
            <div className='absolute inset-0 left-2 z-10 flex items-center justify-center'>
              <span className='text-xl font-semibold text-white'>
                {item.type}
              </span>
            </div>
          </button>
        ))}
      </Container>
      {filtered.length > 0 && (
        <section ref={menuItemsRef}>
          <MenuDisplay menuType={selected} data={filtered} />
        </section>
      )}
    </div>
  );
}
