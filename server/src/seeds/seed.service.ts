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
import { SINA_S1 } from "./data/sina-s1.data";
import { SINA_S2 } from "./data/sina-s2.data";
import { SINA_S3 } from "./data/sina-s3.data";
import { BARBAROSSA_S1 } from "./data/barbarossa-s1.data";
import { HAYREDDIN_S1 } from "./data/hayreddin-s1.data";
import { FATIH_S1 } from "./data/fatih-s1.data";
import { RUMI_S1 } from "./data/rumi-s1.data";
import { RUMI_S2 } from "./data/rumi-s2.data";
import { RUMI_S3 } from "./data/rumi-s3.data";

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

    // await Promise.all([
    //   this.seriesModel.deleteMany({}),
    //   this.episodeModel.deleteMany({}),
    //   this.movieModel.deleteMany({}),
    // ]);

    // console.log("🗑 Existing data cleared");

    /* -------------------------------- */
    /* SERIES DATA FILES */
    /* -------------------------------- */

    const SERIES_COLLECTIONS = [
      // ABDUL_QADER_GILANI_S1,
      // ABDUL_QADER_GILANI_S2,
      // SINA_S1,
      // SINA_S2,
      // SINA_S3,
      // BARBAROSSA_S1,
      FATIH_S1,
      RUMI_S1,
      RUMI_S2,
      RUMI_S3,
      HAYREDDIN_S1,
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

    // if (MOVIES_SEED_DATA.length) {
    //   await this.movieModel.insertMany(MOVIES_SEED_DATA);

    //   console.log(
    //     `🎥 ${MOVIES_SEED_DATA.length} movies inserted`
    //   );
    // }

    console.log("✅ Database seeding completed successfully!");
  }
}