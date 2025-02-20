import { Section } from '@/shared/design/layout/Section';
import { type Track } from '@/shared/types/spotifyTypes';
import { TrackItem } from '@/shared/design/components/items/TrackItem';

export const TopTracks = ({ tracks }: { tracks: Track[] }) => {
  return (
    <Section title='Popular'>
      <ul className='flex flex-col gap-4'>
        {tracks.slice(0, 5).map((track, index) => (
          <TrackItem
            key={track.id}
            track={track}
          />
        ))}
      </ul>
    </Section>
  );
};
