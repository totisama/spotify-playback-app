import { Error } from '@/shared/design/components/globals/Error';
import {
  type UserInfoResponse,
  type FollowingArtistsResponse,
} from '@/shared/types/spotifyTypes';
import { Section } from '@/shared/design/layout/Section';
import { ArtistItem } from '@/shared/design/components/items/ArtistItem';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
console.log('Resolved Site URL:', siteUrl);

export default async function HomePage() {
  const [followingResponse, userInfoResponse] = await Promise.all([
    fetch(`${siteUrl}/api/following`),
    fetch(`${siteUrl}/api/user-info`),
  ]);

  if (!followingResponse.ok || !userInfoResponse.ok) {
    return <Error text='Failed to fetch data' />;
  }

  const [followingData, userData] = await Promise.all([
    followingResponse.json(),
    userInfoResponse.json(),
  ]);

  const artists = (followingData as FollowingArtistsResponse).following.items;
  const user: UserInfoResponse = userData.user;

  return (
    <div className='space-y-4 p-6'>
      <h2 className='text-3xl text-spotify-green'>Hi, {user.display_name}!</h2>
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
