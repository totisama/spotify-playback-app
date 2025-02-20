import GeneralSearch from '@/shared/design/views/GeneralSearch';
import { Error } from '@/shared/design/components/globals/Error';
import { type GeneralSearchResponse } from '@/shared/types/spotifyTypes';

export default async function SearchPage({
  params,
}: {
  params: { search: string };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/general-search?q=${encodeURIComponent(params.search)}`
  );
  if (!response.ok) {
    return <Error text={'Failed to fetch search results'} />;
  }

  const data: GeneralSearchResponse = await response.json();

  return <GeneralSearch searchResults={data} />;
}
