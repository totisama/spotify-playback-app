import { useEffect } from 'react';
import { useSpotifyPlayer } from '@/shared/context/SpotifyPlayerContext';
import { type SpotifyPlayerState } from '../types/spotifySDK';

export function useSongProgress({ duration }: { duration: number }) {
  const { playerRef, isPaused, progress, setProgress } = useSpotifyPlayer();

  useEffect(() => {
    if (!playerRef.current) return;

    const updateState = (state: SpotifyPlayerState | null) => {
      if (!state) return;

      setProgress(state.position / 1000); // Convert ms to seconds
    };

    playerRef.current.addListener('player_state_changed', updateState);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerRef]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const nextSecond = progress < duration ? progress + 1 : progress;
      setProgress(nextSecond);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, progress]);

  return { progress };
}
