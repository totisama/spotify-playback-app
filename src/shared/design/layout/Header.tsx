import { SpotifyIcon } from '@/shared/design/icons';
import { SearchInput } from '@/shared/components/SearchInput';
import Link from 'next/link';

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
