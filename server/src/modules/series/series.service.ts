import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Series } from "../../database/schemas/series.schema";
import { Episode } from "../../database/schemas/episode.schema";

@Injectable()
export class SeriesService {
  constructor(
    @InjectModel(Series.name) private seriesModel: Model<Series>,
    @InjectModel(Episode.name) private episodeModel: Model<Episode>
  ) { }

  /* ➕ CREATE */
  async create(data: any) {
    return this.seriesModel.create(data);
  }

  /* GET ALL */
  async findAll(page = 1, limit = 10, search = "") {
    const skip = (page - 1) * limit;

    const filter: any = { isPublished: true };

    if (search?.trim()) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tagline: { $regex: search, $options: "i" } },
      ];
    }

    const [data, total] = await Promise.all([
      this.seriesModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      this.seriesModel.countDocuments(filter), // filtered total
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }

  /* 🔍 GET ONE */
  async findOne(slug: string) {
    return this.seriesModel.findOne({ slug });
  }

  /* ✏️ UPDATE */
  async update(id: string, data: any) {
    return this.seriesModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  /* ❌ DELETE */
  async remove(id: string) {
    return this.seriesModel.findByIdAndDelete(id);
  }
}