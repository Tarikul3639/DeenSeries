import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SeedService } from "./seed.service";
import { Series, SeriesSchema } from "../database/schemas/series.schema";
import { Episode, EpisodeSchema } from "../database/schemas/episode.schema";
import { Movie, MovieSchema } from "../database/schemas/movie.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Series.name, schema: SeriesSchema },
      { name: Episode.name, schema: EpisodeSchema },
      { name: Movie.name, schema: MovieSchema },
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}