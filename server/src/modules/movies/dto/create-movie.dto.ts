import { IsString, IsOptional, IsArray, Max, Min, IsNumber, IsBoolean } from "class-validator";
import { Type } from "class-transformer";

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
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(10)
  rating?: number;

  @IsOptional()
  @IsString()
  quality?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}