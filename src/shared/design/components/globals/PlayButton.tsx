'use client';

import { useSpotifyControls } from '@/shared/hooks/useSpotifyControls';

export const PlayButton = ({ uri }: { uri: string }) => {
  const { playSong } = useSpotifyControls();

  return (
    <button
      onClick={() => {
        playSong(uri);
      }}
      className='bg-spotify-green align-center absolute bottom-0 left-0 hidden h-10 w-10 justify-center rounded-full p-2 group-hover:flex'
    >
      ▶
    </button>
  );
};
