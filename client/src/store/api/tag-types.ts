export const TAG_TYPES = {
  FEATURED: "Featured",
  SERIES: "Series",
  EPISODE: "Episode",
  MOVIE: "Movie",
  AUTH: "Auth",
} as const;

/* union type */
export type TagType = (typeof TAG_TYPES)[keyof typeof TAG_TYPES];