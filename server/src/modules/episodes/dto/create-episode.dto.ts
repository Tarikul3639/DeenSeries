import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
  Max,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateEpisodeDto {
  /* BASIC INFO */
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  /* EPISODE NUMBER */
  @Type(() => Number)
  @IsNumber()
  episodeNumber!: number;

  /* VIDEO */
  @IsString()
  embed!: string;

  /* OPTIONAL */
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  duration?: string;

  /* EXTRA */
  @IsOptional()
  @IsString()
  quality?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(10)
  rating?: number;

  @IsOptional()
  @IsString()
  releaseDate?: string;

  /* STATUS */
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isPublished?: boolean;
}