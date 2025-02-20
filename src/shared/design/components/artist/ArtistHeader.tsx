import { type Artist } from '@/shared/types/spotifyTypes';
import Image from 'next/image';
import { PlayButton } from '@/shared/design/components/globals/PlayButton';
import { PlayIcon } from 'lucide-react';

export const ArtistHeader = ({ artist }: { artist: Artist }) => {
  return (
    <div className='relative flex h-[400px] w-full items-end overflow-hidden bg-gradient-to-b from-black/50 to-black p-6'>
      <Image
        src={artist.images[0]?.url || '/placeholder.jpg'}
        alt={artist.name}
        height={400}
        width={1000}
        className='absolute left-0 top-0 w-full object-cover opacity-50'
      />
      <div className='relative z-10'>
        <h1 className='text-6xl font-bold text-white'>{artist.name}</h1>
        <p className='text-lg text-gray-300'>
          {artist.followers.total.toLocaleString()} monthly listeners
        </p>
        <div className='mt-4 flex gap-4'>
          <PlayButton
            mode='artist'
            contextUri={artist.uri}
            size='custom'
          >
            <PlayIcon className='h-5 w-5 fill-black' /> Play
          </PlayButton>
          <button className='rounded-full bg-gray-800 px-6 py-2 font-bold text-white'>
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};
