import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { MdFastfood as FastFood, MdCelebration, MdHotel } from 'react-icons/md';

export default function Home() {
  const banner = '/images/test-image.jpg';
  return (
    <main>
      <header
        style={{
          backgroundImage: `url(${banner})`,
        }}
        className={cn(
          'relative h-[92vh] bg-black/5 bg-cover bg-center text-white bg-blend-overlay',
          'flex flex-col justify-center items-center'
        )}
      >
        <div className='p-52 dark-overlay'>
          <h1 className='text-5xl'>Thabeng Hotel</h1>
        </div>
        <nav className='flex justify-center gap-5 py-6 bg-black/50 absolute w-full bottom-0 sm:mx-auto shadow-sm'>
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
        'rounded-md border bg-black/60 py-5 text-white',
        'flex gap-2 w-48 justify-center'
      )}
    >
      <Icon className='text-xl sm:text-2xl' />
      <span>{text}</span>
    </Link>
  );
}
