export interface SpotifySDK {
  Player: new (options: {
    name: string;
    getOAuthToken: (cb: (token: string) => void) => void;
    volume: number;
  }) => SpotifyPlayer;
}

export interface SpotifyPlayer {
  connect: () => Promise<boolean>;
  disconnect: () => void;
  togglePlay: () => void;
  previousTrack: () => void;
  nextTrack: () => void;
  addListener: (event: string, callback: (args: any) => void) => SpotifyPlayer;
  getCurrentState: () => Promise<SpotifyPlayerState | null>;
}

export interface SpotifyTrack {
  album: {
    images: Array<{ url: string }>;
  };
  name: string;
  artists: Array<{ name: string }>;
  duration_ms: number;
  id: string;
  is_playable: boolean;
  uid: string;
  uri: string;
}

export interface SpotifyDevice {
  device_id: string;
}

export interface SpotifyPlayerState {
  timestamp: number;
  context: Context;
  duration: number;
  paused: boolean;
  shuffle: boolean;
  position: number;
  loading: boolean;
  repeat_mode: number;
  track_window: TrackWindow;
  restrictions: Restrictions;
  disallows: Disallows;
  playback_id: string;
  playback_quality: string;
  playback_features: PlaybackFeatures;
  playback_speed: number;
}

export interface Context {
  uri: string;
}

export interface Disallows {
  seeking: boolean;
  skipping_next: boolean;
  skipping_prev: boolean;
  toggling_repeat_context: boolean;
  toggling_repeat_track: boolean;
  toggling_shuffle: boolean;
  peeking_next: boolean;
  peeking_prev: boolean;
  undefined: boolean;
  pausing: boolean;
}

export interface PlaybackFeatures {
  hifi_status: string;
  playback_speed: PlaybackSpeed;
}

export interface PlaybackSpeed {
  current: number;
  selected: number;
  restricted: boolean;
}

export interface Restrictions {
  disallow_seeking_reasons: string[];
  disallow_skipping_next_reasons: string[];
  disallow_skipping_prev_reasons: string[];
  disallow_toggling_repeat_context_reasons: string[];
  disallow_toggling_repeat_track_reasons: string[];
  disallow_toggling_shuffle_reasons: string[];
  disallow_peeking_next_reasons: string[];
  disallow_peeking_prev_reasons: string[];
  undefined: string[];
  disallow_pausing_reasons: string[];
}

export interface TrackWindow {
  current_track: Track;
  next_tracks: Track[];
  previous_tracks: Track[];
}

export interface Track {
  id: string;
  uri: string;
  type: string;
  uid: string;
  linked_from: LinkedFrom;
  media_type: string;
  track_type: string;
  name: string;
  duration_ms: number;
  artists: Artist[];
  album: Album;
  is_playable: boolean;
}

export interface Album {
  name: string;
  uri: string;
  images: Image[];
}

export interface Image {
  url: string;
  height: number;
  width: number;
  size: Size;
}

export enum Size {
  Unknown = 'UNKNOWN',
}

export interface Artist {
  name: string;
  uri: string;
  url: string;
}

export interface LinkedFrom {
  uri: null;
  id: null;
}
