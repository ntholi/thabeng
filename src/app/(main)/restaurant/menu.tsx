'use client';

import React, { useEffect, useState } from 'react';
import Container from '../core/Container';
import { Salsa } from 'next/font/google';
import { cn } from '@/lib/utils';
import {
  MenuItem,
  MenuItemType,
} from '@/app/(admin)/admin/restaurant/menu/MenuItem';
import {
  MenuItemRepository,
  menuItemRepository,
} from '@/app/(admin)/admin/restaurant/menu/menuItemRepository';
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

  useEffect(() => {
    menuItemRepository.getAll().then(setData);
  }, []);

  function handleSelect(type: MenuItemType) {
    setFiltered(data.filter((it) => it.type === type));
  }

  return (
    <div className='-mt-20'>
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
      <Container as={'nav'} className='grid grid-cols-3 gap-3'>
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
      <MenuDisplay data={filtered} />
    </div>
  );
}
