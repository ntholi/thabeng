import { cn } from '@/lib/utils';
import { Button, Divider } from '@nextui-org/react';
import { Salsa } from 'next/font/google';
import Link from 'next/link';
import {
  MdFastfood as FastFood,
  MdCalendarMonth,
  MdHotel,
} from 'react-icons/md';
import Container from './core/Container';
import Footer from './core/Footer';
import Hotel from './home/Hotel';
import Restaurant from './home/Restaurant';

const font = Salsa({ weight: '400', subsets: ['latin'] });

export default function Home() {
  const banner = '/images/test-image.jpg';
  return (
    <>
      <header
        style={{
          backgroundImage: `url(${banner})`,
        }}
        className={cn(
          'absolute top-0 h-dvh w-full bg-black/15 bg-cover bg-center text-white bg-blend-overlay',
          'flex flex-col items-center justify-center',
        )}
      >
        <div
          className={cn(
            'dark-overlay h-56 px-6 py-5 text-center sm:px-20',
            'flex flex-col gap-3.5',
          )}
        >
          <h1 className={cn(font.className, 'text-5xl font-bold sm:text-7xl')}>
            Thabeng Hotel
          </h1>
          <p className='text-lg sm:text-xl'>Your Home Away From Home</p>
          <div className='text-center'>
            <Button
              variant='bordered'
              color='primary'
              radius='full'
              className='border-1 border-white px-8 text-white'
            >
              About Us
            </Button>
          </div>
        </div>
        <nav
          className={cn(
            'absolute bottom-0 mx-auto flex w-full justify-center gap-5 px-2 py-6 sm:bottom-5 sm:w-[80vw] sm:rounded-lg sm:py-10 lg:w-[45vw]',
            'bg-white/45 backdrop-blur-md',
          )}
        >
          <ClickableCard icon={MdHotel} text='Hotel' href='#hotel' />
          <ClickableCard icon={FastFood} text='Restaurant' href='#restaurant' />
          <ClickableCard icon={MdCalendarMonth} text='Events' href='/events' />
        </nav>
      </header>
      <div className='h-[90vh]'></div>
      <main className='bg-blue-900/5'>
        <Hotel />
        <Container className='px-0 py-0 sm:px-0'>
          <Divider />
        </Container>
        <Restaurant />
      </main>
      <Footer />
    </>
  );
}

type ClickableCardProps = {
  icon: React.ElementType;
  text: string;
  href?: string;
};

function ClickableCard({ icon: Icon, text, href = '#' }: ClickableCardProps) {
  return (
    <Button
      as={Link}
      href={href}
      className='bg-blue-900/90'
      color='primary'
      size='lg'
    >
      <Icon className='hidden text-xl sm:block sm:text-xl' />
      <span className='text-xs sm:text-sm'>{text}</span>
    </Button>
  );
}
