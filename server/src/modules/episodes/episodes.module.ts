import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Episode, EpisodeSchema } from "../../database/schemas/episode.schema";
import { Series, SeriesSchema } from "../../database/schemas/series.schema";
import { EpisodesService } from "./episodes.service";
import { EpisodesController } from "./episodes.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Episode.name, schema: EpisodeSchema },
      { name: Series.name, schema: SeriesSchema }, // 🔗 relation use
    ]),
  ],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}