import { type GeneralSearchResponse } from '@/shared/types/generalSearch';
import { ArtistItem } from '@/shared/design/components/items/ArtistItem';
import { TrackItem } from '@/shared/design/components/items/TrackItem';
import { TopTrack } from '@/shared/design/components/items/TopTrack';
import { AlbumItem } from '@/shared/design/components/items/AlbumItem';
import { NotFoundMessage } from '@/shared/design/components/globals/NotFoundMessage';
import { Section } from '@/shared/design/layout/Section';

interface GeneralSearchProps {
  searchResults: GeneralSearchResponse;
}

const GeneralSearch = ({ searchResults }: GeneralSearchProps) => {
  const { tracks, artists, albums } = searchResults.data;
  const topTrack = tracks.items.length > 0 ? tracks.items[0] : null;

  return (
    <>
      {/* Top Result Section */}
      {topTrack && (
        <Section title='Top result'>
          <TopTrack topTrack={topTrack} />
        </Section>
      )}

      <Section title='Songs'>
        {tracks.items.length > 0 ? (
          <ul className='flex flex-col gap-4'>
            {tracks.items.slice(1, 6).map((track) => (
              <TrackItem
                key={track.id}
                track={track}
              />
            ))}
          </ul>
        ) : (
          <NotFoundMessage text={'No tracks found'} />
        )}
      </Section>

      <Section title='Artists'>
        {artists.items.length > 0 ? (
          <ul className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6'>
            {artists.items.slice(0, 6).map((artist) => (
              <ArtistItem
                key={artist.id}
                artist={artist}
              />
            ))}
          </ul>
        ) : (
          <NotFoundMessage text={'No artists found'} />
        )}
      </Section>

      <Section title='Albums'>
        {albums.items.length > 0 ? (
          <ul className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6'>
            {albums.items.slice(0, 5).map((album) => (
              <AlbumItem
                key={album.id}
                album={album}
              />
            ))}
          </ul>
        ) : (
          <NotFoundMessage text={'No albums found'} />
        )}
      </Section>
    </>
  );
};

export default GeneralSearch;
