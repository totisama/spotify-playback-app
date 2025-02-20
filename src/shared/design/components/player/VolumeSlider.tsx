'use client';

import { useEffect } from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { useDebounce } from '@/shared/hooks/useDebounce';

export default function VolumeSlider({
  volume,
  setVolume,
  changeVolume,
}: {
  volume: number;
  setVolume: (value: number) => void;
  changeVolume: (value: number) => void;
}) {
  const value = useDebounce(volume, 100);

  const toggleMute = () => {
    const newVolume = volume === 0 ? 50 : 0;

    changeVolume(newVolume);
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 50) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  useEffect(() => {
    changeVolume(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className='flex items-center gap-2'>
      <button
        onClick={toggleMute}
        className='text-gray-400 hover:text-white'
      >
        {getVolumeIcon()}
      </button>
      <input
        type='range'
        min='0'
        max='100'
        value={volume}
        onChange={(e) => {
          setVolume(Number(e.target.value));
        }}
        className='h-1 w-32 cursor-pointer appearance-none rounded-lg bg-spotify-green'
      />
    </div>
  );
}
