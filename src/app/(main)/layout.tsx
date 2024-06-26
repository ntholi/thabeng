import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from './core/Navbar';
import Footer from './core/Footer';
import { cn } from '@nextui-org/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Thabeng Hotel',
  description: 'Thabeng Hotel is a hotel in Lesotho',
  keywords: 'Hotel, Accommodation, Lesotho',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'bg-gray-50/80')}>
        <Providers>
          <Navbar />
          {children}
          <div className='h-[20vh]'></div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
