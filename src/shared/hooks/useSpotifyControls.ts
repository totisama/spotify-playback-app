'use client';

import { useCallback } from 'react';
import { useSpotifyPlayer } from '@/shared/context/SpotifyPlayerContext';
import { SPOTIFY_API_URL } from '@/shared/constants';

export function useSpotifyControls() {
  const {
    playerRef,
    deviceIdRef,
    token,
    isPaused,
    isActive,
    currentTrack,
    volume,
    setVolume,
  } = useSpotifyPlayer();

  const spotifyFetch = async (
    endpoint: string,
    method: string,
    body?: object
  ) => {
    try {
      const response = await fetch(`${SPOTIFY_API_URL}${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error with ${endpoint}:`, error);
    }
  };

  const ensurePlaybackActive = async () => {
    if (!deviceIdRef.current) {
      console.warn('No active device. Trying to transfer playback...');
      return;
    }
    await spotifyFetch('/me/player', 'PUT', {
      device_ids: [deviceIdRef.current],
    });
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
      console.warn('Both URI and context URI provided. Use one at a time.');
      return;
    }

    await ensurePlaybackActive();

    const body = uri ? { uris: [uri] } : { context_uri: contextUri };
    await spotifyFetch('/me/player/play', 'PUT', body);
  };

  const playPause = useCallback(() => {
    playerRef.current?.togglePlay();
  }, [playerRef]);

  const nextTrack = useCallback(() => {
    playerRef.current?.nextTrack();
  }, [playerRef]);

  const previousTrack = useCallback(() => {
    playerRef.current?.previousTrack();
  }, [playerRef]);

  const changeVolume = async (newVolume: number) => {
    if (!deviceIdRef.current) {
      console.warn('No active device. Trying to transfer playback...');
      return;
    }

    await ensurePlaybackActive();
    const volumePercent = newVolume < 1 ? newVolume * 100 : newVolume;

    await spotifyFetch(
      `/me/player/volume?volume_percent=${volumePercent}`,
      'PUT'
    );
    setVolume(newVolume);
  };

  return {
    playPause,
    nextTrack,
    previousTrack,
    playSong,
    isPaused,
    isActive,
    currentTrack,
    volume,
    setVolume,
    changeVolume,
  };
}
