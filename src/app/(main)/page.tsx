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
          'absolute h-[100vh] w-[100vw] top-0 bg-black/15 bg-cover bg-center text-white bg-blend-overlay',
          'flex flex-col justify-center items-center'
        )}
      >
        <div className='h-56 flex flex-col items-center dark-overlay px-20 py-5'>
          <h1 className={cn(josefinSans.className, 'text-6xl font-bold')}>
            Thabeng Hotel
          </h1>
          <article>
            <p className='mt-4'>
              Welcome to Thabeng Hotel, where you can find the best services for
              your stay.
            </p>
          </article>
        </div>
        <nav
          className={cn(
            'absolute w-full bottom-5',
            'flex justify-center gap-5 py-6 w-[60vw] sm:mx-auto',
            'backdrop-blur-sm bg-white/30',
            'rounded-t-lg sm:rounded-lg'
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
        'rounded-md bg-blue-900/80 py-4 text-white',
        'flex gap-2 w-40 justify-center'
      )}
    >
      <Icon className='text-xl sm:text-xl' />
      <span className='text-sm'>{text}</span>
    </Link>
  );
}
