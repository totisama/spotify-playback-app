'use client';

import { useSpotifyControls } from '@/shared/hooks/useSpotifyControls';
import { cn } from '@/shared/lib/utils';
import { type MouseEvent, type ReactNode } from 'react';

type Mode = 'track' | 'artist';

type Size = 'small' | 'large' | 'custom';

const modes = {
  track:
    'absolute inset-0 m-auto flex h-10 w-10 scale-50 items-center justify-center rounded-full opacity-0 group-hover:scale-100 group-hover:opacity-100',
  artist: 'px-6 py-2 text-lg font-bold text-black hover:scale-105',
};

const sizes = {
  small: 'h-10 w-10',
  large: 'h-24 w-24',
  custom: '',
};

export const PlayButton = ({
  uri,
  contextUri,
  mode,
  children,
  size = 'custom',
}: {
  uri?: string;
  contextUri?: string;
  mode: Mode;
  size?: Size;
  children: ReactNode;
}) => {
  const { playSong } = useSpotifyControls();

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    playSong({ uri, contextUri });
  };

  return (
    <button
      className={cn(
        'rounded-full bg-spotify-green transition-all duration-300 ease-in-out',
        modes[mode],
        sizes[size]
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
