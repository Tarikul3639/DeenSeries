import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Episode } from '../../database/schemas/episode.schema';
import { Series } from '../../database/schemas/series.schema';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectModel(Episode.name) private episodeModel: Model<Episode>,
    @InjectModel(Series.name) private seriesModel: Model<Series>,
  ) { }

  /* ADD EPISODE */
  async create(seriesId: string, data: CreateEpisodeDto) {
    const seriesObjectId = new Types.ObjectId(seriesId);
    const series = await this.seriesModel.findById(seriesObjectId);
    if (!series) throw new NotFoundException('Series not found');

    const episode = await this.episodeModel.create({
      ...data,
      series: seriesObjectId,
    });

    if (!episode) {
      throw new NotFoundException('Failed to create episode');
    }

    return episode;
  }

  /* GET ALL EPISODES OF SERIES */
  async findBySeries(seriesId: string) {
    const seriesObjectId = new Types.ObjectId(seriesId);
    const series = await this.seriesModel.findById(seriesObjectId);

    if (!series) {
      throw new NotFoundException('Series not found');
    }

    const episodes = await this.episodeModel
      .find({ series: seriesObjectId })
      .sort({ episodeNumber: 1 });

    // console.log(episodes);

    return {
      episode: episodes.map((ep) => ({
        ...ep.toObject(),
        seriesId: ep.series.toString(),
      })),
      series,
    };
  }

  /* GET SINGLE EPISODE OF SERIES */
  async findOneBySeries(seriesId: string, episodeId: string) {
    // console.log("Series: ", seriesId, "Episode: ", episodeId);
    const objectEpisodeId = new Types.ObjectId(episodeId);
    const objectSeriesId = new Types.ObjectId(seriesId);
    const series = await this.seriesModel.findById(objectSeriesId);

    if (!series) {
      throw new NotFoundException("Series not found");
    }

    const episode = await this.episodeModel.findOne({
      _id: objectEpisodeId,
      series: objectSeriesId,
    });

    if (!episode) {
      throw new NotFoundException("Episode not found");
    }

    return {
      episode: {
        ...episode.toObject(),
        seriesId: episode.series.toString(),
      },
      series,
    };
  }

  /* GET SINGLE EPISODE */
  async findOne(episodeId: string) {
    const episode = await this.episodeModel.findById(episodeId).populate('series');

    if (!episode) throw new NotFoundException('Episode not found');

    return episode;
  }

  /* UPDATE */
  async update(episodeId: string, data: UpdateEpisodeDto) {
    return this.episodeModel.findByIdAndUpdate(episodeId, data, {
      new: true,
    });
  }

  /* DELETE */
  async remove(episodeId: string) {
    const episodeObjectId = new Types.ObjectId(episodeId);
    if (!episodeObjectId) throw new NotFoundException('Episode not found');
    const episode = await this.episodeModel.findByIdAndDelete(episodeObjectId);
    if (!episode) throw new NotFoundException('Episode not found');
    return episode;
  }
}
