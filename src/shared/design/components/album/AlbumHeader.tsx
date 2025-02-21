import Image from 'next/image';
import { type Album } from '@/shared/types/spotifyTypes';
import { Link } from 'next-view-transitions';

export const AlbumHeader = ({ album }: { album: Album }) => {
  return (
    <div className='flex h-[300px] w-full items-end gap-10 bg-gradient-to-b from-black/50 to-black p-6'>
      <Image
        src={album.images[0]?.url || '/images/placeholder.webp'}
        alt={album.name}
        width={400}
        height={400}
        className='h-56 w-56 rounded-lg object-cover shadow-lg'
      />

      <div className='relative z-10'>
        <p className='text-sm uppercase text-gray-400'>{album.album_type}</p>
        <h1 className='text-5xl font-bold text-white'>{album.name}</h1>

        <p className='mt-2 text-lg text-gray-300'>
          {album.artists
            .map((artist) => (
              <Link
                key={artist.id}
                href={`/artist/${artist.id}`}
                className='text-white hover:underline'
              >
                {artist.name}
              </Link>
            ))
            .reduce((prev, curr) => [prev, ', ', curr] as any)}
        </p>

        <p className='text-gray-400'>
          {album.release_date.split('-')[0]} • {album.total_tracks} tracks
        </p>
      </div>
    </div>
  );
};
