import Image from 'next/image';
import { type GeneralSearchResponse } from '@/shared/types/generalSearch';
import { formatDuration } from '@/shared/lib/formatDuration';

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
          <div className='flex items-center gap-4 rounded-lg bg-black p-6 transition hover:bg-black/40'>
            <Image
              src={topTrack.album.images[0]?.url || '/placeholder.svg'}
              alt={topTrack.name}
              width={80}
              height={80}
              className='rounded-md'
            />
            <div>
              <p className='text-lg font-bold'>{topTrack.name}</p>
              <span className='text-sm text-gray-400'>
                {formatDuration(topTrack.duration_ms)}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Songs Section */}
      <section className='mb-8'>
        <h2 className='mb-4 text-2xl font-bold'>Songs</h2>
        {tracks.items.length > 0 ? (
          <div className='flex flex-col gap-4'>
            {tracks.items.slice(1, 6).map((track) => (
              <div
                key={track.id}
                className='flex items-center gap-4 rounded-lg bg-black p-4 transition hover:bg-black/40'
              >
                <Image
                  src={track.album.images[0]?.url || '/placeholder.svg'}
                  alt={track.name}
                  width={50}
                  height={50}
                  className='rounded-md'
                />
                <div className='flex-1'>
                  <p className='text-md font-semibold'>{track.name}</p>
                  <p className='text-sm text-gray-400'>
                    {track.artists.map((artist) => artist.name).join(', ')}
                  </p>
                </div>
                <span className='text-sm text-gray-400'>
                  {formatDuration(track.duration_ms)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-400'>No tracks found</p>
        )}
      </section>

      {/* Artists Section */}
      <section className='mb-8'>
        <h2 className='mb-4 text-2xl font-bold'>Artists</h2>
        {artists.items.length > 0 ? (
          <div className='grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6'>
            {artists.items.slice(0, 6).map((artist) => (
              <div
                key={artist.id}
                className='flex flex-col items-center'
              >
                <Image
                  src={artist.images[0]?.url || '/placeholder.svg'}
                  alt={artist.name}
                  width={100}
                  height={100}
                  className='rounded-full border border-gray-700 transition hover:scale-105'
                />
                <p className='text-md mt-2 text-center font-semibold'>
                  {artist.name}
                </p>
                <p className='text-sm text-gray-400'>Artist</p>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-400'>No artists found</p>
        )}
      </section>

      {/* Albums Section */}
      <section className='mb-8'>
        <h2 className='mb-4 text-2xl font-bold'>Albums</h2>
        {albums.items.length > 0 ? (
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5'>
            {albums.items.slice(0, 5).map((album) => (
              <div
                key={album.id}
                className='flex flex-col items-center'
              >
                <Image
                  src={album.images[0]?.url || '/placeholder.svg'}
                  alt={album.name}
                  width={120}
                  height={120}
                  className='rounded-lg transition hover:scale-105'
                />
                <p className='text-md mt-2 text-center font-semibold'>
                  {album.name}
                </p>
                <p className='text-sm text-gray-400'>
                  {album.artists.map((a) => a.name).join(', ')}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-400'>No albums found</p>
        )}
      </section>
    </div>
  );
};

export default GeneralSearch;
