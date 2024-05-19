import { cn } from '@/lib/utils';
import Link from 'next/link';
import { MdFastfood as FastFood, MdCelebration, MdHotel } from 'react-icons/md';
import { Josefin_Sans } from 'next/font/google';

const josefinSans = Josefin_Sans({ subsets: ['latin'] });

export default function Home() {
  const banner = '/images/test-image.jpg';
  return (
    <main>
      <header
        style={{
          backgroundImage: `url(${banner})`,
        }}
        className={cn(
          'absolute h-[100vh] w-[100vw] top-0 bg-black/20 bg-cover bg-center text-white bg-blend-overlay',
          'flex flex-col justify-center items-center'
        )}
      >
        <div className='h-56'>
          <h1 className={cn(josefinSans.className, 'text-6xl font-bold')}>
            Thabeng Hotel
          </h1>
        </div>
        <nav
          className={cn(
            'flex justify-center gap-5 py-6  absolute w-full bottom-0 sm:mx-auto',
            'backdrop-blur-sm bg-white/30',
            'w-[60vw] mx-auto rounded-t-lg sm:rounded-lg'
          )}
        >
          <ClickableCard icon={MdHotel} text='Hotel' />
          <ClickableCard icon={FastFood} text='Restaurant' />
          <ClickableCard icon={MdCelebration} text='Events' />
        </nav>
      </header>
    </main>
  );
}

type ClickableCardProps = {
  icon: React.ElementType;
  text: string;
};

function ClickableCard({ icon: Icon, text }: ClickableCardProps) {
  return (
    <Link
      href='#'
      className={cn(
        'rounded-md bg-blue-900/70 py-3 text-white',
        'flex gap-2 w-40 justify-center'
      )}
    >
      <Icon className='text-xl sm:text-xl' />
      <span className='text-sm'>{text}</span>
    </Link>
  );
}
