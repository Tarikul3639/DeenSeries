import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
} from "@nestjs/common";
import { EpisodesService } from "./episodes.service";
// import { EpisodeResponseDto } from "./dto/episode-response.dto";
import { UpdateEpisodeDto } from "./dto/update-episode.dto";
import { CreateEpisodeDto } from "./dto/create-episode.dto";

@Controller("episodes")
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) { }

  /* ADD EPISODE TO SERIES */
  @Post(":seriesId")
  create(
    @Param("seriesId") seriesId: string,
    @Body() body: CreateEpisodeDto
  ) {
    return this.episodesService.create(seriesId, body);
  }

  /* GET ALL EPISODES OF SERIES */
  @Get("series/:seriesId")
  findBySeries(@Param("seriesId") seriesId: string) {
    return this.episodesService.findBySeries(seriesId);
  }

  /* GET SINGLE EPISODE OF SERIES */
  @Get("series/:seriesId/:episodeId")
  findOneBySeries(
    @Param("seriesId") seriesId: string,
    @Param("episodeId") episodeId: string
  ) {
    return this.episodesService.findOneBySeries(seriesId, episodeId);
  }

  /* GET ONE */
  @Get(":episodeId")
  findOne(@Param("episodeId") episodeId: string) {
    return this.episodesService.findOne(episodeId);
  }

  /* UPDATE */
  @Patch(":episodeId")
  update(@Param("episodeId") episodeId: string, @Body() body: UpdateEpisodeDto) {
    return this.episodesService.update(episodeId, body);
  }

  /* DELETE */
  @Delete(":episodeId")
  remove(@Param("episodeId") episodeId: string) {
    return this.episodesService.remove(episodeId);
  }
}