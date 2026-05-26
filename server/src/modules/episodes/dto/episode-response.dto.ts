export class EpisodeResponseDto {
  _id!: string;
  title!: string;
  description?: string;
  episodeNumber!: number;
  embed!: string;
  thumbnail?: string;
  duration?: string;
  quality!: string;
  rating?: number;
  releaseDate?: string;
  isPublished!: boolean;
}