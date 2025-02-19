'use client';

import Image from 'next/image';
import { useSpotifyPlayer } from '@/shared/context/SpotifyPlayerContext';
import { useSpotifyControls } from '@/shared/hooks/useSpotifyControls';
import { Loader } from '@/shared/design/components/globals/Loader';

export default function SpotifyPlayerControls() {
  const { isPaused, isActive, currentTrack } = useSpotifyPlayer();
  const { playPause, nextTrack, previousTrack } = useSpotifyControls();

  if (!isActive) {
    return (
      <div className='flex w-full items-center justify-center'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='flex w-full items-center justify-between'>
      <div className='flex'>
        <Image
          src={currentTrack?.album.images[0].url || '/placeholder.svg'}
          alt=''
          width={50}
          height={50}
          className='mr-4'
        />

        <div className='flex flex-col'>
          <p className='font-bold'>
            {currentTrack?.name || 'No Track Playing'}
          </p>
          <p className='text-sm'>{currentTrack?.artists[0].name || ''}</p>
        </div>
      </div>
      <div>
        <button
          onClick={previousTrack}
          className='ml-auto border p-2'
        >
          ⏮
        </button>
        <button
          onClick={playPause}
          className='border p-2'
        >
          {isPaused ? '▶' : '⏸'}
        </button>
        <button
          onClick={nextTrack}
          className='border p-2'
        >
          ⏭
        </button>
      </div>
    </div>
  );
}
