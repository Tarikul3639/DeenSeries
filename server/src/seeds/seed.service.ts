import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Series } from "../database/schemas/series.schema";
import { Episode } from "../database/schemas/episode.schema";
import { Movie } from "../database/schemas/movie.schema";

/* DATA */
import { MOVIES_SEED_DATA } from "./data/movies.data";

import { ABDUL_QADER_GILANI_S1 } from "./data/abdul-qader-gilani-s1.data";
import { ABDUL_QADER_GILANI_S2 } from "./data/abdul-qader-gilani-s2.data";

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Series.name)
    private readonly seriesModel: Model<Series>,

    @InjectModel(Episode.name)
    private readonly episodeModel: Model<Episode>,

    @InjectModel(Movie.name)
    private readonly movieModel: Model<Movie>,
  ) {}

  async seed() {
    console.log("🌱 Starting database seeding...");

    /* -------------------------------- */
    /* CLEAR All DATABASE BEFORE SEEDING */
    /* -------------------------------- */

    await Promise.all([
      this.seriesModel.deleteMany({}),
      this.episodeModel.deleteMany({}),
      this.movieModel.deleteMany({}),
    ]);

    console.log("🗑 Existing data cleared");

    /* -------------------------------- */
    /* SERIES DATA FILES */
    /* -------------------------------- */

    const SERIES_COLLECTIONS = [
      ABDUL_QADER_GILANI_S1,
      ABDUL_QADER_GILANI_S2,
    ];

    /* -------------------------------- */
    /* INSERT SERIES + EPISODES */
    /* -------------------------------- */

    for (const item of SERIES_COLLECTIONS) {
      /* CREATE SERIES */

      const createdSeries = await this.seriesModel.create({
        ...item.series,
      });

      console.log(`📺 Series created: ${createdSeries.title}`);

      /* CREATE EPISODES */

      const formattedEpisodes = item.episodes.map((episode) => ({
        ...episode,

        series: createdSeries._id,
      }));

      await this.episodeModel.insertMany(formattedEpisodes);

      console.log(
        `🎬 ${formattedEpisodes.length} episodes added for ${createdSeries.title}`
      );
    }

    /* -------------------------------- */
    /* MOVIES */
    /* -------------------------------- */

    if (MOVIES_SEED_DATA.length) {
      await this.movieModel.insertMany(MOVIES_SEED_DATA);

      console.log(
        `🎥 ${MOVIES_SEED_DATA.length} movies inserted`
      );
    }

    console.log("✅ Database seeding completed successfully!");
  }
}