'use client';

import { useSpotifyControls } from '@/shared/hooks/useSpotifyControls';
import { cn } from '@/shared/lib/utils';
import { type ReactNode } from 'react';

type Mode = 'track' | 'artist';

const modes = {
  track:
    'absolute inset-0 m-auto flex h-10 w-10 scale-50 items-center justify-center rounded-full opacity-0 group-hover:scale-100 group-hover:opacity-100',
  artist: 'px-6 py-2 text-lg font-bold text-black hover:scale-105',
};

export const PlayButton = ({
  uri,
  contextUri,
  mode,
  children,
}: {
  uri?: string;
  contextUri?: string;
  mode: Mode;
  children: ReactNode;
}) => {
  const { playSong } = useSpotifyControls();

  return (
    <button
      className={cn(
        'rounded-full bg-spotify-green transition-all duration-300 ease-in-out',
        modes[mode]
      )}
      onClick={() => {
        playSong({ uri, contextUri });
      }}
    >
      {children}
    </button>
  );
};
