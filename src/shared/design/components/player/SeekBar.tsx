'use client';

import { formatTime } from '@/shared/lib/formatTime';
import { Slider } from '../../ui/slider';
import { useSongProgress } from '@/shared/hooks/useSongProgress';
import { useEffect, useState } from 'react';

interface SeekBarProps {
  duration: number;
  onSeek: (newTime: number) => void;
}

export const SeekBar = ({ duration, onSeek }: SeekBarProps) => {
  const { progress } = useSongProgress({ duration });
  const [sliderValue, setSliderValue] = useState(progress);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) {
      setSliderValue(progress);
    }
  }, [progress, isDragging]);

  return (
    <div className='relative flex w-full items-center gap-2'>
      <span className='w-10 text-right text-xs text-gray-400'>
        {formatTime(sliderValue)}
      </span>

      <div className='relative w-full'>
        <Slider
          value={[sliderValue]}
          min={0}
          max={duration}
          step={1}
          dir='ltr'
          onValueChange={(value) => {
            setIsDragging(true);
            setSliderValue(value[0]);
          }}
          onValueCommit={(value) => {
            setIsDragging(false);
            onSeek(value[0]);
          }}
          customBackground='bg-foreground'
          className='h-1 cursor-pointer appearance-none rounded-lg'
        />
      </div>

      <span className='w-10 text-xs text-gray-400'>{formatTime(duration)}</span>
    </div>
  );
};
