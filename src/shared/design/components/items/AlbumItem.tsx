import Image from 'next/image';
import { type Album } from '@/shared/types/spotifyTypes';
import Link from 'next/link';

export const AlbumItem = ({ album }: { album: Album }) => {
  return (
    <li className='group'>
      <Link
        key={album.id}
        href={`/album/${album.id}`}
      >
        <div className='aspect-square max-h-60 w-full overflow-hidden rounded-lg'>
          <Image
            src={album.images[0]?.url}
            alt={album.name}
            width={300}
            height={300}
            className='object-contain transition-transform duration-300 ease-in-out group-hover:scale-105'
          />
        </div>
        <p className='mt-2 truncate font-semibold text-white'>{album.name}</p>
        <p className='text-sm text-gray-400'>
          {album.release_date.split('-')[0]}
        </p>
      </Link>
    </li>
  );
};
