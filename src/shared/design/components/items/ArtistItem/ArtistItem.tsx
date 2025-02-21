import Image from 'next/image';
import { type Artist } from '@/shared/types/spotifyTypes';
import Link from 'next/link';

const ArtistItem = ({ artist }: { artist: Artist }) => {
  return (
    <li
      key={artist.id}
      className='rounded-lg bg-secondary p-4 transition-transform duration-300 ease-out hover:scale-110'
    >
      <Link href={`/artist/${artist.id}`}>
        <div className='relative h-40 w-full'>
          <Image
            src={artist.images[0]?.url || '/placeholder.jpg'}
            alt={artist.name}
            fill
            className='rounded-lg object-cover'
          />
        </div>
        <p className='mt-2 truncate text-lg font-semibold'>{artist.name}</p>
        <p className='text-sm text-gray-400'>
          {artist.followers.total.toLocaleString()} followers
        </p>
      </Link>
    </li>
  );
};

export default ArtistItem;
