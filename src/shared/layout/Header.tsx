import { SpotifyIcon } from '@/shared/design/icons';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className='flex w-full items-center p-2'>
      <Link href='/'>
        <SpotifyIcon className='h-8 w-8' />
      </Link>
      <div className='flex flex-grow justify-center'></div>
      <Link href='/'>
        <SpotifyIcon className='h-8 w-8' />
      </Link>
    </div>
  );
};
