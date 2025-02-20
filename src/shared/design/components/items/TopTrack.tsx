import Image from 'next/image';
import { formatDuration } from '@/shared/lib/formatDuration';
import { type Track } from '@/shared/types/spotifyTypes';

export const TopTrack = ({ topTrack }: { topTrack: Track }) => {
  return (
    <div className='flex flex-col items-center gap-4 rounded-lg bg-black p-6 text-center transition hover:bg-black/40 md:flex-row md:text-start'>
      <Image
        src={topTrack.album.images[0]?.url || '/placeholder.svg'}
        alt={topTrack.name}
        width={80}
        height={80}
        className='rounded-md'
      />
      <div>
        <p className='text-lg font-bold'>{topTrack.name}</p>
        <p className='text-sm text-gray-400'>
          {topTrack.artists.map((artist) => artist.name).join(', ')}
        </p>
        <span className='text-sm text-gray-400'>
          {formatDuration(topTrack.duration_ms)}
        </span>
      </div>
    </div>
  );
};
