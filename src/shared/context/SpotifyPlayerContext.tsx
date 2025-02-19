'use client';

import {
  createContext,
  type MutableRefObject,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  type SpotifySDK,
  type SpotifyPlayer as SpotifyPlayerType,
  type SpotifyPlayerState,
  type SpotifyTrack,
  type SpotifyDevice,
} from '@/shared/types/spotifySDK';

declare global {
  interface Window {
    Spotify: SpotifySDK;
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

interface SpotifyPlayerContextType {
  playerRef: MutableRefObject<SpotifyPlayerType | null>;
  isPaused: boolean;
  isActive: boolean;
  currentTrack: SpotifyTrack | null;
  playSong: (uri: string) => void;
}

const SpotifyPlayerContext = createContext<
  SpotifyPlayerContextType | undefined
>(undefined);

export function SpotifyPlayerProvider({ children }: { children: ReactNode }) {
  const [isPaused, setPaused] = useState<boolean>(false);
  const [isActive, setActive] = useState<boolean>(false);
  const [currentTrack, setTrack] = useState<SpotifyTrack | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const playerRef = useRef<SpotifyPlayerType | null>(null);
  const deviceIdRef = useRef<string | null>(null);
  const tokenFetched = useRef<boolean>(false);

  const playSong = async (uri: string) => {
    if (!deviceIdRef.current) {
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
    } catch (error) {
      console.error('Error transferring playback:', error);
    }
  };

  // Fetch Spotify Access Token
  useEffect(() => {
    if (tokenFetched.current) return;
    tokenFetched.current = true;

    const fetchToken = async () => {
      try {
        const res = await fetch('/api/auth');
        const data = (await res.json()) as { token: string };
        setToken(data.token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  // Load Spotify Web Playback SDK
  useEffect(() => {
    if (!token) return;

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'SpotyPlayer',
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      playerRef.current = player;

      player.addListener(
        'ready',
        async ({ device_id: deviceId }: SpotifyDevice) => {
          deviceIdRef.current = deviceId;

          try {
            await fetch('https://api.spotify.com/v1/me/player', {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                device_ids: [deviceId],
                play: false,
              }),
            });
          } catch (error) {
            console.error('Error transferring playback:', error);
          }
        }
      );

      player.addListener(
        'not_ready',
        ({ device_id: deviceId }: SpotifyDevice) => {
          console.log('Device ID has gone offline', deviceId);
          deviceIdRef.current = null;
        }
      );

      player.addListener(
        'player_state_changed',
        (state: SpotifyPlayerState | null) => {
          if (!state) return;
          setTrack(state.track_window.current_track);
          setPaused(state.paused);
        }
      );

      player.connect();
      setActive(true);
    };

    return () => {
      script.remove();
    };
  }, [token]);

  return (
    <SpotifyPlayerContext.Provider
      value={{ playerRef, isPaused, isActive, currentTrack, playSong }}
    >
      {children}
    </SpotifyPlayerContext.Provider>
  );
}

export function useSpotifyPlayer() {
  const context = useContext(SpotifyPlayerContext);

  if (!context) {
    throw new Error(
      'useSpotifyPlayer must be used within a SpotifyPlayerProvider'
    );
  }

  return context;
}
