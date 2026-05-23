import { IsString, IsOptional, IsArray } from "class-validator";

export class CreateSeriesDto {
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
  coverPoster?: string;

  @IsOptional()
  @IsString()
  thumbnailPoster?: string;

  @IsOptional()
  @IsArray()
  genres?: string[];

  @IsOptional()
  @IsString()
  releaseDate?: string;
}