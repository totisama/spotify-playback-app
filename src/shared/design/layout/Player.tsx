import dynamic from 'next/dynamic';

const SpotifyPlayerControls = dynamic(
  async () => await import('@/shared/design/components/SpotifyPlayer'),
  { ssr: false }
);

export const Player = () => {
  return <SpotifyPlayerControls />;
};
