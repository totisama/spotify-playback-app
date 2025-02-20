'use client';

import { type Track } from '@/shared/types/spotifyTypes';
import { PlayButton } from '@/shared/design/components/globals/PlayButton';
import { PlayIcon, TimerIcon } from 'lucide-react';
import { TrackListItem } from './TrackListItem';

export default function TrackList({
  tracks,
  albumUri,
}: {
  tracks: Track[];
  albumUri: string;
}) {
  return (
    <div className='p-6'>
      <section className='mb-4'>
        <PlayButton
          mode='album'
          contextUri={albumUri}
          size='medium'
        >
          <PlayIcon className='h-5 w-5 fill-white' />
        </PlayButton>
      </section>

      <section>
        <div className='grid grid-cols-[50px_1fr_auto] border-b border-gray-700 py-2 text-gray-400'>
          <span className='ml-4'>#</span>
          <span>Title</span>
          <span className='mr-4'>
            <TimerIcon className='h-5 w-5' />
          </span>
        </div>

        <ul className='grid grid-cols-1 divide-y divide-gray-800'>
          {tracks.map((track, index) => (
            <TrackListItem
              key={track.id}
              track={track}
              index={index}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
