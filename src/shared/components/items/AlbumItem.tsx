import Image from 'next/image';
import { type AlbumElement } from '@/shared/types/generalSearch';

export const AlbumItem = ({ album }: { album: AlbumElement }) => {
  return (
    <li className='flex flex-col items-center text-center'>
      <Image
        src={album.images[0]?.url || '/placeholder.svg'}
        alt={album.name}
        width={120}
        height={120}
        className='rounded-lg transition hover:scale-105'
      />
      <p className='text-md mt-2 text-center font-semibold'>{album.name}</p>
      <p className='text-sm text-gray-400'>
        {album.artists.map((a) => a.name).join(', ')}
      </p>
    </li>
  );
};
