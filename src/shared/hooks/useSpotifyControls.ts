'use client';

import { useCallback } from 'react';
import { useSpotifyPlayer } from '@/shared/context/SpotifyPlayerContext';

export function useSpotifyControls() {
  const { playerRef, deviceIdRef, token, isPaused, isActive, currentTrack } =
    useSpotifyPlayer();

  const ensurePlaybackActive = async () => {
    if (!deviceIdRef.current) {
      console.warn('No active device. Transferring playback...');
      return;
    }

    try {
      await fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_ids: [deviceIdRef.current],
          play: false,
        }),
      });
      console.log('Playback transferred to Web Player.');
    } catch (error) {
      console.error('Error transferring playback:', error);
    }
  };

  const playSong = async (uri: string) => {
    if (!deviceIdRef.current) {
      console.warn('No active device. Trying to transfer playback...');
      await ensurePlaybackActive();
      return;
    }

    try {
      await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: [uri],
        }),
      });
      console.log('Playing song:', uri);
    } catch (error) {
      console.error('Error playing song:', error);
    }
  };

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

  return {
    playPause,
    nextTrack,
    previousTrack,
    playSong,
    isPaused,
    isActive,
    currentTrack,
  };
}
