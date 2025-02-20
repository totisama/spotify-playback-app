import Image from 'next/image';
import { type Artist } from '@/shared/types/spotifyTypes';
import Link from 'next/link';

export const ArtistItem = ({ artist }: { artist: Artist }) => {
  return (
    <li className='group'>
      <Link
        href={`/artist/${artist.id}`}
        className='flex flex-col items-center text-center'
      >
        <Image
          src={artist.images[0]?.url || '/placeholder.webp'}
          alt={artist.name}
          width={100}
          height={100}
          className='aspect-square max-w-96 rounded-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
        />
        <p className='text-md mt-2 font-semibold'>{artist.name}</p>
      </Link>
    </li>
  );
};
