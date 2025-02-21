import { SpotifyIcon } from '@/shared/design/icons';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const SearchInput = dynamic(
  async () => await import('@/shared/design/components/globals/SearchInput'),
  { ssr: false }
);

export const Header = () => {
  return (
    <div className='flex h-full w-full items-center px-2'>
      <Link href='/'>
        <SpotifyIcon className='h-8 w-8' />
      </Link>
      <div className='flex flex-grow justify-center'>
        <SearchInput delay={300} />
      </div>
      <Link href='/'>
        <SpotifyIcon className='h-8 w-8' />
      </Link>
    </div>
  );
};
