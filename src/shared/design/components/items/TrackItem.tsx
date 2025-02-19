import Image from 'next/image';
import { type TracksItem } from '@/shared/types/generalSearch';
import { formatDuration } from '@/shared/lib/formatDuration';

export const TrackItem = ({ track }: { track: TracksItem }) => {
  return (
    <li className='flex flex-col items-center gap-4 rounded-lg bg-black p-4 text-center transition hover:bg-black/40 md:flex-row md:text-start'>
      <Image
        src={track.album.images[0]?.url || '/placeholder.svg'}
        alt={track.name}
        width={50}
        height={50}
        className='rounded-md'
      />
      <div className='flex-1'>
        <p className='text-md font-semibold'>{track.name}</p>
        <p className='text-sm text-gray-400'>
          {track.artists.map((artist) => artist.name).join(', ')}
        </p>
      </div>
      <span className='text-sm text-gray-400'>
        {formatDuration(track.duration_ms)}
      </span>
    </li>
  );
};
