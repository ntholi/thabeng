import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { MdFastfood as FastFood, MdCelebration, MdHotel } from 'react-icons/md';

export default function Home() {
  return (
    <main>
      <header className='relative h-[92vh]'>
        <Image
          src='/images/test-image.jpg'
          width={1500}
          height={1500}
          className='w-full h-full object-cover'
          alt='Thabeng Hotel'
        />
        <nav className='flex justify-center gap-5 p-5 bg-black/50 absolute w-full bottom-0 sm:mx-auto shadow-sm'>
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
