import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Movie } from "../../database/schemas/movie.schema";

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>
  ) {}

  /* ➕ CREATE */
  async create(data: any) {
    return this.movieModel.create(data);
  }

  /* 📄 GET ALL */
  async findAll() {
    return this.movieModel.find().sort({ createdAt: -1 });
  }

  /* 🔍 GET ONE (by slug) */
  async findOne(slug: string) {
    const movie = await this.movieModel.findOne({ slug });

    if (!movie) throw new NotFoundException("Movie not found");

    return movie;
  }

  /* ✏️ UPDATE */
  async update(id: string, data: any) {
    const updated = await this.movieModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updated) throw new NotFoundException("Movie not found");

    return updated;
  }

  /* ❌ DELETE */
  async remove(id: string) {
    const deleted = await this.movieModel.findByIdAndDelete(id);

    if (!deleted) throw new NotFoundException("Movie not found");

    return deleted;
  }
}