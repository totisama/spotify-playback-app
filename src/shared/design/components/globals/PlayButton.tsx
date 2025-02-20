'use client';

import { useSpotifyControls } from '@/shared/hooks/useSpotifyControls';

export const PlayButton = ({ uri }: { uri: string }) => {
  const { playSong } = useSpotifyControls();

  return (
    <button
      className='bg-spotify-green absolute inset-0 m-auto flex h-10 w-10 scale-50 items-center justify-center rounded-full opacity-0 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100'
      onClick={() => {
        playSong(uri);
      }}
    >
      ▶
    </button>
  );
};
