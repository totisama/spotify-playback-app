'use client';

import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { Slider } from '@/shared/design/ui/slider';

export default function VolumeSlider({
  volume,
  setVolume,
  changeVolume,
}: {
  volume: number;
  setVolume: (value: number) => void;
  changeVolume: (value: number) => void;
}) {
  const toggleMute = () => {
    const newVolume = volume === 0 ? 50 : 0;

    changeVolume(newVolume);
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 50) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <div className='flex items-center gap-2'>
      <button
        onClick={toggleMute}
        className='text-gray-400 hover:text-white'
      >
        {getVolumeIcon()}
      </button>
      <Slider
        defaultValue={[volume * 100]}
        min={0}
        max={100}
        step={1}
        dir='ltr'
        onValueCommit={(value) => {
          changeVolume(value[0]);
        }}
        customBackground='bg-spotify-green'
        className='h-1 w-32 cursor-pointer appearance-none rounded-lg'
      />
    </div>
  );
}
