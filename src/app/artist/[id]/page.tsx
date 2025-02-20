import { Error } from '@/shared/design/components/globals/Error';
import { Artist } from '@/shared/design/views/Artist/Artist';
import { type ArtistSearchResponse } from '@/shared/types/spotifyTypes';

export default async function ArtistPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/artist?id=${id}`
  );
  if (!response.ok) {
    return <Error text={'Failed to fetch search results'} />;
  }

  const data: ArtistSearchResponse = await response.json();

  return (
    <div className='min-h-screen'>
      <Artist artistInfo={data} />
    </div>
  );
}
