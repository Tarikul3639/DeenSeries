import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { HomeController } from "./home.controller";
import { HomeService } from "./home.service";

import { Series, SeriesSchema } from "../../database/schemas/series.schema";
import { Movie, MovieSchema } from "../../database/schemas/movie.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Series.name, schema: SeriesSchema },
      { name: Movie.name, schema: MovieSchema },
    ]),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}