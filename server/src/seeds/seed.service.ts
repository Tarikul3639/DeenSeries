import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Series } from "../database/schemas/series.schema";
import { Episode } from "../database/schemas/episode.schema";
import { Movie } from "../database/schemas/movie.schema";

// Data
import { MOVIES_SEED_DATA } from "./data/movies.data";
import { SERIES_SEED_DATA } from "./data/series.data";
import { EPISODES_SEED_DATA } from "./data/episodes.data";

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Series.name) private seriesModel: Model<Series>,
    @InjectModel(Episode.name) private episodeModel: Model<Episode>,
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
  ) { }

  async seed() {
    console.log("🌱 Seeding database...");

    // Clear existing data
    await this.seriesModel.deleteMany({});
    await this.episodeModel.deleteMany({});
    await this.movieModel.deleteMany({});

    /* ---------------- SERIES ---------------- */
    const series = await this.seriesModel.insertMany(SERIES_SEED_DATA);

    /* ---------------- EPISODES ---------------- */

    const allEpisodesToInsert: any[] = [];

    for (const item of EPISODES_SEED_DATA) {
      const matchedSeries = series.find(s => s.title === item.seriesName);

      if (matchedSeries) {
        const formattedEpisodes = item.episodes.map(ep => ({
          ...ep,
          series: matchedSeries._id,
        }));

        allEpisodesToInsert.push(...formattedEpisodes);
      }
    }

    await this.episodeModel.insertMany(allEpisodesToInsert);

    /* ---------------- MOVIES ---------------- */
    await this.movieModel.insertMany(MOVIES_SEED_DATA);

    console.log("✅ Seeding completed!");
  }
}