import React from 'react';
import Container from '../core/Container';

export default function Menu() {
  const menu = [
    { name: 'Meals', image: 'meals.jpg' },
    { name: 'Beverages', image: 'beverages.webp' },
    { name: 'Cocktails', image: 'cocktails.jpg' },
    { name: 'Gin & Tonic', image: 'gin.jpg' },
    { name: 'Wine', image: 'wine.jpg' },
  ];
  return (
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
  );
}
