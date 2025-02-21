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
    setProgress,
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
      console.warn('No active device.');
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
      console.warn('No active device.');
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

  const seekPosition = useCallback(
    (newProgressSeconds: number) => {
      const positionMS = newProgressSeconds * 1000;

      playerRef.current?.seek(positionMS).then(() => {
        setProgress(positionMS);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [playerRef]
  );

  const changeVolume = async (newVolume: number) => {
    if (!deviceIdRef.current) {
      console.warn('No active device.');
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

  const followArtists = async (artistIds: string[]) => {
    if (!deviceIdRef.current) {
      console.warn('No active device.');
      return;
    }

    if (!artistIds.length) {
      console.warn('No artist IDs provided.');
      return;
    }

    await ensurePlaybackActive();

    await spotifyFetch(`/me/following?type=artist`, 'PUT', { ids: artistIds });
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
    seekPosition,
    followArtists,
  };
}
