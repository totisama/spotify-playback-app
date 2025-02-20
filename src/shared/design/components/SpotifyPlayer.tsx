'use client';

import Image from 'next/image';
import { useSpotifyControls } from '@/shared/hooks/useSpotifyControls';
import { Loader } from '@/shared/design/components/globals/Loader';
import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from 'lucide-react';
import VolumeSlider from './player/VolumeSlider';

export default function SpotifyPlayerControls() {
  const {
    playPause,
    nextTrack,
    previousTrack,
    isPaused,
    isActive,
    currentTrack,
    volume,
    setVolume,
    changeVolume,
  } = useSpotifyControls();

  if (!isActive) {
    return (
      <div className='flex w-full items-center justify-center'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='flex w-full items-center justify-between'>
      <div className='flex w-[30%] items-center justify-start'>
        <Image
          src={currentTrack?.album.images[0].url || '/images/placeholder.webp'}
          alt={currentTrack?.name || 'No Track Playing'}
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

      <div className='flex w-2/5 items-center justify-center gap-2'>
        <button
          onClick={previousTrack}
          className='transition-transform duration-300 ease-out hover:scale-110'
        >
          <SkipBackIcon className='fill-white' />
        </button>
        <button
          onClick={playPause}
          className='rounded-full bg-spotify-green p-2 transition-transform duration-300 ease-out hover:scale-110'
        >
          {isPaused ? <PlayIcon /> : <PauseIcon />}
        </button>
        <button
          onClick={nextTrack}
          className='transition-transform duration-300 ease-out hover:scale-110'
        >
          <SkipForwardIcon className='fill-white' />
        </button>
      </div>

      <div className='flex w-[30%] items-center justify-end'>
        <VolumeSlider
          setVolume={setVolume}
          changeVolume={changeVolume}
          volume={volume}
        />
      </div>
    </div>
  );
}
