import { Error } from '@/shared/design/components/globals/Error';
import Album from '@/shared/design/views/Album';
import { type AlbumSearchResponse } from '@/shared/types/spotifyTypes';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
console.log('Resolved Site URL:', siteUrl);

export default async function ArtistPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const response = await fetch(`${siteUrl}/api/album?id=${id}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return <Error text={'Failed to fetch search results'} />;
  }

  const data: AlbumSearchResponse = await response.json();

  return (
    <div className='min-h-screen'>
      <Album albumInfo={data} />
    </div>
  );
}
