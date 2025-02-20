'use client';

import { useCallback } from 'react';
import { useSpotifyPlayer } from '@/shared/context/SpotifyPlayerContext';

export function useSpotifyControls() {
  const { playerRef, deviceIdRef, token, isPaused, isActive, currentTrack } =
    useSpotifyPlayer();

  const ensurePlaybackActive = async () => {
    try {
      await fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_ids: [deviceIdRef.current],
        }),
      });
      console.log('Playback transferred to Web Player.');
    } catch (error) {
      console.error('Error transferring playback:', error);
    }
  };

  const playSong = async ({
    uri,
    contextUri,
  }: {
    uri?: string;
    contextUri?: string;
  }) => {
    if (!deviceIdRef.current) {
      console.warn('No active device. Trying to transfer playback...');
      return;
    }

    if (!uri && !contextUri) {
      console.warn('No URI or context URI provided.');
      return;
    }

    if (uri && contextUri) {
      console.warn('Both URI and context URI provided.');
      return;
    }

    await ensurePlaybackActive();

    const body: { uris?: string[]; context_uri?: string } = {};

    if (uri) {
      body.uris = [uri];
    }
    if (contextUri) {
      body.context_uri = contextUri;
    }

    try {
      await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
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
