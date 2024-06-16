import { Divider, cn } from '@nextui-org/react';
import { Salsa } from 'next/font/google';
import Container from '../core/Container';
import Content from './Content';

type Props = {
  params: {
    id: string;
  };
};
const font = Salsa({ weight: '400', subsets: ['latin'] });

export default async function AuthorPage({ params: { id } }: Props) {
  return (
    <Container as={'main'} className='sm:mt-16'>
      <h1
        className={cn(
          font.className,
          'text-6xl font-bold text-center text-blue-900'
        )}
      >
        Thabeng, Posts
      </h1>
      <Divider className='mt-5 w-full sm:mt-20' />
      <Content id={id} />
    </Container>
  );
}
