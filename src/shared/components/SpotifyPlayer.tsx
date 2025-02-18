'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  type SpotifySDK,
  type SpotifyPlayer as SpotifyPlayerType,
  type SpotifyPlayerState,
  type SpotifyTrack,
  type SpotifyDevice,
} from '@/shared/types/spotify';

declare global {
  interface Window {
    Spotify: SpotifySDK;
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

export default function SpotifyPlayer() {
  const [isPaused, setPaused] = useState<boolean>(false);
  const [isActive, setActive] = useState<boolean>(false);
  const [currentTrack, setTrack] = useState<SpotifyTrack | null>(null);
  const playerRef = useRef<SpotifyPlayerType | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => {
          fetch('/api/auth')
            .then(async (res) => await res.json())
            .then((data: { token: string }) => {
              cb(data.token);
            });
        },
        volume: 0.5,
      });

      playerRef.current = player;

      playerRef.current.addListener(
        'ready',
        async ({ device_id: deviceId }: SpotifyDevice) => {
          console.log('Ready with Device ID', deviceId);

          try {
            const token = await fetch('/api/auth')
              .then(async (res) => await res.json())
              .then((data) => data.token);

            // Transfer playback to the Web Player
            await fetch('https://api.spotify.com/v1/me/player', {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                device_ids: [deviceId],
                play: true, // Set to true to start playback immediately
                uris: ['spotify:track:5Nm32R9spCURiGw0MRMzyd'],
              }),
            });

            console.log('Playback transferred to Web Player');
          } catch (error) {
            console.error('Error transferring playback:', error);
          }
        }
      );

      playerRef.current.addListener(
        'not_ready',
        ({ device_id: deviceId }: SpotifyDevice) => {
          console.log('Device ID has gone offline', deviceId);
        }
      );

      playerRef.current.addListener(
        'player_state_changed',
        async (state: SpotifyPlayerState | null) => {
          if (!state) {
            return;
          }
          console.log({ state });
          console.log({ current_track: state.track_window.current_track });

          setTrack(state.track_window.current_track);
          setPaused(state.paused);
        }
      );

      playerRef.current.connect();
      setActive(true);
    };

    return () => {
      script.remove();
    };
  }, []);

  if (!isActive) {
    return (
      <div>
        <strong>Instance not active</strong>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Image
          src={currentTrack?.album.images[0].url || '/placeholder.svg'}
          alt=''
          width={500}
          height={500}
        />

        <div>
          <div>{currentTrack?.name}</div>
          <div>{currentTrack?.artists[0].name}</div>

          <button
            onClick={() => {
              playerRef.current?.previousTrack();
            }}
          >
            &lt;&lt;
          </button>

          <button
            onClick={() => {
              playerRef.current?.togglePlay();
              setPaused(!isPaused);
            }}
          >
            {isPaused ? 'PLAY' : 'PAUSE'}
          </button>

          <button
            onClick={() => {
              playerRef.current?.nextTrack();
            }}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
}
