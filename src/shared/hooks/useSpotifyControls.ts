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

  const ensurePlaybackActive = async () => {
    try {
      await fetch(`${SPOTIFY_API_URL}/me/player`, {
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
      const response = await fetch(`${SPOTIFY_API_URL}/me/player/play`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Failed playing song: ${response.statusText}`);
      }
      console.log('Playing song:', uri);
    } catch (error) {
      console.error('Error:', error);
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

  const changeVolume = async (newVolume: number) => {
    if (!deviceIdRef.current) {
      console.warn('No active device. Trying to transfer playback...');
      return;
    }

    console.log(
      `${SPOTIFY_API_URL}/me/player/volume?volume_percent=${newVolume}`
    );

    await ensurePlaybackActive();
    const volumePercent = newVolume < 1 ? newVolume * 100 : newVolume;

    try {
      const response = await fetch(
        `${SPOTIFY_API_URL}/me/player/volume?volume_percent=${Number(volumePercent)}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to set volume: ${response.statusText}`);
      }
      setVolume(newVolume);

      console.log(`Volume set to ${volume}%`);
    } catch (error) {
      console.error('Error:', error);
    }
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
