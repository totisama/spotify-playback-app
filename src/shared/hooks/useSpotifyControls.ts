'use client';

import { useCallback } from 'react';
import { useSpotifyPlayer } from '@/shared/context/SpotifyPlayerContext';

export function useSpotifyControls() {
  const { playerRef } = useSpotifyPlayer();

  const playPause = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.togglePlay();
    }
  }, [playerRef]);

  const nextTrack = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.nextTrack();
    }
  }, [playerRef]);

  const previousTrack = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.previousTrack();
    }
  }, [playerRef]);

  return { playPause, nextTrack, previousTrack };
}
