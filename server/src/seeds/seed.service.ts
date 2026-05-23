import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Series } from "../database/schemas/series.schema";
import { Episode } from "../database/schemas/episode.schema";
import { Movie } from "../database/schemas/movie.schema";

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Series.name) private seriesModel: Model<Series>,
    @InjectModel(Episode.name) private episodeModel: Model<Episode>,
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
  ) {}

  async seed() {
    console.log("🌱 Seeding database...");

    // Clear existing data
    await this.seriesModel.deleteMany({});
    await this.episodeModel.deleteMany({});
    await this.movieModel.deleteMany({});

    /* ---------------- SERIES ---------------- */
    const series = await this.seriesModel.create({
      title: "Gilani Series",
      slug: "gilani-series",
      description: "Spiritual journey of Sheikh Abdul Qadir Gilani",
      genres: ["Spiritual", "History"],
      releaseDate: "2025",
    });

    /* ---------------- EPISODES ---------------- */
    const episodes = Array.from({ length: 5 }, (_, i) => ({
      series: series._id,
      title: `Episode ${i + 1}`,
      episodeNumber: i + 1,
      embed: "<iframe src='https://www.youtube.com/embed/dQw4w9WgXcQ'></iframe>",
    }));

    await this.episodeModel.insertMany(episodes);

    /* ---------------- MOVIES ---------------- */
    await this.movieModel.create({
      title: "Omar Movie",
      slug: "omar-movie",
      description: "Islamic historical drama",
      embed: "<iframe src='https://www.youtube.com/embed/dQw4w9WgXcQ'></iframe>",
      duration: "2h 30m",
      genres: ["History", "Islamic"],
    });

    console.log("✅ Seeding completed!");
  }
}