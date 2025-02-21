import { Error } from '@/shared/design/components/globals/Error';
import { type FollowingArtistsResponse } from '@/shared/types/spotifyTypes';
import { Section } from '@/shared/design/layout/Section';
import { ArtistItem } from '@/shared/design/components/items/ArtistItem';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
console.log('Resolved Site URL:', siteUrl);

export default async function HomePage() {
  const response = await fetch(`${siteUrl}/api/following`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    return <Error text='Failed to fetch data' />;
  }
  const followingData: FollowingArtistsResponse = await response.json();
  const artists = followingData.following.items;

  return (
    <div className='space-y-4 p-6'>
      <h2 className='text-3xl text-spotify-green'>Hi!</h2>
      <Section title='Followed Artists'>
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
    </div>
  );
}
