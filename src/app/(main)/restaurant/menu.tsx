import React from 'react';
import Container from '../core/Container';
import { Salsa } from 'next/font/google';
import { cn } from '@/lib/utils';

const font = Salsa({ weight: '400', subsets: ['latin'] });

export default function Menu() {
  const menu = [
    { name: 'Meals', image: 'meals.jpg' },
    { name: 'Desserts', image: 'dessert.jpg' },
    { name: 'Beverages', image: 'beverages.webp' },
    { name: 'Cocktails', image: 'cocktails.jpg' },
    { name: 'Gin & Tonic', image: 'gin.jpg' },
    { name: 'Wine', image: 'wine.jpg' },
  ];
  return (
    <div className='-mt-16'>
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
          Restaurant
        </h1>
      </div>
      <Container as={'nav'} className='grid grid-cols-3 gap-3'>
        {menu.map((item, index) => (
          <button key={index} className='group relative overflow-hidden'>
            <img
              src={`/images/${item.image}`}
              alt={item.name}
              className='h-52 w-full object-cover transition-transform duration-300 group-hover:scale-110'
            />
            <div className='absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:bg-opacity-20'></div>
            <div className='absolute inset-0 left-2 z-10 flex items-center justify-center'>
              <span className='font-semibold text-white'>{item.name}</span>
            </div>
          </button>
        ))}
      </Container>
    </div>
  );
}
