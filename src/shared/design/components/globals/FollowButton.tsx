'use client';

import { useSpotifyControls } from '@/shared/hooks/useSpotifyControls';

export const FollowButton = ({ ids }: { ids: string[] }) => {
  const { followArtists } = useSpotifyControls();
  return (
    <button
      className='rounded-full bg-gray-800 px-6 py-2 font-bold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-700'
      onClick={() => {
        followArtists(ids);
      }}
    >
      Follow
    </button>
  );
};
