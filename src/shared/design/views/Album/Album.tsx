import { type AlbumSearchResponse } from '@/shared/types/spotifyTypes';
import { AlbumHeader } from '@/shared/design/components/album/AlbumHeader';
import TrackList from '@/shared/design/components/album/TrackList';

const Album = ({ albumInfo }: { albumInfo: AlbumSearchResponse }) => {
  const album = albumInfo.album;
  return (
    <>
      <AlbumHeader album={album} />
      {album.tracks && (
        <TrackList
          tracks={album.tracks.items}
          albumUri={album.uri}
        />
      )}
    </>
  );
};

export default Album;
