import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Movie } from '../../database/schemas/movie.schema';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) { }

  /* CREATE */
  async create(data: CreateMovieDto) {
    // console.log(data);
    return this.movieModel.create(data);
  }

  /* GET ALL (PAGINATION + FILTER) */
  async findAll(page = 1, limit = 10, search = '') {
    // console.log("Page: ", page, " Limit: ", limit, " Search: ", search);
    const skip = (page - 1) * limit;

    // Search filter build (only on published movies)
    const filter: any = { isPublished: true };

    if (search?.trim()) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.movieModel
        .find(filter)
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit),

      this.movieModel.countDocuments(filter), // filtered total
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

  /* GET BY ID */
  async findById(id: string) {
    const movie = await this.movieModel.findById(id);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  /* GET BY SLUG */
  async findBySlug(slug: string) {
    const movie = await this.movieModel.findOne({ slug });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  /* SMART FIND (ID OR SLUG) */
  async findOne(movieIdOrSlug: string) {
    let movie = null;

    // First, try to find by ID if it's a valid ObjectId
    if (isValidObjectId(movieIdOrSlug)) {
      movie = await this.movieModel.findById(movieIdOrSlug);
    }

    // If not found by ID, try finding by slug
    if (!movie) {
      movie = await this.movieModel.findOne({
        slug: movieIdOrSlug,
      });
    }

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  /* UPDATE */
  async update(id: string, data: UpdateMovieDto) {
    if (typeof data !== 'object' || Array.isArray(data) || data === null) {
      throw new NotFoundException('Invalid update data');
    }

    const updated = await this.movieModel.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!updated) {
      throw new NotFoundException('Movie not found');
    }

    return updated;
  }

  /* DELETE */
  async remove(id: string) {
    const deleted = await this.movieModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Movie not found');
    }

    return { message: 'Movie deleted successfully' };
  }
}
