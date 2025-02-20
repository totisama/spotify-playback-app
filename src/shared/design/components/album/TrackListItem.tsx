import Link from 'next/link';
import { PlayButton } from '@/shared/design/components/globals/PlayButton';
import { type Track } from '@/shared/types/spotifyTypes';
import { formatDuration } from '@/shared/lib/formatDuration';
import { PlayIcon } from 'lucide-react';

export const TrackListItem = ({
  track,
  index,
}: {
  track: Track;
  index: number;
}) => {
  const duration = formatDuration(track.duration_ms);

  return (
    <li
      key={track.id}
      className='group relative grid grid-cols-[50px_1fr_auto] items-center py-3 transition hover:bg-secondary'
    >
      <span className='ml-4 text-lg text-gray-400 group-hover:opacity-0'>
        {index + 1}
      </span>

      <PlayButton
        mode='track'
        uri={track.uri}
        size='small'
        customClass='left-1 mx-0 my-auto bg-transparent'
      >
        <PlayIcon className='h-5 w-5 fill-white' />
      </PlayButton>

      <div>
        <h3 className='select-none font-semibold text-white'>{track.name}</h3>
        <p className='text-sm text-gray-400'>
          {track.artists
            .map((artist, i) => (
              <Link
                key={artist.id}
                href={`/artist/${artist.id}`}
                className='hover:underline'
              >
                {artist.name}
              </Link>
            ))
            .reduce((prev, curr) => [prev, ' • ', curr] as any)}
        </p>
      </div>

      <span className='mr-4 text-gray-400'>{duration}</span>
    </li>
  );
};
