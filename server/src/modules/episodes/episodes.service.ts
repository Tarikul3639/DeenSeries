import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Episode } from "../../database/schemas/episode.schema";
import { Series } from "../../database/schemas/series.schema";

@Injectable()
export class EpisodesService {
  constructor(
    @InjectModel(Episode.name) private episodeModel: Model<Episode>,
    @InjectModel(Series.name) private seriesModel: Model<Series>
  ) {}

  /* ➕ ADD EPISODE */
  async create(seriesId: string, data: any) {
    const series = await this.seriesModel.findById(seriesId);
    if (!series) throw new NotFoundException("Series not found");

    const episode = await this.episodeModel.create({
      ...data,
      series: seriesId,
    });

    // optional: update totalEpisodes
    await this.seriesModel.findByIdAndUpdate(seriesId, {
      $inc: { totalEpisodes: 1 },
    });

    return episode;
  }

  /* 📄 GET ALL EPISODES OF SERIES */
  async findBySeries(seriesId: string) {
    return this.episodeModel
      .find({ series: seriesId })
      .sort({ episodeNumber: 1 });
  }

  /* 🔍 GET SINGLE EPISODE */
  async findOne(id: string) {
    const episode = await this.episodeModel.findById(id).populate("series");

    if (!episode) throw new NotFoundException("Episode not found");

    return episode;
  }

  /* ✏️ UPDATE */
  async update(id: string, data: any) {
    return this.episodeModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  /* ❌ DELETE */
  async remove(id: string) {
    const episode = await this.episodeModel.findByIdAndDelete(id);

    if (!episode) throw new NotFoundException("Episode not found");

    // optional: decrease count
    await this.seriesModel.findByIdAndUpdate(episode.series, {
      $inc: { totalEpisodes: -1 },
    });

    return episode;
  }
}