export interface Episode {
  id: string;
  contentId: string;
  title: string;
  description: string;
  episodeNumber: number;
  videoUrl: string;
  thumbnail: string;
  duration: number;
  releaseDate: Date;
  views: number;
}

export interface Content {
  id: string;
  title: string;
  type: "series" | "movie";
  description: string;
  thumbnail: string;
  poster: string;
  rating: number;
  genre: string[];
  country: string;
  language: string;
  cast: string[];
  episodes: Episode[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  watchlist: string[];
  watchHistory: { contentId: string; episodeId?: string; progress: number; lastWatched: Date }[];
}