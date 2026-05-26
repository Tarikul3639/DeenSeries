import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Movie } from "../../database/schemas/movie.schema";
import { Series } from "../../database/schemas/series.schema";
import { Episode } from "../../database/schemas/episode.schema";
import { DashboardResponseDto } from "./dto/dashboard-response.dto";

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    @InjectModel(Series.name) private seriesModel: Model<Series>,
    @InjectModel(Episode.name) private episodeModel: Model<Episode>
  ) {}

  async getDashboardData(): Promise<DashboardResponseDto> {
    /* TOTAL COUNTS */
    const [totalMovies, totalSeries, totalEpisodes] = await Promise.all([
      this.movieModel.countDocuments({ isPublished: true }),
      this.seriesModel.countDocuments({ isPublished: true }),
      this.episodeModel.countDocuments({ isPublished: true }),
    ]);

    /* RECENT SERIES */
    const recentSeriesRaw = await this.seriesModel
      .find({ isPublished: true })
      .sort({ updatedAt: -1 })
      .limit(5)
      .lean();

    const recentSeries = recentSeriesRaw.map((item) => ({
      _id: item._id.toString(),
      title: item.title,
    }));

    /* RECENT MOVIES */
    const recentMoviesRaw = await this.movieModel
      .find({ isPublished: true })
      .sort({ updatedAt: -1 })
      .limit(5)
      .lean();

    const recentMovies = recentMoviesRaw.map((item) => ({
      _id: item._id.toString(),
      title: item.title,
    }));

    /* FINAL RESPONSE */
    return {
      stats: {
        totalMovies,
        totalSeries,
        totalEpisodes,
      },
      recentSeries,
      recentMovies,
    };
  }
}