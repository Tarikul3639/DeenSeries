import { IsString, IsNumber, IsOptional } from "class-validator";

export class CreateEpisodeDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  episodeNumber!: number;

  @IsString()
  embed!: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  duration?: string;
}