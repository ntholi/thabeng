import React from 'react';
import Header from './Header';
import Menu from './menu';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thabeng Restaurant',
  description: 'Thabeng Restaurant',
  keywords:
    'Restaurant, Food, Drinks, Meals, Desserts, Beverages, Cocktails, Gin & Tonic, Wine, Lesotho',
};

export const revalidate = 60 * 5;

export default function RestaurantPage() {
  return (
    <div>
      <Header />
      <Menu />
    </div>
  );
}
