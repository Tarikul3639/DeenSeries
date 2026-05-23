import { IsString, IsOptional, IsArray } from "class-validator";

export class CreateMovieDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  tagline?: string;

  @IsOptional()
  @IsString()
  poster?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsString()
  embed!: string;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsString()
  releaseDate?: string;

  @IsOptional()
  @IsArray()
  genres?: string[];

  @IsOptional()
  @IsString()
  rating?: string;

  @IsOptional()
  @IsString()
  quality?: string;
}