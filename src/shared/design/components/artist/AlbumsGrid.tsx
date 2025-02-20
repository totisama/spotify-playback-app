import { type Album } from '@/shared/types/spotifyTypes';
import { Section } from '@/shared/design/layout/Section';
import { AlbumItem } from '@/shared/design/components/items/AlbumItem';

export const AlbumsGrid = ({ albums }: { albums: Album[] }) => {
  return (
    <Section title='Albums'>
      <ul className='grid w-full grid-cols-1 gap-5 md:grid-cols-auto-fill'>
        {albums.map((album) => (
          <AlbumItem
            key={album.id}
            album={album}
          />
        ))}
      </ul>
    </Section>
  );
};
