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
import LandingPost from './home/LandingPost';
import Hotel from './home/hotel';
import Restaurant from './home/Restaurant';

const font = Salsa({ weight: '400', subsets: ['latin'] });

export default function Home() {
  const banner = '/images/test-image.jpg';
  return (
    <>
      <main>
        <header
          style={{
            backgroundImage: `url(${banner})`,
          }}
          className={cn(
            'h-[75dvh] sm:h-[80vh] w-[100vw] top-0 bg-black/15 bg-cover bg-center text-white bg-blend-overlay',
            'flex flex-col justify-center items-center'
          )}
        >
          <div
            className={cn(
              'h-56 text-center dark-overlay px-6 sm:px-20 py-5',
              'flex flex-col justify-between'
            )}
          >
            <h1
              className={cn(font.className, 'text-5xl sm:text-7xl font-bold')}
            >
              Thabeng Hotel
            </h1>
            <LandingPost />
          </div>
        </header>
        <nav
          className={cn(
            'md:-mt-16 w-full flex justify-center gap-5 px-2 py-6 sm:py-10 sm:w-[60vw] sm:mx-auto',
            'backdrop-blur-sm bg-white/80'
          )}
        >
          <ClickableCard icon={MdHotel} text='Hotel' href='#hotel' />
          <ClickableCard icon={FastFood} text='Restaurant' href='#restaurant' />
          <ClickableCard icon={MdCalendarMonth} text='Events' href='/events' />
        </nav>

        <div className='bg-gray-50'>
          <Hotel />
          <Container className='px-0 sm:px-0 py-0'>
            <Divider />
          </Container>
          <Restaurant />
        </div>
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
      <Icon className='text-xl sm:text-xl hidden sm:block' />
      <span className='text-xs sm:text-sm'>{text}</span>
    </Button>
  );
}
