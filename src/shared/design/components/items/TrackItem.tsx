import Image from 'next/image';
import { formatDuration } from '@/shared/lib/formatDuration';
import { PlayButton } from '@/shared/design/components/globals/PlayButton';
import Link from 'next/link';
import { type Track } from '@/shared/types/spotifyTypes';

export const TrackItem = ({ track }: { track: Track }) => {
  return (
    <li className='group flex flex-col items-center gap-4 rounded-lg bg-black p-4 text-center transition hover:bg-black/40 md:flex-row md:text-start'>
      <div className='relative'>
        <Image
          src={track.album.images[0]?.url || '/placeholder.svg'}
          alt={track.name}
          width={50}
          height={50}
          className='rounded-md'
        />
        <PlayButton uri={track.uri} />
      </div>
      <div className='flex-1'>
        <p className='text-md select-none font-semibold'>{track.name}</p>
        <div>
          {track.artists.map((artist) => (
            <Link
              key={artist.id}
              href={`/artist/${artist.id}`}
              className='text-sm text-gray-400 after:content-[",_"] last:after:content-none hover:underline'
            >
              {artist.name}
            </Link>
          ))}
        </div>
      </div>
      <span className='select-none text-sm text-gray-400'>
        {formatDuration(track.duration_ms)}
      </span>
    </li>
  );
};
