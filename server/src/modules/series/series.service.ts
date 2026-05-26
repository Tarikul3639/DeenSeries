import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Series } from '../../database/schemas/series.schema';
import { Episode } from '../../database/schemas/episode.schema';

import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { GetSeriesQueryDto } from './dto/get-series-query.dto';

@Injectable()
export class SeriesService {
  constructor(
    @InjectModel(Series.name) private seriesModel: Model<Series>,
    @InjectModel(Episode.name) private episodeModel: Model<Episode>,
  ) { }

  /* ➕ CREATE */
  async create(data: CreateSeriesDto) {
    return this.seriesModel.create(data);
  }

  /* GET ALL */
  async findAll(query: GetSeriesQueryDto) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const filter: any = { isPublished: true };

    if (search?.trim()) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tagline: { $regex: search, $options: 'i' } },
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

  /* GET ONE */
  async findOne(slug: string) {
    return this.seriesModel.findOne({ slug });
  }

  /* UPDATE */
  async update(id: string, data: UpdateSeriesDto) {
    return this.seriesModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  /* DELETE */
  async remove(id: string) {
    const seriesObjectId = new Types.ObjectId(id);

    if (!seriesObjectId) {
      throw new Error('Invalid series ID');
    }

    if (!(await this.seriesModel.exists({ _id: seriesObjectId }))) {
      throw new Error('Series not found');
    }

    // Delete all episodes of the series
    await this.episodeModel.deleteMany({ series: seriesObjectId });

    // Delete all episodes of the series
    await this.seriesModel.findByIdAndDelete(seriesObjectId);

    return { message: 'Series and its episodes deleted successfully' };
  }
}
