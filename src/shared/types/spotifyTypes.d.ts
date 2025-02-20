export interface AlbumSearchResponse {
  album: Album;
}

export interface ArtistSearchResponse {
  artist: Artist;
  albums: ArtistAlbums;
  topTracks: ArtistTopTracks;
}

export interface GeneralSearchResponse {
  data: Data;
}

export interface Data {
  tracks: Tracks;
  artists: Artists;
  albums: Albums;
}

/* -------------------------- Artist Definitions -------------------------- */
export interface Artist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres?: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity?: number;
  type: ArtistType;
  uri: string;
}

export type SmallArtist = Pick<
  Artist,
  'external_urls' | 'href' | 'id' | 'name' | 'type' | 'uri'
>;

export interface Artists {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
  items: Artist[];
}

/* -------------------------- Album Definitions -------------------------- */
export interface ArtistAlbums {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string | null;
  total: number;
  items: Album[];
}

export interface Albums {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
  items: Album[];
}

export interface Album {
  album_type: AlbumTypeEnum;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  restrictions?: Restrictions;
  type: AlbumTypeEnum;
  uri: string;
  artists: SmallArtist[];
  tracks?: Tracks;
  is_playable?: boolean;
}

export enum AlbumTypeEnum {
  Album = 'album',
  Compilation = 'compilation',
  Single = 'single',
}

/* -------------------------- Track Definitions -------------------------- */
export interface ArtistTopTracks {
  tracks: Track[];
}

export interface Tracks {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
  items: Track[];
}

export interface Track {
  album: Album;
  artists: SmallArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  external_ids?: ExternalIDS;
  href: string;
  id: string;
  is_playable: boolean;
  restrictions?: Restrictions;
  name: string;
  popularity: number;
  preview_url?: string | null;
  track_number: number;
  type: TrackType;
  uri: string;
  is_local: boolean;
}

export interface ExternalIDS {
  isrc: string;
}

export enum TrackType {
  Track = 'track',
}

/* -------------------------- Common Interfaces -------------------------- */
export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: string | null;
  total: number;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Restrictions {
  reason: string;
}

export enum ReleaseDatePrecision {
  Day = 'day',
  Year = 'year',
}

export enum ArtistType {
  Artist = 'artist',
}
