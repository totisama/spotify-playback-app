import { type FollowingArtistsResponse } from '@/shared/types/spotifyTypes';
import { Error } from '../components/globals/Error';
import Image from 'next/image';
import { Link } from 'next-view-transitions';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;

export const AsideMenu = async () => {
  const response = await fetch(`${siteUrl}/api/following`);

  if (!response.ok) {
    return <Error text='Failed to fetch data' />;
  }
  const followingData: FollowingArtistsResponse = await response.json();
  const artists = followingData.following.items;

  return (
    <nav className='flex flex-1 flex-col gap-2'>
      <div className='rounded-lg p-4'>
        <h2 className='text-lg text-spotify-green md:text-2xl'>
          Followed Artists
        </h2>
        <ul className='mt-4 flex flex-col gap-4'>
          {artists.map((artist) => (
            <li
              key={artist.id}
              className='group'
            >
              <Link
                href={`/artist/${artist.id}`}
                className='flex gap-2 overflow-hidden'
              >
                <Image
                  src={artist.images[0].url}
                  alt={artist.name}
                  width={75}
                  height={75}
                  className='rounded-2xl transition-transform duration-300 ease-out group-hover:scale-110'
                />
                <div className='hidden flex-col gap-1 md:flex'>
                  <p className='font-bold group-hover:text-spotify-green'>
                    {artist.name}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex-1 rounded-lg p-2'></div>
    </nav>
  );
};
