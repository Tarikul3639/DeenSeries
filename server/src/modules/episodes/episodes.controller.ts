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

@Controller("episodes")
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  /* ➕ ADD EPISODE TO SERIES */
  @Post(":seriesId")
  create(
    @Param("seriesId") seriesId: string,
    @Body() body: any
  ) {
    return this.episodesService.create(seriesId, body);
  }

  /* 📄 GET ALL EPISODES OF SERIES */
  @Get("series/:seriesId")
  findBySeries(@Param("seriesId") seriesId: string) {
    return this.episodesService.findBySeries(seriesId);
  }

  /* 🔍 GET ONE */
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.episodesService.findOne(id);
  }

  /* ✏️ UPDATE */
  @Patch(":id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.episodesService.update(id, body);
  }

  /* ❌ DELETE */
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.episodesService.remove(id);
  }
}