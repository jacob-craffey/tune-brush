export type Response<T> = {
  meta: {
    status: number;
  };
  response: T;
};

export type Hits = {
  hits: Hit[];
};

export type Hit = {
  highlights: any[];
  index: string;
  type: string;
  result: Result;
};

export type Result = {
  artist_names: string;
  id: number;
  lyrics_state: string;
  path: string;
  song_art_image_thumbnail_url: string;
  song_art_image_url: string;
  title: string;
  title_with_featured: string;
  url: string;
  featured_artists: any[];
  primary_artist: any;
};

export type Song = {
  song: {
    path: string;
    header_image_url: string;
    artist_names: string;
    title: string;
  };
};
