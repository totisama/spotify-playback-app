import { render, screen } from '@testing-library/react';
import ArtistItem from '@/shared/design/components/items/ArtistItem';
import type { Artist } from '@/shared/types/spotifyTypes';
import { ArtistType } from '@/shared/types/spotifyTypes';
import { test, expect } from '@jest/globals';

const mockArtist: Artist = {
  external_urls: {
    spotify: 'https://open.spotify.com/artist/0TnOYISbd1XYRBk9myaseg',
  },
  followers: {
    href: null,
    total: 11267101,
  },
  genres: [],
  href: 'https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg?locale=en-US%2Cen%3Bq%3D0.9%2Ces%3Bq%3D0.8',
  id: '0TnOYISbd1XYRBk9myaseg',
  images: [
    {
      url: 'https://i.scdn.co/image/ab6761610000e5eb4051627b19277613e0e62a34',
      height: 640,
      width: 640,
    },
    {
      url: 'https://i.scdn.co/image/ab676161000051744051627b19277613e0e62a34',
      height: 320,
      width: 320,
    },
    {
      url: 'https://i.scdn.co/image/ab6761610000f1784051627b19277613e0e62a34',
      height: 160,
      width: 160,
    },
  ],
  name: 'Pitbull',
  popularity: 84,
  type: ArtistType.Artist,
  uri: 'spotify:artist:0TnOYISbd1XYRBk9myaseg',
};

test('renders artist name and image', () => {
  render(<ArtistItem artist={mockArtist} />);

  expect(screen.getByText('Pitbull')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /Pitbull/i })).toBeInTheDocument();
});
