export const TAG_TYPES = {
  SERIES: "Series",
  MOVIE: "Movie",
  AUTH: "Auth",
} as const;

/* union type */
export type TagType = (typeof TAG_TYPES)[keyof typeof TAG_TYPES];