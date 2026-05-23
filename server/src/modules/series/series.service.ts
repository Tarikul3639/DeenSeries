import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Series } from "../../database/schemas/series.schema";

@Injectable()
export class SeriesService {
  constructor(
    @InjectModel(Series.name) private seriesModel: Model<Series>
  ) {}

  /* ➕ CREATE */
  async create(data: any) {
    return this.seriesModel.create(data);
  }

  /* 📄 GET ALL */
  async findAll() {
    return this.seriesModel.find().sort({ createdAt: -1 });
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