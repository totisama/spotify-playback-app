import { Error } from '@/shared/design/components/globals/Error';
import { type FollowingArtistsResponse } from '@/shared/types/spotifyTypes';
import { Section } from '@/shared/design/layout/Section';
import { ArtistItem } from '@/shared/design/components/items/ArtistItem';

export default async function HomePage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/following`
  );

  if (!response.ok) {
    return <Error text='Failed to fetch followed artists' />;
  }

  const data: FollowingArtistsResponse = await response.json();
  const artists = data.following.items;

  return (
    <Section
      title='Followed Artists'
      customClass='p-6'
    >
      {artists.length === 0 ? (
        <p className='text-gray-400'>You are not following any artists.</p>
      ) : (
        <ul className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {artists.map((artist) => (
            <ArtistItem
              key={artist.id}
              artist={artist}
            />
          ))}
        </ul>
      )}
    </Section>
  );
}
