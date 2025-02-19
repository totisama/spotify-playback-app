import Image from 'next/image';
import { type ArtistsItem } from '@/shared/types/generalSearch';

export const ArtistItem = ({ artist }: { artist: ArtistsItem }) => {
  return (
    <li className='flex flex-col items-center text-center'>
      <Image
        src={artist.images[0]?.url || '/placeholder.svg'}
        alt={artist.name}
        width={100}
        height={100}
        className='rounded-full border border-gray-700 transition hover:scale-105'
      />
      <p className='text-md mt-2 font-semibold'>{artist.name}</p>
    </li>
  );
};
