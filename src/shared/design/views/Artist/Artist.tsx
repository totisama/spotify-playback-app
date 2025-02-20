import { ArtistHeader } from '@/shared/design/components/artist/ArtistHeader';
import { TopTracks } from '@/shared/design/components/artist/TopTracks';
import { type ArtistSearchResponse } from '@/shared/types/spotifyTypes';
import { AlbumsGrid } from '@/shared/design/components/artist/AlbumsGrid';

const Artist = ({ artistInfo }: { artistInfo: ArtistSearchResponse }) => {
  return (
    <>
      <ArtistHeader artist={artistInfo.artist} />
      <div className='p-6'>
        <TopTracks tracks={artistInfo.topTracks.tracks} />
        <AlbumsGrid albums={artistInfo.albums.items} />
      </div>
    </>
  );
};

export default Artist;
