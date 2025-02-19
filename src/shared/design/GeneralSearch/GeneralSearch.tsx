import { type GeneralSearchResponse } from '@/shared/types/generalSearch';
import { ArtistItem } from '@/shared/components/items/ArtistItem';
import { TrackItem } from '@/shared/components/items/TrackItem';
import { TopTrack } from '@/shared/components/items/TopTrack';
import { AlbumItem } from '@/shared/components/items/AlbumItem';

interface GeneralSearchProps {
  searchResults: GeneralSearchResponse;
}

const GeneralSearch = ({ searchResults }: GeneralSearchProps) => {
  const { tracks, artists, albums } = searchResults.data;
  const topTrack = tracks.items.length > 0 ? tracks.items[0] : null;

  return (
    <div className=' p-6 text-white'>
      {/* Top Result Section */}
      {topTrack && (
        <section className='mb-8'>
          <h2 className='mb-4 text-2xl font-bold'>Top result</h2>
          <TopTrack topTrack={topTrack} />
        </section>
      )}

      {/* Songs Section */}
      <section className='mb-8'>
        <h2 className='mb-4 text-2xl font-bold'>Songs</h2>
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
          <p className='text-gray-400'>No tracks found</p>
        )}
      </section>

      {/* Artists Section */}
      <section className='mb-8'>
        <h2 className='mb-4 text-2xl font-bold'>Artists</h2>
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
          <p className='text-gray-400'>No artists found</p>
        )}
      </section>

      {/* Albums Section */}
      <section className='mb-8'>
        <h2 className='mb-4 text-2xl font-bold'>Albums</h2>
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
          <p className='text-gray-400'>No albums found</p>
        )}
      </section>
    </div>
  );
};

export default GeneralSearch;
