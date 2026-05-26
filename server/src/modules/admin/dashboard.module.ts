import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";

import { Movie, MovieSchema } from "../../database/schemas/movie.schema";
import { Series, SeriesSchema } from "../../database/schemas/series.schema";
import { Episode, EpisodeSchema } from "../../database/schemas/episode.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      { name: Series.name, schema: SeriesSchema },
      { name: Episode.name, schema: EpisodeSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}